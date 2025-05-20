<script language="JavaScript">
function limite(oObj, tamanho) {
var checar=oObj.value
    if (checar.length>tamanho) {
        jAlert( 'warning', ('Voce digitou ' + checar.length + ' caracteres, o numero maximo de caracteres permitidos sao: ' + tamanho), 
                'Atencao', 
                function(r) { 
                    if (r) {
                        oObj.focus();
                    }
                }
        );
    }
}
</script>
