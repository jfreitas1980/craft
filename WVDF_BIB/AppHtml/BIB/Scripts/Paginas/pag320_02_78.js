var app = angular.module('pag320_78App', ['smart-table', 'ngSanitize', 'wsDominio', 'diretivas', 'ui.bootstrap', 'toaster']);

app.controller('pag320_78Ctrl', ['$scope', '$timeout', 'callWS', 'toaster', '$http', '$sce', function($scope, $timeout, callWS, toaster, $http, $sce) {
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
        getLiterais();
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
            // console.log("log");
            // console.log(response);
            $scope.lsPessoas = response.data.report;
            $scope.totalItems = response.data.qtdLinhas;
        });
    }

     function getLiterais() {
            $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON', {
                    params: {
                        aUsuarioSessao: aUsuarioSessao,
                        sPrograma: 'pag320_02_78'
                    }
                })
                .then(function(res) {

                    Object.keys(res.data).forEach(function(key){

                    var elemfolderName = document.createElement('textarea');
                    elemfolderName.innerHTML = res.data[key];
                    var  folderName = elemfolderName.value;
                        res.data[key] = $sce.trustAsHtml(elemfolderName.value);
                    });

                    $scope.literais = res.data;
                });
        }


    $scope.btnZoom = function(row) {
        debugger;
        // location.href = "PAG378_02.asp?aUsuarioSessao=" + aUsuarioSessao + "&sCliente=" + row.codigo;
        var data = "PAG378_02.asp?aUsuarioSessao=" + aUsuarioSessao + "&sCliente=" + row.codigo;
        window.top.jaddTab($scope.literais.LITERAL_18, data);
    }

    $scope.btnExecute = function() {
        executeSearch($scope.pesquisa);
    }

    init();
}])