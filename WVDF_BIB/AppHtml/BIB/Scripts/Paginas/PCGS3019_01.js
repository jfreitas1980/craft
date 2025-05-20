$(document).ready(function() {
	// Redimensiona
	parent.iFrameResize({
		checkOrigin				: false,
		log                     : false,                  // Enable console logging
		enablePublicMethods     : true,                  // Enable methods within iframe hosted page
	});

	// Formata campos bootstrap
	$('#hcgs3019__hcgs3001_id').removeClass().addClass('col-xs-3');
	$('#hcgs3019__cod_moeda').removeClass().addClass('col-xs-3');
	$('#hcgs3019__vl_taxa').removeClass().addClass('form-control');
	$('#hcgs3019__ds_valor').removeClass().addClass('form-control');
	$('#hcgs3019__valor_compra').removeClass().addClass('form-control');
	$('#hcgs3019__seq_impressao').removeClass().addClass('form-control');
	$('#hcgs3019__ccgs217_id').removeClass().addClass('form-control');
	$('#hcgs3019__pc_taxa').removeClass().addClass('form-control');
	$('#hcgs3019__vl_minimo').removeClass().addClass('form-control');
	$('#hcgs3019__pc_taxacompra').removeClass().addClass('form-control');
	$('#hcgs3019__vl_minimocompra').removeClass().addClass('form-control');

	// Auto Completes
	// Moeda
	$("#moeda_desc").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbccgs218_descricao.asp",
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
				$('#hcgs3019__cod_moeda').val(ui.item.id);
				$('#moeda_desc').val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	//Taxa
	$('#taxas_desc').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbhcgs3001_descricao.asp',
				data: {
					aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
					term: retiraAcento(req.term)
				},
				dataType: 'json',
				success: function(data) {
					res(data);
				}
			});
		},
		minLength: 2,
		open: function(e, ui) {
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
				$('#hcgs3019__hcgs3001_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	// Pesquisa ID
	// Moeda
	$(document).on('blur', '#hcgs3019__cod_moeda', function() {
		if($(this).val() != "0") {
			$.ajax({
				url: "/WVDF_WS/ws_hcgs2101_01.wso/f_moeda_descricao/JSON",
				data: {
					sSESSIONID: getVariavelURL('aUsuarioSessao'),
					sCODIGO: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#" ) {			
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3019__cod_moeda').val('0');
					$('#moeda_desc').val('');

					return;
				}

				$('#moeda_desc').val(data.Descricao);
			});
		}
	});

	// Taxa
	$(document).on('blur', '#hcgs3019__hcgs3001_id', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_TAXA_DESCRICAO/JSON',
				data: {
					sSESSIONID: getVariavelURL('aUsuarioSessao'),
					sCODIGO: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3019__hcgs3001_id').val('0');
					$('#taxas_desc').val('');
					
					return;
				}

				$('#taxas_desc').val(data.Descricao);
			});
		}
	});

	// Blur nos campos ID.
	$('#hcgs3019__cod_moeda').blur();
	$('#hcgs3019__hcgs3001_id').blur();
});