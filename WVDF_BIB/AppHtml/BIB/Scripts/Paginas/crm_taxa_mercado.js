var app = angular.module('taxaMercadoApp', ['ngTable', 'ngRoute', 'ui.bootstrap', 'crmLibrary', 'bcherny/formatAsCurrency']);

app.filter('yuan', function ($filter) {
    return function (value) {
      return $filter('currency')(value, '')
    }
  })

app.controller('taxaMercadoController', function ($scope, $http, NgTableParams, $location,$sce,crmLibrary) {

$scope.TaxaMercado = '';
$scope.responseAdicionarPagamento = '';
$scope.sessaoUsuario = undefined;
$scope.addNome = '';
$scope.addDescricao = '';
$scope.editNome ='';
$scope.editDescricao = '';
$scope.loadScreen = false;

$scope.novo = 
{ dt_referencia:  new Date(),
  taxaCambio:"",
  provedor:"",
  moedaOrigem:"",
  modedaDestino:"",
  vl_taxa_cambio_compra:null,
  vl_taxa_cambio_venda:null,
  user_criacao:""
};

$scope.edit = 
{ dt_referencia: new Date(),
  taxaCambio:"",
  provedor:"",
  moedaOrigem:"",
  modedaDestino:"",
  vl_taxa_cambio_compra:"",
  vl_taxa_cambio_venda:"",
  user_criacao:""
};



$scope.selected = {};






angular.element(document).ready(function () {

$scope.sessaoUsuario = crmLibrary.getParameterByName('aUsuarioSessao');
$scope.urlAPI = crmLibrary.UrlAPI;
$scope.busca();

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
   crmLibrary.getRequest('crm/AcordosFinanceiros/TaxaMercado/buscaTodos').then(function(response){
      	console.log(response);
        $scope.TaxaMercado= response.data;
        $scope.loadScreen = false;
        $scope.populaTabelaTaxaMercado(response.data);
    }, function(response) {
       $scope.loadScreen = false;
       parent.parent.alertify.error("Ocorreu um erro ao buscar Taxa Mercado");
        console.log("Ocorreu um erro ao buscar Taxa Mercado.");
    });
}


$scope.validaInserir = function()
{
    
  if ($scope.novo.taxaCambio.id_ref_taxa_cambio == null || $scope.novo.taxaCambio.id_ref_taxa_cambio == undefined || $scope.novo.taxaCambio.id_ref_taxa_cambio == '') 
  {
    parent.parent.alertify.error("Selecione uma referencia de taxa de cambio.");
    return false;
  }

  if ($scope.novo.provedor.codigo == null ||$scope.novo.provedor.codigo == undefined || $scope.novo.provedor.codigo == '') 
  {
    parent.parent.alertify.error("Selecione uma provedor.");
    return false;
  }

  if ($scope.novo.vl_taxa_cambio_venda == null || $scope.novo.vl_taxa_cambio_venda == undefined || $scope.novo.vl_taxa_cambio_venda == '') 
  {
    parent.parent.alertify.error("Digite um valor de taxa de cambio para venda.");
    return false;
  }

  if ($scope.novo.vl_taxa_cambio_compra == null || $scope.novo.vl_taxa_cambio_compra == undefined || $scope.novo.vl_taxa_cambio_compra == '') 
  {
    parent.parent.alertify.error("Digite um valor de taxa de cambio para compra.");
    return false;
  }

  if ($scope.novo.moedaOrigem.codigo == null || $scope.novo.moedaOrigem.codigo == undefined || $scope.novo.moedaOrigem.codigo == '') 
  {
    parent.parent.alertify.error("Selecione uma moeda de origem.");
    return false;
  }

  if ($scope.novo.modedaDestino.codigo == null || $scope.novo.modedaDestino.codigo == undefined || $scope.novo.modedaDestino.codigo == '') 
  {
    parent.parent.alertify.error("Selecione uma moeda de destino.");
    return false;
  }

}




$scope.validaAlterar = function()
{
    
  if ($scope.edit.taxaCambio.id_ref_taxa_cambio == null || $scope.edit.taxaCambio.id_ref_taxa_cambio == undefined || $scope.edit.taxaCambio.id_ref_taxa_cambio == '') 
  {
    parent.parent.alertify.error("Selecione uma referencia de taxa de cambio.");
    return false;
  }

  if ($scope.edit.provedor.codigo == null ||$scope.edit.provedor.codigo == undefined || $scope.edit.provedor.codigo == '') 
  {
    parent.parent.alertify.error("Selecione uma provedor.");
    return false;
  }

  if ($scope.edit.vl_taxa_cambio_venda == null || $scope.edit.vl_taxa_cambio_venda == undefined || $scope.edit.vl_taxa_cambio_venda == '') 
  {
    parent.parent.alertify.error("Digite um valor de taxa de cambio para venda.");
    return false;
  }

  if ($scope.edit.vl_taxa_cambio_compra == null || $scope.edit.vl_taxa_cambio_compra == undefined || $scope.edit.vl_taxa_cambio_compra == '') 
  {
    parent.parent.alertify.error("Digite um valor de taxa de cambio para compra.");
    return false;
  }

  if ($scope.edit.moedaOrigem.codigo == null || $scope.edit.moedaOrigem.codigo == undefined || $scope.edit.moedaOrigem.codigo == '') 
  {
    parent.parent.alertify.error("Selecione uma moeda de origem.");
    return false;
  }

  if ($scope.edit.modedaDestino.codigo == null || $scope.edit.modedaDestino.codigo == undefined || $scope.edit.modedaDestino.codigo == '') 
  {
    parent.parent.alertify.error("Selecione uma moeda de destino.");
    return false;
  }

}



$scope.inserir = function()
{

if ($scope.validaInserir() == false) 
{
  return;
}
  

	$scope.loadScreen = true;
	var data = {
	"dt_referencia": $scope.novo.dt_referencia, 
	"id_ref_taxa_cambio": $scope.novo.taxaCambio.id_ref_taxa_cambio,
  "id_provedor": $scope.novo.provedor.codigo,
  "vl_taxa_cambio_venda": $scope.novo.vl_taxa_cambio_venda, 
  "vl_taxa_cambio_compra": $scope.novo.vl_taxa_cambio_compra,
  "id_moeda_origem" : $scope.novo.moedaOrigem.codigo,
  "id_moeda_destino": $scope.novo.modedaDestino.codigo
  };

console.log('data insert', data);
   crmLibrary.postRequest('crm/AcordosFinanceiros/TaxaMercado/'+$scope.sessaoUsuario, data).then(function(response){
      	console.log(response);
        $scope.responseAdicionarPagamento = response.data;
        $scope.busca();
        $scope.populaTabelaTaxaMercado();
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

  var data = {
    "id_taxa_mercado": $scope.selected.id_taxa_mercado,
  "dt_referencia": $scope.edit.dt_referencia, 
  "id_ref_taxa_cambio": $scope.edit.taxaCambio.id_ref_taxa_cambio,
  "id_provedor": $scope.edit.provedor.codigo,
  "vl_taxa_cambio_venda": $scope.edit.vl_taxa_cambio_venda, 
  "vl_taxa_cambio_compra": $scope.edit.vl_taxa_cambio_compra,
  "id_moeda_origem" : $scope.edit.moedaOrigem.codigo,
  "id_moeda_destino": $scope.edit.modedaDestino.codigo
  };


  console.log('alterar - data', data);
        $scope.loadScreen = true;

   crmLibrary.putRequest('crm/AcordosFinanceiros/TaxaMercado/'+$scope.sessaoUsuario, data).then(function(response){
        console.log(response);
        $scope.responseAdicionarPagamento = response.data;
        $scope.busca();
        $scope.populaTabelaTaxaMercado();
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


 $scope.buscaTaxaCambio = function(value)
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

    	  $scope.loadScreen = true;
   crmLibrary.deleteRequest('crm/AcordosFinanceiros/TaxaMercado/'+$scope.selected.id_taxa_mercado+'/'+$scope.sessaoUsuario).then(function(response){
      	console.log(response);
        $scope.busca();
        $scope.populaTabelaTaxaMercado();
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
{ dt_referencia:  new Date(),
  taxaCambio:"",
  provedor:"",
  moedaOrigem:"",
  modedaDestino:"",
  vl_taxa_cambio_compra:null,
  vl_taxa_cambio_venda:null,
  user_criacao:""
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



$scope.populaTabelaTaxaMercado= function(data)
{
		$scope.tablelaTaxaMercado = new NgTableParams({
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



$scope.edit = 
{ 
  dt_referencia: new Date(),

  taxaCambio:  {"id_ref_taxa_cambio": item.id_ref_taxa_cambio, "no_referencia": item.no_ref_taxa_cambio }  ,
  provedor: { "codigo": item.id_provedor, "fantasia": item.no_provedor },
  moedaOrigem: {"codigo": item.id_moeda_origem , "sigla": item.no_moeda_origem },
  modedaDestino: {"codigo": item.id_moeda_destino , "sigla": item.no_moeda_destino } ,
  vl_taxa_cambio_compra: item.vl_taxa_cambio_compra,
  vl_taxa_cambio_venda: item.vl_taxa_cambio_venda
};
console.log($scope.edit);


 crmLibrary.fechaModal(modal);
 $scope.goToTopPage();
}


});
