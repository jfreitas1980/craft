// ANGULAR JS
var app = angular.module('pmen100601App', ['ngSanitize', 'Alertify', 'angularSoap', 'diretivas', 'wsDominio', 'smart-table', 'ui.bootstrap',
    'datatables', 'datatables.buttons', 'datatables.colreorder', 'ngTagsInput', 'toaster'
]);

app.config(function(tagsInputConfigProvider) {
    tagsInputConfigProvider.setDefaults('tagsInput', { placeholder: '' });
    tagsInputConfigProvider.setActiveInterpolation('tagsInput', { placeholder: true });
});

app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                return res.data;
            }, function(response) {
                console.log('Status: ' + response.status);
                console.log('Error: ' + response.data);
            });
        }
    };
});

app.controller('pmen100601Controller', function($scope, Alertify, buscaWS, callWS, $http, $q, $compile, toaster, $uibModal) {
    
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    var Codigo = getVariavelURL('Codigo');

    $scope.loadingState=false;
        
    var init = function() {
        debugger;
        if (Codigo !== false) {
            
            var params = {'sCodigo':Codigo};
            
            callWS.get('/WVDF_WS/ws_TMEN1006.wso/fPosicionaRetorno/JSON', params).then(function(response) {
                debugger;
                $scope.retorno = response.data;
            });
        }


    }

    // AutoComplete de Clientes
    $scope.acClientes = function(texto) {
        return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/f_proposta_complete_client/JSON', 'sInicio=' + texto).then(function(data) {
            return data;
        });
    };
    
    $scope.acCidades = function(query) {
        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/autoCidades/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&aPais=&aInicio=' + query)
            .then(function(data) {
                return data;
            });
        return data;
    };

    $scope.acPais = function(query) {
        var data = buscaWS.get('/WVDF_WS/ws_csag329.wso/autoPaises/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&aCont=&aInicio=' + query)
            .then(function(data) {
                return data;
            });
        return data;
    };

    $scope.acContinente = function(query) {
        var data = buscaWS.get('/WVDF_WS/ws_CSAG399.wso/autoContinentes/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') +'&aInicio=' + query)
            .then(function(data) {
                return data;
            });
        return data;
    }

    $scope.acUsuario = function(query) {
        var data = buscaWS.get('/WVDF_WS/ws_CSAG300.wso/f_UsuarioComplete/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') +'&aInicio=' + query)
            .then(function(data) {
                return data;
            });
        return data;
    }


    $scope.btnSave = function() {
        
        debugger;
        $scope.retorno.aUsuarioSessao = aUsuarioSessao

        callWS.get('/WVDF_WS/ws_TMEN1006.wso/fSaveRetorno/JSON', { 'sJSON': $scope.retorno }).then(function(response) {
            debugger;
            if (response.data.hasError) {
                parent.parent.alertify.error(response.data.msgError);
            }
            else {
                Codigo = response.data.msgInfo
                parent.parent.alertify.success('Cadastrado!');
            }
        });

    };

    $scope.getDS = function(array, ID) {
        try {
            return array.filter(function(item) {
                return (item.ID === ID || item.id === ID);
            })[0].DS;
        } catch (err) {
            return '';
        }
    }

    $scope.getValue = function(array, id) {
        try {
            return array.filter(function(item) {
                return (item.id === id);
            })[0].value;
        } catch (err) {
            return '';
        }

    }

    init();
});