$(document).ready(function() {
	//BUCETA
	// Formata os campos com as classes corretas.
	$('#hcgs3013__num_cotacao').removeClass().addClass('form-control');
	$('#hcgs3013__dat_cotacao').removeClass().addClass('form-control');
	$('#hcgs3013__dat_saida').removeClass().addClass('form-control');
	$('#hcgs3013__csag308_id').removeClass().addClass('form-control');
	$('#hcgs3013__incoterm').removeClass().addClass('form-control');
	$('#hcgs3013__tipoempresa').removeClass().addClass('form-control');
	$('#hcgs3013__contato_cliente').removeClass().addClass('form-control');
	$('#hcgs3013__descritivo_prop').removeClass().addClass('form-control');
	$('#hcgs3013__cd_em_nome_de').removeClass().addClass('form-control');
	$('#hcgs3013__dt_validade_ini').removeClass().addClass('form-control');
	$('#hcgs3013__dt_validade_fim').removeClass().addClass('form-control');
	$('#hcgs3013__cancelada_motivo').removeClass().addClass('form-control');

	// Esconde botao documentos
	if ($('#hcgs3013__num_cotacao').val() == 0) {
		$('#btnGed').hide();
		$('#btnAcao').hide();
	}

	url = "HGED4001_03.asp?aUsuarioSessao="+getVariavelURL('aUsuarioSessao')+"&Nm_Tabela=HCGS3013&Id_Registro="+$('#hcgs3013__rowid').val()+"&Nm_Campo=rowid";
	
	$('#iframeUpload').attr('src', url);

	// Tratamento da data
	if ($('#hcgs3013__dt_validade_fim').val() != "") {
		mostraBotoes();
	}

	if ($('#hcgs3013__num_cotacao').val() != "0") {
		$('#showProdutos').show();

		var url = "";
		url += "PCGS3011_05.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
		url += "&idProposta=" + $('#hcgs3013__num_cotacao').val();

		$('#iframeProdutos').attr('src', url);
	} else {
		$('#showProdutos').hide();
	}

	if (getVariavelURL('Save')) {
		parent.parent.alertify.success('Preencha os produtos da proposta!');
		parent.parent.$('html, body').animate({
	        scrollTop: $("#showProdutos").offset().top
	    }, 2000);
	}

	// Formata campos de data.
	$('#hcgs3013__dat_cotacao').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	}).mask("99/99/9999");
	
	$('#hcgs3013__dat_saida').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	}).mask("99/99/9999");
	
	$('#hcgs3013__dt_validade_ini').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	}).mask("99/99/9999");

	$('#hcgs3013__dt_validade_fim').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	}).mask("99/99/9999");

	// AC
	// Vendedor
	$("#nmVendedor").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag341_descricao.asp",
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
				$('#hcgs3013__csag341_id').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
	
	// AUTOCOMPLETE CLIENTE
	$(function() {
		$("#nm_emnomede").autocomplete({
			source: function (request, response) {
				$.ajax({
					url: "fbcsag340_clientevsuser.asp",
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
					$('#hcgs3013__cd_em_nome_de').val(ui.item.id);
					$('#nm_emnomede').val(ui.item.value);
					return false;
				}
			}
		}).autocomplete("instance")._renderItem = function(ul, item) {
			return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
		};

		// Label Cancelada
		setTimeout(function () {
			var label = "&nbsp;" + $('#chkCanceladaLabel').text();
			$('#chkCanceladaLabel').text('');
			$('#switch-CANCELADA_checkbox').next().html(label);
		}, 2000);

		configuraSwitchs("", $('#switch-CANCELADA_checkbox'), 'hcgs3013__cancelada');

		// FORMATA MOTIVO CANCELAMENTO
		($('#hcgs3013__cancelada').val() == "1") ? ($('#motivoCancelada').show()) : ($('#motivoCancelada').hide());

		$(document).on('change', '#switch-CANCELADA_checkbox', function() {
			configuraSwitchs($(this).prop('checked').toString(), $(this), 'hcgs3013__cancelada');
			($('#hcgs3013__cancelada').val() == "1") ? ($('#motivoCancelada').show()) : ($('#motivoCancelada').hide());
		});


	});

	// WS
	// Vendedor
	$(document).on('blur', '#hcgs3013__csag341_id', function() {
		if ($(this).val() != "0" && $(this).val() != "") {
			$.ajax({
				url: "/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG341/JSON",
				data: {
					sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
					sCodigo: $(this).val()
				}
			}).done(function(data) {
				$('#nmVendedor').val(data.vDescricao);
			});
		}
	});

	// Blur nos campos necessários
	$('#hcgs3013__csag341_id').blur();
	
	//EM NOME DE - Cliente
	$(document).on('blur', '#hcgs3013__cd_em_nome_de', function() {
		if ($(this).val() != "0" && $(this).val() != "") {
			$.ajax({
				url: '/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG340/JSON',
				data: {
					sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
					sCodigo: $(this).val()
				}
			}).done(function(data) {
				$('#nm_emnomede').val(data.cDescricao);
			});
		}
	});

	$(document).on('change', '#hcgs3013__dt_validade_fim', function() {
		mostraBotoes();
	});

	// Blur nos campos necessários
	$('#hcgs3013__cd_em_nome_de').blur();

	function mostraBotoes() {
		dDia = $('#hcgs3013__dt_validade_fim').val().substr(0, 2);
		dMes = $('#hcgs3013__dt_validade_fim').val().substr(3, 2);
		dAno = $('#hcgs3013__dt_validade_fim').val().substr(6, 4);

		dData = new Date(dAno, dMes - 1, dDia);
		dHoje = new Date();

		if (dData < dHoje) {
			$('#btnTopo').hide();
		} else {
			$('#btnTopo').show();
		}
	}
	
	function showErrorAlert (reason, detail) {
		var msg='';
		if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
		else {
			console.log("error uploading file", reason, detail);
		}
		$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
		 '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
	}
});