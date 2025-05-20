// FORMATA A PAGINA
$(document).ready(function () {
	$('#hcgsl210__ccgs210_id').removeClass().addClass('form-control');
	$('#hcgsl210__ccgs202_id').removeClass().addClass('form-control');
	$('#hcgsl210__ccgs203_id').removeClass().addClass('form-control');
	$('#hcgsl210__ordem').removeClass().addClass('form-control');

	$('#hcgsl210__ccgs210_id').val(getVariavelURL('aProduto'));
	$('#hcgsl210__ccgs210_id').attr('disabled', true);
});