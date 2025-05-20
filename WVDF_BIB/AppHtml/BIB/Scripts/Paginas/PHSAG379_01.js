// FORMATAR TELA
$('document').ready(function () {
	
	$('#hsag379__csag379_id').removeClass('col-xs-6').addClass('col-xs-1');
	$('#hsag379__csag325_id').removeClass('col-xs-6').addClass('col-xs-1');
	
	$('#hsag379__csag379_id').blur();
	$('#hsag379__csag325_id').blur();

});


// AUTOCOMPLETE DESCRIÇÃO PARA POSICIONAR ID - TRADELINE
$(function() {
    $("#csag379_desc").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag379_descricao.asp",
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
				$('#hsag379__csag379_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.value + " - " + item.cidade + "</a>").appendTo(ul);
	};
});


// PESQUISA TRADE PELO ID
$(document).on('blur', '#hsag379__csag379_id', function() {
	if ($(this).val() != "0") {
		$.ajax({
			url: '/WVDF_WS/ws_hcgs2101_01.wso/f_TRADE_DESCRICAO/JSON',
			data: {
				sSESSIONID: getVariavelURL('aUsuarioSessao'),
				sCODIGO: $(this).val()
			}
		}).done(function(data) {
			if ((data.Descricao).substr(0, 4) == "ERR#" ) {
				alertify.error((data.Descricao).substr(4));
				$('#csag379_desc').val('');
				return;
			}
			$('#csag379_desc').val(data.Descricao);
		});
	}
});



// AUTOCOMPLETE DESCRIÇÃO PARA POSICIONAR ID - CIDADE
$(function() {
    $("#csag325_desc").autocomplete({
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
				$('#hsag379__csag325_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.value + " - " + item.cidade + "</a>").appendTo(ul);
	};
});

// PESQUISA CIDADE PELO ID
$(document).on('blur', '#hsag379__csag325_id', function() {
	if ($(this).val() != "0") {
		$.ajax({
			url: '/WVDF_WS/ws_hcgs2101_01.wso/f_POD_DESCRICAO/JSON',
			data: {
				sSESSIONID: getVariavelURL('aUsuarioSessao'),
				sCODIGO: $(this).val()
			}
		}).done(function(data) {
			if ((data.Descricao).substr(0, 4) == "ERR#" ) {
				alertify.error((data.Descricao).substr(4));
				$('#csag352_cidade_nome').val('');
				return;
			}
			$('#csag325_desc').val(data.Descricao);
		});
	}
});

