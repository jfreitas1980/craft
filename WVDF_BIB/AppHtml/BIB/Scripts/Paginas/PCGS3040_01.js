// JQUERY
$(document).ready(function() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    });

    function addURL(value) {
        $(this).attr('href', function() {
            return this.href + value;
        });
    }
    //$('#testETA').mask("99/99/9999");
});

// ANGULAR JS
app = angular.module('pcgs304001App', ['ui.bootstrap', 'ngTagsInput', 'angularSoap', 'toaster',
    'ngMessages', 'wsDominio', 'smart-table', 'diretivas', 'ui.bootstrap.datetimepicker', 'ui.dateTimeInput'
]);

app.factory("soapService", ['$soap', function($soap) {
    return {
        CallSoap: function(url, action, params) {
            return $soap.post(url, action, params);
        }
    }
}]);

/*app.factory('callWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http({ url: url, method: "GET", params: parametros });
        }
    };
});*/

app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                return res.data;
            });
        }
    };
});

app.filter('newDate', function($filter) {
    return function(input, arg) {
        if (typeof input.type == "undefined") return input;
        if (input.type != "date") return input;

        var hFormat = arg ? 'HH' : 'hh';
        return $filter('date')(new Date(input), hFormat + '.mm');
    }
});

app.controller('pcgs304001Controller', function($scope, soapService, toaster, callWS, listaLiterais,
    listaContainers, listaCliente, listaNavios, listaCidades, listaCarries, buscaWS, listaTerminais) {

    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    var aCSAG320Id = getVariavelURL('aCSAG320Id');
    $scope.modalColunas = "PHSAG310_01.asp?aUsuarioSessao=" + aUsuarioSessao + "&aTabela=HCGS3040";

    $scope.pcgs3040 = {};
    $scope.pcgs3040.lsTransbordo = []
    $scope.lsPackages = [];

    var getPackageType = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_CCGS228.wso/f_CCGS228_pkg_type/JSON', params)
            .then(function(response) {
                $scope.lsPackages = response.data;
            }, function(error) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar literais. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    };

    $scope.editMode = function() {
        console.log($scope.lsPesquisa[0]['notify'].value);
    }

    $scope.savePesquisa = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'Registros' : $scope.lsPesquisa };
        callWS.get('/WVDF_WS/ws_HCGS3040.wso/fGravaLoteRegistros/JSON', params)
            .then(function(response) {
                $scope.ExecutarPesquisa();

            }, function(error) {
                console.log(error);
            });
    }

    $scope.activaTab = function(tab) {
        $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    };

    var init = function() {
        $scope.activaTab('tabpcgs304001');
        $scope.pcgs3040.aUsuarioSessao = aUsuarioSessao;
        getPackageType();
        montaTabela();
        //  $scope.listaRegistros();
    };


    // Posiciona Literais
    buscaWS.get('/WVDF_WS/ws_csag309.wso/f_idiomas_literais/JSON', 'sPrograma=PCGS3040_01').then(function(data) {
        $scope.L = data;
    });


    function configFunction() {
        return { startView: 'month' };
    }

    // auto complete

    $scope.acCarriers = function(query) {
        return getCarries(query);
    };

    $scope.acShipper = function(query) {
        return getClientes(query);

    };

    $scope.acNotify = function(query) {
        return getClientes(query);
    };

    $scope.acCidades = function(texto) {
        return getCidades(texto);
    };

    $scope.acNavio = function(texto) {
        return getNavio(texto);
    };

    $scope.loadCarriers = function(query) {
        return getCarries(query);
    };

    $scope.acCliente = function(query){
        return getClientes(query);
    }

    var getCarries = function(texto) {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'term': texto };
        return listaCarries.get(params)
            .then(function(response) {
                return response.data;
            }, function(error) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar container. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    };

    var getClientes = function(texto) {
        var params = { 'sSessionId': aUsuarioSessao, 'sInicial': texto };
        return listaCliente.get(params)
            .then(function(response) { 
                return response.data;
            }, function(error) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar container. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    };

    var getCidades = function(texto) {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'sInicial': texto };
        return listaCidades.get(params)
            .then(function(response) {
                var dados = [];
                for (var i = 0; i < response.data.dados.length; i++) {
                    dados[i] = response.data.dados[i];
                    dados[i].value = dados[i].value.split(" - ")[0];
                }
                return dados;
            }, function(error) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar container. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    };

    var getNavio = function(texto) {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'term': texto };
        return listaNavios.get(params)
            .then(function(response) {
                return response.data;
            }, function(error) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar container. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    };

    // end auto complete

    /*
        ws_HCGS3040.wso
        função:
        fRemoveTracking - aUsuarioSessao, processo
    */


    $scope.removeTracking = function(reg) {
        $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'processo': reg.processo };
        callWS.get('/WVDF_WS/ws_HCGS3040.wso/fRemoveTracking/JSON', params)
            .then(function(response) {
                $scope.pcgs3040.lsTransbordo = response.data;
                $scope.activaTab('tabpcgs304001');
                $scope.loadingState = false;
            }, function(error) {
                $scope.loadingState = false;
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar os registros. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    }

    $scope.posicionaRegistros = function(reg) {
        $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'recId': reg.recId };
        callWS.get('/WVDF_WS/ws_HCGS3040.wso/fPosicionaRegistro/JSON', params)
            .then(function(response) {
                $scope.pcgs3040.lsTransbordo = response.data;
                $scope.loadingState = false;
            }, function(error) {
                $scope.loadingState = false;
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar os registros. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    }
    $scope.pesquisa = {};
    $scope.lsPesquisa = [];

    $scope.RemoveRegistro = function(reg) {
        $scope.loadingState = true;

        var hasError = 'false';
        var msgError = '';
        var msgInfo = '';

        var params = { 'aUsuarioSessao': aUsuarioSessao, 'recId': reg.recId };
        soapService.CallSoap('/WVDF_WS/ws_HCGS3040.wso', 'fRemoveRegistro', params).then(function(response) {
            $scope.loadingState = false;
            angular.forEach(response, function(value, key) {
                if (key === 'm:defaultMessage') {
                    angular.forEach(value, function(value2, key2) {
                        if (key2 === 'm:hasError') {
                            hasError = value2;
                        }
                        if (key2 === 'm:msgError') {
                            msgError = value2;
                        }
                        if (key2 === 'm:msgInfo') {
                            msgInfo = value2;
                        }
                    });
                }
            });

            if (hasError === 'true') {
                toaster.pop('error', "Error", (msgError), null, 'trustedHtml');
            } else {
                toaster.pop('success', "Sucesso", ("Registro salvo."), null, 'trustedHtml');
            }
        }, function(error) {
            console.log(error);
        });

        $scope.loadingState = false;
    }

    $scope.gravaRegistro = function(reg) {
        $scope.loadingState = true;
        reg.aUsuarioSessao = aUsuarioSessao;

        var hasError = 'false';
        var msgError = '';
        var msgInfo = '';

        var entidade = JSON.stringify(reg);
        console.log({ 'sJSON': entidade });
        soapService.CallSoap('/WVDF_WS/ws_HCGS3040.wso', 'fGravaRegistro', { 'sJSON': entidade }).then(function(response) {
            $scope.loadingState = false;
            angular.forEach(response, function(value, key) {
                if (key === 'm:defaultMessage') {
                    angular.forEach(value, function(value2, key2) {
                        if (key2 === 'm:hasError') {
                            hasError = value2;
                        }
                        if (key2 === 'm:msgError') {
                            msgError = value2;
                        }
                        if (key2 === 'm:msgInfo') {
                            msgInfo = value2;
                        }
                    });
                }
            });

            if (hasError === 'true') {
                toaster.pop('error', "Error", (msgError), null, 'trustedHtml');
            } else {
                toaster.pop('success', "Sucesso", ("Registro salvo."), null, 'trustedHtml');
            }
        }, function(error) {
            console.log(error);
        });

        $scope.loadingState = false;
    };
    // table 

    var getEmptyTransbordo = function() {
        var obj = {};
        obj.transbordo = '';
        obj.etd = '';
        obj.atd = '';
        obj.navio = '';
        obj.viagem = '';
        obj.eta = '';
        obj.ata = '';
        obj.editable = true;
        return obj;
    }

    $scope.addTransbordoRow = function() {
        var obj = getEmptyTransbordo();
        $scope.pcgs3040.lsTransbordo.unshift(obj);
    }

    $scope.saveTransbordo = function(row, index) {
            if (angular.equals(row, getEmptyTransbordo())) {
                $scope.pcgs3040.lsTransbordo.splice(index, 1);
            } else {
                row.editable = false;
            }
        }
        //end table 



    $scope.recarrega = function() {
        // location.reload(true);
        montaTabela();
    };

    $scope.tableStruct = [];
    var montaTabela = function() {
        buscaWS.get('/WVDF_WS/ws_hsag310.wso/fListarHSAG310/JSON', 'sTabela=HCGS3040').then(function(data) {
            // console.log(data);
            $scope.tableStruct = data;
        });
    }

    $scope.btnPesquisaZoom = function(index) {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'processo': $scope.lsPesquisa[index].processo }
        callWS.get('/WVDF_WS/ws_HCGS3040.wso/fPosicionaRegistro/JSON', params).then(function(response) {
            console.log(response.data.dados[0]);
            $scope.pcgs3040 = response.data.dados[0];

        });

        $scope.activaTab('tabpcgs304001');
    }

    $scope.pesquisa.totalItems = 0;
    $scope.pesquisa.currentPage = 1;
    $scope.pesquisa.itemsByPage = 10;

    $scope.ExecutarPesquisa = function() {

        $scope.pesquisa.currentPage = $scope.pesquisa.currentPage;

        $scope.loadingState = true;
        $scope.pesquisa.aUsuarioSessao = aUsuarioSessao;

        var entidade = JSON.stringify($scope.pesquisa);
        callWS.get('/WVDF_WS/ws_HCGS3040.wso/fListaRegistros/JSON', { 'sJSON': entidade })
            .then(function(response) {
                console.log(response);
                $scope.lsPesquisa = response.data.dados;
                $scope.pesquisa.totalItems = response.data.qtdLinhas;

                $scope.loadingState = false;
            }, function(error) {
                $scope.loadingState = false;
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar os registros. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    }


    init();

});
