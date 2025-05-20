var app = angular.module('pag37403App', [
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

app.controller('pag37403Ctrl', ['$scope', 'callWS', 'toaster', '$sce', '$http', function($scope, callWS, toaster, $sce, $http) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    var aCSAG320Id = getVariavelURL('aCSAG320Id');

    $scope.lsEmpresas = [];
    $scope.lsRegistros = [];

    var init = function() {
        getEmpresas();
        listaRegistros();
    }
    $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON', {
                    params: {
                        aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
                        sPrograma: 'PAG374_03'
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


    $scope.btnNovo = function() {
        var novo = {};
        novo.csag374__csag308_id = '';
        novo.csag366__csag320_id = '';
        novo.csag366__recnum = '';
        novo.editable = true;
        $scope.lsRegistros.push(novo);
    }

    $scope.btnSalvar = function(row) {
        gravaRegistro(row);
    }

    $scope.btnDelete = function(row, index) {
            if (row.csag374__csag308_id == "" || row.csag374__csag308_id == null || row.csag374__csag308_id == undefined) {
                $scope.lsRegistros.splice(index, 1);
                return;
            }
            apagaRegistro(row);
        }
        ///////////////////////////////////////////////////////////////////////////

    var getEmpresas = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_csag308.wso/getMarcas/JSON', params)
            .then(function(response) {
                $scope.lsEmpresas = response.data;
            });
    }


    var gravaRegistro = function(registro) {
        registro.aUsuarioSessao = aUsuarioSessao;
        registro.csag374__csag320_id = aCSAG320Id;
        callWS.get('/WVDF_WS/ws_CSAG374.wso/gravaRegistro/JSON', { 'sJSON': registro })
            .then(function(response) {
                toaster.success({ title: "Mensagem", body: "Registro salvo com Sucesso" });
                registro.editable = false;

                listaRegistros();
            });
    }

    var listaRegistros = function() {
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'aCSAG320Id': aCSAG320Id,
            'itemsByPage': $scope.itemsByPage,
            'currentPage': $scope.currentPage
        };
        callWS.get('/WVDF_WS/ws_CSAG374.wso/listaRegistros/JSON', params)
            .then(function(response) {
                $scope.lsRegistros = response.data;
            });
    }

    var apagaRegistro = function(registro) {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'recId': registro.csag374__recnum };
        callWS.get('/WVDF_WS/ws_CSAG374.wso/apagaRegistro/JSON', params)
            .then(function(response) {
                listaRegistros();
            });
    }

    init();
}]);
