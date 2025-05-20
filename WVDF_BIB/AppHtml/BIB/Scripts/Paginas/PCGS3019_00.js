// ANGULAR JS

app = angular.module('pcgs301900App', ['ngSanitize', 'ui.bootstrap', 'smart-table']);

app.factory('buscaWS', function($http) {
	return {
		get: function(url, parametros) {
			return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
				return res.data;
			});
		}	
	};
});

app.controller('pcgs301900Controller', function($scope, buscaWS) {
	// Paginação Telas 01 e 02
	$scope.frameSrc = '';

	$scope.setFrameNulo = function() {
		$scope.frameSrc = '';

		atualizaWS();
	};

	// Paginação Telas Pesquisa
	$scope.pesquisaAtual = 'F';

	$scope.setPagina = function(pagina) {
		$scope.pesquisaAtual = pagina;
	};

	// Prepara JSON's para relatórios.
	$scope.totalItems = {}

	var parametrosF = 'idProposta=' + getVariavelURL('idProposta') + '&idItem=' + getVariavelURL('idItem') + '&sClasse=F';
	var parametrosR = 'idProposta=' + getVariavelURL('idProposta') + '&idItem=' + getVariavelURL('idItem') + '&sClasse=R';
	var parametrosD = 'idProposta=' + getVariavelURL('idProposta') + '&idItem=' + getVariavelURL('idItem') + '&sClasse=D';

	function atualizaWS() {
		buscaWS.get('/WVDF_WS/ws_HCGS3019.wso/f_lista_proposta/JSON', parametrosF).then(function(data) {
			$scope.dataRelatoriosF = data;
			$scope.totalItems.F = data.length;
		});

		buscaWS.get('/WVDF_WS/ws_HCGS3019.wso/f_lista_proposta/JSON', parametrosR).then(function(data) {
			$scope.dataRelatoriosR = data;
			$scope.totalItems.R = data.length;
		});

		buscaWS.get('/WVDF_WS/ws_HCGS3019.wso/f_lista_proposta/JSON', parametrosD).then(function(data) {
			$scope.dataRelatoriosD = data;
			$scope.totalItems.D = data.length;
		});
	}
	atualizaWS();

	

	// Muda frame conforme taxa.
	$scope.setFrame = function(framea, sRowId) {
		var frame = "PCGS3019_01" + framea + ".asp?";
		frame += "aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
		frame += "&idProposta=" + getVariavelURL('idProposta');
		frame += "&idItem=" + getVariavelURL('idItem');
		frame += "&RowId=" + sRowId;
		frame += "&sClasse=" + framea;

		$scope.frameSrc = frame;
	};


});