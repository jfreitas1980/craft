var analiseNeutralidadae = angular.module("crmPendenciasTimeline", ["ngTable", "ngRoute", "ui.bootstrap"]);



analiseNeutralidadae.controller("crmPendenciasTimelineController", function Ctrl($scope, $filter, NgTableParams, $http, $window, $location) {

$scope.urlAPI = "";

   $scope.semPendencia = false;
   $scope.pendencias=[];
   $scope.sessao = "";
    $scope.loadScreen = false;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}






angular.element(document).ready(function () {
//$scope.sessao = getParameterByName('aUsuarioSessao');
$scope.cdReferencia = getParameterByName('cdReferencia');
$scope.cdProcesso = getParameterByName('cdProcesso');

 $scope.baseUrl = new $window.URL($location.absUrl()).origin;
// alert($scope.baseUrl);

if ($scope.baseUrl == 'http://192.168.6.18') 
{
  $scope.urlAPI = "http://192.168.6.23/api/";
 // alert('homolog');
}
else if ($scope.baseUrl == 'http://craftcross.grupocraft.com.br')
 {
    $scope.urlAPI = "http://crm.grupocraft.com.br/api/";
    //  alert('prod');

 }
 else
 {
  parent.parent.alertify.error('error');
 }


 $scope.buscaPendencias();

});

$scope.buscaPendencias= function()
{
//  if ($scope.sessao == undefined || $scope.sessao ==null || $scope.sessao == '') 
 // {
  //  parent.parent.alertify.error("sessao inválida.");
  //  return;
 // }
  var url =  $scope.urlAPI+"crm/pendencias/timeline/"+$scope.cdReferencia+"/"+$scope.cdProcesso;
   $scope.loadScreen = true;
  $http({
  method: 'GET',
  url: url
}).then(function successCallback(response) {
   $scope.loadScreen = false;
  console.log(response.data);
$scope.pendencias = response.data;
if ($scope.pendencias.length == 0) 
{
 $scope.semPendencia = true
}
console.log($scope.semPendencia);
  }, function errorCallback(response) {
    parent.parent.alertify.error(response.data);
     $scope.loadScreen = false;
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
};


});
