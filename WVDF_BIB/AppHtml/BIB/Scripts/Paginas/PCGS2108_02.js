$(document).ready(function() {
	setTimeout(function() {
		$('div#pageTabContent div.active iframe', parent.parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);

		$('div#pageTabContent .tab-pane.active', parent.parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);
		
		$('#ifrm-pcgs2101_00', parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);
	}, 1000);
});

// PESQUISA PESSOA PELO ID
$(document).on('blur', '#selstart1', function() {
	if ($(this).val() != "0") {
		$.ajax({
			url: '/WVDF_WS/ws_hcgs2101_01.wso/f_CONCORRENTE_DESCRICAO/JSON',
			data: {
				sSESSIONID: getVariavelURL('aUsuarioSessao'),
				sCODIGO: $(this).val()
			}
		}).done(function(data) {
			if ((data.Descricao).substr(0, 4) == "ERR#" ) {
				alertify.error((data.Descricao).substr(4));
				$('#csag320_descricao').val('');
				return;
			}
			$('#csag320_descricao').val(data.Descricao);
		});
	}
});

// CONFIGURA PREENCHIMENTO AUTOMATICO CAMPO DESCRICAO CLIENTE - CONCORRENCIA
$(function() {
    $("#csag320_descricao").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag320_clientenome_conc.asp",
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
				$('#selstart1').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});