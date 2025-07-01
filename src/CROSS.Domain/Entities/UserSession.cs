namespace CROSS.Domain.Entities;

/// <summary>
/// Entidade que representa uma sessão de usuário ativa no sistema
/// </summary>
public class UserSession
{
    /// <summary>
    /// Identificador único da sessão do usuário
    /// </summary>
    public string UsuarioSessao { get; set; } = string.Empty;

    /// <summary>
    /// Identificador do usuário proprietário da sessão
    /// </summary>
    public string IdUsuario { get; set; } = string.Empty;

    /// <summary>
    /// Data e hora de início da sessão
    /// </summary>
    public DateTime DtInicio { get; set; }

    /// <summary>
    /// Data e hora do último acesso registrado na sessão
    /// </summary>
    public DateTime? DtUltimoAcesso { get; set; }

    /// <summary>
    /// Endereço IP de origem da sessão
    /// </summary>
    public string? IpOrigem { get; set; }

    /// <summary>
    /// Indica se a sessão está ativa (S) ou inativa (N)
    /// </summary>
    public char Ativo { get; set; } = 'S';

    /// <summary>
    /// Verifica se a sessão está ativa
    /// </summary>
    public bool IsActive => Ativo == 'S';

    /// <summary>
    /// Atualiza o último acesso da sessão para o momento atual
    /// </summary>
    public void UpdateLastAccess()
    {
        DtUltimoAcesso = DateTime.UtcNow;
    }

    /// <summary>
    /// Desativa a sessão
    /// </summary>
    public void Deactivate()
    {
        Ativo = 'N';
    }
}

