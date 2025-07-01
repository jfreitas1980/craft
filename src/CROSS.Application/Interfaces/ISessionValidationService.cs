namespace CROSS.Application.Interfaces;

/// <summary>
/// Interface para serviço de validação de sessão de usuário
/// </summary>
public interface ISessionValidationService
{
    /// <summary>
    /// Valida se uma sessão de usuário está ativa e válida
    /// </summary>
    /// <param name="userSession">Token da sessão do usuário</param>
    /// <returns>True se a sessão é válida, False caso contrário</returns>
    Task<bool> ValidateSessionAsync(string userSession);

    /// <summary>
    /// Obtém o ID do usuário a partir do token de sessão
    /// </summary>
    /// <param name="userSession">Token da sessão do usuário</param>
    /// <returns>ID do usuário ou string vazia se a sessão for inválida</returns>
    Task<string> GetUserIdFromSessionAsync(string userSession);

    /// <summary>
    /// Atualiza o último acesso de uma sessão válida
    /// </summary>
    /// <param name="userSession">Token da sessão do usuário</param>
    /// <returns>True se a atualização foi bem-sucedida</returns>
    Task<bool> UpdateLastAccessAsync(string userSession);

    /// <summary>
    /// Desativa uma sessão de usuário
    /// </summary>
    /// <param name="userSession">Token da sessão do usuário</param>
    /// <returns>True se a desativação foi bem-sucedida</returns>
    Task<bool> DeactivateSessionAsync(string userSession);
}

