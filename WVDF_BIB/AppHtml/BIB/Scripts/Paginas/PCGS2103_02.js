// FORMATA A PAGINA
$(document).ready(function () {
	$('#selstart2').mask('99/99/9999').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	
	$('#selstop2').mask('99/99/9999').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	
	$('[id^="rptHtml"]').each(function() {
		$(this).html($(this).text());
	});

	$('#formg').submit(function() {
		$('#selstart3').val(htmlentities($('#selstart3_1').val()));
	});
});