namespace CROSS.Application.DTOs.Responses;

/// <summary>
/// DTO para resposta de item de combo/lista
/// </summary>
public class ComboItemDto
{
    /// <summary>
    /// Código/Identificador
    /// </summary>
    public string? ID { get; set; }

    /// <summary>
    /// Descrição
    /// </summary>
    public string? DS { get; set; }

    /// <summary>
    /// Construtor padrão
    /// </summary>
    public ComboItemDto() { }

    /// <summary>
    /// Construtor com parâmetros
    /// </summary>
    /// <param name="id">Código</param>
    /// <param name="description">Descrição</param>
    public ComboItemDto(string id, string description)
    {
        ID = id;
        DS = description;
    }
}

