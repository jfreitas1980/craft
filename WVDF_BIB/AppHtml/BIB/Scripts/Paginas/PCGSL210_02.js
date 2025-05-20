// ANGULAR JS
var app = angular.module('pcgsl21001App', ['ui.bootstrap', 'smart-table', 'ngSanitize']);

app.factory('buscaWS', function($http) {
	return {
		get: function(url, parametros) {
			return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
				return res.data;
			});
		}	
	};
});

app.controller('pcgsl21001Controller', function($scope, buscaWS, $http) {
	$scope.parametros = {};
	$scope.mostraPagina = 'P';
	$scope.itemsByPage = 10;

	buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_prod/JSON', '').then(function(data) {
		$scope.lsProdutos = data;
		$scope.parametros.sProduto = getVariavelURL('aProduto');
	});

	buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_modal_15/JSON', '').then(function(data) {
		$scope.lsModais = data;
	});

	buscaWS.get('/WVDF_WS/ws_ccgs202.wso/f_combo_ccgs202/JSON', '').then(function(data) {
		$scope.lsModaisFrete = data;
	});

	buscaWS.get('/WVDF_WS/ws_ccgs203.wso/f_combo_ccgs203/JSON', '').then(function(data) {
		$scope.lsCaracteristicasFrete = data;
	});

	$scope.btnPesquisa = function() {
		$scope.parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

		if ($scope.parametros.sProduto == null) 
			$scope.parametros.sProduto = "";
		if ($scope.parametros.sModal == null)
			$scope.parametros.sModal = "";
		if ($scope.parametros.sMFrete == null)
			$scope.parametros.sMFrete = "";
		if ($scope.parametros.sCFrete == null)
			$scope.parametros.sCFrete = "";

		$http({
		    url: '/WVDF_WS/ws_HCGSL210.wso/f_HCGSL210_REL/JSON', 
		    method: 'GET',
		    params: $scope.parametros
		}).then(function(data) {
			$scope.mostraPagina = 'R';
			$scope.lsPesquisa = data.data;
			$scope.totalItems = data.data.length;
		});
	};

	$scope.abreTela = function(sRowid) {
		url = "PCGSL210_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&RowId=" + sRowid;
		document.location = url;
	};
});