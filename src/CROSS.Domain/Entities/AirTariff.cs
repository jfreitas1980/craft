namespace CROSS.Domain.Entities;

/// <summary>
/// Entidade que representa um tarifário aéreo no sistema
/// </summary>
public class AirTariff
{
    /// <summary>
    /// Identificador único do tarifário aéreo
    /// </summary>
    public string IdTarifa { get; set; } = string.Empty;

    /// <summary>
    /// Código da cidade de origem
    /// </summary>
    public string Origem { get; set; } = string.Empty;

    /// <summary>
    /// Código da cidade de destino
    /// </summary>
    public string Destino { get; set; } = string.Empty;

    /// <summary>
    /// Código da cidade associada (para modal aéreo)
    /// </summary>
    public string IdCidade { get; set; } = string.Empty;

    /// <summary>
    /// Tipo de cliente aplicável
    /// </summary>
    public string TipoCliente { get; set; } = string.Empty;

    /// <summary>
    /// Data de início da validade do tarifário
    /// </summary>
    public DateTime DtValidadeInicio { get; set; }

    /// <summary>
    /// Data de fim da validade do tarifário
    /// </summary>
    public DateTime DtValidadeFim { get; set; }

    /// <summary>
    /// Indica se o tarifário está ativo (S) ou inativo (N)
    /// </summary>
    public char Ativo { get; set; } = 'S';

    /// <summary>
    /// Navegação para cidade de origem
    /// </summary>
    public City? OriginCity { get; set; }

    /// <summary>
    /// Navegação para cidade de destino
    /// </summary>
    public City? DestinationCity { get; set; }

    /// <summary>
    /// Navegação para cidade associada
    /// </summary>
    public City? AssociatedCity { get; set; }

    /// <summary>
    /// Verifica se o tarifário está ativo
    /// </summary>
    public bool IsActive => Ativo == 'S';

    /// <summary>
    /// Verifica se o tarifário está válido na data especificada
    /// </summary>
    /// <param name="date">Data para verificação</param>
    /// <returns>True se o tarifário está válido na data</returns>
    public bool IsValidOn(DateTime date)
    {
        return IsActive && 
               date >= DtValidadeInicio && 
               date <= DtValidadeFim;
    }

    /// <summary>
    /// Verifica se o tarifário está válido atualmente
    /// </summary>
    public bool IsCurrentlyValid => IsValidOn(DateTime.UtcNow);

    /// <summary>
    /// Verifica se o tarifário é aplicável para um tipo de cliente
    /// </summary>
    /// <param name="clientType">Tipo do cliente</param>
    /// <returns>True se aplicável</returns>
    public bool IsApplicableForClientType(string clientType)
    {
        return string.Equals(TipoCliente, clientType, StringComparison.OrdinalIgnoreCase);
    }
}

