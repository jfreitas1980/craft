var jsOK = 1;
var jCsag320Id;

// FORMATAR TELA
$('document').ready(function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
	jCsag320Id = $('#jCsag320Id').val();
	
	$('#csag352__cidade_cd').removeClass('col-xs-6').addClass('col-xs-1');

	$("#csag352__csag320_id").val(jCsag320Id);
	$('#csag352__pais').val("BRA");
	
	if ($('#csag352__cidade_cd').val() != 0) {
		nomePorCodigo($('#csag352__cidade_cd').val());
	}
	
	estadoPorPais($('#csag352__pais').val());

	$('#csag352__observacao').blur(function(){
		TextAreaLimite(this,1022);
	});
	
});

function removerAcentos( newStringComAcento ) {
  var string = newStringComAcento;
	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		e : /[\xE8-\xEB]/g,
		i : /[\xEC-\xEF]/g,
		o : /[\xF2-\xF6]/g,
		u : /[\xF9-\xFC]/g,
		c : /\xE7/g,
		n : /\xF1/g
	};

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string;
}



// BUSCA (CIDADE_CD, CIDADE_NOME) ATRAVÉS DO (CEP)
$(document).on('blur', '#csag352__cep', function() {
	var mPais = $('#csag352__pais').val();
	
	if (mPais == "BRA") {
		var cep = $(this).val().replace('-', '').replace('.', '').replace('/', '');
		$(this).val(cep);

		if (cep != "") {
			var validacep = /^[0-9]{8}$/;
			
			if (validacep.test(cep)) {
				$('#csag352__logradouro').val("...");
				$('#csag352__bairro').val("...");
				$('#csag352_cidade_nome').val("...");
				$('#csag352__estado').val("...");
				
				$.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
					if (!("erro" in dados)) {
						$('#csag352__logradouro').val(removerAcentos(dados.logradouro));
						$('#csag352__bairro').val(removerAcentos(dados.bairro));
						$('#csag352__estado').val(dados.uf);
						
						var sParametros = retiraAcento(dados.localidade) + '","BRA","' + dados.uf + '","' + $('#jaUsuarioSessao').val();
						
						var sRetorno = ReadFuncValue(sParametros, "oPAG325_01", "get_f_bcsag325_codigo");
						
						sRetorno = "[" + sRetorno + "]";
						var obj = $.parseJSON(sRetorno);
						
						$('#csag352__cidade_cd').val(obj[0]['id']);
						$('#csag352_cidade_nome').val(obj[0]['value']);
						
					}
				});
			}
		}
	}
});

// BUSCA (CIDADE_NOME) ATRAVÉS DO (CIDADE_CD)
$(document).on('blur', '#csag352__cidade_cd', function() {
	nomePorCodigo($(this).val());
});

function nomePorCodigo(cidade_cd) {
	var valida_cidade_cd = /^([0-9]{4})$/;
	
	if (!valida_cidade_cd.test(cidade_cd)) {
		$(this).val("0");
		return;
	}
	
	var sRetorno = ReadFuncValue(cidade_cd, "oPAG325_01", "get_f_pgcsag325_descricao");
	
	$('#csag352_cidade_nome').val(sRetorno);
}
// AUTOCOMPLETE E BUSCA (CIDADE_CD, UF) ATRAVÉS DO (CIDADE_NOME)
$(function() {
    $("#csag352_cidade_nome").autocomplete({
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
				$('#csag352__cidade_cd').val(ui.item.id);
				$('#csag352__estado').val(ui.item.uf)
				$('#csag352__pais').val(ui.item.pais);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.pais + " - " + item.uf + " - " + item.value + "</a>").appendTo(ul);
	};
});

// BUSCA (ESTADO) ATRAVÉS DO (PAÍS) FCSAG331_SIGLA (csag352__estado VAL, csag352__estado, PAIS, SESSAO)
$(document).on('change', '#csag352__pais', function() {
	estadoPorPais($(this).val());
});

function estadoPorPais(pais) {
	var sAntigo = $('#csag352__estado').val();
	var sParametros = sAntigo + '","csag352__estado","' + pais + '","' + $('#jaUsuarioSessao').val();
	var sRetorno = ReadFuncValue(sParametros, "oPAG331_03", "get_fcsag331_sigla");
		
	$('#td-estado').html(sRetorno);
	
	$('#csag352__estado').val(sAntigo);
	
	if($('#csag352__estado').children('option').length == 0) {
		$('#csag352__estado').remove();
		$('#td-estado').html('<input type="text" size="90" name="csag352__estado" id="csag352__estado" maxlength="90" class="col-xs-6 fld-2wa" placeholder="ESTADO" style="text-align:left;">');
		
		return;
	}
	
	$('#csag352__estado').addClass('col-xs-6');
}