// JavaScript Document
// para esta função funcional perfeitamente, o nome do form no asp deve 
// ser igual ao nome da tabela em lowercase que esta sendo utilizada na entrada de dados  
// Nao esquecer de incluir este arquivo no corpo de sua pagina
function FieldNumberCheck(field, inteiros, decimais)
{
    with (field)
    {
        menos = value.indexOf("-") // 0 eh o primeiro caracter
        mais = value.indexOf("+") // 0 eh o primeiro caracter
        ponto = value.indexOf(".")

        if (decimais == 0) {
            if (mais == 0) {
                convertedString = value.split("+");
                convertedString = convertedString.join("");
                value = convertedString;
            }
            if (menos == -1) {
                if (value.length > inteiros) {
                    alert("E permitido apenas o sinal de - e " + inteiros + " digitos.");
                    field.focus();
                    return false;
                }
            }
            if (ponto != -1 || value.indexOf(",") != -1) {
                alert("Nao e permitido casas decimais");
                field.focus();
                return false;
            }
            if ((isFinite(value)) == false) {
                alert("Nao e um numero valido");
                field.focus();
                return false;
            }
        }

        if (decimais != 0) {
            var convertedString = value.split(",");
            convertedString = convertedString.join(".");
            value = convertedString;
            ponto = value.indexOf(".")

            if (ponto == 0) {
                value = "0" + value
            }
            if (mais == 0) {
                convertedString = value.split("+");
                convertedString = convertedString.join("");
                value = convertedString;
            }

            if (menos == 0) {
                if (ponto != -1) {
                    if (ponto - 1 > inteiros) {
                        alert("E permitido apenas o sinal de - e " + inteiros + " digitos antes da virgula.");
                        field.focus();
                        return false;
                    }
                } else {
                    if (value.length - 1 > inteiros) {
                        alert("E permitido apenas o sinal de - e " + inteiros + " digitos antes da virgula.");
                        field.focus();
                        return false;
                    }
                }
            }
            if (menos == -1) {
                if (ponto != -1) {
                    if (ponto > inteiros) {
                        alert("E permitido apenas o sinal de - e " + inteiros + " digitos antes da virgula.");
                        field.focus();
                        return false;
                    }
                } else {
                    if (value.length > inteiros) {
                        alert("E permitido apenas o sinal de - e " + inteiros + " digitos antes da virgula.");
                        field.focus();
                        return false;
                    }
                }
            }

            if (ponto != -1) {
                if (value.length - 1 - ponto > decimais) {
                    alert("E permitido apenas " + decimais + " digitos depois da virgula.");
                    field.focus();
                    return false;
                }
            }

            if ((isFinite(value)) == false) {
                alert("Nao e um numero valido");
                field.focus();
                return false;
            }
            convertedString = value.split(".");
            convertedString = convertedString.join(",");
            value = convertedString;
        }
    }
}