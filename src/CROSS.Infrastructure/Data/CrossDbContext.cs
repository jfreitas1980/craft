using Microsoft.EntityFrameworkCore;
using CROSS.Domain.Entities;

namespace CROSS.Infrastructure.Data;

/// <summary>
/// Contexto do Entity Framework para o sistema CROSS
/// </summary>
public class CrossDbContext : DbContext
{
    /// <summary>
    /// Construtor do contexto
    /// </summary>
    /// <param name="options">Opções de configuração do contexto</param>
    public CrossDbContext(DbContextOptions<CrossDbContext> options) : base(options)
    {
    }

    // DbSets para as entidades
    public DbSet<UserSession> UserSessions { get; set; }
    public DbSet<Tax> Taxes { get; set; }
    public DbSet<TaxClass> TaxClasses { get; set; }
    public DbSet<City> Cities { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<Tariff> Tariffs { get; set; }
    public DbSet<AirTariff> AirTariffs { get; set; }
    public DbSet<Airport> Airports { get; set; }
    public DbSet<ProposalTax> ProposalTaxes { get; set; }

    /// <summary>
    /// Configuração do modelo de dados
    /// </summary>
    /// <param name="modelBuilder">Builder do modelo</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuração da entidade UserSession
        modelBuilder.Entity<UserSession>(entity =>
        {
            entity.ToTable("CSAG311");
            entity.HasKey(e => e.UsuarioSessao);
            entity.Property(e => e.UsuarioSessao)
                .HasMaxLength(50)
                .IsRequired();
            entity.Property(e => e.IdUsuario)
                .HasMaxLength(20)
                .IsRequired();
            entity.Property(e => e.DtInicio)
                .IsRequired();
            entity.Property(e => e.DtUltimoAcesso);
            entity.Property(e => e.IpOrigem)
                .HasMaxLength(15);
            entity.Property(e => e.Ativo)
                .HasMaxLength(1)
                .HasDefaultValue('S')
                .IsRequired();

            // Índices
            entity.HasIndex(e => e.Ativo)
                .HasDatabaseName("IX_CSAG311_ATIVO");
        });

        // Configuração da entidade Tax
        modelBuilder.Entity<Tax>(entity =>
        {
            entity.ToTable("HCGS3001");
            entity.HasKey(e => e.IdTaxa);
            entity.Property(e => e.IdTaxa)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.NmTaxa)
                .HasMaxLength(100)
                .IsRequired();
            entity.Property(e => e.ClasseTaxa)
                .HasMaxLength(10);
            entity.Property(e => e.Ativo)
                .HasMaxLength(1)
                .HasDefaultValue('S')
                .IsRequired();

            // Índices
            entity.HasIndex(e => e.Ativo)
                .HasDatabaseName("IX_HCGS3001_ATIVO");
            entity.HasIndex(e => e.ClasseTaxa)
                .HasDatabaseName("IX_HCGS3001_CLASSE_TAXA");
            entity.HasIndex(e => e.NmTaxa)
                .HasDatabaseName("IX_HCGS3001_NM_TAXA");
        });

        // Configuração da entidade TaxClass
        modelBuilder.Entity<TaxClass>(entity =>
        {
            entity.ToTable("CCGS221");
            entity.HasKey(e => e.Classe);
            entity.Property(e => e.Classe)
                .HasMaxLength(1)
                .IsRequired();
            entity.Property(e => e.Descricao)
                .HasMaxLength(50)
                .IsRequired();
        });

        // Configuração da entidade Country
        modelBuilder.Entity<Country>(entity =>
        {
            entity.ToTable("CSAG329");
            entity.HasKey(e => e.Sigla);
            entity.Property(e => e.Sigla)
                .HasMaxLength(2)
                .IsRequired();
            entity.Property(e => e.Descricao)
                .HasMaxLength(100)
                .IsRequired();
        });

