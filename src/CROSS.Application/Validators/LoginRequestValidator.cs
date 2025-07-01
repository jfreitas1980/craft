using FluentValidation;
using CROSS.Application.DTOs.Requests;

namespace CROSS.Application.Validators;

/// <summary>
/// Validador para requisições de login
/// </summary>
public class LoginRequestValidator : AbstractValidator<LoginRequestDto>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty()
            .WithMessage("Nome de usuário é obrigatório")
            .MinimumLength(3)
            .WithMessage("Nome de usuário deve ter pelo menos 3 caracteres")
            .MaximumLength(50)
            .WithMessage("Nome de usuário não pode ter mais de 50 caracteres")
            .Matches("^[a-zA-Z0-9._-]+$")
            .WithMessage("Nome de usuário contém caracteres inválidos");

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Senha é obrigatória")
            .MinimumLength(4)
            .WithMessage("Senha deve ter pelo menos 4 caracteres")
            .MaximumLength(100)
            .WithMessage("Senha não pode ter mais de 100 caracteres");

        RuleFor(x => x.ClientInfo)
            .MaximumLength(200)
            .WithMessage("Informações do cliente não podem ter mais de 200 caracteres");
    }
}

