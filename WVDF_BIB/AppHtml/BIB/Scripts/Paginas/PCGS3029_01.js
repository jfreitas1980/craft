// FORMATA A PAGINA
$(document).ready(function () {
	$('#hcgs3029__nm_taxa_pais').removeClass().addClass('col-xs-12');
	$('#hcgs3029__descritivo').removeClass().addClass('col-xs-12');
	
	$('#hcgs3029__descritivo').blur(function(){
		TextAreaLimite(this, 3072);
	});
});

// ANGULAR JS

app = angular.module('pcgs302901App', []);

app.factory('buscaWS', function($http) {
	return {
		get: function(url, parametros) {
			return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
				return res.data;
			});
		}	
	};
});

app.controller('pcgs302901Controller', function($scope, buscaWS) {
	$scope.listaOperacoes;

	var i3029 = ($('#hcgs3029__codigo').val() != undefined) ? ($('#hcgs3029__codigo').val()) : "";

	buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_prod_opc/JSON', 'sHCGS3029_ID=' + i3029).then(function(data) {
		$scope.listaOperacoes = data.split(',');
		console.log($scope.listaOperacoes[0])
		console.log(data.split(','));
	});
});