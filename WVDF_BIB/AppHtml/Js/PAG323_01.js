var jsOK = 1;
var jCsag320Id ;

// PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
// FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
$('document').ready(function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
	$('#csag352__cidade_cd').removeClass('col-xs-6').addClass('col-xs-1');
	$('#csag352__pais').val("BRA");
	
	jCsag320Id = $('#jCsag320Id').val();
	$("#csag352__csag320_id").val(jCsag320Id);

	$('#btn-SAVE').click(function(){
	   jsSalvar(0);
	});
	
	if ($('#csag352__cidade_cd').val() != 0) {
		nomePorCodigo($('#csag352__cidade_cd').val());
	}
	
	estadoPorPais($('#csag352__pais').val());
	
  // FAZ COM QUE O BOTAO SAVE NAO SEJA EXIBIDO NA TELA
  // SE O RECNUM ESTIVER IGUAL A ZERO.
  if ($('#aCI').val()!=1) {
	  if ($('#btn-SAVE').is(':visible')) {
		  $('#btn-SAVE').hide(); 
	  }
  }
  else {
	  if ($('#btn-SAVE').is(':visible')) {}
	  else {
		  $('#btn-SAVE').show(); 
	  }
  }
	
	
  // FAZ COM QUE O BOTAO SAVE NAO SEJA EXIBIDO NA TELA
  // SE O RECNUM ESTIVER IGUAL A ZERO.
  if ($('#aCE').val()!=1) {
	  if ($('#btn-EXCLUIR').is(':visible')) {
		  $('#btn-EXCLUIR').hide(); 
	  }
  }
  else {
	  if ($('#btn-EXCLUIR').is(':visible')) {}
	  else {
		  $('#btn-EXCLUIR').show(); 
	  }
  }
});

function retiraAcento(palavra)  
{  
	com_acento = '����������������������������������������������';  
	sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';  
	nova='';  
	for(i=0;i<palavra.length;i++) {  
		if (com_acento.search(palavra.substr(i,1))>=0) {  
			nova+=sem_acento.substr(com_acento.search(palavra.substr(i,1)),1);  
		} else {  
			nova+=palavra.substr(i,1);  
		}  
	}  
	return nova.toUpperCase();  
}

// BUSCA (CIDADE_CD, CIDADE_NOME) ATRAVÉS DO (CEP)
$(document).on('blur', '#csag352__cep', function() {
	var mPais = $('#csag352__pais').val();
	
	if (mPais == "BRA") {
		var cep = $(this).val().replace('-', '');
		
		if (cep != "") {
			var validacep = /^[0-9]{8}$/;
			
			if (validacep.test(cep)) {
				$('#csag352__logradouro').val("...");
				$('#csag352__bairro').val("...");
				$('#csag352_cidade_nome').val("...");
				$('#csag352__estado').val("...");
				
				debugger;
				
				$.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
					if (!("erro" in dados)) {
						$('#csag352__logradouro').val(dados.logradouro);
						$('#csag352__bairro').val(dados.bairro);
						$('#csag352__estado').val(dados.uf);
						
						var sParametros = dados.localidade + '","BRA","' + dados.uf + '","' + $('#jaUsuarioSessao').val();
						
						var sRetorno = ReadFuncValue(sParametros, "oPAG325_01", "get_f_bcsag325_codigo");
						var obj = $.parseJSON(sRetorno);
						
						$('#csag352__cidade_cd').val(obj['id']);
						$('#csag352_cidade_nome').val(obj['value']);
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
// BUSCA (CIDADE_CD, UF) ATRAVÉS DO (CIDADE_NOME)
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
		$('#td-estado').html('<input type="text" size="90" name="csag352__estado" id="csag352__estado" maxlength="90" class="form-control col-xs-6" placeholder="ESTADO" style="text-align:left;">');
		
		return;
	}
	
	$('#csag352__estado').addClass('col-xs-6');
}