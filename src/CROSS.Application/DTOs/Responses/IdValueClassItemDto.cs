namespace CROSS.Application.DTOs.Responses;

/// <summary>
/// DTO para resposta de item com ID, valor e classe
/// </summary>
public class IdValueClassItemDto
{
    /// <summary>
    /// Código/Identificador
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// Nome/Descrição/Valor
    /// </summary>
    public string? Value { get; set; }

    /// <summary>
    /// Classes associadas (concatenadas)
    /// </summary>
    public string? Classe { get; set; }

    /// <summary>
    /// Construtor padrão
    /// </summary>
    public IdValueClassItemDto() { }

    /// <summary>
    /// Construtor com parâmetros
    /// </summary>
    /// <param name="id">Código</param>
    /// <param name="value">Valor</param>
    /// <param name="classe">Classe</param>
    public IdValueClassItemDto(string id, string value, string? classe = null)
    {
        Id = id;
        Value = value;
        Classe = classe;
    }
}

