using AutoMapper;
using CROSS.Domain.Entities;
using CROSS.Application.DTOs.Responses;

namespace CROSS.Application.Mappings;

/// <summary>
/// Perfil de mapeamento do AutoMapper
/// </summary>
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Mapeamento de Tax para DTOs
        CreateMap<Tax, ComboItemDto>()
            .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.IdTaxa))
            .ForMember(dest => dest.DS, opt => opt.MapFrom(src => src.NmTaxa));

        CreateMap<Tax, IdValueClassItemDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.IdTaxa))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.NmTaxa))
            .ForMember(dest => dest.Classe, opt => opt.MapFrom(src => src.ClasseTaxa));

        CreateMap<Tax, TaxItemDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.IdTaxa))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.NmTaxa))
            .ForMember(dest => dest.Value2, opt => opt.Ignore());

        // Mapeamento de TaxClass para DTOs
        CreateMap<TaxClass, TaxClassDto>()
            .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.Classe.ToString()))
            .ForMember(dest => dest.DS, opt => opt.MapFrom(src => src.Descricao));

        // Mapeamento de City para DTOs
        CreateMap<City, ComboItemDto>()
            .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.IdCidade))
            .ForMember(dest => dest.DS, opt => opt.MapFrom(src => src.Descricao));

        CreateMap<City, IdValueItemDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.IdCidade))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Descricao));

        CreateMap<City, CityCountryTradeItemDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.IdCidade))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.GetFormattedDescription()))
            .ForMember(dest => dest.Pais, opt => opt.MapFrom(src => src.Pais))
            .ForMember(dest => dest.Uf, opt => opt.MapFrom(src => src.Uf))
            .ForMember(dest => dest.Iata, opt => opt.MapFrom(src => src.Airport != null ? src.Airport.Iata : null))
            .ForMember(dest => dest.Port, opt => opt.Ignore());

        // Mapeamento de Country para DTOs
        CreateMap<Country, ComboItemDto>()
            .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.Sigla))
            .ForMember(dest => dest.DS, opt => opt.MapFrom(src => src.Descricao));

        // Mapeamento de Client para DTOs
        CreateMap<Client, ComboItemDto>()
            .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.IdCliente))
            .ForMember(dest => dest.DS, opt => opt.MapFrom(src => src.Nome));

        // Mapeamento de ProposalTax para DTOs
        CreateMap<ProposalTax, TaxItemDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.IdTaxa))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Tax != null ? src.Tax.NmTaxa : string.Empty))
            .ForMember(dest => dest.Value2, opt => opt.MapFrom(src => src.Descricao));
    }
}

