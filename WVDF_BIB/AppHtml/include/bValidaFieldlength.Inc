<script language="JavaScript">
function limite(oObj, tamanho) {
var checar=oObj.value
    if (checar.length>tamanho) {
        alert("Voce digitou " + checar.length + " caracteres, o numero maximo de caracteres permitidos sao: " + tamanho)
        oObj.focus();
    }
}
</script>
