var app = angular.module('app', ['ui.bootstrap', 'toaster', 'smart-table']);

app.controller('pagCtrl', ['$scope', '$http', 'toaster', function($scope, $http, toaster) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    $scope.form = {};
    $scope.global = {};
    $scope.replicar = {};
    $scope.table = [];
    $scope.combo = {};

    function init() {

        $scope.form.itemsByPage = 10;
        $scope.form.currentPage = 0;
        $scope.form.qtdLinhas = 0;
        getClasses();
    }

    var montaTabela = function() {
        $scope.form.aUsuarioSessao = aUsuarioSessao;

        $http.get('/WVDF_WS/ws_csag315.wso/listaCSAG315/JSON', { params: { 'aJson': $scope.form } }).then(function(response) {
            $scope.table = response.data.dados;
            $scope.form.qtdLinhas = response.data.qtdLinhas;
        });
    }

    var getClasses = function() {
        $http.get('/WVDF_WS/ws_csag314.wso/f_ComboClasse/JSON', { params: { 'aUsuarioSessao': aUsuarioSessao } }).then(function(response) {
            $scope.combo.classe = response.data;
        });
    }

    $scope.changeUser = function() {
        montaTabela();
    }

    $scope.acUser = function(query) {
        return $http.get('/WVDF_WS/ws_csag300.wso/f_UsuarioComplete/JSON', { params: { 'aUsuarioSessao': aUsuarioSessao, 'aInicio': query } }).then(function(response) {
            return response.data;
        });
    }

    $scope.acPrograma = function(query) {
        console.log($scope.form.usuario)
        return $http.get('/WVDF_WS/ws_csag314.wso/pesquisaCSAG314/JSON', { params: { 'aUsuarioSessao': aUsuarioSessao, 'aInicio': query, "aClasse": '', 'itemsByPage': 10, 'currentPage': 0 } }).then(function(response) {
            console.log(response.data);
            return response.data;
        });
    }

    $scope.newRow = function() {
        var novo = {
            programa: '',
            classe: '',
            usuario: $scope.form.usuario,
            inclusao: false,
            alteracao: false,
            exclusao: false,
            leitura: false,
            editable: true,
        }

        $scope.table.unshift(novo);
    }

    $scope.delete = function(id, index) {
        var param = { 'aUsuarioSessao': aUsuarioSessao, 'recId': id }
        $http.get('/WVDF_WS/ws_csag315.wso/apagaCSAG315/JSON', { params: { 'aJson': param } }).then(function(response) {
            if (!response.data.hasError) {
                toaster.pop('success', "Sucesso", '', null, 'trustedHtml');
                $scope.table.splice(index, 1);
            } else {
                toaster.pop('error', "Erro", '', null, 'trustedHtml');
                $scope.table.splice(index, 1);
            }
        });
    }

    $scope.gravar = function(index) {
        var row = $scope.table[index];
        row.aUsuarioSessao = aUsuarioSessao;
        var param = row;
        $http.get('/WVDF_WS/ws_csag315.wso/gravaCSAG315/JSON', { params: { 'aJson': param } }).then(function(response) {
            if (!response.data.msg.hasError) {
                $scope.table[index] = response.data.dados;
                $scope.table[index].editable = false;
                toaster.pop('success', "Sucesso", response.data.msg.msgInfo, null, 'trustedHtml');
            } else {
                toaster.pop('error', "Erro", response.data.msg.msgError, null, 'trustedHtml');
            }
        });
    }

    $scope.btnReplicar = function() {
        var param = {
            aUsuarioSessao: aUsuarioSessao,
            usuario: { id: $scope.form.usuario.id },
            inclusao: $scope.global.inclusao,
            alteracao: $scope.global.alteracao,
            exclusao: $scope.global.exclusao,
            leitura: $scope.global.leitura,
        }
        $http.get('/WVDF_WS/ws_csag315.wso/aplicaPermissaoCSAG315/JSON', { params: { 'aJson': param } }).then(function(response) {
            if (!response.data.hasError) {
                toaster.pop('success', "Sucesso", response.data.msgInfo, null, 'trustedHtml');
                montaTabela();
            } else {
                toaster.pop('error', "Erro", response.data.msgError, null, 'trustedHtml');
            }
        });

    }

    init();
}]);