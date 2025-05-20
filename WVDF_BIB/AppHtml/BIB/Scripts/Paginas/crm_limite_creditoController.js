var assignacaoComercial = angular.module('limiteCredito', ['ngTable', 'ngRoute', 'ui.bootstrap','crmLibrary', 'ngMask']);

assignacaoComercial.controller('limiteCreditoController', function ($scope, $http, NgTableParams, $filter, $window, $location, crmLibrary) {


//VARIAVEIS
$scope.disableEditar = true;
$scope.pesquisa = '';
$scope.clienteSelecionado = '';
$scope.selectedFuncao = '';
$scope.selectedUsuario = '';
$scope.selectedproduto = '';
$scope.carteiraComercial = []
$scope.tbProdutos = [];
$scope.tbProdutosSelecionados = [];
$scope.checkedProdutos = [];
$scope.checkedProdutosSelecionados = [];
$scope.sessao = '';
$scope.check= [];
$scope.produto = [];
$scope.assignacaoComercial = '';
$scope.buscaAssignacao='';
$scope.loadScreen = false;
$scope.modalSelecionarCliente = '';
$scope.retornoCliente = '';
$scope.showAlertMessage= false;
$scope.fecharModal = '';




 $scope.limiteCredito  = {};
$scope.grupoEconomicoSelecionado = '';
$scope.limiteCreditoSelecionado = '';
$scope.responsePais = '';
$scope.responseMoeda = '';

$scope.limiteCreditoSelecionadoEdit = '';

$scope.novo = {};
$scope.novo.pais = '';
$scope.novo.moeda = '';
$scope.novo.valorCredito;

$scope.edit = {};
$scope.edit.pais = '';
$scope.edit.moeda = '';
$scope.edit.valorCredito = '';

angular.element(document).ready(function () {

$scope.sessao = crmLibrary.getParameterByName('aUsuarioSessao');
$scope.urlAPI = crmLibrary.UrlAPI;

});



    crmLibrary.fechaModal('buscaModal');

$scope.buscaLimiteCredito = function()
{
  $scope.loadScreen = true;
   crmLibrary.getRequest('crm/AcordosFinanceiros/LimiteCredito').then(function(response){
        console.log(response);
        $scope.LimiteCredito = response.data;
        $scope.loadScreen = false;
        $scope.populaLimiteCredito();
    }, function(response) {
       $scope.loadScreen = false;
       parent.parent.alertify.error("Ocorreu um erro ao buscar Limite de Credito.");
        console.log("Ocorreu um erro ao buscar Limite de Credito.");
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
                    $scope.disableEditar = false;  
                      $scope.loadScreen = false;
                     console.log(response);
                   //  $scope.grupoEconomicoSelecionado = response.data;
                     return response.data; 
   
    }, function myError(response) { 
    //  alert('teste');
            $scope.loadScreen = false;
           $scope.disableEditar = true; 
          $scope.clearScreen(); 
          console.log(response);
         parent.parent.alertify.error(response.data);

    });
}


$scope.clearScreen = function()
{
  $scope.pesquisa = '';
}



$scope.onSelectGrupoEconomico = function()
{
  if ($scope.pesquisa == null ||  $scope.pesquisa == undefined || $scope.pesquisa == '') 
  {
    parent.parent.alertify.error("Selecione um Grupo Economico.");
    return;
  }
    $scope.grupoEconomicoSelecionado = $scope.pesquisa;
    $scope.buscaLimiteCreditoPorCliente();
    crmLibrary.fechaModal('buscaModal');

}


$scope.limpaNovoLimite = function()
{

$scope.novo = {};
$scope.novo.pais = '';
$scope.novo.moeda = '';
$scope.novo.valorCredito = '';
}

$scope.buscaLimiteCreditoPorCliente = function()
{
  var idGrupo = $scope.grupoEconomicoSelecionado.id_grupo_economico;
    $scope.loadScreen = true;
   crmLibrary.getRequest('crm/AcordosFinanceiros/LimiteCredito/'+idGrupo+'/'+$scope.sessao).then(function(response){
        console.log(response);
        $scope.limiteCredito = response.data;
        $scope.loadScreen = false;
        if ( $scope.limiteCredito.length == 0) 
        {
          $scope.showAlertMessage = true
        }
        else
        {
            $scope.showAlertMessage = false;
        }
        $scope.populaLimiteCredito(response.data);
    }, function(response) {
       $scope.loadScreen = false;
       parent.parent.alertify.error("Ocorreu um erro ao buscar Limite de Credito.");
        console.log("Ocorreu um erro ao buscar Limite de Credito.");
    });
}



  $scope.getPaises = function (value) {
    var url = $scope.urlAPI + 'crm/pais/' + value;
    console.log(url);
      $scope.loadingScreen = true;
    return $http.get(url)
    .then(function (response) {
      console.log(response.data);
      $scope.loadingScreen = false;
      return response.data;

    }, function (response) {
        console.log('Erro ao buscar Pais');
        parent.parent.alertify.error('Erro ao buscar Pais');
    });
  }



  $scope.abreModalEditar = function(item)
  {
       $scope.limiteCreditoSelecionadoEdit = item;
        $scope.edit.pais = item.sg_pais;
        $scope.edit.moeda = item.no_sigla_moeda;
        $scope.edit.valorCrediro = item.vl_credito;
        crmLibrary.fechaModal('editModal');
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


  $scope.getPaisPorSigla = function (value) {
    var url = $scope.urlAPI + 'crm/Pais/BuscaPorSigla/' + value;
    console.log(url);
    $scope.loadingScreen = true;
     $http.get(url)
    .then(function (response) {
      $scope.responsePais = response.data;
      console.log(response.data);
      $scope.loadingScreen = false;
       response.data;
    }, function (response) {
        console.log('Erro ao buscar país');
        parent.parent.alertify.error('Erro ao buscar país');
    });
  }








$scope.Inserir = function()
{

  if ($scope.novo.pais == null || $scope.novo.pais  == '' || $scope.novo.pais == undefined) 
    {
        parent.parent.alertify.error('Selecione um País.');
        return;
    }

    if ($scope.novo.moeda == null || $scope.novo.moeda  =='' || $scope.novo.moeda  == undefined) 
    {
        parent.parent.alertify.error('Selecione uma Moeda.');
        return;
    }
     if ($scope.novo.valorCredito == null || $scope.novo.valorCredito =='' || $scope.novo.valorCredito == undefined) 
    {
        parent.parent.alertify.error('Digite um Valor de Crédito.');
        return;
    }

 console.log('novo', $scope.novo);
    $scope.loadScreen = true;
  var limiteCreditoPost = {
  "id_grupo_economico": $scope.grupoEconomicoSelecionado.id_grupo_economico,
  "vl_credito": $scope.novo.valorCredito, 
  "sg_pais": $scope.novo.pais.sigla
};
    console.log(' limiteCreditoPost',limiteCreditoPost);

     var url=  $scope.urlAPI+'crm/AcordosFinanceiros/LimiteCredito/'+$scope.novo.moeda +'/'+ $scope.sessao;
      console.log(url);
    $http({
        method : "POST",
        url : url,
        data: limiteCreditoPost,
        headers: {'Content-Type': 'application/json'}
    }).then(function mySuccess(response) {
        console.log('sucesso', response);
        $scope.buscaLimiteCreditoPorCliente();
        crmLibrary.fechaModal('myModal');
        $scope.loadScreen = false;

        parent.parent.alertify.success('Salvo com sucesso!');
    }, function myError(response) {
     console.log('erro', response);
        $scope.loadScreen = false;
        parent.parent.alertify.error(response.data);
    });
}



$scope.onSelectPais = function()
{
console.log('pais',$scope.novo.pais);
}

$scope.onSelectMoeda = function()
{
console.log($scope.novo.moeda);
}


$scope.populaLimiteCredito = function()
{
     $scope.tableLimiteCredito = new
  NgTableParams( 
  {
    page: 1,
    count: 10
  },
  {
    counts: [ 10, 20, 50 ],
    dataset: $scope.limiteCredito
  } );
}

$scope.abreModalNovo = function()
{
  $scope.novo = {}; 
  $scope.novo.pais = '';
  $scope.novo.valorCredito = ''; 
  $scope.novo.moeda = 'USD'
  crmLibrary.fechaModal('myModal');
}

 $scope.fechaModalRemover = function()
{ 
   crmLibrary.fechaModal('removerModal');
}

 $scope.abreModalRemover = function(item)
{ 
  $scope.edit = {};
  $scope.limiteCreditoSelecionado = item;
   crmLibrary.fechaModal('removerModal');
}


$scope.limpaPesquisa = function()
{
  $scope.pesquisa = '';
  $scope.showAlertMessage = false;
  $scope.disableEditar = true;
  $scope.grupoEconomicoSelecionado = '';
    $scope.clearScreen();
}




$scope.removerLimiteCredito = function()
{
     $scope.loadScreen = true;
   crmLibrary.deleteRequest('crm/AcordosFinanceiros/LimiteCredito/'+$scope.limiteCreditoSelecionado.id_limite_credito+'/'+$scope.sessao).then(function(response){
        console.log(response);
        $scope.buscaLimiteCreditoPorCliente();
        $scope.fechaModalRemover();
         $scope.loadScreen = false;

         parent.parent.alertify.success(response.data); 
         console.log("Removido com sucesso..");
    }, function(response) {
       $scope.loadScreen = false;
      parent.parent.alertfy.error(response.data);
        console.log("Ocorreu um erro ao remover.");
    });
}

$scope.clearScreen = function()
{ 
  if ( $scope.tableLimiteCredito != null || $scope.tableLimiteCredito != undefined) 
  {
      $scope.tableLimiteCredito.settings().dataset = [];
     $scope.tableLimiteCredito.reload();
  }
  $scope.showAlertMessage = false;
}
$scope.clearEditScreen = function()
{
    $scope.selectedFuncao = '';
    $scope.selectedUsuario = '';
    $scope.checkedProdutos = [];
    $scope.checkedProdutosSelecionados = [];
}



    $scope.onSelectCliente = function(value)
    {


      $scope.clearScreen();
        if ($scope.pesquisa == undefined || $scope.pesquisa =='' || $scope.pesquisa == null)
         {
                  parent.parent.alertify.error('Selecione um Cliente.');
                  return;
         }
        $scope.clienteSelecionado = $scope.pesquisa;
        console.log('clienteSelecionado',$scope.clienteSelecionado);
     var url= $scope.urlAPI + 'crm/Comercial/Assignacao/'+$scope.pesquisa.codigo+'/'+$scope.sessao;
      console.log(url);
    $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
        
                if (value) 
                {
                       $scope.fechaModal('buscaModal');
                }

        console.log('sucesso', response);
        if (response.data.length>0) {
                                $scope.showAlertMessage=false;
                  $scope.buscaAssignacao = response.data;
                      $scope.tableParams = new
                NgTableParams( 
                {
                  page: 1,
                  count: 10

                },
                {
                  counts: [ 10, 20, 50 ],
                  dataset: $scope.buscaAssignacao
                });
                console.log('tableParams',$scope.tableParams.total());

                          $scope.loadScreen = false;
                }
                 else
                 {
                      $scope.loadScreen = false;
                      $scope.showAlertMessage=true;
                 }

    }, function myError(response) {
     console.log('erro', response);
      $scope.loadScreen = false;
       $scope.disableEditar = true;  
       $scope.pesquisa = '';

        parent.parent.alertify.error('Cliente não Selecionado.');
        $scope.clearScreen();

    });
    }

$scope.alterarLimiteCredito = function()
{

console.log( 'edit', $scope.edit);

    if ($scope.edit.moeda == null || $scope.edit.moeda  =='' || $scope.edit.moeda  == undefined) 
    {
        parent.parent.alertify.error('Selecione uma Moeda.');
        return;
    }
    if ($scope.edit.valorCredito == null || $scope.edit.valorCredito =='' || $scope.edit.valorCredito == undefined) 
    {
        parent.parent.alertify.error('Digite um Valor de Crédito.');
        return;
    }

 console.log('edit', $scope.novo);
$scope.loadScreen = true;


var moeda = $scope.edit.moeda.codigo;
  var limiteCreditoAlterar = {
  "id_limite_credito": $scope.limiteCreditoSelecionadoEdit.id_limite_credito,
  "sg_pais": $scope.edit.pais,
    "vl_credito": $scope.edit.valorCredito
};


    console.log(' limiteCreditoPut',limiteCreditoAlterar);

     var url=  $scope.urlAPI+'crm/AcordosFinanceiros/LimiteCredito/'+$scope.edit.moeda+'/'+ $scope.sessao;
      console.log(url);
    $http({
        method : "PUT",
        url : url,
        data: limiteCreditoAlterar,
        headers: {'Content-Type': 'application/json'}
    }).then(function mySuccess(response) {
        console.log('sucesso', response);
        $scope.buscaLimiteCreditoPorCliente();
        crmLibrary.fechaModal('editModal');
        $scope.loadScreen = false;

        parent.parent.alertify.success('Salvo com sucesso!');
    }, function myError(response) {
     console.log('erro', response);
        $scope.loadScreen = false;
        parent.parent.alertify.error(response.data);
    });



}

$scope.getMoedaResponse =function()
{
  return $scope.responseMoeda ;

}

$scope.getMoedaPorSigla = function(value)
{
  var url = $scope.urlAPI+"crm/AcordosFinanceiros/LimiteCredito/MoedaPorSigla/"+value;
  console.log(url);
  $http.get(url)
  .then(function(response) {
$scope.responseMoeda = response.data;
console.log('teste', $scope.responseMoeda);

  }, function(response) {
    // Second function handles error
    $scope.content = "Something went wrong";
  });

}

  $scope.fechaPesquisa = function()
  {
    $scope.pesquisa = '';
    $scope.grupoEconomicoSelecionado = '';
    crmLibrary.fechaModal('buscaModal');
  }

$scope.fechaModal = function(idModal)
{
// alert('teste1 '+idModal);
  //$scope.loadScreen = false;
 // angular.element('#'+idModal).modal('toggle');
           // $modalInstance.close();
 $scope.clearScreen();
// $scope.pesquisa = '';        
 $('#'+idModal).modal('toggle'); 
}





    $scope.setSelected = function (item) {
      var moeda = '';
        $scope.limiteCreditoSelecionadoEdit = item;
        console.log($scope.limiteCreditoSelecionadoEdit);

        $scope.edit.moeda = $scope.limiteCreditoSelecionadoEdit.no_sigla_moeda.trim();
        $scope.edit.pais = item.sg_pais.trim();;
        $scope.edit.valorCredito = item.vl_credito;
        crmLibrary.fechaModal('editModal');
    };




});