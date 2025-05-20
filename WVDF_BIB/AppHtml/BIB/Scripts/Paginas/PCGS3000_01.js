// ANGULAR JS
app = angular.module('pcgs300001App', [
    'ngSanitize', 'angularSoap', 'diretivas',
    'wsDominio', 'smart-table', 'ui.bootstrap',
    'ngTagsInput', 'toaster', 'ngAnimate'
]);

app.config(function(tagsInputConfigProvider) {
    tagsInputConfigProvider.setDefaults('tagsInput', { placeholder: '' });
    tagsInputConfigProvider.setActiveInterpolation('tagsInput', { placeholder: true });
});

app.directive('shortcut', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        link: function postLink(scope, iElement, iAttrs) {
            jQuery(document).on('keypress', function(e) {
                scope.$apply(scope.keyPressed(e));
            });
        }
    };
});

app.directive('enforceMaxTags', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngCtrl) {
            var maxTags = attrs.maxTags ? parseInt(attrs.maxTags, '10') : null;

            ngCtrl.$parsers.push(function(value) {
                if (value && maxTags && value.length > maxTags) {
                    value.splice(value.length - 1, 1);
                }
                return value;
            });
        }
    };
});

app.controller('pcgs300001Ctrl', ['$scope', '$http', 'callWS', 'toaster', function($scope, $http, callWS, toaster) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    var aTarifa = getVariavelURL('aTarifa');

    $scope.lsMarcas = [];
    $scope.lsModalidades = [];
    $scope.lsTaxas = [];
    $scope.lsDescricao = [];
    $scope.lsIncoterm = [];
    $scope.lsApartir = [];
    $scope.lsApartir = [];
    $scope.lsPaisOrigem = []
    $scope.lsPaisDestino = [];
    $scope.lsFrequencia = [];
    $scope.lsContainer = [];
    $scope.lsMoeda = [];
    $scope.lsValorPor = [];
    $scope.lsModPgto = [];
    $scope.lsNivelFrete = [];

    $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON', {
        params: {
            aUsuarioSessao: aUsuarioSessao,
            sPrograma: 'pcgs3000_01'
        }
    })
    .then(function(res) {
        $scope.literais = res.data;
    });

    var getMarcas = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/WS_HCGS3029.wso/f_combo_marcas/JSON', params)
            .then(function(response) {
                $scope.lsMarcas = response.data;
            });
    }

    var getModalidades = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'sProduto': '' };
        callWS.get('/WVDF_WS/ws_CCGS202.wso/f_CCGS202_lista/JSON', params)
            .then(function(response) {
                $scope.lsModalidades = response.data;
            });
    }

    var getTaxas = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxas/JSON', params)
            .then(function(response) {
                $scope.lsTaxas = response.data;
            });
    }

    var getDescricao = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_ccgs225.wso/f_CCGS225_combo/JSON', params)
            .then(function(response) {
                $scope.lsDescricao = response.data;
            });
    }

    var getIncoterm = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/WS_HCGS3000.wso/f_combo_incorterm/JSON', params)
            .then(function(response) {
                $scope.lsIncoterm = response.data;
            });
    }

    var getApartir = function() {
        $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/WS_CCGS224.wso/f_combo_typeofdate/JSON', params)
            .then(function(response) {
                $scope.lsApartir = response.data;
            });
    }

    var getTrades = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/WS_csag379.wso/f_tradeline_list/JSON', params)
            .then(function(response) {
                $scope.lsTrades = response.data;
            });
    }


    var getPais = function(flOriDest) {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'idCont': '' };
        callWS.get('/WVDF_WS/ws_csag329.wso/buscarPaisesPorTrade/JSON', params)
            .then(function(response) {
                if (flOriDest === 'O') {
                    $scope.lsPaisOrigem = response.data;
                } else if (flOriDest === 'D') {
                    $scope.lsPaisDestino = response.data;
                } else {
                    $scope.lsPaisOrigem = response.data;
                    $scope.lsPaisDestino = response.data;
                }
            });
    }

    var getFrequencia = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_ccgs226.wso/f_CCGS226_freq/JSON', params)
            .then(function(response) {
                $scope.lsFrequencia = response.data;
            });
    }

    var getContainer = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/WS_HCGS3029.wso/f_combo_cntr/JSON', params)
            .then(function(response) {
                $scope.lsContainer = response.data;
            });
    }

    var getMoeda = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_ccgs218.wso/f_CCGS218_lista/JSON', params)
            .then(function(response) {
                $scope.lsMoeda = response.data;
            });
    }

    var getValorPor = function() {
        // debugger;
        var aux;
        if ($scope.pcgs == undefined) aux='';
        else aux = $scope.pcgs.hcgs3000__ccgs202_id;
        
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'aModal': aux };
        callWS.get('/WVDF_WS/ws_ccgs220.wso/f_combo_tpcalc/JSON', params)
            .then(function(response) {
                $scope.lsValorPor = response.data;
            });
    }

    var getModPgto = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_ccgs206.wso/listarModPgtoGuide/JSON', params)
            .then(function(response) {
                $scope.lsModPgto = response.data;
            });
    }

    var getNivelFrete = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON', params).then(function(response) {
            $scope.lsNivelFrete = response.data;
        });
    }

    /////////////////////////////////////////////////////////////////////

    $scope.acCarrierByTipoServico = function(texto) {
        var id;

        var aux = $scope.pcgs.hcgs3000__ccgs202_id;
        console.log($scope.pcgs.hcgs3000__ccgs202_id);
        switch (aux) {
            case 'AIR':
                id = "343";
                break;
            case 'LCL':
                id = "342";
                break;
            case 'FCL':
                id = "342";
                break;
            default:
                return [];
        }

        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'term': texto
        };
        return callWS.get('fbcsag' + id + '_descricao.asp', params)
            .then(function(response) {
                return response.data;
            });
    }

    $scope.acAgente = function(texto) {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'sInicio': texto };
        return callWS.get('/WVDF_WS/ws_CSAG345.wso/f_agentes_descricao/JSON', params)
            .then(function(response) {
                return response.data;
            });
    };

    $scope.acCidadesOrigem = function(texto) {
        // var trade = $scope.pcgs.hcgs3000__csag379_origem == null ? 0 : $scope.pcgs.hcgs3000__csag379_origem;
        var pais = $scope.pcgs.hcgs3000__csag329_origem == null ? '' : $scope.pcgs.hcgs3000__csag329_origem;;
        return getCidades(pais, texto);
    }

    $scope.acCidadesDestino = function(texto) {
        // var trade = $scope.pcgs.hcgs3000__csag379_destino == null ? 0 : $scope.pcgs.hcgs3000__csag379_destino;
        var pais = $scope.pcgs.hcgs3000__csag329_destino == null ? '' : $scope.pcgs.hcgs3000__csag329_destino;
        return getCidades(pais, texto);
    }

    $scope.acTerminal = function(texto) {
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'term': texto
        };
        return callWS.get('fbcsag346_descricao.asp', params)
            .then(function(response) {
                return response.data;
            });
    }

    $scope.acCidadesVia = function(texto) {
        return getCidades('', texto);
    }

    /////////////////////////////////////////////////////////////////////

    var getCidades = function(idPais, cidade) {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'idPais': idPais, 'sCidade': cidade };
        return callWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', params)
            .then(function(response) {
                return response.data;
            });
    };

    /////////////////////////////////////////////////////////////////////

    var init = function() {
        $scope.loadingState = true;
        getMarcas();
        getModalidades();
        getTaxas();
        getDescricao();
        getIncoterm();
        getApartir();
        getTrades();
        getPais(0, 'T');
        getFrequencia();
        getContainer();
        getMoeda();
        
        getModPgto();
        getNivelFrete();
        if (aTarifa) {
            procuraRegistro(aTarifa);
            
        }
        else {
            getValorPor();
        }
        $scope.loadingState = false;
    }

    $scope.changePaisDestino = function() {
        getPais('D');
    }

    $scope.changePaisOrigem = function() {
        getPais('O');
    }

    $scope.coLoaderSelectEvent = function() {
        $scope.pcgs.hcgs3000__id_tipo_cd = false;
    }

    $scope.clienteDiretoSelectEvent = function() {
        $scope.pcgs.hcgs3000__id_cl = false;
    }

    $scope.btnSalvar = function() {
        gravaRegistro();
    }

    $scope.btnExcluir = function() {
        apagaRegistro();
    }

    $scope.btnNovo = function() {
        $scope.pcgs = {};
    }

    /////////////////////////////////////////////////////////////////////

    var gravaRegistro = function() {

        // if (!$scope.pcgs.hcgs3000__id_tipo_cd && !$scope.pcgs.hcgs3000__id_cl) {
        //     toaster.pop('error', "Error",
        //         ('E necessario selecionar ao menos uma das opcoes: "Cliente Direto" ou "Co-loader"'),
        //         null, 'trustedHtml');

        //     return;
        // }
        $scope.loadingState = true;
        $scope.pcgs.aUsuarioSessao = aUsuarioSessao;
        var entidade = JSON.stringify($scope.pcgs);
        console.log({ 'sJson': entidade });

        callWS.get('/WVDF_WS/ws_HCGS3000.wso/gravaRegistro/JSON', { 'sJSON': entidade })
            .then(function(response) {
                // toaster.success({ title: "Mensagem", body: "" });
                parent.parent.alertify.success('Registro salvo com Sucesso');
                procuraRegistro(aTarifa);
            }, function(error) {
                // parent.parent.alertify.success()
                // toaster.pop({
                //     type: 'error',
                //     title: 'Error',
                //     body: (""),
                //     bodyOutputType: 'trustedHtml'
                // });
                parent.parent.alertify.error("Error ao gravar registro. <br/> status: " + error.status + "<br/> statusText: " + error.statusText);
            });
        $scope.loadingState = false;
    }

    var apagaRegistro = function() {
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'recId': $scope.pcgs.recId
        };
        callWS.get('/WVDF_WS/ws_HCGS3000.wso/apagaRegistro/JSON', params)
            .then(function(response) {
                // toaster.success({ title: "Mensagem", body: "" });
                parent.parent.alertify.success('Registro excluido com Sucesso');
            }, function(error) {
                // toaster.pop({
                //     type: 'error',
                //     title: 'Error',
                //     body: (),
                //     bodyOutputType: 'trustedHtml'
                // });
                parent.parent.alertify.error("Error ao excluir registro. <br/> status: " + error.status + "<br/> statusText: " + error.statusText);
            });
    }


    var procuraRegistro = function(redId) {
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'recId': redId
        };
        callWS.get('/WVDF_WS/ws_HCGS3000.wso/procuraRegistro/JSON', params)
            .then(function(response) {
                $scope.pcgs = response.data;
                getValorPor();
            }, function(error) {
                // toaster.pop({
                //     type: 'error',
                //     title: 'Error',
                //     body: (),
                //     bodyOutputType: 'trustedHtml'
                // });
                parent.parent.alertify.error("Error ao procurar registro. <br/> status: " + error.status + "<br/> statusText: " + error.statusText);
            });
    }

    /////////////////////////////////////////////////////////////////////

    $scope.keyPressed = function(e) {
        // $scope.keyCode = e.which;
        if (e.which == 13) {
            gravaRegistro();
        }
    };

    init();
}])