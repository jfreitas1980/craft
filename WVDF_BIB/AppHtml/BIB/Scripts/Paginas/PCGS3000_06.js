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

app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    let transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
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
    .controller('pcgs300006Controller', function($scope, buscaWS, $http, $uibModal, soapService, callWS, toaster, $sce) {
        $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON', {
            params: {
                aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
                sPrograma: 'pcgs3000_06'
            }
        })
        .then(function(res) {

            Object.keys(res.data).forEach(function(key) {

                var elemfolderName = document.createElement('textarea');
                elemfolderName.innerHTML = res.data[key];
                var folderName = elemfolderName.value;
                res.data[key] = $sce.trustAsHtml(elemfolderName.value);
            });

            $scope.literais = res.data;
        });

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
        // $scope.lsClasseTaxa = [];
        $scope.classeTaxa = [];
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
            // getClassesTaxa();
            getDescricao();
            getApartir();
            getTaxas();
            getIncoterm();
            getFrequencias();
            // getTrades();
            getPais(0, 'T');
            getModalidades();
            listarModPgto();
            $scope.getTpCalc();
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

        // var getClassesTaxa = function() {
        buscaWS.get('/WVDF_WS/ws_ccgs221.wso/f_class_tx/JSON', '').then(function(data) {
            console.log(data);
            $scope.classeTaxa = data;
        });
        // }

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

         $scope.getTaxas = function() {
            console.log("log");
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'idClasse': $scope.tarifario.classe };
            console.log(params);
            callWS.get('/WVDF_WS/ws_HCGS3001.wso/fSerchComboTaxes/JSON', params)
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
        var getTaxas = function() {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'idClasse': '' };
            console.log(params);
            callWS.get('/WVDF_WS/ws_HCGS3001.wso/fSerchComboTaxes/JSON', params)
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

        $scope.getTpCalc = function() {
            debugger;
            var aux;
            if ($scope.tarifario.tpServico == undefined) aux = '';
            else aux = $scope.tarifario.tpServico;

            var params = { 'aUsuarioSessao': aUsuarioSessao, 'aModal': aux };
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

        // var getClassesTaxa = function() {
        //     $scope.loadingState = true;
        //     var params = { 'aUsuarioSessao': aUsuarioSessao, 'sTaxaId': $scope.tarifario.taxa };
        //     callWS.get('/WVDF_WS/WS_HCGS3001.wso/f_classesSelTaxa/JSON', params)
        //         .then(function(response) {
        //             $scope.lsClasseTaxa = response.data;
        //             $scope.loadingState = false;
        //         }, function(error) {
        //             $scope.loadingState = false;
        //             //console.log(error);
        //             //console.log($scope.tarifario.taxa);
        //             toaster.pop({
        //                 type: 'error',
        //                 title: 'Error',
        //                 body: ("Error ao carregar Classes Taxa. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
        //                 bodyOutputType: 'trustedHtml'
        //             });
        //         });
        // };

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
            callWS.get('/WVDF_WS/ws_ccgs206.wso/listarModPgtoGuide/JSON', params)
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

        // $scope.changeTaxa = function() {
        //     $scope.lsClasseTaxa = [];
        //     $scope.tarifario.classeTaxa = {};
        //     getClassesTaxa();
        // }

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

        $scope.fChangeTipo = function(id) {
            // debugger;
            if (id == 8) { $scope.bPercent = true; } else { $scope.bPercent = false; }

            if (id == 3) { $scope.bPeso = true; } else { $scope.bPeso = false; }

        }

        $scope.fVerificaVirgula = function(texto) {
            texto = texto.replace('.', ',');
        }

        $scope.fChangePercent = function(id) {
            debugger;
            $scope.lsPercentTp = {};
            if (id == 1) {
                $scope.lsPercentTp = $scope.lsTaxas;
            }
            if (id == 2) {
                buscaWS.get('/WVDF_WS/WS_HCGS3001.wso/f_classes/JSON', '').then(function(data) {
                    $scope.lsPercentTp = data;
                });
            }
        }

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
            var params = { 'aUsuarioSessao': aUsuarioSessao };
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

        var fClearInvalidChar = function() {
            
            // texto = ;
        }

        $scope.btnWS = function() {
            if ($scope.tarifario.taxa == undefined || $scope.tarifario.taxa == '') {
                
                parent.parent.alertify.error('E necessario selecionar ao menos uma Taxa!');
                return;
            }

            //remove a trena do campo de observacao
            // $scope.tarifario.observacoes.replace('Â¨','');
            // $scope.tarifario.observacoes_ex.replace('Â¨','');

            if ($scope.tarifario.taxa.id == '9F') {
                if ($scope.tarifario.pod !== undefined) {
                    if ($scope.tarifario.pod.length > 0) {
                        if ($scope.tarifario.agenteDestino == undefined || $scope.tarifario.agenteDestino == '') {
                            parent.parent.alertify.error('NECESSARIO AGENTE DE DESTINO!');
                            return;
                        }
                    }
                }
                if ($scope.tarifario.pol !== undefined) {
                    if ($scope.tarifario.pol.length > 0) {
                        if ($scope.tarifario.agenteOrigem == undefined || $scope.tarifario.agenteDestino == '') {
                            parent.parent.alertify.error('NECESSARIO AGENTE DE ORIGEM!');
                            return;
                        }
                    }
                }
            }

            $scope.loadingState = true;
            $scope.tarifario.aUsuarioSessao = aUsuarioSessao;
            $scope.tarifario.lsTbContainer = $scope.lsTbContainer;
            console.log($scope.tarifario);
            var entidade = JSON.stringify($scope.tarifario);


            callWS.get('/WVDF_WS/ws_HCGS3000.wso/fGravarHCGS3000/JSON', { 'sJSON': $scope.tarifario }).then(function(response) {

                if (response["m:hasError"] == "true") {
                    parent.parent.alertify.error("Error ao gravar registro. <br/> Response: " + response["m:msgError"]);
                } else {
                    parent.parent.alertify.success("Registro: criado com sucesso.");
                }
            }, function(error) {
                parent.parent.alertify.error("Error ao gravar registro. <br/> Response: " + error.data);
            });

            $scope.loadingState = false;
        };

        $scope.manutencaoModelClear = {};
        $scope.btnManutencaoRemember = function(manutencao) {
            $scope.manutencaoModelClear = JSON.parse(angular.toJson(manutencao));
            $scope.manutencaoModelClear.idrecnum = '';
        }

        $scope.btnManutencaoForgetAll = function() {
            $scope.manutencaoModelClear = {};
        }

        function addProps(obj, arr, val) {

            if (typeof arr == 'string')
                arr = arr.split(".");

            obj[arr[0]] = obj[arr[0]] || {};

            var tmpObj = obj[arr[0]];

            if (arr.length > 1) {
                arr.shift();
                addProps(tmpObj, arr, val);
            } 
            else obj[arr[0]] = val;
            
            return obj;
        }

        var fields = '';

        $scope.makeFieldToRemember = function(_fields) {
            fields = _fields;
        }

        $scope.btnRememberThis = function() {
            if (fields == undefined || fields == '') return;

            var field = fields.replace(/\s/g, "").split("&&");

            for (var i = field.length - 1; i >= 0; i--) {
                var model = $parse(field[i]);
                $scope.manutencaoModelClear = addProps($scope.manutencaoModelClear, field[i].replace('manutencao.', ''), model($scope));
            }

            console.log($scope.manutencaoModelClear);
        }

        $scope.btnForgetThis = function() {
            if (fields == undefined || fields == '') return;

            var field = fields.replace(/\s/g, "").split("&&");

            for (var i = field.length - 1; i >= 0; i--) {
                var model = $parse(field[i]);
                $scope.manutencaoModelClear = addProps($scope.manutencaoModelClear, field[i].replace('manutencao.', ''), '');
            }

            console.log($scope.manutencaoModelClear);
        }
        // fim remember
        $scope.btnExcluiCntr = function(index, container) {
            for (var i = 0; i < container.length; i++) {
                $scope.lsContainer.push(container[i]);
            }
            $scope.lsContainer.sort(function(a, b) {
                return (a.DS > b.DS) ? 1 : ((b.DS > a.DS) ? -1 : 0);
            });
            $scope.mCContainer = $scope.lsContainer[0];
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
            $scope.cntr = {};
            $scope.cntr.equipamento = [];
            getContainer();
            $scope.lsContratos = [];
            $scope.classeTaxa = [];
        }

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

        //FUNCOES PARA O NOVO MODULO DO TARIFARIO
        buscaWS.get('/WVDF_WS/ws_CSAG319.wso/listaTipos/JSON', '').then(function(data) {
            debugger;
            $scope.lsTipoSuplier = data;
        });

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