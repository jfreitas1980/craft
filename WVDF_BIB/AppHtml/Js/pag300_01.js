// PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
// FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
$('document').ready( function () {
	// PARA TORNAR UM CAMPO DESABILITADO
	$('#csag300__dtaultlogin').attr('disabled', 'disabled');
	$('#csag300__horultlogin').attr('disabled', 'disabled');
	$('#csag300__dtaultlogout').attr('disabled', 'disabled');
	$('#csag300__horultlogout').attr('disabled', 'disabled');
	$('#csag300__usuarionumero').removeClass('col-xs-6').addClass('col-xs-12');
	
	// FAZ COM QUE O BOTAO SAVE NAO SEJA EXIBIDO NA TELA
	// SE O RECNUM ESTIVER IGUAL A ZERO.
	if ($('#csag300__recnum').val()==0) {
		if ($('#btn-save').is(':visible')) {
			$('#btn-save').hide();
		}
	}
	else {
		if ($('#btn-save').is(':visible')) {}
		else {
			$('#btn-save').show();
		}
	}
});


function cDocumento_01() {
	if(document.Csag300.csag300__usuarioecodigo.value==""){
	   document.Csag300.csag300__usuarioempresa.value="Selecione Uma Empresa";
	   alert("(01), Selecione uma Empresa");
	   document.Csag300.csag300__usuarioempresa.value="";
	   document.Csag300.csag300__usuarioempresa.focus();
	}
	if(document.Csag300.csag300__usuarionumero.value==""){
	   alert("(02), CPF Obrigatório");
	   document.Csag300.csag300__usuarionumero.value="";
	   document.Csag300.csag300__usuarionumero.focus();
	}
	if(document.Csag300.csag300__usuariosenha.value==""){
	   alert("(04), Senha Obritatoria");
	   document.Csag300.csag300__usuariosenha.value="";
	   document.Csag300.csag300__usuariosenha.focus();
	}
	if(document.Csag300.csag300__usuarionome.value==""){
	   alert("(05), Nome Obrigatorio");
	   document.Csag300.csag300__usuarionome.value="";
	   document.Csag300.csag300__usuarionome.focus();
	}
	if(document.Csag300.csag300__departamento.value=="0"){
	   alert("(06), Departamento Obrigatorio");
	   document.Csag300.csag300__departamento.value="0";
	   document.Csag300.csag300__departamento.focus();
	}
	if(document.Csag300.csag300__usuarioemail.value==""){
	   alert("(07), Email Obrigatório");
	   document.Csag300.csag300__usuarioemail.value="";
	   document.Csag300.csag300__usuarioemail.focus();
	}
}

function fPAG307_GetValue()
{
	parent.frames[2].location.href=('PAG300_00Funcoes.Asp?aPesquisa=1&aEmpresa='+document.Csag300.csag300__usuarioecodigo.value);
}

function fPAG303_GetValue()
{
	parent.frames[2].location.href=('PAG300_00Funcoes.Asp?aPesquisa=2&aIdioma='+document.Csag300.csag300__usuarioidioma.value);
}

function fPAG308_GetValue()
{
	parent.frames[2].location.href=('PAG300_00Funcoes.Asp?aPesquisa=3&aEmpresa='+document.Csag300.csag300__usuarioecodigo.value+'&aDepartamento='+document.Csag300.csag300__departamento.value);
}

function fValidaUsuario()
{
 if(document.Csag300.csag300__usuarionumero.value=="0" || document.Csag300.csag300__usuarionumero.value=="")
   {
	 alert("ATENCAO !!! E Obrigatorio Posicionar Um Usuario, Obrigado");
	 document.Csag300.csag300__usuarionumero.focus();
   }
}

function posiciona(RetCampos,RetValores,Programa){
	valores = RetValores.split('|');
	switch(Programa){
		case 'UPLOAD':

			document.Csag300.csag300__cf_usuariofoto.disabled  = "";
			document.Csag300.csag300__cl_usuariofoto.disabled  = "";

			document.Csag300.csag300__cf_usuariofoto.value     = valores[0];
			document.Csag300.csag300__cl_usuariofoto.value     = valores[1];

			//fechaDivPopUp();
		break

		default:
			alert('falha no relatorio')
	}
}


// COMEÇA AQUI

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

// CONFIGURA INPUT DATA
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
		dateFormat: "dd/mm/yy"
	});
});
