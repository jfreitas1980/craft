$(document).ready(function() {
	$.ajax({
		url: '/WVDF_WS/ws_CCGS224.wso/f_combo_typeofdate/JSON',
		data: {
			aUsuarioSessao: getVariavelURL('aUsuarioSessao')
		}
	}).success(function(data) {
		data.forEach(function(datade) {
			$('#j_id_dt_apartir').append('<option value="'+ datade.ID +'">'+ datade.DS +'</option>')
			console.log(datade);
		});

		var aux = $('#hcgs3000__id_dt_apartir').val();
		aux = aux.split(',');

		$('#j_id_dt_apartir').val(aux);
	});

	$(document).on('change', '#j_id_dt_apartir', function() {
		var aux = $(this).val();
		var aux2 = "";
		
		aux.forEach(function(datade) {
			console.log(datade);
			aux2 += datade + ",";
		});

		aux2 = aux2.substr(0, aux2.length - 1);

		$('#hcgs3000__id_dt_apartir').val(aux2);
	});

	// Formata os campos com as classes corretas.
	$('#hcgs3000__csag308_id').removeClass().addClass('form-control');
	$('#hcgs3000__ccgs202_id').removeClass().addClass('form-control');
	$('#hcgs3000__carrier_id').removeClass().addClass('col-xs-3');
	$('#hcgs3000__carrier_contrato').removeClass().addClass('form-control');
	$('#hcgs3000__descricao').removeClass().addClass('form-control');
	$('#hcgs3000__taxa_id').removeClass().addClass('col-xs-3');
	$('#hcgs3000__csag379_origem').removeClass().addClass('form-control');
	$('#hcgs3000__csag329_origem').removeClass().addClass('form-control');
	$('#hcgs3000__csag325_origem').removeClass().addClass('col-xs-3');
	$('#hcgs3000__csag379_destino').removeClass().addClass('form-control');
	$('#hcgs3000__csag329_destino').removeClass().addClass('form-control');
	$('#hcgs3000__csag325_destino').removeClass().addClass('col-xs-3');
	$('#hcgs3000__csag325_via').removeClass().addClass('col-xs-3');
	$('#hcgs3000__csag346_id_origem').removeClass().addClass('col-xs-3');
	$('#hcgs3000__csag346_id_destino').removeClass().addClass('col-xs-3');
	$('#hcgs3000__csag346_id_tp_clcd').removeClass().addClass('col-xs-3');
	$('#hcgs3000__csag345_id').removeClass().addClass('col-xs-3');
	$('#hcgs3000__container').removeClass().addClass('form-control');
	$('#hcgs3000__vl_compra').removeClass().addClass('form-control');
	$('#hcgs3000__vl_venda').removeClass().addClass('form-control');
	$('#hcgs3000__vl_coloader_c').removeClass().addClass('form-control');
	$('#hcgs3000__vl_coloader_v').removeClass().addClass('form-control');
	$('#hcgs3000__vl_wm').removeClass().addClass('form-control');
	$('#hcgs3000__vl_minimo').removeClass().addClass('form-control');
	$('#hcgs3000__vl_maximo').removeClass().addClass('form-control');
	$('#hcgs3000__vl_fcht_origem').removeClass().addClass('form-control');
	$('#hcgs3000__id_dt_apartir').removeClass().addClass('form-control');
	$('#hcgs3000__dt_inicial').removeClass().addClass('form-control');
	$('#hcgs3000__dt_final').removeClass().addClass('form-control');
	$('#hcgs3000__vl_minimo_c').removeClass().addClass('form-control');
	$('#hcgs3000__vl_minimo_v').removeClass().addClass('form-control');
	$('#hcgs3000__vl_maximo_c').removeClass().addClass('form-control');
	$('#hcgs3000__vl_maximo_v').removeClass().addClass('form-control');
	$('#hcgs3000__vl_minimo_col_c').removeClass().addClass('form-control');
	$('#hcgs3000__vl_maximo_col_c').removeClass().addClass('form-control');
	$('#hcgs3000__vl_minimo_col_v').removeClass().addClass('form-control');
	$('#hcgs3000__vl_maximo_col_v').removeClass().addClass('form-control');
	$('#hcgs3000__dimensions_m_l').removeClass().addClass('form-control');
	$('#hcgs3000__dimensions_m_w').removeClass().addClass('form-control');
	$('#hcgs3000__dimensions_m_h').removeClass().addClass('form-control');
	$('#hcgs3000__dimensions_inch_l').removeClass().addClass('form-control');
	$('#hcgs3000__dimensions_inch_w').removeClass().addClass('form-control');
	$('#hcgs3000__dimensions_inch_h').removeClass().addClass('form-control');
	$('#hcgs3000__weight_kgs').removeClass().addClass('form-control');
	$('#hcgs3000__weight_lbs').removeClass().addClass('form-control');
	$('#hcgs3000__overweight_kgs').removeClass().addClass('form-control');
	$('#hcgs3000__overweight_lbs').removeClass().addClass('form-control');
	$('#hcgs3000__cube_cbm').removeClass().addClass('form-control');
	$('#hcgs3000__cube_cft').removeClass().addClass('form-control');
	$('#hcgs3000__overlength_m').removeClass().addClass('form-control');
	$('#hcgs3000__overlength_inch').removeClass().addClass('form-control');
	$('#hcgs3000__incoterm').removeClass().addClass('form-control');
	$('#hcgs3000__tp_calculo_c').removeClass().addClass('form-control');
	$('#hcgs3000__tp_calculo_v').removeClass().addClass('form-control');
	$('#hcgs3000__tp_calc_col_c').removeClass().addClass('form-control');
	$('#hcgs3000__tp_calc_col_v').removeClass().addClass('form-control');
	$('#hcgs3000__frequencia').removeClass().addClass('form-control');
	$('#hcgs3000__observacoes').removeClass().addClass('form-control');

	// Coloca label nos checkbox.
	$('#switch-ID_IMO_checkbox').next().html('&nbsp;' + $('#lbl_IMO').val());
	$('#switch-ID_STACKBLE_checkbox').next().html('&nbsp;' + $('#lbl_STACKBLE').val());
	$('#switch-ID_PERSONNAL_checkbox').next().html('&nbsp;' + $('#lbl_PERSONNAL').val());
	
	// Oculta checkboxes TIPO_AC, caso o modal não seja SEA.
	if($('#hcgs3000__ccgs215_id').val() != "SEA") {
		$('#chk_SEA').hide();
	}

	if($('#hcgs3000__ccgs215_id').val() == "") {
		$('#carrierCampo').hide();
	}

	// Mostra/Oculta checkboxes TIPO_AC de acordo com o campo modal.
	$(document).on('change', '#hcgs3000__ccgs215_id', function() {
		if($(this).val() != "SEA") {
			$('#chk_SEA').hide();
		} else {
			$('#chk_SEA').show();
		}

		if($(this).val() == "") {
			$('#carrierCampo').hide();
		} else {
			$('#carrierCampo').show();
		}

	})

	// Preenche checkboxes TIPO_AC de acordo com o campo do banco.
	var tiposAc = ($('#hcgs3000__tipo_ac').val()).split(',');

	tiposAc.forEach(function(campo) {
		switch (campo) {
			case "A":
				$('#chk_armador').prop('checked', true);
				$('#chk_coloader').prop('checked', false);
				break;
			case "C":
				$('#chk_armador').prop('checked', false);
				$('#chk_coloader').prop('checked', true);
				break;
		}
	});

	// Muda campo do banco TIPO_AC de acordo com os checkboxes.
	$(document).on('change', '#chk_armador, #chk_coloader', function() {
		if ($(this).attr('id') == 'chk_armador' && $(this).prop('checked')) {
			$('#chk_coloader').prop('checked', false);
			$('#hcgs3000__tipo_ac').val('A');
		}

		if ($(this).attr('id') == 'chk_coloader' && $(this).prop('checked')) {
			$('#chk_armador').prop('checked', false);
			$('#hcgs3000__tipo_ac').val('C');
		}

		if (!($('#chk_armador').prop('checked')) && !($('#chk_coloader').prop('checked')))
			$('#hcgs3000__tipo_ac').val('');
	});

	// Coloca os checkbox referentes à classe da taxa.
	posisionaChkTaxa();

	// Muda campo do banco TAXA_CLASSES de acordo com os checkboxes.
	$(document).on('change', '[id^="chk_classe_"]', function() {
		var aux = "";
		$('[id^="chk_classe_"]:checked').each(function(index, value) {
			aux += $(value).attr('id').substr(11, 1) + ",";
		});

		$('#hcgs3000__taxa_classes').val(aux.substr(0, aux.length - 1));
	});

	// Configura SWITCHS de acordo com o campo do banco.
	$('[id^="switch-"').each(function(index, value) {
		var elementoFinal = ('hcgs3000__' + (value.id).replace('switch-', '').replace('_checkbox', '').toLowerCase());
		configuraSwitchs("", value, elementoFinal);	
	});

	// Muda campo do banco de acordo com o SWITCH
	$(document).on('change', '[id^="switch-"]', function() {
		var elementoFinal = 'hcgs3000__' + ($(this).attr('id').replace('switch-', '').replace('_checkbox', '').toLowerCase());

		configuraSwitchs($(this).prop('checked').toString(), $(this), elementoFinal);
	});

	// Adiciona datetime aos campos
	$('#hcgs3000__dt_inicial').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});

	$('#hcgs3000__dt_final').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	
	// Pesquisas - ID
	// Agente
	$(document).on('blur', '#hcgs3000__csag345_id', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/Ws_HCGS2101_01.wso/f_DescricaoCSAG345/JSON',
				data: {
					sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
					sCodigo: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3000__csag345_id').val('0');
					$('#agente_desc').val('');

					return;
				}

				$('#agente_desc').val(data.Descricao);
			});
		}
	});

	// Terminal Origem
	$(document).on('blur', '#hcgs3000__csag346_id_orig', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/Ws_HCGS2101_01.wso/f_DescricaoCSAG346/JSON',
				data: {
					sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
					sCodigo: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3000__csag346_id_orig').val('0');
					$('#terminal_desc_orig').val('');

					return;
				}

				$('#terminal_desc_orig').val(data.Descricao);
			});
		}
	});

	// Terminal Destino
	$(document).on('blur', '#hcgs3000__csag346_id_dest', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/Ws_HCGS2101_01.wso/f_DescricaoCSAG346/JSON',
				data: {
					sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
					sCodigo: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3000__csag346_id_dest').val('0');
					$('#terminal_desc').val('');

					return;
				}

				$('#terminal_desc').val(data.Descricao);
			});
		}
	});

	// Carrier
	$(document).on('blur', '#hcgs3000__carrier_id', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG' + carrierWs() + '/JSON',
				data: {
					sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
					sCodigo: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3000__carrier_id').val('0');
					$('#carrier_desc').val('');

					return;
				}

				$('#carrier_desc').val(data.Descricao);
			});
		}
	});

	// Taxa
	$(document).on('blur', '#hcgs3000__taxa_id', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_TAXA_DESCRICAO/JSON',
				data: {
					sSESSIONID: getVariavelURL('aUsuarioSessao'),
					sCODIGO: $(this).val()
				}
			}).success(function(data) {
				posisionaChkTaxa();

				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3000__taxa_id').val('0');
					$('#taxa_desc').val('');
					$('#hcgs3000__taxa_classes').val('');
					
					return;
				}

				$('#taxa_desc').val(data.Descricao);
			});
		}
	});

	// Origem
	$(document).on('blur', '#hcgs3000__csag325_origem', function() {
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

					$('#hcgs3000__csag325_origem').val('0');
					$('#origem_desc').val('');
					
					return;
				}

				$('#origem_desc').val(data.Descricao);
			});
		}
	});

	// Destino
	$(document).on('blur', '#hcgs3000__csag325_destino', function() {
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

					$('#hcgs3000__csag325_destino').val('0');
					$('#destino_desc').val('');
					
					return;
				}

				$('#destino_desc').val(data.Descricao);
			});
		}
	});

	// Destino
	$(document).on('blur', '#hcgs3000__csag325_via', function() {
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

					$('#hcgs3000__csag325_via').val('0');
					$('#via_desc').val('');
					
					return;
				}

				$('#via_desc').val(data.Descricao);
			});
		}
	});

	// Terminal
	$(document).on('blur', '#hcgs3000__csag346_id', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG346/JSON',
				data: {
					sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
					sCodigo: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3000__csag346_id').val('0');
					$('#terminal_desc').val('');
					
					return;
				}

				$('#terminal_desc').val(data.Descricao);
			});
		}
	});

	// Moeda Compra
	$(document).on('blur', '#hcgs3000__moeda_compra', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_moeda_descricao/JSON',
				data: {
					sSESSIONID: getVariavelURL('aUsuarioSessao'),
					sCODIGO: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3000__moeda_compra').val('0');
					$('#moe_compra').val('');
					
					return;
				}

				$('#moe_compra').val(data.Descricao);
			});
		}
	});

	// Moeda Venda
	$(document).on('blur', '#hcgs3000__moeda_venda', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_moeda_descricao/JSON',
				data: {
					sSESSIONID: getVariavelURL('aUsuarioSessao'),
					sCODIGO: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3000__moeda_venda').val('0');
					$('#moe_venda').val('');
					
					return;
				}

				$('#moe_venda').val(data.Descricao);
			});
		}
	});

	// Moeda Coloader
	$(document).on('blur', '#hcgs3000__moeda_coloader', function() {
		if ($(this).val() != 0) {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_moeda_descricao/JSON',
				data: {
					sSESSIONID: getVariavelURL('aUsuarioSessao'),
					sCODIGO: $(this).val()
				}
			}).success(function(data) {
				if ((data.Descricao).substr(0, 4) == "ERR#") {
					parent.alertify.error((data.Descricao).substr(4));

					$('#hcgs3000__moeda_coloader').val('0');
					$('#moe_col').val('');
					
					return;
				}

				$('#moe_col').val(data.Descricao);
			});
		}
	});

	// Autocompletes
	// Agente
	$('#agente_desc').autocomplete({
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
				$('#hcgs3000__csag345_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	// Carrier
	$('#carrier_desc').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbcsag'+ carrierWs() +'_descricao.asp',
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
				$('#hcgs3000__carrier_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
	
	// Taxa
	$('#taxa_desc').autocomplete({
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
				$('#hcgs3000__taxa_id').val(ui.item.id);
				$(this).val(ui.item.value);
				$.ajax({
					url: '/WVDF_WS/ws_HCGS3001.wso/f_classesSelTaxa/JSON',
					data: {
						aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
						sTaxaId: $('#hcgs3000__taxa_id').val()
					}
				}).success(function(data) {
					console.log(data);
					// $scope.lsClasseTaxa = data;

					// var campoOp = "";
					// data.forEach(function(classe) {
					// 	campoOp += classe.ID + ",";
					// });
					// campoOp = campoOp.substr(0, campoOp.length - 1);
					
					// $scope.mClassesTaxa = campoOp;
				});
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
	
	// Origem
	$('#origem_desc').autocomplete({
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
				$('#hcgs3000__csag325_origem').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
	
	// Destino
	$('#destino_desc').autocomplete({
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
				$('#hcgs3000__csag325_destino').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	// Via
	$('#via_desc').autocomplete({
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
				$('#hcgs3000__csag325_via').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
	
	// Terminal Origem
	$('#terminal_desc_orig').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbcsag346_descricao.asp',
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
				$('#hcgs3000__csag346_id_orig').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	// Terminal Destino
	$('#terminal_desc').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbcsag346_descricao.asp',
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
				$('#hcgs3000__csag346_id_dest').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
	
	// Moeda Compra
	$('#moe_compra').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbccgs218_descricao.asp',
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
				$('#hcgs3000__moeda_compra').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
	
	// Moeda Venda
	$('#moe_venda').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbccgs218_descricao.asp',
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
				$('#hcgs3000__moeda_venda').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
	
	// Moeda Coloader
	$('#moe_col').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'fbccgs218_descricao.asp',
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
				$('#hcgs3000__moeda_coloader').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	// Blur nos campos de ID.
	$('#hcgs3000__carrier_id').blur();
	$('#hcgs3000__taxa_id').blur();
	$('#hcgs3000__csag325_origem').blur();
	$('#hcgs3000__csag325_destino').blur();
	$('#hcgs3000__csag346_id').blur();
	$('#hcgs3000__moeda_compra').blur();
	$('#hcgs3000__moeda_venda').blur();
	$('#hcgs3000__moeda_coloader').blur();
});

// Função para decidir qual a tabela que o AC do carrier será pesquisado.
function carrierWs() {
	var funcaoWs = "";

	switch ($('#hcgs3000__ccgs215_id').val()) {
		case "AIR":
			funcaoWs = "343";
			break;
		case "DUTO":
			funcaoWs = "";
			break;
		case "SEA":
			funcaoWs = "342";
			break;
		case "LAND":
			funcaoWs = "349";
			break;
	}

	return funcaoWs;
}

function posisionaChkTaxa() {
	$('#divClasseTaxas').empty();

	if ($('#hcgs3000__taxa_id').val() != "0" && $('#hcgs3000__taxa_id').val() != "" && $('#hcgs3000__taxa_id').val() != undefined) {
		$.ajax({
			url: '/WVDF_WS/ws_HCGS3001.wso/f_classesSelTaxa/JSON',
			data: {
				aUsuarioSessao:getVariavelURL('aUsuarioSessao'),
				sTaxaId: $('#hcgs3000__taxa_id').val()
			}
		}).success(function(data) {
			var campoOp = "";
			var campoDs = "";

			data.forEach(function(classe) {
				campoOp += classe.ID + ",";
				campoDs += classe.DS + ",";
			});
			campoOp = campoOp.substr(0, campoOp.length - 1);
			campoDs = campoDs.substr(0, campoDs.length - 1);

			var classeTaxa   = campoOp.split(',');
			var classeTaxaDS = campoDs.split(',');
			var classesBanco = ($('#hcgs3000__taxa_classes').val()).split(',');
			var classeAux = new Array();
			var erro = false;



			classeTaxa.forEach(function(campo) {
				classeAux.push(campo.substr(0, 1));
			})

			classesBanco.forEach(function(campo) {
				if (classeAux.indexOf(campo) == -1)
					erro = true;
			});

			if (erro) {
				$('#hcgs3000__taxa_classes').val('');
			}

			classeTaxaDS.forEach(function(campo) {
				if (campo != "") {
					html = "<label><input id='chk_classe_" + campo.substr(0,1) + "' class='ace ace-switch ace-switch-6' type='checkbox'><span class='lbl'>&nbsp;"+campo+"</span></label>";
					$('#divClasseTaxas').append(html);

					// Preenche checkboxes TAXAS_CLASSES de acordo com o campo do banco.
					$('[id^="chk_class"]').each(function() {
						$(this).prop('checked', false);
					});

					var taxasClasses = ($('#hcgs3000__taxa_classes').val()).split(',');

					taxasClasses.forEach(function(campo) {
						if(campo != "") {
							$('#chk_classe_' + campo).prop('checked', true);
						}
					});
				}
			});
		});
	}
}

// ANGULAR JS
app = angular.module('pcgs300001App', ['ui.bootstrap']);

app.factory('buscaWS', function($http) {
	return {
		get: function(url, parametros) {
			return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
				return res.data;
			});
		}	
	};
});

app.controller('pcgs300001Controller', function($scope, buscaWS, $http) {
	buscaWS.get('/WVDF_WS/ws_CCGS221.wso/f_combo_tpcalc/JSON', 'sTP_C=').then(function(data) {
		$scope.lsTpValor = data;
		$scope.mCTpValorCompra = $scope.lsTpValor[0].ID;

		$scope.mCTpValorVenda = $scope.lsTpValor[0].ID;
	});
	
	buscaWS.get('/WVDF_WS/ws_HCGS3000.wso/f_combo_incorterm/JSON', '').then(function(data) {
		$scope.lsIncoterm = data;

		if ($('#hcgs3000__incoterm').val() != "")
			$scope.mIncoterm = $('#hcgs3000__incoterm').val();
	});

	$scope.$watch("mIncoterm", function(sNew, sOld) {
		if (sNew != "" && sNew != undefined)
			$('#hcgs3000__incoterm').val(sNew);
	});
});
