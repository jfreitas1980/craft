fotografiaapp = angular.module('fotografiapp', ['ngRoute', 'ngTable']);

fotografiaapp.controller('fotografiaController', function ($scope, NgTableParams, $http, $routeParams) {

    var self = this;
    var data;
    $scope.statusLoadingDataliner = 'none';
    $scope.statusLoadingEmbarcados = 'none';
    $scope.statusLoadingControle = 'none';

    var url_string = window.location.href; 
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

    var hostPath = 'http://192.168.6.23/api/cross';
    var routePeople = 'people';
    var peopleController = hostPath + '/' + routePeople;

    var infologados = '{0}/{1}/infolegados'.replace('{0}', peopleController).replace('{1}', id);
    var ramospessoa = '{0}/{1}/ramos'.replace('{0}', peopleController).replace('{1}', id);
    var codigoslegados = '{0}/{1}/codigoslegados'.replace('{0}', peopleController).replace('{1}', id);
    var enderecos = '{0}/{1}/enderecos'.replace('{0}', peopleController).replace('{1}', id);
    var contatos = '{0}/{1}/contatos'.replace('{0}', peopleController).replace('{1}', id);
    var cotacao = '{0}/{1}/cotacao'.replace('{0}', peopleController).replace('{1}', id);
    var vendedores = '{0}/{1}/vendedores'.replace('{0}', peopleController).replace('{1}', id);
    var getCNPJByID = '{0}/GetDocument/{1}'.replace('{0}', peopleController).replace('{1}', id);
    var concorrentes = '{0}/{1}/concorrentes'.replace('{0}', peopleController).replace('{1}', id);
    var potencial = '{0}/{1}/potencial'.replace('{0}', peopleController).replace('{1}', id);
    var dataliner = '{0}/{1}/DatalinerMaritimo'.replace('{0}', peopleController).replace('{1}', id);
    var docKey = '{0}/GetDocument/{1}'.replace('{0}', peopleController).replace('{1}', id);
    var blacklist = '{0}/{1}/BRA/blacklist'.replace('{0}', peopleController);

 var targetComercialFrequencia = "";
    console.log(docKey);
    console.log(infologados);
    console.log(ramospessoa);
    console.log(codigoslegados);
    console.log(enderecos);
    console.log(contatos);
    console.log(vendedores);
    console.log(getCNPJByID);
    console.log(potencial);
    console.log(dataliner);
    console.log(concorrentes);
    console.log(cotacao);

    
    $scope.dataliner = {}; 
    $scope.dataliner.dtInicio = new Date();
    $scope.dataliner.dtFim = new Date();
    $scope.embarcadosChegados = {}; 
    $scope.embarcadosChegados.dtInicio = new Date();
    $scope.embarcadosChegados.dtFim = new Date();
    $scope.controleDiario = {}; 
    $scope.controleDiario.dtInicio = new Date();
    $scope.controleDiario.dtFim = new Date();

    $http.get(peopleController + "/" + id).then(function (response) {
        console.log('pessoa', response);
        var data = response.data;
        $scope.pessoa = data;
        $scope.pessoa.docKey = $scope.pessoa.docKey.replace('000000',''); 

      $scope.buscaBlackList($scope.pessoa.docKey);



        console.log('dataPessoa', $scope.pessoa);
    });

    $http.get(infologados).then(function (response) {
        console.log('response', response);
        var data = response.data;
        $scope.dataNomesRelacionados = data;
        console.log('data', $scope.dataNomesRelacionados);
       
    });

  $http.get(docKey).then(function (response) {
        console.log('response', response);
        var data = response.data;
        $scope.CNPJ = data;
        console.log('CNPJ', $scope.CNPJ);
         targetComercialFrequencia = 'http://192.168.6.19:8090/targetanalyzerws/resources/status/cliente/'+$scope.CNPJ;
        console.log('Frequencia', targetComercialFrequencia);
           $http.get(targetComercialFrequencia).then(function (result) {
        data = result.data;
        console.log(data);
        self.tableFrequencia = new NgTableParams(
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
    });

    });

    console.log(targetComercialFrequencia);

    $http.get(ramospessoa).then(function (response) {
        console.log('response', response);
        var data = response.data;
        $scope.dataRamosCliente = data;
        console.log('data', $scope.dataRamosCliente);
    });




    $http.get(codigoslegados).then(function (response) {
        console.log('response', response);
        var data = response.data;
        $scope.dataCodigosLegados = data;
        console.log('data', $scope.dataCodigosLegados);
    });





$http.get(enderecos).then(function (result) {
    data = result.data;
    console.log(data);
    self.tableParams = new NgTableParams(
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
});



$http.get(contatos).then(function (result) {
    data = result.data;
    console.log(data);
    self.tableContatos = new NgTableParams(
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
});

  $scope.buscaBlackList = function (doc) { 

    blacklist = blacklist.replace('{1}', doc);
    //alert(blacklist);
    $http.get(blacklist).then(function (result) {
   $scope.mostraMensagemBlacklist = 'none';
   // alert('blacklist');
    data = result.data;
    console.log('blacklist',data);
    self.tableBlacklist = new NgTableParams(
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
});
}


$http.get(cotacao).then(function (result) {
    data = result.data;
    console.log(data);
    self.tableCotacao = new NgTableParams(
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
});


$http.get(vendedores).then(function (result) {
    data = result.data;
    console.log(data);
    self.tableVendedores = new NgTableParams(
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
});


$http.get(concorrentes).then(function (result) {
    data = result.data;
    console.log('concorrentes',data);
    self.tableComerConcorrencia = new NgTableParams(
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
});


$http.get(potencial).then(function (result) {
    data = result.data;
    console.log('potencial', data);
    self.tableComercPotencial = new NgTableParams(
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
});


$scope.buscaDatalinerMaritmo = function () {
    //  console.log($scope.dataliner);
    $scope.statusLoadingDataliner = 'block';
    var dtinicio  =  new Date($scope.dataliner.dtInicio).toISOString().split("T")[0];
    var dtfim = new Date($scope.dataliner.dtFim).toISOString().split("T")[0];
    console.log(dtinicio, dtfim);

    $http.get(dataliner+"/"+dtinicio+"/"+dtfim).then(function (result) {
        data = result.data;
        console.log('Dataliner', data);
        self.tableDataliner = new NgTableParams(
            {
                page: 1,
                count: 5
            },
            {
                counts: [5, 10, 20, 50],
                dataset: data
            });
        $scope.statusLoadingDataliner = 'none';
    }, function (result) {
        console.log("REQUEST ERROR:");
        $scope.statusLoadingDataliner = 'none';
    });

}
    


$scope.buscaEmbarcadosChegados = function () {
    //  console.log($scope.dataliner);
  
   // alert($scope.embarcadosChegados.dtInicio);
  // alert($scope.embarcadosChegados.dtFim);
    $scope.statusLoadingEmbarcados = 'block';
    var dtinicio  =  new Date($scope.embarcadosChegados.dtInicio).toISOString().split("T")[0];
    var dtfim = new  Date($scope.embarcadosChegados.dtFim).toISOString().split("T")[0];
    console.log(dtinicio);
    console.log(dtfim);
var url =  peopleController + "/EmbarcadosChegados/"+dtinicio+"/"+dtfim+"/"+$scope.CNPJ;
console.log(url);
    $http.get(url).then(function (result) {
        data = result.data;
        console.log('EmbarcadosChegados', data);
        self.tableEmbarcadosChegados = new NgTableParams(
            {
                page: 1,
                count: 5
            },
            {
                counts: [5, 10, 20, 50],
                dataset: data
            });
        $scope.statusLoadingEmbarcados = 'none';
    }, function (result) {
        console.log("REQUEST ERROR:");
        $scope.statusLoadingEmbarcados = 'none';

    });

}



$scope.buscaControleDiario = function () {
    //  console.log($scope.dataliner);
  
   // alert($scope.controleDiario.dtInicio);
   //alert($scope.controleDiario.dtFim);
    $scope.statusLoadingControle = 'block';
    var dtinicio  =  new Date($scope.controleDiario.dtInicio).toISOString().split("T")[0];
    var dtfim = new  Date($scope.controleDiario.dtFim).toISOString().split("T")[0];
    console.log(dtinicio);
    console.log(dtfim);
var url =  peopleController + "/ControleDiario/"+dtinicio+"/"+dtfim+"/"+$scope.CNPJ;
console.log(url);
    $http.get(url).then(function (result) {
        data = result.data;
        console.log('ControleDiario', data);
        self.tableControleDiario = new NgTableParams(
            {
                page: 1,
                count: 5
            },
            {
                counts: [5, 10, 20, 50],
                dataset: data
            });
        $scope.statusLoadingControle = 'none';
    }, function (result) {
        console.log("REQUEST ERROR:");
        $scope.statusLoadingControle = 'none';

    });

}



$scope.testeFunc = function () {
    alert('funcionou');
}

$scope.tableEnderecos = 'block';

$scope.ShowTable = function () {
    if ($scope.tableEnderecos == 'none') {
        $scope.tableEnderecos = 'block';
    }
    else {
        $scope.tableEnderecos = 'none';

    }
      
}

});