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
{ armador: '',
  dt_referencia:  new Date(),
  vl_taxa_cambio_expo : null,
  vl_taxa_cambio_impo : null,
  moedaOrigem: "",
  modedaDestino: ""
};

$scope.edit = 
{ 
  armador: '',
  dt_referencia:  new Date(),
  vl_taxa_cambio_expo : null,
  vl_taxa_cambio_impo : null,
  moedaOrigem:"",
  modedaDestino:""
};



$scope.selected = {};






angular.element(document).ready(function () {

$scope.sessaoUsuario = crmLibrary.getParameterByName('aUsuarioSessao');
$scope.urlAPI = crmLibrary.UrlAPI;


var documentos =  
[
{
  "icon": "fas fa-money-check-alt fa",
  "nome":"Manual Analise Financeira",
  "url": "https://crm.grupocraft.com.br/api/documentation/Manual_AnaliseFinanceira.pdf",
  "criado_por": "Gabriel França",
    "tp_arquivo": "PDF"

},

{
  "icon": "fas fa-file-invoice-dollar",
  "nome":"Manual Acordos Financeiros",
  "url": "https://crm.grupocraft.com.br/api/documentation/Manual_AcordosFinanceiros.pdf",
  "criado_por": "Gabriel França",
    "tp_arquivo": "PDF"

},
{
  "icon": "fas fa-tasks fa",
  "nome":"Manual Assignacao Comercial",
  "url": "https://crm.grupocraft.com.br/api/documentation/Manual_AssignacaoComercial.pdf",
  "criado_por": "Gabriel França",
    "tp_arquivo": "PDF"

},
{
  "icon": "fas fa-bezier-curve",
  "nome":"Fluxo de Cadastro para Grupo Economico",
  "url": "https://crm.grupocraft.com.br/api/documentation/RegraGrupoEconomico.pdf",
  "criado_por": "Gabriel França",
    "tp_arquivo": "PDF"
},
{
  "icon": "fas fa-server",
  "nome":"API de Integração com o CROSS",
  "url": "https://crm.grupocraft.com.br/api/documentation/Documentação_API.pdf",
  "criado_por": "Gabriel França",
    "tp_arquivo": "PDF"
},
{
  "icon": "fas fa-cogs",
  "nome":"Publicar API no servidor",
  "url": "https://crm.grupocraft.com.br/api/documentation/API_setup.pdf",
  "criado_por": "Gabriel França",
    "tp_arquivo": "PDF"
}

];

$scope.populaTabelaTaxaMercado(documentos);

$scope.novo.moedaOrigem = $scope.moedaInicial;
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
$("#valorEditExpo").ForceNumericOnly();
$("#valorEditImpo").ForceNumericOnly();


$scope.abreNovaAba = function(url)
{
        window.open(url, '_blank');
}





$scope.onChangeTaxaExpoNovo = function()
{
      $scope.novo.vl_taxa_cambio_impo =  $scope.novo.vl_taxa_cambio_expo;
}
$scope.onChangeTaxaExpoEdit = function()
{
      $scope.edit.vl_taxa_cambio_impo =  $scope.edit.vl_taxa_cambio_expo;
}



$scope.validaAlterar = function()
{
    

  if ($scope.edit.armador.codigo == null ||$scope.edit.armador.codigo == undefined || $scope.edit.armador.codigo == '') 
  {
    parent.parent.alertify.error("Selecione um armador.");
    return false;
  }

  if ($scope.edit.vl_taxa_cambio_expo == null || $scope.edit.vl_taxa_cambio_expo == undefined || $scope.edit.vl_taxa_cambio_expo == '') 
  {
    parent.parent.alertify.error("Digite um valor de taxa de cambio expo.");
    return false;
  }

  if ($scope.edit.vl_taxa_cambio_impo == null || $scope.edit.vl_taxa_cambio_impo == undefined || $scope.edit.vl_taxa_cambio_impo == '') 
  {
    parent.parent.alertify.error("Digite um valor de taxa de cambio impo.");
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
	"dt_cambio": $scope.novo.dt_referencia, 
  "id_armador": $scope.novo.armador.codigo,
  "vl_taxa_cambio_expo": $scope.novo.vl_taxa_cambio_expo, 
  "vl_taxa_cambio_impo": $scope.novo.vl_taxa_cambio_impo,
  "id_moeda_origem" : $scope.novo.moedaOrigem.codigo,
  "id_moeda_destino": $scope.novo.modedaDestino.codigo
  };

console.log('data insert', data);
   crmLibrary.postRequest('crm/AcordosFinanceiros/TaxaCambioArmador/'+$scope.sessaoUsuario, data).then(function(response){
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
   "id_cambio_armador" : $scope.selected.id_cambio_armador,
  "dt_cambio": $scope.edit.dt_referencia, 
  "id_armador": $scope.edit.armador.codigo,
  "vl_taxa_cambio_expo": $scope.edit.vl_taxa_cambio_expo, 
  "vl_taxa_cambio_impo": $scope.edit.vl_taxa_cambio_impo,
  "id_moeda_origem" : $scope.edit.moedaOrigem.codigo,
  "id_moeda_destino": $scope.edit.modedaDestino.codigo
  };


  console.log('alterar - data', data);
        $scope.loadScreen = true;

   crmLibrary.putRequest('crm/AcordosFinanceiros/TaxaCambioArmador/'+$scope.sessaoUsuario, data).then(function(response){
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
        var url = $scope.urlAPI + 'crm/pessoa/BuscaArmador/'+value;
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
   crmLibrary.deleteRequest('crm/AcordosFinanceiros/TaxaCambioArmador/'+$scope.selected.id_cambio_armador+'/'+$scope.sessaoUsuario).then(function(response){
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
  moedaOrigem:  { 'codigo': 220,  'descricao': 'DOLAR EUA',  'sigla': 'USD' },
  modedaDestino: { 'codigo': 790 ,  'descricao': 'REAL/BRASIL',  'sigla': 'R$' } ,
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
  armador: { "codigo": item.id_armador, "fantasia": item.no_armador },
  moedaOrigem: {"codigo": item.id_moeda_origem , "sigla": item.no_moeda_origem },
  modedaDestino: {"codigo": item.id_moeda_destino , "sigla": item.no_moeda_destino } ,
  vl_taxa_cambio_expo: item.vl_taxa_cambio_expo,
  vl_taxa_cambio_impo: item.vl_taxa_cambio_impo
};
console.log($scope.edit);


 crmLibrary.fechaModal(modal);
 $scope.goToTopPage();
}


});
