fotografiaapp = angular.module('fotografiapp', ['ngRoute','ngTable']);

fotografiaapp.controller('fotografiaController', function ($scope, NgTableParams, $http, $routeParams, $window) {

    var self = this;
    var data;
    $scope.alertError = {};
    $scope.alertError.display = 'none';

    var hostPath = 'http://192.168.6.23/api/cross';
    var routePeople = 'people/';
    var peopleController = hostPath + '/' + routePeople;

    $scope.pesquisa = {};
    $scope.pesquisa.tipoPessoa = 'J';
    $scope.buscaPessoa = function () {
        // alert('teste');
         $scope.alertError.display = 'none';

        var urlPesquisa = peopleController;
        if ($scope.pesquisa.id != undefined && $scope.pesquisa.id != "") {
            urlPesquisa += $scope.pesquisa.id;
           // alert("entrou");
        }
        else if ($scope.pesquisa.documento != undefined && $scope.pesquisa.documento !="") {
            urlPesquisa += $scope.pesquisa.tipoPessoa + "/" + $scope.pesquisa.documento;
            console.log($scope.pesquisa.tipoPessoa);
        }
        else if ($scope.pesquisa.nome != undefined && $scope.pesquisa.nome != "") {
            urlPesquisa += $scope.pesquisa.nome + "?type=" + $scope.pesquisa.tipoPessoa;
           // alert('nome' );
        }
        else {
            $scope.alertError.display = 'block';
            $scope.alertError.message = 'Preencha os filtros para efetuar a pesquisa!';
          //  alert("Preencha os campos!");
            return;
        }

        $http.get(urlPesquisa).then(function (result) {
            $scope.statusLoadingDataliner = 'block';

            data = result.data;
            console.log(data);
            self.tablePessoa = new NgTableParams(
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
        });
        console.log(urlPesquisa);
        console.log($scope.pesquisa.id);
    };

    $scope.statusLoadingDataliner = 'none';

    $scope.abreDetalheFotografia = function (idPessoa)
    {
        $window.location.href = 'Fotografia.html?id='+idPessoa;
    };

});