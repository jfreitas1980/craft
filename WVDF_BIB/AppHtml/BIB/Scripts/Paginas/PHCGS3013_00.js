$(document).ready(function() {
	//  --
	// | Design
	//  --
	$('#tipoFrete').removeClass('col-xs-6').addClass('col-xs-12');
	
	$('#dtDe').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	
	$('#dtAte').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	
	//  --
	// | Autocompletes
	//  --
	
	// AC Nome Cliente
	$('#nmCliente').autocomplete({
		source: function (req, res) {
			$.ajax({
				url: 'fbcsag340_clientenome.asp',
				data: {
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
					'term': retiraAcento(req.term)
				},
				dataType: 'json',
				success: function (data) {
					res(data);
				}
			});
		},
		minLength: 2,
		open: function (e, ui) {
			var termTemplate = '<strong>%s</strong>';
			var acData = $(this).data('uiAutocomplete');
			acData
			.menu
			.element
			.find('a')
			.each(function() {
				var me = $(this);
				var regex = new RegExp(acData.term, 'gi');
				me.html(me.text().replace(regex, function (matched) {
					return termTemplate.replace('%s', matched);
				}));
			});
		},
		select: function (event, ui) {
			if (ui.item) {
				$('#idCliente').val(ui.item.id);
				$('#nmCliente').val(ui.item.value);
				return false;
			}
		}
	}).autocomplete('instance')._renderItem = function (ul, item) {
		return $('<li>').append('<a>' + item.label + '</a>').appendTo(ul);
	};
	
	// AC Origem
	$('#nmOrigem').autocomplete({
		source: function (req, res) {
			$.ajax({
				url: 'fbcsag325_descricao.asp',
				data: {
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
					'term': retiraAcento(req.term)
				},
				dataType: 'json',
				success: function (data) {
					res(data);
				}
			});
		},
		minLength: 2,
		open: function (e, ui) {
			var termTemplate = '<strong>%s</strong>';
			var acData = $(this).data('uiAutocomplete');
			acData
			.menu
			.element
			.find('a')
			.each(function() {
				var me = $(this);
				var regex = new RegExp(acData.term, 'gi');
				me.html(me.text().replace(regex, function (matched) {
					return termTemplate.replace('%s', matched);
				}));
			});
		},
		select: function (event, ui) {
			if (ui.item) {
				$('#idOrigem').val(ui.item.id);
				$('#nmOrigem').val(ui.item.value);
				return false;
			}
		}
	}).autocomplete('instance')._renderItem = function (ul, item) {
		return $('<li>').append('<a>' + item.label + '</a>').appendTo(ul);
	};
	
	// AC Destino
	$('#nmDestino').autocomplete({
		source: function (req, res) {
			$.ajax({
				url: 'fbcsag325_descricao.asp',
				data: {
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
					'term': retiraAcento(req.term)
				},
				dataType: 'json',
				success: function (data) {
					res(data);
				}
			});
		},
		minLength: 2,
		open: function (e, ui) {
			var termTemplate = '<strong>%s</strong>';
			var acData = $(this).data('uiAutocomplete');
			acData
			.menu
			.element
			.find('a')
			.each(function() {
				var me = $(this);
				var regex = new RegExp(acData.term, 'gi');
				me.html(me.text().replace(regex, function (matched) {
					return termTemplate.replace('%s', matched);
				}));
			});
		},
		select: function (event, ui) {
			if (ui.item) {
				$('#idDestino').val(ui.item.id);
				$('#nmDestino').val(ui.item.value);
				return false;
			}
		}
	}).autocomplete('instance')._renderItem = function (ul, item) {
		return $('<li>').append('<a>' + item.label + '</a>').appendTo(ul);
	};
	
	// AC Destino DTA
	$('#nmDestinoDTA').autocomplete({
		source: function (req, res) {
			$.ajax({
				url: 'fbcsag325_descricao.asp',
				data: {
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
					'term': retiraAcento(req.term)
				},
				dataType: 'json',
				success: function (data) {
					res(data);
				}
			});
		},
		minLength: 2,
		open: function (e, ui) {
			var termTemplate = '<strong>%s</strong>';
			var acData = $(this).data('uiAutocomplete');
			acData
			.menu
			.element
			.find('a')
			.each(function() {
				var me = $(this);
				var regex = new RegExp(acData.term, 'gi');
				me.html(me.text().replace(regex, function (matched) {
					return termTemplate.replace('%s', matched);
				}));
			});
		},
		select: function (event, ui) {
			if (ui.item) {
				$('#idDestinoDTA').val(ui.item.id);
				$('#nmDestinoDTA').val(ui.item.value);
				return false;
			}
		}
	}).autocomplete('instance')._renderItem = function (ul, item) {
		return $('<li>').append('<a>' + item.label + '</a>').appendTo(ul);
	};
});

