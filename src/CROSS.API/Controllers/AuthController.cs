using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CROSS.Application.Interfaces;
using CROSS.Application.DTOs.Requests;
using CROSS.Application.DTOs.Responses;
using CROSS.Infrastructure.Data;
using CROSS.Domain.Entities;

namespace CROSS.API.Controllers;

/// <summary>
/// Controller para autenticação e gerenciamento de sessões
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly CrossDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;

    public AuthController(CrossDbContext context, IConfiguration configuration, ILogger<AuthController> logger)
    {
        _context = context;
        _configuration = configuration;
        _logger = logger;
    }

    /// <summary>
    /// Realiza login e cria nova sessão de usuário
    /// </summary>
    /// <param name="request">Dados de login</param>
    /// <returns>Token de sessão e informações do usuário</returns>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        try
        {
            // Validar credenciais (implementar conforme sistema de autenticação existente)
            var isValidUser = await ValidateUserCredentials(request.Username, request.Password);
            
            if (!isValidUser)
            {
                _logger.LogWarning("Tentativa de login inválida para usuário {Username} do IP {IP}", 
                    request.Username, GetClientIpAddress());
                return Unauthorized(new { error = "Credenciais inválidas" });
            }

            // Gerar token de sessão único
            var sessionToken = GenerateSessionToken();
            
            // Criar nova sessão no banco de dados
            var userSession = new UserSession
            {
                UsuarioSessao = sessionToken,
                IdUsuario = request.Username,
                DtInicio = DateTime.UtcNow,
                DtUltimoAcesso = DateTime.UtcNow,
                IpOrigem = GetClientIpAddress(),
                Ativo = 'S'
            };

            _context.UserSessions.Add(userSession);
            await _context.SaveChangesAsync();

            // Gerar JWT token (opcional, para autenticação adicional)
            var jwtToken = GenerateJwtToken(request.Username, sessionToken);

            _logger.LogInformation("Login realizado com sucesso para usuário {Username} - Sessão {SessionToken}", 
                request.Username, sessionToken);

            return Ok(new LoginResponseDto
            {
                UserSession = sessionToken,
                JwtToken = jwtToken,
                Username = request.Username,
                LoginTime = userSession.DtInicio,
                ExpiresAt = userSession.DtInicio.AddHours(GetSessionTimeoutHours()),
                Message = "Login realizado com sucesso"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro durante processo de login para usuário {Username}", request.Username);
            return StatusCode(500, new { error = "Erro interno do servidor" });
        }
    }

    /// <summary>
    /// Realiza logout e invalida sessão
    /// </summary>
    /// <param name="userSession">Token de sessão a ser invalidado</param>
    /// <returns>Confirmação de logout</returns>
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromQuery] string userSession)
    {
        try
        {
            if (string.IsNullOrEmpty(userSession))
            {
                return BadRequest(new { error = "Token de sessão é obrigatório" });
            }

            var session = await _context.UserSessions
                .FirstOrDefaultAsync(s => s.UsuarioSessao == userSession && s.Ativo == 'S');

            if (session != null)
            {
                session.Ativo = 'N';
                session.DtUltimoAcesso = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                _logger.LogInformation("Logout realizado para sessão {SessionToken} do usuário {Username}", 
                    userSession, session.IdUsuario);
            }

            return Ok(new { message = "Logout realizado com sucesso" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro durante processo de logout para sessão {SessionToken}", userSession);
            return StatusCode(500, new { error = "Erro interno do servidor" });
        }
    }

    /// <summary>
    /// Valida se uma sessão está ativa
    /// </summary>
    /// <param name="userSession">Token de sessão</param>
    /// <returns>Status da sessão</returns>
    [HttpGet("validate-session")]
    public async Task<IActionResult> ValidateSession([FromQuery] string userSession)
    {
        try
        {
            if (string.IsNullOrEmpty(userSession))
            {
                return BadRequest(new { error = "Token de sessão é obrigatório" });
            }

            var session = await _context.UserSessions
                .FirstOrDefaultAsync(s => s.UsuarioSessao == userSession && s.Ativo == 'S');

            if (session == null)
            {
                return Ok(new SessionValidationResponseDto
                {
                    IsValid = false,
                    Message = "Sessão não encontrada ou inativa"
                });
            }

            // Verificar timeout
            var timeoutHours = GetSessionTimeoutHours();
            var isExpired = DateTime.UtcNow > session.DtUltimoAcesso?.AddHours(timeoutHours);

            if (isExpired)
            {
                session.Ativo = 'N';
                await _context.SaveChangesAsync();

                return Ok(new SessionValidationResponseDto
                {
                    IsValid = false,
                    Message = "Sessão expirada"
                });
            }

            // Atualizar último acesso
            session.DtUltimoAcesso = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new SessionValidationResponseDto
            {
                IsValid = true,
                Username = session.IdUsuario,
                LoginTime = session.DtInicio,
                LastAccess = session.DtUltimoAcesso,
                ExpiresAt = session.DtUltimoAcesso?.AddHours(timeoutHours),
                Message = "Sessão válida"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro durante validação de sessão {SessionToken}", userSession);
            return StatusCode(500, new { error = "Erro interno do servidor" });
        }
    }

    /// <summary>
    /// Renova uma sessão existente
    /// </summary>
    /// <param name="userSession">Token de sessão atual</param>
    /// <returns>Nova sessão ou confirmação de renovação</returns>
    [HttpPost("renew-session")]
    public async Task<IActionResult> RenewSession([FromQuery] string userSession)
    {
        try
        {
            if (string.IsNullOrEmpty(userSession))
            {
                return BadRequest(new { error = "Token de sessão é obrigatório" });
            }

            var session = await _context.UserSessions
                .FirstOrDefaultAsync(s => s.UsuarioSessao == userSession && s.Ativo == 'S');

            if (session == null)
            {
                return Unauthorized(new { error = "Sessão inválida" });
            }

            // Atualizar último acesso para renovar sessão
            session.DtUltimoAcesso = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            _logger.LogInformation("Sessão renovada para usuário {Username} - Sessão {SessionToken}", 
                session.IdUsuario, userSession);

            return Ok(new
            {
                userSession = userSession,
                renewedAt = session.DtUltimoAcesso,
                expiresAt = session.DtUltimoAcesso?.AddHours(GetSessionTimeoutHours()),
                message = "Sessão renovada com sucesso"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro durante renovação de sessão {SessionToken}", userSession);
            return StatusCode(500, new { error = "Erro interno do servidor" });
        }
    }

    #region Métodos Privados

    private async Task<bool> ValidateUserCredentials(string username, string password)
    {
        // IMPLEMENTAR: Validação real de credenciais
        // Pode ser contra banco de dados, Active Directory, ou outro sistema
        
        // Exemplo simples (SUBSTITUIR por validação real):
        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            return false;

        // Aqui você implementaria a validação real:
        // - Consulta ao banco de usuários
        // - Verificação de hash de senha
        // - Validação contra Active Directory
        // - Etc.

        // Por enquanto, aceita qualquer usuário não vazio (APENAS PARA DESENVOLVIMENTO)
        return !string.IsNullOrWhiteSpace(username) && !string.IsNullOrWhiteSpace(password);
    }

    private string GenerateSessionToken()
    {
        // Gerar token único e seguro
        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        var randomBytes = new byte[16];
        using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
        }
        
        var randomString = Convert.ToBase64String(randomBytes)
            .Replace("+", "")
            .Replace("/", "")
            .Replace("=", "");

        return $"SESS_{timestamp}_{randomString}";
    }

    private string GenerateJwtToken(string username, string sessionToken)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim("session_token", sessionToken),
            new Claim(ClaimTypes.NameIdentifier, username),
            new Claim("jti", Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(GetSessionTimeoutHours()),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private string GetClientIpAddress()
    {
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        
        // Verificar se está atrás de proxy
        if (HttpContext.Request.Headers.ContainsKey("X-Forwarded-For"))
        {
            ipAddress = HttpContext.Request.Headers["X-Forwarded-For"].FirstOrDefault();
        }
        else if (HttpContext.Request.Headers.ContainsKey("X-Real-IP"))
        {
            ipAddress = HttpContext.Request.Headers["X-Real-IP"].FirstOrDefault();
        }

        return ipAddress ?? "Unknown";
    }

    private int GetSessionTimeoutHours()
    {
        return _configuration.GetValue<int>("SessionTimeoutHours", 8); // Default 8 horas
    }

    #endregion
}

