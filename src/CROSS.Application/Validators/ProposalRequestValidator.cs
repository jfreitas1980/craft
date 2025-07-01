using FluentValidation;
using CROSS.Application.DTOs.Requests;

namespace CROSS.Application.Validators;

/// <summary>
/// Validador para requisições de proposta
/// </summary>
public class ProposalRequestValidator : AbstractValidator<ProposalRequestDto>
{
    public ProposalRequestValidator()
    {
        RuleFor(x => x.UserSession)
            .NotEmpty()
            .WithMessage("UserSession é obrigatório");

        RuleFor(x => x.Pol)
            .MaximumLength(10)
            .WithMessage("POL não pode ter mais de 10 caracteres");

        RuleFor(x => x.Pod)
            .MaximumLength(10)
            .WithMessage("POD não pode ter mais de 10 caracteres");

        RuleFor(x => x.Mode)
            .MaximumLength(5)
            .WithMessage("Mode não pode ter mais de 5 caracteres");

        RuleFor(x => x.ClientId)
            .MaximumLength(10)
            .WithMessage("ClientId não pode ter mais de 10 caracteres");

        RuleFor(x => x.CityNamePrefix)
            .MaximumLength(50)
            .WithMessage("CityNamePrefix não pode ter mais de 50 caracteres");

        RuleFor(x => x.CountryId)
            .MaximumLength(2)
            .WithMessage("CountryId deve ter no máximo 2 caracteres");
    }
}

