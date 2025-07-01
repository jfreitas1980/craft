namespace CROSS.Application.DTOs.Responses;

/// <summary>
/// DTO para resposta de classe de taxa
/// </summary>
public class TaxClassDto
{
    /// <summary>
    /// Código da classe de taxa
    /// </summary>
    public string? ID { get; set; }

    /// <summary>
    /// Descrição da classe de taxa
    /// </summary>
    public string? DS { get; set; }

    /// <summary>
    /// Construtor padrão
    /// </summary>
    public TaxClassDto() { }

    /// <summary>
    /// Construtor com parâmetros
    /// </summary>
    /// <param name="id">Código da classe</param>
    /// <param name="description">Descrição da classe</param>
    public TaxClassDto(string id, string description)
    {
        ID = id;
        DS = description;
    }
}