// ANGULAR JS
angular.module('freteApp', ['ui.bootstrap', 'smart-table']).controller('FreteController', function($scope, $http) {
	var frete = this;
	var idCliente;
	var mostraPropostaT = [];
	
	frete.btnExecute = function() {
		
		if ($('#idCliente').val() == 0) {
			alertify.error('Escolha um cliente');
			return;
		}
		
		this.idCliente = $('#idCliente').val();
		var tpFrete = $('#tpFrete').val();
		var idOrigem = $scope.idOrigem;
		var idDestino = $scope.idDestino;
		var idDestinoDTA = $scope.idDestinoDTA;
		var dtDe = $scope.dtDe;
		var dtAte = $scope.dtAte;
		
		$http({
			method: 'GET',
			url: '/WVDF_WS/ws_HCGS3013.WSO/f_lista_proposta/JSON',
			params: {
				idCliente: this.idCliente,
				tpFrete: tpFrete,
				idOrigem: idOrigem,
				idDestino: idDestino,
				idDestinoDTA: idDestinoDTA,
				dtDe: dtDe,
				dtAte: dtAte,
				aUsuarioSessao: getVariavelURL('aUsuarioSessao')
			}
		}).success(function(data, status, headers, config) {
			frete.propostas = data;
			console.log(data);
		});

		frete.maisOpcoes = true;

	};
	
	frete.maisOpcoes = true;
	
	frete.btnMais = function() {
		frete.maisOpcoes = !frete.maisOpcoes;
	};
	
	frete.btnNovaProposta = function(aCSAG320_ID) {
		console.log(aCSAG320_ID);
		var url = 'PCGS3013_01.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&aCSAG320_ID=' + aCSAG320_ID;
		
		$('#iframeManutencao').attr('src', url);
		$('#guiaManutencao').click();
	};
	frete.btnNovoItem = function(propostaId, propostaRowId, produtoId, produtoDs) {
		var url = 'PCGS3012_01.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&aNUMPROP=' + propostaId + '&RowIdProposta=' + propostaRowId + '&idProduto=' + produtoId + '&dsProduto=' + produtoDs;
		
		$('#iframeManutencao').attr('src', url);
		$('#guiaManutencao').click();
	};
	
	frete.btnNovaPropostaSalvar = function() {
		if ($('#nDtProposta').val() == "" || $('#nDtSaida').val() == "") {
			alertify.error('Preencha as datas corretamente!');
			return;
		}		
		
		$http({
			method: 'GET',
			url: '/WVDF_WS/ws_HCGS3013.WSO/f_salva_proposta/JSON',
			params: {
				idCliente: this.idCliente,
				nIdProposta: $scope.nIdProposta,
				nDtProposta: $scope.nDtProposta,
				nDtSaida: $scope.nDtSaida,
				nIdEmpresa: $scope.nIdEmpresa,
				nIdExecutivo: $scope.nIdExecutivo,
				nObservacao: $scope.nObservacao,
				aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
				nIdContato: 0
			}
		}).then(function successCallback(response) {
			$scope.nIdProposta = response;
		}, function errorCallback(response) {
			console.log(response);
		});
	};
	
	frete.btnNovaPropostaExcluir = function() {
		$http({
			method: 'POST',
			url: '',
			params: {
				nIdProposta: $scope.nIdProposta,
				aUsuarioSessao: getVariavelURL('aUsuarioSessao')
			}
		}).then(function successCallback(response) {
			console.log(response);
		}, function errorCallback(response) {
			console.log(response);
		});
	};
	
	frete.btnNovaPropostaLimpar = function() {
		$scope = "";
	};
	
	frete.btnEditaProposta = function(rowId, clienteId) {
		var url = 'PCGS3013_01.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&RowId=' + rowId + '&aCSAG320_ID=' + clienteId;
		
		$('#iframeManutencao').attr('src', url);
		$('#guiaManutencao').click();
	}
	
	frete.btnEditaItem = function(rowId, clienteId, RowIdProposta, idProposta, produtoId, produtoDs) {
		var url = 'PCGS3012_01.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&RowId=' + rowId + '&aNUMPROP=' + idProposta + '&RowIdProposta=' + RowIdProposta + '&idProduto=' + produtoId + '&dsProduto=' + produtoDs;
		
		$('#iframeManutencao').attr('src', url);
		$('#guiaManutencao').click();
	}
	
	frete.mostraProposta = function(proposta) {
		frete.mostraPropostaT[proposta] = !frete.mostraPropostaT[proposta];
	}
});