using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CROSS.Application.Interfaces;
using CROSS.Infrastructure.Data;

namespace CROSS.Infrastructure.Services;

/// <summary>
/// Implementação do serviço de validação de sessão
/// </summary>
public class SessionValidationService : ISessionValidationService
{
    private readonly CrossDbContext _context;
    private readonly ILogger<SessionValidationService> _logger;

    /// <summary>
    /// Construtor do serviço
    /// </summary>
    /// <param name="context">Contexto do banco de dados</param>
    /// <param name="logger">Logger para registro de eventos</param>
    public SessionValidationService(CrossDbContext context, ILogger<SessionValidationService> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Valida se uma sessão de usuário está ativa e válida
    /// </summary>
    /// <param name="userSession">Token da sessão do usuário</param>
    /// <returns>True se a sessão é válida, False caso contrário</returns>
    public async Task<bool> ValidateSessionAsync(string userSession)
    {
        if (string.IsNullOrWhiteSpace(userSession))
        {
            _logger.LogWarning("Session validation failed: empty session token");
            return false;
        }

        try
        {
            var session = await _context.UserSessions
                .FirstOrDefaultAsync(s => s.UsuarioSessao == userSession && s.Ativo == 'S');

            if (session != null)
            {
                // Atualizar último acesso automaticamente
                session.UpdateLastAccess();
                await _context.SaveChangesAsync();
                
                _logger.LogInformation("Session validated successfully for user {UserId}", session.IdUsuario);
                return true;
            }

            _logger.LogWarning("Session validation failed: session {UserSession} not found or inactive", userSession);
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating session {UserSession}", userSession);
            return false;
        }
    }

    /// <summary>
    /// Obtém o ID do usuário a partir do token de sessão
    /// </summary>
    /// <param name="userSession">Token da sessão do usuário</param>
    /// <returns>ID do usuário ou string vazia se a sessão for inválida</returns>
    public async Task<string> GetUserIdFromSessionAsync(string userSession)
    {
        if (string.IsNullOrWhiteSpace(userSession))
            return string.Empty;

        try
        {
            var session = await _context.UserSessions
                .FirstOrDefaultAsync(s => s.UsuarioSessao == userSession && s.Ativo == 'S');
            
            return session?.IdUsuario ?? string.Empty;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user ID from session {UserSession}", userSession);
            return string.Empty;
        }
    }

    /// <summary>
    /// Atualiza o último acesso de uma sessão válida
    /// </summary>
    /// <param name="userSession">Token da sessão do usuário</param>
    /// <returns>True se a atualização foi bem-sucedida</returns>
    public async Task<bool> UpdateLastAccessAsync(string userSession)
    {
        if (string.IsNullOrWhiteSpace(userSession))
            return false;

        try
        {
            var session = await _context.UserSessions
                .FirstOrDefaultAsync(s => s.UsuarioSessao == userSession && s.Ativo == 'S');

            if (session != null)
            {
                session.UpdateLastAccess();
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating last access for session {UserSession}", userSession);
            return false;
        }
    }

    /// <summary>
    /// Desativa uma sessão de usuário
    /// </summary>
    /// <param name="userSession">Token da sessão do usuário</param>
    /// <returns>True se a desativação foi bem-sucedida</returns>
    public async Task<bool> DeactivateSessionAsync(string userSession)
    {
        if (string.IsNullOrWhiteSpace(userSession))
            return false;

        try
        {
            var session = await _context.UserSessions
                .FirstOrDefaultAsync(s => s.UsuarioSessao == userSession);

            if (session != null)
            {
                session.Deactivate();
                await _context.SaveChangesAsync();
                
                _logger.LogInformation("Session {UserSession} deactivated for user {UserId}", 
                    userSession, session.IdUsuario);
                return true;
            }

            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deactivating session {UserSession}", userSession);
            return false;
        }
    }
}

