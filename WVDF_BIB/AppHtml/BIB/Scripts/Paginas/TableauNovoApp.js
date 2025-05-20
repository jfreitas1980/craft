var app = angular.module('plunker', ["ngTable", 'ngTagsInput']);

app.controller('MainCtrl', function($scope, NgTableParams, $http,$filter) {

urlAPI = 'http://192.168.6.23/api';


angular.element(document).ready(function () {

    // your code here
$scope.populaTabela();
});

$scope.selected = "";
$scope.totalRecords = 0;
$scope.usuarioBusca = "";
$scope.edit =[];
$scope.edit.nomeDash = "";
$scope.edit.caminhoURL = "";
$scope.selectedRemove = "";
$scope.selectedEdit = [];
$scope.selectedRemoveUser = [];
//$scope.dataInicio = new Date(Date.now());
//$scope.dataFim = new Date(Date.now());
$scope.usuariosAcessoEdit = [];
$scope.nomeDash= "";
$scope.caminhoURL = "";
console.log($scope.dataInicio);
$scope.usuariosAcesso = [];

$scope.setSelectedRemove = function(value)
{
  //alert('teste');
  console.log('setSelectedRemove',value);
  $scope.selectedRemove = value;
}

$scope.teste = function()
{

alert('teste');	
}
$scope.removerUsuario = function()
{

 //    alert('teste');
	 //alert('selectedRemoveUser2',$scope.selectedRemoveUser);
      //var array = $scope.selectedRemoveUser;
      console.log('selectedRemoveUser2',$scope.selectedRemoveUser);
	   console.log('selectedEdit',$scope.selectedEdit.id);
	 var array = { "ID": $scope.selectedEdit.id, "NomeDash": $scope.edit.nomeDash, "CaminhoURL": $scope.edit.caminhoURL, "UsuarioAcesso": [ $scope.selectedRemoveUser ] };
     var url = urlAPI+'/Lib/TableauCross/RemoveAcesso';
      console.log(url);
    $http({
        url:  url,
        method: "DELETE",
        headers: {
       'Content-Type': 'application/json',
       'Accept':  'application/json'
 },
        data: array
    })
    .then(function(response) {
      console.log(response);
           //alert('success');
          //  $scope.buscaLog();
		   $scope.loadTableUsuarios($scope.selectedEdit);
		   $scope.usuariosAcessoEdit = [];
           parent.parent.alertify.success('Removido com Sucesso!');

    }, 
    function(response) { // optional
            // failed
          //  alert(response.data.error);
            console.log(response.data.error);
  parent.parent.alertify.error(response.data.error);
    });

}


$scope.setSelectedUserRemove = function(value)
{
	 //alert(value);
	 console.log('selectedRemoveUser',value);
     $scope.selectedRemoveUser = value;
}

$scope.populaTabela = function()
{


var url = urlAPI+'/lib/TableauDash';
console.log(url);
  $http.get(url)
    .then(function(response) {
       // $scope.databaseDest = response.data;
        console.log(response.data);
        var data = response.data;
       $scope.tableParams = new NgTableParams(
        {
            page: 1,
            count: 5
        },
        {
            counts: [5, 10, 20, 50],
            dataset: data
        });
       
    }, function(response) {
      console.log(response);
      var data = response.data;

   //  alert(response.data.error); 
     parent.parent.alertify.error(response.data.error); 

  });
}

$scope.setSelected =function (model)
{
  $scope.selected = model;
  console.log($scope.selected);
}

$scope.buscaLog = function () {
 $scope.populaTabela();
}

$scope.buscaUsuario = function(value)
{
console.log('value',value);
var url = "http://192.168.6.23/api/Lib/CROSS/CSAG300/"+value;
console.log('USUARIO',url);
 return  $http.get(url)
    .then(function(response) {
         return response.data;
    }); 
}


$scope.addDash =  function()
{
  console.log('nomeDash',$scope.nomeDash);
  console.log('caminhoURL',$scope.caminhoURL);
  if ($scope.nomeDash == undefined || $scope.nomeDash == null  || $scope.nomeDash == '' ) 
  {
    return  parent.parent.alertify.error('Preencha o nome do Dashboard!');
  }

  if ($scope.caminhoURL == undefined || $scope.caminhoURL == null || $scope.caminhoURL == '') 
  {
    return parent.parent.alertify.error('Preencha o campo de URL!');
  }

    var array = {  "NomeDash": $scope.nomeDash, "CaminhoURL": $scope.caminhoURL, "UsuarioAcesso": $scope.usuariosAcesso};
    console.log(array);
      //var url = urlAPI+'/Lib/TableauCross';
	  var url = urlAPI+'/Lib/TableauCross';
      console.log(url);
    $http({
        url:  url,
        method: "POST",
        data: array
    })
    .then(function(response) {
      console.log(response);
          //  alert('success');
           $scope.buscaLog();
           parent.parent.alertify.success('Adicionado com Sucesso!');
           $scope.nomeDash = '';
           $scope.caminhoURL = '';
           $scope.usuarioacesso = [];

    }, 
    function(response) { // optional
            // failed
          //  alert(response.data.error);
            console.log(response.data.error);
  parent.parent.alertify.error(response.data.error);
    });
}

$scope.loadTableUsuarios = function(value)
{
$scope.edit.nomeDash = value.no_dashboard; 
$scope.edit.caminhoURL = value.no_url;
$scope.selectedEdit = value;
console.log('selectedEdit',$scope.selectedEdit);
console.log($scope.edit);
var url = urlAPI+'/LIB/TableauDash/'+value.id+'/usuarioacesso';
console.log(url);
  $http.get(url)
    .then(function(response) {
       // $scope.databaseDest = response.data;
        console.log(response.data);
        var result = response.data;
       $scope.tableUsers = new NgTableParams(
        {
            page: 1,
            count: 5
        },
        {
            counts: [5, 10, 20, 50],
            dataset: result
        });
       
    }, function(response) {
      console.log(response);
      var data = response.data;

   //  alert(response.data.error); 
     parent.parent.alertify.error(response.data.error); 

  });
}

$scope.removerDash = function()
{
      var array = $scope.selectedRemove;
    console.log('selectedRemove',array);
      var url = urlAPI+'/Lib/TableauCross';
      console.log(url);
    $http({
        url:  url,
        method: "DELETE",
        headers: {
       'Content-Type': 'application/json',
       'Accept':  'application/json'
 },
        data: array
    })
    .then(function(response) {
      console.log(response);
        //    alert('success');
            $scope.buscaLog();
           parent.parent.alertify.success('Removido com Sucesso!');

    }, 
    function(response) { // optional
            // failed
          //  alert(response.data.error);
            console.log(response.data.error);
  parent.parent.alertify.error(response.data.error);
    });
}



$scope.alterarDashboard = function()
{
   // alert('teste');
   console.log('nomeDash',$scope.edit.nomeDash);
   if ($scope.edit.nomeDash == undefined || $scope.edit.nomeDash == '' || $scope.edit.nomeDash == null) 
   {
      return parent.parent.alertify.error('Preencha o Nome do Dashboard!');
   }  

   if ($scope.edit.caminhoURL == undefined || $scope.edit.caminhoURL == '' || $scope.edit.caminhoURL == null) 
   {
      return parent.parent.alertify.error('Preencha o Caminho URL!');
   }  
    var array =[]; 
    array = $scope.selectedEdit;
    console.log('selectedEdit',array);
    console.log($scope.edit.nomeDash);
    array.no_url = $scope.edit.caminhoURL;
    array.no_dashboard = $scope.edit.nomeDash;
      var url = urlAPI+'/Lib/TableauCross';
      console.log(url);
    $http({
        url:  url,
        method: "PATCH",
        headers: {
       'Content-Type': 'application/json',
       'Accept':  'application/json'
 },
        data: array
    })
    .then(function(response) {
      console.log(response);
      //    alert('success');
           $scope.buscaLog();
           parent.parent.alertify.success('Alterado com Sucesso!');
    }, 
    function(response) { // optional
            // failed
          //  alert(response.data.error);
            console.log(response.data.error);
  parent.parent.alertify.error(response.data.error);
    });
}




$scope.permitirAcesso = function()
{
     console.log('usuariosAcessoEdit', $scope.usuariosAcessoEdit);
     if ($scope.usuariosAcessoEdit == null || $scope.usuariosAcessoEdit.length == 0 || $scope.usuariosAcessoEdit == undefined) 
     {
        return parent.parent.alertify.error('Selecione algum usuário para dar acesso!');
     } 
     var array = []; 
     console.log('selectedEdit', $scope.selectedEdit);
     console.log($scope.edit.nomeDash);
     array.no_url = $scope.edit.caminhoURL;
     array.no_dashboard = $scope.edit.nomeDash;
          console.log('usuariosAcessoEdit', $scope.usuariosAcessoEdit);

	  var array = {  "ID": $scope.selectedEdit.id, "NomeDash" : $scope.edit.nomeDash, "CaminhoURL": $scope.edit.caminhoURL, "UsuarioAcesso": $scope.usuariosAcessoEdit};
       console.log('array', array);
	  var url =      urlAPI+'/Lib/TableauCross/PermitirAcesso';
      console.log(url);
    $http({
        url:  url,
        method: "POST",
        headers: {
       'Content-Type': 'application/json',
       'Accept':  'application/json'
 },
        data: array
    })
    .then(function(response) {
      console.log(response);
      //    alert('success');
           $scope.loadTableUsuarios($scope.selectedEdit);
		   		   $scope.usuariosAcessoEdit = [];

           parent.parent.alertify.success('Acesso concedido!');
    }, 
    function(response) { // optional
            // failed
          //  alert(response.data.error);
            console.log(response.data.error);
  parent.parent.alertify.error(response.data.error);
    });
}


});