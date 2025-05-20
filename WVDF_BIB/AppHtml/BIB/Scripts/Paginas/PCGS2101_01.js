var jCsag340Id;

// PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
// FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
$('document').ready( function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
	parent.parent.parent.scrollTo(0,0);
		
	// FORMATAR ALTURA IFRAME
	$('#ifrm-pcgs2101_01', window.parent.document).height($('.container-fluid').height());
	$('#ifrm-pcgs2101_00', window.parent.parent.document).height($('.container-fluid', window.parent.document).height() + 10);
	
	// FORMATA OS SWITCHS
	configuraSwitchs("", $('#switch-ALL_DAY_EVENT_checkbox'), 'hcgs2101__all_day_event');
	configuraSwitchs("", $('#switch-CANCELADO_checkbox'), 'hcgs2101__cancelado');
	
	// FORMATA MOTIVO CANCELAMENTO
	($('#hcgs2101__cancelado').val() == "1") ? ($('#hcgs2101__motivo').parent().parent().show()) : ($('#hcgs2101__motivo').parent().parent().hide());
		
	// FORMATA CAMPOS DATA
	$('#hcgs2101__fup_dt_start').removeClass('col-xs-6').addClass('col-xs-12');
	$('#hcgs2101__fup_dt_end').removeClass('col-xs-6').addClass('col-xs-12');
	
	$('#hcgs2101__fup_dt_start').mask("99/99/9999");
	$('#hcgs2101__fup_dt_end').mask("99/99/9999");
	
	if ($('#hcgs2101__codigo').val() == 0 && getVariavelURL('Data')) {
		$('#hcgs2101__fup_dt_start').val(getVariavelURL('Data'));
		$('#hcgs2101__fup_dt_end').val(getVariavelURL('Data'));
	}
	
	$('#hcgs2101__fup_dt_start').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	$('#hcgs2101__fup_dt_end').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	
	// FORMATA CAMPOS HORA
	$('#hcgs2101__fup_hr_start').mask("99:99");
	$('#hcgs2101__fup_hr_end').mask("99:99");
	
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	
	if (h <= 9)
		h = '0'+h;
	
	if (m <= 9)
		m = '0'+m;
	
	hora = h + ":" + m;
	

	m = parseInt(m) + 30;
	
	if (m > 59) {
		h = d.getHours() + 1;
	
		if (h <= 9)
			h = '0'+h;
		
		m = m - 60;
		
		if (m <= 9)
			m = '0'+m;
	}
	hora2 = h + ":" + m;
	
	if ($('#hcgs2101__codigo').val() == 0) {
		$('#hcgs2101__fup_hr_start').val(hora);
		$('#hcgs2101__fup_hr_end').val(hora2);
	}
	
	// FORMATA CAMPOS DE PREENCHIMENTO AUTOMÁTICO
	$('#hcgs2101__csag374_id').removeClass('col-xs-12').addClass('col-xs-6');
	$('#hcgs2101__csag341_id').removeClass('col-xs-6').addClass('col-xs-1');
	$('#hcgs2101__csag340_id').removeClass('col-xs-6').addClass('col-xs-1');
	
	// CASO A PÁGINA NÃO TENHA SIDO ABERTA PELA AGENDA, OCULTA LINHA CLIENTE
	if (getVariavelURL('aCSAG340Id')) {
		$('#hcgs2101__csag340_id').val(getVariavelURL('aCSAG340Id'));
		$('#hcgs2101__csag340_id').attr('readonly', true);
		$('#csag340_descricao').attr('readonly', true);
	}
		
	// OCULTA BOTÕES NOVO/EXCLUIR/PESQUISAR CASO VENHA DO SCHEDULE E SEJA NOVO REGISTRO	
	if (getVariavelURL('Sched') == "1") {
		$('#btnNovo').hide();
		$('#btnExcluir').hide();
		$('#btnPesquisar').hide();
	}
	
	$('#hcgs2101__csag340_id').blur();
	$('#hcgs2101__csag374_id').blur();
	$('#hcgs2101__csag341_id').blur();
});

// SELECIONA O TEXTO DO CAMPO ID
$(document).on('focus', '#hcgs2101__csag340_id, #hcgs2101__csag374_id, #hcgs2101__csag341_id', function() {
	$(this).select();
	$(this).on('mouseup', function() {
		$(this).off("mouseup");
		return false;
	});
});

// PESQUISA CLIENTE PELO ID
$(document).on('blur', '#hcgs2101__csag340_id', function() {
	$.ajax({
		url: '/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG340/JSON',
		data: {
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: $(this).val()
		}
	}).done(function(data) {
		if ((data.cDescricao).substr(0, 4) == "ERR#" ) {
			if ($("#hcgs2101__csag340_id").val() != "0") {
				parent.parent.alertify.error((data.cDescricao).substr(4));
				$('#csag340_descricao').val('');
				$('#hcgs2101__csag340_id').val('');
			}
			return;
		}
		$('#csag340_descricao').val(data.cDescricao);
	});
	if ($('#hcgs2101__csag340_id').val() != "0")
		$('#aCSAG340Id').val($('#hcgs2101__csag340_id').val());
});

// PESQUISA VENDEDOR PELO ID
$(document).on('blur', '#hcgs2101__csag341_id', function() {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG341/JSON",
		data: {
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: $(this).val()
		}
	}).done(function(data) {
		if ((data.vDescricao).substr(0, 4) == "ERR#" ) {
			if ($('#hcgs2101__csag341_id').val() != "0") {
				parent.parent.alertify.error((data.vDescricao).substr(4));
				$('#csag341_descricao').val('');
				$('#hcgs2101__csag341_id').val('');
			}
			return;
		}
		$('#csag341_descricao').val(data.vDescricao);
	});
});


// AUTOCOMPLETE CLIENTE
$(function() {
    $("#csag340_descricao").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag340_clientevsuser.asp",
				data: {
					aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
					term: request.term
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
				$('#hcgs2101__csag340_id').val(ui.item.id);
				$('#csag340_descricao').val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});

// AUTOCOMPLETE EMPRESA
$(function() {
    $("#csag374_descricao").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag374_descricao.asp",
				data: {
					aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
					aCSAG340ID: $('#hcgs2101__csag340_id').val(),
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
				$('#hcgs2101__csag374_id').val(ui.item.id);
				$('#csag374_descricao').val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});

// AUTOCOMPLETE VENDEDOR
$(function() {
    $("#csag341_descricao").autocomplete({
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
				$('#hcgs2101__csag341_id').val(ui.item.id);
				$('#csag341_descricao').val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});


// CONFIGURA SWITCHS
$(document).on('change', '#switch-ALL_DAY_EVENT_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'hcgs2101__all_day_event');
});

$(document).on('change', '#switch-CANCELADO_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'hcgs2101__cancelado');
	($('#hcgs2101__cancelado').val() == "1") ? ($('#hcgs2101__motivo').parent().parent().show()) : ($('#hcgs2101__motivo').parent().parent().hide());
});