var aHCGS2102Id;

// FORMATA A PAGINA
$(document).ready(function () {
	$('#ifrm-pcgs2101_00', window.parent.parent.document).height("1072px");
	
	// PASSA A aHCGS2102Id PARA O SEU RESPECTIVO INPUT
	aHCGS2102Id = $('#aHCGS2102Id').val();
	$('#hcgs2104__hcgs2102_id').val(aHCGS2102Id);
	
	configuraSwitchs("", $('#switch-SELECIONADO_checkbox'), 'hcgs2104__selecionado');
	
	$('#btnNovo').hide();
	$('#btnExcluir').hide();
	
	$('#hcgs2104__ccgs213_id').hide();
	
	$('#MOTIVOFUP').val($('#hcgs2104__ccgs213_id option:selected').text()).attr('readonly', true);
	
	if ($('#hcgs2104__selecionado').val() == 1) {
		$('#titleMotivo', window.parent.document).html("Motivo: <b>" + $('#MOTIVOFUP').val() + "</b>");
	}
	
	if ($('#hcgs2104__ccgs213_id').val() != "18")
		$('#tr-DESCRICAO').hide();
	
	$('.col-xs-6').removeClass('col-xs-6').addClass('col-xs-12');
	
	// Oculta campos desnecessários.
	
	var sParametros = $('#hcgs2104__ccgs213_id').val() + '","' + $('#hcgs2104__hcgs2102_id').val();
	var sRetorno = ReadFuncValue(sParametros, "oPCGS2104_01", "get_f_show_fields2104");
	var obj = JSON.parse(sRetorno);
	
	(obj['ML'] ? ($('#hcgs2104__ccgs209_missing_lost').closest('tr').show()) : ($('#hcgs2104__ccgs209_missing_lost').closest('tr').hide()));
	(obj['TG'] ? ($('#hcgs2104__ccgs209_target').closest('tr').show()) : ($('#hcgs2104__ccgs209_target').closest('tr').hide()));
	(obj['MS'] ? ($('#hcgs2104__standby_motivo').closest('tr').show()) : ($('#hcgs2104__standby_motivo').closest('tr').hide()));
	(obj['AT'] ? ($('#hcgs2104__acao_tomada_desc').closest('tr').show()) : ($('#hcgs2104__acao_tomada_desc').closest('tr').hide()));
	
});

$(document).on('change', '#switch-SELECIONADO_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'hcgs2104__selecionado');
});