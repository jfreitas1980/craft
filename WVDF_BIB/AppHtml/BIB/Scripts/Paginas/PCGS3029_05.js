$(document).ready(function () {
	$('tr').css('cursor', 'pointer');

	var listas = $('#listaDupla_esquerda').bootstrapDualListbox({
		nonSelectedListLabel: '<b>'+ $('#taxas').val() +'</b>',
		selectedListLabel: '<b>' + $('#taxasProduto').val() +'</b>',
		infoTextEmpty: '',
		infoText: false,
		filterPlaceHolder: 'Pesquisar...'
	});
	
	$(document).on('click', '#btnPesquisar', function() {
		if ($('#listaProdutos').val() != "0" && $('#listaPais').val() != "0" ) {
			listas.empty();
			$('input[type="text"]').val('');
			
			$.ajax({
				url: '/WVDF_WS/ws_HCGS3029.wso/f_PesquisaHCGS3029/JSON',
				type: 'POST',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aCCGS210_ID': $('#listaProdutos').val(),
					'aCSAG329_ID': $('#listaPais').val(),
				},
				dataType: 'json',
				success: function(json) {
					$.each(json, function(i, value) {
						var selecionado = false;
						
						if (value.SEL == 1)
							selecionado = true;
						
						listas.append($('<option>').text(value.DS).attr('value', value.ID + '|' + value.Classe + '|' + value.sID_29).attr('selected', selecionado));
						//listas.bootstrapDualListbox('refresh');
					});
					
					listas.bootstrapDualListbox('refresh', true);
				}
			});
		}
	});

	if (getVariavelURL('aPais') && getVariavelURL('aProdutos')) {
		$('#listaProdutos').val(getVariavelURL('aProdutos'));
		$('#listaPais').val(getVariavelURL('aPais'));
		
		$('#btnPesquisar').click();
	}
	
	$(document).on('change', '#listaDupla_esquerda', function() {
		var valoresMarcados = $(this).val();
		
		if (valoresMarcados != null) {
			$.ajax({
				type: 'POST',
				url: '/WVDF_WS/ws_HCGS3029.wso/f_AtualizaHCGS3029/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aCCGS210_ID': $('#listaProdutos').val(),
					'aCSAG329_ID': $('#listaPais').val(),
					'aRANGE': "" + valoresMarcados + ""
				},
				dataType: 'json',
				success: function(json) {
					console.log("WS Retornou: " + json);
					montaLista();
				}
			});
		} else {
			$.ajax({
				type: 'POST',
				url: '/WVDF_WS/ws_HCGS3029.wso/f_AtualizaHCGS3029/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aCCGS210_ID': $('#listaProdutos').val(),
					'aCSAG329_ID': $('#listaPais').val(),
					'aRANGE': ""
				},
				dataType: 'json',
				success: function(json) {
					console.log("WS Retornou: " + json);
					montaLista();
				}
			});
		}
		
	})
	
	function montaLista() {
		listas.empty();
	
		$.ajax({
			url: '/WVDF_WS/ws_HCGS3029.wso/f_PesquisaHCGS3029/JSON',
			type: 'POST',
			data: { 
				'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
				'aCCGS210_ID': $('#listaProdutos').val(),
				'aCSAG329_ID': $('#listaPais').val(),
			},
			dataType: 'json',
			success: function(json) {
				$.each(json, function(i, value) {
					var selecionado = false;
					
					if (value.SEL == 1)
						selecionado = true;
					
					listas.append($('<option>').text(value.DS).attr('value', value.ID + '|' + value.Classe + '|' + value.sID_29).attr('selected', selecionado));
					//ylistas.bootstrapDualListbox('refresh');
				});
				
				listas.bootstrapDualListbox('refresh', true);
			}
		});
	}
	
});

// ANGULAR JS
app = angular.module('taxasApp', ['ui.bootstrap']);

app.controller('TaxasController', function($scope, $http) {
	var taxas = this;

	var idProduto;
	var idModal;
	var idPais;
	
  var detalhes = [];

  $scope.currentPage = 1;
  $scope.quantosRegistros = 10;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
  };

  taxas.btnLimpar = function() {
    $('#listaProdutos').val('0');
    $('#listaPais').val('0');
    $('#listaDupla_esquerda').html('').bootstrapDualListbox('refresh', true);
  }

	taxas.btnPesquisar = function() {
		this.idProduto = $('#listaProdutos').val();
		this.idPais = $('#listaPais').val();

		if (this.idProduto == "0")
			this.idProduto = "";

		if (this.idPais == "0")
			this.idPais = "";

		$http({
			method: 'GET',
			url: '/WVDF_WS/ws_HCGS3029.wso/f_relatorioHCGS3029/JSON',
			params: {
				aCCGS210_ID: this.idProduto,
				aCSAG329_ID: this.idPais,
				aUsuarioSessao: getVariavelURL('aUsuarioSessao')
			}
		}).success(function(data, status, headers, config) {
			taxas.detalhes = data;
      		$scope.totalItems = taxas.detalhes.length;
		});
	};

	taxas.carregaTaxa = function(idProdutoF, idPaisF) {
		url = "PCGS3029_05.asp?aProdutos=" + idProdutoF + "&aPais=" + idPaisF + "&aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
		location.replace(url);
	};
});