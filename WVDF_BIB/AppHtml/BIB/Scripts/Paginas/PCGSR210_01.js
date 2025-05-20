// FORMATA A PAGINA
$(document).ready(function () {
	$('#hcgsr210__ccgs210_id').removeClass().addClass('form-control');
	$('#hcgsr210__ccgs202_id').removeClass().addClass('form-control');
	$('#hcgsr210__ccgs203_id').removeClass().addClass('form-control');
	$('#hcgsr210__ordem').removeClass().addClass('form-control');

	$('#hcgsr210__ccgs210_id').val(getVariavelURL('aProduto'));
	$('#hcgsr210__ccgs210_id').attr('disabled', true);
});