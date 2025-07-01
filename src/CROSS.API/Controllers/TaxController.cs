using Microsoft.AspNetCore.Mvc;
using CROSS.Application.Interfaces;
using CROSS.API.Attributes;

namespace CROSS.API.Controllers;

/// <summary>
/// Controller para operações relacionadas a taxas
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TaxController : ControllerBase
{
    private readonly ITaxService _taxService;
    private readonly ILogger<TaxController> _logger;

    /// <summary>
    /// Construtor do controller
    /// </summary>
    /// <param name="taxService">Serviço de taxas</param>
    /// <param name="logger">Logger</param>
    public TaxController(ITaxService taxService, ILogger<TaxController> logger)
    {
        _taxService = taxService;
        _logger = logger;
    }

    /// <summary>
    /// Obtém classes de taxa associadas a um ID de taxa específico
    /// </summary>
    /// <param name="taxId">ID da taxa</param>
    /// <param name="userSession">Token de sessão do usuário</param>
    /// <returns>Lista de classes de taxa</returns>
    [HttpGet("selected-classes/{taxId}")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> GetSelectedClasses(string taxId, [FromQuery] string userSession)
    {
        try
        {
            var result = await _taxService.GetSelectedClassesAsync(taxId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting selected classes for tax {TaxId}", taxId);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Obtém todas as classes de taxa disponíveis (dados fixos)
    /// </summary>
    /// <param name="userSession">Token de sessão do usuário</param>
    /// <returns>Lista de classes de taxa</returns>
    [HttpGet("all-classes")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public IActionResult GetAllClasses([FromQuery] string userSession)
    {
        try
        {
            var result = _taxService.GetAllClasses();
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all tax classes");
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Lista completa de códigos e nomes de taxas cadastradas
    /// </summary>
    /// <param name="userSession">Token de sessão do usuário</param>
    /// <returns>Lista de taxas para combo</returns>
    [HttpGet("list")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> GetTaxList([FromQuery] string userSession)
    {
        try
        {
            var result = await _taxService.GetTaxListAsync();
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting tax list");
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Obtém todas as taxas com suas classes concatenadas
    /// </summary>
    /// <param name="userSession">Token de sessão do usuário</param>
    /// <returns>Lista de taxas com classes</returns>
    [HttpGet("all-with-classes")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> GetAllTaxesWithClasses([FromQuery] string userSession)
    {
        try
        {
            var result = await _taxService.GetAllTaxesWithClassesAsync();
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all taxes with classes");
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Busca taxas filtrando por classe específica
    /// </summary>
    /// <param name="classId">Código da classe (opcional)</param>
    /// <param name="userSession">Token de sessão do usuário</param>
    /// <returns>Lista de taxas filtradas</returns>
    [HttpGet("search-by-class")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> SearchByClass([FromQuery] string? classId, [FromQuery] string userSession)
    {
        try
        {
            var result = await _taxService.SearchByClassAsync(classId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching taxes by class {ClassId}", classId);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Busca taxas cujo nome comece com string específica
    /// </summary>
    /// <param name="initial">Prefixo do nome da taxa</param>
    /// <param name="userSession">Token de sessão do usuário</param>
    /// <returns>Lista de taxas filtradas</returns>
    [HttpGet("search-by-name/{initial}")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> SearchByName(string initial, [FromQuery] string userSession)
    {
        try
        {
            var result = await _taxService.SearchByNameAsync(initial);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching taxes by name starting with {Initial}", initial);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Filtra taxas por classe sem validação de sessão
    /// </summary>
    /// <param name="classFilter">Filtro de classe (opcional)</param>
    /// <returns>Lista de taxas filtradas</returns>
    [HttpGet("search-by-class-filter")]
    public async Task<IActionResult> SearchByClassFilter([FromQuery] string? classFilter)
    {
        try
        {
            var result = await _taxService.SearchByClassFilterAsync(classFilter);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching taxes by class filter {ClassFilter}", classFilter);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Recupera taxas associadas a uma proposta específica
    /// </summary>
    /// <param name="proposalId">ID da proposta</param>
    /// <param name="classFilter">Filtro de classe (opcional)</param>
    /// <param name="userSession">Token de sessão do usuário</param>
    /// <returns>Lista de taxas da proposta</returns>
    [HttpGet("proposal/{proposalId}")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> GetTaxesForProposal(string proposalId, [FromQuery] string? classFilter, [FromQuery] string userSession)
    {
        try
        {
            var result = await _taxService.GetTaxesForProposalAsync(proposalId, classFilter);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting taxes for proposal {ProposalId}", proposalId);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Busca taxas combinando filtros de classe e nome
    /// </summary>
    /// <param name="initial">Prefixo do nome da taxa (opcional)</param>
    /// <param name="classId">ID da classe (opcional)</param>
    /// <param name="userSession">Token de sessão do usuário</param>
    /// <returns>Lista de taxas filtradas</returns>
    [HttpGet("search-combined")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> SearchByClassAndName([FromQuery] string? initial, [FromQuery] string? classId, [FromQuery] string userSession)
    {
        try
        {
            var result = await _taxService.SearchByClassAndNameAsync(initial, classId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching taxes by class {ClassId} and name {Initial}", classId, initial);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }
}

