namespace CROSS.Domain.Entities;

/// <summary>
/// Entidade que representa uma cidade no sistema
/// </summary>
public class City
{
    /// <summary>
    /// Identificador único da cidade
    /// </summary>
    public string IdCidade { get; set; } = string.Empty;

    /// <summary>
    /// Nome descritivo da cidade
    /// </summary>
    public string Descricao { get; set; } = string.Empty;

    /// <summary>
    /// Código do estado/província (UF)
    /// </summary>
    public string? Uf { get; set; }

    /// <summary>
    /// Código do país (sigla de 2 caracteres)
    /// </summary>
    public string Pais { get; set; } = string.Empty;

    /// <summary>
    /// Indica se a cidade está ativa (S) ou inativa (N)
    /// </summary>
    public char Ativo { get; set; } = 'S';

    /// <summary>
    /// Navegação para o país
    /// </summary>
    public Country? Country { get; set; }

    /// <summary>
    /// Navegação para informações de aeroporto (se aplicável)
    /// </summary>
    public Airport? Airport { get; set; }

    /// <summary>
    /// Verifica se a cidade está ativa
    /// </summary>
    public bool IsActive => Ativo == 'S';

    /// <summary>
    /// Obtém a descrição formatada da cidade
    /// </summary>
    /// <returns>Descrição no formato "Cidade(UF) - País"</returns>
    public string GetFormattedDescription()
    {
        var description = Descricao;
        
        if (!string.IsNullOrEmpty(Uf))
            description += $"({Uf})";
        
        if (Country != null)
            description += $" - {Country.Descricao}";
        
        return description;
    }

    /// <summary>
    /// Verifica se a cidade possui aeroporto
    /// </summary>
    public bool HasAirport => Airport != null && !string.IsNullOrEmpty(Airport.Iata);

    /// <summary>
    /// Desativa a cidade
    /// </summary>
    public void Deactivate()
    {
        Ativo = 'N';
    }

    /// <summary>
    /// Ativa a cidade
    /// </summary>
    public void Activate()
    {
        Ativo = 'S';
    }
}

