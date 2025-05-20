var analiseNeutralidadae = angular.module("analiseNeutralidade", ["ngTable", "ngRoute", "ui.bootstrap"]);



analiseNeutralidadae.controller("analiseNeutralidadeController", function Ctrl($scope, $filter, NgTableParams, $http, $window, $location, $sce) {

$scope.urlAPI = "";

   $scope.cnpjBusca ='';

   $scope.clientePendente = []; 
      $scope.minhasAprovacoes = []; 

   $scope.sessao = "";
   $scope.dataLiner = [];
   $scope.controleDiarioRes = [];
   $scope.controleDiarioRes = [];
      $scope.embarcadosChegadosRes = [];
	  $scope.terminalRes = [];
    $scope.obsNeutralidade= '';
    $scope.loadScreen = false;
    $scope.disableBtnTimeline = true;
		$scope.load = {dataliner:"none", controleDiario:"none", embarcadosChegados:"none", terminal:"none", logcomex:"none" };
     $scope.urlTimelinPendencia = "";
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



angular.element(document).ready(function () {
$scope.sessao = getParameterByName('aUsuarioSessao');

 $scope.baseUrl = new $window.URL($location.absUrl()).origin;
// alert($scope.baseUrl);

if ($scope.baseUrl == 'http://192.168.6.18') 
{
   //$scope.urlAPI = "http://localhost:21651/";
   $scope.urlAPI = "http://192.168.6.23/api/";

 // alert('homolog');
}
else if ($scope.baseUrl == 'http://craftcross.grupocraft.com.br')
 {
    $scope.urlAPI = "http://crm.grupocraft.com.br/api/";
    //  alert('prod');
 }
 else
 {
  parent.parent.alertify.error('error');
 }


 $scope.buscaPendencias();

});

$scope.buscaPendencias= function()
{
  if ($scope.sessao == undefined || $scope.sessao ==null || $scope.sessao == '') 
  {
    parent.parent.alertify.error("sessao inválida.");
    return;
  }
   $scope.loadScreen = true;

  $http({
  method: 'GET',
  url: $scope.urlAPI +"crm/pendencias/"+ $scope.sessao +'/1/1'
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

$scope.buscarApiCRM = function()
{
var params =  { "aUsuarioSessao": $scope.sessao };
var url = $scope.baseUrl+'/WVDF_WS/ws_hcgs3004.wso/buscarCrm/JSON'
console.log('url', url);
  $http({
        method : "GET",
        url : url,
        data : params
    }).then(function mySuccess(response) {
         console.log(response.data);
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
}
  
    
//$http({
 // method: 'GET',
 // url: $scope.urlAPI + $scope.sessao +'/2/2'
//}).then(function successCallback(response) {
 // console.log(response.data);
 //   $scope.minhasAprovacoes = response.data;

    // this callback will be called asynchronously
    // when the response is available
 // }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  //});
  

 

$scope.buscaTerminal = function () {
var url =  $scope.urlAPI+"crm/Analyzer/terminal/"+$scope.selected.doc_ref;
$scope.load.terminal = 'block';

console.log(url);
    $http.get(url).then(function (result) {
    var    date = result.data;
		$scope.terminalRes = data;
        console.log('Terminal', data);
		$scope.load.terminal = 'none';

        $scope.terminalTab = new NgTableParams(
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
  

  
  $scope.selected={}; 
  


  $scope.selectedItem = function(item)
  {
    $scope.selected = item; 
    $scope.disableBtnTimeline = false;
	console.log('selected', $scope.selected);
//	$scope.populaControleDiario();
//	$scope.populaEmbarcadosChegados();
//	$scope.populaTerminal();

	//$scope.buscaDatalinerMaritmo(item.doc_ref);
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

	  var  date = new Date();
$scope.load.dataliner = 'block';

    var dtFim  =  new Date(date).toISOString().split("T")[0];
   // var dtfim = new  Date(data).toISOString().split("T")[0];
	
 var	dtinicio = moment(dtinicio).add(-1, 'year').toISOString().split("T")[0];
	

     var URLdataliner = $scope.urlAPI+"crm/DatalinerMaritimo/" + cnpj.substring(0,8) + "/"+dtinicio+"/"+dtFim;
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


  $scope.populaControleDiario = function()
  {
	    var  date = new Date();
$scope.load.controleDiario = 'block';

    var dtFim  =  new Date(date).toISOString().split("T")[0];

 var	dtinicio = moment(dtinicio).add(-1, 'year').toISOString().split("T")[0];

    console.log('dtinicio',dtinicio);
    console.log('dtfim',dtFim);
var url =  $scope.urlAPI+"Cross/People/ControleDiario/"+dtinicio+"/"+dtFim+"/"+ $scope.selected.doc_ref.substring(0,8);

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
var url = $scope.urlAPI+ 'Cross/People/EmbarcadosChegados/'+dtinicio+"/"+dtFim+"/"+$scope.selected.doc_ref.substring(0,8);

console.log(url);
  $http.get(url)
    .then(function(response) {
       // $scope.databaseDest = response.data;
        console.log(response.data);
        var data = response.data;
       $scope.embarcadosTab = new NgTableParams(
        {
            page: 1,
            count: 5
        },
        {
            counts: [5, 10, 20, 50],
            dataset: response.data
        });
$scope.load.embarcadosChegados = 'none';

    }, function(response) {
      console.log(response);
	  $scope.load.embarcadosChegados = 'none';

  });
}




  $scope.populaTerminal = function()
  {
$scope.load.terminal = 'block';

var url =  $scope.urlAPI+"crm/Analyzer/terminal/"+$scope.selected.doc_ref.substring(0,8);

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
      $scope.loadScreen = false;
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
     console.log( $scope.loadScreen);
     $scope.buscaAnaliseDeMercado($scope.cnpjBusca);

   // alert( $scope.cnpjBusca);
    })
  })

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

  $scope.populaLogComex = function()
  {
$scope.load.logcomex = 'block';

var url =  $scope.urlAPI+"CRM/DW/LOGCOMEX/"+$scope.selected.doc_ref.substring(0,8);

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
  
  
  
  
  
  


  
  $scope.aprovarAnaliseNeutralidade = function (selected)
  {
	  //alert(selected);if
    console.log(selected);
	  $scope.loadScreen = true;

   // alert(selected.id_pendencia ==undefined );
	  if(selected.id_pendencia ==undefined || selected.id_pendencia == null || selected == null || selected == {})
	  {
				parent.parent.alertify.error('Selecione uma Pendencia.');
				return;
	  }
	  console.log(selected);
    selected.ds_obs = $scope.obsNeutralidade;
	  var urlReq = $scope.urlAPI + 'crm/pendencias/2/'+$scope.sessao;
      
	  	  console.log(urlReq);

	  $http({
        url:  urlReq,
        method: "POST",
        data: selected
    })
    .then(function(response) {
		  $scope.loadScreen = false;

		console.log(response.data);
		  parent.parent.alertify.success('Analise neutralidade aprovada!'); 
      $scope.removeItem();    
            $scope.selected = {};
            $scope.obsNeutralidade = '';
   $scope.limpaTabelas();
	 $scope.goToTopPage();
 
    }, 
    function(response) { // optional
            // failed
			  $scope.loadScreen = false;

					  parent.parent.alertify.error(response.data); 
            $scope.obsNeutralidade = '';
   $scope.goToTopPage();

    });
  };
  
  $scope.goToTopPage = function()
  {
    document.location.href = "#top";
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
  };
  
    $scope.reprovarAnaliseNeutralidade = function (selected)
  {
//	  alert(selected);
  $scope.loadScreen = true;

	  if(selected.id_pendencia ==undefined || selected.id_pendencia == null || selected == null || selected == {} )
	  {
				parent.parent.alertify.error('Selecione uma Pendencia.');
				return;
	  }
     selected.ds_obs = $scope.obsNeutralidade;
	  var urlReq = $scope.urlAPI + 'crm/pendencias/3/'+$scope.sessao;
	  console.log(urlReq);
	  $http({
        url:  urlReq,
        method: "POST",
        data: selected
    })
    .then(function(response) {

		console.log(response.data);
	  parent.parent.alertify.success('Reprovado!'); 
	  		  $scope.loadScreen = false;

	  $scope.removeItem();
        $scope.limpaTabelas();
                    $scope.obsNeutralidade = '';
                    $scope.selected = {};
    }, 
    function(response) { // optional
       					  parent.parent.alertify.error(response.data); 
						    $scope.loadScreen = false;

        $scope.limpaTabelas();
            $scope.obsNeutralidade = '';

    });
  };
  
  $scope.limpaDados = function()
  {
	  $scope.selected = {};
	  $scope.populaControleDiario = [];
	  $scope.DatalinerMaritimo = [];
	  $scope.populaEmbarcadosChegados = [];
	  $scope.populaTerminal = [];
    $scope.populaLogComex = [];
  }



  $scope.removeItem = function ()
  {
    var index
    = $scope.clientePendente.indexOf($scope.selected);

 //   alert(index); 
 $scope.clientePendente.splice(index,
    1); $scope.tableParams.reload();
  }




});