        // Configuração da entidade City
        modelBuilder.Entity<City>(entity =>
        {
            entity.ToTable("CSAG325");
            entity.HasKey(e => e.IdCidade);
            entity.Property(e => e.IdCidade)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.Descricao)
                .HasMaxLength(100)
                .IsRequired();
            entity.Property(e => e.Uf)
                .HasMaxLength(5);
            entity.Property(e => e.Pais)
                .HasMaxLength(2)
                .IsRequired();
            entity.Property(e => e.Ativo)
                .HasMaxLength(1)
                .HasDefaultValue('S')
                .IsRequired();

            // Relacionamento com Country
            entity.HasOne(e => e.Country)
                .WithMany(c => c.Cities)
                .HasForeignKey(e => e.Pais)
                .HasConstraintName("FK_CSAG325_PAIS");

            // Relacionamento com Airport
            entity.HasOne(e => e.Airport)
                .WithOne(a => a.City)
                .HasForeignKey<Airport>(a => a.IdCidade)
                .HasConstraintName("FK_HSAG325_AIR_CIDADE");

            // Índices
            entity.HasIndex(e => e.Ativo)
                .HasDatabaseName("IX_CSAG325_ATIVO");
            entity.HasIndex(e => e.Descricao)
                .HasDatabaseName("IX_CSAG325_DESCRICAO");
            entity.HasIndex(e => e.Pais)
                .HasDatabaseName("IX_CSAG325_PAIS");
        });

        // Configuração da entidade Client
        modelBuilder.Entity<Client>(entity =>
        {
            entity.ToTable("CSAG340");
            entity.HasKey(e => e.IdCliente);
            entity.Property(e => e.IdCliente)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.Nome)
                .HasMaxLength(200)
                .IsRequired();
            entity.Property(e => e.Tipo)
                .HasMaxLength(2)
                .IsRequired();
        });

        // Configuração da entidade Airport
        modelBuilder.Entity<Airport>(entity =>
        {
            entity.ToTable("HSAG325_AIR");
            entity.HasKey(e => e.IdCidade);
            entity.Property(e => e.IdCidade)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.Iata)
                .HasMaxLength(3);
            entity.Property(e => e.Nome)
                .HasMaxLength(100);
        });

        // Configuração da entidade Tariff
        modelBuilder.Entity<Tariff>(entity =>
        {
            entity.ToTable("HCGS3000");
            entity.HasKey(e => e.IdTarifa);
            entity.Property(e => e.IdTarifa)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.Origem)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.Destino)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.Via)
                .HasMaxLength(10);
            entity.Property(e => e.Modal)
                .HasMaxLength(5);
            entity.Property(e => e.TipoCliente)
                .HasMaxLength(2)
                .IsRequired();
            entity.Property(e => e.DtValidadeInicio)
                .IsRequired();
            entity.Property(e => e.DtValidadeFim)
                .IsRequired();
            entity.Property(e => e.Ativo)
                .HasMaxLength(1)
                .HasDefaultValue('S')
                .IsRequired();

            // Relacionamentos
            entity.HasOne(e => e.OriginCity)
                .WithMany()
                .HasForeignKey(e => e.Origem)
                .HasConstraintName("FK_HCGS3000_ORIGEM")
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.DestinationCity)
                .WithMany()
                .HasForeignKey(e => e.Destino)
                .HasConstraintName("FK_HCGS3000_DESTINO")
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.ViaCity)
                .WithMany()
                .HasForeignKey(e => e.Via)
                .HasConstraintName("FK_HCGS3000_VIA")
                .OnDelete(DeleteBehavior.Restrict);

            // Índices
            entity.HasIndex(e => new { e.Origem, e.Destino })
                .HasDatabaseName("IX_HCGS3000_ORIGEM_DESTINO");
            entity.HasIndex(e => new { e.DtValidadeInicio, e.DtValidadeFim })
                .HasDatabaseName("IX_HCGS3000_VALIDADE");
        });

        // Configuração da entidade AirTariff
        modelBuilder.Entity<AirTariff>(entity =>
        {
            entity.ToTable("HCGS3000_AIRFR8");
            entity.HasKey(e => e.IdTarifa);
            entity.Property(e => e.IdTarifa)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.Origem)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.Destino)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.IdCidade)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.TipoCliente)
                .HasMaxLength(2)
                .IsRequired();
            entity.Property(e => e.DtValidadeInicio)
                .IsRequired();
            entity.Property(e => e.DtValidadeFim)
                .IsRequired();
            entity.Property(e => e.Ativo)
                .HasMaxLength(1)
                .HasDefaultValue('S')
                .IsRequired();

            // Relacionamentos
            entity.HasOne(e => e.OriginCity)
                .WithMany()
                .HasForeignKey(e => e.Origem)
                .HasConstraintName("FK_HCGS3000_AIRFR8_ORIGEM")
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.DestinationCity)
                .WithMany()
                .HasForeignKey(e => e.Destino)
                .HasConstraintName("FK_HCGS3000_AIRFR8_DESTINO")
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.AssociatedCity)
                .WithMany()
                .HasForeignKey(e => e.IdCidade)
                .HasConstraintName("FK_HCGS3000_AIRFR8_CIDADE")
                .OnDelete(DeleteBehavior.Restrict);

            // Índices
            entity.HasIndex(e => new { e.Origem, e.Destino })
                .HasDatabaseName("IX_HCGS3000_AIRFR8_ORIGEM_DESTINO");
        });

        // Configuração da entidade ProposalTax
        modelBuilder.Entity<ProposalTax>(entity =>
        {
            entity.ToTable("HCGS3006");
            entity.HasKey(e => new { e.IdProposta, e.IdTaxa });
            entity.Property(e => e.IdProposta)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.IdTaxa)
                .HasMaxLength(10)
                .IsRequired();
            entity.Property(e => e.Descricao)
                .HasMaxLength(200);
            entity.Property(e => e.Valor)
                .HasPrecision(15, 2);
            entity.Property(e => e.Moeda)
                .HasMaxLength(3);

            // Relacionamento com Tax
            entity.HasOne(e => e.Tax)
                .WithMany()
                .HasForeignKey(e => e.IdTaxa)
                .HasConstraintName("FK_HCGS3006_TAXA")
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}

