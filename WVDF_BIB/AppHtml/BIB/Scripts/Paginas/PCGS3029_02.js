// FORMATA A PAGINA
$(document).ready(function () {
	$('#aProduto').removeClass().addClass('form-control').attr('ng-change', 'taxas.runWS()');
	$('#aModal').removeClass().addClass('form-control').attr('ng-change', 'taxas.runWS()');
	$('#aPais').removeClass().addClass('form-control').attr('ng-change', 'taxas.runWS()');

	$('#aProduto option[value="0"]').val('')
	$('#aModal option[value="0"]').val('')
	$('#aPais option[value="0"]').val('')

	$(document).on('change', '#aProduto, #aModal, #aPais', function() {
		angular.element($('#controller')).scope().runWS();
	});

	$(document).on('click', '#btnPesquisar', function() {
		if ($('#aProdutos').val() != "0" && $('#aModal').val() != "0" && $('#aPais').val() != "0" ) {
			$.ajax({
				url: '/WVDF_WS/ws_HCGS3029.wso/f_PesquisaHCGS3029/JSON',
				type: 'POST',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aCCGS210_ID': $('#aProduto').val(),
					'aCSAG329_ID': $('#aPais').val(),
					'aCCGS216_ID': $('#aModal').val()
				},
				dataType: 'json',
				success: function(json) {
					$("#listaTaxa").html('');
					
					$.each(json, function(i, value) {
						var selecionado = false;
						
						if (value.SEL == 1)
							$("#listaTaxa").append('<option rowid="'+value.sRowId+'" value="'+ value.ID+'">'+value.DS+'</option>');
						
					});
				}
			});
		}
	});

	if (getVariavelURL('aPais') && getVariavelURL('aModal') && getVariavelURL('aProdutos')) {
		$('#aProduto').val(getVariavelURL('aProdutos'));
		$('#aModal').val(getVariavelURL('aModal'));
		$('#aPais').val(getVariavelURL('aPais'));
	}

});

// ANGULAR JS
app = angular.module('taxasApp', ['ui.bootstrap']);

app.controller('TaxasController', function($scope, $http) {
	var taxas = this;

  var detalhes = [];

  $scope.currentPage = 1;
  $scope.quantosRegistros = 10;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
  };

  taxas.btnLimpar = function() {
  	$('#iframe-pcgs3029_01').attr('src', 'pcgs3029_01.asp?aUsuarioSessao='+getVariavelURL('aUsuarioSessao'));
  }
	
	taxas.btnPesquisar = function() {
		$scope.runWS();
	};

	$scope.runWS = function() {
		this.idProduto = $('#aProduto').val();
		this.idModal = $('#aModal').val();
		this.idPais = $('#aPais').val();

		if (this.idProduto == "0")
			this.idProduto = "";

		if (this.idModal == "0")
			this.idModal = "";

		if (this.idPais == "0")
			this.idPais = "";

		$http({
			method: 'GET',
			url: '/WVDF_WS/ws_HCGS3029.wso/f_relatorioHCGS3029/JSON',
			params: {
				aCCGS210_ID: this.idProduto,
				aCCGS216_ID: this.idModal,
				aCSAG329_ID: this.idPais,
				aUsuarioSessao: getVariavelURL('aUsuarioSessao')
			}
		}).success(function(data, status, headers, config) {
			taxas.detalhes = data;
      $scope.totalItems = taxas.detalhes.length;
		});
	};

	taxas.carregaTaxa = function(idProdutoF, idPaisF, idModalF, idRowIdF, produto, modal, pais, taxa, classe) {
		url = "PCGS3029_02.asp?RowId=" + idRowIdF + "&aProdutos=" + idProdutoF + "&aPais=" + idPaisF + "&aModal=" + idModalF + "&aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') +"&aProdutoF=" + produto + "&aModalF=" +modal+"&aPaisF=" +pais +"&aTaxaF=" +taxa + "&aClasseF=" + classe;
		location.replace(url);
	};
});