function fCAMPOS_CHECA_USUARIO() {
	var sSESSAO          = $('#aUsuarioSessao').val();
	var sSENHAATUAL      = $('#fSenha_Atual').val();
	var sSENHANOVA       = $('#fSenha_Nova').val();
	var sSENHACONFIRMADA = $('#fSenha_Confirmacao').val();
	var sSENHANOVAHASH   = SHA256(sSENHANOVA);

	fFUNCAO_VERIFICAUSUARIO(sSESSAO, sSENHAATUAL, sSENHANOVA, sSENHACONFIRMADA, 'PAG300_07', sSENHANOVAHASH);
}

function fFUNCAO_VERIFICAUSUARIO(sSESSAO, sSENHAATUAL, sSENHANOVA, sSENHACONFIRMADA, sPROGRAMA, sSENHANOVAHASH) {
	jsUrl    = ("PAG300_01Diversos.asp?aFUNCAO=PAG300_07&sSESSAO="+sSESSAO+"&sSENHAATUAL="+sSENHAATUAL+"&sSENHANOVA="+sSENHANOVA+"&sSENHACONFIRMADA="+sSENHACONFIRMADA+"&sPROGRAMA="+sPROGRAMA+"&sSENHANOVAHASH="+sSENHANOVAHASH);
	
	console.log(jsUrl);
	loadXMLDoc(jsUrl);
}

function retAjaxText(retornoAjax){
	var jsVariaveis  = retornoAjax.split("|");
	var jsRetorno    = (jsVariaveis[1]);
	var jsSessao     = (jsVariaveis[2]);
	
	if (jsRetorno == "0") {
		alertify.success('Sua senha foi alterada com sucesso!');
		setTimeout(function() {
			location.href = "index.asp";
		}, 2000);
		return;
	   }

	if (jsRetorno == "1")
		alertify.error('Sua sess&atilde;o expirou conecte-se novamente.');

	if (jsRetorno == "2")
		alertify.error('N&atilde;o existe nenhum usuario associado a esta sess&atilde;o.');

	if (jsRetorno == "3")
		alertify.error('Sua senha atual n&atilde;o confere com a cadastrada.');

	if (jsRetorno == "4")
	   alertify.error('Confirma&ccedil;&atilde;o de senha incorreta!');

	if (jsRetorno == "5") 
		alertify.error('Nova senha est&aacute; em branco');

	if (jsRetorno == "6")
		alertify.error('Senha informada n&atilde;o atingiu limite m&iacute;nimo de caracteres.');

	if (jsRetorno == "7")
		alertify.error('Senha informada ultrapassou limite m&aacute;ximo de caracteres');

	if (jsRetorno == "8")
		alertify.error('Senha informada &eacute; igual a senha atual.');

	if (jsRetorno == "9")
		alertify.error('Senha informada j&aacute; existe registro hist&oacute;rico.');

	if (jsRetorno == "10")
		alertify.error('Senha informada n&atilde;o &eacute; uma senha forte! Utilize letras, n&uacute;meros e caracteres especiais (! @ # $ % *).');

	$('#fSenha_Atual').val('').focus();
	$('#fSenha_Nova').val('');
	$('#fSenha_Confirmacao').val('');
}

function StrongPass (pass, lMin, lMax) {
	var senha = pass.value;
	var tamanho = senha.length;
	var conta = 0;
	
	if (tamanho != 0) {
		if (tamanho < lMin || tamanho > lMax) {
			alertify.error('A senha deve ter no minimo ' + lMin + ' e no maximo ' + lMax + ' digitos!');
			$('#csag300__usuariosenhain').val("").focus();
		} else {
			if (tamanho == undefined) { tamanho = 1}
			
			var verifica = new Array (tamanho - 1);
			senha = senha.split("");
			
			for (i = 0; i < tamanho; i++) {
				if (isFinite(senha[i])) { conta++; }
			}
			
			if (conta == tamanho || conta == 0) {
				alertify.error('A senha deve conter numeros e letras!');
				$('#csag300__usuariosenhain').val("").focus();
			}
		}
	}
} 

$(document).on('keyup','#fSenha_Confirmacao', function(e) {
	$('#checaSenha').removeClass('fa-lock');
	
	if ($(this).val() == $('#fSenha_Nova').val()) {
		$('#checaSenha').addClass('fa-check').removeClass('fa-times').addClass('green').removeClass('red');
	} else {
		$('#checaSenha').removeClass('fa-check').addClass('fa-times').addClass('red').removeClass('green');
	}
});