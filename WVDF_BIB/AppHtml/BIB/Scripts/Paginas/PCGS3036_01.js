// FORMATA A PAGINA
$(document).ready(function () {
	$('#switch-ID_IMPRIMI_NOTA_checkbox').next().html('&nbsp;' + $('#id_imprimi_nota').text());
	$('#id_imprimi_nota').text('');
	
	$('#hcgs3036__vl_irrf').removeClass().addClass('col-xs-8');
	$('#hcgs3036__tp_custo_p').removeClass().addClass('form-control');
	$('#hcgs3036__vl_compra').removeClass().addClass('form-control');
	
	$('#switch-ID_FORMULA_P_checkbox').next().html('&nbsp;' + $('#id_formula_p').text());
	$('#id_formula_p').text('');
	
	$('#hcgs3036__formula_p').removeClass().addClass('form-control');
	
	$('#hcgs3036__tp_custo_r').removeClass().addClass('form-control');
	$('#hcgs3036__vl_venda').removeClass().addClass('form-control');
	$('#hcgs3036__tp_calculo_p').removeClass().addClass('form-control');
	$('#hcgs3036__tp_calculo_r').removeClass().addClass('form-control');
	$('#hcgs3036__vl_min').removeClass().addClass('form-control');
	
	$('#switch-ID_FORMULA_R_checkbox').next().html('&nbsp;' + $('#id_formula_r').text());
	$('#id_formula_r').text('');
	
	$('#switch-ID_MULTA_checkbox').next().html('&nbsp;' + $('#id_multa').text());
	$('#id_multa').text('');
	
	$('#hcgs3036__formula_r').removeClass().addClass('form-control');
	
	$('#switch-ID_DESCONTO_checkbox').next().html('&nbsp;' + $('#id_desconto').text());
	$('#id_desconto').text('');
	
	$('#hcgs3036__vl_aplicado').removeClass().addClass('form-control');
	
	$('input[type="checkbox"]').each(function(index, value) {
		var elementoFinal = ('hcgs3036__' + (value.id).replace('switch-', '').replace('_checkbox', '').toLowerCase());
		configuraSwitchs("", value, elementoFinal);		
	});
	
	$(document).on('click', '#btnSalvar', function() {
		parent.parent.parent.parent.window.scrollTo(0, 0);
	});
	
	$(document).on('change', '[id^="switch-"]', function() {
		var elementoFinal = 'hcgs3036__' + ($(this).attr('id').replace('switch-', '').replace('_checkbox', '').toLowerCase());
		configuraSwitchs($(this).prop('checked').toString(), $(this), elementoFinal);
	});

	if ($('#hcgs3036__moeda_p').val() != "") {
		var sParametros = $('#hcgs3036__moeda_p').val() + '","' + $('#jaUsuarioSessao').val();
		var sRetorno = ReadFuncValue(sParametros, "oPCGS218_01", "get_f_pgCCGS218_DESCRICAO");
			
		$('#pesquisaMoedaP').val(sRetorno);
	}

	if ($('#hcgs3036__moeda_r').val() != "") {
		var sParametros = $('#hcgs3036__moeda_r').val() + '","' + $('#jaUsuarioSessao').val();
		var sRetorno = ReadFuncValue(sParametros, "oPCGS218_01", "get_f_pgCCGS218_DESCRICAO");
			
		$('#pesquisaMoedaR').val(sRetorno);
	}

	// MPP

	$('[id^="switchMPP-"]').each(function(e, a) {
	  $(a).prop('checked', false);
	});

	aux = $('#hcgs3036__mod_pagmento_p').val();
	aux = aux.split(',');

	campoMP = "";

	for (x in aux) {
		$('#switchMPP-' +aux[x] + '_checkbox').prop('checked', true);
		campoMP += aux[x] + ',';
	}

	// MPR

	$('[id^="switchMPR-"]').each(function(e, a) {
	  $(a).prop('checked', false);
	});

	aux = $('#hcgs3036__mod_pagmento_r').val();
	aux = aux.split(',');

	campoMP = "";

	for (x in aux) {
		$('#switchMPR-' +aux[x] + '_checkbox').prop('checked', true);
		campoMP += aux[x] + ',';
	}

	$("#hcgs3036__tp_equipamento").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbccgs217_descricao.asp",
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
				$(this).val(ui.item.id);
				console.log(ui.item.id);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	$("#pesquisaMoedaP").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbccgs218_descricao.asp",
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
				$('#hcgs3036__moeda_p').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	$("#pesquisaMoedaR").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbccgs218_descricao.asp",
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
				$('#hcgs3036__moeda_r').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};
});

// ANGULARJS

// ANGULAR JS
var app = angular.module('pcgs303601App', []);

app.controller('pcgs303601Controller', function($scope) {
	$scope.clickModPagamentoP = function() {
		var campoMP = "";
		
		$('[id^="switchMPP-"]:checked').each(function(index, value) {
			campoMP += $(value).attr('mp') + ",";
		});

		campoMP = campoMP.substr(0, campoMP.length - 1);

		$('#hcgs3036__mod_pagmento_p').val(campoMP);
	};

	$scope.clickModPagamentoR = function() {
		var campoMP = "";
		
		$('[id^="switchMPR-"]:checked').each(function(index, value) {
			campoMP += $(value).attr('mp') + ",";
		});

		campoMP = campoMP.substr(0, campoMP.length - 1);

		$('#hcgs3036__mod_pagmento_r').val(campoMP);
	};
	
});