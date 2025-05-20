app = angular.module('pcgs300307', ['ngTagsInput', 'ngMaterial', 'ui.bootstrap', 'ui.utils.masks', 'ckeditor']);

app.controller('pcgs3003Controller', function ($scope, $http, $filter, $q) {
    $scope.hcgs3003 = {};
    $scope.lsPaises = {};
    $scope.lsIncoterms = {};
    $scope.lsCaracteristicasFrete = {};
    $scope.lsFretes = {};
	$scope.lsMarcas = {};
	$scope.lsProdutos = {};
    $scope.textoAjuda = "Segure control pra selecionar mais de 1";
    var aUsuarioSessao = '1999e68b0e3f86feaca2837e113a0d703b800d1ed8659ea9f068b6b5e1ac2762';

    var getListaPaises = function () {
        $http({
            url: '/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsPaises = response.data;
        }, function (response) {
            console.log('ERROR');
            console.log(response);
        });
    };

    var getListaIncoterms = function () {
        $http({
            url: '/WVDF_WS/ws_HCGS3000.wso/f_combo_incorterm/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsIncoterms = response.data;
        }, function (response) {
            console.log('ERROR');
            console.log(response);
        });
    };

    var getListaCaracteristicasFrete = function () {
        $http({
            url: '/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsCaracteristicasFrete = response.data;
        }, function (response) {
            console.log('ERROR');
            console.log(response);
        });
    };
	
	
    var getListaMarcas = function () {
        $http({
            url: '/WVDF_WS/ws_HCGS3029.wso/f_combo_marcas/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsMarcas = response.data;
        }, function (response) {
            console.log('ERROR');
            console.log(response);
        });
    };
	
	 var getListaProdutos = function () {
        $http({
            url: '/WVDF_WS/ws_HCGS3029.wso/f_combo_prod/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsProdutos = response.data;
        }, function (response) {
            console.log('ERROR');
            console.log(response);
        });
    };

    $scope.acCidades = function (texto) {
        return	    $http({
            url: 'fbcsag325_descricao.asp',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao, 'term': texto}
        }).then(function (response) {
            return response.data;
        }, function (response) {
            console.log('ERROR');
            console.log(response);
        });
    };

    $scope.acCarrier = function (texto) {
        return	    $http({
            url: 'fbcsag342_descricao.asp',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao, 'term': texto}
        }).then(function (response) {
            return response.data;
        }, function (response) {
            console.log('ERROR');
            console.log(response);
        });
    };
	
	 $scope.acTerminal = function (texto) {
        return	    $http({
            url: 'fbcsag346_descricao.asp',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao, 'term': texto}
        }).then(function (response) {
            return response.data;
        }, function (response) {
            console.log('ERROR');
            console.log(response);
        });
    };

    //inicializando listas de dominios
    getListaPaises();
    getListaIncoterms();
    getListaCaracteristicasFrete();
	getListaMarcas();
	getListaProdutos();

    $scope.sJSON = {};

    $scope.btnVaiJson = function () {
        $scope.hcgs3003.session = getVariavelURL('aUsuarioSessao');
        var teste = JSON.stringify($scope.hcgs3003);
    };
});