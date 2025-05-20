// ANGULAR JS
app = angular.module('propostaNovaApp', []);

app.factory('buscaWS', function($http) {
  return {
    get: function(url, parametros) {
      return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
        return res.data;
      });
    } 
  };
});

app.controller('produtosController', function($scope, buscaWS, $http, $q, $filter) {
	// Monta a tela inicial.
	$scope.loading = true;
  $scope.cliente = "";
	// Lista Vendedores
	buscaWS.get('/WVDF_WS/ws_CSAG341.wso/f_ListaVendedores/JSON', '').then(function(data) {
  		$scope.lsVendedores = data;
  		$scope.vendedor = $scope.lsVendedores[0].ID;

  		// Posiciona Clientes
  		buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_clixvend/JSON', 'aVendedor=' + $scope.vendedor).then(function(data) {
	  		$scope.lsClientes = data;
	  		$scope.loading = false;
	    });
    });

	// Eventos
	// Change
  // Vendedor
  $scope.changeVendedor = function(idVendedor) {
  	// Posiciona Clientes
  	$scope.loading = true;
		buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_clixvend/JSON', 'aVendedor=' + idVendedor).then(function(data) {
  		$scope.lsClientes = data;
  		$scope.loading = false;
    });
  };

  // Cliente
  $scope.changeCliente = function(idCliente) {
    // Posiciona Propostas
    $scope.loading = true;
    buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_lista_propostas/JSON', 'aCSAG320_ID=' + idCliente).then(function(data) {
      $scope.lsPropostas = data;
      $scope.loading = false;
    });
  };

  // Click
  // clickProposta
  $scope.clickProposta = function(idProposta) {
    var url = "propostaNova.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idVendedor=" + $scope.vendedor + "&idCliente=" + $scope.cliente[0] + "&idProposta=" + idProposta;
    window.location = url;
  }

  $scope.btnNovaProposta = function() {
    var url = "propostaNova.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idVendedor=" + $scope.vendedor + "&idCliente=" + $scope.cliente[0]
    window.location = url;
  }
});

function getVariavelURL(variavel)
{
 var query = window.location.search.substring(1);
 var vars = query.split("&");
 for (var i=0;i<vars.length;i++) {
         var pair = vars[i].split("=");
         if(pair[0] == variavel){return pair[1];}
 }
 return(false);
}