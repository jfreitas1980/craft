var app = angular.module('pcgs23903App', [
    'ngSanitize', 'diretivas',
    'wsDominio', 'smart-table', 'ui.bootstrap', 'toaster',
]);

app.filter('filterPessoa', function() {
    return function(x, param) {
        var i, c, txt = "";
        for (i = 0; i < x.length; i++) {
            c = x[i];

            if (c.id == param) {
                txt = c;
                break;
            }

        }

        return txt.value;
    };
});

app.controller('pcgs23903Ctrl', ['$scope', 'callWS', 'toaster', function($scope, callWS, toaster) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');

    $scope.lsTpPessoa = [];
    $scope.lsRegistros = [];
    $scope.currentPage = 1;
    $scope.itemsByPage = 10;

    var init = function() {
        listaRegistros();
    }


    $scope.btnNovo = function() {
        var novo = {};
        novo.ccgs239__csag325_id = '';
        novo.ccgs239__csag325_via = '';
        novo.ccgs239__recnum = '';
        novo.editable = true;
        $scope.lsRegistros.push(novo);
    }

    $scope.btnSalvar = function(row) {
        gravaRegistro(row);

    }


    $scope.btnDelete = function(row, index) {
        if (row.ccgs239__csag325_id == "" || row.ccgs239__csag325_id == null || row.ccgs239__csag325_id == undefined) {
            $scope.lsRegistros.splice(index, 1);
            return;
        }
        apagaRegistro(row);

    }

    ///////////////////////////////////////////////////////////////////////////

    var getTipoPessoa = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        console.log(params);
        callWS.get('/WVDF_WS/ws_ccgs239.wso/listaTipos/JSON', params)
            .then(function(response) {
                console.log(response);
                $scope.lsTpPessoa = response.data;
            });
    }

    var gravaRegistro = function(registro) {
        registro.aUsuarioSessao = aUsuarioSessao;
        callWS.get('/WVDF_WS/ws_ccgs239.wso/gravaRegistro/JSON', { 'sJSON': registro })
            .then(function(response) {
                toaster.success({ title: "Mensagem", body: "Registro salvo com Sucesso" });
                registro.editable = false;
                listaRegistros();
            });
    }

    var listaRegistros = function() {
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'itemsByPage': $scope.itemsByPage,
            'currentPage': $scope.currentPage
        };

        callWS.get('/WVDF_WS/ws_ccgs239.wso/listaRegistros/JSON', params)
            .then(function(response) {
                $scope.lsRegistros = response.data;
            });
    }

    var apagaRegistro = function(registro) {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'recId': registro.csag366__recnum };
        callWS.get('/WVDF_WS/ws_ccgs239.wso/apagaRegistro/JSON', params)
            .then(function(response) {
                listaRegistros();
            });
    }

    init();
}]);
