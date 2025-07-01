namespace CROSS.Application.DTOs.Requests;

/// <summary>
/// DTO para requisição de login
/// </summary>
public class LoginRequestDto
{
    /// <summary>
    /// Nome de usuário
    /// </summary>
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Senha do usuário
    /// </summary>
    public string Password { get; set; } = string.Empty;

    /// <summary>
    /// Informações adicionais do cliente (opcional)
    /// </summary>
    public string? ClientInfo { get; set; }

    /// <summary>
    /// Indica se a sessão deve ser lembrada por mais tempo
    /// </summary>
    public bool RememberMe { get; set; } = false;
}

