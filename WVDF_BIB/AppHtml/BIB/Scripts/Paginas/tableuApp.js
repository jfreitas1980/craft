var app = angular.module('tableuApp', ['ui.bootstrap']);

app.controller('tableuController', ['$scope', '$http','$sce','$httpParamSerializerJQLike','$httpProvider', function($scope, $http,$sce,$httpParamSerializerJQLike, $httpProvider) {


//$scope.urlTableu = 'http://grupocraftbi.grupocraft.com.br:8083';

$scope.username = 'rodrigo.battistel@grupocraft.com.br';
$scope.password = 'fclexpo';
$scope.url= '';

 //  $http.get("http://192.168.6.23/api/lib/tableu")
 //   .then(function(response) {
//        console.log(response.data);
  //      $scope.url = response.data;
 //       $scope.detailFrame = $sce.trustAsResourceUrl($scope.url); //hard coded
 //   });
   $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $http({
    url: "http://192.168.6.22:8083/trusted",
    method: 'POST',
    crossDomain: true,
    data: $httpParamSerializerJQLike('username=rodrigo.battistel@grupocraft.com.br'),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

}])