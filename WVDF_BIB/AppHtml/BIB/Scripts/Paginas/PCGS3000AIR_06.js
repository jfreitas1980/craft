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

var Url = {
    getInfo: function() {
        var query = window.location.href;
        this.url = query.split("?")[0];
        var vars = query.split("?")[1].split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1]);
            if (typeof this[key] === "undefined") {
                this[key] = decodeURIComponent(value);
            } else if (typeof this[key] === "string") {
                var arr = [this[key], decodeURIComponent(value)];
                this[key] = arr;
            } else {
                this[key].push(decodeURIComponent(value));
            }
        }
    }
}

Url.getInfo();

// ANGULAR JS
var app = angular.module('pcgs300006App', ['ui.bootstrap', 'diretivas', 'smart-table', 'ngTagsInput', 'ngAnimate',
    'angularSoap', 'toaster', 'datatables', 'datatables.buttons'
]);

app.config(function(tagsInputConfigProvider) {
    tagsInputConfigProvider.setDefaults('tagsInput', { placeholder: '' });
    tagsInputConfigProvider.setActiveInterpolation('tagsInput', { placeholder: true });
});

app.directive('enforceMaxTags', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {

            var maxTags = attrs.maxTags ? parseInt(attrs.maxTags, '10') : null;

            ngModelCtrl.$validators.checkLength = function(value) {

                if (value && maxTags && value.length > maxTags) {
                    value.splice(value.length - 1, 1);
                }
                return value ? value : [];
            };
        }
    };
});

