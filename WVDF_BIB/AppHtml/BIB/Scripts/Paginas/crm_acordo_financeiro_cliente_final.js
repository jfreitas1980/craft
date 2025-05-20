var app = angular.module('acordoFinanceiroClienteFinalpp', ['ngTable', 'ngRoute', 'ui.bootstrap', 'crmLibrary', 'bcherny/formatAsCurrency']);

app.filter('yuan', function ($filter) {
    return function (value) {
      return $filter('currency')(value, '')
    }
  })

app.controller('acordoFinanceiroClienteFinalController', function ($scope, $http, NgTableParams, $location,$sce,crmLibrary, $filter) {

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

$scope.mostra_grupo = false;
$scope.mostra_cliente = false;

$scope.selected = {};
$scope.disableOpAcordo = false;

$scope.opAcordo =  [ { name: "CLIENTE FINAL", value: 'cliente'} ,  { name: "GRUPO ECONOMICO", value: 'grupo'}];
$scope.statusOption =  [ { name: "ATIVO", value: true} ,  { name: "INATIVO", value: false}];

 $scope.acordoFinaceiroSelecionado = '';

console.log('acordoFinaceiroSelecionado', $scope.acordoFinaceiroSelecionado);

angular.element(document).ready(function () {

$scope.acordoReadonly = true;

$scope.sessaoUsuario = crmLibrary.getParameterByName('aUsuarioSessao');
$scope.idAcordo = crmLibrary.getParameterByName('idAcordo');
if ($scope.idAcordo == null || $scope.idAcordo == undefined || $scope.idAcordo == '') 
{
  parent.parent.alertify.error("Nenhum acordo Financeiro selecionado.");
  return;
}
$scope.urlAPI = crmLibrary.UrlAPI;
$scope.busca();
$scope.buscaAcordoPorId($scope.idAcordo);

$scope.novo = 
{   
    grupo_economico: ''  ,
    cliente:"",
    ativo: $scope.statusOption[0],
    opAcordo : ''
};

$scope.edit = 
{   
  id:'',
   grupo_economico: ''  ,
    cliente:"",
};

$scope.op = 'grupo';

$scope.mostra_grupo = false;
$scope.mostra_cliente = false;
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
   crmLibrary.getRequest('crm/AcordosFinanceiros/ClienteFinal/'+$scope.idAcordo+'/'+$scope.sessaoUsuario).then(function(response){
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


$scope.getIdAcordo= function()
{
  return $scope.idAcordo;
}

$scope.validaInserir = function()
{
    

  if ($scope.opAcordo.value == 'grupo') 
  {
        if ($scope.novo.grupo_economico == null || $scope.novo.grupo_economico == undefined || $scope.novo.grupo_economico == '') 
        {
          parent.parent.alertify.error("Selecione um Grupo Economico.");
          return false;
        }
  }
  else 
     if ($scope.opAcordo.value == 'cliente')
      {
               if ($scope.novo.cliente == null || $scope.novo.cliente == undefined || $scope.novo.cliente == '') 
                {
                  parent.parent.alertify.error("Selecione um Cliente.");
                  return false;
                }
      }
}




$scope.validaAlterar = function()
{
    
   if ($scope.opAcordo.value == 'grupo') 
  {
        if ($scope.edit.grupo_economico == null || $scope.edit.grupo_economico == undefined || $scope.edit.grupo_economico == '') 
        {
          parent.parent.alertify.error("Selecione um Grupo Economico.");
          return false;
        }
  }
  else 
     if ($scope.opAcordo.value == 'cliente')
      {
               if ($scope.edit.cliente == null || $scope.edit.cliente == undefined || $scope.edit.cliente == '') 
                {
                  parent.parent.alertify.error("Selecione um Cliente.");
                  return false;
                }
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
	"id_acordo_fin": $scope.idAcordo, 
	"id_SeuCliente": $scope.novo.cliente.codigo,
  "id_grupo_economico_SeuCliente": $scope.novo.grupo_economico.id_grupo_economico,
  "in_ativo": $scope.novo.ativo.value,
  };

console.log('data insert', data);
   crmLibrary.postRequest('crm/AcordosFinanceiros/ClienteFinal/'+$scope.sessaoUsuario, data).then(function(response){
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

  $scope.loadScreen = true;
  var data = {
 "id_acordo_financeiro_cliente_final": $scope.selected.id_acordo_financeiro_cliente_final,
  "id_acordo_fin": $scope.idAcordo, 
  "id_SeuCliente": $scope.edit.cliente.codigo,
  "id_grupo_economico_SeuCliente": $scope.edit.grupo_economico.id_grupo_economico,
  "in_ativo": $scope.edit.ativo.value,
  };

  console.log('alterar - data', data);
        $scope.loadScreen = true;

   crmLibrary.putRequest('crm/AcordosFinanceiros/ClienteFinal/'+$scope.sessaoUsuario, data).then(function(response){
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


$scope.onChange = function()
{
  console.log('op',$scope.novo.opAcordo);

  if ($scope.novo.opAcordo.value=='cliente')
   {
  //   $scope.op = 'grupo'
     $scope.mostra_grupo = false;
     $scope.mostra_cliente = true;
     $scope.novo.grupo_economico = '';
   }
   else if ($scope.novo.opAcordo.value == 'grupo') 
   {
    // $scope.op = 'cliente'
     $scope.mostra_grupo = true;
     $scope.mostra_cliente = false;
     $scope.novo.cliente = '';
   }
}




$scope.onChangeAlterar = function()
{
  console.log('op',$scope.novo.opAcordo);

  if ($scope.edit.opAcordo.value=='cliente')
   {
  //   $scope.op = 'grupo'
     $scope.mostra_grupo = false;
     $scope.mostra_cliente = true;
     $scope.edit.grupo_economico = '';
   }
   else if ($scope.edit.opAcordo.value == 'grupo') 
   {
    // $scope.op = 'cliente'
     $scope.mostra_grupo = true;
     $scope.mostra_cliente = false;
     $scope.edit.cliente = '';
   }
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
   crmLibrary.deleteRequest('crm/AcordosFinanceiros/ClienteFinal/'+$scope.selected.id_acordo_financeiro_cliente_final+'/'+$scope.sessaoUsuario).then(function(response){
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
$scope.disableOpAcordo = false;
$scope.novo = 
{   
    grupo_economico: ''  ,
    cliente:"",
    ativo: $scope.statusOption[0],
    opAcordo : ''
};

$scope.mostra_grupo = false;
$scope.mostra_cliente = false;

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
			count: 10,
      sorting: { id_acordo_financeiro_cliente_final: 'desc' },
		}, {
			counts: [10,20,50],
			dataset: data
		});
}


$scope.setSelected = function(item, modal)
{
 $scope.selected = item;
 console.log('item',item);
 $scope.disableOpAcordo = true;

var op = '';
var ativo = '';
if (item.id_grupo_economico_SeuCliente == null ||item.id_grupo_economico_SeuCliente == undefined || item.id_grupo_economico_SeuCliente == '') 
{
  op = $scope.opAcordo[0];
  $scope.mostra_cliente = true;
  $scope.mostra_grupo = false;
}
else
{
  op = $scope.opAcordo[1];
   $scope.mostra_cliente = false;
  $scope.mostra_grupo = true;
}

if (item.in_ativo == true) 
{
     ativo  = $scope.statusOption[0];
} 
else
{
       ativo  = $scope.statusOption[1];

}


console.log($scope.opAcordo );


console.log($scope.edit);
$scope.edit = 
{   opAcordo : op,
    grupo_economico: {"no_grupo_economico": item.no_grupo_economico, "id_grupo_economico":  item.id_grupo_economico_SeuCliente } ,
    cliente: {"fantasia": item.no_cliente , "codigo": item.id_SeuCliente },
    ativo:ativo 
};



 console.log($scope.edit);

 crmLibrary.fechaModal(modal);
 $scope.goToTopPage();
}


});
