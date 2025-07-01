namespace CROSS.Domain.Entities;

/// <summary>
/// Entidade que representa uma taxa aplicável no processo logístico
/// </summary>
public class Tax
{
    /// <summary>
    /// Identificador único da taxa
    /// </summary>
    public string IdTaxa { get; set; } = string.Empty;

    /// <summary>
    /// Nome descritivo da taxa
    /// </summary>
    public string NmTaxa { get; set; } = string.Empty;

    /// <summary>
    /// Classes de taxa concatenadas (ex: "OFD" para Origem, Frete, Destino)
    /// </summary>
    public string? ClasseTaxa { get; set; }

    /// <summary>
    /// Indica se a taxa está ativa (S) ou inativa (N)
    /// </summary>
    public char Ativo { get; set; } = 'S';

    /// <summary>
    /// Verifica se a taxa está ativa
    /// </summary>
    public bool IsActive => Ativo == 'S';

    /// <summary>
    /// Obtém as classes individuais da taxa
    /// </summary>
    /// <returns>Lista de códigos de classe</returns>
    public IEnumerable<char> GetTaxClasses()
    {
        if (string.IsNullOrEmpty(ClasseTaxa))
            return Enumerable.Empty<char>();

        return ClasseTaxa.ToCharArray().Distinct();
    }

    /// <summary>
    /// Verifica se a taxa possui uma classe específica
    /// </summary>
    /// <param name="classCode">Código da classe (O, F, D)</param>
    /// <returns>True se a taxa possui a classe especificada</returns>
    public bool HasClass(char classCode)
    {
        return !string.IsNullOrEmpty(ClasseTaxa) && 
               ClasseTaxa.Contains(classCode, StringComparison.OrdinalIgnoreCase);
    }

    /// <summary>
    /// Desativa a taxa
    /// </summary>
    public void Deactivate()
    {
        Ativo = 'N';
    }

    /// <summary>
    /// Ativa a taxa
    /// </summary>
    public void Activate()
    {
        Ativo = 'S';
    }
}

