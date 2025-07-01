using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using CROSS.API.Controllers;
using CROSS.Application.Interfaces;
using CROSS.Application.DTOs.Requests;
using CROSS.Application.DTOs.Responses;

namespace CROSS.API.Tests.Controllers;

public class CityControllerTests
{
    private readonly Mock<ICityService> _mockCityService;
    private readonly Mock<ILogger<CityController>> _mockLogger;
    private readonly CityController _controller;

    public CityControllerTests()
    {
        _mockCityService = new Mock<ICityService>();
        _mockLogger = new Mock<ILogger<CityController>>();
        _controller = new CityController(_mockCityService.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task GetCountryCode_WithValidCityId_ShouldReturnOk()
    {
        var cityId = "CITY001";
        var expectedCountryCode = "BR";
        _mockCityService.Setup(s => s.GetCountryCodeAsync(cityId))
                       .ReturnsAsync(expectedCountryCode);

        var result = await _controller.GetCountryCode(cityId, "test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public async Task GetCountryCode_WithInvalidCityId_ShouldReturnNotFound()
    {
        var cityId = "INVALID";
        _mockCityService.Setup(s => s.GetCountryCodeAsync(cityId))
                       .ReturnsAsync((string?)null);

        var result = await _controller.GetCountryCode(cityId, "test-session");

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task GetCountryCode_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var cityId = "CITY001";
        _mockCityService.Setup(s => s.GetCountryCodeAsync(cityId))
                       .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.GetCountryCode(cityId, "test-session");

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task SearchByTrade_WithValidRequest_ShouldReturnOk()
    {
        var request = new CitySearchRequestDto 
        { 
            CityNamePrefix = "SAO", 
            CountryIds = "BR,AR",
            UserSession = "test-session"
        };
        var expectedResult = new List<CityCountryTradeItemDto> { new CityCountryTradeItemDto("SAO", "São Paulo") };
        var countryIdsList = request.GetCountryIdsList().ToList();
        _mockCityService.Setup(s => s.SearchByTradeAsync(request.CityNamePrefix, countryIdsList))
                       .ReturnsAsync(expectedResult);

        var result = await _controller.SearchByTrade(request);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task SearchByTrade_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var request = new CitySearchRequestDto 
        { 
            CityNamePrefix = "SAO",
            UserSession = "test-session"
        };
        var countryIdsList = request.GetCountryIdsList().ToList();
        _mockCityService.Setup(s => s.SearchByTradeAsync(request.CityNamePrefix, countryIdsList))
                       .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.SearchByTrade(request);

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task SearchViaPoints_WithValidRequest_ShouldReturnOk()
    {
        var request = new CitySearchRequestDto 
        { 
            CityNamePrefix = "RIO", 
            CountryIds = "BR",
            UserSession = "test-session"
        };
        var expectedResult = new List<CityCountryTradeItemDto> 
        { 
            new CityCountryTradeItemDto("RIO", "Rio de Janeiro"),
            new CityCountryTradeItemDto("DIRECT", "DIRECT SERVICE")
        };
        var countryIdsList = request.GetCountryIdsList().ToList();
        _mockCityService.Setup(s => s.SearchViaPointsAsync(request.CityNamePrefix, countryIdsList))
                       .ReturnsAsync(expectedResult);

        var result = await _controller.SearchViaPoints(request);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task SearchViaPoints_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var request = new CitySearchRequestDto 
        { 
            CityNamePrefix = "RIO",
            UserSession = "test-session"
        };
        var countryIdsList = request.GetCountryIdsList().ToList();
        _mockCityService.Setup(s => s.SearchViaPointsAsync(request.CityNamePrefix, countryIdsList))
                       .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.SearchViaPoints(request);

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task GetCityDescription_WithValidCityCode_ShouldReturnOk()
    {
        var cityCode = "SAO";
        var expectedDescription = "São Paulo - SP - Brasil";
        _mockCityService.Setup(s => s.GetCityDescriptionAsync(cityCode))
                       .ReturnsAsync(expectedDescription);

        var result = await _controller.GetCityDescription(cityCode, "test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public async Task GetCityDescription_WithInvalidCityCode_ShouldReturnNotFound()
    {
        var cityCode = "INVALID";
        _mockCityService.Setup(s => s.GetCityDescriptionAsync(cityCode))
                       .ReturnsAsync((string?)null);

        var result = await _controller.GetCityDescription(cityCode, "test-session");

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task GetCityDescription_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var cityCode = "SAO";
        _mockCityService.Setup(s => s.GetCityDescriptionAsync(cityCode))
                       .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.GetCityDescription(cityCode, "test-session");

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task GetProposalViaPoints_WithValidRequest_ShouldReturnOk()
    {
        var request = new ProposalRequestDto 
        { 
            Pol = "SAO", 
            Pod = "NYC", 
            Mode = "AIR", 
            ClientId = "CLIENT001",
            UserSession = "test-session"
        };
        var expectedResult = new List<IdValueItemDto> { new IdValueItemDto("MIA", "Miami") };
        _mockCityService.Setup(s => s.GetProposalViaPointsAsync(request.Pol, request.Pod, request.Mode, request.ClientId))
                       .ReturnsAsync(expectedResult);

        var result = await _controller.GetProposalViaPoints(request);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task GetProposalViaPoints_WithMissingRequiredFields_ShouldReturnBadRequest()
    {
        var request = new ProposalRequestDto 
        { 
            Pol = "", 
            Pod = "NYC", 
            Mode = "AIR", 
            ClientId = "CLIENT001",
            UserSession = "test-session"
        };

        var result = await _controller.GetProposalViaPoints(request);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task GetProposalViaPoints_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var request = new ProposalRequestDto 
        { 
            Pol = "SAO", 
            Pod = "NYC", 
            Mode = "AIR", 
            ClientId = "CLIENT001",
            UserSession = "test-session"
        };
        _mockCityService.Setup(s => s.GetProposalViaPointsAsync(request.Pol, request.Pod, request.Mode, request.ClientId))
                       .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.GetProposalViaPoints(request);

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task GetProposalOriginCities_WithValidRequest_ShouldReturnOk()
    {
        var request = new ProposalRequestDto 
        { 
            CityNamePrefix = "SAO", 
            CountryId = "BR", 
            Mode = "AIR", 
            ClientId = "CLIENT001",
            UserSession = "test-session"
        };
        var expectedResult = new List<CityCountryTradeItemDto> { new CityCountryTradeItemDto("SAO", "São Paulo") };
        _mockCityService.Setup(s => s.GetProposalOriginCitiesAsync(request.CityNamePrefix, request.CountryId, request.Mode, request.ClientId))
                       .ReturnsAsync(expectedResult);

        var result = await _controller.GetProposalOriginCities(request);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task GetProposalOriginCities_WithMissingRequiredFields_ShouldReturnBadRequest()
    {
        var request = new ProposalRequestDto 
        { 
            CityNamePrefix = "", 
            Mode = "AIR", 
            ClientId = "CLIENT001",
            UserSession = "test-session"
        };

        var result = await _controller.GetProposalOriginCities(request);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task GetProposalOriginCities_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var request = new ProposalRequestDto 
        { 
            CityNamePrefix = "SAO", 
            Mode = "AIR", 
            ClientId = "CLIENT001",
            UserSession = "test-session"
        };
        _mockCityService.Setup(s => s.GetProposalOriginCitiesAsync(request.CityNamePrefix, request.CountryId, request.Mode, request.ClientId))
                       .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.GetProposalOriginCities(request);

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task GetProposalDestinationCities_WithValidRequest_ShouldReturnOk()
    {
        var request = new ProposalRequestDto 
        { 
            CityNamePrefix = "NYC", 
            CountryId = "US", 
            Mode = "AIR", 
            ClientId = "CLIENT001", 
            Pol = "SAO",
            UserSession = "test-session"
        };
        var expectedResult = new List<CityCountryTradeItemDto> { new CityCountryTradeItemDto("NYC", "New York") };
        _mockCityService.Setup(s => s.GetProposalDestinationCitiesAsync(request.CityNamePrefix, request.CountryId, request.Mode, request.ClientId, request.Pol))
                       .ReturnsAsync(expectedResult);

        var result = await _controller.GetProposalDestinationCities(request);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task GetProposalDestinationCities_WithMissingRequiredFields_ShouldReturnBadRequest()
    {
        var request = new ProposalRequestDto 
        { 
            CityNamePrefix = "NYC", 
            Mode = "AIR", 
            ClientId = "CLIENT001", 
            Pol = "",
            UserSession = "test-session"
        };

        var result = await _controller.GetProposalDestinationCities(request);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task GetProposalDestinationCities_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var request = new ProposalRequestDto 
        { 
            CityNamePrefix = "NYC", 
            Mode = "AIR", 
            ClientId = "CLIENT001", 
            Pol = "SAO",
            UserSession = "test-session"
        };
        _mockCityService.Setup(s => s.GetProposalDestinationCitiesAsync(request.CityNamePrefix, request.CountryId, request.Mode, request.ClientId, request.Pol))
                       .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.GetProposalDestinationCities(request);

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }
}
