// ANGULAR JS
app = angular.module('propostaNovaApp', ['toaster', 'wsDominio']);

app.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                console.log(res);
                return res.data;
            });
        }
    };
});

app.config(function($sceProvider) {
    $sceProvider.enabled(false);
})

app.controller('emissaoController', function($scope, buscaWS, $http, $q, $filter, callWS, toaster) {
    $scope.emailProposta = {};
 

    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');

    var init = function() {
        // getProposta();
        posicionarDadosEmail();
        $scope.hasTaxa = false;
        // getTaxas();
    };

    //$scope.urlPDF = "PCGS3004_07.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + getVariavelURL('idProposta');

    $('body').height('5000');
    $scope.loadingState = true;
    $scope.exibiPDF = false;
    $scope.exibiRelatorio = true;
    parametros = 'idProposta=' + getVariavelURL('idProposta');
    buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_prop_emissao/JSON', parametros).then(function(data) {
        $scope.L = data;
        // debugger;
        if (data.arr_detalhes.length && ($scope.L.sStatus != '4' || $scope.L.sStatus != '9')) { $scope.hasTaxa = true; }
        console.log(data);
        $scope.loadingState = false;
    });

    // var getProposta = function(proposta) {
    //     var params = { 'aUsuarioSessao': aUsuarioSessao, 'aPROPOSTA_ID': getVariavelURL('idProposta') };
    //     callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_busca_proposta/JSON', params)
    //         .then(function(response) {
    //             //   console.log('proposta');
    //             //      console.log(response);

    //             $scope.proposta = response.data;
    //             $scope.StatusProposta = response.data.sStatus;
    //             if (response.data.sTaxes=1) {$scope.hasTaxa = true;}

    //         }, function(error) {
    //             toaster.pop({
    //                 type: 'error',
    //                 title: 'Error',
    //                 body: ("Error ao carregar literais. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
    //                 bodyOutputType: 'trustedHtml'
    //             });
    //         });
    // };

    // var getTaxas = function() {
    //     var params = {
    //         'aClasse': 'O'
    //     };
    //     callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params).then(function(response) {
    //         debugger;
    //         if (response.data.length) {
    //             $scope.hasTaxa = true;
    //         }
    //     });

    //     var params = {
    //         'aClasse': 'F'
    //     };
    //     callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params).then(function(response) {
    //     if (response.data.length) {
    //             $scope.hasTaxa = true;
    //         }
    //     });

    //     var params = {
    //         'aClasse': 'D'
    //     };
    //     callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params).then(function(response) {
    //         if (response.data.length) {
    //             $scope.hasTaxa = true;
    //         }
    //     });

    // };

    $scope.btnVoltar = function() {
        var url = '';
        if (getVariavelURL('idCliente').length > 0 && getVariavelURL('idCliente') != 0) {
            url = "PCGS3004_00.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idVendedor=" + getVariavelURL('idVendedor') + "&idCliente=" + getVariavelURL('idCliente');
        } else {
            url = "PCGS3004_00.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
        }
        window.location = url;
    };

    $scope.clickEditarProposta = function() {
        //    console.log(getVariavelURL('idVendedor'));
        var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idVendedor=" + getVariavelURL('idVendedor') + "&idCliente=" + getVariavelURL('idCliente') + "&idProposta=" + getVariavelURL('idProposta');
        window.location = url;
    }

    $scope.clickPrintProposta = function() {
        var url = "PCGS3004_07.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + getVariavelURL('idProposta');
        $scope.urlPDF = url;
        if ($scope.exibiPDF) {
            $scope.exibiPDF = false;
            $scope.exibiRelatorio = true;
        } else {
            $scope.exibiPDF = true;
            $scope.exibiRelatorio = false;
        }
        //$scope.exibirPdf.show = true;
        //window.location = url;
        //window.open(url,'PropostaFr8', 'width=900px');
    };
    $scope.enviarEmail = function() {
        //  fEmailToSend
        // debugger;
        $scope.emailProposta.proposta = getVariavelURL('idProposta');
        $scope.emailProposta.aUsuarioSessao = aUsuarioSessao;
        $scope.emailProposta.urlPDF = $scope.urlPDF;
        var entidade = JSON.stringify($scope.emailProposta);
        var params = { 'sJSON': entidade };
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/fEmailToSend/JSON', params)
            .then(function(response) {
                // console.log(response);
                if (response.data.hasError) {
                    toaster.pop('error', "Error", ("Error ao consultar registro. <br/> Response: " + response.data.msgError), null, 'trustedHtml');
                } else {
                    //   $scope.emailProposta = response.data;
                    toaster.pop('sucess', "Sucesso", ("Proposta enviada"), null, 'trustedHtml');
                }
                $scope.$broadcast('updateDTContainer', '');
            }, function(error) {
                console.log(error);
            });
    };

    var posicionarDadosEmail = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'proposta': getVariavelURL('idProposta') };
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/fExibeEmailToSend/JSON', params)
            .then(function(response) {
                if (response.data.defaultMessage.hasError) {
                    toaster.pop('error', "Error", ("Error ao consultar registro. <br/> Response: " + response.data.defaultMessage.msgError), null, 'trustedHtml');
                } else {
                    $scope.emailProposta = response.data;
                }
                $scope.$broadcast('updateDTContainer', '');
            }, function(error) {
                console.log(error);
            });
    };
    init();
});