using Microsoft.AspNetCore.Mvc;
using CROSS.Application.Interfaces;
using CROSS.API.Attributes;
using CROSS.Application.DTOs.Requests;

namespace CROSS.API.Controllers;

/// <summary>
/// Controller para operações relacionadas a cidades
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class CityController : ControllerBase
{
    private readonly ICityService _cityService;
    private readonly ILogger<CityController> _logger;

    /// <summary>
    /// Construtor do controller
    /// </summary>
    /// <param name="cityService">Serviço de cidades</param>
    /// <param name="logger">Logger</param>
    public CityController(ICityService cityService, ILogger<CityController> logger)
    {
        _cityService = cityService;
        _logger = logger;
    }

    /// <summary>
    /// Retorna código do país de uma cidade específica
    /// </summary>
    /// <param name="cityId">ID da cidade</param>
    /// <param name="userSession">Token de sessão do usuário</param>
    /// <returns>Código do país</returns>
    [HttpGet("country-code/{cityId}")]
    [ValidateSession]
    public async Task<IActionResult> GetCountryCode(string cityId, [FromQuery] string userSession)
    {
        try
        {
            var result = await _cityService.GetCountryCodeAsync(cityId);
            if (result == null)
            {
                return NotFound(new { error = "City not found" });
            }
            return Ok(new { countryCode = result });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting country code for city {CityId}", cityId);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Busca cidades por prefixo de nome e países opcionais
    /// </summary>
    /// <param name="request">Parâmetros de busca</param>
    /// <returns>Lista de cidades para comércio</returns>
    [HttpGet("search-trade")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> SearchByTrade([FromQuery] CitySearchRequestDto request)
    {
        try
        {
            var countryIds = request.GetCountryIdsList();
            var result = await _cityService.SearchByTradeAsync(request.CityNamePrefix, countryIds);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching cities by trade with prefix {Prefix}", request.CityNamePrefix);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Busca cidades para pontos de via, inclui "DIRECT SERVICE"
    /// </summary>
    /// <param name="request">Parâmetros de busca</param>
    /// <returns>Lista de cidades via</returns>
    [HttpGet("search-via")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> SearchViaPoints([FromQuery] CitySearchRequestDto request)
    {
        try
        {
            var countryIds = request.GetCountryIdsList();
            var result = await _cityService.SearchViaPointsAsync(request.CityNamePrefix, countryIds);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching via points with prefix {Prefix}", request.CityNamePrefix);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Retorna descrição formatada de uma cidade específica
    /// </summary>
    /// <param name="cityCode">Código da cidade</param>
    /// <param name="userSession">Token de sessão do usuário</param>
    /// <returns>Descrição formatada</returns>
    [HttpGet("description/{cityCode}")]
    [ValidateSession]
    public async Task<IActionResult> GetCityDescription(string cityCode, [FromQuery] string userSession)
    {
        try
        {
            var result = await _cityService.GetCityDescriptionAsync(cityCode);
            if (result == null)
            {
                return NotFound(new { error = "City not found" });
            }
            return Ok(new { description = result });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting city description for {CityCode}", cityCode);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Identifica cidades que podem servir como pontos via
    /// </summary>
    /// <param name="request">Parâmetros da proposta</param>
    /// <returns>Lista de pontos via possíveis</returns>
    [HttpGet("proposal-via-points")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> GetProposalViaPoints([FromQuery] ProposalRequestDto request)
    {
        try
        {
            if (string.IsNullOrEmpty(request.Pol) || string.IsNullOrEmpty(request.Pod) || 
                string.IsNullOrEmpty(request.Mode) || string.IsNullOrEmpty(request.ClientId))
            {
                return BadRequest(new { error = "POL, POD, Mode and ClientId are required" });
            }

            var result = await _cityService.GetProposalViaPointsAsync(request.Pol, request.Pod, request.Mode, request.ClientId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting proposal via points for {Pol}-{Pod}, mode {Mode}, client {ClientId}", 
                request.Pol, request.Pod, request.Mode, request.ClientId);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Localiza cidades que podem servir como origem em propostas
    /// </summary>
    /// <param name="request">Parâmetros da proposta</param>
    /// <returns>Lista de cidades de origem</returns>
    [HttpGet("proposal-origins")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> GetProposalOriginCities([FromQuery] ProposalRequestDto request)
    {
        try
        {
            if (string.IsNullOrEmpty(request.CityNamePrefix) || string.IsNullOrEmpty(request.Mode) || 
                string.IsNullOrEmpty(request.ClientId))
            {
                return BadRequest(new { error = "CityNamePrefix, Mode and ClientId are required" });
            }

            var result = await _cityService.GetProposalOriginCitiesAsync(
                request.CityNamePrefix, request.CountryId, request.Mode, request.ClientId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting proposal origin cities with prefix {Prefix}, mode {Mode}, client {ClientId}", 
                request.CityNamePrefix, request.Mode, request.ClientId);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    /// <summary>
    /// Localiza cidades que podem servir como destino em propostas
    /// </summary>
    /// <param name="request">Parâmetros da proposta</param>
    /// <returns>Lista de cidades de destino</returns>
    [HttpGet("proposal-destinations")]
    [ValidateSession(ReturnEmptyOnInvalid = true)]
    public async Task<IActionResult> GetProposalDestinationCities([FromQuery] ProposalRequestDto request)
    {
        try
        {
            if (string.IsNullOrEmpty(request.CityNamePrefix) || string.IsNullOrEmpty(request.Mode) || 
                string.IsNullOrEmpty(request.ClientId) || string.IsNullOrEmpty(request.Pol))
            {
                return BadRequest(new { error = "CityNamePrefix, Mode, ClientId and POL are required" });
            }

            var result = await _cityService.GetProposalDestinationCitiesAsync(
                request.CityNamePrefix, request.CountryId, request.Mode, request.ClientId, request.Pol);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting proposal destination cities with prefix {Prefix}, mode {Mode}, client {ClientId}, pol {Pol}", 
                request.CityNamePrefix, request.Mode, request.ClientId, request.Pol);
            return StatusCode(500, new { error = "Internal server error" });
        }
    }
}

