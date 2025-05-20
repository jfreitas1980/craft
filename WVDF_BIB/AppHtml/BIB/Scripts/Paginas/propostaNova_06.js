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

app.controller('emissaoController', function($scope, buscaWS, $http, $q, $filter) {
  
});