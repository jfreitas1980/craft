using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using CROSS.API.Controllers;
using CROSS.Application.Interfaces;
using CROSS.Application.DTOs.Responses;

namespace CROSS.API.Tests.Controllers;

public class TaxControllerTests
{
    private readonly Mock<ITaxService> _mockTaxService;
    private readonly Mock<ILogger<TaxController>> _mockLogger;
    private readonly TaxController _controller;

    public TaxControllerTests()
    {
        _mockTaxService = new Mock<ITaxService>();
        _mockLogger = new Mock<ILogger<TaxController>>();
        _controller = new TaxController(_mockTaxService.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task GetSelectedClasses_WithValidTaxId_ShouldReturnOk()
    {
        var taxId = "TAX001";
        var expectedResult = new List<TaxClassDto> { new TaxClassDto("O", "Origem") };
        _mockTaxService.Setup(s => s.GetSelectedClassesAsync(taxId))
                      .ReturnsAsync(expectedResult);

        var result = await _controller.GetSelectedClasses(taxId, "test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task GetSelectedClasses_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var taxId = "TAX001";
        _mockTaxService.Setup(s => s.GetSelectedClassesAsync(taxId))
                      .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.GetSelectedClasses(taxId, "test-session");

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public void GetAllClasses_ShouldReturnOk()
    {
        var expectedResult = new List<IdValueClassItemDto> 
        { 
            new IdValueClassItemDto("O", "Origem"),
            new IdValueClassItemDto("F", "Frete"),
            new IdValueClassItemDto("D", "Destino")
        };
        _mockTaxService.Setup(s => s.GetAllClasses())
                      .Returns(expectedResult);

        var result = _controller.GetAllClasses("test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public void GetAllClasses_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        _mockTaxService.Setup(s => s.GetAllClasses())
                      .Throws(new Exception("Service error"));

        var result = _controller.GetAllClasses("test-session");

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task GetTaxList_ShouldReturnOk()
    {
        var expectedResult = new List<ComboItemDto> { new ComboItemDto("TAX001", "Taxa Teste") };
        _mockTaxService.Setup(s => s.GetTaxListAsync())
                      .ReturnsAsync(expectedResult);

        var result = await _controller.GetTaxList("test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task GetTaxList_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        _mockTaxService.Setup(s => s.GetTaxListAsync())
                      .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.GetTaxList("test-session");

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task GetAllTaxesWithClasses_ShouldReturnOk()
    {
        var expectedResult = new List<IdValueClassItemDto> { new IdValueClassItemDto("TAX001", "Taxa Teste", "O,F,D") };
        _mockTaxService.Setup(s => s.GetAllTaxesWithClassesAsync())
                      .ReturnsAsync(expectedResult);

        var result = await _controller.GetAllTaxesWithClasses("test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task GetAllTaxesWithClasses_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        _mockTaxService.Setup(s => s.GetAllTaxesWithClassesAsync())
                      .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.GetAllTaxesWithClasses("test-session");

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task SearchByClass_WithValidClassId_ShouldReturnOk()
    {
        var classId = "O";
        var expectedResult = new List<IdValueClassItemDto> { new IdValueClassItemDto("TAX001", "Taxa Origem") };
        _mockTaxService.Setup(s => s.SearchByClassAsync(classId))
                      .ReturnsAsync(expectedResult);

        var result = await _controller.SearchByClass(classId, "test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task SearchByClass_WithNullClassId_ShouldReturnOk()
    {
        var expectedResult = new List<IdValueClassItemDto>();
        _mockTaxService.Setup(s => s.SearchByClassAsync(null))
                      .ReturnsAsync(expectedResult);

        var result = await _controller.SearchByClass(null, "test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task SearchByClass_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var classId = "O";
        _mockTaxService.Setup(s => s.SearchByClassAsync(classId))
                      .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.SearchByClass(classId, "test-session");

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task SearchByName_WithValidInitial_ShouldReturnOk()
    {
        var initial = "TAX";
        var expectedResult = new List<TaxItemDto> { new TaxItemDto("TAX001", "Taxa Teste") };
        _mockTaxService.Setup(s => s.SearchByNameAsync(initial))
                      .ReturnsAsync(expectedResult);

        var result = await _controller.SearchByName(initial, "test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task SearchByName_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var initial = "TAX";
        _mockTaxService.Setup(s => s.SearchByNameAsync(initial))
                      .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.SearchByName(initial, "test-session");

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task SearchByClassFilter_WithValidFilter_ShouldReturnOk()
    {
        var classFilter = "O";
        var expectedResult = new List<TaxItemDto> { new TaxItemDto("TAX001", "Taxa Origem") };
        _mockTaxService.Setup(s => s.SearchByClassFilterAsync(classFilter))
                      .ReturnsAsync(expectedResult);

        var result = await _controller.SearchByClassFilter(classFilter);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task SearchByClassFilter_WithNullFilter_ShouldReturnOk()
    {
        var expectedResult = new List<TaxItemDto>();
        _mockTaxService.Setup(s => s.SearchByClassFilterAsync(null))
                      .ReturnsAsync(expectedResult);

        var result = await _controller.SearchByClassFilter(null);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task SearchByClassFilter_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var classFilter = "O";
        _mockTaxService.Setup(s => s.SearchByClassFilterAsync(classFilter))
                      .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.SearchByClassFilter(classFilter);

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task GetTaxesForProposal_WithValidProposalId_ShouldReturnOk()
    {
        var proposalId = "PROP001";
        var classFilter = "O";
        var expectedResult = new List<TaxItemDto> { new TaxItemDto("TAX001", "Taxa Proposta") };
        _mockTaxService.Setup(s => s.GetTaxesForProposalAsync(proposalId, classFilter))
                      .ReturnsAsync(expectedResult);

        var result = await _controller.GetTaxesForProposal(proposalId, classFilter, "test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task GetTaxesForProposal_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var proposalId = "PROP001";
        _mockTaxService.Setup(s => s.GetTaxesForProposalAsync(proposalId, null))
                      .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.GetTaxesForProposal(proposalId, null, "test-session");

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }

    [Fact]
    public async Task SearchByClassAndName_WithValidParameters_ShouldReturnOk()
    {
        var initial = "TAX";
        var classId = "O";
        var expectedResult = new List<IdValueClassItemDto> { new IdValueClassItemDto("TAX001", "Taxa Origem") };
        _mockTaxService.Setup(s => s.SearchByClassAndNameAsync(initial, classId))
                      .ReturnsAsync(expectedResult);

        var result = await _controller.SearchByClassAndName(initial, classId, "test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task SearchByClassAndName_WithNullParameters_ShouldReturnOk()
    {
        var expectedResult = new List<IdValueClassItemDto>();
        _mockTaxService.Setup(s => s.SearchByClassAndNameAsync(null, null))
                      .ReturnsAsync(expectedResult);

        var result = await _controller.SearchByClassAndName(null, null, "test-session");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(expectedResult, okResult.Value);
    }

    [Fact]
    public async Task SearchByClassAndName_WhenServiceThrows_ShouldReturnInternalServerError()
    {
        var initial = "TAX";
        var classId = "O";
        _mockTaxService.Setup(s => s.SearchByClassAndNameAsync(initial, classId))
                      .ThrowsAsync(new Exception("Database error"));

        var result = await _controller.SearchByClassAndName(initial, classId, "test-session");

        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusResult.StatusCode);
    }
}
