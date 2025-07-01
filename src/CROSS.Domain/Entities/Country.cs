namespace CROSS.Domain.Entities;

/// <summary>
/// Entidade que representa um país no sistema
/// </summary>
public class Country
{
    /// <summary>
    /// Sigla do país (código de 2 caracteres)
    /// </summary>
    public string Sigla { get; set; } = string.Empty;

    /// <summary>
    /// Nome descritivo do país
    /// </summary>
    public string Descricao { get; set; } = string.Empty;

    /// <summary>
    /// Coleção de cidades pertencentes ao país
    /// </summary>
    public ICollection<City> Cities { get; set; } = new List<City>();

    /// <summary>
    /// Construtor padrão
    /// </summary>
    public Country() { }

    /// <summary>
    /// Construtor com parâmetros
    /// </summary>
    /// <param name="sigla">Sigla do país</param>
    /// <param name="descricao">Descrição do país</param>
    public Country(string sigla, string descricao)
    {
        Sigla = sigla;
        Descricao = descricao;
    }

    /// <summary>
    /// Obtém o número de cidades ativas no país
    /// </summary>
    public int ActiveCitiesCount => Cities.Count(c => c.IsActive);

    /// <summary>
    /// Obtém as cidades ativas do país
    /// </summary>
    public IEnumerable<City> ActiveCities => Cities.Where(c => c.IsActive);
}

