var assignacaoComercial = angular.module('assignacaoComercial', ['ngTable', 'ngRoute', 'ui.bootstrap']);

assignacaoComercial.controller('assignacaoComercialController', function ($scope, $http, NgTableParams, $filter, $window, $location) {

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

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

 //$scope.produto = [
        //{
        //    id: "1", nome: "AIR EXPO"
       // }, { id: "2", nome: "LCL IMPO" }
         //   , { id: "3", nome: "AIR IMPO" }
         //   , { id: "4", nome: "FCL IMPO" }
         //   , { id: "5", nome: "FCL EXPO" }
         //   , { id: "6", nome: "LCL EXPO" }
        //];
$scope.selectStatus = [ {id:true , title:"ATIVO"},{id:false , title:"INATIVO"} ];

$scope.funcao = [
        {
            id: "1", title: "SALESPERSON"
        }, { id: "2", title: "INSIDE SALES" },
        { id: "3", title: "CUSTOMER SERVICE" },
        { id: "4", title: "SPONSOR" }];



$scope.usuario = [
        {
            id: "1", nome: "GABRIEL FRANCA"
        }, { id: "2", nome: "FABIO LANDO" },
        { id: "3", nome: "LUCAS LEAL" }
     ];



angular.element(document).ready(function () {

  $scope.sessao = getParameterByName('aUsuarioSessao');
  $scope.baseUrl = new $window.URL($location.absUrl()).origin;

  if ($scope.baseUrl == 'http://192.168.6.18') 
  {
      $scope.urlAPI = "http://192.168.6.23/api/";
      //$scope.urlAPI = 'http://localhost:21651/';
  }
  else if ($scope.baseUrl == 'http://craftcross.grupocraft.com.br')
  {
     $scope.urlAPI = "http://crm.grupocraft.com.br/api/";
  }
  else
  {
   parent.parent.alertify.error('error');
  }

  var customerId = getVariavelURL('customerId');
  if(customerId){
    console.log("id", customerId);
    $scope.pesquisaClienteId(customerId)
  }


//var url=  $scope.urlAPI + 'lib/cross/ccgs210';
  //    console.log(url);
  //  $http({
   //     method : "GET",
  //      url : url
   // }).then(function mySuccess(response) {
   //     console.log(response);
     //   $scope.produto = response.data;
    //    console.log('prod',$scope.produto);
    //    $scope.checkedProdutos = $scope.produto;

  //  }, function myError(response) {
  //      $scope.myWelcome = response.statusText;
//});



});


$scope.getProdutos = function()
{
    return $scope.checkedProdutos;
}
$scope.getProdutosSelecionados = function()
{
    return   $scope.checkedProdutosSelecionados;
}

$scope.getBuscaAssignacao = function()
{
    return   $scope.buscaAssignacao;
}

$scope.btnEnviaTodosProdutos = function()
{
    for (var i =    $scope.checkedProdutos.length - 1; i >= 0; i--) {
           $scope.checkedProdutosSelecionados.push($scope.checkedProdutos[i]);
           $scope.checkedProdutos.splice(i, 1);
    }
}


$scope.btnVoltaTodosProdutos = function()
{
    for (var i = $scope.checkedProdutosSelecionados.length - 1; i >= 0; i--) {
           $scope.checkedProdutos.push($scope.checkedProdutosSelecionados[i]);
           $scope.checkedProdutosSelecionados.splice(i, 1);
    }
}


$scope.redirect = function (value) {
    $window.location.href = value;
}


$scope.Inserir = function()
{

  if ($scope.clienteSelecionado == null || $scope.clienteSelecionado =='' || $scope.clienteSelecionado == undefined || $scope.clienteSelecionado == {} || $scope.clienteSelecionado == []) 
    {
        parent.parent.alertify.error('Selecione um Cliente.');
        return;
    }
    if ($scope.selectedFuncao == null || $scope.selectedFuncao =='' || $scope.selectedFuncao == undefined || $scope.selectedFuncao == {} || $scope.selectedFuncao == []) 
    {
        parent.parent.alertify.error('Selecione uma Função.');

        return;
    }
     if ($scope.selectedUsuario == null || $scope.selectedUsuario =='' || $scope.selectedUsuario == undefined || $scope.selectedUsuario == {} || $scope.selectedUsuario == []) 
    {
        parent.parent.alertify.error('Selecione um Usuáro.');
        return;
    }

    console.log('pesquisa',$scope.pesquisa);
    $scope.assignacaoComercial = 
    {
        "produtosNovo":$scope.checkedProdutosSelecionados,
        "produtosInativar":$scope.checkedProdutos,
        "clienteID": $scope.clienteSelecionado.codigo,
        "funcao" : $scope.selectedFuncao.id,
        "SessaoUsuarioCriacao": $scope.sessao,
        "UsuarioAssinagacaoID": $scope.selectedUsuario.key
    }
    console.log($scope.assignacaoComercial);
    $scope.loadScreen = true;
     var url=  $scope.urlAPI+'CRM/COMERCIAL/ASSIGNACAO';
     //url=  'http://localhost:21651/CRM/COMERCIAL/ASSIGNACAO';
      console.log(url);
    $http({
        method : "POST",
        url : url,
        data: $scope.assignacaoComercial
    }).then(function mySuccess(response) {
        console.log('sucesso', response);
         $scope.onSelectCliente(false);
        $scope.onChangeFuncao();
                $scope.loadScreen = false;

        parent.parent.alertify.success('Salvo com sucesso!');
    }, function myError(response) {
     console.log('erro', response);
             $scope.loadScreen = false;

        $scope.myWelcome = response.statusText;
        parent.parent.alertify.error(response.data);
        $scope.onChangeFuncao();
    });
    $scope.onSelectCliente(false); 
}

$scope.novo = function()
{
//$scope.tbProdutos  = $scope.getProdutos();
//$scope.tbProdutorSelecionados = $scope.getProdutosSelecionados();
$scope.clearEditScreen();
console.log($scope.tbProdutos);
}

$scope.onChangeCheckProduto = function(item, check)
{
    console.log(check);
  //  alert(item.id, check);
    if (check) 
    {
        $scope.checkedProdutosSelecionados.push(item);
        var index = $scope.checkedProdutos.indexOf(item);
        $scope.checkedProdutos.splice(index, 1);
    }
    else
    {
        var index = $scope.checkedProdutos.indexOf(item);
        $scope.checkedProdutos.splice(index, 1);
        //$scope.checkedProdutos = $filter('filter')($scope.checkedProdutos, {id: !item.id});
    }

    console.log($scope.checkedProdutos );
}

$scope.onClickAlterarStatus = function(item)
{
   // alert('teste');
     var url = $scope.urlAPI + 'CRM/COMERCIAL/Assignacao/Status/'+item.id_carteira_comercial+'/';
     //url=  'http://localhost:21651/'+ 'CRM/COMERCIAL/Assignacao/Status/'+item.id_carteira_comercial+'/';
     
    if (item.in_status == true) 
    {
      var url= url+ 'false'+'/'+$scope.sessao;

}
else
{
 var url= url +  'true'+'/'+$scope.sessao;
}
console.log(url);
   $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
        console.log(response);
        $scope.onSelectCliente(false);
        parent.parent.alertify.success(response.data);
    }, function myError(response) {
                parent.parent.alertify.error(response.data);
    });
}


