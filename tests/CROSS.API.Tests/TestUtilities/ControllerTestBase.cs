using Microsoft.EntityFrameworkCore;
using CROSS.Infrastructure.Data;

namespace CROSS.API.Tests.TestUtilities;

public abstract class ControllerTestBase
{
    protected CrossDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<CrossDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        return new CrossDbContext(options);
    }
}
