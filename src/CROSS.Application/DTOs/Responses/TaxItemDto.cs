namespace CROSS.Application.DTOs.Responses;

/// <summary>
/// DTO para resposta de item de taxa
/// </summary>
public class TaxItemDto
{
    /// <summary>
    /// Código da taxa
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// Nome da taxa
    /// </summary>
    public string? Value { get; set; }

    /// <summary>
    /// Descrição adicional (usado em contextos específicos como propostas)
    /// </summary>
    public string? Value2 { get; set; }

    /// <summary>
    /// Construtor padrão
    /// </summary>
    public TaxItemDto() { }

    /// <summary>
    /// Construtor com parâmetros
    /// </summary>
    /// <param name="id">Código da taxa</param>
    /// <param name="value">Nome da taxa</param>
    /// <param name="value2">Descrição adicional</param>
    public TaxItemDto(string id, string value, string? value2 = null)
    {
        Id = id;
        Value = value;
        Value2 = value2;
    }
}