$scope.onChangeCheckProdutoSelecionados = function(item, check)
{
    console.log(check);
  //  alert(item.id, check);
    if (check) 
    {
        $scope.checkedProdutos.push(item);
        var index = $scope.checkedProdutosSelecionados.indexOf(item);
        $scope.checkedProdutosSelecionados.splice(index, 1);
    }
    else
    {
        var index = $scope.checkedProdutosSelecionados.indexOf(item);
        $scope.checkedProdutosSelecionados.splice(index, 1);
        //$scope.checkedProdutos = $filter('filter')($scope.checkedProdutos, {id: !item.id});
    }

    console.log($scope.checkedProdutosSelecionados);
}


$scope.onChangeFuncao = function()
{
   // alert('teste');
    console.log('pesquisa',$scope.pesquisa);
    console.log('selectedUsuario', $scope.selectedUsuario);
    if ($scope.selectedUsuario==null || $scope.selectedUsuario=='' || $scope.selectedUsuario==[] ||$scope.selectedUsuario=={} || $scope.selectedUsuario == undefined) 
    {
     return;   
    }
     $scope.assignacaoComercial = 
    {
        "clienteID": $scope.clienteSelecionado.codigo,
        "funcao" : $scope.selectedFuncao.id,
        "SessaoUsuarioCriacao": $scope.sessao,
        "UsuarioAssinagacaoID": $scope.selectedUsuario.key,
            "produtosNovo":null,
        "produtosInativar":null
    }

    $scope.loadScreen = true;
    console.log($scope.assignacaoComercial);
     var url=  $scope.urlAPI+ 'CRM/COMERCIAL/Assignacao/ObterProdutos';
     //url=  'http://localhost:21651/'+  'CRM/COMERCIAL/Assignacao/ObterProdutos';
      console.log(url);
    $http({
        method : "POST",
        url : url,
        data: $scope.assignacaoComercial
    }).then(function mySuccess(response) {
        console.log('sucesso', response);
        $scope.checkedProdutos = response.data.produtos;
        $scope.checkedProdutosSelecionados = response.data.produtosAtivos;
        $scope.loadScreen = false;
        console.log('checkedProdutos', $scope.checkedProdutos);
    }, function myError(response) {
     console.log('erro', response);
        $scope.loadScreen = false;
        parent.parent.alertify.error('Erro ao Buscar Produtos!');
    });
  }

  $scope.poulaTableAssignacao = function()
  {
       $scope.tableParams = new
    NgTableParams( 
    {
      page: 1,
      count: 10
    },
    {
      counts: [ 10, 20, 50 ],
      dataset: $scope.buscaAssignacao
    } );
  } 

  $scope.getVendedor = function (value) { return $scope.vendedor; };
  $scope.getIs = function (value) { return $scope.vendedor; };
  $scope.getCs = function (value) { return $scope.vendedor; };
  $scope.getSponsor = function (value) { return $scope.vendedor; };

  $scope.pesquisaCliente = function(value)
  {
      console.log("pesquisaCliente_value", value);
      $scope.loadScreen = true;
      value = value.replace(/[\/.-]/g, "").trim();
      var url = $scope.urlAPI + 'crm/pesquisaPessoa/'+value;
    return   $http({
      method : "GET",
      url : url
    }).then(function mySuccess(response) {
                    $scope.disableEditar = false;  
                      $scope.loadScreen = false;
                     console.log(response);
                     $scope.retornoCliente = response.data;
                     return response.data; 
      
   
    }, function myError(response) {     
            $scope.loadScreen = false;
           $scope.disableEditar = true; 
          $scope.clearScreen(); 
          console.log(response);
         parent.parent.alertify.error(response.data);
    });
  }

  $scope.pesquisaClienteId = function(id)
{      
    $scope.loadScreen = true;
    var url = $scope.urlAPI + 'crm/pessoa/'+ id;
    
    return   $http({
      method : "GET",
      url : url
    }).then(function mySuccess(response) {
                    $scope.disableEditar = false;  
                      $scope.loadScreen = false;
                     console.log(response);
                     $scope.retornoCliente = response.data;
                     $scope.clienteSelecionado = response.data;
                     $scope.pesquisa = response.data;
                     $scope.loadPerson(id, false);      
   
    }, function myError(response) {     
            $scope.loadScreen = false;
           $scope.disableEditar = true; 
          $scope.clearScreen(); 
          console.log(response);
         parent.parent.alertify.error(response.data);
    });
  }  
  