app.factory('buscaWS', function($http) {
        return {
            get: function(url, parametros) {
                return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                    return res.data;
                }, function(response) {
                    //console.log('Status: ' + response.status);
                    //console.log('Error: ' + response.data);
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
        $scope.tarifario = {
            aRecnum: 0,
            via: [],
            cargoLimits: {},
            venda: {},
            compra: {},
            imo: ''
        };
        $scope.tarifario2 = {};
        $scope.Url = Url;
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
        $scope.lsTpCalculo = [];
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
            getTpCalc();
            getNivelFrete();

            callWS.get('/WVDF_WS/ws_ccgs201.wso/f_CCGS201_combo/JSON', { 'aUsuarioSessao': aUsuarioSessao, 'aService': 'N' }).then(function(response) {
                $scope.lsService1 = response.data;
            });

            callWS.get('/WVDF_WS/ws_ccgs201.wso/f_CCGS201_combo/JSON', { 'aUsuarioSessao': aUsuarioSessao, 'aService': 'Y' }).then(function(response) {
                $scope.lsService2 = response.data;
            });

            callWS.get('/WVDF_WS/ws_ccgs220.wso/f_combo_tpcalc/JSON', {
                'aUsuarioSessao': aUsuarioSessao,
                'aModal': 'A'
            }).then(function(response) {
                $scope.lstpCalculo = response.data;
            });


            callWS.get('/WVDF_WS/ws_ccgs206.wso/listarModPgto/JSON', { 'aUsuarioSessao': aUsuarioSessao, 'aService': 'Y' }).then(function(response) {
                $scope.lsModPagto = response.data;
            });


            if (Url.tipo && Url.aTarifa) {
                $("#tab-tarifario").hide();
                $("#tab-tarifario").removeClass("active");
                $("#tab-create").addClass("active");
                $("#tarifario").removeClass("active in");
                $("#create").addClass("active in");
                $("#tarifario").hide();
                Fingerprint2.getLocalHash().then(function(hash) {
                    let params = { 'aUsuarioSessao': aUsuarioSessao, 'aRecnum': Url.aTarifa };
                    params.aFingerPrint = hash;
                    let callUrl = "";

                    if (Url.tipo == 'F') {
                        callUrl = "/WVDF_WS/ws_pricing.wso/fFindAirFreightByRecord/JSON";
                    } else {
                        callUrl = "/WVDF_WS/ws_pricing.wso/fFindAirLocalTaxByRecord/JSON";
                    }

                    callWS.get(callUrl, params).then(function(response) {
                        let data = response.data;
                        $scope.tarifario = data.tarifario[0];


                        // $("#myTab [href=['#create']")[0].click();
                    });
                });
            }
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
                    //  //console.log(response);
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
            //console.log(data);
            $scope.classeTaxa = data;
            $scope.tarifario.classe = $scope.classeTaxa[2].ID;
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

        var getValorPor = function() {
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'sTP_C': '' };
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
                    //   //console.log(response);
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

        $scope.oSelect = function() {
            /* let arr = {};
             arr.via = [];
             arr.via.push($scope.tarifario.pol);
             $scope.tarifario.via.push(arr);*/

            $scope.tarifario.viaText = $scope.tarifario.pol.iata + "-" + $scope.tarifario.pod.iata;
        }

        $scope.dSelect = function() {
            /* let arr = {};
             arr.via = [];
             arr.via.push($scope.tarifario.pod);
             $scope.tarifario.via.push(arr);*/

            $scope.tarifario.viaText = $scope.tarifario.pol.iata + "-" + $scope.tarifario.pod.iata;
        }

        $scope.getTaxas = function() {
            //console.log("log");
            $scope.loadingState = true;
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'idClasse': $scope.tarifario.classe };
            //console.log(params);
            callWS.get('/WVDF_WS/ws_HCGS3001.wso/fSerchComboTaxes/JSON', params)
                .then(function(response) {
                    //     //console.log(response);
                    $scope.lsTaxas = response.data;
                    console.log("response");
                    $scope.tarifario.taxa = $scope.lsTaxas[10].id;
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
            //console.log(params);
            callWS.get('/WVDF_WS/ws_HCGS3001.wso/fSerchComboTaxes/JSON', params)
                .then(function(response) {
                    //     //console.log(response);
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
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'aModal': 'A' };
            callWS.get('/WVDF_WS/ws_ccgs220.wso/f_combo_tpcalc/JSON', params)
                .then(function(response) {
                    $scope.lsTpCalculo = response.data;
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
                    $scope.tarifario.tpServico = $scope.lsModalidades[0].ID;
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
                    ////console.log(error);
                    ////console.log($scope.tarifario.taxa);
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
        //             ////console.log(error);
        //             ////console.log($scope.tarifario.taxa);
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
                    //  //console.log(response);
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
                    //console.log(response);
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
                    //   //console.log(response);
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
            if (texto.length < 3) return;

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
            return buscaWS.get('/WVDF_WS/ws_csag343.wso/f_bCSAG343_cia_aerea/JSON', 'aInicial=' + texto).then(function(data) {
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
            // debugger;
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
                //console.log(data);
                return data;
            });
        };

        $scope.acIncoterm = function(texto) {
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'sInicio': texto };
            return callWS.get('/WVDF_WS/ws_ccgs223.wso/fbIncoterm/JSON', params)
                .then(function(response) {
                    //    $scope.loadingState = false;
                    return response.data;
                });
        }


        // aux as aux.value for aux in call(WVDF.ws_csag325.propostaCidadeOrigem(info.form.paisOrigem, $viewValue, info.form.modFrete, Url.idCliente, Url.aUsuarioSessao))-->
        $scope.acIata = function(sPais, sCidade) {
            //if(sCidade.length < 3) return;
            var params = {
                'sPais': sPais ? sPais : '',
                'sCidade': sCidade,
                'sMod': $scope.tarifario.tpServico ? $scope.tarifario.tpServico : '',
                'sCliente': '',
                'aUsuarioSessao': aUsuarioSessao
            }
            //console.log(params);

            return callWS.get('/WVDF_WS/ws_csag325.wso/propostaCidadeOrigem/JSON', params)
                .then(function(response) {
                    //console.log(response);
                    return response.data;
                });
        }

        $scope.classeChange = function() {
            $scope.tarifario.pol = "";
            $scope.tarifario.pod = "";
        }

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
            if (texto.length < 3) return;
            var params = { 'aUsuarioSessao': aUsuarioSessao, 'aInicial': texto };

            return callWS.get('/WVDF_WS/ws_ccgs218.wso/buscarMoeda/JSON', params)
                .then(function(response) {

                    return response.data;
                });
        };

        $scope.acComments = function(texto) {
            if (texto.length < 3) return;
            if (!$scope.tarifario.classe) return;

            var params = { 'aUsuarioSessao': aUsuarioSessao, 'aClasse': $scope.tarifario.classe, 'aInicio': texto };

            return callWS.get('/WVDF_WS/ws_hcgs3001.wso/fResearchTaxsbyClass/JSON', params)
                .then(function(response) {

                    return response.data;
                });
        }

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
            // if (!$scope.tarifario.clienteDireto && !$scope.tarifario.coloader) {
            //     window.parent.$("body").animate({ scrollTop: 0 }, 'slow');
            //     toaster.pop('error', "Error",
            //         ('E necessario selecionar ao menos uma das opcoes: "Cliente Direto" ou "Co-loader"'),
            //         null, 'trustedHtml');

            //     return;
            // }

            if ($scope.tarifario.taxa == undefined || $scope.tarifario.taxa == '') {
                window.parent.$("body").animate({ scrollTop: 0 }, 'slow');
                toaster.pop('error', "Error",
                    ('E necessario selecionar ao menos uma Taxa!'),
                    null, 'trustedHtml');
                return;
            }

            if ($scope.tarifario.taxa.id == '9F') {
                if ($scope.tarifario.pod !== undefined) {
                    if ($scope.tarifario.pod.length > 0) {
                        if ($scope.tarifario.agenteDestino == undefined || $scope.tarifario.agenteDestino == '') {
                            toaster.pop('error', "Error", ('NECESSARIO AGENTE DE DESTINO!'), null, 'trustedHtml');
                            return;
                        }
                        // if ($scope.tarifario.terminalDestino == undefined || $scope.tarifario.agenteDestino == '') {
                        //     toaster.pop('error', "Error",('NECESSARIO TERMINAL DE DESTINO!'),null, 'trustedHtml');
                        //     return;   
                        // }
                    }
                }
                if ($scope.tarifario.pol !== undefined) {
                    if ($scope.tarifario.pol.length > 0) {
                        if ($scope.tarifario.agenteOrigem == undefined || $scope.tarifario.agenteDestino == '') {
                            toaster.pop('error', "Error", ('NECESSARIO AGENTE DE ORIGEM!'), null, 'trustedHtml');
                            return;
                        }
                        // if ($scope.tarifario.terminalOrigem == undefined || $scope.tarifario.agenteDestino == '') {
                        //     toaster.pop('error', "Error",('NECESSARIO TERMINAL DE ORIGEM!'),null, 'trustedHtml');
                        //     return;   
                        // }
                    }
                }
            }

            $scope.loadingState = true;
            $scope.tarifario.aUsuarioSessao = aUsuarioSessao;
            $scope.tarifario.lsTbContainer = $scope.lsTbContainer;
            //console.log($scope.tarifario);
            var entidade = JSON.stringify($scope.tarifario);


            callWS.get('/WVDF_WS/ws_HCGS3000.wso/fGravarHCGS3000/JSON', { 'sJSON': $scope.tarifario }).then(function(response) {

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
             ////console.log($scope.cntr.equipamento);
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

        // remember start
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
            } else
                obj[arr[0]] = val;

            return obj;

        }

        var fields = '';

        $scope.makeFieldToRemember = function(_fields) {
            fields = _fields;
        }

        $scope.btnRememberThis = function() {
            ////console.log(fields);
            if (fields == undefined || fields == '') return;

            var field = fields.replace(/\s/g, "").split("&&");

            for (var i = field.length - 1; i >= 0; i--) {
                var model = $parse(field[i]);
                // //console.log(model($scope));
                $scope.manutencaoModelClear = addProps($scope.manutencaoModelClear, field[i].replace('manutencao.', ''), model($scope));
            }

            //console.log($scope.manutencaoModelClear);
            // model.assign($scope, 42);
        }

        $scope.btnForgetThis = function() {
            if (fields == undefined || fields == '') return;

            var field = fields.replace(/\s/g, "").split("&&");

            for (var i = field.length - 1; i >= 0; i--) {
                var model = $parse(field[i]);
                ////console.log(model($scope));
                $scope.manutencaoModelClear = addProps($scope.manutencaoModelClear, field[i].replace('manutencao.', ''), '');
            }

            //console.log($scope.manutencaoModelClear);
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
            $scope.tarifario.cargoLimits = {};
            $scope.tarifario.aRecnum = 0;
            //         $scope.tarifario.lsCntr = [];
            $scope.cntr = {};
            $scope.cntr.equipamento = [];
            getContainer();
            $scope.lsContratos = [];
            // $scope.lsClasseTaxa = [];
            $scope.classeTaxa = [];
        }

        $scope.btnViaShow = false;

        $scope.$watch('tarifario.pol', function() {

            if (($scope.tarifario.pol == '' || $scope.tarifario.pol == undefined) || ($scope.tarifario.pod == '' || $scope.tarifario.pod == undefined)) {
                $scope.btnViaShow = false;
            } else {
                $scope.btnViaShow = true;
            }
        });

        $scope.$watch('tarifario.pod', function() {
            if (($scope.tarifario.pol == '' || $scope.tarifario.pol == undefined) || ($scope.tarifario.pod == '' || $scope.tarifario.pod == undefined)) {
                $scope.btnViaShow = false;
            } else {
                $scope.btnViaShow = true;
            }
        });

        $scope.addVia = function() {

            $scope.tarifario.via.push({});
        }

        $scope.viaDeleteTag = function(index) {
            $scope.tarifario.via.splice(index, 1);
        }
        $scope.tarifario.viaText = '';

        $scope.$watch("tarifario.via", function() {
            if (!$scope.tarifario) return;
            if ($scope.tarifario.pol && $scope.tarifario.pod) {
                let str = $scope.tarifario.pol.iata;

                angular.forEach($scope.tarifario.via, function(value, i) {
                    str += "-"
                    angular.forEach(value.via, function(vvalue, ii) {
                        if (ii > 0) str += "/";
                        str += vvalue.iata;
                    });
                });

                str += "-" + $scope.tarifario.pod.iata;
                $scope.tarifario.viaText = str;
            }
        }, true);
        $scope.viaTagChange = function() {

        }

        $scope.alertify = {
            success: function(message) {
                message = message || '';
                parent.parent.alertify.success(message);
            },
            error: function(message) {
                message = message || '';
                parent.parent.alertify.error(message);
            }
        }

        $scope.rememberData = {};
        $scope.remember = function(tarifario) {
            $scope.rememberData.tarifario = angular.copy(tarifario);
        }

        $scope.loadRemember = function() {
            $scope.tarifario = angular.copy($scope.rememberData.tarifario) || {};
            $scope.tarifario.aRecnum = 0;
            $scope.tarifario.tpServico = $scope.lsModalidades[0].ID;
        }

        $scope.deleteForm = function() {
            if ($scope.tarifario.classe == 'F') {
                Fingerprint2.getLocalHash().then(function(hash) {
                    let params = { 'aUsuarioSessao': aUsuarioSessao, 'aRecnum': $scope.tarifario.aRecnum };
                    params.aFingerPrint = hash;
                    callWS.get('/WVDF_WS/ws_pricing.wso/fdeleteAirFreight/JSON', params).then(function(response) {
                        let data = response.data;

                        if (!data.hasError) {
                            $scope.alertify.success(data.msgInfo);
                            $scope.clearForm();
                        } else {
                            $scope.alertify.error(data.msgError);
                            $scope.clearForm();
                        }
                    });
                });
            } else {
                Fingerprint2.getLocalHash().then(function(hash) {
                    let params = { 'aUsuarioSessao': aUsuarioSessao, 'aRecnum': $scope.tarifario.aRecnum };
                    params.aFingerPrint = hash;
                    callWS.get('/WVDF_WS/ws_pricing.wso/fdeleteAirLocalTax/JSON', { 'aJSON': params }).then(function(response) {
                        let data = response.data;

                        if (!data.message.hasError) {
                            $scope.alertify.success(data.message.msgInfo);
                            $scope.clearForm();
                        } else {
                            $scope.alertify.error(data.message.msgError);
                            $scope.clearForm();
                        }
                    });
                });
            }
        }

        $scope.acProvincia = function(pais, query) {
            pais = pais || '';

            return buscaWS.get('/WVDF_WS/ws_csag331.wso/fbUfProvincia/JSON', 'aPais=' + pais + '&aInicio=' + query).then(function(data) {
                return data;

            });
        }

        $scope.sellingChange = function() {
            console.log($scope.tarifario.compra.tpCalc);
            $scope.tarifario.compra.valor = $scope.tarifario.compra.valor || $scope.tarifario.venda.valor;
            $scope.tarifario.compra.moeda = $scope.tarifario.compra.moeda || $scope.tarifario.venda.moeda;
            $scope.tarifario.compra.tpCalc = $scope.tarifario.compra.tpCalc || $scope.tarifario.venda.tpCalc;
            $scope.tarifario.compra.valorMin = $scope.tarifario.compra.valorMin || $scope.tarifario.venda.valorMin;
            $scope.tarifario.compra.valorMax = $scope.tarifario.compra.valorMax || $scope.tarifario.venda.valorMax;
            $scope.tarifario.compra.modPagto = $scope.tarifario.compra.modPagto || $scope.tarifario.venda.modPagto;
        }

        $scope.clearForm = function() {
            $scope.tarifario = {};
            $scope.tarifario.venda = {};
            $scope.tarifario.compra = {};
            $scope.tarifario.tpServico = $scope.lsModalidades[0].ID;
            $scope.tarifario.imo = '';
        }

        $scope.saveForm = function(tarifario) {
            tarifario.aUsuarioSessao = aUsuarioSessao;
            if (tarifario.frequency) tarifario.frequency.DS2 = '';
            if (tarifario.agenteOrigem) tarifario.agenteOrigem.recId = '';
            if (tarifario.agenteDestino) tarifario.agenteDestino.recId = '';

            if ($scope.tarifario.classe == 'F') {
                Fingerprint2.getLocalHash().then(function(hash) {

                    tarifario.aFingerPrint = hash;
                    let params = { tarifario: tarifario };
                    let nparams  =  {
                          "tarifario":
                           {
                             "aUsuarioSessao": aUsuarioSessao || '',
                             "aFingerPrint": hash || '',
                             "aRecnum": tarifario?.aRecnum || '',
                             "tpServico":  tarifario?.tpServico || '',
                             "classe": tarifario?.classe || '',
                             "taxa": tarifario?.taxa || '',
                             "carrier": tarifario?.carrier?.id || '',
                             "pol": tarifario?.pol?.iata || '',
                             "pod": tarifario?.pod?.iata || '',
                             "type": tarifario?.type || '',
                             "service": tarifario?.service || '',
                             "agenteOrigem": tarifario?.agenteOrigem?.id,
                             "paisOrigem": tarifario?.paisOrigem || '',
                             "paisDestino": tarifario?.paisDestino || '',
                             "transitTime": tarifario?.transitTime || '',
                             "dataInicial": tarifario?.dataInicial || '',
                             "frequency": tarifario?.frequency?.ID || '',
                             "cargoType": tarifario?.cargoType || '',
                             "viaText": tarifario?.viaText || '',
                             "obsText": tarifario?.obsText || '',
                             "cargoLimits":
                             {
                               "moeda": tarifario?.cargoLimits?.moeda?.ID || '',
                               "minimum": tarifario?.cargoLimits?.minimum || '',
                               "minus_45": tarifario?.cargoLimits?.minus_45 || '',
                               "plus_45": tarifario?.cargoLimits?.plus_45 || '',
                               "plus_100": tarifario?.cargoLimits?.plus_100 || '',
                               "plus_300": tarifario?.cargoLimits?.plus_300 || '',
                               "plus_500": tarifario?.cargoLimits?.plus_500 || '',
                               "plus_1000": tarifario?.cargoLimits?.plus_1000 || '',
                               "dimLenght": tarifario?.cargoLimits?.dimLenght || '',
                               "dimWidth": tarifario?.cargoLimits?.dimWidth || '',
                               "dimHeight": tarifario?.cargoLimits?.dimHeight || '',
                               "dimWeight": tarifario?.cargoLimits?.dimWeight || '',
                             },
                             "comments":
                             {
                               "comments1": tarifario?.comments?.comments1?.id || '',
                               "min1": tarifario?.comments?.min1 || '',
                               "value1": tarifario?.comments?.value1 || '',
                               "per1": tarifario?.comments?.per1?.ID || '',
                               "comments2": tarifario?.comments?.comments2?.id || '',
                               "min2": tarifario?.comments?.min2 || '',
                               "value2": tarifario?.comments?.value2 || '',
                               "per2": tarifario?.comments?.per2?.ID || '',
                               "comments3": tarifario?.comments?.comments3?.id || '',
                               "min3": tarifario?.comments?.min3 || '',
                               "value3": tarifario?.comments?.value3 || '',
                               "per3": tarifario?.comments?.per3?.ID || ''
                             }
                           }
                    }

                    tarifario.via = tarifario.via || [];
                    nparams.tarifario.via = tarifario?.via?.map(function(i) { return i.iata }) || [];

                    $http.post('/WVDF_WS/ws_pricing.wso/fsaveAirFreight/JSON', nparams).then(function(response) {
                        let data = response.data;

                        if (!data.message.hasError) {
                            $scope.alertify.success(data.message.msgInfo);
                            $scope.tarifario = data.tarifario[0];
                        } else {
                            $scope.alertify.error(data.message.msgError);
                        }
                    });
                });
            } else {
                Fingerprint2.getLocalHash().then(function(hash) {

                    tarifario.aFingerPrint = hash;
                    let params = { tarifario: tarifario };
                    let nparams = {
                        "tarifario": {
                            "aUsuarioSessao": aUsuarioSessao || '',
                            "aFingerPrint": hash || '',
                            "aRecnum": tarifario.aRecnum || '',
                            "tpServico": tarifario?.tpServico || '',
                            "classe": tarifario?.classe || '',
                            "taxa": tarifario?.taxa || '',
                            "carrier": tarifario?.carrier?.id || '',
                            "imo": tarifario?.imo || '', //bool e não string,
                            "dataInicial": tarifario?.dataInicial || '',
                            "dataFinal": tarifario?.dataFinal || '',
                            "cargoLimits": {
                                "dimLenght": tarifario?.cargoLimits?.dimLenght || '',
                                "dimWidth": tarifario?.cargoLimits?.dimWidth || '',
                                "dimHeight": tarifario?.cargoLimits?.dimHeight || '',
                                "dimWeight": tarifario?.cargoLimits?.dimWeight || '',
                                "weightTotal": tarifario?.cargoLimits?.weightTotal || '',
                                "weightUnidade": tarifario?.cargoLimits?.weightUnidade || '',
                                "volumeTotal": tarifario?.cargoLimits?.volumeTotal || '',
                                "volumeUnidade": tarifario?.cargoLimits?.volumeUnidade || '',
                                "ratioCBMKG": tarifario?.cargoLimits?.ratioCBMKG || '',
                                "cbmPerPCS": tarifario?.cargoLimits?.cbmPerPCS || ''
                            },
                            "compra": {
                                "moeda": tarifario?.compra?.moeda?.ID || '',
                                "valor": tarifario?.compra?.valor || '',
                                "valorMin": tarifario?.compra?.valorMin || '',
                                "valorMax": tarifario?.compra?.valorMax || '',
                                "tpCalc": tarifario?.compra?.tpCalc?.ID || '',
                                "modPagto": tarifario?.compra?.modPagto?.id || ''
                            },
                            "venda": {
                                "moeda": tarifario?.venda?.moeda?.ID || '',
                                "valor": tarifario?.venda?.valor || '',
                                "valorMin": tarifario?.venda?.valorMin || '',
                                "valorMax": tarifario?.venda?.valorMax || '',
                                "tpCalc": tarifario?.venda?.tpCalc?.ID || '',
                                "modPagto": tarifario?.venda?.modPagto?.id || ''
                            },
                            "terminalOrigem": tarifario?.terminalOrigem?.id || '',
                            "terminalDestino": tarifario?.terminalDestino?.id || '',
                            "agenteOrigem": tarifario?.agenteOrigem?.id || '',
                            "agenteDestino": tarifario?.agenteDestino?.id || '',
                            "oSubdivision": tarifario?.oSubdivision?.id || '',
                            "dSubdivision": tarifario?.dSubdivision?.id || '',
                            "paisOrigem": tarifario?.paisOrigem || '',
                            "paisDestino": tarifario?.paisDestino || '',
                            "transitTime": tarifario?.transitTime || '',
                            "frequency": tarifario?.frequency?.ID || '',
                            "obsText": tarifario?.obsText || '',
                            "nameDropdown": tarifario?.nameDropdown || ''
                        }
                    }

                   
                    tarifario.pol = tarifario.pol || [];
                    tarifario.pod = tarifario.pod || [];
                    tarifario.incoterm = tarifario.incoterm || [];

                    nparams.tarifario.pol = tarifario?.pol?.map(function(i) { return i.iata }) || [];
                    nparams.tarifario.pod = tarifario?.pod?.map(function(i) { return i.iata }) || [];
                    nparams.tarifario.incoterm = tarifario.incoterm?.map(function(i) { return i.id }) || [];

                    $http.post('/WVDF_WS/ws_pricing.wso/fsaveAirLocalTax/JSON', nparams).then(function(response) {
                        let data = response.data;

                        if (!data.message.hasError) {
                            $scope.alertify.success(data.message.msgInfo);
                            $scope.tarifario = data.tarifario[0];
                        } else {
                            $scope.alertify.error(data.message.msgError);
                        }
                    });
                });
            }
        }

        // Modal LOG
        // $scope.modal = function(size) {
        //     parent.scrollTo(0, 0);

        //     var modalInstance = $uibModal.open({
        //         templateUrl: 'myModalContent.html',
        //         controller: 'ModalInstanceCtrl',
        //         size: 'lg'
        //     });

        //     modalInstance.result.then(function(sRecnum) {
        //         parent.scrollTo(0, 0);

        //         buscaWS.get('/WVDF_WS/ws_log3000.wso/f_LOG3000_Zoom/JSON', 'sRecnum=' + sRecnum).then(function(data) {
        //             $scope.mMarca = data.CSAG308_ID;
        //             $scope.mProduto = data.CCGS210_ID;
        //             $scope.changeProduto();
        //             $scope.mTaxa = data.TAXA_ID;
        //             $scope.changeTaxa();
        //             $scope.mDescricao = data.DESCRICAO;
        //             $scope.sExibeTC = parseInt(data.ID_COMERCIAL);
        //             $scope.sExibeTO = parseInt(data.ID_OPERACIONAL);
        //             $scope.sPaga = parseInt(data.ID_PAGA);
        //             $scope.sRecebe = parseInt(data.ID_RECEBE);
        //             $scope.mIncoterm = data.INCOTERM;
        //             $scope.mTransit = data.TRANSIT_TIME;
        //             // $scope.mTrade = parseInt(data.CSAG379_ID);
        //             $scope.mPais = data.CSAG329_ID;
        //             // data.CSAG325_ORIGEM
        //             // data.CSAG345
        //             // data.CSAG346_ID_ORIG
        //             // data.CSAG325_DESTINO
        //             $scope.sDTA = (data.ID_POD_DTA);
        //             $scope.sDireto = (data.ID_POD_DIRETO);
        //             // $scope.mVia       = {};
        //             // $scope.mVia.id    = data.CSAG325_VIA;
        //             // $scope.mVia.value = data.CSAG325_VIA_DS;
        //             // data.CSAG346_ID_DEST
        //             $scope.mApartir = data.ID_DT_APARTIR.split(',');
        //             $scope.mDataInicial = data.DT_INICIAL;
        //             $scope.mDataFinal = data.DT_FINAL;
        //             $scope.mDataInicialSub = data.DT_INICIALSUB;
        //             $scope.mDataFinalSub = data.DT_FINALSUB;
        //             $scope.mFrequencia = (data.FREQUENCIA);
        //             $scope.mObservacoes = data.OBSERVACOES;
        //             $scope.sIMO = (data.ID_IMO);
        //             $scope.sStackable = (data.ID_NOTSTACKBLE);
        //             $scope.sPersonnal = (data.ID_PERSONNAL);

        //             // Tratamento listas.
        //             // Carrier
        //             // lsCarrier
        //             data.lsCarrier.forEach(function(aux) {
        //                 aux['id'] = aux['sid'];
        //                 aux['label'] = aux['slabel'];
        //                 aux['value'] = aux['svalue'];
        //                 aux['recnum'] = aux['srecnum'];

        //                 delete aux['sid'];
        //                 delete aux['slabel'];
        //                 delete aux['svalue'];
        //                 delete aux['srecnum'];

        //                 $scope.lsCarrier.push(aux);
        //             });

        //             // POL
        //             // lsPOL
        //             data.lsPOL.forEach(function(aux) {
        //                 $scope.lsPOL.push(aux);
        //             });

        //             // POD
        //             // lsPOL
        //             data.lsPOD.forEach(function(aux) {
        //                 $scope.lsPOD.push(aux);
        //             });

        //             // Agente
        //             // lsAgente
        //             data.lsAgente.forEach(function(aux) {
        //                 aux['id'] = aux['sid'];
        //                 aux['label'] = aux['slabel'];
        //                 aux['value'] = aux['svalue'];
        //                 aux['recnum'] = aux['srecnum'];

        //                 delete aux['sid'];
        //                 delete aux['slabel'];
        //                 delete aux['svalue'];
        //                 delete aux['srecnum'];

        //                 $scope.lsAgente.push(aux);
        //             });

        //             // Terminal Origem
        //             // lsTerminalOrigem
        //             data.lsTerminalOrigem.forEach(function(aux) {
        //                 aux['id'] = aux['sid'];
        //                 aux['label'] = aux['slabel'];
        //                 aux['value'] = aux['svalue'];
        //                 aux['recnum'] = aux['srecnum'];

        //                 delete aux['sid'];
        //                 delete aux['slabel'];
        //                 delete aux['svalue'];
        //                 delete aux['srecnum'];

        //                 $scope.lsTerminalOrigem.push(aux);
        //             });

        //             // Terminal Destino
        //             // lsTerminalDestino
        //             data.lsTerminalDestino.forEach(function(aux) {
        //                 aux['id'] = aux['sid'];
        //                 aux['label'] = aux['slabel'];
        //                 aux['value'] = aux['svalue'];
        //                 aux['recnum'] = aux['srecnum'];

        //                 delete aux['sid'];
        //                 delete aux['slabel'];
        //                 delete aux['svalue'];
        //                 delete aux['srecnum'];

        //                 $scope.lsTerminalDestino.push(aux);
        //             });

        //             parent.parent.alertify.confirm('Carregar containers?', function(e) {
        //                 parent.scrollTo(0, 0);
        //                 if (e) {
        //                     buscaWS.get('/WVDF_WS/ws_log3000.wso/f_LOG3000_zCntr/JSON', 'sRecnum=' + sRecnum).then(function(data) {
        //                         c = data.split('|');

        //                         var arrays = [];

        //                         while (c.length > 0)
        //                             arrays.push(c.splice(0, 35));

        //                         arrays.forEach(function(c) {
        //                             // Monta objeto para mostrar na tela
        //                             var aux = {};

        //                             aux.container = c[0];

        //                             aux.compra = {}
        //                             aux.compra.moedaid = c[1];
        //                             // aux.compra.moeda     = idMoedaCompra.label;
        //                             aux.compra.valor = c[2];
        //                             aux.compra.tpvlr = c[3];
        //                             aux.compra.minimo = c[4];
        //                             aux.compra.maximo = c[5];

        //                             aux.venda = {}
        //                             aux.venda.moedaid = c[6];
        //                             //aux.venda.moeda      = idMoedaVenda.label;
        //                             aux.venda.valor = c[7];
        //                             aux.venda.tpvlr = c[8];
        //                             aux.venda.minimo = c[9];
        //                             aux.venda.maximo = c[10];

        //                             aux.compraCL = {}
        //                             aux.compraCL.moedaid = c[11];
        //                             //aux.compraCL.moeda   = (idMoedaCompraCL.label == undefined) ? "" : idMoedaCompraCL.label;
        //                             aux.compraCL.valor = c[12];
        //                             aux.compraCL.tpvlr = c[13];
        //                             aux.compraCL.minimo = c[14];
        //                             aux.compraCL.maximo = c[15];

        //                             aux.vendaCL = {}
        //                             aux.vendaCL.moedaid = c[16];
        //                             // aux.vendaCL.moeda    = (idMoedaVendaCL.label == undefined) ? "" : idMoedaVendaCL.label;
        //                             aux.vendaCL.valor = c[17];
        //                             aux.vendaCL.tpvlr = c[18];
        //                             aux.vendaCL.minimo = c[19];
        //                             aux.vendaCL.maximo = c[20];

        //                             aux.opcao = c[34]

        //                             ////console.log(aux);

        //                             $scope.objContainers.push(aux);

        //                             $scope.rangeContainers += c[0] + "|" + c[1] + "|" + c[2] + "|" + c[3] + "|" + c[4] + "|" + c[5] + "|" + c[6] + "|" + c[7] + "|" + c[8] + "|" + c[9] + "|" + c[10] + "|" + c[11] + "|" + c[12] + "|" + c[13] + "|" + c[14] + "|" + c[15] + "|" + c[16] + "|" + c[17] + "|" + c[18] + "|" + c[19] + "|" + c[20] + "|" + c[21] + "|" + c[22] + "|" + c[23] + "|" + c[24] + "|" + c[25] + "|" + c[26] + "|" + c[27] + "|" + c[28] + "|" + c[29] + "|" + c[30] + "|" + c[31] + "|" + c[32] + "|" + c[33] + "|" + c[34] + "|";
        //                         })

        //                     });
        //                 }
        //             });

        //         });
        //     }, function() {
        //         //$log.info('Modal dismissed at: ' + new Date());
        //     });
        // };

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


        $scope.sellingRate = [];
        $scope.sellingRateAdd = function() {
            $scope.sellingRate.push({
                MIN: '',
                MINUS_45: '',
                PLUS_45: '',
                PLUS_100: '',
                PLUS_300: '',
                PLUS_500: '',
                PLUS_1000: '',
                LENGHT: '',
                WIDTH: '',
                HEIGHT: '',
                WEIGHT: '',
                editable: false
            });
        }

        $scope.sellingRateDel = function($index) {
            $scope.sellingRate.splice($index, 1);
        }

        $scope.sellingRateSave = function(row) {
            row.editable = false;
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