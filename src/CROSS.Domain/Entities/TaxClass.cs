namespace CROSS.Domain.Entities;

/// <summary>
/// Entidade que representa uma classe de taxa
/// </summary>
public class TaxClass
{
    /// <summary>
    /// Código da classe de taxa (O, F, D)
    /// </summary>
    public char Classe { get; set; }

    /// <summary>
    /// Descrição da classe de taxa
    /// </summary>
    public string Descricao { get; set; } = string.Empty;

    /// <summary>
    /// Construtor padrão
    /// </summary>
    public TaxClass() { }

    /// <summary>
    /// Construtor com parâmetros
    /// </summary>
    /// <param name="classe">Código da classe</param>
    /// <param name="descricao">Descrição da classe</param>
    public TaxClass(char classe, string descricao)
    {
        Classe = classe;
        Descricao = descricao;
    }

    /// <summary>
    /// Verifica se é uma classe de origem
    /// </summary>
    public bool IsOrigin => Classe == 'O';

    /// <summary>
    /// Verifica se é uma classe de frete
    /// </summary>
    public bool IsFreight => Classe == 'F';

    /// <summary>
    /// Verifica se é uma classe de destino
    /// </summary>
    public bool IsDestination => Classe == 'D';

    /// <summary>
    /// Obtém as classes de taxa padrão do sistema
    /// </summary>
    /// <returns>Lista das classes de taxa padrão</returns>
    public static IEnumerable<TaxClass> GetDefaultClasses()
    {
        return new[]
        {
            new TaxClass('O', "Origem"),
            new TaxClass('F', "Frete"),
            new TaxClass('D', "Destino")
        };
    }
}