$scope.limpaPesquisa = function()
{
  $scope.pesquisa = '';
  $scope.showAlertMessage = false;
  $scope.disableEditar = true;
    $scope.clearScreen();
}


$scope.clearScreen = function()
{ 
  if ( $scope.tableParams != null || $scope.tableParams != undefined) 
  {
      $scope.tableParams.settings().dataset = [];
     $scope.tableParams.reload();
  }
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
      //  $scope.modalSelecionarCliente = "mymodal";
        return;
     }

    $scope.clienteSelecionado = $scope.pesquisa;
    console.log('clienteSelecionado',$scope.clienteSelecionado);

    $scope.loadPerson($scope.pesquisa.codigo, value != "");
    
  }

  $scope.loadPerson = function(personId, isCloseModal)
  {  
    var url= $scope.urlAPI + 'crm/Comercial/Assignacao/'+ personId +'/'+$scope.sessao;
    //url=  'http://localhost:21651/'+ 'crm/Comercial/Assignacao/'+$scope.pesquisa.codigo+'/'+$scope.sessao;
    console.log(url);
    $scope.showAlertMessage=true;
    $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {        
      if (isCloseModal){
        $scope.fechaModal('buscaModal');
      }

      console.log('sucesso', response);
      if (response.data.length>0){
        $scope.showAlertMessage=false;
        $scope.buscaAssignacao = response.data;
        $scope.tableParams = new
            NgTableParams({
              page: 1,
              count: 10
            },
            {
              counts: [ 10, 20, 50 ],
              dataset: $scope.buscaAssignacao
        });
        console.log('tableParams',$scope.tableParams.total());
      }
      else{      
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

  $scope.fechaPesquisa = function()
  {
    $scope.pesquisa = '';
    $scope.fechaModal('buscaModal');
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


     $scope.buscaUsuario   = function(value)
     {
        if ($scope.selectedFuncao == null || $scope.selectedFuncao == '' || $scope.selectedFuncao == [] || $scope.selectedFuncao ==undefined )
            { 
                parent.parent.alertify.error('Selecione uma Função!');
                return;
            }
        $scope.loadScreen = true;
     //   var r =  $filter('filter')($scope.usuario, {'nome': value});
      var url=  $scope.urlAPI + 'lib/cross/csag300/'+value;
      console.log(url);
   return $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
        console.log(response);
        $scope.loadScreen = false;
        return response.data;
    }, function myError(response) {
        $scope.loadScreen = false;     
        parent.parent.alertify.error(response.data);    
    });
     }

$scope.teste = function()
{
     var url=  $scope.urlAPI + 'lib/cross/CCSG210';
      console.log(url);
    $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
        console.log(response);
        $scope.produto = response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
}

    $scope.buscaProdutos  = function()
     {
        console.log('teste');
     //   var r =  $filter('filter')($scope.usuario, {'nome': value});
      var url=  $scope.urlAPI + 'lib/cross/ccgs210';
      console.log(url);
    $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
        console.log(response);
        $scope.produto = response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
     }

    $scope.enviarNeutralidade = function () {
        alert('Enviado para Análise de Neutralidade');
        $window.location.href = 'cadastro_analise_neutralidade.html';

    }

    $scope.setSelectedItem = function (item) {
        $scope.selected = item;
       // $scope.buscaDatalinerMaritmo(item.cnpj);
    };

    // gets the template to ng-include for a table row / item
    $scope.getTemplate = function (item) {
        if (item.id === $scope.model.selected.id) return 'edit';
        else return 'display';
    };

    $scope.editAcordo = function (contact) {
        
        $scope.model.selected = angular.copy(contact);
    };

    $scope.saveAcordo = function (item, index) {
        console.log(item); //valor anterior

        console.log("Saving contact");
        $scope.model.acordosFinanceiros[index] = angular.copy($scope.model.selected);
        console.log(item);
        console.log($scope.model.selected); // valor alterado
        $scope.reset();
    };

    $scope.reset = function () {
        $scope.model.selected = {};
    };
	
	load = function(){
		
	};
	
	load();

});