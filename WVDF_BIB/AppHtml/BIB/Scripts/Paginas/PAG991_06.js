$(document).ready(function() {
	if (getVariavelURL('Save') == "1") {
		alertify.success($('#novoUpdate').val());
	}
	
	$('#Tsmg800').submit(function(e) {
		if ($('#SelStart1').val() == "") {
			alertify.error('Preencha todos os campos');
			return false;
		}
	});
});