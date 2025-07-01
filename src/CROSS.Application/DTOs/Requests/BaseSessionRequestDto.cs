namespace CROSS.Application.DTOs.Requests;

/// <summary>
/// DTO base para requests que requerem validação de sessão
/// </summary>
public abstract class BaseSessionRequestDto
{
    /// <summary>
    /// Identificador da sessão do usuário
    /// </summary>
    public string UserSession { get; set; } = string.Empty;
}

