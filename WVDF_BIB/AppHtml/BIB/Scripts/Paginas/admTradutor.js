var app = angular.module('myApp', ['ngTable', 'ngRoute', 'ui.bootstrap']);

app.controller('admTradutor', function($scope,$http,NgTableParams, $filter, $window, $location) {

  _getUrlAPI = function(){
    var baseUrl = new $window.URL($location.absUrl()).origin;
    var urlAPI = "https://crm.grupocraft.com.br/api";

    if (baseUrl == "http://192.168.6.18") 
    {
        urlAPI = "http://192.168.6.23/api";
        //urlAPI = "http://localhost:21651";             
    }
    else if (baseUrl == "http://craftcross.grupocraft.com.br")
    {
        urlAPI = "http://crm.grupocraft.com.br/api";  
    }
    else if (baseUrl == "https://craftcross.grupocraft.com.br")
    {
      urlAPI = "https://crm.grupocraft.com.br/api";
    }
    else
    {
        parent.parent.alertify.error("error");
    }
    
   return urlAPI;
  };

  var urlTradutor = _getUrlAPI() + "/adm/tradutor/database";                    

   $http.get(urlTradutor)
    .then(function(response) {
        $scope.database = response.data;
        console.log(response.data);
    });

  $http.get(urlTradutor)
    .then(function(response) {
        $scope.databaseDest = response.data;
        console.log(response.data);
		
    });

  

$scope.selected = 0 ;
$scope.selectedTable = 0;
$scope.selectedDest = undefined;
$scope.buscaTabela = "";
$scope.showAlertDanger = "none";
$scope.alertMessageDanger = "";
$scope.typeAlert = "";
$scope.modalAdd="";
$scope.retornoURLOrigem = [];
$scope.retornoURLDestino = [];
$scope.selectedOrigemValor ="";
$scope.selectedValorRef = "";
$scope.selectedDestinoValor = "";
$scope.saveEdit = "";
$scope.selectedItem =""; 
$scope.oldOrigemValue = "";
$scope.oldDestinoValue = "";
$scope.isReadOnly = "";
$scope.valorTabelaRef = [];
$scope.valorOrigemPendente = "";
$scope.valorReferenciaOrigem = "";
$scope.valorReferenciaDestino = "";

	$scope.selectedBasePend = "";
	$scope.selectedBaseDestPend = "";
	$scope.selectedTablePendente = "";
	$scope.selectedDestTablePend ="";
	$scope.valorDestinoPendenciaAdd = "";
	$scope.itemPendenteSelecionado = {};
	  $scope.tableCount  = "";
  $scope.editModal = "#editModal";



//PENDETES
$scope.selectedPendentes = "";


$scope.cmbTabelas = function() {
  var url = _getUrlAPI() + "/adm/tradutor/tabela/"+$scope.selected+"/database";
 // alert(url);
  console.log(url);
  $http.get(url)
    .then(function(response) {
        $scope.sistemas = response.data;
        console.log(response.data);
    });
};




$scope.getTabDest = function() {
  var url = _getUrlAPI() + "/adm/tradutor/tabela/"+$scope.selectedDest+"/database";
  console.log(url);
  $http.get(url)
    .then(function(response) {
        console.log(response.data);
         $scope.tabelaDest = response.data;
    });
};




$scope.getTabelaByID = function() {

  var url = _getUrlAPI() + "/adm/tradutor/tabela/"+$scope.selectedTable;
  console.log('url get by ID',url);
  //alert(url);
  $http.get(url)
    .then(function(response) {
        $scope.tabelaSelecionada = response.data;
      console.log(response.data);
    });
};

$scope.getTabelaDestByID = function() {

  var url = _getUrlAPI() + "/adm/tradutor/tabela/"+$scope.selectedDestTable;
 // alert(url);
  $http.get(url)
    .then(function(response) {
        $scope.tabelaSelecionadaDest = response.data;
      console.log(response.data);
    });
};


$scope.selecionarItem = function(item)
{

  $scope.selectedItem = item;
  console.log(item);
}

$scope.getTabelaByName = function(busca, id) {

  var url = _getUrlAPI() + "/adm/tradutor/tabela/"+busca+"/"+id;
 // alert(url);
  $http.get(url)
    .then(function(response) {
           console.log(response.data);
        return response.data;
    });
};


$scope.buscar = function(update) {
$scope.showAlertDanger = "none";
$scope.alertMessageDanger = "";
$scope.valorTabelaRef = [];
//alert($scope.selectedDes);

if (update == 0) 
{
  //console.log($scope.validacoes());
  if ($scope.validacoes() == false) 
    {
      return;
    }
}

if ($scope.selectedDes == undefined) 
    { 
        //alert('teste');
    }

if ($scope.selectedDest == 0) 
{
    $scope.selectedDestTable = 0;
}
console.log('orig',$scope.valorOrigem);

var vlorig = 0;

if ($scope.valorOrigem.key !=undefined) 
{
  vlorig = $scope.valorOrigem.key;
}
else
{ 
  vlorig = $scope.valorOrigem;
}

  var url = _getUrlAPI() + "/tradutor/"+$scope.selected+"/"+$scope.selectedTable+"/"+$scope.selectedDest+"/"+$scope.selectedDestTable+"/"+vlorig;
 // alert(url);
 console.log(url);


  $http.get(url)
    .then(function(response) {
           console.log("TRADUTOR", response.data);
      $scope.respostaTradutor = [];
      if (response.data.length == undefined) 
        {  
            $scope.respostaTradutor.push(response.data);
}
else
{
     $scope.respostaTradutor = response.data;
}
      console.log($scope.respostaTradutor);
      $scope.populaTabDestino($scope.respostaTradutor);
      console.log("LENGTH",$scope.respostaTradutor.length);
      if ($scope.respostaTradutor.length>0) 
      {
       // alert($scope.respostaTradutor[0].dataBaseOrigem);
  
        if ($scope.respostaTradutor[0].dataBaseOrigem != null) 
        {
         // $scope.AddComplementoReferencia($scope.respostaTradutor[0]);
           //$scope.showAlertDanger = 'block'; 
          // $scope.typeAlert = "success";
          if (update == 0) {
            parent.parent.alertify.success('Traduzido'); 
          }
        }
        else
        {
          // $scope.showAlertDanger = 'block'; 
           //$scope.typeAlert = "warning";
             if (update == 0) 
           {
           parent.parent.alertify.log('Tradução não encontrada'); 
         }
           $scope.respostaTradutor = [];
                 $scope.populaTabDestino($scope.respostaTradutor);

        }
      
      }
    });
};

$scope.validacoes = function()
{
  if ($scope.selected ==0) { 
   // $scope.showAlertDanger = 'block'; 
  //  $scope.typeAlert = "danger";
    parent.parent.alertify.error('Selecione um Sistema Origem!');
    //$scope.alertMessageDanger="Selecione um Sistema Origem.";  
    return false;}

    if ($scope.selectedTable ==0) { 
   // $scope.showAlertDanger = 'block'; 
   // $scope.typeAlert = "danger";
    parent.parent.alertify.error('Selecione uma Tabela Origem.'); 
    return false;}


  if ($scope.selectedDest ==undefined) { 
   // $scope.showAlertDanger = 'block'; 
   //  $scope.typeAlert = "danger";
     parent.parent.alertify.error('Selecione uma opção para Sistema Destino.'); 
    return false;}

    if ($scope.selected == $scope.selectedDest) 
    {
    // $scope.showAlertDanger = 'block'; 
    // $scope.typeAlert = "danger";
    parent.parent.alertify.error('Sistema Origem e Destino não podem ser iguais.'); 
     return false; 
    }
    if ($scope.valorOrigem == undefined || $scope.valorOrigem == "" ) { 
   // $scope.showAlertDanger = 'block'; 
     //$scope.typeAlert = "danger";
     parent.parent.alertify.error('Preencha o campo de refêrencia.'); 
    return false;}  
}

$scope.populaTabDestino = function(datatable)
{
data = datatable;
        self.tabTradutor = new NgTableParams(
            {
                page: 1,
                count: 5
            },
            {
                counts: [5, 10, 20, 50],
                dataset: data
            }); 
}


$scope.mostraModalAddTradutor= function()
{
  $scope.tituloAcao = "Nova Tradução";
  $scope.iconeModal = "glyphicon glyphicon-log-in";

  $scope.selectedOrigemValor = $scope.valorOrigem;
  $scope.selectedDestinoValor = "";
  
  if ($scope.selected ==0 || $scope.selected == undefined ) { 
   // alert('Selecione um Sistema Origem!');
    parent.parent.alertify.error('Selecione um Sistema Origem!');
    return;}

    if ($scope.selectedTable ==0 || $scope.selectedTable == undefined ) { 
      //alert('Selecione uma Tabela Origem.');
      parent.parent.alertify.error('Selecione uma Tabela Origem.'); 
      return;
    }

    console.log('selectedDest', $scope.selectedDest);
    if ($scope.selectedDest ==undefined ||  $scope.selectedDest ==0) { 
     //     alert('Selecione uma opção para Sistema Destino.');
       parent.parent.alertify.error('Selecione uma opção para Sistema Destino.'); 
      return;
    }

    if ($scope.selected == $scope.selectedDest) 
    {
   //   alert('Sistema Origem e Destino não podem ser iguais.');
    parent.parent.alertify.error('Sistema Origem e Destino não podem ser iguais.'); 
     return; 
    }



    console.log('selectedTable', $scope.selectedTable);
    var objectArray = $scope.sistemas; 
    var objectArrayDest = $scope.tabelaDest;
    console.log('objectArray',objectArray)
    console.log('selectedDestTable',$scope.selectedDestTable);
    //var obj = $filter('filter')(objectArray, {id_table: '1'}, true);


       //  var tab =  sistemas.find(item => item.id_table === parseInt($scope.selectedTable))
    var database = $scope.database;


 //$scope.tabAddOrig = $filter('filter')(objectArray, {'id_table': $scope.selectedTable})[0];
 //$scope.baseAddOrig = $filter('filter')($scope.database, {'id_database': $scope.selected})[0];
 //$scope.tabAddDest = $filter('filter')(objectArrayDest, {'id_table': $scope.selectedDestTable})[0];
 //$scope.baseAddDest = $filter('filter')($scope.database, {'id_database': $scope.selectedDest})[0];
 
    $scope.tabAddOrig  =  objectArray.find(item => item.id_table === parseInt($scope.selectedTable))
	  $scope.baseAddOrig  =  database.find(item => item.id_database === parseInt($scope.selected))
		$scope.tabAddDest  = objectArrayDest.find(item => item.id_table === parseInt($scope.selectedDestTable))
		$scope.baseAddDest =  database.find(item => item.id_database === parseInt($scope.selectedDest))
 

console.log('tabAdd', $scope.tabAddOrig);
console.log('baseAdd', $scope.baseAddOrig);
console.log('tabAddDest', $scope.tabAddDest);
console.log('baseAddDest', $scope.baseAddDest);

$scope.modalAdd = "#myModal"
$scope.saveEdit = 'save';
}

$scope.buscaValorOrigem2 = function(value)
{
 if ($scope.tabAddOrig.no_url!=null) {
var url = _getUrlAPI() + $scope.tabAddOrig.no_url + value;
console.log('buscaValorOrigem',url);
 return  $http.get(url)
    .then(function(response) {
         return response.data;
    }); 
  }else{return;}

}




$scope.buscaTabReferencia = function(item)
{
  console.log('item',item);
  if ( item.urlDestino!= "" && item.urlDestino != null ) {
      var url = _getUrlAPI() + item.urlDestino + item.valorDestino;
      console.log('buscaValorOrigem',url);
       return  $http.get(url)
          .then(function(response) {
            console.log('buscaValorOrigem value', response.data[0].value );
            //   $scope.valorTabelaRef = response.data[0].value;
                  $scope.valorTabelaRef.push(response.data[0].value);
               return;
          }); 

    }
    else
    {
              console.log('item.valorDestino', item.valorDestino);
          $scope.valorTabelaRef.push(item.valorDestino);
        return;
  }
}



$scope.buscaValorReferencia = function(value)
{
	console.log('selected table', $scope.selectedTable);
	console.log('sistemas', $scope.sistemas);
	var sistemas = $scope.sistemas;
	console.log('sistemas2',$scope.sistemas);
	
  var tab =  sistemas.find(item => item.id_table === parseInt($scope.selectedTable))
  console.log('TABELA',tab);

    // If you want to see the result, just check the log
    //console.log('single_object',single_object);
	//var tab = $filter('filter')($scope.sistemas, {'id_table': $scope.selectedTable})[0];
	//var tab =  sistemas.filter(x => x.id_table === $scope.selectedTable);
	
console.log('TABELA',tab);

console.log('ref',tab);
var url = _getUrlAPI() + tab.no_url + value;
console.log('buscaValorReferencia',url);
 return  $http.get(url)
    .then(function(response) {
         return response.data;
    }); 
}

$scope.fechaModalSalvar = function()
{
      $scope.SaveEdit = '';
}




$scope.buscaValorDestino = function(value)
{
  console.log("buscaValorDestino_tabAddDest", tabAddDest.no_url);
  if ($scope.tabAddDest.no_url != null & $scope.tabAddDest.no_url != undefined) 
  {
    //var url = "http://192.168.6.23/api" + $scope.tabAddDest.no_url + value;
    var url =_getUrlAPI() + $scope.tabAddDest.no_url + value;

    console.log('buscaValorDestino',url);
    return  $http.get(url)
      .then(function(response) {
          return response.data;
      }); 
  }
  return;
}


$scope.comboValorReferencia = function(value) {
  console.log(value);
var arr = $scope.buscaValorReferencia(value);
console.log('comboValorReferencia',arr);
return arr; }



$scope.comboValorOrigem2 = function(value) {
var arr = $scope.buscaValorOrigem2(value);
console.log('comboValorOrigem2',arr);
return arr; }


$scope.comboValorOrigem = function(value) {
  $scope.buscaValorOrigem(value);
  var arr = $scope.retornoURLOrigem;  
  console.log('comboValorOrigem',arr);
  return arr;
}

$scope.comboValorDestino = function(value) {

  console.log('comboValorDestino_value',value);
  var arr =   $scope.buscaValorDestino(value);
  console.log('comboValorDestino',arr);
  return arr;  
}


$scope.editarTraducao = function(item)
{
  $scope.selectedItem = item;
  $scope.saveEdit = "edit";
  $scope.oldOrigemValue = item.valorOrigem;
  $scope.oldDestinoValue = item.valorDestino;
  $scope.isReadOnly = 'checked';


  $scope.tituloAcao = "Editar Tradução";
  $scope.iconeModal = "glyphicon glyphicon-edit";
  console.log('item selecionado', item);


console.log('selectedTable', $scope.selectedTable);
var objectArray = $scope.sistemas; 
var objectArrayDest = $scope.tabelaDest;
console.log(objectArray)
console.log('objectArrayDest',objectArrayDest)

console.log('selectedDestTable', $scope.selectedDestTable);
$scope.tabAddDest = {};
//var obj = $filter('filter')(objectArray, {id_table: '1'}, true);
 $scope.tabAddOrig = $filter('filter')(objectArray, {'id_table': $scope.selectedTable})[0];
 $scope.baseAddOrig = $filter('filter')($scope.database, {'id_database': $scope.selected})[0];
 $scope.tabAddDest.no_table = item.tabelaDestino;
 $scope.baseAddDest = $filter('filter')($scope.database, {'no_database': item.databaseDestino})[0];
 $scope.selectedOrigemValor = item.valorOrigem;
 $scope.selectedDestinoValor = item.valorDestino;


console.log('tabEdit', $scope.tabAddOrig);
console.log('baseEdit', $scope.baseAddOrig);
console.log('tabEditDest', $scope.tabAddDest);
console.log('baseEditDest', $scope.baseAddDest);


    $scope.modalAdd = "#myModal";

}


$scope.saveOrEdit= function()
{
  if ($scope.saveEdit== "save") 
  {
    $scope.salvarTraducao();
  }
  else if ($scope.saveEdit== "edit")
   {
    $scope.editaTraducao();
   }

}


$scope.salvarTraducao = function()
{
  console.log('origem valor',$scope.selectedOrigemValor);
  console.log('origem valor',$scope.selectedOrigemValor);

var ori ="";
var dest  = "";

if ($scope.selectedOrigemValor == undefined ||  $scope.selectedOrigemValor == "") 
{
  parent.parent.alertify.error('Preencha o Valor Origem!');
  return;
}
if ($scope.selectedDestinoValor == undefined ||  $scope.selectedDestinoValor == "") 
{
  parent.parent.alertify.error('Preencha o Valor Destino!');
  return;
}


  if ($scope.selectedOrigemValor.key == undefined)
   {
     console.log("salvarTraducao","key undefined");
    ori = $scope.selectedOrigemValor; 
    dest = $scope.selectedDestinoValor;
   }
   else
   {
    console.log("salvarTraducao","key defined");
    ori = $scope.selectedOrigemValor.key;
     dest = $scope.selectedDestinoValor.key
   }


 var dataSave = {
  "dataBaseOrigem": $scope.selected,
  "tabelaOrigem": $scope.selectedTable,
  "colunaOrigem": "",
  "databaseDestino": $scope.selectedDest,
  "tabelaDestino": $scope.selectedDestTable,
  "colunaDestino": "",
  "valorOrigem": ori,
  "valorDestino": dest
};

console.log("salvar dados", dataSave);
 

  //var urlService= 'http://192.168.6.23/api/Tradutor';
  //var urlService= 'http://localhost:21651/Tradutor';

  var urlService = _getUrlAPI() + '/Tradutor';

  $http({
        url: urlService,
        method: "POST",
        data: dataSave
    })
    .then(function(response) {
            // success
            console.log('sucess', response);
            parent.parent.alertify.success("Salvo com Sucesso!"); 
            $scope.buscar(1);


    }, 
    function(response) { // optional
            // failed
        console.log('error', response);
        parent.parent.alertify.error(response.data.error); 
    });
}


$scope.editaTraducao = function()
{
    console.log($scope.selectedItem);

    console.log($scope.selectedOrigemValor);

  var ori ="";
  var dest  = "";

    if ($scope.selectedOrigemValor == undefined ||  $scope.selectedOrigemValor == "") 
    {
      parent.parent.alertify.error('Preencha o Valor Origem!');
      return;
    }
    if ($scope.selectedDestinoValor == undefined ||  $scope.selectedDestinoValor == "") 
    {
      parent.parent.alertify.error('Preencha o Valor Destino!');
      return;
    }


    if ($scope.selectedOrigemValor.key == undefined)
    {
      ori = $scope.selectedOrigemValor;
      dest = $scope.selectedDestinoValor;
    }
    else
    {
      ori = $scope.selectedOrigemValor.key;
      dest = $scope.selectedDestinoValor.key
    }



  var dataUpdate = {
    "dataBaseOrigem": $scope.selectedItem.dataBaseOrigemID,
    "tabelaOrigem": $scope.selectedItem.tabelaOrigemID,
    "colunaOrigem": "",
    "databaseDestino": $scope.selectedItem.databaseDestinoID,
    "tabelaDestino": $scope.selectedItem.tabelaDestinoID,
    "colunaDestino": "",
    "valorOrigem":  $scope.oldOrigemValue ,
    "valorDestino": $scope.oldDestinoValue,
    "novoValorOrigem" : ori, 
    "novoValorDestino" : dest

  };

  console.log('Update Tradutor', dataUpdate);
  //var urlService= 'http://192.168.6.23/api/Tradutor';
  var urlService= _getUrlAPI() + '/Tradutor';
  //var urlService= 'http://localhost:21651/Tradutor';
  $http({
        url: urlService,
        method: "PUT",
        data: dataUpdate,
         headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
    })
    .then(function(response) {
            // success
            console.log('sucess', response);
            parent.parent.alertify.success("Tradução atualizada com Sucesso!"); 

      $scope.populaTabDestino($scope.respostaTradutor);
            $scope.populaTabDestino(tab);
    }, 
    function(response) { // optional
            // failed
          console.log('error', response);
        parent.parent.alertify.error(response.data.error); 

    }); 
}


$scope.AddComplementoReferencia = function(data)
{

 angular.forEach(obj, function(value, key) {
    console.log(key + ': ' + value);
  });
}
	
//var url = 'http://192.168.6.23/adm/tradutor/Pendencias';
var url = _getUrlAPI() + '/adm/tradutor/Pendencias';
console.log(url);
  $http.get(url)
    .then(function(response) {
       // $scope.databaseDest = response.data;
        console.log(response.data);
        var result = response.data;
       $scope.tableParams = new NgTableParams(
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

  

  //PENDENTES
$scope.editarTraducaoPendente = function(item)
{
	//alert(item);
	$scope.itemPendenteSelecionado = item;
	console.log('pendente', item);
	$scope.selectedBasePend = item.id_database_origin;
	$scope.selectedBaseDestPend = item.id_database_destination;
	$scope.selectedTablePendente = item.id_table_origin;
	$scope.selectedDestTablePend = item.id_table_destination;
	$scope.valorOrigemPendente = item.vl_origin;
	//selectedDestTable
	console.log('selectedBasePend',$scope.selectedBasePend );
	console.log('selectedBaseDestPend',$scope.selectedBaseDestPend );
	console.log('selectedTablePendente',$scope.selectedTablePendente );
	console.log('selectedDestTablePend',$scope.selectedDestTablePend );
	
	var tabelasOrigem = "";
	var valorReferencia = "";


    $scope.buscarTabelaOrigem($scope.selectedTablePendente);
   $scope.buscarTabelaReferenciaDestino(item.id_table_destination);



	// tabelasOrigem  = tabelasOrigem.find(item => item.id_table === parseInt($scope.selectedTablePendente ))
	  console.log('tab', tabelasOrigem)
	  
	  
	  
	  
     //  $scope.tabAddOrig  =  $scope.sistemas.find(item => item.id_table === parseInt($scope.selectedTable))
	//   $scope.baseAddOrig  =  database.find(item => item.id_database === parseInt($scope.selected))
	//	$scope.tabAddDest  = objectArrayDest.find(item => item.id_table === parseInt($scope.selectedDestTable))
	//	$scope.baseAddDest =  database.find(item => item.id_database === parseInt($scope.selectedDest))

}




$scope.buscarTabelaOrigem = function (id)
{
	  var url = _getUrlAPI() + "/adm/tradutor/tabela/"+id;
  console.log('url',url);
	 $http({
  method: 'GET',
  url: url
}).then(function successCallback(response) {
    console.log(response.data);
	
	   $http.get(_getUrlAPI() + response.data.no_url+$scope.valorOrigemPendente)
    .then(function(response) {
          response.data;
		  console.log( response.data);
      console.log('valorReferenciaOrigem',  $scope.valorReferenciaOrigem )
		  $scope.valorReferenciaOrigem = response.data[0].value;
    });
	
	$scope.valorReferenciaOrigem  = response.data.value;
	
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
		
}

$scope.buscaTabelasOrigem = function(database)
{
  var url = _getUrlAPI() + "/adm/tradutor/tabela/"+database+"/database";
  console.log(url);
   $http.get(url)
    .then(function(response) {
		console.log(response.data);
          response.data;
    }); 	
}



$scope.sistemaDestinoPendentes = function() {
  var url = _getUrlAPI() + "/adm/tradutor/tabela/"+$scope.selectedDestinoPendentes+"/database";
 // alert(url);
  console.log(url);
  $http.get(url)
    .then(function(response) {
        $scope.sistemas = response.data;
        console.log('pendente sistema', response.data);
    });
};





$scope.tabelaPendente = function() {

  var url = _getUrlAPI() + "/adm/tradutor/tabela/"+$scope.selectedTablePendente;
  console.log('url get by ID',url);
  //alert(url);
  $http.get(url)
    .then(function(response) {
        $scope.tabelaSelecionada = response.data;
      console.log(response.data);
    });
};



$scope.tabelaDestinoPendente = function() {
  var url = _getUrlAPI() + "/adm/tradutor/tabela/"+$scope.selectedDestPendente+"/database";
  console.log(url);
  $http.get(url)
    .then(function(response) {
        console.log(response.data);
         $scope.tabelaDest = response.data;
    });
};





$scope.comboValorReferenciaPendencia = function(value) {
var url = _getUrlAPI() + $scope.valorReferenciaDestino.no_url+value;
console.log(url);
  return $http.get(url)
    .then(function(response) {
           console.log(response.data);
        return response.data;
    });
  }






$scope.removerTraducao = function()
{
console.log($scope.selectedItem);





 var dataDelete = {
  "dataBaseOrigem": $scope.selectedItem.dataBaseOrigemID,
  "tabelaOrigem": $scope.selectedItem.tabelaOrigemID,
  "colunaOrigem": "",
  "databaseDestino": $scope.selectedItem.databaseDestinoID,
  "tabelaDestino": $scope.selectedItem.tabelaDestinoID,
  "colunaDestino": "",
  "valorOrigem":  $scope.selectedItem.valorOrigem,
  "valorDestino": ""
};
console.log('itemRemove', dataDelete);

$http({
        url: _getUrlAPI() + '/Tradutor',
        method: "DELETE",
        data: dataDelete,
         headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
    })
    .then(function(response) {
            // success
            console.log('sucess', response);
            parent.parent.alertify.success("Tradução removida com Sucesso!"); 
            $scope.buscar(1); 

      $scope.populaTabDestino($scope.respostaTradutor);
            $scope.populaTabDestino(tab);
    }, 
    function(response) { // optional
            // failed
          console.log('error', response);
        parent.parent.alertify.error(response.data.error); 

    });
}


$scope.salvarPendencia = function()
{

//alert($scope.valorDestinoPendenciaAdd.key);
console.log('item',$scope.itemPendenteSelecionado);
console.log($scope.valorReferenciaOrigem);
console.log('teste',$scope.valorReferenciaDestino);

var dest = $scope.valorReferenciaDestino;

 var dataSave = {
  "dataBaseOrigem": $scope.itemPendenteSelecionado.id_database_origin,
  "tabelaOrigem": $scope.itemPendenteSelecionado.id_table_origin,
  "colunaOrigem": "",
  "databaseDestino": $scope.itemPendenteSelecionado.id_database_destination,
  "tabelaDestino": $scope.itemPendenteSelecionado.id_table_destination,
  "colunaDestino": "",
  "valorOrigem": $scope.itemPendenteSelecionado.vl_origin,
  "valorDestino": $scope.valorDestinoPendenciaAdd.key
};

console.log(dataSave);

$http({
          url: _getUrlAPI() + '/Tradutor',
        //url: 'http://localhost:21651/Tradutor',
        method: "POST",
        data: dataSave
    })
    .then(function(response) {
            // success
            console.log('sucess', response);
            parent.parent.alertify.success("Salvo com Sucesso!"); 
         //   $scope.buscar(1);
    }, 
    function(response) { // optional
            // failed
        console.log('error', response);
        parent.parent.alertify.error(response.data.error); 
    });


}

$scope.buscarTabelaReferenciaDestino = function(id)
{
  var url = _getUrlAPI() + "/adm/tradutor/tabela/"+id;
  console.log(url);
   $http.get(url)
    .then(function(response) {
		console.log('ref dest',response.data);
		  $scope.valorReferenciaDestino = response.data;
    }); 
}






});