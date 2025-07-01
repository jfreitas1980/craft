namespace CROSS.Application.DTOs.Requests;

/// <summary>
/// DTO para request de busca de cidades
/// </summary>
public class CitySearchRequestDto : BaseSessionRequestDto
{
    /// <summary>
    /// Prefixo do nome da cidade para busca
    /// </summary>
    public string CityNamePrefix { get; set; } = string.Empty;

    /// <summary>
    /// Lista de códigos de países separados por vírgula (opcional)
    /// </summary>
    public string? CountryIds { get; set; }

    /// <summary>
    /// Obtém a lista de códigos de países
    /// </summary>
    /// <returns>Lista de códigos de países ou lista vazia</returns>
    public IEnumerable<string> GetCountryIdsList()
    {
        if (string.IsNullOrEmpty(CountryIds))
            return Enumerable.Empty<string>();

        return CountryIds.Split(',', StringSplitOptions.RemoveEmptyEntries)
                        .Select(id => id.Trim())
                        .Where(id => !string.IsNullOrEmpty(id));
    }
}

