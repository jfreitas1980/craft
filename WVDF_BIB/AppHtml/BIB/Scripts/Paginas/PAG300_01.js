// FORMATA A PÁGINA
$(document).ready( function () {
	// APLICA AS ALTERAÇÕES NA TELA QUANDO A CLASSE FOR APLICAÇÃO
	function changeClass(classe) {	
	  if (classe == 3) {
	  	$('#btab_1').hide();
	  	$('#btab_2').hide();
	  	$('#btab_3').hide();
	  	$('#btab_4').hide();
	  	$("#th_email").text("Login");
	  	$("#csag300__usuarioemail").attr("placeholder", "Login");
	  }
	  else {
	  	$('#btab_1').show();
	  	$('#btab_2').show();
	  	$('#btab_3').show();
	  	$('#btab_4').show();
	  	$("#th_email").text("E-mail");
	  	$("#csag300__usuarioemail").attr("placeholder", "e-Mail");
	  }
	}

	changeClass($("#csag300__usuarioclasse").val());

	$("#csag300__usuarioclasse").change(function(){
	  changeClass($(this).val());
	});

	// DESABILITA CAMPOS DA TAB-PAGE DADOS LOGIN
	$('#csag300__dtaultlogin').attr('disabled', 'disabled');
	$('#csag300__horultlogin').attr('disabled', 'disabled');
	$('#csag300__dtaultlogout').attr('disabled', 'disabled');
	$('#csag300__horultlogout').attr('disabled', 'disabled');
	
	// FORMATA O TAMANHO DOS CAMPOS COM OS ÍCONES
	$('#csag300__usuarionumero').removeClass('col-xs-6').addClass('col-xs-12');
	$('#csag300__usuariovs').removeClass('col-xs-6').addClass('col-xs-12');
	$('#csag300__usuariodtnasfun').removeClass('col-xs-6').addClass('col-xs-12');
	$('#csag300__cl_usuariofoto').removeClass('col-xs-6').addClass('col-xs-12');
});

// CONFIGURAÇÃO BOTÕES TAB
$(document).on('click', '#btab_0', function () {
	$('#btab_0').addClass('active');
	$('#btab_1').removeClass('active');
	$('#btab_2').removeClass('active');
	$('#btab_3').removeClass('active');
	$('#btab_4').removeClass('active');
	$('#bcontent_0').addClass('active');
	$('#bcontent_1').removeClass('active');
	$('#bcontent_2').removeClass('active');
	$('#bcontent_3').removeClass('active');
	$('#bcontent_4').removeClass('active');
});
$(document).on('click', '#btab_1', function () {
	$('#btab_1').addClass('active');
	$('#btab_0').removeClass('active');
	$('#btab_2').removeClass('active');
	$('#btab_3').removeClass('active');
	$('#btab_4').removeClass('active');
	$('#bcontent_1').addClass('active');
	$('#bcontent_0').removeClass('active');
	$('#bcontent_2').removeClass('active');
	$('#bcontent_3').removeClass('active');
	$('#bcontent_4').removeClass('active');
});
$(document).on('click', '#btab_2', function () {
	$('#btab_2').addClass('active');
	$('#btab_1').removeClass('active');
	$('#btab_0').removeClass('active');
	$('#btab_3').removeClass('active');
	$('#btab_4').removeClass('active');
	$('#bcontent_2').addClass('active');
	$('#bcontent_1').removeClass('active');
	$('#bcontent_0').removeClass('active');
	$('#bcontent_3').removeClass('active');
	$('#bcontent_4').removeClass('active');
});
$(document).on('click', '#btab_3', function () {
	$('#btab_3').addClass('active');
	$('#btab_1').removeClass('active');
	$('#btab_2').removeClass('active');
	$('#btab_0').removeClass('active');
	$('#btab_4').removeClass('active');
	$('#bcontent_3').addClass('active');
	$('#bcontent_1').removeClass('active');
	$('#bcontent_2').removeClass('active');
	$('#bcontent_0').removeClass('active');
	$('#bcontent_4').removeClass('active');
});
$(document).on('click', '#btab_4', function () {
	$('#btab_4').addClass('active');
	$('#btab_1').removeClass('active');
	$('#btab_2').removeClass('active');
	$('#btab_3').removeClass('active');
	$('#btab_0').removeClass('active');
	$('#bcontent_4').addClass('active');
	$('#bcontent_1').removeClass('active');
	$('#bcontent_2').removeClass('active');
	$('#bcontent_3').removeClass('active');
	$('#bcontent_0').removeClass('active');
});

// CONFIGURA BOTÃO DROPDOWN
$(document).on('click', '#btnDropDown', function () {
	if ($('#btn-group').hasClass('open')) {
		$('#btn-group').removeClass("open");
		return;
	}
	$('#btn-group').addClass("open");
});

// TAB 0 - FUNÇÃO BOTÃO RESETAR SENHA
$("#modal-trocaSenha").fancybox({
	'type'      : 'iframe',
    'scrolling' : 'no',
	'height'	: '258px',
	'maxHeight'	: '258px',
	'width'		: '390px',
	'maxWidth'	: '390px',
	'scroll'	: 'no',
	  'padding'       : 0,
	'iframe': {'scrolling': 'no'}
});

// TAB 1 - FUNÇÃO BOTÃO ENVIAR FOTO
$("#modal-enviaFoto").fancybox({
	'type'      : 'iframe',
    'scrolling' : 'no',
	'height'	: '170px',
	'maxHeight'	: '170px',
	'width'		: '370px',
	'maxWidth'	: '370px',
	'scroll'	: 'no',
	'iframe': {'scrolling': 'no'}
});

// CONFIGURA INPUTS COM DATA
$(document).ready(function() {
	$('#csag300__usuariovs').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	$('#csag300__usuariodtnasfun').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy",
		yearRange: "-100:+0"
	});
});


// CONFIGURA BOTOES BARRA
$(document).on('click', '#btn1', function() {
	alertify.confirm('Aplicar Programas ao Usuario', function (e) {
		if (e) {
			document.csag300.action='PAG300_01.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') +'&sKey='+ $("#csag300__Usuariochave").val() + '&RecId=' + getVariavelURL('RecId') + '&fAplicacaoPrograma=fAplicacaoPrograma';
			document.csag300.submit();
		
		}
	});
});

$(document).on('click', '#btn2', function() {
	alertify.confirm('Aplicar Regras de Vencimento da Senha', function (e) {
		if (e) {
			document.csag300.action='PAG300_01.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&RecId=' + getVariavelURL('RecId')  + '&fAplicacaoClasse=fAplicacaoClasse';
			document.csag300.submit();
		
		}
	});
});

$(document).on('click', '#btn3', function() {
	alertify.confirm('Enviar E-mail da Senha ao Usuario', function (e) {
		if (e) {
			document.csag300.action='PAG300_01.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&RecId=' + getVariavelURL('RecId') + '&fEnviarEmailSenha=fEnviarEmailSenha';
			document.csag300.submit();
		
		}
	});
});

$(document).on('click', '#btn4', function() {
	alertify.confirm('Aplicar a Todos os Usuarios a Distribuicao de Entradas no Sistema', function (e) {
		if (e) {
			document.csag300.action='PAG300_01.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&RecId=' + getVariavelURL('RecId') + '&fAplicacaoDistribuicao=fAplicacaoDistribuicao';
			document.csag300.submit();
		
		}
	});
});