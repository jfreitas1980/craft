var analiseNeutralidadae = angular.module("serasaRelatoMaisController", ["ngTable", "ngRoute", "ui.bootstrap"]);



analiseNeutralidadae.controller("serasaRelatoMaisController", function Ctrl($scope, $filter, NgTableParams, $http, $window, $location, $sce) {

$scope.urlAPI = '';
$scope.disableCNPJ = true;
   $scope.cnpjBusca ='';;
   $scope.clientePendente = [];
   $scope.sessao = "";
   $scope.dataLiner = [];
   $scope.controleDiarioRes = [];
   $scope.controleDiarioRes = [];
      $scope.embarcadosChegadosRes = [];
	  $scope.terminalRes = [];
		$scope.loadingModalShow = '#loadingModal';
    $scope.obsFinan = '';
    $scope.loadScreen = false;
    $scope.disableBtnTimeline = true;
    $scope.validadeCadastro = '';
		$scope.load = {dataliner:"none", controleDiario:"none",embarcadosChegados:"none",terminal:"none", logcomex:"none" };
		
		
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


angular.element(document).ready(function () {
$scope.sessao = getParameterByName('aUsuarioSessao');

 $scope.baseUrl = new $window.URL($location.absUrl()).origin;
 //alert($scope.baseUrl);

if ($scope.baseUrl == 'http://192.168.6.18') 
{
      $scope.urlAPI = "http://192.168.6.23/api/";
    // $scope.urlAPI = 'http://localhost:21651/';

}
else
	$scope.urlAPI = "https://crm.grupocraft.com.br/api/";



 $scope.buscaPendencias();
});

$scope.buscaPendencias = function()
{
    if ($scope.sessao == undefined || $scope.sessao ==null || $scope.sessao == '') 
  {
    parent.parent.alertify.error("sessao invalida.");
    return;
  }
  $scope.loadScreen = true;
  var url = $scope.urlAPI +'/crm/pendencias/'+ $scope.sessao +'/1/2';
    console.log(url);

$http({
  method: 'GET',
  url: url
}).then(function successCallback(response) {
    $scope.loadScreen = false;

	console.log(response.data);
	  $scope.clientePendente = response.data;
	    $scope.tableParams = new
  NgTableParams( 
  {
    page: 1,
    count: 5
  },
  {
    counts: [ 5, 10, 20, 50 ],
    dataset: $scope.clientePendente
  } );
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    parent.parent.alertify.error(response.data);
        $scope.loadScreen = false;

    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  };

  
  
$scope.buscaControleDiario = function () {

  var  date = new Date();
$scope.load.controleDiario = 'block';
    var dtFim  =  new Date(date).toISOString().split("T")[0];
   // var dtfim = new  Date(data).toISOString().split("T")[0];
	
 var	dtinicio = moment(dtinicio).add(-1, 'year').toISOString().split("T")[0];

    console.log('dtinicio',dtinicio);
    console.log('dtfim',dtFim);
var url =  $scope.urlAPI+'/Cross/People/ControleDiario/'+dtinicio+"/"+dtFim+"/"+ $scope.selected.doc_ref.substring(0,8);
console.log(url);
    $http.get(url).then(function (result) {
      var  data = result.data;
		$scope.controleDiarioRes = data;
        console.log('ControleDiario', data);
        $scope.tableControleDiario = new NgTableParams(
            {
                page: 1,
                count: 5
            },
            {
                counts: [5, 10, 20, 50],
                dataset: data
            });
$scope.load.controleDiario = 'none';
    }, function (result) {
        console.log("REQUEST ERROR:");
        $scope.statusLoadingControle = 'none';

    });

};
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

    $scope.myFunc = function() {
       // $scope.currentProject = $scope.projects[id];
    //  $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.currentProject.url)

     // $scope.urlTimelinPendencia = "crm_pendencias_timeline.html?cdReferencia=7767&cdProcesso=1";
     if ($scope.selected == undefined || $scope.selected == {} || $scope.selected == null || $scope.selected =="" || $scope.selected == []) 
     {
      parent.parent.alertify.error("Selecione uma Pendencia.");
      return;
     }

     $scope.urlTimelinPendencia = "crm_pendencias_timeline.html?cdReferencia="+$scope.selected.cd_referencia+"&cdProcesso="+$scope.selected.id_processo;
     console.log('url',  $scope.urlTimelinPendencia);
     $scope.goToTopPage();
   /// parent.parent.alertify.success( $scope.urlTimelinPendencia ); 
        }


$scope.buscaTerminal = function () {


var url = $scope.urlAPI+ "crm/Analyzer/terminal/"+$scope.selected.doc_ref;
				$scope.load.terminal = 'block';

console.log(url);
    $http.get(url).then(function (result) {
       var data = result.data;
		$scope.terminalRes = data;
        console.log('Terminal', data);
				$scope.load.terminal = 'none';

        $scope.tableTerminal = new NgTableParams(
            {
                page: 1,
                count: 5
            },
            {
                counts: [5, 10, 20, 50],
                dataset: data
            });
    }, function (result) {
        console.log("REQUEST ERROR:");
				$scope.load.terminal = 'none';

    });

};
  
  
      $scope.change = function() {
alert('teste')
      };


  $scope.selected={}; 
  


  $scope.selectedItem = function(item)
  {
	  
	$scope.selected = item; 
    $scope.disableBtnTimeline = false;
    console.log('selected', $scope.selected);
$scope.cnpjBusca = $scope.selected.doc_ref.substring(0,8);
console.log('cnpjBusca',$scope.cnpjBusca);
	console.log( $scope.selected);
	//$scope.populaControleDiario();
	//$scope.populaEmbarcadosChegados();
	//$scope.populaTerminal();
	//$scope.buscaDatalinerMaritmo($scope.cnpjBusca);
  //$scope.populaLogComex();
   enableToggleCNPJ();
  $scope.buscaAnaliseDeMercado($scope.cnpjBusca);
  };
  function enableToggleCNPJ() {
    //alert('teste');
    $('#toggle-event').prop('checked', true).change()
  }

    function disableToggleCNPJ() {
    $('#toggle-event').prop('checked', false).change()
  }
$scope.buscaAnaliseDeMercado = function(cnpj)
{
  $scope.populaControleDiario();
  $scope.populaEmbarcadosChegados();
  $scope.populaTerminal();
  $scope.buscaDatalinerMaritmo(cnpj);
  $scope.populaLogComex();
}
  $scope.buscaDatalinerMaritmo= function(cnpj) {

	
	    data = new Date();
$scope.load.dataliner = 'block';
    var dtFim  =  new Date(data).toISOString().split("T")[0];
	
   var	dtinicio = moment(dtinicio).add(-1, 'year').toISOString().split("T")[0];
	

     var URLdataliner = $scope.urlAPI+"crm/DatalinerMaritimo/" + cnpj + "/"+dtinicio+"/"+dtFim;
    console.log(URLdataliner);
     $http.get(URLdataliner).then(function (response) {
        var data = response.data;
		$scope.dataLiner = data;
        console.log('Dataliner', data);
$scope.load.dataliner = 'none';
    $scope.tableDataliner = new NgTableParams(
    {
      page: 1,
      count: 5
    },
    {
      counts: [ 5, 10, 20, 50 ],
      dataset: data
    }
    );
      }, function (response) {
        console.log("REQUEST ERROR:");
		$scope.load.dataliner = 'none';

      });

  }

  $scope.limpaTabelas = function()
  {
      $scope.tableDataliner =  new NgTableParams(
    {
      page: 1,
      count: 5
    },
    {
      counts: [ 5, 10, 20, 50 ],
      dataset: []
    });
            $scope.tableTerminal =  new NgTableParams(
    {
      page: 1,
      count: 5
    },
    {
      counts: [ 5, 10, 20, 50 ],
      dataset: []
    });
                  $scope.embarcadosTab =  new NgTableParams(
    {
      page: 1,
      count: 5
    },
    {
      counts: [ 5, 10, 20, 50 ],
      dataset: []
    });
                        $scope.ControleDiarioTab =  new NgTableParams(
    {
      page: 1,
      count: 5
    },
    {
      counts: [ 5, 10, 20, 50 ],
      dataset: []
    });

        $scope.tableLogComex =  new NgTableParams(
    {
      page: 1,
      count: 5
    },
    {
      counts: [ 5, 10, 20, 50 ],
      dataset: []
    });
    //   $scope.tableDataliner.reload();
     // $scope.tableTerminal.dataset = [];
     // $scope.tableTerminal.reload();
      // $scope.embarcadosTab.dataset = [];
      //$scope.embarcadosTab.reload();
     // $scope.ControleDiarioTab.dataset = [];
     // $scope.ControleDiarioTab.reload();
  };




  $scope.populaControleDiario = function()
  {
	    var  date = new Date();
$scope.load.controleDiario = 'block';

    var dtFim  =  new Date(date).toISOString().split("T")[0];

 var	dtinicio = moment(dtinicio).add(-1, 'year').toISOString().split("T")[0];

    console.log('dtinicio',dtinicio);
    console.log('dtfim',dtFim);
var url = $scope.urlAPI+ "Cross/People/ControleDiario/"+dtinicio+"/"+dtFim+"/"+ $scope.cnpjBusca;

console.log(url);
  $http.get(url)
    .then(function(response) {
       // $scope.databaseDest = response.data;
        console.log(response.data);
        var data = response.data;
       $scope.ControleDiarioTab = new NgTableParams(
        {
            page: 1,
            count: 5
        },
        {
            counts: [5, 10, 20, 50],
            dataset: response.data
        });
$scope.load.controleDiario = 'none';

    }, function(response) {
      console.log(response);
	  $scope.load.controleDiario = 'none';

  });
}



 
   $scope.populaEmbarcadosChegados = function()
  {
	    var  date = new Date();
$scope.load.embarcadosChegados = 'block';

    var dtFim  =  new Date(date).toISOString().split("T")[0];

 var	dtinicio = moment(dtinicio).add(-1, 'year').toISOString().split("T")[0];

    console.log('dtinicio',dtinicio);
    console.log('dtfim',dtFim);
var url = $scope.urlAPI+ 'Cross/People/EmbarcadosChegados/'+dtinicio+"/"+dtFim+"/"+$scope.cnpjBusca;

console.log(url);
  $http.get(url)
    .then(function(response) {
       // $scope.databaseDest = response.data;
        console.log(response.data);
        var data = response.data;
		$scope.load.embarcadosChegados = 'none';

       $scope.embarcadosTab = new NgTableParams(
        {
            page: 1,
            count: 5
        },
        {
            counts: [5, 10, 20, 50],
            dataset: response.data
        });

    }, function(response) {
      console.log(response);
	  $scope.load.embarcadosChegados = 'none';

  });
}


 $scope.goToTopPage = function()
  {
    document.location.href = "#top";
  }


  $scope.populaTerminal = function()
  {
$scope.load.terminal = 'block';

var url =  $scope.urlAPI+"crm/Analyzer/terminal/"+$scope.cnpjBusca;

console.log(url);
  $http.get(url)
    .then(function(response) {
       // $scope.databaseDest = response.data;
        console.log(response.data);
        var data = response.data;
       $scope.terminalTab = new NgTableParams(
        {
            page: 1,
            count: 5
        },
        {
            counts: [5, 10, 20, 50],
            dataset: response.data
        });
$scope.load.terminal = 'none';

    }, function(response) {
      console.log(response);
	  $scope.load.terminal = 'none';

  });
}
  $(function() {
    $('#toggle-event').change(function() {
   var isCheck = $(this).prop('checked');
  // alert(isCheck);
  console.log($scope.disableBtnTimeline);
  if ($scope.disableBtnTimeline == true) 
    {
       return;
     };
   if (isCheck)
    {
     $scope.cnpjBusca = $scope.selected.doc_ref.substring(0,8);
    }
    else
    {
      $scope.cnpjBusca =  $scope.selected.doc_ref;
    }
     $scope.buscaAnaliseDeMercado($scope.cnpjBusca);
   // alert( $scope.cnpjBusca);
    })
  })
  
 $scope.populaLogComex = function()
  {
$scope.load.logcomex = 'block';

var url = $scope.urlAPI+ "CRM/DW/LOGCOMEX/"+$scope.cnpjBusca;

console.log(url);
  $http.get(url)
    .then(function(response) {
       // $scope.databaseDest = response.data;
        console.log(response.data);
        var data = response.data;
       $scope.tableLogComex = new NgTableParams(
        {
            page: 1,
            count: 5
        },
        {
            counts: [5, 10, 20, 50],
            dataset: response.data
        });
$scope.load.logcomex = 'none';

    }, function(response) {
      console.log(response);
    $scope.load.logcomex = 'none';

  });
}
  
  
  


  
$scope.aprovaFinanceiro =function()
{
	  $scope.loadScreen = true;

	  var selected = $scope.selected;
   // alert($scope.selected);
    console.log($scope.selected);
	  	  //alert(selected);if
	  if(selected.id_pendencia ==undefined || selected.id_pendencia == null || selected == null || selected == {})
	  {
				parent.parent.alertify.error('Selecione uma Pendencia.');
				return;
	  }
	  console.log('selected',selected);
	  selected.ds_obs = $scope.obsFinan;
	  var urlReq = $scope.urlAPI + '/crm/pendencias/2/'+$scope.sessao;
	  $http({
        url:  urlReq,
        method: "POST",
        data: selected
    })
    .then(function(response) {
		  $scope.loadScreen = false;

		console.log(response.data);
      $scope.alterarValidadeCadastro();
       $scope.selected = {};
      $scope.limpaTabelas();
      $scope.obsFinan = '';
      $scope.validadeCadastro = '';
		  parent.parent.alertify.success('Analise Aprovada! Cliente Ativo.'); 

    }, 
    function(response) { // optional
        parent.parent.alertify.error(response.data); 
        $scope.limpaTabelas();
        $scope.obsFinan = '';
		  $scope.loadScreen = false;

    });

$scope.removeItem();


};
  $scope.reprovaFinanceiro =function()
{
	  $scope.loadScreen = true;

		  var selected = $scope.selected;
		  	  //alert(selected);if
	  if( selected.id_pendencia ==undefined || selected.id_pendencia == null || selected == null || selected == {} )
	  {
				parent.parent.alertify.error('Selecione uma Pendencia.');
				return;
	  }
   selected.ds_obs = $scope.obsFinan;
	  console.log('selected',selected);
	  var urlReq = $scope.urlAPI + '/crm/pendencias/3/'+$scope.sessao;
	  $http({
        url:  urlReq,
        method: "POST",
        data: selected
    })
    .then(function(response) {
		  $scope.loadScreen = false;

		console.log(response.data);
	  parent.parent.alertify.success('Analise Reprovada!'); 
       $scope.limpaTabelas();
       $scope.obsFinan = '';

    }, 
    function(response) { // optional
	
          parent.parent.alertify.error(response.data); 
		    $scope.loadScreen = false;

                  $scope.limpaTabelas();
$scope.obsFinan = '';

    });
$scope.removeItem();
  };

  

    $scope.alterarValidadeCadastro =function()
{
  //alert('teste');
  if ($scope.validadeCadastro == undefined || $scope.validadeCadastro == 0 ) 
  {
    return;
  }
var url = $scope.urlAPI+'CRM/pessoa/validade/'+$scope.selected.cd_referencia+"/"+$scope.validadeCadastro;
console.log(url);
$http({
        url: url,
        method: "PUT"
    })
    .then(function(response) {
            console.log(response.data);
    }, 
    function(response) { // optional
            console.log(response.data);
    });
  };
  

  $scope.removeItem = function ()
  {
    var index
    = $scope.clientePendente.indexOf($scope.selected);

 //   alert(index); 
 $scope.clientePendente.splice(index,
    1); $scope.tableParams.reload();
  }


});
