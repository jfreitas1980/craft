// FORMATA A TELA
$('document').ready( function () {
	//FORMATA CAMPOS NECESSARIOS
	$('#csag308__cep').removeClass('col-xs-6').addClass('col-xs-3');
	$('#csag308__cepextensao').removeClass('col-xs-6').addClass('col-xs-3');
	$('#csag308__id_csag325').removeClass('col-xs-6').addClass('col-xs-1');
	$('#csag308__ds_cidade').removeClass('col-xs-6').addClass('col-xs-5');
	$('#csag308__telefone_ddd').removeClass('col-xs-6').addClass('col-xs-1');
	$('#csag308__telefone_numero').removeClass('col-xs-6').addClass('col-xs-5');
	
	// POSICIONA NOME DA CIDADE CASO O ID ESTEJA POSICIONADO
	if ($('#csag308__id_csag325').val() != 0) {
		nomePorCodigo($('#csag308__id_csag325').val());
	}
	
	// FAZ O COMBO DOS ESTADOS COM BASE NO PAIS
	estadoPorPais($('#csag308__pais').val());
});

// CHECA SE QUANTIDADE DE NUMEROS CAMPO CEP É IGUAL A 5 PARA PASSAR A PROXIMA ENTRADA
$(document).on('keypress', '#csag308__cep', function () {
	var mPais = $('#csag308__pais').val();
	
	if (mPais == "BRA" && ($(this).val().length + 1) == 5) {
		$('#csag308__cepextensao').focus();
	}
});

// BUSCA (CIDADE_CD, CIDADE_NOME) ATRAVÉS DO (CEP)
$(document).on('keyup', '#csag308__cepextensao', function() {
	var mPais = $('#csag308__pais').val();
	
	if (mPais == "BRA") {
		var cep = ($('#csag308__cep').val() + $(this).val()).replace('-', '').replace('.', '').replace('/', '');
		
		if (cep != "") {
			var validacep = /^[0-9]{8}$/;
			
			if (validacep.test(cep) && ($(this).val().length) == 3) {
				$('#csag308__logradouro').val("...");
				$('#csag308__bairro').val("...");
				$('#csag308_cidade_nome').val("...");
				$('#csag308__estado').val("...");
				
				$.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
					if (!("erro" in dados)) {
						$('#csag308__logradouro').val(dados.logradouro);
						$('#csag308__bairro').val(dados.bairro);
						$('#csag308__uf').val(dados.uf);
						
						var sParametros = dados.localidade + '","BRA","' + dados.uf + '","' + $('#jaUsuarioSessao').val();
						var sRetorno = ReadFuncValue(sParametros, "oPAG325_01", "get_f_bcsag325_codigo");
						
						sRetorno = "[" + sRetorno + "]";
						var obj = $.parseJSON(sRetorno);
						
						$('#csag308__id_csag325').val(obj[0]['id']);
						$('#csag308__ds_cidade').val(obj[0]['value']);
						
						$('#csag308__logradouro').focus();
					}
				});
			}
		}
	}
});

// BUSCA (CIDADE_NOME) ATRAVÉS DO (CIDADE_CD)
$(document).on('blur', '#csag308__id_csag325', function() {
	nomePorCodigo($(this).val());
});

function nomePorCodigo(cidade_cd) {
	var valida_cidade_cd = /^([0-9]{4})$/;
	
	if (!valida_cidade_cd.test(cidade_cd)) {
		$(this).val("0");
		return;
	}
	
	var sRetorno = ReadFuncValue(cidade_cd, "oPAG325_01", "get_f_pgcsag325_descricao");
	
	$('#csag308__ds_cidade').val(sRetorno);
}

// BUSCA (CIDADE_CD, UF) ATRAVÉS DO (CIDADE_NOME)
$(function() {
    $("#csag308__ds_cidade").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag325_descricao.asp",
				data: {
					aUsuarioSessao: $('#jaUsuarioSessao').val(),
					term: retiraAcento(request.term)
				},
				dataType: "json",
				success: function (data) {
					response(data);
				}
			});
		},
        minLength: 2,
		open: function(e,ui) {
			var termTemplate = '<strong>%s</strong>';
			var acData = $(this).data('uiAutocomplete');
			acData
			.menu
			.element
			.find('a')
			.each(function() {
				var me = $(this);
				var regex = new RegExp(acData.term, "gi");
				me.html(me.text().replace(regex, function (matched) {
					return termTemplate.replace('%s', matched);
				}));
			});
		},
        select: function(event, ui) {
            if (ui.item) {
				$('#csag308__id_csag325').val(ui.item.id);
				$('#csag308__uf').val(ui.item.uf)
				$('#csag308__pais').val(ui.item.pais);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.pais + " - " + item.uf + " - " + item.value + "</a>").appendTo(ul);
	};
});

// BUSCA (ESTADO) ATRAVÉS DO (PAÍS) FCSAG331_SIGLA (csag308__uf VAL, csag308__uf, PAIS, SESSAO)
$(document).on('change', '#csag308__pais', function() {
	estadoPorPais($(this).val());
});

function estadoPorPais(pais) {
	var sAntigo = $('#csag308__uf').val();
	var sParametros = sAntigo + '","csag308__uf","' + pais + '","' + $('#jaUsuarioSessao').val();
	var sRetorno = ReadFuncValue(sParametros, "oPAG331_03", "get_fcsag331_sigla");
		
	$('#td-estado').html(sRetorno);
	
	$('#csag308__uf').val(sAntigo);
	
	if($('#csag308__uf').children('option').length == 0) {
		$('#csag308__uf').remove();
		$('#td-estado').html('<input type="text" size="90" name="csag308__uf" id="csag308__uf" maxlength="90" class="col-xs-6" placeholder="ESTADO">');
		
		return;
	}
	
	$('#csag308__uf').addClass('col-xs-6');
}