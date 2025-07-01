namespace CROSS.Application.DTOs.Requests;

/// <summary>
/// DTO para requests relacionados a propostas
/// </summary>
public class ProposalRequestDto : BaseSessionRequestDto
{
    /// <summary>
    /// Código da cidade de origem (POL - Port of Loading)
    /// </summary>
    public string? Pol { get; set; }

    /// <summary>
    /// Código da cidade de destino (POD - Port of Discharge)
    /// </summary>
    public string? Pod { get; set; }

    /// <summary>
    /// Código do modal de transporte
    /// </summary>
    public string? Mode { get; set; }

    /// <summary>
    /// Código do cliente
    /// </summary>
    public string? ClientId { get; set; }

    /// <summary>
    /// Prefixo do nome da cidade (para buscas)
    /// </summary>
    public string? CityNamePrefix { get; set; }

    /// <summary>
    /// Código do país (opcional)
    /// </summary>
    public string? CountryId { get; set; }

    /// <summary>
    /// Verifica se é modal aéreo
    /// </summary>
    public bool IsAirMode => string.Equals(Mode, "AIR", StringComparison.OrdinalIgnoreCase);
}

