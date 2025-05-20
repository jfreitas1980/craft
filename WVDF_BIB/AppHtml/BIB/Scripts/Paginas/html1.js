$(document).ready(function() {
	preencheSolicitado();
	preencheLocal();
	preencheNotes();
	preencheMotivos();
});

function preencheSolicitado() {
	$.ajax({
		url: "ws_hcgs2101_06.wso/f_hcgs2101_solpor/JSON",
		data: { 
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: getVariavelURL('sCodigo')
		},
		dataType: "json"
	}).done(function(data) {
		if (data.nossoComercial == 1)
			$('#nossoComercial').empty().append('(<i class="fa fa-times"></i>)');
		if (data.pedidoCliente == 1)
			$('#pedidoCliente').empty().append('(<i class="fa fa-times"></i>)');
	});
}
function preencheLocal() {
	$.ajax({
		url: "ws_hcgs2101_06.wso/f_hcgs2101_local/JSON",
		data: { sUSUARIOSESSAO: "b676f9d676123b4e04b0dd4edba2edda78c3ea856b34ab7be81374e286edd59b", sCodigo: "12"},
		dataType: "json"
	}).done(function(data) {
		if (data.cliente == 1)
			$('#localCliente').empty().append('(<i class="fa fa-times"></i>)');
		if (data.grupoCraft == 1)
			$('#localCraft').empty().append('(<i class="fa fa-times"></i>)');
		if (data.outros == 1) {
			$('#localOutros').empty().append('(<i class="fa fa-times"></i>)');
			$('#localOutros').closest('td').next('td').empty().append(data.outros_desc);
		}
			
	});
}
function preencheNotes() {}
function preencheMotivos() {}





$(document).on('click', '#mMotivo1, #mMotivo2, #mMotivo3, #mMotivo4, #mMotivo5, #mMotivo6, #mMotivo7', function() {
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