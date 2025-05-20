var app = angular.module('acordoFinanceiroDetailApp', ['ngTable', 'ngRoute', 'ui.bootstrap', 'crmLibrary', 'bcherny/formatAsCurrency']);

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
//$scope.buscaAcordoPorId($scope.idSetup);

crmLibrary.getTodosProdutos().then(function(response) {
 $scope.produtos = response;
});

crmLibrary.getDatasConversaoCambio().then(function(response) {
 $scope.datasConversaoCambio = response;
});

crmLibrary.getTaxasCambio().then(function(response) {
 $scope.taxasCambio = response;
});


$scope.novo = 
{ 
  acordo: ''  ,
  produto:"",
  spread:"",

  prazo_pagamento:"",
  taxa_conversao: "",
  data_conversao: ""
};

$scope.edit = 
{ 
 acordo:  '',
  produto:"",
  spread:"",
  prazo_pagamento:"",
  taxa_conversao: "",
  data_conversao: ""
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
   crmLibrary.getRequest('crm/AcordosFinanceiros/SetupFinanceiroDetalhe/'+$scope.idSetup+'/'+$scope.sessaoUsuario).then(function(response){
      	console.log(response);
        $scope.TaxaMercado= response.data;
        $scope.loadScreen = false;
        $scope.populaTabela(response.data);
    }, function(response) {
       $scope.loadScreen = false;
       parent.parent.alertify.error("Ocorreu um erro ao buscar Detalhes dos Acordos");
        console.log("Ocorreu um erro ao buscar Detalhes dos Acordos");
    });
}


$scope.validaInserir = function()
{
    


  if ($scope.novo.produto == null || $scope.novo.produto == undefined || $scope.novo.produto == '') 
  {
    parent.parent.alertify.error("Selecione uma Produto.");
    return false;
  }

  if ($scope.novo.spread == null || $scope.novo.spread == undefined || $scope.novo.spread == '') 
  {
    parent.parent.alertify.error("Digite um Spread.");
    return false;
  }

  if ($scope.novo.prazo_pagamento == null || $scope.novo.prazo_pagamento == undefined || $scope.novo.prazo_pagamento == '') 
  {
    parent.parent.alertify.error("Selecione um Prazo de Pagamento.");
    return false;
  }

   if ($scope.novo.taxa_conversao == null || $scope.novo.taxa_conversao == undefined || $scope.novo.taxa_conversao == '') 
  {
    parent.parent.alertify.error("Selecione uma Taxa de Conversao.");
    return false;
  }
   if ($scope.novo.prazo_pagamento == null || $scope.novo.prazo_pagamento == undefined || $scope.novo.prazo_pagamento == '') 
  {
    parent.parent.alertify.error("Selecione uma Data de Conversao.");
    return false;
  }

}




$scope.validaAlterar = function()
{
    

  if ($scope.edit.produto == null || $scope.edit.produto == undefined || $scope.edit.produto == '') 
  {
    parent.parent.alertify.error("Selecione uma Produto.");
    return false;
  }

  if ($scope.edit.spread == null || $scope.edit.spread == undefined || $scope.edit.spread == '') 
  {
    parent.parent.alertify.error("Digite um Spread.");
    return false;
  }

  if ($scope.edit.prazo_pagamento == null || $scope.edit.prazo_pagamento == undefined || $scope.edit.prazo_pagamento == '') 
  {
    parent.parent.alertify.error("Selecione um Prazo de Pagamento.");
    return false;
  }

   if ($scope.edit.taxa_conversao == null || $scope.edit.taxa_conversao == undefined || $scope.edit.taxa_conversao == '') 
  {
    parent.parent.alertify.error("Selecione uma Taxa de Conversao.");
    return false;
  }
   if ($scope.edit.prazo_pagamento == null || $scope.edit.prazo_pagamento == undefined || $scope.edit.prazo_pagamento == '') 
  {
    parent.parent.alertify.error("Selecione uma Data de Conversao.");
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
	"id_produto": $scope.novo.produto.codigo,
  "pc_spread": $scope.novo.spread,
  "id_ref_taxa_cambio": $scope.novo.taxa_conversao.id_ref_taxa_cambio,
  "id_data_ref_conversao_cambio": $scope.novo.data_conversao.id_data_ref_conversao_cambio,
  "pz_pagamento" : $scope.novo.prazo_pagamento,
  "id_setup_financeiro": $scope.idSetup
  };

console.log('data insert', data);
   crmLibrary.postRequest('crm/AcordosFinanceiros/SetupFinanceiroDetalhe/' +$scope.sessaoUsuario, data).then(function(response){
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


console.log('edit' ,$scope.edit);

  $scope.loadScreen = true;

  var data = {
   "id_setup_financeiro" : $scope.selected.id_setup_financeiro,
  "id_setup_financeiro_detail":  $scope.selected.id_setup_financeiro_detail,
  "id_produto": $scope.edit.produto.codigo,
  "pc_spread": $scope.edit.spread,
  "id_ref_taxa_cambio": $scope.edit.taxa_conversao.id_ref_taxa_cambio,
  "id_data_ref_conversao_cambio": $scope.edit.data_conversao.id_data_ref_conversao_cambio,
  "pz_pagamento" : $scope.edit.prazo_pagamento
  };


  console.log('alterar - data', data);
        $scope.loadScreen = true;

   crmLibrary.putRequest('crm/AcordosFinanceiros/SetupFinanceiroDetalhe/'+$scope.sessaoUsuario, data).then(function(response){
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






$scope.buscaGrupoEconomico = function(value)
{
        $scope.loadScreen = true;
        value = value.replace(/[\/.-]/g, "").trim();
        var url = $scope.urlAPI + 'crm/GrupoEconomico/'+value;
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

    	  $scope.loadScreen = true;
   crmLibrary.deleteRequest('crm/AcordosFinanceiros/SetupFinanceiroDetalhe/'+$scope.selected.id_setup_financeiro_detail+'/'+$scope.sessaoUsuario).then(function(response){
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
  acordo: ''  ,
  produto:"",
  spread:"",

  prazo_pagamento:"",
  taxa_conversao: "",
  data_conversao: ""
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


console.log($scope.edit);
  $scope.edit = {
    "acordo" : $scope.acordoFinaceiroSelecionado,
  "produto": {"descricao": item.no_produto, "codigo": item.id_produto},
  "spread": item.pc_spread,
  "taxa_conversao": {"id_ref_taxa_cambio": item.id_ref_taxa_cambio , "no_referencia": item.no_taxa_cambio },
  "data_conversao": {"id_data_ref_conversao_cambio": item.id_data_ref_conversao_cambio, "no_referencia": item.no_data_cambio},
  "prazo_pagamento" : item.pz_pagamento,

  };
console.log($scope.edit);

 crmLibrary.fechaModal(modal);
 $scope.goToTopPage();
}


});
