// ANGULAR JS
app = angular.module('propostaNovaApp', ['toaster', 'wsDominio']);

app.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.factory('buscaWS', function ($http) {
    return {
        get: function (url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function (res) {
                return res.data;
            });
        }
    };
});

app.controller('emissaoController', function ($scope, buscaWS, $http, $q, $filter, callWS, toaster) {
    $scope.emailProposta = {};

    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    var init = function () {
        posicionarDadosEmail();
    };
    
    $scope.urlPDF = "PCGS3004_07_02.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + getVariavelURL('idProposta');
    
 //   alert($scope.urlPDF);
    $scope.enviarEmail = function () {
        //  fEmailToSend
        // debugger; && $scope.emailProposta.bcc == ''
        if ($scope.emailProposta.to == '' ) {
            toaster.pop('error', "Error", ("E-mail sem destinatario!"), null, 'trustedHtml');
            return;
        }
        else {
            var exp = /@/;
            var exp2 = /.com/;
            if (!$scope.emailProposta.to.match(exp) || !$scope.emailProposta.to.match(exp2)) {
                $scope.emailProposta.to = '';
                toaster.pop('error', "Error", ("Destinatario(s) Invalido(s)!"), null, 'trustedHtml');
                return;
            }
            // if (!$scope.emailProposta.bcc.match(exp) || !$scope.emailProposta.bcc.match(exp2)) {
            //     $scope.emailProposta.bcc = '';
            //     toaster.pop('error', "Error", ("Destinatario(s) Invalido(s)!"), null, 'trustedHtml');
            //     return;
            // }
        }
        
        $scope.emailProposta.proposta = getVariavelURL('idProposta');
        $scope.emailProposta.aUsuarioSessao = aUsuarioSessao;
        //$scope.emailProposta.urlPDF = $scope.urlPDF;
        var entidade = JSON.stringify($scope.emailProposta);
        var params = {'sJSON': entidade};
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/fEmailToSend_022/JSON', params)
                .then(function (response) {
                   // console.log(response);
                    if (response.data.hasError) {
                        toaster.pop('error', "Error", ("Error ao consultar registro. <br/> Response: " + response.data.msgError), null, 'trustedHtml');
                    } else {
                     //   $scope.emailProposta = response.data;
                        toaster.pop('sucess', "Sucesso", ("Proposta enviada"), null, 'trustedHtml');
                    }
                    $scope.$broadcast('updateDTContainer', '');
                }, function (error) {
                    console.log(error);
                });
    };

    var posicionarDadosEmail = function () {
        var params = {'aUsuarioSessao': aUsuarioSessao, 'proposta': getVariavelURL('idProposta')};
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/fExibeEmailToSend/JSON', params)
                .then(function (response) {
                    if (response.data.defaultMessage.hasError) {
                        toaster.pop('error', "Error", ("Error ao consultar registro. <br/> Response: " + response.data.defaultMessage.msgError), null, 'trustedHtml');
                    } else {
                        $scope.emailProposta = response.data;
                    }
                    $scope.$broadcast('updateDTContainer', '');
                }, function (error) {
                    console.log(error);
                });
    };
    init();
});

function getVariavelURL(variavel)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variavel) {
            return pair[1];
        }
    }
    return(false);
}