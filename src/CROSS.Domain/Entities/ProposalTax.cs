namespace CROSS.Domain.Entities;

/// <summary>
/// Entidade que representa uma taxa associada a uma proposta
/// </summary>
public class ProposalTax
{
    /// <summary>
    /// Identificador da proposta
    /// </summary>
    public string IdProposta { get; set; } = string.Empty;

    /// <summary>
    /// Identificador da taxa
    /// </summary>
    public string IdTaxa { get; set; } = string.Empty;

    /// <summary>
    /// Descrição específica da taxa na proposta
    /// </summary>
    public string? Descricao { get; set; }

    /// <summary>
    /// Valor da taxa na proposta
    /// </summary>
    public decimal? Valor { get; set; }

    /// <summary>
    /// Moeda do valor da taxa
    /// </summary>
    public string? Moeda { get; set; }

    /// <summary>
    /// Navegação para a taxa
    /// </summary>
    public Tax? Tax { get; set; }

    /// <summary>
    /// Construtor padrão
    /// </summary>
    public ProposalTax() { }

    /// <summary>
    /// Construtor com parâmetros
    /// </summary>
    /// <param name="idProposta">ID da proposta</param>
    /// <param name="idTaxa">ID da taxa</param>
    public ProposalTax(string idProposta, string idTaxa)
    {
        IdProposta = idProposta;
        IdTaxa = idTaxa;
    }

    /// <summary>
    /// Verifica se a taxa possui valor definido
    /// </summary>
    public bool HasValue => Valor.HasValue && Valor.Value > 0;

    /// <summary>
    /// Obtém o valor formatado com moeda
    /// </summary>
    /// <returns>Valor formatado ou string vazia se não houver valor</returns>
    public string GetFormattedValue()
    {
        if (!HasValue)
            return string.Empty;

        var currency = string.IsNullOrEmpty(Moeda) ? "" : $" {Moeda}";
        return $"{Valor:N2}{currency}";
    }
}

