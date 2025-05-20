var app = angular.module('myTimelineApp', ['ui.bootstrap']);

app.controller('timelineController', ['$scope', '$http', function($scope, $http) {
    $scope.propostaID = Url.id;
    $scope.LogProp = [];
    $scope.CRMURL = "";

    function init() {
        getCRM_URL().then(function(data) {
            $scope.CRMURL = data.ID;
            $http.get($scope.CRMURL + "api/lib/cross/logproposta/" + Url.id).then(function(response) {
                debugger;
                $scope.LogProp = response.data;
            });
        });
    }

    function getCRM_URL() {
        return $http.get('/WVDF_WS/ws_hcgs3004.wso/buscarCrm/JSON', { 'aUsuarioSessao': Url.aUsuarioSessao }).then(function(response) {
            return response.data;
        });
    }

    $scope.acModel2 = function() {

        return arr;
    }

    init();
}]);