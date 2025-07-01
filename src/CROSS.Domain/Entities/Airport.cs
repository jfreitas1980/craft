namespace CROSS.Domain.Entities;

/// <summary>
/// Entidade que representa um aeroporto associado a uma cidade
/// </summary>
public class Airport
{
    /// <summary>
    /// Identificador da cidade onde está localizado o aeroporto
    /// </summary>
    public string IdCidade { get; set; } = string.Empty;

    /// <summary>
    /// Código IATA do aeroporto (3 caracteres)
    /// </summary>
    public string? Iata { get; set; }

    /// <summary>
    /// Nome do aeroporto
    /// </summary>
    public string? Nome { get; set; }

    /// <summary>
    /// Navegação para a cidade
    /// </summary>
    public City? City { get; set; }

    /// <summary>
    /// Construtor padrão
    /// </summary>
    public Airport() { }

    /// <summary>
    /// Construtor com parâmetros
    /// </summary>
    /// <param name="idCidade">ID da cidade</param>
    /// <param name="iata">Código IATA</param>
    /// <param name="nome">Nome do aeroporto</param>
    public Airport(string idCidade, string? iata, string? nome)
    {
        IdCidade = idCidade;
        Iata = iata;
        Nome = nome;
    }

    /// <summary>
    /// Verifica se o aeroporto possui código IATA válido
    /// </summary>
    public bool HasValidIata => !string.IsNullOrEmpty(Iata) && Iata.Length == 3;

    /// <summary>
    /// Obtém a descrição completa do aeroporto
    /// </summary>
    /// <returns>Descrição no formato "Nome (IATA)" ou apenas o nome se não houver IATA</returns>
    public string GetFullDescription()
    {
        if (string.IsNullOrEmpty(Nome))
            return Iata ?? string.Empty;

        if (HasValidIata)
            return $"{Nome} ({Iata})";

        return Nome;
    }
}

