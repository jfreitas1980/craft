namespace CROSS.Application.DTOs.Responses;

/// <summary>
/// DTO para resposta de item simples com ID e valor
/// </summary>
public class IdValueItemDto
{
    /// <summary>
    /// Código/Identificador
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// Descrição/Valor
    /// </summary>
    public string? Value { get; set; }

    /// <summary>
    /// Construtor padrão
    /// </summary>
    public IdValueItemDto() { }

    /// <summary>
    /// Construtor com parâmetros
    /// </summary>
    /// <param name="id">Código</param>
    /// <param name="value">Valor</param>
    public IdValueItemDto(string id, string value)
    {
        Id = id;
        Value = value;
    }
}

