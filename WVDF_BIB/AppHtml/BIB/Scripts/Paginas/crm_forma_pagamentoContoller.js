var app = angular.module('crmFormaPagamentoApp', ['ngTable', 'ngRoute', 'ui.bootstrap', 'crmLibrary']);



app.controller('crmFormaPagamentoController', function ($scope, $http, NgTableParams, $location,$sce,crmLibrary) {

$scope.FormaPagamento = '';
$scope.responseAdicionarPagamento = '';
$scope.sessaoUsuario = crmLibrary.getParameterByName('aUsuarioSessao');
$scope.nmPagamento = '';
$scope.dsPagamento = '';
$scope.editNmPagamento ='';
$scope.editDsPagamento = '';
$scope.loadScreen = false;

$scope.selected = {};

$scope.buscaFormasPagamentos = function()
{
	$scope.loadScreen = true;
   crmLibrary.getRequest('crm/AcordosFinanceiros/FormaPagamento').then(function(response){
      	console.log(response);
        $scope.FormaPagamento= response.data;
        $scope.loadScreen = false;
        $scope.populaTabelaFormaPagamento(response.data);
    }, function(response) {
       $scope.loadScreen = false;
       parent.parent.alertify.error("Ocorreu um erro ao buscar Formas de Pagamentos.");
        console.log("Ocorreu um erro ao buscar Formas de Pagamentos.");
    });
}


$scope.adicionarFormaPagamento = function()
{
	if ($scope.nmPagamento == null ||  $scope.nmPagamento =='' || $scope.nmPagamento == undefined)
	 {
	 	parent.parent.alertify.error("Preencha o campo de Nome");
	 	return;
	 }
	 if ($scope.dsPagamento == null ||  $scope.dsPagamento =='' || $scope.dsPagamento == undefined)
	 
{	 	parent.parent.alertify.error("Preencha o campo de Descrição");
	 		return;
	 }
	   $scope.loadScreen = true;
	var data = {
	"no_forma_pagamento": $scope.nmPagamento, 
	"ds_forma_pagamento": $scope.dsPagamento};

   crmLibrary.postRequest('crm/AcordosFinanceiros/FormaPagamento/'+$scope.sessaoUsuario, data).then(function(response){
      	console.log(response);
        $scope.responseAdicionarPagamento = response.data;
        $scope.buscaFormasPagamentos();
        $scope.populaTabelaFormaPagamento();
         $scope.loadScreen = false;
         crmLibrary.fechaModal('myModal');
         parent.parent.alertify.success('Salvo com sucesso.'); 
         console.log("Salvo com sucesso..");
    }, function(response) {
    	  $scope.loadScreen = false;
    	parent.parent.alertify.error(response.data);
        console.log("Ocorreu um erro ao salvar.");
    });
}



$scope.alterarFormaPagamento = function()
{


	if ($scope.editNmPagamento == null ||  $scope.editNmPagamento =='' || $scope.editNmPagamento == undefined)
	 {
	 	parent.parent.alertify.error("Preencha o campo de Nome");
	 }
	 if ($scope.editDsPagamento == null ||  $scope.editDsPagamento =='' || $scope.editDsPagamento == undefined)
	 {
	 	parent.parent.alertify.error("Preencha o campo de Descrição");
	 }

	var data = {
	"id_forma_pagamento": $scope.selected.id_forma_pagamento,
	"no_forma_pagamento": $scope.editNmPagamento, 
	"ds_forma_pagamento": $scope.editDsPagamento};
	console.log('alterar - data', data);
    	  $scope.loadScreen = true;

   crmLibrary.putRequest('crm/AcordosFinanceiros/FormaPagamento/'+$scope.sessaoUsuario, data).then(function(response){
      	console.log(response);
        $scope.responseAdicionarPagamento = response.data;
        $scope.buscaFormasPagamentos();
        $scope.populaTabelaFormaPagamento();
        crmLibrary.fechaModal('editModal');
          $scope.loadScreen = false;

         parent.parent.alertify.success('Salvo com sucesso.'); 
         console.log("Salvo com sucesso..");
    }, function(response) {
    	  $scope.loadScreen = false;
    	parent.parent.alertify.error("Ocorreu um erro ao salvar.");
        console.log("Ocorreu um erro ao salvar.");
    });
}



$scope.removerFormaPagamento = function()
{

    	  $scope.loadScreen = true;
   crmLibrary.deleteRequest('crm/AcordosFinanceiros/FormaPagamento/'+$scope.selected.id_forma_pagamento+'/'+$scope.sessaoUsuario).then(function(response){
      	console.log(response);
        $scope.buscaFormasPagamentos();
        $scope.populaTabelaFormaPagamento();
        $scope.fechaModalRemover();
         $scope.loadScreen = false;

         parent.parent.alertify.success('Removido com sucesso.'); 
         console.log("Removido com sucesso..");
    }, function(response) {
    	 $scope.loadScreen = false;
    	parent.parent.alertify.error("Ocorreu um erro ao remover.");
        console.log("Ocorreu um erro ao remover.");
    });
}

$scope.abrirModal = function()
{
     crmLibrary.fechaModal('removerModal');
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

console.log('sessao',$scope.sessaoUsuario);
 console.log($scope.buscaFormasPagamentos());

console.log('paga', $scope.FormaPagamento);

 var url = crmLibrary.UrlAPI;
 console.log(url);



$scope.populaTabelaFormaPagamento = function(data)
{
		$scope.tableFormaPagamento = new NgTableParams({
			page: 1,
			count: 10,
        sorting: { no_forma_pagamento: 'asc' }

		}, {
			counts: [10, 20, 50],
			dataset: data
		});
}


$scope.setSelected = function(item, modal)
{
 $scope.selected = item;
 $scope.editNmPagamento = $scope.selected.no_forma_pagamento; 
 $scope.editDsPagamento = $scope.selected.ds_forma_pagamento;
 crmLibrary.fechaModal(modal);
}


});
