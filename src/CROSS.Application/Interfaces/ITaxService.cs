using CROSS.Application.DTOs.Responses;

namespace CROSS.Application.Interfaces;

/// <summary>
/// Interface para serviços relacionados a taxas
/// </summary>
public interface ITaxService
{
    /// <summary>
    /// Obtém classes de taxa associadas a um ID de taxa específico
    /// </summary>
    /// <param name="taxId">ID da taxa</param>
    /// <returns>Lista de classes de taxa</returns>
    Task<IEnumerable<TaxClassDto>> GetSelectedClassesAsync(string taxId);

    /// <summary>
    /// Obtém todas as classes de taxa disponíveis (dados fixos)
    /// </summary>
    /// <returns>Lista de classes de taxa</returns>
    IEnumerable<IdValueClassItemDto> GetAllClasses();

    /// <summary>
    /// Lista completa de códigos e nomes de taxas cadastradas
    /// </summary>
    /// <returns>Lista de taxas para combo</returns>
    Task<IEnumerable<ComboItemDto>> GetTaxListAsync();

    /// <summary>
    /// Obtém todas as taxas com suas classes concatenadas
    /// </summary>
    /// <returns>Lista de taxas com classes</returns>
    Task<IEnumerable<IdValueClassItemDto>> GetAllTaxesWithClassesAsync();

    /// <summary>
    /// Busca taxas filtrando por classe específica
    /// </summary>
    /// <param name="classId">Código da classe (opcional)</param>
    /// <returns>Lista de taxas filtradas</returns>
    Task<IEnumerable<IdValueClassItemDto>> SearchByClassAsync(string? classId);

    /// <summary>
    /// Busca taxas cujo nome comece com string específica
    /// </summary>
    /// <param name="initial">Prefixo do nome da taxa</param>
    /// <returns>Lista de taxas filtradas</returns>
    Task<IEnumerable<TaxItemDto>> SearchByNameAsync(string initial);

    /// <summary>
    /// Filtra taxas por classe sem validação de sessão
    /// </summary>
    /// <param name="classFilter">Filtro de classe (opcional)</param>
    /// <returns>Lista de taxas filtradas</returns>
    Task<IEnumerable<TaxItemDto>> SearchByClassFilterAsync(string? classFilter);

    /// <summary>
    /// Recupera taxas associadas a uma proposta específica
    /// </summary>
    /// <param name="proposalId">ID da proposta</param>
    /// <param name="classFilter">Filtro de classe (opcional)</param>
    /// <returns>Lista de taxas da proposta</returns>
    Task<IEnumerable<TaxItemDto>> GetTaxesForProposalAsync(string proposalId, string? classFilter);

    /// <summary>
    /// Busca taxas combinando filtros de classe e nome
    /// </summary>
    /// <param name="initial">Prefixo do nome da taxa (opcional)</param>
    /// <param name="classId">ID da classe (opcional)</param>
    /// <returns>Lista de taxas filtradas</returns>
    Task<IEnumerable<IdValueClassItemDto>> SearchByClassAndNameAsync(string? initial, string? classId);
}

