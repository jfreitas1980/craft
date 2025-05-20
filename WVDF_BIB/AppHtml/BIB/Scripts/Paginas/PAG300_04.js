$(document).keypress(function(e) {
    if(e.which == 13) {
        $('#envia').click();
    }
});

$(document).on('click', '#registro', function() {
	window.open('PAG300_03.asp', '_self');
});

function fCAMPOS_CHECA_USUARIO(sIP, sSESSAO)
{
	var sEMAIL  = $('#fEmail').val();
	var sSENHA  = $('#fSenha').val();

	fFUNCAO_VERIFICAUSUARIO(sEMAIL,sSENHA,sIP,sSESSAO,'PAG300_04');
}

function fCAMPOS_CHECA_EMAIL()
{
	if($('#fEmail').val() == "")
	{
		alertify.error('Informe o seu e-mail para envio da sua senha!');
		$('#fEmail').focus();
		return;
	}

	fFUNCAO_ENVIANDO_SENHA($('#fEmail').val());
}

function fFUNCAO_ENVIANDO_SENHA(sEMAIL)
{
	jsUrl      = ("PAG300_01Diversos.asp?aFUNCAO=PAG300_04_Enviando_Senha&sEMAIL="+sEMAIL);
	loadXMLDoc(jsUrl);
}

function fFUNCAO_VERIFICAUSUARIO(sEMAIL,sSENHA,sIP,sSESSAO,sPROGRAMA)
{
	sSENHADESC = sSENHA;
	sSENHA     = SHA256(sSENHA);
	sSESSAO    = SHA256(sIP+sSESSAO);

	jsUrl      = ("PAG300_01Diversos.asp?aFUNCAO=PAG300_04&sEMAIL="+sEMAIL+"&sSENHA="+sSENHA+"&sSENHADESC="+sSENHADESC+"&sIP="+sIP+"&sSESSAO="+sSESSAO+"&sPROGRAMA="+sPROGRAMA);
	console.log(jsUrl);
	loadXMLDoc(jsUrl);
}

function retAjaxText(retornoAjax)
{
	var jsVariaveis  = retornoAjax.split("|");
	var jsControle   = (jsVariaveis[0]);
	var jsRetorno    = (jsVariaveis[1]);
	var jsSessao     = (jsVariaveis[2]);
	
	if (jsControle=="9") {

		if (jsRetorno=="900") {
			alertify.success('900 - Senha Enviada com sucesso.') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="901") {
			alertify.log('901 - Tabela TSMG800 não existe, contate administrador.') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="902") {
			alertify.log('902 - Não existe usuario com esse email, CSAG300.') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="903") {
			alertify.log('903 - Não existe HTML cadastrado, CSAG324.') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="904") {
			alertify.log('904 - Não existe empresa cadastrada, CSAG308.') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="905") {
			alertify.log('905 - Não existe configuracao para envio de email, CSAG339.') ;
			$('#fEmail').focus();
		   }
		   
	}else{
	
		if (jsRetorno=="0") {
			window.location.href = ("DEFAULT_02.asp?aUsuarioSessao="+jsSessao)
		   }

		if (jsRetorno=="1") {
			alertify.log('1 - NAO EXISTE USUARIO COM TAIS ESPECIFICACOES, E-MAIL OU SENHA INVALIDOS, OBRIGADO !!!.') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="2") {
			alertify.log('2 - FUNCAO PERMITIDA SO AO ADMINISTRADOR, OBRIGADO !!!.') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="3") {
			alertify.log('3 - Sr(a). USUARIO VOCE JA ESTA LOGADO, OBRIGADO!!!.') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="4") {
			alertify.log('4 - Sr(a). USUARIO SUA CONTA BLOQUEADA, CONTATE O ADMINISTRADOR DO SISTEMA, OBRIGADO!!!.') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="5") {
			alertify.log('5 - Sr(a). USUARIO SUA CONTA ESTA EM USO, NECESSARIO DESBLOQUEIO OU LOGOUT, OBRIGADO!!!.') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="6") {
			alertify.log('6 - Sr(a). USUARIO SUA SENHA EXPIROU, CONTATE O ADMINISTRADOR DO SISTEMA, OU MODIFIQUE SUA SENHA OBRIGADO!!!.') ;
			$('#fEmail').focus();
			window.location.href = ("PAG300_07.asp?aUsuarioSessao="+jsSessao)
		   }

		if (jsRetorno=="7") {
			alertify.log('7 - FUNCAO INATIVA NO SISTEMA; NECESSARIO EXECUTAR O LOGIN PARA LIBERACAO, OBRIGADO!!!.') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="8") {
			alert ('8 - Usuario Validado no Vf Acesso, mas sem registro no ( de para - CSAG327) do GR Trader') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="9") {
			alertify.log('9  - Usuario não validado no Vf Acesso, Verifique se o VF Acesso esta disponivel, e o Login e Senha OK') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="10") {
			alertify.log('10 - Usuario não encontrado no CSAG300, Verifique o email digitado .') ;
			$('#fEmail').focus();
		   }

		if (jsRetorno=="-95") {
			fSistemaUsuario_95();
			$('#fEmail').focus();
		   }

		if (jsRetorno=="-98") {
			fSistemaUsuario_98();
			$('#fEmail').focus();
		   }

		if (jsRetorno=="-99") {
			fSistemaUsuario_99();
			$('#fEmail').focus();
		   }
	}
}
