var app = angular.module('taxaMercadoApp', ['ngTable', 'ngRoute', 'ui.bootstrap', 'crmLibrary', 'bcherny/formatAsCurrency']);

app.filter('yuan', function ($filter) {
    return function (value) {
      return $filter('currency')(value, '')
    }
  })

app.controller('taxaMercadoController', function ($scope, $http, NgTableParams, $location,$sce,crmLibrary, $filter) {

$scope.TaxaMercado = '';
$scope.responseAdicionarPagamento = '';
$scope.sessaoUsuario = undefined;
$scope.addNome = '';
$scope.addDescricao = '';
$scope.editNome ='';
$scope.editDescricao = '';
$scope.loadScreen = false;
$scope.formasDePagamento = '';

$scope.op = 'grupo';


//$scope.filterDataYesNo = [ {id:true , title:"SIM"},{id:false , title:"NÃO"} ];
$scope.filterDataYesNo = crmLibrary.filterDataYesNo;

$scope.filterDataAtivoInativo = crmLibrary.filterDataAtivoInativo;

$scope.filterDataTipoACordo = crmLibrary.filterDataTipoACordo;


$scope.selected = {};

//$scope.urlConfig = 'crm_acordo_financeiro_configuracao.html?idAcordo=3&aUsuarioSessao=292948F1-1123-48DB-8337-D496E6650084';

$scope.notaFiscalOption =  [ { name: "SIM", value: true} ,  { name: "NÃO", value: false}];
$scope.statusOption =  [ { name: "ATIVO", value: true} ,  { name: "INATIVO", value: false}];



angular.element(document).ready(function () {

$scope.novo = 
{ 
  nome:  "",
  cliente:"",
  grupo_economico:"",
  forma_pagamento:"",
  nota_fiscal_debito: {},
  ativo:$scope.statusOption[0],
  validade : new Date(),
  mostra_cliente: false,
  mostra_grupo: true
};

$scope.edit = 
{ 
  nome:  "",
  cliente:"",
  grupo_economico:"",
  forma_pagamento:"",
  nota_fiscal_debito:"",
  ativo: "",
   validade : new Date(),
  mostra_cliente: false,
  mostra_grupo: true
};

$scope.sessaoUsuario = crmLibrary.getParameterByName('aUsuarioSessao');
$scope.urlAPI = crmLibrary.UrlAPI;
$scope.populaFormaPagamento();
console.log($scope.formasDePagamento)
$scope.busca();
});



$scope.abreConfigModal = function(selected)
{
  //alert('teste');
  console.log(selected);
    $scope.urlConfig ='crm_acordo_financeiro_configuracao.html?idAcordo='+selected.id_acordo_fin+'&aUsuarioSessao='+$scope.sessaoUsuario;
    window.top.jaddTab(selected.no_acordo_fin, $scope.urlConfig);
   // crmLibrary.fechaModal('configModal');
    console.log($scope.urlConfig);
}

$scope.getURLConfig = function()
{
  alert('teste');
  return $scope.urlConfig;
}

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
   crmLibrary.getRequest('crm/AcordosFinanceirosHeader').then(function(response){
      	console.log(response);
        $scope.TaxaMercado= response.data;
        $scope.loadScreen = false;
        $scope.populaTabela(response.data);
    }, function(response) {
       $scope.loadScreen = false;
       parent.parent.alertify.error("Ocorreu um erro ao buscar Acordos");
        console.log("Ocorreu um erro ao buscar Acordos");
    });
}


$scope.validaInserir = function()
{
    console.log('validacao novo', $scope.novo);
  if ($scope.novo.nome == null || $scope.novo.nome == undefined || $scope.novo.nome == '') 
  {
    parent.parent.alertify.error("Selecione um nome para acordo.");
    return false;
  }
  if ($scope.op =='cliente') 
  {
       if ($scope.novo.cliente == null ||$scope.novo.cliente == undefined || $scope.novo.cliente == '') 
      {
        parent.parent.alertify.error("Selecione um Cliente.");
        return false;
      }
  }
  else
    if ($scope.op =='grupo' ) 
    {
        if ($scope.novo.grupo_economico == null ||$scope.novo.grupo_economico == undefined || $scope.novo.grupo_economico == '') 
      {
        parent.parent.alertify.error("Selecione um Grupo Economico.");
        return false;
      }
    }

 

  if ($scope.novo.forma_pagamento == null || $scope.novo.forma_pagamento == undefined || $scope.novo.forma_pagamento == '') 
  {
    parent.parent.alertify.error("Selecione uma forma de Pagamento.");
    return false;
  }

  if ($scope.novo.nota_fiscal_debito == null || $scope.novo.nota_fiscal_debito == undefined || $scope.novo.nota_fiscal_debito == '') 
  {
    parent.parent.alertify.error("Selecione uma opção para Nota Fiscal de Débito.");
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
    
  if ($scope.edit.nome == null || $scope.edit.nome == undefined || $scope.edit.nome == '') 
  {
    parent.parent.alertify.error("Selecione um nome para o acordo.");
    return false;
  }
  if ($scope.op =='cliente') 
  {
       if ($scope.edit.cliente == null ||$scope.edit.cliente == undefined || $scope.edit.cliente == '') 
      {
        parent.parent.alertify.error("Selecione um Cliente.");
        return false;
      }
  }
  else
    if ($scope.op =='grupo' ) 
    {
        if ($scope.edit.grupo_economico == null ||$scope.edit.grupo_economico == undefined || $scope.edit.grupo_economico == '') 
      {
        parent.parent.alertify.error("Selecione um Grupo Economico.");
        return false;
      }
    }

 

  if ($scope.edit.forma_pagamento == null || $scope.edit.forma_pagamento == undefined || $scope.edit.forma_pagamento == '') 
  {
    parent.parent.alertify.error("Selecione uma forma de Pagamento.");
    return false;
  }

  if ($scope.edit.nota_fiscal_debito == null || $scope.edit.nota_fiscal_debito == undefined || $scope.edit.nota_fiscal_debito == '') 
  {
    parent.parent.alertify.error("Selecione uma opção para Nota Fiscal de Débito.");
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

if ($scope.validaInserir() == false) 
{
  return;
}

console.log('op', $scope.op);



 console.log('op',$scope.op);
  if ($scope.op == 'cliente') 
  {
   $scope.novo.grupo_economico.id_grupo_economico = null;
  }
  if ($scope.op == 'grupo') 
  {
   $scope.novo.cliente.codigo = null;
  }

	$scope.loadScreen = true;
	var data = {
	"no_acordo_fin": $scope.novo.nome, 
	"id_cliente": $scope.novo.cliente.codigo,
  "id_grupo_economico_cliente": $scope.novo.grupo_economico.id_grupo_economico,
  "id_forma_pagamento": $scope.novo.forma_pagamento.id_forma_pagamento,
  "in_nota_fiscal_debito": $scope.novo.nota_fiscal_debito.value,
  "dt_validade" : $scope.novo.validade,
  "in_ativo" : $scope.novo.ativo.value
  };

console.log('data insert', data);
   crmLibrary.postRequest('crm/AcordosFinanceirosHeader/'+$scope.sessaoUsuario, data).then(function(response){
      	console.log(response);
        $scope.busca();
        $scope.populaTabela();
         $scope.loadScreen = false;
         crmLibrary.fechaModal('addModal');
         parent.parent.alertify.success('Salvo com sucesso.'); 
         console.log("Salvo com sucesso..");

    var url ='crm_acordo_financeiro_configuracao.html?idAcordo='+response.data.id_acordo_fin+'&aUsuarioSessao='+$scope.sessaoUsuario;
     console.log('url',url);
    window.top.jaddTab('Configuração do Acordo Financeiro '+ response.data.no_acordo_fin, url);


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

 console.log('notafiscal',$scope.notafiscal);
  var data = {
    "id_acordo_fin": $scope.edit.id,
    "no_acordo_fin": $scope.edit.nome,
    "id_cliente": $scope.edit.cliente.codigo,
    "id_grupo_economico_cliente":  $scope.edit.id_grupo_economico_cliente,
    "id_forma_pagamento": $scope.edit.forma_pagamento.id_forma_pagamento,
    "in_nota_fiscal_debito":  $scope.edit.nota_fiscal_debito.value,
    "in_ativo": $scope.edit.ativo.value,
    "dt_validade": $scope.edit.validade
  };


  console.log('alterar - data', data);
        $scope.loadScreen = true;

   crmLibrary.putRequest('crm/AcordosFinanceirosHeader/'+$scope.sessaoUsuario, data).then(function(response){
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


 $scope.populaFormaPagamento = function()
    {
        var url = $scope.urlAPI + 'CRM/AcordosFinanceiros/FormaPagamento';
        console.log(url);
      $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
           console.log(response);
          response.data;
          $scope.formasDePagamento = response.data;
    }, function myError(response) { 
          console.log(response);
         parent.parent.alertify.error('Erro ao buscar formas de pagamento.');
    });
  }



 $scope.buscaTodosProdutos = function()
    {
        var url = $scope.urlAPI + 'Cross/Produtos/Todos';
      $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
             console.log(response);
          response.data;
    }, function myError(response) { 
          console.log(response);
         parent.parent.alertify.error(response.data);
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
  nome:  "",
  cliente:"",
  grupo_economico:"",
  forma_pagamento: '',
  nota_fiscal_debito: '',
  ativo:$scope.statusOption[0],
  validade : new Date(),
  mostra_cliente: false,
  mostra_grupo: true
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


function getFormaPagamentoByFind(id){
  return $scope.formasDePagamento.find(x => x.id_forma_pagamento === id);
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
      sorting: { id_acordo_fin: 'desc' },
		}, {
			counts: [10, 20, 50],
			dataset: data
		});
}


$scope.setSelected = function(item, modal)
{
 $scope.selected = item;
 console.log('item',item);
var notafiscal = {};
var status = {};
if (item.in_nota_fiscal_debito == true) 
{
  notafiscal = $scope.notaFiscalOption[0];
}
else
{
  notafiscal = $scope.notaFiscalOption[1];
}

if (item.in_ativo == true )
 {
  status = $scope.statusOption[0];
 }
 else
 {
    status = $scope.statusOption[1];

 }

if (item.id_grupo_economico_cliente ==null || item.id_grupo_economico_cliente ==0) 
{
  $scope.op = 'cliente';
}
else
{
  $scope.op = 'grupo';
}

var dt_validade =  new Date(item.dt_validade);

console.log('dt_validade',dt_validade);
var forma_pagamento = getFormaPagamentoByFind(item.id_forma_pagamento);

$scope.changeRadioButton($scope.op);
$scope.edit = 
{ 
  id : item.id_acordo_fin,
  nome: item.no_acordo_fin,
  cliente:  {"codigo": item.id_cliente, "fantasia": item.no_cliente }  ,
  grupo_economico: { "id_grupo_economico_cliente": item.id_grupo_economico_cliente, "no_grupo_economico": item.no_grupo_economico_cliente },
  forma_pagamento: forma_pagamento,
  nota_fiscal_debito: notafiscal,
  validade:   dt_validade,
  ativo: status
};


console.log($scope.edit);

 crmLibrary.fechaModal(modal);
 $scope.goToTopPage();
}


});
