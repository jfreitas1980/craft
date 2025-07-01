using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using CROSS.Infrastructure.Data;
using CROSS.Infrastructure.Services;
using CROSS.Domain.Entities;

namespace CROSS.UnitTests;

public class TaxServiceTests
{
    private CrossDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<CrossDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        return new CrossDbContext(options);
    }

    [Fact]
    public void GetAllClasses_ShouldReturnThreeClasses()
    {
        // Arrange
        var mockLogger = new Mock<ILogger<TaxService>>();
        using var context = GetInMemoryDbContext();
        var service = new TaxService(context, mockLogger.Object);

        // Act
        var result = service.GetAllClasses();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(3, result.Count());
        //Assert.Contains(result, x => x.ID == "O" && x.DS == "Origem");
        //Assert.Contains(result, x => x.ID == "F" && x.DS == "Frete");
        //Assert.Contains(result, x => x.ID == "D" && x.DS == "Destino");
    }

    [Fact]
    public async Task GetTaxListAsync_WithEmptyDatabase_ShouldReturnEmptyList()
    {
        // Arrange
        var mockLogger = new Mock<ILogger<TaxService>>();
        using var context = GetInMemoryDbContext();
        var service = new TaxService(context, mockLogger.Object);

        // Act
        var result = await service.GetTaxListAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public async Task GetTaxListAsync_WithTaxes_ShouldReturnTaxList()
    {
        // Arrange
        var mockLogger = new Mock<ILogger<TaxService>>();
        using var context = GetInMemoryDbContext();
        
        // Add sample data
        context.Taxes.AddRange(
            new Tax { IdTaxa = "TAX001", NmTaxa = "Taxa Teste 1", Ativo = 'S' },
            new Tax { IdTaxa = "TAX002", NmTaxa = "Taxa Teste 2", Ativo = 'S' },
            new Tax { IdTaxa = "TAX003", NmTaxa = "Taxa Inativa", Ativo = 'N' }
        );
        await context.SaveChangesAsync();

        var service = new TaxService(context, mockLogger.Object);

        // Act
        var result = await service.GetTaxListAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count()); // Only active taxes
        Assert.All(result, tax => Assert.NotEmpty(tax.DS));
    }
}