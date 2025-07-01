using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.Net;
using Moq;
using CROSS.API.Controllers;
using CROSS.Application.DTOs.Requests;
using CROSS.Domain.Entities;
using CROSS.API.Tests.TestUtilities;

namespace CROSS.API.Tests.Controllers;

public class AuthControllerTests : ControllerTestBase
{
    private readonly Mock<IConfiguration> _mockConfiguration;
    private readonly Mock<ILogger<AuthController>> _mockLogger;

    public AuthControllerTests()
    {
        _mockConfiguration = new Mock<IConfiguration>();
        _mockLogger = new Mock<ILogger<AuthController>>();
        
        _mockConfiguration.Setup(c => c["Jwt:Key"]).Returns("test-key-that-is-long-enough-for-hmac-sha256-algorithm");
        _mockConfiguration.Setup(c => c["Jwt:Issuer"]).Returns("test-issuer");
        _mockConfiguration.Setup(c => c["Jwt:Audience"]).Returns("test-audience");
        _mockConfiguration.Setup(c => c["SessionTimeoutHours"]).Returns("8");
        
        var mockConfigSection = new Mock<IConfigurationSection>();
        mockConfigSection.Setup(x => x.Value).Returns("8");
        _mockConfiguration.Setup(c => c.GetSection("SessionTimeoutHours")).Returns(mockConfigSection.Object);
    }

    [Fact]
    public async Task Login_WithValidCredentials_ShouldReturnOkWithToken()
    {
        using var context = GetInMemoryDbContext();
        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);
        
        var httpContext = new DefaultHttpContext();
        httpContext.Connection.RemoteIpAddress = IPAddress.Parse("127.0.0.1");
        controller.ControllerContext = new ControllerContext()
        {
            HttpContext = httpContext
        };
        
        var request = new LoginRequestDto { Username = "testuser", Password = "testpass" };

        var result = await controller.Login(request);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public async Task Login_WithInvalidCredentials_ShouldReturnUnauthorized()
    {
        using var context = GetInMemoryDbContext();
        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);
        
        var httpContext = new DefaultHttpContext();
        httpContext.Connection.RemoteIpAddress = IPAddress.Parse("127.0.0.1");
        controller.ControllerContext = new ControllerContext()
        {
            HttpContext = httpContext
        };
        
        var request = new LoginRequestDto { Username = "", Password = "" };

        var result = await controller.Login(request);

        Assert.IsType<UnauthorizedObjectResult>(result);
    }

    [Fact]
    public async Task Logout_WithValidSession_ShouldReturnOk()
    {
        using var context = GetInMemoryDbContext();
        var sessionToken = "test-session-token";
        
        context.UserSessions.Add(new UserSession
        {
            UsuarioSessao = sessionToken,
            IdUsuario = "testuser",
            DtInicio = DateTime.UtcNow,
            DtUltimoAcesso = DateTime.UtcNow,
            IpOrigem = "127.0.0.1",
            Ativo = 'S'
        });
        await context.SaveChangesAsync();

        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);
        
        var httpContext = new DefaultHttpContext();
        controller.ControllerContext = new ControllerContext()
        {
            HttpContext = httpContext
        };

        var result = await controller.Logout(sessionToken);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task Logout_WithInvalidSession_ShouldReturnOk()
    {
        using var context = GetInMemoryDbContext();
        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);
        
        var httpContext = new DefaultHttpContext();
        controller.ControllerContext = new ControllerContext()
        {
            HttpContext = httpContext
        };

        var result = await controller.Logout("invalid-session");

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task Logout_WithEmptySession_ShouldReturnBadRequest()
    {
        using var context = GetInMemoryDbContext();
        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);
        
        var httpContext = new DefaultHttpContext();
        controller.ControllerContext = new ControllerContext()
        {
            HttpContext = httpContext
        };

        var result = await controller.Logout("");

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task ValidateSession_WithValidSession_ShouldReturnOkWithValidStatus()
    {
        using var context = GetInMemoryDbContext();
        var sessionToken = "test-session-token";
        
        context.UserSessions.Add(new UserSession
        {
            UsuarioSessao = sessionToken,
            IdUsuario = "testuser",
            DtInicio = DateTime.UtcNow,
            DtUltimoAcesso = DateTime.UtcNow,
            IpOrigem = "127.0.0.1",
            Ativo = 'S'
        });
        await context.SaveChangesAsync();

        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);

        var result = await controller.ValidateSession(sessionToken);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task ValidateSession_WithInvalidSession_ShouldReturnOkWithInvalidStatus()
    {
        using var context = GetInMemoryDbContext();
        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);

        var result = await controller.ValidateSession("invalid-session");

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task ValidateSession_WithExpiredSession_ShouldReturnOkWithInvalidStatus()
    {
        using var context = GetInMemoryDbContext();
        var sessionToken = "test-session-token";
        
        context.UserSessions.Add(new UserSession
        {
            UsuarioSessao = sessionToken,
            IdUsuario = "testuser",
            DtInicio = DateTime.UtcNow.AddDays(-2),
            DtUltimoAcesso = DateTime.UtcNow.AddDays(-1),
            IpOrigem = "127.0.0.1",
            Ativo = 'S'
        });
        await context.SaveChangesAsync();

        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);

        var result = await controller.ValidateSession(sessionToken);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task ValidateSession_WithEmptySession_ShouldReturnBadRequest()
    {
        using var context = GetInMemoryDbContext();
        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);

        var result = await controller.ValidateSession("");

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task RenewSession_WithValidSession_ShouldReturnOk()
    {
        using var context = GetInMemoryDbContext();
        var sessionToken = "test-session-token";
        
        context.UserSessions.Add(new UserSession
        {
            UsuarioSessao = sessionToken,
            IdUsuario = "testuser",
            DtInicio = DateTime.UtcNow,
            DtUltimoAcesso = DateTime.UtcNow,
            IpOrigem = "127.0.0.1",
            Ativo = 'S'
        });
        await context.SaveChangesAsync();

        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);

        var result = await controller.RenewSession(sessionToken);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task RenewSession_WithInvalidSession_ShouldReturnUnauthorized()
    {
        using var context = GetInMemoryDbContext();
        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);

        var result = await controller.RenewSession("invalid-session");

        Assert.IsType<UnauthorizedObjectResult>(result);
    }

    [Fact]
    public async Task RenewSession_WithEmptySession_ShouldReturnBadRequest()
    {
        using var context = GetInMemoryDbContext();
        var controller = new AuthController(context, _mockConfiguration.Object, _mockLogger.Object);

        var result = await controller.RenewSession("");

        Assert.IsType<BadRequestObjectResult>(result);
    }
}
