using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using CROSS.Application.Interfaces;

namespace CROSS.API.Attributes;

/// <summary>
/// Atributo para validação automática de sessão em endpoints
/// </summary>
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
public class ValidateSessionAttribute : ActionFilterAttribute
{
    /// <summary>
    /// Nome do parâmetro que contém o token de sessão
    /// </summary>
    public string SessionParameterName { get; set; } = "userSession";

    /// <summary>
    /// Se true, retorna lista vazia em caso de sessão inválida ao invés de 401
    /// </summary>
    public bool ReturnEmptyOnInvalid { get; set; } = false;

    /// <summary>
    /// Executa a validação de sessão antes da execução da action
    /// </summary>
    /// <param name="context">Contexto da execução da action</param>
    /// <param name="next">Próximo delegado na pipeline</param>
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var sessionValidationService = context.HttpContext.RequestServices
            .GetRequiredService<ISessionValidationService>();

        // Tenta obter o token de sessão dos parâmetros da query ou do body
        var userSession = GetSessionToken(context);

        if (string.IsNullOrWhiteSpace(userSession))
        {
            if (ReturnEmptyOnInvalid)
            {
                context.Result = new OkObjectResult(new List<object>());
                return;
            }

            context.Result = new BadRequestObjectResult(new { error = "UserSession parameter is required" });
            return;
        }

        var isValid = await sessionValidationService.ValidateSessionAsync(userSession);
        if (!isValid)
        {
            if (ReturnEmptyOnInvalid)
            {
                context.Result = new OkObjectResult(new List<object>());
                return;
            }

            context.Result = new UnauthorizedObjectResult(new { error = "Invalid or expired session" });
            return;
        }

        await next();
    }

    /// <summary>
    /// Obtém o token de sessão dos parâmetros da requisição
    /// </summary>
    /// <param name="context">Contexto da action</param>
    /// <returns>Token de sessão ou null se não encontrado</returns>
    private string? GetSessionToken(ActionExecutingContext context)
    {
        // Primeiro tenta obter da query string
        var querySession = context.HttpContext.Request.Query[SessionParameterName].FirstOrDefault();
        if (!string.IsNullOrEmpty(querySession))
            return querySession;

        // Depois tenta obter dos parâmetros da action
        if (context.ActionArguments.TryGetValue(SessionParameterName, out var sessionValue))
            return sessionValue?.ToString();

        // Tenta obter de objetos que tenham a propriedade UserSession
        foreach (var arg in context.ActionArguments.Values)
        {
            if (arg != null)
            {
                var sessionProperty = arg.GetType().GetProperty("UserSession");
                if (sessionProperty != null)
                {
                    var sessionFromProperty = sessionProperty.GetValue(arg)?.ToString();
                    if (!string.IsNullOrEmpty(sessionFromProperty))
                        return sessionFromProperty;
                }
            }
        }

        return null;
    }
}

