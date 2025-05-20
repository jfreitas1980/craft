$(document).ready(function() {
	// Formata os campos com as classes corretas.
	$('#hcgs3012__num_item').removeClass().addClass('form-control');
	$('#hcgs3012__ccgs210_id').removeClass().addClass('form-control');
	$('#hcgs3012_ccgs210_id').removeClass().addClass('form-control');
	$('#hcgs3012__des_tipo_volume').removeClass().addClass('form-control');
	$('#hcgs3012__tp_modalidade').removeClass().addClass('form-control');
	$('#hcgs3012__des_produto').removeClass().addClass('form-control');
	$('#hcgs3012__id_margem').removeClass().addClass('form-control');
	$('#hcgs3012__numcontrarmador').removeClass().addClass('form-control');
	$('#hcgs3012__ttime').removeClass().addClass('form-control');
	$('#hcgs3012__ftime').removeClass().addClass('form-control');
	$('#hcgs3012__frequencia').removeClass().addClass('form-control');
	$('#hcgs3012__sts_porta_porta').removeClass().addClass('form-control');
	$('#hcgs3012__des_nbm_ncm').removeClass().addClass('form-control');
	$('#hcgs3012__dt_aprovado').removeClass().addClass('form-control');
	$('#hcgs3012__des_complemento').removeClass().addClass('form-control');

	// Campo readonly
	$('#hcgs3012_ccgs210_id').attr('disabled', 'true');
	
	if (getVariavelURL('idProduto') != false) {
		$('#hcgs3012_ccgs210_id').val(getVariavelURL('idProduto'))
		$('#hcgs3012__ccgs210_id').val(getVariavelURL('idProduto'))
	}

	if ($('#hcgs3012__num_item').val() == 0)
		$('#btnAcao').hide();

	// Coloca label nos checkbox.
	$('#switch-IMPRIME_ARMADOR_checkbox').next().html('&nbsp;' + $('#lbl_ImprimeArmador').val());
	$('#switch-ID_APROVADO_checkbox').next().html('&nbsp;' + $('#lbl_IdAprovado').val());

	// Configura SWITCHS de acordo com o campo do banco.
	$('[id^="switch-"').each(function(index, value) {
		var elementoFinal = ('hcgs3012__' + (value.id).replace('switch-', '').replace('_checkbox', '').toLowerCase());
		configuraSwitchs("", value, elementoFinal);	
	});

	// Muda campo do banco de acordo com o SWITCH
	$(document).on('change', '[id^="switch-"]', function() {
		var elementoFinal = 'hcgs3012__' + ($(this).attr('id').replace('switch-', '').replace('_checkbox', '').toLowerCase());

		configuraSwitchs($(this).prop('checked').toString(), $(this), elementoFinal);
	});

	// Limitar Caracteres Complemento
	$(document).on('keyup', '#hcgs3012__des_complemento', function() {
		var texto = $(this).val();

		 if (texto.length > 200){
		  parent.parent.parent.alertify.error("Texto deve conter apenas 200 caracteres");
		  $(this).val(texto.substr(0, 200));
		 }
	});

	// Pesquisas - ID
	// POL
	$(document).on('blur', '#hcgs3012__csag325_origem', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_POL_DESCRICAO/JSON',
				data: {
					sSESSIONID: getVariavelURL('aUsuarioSessao'),
					sCODIGO: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3012__csag325_origem').val('0');
					$('#nmOrigem').val('');
					
					return;
				}

				$('#nmOrigem').val(data.Descricao);
			});
		}
	});

	// POD
	$(document).on('blur', '#hcgs3012__csag325_destino', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_POL_DESCRICAO/JSON',
				data: {
					sSESSIONID: getVariavelURL('aUsuarioSessao'),
					sCODIGO: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3012__csag325_destino').val('0');
					$('#nmDestino').val('');
					
					return;
				}

				$('#nmDestino').val(data.Descricao);
			});
		}
	});

	// DTA
	$(document).on('blur', '#hcgs3012__csag325_dta', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_POL_DESCRICAO/JSON',
				data: {
					sSESSIONID: getVariavelURL('aUsuarioSessao'),
					sCODIGO: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3012__csag325_dta').val('0');
					$('#nmDTA').val('');
					
					return;
				}

				$('#nmDTA').val(data.Descricao);
			});
		}
	});

	// EADI
	$(document).on('blur', '#hcgs3012__csag325_eadi', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_POL_DESCRICAO/JSON',
				data: {
					sSESSIONID: getVariavelURL('aUsuarioSessao'),
					sCODIGO: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3012__csag325_eadi').val('0');
					$('#nmEADI').val('');
					
					return;
				}

				$('#nmEADI').val(data.Descricao);
			});
		}
	});

	// Armador
	$(document).on('blur', '#hcgs3012__carrier_id', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG342/JSON',
				data: {
					sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
					sCodigo: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3012__carrier_id').val('0');
					$('#nmArmador').val('');

					return;
				}

				$('#nmArmador').val(data.Descricao);
			});
		}
	});

	// Armador
	$(document).on('blur', '#hcgs3012__csag345_id', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: 'URLAGENTE',
				data: {
					sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
					sCodigo: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3012__csag345_id').val('0');
					$('#nmAgente').val('');

					return;
				}

				$('#nmAgente').val(data.Descricao);
			});
		}
	});

	// Autocompletes
	// POL
	$('#nmOrigem').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbcsag325_descricao.asp',
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
				$('#hcgs3012__csag325_origem').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	// POD
	$('#nmDestino').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbcsag325_descricao.asp',
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
				$('#hcgs3012__csag325_destino').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	// DTA
	$('#nmDTA').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbcsag325_descricao.asp',
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
				$('#hcgs3012__csag325_dta').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	// DTA
	$('#nmEADI').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbcsag325_descricao.asp',
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
				$('#hcgs3012__csag325_eadi').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	// Armador
	$('#nmArmador').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbcsag342_descricao.asp',
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
				$('#hcgs3012__carrier_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	// Agente
	$('#nmAgente').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbcsag345_descricao.asp',
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
				$('#hcgs3012__csag345_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	// Blur nos campos de ID.
	$('#hcgs3012__csag325_origem').blur();
	$('#hcgs3012__csag325_destino').blur();
	$('#hcgs3012__csag325_dta').blur();
	$('#hcgs3012__csag325_eadi').blur();
	$('#hcgs3012__carrier_id').blur();
	$('#hcgs3012__csag345_id').blur();

	// Posiciona tabs.
	var url = "PCGS3019_00.asp";
	url += "?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
	url += "&idProposta=" + getVariavelURL('aNUMPROP');
	url += "&idItem=" + $('#hcgs3012__num_item').val();

	$('#frameTaxas').attr('src', url);

	// BreadCrumbs Click Proposta.
	$(document).on('click', '#clickProposta', function() {
		urlManutencao = "PCGS3013_01.asp?";
		urlManutencao += "aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
		urlManutencao += "&RowId=" + getVariavelURL('RowIdProposta');
		urlManutencao += "&aCSAG320_ID=" + getVariavelURL('aNUMPROP');

		document.location = urlManutencao;
	});

	// Monta SELECT dos ITEMS.
	$.ajax({
		url: '/WVDF_WS/ws_hcgs3013.wso/f_item_rel/JSON',
		type: 'POST',
		data: { 
			'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
			'sProposta': getVariavelURL('aNUMPROP'),
			'sProduto': getVariavelURL('idProduto'),
		},
		dataType: 'json',
		success: function(json) {
			var select = "";
			select += "<select id='selectItem'>";
			select += "<option value='0'>Novo Item</option>";

			json.forEach(function(campo) {
				select += "<option rowId='" + campo.sRowid + "' itemId='" + campo.IT_ID + "' value='" + campo.IT_ID + "'>Item " + campo.IT_ID + "</option>";
			});

			select += "</select>";

			$('#clickItem').html(select);

			// Posiciona Select
			$('#selectItem').val($('#hcgs3012__num_item').val())
		}
	});

	// BreadCrumbs Muda Item
	$(document).on('change', '#selectItem', function() {
		if ($(this).val() == 0) {
			urlManutencao = "PCGS3012_01.asp?";
			urlManutencao += "aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
			urlManutencao += "&RowId=";
			urlManutencao += "&aNUMPROP=" + getVariavelURL('aNUMPROP');
			urlManutencao += "&RowIdProposta=" + getVariavelURL('RowIdProposta');
			urlManutencao += "&idProduto=" + getVariavelURL('idProduto');
			urlManutencao += "&dsProduto=" + getVariavelURL('dsProduto');
		}
		else {
			urlManutencao = "PCGS3012_01.asp?";
			urlManutencao += "aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
			urlManutencao += "&RowId=" + $('#selectItem :selected').attr('rowid');
			urlManutencao += "&aNUMPROP=" + getVariavelURL('aNUMPROP');
			urlManutencao += "&RowIdProposta=" + getVariavelURL('RowIdProposta');
			urlManutencao += "&idProduto=" + getVariavelURL('idProduto');
			urlManutencao += "&dsProduto=" + getVariavelURL('dsProduto');
		}

		document.location = urlManutencao;
	});

});