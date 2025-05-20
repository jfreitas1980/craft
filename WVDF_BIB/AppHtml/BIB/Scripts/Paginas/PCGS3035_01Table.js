var app = angular.module('pcgs3035TableApp', ['ui.bootstrap', 'ngTagsInput', 'wsDominio', 'diretivas', 'toaster', 'angularSoap']);
app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                return res.data;
            });
        }
    };
});
app.controller('pcgs3035Ctrl', function($scope, buscaWS, $sce, $http, soapService, toaster, callWS) {

// getMoedas();

// $scope.loadMoedas = function(query) {
//     return buscaWS.get('/WVDF_WS/ws_ccgs218.wso/f_CCGS218_lista/JSON', '').then(function(data) {
//         return data;
//     });
// };

// var getMoedas = function() {
//     var params = { 'aUsuarioSessao': aUsuarioSessao, 'aInicial': '' };
//     return callWS.get('/WVDF_WS/ws_ccgs218.wso/buscarMoeda/JSON', params)
//         .then(function(response) {
//             $scope.lsMoedas = response.data;
//         });
// }


// buscaWS.get('/WVDF_WS/ws_CCGS220.wso/f_combo_tpcalc/JSON', '').then(function(data) {
//     $scope.comboTpcalc = data;
// });

var getDescricao = function() {
    $scope.loadingState = true;
    var params = { 'aUsuarioSessao': aUsuarioSessao };
    callWS.get('/WVDF_WS/ws_ccgs225.wso/f_CCGS225_combo/JSON', params)
        .then(function(response) {
            //  console.log(response);
            $scope.lsDescricao = response.data;

            $scope.loadingState = false;
        }, function(error) {
            $scope.loadingState = false;
            toaster.pop({
                type: 'error',
                title: 'Error',
                body: ("Error ao carregar marcas. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                bodyOutputType: 'trustedHtml'
            });
        });
};
getDescricao();

$scope.pcgs3035List = [];

var posicionaRegistro3035 = function() {
    if (getVariavelURL('aHCGS3033_ID') == '' && getVariavelURL('aHCGS3033_ID') == null) return;


    var params = {
        'aUsuarioSessao': aUsuarioSessao,
        'aHCGS3033_ID': getVariavelURL('aHCGS3033_ID'),
        'aTaxa': getVariavelURL('aTaxa'),
        'aClasse': getVariavelURL('aClasse'),
    };
    callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_posiciona/JSON', params)
        .then(function(response) {
            $scope.pcgs3035List = response.data;
        });
}
posicionaRegistro3035();

$scope.pcgs3035NewRow = function() {
    var nobj = {};
    nobj.aPagar = {};
    nobj.aPagar.taxa = '';
    nobj.aPagar.descricao = '';
    nobj.aPagar.imprimeNota = '';
    nobj.aPagar.IRRF = '';
    nobj.aPagar.tipo = '';
    nobj.aPagar.moeda = '';
    nobj.aPagar.valor = '';
    nobj.aPagar.valorPor = '';
    nobj.aPagar.pagamento = '';
    nobj.aPagar.prepaidAbroad = '';
    nobj.aPagar.prepaid = '';
    nobj.aPagar.collect = '';
    nobj.aPagar.aplicaFormulaCalculo = '';
    nobj.aPagar.formula = '';

    nobj.aReceber = {};
    nobj.aReceber.tipo
    nobj.aReceber.moeda = '';
    nobj.aReceber.valor = '';
    nobj.aReceber.valorPor = '';
    nobj.aReceber.valorMin = '';
    nobj.aReceber.permiteDesconto = '';
    nobj.aReceber.prepaidAbroad = '';
    nobj.aReceber.prepaid = '';
    nobj.aReceber.collect = '';
    nobj.aReceber.valorAplicado = '';
    nobj.aReceber.aplicaMultaTaxa = '';
    nobj.aReceber.aplicaFormulaCalculo = '';
    nobj.aReceber.formula = '';

    nobj.editable = true;
    $scope.pcgs3035List.push(nobj);
}

$scope.btnTableSavePCGS3035 = function(row) {
    row.aUsuarioSessao = aUsuarioSessao;

    callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_save/JSON', { 'sJSON': row })
        .then(function(response) {
            row.editable = false;
        }, function(error) {

            toaster.pop({
                type: 'error',
                title: 'Error',
                body: ("Erro ao gravar registro"),
                bodyOutputType: 'trustedHtml'
            });
        });
}

$scope.excluirRowPCGS3035 = function(row, index) {

    row.aUsuarioSessao = aUsuarioSessao;

    callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_del/JSON', { 'sJSON': row })
        .then(function(response) {
            $scope.pcgs3035List.splice(index, 1);
        }, function(error) {

            toaster.pop({
                type: 'error',
                title: 'Error',
                body: ("Erro ao apagar registro"),
                bodyOutputType: 'trustedHtml'
            });
        });
}
}]);
