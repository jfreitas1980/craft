var app = angular.module('acordoFinanceiroDetailApp', ['ngTable', 'ngRoute', 'ui.bootstrap', 'crmLibrary', 'bcherny/formatAsCurrency', 'ngTagsInput']);

app.filter('yuan', function ($filter) {
    return function (value) {
      return $filter('currency')(value, '')
    }
  })

app.controller('acordoFinanceiroDetailController', function ($scope, $http, NgTableParams, $location,$sce,crmLibrary, $filter) {

$scope.TaxaMercado = '';
$scope.responseAdicionarPagamento = '';
$scope.sessaoUsuario = undefined;
$scope.idAcordo = undefined;
$scope.addNome = '';
$scope.addDescricao = '';
$scope.editNome ='';
$scope.editDescricao = '';
$scope.loadScreen = false;

$scope.op = 'grupo';




$scope.selected = {};


$scope.notaFiscalOption =  [ { name: "SIM", value: true} ,  { name: "NÃO", value: false}];
$scope.statusOption =  [ { name: "ATIVO", value: true} ,  { name: "INATIVO", value: false}];
 $scope.acordoFinaceiroSelecionado = '';

console.log('acordoFinaceiroSelecionado', $scope.acordoFinaceiroSelecionado);

angular.element(document).ready(function () {

$scope.acordoReadonly = true;

$scope.sessaoUsuario = crmLibrary.getParameterByName('aUsuarioSessao');
$scope.idSetup = crmLibrary.getParameterByName('idSetup');
if ($scope.idSetup == null || $scope.idSetup == undefined || $scope.idSetup == '') 
{
  parent.parent.alertify.error("Nenhum acordo Financeiro selecionado.");
  return;
}
$scope.urlAPI = crmLibrary.UrlAPI;
$scope.busca();
$scope.buscaAcordoPorId($scope.idSetup);

$scope.novo = 
{ 
  filial: ''  ,
  ativo: $scope.statusOption[0]
};

$scope.edit = 
{ 
  filial: ''  ,
  ativo: $scope.statusOption[0]
};


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

$("#valorMoeda").ForceNumericOnly();
$("#valorMoedaVenda").ForceNumericOnly();


$scope.busca = function()
{
	$scope.loadScreen = true;
   crmLibrary.getRequest('crm/AcordosFinanceiros/SetupFinanceiroFilial/'+$scope.idSetup+'/'+$scope.sessaoUsuario).then(function(response){
      	console.log(response);
        $scope.TaxaMercado= response.data;
        $scope.loadScreen = false;
        $scope.populaTabela(response.data);
    }, function(response) {
       $scope.loadScreen = false;
       parent.parent.alertify.error("Ocorreu um erro ao buscar Vinculo de Filial ao Acordo");
        console.log("Ocorreu um erro ao buscar Vinculo de Filial ao Acordos");
    });
}


$scope.validaInserir = function()
{
    
  if ($scope.novo.filial == null || $scope.novo.filial == undefined || $scope.novo.filial == '') 
  {
    parent.parent.alertify.error("Selecione uma Filial.");
    return false;
  }

  if ($scope.novo.ativo == null || $scope.novo.ativo == undefined || $scope.novo.ativo == '') 
  {
    parent.parent.alertify.error("Selecione um status.");
    return false;
  }
}




$scope.validaAlterar = function()
{
  if ($scope.edit.filial == null || $scope.edit.filial == undefined || $scope.edit.filial == '') 
  {
    parent.parent.alertify.error("Selecione uma Filial.");
    return false;
  }

  if ($scope.edit.ativo == null || $scope.edit.ativo == undefined || $scope.edit.ativo == '') 
  {
    parent.parent.alertify.error("Selecione um status.");
    return false;
  }

}




$scope.inserir = function()
{

console.log($scope.novo);
if ($scope.validaInserir() == false) 
{
  return;
}

 console.log('novo',$scope.novo);

	$scope.loadScreen = true;
	var data = {
	"id_acordo_fin_setup": $scope.idSetup, 
	"filial": $scope.novo.filial,
  "in_ativo": $scope.novo.ativo.value
  };

console.log('data insert', data);
   crmLibrary.postRequest('crm/AcordosFinanceiros/SetupFinanceiroFilial/'+$scope.sessaoUsuario, data).then(function(response){
      	console.log(response);
        $scope.busca();
        $scope.populaTabela();
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

if ($scope.validaAlterar() == false) 
{
  return;
}
 
 var item = $scope.selected;

console.log('edit' ,$scope.edit);

  $scope.loadScreen = true;
console.log('edit',$scope.edit);
  var data = {
  "id_setup_financeiro": $scope.idSetup, 
  "clientenumero": $scope.edit.filial.clientenumero,
  "in_ativo": $scope.edit.ativo.value
  };


  console.log('alterar - data', data);
        $scope.loadScreen = true;

   crmLibrary.putRequest('crm/AcordosFinanceiros/SetupFinanceiroFilial/'+$scope.sessaoUsuario, data).then(function(response){
        console.log(response);
        $scope.busca();
        $scope.populaTabela();
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






$scope.buscaFilial = function(value)
{
        $scope.loadScreen = true;
        var url = $scope.urlAPI + 'crm/AcordosFinanceiros/SetupFinanceiroFilial/BuscaPorNome/'+$scope.idSetup+'/'+value;
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



$scope.buscaFormaPagamento = function(value)
{
        $scope.loadScreen = true;
        var url = $scope.urlAPI + 'crm/AcordosFinanceiros/FormaPagamento/Buscar/'+value;
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



 $scope.buscaAcordoPorId = function(id)
    {
        var url = $scope.urlAPI + 'crm/AcordosFinanceirosHeader/'+id;
         $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
                      $scope.acordoFinaceiroSelecionado = response.data;
                      $scope.novo.acordo = response.data;
                      $scope.edit.acordo = response.data;

    }, function myError(response) { 
          console.log(response);
         parent.parent.alertify.error(response.data);
    });
    }


$scope.changeRadioButton = function(op)
{
  if (op=='cliente')
   {
    $scope.novo.mostra_cliente = true;
   $scope.novo.mostra_grupo = false;
   }
   else if (op == 'grupo') 
   {
     $scope.novo.mostra_cliente = false;
     $scope.novo.mostra_grupo = true;
   }
}


  $scope.getMoedas = function (value) {
    var url = $scope.urlAPI + 'crm/AcordosFinanceiros/LimiteCredito/Moeda/' + value;
    console.log(url);
      $scope.loadingScreen = true;
    return $http.get(url)
    .then(function (response) {
      console.log(response.data);
      $scope.loadingScreen = false;
      return response.data;

    }, function (response) {
        console.log('Erro ao buscar moeda');
        parent.parent.alertify.error('Erro ao buscar moeda');
    });
  }


  $scope.getAcordos = function (value) {
    var url = $scope.urlAPI + 'crm/AcordosFinanceirosHeader/' + value+'/'+$scope.sessaoUsuario;
    console.log(url);
      $scope.loadingScreen = true;
    return $http.get(url)
    .then(function (response) {
      console.log(response.data);
      $scope.loadingScreen = false;
      return response.data;

    }, function (response) {
        console.log('Erro ao buscar Acordos');
        parent.parent.alertify.error('Erro ao buscar Acordos');
    });
  }




  $scope.getProdutos = function (value) {
    var url = $scope.urlAPI + 'cross/Produtos/'+value;
    console.log(url);
      $scope.loadingScreen = true;
    return $http.get(url)
    .then(function (response) {
      console.log(response.data);
      $scope.loadingScreen = false;
      return response.data;

    }, function (response) {
        console.log('Erro ao buscar Produtos');
        parent.parent.alertify.error('Erro ao buscar Produtos');
    });
  }



  $scope.getDatasConversaoCambio = function (value) {
    var url = $scope.urlAPI + 'crm/AcordosFinanceiros/DatasConversaoCambio/BuscarPorNome/'+value;
    console.log(url);
      $scope.loadingScreen = true;
    return $http.get(url)
    .then(function (response) {
      console.log(response.data);
      $scope.loadingScreen = false;
      return response.data;

    }, function (response) {
        console.log('Erro ao buscar Datas de Conversao Cambio');
        parent.parent.alertify.error('Erro ao buscar Datas de Conversao Cambio');
    });
  }


  $scope.getTaxaCambio = function (value) {
    var url = $scope.urlAPI + 'crm/AcordosFinanceiros/TaxaCambio/'+value;
    console.log(url);
      $scope.loadingScreen = true;
    return $http.get(url)
    .then(function (response) {
      console.log(response.data);
      $scope.loadingScreen = false;
      return response.data;

    }, function (response) {
        console.log('Erro ao buscar Taxa Cambio');
        parent.parent.alertify.error('Erro ao buscar Taxa Cambio');
    });
  }



 $scope.pesquisaCliente = function(value)
    {
        $scope.loadScreen = true;
        value = value.replace(/[\/.-]/g, "").trim();
        var url = $scope.urlAPI + 'crm/pesquisaPessoa/'+value;
      return   $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
              $scope.loadScreen = false;

                     console.log(response);
                     return response.data;
    }, function myError(response) { 
          console.log(response);
         $scope.loadScreen = false;
         parent.parent.alertify.error(response.data);
    });
    }


 $scope.buscaTaxa = function(value)
    {
        value = value.replace(/[\/.-]/g, "").trim();
        var url = $scope.urlAPI + 'crm/AcordosFinanceiros/TaxaCambio/'+value;
      return   $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {

                     console.log(response);
                     return response.data;
    }, function myError(response) { 
          console.log(response);
         parent.parent.alertify.error(response.data);
    });
    }







 $scope.goToTopPage = function()
  {
    document.location.href = "#top";
  }



$scope.remover = function()
{

console.log($scope.selected);
    	  $scope.loadScreen = true;
   crmLibrary.deleteRequest('crm/AcordosFinanceiros/SetupFinanceiroFilial/'+$scope.selected.id_filial_setup_financeiro+'/' +$scope.sessaoUsuario).then(function(response){
      	console.log(response);
        $scope.busca();
        $scope.populaTabela();
        $scope.fechaModalRemover();
         $scope.loadScreen = false;

         parent.parent.alertify.success(response.data); 
         console.log("Removido com sucesso..");
    }, function(response) {
    	 $scope.loadScreen = false;
    	parent.parent.alertify.error("Ocorreu um erro ao remover.");
        console.log("Ocorreu um erro ao remover.");
    });
}

$scope.abrirModalAdicionar = function()
{
  $scope.addNome = '';
  $scope.addDescricao = '';

$scope.novo = 
{ 
  filial: ''  ,
  ativo: $scope.statusOption[0]
};

  crmLibrary.fechaModal('addModal');
}

$scope.fechaModalAdicionar = function()
{
     crmLibrary.fechaModal('addModal');
}


$scope.abreModalRemover = function(item)
{ 
   crmLibrary.fechaModal('removerModal');
crmLibrary.goToTopPage();
   $scope.selected = item;
}

$scope.fechaModalRemover = function()
{ 
   crmLibrary.fechaModal('removerModal');
   $scope.selected = {};
}


$scope.fechaModalAlterar = function()
{
     crmLibrary.fechaModal('editModal');
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



$scope.populaTabela = function(data)
{
		$scope.tablelaTaxaMercado = new NgTableParams({
			page: 1,
			count: 5,
      sorting: { id_acordo_fin: 'asc' },
		}, {
			counts: [5,10,20,50],
			dataset: data
		});
}


$scope.setSelected = function(item, modal)
{
 $scope.selected = item;
 console.log('item',item);

var status  = '';
if (item.in_ativo == true) 
{
  status = $scope.statusOption[0];
}
else
{
    status = $scope.statusOption[1];
}


console.log($scope.edit);
  $scope.edit = {
    "filial" : {"no_filial_fantasia": item.no_filial, "clientenumero": item.clientenumero},
    "ativo": status
  };
console.log($scope.edit);

 crmLibrary.fechaModal(modal);
 $scope.goToTopPage();
}


});
