function TextAreaLength(field, inputLength)
{
    with (field)
    {
        if (value.length > inputLength) {
            alertify.error("Voce utilizou " + value.length + " caracteres, o numero maximo de caracteres permitidos sao: " + inputLength);
            field.focus();
            return false;
        }
    }
}
function TextAreaLimite(oObj, tamanho) {
    var checar = oObj.value
    if (checar.length > tamanho) {
        alertify.error('Voce digitou ' + checar.length + ' caracteres, o numero maximo de caracteres permitidos sao: ' + tamanho);
        oObj.focus();
        return false;
    }
}

