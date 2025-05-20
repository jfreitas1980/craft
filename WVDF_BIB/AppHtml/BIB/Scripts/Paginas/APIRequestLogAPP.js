var app = angular.module('plunker', ["ngTable"]);

app.controller('MainCtrl', function($scope, NgTableParams, $http,$filter) {


angular.element(document).ready(function () {

    // your code here
$scope.populaTabela();
});

$scope.selected = "";
$scope.totalRecords = 0;
$scope.loadScreen = '';

$scope.dataInicio = new Date(Date.now());
$scope.dataFim = new Date(Date.now());
$scope.dataInicio.setDate($scope.dataInicio.getDate()-5);
console.log($scope.dataInicio);

$scope.populaTabela = function()
{
  var dtinicio = $filter('date')($scope.dataInicio, "yyyy-MM-dd");
  var dtfim = $filter('date')($scope.dataFim, "yyyy-MM-dd");

if (dtinicio > dtfim) 
{
  //alert('Data de Início não pode ser maior que a data de Término!');
   parent.parent.alertify.error('Data de Início não ser maior que a data de Término!'); 
}

var url = 'http://192.168.6.23/api/lib/RequestLog/'+dtinicio+'/'+dtfim;
console.log(url);
$scope.loadScreen = true;
  $http.get(url)
    .then(function(response) {
      $scope.loadScreen = false;

       // $scope.databaseDest = response.data;
        console.log(response.data);
        var result = response.data;
       $scope.tableParams = new NgTableParams(
        {
            page: 1,
            count: 5
        },
        {
            counts: [5, 10, 20, 50],
            dataset: result
        });
       
    }, function(response) {
          $scope.loadScreen = false;
      console.log(response);
      var data = response.data;

   //  alert(response.data.error); 
     parent.parent.alertify.error(response.data.error); 

  });
}

$scope.setSelected =function (model)
{
  $scope.selected = model;
  console.log($scope.selected);
}

$scope.buscaLog = function () {
 $scope.populaTabela();
}

});