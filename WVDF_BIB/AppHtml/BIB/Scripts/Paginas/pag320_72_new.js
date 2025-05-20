var app = angular.module('pag320App', ['smart-table', 'ngSanitize', 'wsDominio', 'diretivas', 'ui.bootstrap', 'toaster']);

app.controller('pag320Ctrl', ['$scope', '$timeout', 'callWS', 'toaster', '$http', function($scope, $timeout, callWS, toaster, $http) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    $scope.lsPessoas = [];
    $scope.pesquisa = {};

    $scope.lsMarcas = [];
    $scope.lsPais = [];
    $scope.lsTipoPessoa = [];

    $scope.pesquisa.itemsByPage = 10;
    $scope.pesquisa.currentPage = 1;

    var getMarcas = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/WS_HCGS3029.wso/f_combo_marcas/JSON', params).then(function(response) {
            $scope.lsMarcas = response.data;
        });
    }

    var getPais = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON', params).then(function(response) {
            $scope.lsPais = response.data;
        });
    }

    var getTipoPessoa = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_csag319.wso/listaTipos/JSON', params).then(function(response) {
            $scope.lsTipoPessoa = response.data;
        });
    }

    var init = function() {
        getMarcas();
        getPais();
        getTipoPessoa();
        openModalPesquisa();
        executeSearch($scope.pesquisa);
    }

    var openModalPesquisa = function() {
        $timeout(function() {
            angular.element('#modalButtonPesquisa').trigger('click');
        });
    }

    var executeSearch = function(value) {
        value.aUsuarioSessao = aUsuarioSessao;

        var params = { 'sJSON': value };

        callWS.get('/WVDF_WS/ws_CSAG320.wso/f_report/JSON', params).then(function(response) {
            console.log("log");
            console.log(response);
            $scope.lsPessoas = response.data.report;
            $scope.totalItems = response.data.qtdLinhas;
        });
    }

    $scope.btnZoom = function(row) {
        // $http({
        //     method: 'GET',
        //     url: 'http://192.168.6.23/api/tradutor/1/5/3/31/' + row.codigo,
        // }).then(function success(response) {
        //     $('#dataFotografia', window.parent.document).val(response.data.valorDestino);
            location.href = "PAG320_01.asp?aUsuarioSessao=" + aUsuarioSessao + "&Rowid=" + row.srowid;
        // });
    }

    $scope.loadClientes = function() {

    }

    $scope.btnExecute = function() {
        executeSearch($scope.pesquisa);
    }

    $scope.btnNovo = function() {
        location.href = "PAG320_01.asp?aUsuarioSessao=" + aUsuarioSessao + "&Rowid=";
    }

    init();
}])