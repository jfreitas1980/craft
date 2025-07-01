namespace CROSS.Domain.Entities;

/// <summary>
/// Entidade que representa um cliente no sistema
/// </summary>
public class Client
{
    /// <summary>
    /// Identificador único do cliente
    /// </summary>
    public string IdCliente { get; set; } = string.Empty;

    /// <summary>
    /// Nome do cliente
    /// </summary>
    public string Nome { get; set; } = string.Empty;

    /// <summary>
    /// Tipo do cliente (código de 2 caracteres)
    /// </summary>
    public string Tipo { get; set; } = string.Empty;

    /// <summary>
    /// Construtor padrão
    /// </summary>
    public Client() { }

    /// <summary>
    /// Construtor com parâmetros
    /// </summary>
    /// <param name="idCliente">ID do cliente</param>
    /// <param name="nome">Nome do cliente</param>
    /// <param name="tipo">Tipo do cliente</param>
    public Client(string idCliente, string nome, string tipo)
    {
        IdCliente = idCliente;
        Nome = nome;
        Tipo = tipo;
    }

    /// <summary>
    /// Verifica se o cliente é de um tipo específico
    /// </summary>
    /// <param name="tipo">Tipo a verificar</param>
    /// <returns>True se o cliente é do tipo especificado</returns>
    public bool IsOfType(string tipo)
    {
        return string.Equals(Tipo, tipo, StringComparison.OrdinalIgnoreCase);
    }
}

