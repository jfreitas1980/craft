// ANGULAR JS
var app = angular.module('pcgs210009App', []);

app.factory('buscaWS', function($http) {
	return {
		get: function(url, parametros) {
			return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
				return res.data;
			});
		}	
	};
});

app.controller('pcgs210009Controller', function($scope, buscaWS, $http) {
	// Inicializar variaveis.
	$scope.repeat = ['1','2','LG','TESTE', { 'oi': 'tchau'},'6','7'];
	$scope.prioridade = "NORMAL";
	$scope.descricao  = "";

	// Posiciona Literais
  	buscaWS.get('/WVDF_WS/ws_csag309.wso/f_idiomas_literais/JSON', 'sPrograma=PCGS2100_09').then(function(data) {
    	$scope.L = data;
  	});

  	// Funções
  	$scope.btnSalvar = function() {
  		// Método 1
  		// buscaWS.get('WS', 'aPrioridade=' + $scope.prioridade + '&aDescricao=' + $scope.descricao).then(function(data) {
  		// 	$scope.teste = data;
  		// });

  		// Método 2
  		var parametros = {};
		parametros.aUsuarioSessao 	= getVariavelURL('aUsuarioSessao');
		parametros.aPrioridade 		= $scope.prioridade;
		parametros.aDescricao 		= $scope.descricao;

		$http({
		    url: 'WS', 
		    method: 'GET',
		    params: parametros
		}).then(function(data) {
			$scope.teste = data;
		});
  	};
});