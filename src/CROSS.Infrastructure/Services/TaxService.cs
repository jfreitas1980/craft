using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CROSS.Application.DTOs.Responses;
using CROSS.Application.Interfaces;
using CROSS.Infrastructure.Data;

namespace CROSS.Infrastructure.Services;

/// <summary>
/// Implementação do serviço de taxas
/// </summary>
public class TaxService : ITaxService
{
    private readonly CrossDbContext _context;
    private readonly ILogger<TaxService> _logger;

    /// <summary>
    /// Construtor do serviço
    /// </summary>
    /// <param name="context">Contexto do banco de dados</param>
    /// <param name="logger">Logger para registro de eventos</param>
    public TaxService(CrossDbContext context, ILogger<TaxService> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Obtém classes de taxa associadas a um ID de taxa específico
    /// </summary>
    /// <param name="taxId">ID da taxa</param>
    /// <returns>Lista de classes de taxa</returns>
    public async Task<IEnumerable<TaxClassDto>> GetSelectedClassesAsync(string taxId)
    {
        try
        {
            var tax = await _context.Taxes
                .FirstOrDefaultAsync(t => t.IdTaxa == taxId);

            if (tax == null || string.IsNullOrEmpty(tax.ClasseTaxa))
                return Enumerable.Empty<TaxClassDto>();

            var classIds = tax.GetTaxClasses();
            var result = new List<TaxClassDto>();

            foreach (var classId in classIds)
            {
                var taxClass = await _context.TaxClasses
                    .FirstOrDefaultAsync(tc => tc.Classe == classId);

                if (taxClass != null)
                {
                    result.Add(new TaxClassDto(classId.ToString(), taxClass.Descricao));
                }
            }

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting selected classes for tax {TaxId}", taxId);
            return Enumerable.Empty<TaxClassDto>();
        }
    }

    /// <summary>
    /// Obtém todas as classes de taxa disponíveis (dados fixos)
    /// </summary>
    /// <returns>Lista de classes de taxa</returns>
    public IEnumerable<IdValueClassItemDto> GetAllClasses()
    {
        return new[]
        {
            new IdValueClassItemDto("O", "Origem"),
            new IdValueClassItemDto("F", "Frete"),
            new IdValueClassItemDto("D", "Destino")
        };
    }

    /// <summary>
    /// Lista completa de códigos e nomes de taxas cadastradas
    /// </summary>
    /// <returns>Lista de taxas para combo</returns>
    public async Task<IEnumerable<ComboItemDto>> GetTaxListAsync()
    {
        try
        {
            return await _context.Taxes
                .Where(t => t.Ativo == 'S')
                .OrderBy(t => t.NmTaxa)
                .Select(t => new ComboItemDto(t.IdTaxa, t.NmTaxa))
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting tax list");
            return Enumerable.Empty<ComboItemDto>();
        }
    }

    /// <summary>
    /// Obtém todas as taxas com suas classes concatenadas
    /// </summary>
    /// <returns>Lista de taxas com classes</returns>
    public async Task<IEnumerable<IdValueClassItemDto>> GetAllTaxesWithClassesAsync()
    {
        try
        {
            return await _context.Taxes
                .Where(t => t.Ativo == 'S')
                .OrderBy(t => t.NmTaxa)
                .Select(t => new IdValueClassItemDto(t.IdTaxa, t.NmTaxa, t.ClasseTaxa))
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all taxes with classes");
            return Enumerable.Empty<IdValueClassItemDto>();
        }
    }

    /// <summary>
    /// Busca taxas filtrando por classe específica
    /// </summary>
    /// <param name="classId">Código da classe (opcional)</param>
    /// <returns>Lista de taxas filtradas</returns>
    public async Task<IEnumerable<IdValueClassItemDto>> SearchByClassAsync(string? classId)
    {
        try
        {
            var query = _context.Taxes.Where(t => t.Ativo == 'S');

            if (!string.IsNullOrEmpty(classId))
            {
                query = query.Where(t => t.ClasseTaxa != null && t.ClasseTaxa.Contains(classId));
            }

            return await query
                .OrderBy(t => t.NmTaxa)
                .Select(t => new IdValueClassItemDto(t.IdTaxa, t.NmTaxa, t.ClasseTaxa))
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching taxes by class {ClassId}", classId);
            return Enumerable.Empty<IdValueClassItemDto>();
        }
    }

    /// <summary>
    /// Busca taxas cujo nome comece com string específica
    /// </summary>
    /// <param name="initial">Prefixo do nome da taxa</param>
    /// <returns>Lista de taxas filtradas</returns>
    public async Task<IEnumerable<TaxItemDto>> SearchByNameAsync(string initial)
    {
        try
        {
            return await _context.Taxes
                .Where(t => t.Ativo == 'S' && t.NmTaxa.ToUpper().StartsWith(initial.ToUpper()))
                .OrderBy(t => t.NmTaxa)
                .Select(t => new TaxItemDto { Id = t.IdTaxa, Value = t.NmTaxa })
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching taxes by name starting with {Initial}", initial);
            return Enumerable.Empty<TaxItemDto>();
        }
    }

    /// <summary>
    /// Filtra taxas por classe sem validação de sessão
    /// </summary>
    /// <param name="classFilter">Filtro de classe (opcional)</param>
    /// <returns>Lista de taxas filtradas</returns>
    public async Task<IEnumerable<TaxItemDto>> SearchByClassFilterAsync(string? classFilter)
    {
        try
        {
            var query = _context.Taxes.Where(t => t.Ativo == 'S');

            if (!string.IsNullOrEmpty(classFilter))
            {
                query = query.Where(t => t.ClasseTaxa != null && t.ClasseTaxa.Contains(classFilter));
            }

            return await query
                .OrderBy(t => t.NmTaxa)
                .Select(t => new TaxItemDto { Id = t.IdTaxa, Value = t.NmTaxa })
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching taxes by class filter {ClassFilter}", classFilter);
            return Enumerable.Empty<TaxItemDto>();
        }
    }

    /// <summary>
    /// Recupera taxas associadas a uma proposta específica
    /// </summary>
    /// <param name="proposalId">ID da proposta</param>
    /// <param name="classFilter">Filtro de classe (opcional)</param>
    /// <returns>Lista de taxas da proposta</returns>
    public async Task<IEnumerable<TaxItemDto>> GetTaxesForProposalAsync(string proposalId, string? classFilter)
    {
        try
        {
            var query = from pt in _context.ProposalTaxes
                       join t in _context.Taxes on pt.IdTaxa equals t.IdTaxa
                       where pt.IdProposta == proposalId
                       select new { ProposalTax = pt, Tax = t };

            if (!string.IsNullOrEmpty(classFilter))
            {
                query = query.Where(x => x.Tax.ClasseTaxa != null && x.Tax.ClasseTaxa.Contains(classFilter));
            }

            return await query
                .Select(x => new TaxItemDto(x.Tax.IdTaxa, x.Tax.NmTaxa, x.ProposalTax.Descricao))
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting taxes for proposal {ProposalId}", proposalId);
            return Enumerable.Empty<TaxItemDto>();
        }
    }

    /// <summary>
    /// Busca taxas combinando filtros de classe e nome
    /// </summary>
    /// <param name="initial">Prefixo do nome da taxa (opcional)</param>
    /// <param name="classId">ID da classe (opcional)</param>
    /// <returns>Lista de taxas filtradas</returns>
    public async Task<IEnumerable<IdValueClassItemDto>> SearchByClassAndNameAsync(string? initial, string? classId)
    {
        try
        {
            var query = _context.Taxes.Where(t => t.Ativo == 'S');

            if (!string.IsNullOrEmpty(initial))
            {
                query = query.Where(t => t.NmTaxa.ToUpper().StartsWith(initial.ToUpper()));
            }

            if (!string.IsNullOrEmpty(classId))
            {
                query = query.Where(t => t.ClasseTaxa != null && t.ClasseTaxa.Contains(classId));
            }

            return await query
                .OrderBy(t => t.NmTaxa)
                .Select(t => new IdValueClassItemDto(t.IdTaxa, t.NmTaxa, t.ClasseTaxa))
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching taxes by class {ClassId} and name {Initial}", classId, initial);
            return Enumerable.Empty<IdValueClassItemDto>();
        }
    }
}

