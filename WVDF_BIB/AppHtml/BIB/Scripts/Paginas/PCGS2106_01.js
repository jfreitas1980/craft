var aHCGS2105Id;

// FORMATA A PAGINA
$(document).ready(function () {
	
	$('#hcgs2106__csag325_pol').removeClass('col-xs-6').addClass('col-xs-2');
	$('#csag325_origem').removeClass('col-xs-5').addClass('col-xs-10');
	$('#hcgs2106__csag325_pod').removeClass('col-xs-6').addClass('col-xs-2');
	$('#csag325_destino').removeClass('col-xs-5').addClass('col-xs-10');
	$('#hcgs2106__csag379_id').removeClass('col-xs-6').addClass('col-xs-2');
	$('#csag379_id').removeClass('col-xs-5').addClass('col-xs-10');
	
	// PASSA A aHCGS2101Id PARA O SEU RESPECTIVO INPUT
	aHCGS2105Id = $('#aHCGS2105Id').val();
	$('#hcgs2106__hcgs2105_id').val(aHCGS2105Id);
	
	// PREENCHE OS CAMPOS
	$('#hcgs2106__csag325_pol').blur();
	$('#hcgs2106__csag325_pod').blur();
	$('#hcgs2106__csag379_id').blur();
	
	// window.setTimeout(function(){
		// var altura = ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2;
		// if (altura == 0)
			// altura = 2000;
		
		// $('div#pageTabContent .tab-pane.active', parent.parent.parent.document).css('height', (altura));
		
		// $('div#pageTabContent div.active iframe', parent.parent.parent.document).css('height', (altura));
		
		// $('#ifrm-pcgs2101_00', parent.parent.document).css('height', (altura));
	// }, 1000);
});

// PESQUISA POL PELO ID
$(document).on('blur', '#hcgs2106__csag325_pol', function() {
	if ($(this).val() != "0") {
		$.ajax({
			url: '/WVDF_WS/ws_hcgs2101_01.wso/f_POL_DESCRICAO/JSON',
			data: {
				sSESSIONID: getVariavelURL('aUsuarioSessao'),
				sCODIGO: $(this).val()
			}
		}).done(function(data) {
			if ((data.Descricao).substr(0, 4) == "ERR#" ) {
				alertify.error((data.Descricao).substr(4));
				$('#csag325_origem').val('');
				return;
			}
			$('#csag325_origem').val(data.Descricao);
		});
	}
});

// PESQUISA POD PELO ID
$(document).on('blur', '#hcgs2106__csag325_pod', function() {
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
				$('#csag325_destino').val('');
				return;
			}
			$('#csag325_destino').val(data.Descricao);
		});
	}
});

// PESQUISA TRADE PELO ID
$(document).on('blur', '#hcgs2106__csag379_id', function() {
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
				$('#csag379_id').val('');
				return;
			}
			$('#csag379_id').val(data.Descricao);
		});
	}
});





// AUTOCOMPLETE DESCRIÇÃO PARA POSICIONAR ID - CIDADE - POL
$(function() {
    $("#csag325_origem").autocomplete({
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
				$('#hcgs2106__csag325_pol').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});

// AUTOCOMPLETE DESCRIÇÃO PARA POSICIONAR ID - CIDADE - POD
$(function() {
    $("#csag325_destino").autocomplete({
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
				$('#hcgs2106__csag325_pod').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});

/*
// CONFIGURA AJAX BUSCA ID CIDADE - POL
$(document).on('blur', '#hcgs2106__csag325_pol', function() {
	var sParamet = $(this).val();

	var sRetorno = ReadFuncValue(sParamet, "oPAG325_01", "get_f_pgcsag325_descricao");
	
	if (sRetorno.substr(0, 4) == "ERR#" ) {
		alertify.error(sRetorno.substr(4));
		return;
	}
	$('#csag325_origem').val(sRetorno);
});

// CONFIGURA AJAX BUSCA ID CIDADE - POD
$(document).on('blur', '#hcgs2106__csag325_pod', function() {
	var sParamet = $(this).val();

	var sRetorno = ReadFuncValue(sParamet, "oPAG325_01", "get_f_pgcsag325_descricao");
	
	if (sRetorno.substr(0, 4) == "ERR#" ) {
		alertify.error(sRetorno.substr(4));
		return;
	}
	$('#csag325_destino').val(sRetorno);
});

// CONFIGURA AJAX BUSCA ID CLIENTE - TRADE
$(document).on('blur', '#hcgs2106__csag379_id', function() {
	var sParamet = $(this).val();

	var sRetorno = ReadFuncValue(sParamet, "oPAG320_01", "get_f_pegaDescricao_Trade");
	
	if (sRetorno.substr(0, 4) == "ERR#" ) {
		alertify.error(sRetorno.substr(4));
		return;
	}
	$('#csag379_id').val(sRetorno);
});
*/

// CONFIGURA PREENCHIMENTO AUTOMATICO CAMPO DESCRICAO CLIENTE - TRADE
$(function() {
    $("#csag379_id").autocomplete({
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
				$('#hcgs2106__csag379_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});
