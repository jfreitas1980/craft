using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CROSS.Application.DTOs.Responses;
using CROSS.Application.Interfaces;
using CROSS.Infrastructure.Data;

namespace CROSS.Infrastructure.Services;

/// <summary>
/// Implementação do serviço de cidades
/// </summary>
public class CityService : ICityService
{
    private readonly CrossDbContext _context;
    private readonly ILogger<CityService> _logger;

    /// <summary>
    /// Construtor do serviço
    /// </summary>
    /// <param name="context">Contexto do banco de dados</param>
    /// <param name="logger">Logger para registro de eventos</param>
    public CityService(CrossDbContext context, ILogger<CityService> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Retorna código do país de uma cidade específica
    /// </summary>
    /// <param name="cityId">ID da cidade</param>
    /// <returns>Código do país ou null se não encontrado</returns>
    public async Task<string?> GetCountryCodeAsync(string cityId)
    {
        try
        {
            var city = await _context.Cities
                .FirstOrDefaultAsync(c => c.IdCidade == cityId);

            return city?.Pais;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting country code for city {CityId}", cityId);
            return null;
        }
    }

    /// <summary>
    /// Busca cidades por prefixo de nome e países opcionais
    /// </summary>
    /// <param name="cityNamePrefix">Prefixo do nome da cidade</param>
    /// <param name="countryIds">Lista de IDs de países (opcional)</param>
    /// <returns>Lista de cidades para comércio</returns>
    public async Task<IEnumerable<CityCountryTradeItemDto>> SearchByTradeAsync(string cityNamePrefix, IEnumerable<string>? countryIds)
    {
        try
        {
            var query = from c in _context.Cities
                       join country in _context.Countries on c.Pais equals country.Sigla
                       where c.Ativo == 'S' && c.Descricao.ToUpper().StartsWith(cityNamePrefix.ToUpper())
                       select new { City = c, Country = country };

            if (countryIds != null && countryIds.Any())
            {
                var countryList = countryIds.ToList();
                query = query.Where(x => countryList.Contains(x.City.Pais));
            }

            var results = await query
                .Select(x => new CityCountryTradeItemDto
                {
                    Id = x.City.IdCidade,
                    Value = FormatCityDescription(x.City.Descricao, x.City.Uf, x.Country.Descricao),
                    Pais = x.City.Pais,
                    Uf = x.City.Uf
                })
                .ToListAsync();

            return results;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching cities by trade with prefix {Prefix}", cityNamePrefix);
            return Enumerable.Empty<CityCountryTradeItemDto>();
        }
    }

    /// <summary>
    /// Busca cidades para pontos de via, inclui "DIRECT SERVICE"
    /// </summary>
    /// <param name="cityNamePrefix">Prefixo do nome da cidade</param>
    /// <param name="countryIds">Lista de IDs de países (opcional)</param>
    /// <returns>Lista de cidades via</returns>
    public async Task<IEnumerable<CityCountryTradeItemDto>> SearchViaPointsAsync(string cityNamePrefix, IEnumerable<string>? countryIds)
    {
        try
        {
            var results = new List<CityCountryTradeItemDto>();

            // Adiciona "DIRECT SERVICE" se o prefixo corresponder
            if (cityNamePrefix.ToUpper().Contains("DIRE"))
            {
                results.Add(new CityCountryTradeItemDto("0", "DIRECT SERVICE"));
            }

            // Busca cidades normais
            var cityResults = await SearchByTradeAsync(cityNamePrefix, countryIds);
            results.AddRange(cityResults);

            return results.OrderBy(r => r.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching via points with prefix {Prefix}", cityNamePrefix);
            return Enumerable.Empty<CityCountryTradeItemDto>();
        }
    }

    /// <summary>
    /// Retorna descrição formatada de uma cidade específica
    /// </summary>
    /// <param name="cityCode">Código da cidade</param>
    /// <returns>Descrição formatada ou null se não encontrado</returns>
    public async Task<string?> GetCityDescriptionAsync(string cityCode)
    {
        try
        {
            var result = await (from c in _context.Cities
                               join country in _context.Countries on c.Pais equals country.Sigla
                               where c.IdCidade == cityCode
                               select new { City = c, Country = country })
                               .FirstOrDefaultAsync();

            if (result == null)
                return null;

            return FormatCityDescription(result.City.Descricao, result.City.Uf, result.Country.Descricao);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting city description for {CityCode}", cityCode);
            return null;
        }
    }

    /// <summary>
    /// Identifica cidades que podem servir como pontos via
    /// </summary>
    /// <param name="pol">Código da cidade de origem</param>
    /// <param name="pod">Código da cidade de destino</param>
    /// <param name="mode">Código do modal de transporte</param>
    /// <param name="clientId">Código do cliente</param>
    /// <returns>Lista de pontos via possíveis</returns>
    public async Task<IEnumerable<IdValueItemDto>> GetProposalViaPointsAsync(string pol, string pod, string mode, string clientId)
    {
        try
        {
            // Determinar tipo de cliente
            var client = await _context.Clients.FirstOrDefaultAsync(c => c.IdCliente == clientId);
            if (client == null)
                return Enumerable.Empty<IdValueItemDto>();

            var currentDate = DateTime.UtcNow;
            var viaCities = new List<string>();

            if (string.Equals(mode, "AIR", StringComparison.OrdinalIgnoreCase))
            {
                // Para modal aéreo, usar HCGS3000_AIRFR8
                viaCities = await _context.AirTariffs
                    .Where(at => at.Origem == pol && 
                                at.Destino == pod && 
                                at.TipoCliente == client.Tipo &&
                                at.DtValidadeInicio <= currentDate &&
                                at.DtValidadeFim >= currentDate &&
                                at.Ativo == 'S')
                    .Select(at => at.IdCidade)
                    .Distinct()
                    .ToListAsync();
            }
            else
            {
                // Para outros modais, usar HCGS3000
                viaCities = await _context.Tariffs
                    .Where(t => t.Origem == pol && 
                               t.Destino == pod && 
                               t.TipoCliente == client.Tipo &&
                               t.DtValidadeInicio <= currentDate &&
                               t.DtValidadeFim >= currentDate &&
                               t.Ativo == 'S' &&
                               t.Via != null)
                    .Select(t => t.Via!)
                    .Distinct()
                    .ToListAsync();
            }

            // Buscar detalhes das cidades
            var results = new List<IdValueItemDto>();
            foreach (var cityId in viaCities)
            {
                var description = await GetCityDescriptionAsync(cityId);
                if (!string.IsNullOrEmpty(description))
                {
                    results.Add(new IdValueItemDto(cityId, description));
                }
            }

            return results.OrderBy(r => r.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting proposal via points for {Pol}-{Pod}, mode {Mode}, client {ClientId}", 
                pol, pod, mode, clientId);
            return Enumerable.Empty<IdValueItemDto>();
        }
    }

    /// <summary>
    /// Localiza cidades que podem servir como origem em propostas
    /// </summary>
    /// <param name="cityNamePrefix">Prefixo do nome da cidade</param>
    /// <param name="countryId">Código do país (opcional)</param>
    /// <param name="mode">Código do modal de transporte</param>
    /// <param name="clientId">Código do cliente</param>
    /// <returns>Lista de cidades de origem</returns>
    public async Task<IEnumerable<CityCountryTradeItemDto>> GetProposalOriginCitiesAsync(string cityNamePrefix, string? countryId, string mode, string clientId)
    {
        try
        {
            // Determinar tipo de cliente
            var client = await _context.Clients.FirstOrDefaultAsync(c => c.IdCliente == clientId);
            if (client == null)
                return Enumerable.Empty<CityCountryTradeItemDto>();

            var currentDate = DateTime.UtcNow;
            var originCityIds = new List<string>();

            if (string.Equals(mode, "AIR", StringComparison.OrdinalIgnoreCase))
            {
                // Para modal aéreo
                originCityIds = await _context.AirTariffs
                    .Where(at => at.TipoCliente == client.Tipo &&
                                at.DtValidadeInicio <= currentDate &&
                                at.DtValidadeFim >= currentDate &&
                                at.Ativo == 'S')
                    .Select(at => at.Origem)
                    .Distinct()
                    .ToListAsync();
            }
            else
            {
                // Para outros modais
                originCityIds = await _context.Tariffs
                    .Where(t => t.TipoCliente == client.Tipo &&
                               t.DtValidadeInicio <= currentDate &&
                               t.DtValidadeFim >= currentDate &&
                               t.Ativo == 'S')
                    .Select(t => t.Origem)
                    .Distinct()
                    .ToListAsync();
            }

            // Filtrar cidades por nome e país
            var query = from c in _context.Cities
                       join country in _context.Countries on c.Pais equals country.Sigla
                       where c.Ativo == 'S' && 
                             originCityIds.Contains(c.IdCidade) &&
                             c.Descricao.ToUpper().StartsWith(cityNamePrefix.ToUpper())
                       select new { City = c, Country = country };

            if (!string.IsNullOrEmpty(countryId))
            {
                query = query.Where(x => x.City.Pais == countryId);
            }

            var results = await query
                .Select(x => new CityCountryTradeItemDto
                {
                    Id = x.City.IdCidade,
                    Value = FormatCityDescription(x.City.Descricao, x.City.Uf, x.Country.Descricao),
                    Pais = x.City.Pais,
                    Uf = x.City.Uf
                })
                .ToListAsync();

            // Para modal aéreo, incluir informações IATA se disponíveis
            if (string.Equals(mode, "AIR", StringComparison.OrdinalIgnoreCase))
            {
                foreach (var result in results)
                {
                    var airport = await _context.Airports
                        .FirstOrDefaultAsync(a => a.IdCidade == result.Id);
                    if (airport != null)
                    {
                        result.Iata = airport.Iata;
                    }
                }
            }

            return results.OrderBy(r => r.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting proposal origin cities with prefix {Prefix}, mode {Mode}, client {ClientId}", 
                cityNamePrefix, mode, clientId);
            return Enumerable.Empty<CityCountryTradeItemDto>();
        }
    }

    /// <summary>
    /// Localiza cidades que podem servir como destino em propostas
    /// </summary>
    /// <param name="cityNamePrefix">Prefixo do nome da cidade</param>
    /// <param name="countryId">Código do país (opcional)</param>
    /// <param name="mode">Código do modal de transporte</param>
    /// <param name="clientId">Código do cliente</param>
    /// <param name="pol">Código da cidade de origem</param>
    /// <returns>Lista de cidades de destino</returns>
    public async Task<IEnumerable<CityCountryTradeItemDto>> GetProposalDestinationCitiesAsync(string cityNamePrefix, string? countryId, string mode, string clientId, string pol)
    {
        try
        {
            // Determinar tipo de cliente
            var client = await _context.Clients.FirstOrDefaultAsync(c => c.IdCliente == clientId);
            if (client == null)
                return Enumerable.Empty<CityCountryTradeItemDto>();

            var currentDate = DateTime.UtcNow;
            var destinationCityIds = new List<string>();

            if (string.Equals(mode, "AIR", StringComparison.OrdinalIgnoreCase))
            {
                // Para modal aéreo
                destinationCityIds = await _context.AirTariffs
                    .Where(at => at.Origem == pol &&
                                at.TipoCliente == client.Tipo &&
                                at.DtValidadeInicio <= currentDate &&
                                at.DtValidadeFim >= currentDate &&
                                at.Ativo == 'S')
                    .Select(at => at.Destino)
                    .Distinct()
                    .ToListAsync();
            }
            else
            {
                // Para outros modais
                destinationCityIds = await _context.Tariffs
                    .Where(t => t.Origem == pol &&
                               t.TipoCliente == client.Tipo &&
                               t.DtValidadeInicio <= currentDate &&
                               t.DtValidadeFim >= currentDate &&
                               t.Ativo == 'S')
                    .Select(t => t.Destino)
                    .Distinct()
                    .ToListAsync();
            }

            // Filtrar cidades por nome e país
            var query = from c in _context.Cities
                       join country in _context.Countries on c.Pais equals country.Sigla
                       where c.Ativo == 'S' && 
                             destinationCityIds.Contains(c.IdCidade) &&
                             c.Descricao.ToUpper().StartsWith(cityNamePrefix.ToUpper())
                       select new { City = c, Country = country };

            if (!string.IsNullOrEmpty(countryId))
            {
                query = query.Where(x => x.City.Pais == countryId);
            }

            var results = await query
                .Select(x => new CityCountryTradeItemDto
                {
                    Id = x.City.IdCidade,
                    Value = FormatCityDescription(x.City.Descricao, x.City.Uf, x.Country.Descricao),
                    Pais = x.City.Pais,
                    Uf = x.City.Uf
                })
                .ToListAsync();

            // Para modal aéreo, incluir informações IATA se disponíveis
            if (string.Equals(mode, "AIR", StringComparison.OrdinalIgnoreCase))
            {
                foreach (var result in results)
                {
                    var airport = await _context.Airports
                        .FirstOrDefaultAsync(a => a.IdCidade == result.Id);
                    if (airport != null)
                    {
                        result.Iata = airport.Iata;
                    }
                }
            }

            return results.OrderBy(r => r.Value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting proposal destination cities with prefix {Prefix}, mode {Mode}, client {ClientId}, pol {Pol}", 
                cityNamePrefix, mode, clientId, pol);
            return Enumerable.Empty<CityCountryTradeItemDto>();
        }
    }

    /// <summary>
    /// Formata a descrição da cidade no padrão "Cidade(UF) - País"
    /// </summary>
    /// <param name="cityName">Nome da cidade</param>
    /// <param name="uf">Código UF</param>
    /// <param name="countryName">Nome do país</param>
    /// <returns>Descrição formatada</returns>
    private static string FormatCityDescription(string cityName, string? uf, string countryName)
    {
        var description = cityName;
        
        if (!string.IsNullOrEmpty(uf))
            description += $"({uf})";
        
        description += $" - {countryName}";
        
        return description;
    }
}

