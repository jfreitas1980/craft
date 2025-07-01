using CROSS.Application.DTOs.Responses;

namespace CROSS.Application.Interfaces;

/// <summary>
/// Interface para serviços relacionados a cidades
/// </summary>
public interface ICityService
{
    /// <summary>
    /// Retorna código do país de uma cidade específica
    /// </summary>
    /// <param name="cityId">ID da cidade</param>
    /// <returns>Código do país ou null se não encontrado</returns>
    Task<string?> GetCountryCodeAsync(string cityId);

    /// <summary>
    /// Busca cidades por prefixo de nome e países opcionais
    /// </summary>
    /// <param name="cityNamePrefix">Prefixo do nome da cidade</param>
    /// <param name="countryIds">Lista de IDs de países (opcional)</param>
    /// <returns>Lista de cidades para comércio</returns>
    Task<IEnumerable<CityCountryTradeItemDto>> SearchByTradeAsync(string cityNamePrefix, IEnumerable<string>? countryIds);

    /// <summary>
    /// Busca cidades para pontos de via, inclui "DIRECT SERVICE"
    /// </summary>
    /// <param name="cityNamePrefix">Prefixo do nome da cidade</param>
    /// <param name="countryIds">Lista de IDs de países (opcional)</param>
    /// <returns>Lista de cidades via</returns>
    Task<IEnumerable<CityCountryTradeItemDto>> SearchViaPointsAsync(string cityNamePrefix, IEnumerable<string>? countryIds);

    /// <summary>
    /// Retorna descrição formatada de uma cidade específica
    /// </summary>
    /// <param name="cityCode">Código da cidade</param>
    /// <returns>Descrição formatada ou null se não encontrado</returns>
    Task<string?> GetCityDescriptionAsync(string cityCode);

    /// <summary>
    /// Identifica cidades que podem servir como pontos via
    /// </summary>
    /// <param name="pol">Código da cidade de origem</param>
    /// <param name="pod">Código da cidade de destino</param>
    /// <param name="mode">Código do modal de transporte</param>
    /// <param name="clientId">Código do cliente</param>
    /// <returns>Lista de pontos via possíveis</returns>
    Task<IEnumerable<IdValueItemDto>> GetProposalViaPointsAsync(string pol, string pod, string mode, string clientId);

    /// <summary>
    /// Localiza cidades que podem servir como origem em propostas
    /// </summary>
    /// <param name="cityNamePrefix">Prefixo do nome da cidade</param>
    /// <param name="countryId">Código do país (opcional)</param>
    /// <param name="mode">Código do modal de transporte</param>
    /// <param name="clientId">Código do cliente</param>
    /// <returns>Lista de cidades de origem</returns>
    Task<IEnumerable<CityCountryTradeItemDto>> GetProposalOriginCitiesAsync(string cityNamePrefix, string? countryId, string mode, string clientId);

    /// <summary>
    /// Localiza cidades que podem servir como destino em propostas
    /// </summary>
    /// <param name="cityNamePrefix">Prefixo do nome da cidade</param>
    /// <param name="countryId">Código do país (opcional)</param>
    /// <param name="mode">Código do modal de transporte</param>
    /// <param name="clientId">Código do cliente</param>
    /// <param name="pol">Código da cidade de origem</param>
    /// <returns>Lista de cidades de destino</returns>
    Task<IEnumerable<CityCountryTradeItemDto>> GetProposalDestinationCitiesAsync(string cityNamePrefix, string? countryId, string mode, string clientId, string pol);
}

