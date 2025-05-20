// FORMATA A PAGINA
$(document).ready(function () {
	
	// PREENCHE OS CAMPOS
	$('#hcgs3024__cidade_id').blur();
	$('#hcgs3024__armador_id').blur();
});

// PESQUISA ARMADOR PELO ID
$(document).on('blur', '#hcgs3024__armador_id', function() {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG342/JSON",
		data: {
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: $(this).val()
		}
	}).done(function(data) {
		if ((data.Descricao).substr(0, 4) == "ERR#" ) {			
			parent.alertify.error((data.Descricao).substr(4));
			$('#arma_desc').val('');
			return;
		}
		$('#arma_desc').val(data.Descricao);
	});
});



// PESQUISA POL PELO ID
$(document).on('blur', '#hcgs3024__cidade_id', function() {
	if ($(this).val() != "0") {
		$.ajax({
			url: '/WVDF_WS/ws_hcgs2101_01.wso/f_POD_DESCRICAO/JSON',
			data: {
				sSESSIONID: getVariavelURL('aUsuarioSessao'),
				sCODIGO: $(this).val()
			}
		}).done(function(data) {
			if ((data.Descricao).substr(0, 4) == "ERR#" ) {
				parent.alertify.error((data.Descricao).substr(4));
				$('#cid_desc').val('');
				return;
			}
			$('#cid_desc').val(data.Descricao);
		});
	}
});


// AUTOCOMPLETE DESCRIÇÃO PARA POSICIONAR ID - CIDADE
$(function() {
    $("#cid_desc").autocomplete({
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
				$('#hcgs3024__cidade_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});

// AUTOCOMPLETE ARMADOR
$(function() {
    $("#arma_desc").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag342_descricao.asp",
				data: {
					aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
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
				$('#hcgs3024__armador_id').val(ui.item.id);
				$('#arma_desc').val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});


