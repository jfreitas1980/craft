$(document).on('click', '#mMotivo1, #mMotivo7', function() {
	if ($(this).children().hasClass('fa-plus-square')) {
		// ABRE
		$(this).children().removeClass('fa-plus-square').addClass('fa-minus-square');
		var motivo = '.' + ($(this).attr('id')).substr(1) + '';
		$(motivo).show();
		
		var qntdMotivo = $(motivo).length;
		var rowsAtuais = $('#rowMotivo').attr('rowspan');
		var rowsNovos  = (qntdMotivo + parseInt(rowsAtuais));
		
		$('#rowMotivo').attr('rowspan', rowsNovos);
	} else {
		// FECHA
		$(this).children().removeClass('fa-minus-square').addClass('fa-plus-square');
		var motivo = '.' + ($(this).attr('id')).substr(1) + '';
		$(motivo).hide();
		
		var qntdMotivo = $(motivo).length;
		var rowsAtuais = $('#rowMotivo').attr('rowspan');
		var rowsNovos  = (parseInt(rowsAtuais) - qntdMotivo);
		
		$('#rowMotivo').attr('rowspan', rowsNovos);
	}
});