$(document).ready(function() {
	if (getVariavelURL('RunReport') == 'RunReport' || getVariavelURL('RunReport') == '1') {
		if ($('#botoesReportFinal').is(':empty')) {
			$('#botoesReportFinal').html($('#botoesReportAux').html());
			$('#botoesReportAux').empty();
		}
		
		$('#nextPageFinal').attr('href', $('#nextPageAux').val());

	}
});
