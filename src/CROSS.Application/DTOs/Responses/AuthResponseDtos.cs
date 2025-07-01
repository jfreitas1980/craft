namespace CROSS.Application.DTOs.Responses;

/// <summary>
/// DTO para resposta de login
/// </summary>
public class LoginResponseDto
{
    /// <summary>
    /// Token de sessão para usar em outros endpoints
    /// </summary>
    public string UserSession { get; set; } = string.Empty;

    /// <summary>
    /// Token JWT (opcional, para autenticação adicional)
    /// </summary>
    public string? JwtToken { get; set; }

    /// <summary>
    /// Nome do usuário logado
    /// </summary>
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Data/hora do login
    /// </summary>
    public DateTime LoginTime { get; set; }

    /// <summary>
    /// Data/hora de expiração da sessão
    /// </summary>
    public DateTime ExpiresAt { get; set; }

    /// <summary>
    /// Mensagem de sucesso
    /// </summary>
    public string Message { get; set; } = string.Empty;
}

/// <summary>
/// DTO para resposta de validação de sessão
/// </summary>
public class SessionValidationResponseDto
{
    /// <summary>
    /// Indica se a sessão é válida
    /// </summary>
    public bool IsValid { get; set; }

    /// <summary>
    /// Nome do usuário (se sessão válida)
    /// </summary>
    public string? Username { get; set; }

    /// <summary>
    /// Data/hora do login original
    /// </summary>
    public DateTime? LoginTime { get; set; }

    /// <summary>
    /// Data/hora do último acesso
    /// </summary>
    public DateTime? LastAccess { get; set; }

    /// <summary>
    /// Data/hora de expiração
    /// </summary>
    public DateTime? ExpiresAt { get; set; }

    /// <summary>
    /// Mensagem explicativa
    /// </summary>
    public string Message { get; set; } = string.Empty;
}

