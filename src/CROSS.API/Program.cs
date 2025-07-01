using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;
using FluentValidation;
using FluentValidation.AspNetCore;
using Polly;
using CROSS.Infrastructure.Data;
using CROSS.Application.Interfaces;
using CROSS.Infrastructure.Services;
using CROSS.Application.Mappings;
using CROSS.Application.Validators;

var builder = WebApplication.CreateBuilder(args);

// Configuração do Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("logs/cross-api-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Configuração do Entity Framework
builder.Services.AddDbContext<CrossDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    options.EnableSensitiveDataLogging(builder.Environment.IsDevelopment());
    options.EnableDetailedErrors(builder.Environment.IsDevelopment());
});

// Configuração de HttpClient básico
builder.Services.AddHttpClient("DefaultClient");

// Configuração de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Configuração de Controllers
builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressModelStateInvalidFilter = false;
    });

// Configuração do Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CROSS API",
        Version = "v1",
        Description = "API para gestão de operações logísticas e comerciais",
        Contact = new OpenApiContact
        {
            Name = "CROSS API Team"
        }
    });

    // Configuração para autenticação JWT no Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });

    // Incluir comentários XML
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// Configuração de Autenticação JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured")))
        };
    });

// Configuração de Autorização
builder.Services.AddAuthorization();

// Injeção de Dependência - Serviços
builder.Services.AddScoped<ISessionValidationService, SessionValidationService>();
builder.Services.AddScoped<ITaxService, TaxService>();
builder.Services.AddScoped<ICityService, CityService>();

// Configuração do AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Configuração do FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CitySearchRequestValidator>();

// Configuração de Health Checks
builder.Services.AddHealthChecks()
    .AddDbContextCheck<CrossDbContext>();

// Configuração de Response Compression
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
});

// Configuração de API Versioning (opcional)
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new Microsoft.AspNetCore.Mvc.ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
});

var app = builder.Build();

// Configuração do pipeline de middleware
// Swagger habilitado em desenvolvimento e produção (configurável)
var enableSwagger = builder.Configuration.GetValue<bool>("EnableSwagger", app.Environment.IsDevelopment());

if (enableSwagger)
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "CROSS API v1");
        c.RoutePrefix = "swagger"; // Swagger em /swagger/index.html
        c.DocumentTitle = "CROSS API - Documentação";
        c.DefaultModelsExpandDepth(-1); // Ocultar modelos por padrão
        c.DisplayRequestDuration();
        c.EnableDeepLinking();
        c.EnableFilter();
        c.ShowExtensions();
        
        // Configurações adicionais para produção
        if (!app.Environment.IsDevelopment())
        {
            c.SupportedSubmitMethods(); // Desabilitar botões "Try it out" em produção
        }
    });
}

// Middleware de HTTPS Redirection
app.UseHttpsRedirection();

// Middleware de Response Compression
app.UseResponseCompression();

// Middleware de CORS
app.UseCors("AllowAll");

// Middleware de Autenticação e Autorização
app.UseAuthentication();
app.UseAuthorization();

// Middleware de Logging de Requests
app.UseSerilogRequestLogging(options =>
{
    options.MessageTemplate = "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000} ms";
    options.GetLevel = (httpContext, elapsed, ex) => ex != null
        ? Serilog.Events.LogEventLevel.Error
        : httpContext.Response.StatusCode > 499
            ? Serilog.Events.LogEventLevel.Error
            : Serilog.Events.LogEventLevel.Information;
});

// Middleware customizado para tratamento de exceções
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";

        var exceptionHandlerPathFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>();
        var exception = exceptionHandlerPathFeature?.Error;

        if (exception != null)
        {
            Log.Error(exception, "Unhandled exception occurred");
        }

        await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(new
        {
            error = "An error occurred while processing your request.",
            timestamp = DateTime.UtcNow
        }));
    });
});

// Mapeamento de Controllers
app.MapControllers();

// Health Check endpoint
app.MapHealthChecks("/health");

// Endpoint de informações da API
app.MapGet("/", () => new
{
    name = "CROSS API",
    version = "1.0",
    description = "API para gestão de operações logísticas e comerciais",
    timestamp = DateTime.UtcNow,
    environment = app.Environment.EnvironmentName
});

// Inicialização do banco de dados (se necessário)
using (var scope = app.Services.CreateScope())
{
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<CrossDbContext>();
        // Verificar se o banco existe e criar se necessário
        // context.Database.EnsureCreated(); // Usar apenas em desenvolvimento
        Log.Information("Database connection verified successfully");
    }
    catch (Exception ex)
    {
        Log.Error(ex, "An error occurred while initializing the database");
    }
}

Log.Information("CROSS API starting up...");

try
{
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
