// MARXXS - 2WA - 24.07.2015
// -----
// FUN��O UTILIZADA PARA CONFIGURAR OS VALORES
// DE UM SWITCH CRIADO PELO DDCHECKBOX
// -----
// sValor  -> "" 	 -> CONFIGURA SWITCH COM BASE NO CAMPO OCULTO.
//	   	   -> "true"  -> CONFIGURA CAMPO OCULTO PARA "1" COM BASE NO CLIQUE. PS: UTILIZAR STRING.
//	   	   -> "false" -> CONFIGURA CAMPO OCULTO PARA "0" COM BASE NO CLIQUE. PS: UTILIZAR STRING.
//
// sSwitch -> OBJETO JQUERY DO SWITCH.
//
// sOculto -> ID DO CAMPO OCULTO SEM O CARACTERE "#".
// -----
// EXEMPLO DE USO:
// 
// $(document).on('change', '#switch-ALL_DAY_EVENT_checkbox', function() {
//  configuraSwitchs($(this).prop('checked').toString(), $(this), 'hcgs2101__all_day_event');
// });
function configuraSwitchs(sValor, sSwitch, sOculto) {
    sOculto = $('#' + sOculto);

    if (sValor == "") {
        $(sSwitch).prop("checked", (sOculto.val() == "1"));
    } else {
        (sValor == "true") ? (sOculto.val("1")) : (sOculto.val("0"));
    }
}