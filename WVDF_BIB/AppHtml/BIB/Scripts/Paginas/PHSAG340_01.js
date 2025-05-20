var jCsag320Id;

// FORMATAR TELA
$('document').ready(function () {
	//jCsag320Id = $('#jCsag320Id').val();
	
	$('#hsag340__csag320_id').removeClass('col-xs-6').addClass('col-xs-1');
	$('#csag320_dec').removeClass('col-xs-6').addClass('col-xs-5');
	$('#hsag340__grupo_descr').removeClass('col-xs-6').addClass('col-xs-7');
	$('#hsag340__nrdocto_raiz').removeClass('col-xs-6').addClass('col-xs-7');
	$('#hsag340_tppessoa').removeClass('col-xs-6').addClass('col-xs-7');
	$('#hsag340__csag320_id').prop('readonly', true);
	$('#csag320_desc').prop('readonly', true);
	$('#hsag340_tppessoa').prop('readonly', true);
	// SHADOW
	$('#hsag340__tppessoa').attr('disabled', 'disabled'); 
	
	// PREENCHE OS CAMPOS
	$('#hsag340__csag320_id').blur();
	
	// ESCONDE CAMPO NOVO E EXCLUIR
	$('#btnNovo').hide();
	$('#btnExcluir').hide();
	
	configuraSwitchs("", $('#switch-RETORNAR_RAIZ_checkbox'), 'hsag340__retornar_raiz');	
});

// CONFIGURA CHECKBOX
$(document).on('change', '#switch-RETORNAR_RAIZ_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'hsag340__retornar_raiz');
});

$(document).on('change', '#hsag340__nrdocto_raiz', function() {
	$('#hsag340__grupo_descr').val($(this).children("option").filter(":selected").text());
});

// PESQUISA PESSOA PELO ID
$(document).on('blur', '#hsag340__csag320_id', function() {
	if ($(this).val() !='0') {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG320/JSON",
		data: {
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: $(this).val()
		}
	}).done(function(data) {
		if ((data.Fantasia).substr(0, 4) == "ERR#" ) {			
			parent.alertify.error((data.Fantasia).substr(4));
			$('#csag320_desc').val('');
			return;
		}
		$('#csag320_desc').val(data.Fantasia);
	});
	}
});

// CONFIGURA PREENCHIMENTO AUTOMATICO CAMPO DESCRICAO PESSOA
$(function() {
    $("#csag320_desc").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag320_descricao_pessoa.asp",
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
				$('#hsag340__csag320_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});

// CONFIGURA PREENCHIMENTO AUTOMATICO CAMPO DESCRICAO GRUPO
// $(function() {
    // $("#hsag340__grupo_descr").autocomplete({
        // source: function (request, response) {
			// $.ajax({
				// url: "fbcsag332_grupos_descricao.asp",
				// data: {
					// aUsuarioSessao: $('#jaUsuarioSessao').val(),
					// term: retiraAcento(request.term)
				// },
				// dataType: "json",
				// success: function (data) {
					// response(data);
				// }
			// });
		// },
        // minLength: 2,
		// open: function(e,ui) {
			// var termTemplate = '<strong>%s</strong>';
			// var acData = $(this).data('uiAutocomplete');
			// acData
			// .menu
			// .element
			// .find('a')
			// .each(function() {
				// var me = $(this);
				// var regex = new RegExp(acData.term, "gi");
				// me.html(me.text().replace(regex, function (matched) {
					// return termTemplate.replace('%s', matched);
				// }));
			// });
		// },
        // select: function(event, ui) {
            // if (ui.item) {
				// $(this).val(ui.item.value);
				// return false;
			// }
        // }
	// }).autocomplete("instance")._renderItem = function(ul, item) {
		// return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	// };
// });





