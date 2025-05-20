function ReadFuncValue(valor, obj, func)
{
    var retorno = $.ajax({
        type: "GET",
        url: "readfunction.asp",
        data: "sObj=" + obj + "&sFuncao=" + func + "&sValue=" + valor,
        async: false
    }).responseText;

    return retorno;
}