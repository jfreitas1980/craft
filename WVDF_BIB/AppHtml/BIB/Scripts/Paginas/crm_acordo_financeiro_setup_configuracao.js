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

$scope.setupSelecionado = '';
$scope.disableAterarAcordo = true;


$scope.selected = {};
$scope.idSetup = crmLibrary.getParameterByName('idSetup');
$scope.sessaoUsuario = crmLibrary.getParameterByName('aUsuarioSessao');
$scope.notaFiscalSimNao = '';


angular.element(document).ready(function () {



if ($scope.idSetup == null || $scope.idSetup == undefined || $scope.idSetup == '') 
{
  parent.parent.alertify.error("Nenhum Setup Financeiro selecionado.");
  return;
}


$scope.urlAPI = crmLibrary.UrlAPI;
$scope.buscaAcordoPorId($scope.idSetup);


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


$scope.urlsetupDetalhe = 'crm_acordo_financeiro_setup_detalhe.html?idSetup='+ $scope.idSetup +'&aUsuarioSessao='+ $scope.sessaoUsuario;
//$scope.urlAcordoDetalhes = 'crm_acordo_financeiro_cliente_detalhe.html?idSetup='+ $scope.idSetup +'&aUsuarioSessao='+ $scope.sessaoUsuario;
$scope.urlAcordoFilial = 'crm_acordo_financeiro_setup_filial.html?idSetup='+ $scope.idSetup +'&aUsuarioSessao='+ $scope.sessaoUsuario;



 $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }


$scope.buscaAcordoPorId = function(value)
{
        $scope.loadScreen = true;
        var url = $scope.urlAPI + 'crm/AcordosFinanceiros/SetupFinanceiroHeader/'+value+'/'+$scope.sessaoUsuario;
        console.log(url);
   $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
                      $scope.loadScreen = false;
                      $scope.setupSelecionado = response.data;
                      if (response.data.in_nota_fiscal_debito == true) 
                     {
                      $scope.notaFiscalSimNao = crmLibrary.filterDataYesNo[0];
                     }
                     else
                     {
                       $scope.notaFiscalSimNao = crmLibrary.filterDataYesNo[1];

                     }
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
