var app = angular.module('myTimelineApp02', ['ui.bootstrap']);

app.controller('timelineController02', ['$scope', '$http', function($scope, $http) {
    $scope.propostaID = Url.id;
    $scope.LogProp = [];
    $scope.CRMURL = "";

    function init() {
        $http.get("/WVDF_WS/ws_hcgs3004.wso/fHistoricoProposta/JSON/?sPropostaId=" + Url.id).then(function(response) {
            $scope.LogProp = response.data;
            debugger;
        });
    }

    init();
}]);