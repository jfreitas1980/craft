var app = angular.module('pag36603App', [
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

app.controller('pag36603Ctrl', ['$scope', 'callWS', 'toaster', function($scope, callWS, toaster) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    var aCSAG320Id = getVariavelURL('aCSAG320Id');

    $scope.lsTpPessoa = [];
    $scope.lsRegistros = [];
    $scope.currentPage = 1;
    $scope.itemsByPage = 10;

    var atualizarTabs = function() {
        var sParametros = aCSAG320Id + '","' + aUsuarioSessao;
        var sRetorno = ReadFuncValue(sParametros, "oPAG320_01", "get_f_atualizatabs");

        var obj = JSON.parse(sRetorno);
        console.log(sParametros);
        console.log(sRetorno);
        if ($('#csag320__rowid').val() != "") {
            $('#li-pag366_01', window.parent.document).show();
            $('#li-pag352_01', window.parent.document).show();
            $('#li-pag374_01', window.parent.document).show();
            $('#li-pag335_01', window.parent.document).show();
            $('#li-pag350_01', window.parent.document).show();
            $('#li-pag378_01', window.parent.document).show();
            $('#li-pcgs2101_00', window.parent.document).show();

            ((obj['340']) ? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide());
            ((obj['341']) ? $('#li-pag341_01', window.parent.document).show() : $('#li-pag341_01', window.parent.document).hide());
            ((obj['342']) ? $('#li-pag342_01', window.parent.document).show() : $('#li-pag342_01', window.parent.document).hide());
            ((obj['343']) ? $('#li-pag343_01', window.parent.document).show() : $('#li-pag343_01', window.parent.document).hide());
            //(tipos['despachante'])    ? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide()
            //(tipos['concorrencia'])   ? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide())
            ((obj['349']) ? $('#li-pag349_01', window.parent.document).show() : $('#li-pag349_01', window.parent.document).hide());
            //(tipos['customer'])       ? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide())
            ((obj['346']) ? $('#li-pag346_01', window.parent.document).show() : $('#li-pag346_01', window.parent.document).hide());
            ((obj['345']) ? $('#li-pag345_01', window.parent.document).show() : $('#li-pag345_01', window.parent.document).hide());
            ((obj['347']) ? $('#li-pag347_01', window.parent.document).show() : $('#li-pag347_01', window.parent.document).hide());
            ((obj['395']) ? $('#li-pag395_01', window.parent.document).show() : $('#li-pag395_01', window.parent.document).hide());
        } else {
            $('#li-pag366_01', window.parent.document).hide();
            $('#li-pag352_01', window.parent.document).hide();
            $('#li-pag374_01', window.parent.document).hide();
            $('#li-pag335_01', window.parent.document).hide();
            $('#li-pag350_01', window.parent.document).hide();
            $('#li-pag378_01', window.parent.document).hide();
            $('#li-pcgs2101_00', window.parent.document).hide();
            $('#li-pag340_01', window.parent.document).hide();
            $('#li-pag342_01', window.parent.document).hide();
            $('#li-pag349_01', window.parent.document).hide();
            $('#li-pag341_01', window.parent.document).hide();
            $('#li-pag347_01', window.parent.document).hide();
            $('#li-pag395_01', window.parent.document).hide();
        }
    }

    var init = function() {
        getTipoPessoa();
        listaRegistros();
    }


    $scope.btnNovo = function() {
        var novo = {};
        novo.csag366__csag319_id = '';
        novo.csag366__csag320_id = '';
        novo.csag366__recnum = '';
        novo.editable = true;
        $scope.lsRegistros.push(novo);
    }

    $scope.btnSalvar = function(row) {
        gravaRegistro(row);

    }


    $scope.btnDelete = function(row, index) {
        if (row.csag366__csag319_id == "" || row.csag366__csag319_id == null || row.csag366__csag319_id == undefined) {
            $scope.lsRegistros.splice(index, 1);
            return;
        }
        apagaRegistro(row);

    }

    ///////////////////////////////////////////////////////////////////////////

    var getTipoPessoa = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        console.log(params);
        callWS.get('/WVDF_WS/ws_csag319.wso/listaTipos/JSON', params)
            .then(function(response) {
                console.log(response);
                $scope.lsTpPessoa = response.data;
            });
    }

    var gravaRegistro = function(registro) {
        registro.aUsuarioSessao = aUsuarioSessao;
        registro.csag366__csag320_id = aCSAG320Id;
        callWS.get('/WVDF_WS/ws_CSAG366.wso/gravaRegistro/JSON', { 'sJSON': registro })
            .then(function(response) {
                toaster.success({ title: "Mensagem", body: "Registro salvo com Sucesso" });
                registro.editable = false;
                listaRegistros();
                atualizarTabs();
            });
    }

    var listaRegistros = function() {
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'aCSAG320Id': aCSAG320Id,
            'itemsByPage': $scope.itemsByPage,
            'currentPage': $scope.currentPage
        };

        callWS.get('/WVDF_WS/ws_CSAG366.wso/listaRegistros/JSON', params)
            .then(function(response) {
                $scope.lsRegistros = response.data;
                atualizarTabs();
            });
    }

    var apagaRegistro = function(registro) {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'recId': registro.csag366__recnum };
        callWS.get('/WVDF_WS/ws_CSAG366.wso/apagaRegistro/JSON', params)
            .then(function(response) {
                listaRegistros();
                atualizarTabs();
            });
    }

    init();
}]);
