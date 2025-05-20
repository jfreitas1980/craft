var jsOK = 1;
var jCsag320Id;

// PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
// FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
$('document').ready( function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
	jCsag320Id = $('#jCsag320Id').val();
	$("#csag395__csag320_id").val(jCsag320Id);
	
	// ZERA SWITCHS
	//switchAnalista("");
	//switchCustomer("");
		
	// ESCONDE BOTÃO NOVO E PESQUISAR.
	$('#btnNovo').hide();
	$('#btnPesquisar').hide();

	$('#csag395__observacao').blur(function(){
		TextAreaLimite(this,1022);
	});
});

// SWITCH ANALISTA
//$(document).on('change', '#switchAnalista', function() {
//	$(this).prop("checked") ? switchAnalista("S") : switchAnalista("N");
//});
function switchAnalista(sAnalista) {
	//if (sAnalista != "") {
	//	(sAnalista == "S") ? $('#switchAnalista').prop("checked", true) : $('#switchAnalista').prop("checked", false);
	//	$('#csag395__analista').val(sAnalista);
	//} else {
	//	if ($('#csag395__analista').val() != "") {
	//		switchAnalista($('#csag395__analista').val());
	//	} else {
	//		switchAnalista($('#csag395__analista').val("N").val());
	//	}
	//}
}

// SWITCH CUSTOMER
//$(document).on('change', '#switchCustomer', function() {
//	$(this).prop("checked") ? switchCustomer("S") : switchCustomer("N");
//});
function switchCustomer(sCustomer) {
	//if (sCustomer != "") {
	//	(sCustomer == "S") ? $('#switchCustomer').prop("checked", true) : $('#switchCustomer').prop("checked", false);
	//	$('#csag395__customer_service').val(sCustomer);
	//} else {
	//	if ($('#csag395__customer_service').val() != "") {
	//		switchCustomer($('#csag395__customer_service').val());
	//	} else {
	//		switchCustomer($('#csag395__customer_service').val("N").val());
	//	}
	//}
}