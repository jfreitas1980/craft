var aHCGS2101Id;

// FORMATA A PAGINA
$(document).ready(function () {
	// PASSA A aHCGS2101Id PARA O SEU RESPECTIVO INPUT
	aHCGS2101Id = $('#aHCGS2101Id').val();
	$('#hcgs2102__hcgs2101_id').val(aHCGS2101Id);
	
	// DEFINE ALTURA DO IFRAME NO PAI
	$('#ifrm-pcgs2101_00', window.parent.parent.document).height("877px");
	
	// FORMATA CAMPO DATA
	$("#hcgs2102__dt_prox_visita").datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	$('#hcgs2102__dt_prox_visita').removeClass('col-xs-6').addClass('col-xs-12');
	$('#hcgs2102__dt_prox_visita').mask("99/99/9999")
	
	if ($('#hcgs2102__solicitado_local option:selected').val() == 3)
		$('#tr-NMLOCAL').show()
	else
		$('#tr-NMLOCAL').hide();
	
	$('#btnNovo').hide();
	$('#btnExcluir').hide();
	$('#btnPesquisar').hide();
	
	pos2 = $('#hcgs2102__rowid').val();
		
	if (pos2 == "" || pos2 == undefined || pos2 == "0") {
		parent.parent.alertify.error("Preencha os detalhes para liberar a tela de notifica&ccedil;&otilde;es!");
		$('#btab_1').hide();		
	} else {
		$("#ifrm-pcgs2103_01").attr({
			"src" : "PCGS2103_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aHCGS2102Id=" + $("#ifrm-pcgs2102_01", parent.document).contents().find('#hcgs2102__codigo').val()
		});
		$('#btab_1').show();
	}
});

$(document).on('change', '#hcgs2102__solicitado_local', function() {
	if ($('#hcgs2102__solicitado_local option:selected').val() == 3)
		$('#tr-NMLOCAL').show()
	else
		$('#tr-NMLOCAL').hide();
});

