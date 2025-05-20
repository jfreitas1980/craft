var app = angular.module('dataConversaCambioApp', ['ngTable', 'ngRoute', 'ui.bootstrap', 'crmLibrary']);



app.controller('dataConversaCambioController', function ($scope, $http, NgTableParams, $location,$sce,crmLibrary) {

$scope.taxaCambio = '';
$scope.responseAdicionarPagamento = '';
$scope.sessaoUsuario = undefined;
$scope.addNome = '';
$scope.addDescricao = '';
$scope.editNome ='';
$scope.editDescricao = '';
$scope.loadScreen = false;

$scope.selected = {};




angular.element(document).ready(function () {

$scope.sessaoUsuario = crmLibrary.getParameterByName('aUsuarioSessao');
$scope.urlAPI = crmLibrary.UrlAPI;
$scope.busca();

});




$scope.busca = function()
{
	$scope.loadScreen = true;
   crmLibrary.getRequest('crm/AcordosFinanceiros/DatasConversaoCambio').then(function(response){
      	console.log(response);
        $scope.taxaCambio= response.data;
        $scope.loadScreen = false;
        $scope.populaTabelaDatasConversaoCambio(response.data);
    }, function(response) {
       $scope.loadScreen = false;
       parent.parent.alertify.error("Ocorreu um erro ao buscar Datas de Cambio");
        console.log("Ocorreu um erro ao buscar Datas de Cambi.");
    });
}


$scope.inserir = function()
{
	if ($scope.addNome == null ||  $scope.addNome =='' || $scope.addNome == undefined)
	 {
	 	parent.parent.alertify.error("Preencha o campo de Nome");
	 	return;
	 }
	 if ($scope.addDescricao == null ||  $scope.addDescricao =='' || $scope.addDescricao == undefined)
	 {
	 	parent.parent.alertify.error("Preencha o campo de Descrição");
	 		return;
	 }
	   $scope.loadScreen = true;
	var data = {
	"no_referencia": $scope.addNome, 
	"ds_referencia": $scope.addDescricao};

   crmLibrary.postRequest('crm/AcordosFinanceiros/DatasConversaoCambio/'+$scope.sessaoUsuario, data).then(function(response){
      	console.log(response);
        $scope.responseAdicionarPagamento = response.data;
        $scope.busca();
        $scope.populaTabelaDatasConversaoCambio();
         $scope.loadScreen = false;
         crmLibrary.fechaModal('addModal');
         parent.parent.alertify.success('Salvo com sucesso.'); 
         console.log("Salvo com sucesso..");
    }, function(response) {
    	  $scope.loadScreen = false;
    	parent.parent.alertify.error(response.data);
        console.log("Ocorreu um erro ao salvar.");
    });
}



$scope.alterar = function()
{


	if ($scope.editNome == null ||  $scope.editNome =='' || $scope.editNome == undefined)
	 {
	 	parent.parent.alertify.error("Preencha o campo de Nome");
	 }
	 if ($scope.editDescricao == null ||  $scope.editDescricao =='' || $scope.editDescricao == undefined)
	 {
	 	parent.parent.alertify.error("Preencha o campo de Descrição");
	 }

	var data = {
	"id_data_ref_conversao_cambio": $scope.selected.id_data_ref_conversao_cambio,
	"no_referencia": $scope.editNome, 
	"ds_referencia": $scope.editDescricao};
	console.log('alterar - data', data);
    	  $scope.loadScreen = true;

   crmLibrary.putRequest('crm/AcordosFinanceiros/DatasConversaoCambio/'+$scope.sessaoUsuario, data).then(function(response){
      	console.log(response);
        $scope.responseAdicionarPagamento = response.data;
        $scope.busca();
        $scope.populaTabelaDatasConversaoCambio();
        crmLibrary.fechaModal('editModal');
          $scope.loadScreen = false;

         parent.parent.alertify.success(response.data); 
         console.log("Salvo com sucesso..");
    }, function(response) {
    	  $scope.loadScreen = false;
    	parent.parent.alertify.error(response.data);
        console.log("Ocorreu um erro ao salvar.");
    });
}











$scope.remover = function()
{

    	  $scope.loadScreen = true;
   crmLibrary.deleteRequest('crm/AcordosFinanceiros/DatasConversaoCambio/'+$scope.selected.id_data_ref_conversao_cambio+'/'+$scope.sessaoUsuario).then(function(response){
      	console.log(response);
        $scope.busca();
        $scope.populaTabelaDatasConversaoCambio();
        $scope.fechaModalRemover();
         $scope.loadScreen = false;

         parent.parent.alertify.success('Removido com sucesso.'); 
         console.log("Removido com sucesso..");
    }, function(response) {
    	 $scope.loadScreen = false;
    	parent.parent.alertify.error(response.data);
        console.log("Ocorreu um erro ao remover.");
    });
}

$scope.abrirModalAdicionar = function()
{
  $scope.addNome = '';
  $scope.addDescricao = '';
     crmLibrary.fechaModal('addModal');
}

$scope.fechaModalAdicionar = function()
{
     crmLibrary.fechaModal('addModal');
}


$scope.abreModalRemover = function(item)
{ 
   crmLibrary.fechaModal('removerModal');
   $scope.selected = item;
}

$scope.fechaModalRemover = function()
{ 
   crmLibrary.fechaModal('removerModal');
   $scope.selected = {};
}





$scope.limpaTela = function()
{
	$scope.nmPagamento = '';
	$scope.dsPagamento = '';
	$scope.editNmPagamento ='';
	$scope.editDsPagamento = '';
}


console.log('paga', $scope.FormaPagamento);

 var url = crmLibrary.UrlAPI;
 console.log(url);



$scope.populaTabelaDatasConversaoCambio = function(data)
{
		$scope.tableDatasConversaoCambio = new NgTableParams({
			page: 1,
			count: 10,
      sorting: { no_referencia: 'asc' },
		}, {
			counts: [10, 20, 50],
			dataset: data
		});
}


$scope.setSelected = function(item, modal)
{
 $scope.selected = item;
 $scope.editNome = $scope.selected.no_referencia; 
 $scope.editDescricao = $scope.selected.ds_referencia;
 crmLibrary.fechaModal(modal);
}


});
