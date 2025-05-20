// FORMATA A PAGINA
$(document).ready(function() {
	// COLOCA CALENDARIO NO CAMPO
	$('#csag300__usuariodtnasfun').datepicker({
		autoOpen: false,
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy",
		yearRange: "-100:+0"
	}).trigger('blur');
	
	traduzTela($('#csag300__usuarioidioma').val(), $('#varAPrograma').val());
	// FORMATA TAMANHO DOS CAMPOS
	$('#csag300__usuarioecodigo').removeClass('col-xs-6').addClass('col-xs-12');
	$('#csag300__usuarioidioma').removeClass('col-xs-6').addClass('col-xs-12');
	$('#csag300__usuariopais').removeClass('col-xs-6').addClass('col-xs-12');
	
	// COLOCA MASCARA NO CAMPO DATA
	$('#csag300__usuariodtnasfun').mask("99/99/9999");
	
	
	function primeiroCampo() {     
		$('#csag300__usuariodtnasfun').datepicker('hide');
		$('#csag300__usuarioemail').focus();
	}

	setTimeout(primeiroCampo, 500)
	
});

$(document).on('change', '#csag300__usuarioidioma', function() {
	traduzTela($('#csag300__usuarioidioma').val(), $('#varAPrograma').val());
});

function traduzTela(numLingua, nomePrograma) {
	$.ajax({
		url: "/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON",
		data: {aIDIOMA: numLingua, aPROGRAMA: nomePrograma}
	}).success(function(data) {
		$('#csag300__usuarioemail').attr("placeholder", data.LITERAL_02);
		$('#csag300__usuariosenhain').attr("placeholder", data.LITERAL_03);
		$('#csag300__usuarionome').attr("placeholder", data.LITERAL_04);
		$('#csag300__usuarioapelido').attr("placeholder", data.LITERAL_05);
		$('#csag300__usuariochave').attr("placeholder", data.LITERAL_06);
		$('#csag300__usuariocpf').attr("placeholder", data.LITERAL_07);
		$('#csag300__usuariodtnasfun').attr("placeholder", data.LITERAL_08);
		$('#csag300__usuariosexo [value="O"]').text(data.LITERAL_09);
		$('#csag300__usuariocelnr').attr("placeholder", data.LITERAL_10);
		$('#btnSalvar').text(data.LITERAL_11);
	});
}

function fCHECAGEM() {
	if ($('#csag300__usuarioemail').val() == "" || $('#csag300__usuarioemail').val() == "0") {
		alertify.error('Preencha o campo e-mail!');
		$('#csag300__usuarioemail').focus();
		return;
	}
	
	if ($('#csag300__usuariosenhain').val() == "" || $('#csag300__usuariosenhain').val() == "0") {
		alertify.error('Preencha o campo senha!');
		$('#csag300__usuariosenhain').focus();
		return;
	}
	
	if ($('#csag300__usuarionome').val() == "" || $('#csag300__usuarionome').val() == "0") {
		alertify.error('Preencha o campo nome!');
		$('#csag300__usuarionome').focus();
		return;
	}
	
	if ($('#csag300__usuariocpf').val() == "" || $('#csag300__usuariocpf').val() == "0") {
		alertify.error('Preencha o campo CPF!');
		$('#csag300__usuariocpf').focus();
		return;
	}
	
	if ($('#csag300__usuariodtnasfun').val().length != 10) {
		alertify.error('Preencha o campo data de nascimento!');
		//$('#csag300__usuariodtnasfun').focus();
		return;
	}
	
	if ($('#csag300__usuariosexo').val() == "O") {
		alertify.error('Selecione seu sexo!');
		$('#csag300__usuariosexo').focus();
		return;
	}
	
	if ($('#csag300__usuariocelnr').val() == "" || $('#csag300__usuariocelnr').val() == "0") {
		alertify.error('Preencha o campo celular!');
		$('#csag300__usuariocelnr').focus();
		return;
	}
	
	
	
	document.csag300.action='PAG300_03.asp?save=save';
	document.csag300.submit();
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