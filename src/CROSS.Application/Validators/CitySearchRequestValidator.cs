using FluentValidation;
using CROSS.Application.DTOs.Requests;

namespace CROSS.Application.Validators;

/// <summary>
/// Validador para requisições de busca de cidade
/// </summary>
public class CitySearchRequestValidator : AbstractValidator<CitySearchRequestDto>
{
    public CitySearchRequestValidator()
    {
        RuleFor(x => x.UserSession)
            .NotEmpty()
            .WithMessage("UserSession é obrigatório");

        RuleFor(x => x.CityNamePrefix)
            .NotEmpty()
            .WithMessage("CityNamePrefix é obrigatório")
            .MinimumLength(2)
            .WithMessage("CityNamePrefix deve ter pelo menos 2 caracteres")
            .MaximumLength(50)
            .WithMessage("CityNamePrefix não pode ter mais de 50 caracteres");

        RuleFor(x => x.CountryIds)
            .MaximumLength(100)
            .WithMessage("CountryIds não pode ter mais de 100 caracteres");
    }
}

