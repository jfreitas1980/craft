var app = angular.module('acordoFinanceiroConfiguracao', ['ngTable', 'ngRoute', 'ui.bootstrap', 'crmLibrary', 'bcherny/formatAsCurrency']);

app.filter('yuan', function ($filter) {
    return function (value) {
      return $filter('currency')(value, '')
    }
  })

app.controller('acordoFinanceiroConfiguracaoController', function ($scope, $http, NgTableParams, $location,$sce,crmLibrary, $filter) {

$scope.TaxaMercado = '';
$scope.responseAdicionarPagamento = '';
$scope.sessaoUsuario = undefined;
$scope.idAcordo = undefined;
$scope.addNome = '';
$scope.addDescricao = '';
$scope.editNome ='';
$scope.editDescricao = '';
$scope.loadScreen = false;

$scope.acordoSelecionado = '';
$scope.disableAterarAcordo = true;


$scope.selected = {};
$scope.idAcordo = crmLibrary.getParameterByName('idAcordo');
$scope.sessaoUsuario = crmLibrary.getParameterByName('aUsuarioSessao');



angular.element(document).ready(function () {


if ($scope.idAcordo == null || $scope.idAcordo == undefined || $scope.idAcordo == '') 
{
  parent.parent.alertify.error("Nenhum acordo Financeiro selecionado.");
  return;
}


$scope.urlAPI = crmLibrary.UrlAPI;
$scope.buscaAcordoPorId($scope.idAcordo);


console.log($scope.urlClienteFinal );


});



jQuery.fn.ForceNumericOnly =
function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 || 
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};


$scope.urlClienteFinal = 'crm_acordo_financeiro_cliente_final.html?idAcordo='+ $scope.idAcordo +'&aUsuarioSessao='+ $scope.sessaoUsuario;
$scope.urlAcordoDetalhes = 'crm_acordo_financeiro_cliente_detalhe.html?idAcordo='+ $scope.idAcordo +'&aUsuarioSessao='+ $scope.sessaoUsuario;
$scope.urlAcordoFilial = 'crm_acordo_financeiro_filial.html?idAcordo='+ $scope.idAcordo +'&aUsuarioSessao='+ $scope.sessaoUsuario;



 $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }


$scope.buscaAcordoPorId = function(value)
{
        $scope.loadScreen = true;
        var url = $scope.urlAPI + 'crm/AcordosFinanceirosHeader/'+value;
        console.log(url);
   $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
                      $scope.loadScreen = false;
                      $scope.acordoSelecionado = response.data;
                     console.log(response);   
    }, function myError(response) { 
            $scope.loadScreen = false;
          console.log(response);
         parent.parent.alertify.error(response.data);

    });
}



$scope.buscaAcordos = function(value)
{
        $scope.loadScreen = true;
        var url = $scope.urlAPI + 'crm/AcordosFinanceirosHeader/'+value+'/'+$scope.sessaoUsuario;
        console.log(url);
      return   $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
                      $scope.loadScreen = false;
                     console.log(response);
                     return response.data; 
   
    }, function myError(response) { 
            $scope.loadScreen = false;
          console.log(response);
         parent.parent.alertify.error(response.data);

    });
}



});
