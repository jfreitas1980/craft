namespace CROSS.Application.DTOs.Responses;

/// <summary>
/// DTO para resposta de item de cidade com informações de país e comércio
/// </summary>
public class CityCountryTradeItemDto
{
    /// <summary>
    /// Código da cidade
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// Descrição formatada da cidade
    /// </summary>
    public string? Value { get; set; }

    /// <summary>
    /// Código do país
    /// </summary>
    public string? Pais { get; set; }

    /// <summary>
    /// Código do estado/província (UF)
    /// </summary>
    public string? Uf { get; set; }

    /// <summary>
    /// Código IATA (para aeroportos)
    /// </summary>
    public string? Iata { get; set; }

    /// <summary>
    /// Informação de porto
    /// </summary>
    public string? Port { get; set; }

    /// <summary>
    /// Construtor padrão
    /// </summary>
    public CityCountryTradeItemDto() { }

    /// <summary>
    /// Construtor com parâmetros básicos
    /// </summary>
    /// <param name="id">Código da cidade</param>
    /// <param name="value">Descrição formatada</param>
    /// <param name="pais">Código do país</param>
    /// <param name="uf">Código UF</param>
    public CityCountryTradeItemDto(string id, string value, string? pais = null, string? uf = null)
    {
        Id = id;
        Value = value;
        Pais = pais;
        Uf = uf;
    }
}

