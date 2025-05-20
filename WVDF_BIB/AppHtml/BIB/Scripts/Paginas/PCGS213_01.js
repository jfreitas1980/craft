$('document').ready( function () {

	// FORMATA OS SWITCHS
	configuraSwitchs("", $('#switch-JUSTIFICATIVA_checkbox'), 'ccgs213__justificativa');
	
	$('#ccgs213__descricao').removeClass('col-xs-6').addClass('col-xs-12');
	$('#ccgs213__descricao_en').removeClass('col-xs-6').addClass('col-xs-12');
	$('#ccgs213__descricao_sp').removeClass('col-xs-6').addClass('col-xs-12');
	$('#ccgs213__nivel').removeClass('col-xs-6').addClass('col-xs-1');
	$('#ccgs213__ordem').removeClass('col-xs-6').addClass('col-xs-1');
	
	
});

// CONFIGURA SWITCHS
$(document).on('change', '#switch-JUSTIFICATIVA_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'ccgs213__justificativa');
});
