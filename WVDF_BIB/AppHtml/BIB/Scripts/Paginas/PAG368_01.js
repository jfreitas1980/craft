var app = angular.module('appPAG368_01', ['ui.bootstrap']);

app.controller('pag368Ctrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');

    $scope.comboClasse = [];
    $scope.form = {};
    
    var init = function() {
        console.log(aUsuarioSessao);
        $http.get('/WVDF_WS/ws_csag315.wso/f_ComboClasse/JSON', { params: { 'aUsuarioSessao': aUsuarioSessao } }).then(function(response) {
            console.log(response);
            $scope.comboClasse = response.data;
        });
    }

    init();
}])