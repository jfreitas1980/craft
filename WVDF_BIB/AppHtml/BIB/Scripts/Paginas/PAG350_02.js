$(document).ready(function () {
	// FORMATA O TAMANHO DO IFRAME
	$('#ifrm-pag350_01', window.parent.document).height($('.container-fluid').height());

	if (getVariavelURL('RunReport') == 'RunReport' || getVariavelURL('RunReport') == '1') {
		if ($('#botoesReportFinal').is(':empty')) {
			$('#botoesReportFinal').html($('#botoesReportAux').html());
			$('#botoesReportAux').empty();
		}
		
		$('#nextPageFinal').attr('href', $('#nextPageAux').val());

		//window.setInterval(function(){
		//	$('div#pageTabContent div.active iframe', parent.parent.document).css('height', $('#ifrm-pag350_01', parent.document).prop('scrollHeight') + 85 + 'px');
		//	$('div#pageTabContent', parent.parent.document).css('height', $('#ifrm-pag350_01', parent.document).prop('scrollHeight') + 110 + 'px');
		//}, 1000);
	}

});