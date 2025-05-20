$(document).ready(function() {
    $('#dtInicial').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    });

    $('#dtFinal').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    });
});

// ANGULAR JS
var app = angular.module('pcgs300006App', ['ui.bootstrap', 'diretivas', 'smart-table', 'ngTagsInput', 'ngAnimate',
    'angularSoap', 'toaster', 'datatables', 'datatables.buttons'
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
    })
    .factory("soapService", ['$soap', function($soap) {
        return {
            CallSoap: function(url, action, params) {
                return $soap.post(url, action, params);
            }
        }
    }])
    .factory('callWS', function($http) {
        return {
            get: function(url, parametros) {
                return $http({ url: url, method: "GET", params: parametros });
            }
        };
    })
    .controller('pcgs300006Controller', function($scope, buscaWS, $http, $uibModal, soapService, callWS, toaster) {
        $scope.tarifario = {};
        $scope.tarifario2 = {};
        // $scope.tarifario.lsCntr = [];
        $scope.lsMarcas = {};
        $scope.lsProdutos = {};
        $scope.lsContainer = {};
        $scope.mCContainer = {};
        $scope.lsTpValor = {};
        $scope.lsApartir = {};
        $scope.lsIncoterm = {};
        $scope.lsFrequencias = {};
        $scope.lsTrades = {};
        $scope.lsPaisOrigem = [];
        $scope.lsPaisDestino = [];
        $scope.lsTaxas = {};
        $scope.lsClasseTaxa = [];
        $scope.lsModalidades = [];
        $scope.lsDescricao = [];
        $scope.lsModPgto = []
        $scope.lsTpCalc = [];
        $scope.cntr = {};
        $scope.cntr.equipamento = [];
        $scope.lsNivelFrete = [];
        $scope.textoAjuda = 'Use a tecla CTRL para selecionar mais de um item.';

        var aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        var init = function() {
            getLiterais();
            getMarcas();
            getProdutos();
            getContainer();
            getDescricao();
            getApartir();
            getTaxas();
            getIncoterm();
            getFrequencias();
            // getTrades();
            getPais(0, 'T');
            getModalidades();
            listarModPgto();
            getTpCalc();
            getNivelFrete();
        };

        var getLiterais = function() {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'sPrograma': 'PCGS3000_06' };
            callWS.get('/WVDF_WS/ws_csag309.wso/f_idiomas_literais/JSON', params)
                .then(function(response) {
                    $scope.L = response.data;
                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar literais. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };
        
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


        var getMarcas = function() {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao };
            callWS.get('/WVDF_WS/WS_HCGS3029.wso/f_combo_marcas/JSON', params)
                .then(function(response) {
                    $scope.lsMarcas = response.data;
                    // $scope.tarifario.marca = $scope.lsMarcas[0].id;
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

        var getProdutos = function() {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao };
            callWS.get('/WVDF_WS/WS_HCGS3029.wso/f_combo_prod/JSON', params)
                .then(function(response) {
                    $scope.lsProdutos = response.data;
                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar produtos. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var getContainer = function() {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao };
            callWS.get('/WVDF_WS/WS_HCGS3029.wso/f_combo_cntr/JSON', params)
                .then(function(response) {
                    $scope.lsContainer = response.data;
                    $scope.mCContainer = $scope.lsContainer[0];
                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar container. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var getValorPor = function() {
            $scope.loadingState = true;
            debugger;
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'sTP_C': $scope.tarifario.tpServico };
            callWS.get('/WVDF_WS/WS_CCGS221.wso/f_combo_tpcalc/JSON', params)
                .then(function(response) {
                    $scope.lsTpValor = response.data;
                    $scope.cntr.tpValorCompra = $scope.lsTpValor[0];
                    $scope.cntr.tpValorVenda = $scope.lsTpValor[0];
                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar valor por. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var getApartir = function() {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao };
            callWS.get('/WVDF_WS/WS_CCGS224.wso/f_combo_typeofdate/JSON', params)
                .then(function(response) {
                    //   console.log(response);
                    $scope.lsApartir = response.data;
                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar Apartir. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var getIncoterm = function() {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao };
            callWS.get('/WVDF_WS/WS_HCGS3000.wso/f_combo_incorterm/JSON', params)
                .then(function(response) {
                    $scope.lsIncoterm = response.data;

                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar Incoterm. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var getFrequencias = function() {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao };
            callWS.get('/WVDF_WS/WS_CCGS226.wso/f_CCGS226_freq/JSON', params)
                .then(function(response) {
                    $scope.lsFrequencias = response.data;
                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar Frequencia. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };
        
        // var getTrades = function() {
        //     $scope.loadingState = true;
        //     var params = { 'aUsuarioSessao': aUsuarioSessao };
        //     callWS.get('/WVDF_WS/WS_csag379.wso/f_tradeline_list/JSON', params)
        //         .then(function(response) {
        //             $scope.lsTrades = response.data;
        //             $scope.loadingState = false;
        //         }, function(error) {
        //             $scope.loadingState = false;
        //             toaster.pop({
        //                 type: 'error',
        //                 title: 'Error',
        //                 body: ("Error ao carregar Trades. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
        //                 bodyOutputType: 'trustedHtml'
        //             });
        //         });
        // };

        var getPais = function(idTrade, flOriDest) {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao, "idCont": idTrade };
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
                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar Pais. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var getTaxas = function() {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao };
            callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxas/JSON', params)
                .then(function(response) {
                    //     console.log(response);
                    $scope.lsTaxas = response.data;
                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar Taxas. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var getTpCalc = function() {
            var params = { 'aUsuarioSessao': aUsuarioSessao };
            callWS.get('/WVDF_WS/ws_ccgs220.wso/f_combo_tpcalc/JSON', params)
                .then(function(response) {
                    $scope.lsTpCalc = response.data;
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar literais. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var getModalidades = function() {
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'sProduto': '' };
            callWS.get('/WVDF_WS/ws_CCGS202.wso/f_CCGS202_lista/JSON', params)
                .then(function(response) {
                    $scope.lsModalidades = response.data;
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar literais. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });

        };

        var getCidades = function(idTrade, idPais, cidade) {
            //  $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'idTrade': idTrade, 'idPais': idPais, 'sCidade': cidade };
            return callWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', params)
                .then(function(response) {
                    //    $scope.loadingState = false;
                    return response.data;
                }, function(error) {
                    //       $scope.loadingState = false;
                    //console.log(error);
                    //console.log($scope.tarifario.taxa);
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar Classes Taxa. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var getClassesTaxa = function() {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'sTaxaId': $scope.tarifario.taxa };
            callWS.get('/WVDF_WS/WS_HCGS3001.wso/f_classesSelTaxa/JSON', params)
                .then(function(response) {
                    $scope.lsClasseTaxa = response.data;
                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    //console.log(error);
                    //console.log($scope.tarifario.taxa);
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar Classes Taxa. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var getContratos = function() {
            $scope.loadingState = false;
            if (!angular.isDefined($scope.tarifario.carrier.id)) {
                $scope.loadingState = false;
                return null;
            }
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'aCSAG342_ID': $scope.tarifario.carrier.id, 'aInicio': '' };
            callWS.get('/WVDF_WS/ws_hsag342.wso/f_autocompleteHSAG342/JSON', params)
                .then(function(response) {
                    //  console.log(response);
                    $scope.lsContratos = response.data.dados;
                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar contratos. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var getContratosInfoAdicional = function(carrier, contrato) {
            $scope.loadingState = false;
            var params = { aUsuarioSessao: aUsuarioSessao, sCSAG342_ID: carrier, sContrato: contrato };
            callWS.get('/WVDF_WS/ws_HSAG342.wso/f_HSAG342_Zoom/JSON', params)
                .then(function(response) {
                    console.log(response);
                    $scope.tarifario2 = response.data;

                    $scope.loadingState = false;
                }, function(error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar contratos. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
        };

        var listarModPgto = function() {
            $scope.loadingState = false;
            var params = { 'aUsuarioSessao': aUsuarioSessao };
            callWS.get('/WVDF_WS/ws_ccgs206.wso/listarModPgto/JSON', params)
                .then(function(response) {
                    //   console.log(response);
                    $scope.lsModPgto = response.data;
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar ModPgto. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });

            $scope.loadingState = false;
        }

        $scope.changeProduto = function() {
            $scope.lsTaxas = [];
            getTaxas();
        };

        $scope.changeTaxa = function() {
            $scope.lsClasseTaxa = [];
            $scope.tarifario.classeTaxa = {};
            getClassesTaxa();
        }

        $scope.acCarrier = function(texto) {
            var id;

            var aux = ($scope.tarifario.produto != undefined) ? $scope.tarifario.produto.ID_215 : "";
            switch (aux) {
                case 'AIR':
                    id = "343";
                    break;
                case 'SEA':
                    id = "342";
                    break;
                case 'LAND':
                    id = "349";
                    break;
                default:
                    id = "342"
                    break;
            }
            return buscaWS.get('fbcsag' + id + '_descricao.asp', 'term=' + texto).then(function(data) {
                return data;
            });
        };

        $scope.acCarrierByTipoServico = function(texto) {
            var id;

            var aux = $scope.tarifario.tpServico;
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
            return buscaWS.get('fbcsag' + id + '_descricao.asp', 'term=' + texto).then(function(data) {
                console.log(data);
                return data;
            });
        };

        $scope.acCidadesOrigem = function(texto) {
            var trade = $scope.tarifario.tradeOrigem == null ? 0 : $scope.tarifario.tradeOrigem;
            var pais = $scope.tarifario.paisOrigem == null ? '' : $scope.tarifario.paisOrigem;
            return getCidades(trade, pais, texto);
        };

        $scope.acCidadesDestino = function(texto) {
            var trade = $scope.tarifario.tradeDestino == null ? 0 : $scope.tarifario.tradeDestino;
            var pais = $scope.tarifario.paisDestino == null ? '' : $scope.tarifario.paisDestino;
            return getCidades(trade, pais, texto);
        };

        $scope.acCidades = function(texto) {
            var trade = $scope.tarifario.tradeDestino == null ? 0 : $scope.tarifario.tradeDestino;
            var pais = $scope.tarifario.paisDestino == null ? '' : $scope.tarifario.paisDestino;
            return getCidades(trade, pais, texto);
        };

        $scope.acCidadesVia = function(texto) {
            return getCidades(0, '', texto);
        }

        $scope.acContainer = function(texto) {
            return buscaWS.get('fbccgs217_descricao.asp', 'term=' + texto).then(function(data) {
                return data;
            });
        };

        $scope.lsMoeda = [];
        callWS.get('/WVDF_WS/ws_ccgs218.wso/buscarMoeda_proposta/JSON', { 'aUsuarioSessao': aUsuarioSessao, 'aInicial': '' })
            .then(function(response) {
                $scope.lsMoeda = response.data;

                for (var i = $scope.lsMoeda.length - 1; i >= 0; i--) {
                    $scope.lsMoeda[i].label = $scope.lsMoeda[i].DS.split(" - ")[1];
                }
            });

        $scope.acMoeda = function(texto) {
            var params = { 'aUsuarioSessao': aUsuarioSessao};
            return callWS.get('/WVDF_WS/ws_ccgs218.wso/buscarMoeda_proposta/JSON', params)
                .then(function(response) {

                    return response.data;
                });
        };

        $scope.acAgente = function(texto) {
            return buscaWS.get('fbcsag345_descricao.asp', 'term=' + texto).then(function(data) {
                return data;
            });
        };

        $scope.acTerminal = function(texto) {
            return buscaWS.get('fbcsag346_descricao.asp', 'term=' + texto).then(function(data) {
                return data;
            });
        };

        var getNivelFrete = function() {
            var params = { 'aUsuarioSessao': aUsuarioSessao };
            callWS.get('/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON', params).then(function(response) {
                $scope.lsNivelFrete = response.data;
            });
        }

        $scope.btnWS = function() {
            debugger;
            if (!$scope.tarifario.clienteDireto && !$scope.tarifario.coloader) {
                window.parent.$("body").animate({ scrollTop: 0 }, 'slow');
                toaster.pop('error', "Error",
                    ('E necessario selecionar ao menos uma das opcoes: "Cliente Direto" ou "Co-loader"'),
                    null, 'trustedHtml');

                return;
            }
            if ($scope.tarifario.taxa == undefined || $scope.tarifario.taxa == '') {
                window.parent.$("body").animate({ scrollTop: 0 }, 'slow');
                toaster.pop('error', "Error",
                    ('E necessario selecionar ao menos uma Taxa!'),
                    null, 'trustedHtml');
                return;   
            }


            $scope.loadingState = true;
            $scope.tarifario.aUsuarioSessao = aUsuarioSessao;
            $scope.tarifario.lsTbContainer = $scope.lsTbContainer;
            console.log($scope.tarifario);
            var entidade = JSON.stringify($scope.tarifario);

            soapService.CallSoap('/WVDF_WS/ws_HCGS3000.wso', 'fGravarHCGS3000', { 'sJSON': entidade }).then(function(response) {

                if (response["m:hasError"] == "true") {
                     window.parent.$("body").animate({ scrollTop: 0 }, 'slow');
                    toaster.pop('error', "Error", ("Error ao gravar registro. <br/> Response: " + response["m:msgError"]), null, 'trustedHtml');
                } else {

                    window.parent.$("body").animate({ scrollTop: 0 }, 'slow');
                    toaster.pop('success', "Success", ("Registro: criado com sucesso."), null, 'trustedHtml');
                }
            }, function(error) {
                toaster.pop('error', "Error", ("Error ao gravar registro. <br/> Response: " + error.data), null, 'trustedHtml');
            });

            // $scope.btnLimpar();
            $scope.loadingState = false;
        };

        /* $scope.btnAddContainer = function() {
             if ($scope.tarifario.tpServico == 'FCL' && $scope.cntr.equipamento.length === 0) {
                 parent.parent.alertify.error("Selecione um container!");
                 return;
             }
             //console.log($scope.cntr.equipamento);
             ($scope.cntr.equipamento.length);
             $scope.tarifario.lsCntr.push($scope.cntr);
             $scope.cntr = {};
             $scope.cntr.equipamento = [];
             $scope.cntr.tpValorCompra = $scope.lsTpValor[0];
             $scope.cntr.tpValorVenda = $scope.lsTpValor[0];
             $scope.cntr.tpValorCompraCoLoader = $scope.lsTpValor[0];
             $scope.cntr.tpValorVendaCoLoader = $scope.lsTpValor[0];
             $scope.mCContainer = $scope.lsContainer[0];
         }*/

        $scope.btnExcluiCntr = function(index, container) {
            for (var i = 0; i < container.length; i++) {
                $scope.lsContainer.push(container[i]);
            }
            $scope.lsContainer.sort(function(a, b) {
                return (a.DS > b.DS) ? 1 : ((b.DS > a.DS) ? -1 : 0);
            });
            $scope.mCContainer = $scope.lsContainer[0];
            //   $scope.tarifario.lsCntr.splice(index, 1);
        }


        $scope.btnAddContainerLista = function(sContainer) {
            if (sContainer != null) {
                $scope.cntr.equipamento.push(sContainer);
                var index = $scope.lsContainer.indexOf(sContainer);
                $scope.lsContainer.splice(index, 1);
            }
        };

        $scope.changePaisDestino = function() {
            getPais(($scope.tarifario.tradeDestino == null ? 0 : $scope.tarifario.tradeDestino), 'D');
        };

        $scope.changePaisOrigem = function() {
            getPais(($scope.tarifario.tradeOrigem == null ? 0 : $scope.tarifario.tradeOrigem), 'O');
        };

        $scope.btnLimpar = function() {
            $scope.tarifario = {};
            //         $scope.tarifario.lsCntr = [];
            $scope.cntr = {};
            $scope.cntr.equipamento = [];
            getContainer();
            $scope.lsContratos = [];
            $scope.lsClasseTaxa = [];
        }

        // Modal LOG
        $scope.modal = function(size) {
            parent.scrollTo(0, 0);

            var modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function(sRecnum) {
                parent.scrollTo(0, 0);

                buscaWS.get('/WVDF_WS/ws_log3000.wso/f_LOG3000_Zoom/JSON', 'sRecnum=' + sRecnum).then(function(data) {
                    $scope.mMarca = data.CSAG308_ID;
                    $scope.mProduto = data.CCGS210_ID;
                    $scope.changeProduto();
                    $scope.mTaxa = data.TAXA_ID;
                    $scope.changeTaxa();
                    $scope.mDescricao = data.DESCRICAO;
                    $scope.sExibeTC = parseInt(data.ID_COMERCIAL);
                    $scope.sExibeTO = parseInt(data.ID_OPERACIONAL);
                    $scope.sPaga = parseInt(data.ID_PAGA);
                    $scope.sRecebe = parseInt(data.ID_RECEBE);
                    $scope.mIncoterm = data.INCOTERM;
                    $scope.mTransit = data.TRANSIT_TIME;
                    // $scope.mTrade = parseInt(data.CSAG379_ID);
                    $scope.mPais = data.CSAG329_ID;
                    // data.CSAG325_ORIGEM
                    // data.CSAG345
                    // data.CSAG346_ID_ORIG
                    // data.CSAG325_DESTINO
                    $scope.sDTA = (data.ID_POD_DTA);
                    $scope.sDireto = (data.ID_POD_DIRETO);
                    // $scope.mVia       = {};
                    // $scope.mVia.id    = data.CSAG325_VIA;
                    // $scope.mVia.value = data.CSAG325_VIA_DS;
                    // data.CSAG346_ID_DEST
                    $scope.mApartir = data.ID_DT_APARTIR.split(',');
                    $scope.mDataInicial = data.DT_INICIAL;
                    $scope.mDataFinal = data.DT_FINAL;
                    $scope.mDataInicialSub = data.DT_INICIALSUB;
                    $scope.mDataFinalSub = data.DT_FINALSUB;
                    $scope.mFrequencia = (data.FREQUENCIA);
                    $scope.mObservacoes = data.OBSERVACOES;
                    $scope.sIMO = (data.ID_IMO);
                    $scope.sStackable = (data.ID_NOTSTACKBLE);
                    $scope.sPersonnal = (data.ID_PERSONNAL);

                    // Tratamento listas.
                    // Carrier
                    // lsCarrier
                    data.lsCarrier.forEach(function(aux) {
                        aux['id'] = aux['sid'];
                        aux['label'] = aux['slabel'];
                        aux['value'] = aux['svalue'];
                        aux['recnum'] = aux['srecnum'];

                        delete aux['sid'];
                        delete aux['slabel'];
                        delete aux['svalue'];
                        delete aux['srecnum'];

                        $scope.lsCarrier.push(aux);
                    });

                    // POL
                    // lsPOL
                    data.lsPOL.forEach(function(aux) {
                        $scope.lsPOL.push(aux);
                    });

                    // POD
                    // lsPOL
                    data.lsPOD.forEach(function(aux) {
                        $scope.lsPOD.push(aux);
                    });

                    // Agente
                    // lsAgente
                    data.lsAgente.forEach(function(aux) {
                        aux['id'] = aux['sid'];
                        aux['label'] = aux['slabel'];
                        aux['value'] = aux['svalue'];
                        aux['recnum'] = aux['srecnum'];

                        delete aux['sid'];
                        delete aux['slabel'];
                        delete aux['svalue'];
                        delete aux['srecnum'];

                        $scope.lsAgente.push(aux);
                    });

                    // Terminal Origem
                    // lsTerminalOrigem
                    data.lsTerminalOrigem.forEach(function(aux) {
                        aux['id'] = aux['sid'];
                        aux['label'] = aux['slabel'];
                        aux['value'] = aux['svalue'];
                        aux['recnum'] = aux['srecnum'];

                        delete aux['sid'];
                        delete aux['slabel'];
                        delete aux['svalue'];
                        delete aux['srecnum'];

                        $scope.lsTerminalOrigem.push(aux);
                    });

                    // Terminal Destino
                    // lsTerminalDestino
                    data.lsTerminalDestino.forEach(function(aux) {
                        aux['id'] = aux['sid'];
                        aux['label'] = aux['slabel'];
                        aux['value'] = aux['svalue'];
                        aux['recnum'] = aux['srecnum'];

                        delete aux['sid'];
                        delete aux['slabel'];
                        delete aux['svalue'];
                        delete aux['srecnum'];

                        $scope.lsTerminalDestino.push(aux);
                    });

                    parent.parent.alertify.confirm('Carregar containers?', function(e) {
                        parent.scrollTo(0, 0);
                        if (e) {
                            buscaWS.get('/WVDF_WS/ws_log3000.wso/f_LOG3000_zCntr/JSON', 'sRecnum=' + sRecnum).then(function(data) {
                                c = data.split('|');

                                var arrays = [];

                                while (c.length > 0)
                                    arrays.push(c.splice(0, 35));

                                arrays.forEach(function(c) {
                                    // Monta objeto para mostrar na tela
                                    var aux = {};

                                    aux.container = c[0];

                                    aux.compra = {}
                                    aux.compra.moedaid = c[1];
                                    // aux.compra.moeda     = idMoedaCompra.label;
                                    aux.compra.valor = c[2];
                                    aux.compra.tpvlr = c[3];
                                    aux.compra.minimo = c[4];
                                    aux.compra.maximo = c[5];

                                    aux.venda = {}
                                    aux.venda.moedaid = c[6];
                                    //aux.venda.moeda      = idMoedaVenda.label;
                                    aux.venda.valor = c[7];
                                    aux.venda.tpvlr = c[8];
                                    aux.venda.minimo = c[9];
                                    aux.venda.maximo = c[10];

                                    aux.compraCL = {}
                                    aux.compraCL.moedaid = c[11];
                                    //aux.compraCL.moeda   = (idMoedaCompraCL.label == undefined) ? "" : idMoedaCompraCL.label;
                                    aux.compraCL.valor = c[12];
                                    aux.compraCL.tpvlr = c[13];
                                    aux.compraCL.minimo = c[14];
                                    aux.compraCL.maximo = c[15];

                                    aux.vendaCL = {}
                                    aux.vendaCL.moedaid = c[16];
                                    // aux.vendaCL.moeda    = (idMoedaVendaCL.label == undefined) ? "" : idMoedaVendaCL.label;
                                    aux.vendaCL.valor = c[17];
                                    aux.vendaCL.tpvlr = c[18];
                                    aux.vendaCL.minimo = c[19];
                                    aux.vendaCL.maximo = c[20];

                                    aux.opcao = c[34]

                                    //console.log(aux);

                                    $scope.objContainers.push(aux);

                                    $scope.rangeContainers += c[0] + "|" + c[1] + "|" + c[2] + "|" + c[3] + "|" + c[4] + "|" + c[5] + "|" + c[6] + "|" + c[7] + "|" + c[8] + "|" + c[9] + "|" + c[10] + "|" + c[11] + "|" + c[12] + "|" + c[13] + "|" + c[14] + "|" + c[15] + "|" + c[16] + "|" + c[17] + "|" + c[18] + "|" + c[19] + "|" + c[20] + "|" + c[21] + "|" + c[22] + "|" + c[23] + "|" + c[24] + "|" + c[25] + "|" + c[26] + "|" + c[27] + "|" + c[28] + "|" + c[29] + "|" + c[30] + "|" + c[31] + "|" + c[32] + "|" + c[33] + "|" + c[34] + "|";
                                })

                            });
                        }
                    });

                });
            }, function() {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.moedaCompraChange = function(row) {
            if (row.venda.moeda == "" || row.venda.moeda == null) {
                row.venda.moeda = JSON.parse(JSON.stringify(row.compra.moeda));
            }
        }

        $scope.modPgtoCompraChange = function(row) {
            if (row.venda.modPgto == "" || row.venda.modPgto == null) {
                row.venda.modPgto = JSON.parse(JSON.stringify(row.compra.modPgto));
            }
        }

        $scope.compraValorBlur = function(row) {
            if (row.venda.valor == "" || row.venda.valor == null) {
                row.venda.valor = JSON.parse(JSON.stringify(row.compra.valor));
            }
        }

        $scope.valorPorCompraChange = function(row) {
            if (row.venda.valorPor == "" || row.venda.valorPor == null) {
                row.venda.valorPor = JSON.parse(JSON.stringify(row.compra.valorPor));
            }
        }

        // table

        $scope.lsTbContainer = [];

        $scope.addContainerRow = function() {
            container = {};
            container.compra = {};
            container.compra.moeda = '';
            container.compra.modPgto = '';
            container.compra.valor = '';
            container.compra.valorPor = '';
            container.compra.valorMin = '';
            container.compra.valorMax = '';
            container.venda = {};
            container.venda.moeda = '';
            container.venda.modPgto = '';
            container.venda.valor = '';
            container.venda.valorPor = '';
            container.venda.valorMin = '';
            container.venda.valorMax = '';
            container.editable = true;
            $scope.lsTbContainer.unshift(container);
        }

        $scope.removeContainer = function(index) {
            $scope.lsTbContainer.splice(index, 1);
        }

        $scope.cloneContainer = function(index) {
            var container = $scope.lsTbContainer[index];
            container = JSON.parse(JSON.stringify(container))
            container.editable = true;
            $scope.lsTbContainer.push(container);
        }


        $scope.applyCalcVolume = function(row) {
            //if (!row.L.length || !row.W.length || !row.H.length || !row.volumeUnit.length) return;
            var L = row.L;
            var W = row.W;
            var H = row.H;

            if (row.unitH == "Cm") {
                L /= 100;
                W /= 100;
                H /= 100;
            } else if (row.unitH == "In") {
                L = inchToMeter(L);
                W = inchToMeter(W);
                H = inchToMeter(H);
            }

            if (row.volumeUnit == "CBM") {
                row.Volume = calcCBM(L, W, H, 1);
            } else if (row.volumeUnit == "CFT") {

                row.Volume = calcCFT(L, W, H, 1);
            }
        }

        // L, W, H = meter
        var calcCBM = function(L, W, H, quantity) {
            return L * W * H * quantity;
        }

        // L, W, H  = meter
        var calcCFT = function(L, W, H, quantity) {
            var lIn = meterToInch(L);
            var wIn = meterToInch(W);
            var hIn = meterToInch(H);

            return (lIn / 12) * (wIn / 12) * (hIn / 12) * quantity;
        }

        var meterToInch = function(value) {
            return value / 0.0254;
        }

        var inchToMeter = function(value) {
            return value * 0.0254;
        }

        var meterToFeet = function(value) {
            return value / 0.3048;
        }

        var feetToMeter = function(value) {
            return value * 0.3048;
        }

        var kgToPound = function(value) {
            return value / 0.45359237;
        }

        var poundToKg = function(value) {
            return value * 0.45359237;
        }

        init();
    })
    .controller('ModalInstanceCtrl', function($scope, $uibModalInstance, buscaWS) {
        $scope.listaLog;
        $scope.itemsByPage = 25;

        buscaWS.get('/WVDF_WS/ws_log3000.wso/f_LOG3000_Report/JSON', 'sInicio=').then(function(data) {
            $scope.listaLog = data;
            $scope.totalItems = data.length;
        });

        $scope.modalok = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.apagarLog = function(sRecnum) {
            buscaWS.get('/WVDF_WS/ws_log3000.wso/f_LOG3000_DELETE/JSON', 'sRecnum=' + sRecnum).then(function(data) {
                parent.parent.parent.alertify.success(data);

                buscaWS.get('/WVDF_WS/ws_log3000.wso/f_LOG3000_Report/JSON', 'sInicio=').then(function(data) {
                    $scope.listaLog = data;
                    $scope.totalItems = data.length;
                });
            });
        };

        $scope.posicionaLog = function(sRecnum) {
            $uibModalInstance.close(sRecnum);
        };

    });
