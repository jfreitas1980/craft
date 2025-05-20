var aHCGS2105Id;

// FORMATA A PAGINA
$(document).ready(function () {
	
	$('#hcgs2108__csag320_id').removeClass('col-xs-6').addClass('col-xs-2');
	$('#csag320_descricao').removeClass('col-xs-6').addClass('col-xs-10');
	
	// PASSA A aHCGS2101Id PARA O SEU RESPECTIVO INPUT
	aHCGS2105Id = $('#aHCGS2105Id').val();
	$('#hcgs2108__hcgs2105_id').val(aHCGS2105Id);
	
	window.setTimeout(function(){
		$('div#pageTabContent .tab-pane.active', parent.parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);
		
		$('div#pageTabContent div.active iframe', parent.parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);
		
		$('#ifrm-pcgs2101_00', parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);
	}, 1000);
	
	$('#hcgs2108__csag320_id').blur();
	
});

// PESQUISA PESSOA PELO ID
$(document).on('blur', '#hcgs2108__csag320_id', function() {
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
				$('#hcgs2108__csag320_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});