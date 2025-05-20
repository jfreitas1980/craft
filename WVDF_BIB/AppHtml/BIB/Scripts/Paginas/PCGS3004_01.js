var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
var idVendedor = getVariavelURL('idVendedor');
var idCliente = getVariavelURL('idCliente');
var idProposta = getVariavelURL('idProposta');
var idClone = getVariavelURL('idClone');
var idProspect = getVariavelURL('Prospect');
var idAprovado = getVariavelURL('Booking');4
var idGuest = _USER.storage.get("aCx0127x_1");
var idTab = getVariavelURL('tab');
var urlPadrao = "http://server-bi2:8090";
//var urlPadrao = "https://crm.grupocraft.com.br:8090";
var urlAPIPadrao = "http://server-bi2:8092";
//var urlAPIPadrao = "https://crm.grupocraft.com.br:8092";

$(function() {
    $('.bs-example-modal-lg').on('show.bs.modal', function(e) {
        if (window.top.document.querySelector('iframe')) {
            $('.bs-example-modal-lg').css('top', window.top.scrollY);
        }
    });
});


$(document).on('click', '#tab5Link', function() {
    // $("#urltab5").attr({"src": "timeline_02.html?id=" + idProposta + '&aUsuarioSessao=' + aUsuarioSessao})
    $("#urltab5").attr({ "src": urlPadrao + '/freights/coordination/bookings/' + idProposta + '/logs?&aUsuarioSessao=' + aUsuarioSessao })
    //
});

//ABA BOOKING
$(document).on('click', '#tab6Link', function() {
    $("#urltab6").attr({ "src": urlPadrao + '/freights/coordination/bookings/' + idProposta + "/data?aUsuarioSessao=" + aUsuarioSessao })
});

//ABA DOCUMENTO
$(document).on('click', '#tab7Link', function() {
    $("#urltab7").attr({ "src": urlPadrao + '/freights/coordination/bookings/' + idProposta + "/files?aUsuarioSessao=" + aUsuarioSessao })
});

//ABA FOLLOW-UP
$(document).on('click', '#tab8Link', function() {
    $("#urltab8").attr({ "src": urlPadrao + '/freights/coordination/bookings/' + idProposta + "/follow-ups?aUsuarioSessao=" + aUsuarioSessao })
});

//ABA TRACKING
$(document).on('click', '#tab9Link', function() {
    $("#urltab9").attr({ "src": urlPadrao + '/freights/coordination/bookings/' + idProposta + "/trackings?aUsuarioSessao=" + aUsuarioSessao })
});

//NESHIP INTEGRACAI
$(document).on('click', '#tab10Link', function() {
    $("#urltab10").attr({ "src": urlPadrao + '/freights/coordination/bookings/' + idProposta + "/netship/integrations?aUsuarioSessao=" + aUsuarioSessao })
});


// ANGULAR JS
app = angular.module('propostaNovaApp', ['ngTagsInput', 'wsDominio', 'toaster', 'diretivas', 'ngMaterial', 'ui.bootstrap', 'ui.utils.masks', 'ngTable', 'ngSanitize']);

app.directive("typeaheadWatchChangesAll", function() {
    return {
        require: ["ngModel"],
        link: function(scope, element, attr, ctrls) {
            scope.$watch('thing', function(value) {
                ctrls[0].$setViewValue(value);
            });
        }
    };
});
app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                return res.data;
            });
        }
    };
});

app.directive("typeaheadWatchChanges", function() {
    return {
        require: ["ngModel"],
        link: function(scope, element, attr, ctrls) {
            scope.$watch('proposta.pol', function(value) {
                ctrls[0].$setViewValue(value);
            });
        }
    };
});

app.directive('numbersOnly', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
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


app.filter('FilterArray', function() {
    return function(inputArray, filterIDs) {
        if (angular.isUndefined(inputArray) || angular.isUndefined(filterIDs)) return;
        return inputArray.filter(function(entry) {
            return this.indexOf(entry.ID) !== -1;
        }, filterIDs);
    };
});

app.controller('comboCtrl', function($scope, buscaWS, callWS, $http) {

    $scope.alertify = parent.parent.alertify;

    var init = function() {
        if (getVariavelURL("debug")) return;
        getMoedas();
        getMarcas();
        getModPgto();
        getEmbarques();
        getFrete();
        getModalidades();
        getTpOperacao();
        getIncoterm();
        getPais();
        getStatus();
        getListaMercadorias();
        getContainers();
        getDescricao();
        getTpCalculos();
        getTpCalculosBroker();
        getPackageType();
        getSupervisor();
        getCS();
        getMotivosCancelamento();
        comboImoTipos();
        $scope.hasTaxa = false;
    }

    var comboImoTipos = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/fImoTiposCombo/JSON', '').then(function(data) {
            $scope.lsImoTipos = data;
        });
    }

    var getSupervisor = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fSupervisorCombo/JSON', "sBookingId=" + idAprovado).then(function(data) {
            $scope.lsSupervisor = data;
        });
    }
    var getMoedas = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        return callWS.get('/WVDF_WS/ws_ccgs218.wso/buscarMoeda_proposta/JSON', params)
            .then(function(response) {
                $scope.lsMoedas = response.data;
            });
    }

    var getDescricao = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_ccgs225.wso/f_CCGS225_combo/JSON', params)
            .then(function(response) {
                $scope.lsDescricao = response.data;
            });
    }

    var getMarcas = function() {
        parametros = 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + "&sCONTEUDO=" + '' + "&Cliente=" + getVariavelURL('idCliente');
        buscaWS.get('/WVDF_WS/ws_csag308.wso/f_fup_csag308_combo/JSON', parametros).then(function(data) {
            $scope.lsMarcas = data
            if ($scope.proposta.marca == '') $scope.proposta.marca = $scope.lsMarcas[0].ID;
        });
    }

    var getModPgto = function() {
        buscaWS.get('/WVDF_WS/ws_ccgs206.wso/listarModPgto/JSON', '').then(function(data) {
            $scope.lsModPgto = data;
        });
    }

    var getEmbarques = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS204.wso/f_CCGS204_lista/JSON', '').then(function(data) {
            $scope.lsEmbarques = data;
        });
    }

    var getFrete = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON', '').then(function(data) {
            $scope.lsFretes = data;
            $scope.filterMercadoria = '1';
        });
    }

    var getModalidades = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS202.wso/f_CCGS202_lista_prop/JSON', 'sProduto=').then(function(data) {
            $scope.lsModalidades = data
        });
    }

    var getTpOperacao = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS200.wso/f_CCGS200_combo_br/JSON', '').then(function(data) {
            $scope.lsOperacoes = data;
        });
    }

    var getIncoterm = function() {
        buscaWS.get('/WVDF_WS/ws_HCGS3000.wso/f_combo_incorterm/JSON', '').then(function(data) {
            $scope.lsIncoterm = data;
        });
    }

    var getPais = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON', '').then(function(data) {
            $scope.lsPais = data;
        });
    }

    var getCS = function() {
        buscaWS.get('/WVDF_WS/ws_CSAG300.wso/fListaTipoUsuario/JSON', 'sTipo=' + 9).then(function(data) {
            $scope.lsCustomers = data;
        });
    }

    var getStatus = function() {
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_combo_statprop/JSON', '').then(function(data) {
        //     $scope.lsStatus = data;
        // });
    }

    var getListaMercadorias = function() {
        buscaWS.get('/WVDF_WS/ws_ccgs219.wso/f_prop_combo/JSON', 'aUsuarioSessao=' + aUsuarioSessao).then(function(data) {
            $scope.lsMercadoria = data;
        });
    }

    var getContainers = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS217.wso/f_CCGS217_lista/JSON', '').then(function(data) {
            // 
            $scope.lsContainer = data;
        });
    }

    var getTpCalculos = function() {
        buscaWS.get('/WVDF_WS/ws_ccgs220.wso/f_combo_tpcalc/JSON', 'aModal=LCL').then(function(data) {

            $scope.lsCalculos = data;
        });
    }

    var getTpCalculosBroker = function() {
        buscaWS.get('/WVDF_WS/ws_ccgs220.wso/fComboCalcBroker/JSON', 'aModal=LCL').then(function(data) {

            $scope.lsCalculosBroker = data;
        });
    }

    var getPackageType = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS228.wso/f_CCGS228_pkg_type/JSON', '').then(function(data) {
            $scope.lsPackages = data;
        });
    }

    var getMotivosCancelamento = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS229.wso/listaMotivosProp/JSON', '').then(function(data) {
            $scope.StatusProposta = data;
        });
    }

    angular.element(function() {
        setTimeout(function() {
            init();
        }, 500);
    });

});

app.controller('chatCtrl', ['$scope', 'buscaWS', 'callWS', '$http', 'toaster', function($scope, buscaWS, callWS, $http, toaster) {
    $scope.messages = [];

    var init = function() {
        if (getVariavelURL("debug")) return;
        if (idProposta !== 0) {
            $scope.getMessages();
        }
    }

    $scope.getMessages = function() {
        var message = {};

        if (idProposta == '' || idProposta == 0) {
            return;
        }
        message = 'aProp=' + idProposta + '&aUsuarioSessao=' + aUsuarioSessao;
        buscaWS.get('/WVDF_WS/ws_hsag558.wso/f_listacomments/JSON', message).then(function(data) {

            $scope.messages = data;
        });
    }

    $scope.sendMsg = function(msg, stat) {
        $scope.loadingState = true;
        var params = {};

        if (idProposta == '' || idProposta == 0) {
            idProposta = $scope.proposta.idProposta;
        }

        if (idProposta == '' || idProposta == 0) {
            parent.parent.alertify.error($scope.literais.LITERAL_316);
            return;
        }

        params.aProp = idProposta;
        params.msg = msg;
        params.stats = stat;
        params.aUsuarioSessao = aUsuarioSessao;
        //console.log(params);

        var param = { 'sJSON': params };

        callWS.get('/WVDF_WS/ws_hsag558.wso/f_savecomments/JSON', param).then(function(response) {
            $scope.getMessages();
            $scope.chat_msg = '';
            $scope.chat_stat = '';
            $scope.loadingState = false;
            $scope.fStatusVerify();
        });
    }

    $scope.history = [];

    $scope.openHistorico = function() {
        var params = {};
        params.aUsuarioSessao = aUsuarioSessao;
        params.aProp = idProposta;
        callWS.get('/WVDF_WS/ws_hsag558.wso/f_full_msgs/JSON', params).then(function(response) {
            $scope.history = response.data;
        });
    }
    init();
}]);

app.controller('produtosController', function($timeout, $scope, $controller, buscaWS, callWS, $http, $q, toaster, $filter, NgTableParams) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');


    $controller('comboCtrl', { $scope: $scope });
    $controller('chatCtrl', { $scope: $scope });


    $scope.urltab5 = 'timeline.html?query=2018030492';

    $scope.lsFrequencias = {};
    $scope.edit1 = false;
    $scope.edit2 = false;

    $scope.schedule = '';
    $scope.scheduleTruck = '';

    $scope.proposta = {};
    $scope.proposta.idProposta = idProposta;
    $scope.proposta.vendedor = {};

    $scope.entrada = {};
    $scope.tabledata = [];

    $scope.unitCmIn = [];
    $scope.unitCmIn.push({ 'ID': 'C', 'DS': 'CM' });
    $scope.unitCmIn.push({ 'ID': 'I', 'DS': 'Inches' });
    $scope.options = ['Aceitar', 'Negar', 'Contra-valor'];

    $scope.tbContainers = {};
    $scope.tbContainers.containerFCL = [];
    $scope.tbContainers.containerLCL = [];
    $scope.tbContainers.containerAIR = [];
    $scope.tbContainers.stMercadoria = [];

    $scope.lsVia = [];

    $scope.permissao = '';

    $scope.negociarTaxa = [];

    $scope.lsItems = [];
    $scope.lsItems.LCL = [];
    $scope.lsItems.FCL = [];
    $scope.lsItems.AIR = [];
    $scope.lsItems.BLCL = [];
    $scope.lsItems.BFCL = [];

    $scope.parametros300401 = {};

    $scope.showVia = false;

    $scope.proposta.caracteristicasFrete = [];
    $scope.proposta.modalidades = 'LCL';
    $scope.proposta.incoterm = '';
    $scope.proposta.embarque = '';
    $scope.proposta.operacao = '';
    $scope.proposta.negociation_id = false;
    $scope.proposta.marca = '';
    $scope.proposta.paisPol = '';
    $scope.proposta.pol = '';
    $scope.proposta.paisPod = '';
    $scope.proposta.pod = '';
    $scope.proposta.paisOrigem = '';
    $scope.proposta.paisDestino = '';
    $scope.proposta.cidadeOrigem = '';
    $scope.proposta.cidadeDestino = '';
    $scope.proposta.cepOrigem = '';
    $scope.proposta.cepDestino = '';
    $scope.proposta.ttcbm = '';
    $scope.proposta.ttgw = '';
    $scope.proposta.ttpcs = '';
    $scope.proposta.anexo = 0;
    $scope.proposta.vianome = '';
    $scope.proposta.armadornome = '';
    $scope.proposta.transitTime = '';
    $scope.proposta.freeTime = '';
    $scope.proposta.frequencia = '';
    $scope.dtInicioFormated = '';
    $scope.dtfimFormated = '';

    $scope.negociarValidade = {};
    $scope.negociarValidade.valid_ex = '';
    $scope.negociarValidade.concorrente = '';
    $scope.negociarValidade.option = '';

    $scope.analise = {};

    $scope.tLCLTableNCM1 = {};

    $scope.acordeonDestino = false;
    $scope.acordeonOrigem = false;
    $scope.acordeonFrete = false;
    $scope.acordeonComissao = false;
    $scope.FreezeLigado = false;
    $scope.debug = false;
    $scope.booking = false;
    $scope.via = null;
    // $scope.proposta.trava_calculo = 0; //Trava de Calculo.

    $scope.lsSchedule = '';
    $scope.lsScheduleTruck = '';
    $scope.Consolidada_net = '';

    $scope.ValidaCarga = true;
    $scope.NetshipValidation = true; //VALIDACAO IMPORTANTE

    $scope.editProposta = [];
    $scope.Guest = '';

    $scope.lsContatosAvancados = [];
    //DEFINE O GUEST
    if (idGuest == 1) {
        $scope.Guest = true;
    } else {
        $scope.Guest = false;
    }

    $scope.editProp = function(model) {


        $scope.editProposta.agenteOri = $scope.editProposta.agenteOri;
        $scope.editProposta.agenteDest = $scope.editProposta.agenteDest;
        $scope.editProposta.terminalOri = $scope.editProposta.terminalOri;
        $scope.editProposta.terminalDest = $scope.editProposta.terminalDest;

        if ($scope.editProposta.agenteOri == undefined) {
            parent.parent.alertify.error('Preencha o campo Agente Origem.');
            return;
        }
        if ($scope.editProposta.agenteDest == undefined) {
            parent.parent.alertify.error('Preencha o campo Agente Destino.');
            return;
        }

        if ($scope.editProposta.terminalOri == undefined) {
            parent.parent.alertify.error('Preencha o campo Terminal Origem.');
            return;
        }
        if ($scope.editProposta.terminalDest == undefined) {
            parent.parent.alertify.error('Preencha o campo Terminal Destino.');
            return;
        }


        if ($scope.editProposta.via == undefined) {
            $scope.editProposta.via = '';
        }
        if ($scope.editProposta.armador == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_317);
            return;
        }
        if ($scope.editProposta.transitTime == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_318);
            return;
        }
        if ($scope.editProposta.freeTime == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_319);
            return;
        }
        if ($scope.editProposta.frequencia == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_320);
            return;
        }
        if ($scope.editProposta.dtinicial == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_321);
            return;
        }
        if ($scope.editProposta.dtFinal == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_322);
            return;
        }
        data = (new Date(), 'yyyy-MM-dd')

        var dtinicial = $filter("date")($scope.editProposta.dtinicial, 'dd-MM-yyyy');

        var dtFinal = $filter("date")($scope.editProposta.dtFinal, 'dd-MM-yyyy');

        var jsonEditProp = {
            "CSAG325_VIA": $scope.editProposta.via.id,
            "FREQUENCIA": $scope.editProposta.frequencia,
            "VALIDADE_INICIO": dtinicial,
            "VALIDADE_TERMINO": dtFinal,
            "TRANSITTIME": $scope.editProposta.transitTime,
            "FREETIME": $scope.editProposta.freeTime,
            "CARRIER_ID": $scope.editProposta.armador.id,
            "ID_PROPOSTA": $scope.proposta.idProposta,
            "TAXASARMADOR ": $scope.editProposta.taxasArmador,
            "FTARMADOR ": $scope.proposta.ftarmador,
            "CSAG345_AGENTE_ORIGEM": $scope.editProposta.agenteOri.id,
            "CSAG345_AGENTE_DESTINO": $scope.editProposta.agenteDest.id,
            "CSAG346_TERMINAL_ORIGEM": $scope.editProposta.terminalOri.id,
            "CSAG346_TERMINAL_DESTINO": $scope.editProposta.terminalDest.id
        };
        var jasonop = JSON.stringify(jsonEditProp);
        //console.log(jasonop);

        $http({
            method: 'PATCH',
            url: $scope.CRMURL + 'api/cross/proposta',
            data: jsonEditProp
        }).then(function success(response) {
            //console.log('sucess', response);

            parent.parent.alertify.success($scope.literais.LITERAL_323);

            loadProposta();

            if ($scope.editProposta.taxasArmador == '1') {
                $scope.loadingState = true;
                $scope.fAplicarTaxasArmador();
            }

            $scope.reloadCache();
            $scope.fConversorMoedaUSD();
            //$scope.fTerminalVerify();

        }, function error(response) {
            //console.log('error', response);
            parent.parent.alertify.error($scope.literais.LITERAL_324);
        });

    };

    $scope.fAplicarTaxasArmador = function() {

        buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/ftaxas_armador/JSON', 'sPropostaId=' + idProposta).then(function(data) {
            parent.parent.alertify.success($scope.literais.LITERAL_325);
            $scope.btnRefreshInfo();
        });

    }

    $scope.loadingState = true;
    var params = { 'aUsuarioSessao': aUsuarioSessao };
    callWS.get('/WVDF_WS/WS_CCGS226.wso/f_CCGS226_freq/JSON', params)
        .then(function(response) {
            $scope.lsFrequencias = response.data;
            //console.log($scope.lsFrequencias);
            $scope.loadingState = false;
        }, function(error) {
            $scope.loadingState = false;
            parent.parent.alertify.error($scope.literais.LITERAL_402 + "/n status: " + error.status + "/n statusText: " + error.statusText);
            /*toaster.pop({
                type: 'error',
                title: 'Error',
                body: ("Error ao carregar Frequencia. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                bodyOutputType: 'trustedHtml'
            });*/
        });

    var init = function() {
        $scope.loadingState = true;
        
        // $scope.forceLoadingState = false;
        getPermissao();
        getMarcas();

        getTaxas();
        getCliente();

        if (idProposta) {
            loadProposta();
            $scope.attnum();
            refreshTabelas();
            $scope.Notify();
            $scope.fCallMargem();
            $scope.hideAbaixo = false;

            //Comissao
            $scope.gridComissao_lista();
            callWS.get('/WVDF_WS/ws_hcgs3004.wso/buscarCrm/JSON', params).then(function(response) {
                $scope.CRMURL = response.data.ID;
                $scope.CRMPWD = response.data.DS;
                $scope.CRMURL2 = response.data.DS2;
            });
            if (idAprovado !== '0' && idAprovado !== '' && idAprovado !== false) {
                $scope.snp = '1';
                $scope.booking = true;

                angular.element(function() {
                    $('#tab3Link').trigger('click');

                    // $scope.forceLoadingState = false;
                });

                $scope.fBookingBusca();
                $scope.fDetalhesCargaBooking();

            } else {
                angular.element(function() {
                    $('#tab2Link').trigger('click');

                    // $scope.forceLoadingState = false;
                });

            }
        } else {

            if (idClone !== false) {
                $('#tab1Link').trigger('click');
                // $scope.forceLoadingState = false;
                $scope.loadingState = true;
                buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_busca_proposta/JSON', 'aPROPOSTA_ID=' + idClone).then(function(data) {
                    debugger;
                    $scope.paramSimul = data.aSimulado;
                    $scope.proposta.refSeguro = data.refSeguro;
                    $scope.proposta.valorSeguro = parseFloat(data.valorSeguro);
                    $scope.proposta.moedaMercadoria = data.mercadoriaMoeda;
                    $scope.proposta.validadeSeguro = data.validadeSeguro;
                    $scope.proposta.operacao = data.sCCGS200_ID;
                    $scope.betatester = data.sBetaTester;
                    
                    $scope.betatester = data.sBetaTester;
                    if ($scope.betatester == "0") $scope.betatester = false;
                    if ($scope.betatester == "1") $scope.betatester = true;

                    $scope.betatester2 = data.sBetaTester2;
                    if ($scope.betatester2 == "0") $scope.betatester2 = false;
                    if ($scope.betatester2 == "1") $scope.betatester2 = true;
                   
                    // if (idCliente !== data.sCSAG320_ID) 
                    $scope.proposta.marca = '';
                    // else $scope.proposta.marca = data.sCSAG308_ID;

                    $scope.proposta.modalidades = {};
                    $scope.proposta.modalidades = data.sCCGS202_ID;
                    
                    $scope.proposta.incoterm = data.sCCGS223_ID;
                    $scope.proposta.embarque = data.sCCGS204_ID;

                    $scope.proposta.idAgente = data.sCSAG345_AGENTE_D;
                    $scope.proposta.idAgente_D = data.sCSAG345_AGENTE_D;
                    $scope.proposta.idAgente_O = data.sCSAG345_AGENTE_O;
                    $scope.proposta.AgenteId_D = data.arr_AGENTE_D;
                    $scope.proposta.AgenteId_O = data.arr_AGENTE_O;

                    $scope.proposta.idTerminal_D = data.sCSAG346_TERMINAL_D;
                    $scope.proposta.idTerminal_O = data.sCSAG346_TERMINAL_O;
                    $scope.proposta.TerminalId_D = data.arr_TERMINAL_D;
                    $scope.proposta.TerminalId_O = data.arr_TERMINAL_O;

                    $scope.proposta.ratingProdNum = data.ratingProdNum;
                    $scope.proposta.ratingProd = data.ratingProd;
                    $scope.proposta.ratingGeralNum = data.ratingGeralNum;
                    $scope.proposta.ratingGeral = data.ratingGeral;

                    $scope.proposta.paisPol = data.paisPol;
                    $scope.proposta.pol = data.arr_POL;

                    $scope.proposta.paisPod = data.paisPod;
                    $scope.proposta.pod = data.arr_POD;

                    if ($scope.proposta.embarque == '3' || $scope.proposta.embarque == '4') {
                        $scope.origemDoorSelected = {};
                        $scope.origemDoorSelected.sExibe = data.origemDoorSelected.value;
                        $scope.origemDoorSelected.sTaxInlandId = data.origemDoorSelected.id;
                        $scope.loadComboInland($scope.proposta.paisPol);
                    }

                    if ($scope.proposta.embarque == '2' || $scope.proposta.embarque == '4') {
                        $scope.destinoDoorSelected = {};
                        $scope.destinoDoorSelected.sExibe = data.destinoDoorSelected.value;
                        $scope.destinoDoorSelected.sTaxInlandId = data.destinoDoorSelected.id;
                        $scope.loadComboDelivery($scope.proposta.paisPod);
                    }

                    if (data.sCONTAINERS !== "") $scope.proposta.containers = data.sCONTAINERS.split(',');

                    $scope.proposta.sMercadoria = data.sMercadoria;

                    $scope.negociarValidade.concorrente_nm = data.sConcorrente;

                    //ORIGEM DOOR
                    $scope.origemDoorSelected = {};
                    $scope.origemDoorSelected.sExibe = data.origemDoorSelected.value;
                    $scope.origemDoorSelected.sTaxInlandId = data.origemDoorSelected.id;

                    $scope.proposta.paisOrigem = data.sORIGEM_PAIS;
                    $scope.proposta.cepOrigem = data.sORIGEM_CEP;
                    $scope.proposta.cidadeOrigem = data.arr_ORIGEM;
                    $scope.proposta.enderecoOrigem = data.sORIGEM_ENDERECO;
                    $scope.proposta.numeroOrigem = data.sORIGEM_NUMERO;
                    $scope.proposta.complementoOrigem = data.sORIGEM_COMPLEMENTO;

                    //DESTINO DOOR
                    $scope.destinoDoorSelected = {};
                    $scope.destinoDoorSelected.sExibe = data.destinoDoorSelected.value;
                    $scope.destinoDoorSelected.sTaxInlandId = data.destinoDoorSelected.id;
                    //$scope.destinoDoorSelected.blockOption = true;

                    $scope.proposta.paisDestino = data.sDESTINO_PAIS;
                    $scope.proposta.cepDestino = data.sDESTINO_CEP;
                    $scope.proposta.cidadeDestino = data.arr_DESTINO;
                    $scope.proposta.enderecoDestino = data.sDESTINO_ENDERECO;
                    $scope.proposta.numeroDestino = data.sDESTINO_NUMERO;
                    $scope.proposta.complementoDestino = data.sDESTINO_COMPLEMENTO;

                    //CARREGA DETALHES DE CARGA
                    buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_lista/JSON', 'aProposta=' + idClone).then(function(data) {
                        
                        $scope.tbContainers.containerFCL = [];
                        $scope.tbContainers.containerLCL = [];

                        posicionaTabelas(data);

                        data.forEach(function(oItem) {

                            oItem.aRecnum = '';
                            if (oItem.wMercadorias.length > 0) {
                                oItem.wMercadorias.forEach(function(oItem2) {
                                    oItem2.srecnum_05 = '';
                                    oItem2.srecnum = '';
                                });
                            }
                            $scope.lsItems[oItem.modalidade].push(angular.copy(oItem));
                        });
                        $scope.loadingState = false;

                    });
                });
            }
            $scope.edit2 = true;
        }
        $scope.loadingState = false;

        $scope.calcTotalContainerLCL();
        const promises = [];
        const promisesLCLExpo = [];

        for (i = 0; i < 2; i++) {
            promisesLCLExpo.push(
                $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais_seq/JSON', {
                    params: {
                        aUsuarioSessao: aUsuarioSessao,
                        sPrograma: 'PCGS3004_01LclExpo',
                        iSeq: i
                    }
                })
                .then(function(res) {
                    return res.data;
                })
            );
        }

        Promise.all(promisesLCLExpo).then((values) => {
            $scope.literaisLCLExpo = [];
            $scope.literaisLCLExpo = values[0];
            count = 121;
            for (i = 1; i < values.length; i++) {
                for (var attrname in values[i]) {
                    if (attrname.includes('LITERAL')) {
                        $scope.literaisLCLExpo["LITERAL_" + count] = values[i][attrname];
                        count++;
                    }
                }
            }
        });

        $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON', {
                params: {
                    aUsuarioSessao: aUsuarioSessao,
                    sPrograma: 'PCGS3004_01LclImp'
                }
            })
            .then(function(res) {
                $scope.literaisLCLImp = res.data;
            });

        for (i = 0; i < 4; i++) {
            promises.push(
                $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais_seq/JSON', {
                    params: {
                        aUsuarioSessao: aUsuarioSessao,
                        sPrograma: 'pcgs3004_01',
                        iSeq: i
                    }
                })
                .then(function(res) {
                    return res.data;
                })
            );
        }
        Promise.all(promises).then((values) => {
            $scope.literais = [];
            $scope.literais = values[0];
            let count = 121;
            for (i = 1; i < values.length; i++) {
                for (var attrname in values[i]) {
                    if (attrname.includes('LITERAL')) {
                        $scope.literais["LITERAL_" + count] = values[i][attrname];
                        count++;
                    }
                }
            }
        });
    }

    //AUTOCOMPLETE CLIENTE
    $scope.loadClientes = function(query) {
        if (query.length > 2) {
            var parametros = 'sInicio=' + query;
            var data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_proposta_complete_client/JSON', parametros)
                .then(function(data) {
                    return data;
                });
            return data;
        }
    };


    $scope.acParticipantesCliente = function(query) {
        let params = {
            'aUsuarioSessao': aUsuarioSessao,
            'aInicio': query,
            'sCliente': idCliente
        };

        return $http.get('/WVDF_WS/ws_CSAG378.wso/fAutoCompleteContatos/JSON', { params: params }).then(function(response) {
            return response.data;
        });
    }



    $scope.btnNovoParticipante = function() {

        if (idCliente !== '' && idCliente !== undefined) {
            var data = "PAG378_02.asp?aUsuarioSessao=" + aUsuarioSessao + "&sCliente=" + idCliente;
            window.top.jaddTab($scope.literais.LITERAL_64, data);
        }
    }

    $scope.changeModalidades = function(oModalidades) {
        $scope.entrada.modalidade = $scope.proposta.modalidades;
        $scope.proposta.modalidade = $scope.proposta.modalidades;
    };

    var getCliente = function() {
        if (getVariavelURL('idCliente')) {

            buscaWS.get('/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG340/JSON', 'sUSUARIOSESSAO=' + getVariavelURL('aUsuarioSessao') + '&sCodigo=' + getVariavelURL('idCliente')).then(function(data) {
                $scope.proposta.dsCliente = data.cDescricao;
            });
        }
    }

    $scope.attnum = function() {
        params = 'sTabela=HCGS3004&idProposta=' + $scope.proposta.idProposta;
        buscaWS.get('/WVDF_WS/ws_log3040.wso/fCountLog3040/JSON', params).then(function(data) {
            $scope.proposta.anexo = data;
        });
    }

    $scope.gridComissao = [];
    $scope.gridComissao_addTaxa = function() {
        var obj = {};
        obj.DS_T = 'CUSTOMER COMISSION';
        obj.ID_T = 45;
        obj.tipo = '';
        obj.valor = 0;
        obj.moeda = '';
        obj.valormin = 0;
        obj.valormax = 0;
        obj.modPgto = '';
        obj.tp_calc = '';
        obj.note = '';
        obj.editable = true;
        obj.sRecnum = '0';
        obj.newComission = 1;
        $scope.gridComissao.push(obj);
    }

    $scope.fBtnDelComissao = function(recnum) {
        if (recnum !== undefined && recnum !== '' && recnum !== '0') {
            params = 'sRecnum=' + recnum;
            buscaWS.get('/WVDF_WS/ws_hcgs3007.wso/f_del_comissao/JSON', params).then(function(data) {
                $scope.gridComissao_lista();
                $scope.btnRefreshInfo();
            });
        } else $scope.gridComissao_lista();
    }

    $scope.gridComissao_lista = function() {
        params = 'aProp=' + $scope.proposta.idProposta;
        buscaWS.get('/WVDF_WS/ws_hcgs3007.wso/f_lista_comissao/JSON', params).then(function(data) {

            $scope.gridComissao = data.stComissaoLista;
            $scope.totalComission = data.sTotalComissao;
            $scope.totalComOrigem = data.sTotalComOrigem;
            $scope.totalComFrete = data.sTotalComFrete;
            $scope.totalComDestino = data.sTotalComDestino;
            $scope.totalComEspecial = data.sTotalComEspecial;
            if ($scope.gridComissao.length !== 0) { $scope.acordeonComissao = true; }
        });
    }

    var loadProposta = function() {
        // $scope.loadingState = true;
             
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_busca_proposta/JSON', 'aPROPOSTA_ID=' + $scope.proposta.idProposta).then(function(data) {
            //console.log(data);
            debugger;
            $scope.paramSimul = data.aSimulado;

            $scope.proposta.refSeguro = data.refSeguro;

            $scope.proposta.validadeSeguro = data.validadeSeguro;
            $scope.proposta.trava_calculo = data.proposta_travada;
            
            $scope.betatester = data.sBetaTester;
            if ($scope.betatester == "0") $scope.betatester = false;
            if ($scope.betatester == "1") $scope.betatester = true;

            $scope.betatester2 = data.sBetaTester2;
            if ($scope.betatester2 == "0") $scope.betatester2 = false;
            if ($scope.betatester2 == "1") $scope.betatester2 = true;

            $scope.proposta.dsCliente = data.sCSAG320_FANTASIA;
            $scope.proposta.sCSAG395_FANTASIA = data.sCSAG395_FANTASIA;
            $scope.proposta.sCSAG341_FANTASIA = data.sCSAG341_FANTASIA;
            $scope.proposta.cliente_documento = data.sCSAG320_DOCUMENTO;

            $scope.proposta.unDestino = data.unDestino;
            $scope.proposta.unOrigem = data.unOrigem;
            $scope.proposta.sAcordo = data.sAcordo;
            $scope.proposta.impressaoProposta = data.impressaoProposta;
            $scope.proposta.emailProposta = data.emailProposta;
            $scope.proposta.modalidades = {};
            $scope.proposta.dataProposta = data.dataProposta;
            $scope.proposta.marca = data.sCSAG308_ID;
            $scope.proposta.operacao = data.sCCGS200_ID;
            if (data.sFechamento == 'True') $scope.proposta.fechamento = true;
            else $scope.proposta.fechamento = false;

            if (data.negociation_id == '1')
                $scope.proposta.negociation_id = true;

            $scope.proposta.ratingProdNum = data.ratingProdNum;
            $scope.proposta.ratingProd = data.ratingProd;
            $scope.proposta.ratingGeralNum = data.ratingGeralNum;
            $scope.proposta.ratingGeral = data.ratingGeral;

            $scope.proposta.taxEspeciais = data.taxEspeciais;
            $scope.proposta.valorSeguro = parseFloat(data.valorSeguro);
            $scope.proposta.moedaMercadoria = data.mercadoriaMoeda;
            $scope.proposta.refSeguro = data.refSeguro;
            $scope.proposta.validadeSeguro = data.validadeSeguro;

            $scope.proposta.modalidades = data.sCCGS202_ID;
            $scope.proposta.idAgente = data.sCSAG345_AGENTE_D;
            //AGENTES
            $scope.proposta.idAgente_D = data.sCSAG345_AGENTE_D;
            $scope.proposta.idAgente_O = data.sCSAG345_AGENTE_O;
            $scope.proposta.AgenteId_D = data.arr_AGENTE_D;
            $scope.proposta.AgenteId_O = data.arr_AGENTE_O;
            //TERMINAIS
            $scope.proposta.idTerminal_D = data.sCSAG346_TERMINAL_D;
            $scope.proposta.idTerminal_O = data.sCSAG346_TERMINAL_O;
            $scope.proposta.TerminalId_D = data.arr_TERMINAL_D;
            $scope.proposta.TerminalId_O = data.arr_TERMINAL_O;
            $scope.proposta.simuTerm = data.arr_TERMINAL.value;
            
            $scope.proposta.incoterm = data.sCCGS223_ID;
            $scope.proposta.embarque = data.sCCGS204_ID;

            $scope.editProposta.agenteDest = $scope.proposta.AgenteId_D = data.arr_AGENTE_D;
            $scope.editProposta.agenteOri = $scope.proposta.AgenteId_O = data.arr_AGENTE_O;
            $scope.editProposta.terminalDest = $scope.proposta.TerminalId_D = data.arr_TERMINAL_D;
            $scope.editProposta.terminalOri = $scope.proposta.TerminalId_O = data.arr_TERMINAL_O;

            $scope.proposta.paisPol = data.paisPol;
            $scope.proposta.paisPod = data.paisPod;

            if ($scope.proposta.embarque == '3' || $scope.proposta.embarque == '4') {
                $scope.origemDoorSelected = {};
                $scope.origemDoorSelected.sExibe = data.origemDoorSelected.value;
                $scope.origemDoorSelected.sTaxInlandId = data.origemDoorSelected.id;
                $scope.loadComboInland($scope.proposta.paisPol);
            }

            if ($scope.proposta.embarque == '2' || $scope.proposta.embarque == '4') {
                $scope.destinoDoorSelected = {};
                $scope.destinoDoorSelected.sExibe = data.destinoDoorSelected.value;
                $scope.destinoDoorSelected.sTaxInlandId = data.destinoDoorSelected.id;
                $scope.loadComboDelivery($scope.proposta.paisPod);
            }

            $scope.proposta.criadoEm = data.criadoEm;
            $scope.proposta.criadoPor = data.criadoPor;
            debugger;
            if ($scope.proposta.criadoPor == 'FERNANDA ABREU') {
                $scope.Exception = 1;
            }
            if ($scope.proposta.criadoPor == 'ANDERSON RODRIGUES') {
                $scope.Exception = 1;
            }
            else $scope.Exception = 0;

            $scope.proposta.sAtualUser = data.sAtualUser;

            $scope.proposta.alteradoEm = data.alteradoEm;
            $scope.proposta.alteradoPor = data.alteradoPor;
            $scope.proposta.pol = data.arr_POL;
            $scope.proposta.pod = data.arr_POD;
            $scope.proposta.carrier = data.arr_CARRIERS.id;
            $scope.proposta.containers = data.sCONTAINERS.split(',');
            $scope.proposta.sMercadoria = data.sMercadoria;

            $scope.negociarValidade.concorrente_nm = data.sConcorrente;

            $scope.proposta.sClienteFinal = data.sClienteFinal;
            $scope.proposta.sCommons = data.sCommons;
            //$scope.proposta.sCust_Ref = data.sCust_Ref;
            //$scope.proposta.sInt_Ref = data.sInt_Ref;
            $scope.proposta.sCust_Inst = data.sCust_Inst;
            //$scope.proposta.sCust_RefS = data.sCust_RefS;

            $scope.proposta.sStatus = data.sStatus;
            if (data.sStatus == '9') {
                $scope.proposta.motivoCancelamento = data.sCANCELADA_MOTIVO;
                $('#propc').show();
            }

            $scope.status = data.telaStatus;

            $scope.proposta.paisOrigem = data.sORIGEM_PAIS;
            $scope.proposta.cepOrigem = data.sORIGEM_CEP;
            $scope.proposta.cidadeOrigem = data.arr_ORIGEM;
            $scope.proposta.enderecoOrigem = data.sORIGEM_ENDERECO;
            $scope.proposta.numeroOrigem = data.sORIGEM_NUMERO;
            $scope.proposta.complementoOrigem = data.sORIGEM_COMPLEMENTO;
            $scope.proposta.paisDestino = data.sDESTINO_PAIS;
            $scope.proposta.cepDestino = data.sDESTINO_CEP;
            $scope.proposta.cidadeDestino = data.arr_DESTINO;
            $scope.proposta.enderecoDestino = data.sDESTINO_ENDERECO;
            $scope.proposta.numeroDestino = data.sDESTINO_NUMERO;
            $scope.proposta.complementoDestino = data.sDESTINO_COMPLEMENTO;
            $scope.proposta.validadeDe = data.sDTVAL_INICIO;
            $scope.proposta.validadeAte = data.sDTVAL_TERMINO;
            $scope.proposta.ttcbm = data.TTCBM;
            $scope.proposta.ttgw = data.TTGW;
            $scope.proposta.ttpcs = data.TTPCS;

            $scope.proposta.freeTime = data.freetime;
            $scope.proposta.transitTime = data.transitTime;
            $scope.proposta.frequencia = data.frequencia;

            $scope.proposta.vianome = data.sVIA;

            $scope.proposta.vianome = $scope.proposta.vianome.replaceAll("(OF)", "<i class='fa fa-ship'></i>");
            $scope.proposta.vianome = $scope.proposta.vianome.replaceAll("(DTA)", '<i class="fa fa-truck" style="transform: scaleX(-1);"></i>');

            $scope.proposta.rota2 = data.sVia_DS;
            $scope.proposta.rota2 = $scope.proposta.rota2.replaceAll("(OF)", "<i class='fa fa-ship'></i>");
            $scope.proposta.rota2 = $scope.proposta.rota2.replaceAll("(DTA)", '<i class="fa fa-truck" style="transform: scaleX(-1);"></i>');

            $scope.proposta.armadornome = data.arr_CARRIERS.label;

            if (data.retorno_id !== '0') $scope.retorno_id = true;
            else $scope.retorno_id = false;

            var datei = $scope.proposta.validadeDe;
            var datef = $scope.proposta.validadeAte;

            $scope.editProposta.via = $scope.via;
            $scope.editProposta.armador = data.arr_CARRIERS;
            $scope.editProposta.transitTime = data.transitTime;
            $scope.editProposta.freeTime = data.freetime;
            $scope.editProposta.frequencia = data.frequencia;

            $scope.editProposta.dtinicial = $scope.proposta.validadeDe;
            $scope.editProposta.dtFinal = $scope.proposta.validadeAte;

            $scope.editProposta.ftarmador = data.ftarmador;
            $scope.editProposta.taxasArmador = data.taxasArmador;

            $scope.CodBooking_net = data.CodBooking_net;

            $scope.proposta.carrier_hide = (data.carrier_hide == "1" ? true : false);
            $scope.proposta.solicitante = data.solicitante;
            $scope.btnRefreshInfo();

            if (idAprovado !== '0' && idAprovado !== '' && idAprovado !== false) {
                if ($scope.proposta.modalidades == 'LCL' && $scope.proposta.operacao == '1')
                    if ($scope.CodBooking_net == '') $scope.fScheduleBook();
            }

            $scope.fStatusVerify();

            //VALIDACAO DO NETSHIP E FREEZE
            var params = { 'aUsuarioSessao': aUsuarioSessao };
            callWS.get('/WVDF_WS/ws_hcgs3004.wso/buscarCrm/JSON', params).then(function(response) {

                $scope.CRMURL = response.data.ID;
                $scope.CRMPWD = response.data.DS;
                $scope.CRMURL2 = response.data.DS2;

                if ($scope.CodBooking_net !== '' && $scope.CodBooking_net !== undefined && $scope.proposta.operacao == '4' && $scope.proposta.modalidades == 'LCL') {
                    $scope.loadingState = true;


                    var data = "grant_type=password&username=CROSSEDI&password=" + $scope.CRMPWD; //CRMCR4T 
                    $http.post($scope.CRMURL + 'api/token', data, {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function success(response) {
                        $scope.crmtk = response.data.access_token;

                        $http({
                            method: 'GET',
                            url: $scope.CRMURL + 'api/netship/bra/cotacaoimpo/' + idProposta,
                            headers: { 'Authorization': 'Bearer ' + $scope.crmtk }
                        }).then(function success(response) {

                            $scope.loadingState = false;

                        }, function error(response) {

                            $scope.NetshipValidation = false;
                            $scope.loadingState = false;
                            parent.parent.alertify.error(response.data.error);
                            return;
                        });
                    })
                }

            });

            //Contatos Agente      
            var data = {
                "aUsuarioSessao": aUsuarioSessao,
                "aPropostaId": $scope.proposta.idProposta,
                "aBookingId": idAprovado
            }

            $http.post("/wvdf_ws/ws_hsag559.wso/fListaContatosAgente", data).then(function(response) {
                $scope.lsContatosAgente = response.data;
            });

            //Referencias
            var params = {
                "sPropostaId": $scope.proposta.idProposta,
                'aUsuarioSessao': aUsuarioSessao
            };

            callWS.get('/WVDF_WS/ws_ccgs192.wso/fComboCCGS192/JSON', params).then(function(response) {
                $scope.comboTipoReferencia = response.data;
            });

            $scope.loadReferences();

            //Comentarios
            $scope.comentario = {
                chat_stat: "",
                msg: "",
                private: 1
            }

            var params = {
                'aUsuarioSessao': aUsuarioSessao
            };

            callWS.get('/WVDF_WS/ws_CCGS189.wso/fReportCCGS189/JSON', params).then(function(response) {
                $scope.comboTipoDestinatario = response.data;
                $scope.comentario.chat_stat = $scope.comboTipoDestinatario[0].id;
            });

            var params = {
                'aProp': $scope.proposta.idProposta,
                'aUsuarioSessao': aUsuarioSessao
            }

            callWS.get('/WVDF_WS/ws_hsag558.wso/f_listacomments/JSON', params).then(function(response) {
                $scope.lstComentarios = response.data;
            });
        });
    }

    $scope.loadReferences = function() {
        let params = {
            "sPropostaId": $scope.proposta.idProposta,
            'aUsuarioSessao': aUsuarioSessao
        };

        callWS.get('/WVDF_WS/ws_ccgs250.wso/fReportCCGS250/JSON', params).then(function(response) {
            $scope.lstReferencias = response.data;

            if (!$scope.lstReferencias.length) {
                let new_referencia = {
                    texto: '',
                    referenciaId: '1',
                    sRecnum: 0,
                    bEditable: true
                }

                $scope.lstReferencias.unshift(new_referencia);
            }
        });
    }

    $scope.saveReference = function(referencia) {
        let data = {
            "aUsuarioSessao": aUsuarioSessao,
            "propostaId": idProposta,
            "sRecnum": referencia.sRecnum,
            "referenciaId": referencia.referenciaId,
            "texto": referencia.texto
        }

        $http.post("/WVDF_WS/ws_ccgs250.wso/fSaveCCGS250/JSON", { 'sJSON': JSON.stringify(data) }).then(function(response) {
            if (response.data.aDefaultMessage.hasError) parent.parent.alertify.error(response.data.aDefaultMessage.msgError);
            else {
                referencia.bEditable = false;
                $scope.lstReferencias = response.data.aReportCCGS250;
                parent.parent.alertify.success(response.data.aDefaultMessage.msgInfo);
            }
        });
    }

    $scope.deleteReference = function(recnum, index) {
        if (recnum == 0) {
            $scope.lstReferencias.splice(index, 1);
            return;
        }

        let data = {
            "sRecnum": recnum,
            "aUsuarioSessao": aUsuarioSessao
        }

        $scope.sweetAlert($scope.literais.LITERAL_420, $scope.literais.LITERAL_455, "warning", $scope.literais.LITERAL_428).then((response) => {
            if (response) {
                $http.post('/WVDF_WS/ws_ccgs250.wso/fDelCCGS250/JSON', data).then(function(response) {
                    if (response.data.hasError) parent.parent.alertify.error(response.data.msgError);
                    else {
                        $scope.lstReferencias.splice(index, 1);
                        parent.parent.alertify.success(response.data.msgInfo);
                    }
                });
            }
        });
    }

    $scope.newReference = function() {
        let new_referencia = {
            texto: '',
            referenciaId: $scope.comboTipoReferencia[0].ID,
            sRecnum: 0,
            bEditable: true
        }

        $scope.lstReferencias.unshift(new_referencia);
    }

    $scope.saveNewComment = function(comentario) {
        
        //guest sempre publico
        if ($scope.Guest) comentario.private = 0;

        let data = {
            "aUsuarioSessao": aUsuarioSessao,
            "aProp": idProposta,
            "stats": comentario.chat_stat,
            "msg": comentario.msg,
            "private": comentario.private
        }

        $http.post("/WVDF_WS/ws_hsag558.wso/f_savecomments/JSON", { 'sJSON': JSON.stringify(data) }).then(function(response) {
            $scope.lstComentarios = response.data;
            $scope.comentario = {
                chat_stat: "",
                msg: "",
                private: 1
            }
            $('#modalAddComment').trigger('click');
        });
    }

    $scope.calcTotalContainerLCL = function() {
        //Calcula os totais das colunas PCS, Gross Weight e Volume
        $scope.tLCLTableNCM1.totalPCS = $scope.tbContainers.containerLCL.reduce(function(a, b) { return a + b.pcs; }, 0);

        $scope.tLCLTableNCM1.totalGWeightKG = $scope.tbContainers.containerLCL.reduce(function(a, b) { return (b.total.grossUnit == "KG") ? parseFloat(a) + parseFloat(b.total.weight) : parseFloat(a); }, 0) || 0;
        $scope.tLCLTableNCM1.totalGWeightKG = $scope.tLCLTableNCM1.totalGWeightKG.toFixed(4);

        $scope.tLCLTableNCM1.totalGWeightLB = $scope.tbContainers.containerLCL.reduce(function(a, b) { return (b.total.grossUnit == "LB") ? parseFloat(a) + parseFloat(b.total.weight) : parseFloat(a); }, 0) || 0;
        $scope.tLCLTableNCM1.totalGWeightLB = $scope.tLCLTableNCM1.totalGWeightLB.toFixed(4);

        $scope.tLCLTableNCM1.totalVolumeCBM = $scope.tbContainers.containerLCL.reduce(function(a, b) { return (b.total.volumeUnit == "CBM") ? parseFloat(a) + parseFloat(b.total.volume) : parseFloat(a); }, 0) || 0;
        $scope.tLCLTableNCM1.totalVolumeCBM = $scope.tLCLTableNCM1.totalVolumeCBM.toFixed(4);

        $scope.tLCLTableNCM1.totalVolumeCFT = $scope.tbContainers.containerLCL.reduce(function(a, b) { return (b.total.volumeUnit == "CFT") ? parseFloat(a) + parseFloat(b.total.volume) : parseFloat(a); }, 0) || 0;
        $scope.tLCLTableNCM1.totalVolumeCFT = $scope.tLCLTableNCM1.totalVolumeCFT.toFixed(4);
    }

    $scope.btnClienteInfo = function() {

        let url = 'http://server-bi2:8090/crm/customers/' + idCliente + '/summary?aUsuarioSessao=' + aUsuarioSessao; //$scope.CRMURL2 + '/crm/customers/' + idCliente + '/summary?aUsuarioSessao=' + aUsuarioSessao;
        window.top.jaddTab($scope.literais.LITERAL_285, url);
    }

    $scope.fSaveEditBook = function() {

        $scope.edit1 = false;
        var oProposta = $scope.proposta;

        //INCOTERM
        if (oProposta.incoterm == '' || oProposta.incoterm == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_326);
            return;
        }
        //EMBARQUE
        if (oProposta.embarque == '' || oProposta.embarque == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_327);
            return;
        } else {
            //DOOR-DOOR
            if (oProposta.embarque === '4') {
                if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisDestino == '' ||
                    oProposta.cidadeDestino == '' || oProposta.cepOrigem == '' || oProposta.cepDestino == '') {
                    parent.parent.alertify.error($scope.literais.LITERAL_328);
                    return;
                }
            }
            //DOOR-PORT
            if (oProposta.embarque === '3') {
                if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisPod == '' ||
                    oProposta.pod == '' || oProposta.cepOrigem == '') {
                    parent.parent.alertify.error($scope.literais.LITERAL_328);
                    return;
                }
            }
            //PORT-PORT
            if (oProposta.embarque === '1') {
                if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisPod == '' || oProposta.pod == '') {
                    parent.parent.alertify.error($scope.literais.LITERAL_328);
                    return;
                }
            }
            //PORT-DOOR
            if (oProposta.embarque === '2') {
                if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisDestino == '' ||
                    oProposta.cidadeDestino == '' || oProposta.cepDestino == '') {
                    parent.parent.alertify.error($scope.literais.LITERAL_328);
                    return;
                }
            }
        }

        if (oProposta.pod != '' && oProposta.pol != '' && $scope.lsVia.length > 1) {
            if (oProposta.VIA == '') {
                parent.parent.alertify.error($scope.literais.LITERAL_329);
                return;
            }
        }

        $scope.loadingState = true;
        var aux = angular.copy(oProposta);

        //--- Comentarios.
        aux.sCust_Ref = oProposta.sCust_Ref;
        aux.sCust_RefS = oProposta.sCust_RefSsAcordo //--- PERMISSAO
        aux.permissao = $scope.permissao;

        if (!angular.isUndefined(oProposta.pol)) {
            if (oProposta.pol !== '') {
                aux.pol = oProposta.pol.id;
            }
        }
        if (!angular.isUndefined(oProposta.pod)) {
            if (oProposta.pod !== '') {
                aux.pod = oProposta.pod.id;
            }
        }

        aux.via = oProposta.VIA;

        if (!angular.isUndefined(oProposta.cidadeOrigem)) {
            if (oProposta.cidadeOrigem != '') {
                aux.cidadeOrigem = oProposta.cidadeOrigem.id;
            }
        }
        if (!angular.isUndefined(oProposta.cidadeDestino)) {
            if (oProposta.cidadeDestino != '') {
                aux.cidadeDestino = oProposta.cidadeDestino.id;
            }
        }

        aux.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        if ((aux.incoterm == 'EXW' || aux.incoterm == 'FCA' || aux.incoterm == 'DAP' || aux.incoterm == 'DDP') && aux.paisDestino == "" && aux.paidPod) {
            return parent.parent.alertify.error($scope.literais.LITERAL_330);
        }

        var params = { 'sJSON': aux };
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/fSalveEditBook/JSON', params).then(function(data) {
            loadProposta();
            $scope.loadingState = false;
        });
    }

    $scope.CodBooking = '';
    $scope.json = '';
    //INICIO BOOKING LCL EXPO
    $scope.GerarBookingLclExp = function() {
        $scope.loadingState = true;

        if ($scope.schedule == '') {
            parent.parent.alertify.error($scope.literais.LITERAL_331);
            $scope.loadingState = false;
            return;
        }
        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fGeraBookingProtocol/JSON', 'sProposta=' + idProposta).then(function(data) {
            $scope.CodBooking = data.protocolo;
            parent.parent.alertify.success($scope.literais.LITERAL_332);

            var jsonEditProp = {
                "cliente": idCliente,
                "SeuCliente": data.seuCliente,
                "portoOrigem": data.PoL, //$scope.proposta.pol.id
                "paisPortoOrigem": data.Ppol,
                "portoDestino": data.PoD, //$scope.proposta.pod.id
                "paisPortoDestino": data.Ppod,
                "via": data.via,
                "viaPais": "",
                "MoedaMaritimo": "",
                "TipoCalculo": data.pagamento,
                "Incoterm": $scope.proposta.incoterm,
                "Vendedor": data.vendedor,
                "Inside": data.inside,
                "Elaborador": data.elaborador,
                "PackingGroup": data.packingGroup,
                "TipoVolume": "",
                "TaxaMaritimoHouseExpo": data.taxas,
                "tipoContainer": data.containers,
                "EmissaoBL": data.emissaobl,
                "placeOfReceipt": data.PoR,
                "finalDestination": data.finalDest,
                "localEntregaDocTruck": data.local_documento,
                "localEntregaCargaTruck": data.local_carga,
                "tipoCarga": data.aTpCarga,
                "customerService": ""
            };
            jsonEditProp = JSON.stringify(jsonEditProp);
            //console.log("translote_data_LCLExpo", jsonEditProp);

            $http({
                method: 'POST',
                url: $scope.CRMURL + 'api/Tradutor/cotacao',
                data: jsonEditProp
            }).then(function success(response) {


                if (response.data.clienteCotacao == null) {
                    $scope.loadingState = false;
                    parent.parent.alertify.error($scope.literais.LITERAL_333);
                    return;
                }

                var autorizado = false;

                for (var i = response.data.log.length - 1; i >= 0; i--) {
                    if (response.data.log[i].origemID !== '0' && response.data.log[i].origemID !== null && response.data.log[i].origemID !== '-1') {
                        parent.parent.alertify.log(response.data.log[i].mensagem);
                        autorizado = true;
                    }
                }

                if (autorizado) {
                    $scope.loadingState = false;
                    return;
                } else {
                    parent.parent.alertify.success($scope.literais.LITERAL_334);
                }

                response.data.aUsuarioSessao = aUsuarioSessao;
                response.data.idProposta = idProposta;
                var params = { 'sJSON': response.data };
                
                //console.log("envio_fSaveNetShip", JSON.stringify(params));
                callWS.get('/WVDF_WS/ws_hcgs3008.wso/fSaveNetShip/JSON', params)
                    .then(function(data) {

                        parent.parent.alertify.success($scope.literais.LITERAL_335);
                        $scope.json = data.data;

                        var texto = data.data.cotaExpo.ce_TipoCarga;
                        if (texto == 'QUIMICO PERIGOSO') texto = texto.replace('I', '\u00cd');
                        if (texto == 'Q. NAO PERIGOSO') texto = texto.replace('A', '\u00C3');

                        data.data.cotaExpo.ce_TipoCarga = texto;

                        //console.log(JSON.stringify($scope.json));
                        
                        var data = "grant_type=password&username=CROSSEDI&password=" + $scope.CRMPWD; //CRMCR4T 
                        $http.post($scope.CRMURL + 'api/token', data, {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).then(function success(response) {
                            $scope.crmtk = response.data.access_token;

                            var urlCotacao;
                            urlCotacao = $scope.CRMURL + 'api/Netship/bra/cotacao';


                            if ($scope.CodBooking_net == '' || $scope.CodBooking_net == undefined) {
                                $http({
                                    method: 'POST',
                                    url: urlCotacao,
                                    headers: { 'Authorization': 'Bearer ' + $scope.crmtk },
                                    data: $scope.json
                                }).then(function success(response) {
                                    parent.parent.alertify.success($scope.literais.LITERAL_336);
                                    $scope.CodBooking_net = response.data.numReserva;
                                    response.data.sBookingId = idAprovado;
                                    response.data.aUsuarioSessao = aUsuarioSessao;
                                    var params = { 'sJSON': response.data };
                                    
                                    callWS.get('/WVDF_WS/ws_hcgs3008.wso/pSaveRefNS/JSON', params)
                                        .then(function(data) {
                                            
                                            parent.parent.alertify.success($scope.literais.LITERAL_337);
                                            $scope.loadingState = false;
                                            if ($scope.proposta.refSeguro.length) {
                                                if (insurances.targetCode == '') insurances.targetCode = $scope.proposta.refSeguro;
                                                insurances.approval('EXPO').then(function(data) {
                                                    $scope.fControleTrava();
                                                })
                                            } else $scope.fControleTrava();

                                        });
                                }, function error(response) {
                                    var sMsg
                                    if (response.status == 401) {
                                        sMsg = $scope.literais.LITERAL_403;
                                        parent.parent.alertify.error(sMsg);
                                    } else {
                                        if (response.data.error !== undefined) {
                                            sMsg = response.data.error;
                                            parent.parent.alertify.error(sMsg);
                                        } else {
                                            if (response.statusText == 'Conflict') {
                                                sMsg = $scope.literais.LITERAL_404;
                                                parent.parent.alertify.error(sMsg);

                                                $scope.CodBooking_net = response.data.numReserva;
                                                response.data.sBookingId = idAprovado;
                                                response.data.sProposta = idProposta;
                                                var params = { 'sJSON': response.data };
                                                callWS.get('/WVDF_WS/ws_hcgs3008.wso/pSaveRefNS/JSON', params).then(function(data) {
                                                    if ($scope.proposta.refSeguro.length) {
                                                        if (insurances.targetCode == '') insurances.targetCode = $scope.proposta.refSeguro;
                                                        insurances.approval('EXPO').then(function(data) {
                                                            $scope.fControleTrava();
                                                        })
                                                    } else $scope.fControleTrava();
                                                });
                                            }
                                        }
                                    }
                                    parent.parent.alertify.error($scope.literais.LITERAL_338);
                                    buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fSaveRetornoErroNetShip/JSON', 'sPropostaId=' + idProposta + '&sErro=' + sMsg).then(function(data) {});
                                    $scope.loadingState = false;
                                    return;
                                });
                            } else {
                                $http({
                                    method: 'PATCH',
                                    url: urlCotacao,
                                    headers: { 'Authorization': 'Bearer ' + $scope.crmtk },
                                    data: $scope.json
                                }).then(function success(response) {
                                    parent.parent.alertify.success($scope.literais.LITERAL_336);
                                    $scope.fControleTrava();
                                    $scope.loadingState = false;
                                }, function error(response) {
                                    var sMsg
                                    if (response.status == 401) {
                                        sMsg = $scope.literais.LITERAL_403;
                                        parent.parent.alertify.error(sMsg);
                                    } else {
                                        if (response.data.error !== undefined) {
                                            sMsg = response.data.error;
                                            parent.parent.alertify.error(sMsg);
                                        } else {
                                            if (response.statusText == 'Conflict') {
                                                sMsg = $scope.literais.LITERAL_404;
                                                parent.parent.alertify.error(sMsg);

                                                $scope.CodBooking_net = response.data.numReserva;
                                                response.data.sBookingId = idAprovado;
                                                response.data.sProposta = idProposta;
                                                var params = { 'sJSON': response.data };
                                                callWS.get('/WVDF_WS/ws_hcgs3008.wso/pSaveRefNS/JSON', params).then(function(data) {
                                                    // if ($scope.proposta.refSeguro.length) {
                                                    //     if (insurances.targetCode == '') insurances.targetCode = $scope.proposta.refSeguro;
                                                    //     insurances.approval('EXPO').then(function(data){
                                                    $scope.fControleTrava();
                                                    //     })
                                                    // }
                                                    // else  $scope.fControleTrava();
                                                });
                                            }
                                        }
                                    }
                                    parent.parent.alertify.error($scope.literais.LITERAL_338);
                                    buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fSaveRetornoErroNetShip/JSON', 'sPropostaId=' + idProposta + '&sErro=' + sMsg).then(function(data) {});
                                    $scope.loadingState = false;
                                    return;
                                });
                            }
                        }, function error(response) {
                            parent.parent.alertify.error($scope.literais.LITERAL_339);
                            $scope.loadingState = false;
                            return;
                        });
                    });

            }, function error(response) {
                parent.parent.alertify.error(response.data);
                parent.parent.alertify.error($scope.literais.LITERAL_340);
                $scope.loadingState = false;
                return;
            });

        });
    } //INICIO BOOKING LCL EXPO

    $scope.elaborador_id = "";

    //INICIO BOOKING LCL IMPO
    $scope.GerarBookingLclImp = function() {
        $scope.loadingState = true;
        //  
        if ($scope.Booking.Shipper_id == '') {
            parent.parent.alertify.error($scope.literais.LITERAL_341);
            $scope.loadingState = false;
            return;
        }
        if ($scope.Booking.Cnee_id == '') {
            parent.parent.alertify.error($scope.literais.LITERAL_342);
            $scope.loadingState = false;
            return;
        }
        if ($scope.Booking.CS_id == '0' || $scope.Booking.CS_id == '' || $scope.Booking.CS_id == null) {
            parent.parent.alertify.error($scope.literais.LITERAL_343);
            $scope.loadingState = false;
            return;
        }
        if (!$scope.lsContatosAvancados.length) {
            parent.parent.alertify.error($scope.literais.LITERAL_344);
            $scope.loadingState = false;
            return;
        }

        if (!$scope.lsContatosAvancados.filter(e => e.aviso01 == true).length || !$scope.lsContatosAvancados.filter(e => e.aviso05 == true).length) {
            parent.parent.alertify.error($scope.literais.LITERAL_345);
            $scope.loadingState = false;
            return;
        }


        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fGeraBookingSI/JSON', 'sProposta=' + idProposta).then(function(data) {
            $scope.CodBooking = data.protocolo;
            parent.parent.alertify.success($scope.literais.LITERAL_346);
            $scope.elaborador_id = data.elaborador;
            var jsonEditProp = {
                "cliente": idCliente,
                "agente": data.agente,
                "SeuCliente": data.seuCliente,
                "portoOrigem": data.PoL, //$scope.proposta.pol.id
                "paisPortoOrigem": data.Ppol,
                "portoDestino": data.PoD, //$scope.proposta.pod.id
                "paisPortoDestino": data.Ppod,
                "via": data.via,
                "viaPais": "",
                "MoedaMaritimo": "",
                "TipoCalculo": data.pagamento,
                "Incoterm": $scope.proposta.incoterm,
                "Vendedor": data.vendedor,
                "Inside": data.inside,
                "Elaborador": data.elaborador,
                "PackingGroup": data.packingGroup,
                "TipoVolume": "",
                "TaxaMaritimoHouseImpo": data.taxas,
                "tipoContainer": data.containers,
                "EmissaoBL": data.emissaobl,
                "placeOfReceipt": data.PoR,
                "finalDestination": data.finalDest,
                "Shipper": data.shiper,
                "Consignee": data.cnee,
                "placeOfReceipt": data.PoR,
                "finalDestination": data.finalDest,
                "localEntregaDocTruck": data.local_documento,
                "localEntregaCargaTruck": data.local_carga,
                "tipoCarga": data.aTpCarga,
                "customerService": data.CS,
                "notify": data.notify,
                "comissaria": data.despachante
            };
            jsonEditProp = JSON.stringify(jsonEditProp);
            //console.log("envio_tradutor_data_LCLImp", jsonEditProp);
            //
            $http({
                method: 'POST',
                url: $scope.CRMURL + 'api/Tradutor/cotacao',
                data: jsonEditProp
            }).then(function success(response) {
                debugger;
                if (response.data.clienteCotacao == null) {
                    $scope.loadingState = false;
                    parent.parent.alertify.error($scope.literais.LITERAL_333);
                    return;
                }

                var autorizado = false;

                for (var i = response.data.log.length - 1; i >= 0; i--) {
                    if (response.data.log[i].origemID !== '0' && response.data.log[i].origemID !== null && response.data.log[i].origemID !== '-1') {
                        parent.parent.alertify.log(response.data.log[i].mensagem);
                        autorizado = true;
                    }
                }

                if (autorizado) {
                    $scope.loadingState = false;
                    parent.parent.alertify.error($scope.literais.LITERAL_347);
                    return;
                } else {
                    parent.parent.alertify.success($scope.literais.LITERAL_334);
                }

                var forVerify = response.data.taxaMaritimoHouseImpo;
                for (var i = forVerify.length - 1; i >= 0; i--) {
                    var texto = forVerify[i].nome;
                    texto = texto.replace('Ç', 'C');
                    texto = texto.replace('Ã', 'A');
                    texto = texto.replace('ç', 'c');
                    texto = texto.replace('ã', 'a');

                    forVerify[i].nome = texto;
                }
                response.data.taxaMaritimoHouseImpo = forVerify;

                response.data.aUsuarioSessao = aUsuarioSessao;
                response.data.idProposta = idProposta;
                var params = { 'sJSON': response.data };
                //console.log("envio_fSaveNetShipSI", JSON.stringify(params));
                
                callWS.get('/WVDF_WS/ws_hcgs3008.wso/fSaveNetShipSI/JSON', params)
                    .then(function(data) {
                        //
                        
                        parent.parent.alertify.success($scope.literais.LITERAL_335);
                        $scope.json = data.data;

                        //console.log(JSON.stringify($scope.json));

                        if ($scope.json.propostaCross == '' || $scope.json.propostaCross == undefined) {
                            parent.parent.alertify.error($scope.literais.LITERAL_348);
                            return;
                        }
                        var data = "grant_type=password&username=CROSSEDI&password=" + $scope.CRMPWD; //CRMCR4T 
                        $http.post($scope.CRMURL + 'api/token', data, {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).then(function success(response) {
                            $scope.crmtk = response.data.access_token;
                            
                            if ($scope.CodBooking_net == '' || $scope.CodBooking_net == undefined) {
                                //url: $scope.CRMURL + 'api/Netship/BRA/CotacaoImpo',
                                //url: 'http://localhost:21651/Netship/BRA/CotacaoImpo',
                                $http({
                                    method: 'POST',
                                    url: $scope.CRMURL + 'api/Netship/BRA/CotacaoImpo',
                                    headers: { 'Authorization': 'Bearer ' + $scope.crmtk },
                                    data: $scope.json
                                }).then(function success(response) {
                                    
                                    parent.parent.alertify.success($scope.literais.LITERAL_336);
                                    //$scope.GenerateFup();
                                    // $scope.CodBooking_net = response.data.numCotacao;
                                    $scope.CodBooking_net2 = response.data.numCotacao;
                                    response.data.sBookingId = idAprovado;
                                    response.data.sProposta = idProposta;
                                    var params = { 'sJSON': response.data };
                                    //    
                                    callWS.get('/WVDF_WS/ws_hcgs3008.wso/pSaveRefNS/JSON', params)
                                        .then(function(data) {
                                            
                                            $scope.reloadCacheBooking();

                                            parent.parent.alertify.success($scope.literais.LITERAL_337);
                                            $scope.fControleTrava();

                                            if ($scope.proposta.refSeguro.length) {
                                                if (insurances.targetCode == '') insurances.targetCode = $scope.proposta.refSeguro;
                                                insurances.approval('IMPO');
                                            }
                                        });
                                }, function error(response) {
                                    var sMsg
                                    console.log("%cerro", "font-size:22px;color:orange", response);
                                    if (response.status == 401) {
                                        sMsg = $scope.literais.LITERAL_403;
                                        parent.parent.alertify.error(sMsg);
                                    } else {
                                        if (response.data.message !== undefined) {
                                            sMsg = response.data.message;
                                            parent.parent.alertify.error(sMsg);
                                        } else {
                                            if (response.statusText == 'Conflict') {
                                                sMsg = $scope.literais.LITERAL_404;
                                                parent.parent.alertify.error(sMsg);

                                                $scope.CodBooking_net = response.data.numCotacao;
                                                response.data.sBookingId = idAprovado;
                                                response.data.sProposta = idProposta;
                                                var params = { 'sJSON': response.data };
                                                callWS.get('/WVDF_WS/ws_hcgs3008.wso/pSaveRefNS/JSON', params).then(function(data) {
                                                    $scope.fControleTrava();
                                                    if ($scope.proposta.refSeguro.length) {
                                                        if (insurances.targetCode == '') insurances.targetCode = $scope.proposta.refSeguro;
                                                        insurances.approval('IMPO');
                                                    }
                                                });
                                            }
                                        }
                                    }
                                    parent.parent.alertify.error($scope.literais.LITERAL_338);
                                    buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fSaveRetornoErroNetShip/JSON', 'sPropostaId=' + idProposta + '&sErro=' + sMsg).then(function(data) {});
                                    $scope.loadingState = false;
                                    return;
                                });
                            } else {
                                // $scope.reloadCache();
                                $http({
                                    method: 'PATCH',
                                    url: $scope.CRMURL + 'api/Netship/BRA/CotacaoImpo',
                                    //url:'http://localhost:21651/Netship/BRA/CotacaoImpo',
                                    headers: { 'Authorization': 'Bearer ' + $scope.crmtk },
                                    data: $scope.json
                                }).then(function success(response) {
                                    
                                    parent.parent.alertify.success($scope.literais.LITERAL_336);
                                    response.data.sBookingId = idAprovado;
                                    response.data.sProposta = idProposta;
                                    var params = { 'sJSON': response.data };
                                    //    
                                    callWS.get('/WVDF_WS/ws_hcgs3008.wso/pSaveRefNS/JSON', params)
                                        .then(function(data) {
                                            
                                            $scope.fControleTrava();
                                            // if ($scope.proposta.refSeguro.length) {
                                            //     if (insurances.targetCode == '') insurances.targetCode = $scope.proposta.refSeguro; 
                                            //     insurances.approval('IMPO');
                                            // }
                                            $scope.reloadCache();

                                            $scope.loadingState = false;
                                        });
                                }, function error(response) {
                                    var sMsg
                                    if (response.status == 401) {
                                        sMsg = $scope.literais.LITERAL_403;
                                        parent.parent.alertify.error(sMsg);
                                    } else {
                                        if (response.data.error !== undefined) {
                                            sMsg = response.data.error;
                                            parent.parent.alertify.error(sMsg);
                                        } else {
                                            if (response.statusText == 'Conflict') {
                                                sMsg = $scope.literais.LITERAL_404;
                                                parent.parent.alertify.error(sMsg);

                                                $scope.CodBooking_net = response.data.numCotacao;
                                                response.data.sBookingId = idAprovado;
                                                response.data.sProposta = idProposta;
                                                var params = { 'sJSON': response.data };
                                                callWS.get('/WVDF_WS/ws_hcgs3008.wso/pSaveRefNS/JSON', params).then(function(data) {
                                                    $scope.fControleTrava();
                                                    $scope.reloadCache();
                                                    // if ($scope.proposta.refSeguro.length) {
                                                    //     if (insurances.targetCode == '') insurances.targetCode = $scope.proposta.refSeguro; 
                                                    //     insurances.approval('IMPO');
                                                    // }
                                                });
                                            }
                                        }
                                    }
                                    parent.parent.alertify.error($scope.literais.LITERAL_338);
                                    buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fSaveRetornoErroNetShip/JSON', 'sPropostaId=' + idProposta + '&sErro=' + sMsg).then(function(data) {});
                                    $scope.loadingState = false;
                                    return;
                                });

                            }
                        }, function error(response) {
                            
                            parent.parent.alertify.error($scope.literais.LITERAL_339);
                            $scope.loadingState = false;
                            return;
                        });
                    });

            }, function error(response) {

                parent.parent.alertify.error(response.data);
                parent.parent.alertify.error($scope.literais.LITERAL_340);
                $scope.loadingState = false;
                return;
            });

        });
    } //FIM BOOKING LCL IMPO

    $scope.loadCarriers = function(query) {
        return buscaWS.get('/WVDF_WS/WS_csag320.wso/f_bCSAG342_armador/JSON', 'sInicial=' + query + "&sSessionId=" + aUsuarioSessao).then(function(data) {
            return data;
        });
    };

    $scope.loadNavios = function(query) {
        return buscaWS.get('/WVDF_WS/WS_hcgs3008.wso/fNavio_descricao/JSON', 'sInicial=' + query + "&sSessionId=" + aUsuarioSessao).then(function(data) {
            return data;
        });
    };

    $scope.acDocument = function(query) {
        return buscaWS.get('/WVDF_WS/WS_hcgs3008.wso/fDocumentacao_pessoa/JSON', 'sInicial=' + query + "&sSessionId=" + aUsuarioSessao).then(function(data) {
            return data;
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

    $scope.loadAutocomplete = function(texto) {

        var parametros = 'aInicio=' + texto;
        data = buscaWS.get('/WVDF_WS/ws_CSAG300.wso/f_UsuarioComplete/JSON', parametros)
            .then(function(data) {
                return data;
            });
        return data;

    };

    $scope.saveHistoricoTaxa = function() {
        var data = {
            "sPropostaId": idProposta,
            "sUsuarioSessao": aUsuarioSessao
        }

        $http.post("/wvdf_ws/ws_hsag564.wso/fSaveHistoricTax", data).then(function(response) {
            if (response.data) $scope.bShowLayer = true;
        });
    }

    $scope.clone = {};

    // Clonar a Proposta
    $scope.clonarProposta = function(oProposta) {
        $scope.clone.cliente = oProposta.dsCliente;
        $scope.clone.cliente_id = idCliente;
        $scope.clone.proposta = oProposta.idProposta;
        $scope.clone.produto = oProposta.modalidades;
    }

    $scope.fSaveCloneProp = function(oClone) {
        if (oClone.cliente.idCliente !== undefined) {
            oClone.cliente_id = oClone.cliente.idCliente;
        }

        var parametros = 'sClienteId=' + oClone.cliente_id + '&sProposta=' + oClone.proposta + '&sProduto=' + oClone.modulo;
        buscaWS.get('/WVDF_WS/ws_CSAG340.wso/fValidateClientProp/JSON', parametros).then(function(data) {

            if (data.infoDs == '') {
                if (data.info3 == "LCL") {
                    var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + data.infoId + "&idClone=" + data.info2;
                    window.top.jaddTab("Nova Proposta - LCL", url);
                }
            } else {
                parent.parent.alertify.error(data.infoDs);
                return;
            }

        });
    }

    $scope.refreshContatosAgente = function() {
        var data = {
            "aUsuarioSessao": aUsuarioSessao,
            "aPropostaId": idProposta,
            "aBookingId": idAprovado
        }

        $http.post("/wvdf_ws/ws_hsag559.wso/fListaContatosAgente", data).then(function(response) {
            $scope.lsContatosAgente = response.data;
        });
    }

    $scope.statusContactAgent = function(agente) {
        if (agente.bSelected) {
            var data = {
                "aUsuarioSessao": aUsuarioSessao,
                "aBookingId": idAprovado,
                "myContatosAgente": agente
            }

            $http.post("/wvdf_ws/ws_hsag559.wso/fSaveContatoAgente", data).then(function(response) {
                if (response.data.hasError) {
                    parent.parent.alertify.error(response.data.msgError);
                } else {
                    parent.parent.alertify.success(response.data.msgInfo);
                    agente.iHSAG559 = response.data.msgStep;
                    $scope.reloadCache();
                }
            });
        } else {
            var data = {
                "aUsuarioSessao": aUsuarioSessao,
                "aCodigo": agente.iHSAG559
            }

            $http.post("/wvdf_ws/ws_hsag559.wso/fDeleteContatoAgente", data).then(function(response) {
                if (response.data.hasError) {
                    parent.parent.alertify.error(response.data.msgError);
                } else {
                    parent.parent.alertify.success(response.data.msgInfo);
                    $scope.reloadCache();
                }
            });
        }
    }

    $scope.reloadCache = function() {
        insurances._getToken().then(function(response) {
            $http.put(urlAPIPadrao + "/api/freights/coordination/bookings/" + idProposta + "/refresh", {}, {
                headers: { 'Authorization': 'Bearer ' + response.securityToken }
            }).then(function(response) {
                if (response.status != 200) parent.parent.alertify.error("Não recarregou o cache!");
            });
        });
    }

    $scope.reloadCacheBooking = function() {
        insurances._getToken().then(function(response) {
            $http.put(urlAPIPadrao + "/api/freights/coordination/bookings/" + idProposta + "/refresh", {}, {
                headers: { 'Authorization': 'Bearer ' + response.securityToken }
            }).then(function(response) {
                if (response.status != 200) parent.parent.alertify.error("Não recarregou o cache!");
                $scope.GenerateFup();
            });
        });
    }

    function zerarEntrada() {
        $scope.entrada.recnum = "";
        $scope.entrada.pcs = 1;

        buscaWS.get('/WVDF_WS/ws_CCGS228.wso/f_CCGS228_pkg_type/JSON', '').then(function(data) {
            $scope.lsPackages = data;
            $scope.entrada.package = data[3];
        });

        $scope.entrada.weight = "";
        $scope.entrada.unitweight = "KG";
        $scope.entrada.length = "";
        $scope.entrada.width = "";
        $scope.entrada.height = "";
        $scope.entrada.UOM = "M";
        $scope.entrada.oversize = "";
        $scope.entrada.unitvolume = "CBM";
        $scope.entrada.haz.class = "";
        $scope.entrada.haz.un = "";
        $scope.entrada.haz.flash = "";
        $scope.entrada.haz.unitFlash = "C";
        $scope.entrada.haz.packing = "";

        $scope.entrada.total.weight = $scope.entrada.pcs * $scope.entrada.weight;
        $scope.entrada.total.volume = $scope.entrada.length * $scope.entrada.width * $scope.entrada.height;
    };

    var posicionaTabelas = function(data) {
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i].modalidade == 'FCL') {
                $scope.tbContainers.containerFCL.push(data[i]);

            } else if (data[i].modalidade == 'LCL') {
                $scope.tbContainers.containerLCL.push(data[i]);
            } else if (data[i].modalidade == 'AIR') {
                $scope.tbContainers.containerAIR.push(data[i]);
            }
        }
        $scope.tbContainers.stMercadoria.push(data[0]);

        $scope.calcTotalContainerLCL();
    }

    $scope.lockNewFCL = false;
    $scope.lockNewLCL = false;
    $scope.lockNewAIR = false;

    $scope.lockNewOrigem = false;
    $scope.lockNewFrete = false;
    $scope.lockNewDestino = false;

    $scope.btnTableSaveAdvancedRow = function(row, modalidade) {
        row.modalidade = modalidade;
        $scope.btnAddItem3(row);
        row.editable = false;
    }

    $scope.btnAddItem3 = function(entrada) {
        $scope.loadingState = true;

        var parametros = {};
        parametros = entrada;
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        parametros.aPROP = $scope.proposta.idProposta;
        parametros.aRecnum = entrada.aRecnum;
        parametros.aMod_Frt = entrada.modalidade;
        parametros.aPcs = entrada.pcs;
        parametros.package = entrada.package;
        parametros.aWght = entrada.weight;
        parametros.aWght_tp = entrada.unitweight;
        parametros.aLght = entrada.length;
        parametros.aWdth = entrada.width;
        parametros.aHght = entrada.height;
        parametros.aUOM = entrada.UOM;
        parametros.aEQUIP = entrada.equipamento;
        parametros.grossUnit = entrada.total.grossUnit;
        parametros.volumeUnit = entrada.total.volumeUnit;
        parametros.aTotalWeight = entrada.total.weight;
        parametros.aTotalVolume = entrada.total.volume;
        parametros.aTotalVolumeU = entrada.unitvolume;

        var param = { 'sJSON': parametros };
        
        $http({
            url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_advanced/JSON',
            method: 'GET',
            params: param
        }).success(function(data) {
            parent.parent.alertify.success($scope.literais.LITERAL_349);
        });
    };

    var montaParametrosCarga = function(entrada) {
        var aTotalWeight;
        var nValue1;

        if (entrada.total.weight == 0 || entrada.total.weight == '') {
            $scope.loadingState = false;
            parent.parent.alertify.error($scope.literais.LITERAL_350);
            return;
        }

        if (entrada.pcs == 0 || entrada.pcs == '') {
            $scope.loadingState = false;
            parent.parent.alertify.error($scope.literais.LITERAL_351);
            return;
        }

        if (entrada.total.grossUnit !== 'KG' && entrada.total.grossUnit !== 'LB') {
            $scope.loadingState = false;
            parent.parent.alertify.error($scope.literais.LITERAL_352);
            return;
        }
        if ($scope.proposta.modalidades == 'LCL') {
            if (entrada.total.volume == 0 || entrada.total.volume == '') {
                $scope.loadingState = false;
                parent.parent.alertify.error($scope.literais.LITERAL_353);
                return;
            }
            if (entrada.total.volumeUnit !== 'CBM' && entrada.total.volumeUnit !== 'CFT') {
                $scope.loadingState = false;
                parent.parent.alertify.error($scope.literais.LITERAL_352);
                return;
            }

            if (entrada.UOM == 'CM') {
                if (entrada.height > 220) { entrada.aOversize = 1 }
                if (entrada.length > 400) { entrada.aOversize = 1 }
                if (entrada.width > 228) { entrada.aOversize = 1 }
            }
            if (entrada.aUOM == 'Inches') {
                if (entrada.height > 79) { entrada.aOversize = 1 }
                if (entrada.length > 120) { entrada.aOversize = 1 }
                if (entrada.width > 79) { entrada.aOversize = 1 }
            }

            if (entrada.total.grossUnit == 'KG') {
                nValue1 = entrada.total.weight / entrada.pcs;
                if (nValue1 > 2000) { entrada.aOversize = 1 }
            }
            if (entrada.total.grossUnit == 'LB') {
                nValue1 = entrada.total.weight / entrada.pcs
                if (nValue1 > 4409.24) { entrada.aOversize = 1 }
            }

            if (entrada.total.grossUnit == 'LB') {
                aTotalWeight = entrada.total.weight / 2.20462;
            } else aTotalWeight = entrada.total.weight;

            if (entrada.total.volumeUnit == 'CBM' && aTotalWeight > 999) {
                nValue1 = aTotalWeight / entrada.total.volume;
                if (nValue1 > 1000) { entrada.aOversize = 1 }
            }

            if (entrada.total.volumeUnit == 'CBM' && aTotalWeight > 2999) {
                nValue1 = aTotalWeight / entrada.total.volume;
                if (nValue1 > 500) { entrada.aOversize = 1 }
            }

            if (entrada.total.volumeUnit == 'CBM' && entrada.total.volume > 14) { entrada.aOversize = 1 }
        }

        if ($scope.proposta.modalidades == 'FCL') {
            nValue1 = aTotalWeight / entrada.pcs;
            if (nValue1 > 28000) { entrada.aOversize = 1 }
        }

        if (entrada.aOversize == 1) parent.parent.alertify.log($scope.literais.LITERAL_354);
        else entrada.aOversize = 0;

        //Caso tenha algum NCM errado e não foi corrigido
        if (entrada.wMercadorias != undefined) {
            for (let i = 0; i < entrada.wMercadorias.length; i++) {
                if (entrada.wMercadorias[i].ncm.length != 4 && entrada.wMercadorias[i].ncm != "") {
                    entrada.wMercadorias[i].ncm = "";
                }
            }
        }

        var parametros = {};
        parametros = entrada;
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        parametros.aPROP = $scope.proposta.idProposta;
        parametros.aRecnum = entrada.aRecnum;
        parametros.aMod_Frt = entrada.modalidade;
        parametros.aPcs = entrada.pcs;
        parametros.package = entrada.package;
        parametros.aWght = entrada.weight;
        parametros.aWght_tp = entrada.unitweight;
        parametros.aLght = entrada.length;
        parametros.aWdth = entrada.width;
        parametros.aHght = entrada.height;
        parametros.aUOM = entrada.UOM;
        parametros.aEQUIP = entrada.equipamento;
        parametros.grossUnit = entrada.total.grossUnit;
        parametros.volumeUnit = entrada.total.volumeUnit;
        parametros.aTotalWeight = entrada.total.weight;
        parametros.aTotalVolume = entrada.total.volume;
        parametros.aTotalVolumeU = entrada.unitvolume;

        var param = { 'sJSON': JSON.stringify(parametros) };
        return param;
    }

    // $scope.btnAddItem2 = function(entrada) {
    //     var param = montaParametrosCarga(entrada);
    //     if (!param) return;
    //     $http({
    //         url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_save/JSON',
    //         method: 'GET',
    //         params: param
    //     }).success(function(data) {
    //         if (data.defaultMessage.msgInfo !== '') {
    //             parent.parent.alertify.log(data.defaultMessage.msgInfo);
    //             if (data.defaultMessage.msgSession == 1) {

    //                 $scope.ValidaCarga = true;
    //                 // $('').trigger('click');
    //                 $("#btnAlert3").trigger('click');
    //             }
    //             return;
    //         } else {
    //             parent.parent.alertify.success('Detalhe Salvo!');
    //             return;
    //         }
    //         if (data.defaultMessage.msgError !== '' && data.defaultMessage.hasError == false) {
    //             $scope.proposta.sStatus = data.defaultMessage.msgError;
    //         }
    //     });
    // };

    $scope.btnDeleteItem = function(item) {
        $scope.loadingState = true;

        buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'sRECNUM=' + item.recnum).then(function(data) {
            $scope.entrada.recnum = "";
            var index = $scope.lsItems[item.modalidade].indexOf(item);
            $scope.lsItems[item.modalidade].splice(index, 1);
            $scope.loadingState = false;

            parent.parent.alertify.success($scope.literais.LITERAL_355);
            return;

        });
    };

    $scope.btnEditItem = function(item) {
        var index = $scope.lsItems[item.modalidade].indexOf(item);
        $scope.lsItems[item.modalidade].splice(index, 1);

        delete item.package.$$hashKey;

        $scope.entrada = angular.copy(item);
    };

    $scope.btnVisualizarProposta = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_HCGS3004_Status/JSON', 'aProp=' + $scope.proposta.idProposta).then(function(data) {

            if (data == 3) {
                parent.parent.alertify.error($scope.literais.LITERAL_356);
                return;
            }
            if (data == 4) {
                parent.parent.alertify.error($scope.literais.LITERAL_357);
                return;
            }
            if (data == 10) {
                parent.parent.alertify.error($scope.literais.LITERAL_358);
                return;
            }
            if (data == 11 || data == 12) {
                parent.parent.alertify.error($scope.literais.LITERAL_359);
                return;
            }
            if (data == 5) {
                parent.parent.alertify.error($scope.literais.LITERAL_360);
                return;
            }

            var url = "PCGS3004_04.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + $scope.proposta.idProposta;
            window.open(url, 'propostadefrete', 'width=250px');

        });
    };

    $scope.btnVisualizarProposta_02 = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_HCGS3004_Status/JSON', 'aProp=' + $scope.proposta.idProposta).then(function(data) {

            if (data == 3) {
                parent.parent.alertify.error($scope.literais.LITERAL_356);
                return;
            }
            if (data == 4) {
                parent.parent.alertify.error($scope.literais.LITERAL_357);
                return;
            }
            if (data == 10) {
                parent.parent.alertify.error($scope.literais.LITERAL_358);
                return;
            }
            if (data == 11 || data == 12) {
                parent.parent.alertify.error($scope.literais.LITERAL_359);
                return;
            }
            if (data == 5) {
                parent.parent.alertify.error($scope.literais.LITERAL_360);
                return;
            }

            var url = "PCGS3004_04_02.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + $scope.proposta.idProposta;
            window.open(url, 'propostadefrete', 'width=250px');

        });
    };

    $scope.btnVisualizarAcordo = function(sLink, sAcd) {
        var url = sLink + getVariavelURL('aUsuarioSessao') + '#/tab1';
        window.top.jaddTab($scope.literais.LITERAL_361 + sAcd, url);
    }

    $scope.btnVisualizarSI = function() {

        if ($scope.Booking.Cnee_id == '') {
            parent.parent.alertify.error($scope.literais.LITERAL_342);
            $scope.loadingState = false;
            return;
        }
        var url = "PCGS3004_05.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + $scope.proposta.idProposta;
        window.open(url, 'Shipping Instruction', 'width=250px');
    };

    $scope.btnVisualizarBook = function() {
        var url = "PCGS3008_04.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + $scope.proposta.idProposta;
        window.open(url, 'Booking', 'width=250px');
    };

    //CUSTOMER SERVICE
    $scope.loadAutocomplete = function(query) {
        var parametros = 'aInicio=' + query;
        data = buscaWS.get('/WVDF_WS/ws_CSAG300.wso/f_CustomerServiceComplete/JSON', parametros)
            .then(function(data) {
                return data;
            });
        return data;
    };

    $scope.acCarrier = function(texto) {
        return $scope.proposta.carrier;
    }

    $scope.loadCidadesByPaisOrig = function(query, paisID) {
        if (paisID == undefined)
            paisID = '';
        if (query.length > 2) {

            var parametros = 'sPais=' + paisID + '&sCidade=' + query + '&sMod=' + $scope.proposta.modalidades + '&sCliente=' + idCliente;
            var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/propostaCidadeOrigem/JSON', parametros)
                .then(function(data) {
                    return data;
                });
            return data;
        }
    };

    $scope.loadCidadesByPaisDest = function(query, paisID) {
        if (paisID == undefined)
            paisID = '';
        if (query.length > 2) {

            var parametros = 'sPais=' + paisID + '&sCidade=' + query + '&sMod=' + $scope.proposta.modalidades + '&sCliente=' + idCliente + '&sPol=' + $scope.proposta.pol.id;
            var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/propostaCidadeDestino/JSON', parametros)
                .then(function(data) {
                    return data;
                });
            return data;
        }
    };

    $scope.getOrigemDestino = function(query, paisID) {
        if (paisID == undefined)
            paisID = '';
        if (query.length > 2) {
            const pais = $scope.lsPais.find(x => x.ID === paisID);

            var data = {
                "aUsuarioSessao": getVariavelURL('aUsuarioSessao'),
                "aCidade": query,
                "aPaisSiglaIso": pais.SI,
                "aCliente": idCliente,
                "aPais": paisID,
                "aMod": $scope.proposta.modalidades
            }

            return $http.post("/wvdf_ws/ws_csag325.wso/propostaOrigemDestino", data).then(function(response) {
                return response.data;
            });

        }
    };

    $scope.changeIMO = function(imo, bagagem) {
        $scope.filterMercadoria = '0';
        if (imo) {
            for (var i = 0; i < $scope.wMercadorias.length; i++) {
                if ($scope.wMercadorias[i].editable) {
                    $scope.wMercadorias[i].mercadoria = '13';
                } else {
                    if ($scope.wMercadorias[i].mercadoria != '13') {
                        $scope.wMercadorias[i].editable = true;
                        $scope.wMercadorias[i].mercadoria = '13';
                    }
                }
            }
        } else {
            if (bagagem) {
                for (var i = 0; i < $scope.wMercadorias.length; i++) {
                    if ($scope.wMercadorias[i].editable) {
                        $scope.wMercadorias[i].mercadoria = '14';
                    } else {
                        if ($scope.wMercadorias[i].mercadoria == '13') {
                            $scope.wMercadorias[i].editable = true;
                            $scope.wMercadorias[i].mercadoria = '14';
                        }
                    }
                }
            } else {
                $scope.filterMercadoria = '1';
                for (var i = 0; i < $scope.wMercadorias.length; i++) {
                    if ($scope.wMercadorias[i].editable) {
                        $scope.wMercadorias[i].mercadoria = '1';
                    } else {
                        if ($scope.wMercadorias[i].mercadoria == '13') {
                            $scope.wMercadorias[i].editable = true;
                            $scope.wMercadorias[i].mercadoria = '1';
                        }
                    }
                }
            }
        }
    }

    $scope.changeBagagem = function(bagagem, imo) {
        $scope.filterMercadoria = '0';
        if (bagagem) {
            for (var i = 0; i < $scope.wMercadorias.length; i++) {
                if ($scope.wMercadorias[i].editable) {
                    $scope.wMercadorias[i].mercadoria = '14';
                } else {
                    if ($scope.wMercadorias[i].mercadoria != '14') {
                        $scope.wMercadorias[i].editable = true;
                        $scope.wMercadorias[i].mercadoria = '14';
                    }
                }
            }
        } else {
            if (imo) {
                for (var i = 0; i < $scope.wMercadorias.length; i++) {
                    if ($scope.wMercadorias[i].editable) {
                        $scope.wMercadorias[i].mercadoria = '13';
                    } else {
                        if ($scope.wMercadorias[i].mercadoria == '14') {
                            $scope.wMercadorias[i].editable = true;
                            $scope.wMercadorias[i].mercadoria = '13';
                        }
                    }
                }
            } else {
                $scope.filterMercadoria = '1';
                for (var i = 0; i < $scope.wMercadorias.length; i++) {
                    if ($scope.wMercadorias[i].editable) {
                        $scope.wMercadorias[i].mercadoria = '1';
                    } else {
                        if ($scope.wMercadorias[i].mercadoria == '14') {
                            $scope.wMercadorias[i].editable = true;
                            $scope.wMercadorias[i].mercadoria = '1';
                        }
                    }
                }
            }
        }
    }

    $scope.loadAgentes = function(query) {

        if (query.length > 3) {
            var parametros = 'sInicio=' + query;
            var data = buscaWS.get('/WVDF_WS/ws_csag345.wso/f_agentes_descricao/JSON', parametros)
                .then(function(data) {
                    return data;
                });
            return data;
        }
    };

    $scope.loadTerminal = function(query) {

        if (query.length > 3) {
            var parametros = 'sInicio=' + query;
            var data = buscaWS.get('/WVDF_WS/ws_csag346.wso/f_terminal_descricao/JSON', parametros)
                .then(function(data) {
                    return data;
                });
            return data;
        }
    };

    $scope.loadClientesTag = function(query) {
        var parametros = 'sInicio=' + query;
        var data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_fup_concorrente/JSON', parametros)
            .then(function(data) {
                return data;
            });
        return data;
    };

    $scope.loadTotals = function() {
        $scope.loadingState = true;
        var parametros = 'aProp=' + idProposta;
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_kg_cbm/JSON', parametros)
            .then(function(data) {
                $scope.proposta.ttcbm = data.cbm;
                $scope.proposta.ttgw = data.gw;
                $scope.proposta.ttpcs = data.pcs;
                $scope.loadingState = false;
            });
    }

    $scope.ValuesChange = function(row) {
        row.total.weight = String(row.total.weight).replace(',', '.');
        row.total.volume = String(row.total.volume).replace(',', '.');
    }

    $scope.count = function(row) {

        row.weight = String(row.weight).replace(',', '.');

        if (row.weight !== '0' && row.weight !== '') row.total.weight = row.pcs * parseFloat(row.weight);

        $scope.calcTotalContainerLCL();
    }

    $scope.applyCalcVolume = function(row) {
        row.height = String(row.height).replace(',', '.');
        row.length = String(row.length).replace(',', '.');
        row.width = String(row.width).replace(',', '.');

        if (row.UOM == '' || row.total.volumeUnit == '')
            return;

        var H = row.height;
        var L = row.length;
        var W = row.width;

        if (H == 0 || L == 0 || W == 0) return;
        if (row.UOM == "CM") {
            H /= 100;
            L /= 100;
            W /= 100;
        } else if (row.UOM == "Inches") {
            H = inchesToMeters(H);
            L = inchesToMeters(L);
            W = inchesToMeters(W);
        }

        if (row.total.volumeUnit == "CBM") {
            row.total.volume = arredonda(calcCBM(L, W, H, row.pcs), 4);
        } else if (row.total.volumeUnit == "CFT") {
            row.total.volume = arredonda(calcCFT(L, W, H, row.pcs), 4);
        }

        $scope.calcTotalContainerLCL();
    }

    var arredonda = function(numero, casasDecimais) {
        casasDecimais = typeof casasDecimais !== 'undefined' ? casasDecimais : 2;
        return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
    };

    var calcCBM = function(L, W, H, qtde) {
        return L * W * H * qtde;
    }

    var calcCFT = function(L, W, H, qtde) {
        L = metersToInches(L);
        W = metersToInches(W);
        H = metersToInches(H);

        return ((L / 12) * (W / 12) * (H / 12)) * qtde;
    }

    var calcLB = function(value, qtde) {
        value = kilogramsToLibras(value);

        return (value * qtde);
    }

    var metersToInches = function(value) {
        return value / 0.0254;
    }

    var inchesToMeters = function(value) {
        return value * 0.0254;
    }

    var metersToFeet = function(value) {
        return value / 0.3048;
    }

    var feetToMeters = function(value) {
        return value * 0.3048;
    }

    var kilogramsToLibras = function(value) {
        return value / 2.20462;
    }

    var librasToKilograms = function(value) {
        return value * 2.20462;
    }

    $scope.CBMxCFT = function(row) {
        if (row.total.volumeUnit == "CBM") {
            row.total.volume = arredonda(row.total.volume * 0.0283, 4);
        } else if (row.total.volumeUnit == "CFT") {
            row.total.volume = arredonda(row.total.volume * 35.3147, 4);
        }
        $scope.calcTotalContainerLCL();
    }

    $scope.cloneContainerFCL = function(index) {
        var nobj = JSON.parse(JSON.stringify($scope.tbContainers.containerFCL[index]));
        nobj.editable = true;
        nobj.aRecnum = '';
        $scope.tbContainers.containerFCL.unshift(nobj);
    }
    $scope.cloneContainerLCL = function(index) {

        var nobj = JSON.parse(JSON.stringify($scope.tbContainers.containerLCL[index]));
        nobj.editable = true;
        nobj.aRecnum = '';
        $scope.tbContainers.containerLCL.unshift(nobj);
        $scope.calcTotalContainerLCL();
    }

    $scope.cloneContainerAIR = function(index) {

        var nobj = JSON.parse(JSON.stringify($scope.tbContainers.containerAIR[index]));
        nobj.editable = true;
        nobj.aRecnum = '';
        $scope.tbContainers.containerAIR.unshift(nobj);
    }

    $scope.excluirRowFCL = function(index) {
        var cnt = $scope.tbContainers.containerFCL[index];

        if (cnt.aRecnum == '') {
            $scope.tbContainers.containerFCL.splice(index, 1);
        } else {
            buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'aRecnum=' + cnt.aRecnum).then(function(data) {

                if (data.defaultMessage.hasError) {
                    parent.parent.alertify.error(data.defaultMessage.msgError);
                } else {
                    parent.parent.alertify.success(data.defaultMessage.msgInfo);
                }

                refreshTabelas();
                $scope.Notify();
                $scope.loadTotals();
            });
        }
    }
    $scope.excluirRowLCL = function(index) {
        var cnt = $scope.tbContainers.containerLCL[index];

        if (cnt.aRecnum == '') {
            $scope.tbContainers.containerLCL.splice(index, 1);
        } else {
            buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'aRecnum=' + cnt.aRecnum).then(function(data) {
                if (data.defaultMessage.hasError) {
                    parent.parent.alertify.error(data.defaultMessage.msgError);
                } else {
                    parent.parent.alertify.success(data.defaultMessage.msgInfo);
                }
                refreshTabelas();
            });
        }
    }

    $scope.btnDelMercadoria = function(row) {
        // 
        var cnt = row.srecnum;
        var index = $scope.wMercadorias.indexOf(row);

        if (cnt == '') {
            $scope.wMercadorias.splice(index, 1);
        } else {
            buscaWS.get('/WVDF_WS/ws_hsag560.wso/pDelMercadoria/JSON', 'aRecnum=' + cnt).then(function(data) {
                $scope.wMercadorias.splice(index, 1);
            });
        }
    }

    var createNullMercadoria = function() {
        var mercado = {};
        mercado.mercadoria = '';
        if ($scope.Detalhes.imo) {
            $scope.filterMercadoria = '0';
            mercado.mercadoria = '13';
        }
        if ($scope.Detalhes.bagagem) {
            $scope.filterMercadoria = '0';
            mercado.mercadoria = '14';
        }
        mercado.erroNCM = false;
        mercado.descricao = '';
        mercado.ncm = '';
        mercado.un = '';
        mercado.classe = '';
        mercado.pkg = '';
        mercado.subrisk = '';
        mercado.editable = true;
        mercado.srecnum = '';
        return mercado;
    }
    var createNullContainer = function() {
        var ncontainer = {};
        ncontainer.arr_hz = {};
        ncontainer.arr_hz.package = {};
        ncontainer.recnum = '';
        ncontainer.aRecnum = '';
        ncontainer.modalidade = '';
        ncontainer.pcs = 1;
        ncontainer.package = '';
        ncontainer.weight = 0;
        ncontainer.length = 0;
        ncontainer.width = 0;
        ncontainer.equipamento = '';
        ncontainer.height = 0;
        ncontainer.total = {};
        ncontainer.total.weight = 0;
        ncontainer.total.volume = 0;
        ncontainer.volume = 0;
        ncontainer.unitvolume = '';
        ncontainer.total.volumeUnit = 'CBM';
        ncontainer.editable = true;
        ncontainer.aHaz_Fl = '';
        ncontainer.aHaz_Temp = '';

        ncontainer.arr_hz.Origin = '';
        ncontainer.arr_hz.bagagem = '0';
        ncontainer.arr_hz.classimo = '';
        ncontainer.arr_hz.consAnimal = '0';
        ncontainer.arr_hz.consHumano = '0';
        ncontainer.arr_hz.imo = '0';
        ncontainer.arr_hz.lift = '';
        ncontainer.arr_hz.limited = 'N';
        ncontainer.arr_hz.mercadorias = [];
        ncontainer.arr_hz.nempilhavel = '0';
        ncontainer.arr_hz.shipperctnr = '0';
        ncontainer.arr_hz.outros = '0';
        ncontainer.arr_hz.outrosTxt = '';
        ncontainer.arr_hz.over = '';
        ncontainer.arr_hz.package.ID = '';
        ncontainer.arr_hz.package.DS = '';
        ncontainer.arr_hz.packing = '';
        ncontainer.arr_hz.personnal = 'N';
        ncontainer.arr_hz.pkg = '';
        ncontainer.arr_hz.residential = 'N';
        ncontainer.arr_hz.subclassimo = '';
        ncontainer.arr_hz.un = '';
        ncontainer.arr_hz.unitFlash = '';

        ncontainer.unitweight = 'KG';
        ncontainer.UOM = 'CM';
        ncontainer.total.grossUnit = 'KG';
        ncontainer.total.volumeUnit = 'CBM';
        return ncontainer;
    }

    var refreshTabelas = function() {
        // 
        buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_lista/JSON', 'aProposta=' + $scope.proposta.idProposta).then(function(data) {
            $scope.tbContainers.containerFCL = [];
            $scope.tbContainers.containerLCL = [];
            $scope.tbContainers.containerAIR = [];

            posicionaTabelas(data);

            data.forEach(function(oItem) {
                oItem.recnum = oItem.srecum;
                delete oItem.srecum;
                $scope.lsItems[oItem.modalidade].push(angular.copy(oItem));
            });

        });

    }

    $scope.addMercadoria = function() {
        $scope.wMercadorias.unshift(createNullMercadoria());
    }

    $scope.addContainerFCL = function() {
        $scope.tbContainers.containerFCL.unshift(createNullContainer());
        $scope.lockNewFCL = true;
    }

    $scope.addContainerLCL = function() {
        $scope.tbContainers.containerLCL.unshift(createNullContainer());
        $scope.lockNewLCL = true;
        $scope.calcTotalContainerLCL();
    }

    $scope.addContainerAIR = function() {
        $scope.tbContainers.containerAIR.unshift(createNullContainer());
        $scope.lockNewAIR = true;
    }

    $scope.fnChangeDate = function() {

        parametros = 'dValidade=' + $scope.proposta.validadeDe;
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_validade/JSON', parametros).then(function(data) {

            $scope.proposta.validadeAte = data;
        });

    }

    $scope.hideAbaixo = true;

    // AutoComplete de Clientes
    $scope.acClientes = function(texto) {
        return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/fCompleteClienteTp/JSON', 'sInicio=' + texto).then(function(data) {
            return data;
        });
    };

    // AutoComplete de Pessoas Impo
    $scope.acPessoas = function(texto) {
        return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/fCompletePessoas/JSON', 'sInicio=' + texto).then(function(data) {
            return data;
        });
    };

    var validarCampos = function(oProposta) {
        //Marca
        if (oProposta.marca == '' || oProposta.marca == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_362);
            return false;
        }
        //TIPO OPERACAO
        if (oProposta.operacao == '' || oProposta.operacao == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_363);
            return false;
        }

        //MODALIDADE
        if (oProposta.modalidades == '' || oProposta.modalidades == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_364);
            return false;
        }

        //INCOTERM
        if (oProposta.incoterm == '' || oProposta.incoterm == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_326);
            return false;
        }
        //EMBARQUE
        if (oProposta.embarque == '' || oProposta.embarque == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_327);
            return false;
        } else {
            //DOOR-DOOR
            if (oProposta.embarque === '4') {
                if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisDestino == '' ||
                    oProposta.cidadeDestino == '' || oProposta.cepOrigem == '' || oProposta.cepDestino == '') {
                    parent.parent.alertify.error($scope.literais.LITERAL_328);
                    return false;
                }
            }
            //DOOR-PORT
            if (oProposta.embarque === '3') {
                if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisPod == '' ||
                    oProposta.pod == '' || oProposta.cepOrigem == '') {
                    parent.parent.alertify.error($scope.literais.LITERAL_328);
                    return false;
                }
            }
            //PORT-PORT
            if (oProposta.embarque === '1') {
                if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisPod == '' || oProposta.pod == '') {
                    parent.parent.alertify.error($scope.literais.LITERAL_328);
                    return false;
                }
            }
            //PORT-DOOR
            if (oProposta.embarque === '2') {
                if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisDestino == '' ||
                    oProposta.cidadeDestino == '' || oProposta.cepDestino == '') {
                    parent.parent.alertify.error($scope.literais.LITERAL_328);
                    return false;
                }
            }
        }

        //Att Inland
        // } else {
        //     //DOOR-DOOR
        //     if (oProposta.embarque === '4' && $scope.origemDoorSelected.sTaxInlandId == 0) {
        //         if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisPod == '' ||
        //             oProposta.pod == '' || oProposta.cepOrigem == '') {
        //             parent.parent.alertify.error($scope.literais.LITERAL_328);
        //             return false;
        //         }
        //     }            
        //     if (oProposta.embarque === '4' && $scope.destinoDoorSelected.sTaxInlandId == 0) {
        //         if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisDestino == '' ||
        //             oProposta.cidadeDestino == '' || oProposta.cepDestino == '') {
        //             parent.parent.alertify.error($scope.literais.LITERAL_328);
        //             return false;
        //         }
        //     }                
        //     //DOOR-PORT
        //     if (oProposta.embarque === '3' && $scope.origemDoorSelected.sTaxInlandId == 0) {
        //         if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisPod == '' ||
        //             oProposta.pod == '' || oProposta.cepOrigem == '') {
        //             parent.parent.alertify.error($scope.literais.LITERAL_328);
        //             return false;
        //         }
        //     }
        //     //PORT-PORT
        //     if (oProposta.embarque === '1') {
        //         if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisPod == '' || oProposta.pod == '') {
        //             parent.parent.alertify.error($scope.literais.LITERAL_328);
        //             return false;
        //         }
        //     }
        //     //PORT-DOOR
        //     if (oProposta.embarque === '2' && $scope.destinoDoorSelected.sTaxInlandId == 0) {
        //         if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisDestino == '' ||
        //             oProposta.cidadeDestino == '' || oProposta.cepDestino == '') {
        //             parent.parent.alertify.error($scope.literais.LITERAL_328);
        //             return false;
        //         }
        //     }
        // }

        if (oProposta.pod != '' && oProposta.pol != '') { //&& $scope.lsVia.length > 1
            if (oProposta.VIA == '') {
                parent.parent.alertify.error($scope.literais.LITERAL_329);
                return false;
            }
        }

        return true;
    }


    $scope.BtnAprovar = function() {


        $scope.loadingState = true;

        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fAutoAprovacaoBooking/JSON', 'sPropostaId=' + $scope.proposta.idProposta).then(function(data) {
            //refaz a url da aba para incrementar os dados e passar para a fase de booking automatica.
            if (data.hasError) {
                parent.parent.alertify.error(data.msgError);
                $scope.loadingState = false;
                return;
            } else {

                parent.parent.alertify.success($scope.literais.LITERAL_365);
                var name = 'idProposta';
                var name2 = 'Booking';
                var value = $scope.proposta.idProposta;
                var value2 = data.msgInfo;
                var href = window.location.href;
                href = href.replace(/(#\/tab\d)/, "");
                var regex = new RegExp("[&\\?]" + name + "=");
                var validProposta = getVariavelURL('idProposta');
                if (validProposta !== undefined && validProposta !== false) window.location.href = href + "&" + name2 + "=" + value2;
                else window.location.href = href + "&" + name + "=" + value + "&" + name2 + "=" + value2;

                $scope.loadingState = false;

            }
        });

    }

    $scope.btnSalvar = function(oProposta) {
        if (!validarCampos(oProposta)) return;
        $scope.loadingState = true;
        var aux = angular.copy(oProposta);
        debugger;
        aux.sMercadoria = oProposta.sMercadoria;

        if (oProposta.carrier !== '' && oProposta.carrier !== undefined) { aux.carrier = oProposta.carrier.id; } else { aux.carrier = ''; }

        aux.sStatus = oProposta.sStatus;

        //--- Comentarios.
        aux.sCommons = '';
        aux.sCust_Ref = '';
        aux.sInt_Ref = '';
        aux.sCust_Inst = '';

        //--- PERMISSAO
        aux.permissao = $scope.permissao;

        aux.produtos = "";
        aux.modalidades = oProposta.modalidades;

        if (!angular.isUndefined(oProposta.pol)) {
            if (oProposta.pol !== '') {
                aux.pol = oProposta.pol.id;
            }
        }
        if (!angular.isUndefined(oProposta.pod)) {
            if (oProposta.pod !== '') {
                aux.pod = oProposta.pod.id;
            }
        }
        if (!angular.isUndefined(oProposta.cidadeOrigem)) {
            if (oProposta.cidadeOrigem != '') {
                aux.cidadeOrigem = oProposta.cidadeOrigem.id;
            }
        }
        if (!angular.isUndefined(oProposta.cidadeDestino)) {
            if (oProposta.cidadeDestino != '') {
                aux.cidadeDestino = oProposta.cidadeDestino.id;
            }
        }

        aux.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        aux.cliente = getVariavelURL('idCliente');

        if ((aux.incoterm == 'EXW' || aux.incoterm == 'FCA' || aux.incoterm == 'DAP' || aux.incoterm == 'DDP') && aux.paisDestino == "" && aux.paidPod) {
            return parent.parent.alertify.error($scope.literais.LITERAL_330);
        }

        $scope.hideAbaixo = false;
        aux.motivoCancelamento = $scope.proposta.motivoCancelamento;
        idProposta = $scope.proposta.idProposta;
        if (idProposta != false)
            aux.idProposta = idProposta;
        else
            aux.idProposta = '';
        
        $scope.parametros300401 = aux;
        aux.clienteFinal = oProposta.sClienteFinal;
        aux.solicitante = oProposta.solicitante ? oProposta.solicitante.id : '';

        //att Inland
        // if (oProposta.embarque==3 || oProposta.embarque==4) {
        //     aux.aDoorOrigemName = $scope.origemDoorSelected.sExibe;
        //     aux.aDoorOrigemId = $scope.origemDoorSelected.sTaxInlandId;
        // }
        // else {
        //     aux.aDoorOrigemName = '';
        //     aux.aDoorOrigemId = 0;
        // }
        // if (oProposta.embarque==2 || oProposta.embarque==4) {
        //     aux.aDoorDestinoName = $scope.destinoDoorSelected.sExibe;
        //     aux.aDoorDestinoId = $scope.destinoDoorSelected.sTaxInlandId;
        // }
        // else {
        //     aux.aDoorDestinoName = '';
        //     aux.aDoorDestinoId = 0;
        // }

        var params = { 'sJSON': aux }
        //console.log(params);

        $scope.loadingState = true;
        
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/fGravarHCGS3004/JSON', params).then(function success(response) {
            $scope.showVendedorCombo = false;
            // 
            if (response.data.idProposta == '') {
                //console.log('error', response);
                $scope.loadingState = false;
                parent.parent.alertify.error($scope.literais.LITERAL_366);
                parent.parent.alertify.error($scope.literais.LITERAL_367);
                return;
            }

            if (!response.data.defaultMessage.hasError) {
                if ($scope.proposta.vendedor.DS == undefined) {} else {
                    $scope.proposta.vendedor = $scope.proposta.vendedor.DS;
                }

                $scope.proposta.idProposta = response.data.idProposta;

                if (idProposta == 0) { idProposta = response.data.idProposta; }

                parent.parent.alertify.success(response.data.defaultMessage.msgInfo);
                //save detalhes de carga
                
                $scope.detalheCargaSaveLCL();
                $scope.reloadCache();

                $scope.hideAbaixo = false;
            } else {
                parent.parent.alertify.error(response.data.defaultMessage.msgError);
                $scope.loadingState = true;
            }
        }, function error(response) {
            //console.log('error', response);
            parent.parent.alertify.error($scope.literais.LITERAL_366);
            parent.parent.alertify.error($scope.literais.LITERAL_367);
            return;
        });
    };

    $scope.btnVoltar = function() {
        aux = {}
        aux.cliente = 0;
        aux.proposta = $scope.proposta.idProposta;
        var url = '';

        if (getVariavelURL('idCliente').length > 0) {
            aux.cliente = getVariavelURL('idCliente');
            url = "PCGS3004_06.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idVendedor=" + getVariavelURL('idVendedor') + "&idCliente=" + aux.cliente + "&idProposta=" + aux.proposta;
        } else {
            url = "PCGS3004_00.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
        }
        window.location = url;
    };

    $scope.checkItem = function(id) {
        var checked = false;
        if (id == 1)
            checked = true;

        return checked;
    };

    $scope.checkItemCarrier = function(id) {
        var checked = false;
        if (id == 1)
            checked = true;

        return checked;
    };

    function arrayObjectIndexOf(arr, obj) {
        for (var i = 0; i < arr.length; i++) {
            if (angular.equals(arr[i], obj)) {
                return i;
            }
        };
        return -1;
    }

    $scope.exibeSeguro = false;

    $scope.setNgTables = function() {
        $scope.exibeSeguro = false;
        for (var i = 0; i < $scope.lsAplicar.length; i++) {
            $scope.tabledata[i] = {};
            $scope.tabledata[i].tableParamsOrigem = $filter('filter')($scope.lsAplicar[i].arr_ptx, { 'aClass': 'O' });
            $scope.tabledata[i].tableParamsFrete = $filter('filter')($scope.lsAplicar[i].arr_ptx, { 'aClass': 'F' });
            $scope.tabledata[i].tableParamsDestino = $filter('filter')($scope.lsAplicar[i].arr_ptx, { 'aClass': 'D' });
            $scope.tabledata[i].tableParamsEspeciais = $filter('filter')($scope.lsAplicar[i].arr_ptx, { 'aClass': 'S' });

            if ($scope.tabledata[i].tableParamsFrete.length)
                $scope.exibeSeguro = true;
        }

        for (var i = $scope.tabledata[0].tableParamsOrigem.length - 1; i >= 0; i--) {

            if ($scope.tabledata[0].tableParamsOrigem[i].aStatus == 1)
                $scope.tabledata[0].tableParamsOrigem[i].aStatus = true;
            else
                $scope.tabledata[0].tableParamsOrigem[i].aStatus = false;
        }

        for (var i = $scope.tabledata[0].tableParamsFrete.length - 1; i >= 0; i--) {

            if ($scope.tabledata[0].tableParamsFrete[i].aStatus == 1)
                $scope.tabledata[0].tableParamsFrete[i].aStatus = true;
            else
                $scope.tabledata[0].tableParamsFrete[i].aStatus = false;
        }

        for (var i = $scope.tabledata[0].tableParamsDestino.length - 1; i >= 0; i--) {

            if ($scope.tabledata[0].tableParamsDestino[i].aStatus == 1)
                $scope.tabledata[0].tableParamsDestino[i].aStatus = true;
            else
                $scope.tabledata[0].tableParamsDestino[i].aStatus = false;
        }

        // for (var i = $scope.tabledata[0].tableParamsEspeciais.length - 1; i >= 0; i--) {

        //     if ($scope.tabledata[0].tableParamsEspeciais[i].aStatus == 1)
        //         $scope.tabledata[0].tableParamsEspeciais[i].aStatus = true;
        //     else
        //         $scope.tabledata[0].tableParamsEspeciais[i].aStatus = false;
        // }

        if ($scope.tabledata[0].tableParamsDestino.length !== 0) { $scope.acordeonDestino = true; }
        if ($scope.tabledata[0].tableParamsOrigem.length !== 0) { $scope.acordeonOrigem = true; }
        if ($scope.tabledata[0].tableParamsFrete.length !== 0) { $scope.acordeonFrete = true; }
        if ($scope.tabledata[0].tableParamsEspeciais.length !== 0) { $scope.acordeonEspecial = true; }

    };

    var getTaxas = function() {
        // 
        var params = {
            'aClasse': 'O'
        };
        callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params).then(function(response) {
            $scope.lsTaxasO = response.data;
        });

        params = {
            'aClasse': 'F'
        };
        callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params).then(function(response) {
            $scope.lsTaxasF = response.data;
        });

        params = {
            'aClasse': 'D'
        };
        callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params).then(function(response) {
            $scope.lsTaxasD = response.data;
        });
        params = {
            'aClasse': 'S'
        };
        callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params).then(function(response) {
            $scope.lsTaxasS = response.data;
        });
        params = {
            'aClasse': ''
        }
        $scope.loadingState = false;
    };

    // ALIMENTA PRINCIPAL DO ARRAY DA COMISSAO
    $scope.getTaxas_Comissao_Array = function(aClasse) {
        $scope.loadingState = true;
        params = {
            'aClasse': aClasse,
            'aProp': $scope.proposta.idProposta
        }
        callWS.get('/WVDF_WS/ws_HCGS3001.wso/taxas_tarifarioxproposta/JSON', params).then(function(response) {

            $scope.lsTaxasComissao = response.data;
            $scope.lsTaxas = response.data;
            $scope.loadingState = false;
        });
    }

    function setDefaultVal(value, defaultValue) {
        return (value === undefined) ? defaultValue : value;
    }

    //BOOKING FUNCTIONS
    //ALIMENTA O SCHEDULE
    $scope.fScheduleBook = function() {
        $scope.SchdMtg = []; //SCHEDULE MONTAGEM

        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fMontaSchedule/JSON', 'aProposta=' + idProposta).then(function(data) {

            $scope.SchdMtg = data;
            if (data.truck == 1) {

                var url = $scope.CRMURL + 'api/Netship/BRA/ScheduleTruck/' + $scope.SchdMtg.terminal_origem + '/' + $scope.SchdMtg.terminal_destino;
                url = url + '/' + $scope.SchdMtg.data;
                url = url.replace(/'/g, "");
                $http({
                    method: 'GET',
                    url: url,
                }).then(function success(response) {
                    //console.log('sucess', response);

                    $scope.lsScheduleTruck = response.data;

                }, function error(response) {

                    //console.log('error', response);
                    parent.parent.alertify.error($scope.literais.LITERAL_368);
                });
            }

            if (data.truck == 0) {
                //var url = 'http://localhost:21651/' + 'cross/Schedule/' + $scope.SchdMtg.pol + '/' + $scope.SchdMtg.pod + '/' + $scope.SchdMtg.via + '/LCL'; //+$scope.SchdMtg.modalidade 
                var url = $scope.CRMURL + 'api/cross/Schedule/' + $scope.SchdMtg.pol + '/' + $scope.SchdMtg.pod + '/' + $scope.SchdMtg.via + '/LCL'; //+$scope.SchdMtg.modalidade
                url = url + '/' + $scope.SchdMtg.data;
                url = url.replace(/'/g, "");
                //console.log(url);
                $http({
                    method: 'GET',
                    url: url,
                }).then(function success(response) {
                    //console.log('sucess', response);

                    $scope.lsSchedule = response.data;

                    //teste buscar consolidada criada do CROSS
                    $scope.fScheduleBookCROSS();
                    //fim teste buscar consolidada criada do CROSS                

                }, function error(response) {

                    //console.log('error', response);
                    parent.parent.alertify.error($scope.literais.LITERAL_369);

                    //teste buscar consolidada criada do CROSS
                    $scope.fScheduleBookCROSS();
                    //fim teste buscar consolidada criada do CROSS

                });
            }
        });

    };

    //teste buscar consolidada criada do CROSS
    $scope.fScheduleBookCROSS = function() {
        $scope.SchdMtg = []; //SCHEDULE MONTAGEM

        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fMontaSchedule/JSON', 'aProposta=' + idProposta).then(function(data) {
            $scope.SchdMtg = data;
            var url = $scope.CRMURL + 'api/cross/Schedule/cross/' + $scope.SchdMtg.pol + '/' + $scope.SchdMtg.pod + '/' + $scope.SchdMtg.via + '/LCL'; //+$scope.SchdMtg.modalidade                
            //var url = 'http://localhost:21651/cross/Schedule/cross/' + $scope.SchdMtg.pol + '/' + $scope.SchdMtg.pod + '/' + $scope.SchdMtg.via + '/LCL'; //+$scope.SchdMtg.modalidade
            url = url + '/' + $scope.SchdMtg.data;
            url = url.replace(/'/g, "");
            //console.log("url schedule cross", url);
            $http({
                method: 'GET',
                url: url,
            }).then(function success(response) {
                if ($scope.lsSchedule.length > 0) {
                    response.data.forEach(function(element, index, array) {
                        $scope.lsSchedule.unshift(element);
                    });
                } else {
                    $scope.lsSchedule = response.data;
                }

            }, function error(response) {
                //console.log('ScheduleCross', response.data);
                // 
                //console.log('error', response);
                //parent.parent.alertify.error('Schedule nao encontrado!');

            });
        });
    };
    //fim teste buscar consolidada criada do CROSS

    $scope.fScheduleTruckSelect = function(array) {

        $scope.loadingState = true;
        array.sBookingId = idAprovado;
        array.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        var parametros = {};
        parametros = array;
        var param = { 'sJSON': parametros };

        $http({
            url: '/WVDF_WS/ws_hsag563.wso/fSaveSchedTruck/JSON',
            method: 'GET',
            params: param
        }).success(function(data) {
            $scope.lsSchedule = [];
            parent.parent.alertify.success($scope.literais.LITERAL_370);
            $scope.loadingState = false;

            $scope.scheduleTruck = data;

            var today = data.dataChegada;
            var dd = today.substr(0, 2);
            var mm = today.substr(3, 2);
            var yyyy = today.substr(6, 4);

            today = yyyy + '-' + mm + '-' + dd;

            var url = $scope.CRMURL + 'api/cross/Schedule/' + $scope.SchdMtg.pol + '/' + $scope.SchdMtg.pod + '/' + $scope.SchdMtg.via + '/LCL'; //$scope.SchdMtg.modalidade
            url = url + '/' + today;

            $http({
                method: 'GET',
                url: url,
            }).then(function success(response) {
                //console.log('sucess', response);

                $scope.lsSchedule = response.data;

            }, function error(response) {

                //console.log('error', response);
                parent.parent.alertify.error($scope.literais.LITERAL_369);

            });

        });

    };



    $scope.fScheduleSelect = function(array) {

        $scope.loadingState = true;
        array.sBookingId = idAprovado;
        array.propostaId = $scope.proposta.idProposta;
        array.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        var parametros = {};
        parametros = array;
        var param = { 'sJSON': parametros };

        $http({
            url: '/WVDF_WS/ws_hsag561.wso/fSaveSched/JSON',
            method: 'GET',
            params: param
        }).success(function(data) {

            parent.parent.alertify.success($scope.literais.LITERAL_371);
            $scope.loadingState = false;
            // 
            $scope.schedule = data;

            $scope.Booking.deadLineImo = data.dlimo;
            $scope.Booking.deadLineDTA = data.dldta;
            $scope.Booking.deadLineCG = data.dl;
            $scope.Booking.prevSaida = data.prev;
        });

    }

    //Save Contatos
    $scope.btnSaveAuxContact = function(row) {
        //
        if (row.sEmpresa == '' || row.sEmpresa == undefined) {
            $scope.loadingState = false;
            row.editable = true;
            parent.parent.alertify.error($scope.literais.LITERAL_372);
            return;
        }
        if (row.sNome == '' || row.sNome == undefined) {
            $scope.loadingState = false;
            row.editable = true;
            parent.parent.alertify.error($scope.literais.LITERAL_373);
            return;
        }

        if (row.sTel == '' || row.sTel == undefined) {
            $scope.loadingState = false;
            row.editable = true;
            parent.parent.alertify.error($scope.literais.LITERAL_375);
            return;
        }

        if (row.sEmail != '' && row.sEmail != undefined) {
            let emailsValidate = row.sEmail.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,})/g);
            if (emailsValidate != null && emailsValidate.length > 1) {
                $scope.loadingState = false;
                row.editable = true;
                parent.parent.alertify.error($scope.literais.LITERAL_419);
                return;
            }
            let emailValidate = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}$/.test(row.sEmail);
            if (!emailValidate) {
                $scope.loadingState = false;
                row.editable = true;
                parent.parent.alertify.error($scope.literais.LITERAL_374);
                return;
            }
            row.sEmail = row.sEmail.toLowerCase();
        }

        $scope.btnAddContact(row);
        row.editable = false;
        $scope.lockContact = false;
    }

    $scope.btnAddContact = function(entrada) {
        //
        $scope.loadingState = true;

        var parametros = {};
        parametros = entrada;
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        parametros.sBookingId = idAprovado;

        var param = { 'sJSON': parametros };

        $http({
            url: '/WVDF_WS/ws_hsag559.wso/fSvContatoBook/JSON',
            method: 'GET',
            params: param
        }).success(function(data) {
            if (data.hasError) parent.parent.alertify.error(data.msgError);
            else parent.parent.alertify.success(data.msgInfo);

            $scope.loadingState = false;

            if ($scope.proposta.operacao == '4') $scope.refreshContatos($scope.Booking.pesquisaNomeContact, $scope.Booking.pesquisaTipoContact);
            if ($scope.proposta.operacao == '1') $scope.refreshContatosExpo();

            $scope.reloadCache();
        });
    };

    $scope.setComboModalDoor = function(tipo) {
        $scope.tipoDoor = tipo;

        if (tipo == 'O') $scope.comboSelectDoor = $scope.comboInlandDoor;
        else $scope.comboSelectDoor = $scope.comboDeliveryDoor;

        $('#modalSelectDoor').modal('show');
    }

    $scope.loadComboInland = function(sPais) {
        //Att Inland
        // let params = {
        //     "sPais": sPais,
        //     "aUsuarioSessao": aUsuarioSessao
        // }

        // callWS.get('/WVDF_WS/ws_hcgs3006.wso/fComboInland/JSON', params).then(function(response) {
        //     $scope.comboInlandDoor = response.data;
        //     if ($scope.comboInlandDoor.length == 1) $scope.origemDoorSelected.blockOption = true;   
        // });    
    }

    $scope.loadComboDelivery = function(sPais) {
        //Att Inland
        // let params = {
        //     "sPais": sPais, 
        //     "aUsuarioSessao": aUsuarioSessao
        // }

        // callWS.get('/WVDF_WS/ws_hcgs3006.wso/fComboDelivery/JSON', params).then(function(response) {
        //     $scope.comboDeliveryDoor = response.data;
        //     if ($scope.comboDeliveryDoor.length == 1) $scope.destinoDoorSelected.blockOption = true;   
        // });    
    }

    $scope.getComboInland = function(sPais) {
        let params = {
            "sPais": sPais,
            "aUsuarioSessao": aUsuarioSessao
        }

        if (!sPais) {
            $scope.origemDoorSelected = {};
            return;
        }

        callWS.get('/WVDF_WS/ws_hcgs3006.wso/fComboInland/JSON', params).then(function(response) {
            $scope.comboInlandDoor = response.data;

            $scope.origemDoorSelected = {};
            if (!$scope.comboInlandDoor.length) {
                $scope.origemDoorSelected.sExibe = "Outros";
                $scope.origemDoorSelected.sTaxInlandId = 0;
                $scope.origemDoorSelected.sCountryDest_id = sPais;
                $scope.origemDoorSelected.blockOption = true;
            }
        });
    }

    $scope.getComboDelivery = function(sPais) {
        let params = {
            "sPais": sPais,
            "aUsuarioSessao": aUsuarioSessao
        }

        if (!sPais) {
            $scope.destinoDoorSelected = {};
            return;
        }

        callWS.get('/WVDF_WS/ws_hcgs3006.wso/fComboDelivery/JSON', params).then(function(response) {
            $scope.comboDeliveryDoor = response.data;

            $scope.destinoDoorSelected = {};
            if (!$scope.comboDeliveryDoor.length) {
                $scope.destinoDoorSelected.sExibe = "Outros";
                $scope.destinoDoorSelected.sTaxInlandId = 0;
                $scope.destinoDoorSelected.sCountryDest_id = sPais;
                $scope.destinoDoorSelected.blockOption = true;
            }
        });
    }

    $scope.saveDoorSelected = function(door) {
        if (door == 0) {
            door = {};
            door.sCountryDest_id = "";
            door.sCountryDest_name = "";
            door.sDestination = "";
            door.sDestination_name = "";
            door.sExibe = "Outros";
            door.sIdRegion = 0;
            door.sTaxInlandId = "0";
            door.sType = "";
        } else {
            let comboId = document.getElementById("selectDoor");
            let exibe = comboId.options[comboId.selectedIndex].text;
            door = $scope.comboSelectDoor.find(x => x.sTaxInlandId === door);
            if (door == undefined) return parent.parent.alertify.error("Selecione uma Door");
            door.sExibe = exibe;
        }

        if ($scope.tipoDoor == 'O') {
            $scope.origemDoorSelected = door;
            $scope.proposta.paisPol = door.sCountryDest_id;
            $scope.proposta.pol = {
                "id": door.sDestination,
                "value": door.sDestination_name
            }
        } else {
            $scope.destinoDoorSelected = door;
            $scope.proposta.paisPod = door.sCountryDest_id;
            $scope.proposta.pod = {
                "id": door.sDestination,
                "value": door.sDestination_name
            }
        }

        $('#modalSelectDoor').trigger('click');
    }

    $scope.filterContSecAplicado = function(check, prop) {
        return function(item) {
            if (check) return item[prop] > "0";
            else return item;
        }
    }

    $scope.reverseContSec = false;

    $scope.filterContSecSortCol = function(col) {
        $scope.columnContSec = col;
        $scope.reverseContSec = ($scope.reverseContSec) ? false : true;
    };

    $scope.classContSecSortCol = function(col) {
        if ($scope.columnContSec == col) {
            if ($scope.reverseContSec) return 'fa fa-caret-down';
            else return 'fa fa-caret-up';
        } else {
            return '';
        }
    }

    $scope.limparFilterContSec = function() {
        $scope.modalContatosSecFilter = "";
        $scope.modalContatosSecCheck = false;
        $scope.columnContSec = "";
        $scope.reverseContSec = false;
    }

    $scope.BtnDelContact = function(row) {
        $scope.sweetAlert($scope.literais.LITERAL_420, $scope.literais.LITERAL_426, "warning", $scope.literaisLCLImp.LITERAL_27).then((response) => {
            if (response) {
                buscaWS.get('/WVDF_WS/ws_hsag559.wso/fDlContatoBook/JSON', 'sRecnum=' + row.sRecnum).then(function(data) {
                    $scope.fLoadContactsAdvance();
                    $scope.refreshContatosExpo();
                    $scope.reloadCache();
                    parent.parent.alertify.success($scope.literais.LITERAL_377);
                });
            }
        });
    }

    $scope.deletarContatoSecundario = function(row) {
        $scope.sweetAlert($scope.literais.LITERAL_420, $scope.literais.LITERAL_422, "warning", $scope.literaisLCLImp.LITERAL_27).then((response) => {
            if (response) {
                let params = {
                    'aUsuarioSessao': aUsuarioSessao,
                    'sCodigo': row.sCodigo
                };

                $http.get("/WVDF_WS/ws_csag378.wso/fDeleteCSAG378/JSON", { params: params }).then(function(response) {
                    if (row.sRecnum != "0") {
                        buscaWS.get('/WVDF_WS/ws_hsag559.wso/fDlContatoBook/JSON', 'sRecnum=' + row.sRecnum).then(function(data) {});
                    }
                    $scope.refreshContatos('', '');
                    parent.parent.alertify.success($scope.literais.LITERAL_377);
                });
            }
        });
    }

    $scope.refreshContatos = function(texto, tipo) {
        //shipper
        if (tipo == "16") tipo = 'S';
        //forwarder
        if (tipo == "20") tipo = 'F';
        //Despachante
        if (tipo == "19") tipo = 'D';
        //Consignee
        if (tipo == "17") tipo = 'C';
        //Notify
        if (tipo == "18") tipo = 'N';
        //Cliente
        if (tipo == "2") tipo = 'Z';
        //Seu Cliente
        if (tipo == "21") tipo = 'X';
        //undefined
        if (tipo == undefined) tipo = '';
        if (texto == undefined) texto = '';

        buscaWS.get('/WVDF_WS/ws_hsag559.wso/fListaContatBook/JSON', "sBookingId=" + idAprovado + '&sTipo=' + tipo + '&sInicio=' + texto).then(function(data) {

            $scope.Contacts = data;

        });
    }

    $scope.refreshContatosExpo = function() {

        buscaWS.get('/WVDF_WS/ws_hsag559.wso/fListaContatBookExpo/JSON', "sBookingId=" + idAprovado).then(function(data) {
            $scope.Contacts = data;
        });
    }

    $scope.fChangeCustServ = function() {
        if ($scope.Booking.custserv !== '0' && $scope.Booking.custserv !== undefined) {
            var valor = $scope.Booking.custserv;
            buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_CustServ/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {

                if (data == '') parent.parent.alertify.success($scope.literais.LITERAL_378);
                else parent.parent.alertify.error(data);
            });
        }
    }

    $scope.fContatoAberto = function(tipo) {

        if (tipo == 'N') { var cod = $scope.Booking.Notify_id; }
        if (tipo == 'C') { var cod = $scope.Booking.Cnee_id; }
        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fSaveOneContact/JSON', 'sBookingId=' + idAprovado + '&sTipo=' + tipo + '&aPessoa=' + cod).then(function(data) {
            parent.parent.alertify.success($scope.literais.LITERAL_349);
        });

    }
    //----------------------------------------------------------------------------------------
    //----------------------------- NOVAS ------------------------------------


    $scope.fRetorno_Check = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fRetornoMsg/JSON', 'aProp=' + $scope.proposta.idProposta).then(function(data) {

            if (data.ID !== '0') parent.parent.alertify.success($scope.literais.LITERAL_379 + data.DS);
            else parent.parent.alertify.success($scope.literais.LITERAL_380);
        });
    }

    //------------------------------ FIM NOVAS
    //-----------------------------------------------------------------------------------
    $scope.fChangeClienteHBL = function(valor) {
        if ($scope.NetshipValidation) buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ClienteHBL/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            $scope.reloadCache();
        });
    }
    $scope.fChangePartLote = function(valor) {
        if ($scope.NetshipValidation) buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_PartLote/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {});
    }
    $scope.fChangeLocalHBL = function(valor) {
        if ($scope.NetshipValidation) buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_LocalHBL/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) { $scope.reloadCache(); });
    }
    $scope.fChangeVendaOD = function(valor) {
        if ($scope.NetshipValidation) buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_VendaOD/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) { $scope.reloadCache(); });
    }
    $scope.fChangeReserva = function(valor) {
        if ($scope.NetshipValidation) buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_Reserva/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {});
    }
    $scope.fChangeHBL = function(valor) {
        if ($scope.NetshipValidation) buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_HBL/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {});
    }
    $scope.fSaveCSImpo = function() {

        if ($scope.NetshipValidation) buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pCustomerServiceSave/JSON', "sBookingId=" + idAprovado + '&sCustomer=' + $scope.Booking.CS_id).then(function(data) {
            if (data !== '') parent.parent.alertify.error(data)
            $scope.reloadCache();
        });
    }
    //CONTROLE ENTRE OS CAMPOS TAGS
    $scope.addTag = function(tag, campo) {
        if (campo === "Shipper") {
            if ($scope.Booking.Shipper_id == '') { $scope.Booking.Shipper_id = tag.idCliente + '|'; } else { $scope.Booking.Shipper_id = $scope.Booking.Shipper_id + tag.idCliente + '|'; }
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + tag.idCliente + '&sTipo=S').then(function(data) {});
        }

        if (campo === "Forwarder") {
            if ($scope.Booking.Forwarder_id == '') { $scope.Booking.Forwarder_id = tag.idCliente + '|'; } else { $scope.Booking.Forwarder_id = $scope.Booking.Forwarder_id + tag.idCliente + '|'; }
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + tag.idCliente + '&sTipo=F').then(function(data) {});
        }

        if (campo === "Despachante") {
            if ($scope.Booking.Despachante_id == '') { $scope.Booking.Despachante_id = tag.idCliente + '|'; } else { $scope.Booking.Despachante_id = $scope.Booking.Despachante_id + tag.idCliente + '|'; }
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + tag.idCliente + '&sTipo=D').then(function(data) {});
        }

        if (campo === "Cnee") {
            if ($scope.Booking.Cnee_id == '') { $scope.Booking.Cnee_id = tag.idCliente + '|'; } else { $scope.Booking.Cnee_id = $scope.Booking.Cnee_id + tag.idCliente + '|'; }
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + tag.idCliente + '&sTipo=C').then(function(data) {});
        }

        if (campo === "Notify") {
            if ($scope.Booking.Notify_id == '') { $scope.Booking.Notify_id = tag.idCliente + '|'; } else { $scope.Booking.Notify_id = $scope.Booking.Notify_id + tag.idCliente + '|'; }
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + tag.idCliente + '&sTipo=N').then(function(data) {});
        }
    }; // -- FIM TAG ADDED
    $scope.tagRemoved = function(tag, campo) {
        // 
        if (campo === "CS") {

            var replac = $scope.Booking.CS_id;
            var subts = replac.replace((tag.id + '|'), "");
            $scope.Booking.CS_id = subts;
            buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pCustomerServiceSave/JSON', "sBookingId=" + idAprovado + '&sCustomer=' + $scope.Booking.CS_id).then(function(data) {});
        }

        if (campo === "Shipper") {
            var replac = $scope.Booking.Shipper_id;
            var subts = replac.replace((tag.id + '|'), "");
            $scope.Booking.Shipper_id = subts;
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pDLContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + tag.idCliente + '&sTipo=S').then(function(data) {});
        }

        if (campo === "Forwarder") {
            var replac = $scope.Booking.Forwarder_id;
            var subts = replac.replace((tag.id + '|'), "");
            $scope.Booking.Forwarder_id = subts;
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pDLContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + tag.idCliente + '&sTipo=F').then(function(data) {});
        }

        if (campo === "Despachante") {
            var replac = $scope.Booking.Despachante_id;
            var subts = replac.replace((tag.id + '|'), "");
            $scope.Booking.Despachante_id = subts;
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pDLContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + tag.idCliente + '&sTipo=D').then(function(data) {});
        }

        if (campo === "Cnee") {
            var replac = $scope.Booking.Cnee_id;
            var subts = replac.replace((tag.id + '|'), "");
            $scope.Booking.Cnee_id = subts;
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pDLContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + tag.idCliente + '&sTipo=C').then(function(data) {});
        }

        if (campo === "Notify") {
            var replac = $scope.Booking.Notify_id;
            var subts = replac.replace((tag.id + '|'), "");
            $scope.Booking.Notify_id = subts;
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pDLContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + tag.idCliente + '&sTipo=N').then(function(data) {});

        }
    }; // -- FIM TAG REMOVED

    // Modal de Shippers
    function fListaShippers() {
        $scope.loadingState = true
        buscaWS.get('/WVDF_WS/ws_hsag559.wso/fListaShipperBook/JSON', "sBookingId=" + idAprovado).then(function(data) {

            $scope.lsShipper = data;
            $scope.loadingState = false;
        });
    }

    $scope.addContLclExpBook = function() {
        $scope.tbContainers.containerLCLExpoBook.unshift(createNullContainer());
        $scope.tbContainers.containerLCLExpoBook[0].unitweight = 'KG';
        $scope.tbContainers.containerLCLExpoBook[0].UOM = 'CM';
        $scope.tbContainers.containerLCLExpoBook[0].total.grossUnit = 'KG';
        $scope.tbContainers.containerLCLExpoBook[0].total.volumeUnit = 'CBM';
        $scope.lockNewBookLCL = true;
    }

    $scope.addNewContactPessoas = function() {
        $scope.Contacts.unshift(createNullContact());
        $scope.lockContact = true;
    }

    // $scope.addNewDestinoContact = function() {
    //     $scope.ContactDestino.unshift(createNullContact());
    //     $scope.lockContactDestino = true;
    // }

    var createNullContact = function() {
        var ncontact = {};
        ncontact.recnum = '';
        ncontact.empresa = '';
        ncontact.tipo = '';
        ncontact.nome = '';
        ncontact.tel = '';
        ncontact.email = '';
        ncontact.editable = 'true';
        return ncontact;
    }

    $scope.Contacts = [];

    $scope.fDetalhesAvancados = function(row) {

        $scope.Detalhes = row.arr_hz;
        $scope.Detalhes.sRecnum = row.aRecnum;

        $scope.tbContainers.stMercadoria = row.st_mercadorias;
        $scope.tbContainers.stMercadoria.srecnum_05 = row.aRecnum;

        if (row.arr_hz.imo == '1') $scope.Detalhes.imo = true;
        else $scope.Detalhes.imo = false;

        if (row.arr_hz.anvisa == '1') $scope.Detalhes.anvisa = true;
        else $scope.Detalhes.anvisa = false;

        if (row.arr_hz.dtaDedicado == '1') $scope.Detalhes.dtaDedicado = true;
        else $scope.Detalhes.dtaDedicado = false;

        if (row.arr_hz.nempilhavel == '1') $scope.Detalhes.nempilhavel = true;
        else $scope.Detalhes.nempilhavel = false;

        if (row.arr_hz.shipperctnr == '1') $scope.Detalhes.shipperctnr = true;
        else $scope.Detalhes.shipperctnr = false;

        if (row.arr_hz.bagagem == '1') $scope.Detalhes.bagagem = true;
        else $scope.Detalhes.bagagem = false;

        if (row.arr_hz.consHumano == '1') $scope.Detalhes.consHumano = true;
        else $scope.Detalhes.consHumano = false;

        if (row.arr_hz.consAnimal == '1') $scope.Detalhes.consAnimal = true;
        else $scope.Detalhes.consAnimal = false;

        if (row.arr_hz.outros == '1') $scope.Detalhes.outros = true;
        else $scope.Detalhes.outros = false;
    }

    //alimenta os detalhes de CARGA BOOKING
    $scope.fDetalhesCargaBooking = function() {
        buscaWS.get('/WVDF_WS/ws_HCGS3005.wso/fListaDetNEdit/JSON', "sPropostaId=" + idProposta).then(function(data) {
            $scope.CargaBooking = data;
            $scope.DetalhesBooking = data.detalhes;
            $scope.fBookingTT();
        });
    }
    //alimenta o Total mostrado abaixo dos Detalhes de Carga do Booking
    $scope.fBookingTT = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/fTxBookingTT/JSON', "sPropostaId=" + idProposta).then(function(data) {
            $scope.TT_BOOKING = data;
        });
    }

    //alimenta o array do Booking, informacoes.
    $scope.fBookingBusca = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fInfoBooking/JSON', "sBookingId=" + idAprovado).then(function(data) {
            $scope.Booking = data;
            $scope.Booking.BookingId = idAprovado;

            $scope.CodBooking = data.CodBooking;
            // 
            $scope.Booking.Shipper_id = data.sShipper;
            $scope.Booking.Forwarder_id = data.sForwarder;
            $scope.Booking.Despachante_id = data.sDespachante;
            $scope.Booking.Cnee_id = data.sCnee;
            $scope.Booking.Notify_id = data.sNotify;
            $scope.Booking.CS_id = data.sCS;

            if (data.sClienteHBL == '1') $scope.Booking.sClienteHBL = true;
            else $scope.Booking.sClienteHBL = false;

            // 
            //SCHEDULE LCL
            if (data.schedule.armador !== '' && $scope.proposta.modalidades == 'LCL') $scope.schedule = data.schedule;
            //SCHEDULE FCL
            if ($scope.proposta.modalidades == 'FCL') {
                $scope.schedule = data.schedule;
                $scope.Consolidada_net = data.schedule.numeroConsolidada;
            }
            // 
            if (data.scheduleTruck.consolidadaTruck !== '') $scope.scheduleTruck = data.scheduleTruck;
            // 
            $scope.Booking.deadLineImo = data.schedule.dlimo;
            $scope.Booking.deadLineDTA = data.schedule.dldta;
            $scope.Booking.deadLineCG = data.schedule.dl;
            $scope.Booking.prevSaida = data.schedule.prev;

            $scope.fBookingPessoasTp();
            $scope.fLoadContactsAdvance();


            /*
            //BOOKING             
            $("#urltab6").attr({ "src": urlPadrao +'/freights/coordination/bookings/'+ idProposta + "/data?aUsuarioSessao=" + aUsuarioSessao });
            $("#urltab8").attr({ "src": urlPadrao +'/freights/coordination/bookings/'+ idProposta + "/follow-ups?aUsuarioSessao=" + aUsuarioSessao });
            $("#urltab7").attr({ "src": urlPadrao +'/freights/coordination/bookings/'+ idProposta + "/files?aUsuarioSessao=" + aUsuarioSessao });
            */

            if (idTab == '1') {
                angular.element(function() {
                    $("#urltab6").attr({ "src": urlPadrao + '/freights/coordination/bookings/' + idProposta + "/data?aUsuarioSessao=" + aUsuarioSessao });
                    $('#tab6Link').trigger('click');
                    // $scope.forceLoadingState = false;
                });
            }
            //ABA FOLLOW-UP
            if (idTab == '2') {
                angular.element(function() {
                    $("#urltab8").attr({ "src": urlPadrao + '/freights/coordination/bookings/' + idProposta + "/follow-ups?aUsuarioSessao=" + aUsuarioSessao });
                    $('#tab8Link').trigger('click');
                    // $scope.forceLoadingState = false;
                });
            }
            //ABA DOCUMENTO
            if (idTab == '3') {
                angular.element(function() {
                    $("#urltab7").attr({ "src": urlPadrao + '/freights/coordination/bookings/' + idProposta + "/files?aUsuarioSessao=" + aUsuarioSessao });
                    $('#tab7Link').trigger('click');
                    // $scope.forceLoadingState = false;
                });
            }

            // 
        });
    }

    // CIDADES BOOKING
    $scope.acCidades = function(texto) {
        if (texto.length > 2) {
            return buscaWS.get('fbcsag325_descricao.asp', 'term=' + texto).then(function(data) {
                return data;
            });
        }
    };

    var currentContainerID = '';
    $scope.wMercadorias = [];

    $scope.logContainer = function(row) {
        console.log(row);
    }

    $scope.btnSaveMercadoria = function(row, Index) {
        $scope.lockNewMercadoria = false;

        row.ncm = row.ncm.replaceAll("-", ";");
        row.ncm = row.ncm.replaceAll("/", ";");
        row.ncm = row.ncm.replaceAll("+", ";");
        row.ncm = row.ncm.replaceAll(" ", ";");
        row.ncm = row.ncm.replaceAll("*", " ");
        var ncms = row.ncm.split(/[,;]+/g);
        var tempaRecnum = row.srecnum || '';

        $http.post('/WVDF_WS/ws_ccgs219.wso/fAutoCompleteNCM/JSON', {
                aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
                aNCMS: ncms
            })
            .then(function(result) {
                var data = result.data;
                var ncms = data;
                row.erroNCM = false;

                if (ncms[0].value != "ERR0") $scope.wMercadorias.splice(Index, 1);

                for (var i = 0; i < ncms.length; i++) {

                    if (ncms[i].value == "ERR0") {
                        if (ncms[i].id == "***") {
                            row.ncm = '';
                            for (let j = 0; j < ncms.length; j++) {
                                if (j == 0) row.ncm = row.ncm + ncms[j].id;
                                else row.ncm = row.ncm + '/' + ncms[j].id;
                            }
                            row.erroNCM = true;

                            return;
                        } else parent.parent.alertify.error("NCM invalido: " + ncms[i].id);
                    } else {
                        var newNcm = angular.copy(row);
                        newNcm.srecnum = tempaRecnum;
                        newNcm.ncm = ncms[i].id;
                        newNcm.mercadoria = row.mercadoria || "1";
                        newNcm.ncm_desc = ncms[i].value;
                        newNcm.editable = false;

                        $scope.wMercadorias.unshift(newNcm);
                        tempaRecnum = '';
                    }
                }

                //console.log($scope.wMercadorias);

                $scope.loadingState = false;
            });
    }

    $scope.fDetalhePropConcluiBooking = function() {
        // 
        try {
            if ($scope.Detalhes.imo == true) $scope.Detalhes.imo = '1';
            else $scope.Detalhes.imo = '0';

            if ($scope.Detalhes.anvisa == true) $scope.Detalhes.anvisa = '1';
            else $scope.Detalhes.anvisa = '0';

            if ($scope.Detalhes.dtaDedicado == true) $scope.Detalhes.dtaDedicado = '1';
            else $scope.Detalhes.dtaDedicado = '0';

            if ($scope.Detalhes.nempilhavel == true) $scope.Detalhes.nempilhavel = '1';
            else $scope.Detalhes.nempilhavel = '0';

            if ($scope.Detalhes.bagagem == true) $scope.Detalhes.bagagem = '1';
            else $scope.Detalhes.bagagem = '0';

            if ($scope.Detalhes.consHumano == true) $scope.Detalhes.consHumano = '1';
            else $scope.Detalhes.consHumano = '0';

            if ($scope.Detalhes.consAnimal == true) $scope.Detalhes.consAnimal = '1';
            else $scope.Detalhes.consAnimal = '0';

            if ($scope.Detalhes.outros == true) $scope.Detalhes.outros = '1';
            else $scope.Detalhes.outros = '0';

        } catch (erro) {}


        $scope.containerReference.wMercadorias = JSON.parse(JSON.stringify($scope.wMercadorias));
        var index = $scope.Detalhes.Origin;

        let row = $scope.tbContainers.containerLCL[index];
        let modalidade = 'LCL';
        row.modalidade = modalidade;
        $scope.loadingState = true;

        //Caso tenha algum NCM errado e não foi corrigido 
        if (row.wMercadorias != undefined) {
            for (let i = 0; i < row.wMercadorias.length; i++) {
                if (row.wMercadorias[i].ncm.length != 4 && row.wMercadorias[i].ncm != "") {
                    row.wMercadorias[i].ncm = "";
                }
            }
        }

        var parametros = {};
        parametros = row;
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        parametros.aPROP = $scope.proposta.idProposta;
        parametros.aRecnum = row.aRecnum;
        parametros.aMod_Frt = row.modalidade;
        parametros.aPcs = row.pcs;
        parametros.package = row.package;
        parametros.aWght = row.weight;
        parametros.aWght_tp = row.unitweight;
        parametros.aLght = row.length;
        parametros.aWdth = row.width;
        parametros.aHght = row.height;
        parametros.aUOM = row.UOM;
        parametros.aEQUIP = row.equipamento;
        parametros.grossUnit = row.total.grossUnit;
        parametros.volumeUnit = row.total.volumeUnit;
        parametros.aTotalWeight = row.total.weight;
        parametros.aTotalVolume = row.total.volume;
        parametros.aTotalVolumeU = row.unitvolume;

        // var param = { 'sJSON': parametros };
        var param = { 'sJSON': JSON.stringify(parametros) };
        debugger
        $http({
            url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_save/JSON',
            method: 'POST',
            data: param
        }).success(function(data) {
            console.log(data);
            // $http({
            //     url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_advanced/JSON',
            //     method: 'GET',
            //     params: param
            // }).success(function(data) {

            parent.parent.alertify.success($scope.literais.LITERAL_349);
            refreshTabelas();
            $scope.reloadCache();
            $scope.loadingState = false;
        })
        row.editable = false;

    }

    $scope.fDetalhePropConclui = function() {
        // 
        try {
            if ($scope.Detalhes.imo == true) $scope.Detalhes.imo = '1';
            else $scope.Detalhes.imo = '0';

            if ($scope.Detalhes.anvisa == true) $scope.Detalhes.anvisa = '1';
            else $scope.Detalhes.anvisa = '0';

            if ($scope.Detalhes.dtaDedicado == true) $scope.Detalhes.dtaDedicado = '1';
            else $scope.Detalhes.dtaDedicado = '0';

            if ($scope.Detalhes.nempilhavel == true) $scope.Detalhes.nempilhavel = '1';
            else $scope.Detalhes.nempilhavel = '0';

            if ($scope.Detalhes.bagagem == true) $scope.Detalhes.bagagem = '1';
            else $scope.Detalhes.bagagem = '0';

            if ($scope.Detalhes.consHumano == true) $scope.Detalhes.consHumano = '1';
            else $scope.Detalhes.consHumano = '0';

            if ($scope.Detalhes.consAnimal == true) $scope.Detalhes.consAnimal = '1';
            else $scope.Detalhes.consAnimal = '0';

            if ($scope.Detalhes.outros == true) $scope.Detalhes.outros = '1';
            else $scope.Detalhes.outros = '0';

        } catch (erro) {}
        $scope.containerReference.wMercadorias = JSON.parse(JSON.stringify($scope.wMercadorias));

    }

    $scope.containerReference = {};
    $scope.fDetalhesAvancadosProp = function(row, tipo) {

        currentContainerID = row.aRecnum;
        $scope.containerReference = row;
        if ($scope.containerReference.wMercadorias == undefined) $scope.containerReference.wMercadorias = [];
        $scope.wMercadorias = $scope.containerReference.wMercadorias;

        $scope.Detalhes = row.arr_hz;
        // $scope.stMercadoria = row.st_mercadorias;

        $scope.Detalhes.pcs = row.pcs;
        $scope.Detalhes.grossUnit = row.total.grossUnit;
        $scope.Detalhes.weight = row.total.weight;

        $scope.Detalhes.volume = row.total.volume;
        $scope.Detalhes.volumeUnit = row.total.volumeUnit;
        // $scope.tbContainers.stMercadoria = row.st_mercadorias;

        if (tipo == 'LCL') var index = $scope.tbContainers.containerLCL.indexOf(row);
        // if (tipo == 'FCL') {
        //     var index = $scope.tbContainers.containerFCL.indexOf(row);
        //     $scope.Detalhes.equipamento = row.equipamento.DS;
        // }

        $scope.Detalhes.Origin = index;
        if (row.arr_hz.imo == '1') $scope.Detalhes.imo = true;
        else $scope.Detalhes.imo = false;

        if (row.arr_hz.anvisa == '1') $scope.Detalhes.anvisa = true;
        else $scope.Detalhes.anvisa = false;

        if (row.arr_hz.dtaDedicado == '1') $scope.Detalhes.dtaDedicado = true;
        else $scope.Detalhes.dtaDedicado = false;

        if (row.arr_hz.nempilhavel == '1') $scope.Detalhes.nempilhavel = true;
        else $scope.Detalhes.nempilhavel = false;

        if (row.arr_hz.bagagem == '1') $scope.Detalhes.bagagem = true;
        else $scope.Detalhes.bagagem = false;

        if (row.arr_hz.consHumano == '1') $scope.Detalhes.consHumano = true;
        else $scope.Detalhes.consHumano = false;

        if (row.arr_hz.consAnimal == '1') $scope.Detalhes.consAnimal = true;
        else $scope.Detalhes.consAnimal = false;

        if (row.arr_hz.outros == '1') $scope.Detalhes.outros = true;
        else $scope.Detalhes.outros = false;
    }

    //------------------------------------------------------------------------------------------------
    // $scope.forceLoadingState = false;
    $scope.btnRefreshInfo = function() {
        var aux = '';

        $scope.loadingState = true;
        // $scope.forceLoadingState = true;
        buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/f_hcgs3006_rel/JSON', 'aProp=' + $scope.proposta.idProposta + '&sPermissao=' + $scope.permissao).then(function(data) {

            //
            $scope.lsAplicar = data;
            if ($scope.lsAplicar[0].venda.length) { $scope.hasTaxa = true; }
            

            $scope.proposta.valorFrete = $scope.lsAplicar[0].valorFrete;
            $scope.proposta.valorFrete = $scope.proposta.valorFrete.replaceAll('.', '');
            $scope.proposta.valorFrete = $scope.proposta.valorFrete.replaceAll(',', '.');
            $scope.proposta.valorFrete = parseFloat($scope.proposta.valorFrete);
            //Alimenta o modal de Negociacao por Taxa
            for (var i = $scope.lsAplicar[0].arr_ptx.length - 1; i >= 0; i--) {
                $scope.negociarTaxa[i] = {};
                $scope.negociarTaxa[i].venda = $scope.lsAplicar[0].arr_ptx[i].venda;
                texto = $scope.lsAplicar[0].arr_ptx[i].DS_T;
                if ($scope.lsAplicar[0].arr_ptx[i].descricao !== '') {
                    texto = texto + " (" + $scope.lsAplicar[0].arr_ptx[i].descricao + ")";
                }
                // 
                texto = texto + " [" + $scope.lsAplicar[0].arr_ptx[i].aClass + "]";
                $scope.negociarTaxa[i].DS_T = texto;
                $scope.negociarTaxa[i].recId = $scope.lsAplicar[0].arr_ptx[i].sRecnum;
                $scope.negociarTaxa[i].valor = $scope.lsAplicar[0].arr_ptx[i].valorVenda;
                $scope.negociarTaxa[i].moeda = $scope.lsAplicar[0].arr_ptx[i].moedaVenda;
                $scope.negociarTaxa[i].valormin = $scope.lsAplicar[0].arr_ptx[i].vlMin;
                $scope.negociarTaxa[i].valormax = $scope.lsAplicar[0].arr_ptx[i].vlMax;
                $scope.negociarTaxa[i].note = $scope.lsAplicar[0].arr_ptx[i].N_Note;
                $scope.negociarTaxa[i].modPgto = $scope.lsAplicar[0].arr_ptx[i].modPgto;
            }

            //console.log($scope.negociarTaxa);

            for (var i = $scope.lsAplicar[0].arr_ptx.length - 1; i >= 0; i--) {
                if ($scope.lsAplicar[0].arr_ptx[i].valorVenda == -1) {
                    $scope.lsAplicar[0].arr_ptx[i].valorVenda = 'Sob Consulta';
                }
                if ($scope.lsAplicar[0].arr_ptx[i].valorVenda == 0) {
                    $scope.lsAplicar[0].arr_ptx[i].valorVenda = 'Isenta';
                }
            }

            $scope.setNgTables();
            $scope.fStatusVerify();
            //$scope.fTerminalVerify();
            $scope.fConversorMoedaUSD();
            $scope.fCallMargem();
            $scope.gridComissao_lista();
            $scope.loadingState = false;

            let historicoCS = $scope.lsAplicar[0].aFeedLayer;
            $scope.bShowLayer = $scope.lsAplicar[0].bShowLayer;
            // $scope.bShowLayer = true;
            $scope.mdlOrigem = [];
            $scope.mdlFrete = [];
            $scope.mdlDestino = [];
            $scope.mdlBrokerCom = [];

            for (var i = 0; i < historicoCS.length; i++) {
                if (historicoCS[i].classe == 'O') $scope.mdlOrigem.push(historicoCS[i]);
                if (historicoCS[i].classe == 'F') $scope.mdlFrete.push(historicoCS[i]);
                if (historicoCS[i].classe == 'D') $scope.mdlDestino.push(historicoCS[i]);
                if (historicoCS[i].classe == 'C') $scope.mdlBrokerCom.push(historicoCS[i]);
            }

            if ($scope.mdlOrigem.length) $scope.modelOrigem = true;
            if ($scope.mdlFrete.length) $scope.modelFrete = true;
            if ($scope.mdlDestino.length) $scope.modelDestino = true;
            if ($scope.mdlBrokerCom.length) $scope.modelBroker = true;

            if (!$scope.bShowLayer) {
                $('#modalCS').modal('show');
            }

            //Posiciona Totais
            $scope.totalHBL = $scope.lsAplicar[0].sTotalHBL;
            $scope.totalLocaisDestino = $scope.lsAplicar[0].sTotalLocaisDestino;
            $scope.totalComissaoHBL = $scope.lsAplicar[0].sTotalComissaoHBL;
            $scope.totalComissaoDestino = $scope.lsAplicar[0].sTotalComissaoDestino;
            $scope.totalFrete = $scope.lsAplicar[0].sTotalFrete;
            $scope.totalLocaisOrigem = $scope.lsAplicar[0].sTotalLocaisOrigem;
            $scope.totalComissao = $scope.lsAplicar[0].sTotalComissao;
                    
        });

    }

    $scope.Notify = function() {
        $scope.ListaMsgs = {}
        $scope.loadingState = true;
        buscaWS.get('/WVDF_WS/ws_TMEN1003.wso/f_lista_msgs/JSON', 'aProp=' + $scope.proposta.idProposta).then(function(data) {
            $scope.ListaMsgs = data;
            $scope.loadingState = false;
        });
    }

    $scope.btnAceitar = function() {

        var param = {};
        param.aUsuarioSessao = aUsuarioSessao;
        param.idProposta = idProposta;
        param.taxas = $scope.negociarTaxa;
        param.valid_ex = $scope.negociarValidade.valid_ex;
        param.concorrente = [];
        if ($scope.negociarValidade.concorrente !== undefined && $scope.negociarValidade.concorrente !== '') {
            for (var i = $scope.negociarValidade.concorrente.length - 1; i >= 0; i--) {
                param.concorrente.push($scope.negociarValidade.concorrente[i].idCliente);
            }
        }

        var params = { 'aJSON': param };
        //console.log(params);

        callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_taxdeals/JSON', params).then(function(response) {
            $scope.Notify();
            $scope.fStatusVerify();
            $scope.reloadCache();
        });
    }

    $scope.checkTaxasArray = function() {
        for (var i = $scope.negociarTaxa.length - 1; i >= 0; i--) {
            if (!angular.isUndefined($scope.negociarTaxa[i].valor))
                if ($scope.negociarTaxa[i].valor.length)
                    return false;

            if (!angular.isUndefined($scope.negociarTaxa[i].moeda))
                if ($scope.negociarTaxa[i].moeda.length)
                    return false;

            if (!angular.isUndefined($scope.negociarTaxa[i].note))
                if ($scope.negociarTaxa[i].note.length)
                    return false;
        }
        return true;
    };

    var getPermissao = function() {

        idGuest = idGuest;
        var params = {};
        params.aUsuarioSessao = getVariavelURL("aUsuarioSessao");

        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_userprop/JSON', params).then(function(response) {
            $scope.permissao = response.data;
        });
    }

    $scope.fnCalcTotal = function() {
        $scope.entrada.total.weight = $scope.entrada.pcs * $scope.entrada.weight;
        $scope.entrada.total.volume = $scope.entrada.length * $scope.entrada.width * $scope.entrada.height;
    };

    $scope.getCarrier = function() {
        // 
        $scope.lsCarrier = {};
        if ($scope.proposta.pol !== "" && $scope.proposta.pod !== "") {
            buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/propostaCarrier/JSON', 'sPol=' + $scope.proposta.pol.id + '&sPod=' + $scope.proposta.pod.id + '&sVia=' + $scope.proposta.VIA + '&sMod=' + $scope.proposta.modalidades).then(function(data) {
                // 
                $scope.lsCarrier = data;
            });
        }
    }

    $scope.addPolRow = function(table, Class) {

        var row = {};
        row.aStatus = true;
        row.taxa = '';
        row.moeda = '';
        row.valorCompra = '0';
        row.valorVenda = '0';
        row.tpCalc = '';
        row.modPgto = '';
        row.moedaCompra = '';
        row.moedaVenda = '';
        row.editable = true;
        row.aClass = Class;
        row.descricao = '';
        row.equipamento = '';
        //    
        if ($scope.proposta.modalidades == 'LCL') {
            row.vlMin = '0';
            row.vlMax = '0';
            row.vlMinCompra = '0';
            row.vlMaxCompra = '0';
        }

        table.unshift(row);

        if (Class == "O")
            $scope.lockNewOrigem = true;
        else if (Class == "F")
            $scope.lockNewFrete = true;
        else if (Class == "D")
            $scope.lockNewDestino = true;
    }

    $scope.btnTableSaveRowTax = function(row, Class, Mod) {
        row.aUsuarioSessao = aUsuarioSessao;
        row.idProposta = $scope.proposta.idProposta;
        row.permissao = $scope.permissao;
        //console.log("rowJson = " + JSON.stringify(row));

        if (row.moedaCompra == "" || row.moedaVenda == "") {
            parent.parent.alertify.error($scope.literais.LITERAL_447);
            return;
        }

        if (row.valorCompra === "" || row.valorVenda === "") {
            parent.parent.alertify.error($scope.literais.LITERAL_448);
            return;
        }

        if (row.tpCalc == "" || row.tpCalc_C == "") {
            parent.parent.alertify.error($scope.literais.LITERAL_449);
            return;
        }

        if (row.tpCalc == '1' && Mod == 'V') {
            if (row.vlMin == '' || row.vlMin == undefined) {
                parent.parent.alertify.error($scope.literais.LITERAL_452);
                return;
            }
        }
        if (row.tpCalc_C == '1' && Mod == 'C') {
            if (row.vlMinCompra == '' || row.vlMinCompra == undefined) {
                parent.parent.alertify.error($scope.literais.LITERAL_452);
                return;
            }
        }

        //if (row.vlMaxCompra === "" || row.vlMax === "") {
        //    parent.parent.alertify.error($scope.literais.LITERAL_451);
        //    return;
        //}

        if ((row.modPgto == "" || row.modPgto == undefined) && Mod == 'V') {
            parent.parent.alertify.error($scope.literais.LITERAL_450);
            return;
        }

        if ((row.modPgto_c == "" || row.modPgto_c == undefined) && Mod == 'C') {
            parent.parent.alertify.error($scope.literais.LITERAL_450);
            return;
        }


        $('.popover').hide();

        callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_change_line/JSON', { 'aJSON': row }).then(function(response) {
            row.editable = false;
            //console.log(response);

            if (Class == "O")
                $scope.lockNewOrigem = false;
            else if (Class == "F") {
                $scope.lockNewFrete = false;

                if ($scope.proposta.refSeguro && $scope.proposta.refSeguro != '' && $scope.proposta.taxEspeciais) {
                    //
                    $scope.proposta.valorFrete = row.valorVenda;
                    $scope.proposta.valorFrete = $scope.proposta.valorFrete.replaceAll('.', '');
                    $scope.proposta.valorFrete = $scope.proposta.valorFrete.replaceAll(',', '.');
                    $scope.proposta.valorFrete = parseFloat($scope.proposta.valorFrete);
                    insurances.update().then(function(data) {
                        insurances.targetCode = data.targetCode;
                        const parametros = {
                            aUsuarioSessao: aUsuarioSessao,
                            sPropostaId: $scope.proposta.idProposta,
                            sRef: data.targetCode,
                            moeda: data.tradedCurrency || '',
                            venda: data.salesValue || '',
                            compra: data.purchaseValue || '',
                            validade: data.expirationDate || '',
                            sValorSeguro: $scope.proposta.valorSeguro || ''

                        };



                        $scope.proposta.refSeguro = data.targetCode
                        $scope.proposta.validadeSeguro = data.expirationDate;
                        $http.get('/WVDF_WS/ws_hcgs3004.wso/fSaveSeguroRef/JSON', { params: parametros }).then(function(response) {
                            $scope.btnRefreshInfo();
                            $scope.loadReferences();

                            parent.parent.alertify.success($scope.literais.LITERAL_384);
                        }, function(err) {
                            parent.parent.alertify.error($scope.literais.LITERAL_385);
                        });

                    }, function(err) {
                        parent.parent.alertify.alert(err.data[0].message);
                    });
                }
            } else if (Class == "D")
                $scope.lockNewDestino = false;

            if (response.data.defaultMessage.hasError) {
                parent.parent.alertify.error(response.data.defaultMessage.msgError);
                return;
            } else parent.parent.alertify.success(response.data.defaultMessage.msgInfo);

            $scope.btnRefreshInfo();
            $scope.Notify();
            $scope.reloadCache();
        });
    }

    $scope.lsTabelaNovaTaxa = [];
    $scope.NovaTaxaClasse = '';
    $scope.NovaTaxaTable = function(aClass) {
        $scope.lsTabelaNovaTaxa = [];
        $scope.NovaTaxaClasse = aClass;
        $scope.newTaxa($scope.lsTabelaNovaTaxa, aClass);
    }
    $scope.newTaxa = function(table, aClass) {
        var novo = {
            aplicar: false,
            editable: true,
            aClass: aClass,
            venda: {
                descricao: '',
                equipamento: '',
                moeda: '',
                valor: '',
                tpCalculo: '',
                modPagamento: '',
            },
            compra: {
                modPagamento: '',
                moeda: '',
                valor: '',
                tpCalculo: '',
                modPagamento: '',
            }
        };
        table.unshift(novo);
    }

    $scope.saveTableNovaTaxa = function() {
        $scope.loadingState = true;

        var promises = [];

        for (var i = $scope.lsTabelaNovaTaxa.length - 1; i >= 0; i--) {
            let row = $scope.lsTabelaNovaTaxa[i];
            if (row.taxa == "") {
                parent.parent.alertify.error($scope.literais.LITERAL_386);
                $scope.loadingState = false;
                return;
            }

            if (row.tpCalc == '1') {
                if (row.vlMin == '' || row.vlMin == undefined) {
                    parent.parent.alertify.error('Valor Minimo deve ser Preenchido!');
                    $scope.loadingState = false;
                    return;
                }
            }

            row.idProposta = idProposta;
            row.aUsuarioSessao = aUsuarioSessao;
            var param = { 'aJSON': row };

            if (!param) return;

            promises.push($http({
                url: '/WVDF_WS/ws_hcgs3006.wso/f_change_line/JSON',
                method: 'GET',
                params: param
            }).success(function(data) {
                //console.log("promise");

                if (data.defaultMessage.hasError) {
                    parent.parent.alertify.error(data.defaultMessage.msgError);
                    return;
                } else parent.parent.alertify.success(data.defaultMessage.msgInfo);

                $scope.reloadCache();
            }));
        }

        Promise.all(promises).then(function() {
            //console.log("Todas as Taxas foram salvas");
            $('.modalNw01').trigger('click');
            //$('.modal-backdrop').remove();
            $scope.loadingState = false;
            $scope.btnRefreshInfo();
        });
    }

    $scope.modalIMO = function() {
        // $scope.givenUrl = "uploadf.html?aUsuarioSessao=" + aUsuarioSessao + "&idProposta=" + $scope.proposta.idProposta;
        /*angular.element(function() {
            $("#urltab7").attr({ "src": urlPadrao + '/freights/coordination/bookings/' + idProposta + "/files?aUsuarioSessao=" + aUsuarioSessao });
            $('#tab7Link').trigger('click');
            // $scope.forceLoadingState = false;
        });*/
        $('#tab7Link').trigger('click');
        //$scope.givenUrl = "uploadf.html?aUsuarioSessao=" + aUsuarioSessao + "&Nm_Tabela=HCGS3004" + "&idProposta=" + $scope.proposta.idProposta;
        // $scope.givenUrl = "PCGS3040_10.asp?aUsuarioSessao=" + aUsuarioSessao + "&Nm_Tabela=HCGS3004" + "&idProposta=" + $scope.proposta.idProposta;
    }

    $scope.modalCalTerminalSimulacao = function() {
        
        //novo
        debugger;
        var simuCif = (parseFloat($scope.paramSimul.sValorCifBrl)*parseFloat($scope.conversorMoeda.valor)).toFixed(2);
        $scope.proposta.valorSeguroBRL = simuCif;
        var termPeso = ($scope.proposta.ttgw).replace('.','').replace(',','.');
        var termVolume = ($scope.proposta.ttcbm).replace('.','').replace(',','.');
        //Ecoporto
        if ($scope.paramSimul.sIdSimulador =='99') {
            var simuImo = $scope.paramSimul.sCargaImo
            if (simuImo == 'SIM') simuImo = 'S';
            else simuImo = 'N';

            var simuAnvisa = $scope.paramSimul.sCargaAnvisa
            if (simuAnvisa == 'SIM') simuAnvisa = 'S';
            else simuAnvisa = 'N';
            debugger;
            
            //simuCif = simuCif;
            debugger;
            var jsonTermSimu = {
                
                "cod_iso_cliente": $scope.paramSimul.sClientePais,//"9669",
                "id_cliente": $scope.paramSimul.sClienteDocEd,//"77.153.260/0013-65",
                "razao_cliente": $scope.paramSimul.sClienteName,//"RSOUZA SILVA ME",
                "cod_iso_cliente_consignee": $scope.paramSimul.sCneePais,//"15447",
                "razao_cliente_consignee": $scope.paramSimul.sCneeName,//"ABC SOLUCOES",
                "valor_cif": simuCif,//"5.258",
                "cod_iso_moeda": "BR",//32,
                "peso_carga": termPeso,//$scope.paramSimul.sPesoKg,//"41540",
                "imo": simuImo,//"S",
                "anvisa": simuAnvisa,//"N",
                "indic_carga": "RO",
                "volume_carga": termVolume,//$scope.paramSimul.sVolumeM3,//"32.0",
                "id_cliente_consignee": $scope.paramSimul.sClienteDocEd//"46.044.053/0001-05"

            };

            jsonTermSimu = JSON.stringify(jsonTermSimu);
            //verificar para prod
            $http({
                method: 'POST',
                //H
                url: 'https://connect-dev.craftmulti.com/pricing/ecoporto/get-oportunidades',
                headers: { 'craft-apikey-dev': '256c85795db241b196d06a9a4dec43bf', 'Content-Type': 'application/json' },
                //P
                //url: 'https://connect.craftmulti.com/pricing/ecoporto/get-oportunidades',
                //headers: { 'craft-apikey': '735039e4b8f84499ba3f3bc2f819c8fc', 'Content-Type': 'application/json' },

                data: jsonTermSimu
            }).then(function success(response) {
                debugger;

                var respTerm=response.data;
                $scope.simulaTerm = {};

                debugger;

                $scope.simulaTerm.indicador = '';
                $scope.simulaTerm.importador = '';
                $scope.simulaTerm.coloader = '';
                $scope.simulaTerm.validade = respTerm[0].vigencia_tabela_fim;
                $scope.simulaTerm.valorTerminal = respTerm[0].valor_ticket.toFixed(2);
                $scope.simulaTerm.idTabela = respTerm[0].id_tabela;
                $scope.fRentabilidadeTerminal($scope.simulaTerm.valorTerminal);
                $scope.simulaTerm.infoTerm='';

                parent.parent.alertify.success("Simulacado com sucesso.");


            }, function error(response) {
                debugger;
                parent.parent.alertify.error(response.data.data.message);
                parent.parent.alertify.error('Erro na Simulação do Terminal.');
                $scope.simulaTerm.infoTerm=response.data.data.message;
            });  

        }

        //Deicmar
        if ($scope.paramSimul.sIdSimulador == '12412') {

            var deicImo
            var deicAnv
            var deicPeso
            var deicVol

            if ($scope.paramSimul.sCargaImo == 'SIM') deicImo=true;
            else deicImo=false;

            if ($scope.paramSimul.sCargaAnvisa == 'SIM') deicAnv=true;
            else deicAnv=false;

            termPeso=parseFloat(termPeso);
            termVolume=parseFloat(termVolume);

            debugger;
            var jsonTermSimu = {
                "destinationTerminalSimulatorId": $scope.paramSimul.sIdSimulador,//12412, // CSAG346 - ARMAZENAGEM_SIMULATOR_ID
                "destinationTerminalId": $scope.paramSimul.sTerminalId,//126879, // HCGS3004 - CSAG346_TERMINAL_DESTINO
                "destinationTerminalDocument":  $scope.paramSimul.sTerminalDoc,//"58188756002210", // CSAG320 - NRDOCTO
                "customerIsoCode": $scope.paramSimul.sClientePais,//"BR", // CSAG329 - ISO_CODE
                "customerDocument": $scope.paramSimul.sClienteDoc,//"04503292000136", // CSAG320 - NRDOCTO
                "customerName": $scope.paramSimul.sClienteName,//"PGL BRASIL LTDA.", // CSAG320 - NOME
                "consigneeIsoCode": $scope.paramSimul.sCneePais,//"",//"BR", // CSAG329 - ISO_CODE
                "consigneeDocument": $scope.paramSimul.sCneeDoc,//"",//"08574411000100", // CSAG320 - NRDOCTO //08.574.411/0001-00
                "consigneeName": $scope.paramSimul.sCneeName,//"",//"PRATICA KLIMAQUIP INDUSTRIA E COMERCIO S.A.",  // CSAG320 - NOME
                "cifValue": simuCif,//10000.0, //mercadoria
                "isoCodeCurrency": "BR", // valor fixo
                "cargoWeight": termPeso,//deicPeso,//521.99, // HCGS3004 - TT_WEIGHT
                "cargoCubicMeter": termVolume,//deicVol,//0.9067, // HCGS3004 - TT_CBM
                "isImoCargo": deicImo,//false,
                "isAnvisa": deicAnv,//false,
                "cargoTypeIndicator": "RO", // valor fixo
                "customerTaxId": "" 
            };

            jsonTermSimu = JSON.stringify(jsonTermSimu);
            //verificar para prod
            $http({
                method: 'POST',
                //H
                url: 'https://connect-dev.craftmulti.com/pricing/terminal-pricing-table',
                headers: { 'craft-apikey-dev': '256c85795db241b196d06a9a4dec43bf', 'Content-Type': 'application/json' },
                //P
                //url: 'https://connect.craftmulti.com/pricing/terminal-pricing-table',
                //headers: { 'craft-apikey': '735039e4b8f84499ba3f3bc2f819c8fc', 'Content-Type': 'application/json' },

                data: jsonTermSimu
            }).then(function success(response) {
                debugger;

                var respTerm=response.data.body;
                $scope.simulaTerm = {};

                $scope.simulaTerm.indicador = respTerm[0].indicador;
                $scope.simulaTerm.importador = respTerm[0].importador;
                $scope.simulaTerm.coloader = respTerm[0].coloader;
                $scope.simulaTerm.validade = respTerm[0].vigenciaTabelaFim;
                $scope.simulaTerm.valorTerminal = respTerm[0].valorTicket[0].valor.toFixed(2);
                $scope.simulaTerm.idTabela = respTerm[0].idTabela;
                $scope.fRentabilidadeTerminal($scope.simulaTerm.valorTerminal);
                $scope.simulaTerm.infoTerm='';

                debugger;
                const binaryString = atob(respTerm[0].pdfSimuladorCalculo); 
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                const pdfBlob = new Blob([bytes], { type: "application/pdf"}); 

                const pdfURL = URL.createObjectURL(pdfBlob);

                const downloadButton = document.getElementById("download-button");
                downloadButton.href = pdfURL; 
                downloadButton.download = "Terminal_Simulacao.pdf";

                
                parent.parent.alertify.success("Simulacado com sucesso.");

            }, function error(response) {
                debugger;
                parent.parent.alertify.error('Erro na Simulação do Terminal.');
                $scope.simulaTerm.infoTerm='Erro na resposta do Terminal.';
            });  
        }

    }

    $scope.modalCadShippers = function() {
        $scope.givenUrl = "crm_cadastro_shipper.html?aUsuarioSessao=" + aUsuarioSessao;
    }

    $scope.modalEditShippers = function(cliente) {
        $scope.givenUrl = "crm_cadastro_shipper.html?aUsuarioSessao=" + aUsuarioSessao + '&idEmpresa=' + cliente;
    }

    $scope.f_check_tax = function(recnum, status) {
        var params = {};
        params.aUsuarioSessao = aUsuarioSessao;
        params.sRecnum = recnum;
        params.aStatus = status;
        callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_check_tax/JSON', params).then(function(response) {
            $scope.btnRefreshInfo();
            $scope.reloadCache();
        });
    }

    $scope.btnActNg = function() {
        for (var i = $scope.tbPendencias.negociation.length - 1; i >= 0; i--) {
            $scope.tbPendencias.negociation[i].radio = {};
            $scope.tbPendencias.negociation[i].radio = 'Aceitar';
        }
    }

    $scope.btnRcrNg = function() {
        $scope.exibeRecusa = true;
        $scope.exibeContraProposta = false;

        for (var i = $scope.tbPendencias.negociation.length - 1; i >= 0; i--) {
            $scope.tbPendencias.negociation[i].radio = {};
            $scope.tbPendencias.negociation[i].radio = 'Negar';
        }
    }

    $scope.btnCPNg = function() {
        $scope.exibeContraProposta = true;
        $scope.exibeRecusa = false

        for (var i = $scope.tbPendencias.negociation.length - 1; i >= 0; i--) {
            $scope.tbPendencias.negociation[i].radio = {};
            $scope.tbPendencias.negociation[i].radio = 'Contra-valor';
        }
    }

    $scope.btnSaveAll = function() {

        var params = {};
        params.aUsuarioSessao = getVariavelURL("aUsuarioSessao");
        params.idProposta = $scope.proposta.idProposta;
        params.negociation = $scope.tbPendencias.negociation;
        params.valid_ex = $scope.negociarValidade.valid_ex;
        params.option = $scope.negociarValidade.option;
        $scope.proposta.negociation_id = false;

        callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_dealresp/JSON', { 'aJson': params }).then(function(response) {
            $scope.btnRefreshInfo();
            $scope.Notify();
            $scope.reloadCache();
        });
    }

    $scope.btnTableSaveRowComissao = function(row) {
        row.editable = false;

        if (row.moeda == "") {
            parent.parent.alertify.error($scope.literais.LITERAL_447);
            return;
        }

        if (row.valor === "") {
            parent.parent.alertify.error($scope.literais.LITERAL_448);
            return;
        }

        if (row.tp_calc == "") {
            parent.parent.alertify.error($scope.literais.LITERAL_449);
            return;
        }

        if (row.tp_calc == '1') {
            if (row.minimo == '' || row.minimo == undefined) {
                parent.parent.alertify.error($scope.literais.LITERAL_452);
                return;
            }
        }

        // if (row.maximo === "") {
        //     parent.parent.alertify.error($scope.literais.LITERAL_451);
        //     return;
        // }

        if (row.md_pagto == "" || row.md_pagto == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_450);
            return;
        }

        $('.modalC01').modal('hide');

        var param = {};
        param = row;
        param.aUsuarioSessao = getVariavelURL("aUsuarioSessao");
        param.idProposta = $scope.proposta.idProposta;
        var params = { 'sJSON': param };

        callWS.get('/WVDF_WS/ws_hcgs3007.wso/f_save_comissao/JSON', params).then(function(response) {
            parent.parent.alertify.success('Saved!');
            $scope.gridComissao_lista();
            $scope.reloadCache();
            $scope.btnRefreshInfo();
        });
    }

    $scope.fNegociationResp = function() {
        params = "aProposta=" + idProposta + "&aUsuarioSessao=" + aUsuarioSessao;

        buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/f_negociation/JSON', params).then(function(data) {

            $scope.tbPendencias = data;
            $scope.negociarValidade.valid_ex = data.aValid
            // $scope.negociarValidade.concorrente = data.aConcorrente
        });
    }

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

    $scope.alertOK = function() {
        $scope.edit1 = true;
    }

    $scope.alertOK2 = function() {
        $scope.edit2 = true;
        if ($scope.proposta.modalidades == 'LCL') {
            for (var i = $scope.tbContainers.containerLCL.length - 1; i >= 0; i--) {
                $scope.tbContainers.containerLCL[i].editable = true;
            }
        }
        if ($scope.proposta.modalidades == 'FCL') {
            for (var i = $scope.tbContainers.containerFCL.length - 1; i >= 0; i--) {
                $scope.tbContainers.containerFCL[i].editable = true;
            }
        }
    }

    $scope.alertOK3 = function() {
        $scope.BtnAprovar($scope.proposta.idProposta);
    }

    $scope.untitleSave = function() {
        $scope.edit1 = false;
    }

    $scope.untitleSave2 = function() {
        $scope.edit2 = false;
        parent.parent.alertify.success($scope.literais.LITERAL_349);
        return;
    }

    $scope.detalheCargaSaveLCL = function() {
        if ($scope.CodBooking_net !== '' && $scope.CodBooking_net !== undefined) {
            var parametros = 'sProposta=' + idProposta;
            buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fConsultaTravaProposta/JSON', parametros)
                .then(function(data) {

                    $scope.proposta.trava_calculo = data;

                    if ($scope.proposta.trava_calculo == 1) {

                        $scope.ValidaCarga = false;
                        $scope.edit2 = false;

                        var jasonop = JSON.stringify($scope.tbContainers.containerLCL);
                        //console.log(jasonop);
                        var promises = [];


                        $scope.testestrutura = { 'sJSON': JSON.stringify($scope.tbContainers.containerLCL) };
                        for (var i = $scope.tbContainers.containerLCL.length - 1; i >= 0; i--) {
                            $scope.tbContainers.containerLCL[i].editable = false;
                            let row = $scope.tbContainers.containerLCL[i];
                            let modalidade = 'LCL';

                            row.modalidade = modalidade;

                            var param = montaParametrosCarga(row);
                            if (!param) return;
                            
                            promises.push($http({
                                url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_save/JSON',
                                method: 'POST',
                                data: param
                            }).success(function(data) {

                                if (data.defaultMessage.msgInfo !== '') {
                                    parent.parent.alertify.log(data.defaultMessage.msgInfo);
                                    if (data.defaultMessage.msgSession == 1) {

                                        $scope.ValidaCarga = true;
                                        $("#btnAlert3").trigger('click');
                                        // $scope.forceLoadingState = false;
                                    }
                                    // return;
                                } else {
                                    parent.parent.alertify.success($scope.literais.LITERAL_387);
                                    // return;
                                }
                                if (data.defaultMessage.msgError !== '' && data.defaultMessage.hasError == false) {
                                    $scope.proposta.sStatus = data.defaultMessage.msgError;
                                }
                            }));
                            row.editable = false;
                        }
                        $scope.loadingState = true;
                        Promise.all(promises).then(function() {

                            //console.log("Todas as promises resolvidas");
                            $http({
                                method: 'POST',
                                url: '/WVDF_WS/ws_HCGS3005.wso/pLogDetalhesCarga/JSON',
                                data: JSON.stringify({ 'sPropostaId': idProposta, 'aUsuarioSessao': aUsuarioSessao }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(function(data) {
                                //console.log("promise");
                                $scope.tbPendencias = data;
                                $scope.negociarValidade.valid_ex = data.aValid;
                                $scope.negociarValidade.concorrente = data.aConcorrente;

                                $scope.loadTotals();
                                $('#tab2Link').trigger('click');
                                $scope.BtnRecalculo();
                                loadProposta();
                                refreshTabelas();
                                $scope.Notify();
                                $scope.loadingState = false;
                            });

                        });
                    } else $scope.modalVia.open();
                });
        } else {
            $scope.modalVia.open();
        }
    } //FIM DETALHESAVE

    $scope.lsAplicar = {};
    // $scope.GeraLogDetalhesCarga = function() {
    //     buscaWS.get('/WVDF_WS/ws_HCGS3005.wso/pLogDetalhesCarga/JSON', 'sPropostaId=' + idProposta).then(function(data) {
    //         $scope.tbPendencias = data;
    //         $scope.negociarValidade.valid_ex = data.aValid;
    //         $scope.negociarValidade.concorrente = data.aConcorrente;
    //     });
    // }

    $scope.CargoValidation = function(proposta) {
        if ($scope.proposta.modalidades == 'LCL') {
            if ($scope.tbContainers.containerLCL.length == 0) {
                parent.parent.alertify.error($scope.literais.LITERAL_388);
                return;
            }
            if ($scope.tbContainers.containerLCL.length == 1) {
                if ($scope.tbContainers.containerLCL[0].total.volume == '') {
                    parent.parent.alertify.error($scope.literais.LITERAL_388);
                    return;
                }
                if ($scope.tbContainers.containerLCL[0].total.weight == '') {
                    parent.parent.alertify.error($scope.literais.LITERAL_388);
                    return;
                }
            }
        }
        $scope.btnSalvar(proposta);
    }


    $scope.fChangeBlArmador = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_BlArmador/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error('FOI!.');
            $scope.reloadCache();
        });
    }

    $scope.fChangeNavio = function(valor) {
        // 
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticNavio/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // 
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeViagem = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticViagem/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeETA = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticETA/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeObsReserva = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ObsReserva/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeArmador = function(valor) {
        // 
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticArmador/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeAgente = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticAgente/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeBookArmador = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticBookArmador/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeMasterArmador = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticMasterArmador/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeDlCarga = function(valor) {

        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticDlCarga/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {

            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeDlDraft = function(valor) {

        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticDlDraft/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {

            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeDlVgm = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticDlVgm/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeDlImo = function(valor) {

        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticDlImo/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    //PREVISAO DE SAIDA
    $scope.fChangePrevSaida = function(valor) {

        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticPrevSaida/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.success('Previsao de Saida Salvo!');
        });
    }

    $scope.fChangeObsInterna = function(valor) {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'sBookingId': idAprovado, 'sValor': valor };

        callWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ObsInterna/JSON', params).then(function(data) {

            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeObsBookDesk = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ObsDesk/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeNrCtrArmador = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_nrContratoArmador/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeFtArmador = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fAutomaticSave_ftArmador/JSON', 'sPropostaId=' + idProposta + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeFtCliente = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fAutomaticSave_ftCliente/JSON', 'sPropostaId=' + idProposta + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeRefArmador = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_refArmador/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeLocalCarga = function(valor) {
        // 
        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_localCarga/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor.idCliente).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeLocalDoc = function(valor) {
        // 
        buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_localDoc/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor.idCliente).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeDtChegada = function(valor) {
        // 
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticChegada/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
            // 
        });
    }

    $scope.fChangeSupervisor = function(valor) {

        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticSupervisor/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {

            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeMargem = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticMargem/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeAgEmissaobl = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticAgEmissaobl/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeAgMar = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticAgMar/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeDocument = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticDoc/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeTerminal = function(valor) {

        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticTerminal/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fChangeObsConsol = function(valor) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticObsConsol/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor).then(function(data) {
            // parent.parent.alertify.error(data);
        });
    }

    $scope.fStatusChange = function(valor) {

        if (valor == '16' && $scope.status.ID == '4') { $scope.ClosingFup(); }

        $scope.loadingState = true;
        if (valor !== '9') {
            buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_att_status/JSON', 'aProp=' + idProposta + '&aStatus=' + valor + '&aPrograma=Usuario').then(function(data) {

                parent.parent.alertify.success($scope.literais.LITERAL_389);
                $scope.fStatusVerify();
                $scope.loadingState = false;
                $scope.reloadCache();
            });
        } else {

            if ($scope.proposta.motivoCancelamento == undefined) $scope.proposta.motivoCancelamento = 'Sem Justificativa.';
            var params = {
                'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
                'aProposta': idProposta,
                'aStatus': $scope.proposta.sStatus,
                'aJustificativa': $scope.proposta.motivoCancelamento,
                'aMotivo': $scope.proposta.motivo
            };

            callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_chg_status/JSON', params).then(function(data) {

                if ($scope.CodBooking_net != "") {
                    insurances._getToken().then(function(response) {
                        $http.post(
                            urlAPIPadrao + '/api/freights/coordination/bookings/' + idProposta + '/cancellation',
                            'reason=' + $scope.proposta.motivo, {
                                headers: {
                                    'Authorization': 'Bearer ' + response.securityToken,
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                            $scope.loadingState = false;
                        });
                    });
                }

                if ($scope.proposta.refSeguro.length) {
                    if (insurances.targetCode == '') insurances.targetCode = $scope.proposta.refSeguro;
                    insurances.cancel().then(function(data) {
                        parent.parent.alertify.success($scope.literais.LITERAL_389);
                        $scope.fStatusVerify();

                        $scope.loadingState = false;
                    });
                } else {
                    parent.parent.alertify.success($scope.literais.LITERAL_389);
                    $scope.fStatusVerify();

                    $scope.loadingState = false;
                }
                $scope.reloadCache();
            });
        }
    }


    //VERIFICA STATUS
    $scope.fStatusVerify = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fStatusVerify/JSON', 'aProp=' + idProposta).then(function(data) {
            $scope.status = data;
            $scope.proposta.aStatus = data.ID;
        });
    }

    //VERIFICA TERMINAL
    $scope.fTerminalVerify = function() {
        
        debugger;
        if ($scope.paramSimul.sIdSimulador!=='') {

            $scope.modalCalTerminalSimulacao();
        }

    }

    // NOVO AQUI - FIM

    // adições 08/14
    String.prototype.replaceAll || (function() {
        var regMetaChars = /[-\\^$*+?.()|[\]{}]/g;
        String.prototype.replaceAll = function(needle, replacement) {
            return this.replace(new RegExp(needle.replace(regMetaChars, '\\$&'), 'g'), replacement);
        };
    }());

    $scope.modalVia = {
        data: {},
        selectedData: null,
        checkChange: function(row) {
            // 
            if (!row.status) return;
            if ($scope.modalVia.selectedData != null)
                $scope.modalVia.selectedData.status = false;

            $scope.modalVia.selectedData = row;
        },
        open: function() {
            $scope.loadingState = true;

            var nPeso = 0;
            var nVolume = 0;
            var row;

            for (var i = $scope.tbContainers.containerLCL.length - 1; i >= 0; i--) {
                row = $scope.tbContainers.containerLCL[i];

                if (row.total.grossUnit == 'LB') {
                    nPeso = nPeso + (parseFloat(row.total.weight) / 2.20462);
                } else nPeso = nPeso + parseFloat(row.total.weight);

                if (row.total.volumeUnit == 'CFT') {
                    nVolume = nVolume + (parseFloat(row.total.volume) * 0.0283);
                } else nVolume = nVolume + parseFloat(row.total.volume);
            }

            buscaWS.get('/WVDF_WS/ws_HCGS3004.wso/fChoosePath/JSON', 'sProposta=' + idProposta + '&sEscalaPeso=' + nPeso + '&sEscalaCbm=' + nVolume).then(function(data) {

                if (data.length == 0) {

                    $scope.ValidaCarga = false;
                    $scope.edit2 = false;

                    var jasonop = JSON.stringify($scope.tbContainers.containerLCL);
                    //console.log(jasonop);
                    var promises = [];

                    for (var i = $scope.tbContainers.containerLCL.length - 1; i >= 0; i--) {
                        $scope.tbContainers.containerLCL[i].editable = false;
                        let row = $scope.tbContainers.containerLCL[i];
                        let modalidade = 'LCL';

                        row.modalidade = modalidade;

                        var param = montaParametrosCarga(row);
                        if (!param) return;

                        //console.log(param);
                        
                        promises.push($http({
                            url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_save/JSON',
                            method: 'POST',
                            data: param
                        }).success(function(data) {
                            //console.log("promise");
                            if (data.defaultMessage.msgInfo !== '') {
                                parent.parent.alertify.log(data.defaultMessage.msgInfo);
                                if (data.defaultMessage.msgSession == 1) {

                                    $scope.ValidaCarga = true;
                                }
                                return;
                            } else {
                                parent.parent.alertify.success($scope.literais.LITERAL_387);
                                return;
                            }
                            if (data.defaultMessage.msgError !== '' && data.defaultMessage.hasError == false) {
                                $scope.proposta.sStatus = data.defaultMessage.msgError;
                            }
                        }));
                        row.editable = false;
                    }
                    $scope.loadingState = true;
                    Promise.all(promises).then(function() {
                        //console.log("Todas as promises resolvidas");
                        $http({
                            method: 'POST',
                            url: '/WVDF_WS/ws_HCGS3005.wso/pLogDetalhesCarga/JSON',
                            data: JSON.stringify({ 'sPropostaId': idProposta, 'aUsuarioSessao': aUsuarioSessao }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(function(data) {
                            //console.log("promise");
                            $scope.tbPendencias = data;
                            $scope.negociarValidade.valid_ex = data.aValid;
                            $scope.negociarValidade.concorrente = data.aConcorrente;
                            refreshTabelas();
                            loadProposta();
                            $("#btnAlert3").trigger('click');
                            $('#alert3 .btn-danger').hide();
                            $scope.loadingState = false;
                        });
                    })
                } else {
                    data.forEach(function(element, index) {
                        element.sVia = element.sVia.replaceAll("(OF)", "<i class='fa fa-ship'></i>")
                            .replaceAll("(DTA)", '<i class="fa fa-truck" style="transform: scaleX(-1);"></i>')
                    })

                    $scope.modalVia.data = data;

                    $('#modalsVia').modal('show');
                }

                $scope.loadingState = false;
            });
        },
        save: function() {

            if ($scope.modalVia.selectedData == undefined || $scope.modalVia.selectedData == null) {
                parent.parent.alertify.error($scope.literais.LITERAL_329);
                return;
            } else {
                parent.parent.alertify.success($scope.literais.LITERAL_390);
            }
            $('#modalsVia').modal('hide');
            $scope.loadingState = true;
            $scope.ValidaCarga = false;
            $scope.edit2 = false;

            var jasonop = JSON.stringify($scope.tbContainers.containerLCL);
            //console.log(jasonop);
            var promises = [];

            //CHAMADA EM CAMADAS
            for (var i = $scope.tbContainers.containerLCL.length - 1; i >= 0; i--) {
                $scope.tbContainers.containerLCL[i].editable = false;
                let row = $scope.tbContainers.containerLCL[i];
                let modalidade = 'LCL';

                row.modalidade = modalidade;

                var param = montaParametrosCarga(row);
                if (!param) return;
                
                promises.push($http({
                    url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_save/JSON',
                    method: 'POST',
                    data: param
                }).success(function(data) {
                    //console.log("promise");
                    if (data.defaultMessage.msgInfo !== '') {
                        parent.parent.alertify.log(data.defaultMessage.msgInfo);
                        if (data.defaultMessage.msgSession == 1) {

                            $scope.ValidaCarga = true;
                            $("#btnAlert3").trigger('click');
                        }
                        return;
                    } else {
                        parent.parent.alertify.success($scope.literais.LITERAL_387);
                        return;
                    }
                    if (data.defaultMessage.msgError !== '' && data.defaultMessage.hasError == false) {
                        $scope.proposta.sStatus = data.defaultMessage.msgError;
                    }
                }));
                row.editable = false;
            }
            $scope.loadingState = true;
            
            Promise.all(promises).then(function() {

                //console.log("Todas as promises resolvidas");
                $http({
                    method: 'POST',
                    url: '/WVDF_WS/ws_HCGS3005.wso/pLogDetalhesCarga/JSON',
                    data: JSON.stringify({ 'sPropostaId': idProposta, 'aUsuarioSessao': aUsuarioSessao }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function(data) {
                    //console.log("promise");
                    // $scope.loadingState = false; 
                    
                    $scope.tbPendencias = data;
                    $scope.negociarValidade.valid_ex = data.aValid;
                    $scope.negociarValidade.concorrente = data.aConcorrente;

                    buscaWS.get('/WVDF_WS/ws_HCGS3006.wso/fPatchChosen/JSON', 'sProposta=' + idProposta + '&sRecnum1=' + $scope.modalVia.selectedData.sRecnum1 + '&sRecnum2=' + $scope.modalVia.selectedData.sRecnum2).then(function(data) {
                        let tab = window.top.document.getElementById("pageTab").getElementsByClassName("active")[0];
                        if (tab.getElementsByTagName("a")[0].firstChild.nodeValue == "Nova Proposta - LCL") {
                            tab.getElementsByTagName("a")[0].firstChild.nodeValue = "Proposta #" + $scope.proposta.idProposta;

                            const urlParams = new URLSearchParams(window.location.search);
                            urlParams.delete('idClone');
                            urlParams.set('idProposta', idProposta);
                            window.location.search = urlParams;                            
                        }
                        debugger;
                        if (data.data==2) {
                            $scope.propostaDTA();
                        }
                        else {
                            $('#tab2Link').trigger('click');
                            // $scope.forceLoadingState = false;
                            refreshTabelas();
                            loadProposta();
                            $scope.btnRefreshInfo();
                            $scope.Notify();
                            $scope.loadTotals();
                            $scope.loadingState = false;
                        }
                    });
                });
            })
        },
        close: function() {
            loadProposta();
            refreshTabelas();
        }
    }

    $scope.CtrnOverflow = function(row) {

        if (row.UOM == 'CM') {
            if (row.height > 257) {
                parent.parent.alertify.error($scope.literais.LITERAL_391);
                row.height = 0;
            }
            if (row.length > 1189) {
                parent.parent.alertify.error($scope.literais.LITERAL_392);
                row.length = 0;
            }
            if (row.width > 227) {
                parent.parent.alertify.error($scope.literais.LITERAL_393);
                row.width = 0;
            }
        }
        if (row.UOM == 'Inches') {
            if (row.height > 101.515) {
                parent.parent.alertify.error($scope.literais.LITERAL_391);
                row.height = 0;
            }
            if (row.length > 473.605) {
                parent.parent.alertify.error($scope.literais.LITERAL_392);
                row.length = 0;
            }
            if (row.width > 92.035) {
                parent.parent.alertify.error($scope.literais.LITERAL_393);
                row.width = 0;
            }
        }
    }

    $scope.btnSaveRefs = function() {
        var refs = {};
        //refs.cRef = $scope.proposta.sCust_Ref;
        //refs.iRef = $scope.proposta.sInt_Ref;
        refs.cInst = $scope.proposta.sCust_Inst;
        //refs.iCmts = $scope.proposta.sComentts;
        refs.aUsuarioSessao = aUsuarioSessao;
        refs.proposta = idProposta;
        //refs.status = $scope.proposta.chat_stat;

        var param = { 'sJSON': refs };

        callWS.get('/WVDF_WS/ws_HCGS3004.wso/fReferences/JSON', param).then(function(response) {
            // 
            parent.parent.alertify.success($scope.literais.LITERAL_394);
            $scope.getMessages();
            $scope.proposta.sComentts = '';
            $scope.fStatusVerify();
            $scope.reloadCache();
        });

    }

    $scope.fPesquisaTp = function() {
        var texto = $scope.Booking.pesquisaNome;
        var tipo = $scope.Booking.pesquisaTipo;
        if (tipo == undefined || tipo == '') {
            parent.parent.alertify.error($scope.literais.LITERAL_231);
            return;
        }
        if (texto == '' || texto == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_434);
            return;
        }
        //shipper
        if (tipo == "16") tipo = 'S';
        //forwarder
        if (tipo == "20") tipo = 'F';
        //Despachante
        if (tipo == "19") tipo = 'D';
        //Consignee
        if (tipo == "17") tipo = 'C';
        //Notify
        if (tipo == "18") tipo = 'N';
        //Fornecedor DTA - R
        if (tipo == "22") tipo = 'T';

        buscaWS.get('/WVDF_WS/ws_HCGS3008.wso/fPesquisaPessoaTp/JSON', 'sInicio=' + encodeURIComponent(texto) + '&sTipo=' + tipo + '&sBookingId=' + idAprovado).then(function(data) {
            $scope.lsPesquisaPessoasTp = data;
        });
    }
    //ALIMENTA A PESQUISA DE CONTATOS DAS PESSOAS
    $scope.fPesquisaContactTp = function(texto, tipo) {

        if (tipo == undefined || tipo == '') {
            parent.parent.alertify.error($scope.literais.LITERAL_231);
            return;
        }
        if (texto == '' || texto == undefined) {
            parent.parent.alertify.error($scope.literais.LITERAL_395);
            return;
        }
        //shipper
        if (tipo == "16") tipo = 'S';
        //forwarder
        if (tipo == "20") tipo = 'F';
        //Despachante
        if (tipo == "19") tipo = 'D';
        //Consignee
        if (tipo == "17") tipo = 'C';
        //Notify
        if (tipo == "18") tipo = 'N';

        buscaWS.get('/WVDF_WS/ws_HCGS3008.wso/fPesquisaPessoaTp/JSON', 'sInicio=' + texto + '&sTipo=' + tipo + '&sBookingId=' + idAprovado).then(function(data) {
            $scope.lsPesquisaContatosTp = data;
        });
    }

    $scope.fChangeBL = function(contato) {
        $scope.loadingState = true;
        buscaWS.get('/WVDF_WS/ws_hsag562.wso/fRepresentanteId/JSON', 'sRecnum=' + contato.sRecnum + '&sBookingId=' + idAprovado + '&sId=' + contato.representante_id).then(function(data) {
            buscaWS.get('/WVDF_WS/ws_HCGS3008.wso/fBookingPessoasLista/JSON', 'sBookingId=' + idAprovado).then(function(data) {

                $scope.lsBookingPessoasTp = data;
                buscaWS.get('/WVDF_WS/ws_hsag562.wso/fEmpresasBookingCombo/JSON', "sBookingId=" + idAprovado).then(function(data) {
                    $scope.lsEmpresaCotatos = data;
                    $scope.loadingState = false;
                });
                if ($scope.proposta.modalidades == 'LCL' && $scope.proposta.operacao == '4') $scope.refreshContatos('', '');
                else $scope.refreshContatosExpo();
            });

        });
    }

    $scope.fBookingPessoasTp = function() {
        // 
        buscaWS.get('/WVDF_WS/ws_HCGS3008.wso/fBookingPessoasLista/JSON', 'sBookingId=' + idAprovado).then(function(data) {

            $scope.lsBookingPessoasTp = data;
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/fEmpresasBookingCombo/JSON', "sBookingId=" + idAprovado).then(function(data) {
                $scope.lsEmpresaCotatos = data;
            });
            if ($scope.proposta.modalidades == 'LCL' && $scope.proposta.operacao == '4') $scope.refreshContatos('', '');
            else $scope.refreshContatosExpo();
        });
    }

    $scope.fAplicarPessoaTp = function(pessoa, tipo) {

        //shipper
        if (tipo == "16") {
            if ($scope.Booking.Shipper_id == '') { $scope.Booking.Shipper_id = pessoa.idCliente + '|'; } else { $scope.Booking.Shipper_id = $scope.Booking.Shipper_id + pessoa.idCliente + '|'; }
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + pessoa.idCliente + '&sTipo=S').then(function(data) {});
        }
        //forwarder
        if (tipo == "20") {
            if ($scope.Booking.Forwarder_id == '') { $scope.Booking.Forwarder_id = pessoa.idCliente + '|'; } else { $scope.Booking.Forwarder_id = $scope.Booking.Forwarder_id + pessoa.idCliente + '|'; }
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + pessoa.idCliente + '&sTipo=F').then(function(data) {});
        }
        //Despachante
        if (tipo == "19") {
            if ($scope.Booking.Despachante_id == '') { $scope.Booking.Despachante_id = pessoa.idCliente + '|'; } else { $scope.Booking.Despachante_id = $scope.Booking.Despachante_id + pessoa.idCliente + '|'; }
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + pessoa.idCliente + '&sTipo=D').then(function(data) {});
        }
        //Consignee
        if (tipo == "17") {
            if ($scope.Booking.Cnee_id == '') { $scope.Booking.Cnee_id = pessoa.idCliente + '|'; } else { $scope.Booking.Cnee_id = $scope.Booking.Cnee_id + pessoa.idCliente + '|'; }
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + pessoa.idCliente + '&sTipo=C').then(function(data) {
                if (data == 0) {
                    parent.parent.alertify.error($scope.literais.LITERAL_396);
                    $scope.fPesquisaTp();
                }

            });
        }
        //Notify
        if (tipo == "18") {
            if ($scope.Booking.Notify_id == '') { $scope.Booking.Notify_id = pessoa.idCliente + '|'; } else { $scope.Booking.Notify_id = $scope.Booking.Notify_id + pessoa.idCliente + '|'; }
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + pessoa.idCliente + '&sTipo=N').then(function(data) {
                if (data == 0) {
                    parent.parent.alertify.error($scope.literais.LITERAL_397);
                    $scope.fPesquisaTp();
                }
            });
        }
        //Fornecedor DTA
        if (tipo == "22") {
            if ($scope.Booking.Notify_id == '') { $scope.Booking.Notify_id = pessoa.idCliente + '|'; } else { $scope.Booking.Notify_id = $scope.Booking.Notify_id + pessoa.idCliente + '|'; }
            buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId=" + idAprovado + '&sPessoa=' + pessoa.idCliente + '&sTipo=T').then(function(data) {
                if (data == 0) {
                    parent.parent.alertify.error($scope.literais.LITERAL_397);
                    $scope.fPesquisaTp();
                }
            });
        }
    }

    $scope.deletePessoaShipper = function(codigo) {
        var data = {
            "sCodigo": codigo,
            "aUsuarioSessao": aUsuarioSessao
        }
        $scope.sweetAlert($scope.literais.LITERAL_420, $scope.literais.LITERAL_453, "warning", $scope.literais.LITERAL_428).then((response) => {
            if (response) {
                $http.post('/WVDF_WS/ws_hcgs3008.wso/fDesactivateShipper', data).then(function(response) {
                    if (response.data.hasError) parent.parent.alertify.error(response.data.msgError);
                    else {
                        parent.parent.alertify.error(response.data.msgInfo);
                        $scope.fPesquisaTp();
                    }
                });
            }
        });
    }

    $scope.deleteTaxaManual = function(row) {
        let texto = (row.bComissao) ? $scope.literais.LITERAL_427 + "<br><h5 style='color: red;'>" + $scope.literais.LITERAL_454 + "</h5>" : $scope.literais.LITERAL_427;
        $scope.sweetAlert($scope.literais.LITERAL_420, texto, "warning", $scope.literais.LITERAL_428).then((response) => {
            if (response) {
                var data = {
                    "aUsuarioSessao": aUsuarioSessao,
                    "sRecnum": row.sRecnum
                }

                $http.post('/WVDF_WS/ws_hcgs3006.wso/fDeleteTax', data).then(function(data) {
                    $scope.btnRefreshInfo();
                });
            }
        });
    }

    $scope.sweetAlert = function(titulo, texto, icone, confirmarTexto) {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: titulo,
                html: texto,
                icon: icone,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: confirmarTexto,
                cancelButtonText: $scope.literais.LITERAL_421,
                showClass: {
                    backdrop: 'swal2-noanimation', // disable backdrop animation
                    popup: '', // disable popup animation
                    icon: '' // disable icon animation
                },
                hideClass: {
                    popup: '' // disable popup animation
                },
                willOpen: () => {
                    $('.swal2-popup').css('top', window.top.scrollY + 200 - self.innerHeight / 2);
                    $('.swal2-popup').css('font-size', 14);
                }
            }).then((result) => {
                if (result.isConfirmed) resolve(true);
                else resolve(false);
            });
        });
    }

    $scope.fRemovePessoaTp = function(id) {
        $scope.sweetAlert($scope.literais.LITERAL_420, $scope.literais.LITERAL_422, "warning", $scope.literais.LITERAL_428).then((response) => {
            if (response) {
                buscaWS.get('/WVDF_WS/ws_hsag562.wso/pDLContatoBook/JSON', 'sRecord=' + id).then(function(data) {
                    parent.parent.alertify.error($scope.literais.LITERAL_398);
                    $scope.fBookingPessoasTp();
                    $scope.fLoadContactsAdvance();
                    $scope.reloadCache();
                });
            }
        });
    }


    $scope.boolF = "true";

    $scope.fLoadContactsAdvance = function() {
        // 
        buscaWS.get('/WVDF_WS/ws_ccgs212.wso/fListaNoticesPerContact/JSON', 'sBookingId=' + idAprovado).then(function(data) {

            $scope.lsContatosAvancados = data;
            for (var i = $scope.lsContatosAvancados.length - 1; i >= 0; i--) {
                if ($scope.lsContatosAvancados[i].aviso01 == 1) $scope.lsContatosAvancados[i].aviso01 = true;
                else $scope.lsContatosAvancados[i].aviso01 = false;

                if ($scope.lsContatosAvancados[i].aviso02 == 1) $scope.lsContatosAvancados[i].aviso02 = true;
                else $scope.lsContatosAvancados[i].aviso02 = false;

                if ($scope.lsContatosAvancados[i].aviso03 == 1) $scope.lsContatosAvancados[i].aviso03 = true;
                else $scope.lsContatosAvancados[i].aviso03 = false;

                if ($scope.lsContatosAvancados[i].aviso04 == 1) $scope.lsContatosAvancados[i].aviso04 = true;
                else $scope.lsContatosAvancados[i].aviso04 = false;

                if ($scope.lsContatosAvancados[i].aviso05 == 1) $scope.lsContatosAvancados[i].aviso05 = true;
                else $scope.lsContatosAvancados[i].aviso05 = false;

                if ($scope.lsContatosAvancados[i].aviso06 == 1) $scope.lsContatosAvancados[i].aviso06 = true;
                else $scope.lsContatosAvancados[i].aviso06 = false;

                if ($scope.lsContatosAvancados[i].aviso07 == 1) $scope.lsContatosAvancados[i].aviso07 = true;
                else $scope.lsContatosAvancados[i].aviso07 = false;
            }
        });
    }

    $scope.fSaveChagedDate = function(valor, id) {
        buscaWS.get('/WVDF_WS/ws_hsag561.wso/pContactAdvanced/JSON', 'sBookingId=' + idAprovado + '&sValor=' + valor + '&sTipo=' + id).then(function(data) {

        });
    }

    $scope.fNoticeChanged = function(id, aviso, value) {
        if ($scope.NetshipValidation) buscaWS.get('/WVDF_WS/ws_ccgs212.wso/pContactAdvanced/JSON', 'sContact=' + id + '&sAviso=' + aviso + '&sValor=' + value).then(function(data) { $scope.reloadCache() });
    }

    // fim 08/14
    $scope.margem = [];
    //19/11
    $scope.fCallMargem = function() {
        buscaWS.get('/WVDF_WS/ws_HSAG3004.wso/fComparativeMargem/JSON', 'sPropostaId=' + idProposta).then(function(data) {

            $scope.margem = data;
        });
    }

    $scope.BtnRecalculo = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/fRecalculoTaxes/JSON', 'sPropostaId=' + idProposta).then(function(data) {
            parent.parent.alertify.success($scope.literais.LITERAL_399);
            $scope.btnRefreshInfo();

            angular.element(function() {
                $('#tab2Link').trigger('click');
                // $scope.forceLoadingState = false;
            });
            $scope.loadingState = false;
        });
    }
    //fim 19/11

    //NOVO AQUI
    $scope.fControleTrava = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fControleTravaProposta/JSON', 'sProposta=' + idProposta + '&sId=1').then(function(data) {
            parent.parent.alertify.success($scope.literais.LITERAL_400);
            $scope.proposta.trava_calculo = data;
            // $scope.loadingState = false;
        });
    }

    $scope.fChangePercent = function(id) {

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


    $scope.seguroSave = function() {

        // 
        if ($scope.proposta.valorSeguro <= 0) {

            parent.parent.alertify.error($scope.literais.LITERAL_401);
            return;

        }
        if (!$scope.proposta.refSeguro || $scope.proposta.refSeguro == '') {
            insurances.create().then(function(data) {
                const parametros = {
                    aUsuarioSessao: aUsuarioSessao,
                    sPropostaId: $scope.proposta.idProposta,
                    sRef: data.targetCode,
                    moeda: data.tradedCurrency || '',
                    venda: data.salesValue || '',
                    compra: data.purchaseValue || '',
                    validade: data.expirationDate || '',
                    sValorSeguro: $scope.proposta.valorSeguro || ''

                };

                $scope.proposta.refSeguro = data.targetCode;
                $scope.proposta.validadeSeguro = data.expirationDate;
                $http.get('/WVDF_WS/ws_hcgs3004.wso/fSaveSeguroRef/JSON', { params: parametros }).then(function(response) {
                    $scope.btnRefreshInfo();
                    $scope.loadReferences();
                    parent.parent.alertify.success($scope.literais.LITERAL_384);
                }, function(err) {
                    parent.parent.alertify.error($scope.literais.LITERAL_385);
                });
            }, function(err) {
                parent.parent.alertify.alert(err.data[0].message);
            });
        } else {
            insurances.update().then(function(data) {
                insurances.targetCode = data.targetCode;
                const parametros = {
                    aUsuarioSessao: aUsuarioSessao,
                    sPropostaId: $scope.proposta.idProposta,
                    sRef: data.targetCode,
                    moeda: data.tradedCurrency || '',
                    venda: data.salesValue || '',
                    compra: data.purchaseValue || '',
                    validade: data.expirationDate || '',
                    sValorSeguro: $scope.proposta.valorSeguro || ''

                };

                if ($scope.proposta.taxEspeciais) {

                    $scope.proposta.refSeguro = data.targetCode
                    $scope.proposta.validadeSeguro = data.expirationDate;
                    $http.get('/WVDF_WS/ws_hcgs3004.wso/fSaveSeguroRef/JSON', { params: parametros }).then(function(response) {
                        $scope.btnRefreshInfo();
                        $scope.loadReferences();
                        parent.parent.alertify.success($scope.literais.LITERAL_384);
                    }, function(err) {
                        parent.parent.alertify.error($scope.literais.LITERAL_385);
                    });
                } else {
                    $http.get('/WVDF_WS/ws_hcgs3004.wso/fSeguroOff/JSON', { params: parametros }).then(function(response) {
                        $scope.proposta.refSeguro = '';
                        insurances.targetCode = '';
                        insurances.created = false;
                        $scope.btnRefreshInfo();


                        parent.parent.alertify.success($scope.literais.LITERAL_384);
                    }, function(err) {
                        parent.parent.alertify.error($scope.literais.LITERAL_385);
                    });
                }
            }, function(err) {
                parent.parent.alertify.alert(err.data[0].message);
            });
        }

    }

    $scope.checkSeguro = function() {
        // 
        if (!$scope.proposta.taxEspeciais) {

            const parametros = {
                aUsuarioSessao: aUsuarioSessao,
                sPropostaId: $scope.proposta.idProposta
            };

            $http.get('/WVDF_WS/ws_hcgs3004.wso/fSeguroOff/JSON', { params: parametros }).then(function(response) {
                // $scope.proposta.refSeguro = '';
                // insurances.targetCode = '';
                // insurances.created = false;
                $scope.btnRefreshInfo();


                // parent.parent.alertify.error('Sucesso!');
            }, function(err) {
                // parent.parent.alertify.error('Erro!');
            });
        }

    }

    const insurances = {
        aUsuarioSessao: aUsuarioSessao,
        baseURL: urlAPIPadrao + '/api/freights/insurances',
        // baseURL: 'https://crm.grupocraft.com.br:8090/api/freights/insurances',
        targetCode: '',
        _getToken: function() {
            const tokenURL = urlAPIPadrao + '/api/accounts/users/security-tokens';
            // const tokenURL = 'https://crm.grupocraft.com.br:8090/api/accounts/users/security-tokens';
            const path = '';
            const parameters = {
                "sessionId": insurances.aUsuarioSessao || ""
            }

            const param2 = "sessionId=" + insurances.aUsuarioSessao;
            return $http.post(tokenURL + path, param2, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(response) {
                return response.data;
            }, function(response) {
                //$scope.NetshipValidation = false;
                // parent.parent.alertify.error(response.data.error);
            });
        },
        approval: function(type) {
            const path = '/quotes/{targetCode}/approval'.replace('{targetCode}', insurances.targetCode);

            let date = new Date();
            const dd = String(date.getDate() + 1).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = date.getFullYear();

            date = yyyy + '-' + mm + '-' + dd;

            let coordinatorId = (type == 'IMPO') ? $scope.Booking.CS_id : $scope.elaborador_id
            let finalc = $scope.proposta.sClienteFinal.idCliente || '';
            finalc = (finalc);
            const parameters = {
                "modifiedById": $scope.proposta.sAtualUser,
                "coordinatorId": coordinatorId || '',
                "finalCustomerId": finalc || '',
                "goods": 'carga geral' || '',
                "estimatedDate": date || '',
                "proposalId": $scope.proposta.idProposta || ''
            }

            $scope.loadingState = true;
            return insurances._getToken().then(function(response) {
                return $http.post(insurances.baseURL + path, parameters, { headers: { 'Authorization': 'Bearer ' + response.securityToken } }).then(function(response) {
                    $scope.loadingState = false;
                    return response.data;
                }, function(err) {
                    return err;
                });
            }, function(err) { $scope.loadingState = false; return err; })
        },
        cancel: function(reasonCode, Observation, modifiedById) {
            const path = '/quotes/{targetCode}/cancel'.replace("{targetCode}", insurances.targetCode);;
            const parameters = {
                "reasonCode": 1 || "",
                "Observation": '"Cancelado junto a proposta ' + $scope.proposta.idProposta || "",
                "modifiedById": $scope.proposta.sAtualUser || ""
            }

            $scope.loadingState = true;
            return insurances._getToken().then(function(response) {
                return $http.post(insurances.baseURL + path, parameters, { headers: { 'Authorization': 'Bearer ' + response.securityToken } }).then(function(response) {
                    $scope.loadingState = false;
                    return response.data
                }, function(err) {
                    $scope.loadingState = false;
                    return err;
                });
            }, function(err) { $scope.loadingState = false; return err; });
        },
        create: function(reasonCode, Observation, modifiedById) {
            const path = '';
            let finalCostumer = $scope.proposta.sClienteFinal.idCliente || idCliente;
            finalCostumer = finalCostumer;

            const parameters = {
                "OperationType": $('#slcOperacao option:selected').text() || '', //$scope.proposta.operacao || "",
                "ModalName": "MARITIMO" || "",
                "CustomerId": parseInt(idCliente) || "",
                "CompanyId": $scope.proposta.marca || "",
                "isSameEnsured": $scope.proposta.sClienteFinal.idCliente ? false : true,
                "FinalCustomerId": finalCostumer,
                "OriginCityCode": $scope.proposta.unOrigem || "",
                "OriginCountryCode": $scope.proposta.paisPol || "",
                "DestinationCityCode": $scope.proposta.unDestino || "",
                "DestinationCountryCode": $scope.proposta.paisPod || "",
                "Goods": $scope.proposta.sMercadoria || "",
                "InsuranceQuoteFreightProposal": {
                    "GoodsValue": $scope.proposta.valorSeguro || "",
                    "FreightValue": $scope.proposta.valorFrete || "",
                    "ColoaderCommissionValue": 0 || "",
                    "TaxAmount": 0 || "",
                    "SalesValue": 2000 || "",
                    "AssumedProfit": false || "",
                    "CreatedById": $scope.proposta.sAtualUser || ""
                }
            }

            $scope.loadingState = true;
            return insurances._getToken().then(function(response) {
                return $http.post(insurances.baseURL + path, parameters, { headers: { 'Authorization': 'Bearer ' + response.securityToken } }).then(function(response) {
                    insurances.targetCode = response.data.targetCode;
                    return response.data;
                }, function(err) {
                    $scope.loadingState = false;
                    parent.parent.alertify.alert(err.data[0].message);
                    return err;
                });
            }, function(err) {
                $scope.loadingState = false;
                parent.parent.alertify.alert(err.data[0].message);
                throw new Error(err);
                return err;
            });
        },
        update: function(goodsValue, freightValue, coloaderCommissionValue, taxAmount, salesValue, expectedProfit, createdById) {

            const path = '/quotes/{targetCode}/proposal'.replace("{targetCode}", $scope.proposta.refSeguro);
            const parameters = {
                "goodsValue": $scope.proposta.valorSeguro || '',
                "freightValue": $scope.proposta.valorFrete || '',
                "coloaderCommissionValue": 0 || '',
                "taxAmount": 0 || '',
                "salesValue": 0 || '',
                "expectedProfit": expectedProfit || '',
                "createdById": $scope.proposta.sAtualUser || ''
            }

            $scope.loadingState = true;
            return insurances._getToken().then(function(response) {
                return $http.put(insurances.baseURL + path, parameters, { headers: { 'Authorization': 'Bearer ' + response.securityToken } }).then(function(response) {
                    $scope.loadingState = false;
                    return response.data;
                }, function(err) {
                    $scope.loadingState = false;
                    return err;
                });
            }, function(err) { $scope.loadingState = false; return err; });
        }
    }

    $scope.GenerateFup = function() {

        let date = new Date();
        date.setDate(date.getDate() + 1);

        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();

        insurances._getToken().then(function(response) {

            date = yyyy + '-' + mm + '-' + dd;
            $http.post($scope.CRMURL2 + '/api/freights/coordination/bookings/' + idProposta + '/follow-ups', {
                "freightFollowUpActivity": { "id": "1" }, // Códigos vem da tabela FreightFollowUpActivities
                "freightFollowUpResponsible": { "id": 5 }, // Códigos vem da tabela FreightFollowUpResponsibles
                "status": 1, // Status pendente
                "freightFollowUpActions": [],
                "note": "", // Aqui é um texto livre, pode ser null
                "date": { "estimated": date }, // Data estimada de conclusão da atividade
                "notifyDate": null,
                "endDate": { "estimated": date },
                "city": null,
                "freightFollowUpNotification": null
            }, { headers: { 'sync': true, 'Authorization': 'Bearer ' + response.securityToken } }).then(function(response) {
                //console.log(response);
                // var resposta = response;
                parent.parent.alertify.success('FUP gerado!');
                $scope.CodBooking_net = $scope.CodBooking_net2;
                $scope.loadingState = false;
            }, function(error) {
                //console.log(error);
                parent.parent.alertify.error(error.data[0].message);
                $scope.CodBooking_net = $scope.CodBooking_net2;
                $scope.loadingState = false;
            });
        });
    }

    //CLOSE DE FOLLOW UP AUTOMATIZADO.
    $scope.ClosingFup = function() {

        // 
        insurances._getToken().then(function(response) {
            $scope.crmToken = response.securityToken;



            //$http.get("/WVDF_WS/ws_hcgs3004.wso/fHistoricoProposta/JSON?sPropostaId=" + $scope.proposta.idProposta ).then(function(response) {
            buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fMsgFollowUp/JSON', 'sPropostaId=' + idProposta).then(function(data) {

                $scope.DescriptionBack = data[0].logMsg;

                $http.get($scope.CRMURL2 + '/api/freights/coordination/bookings/' + idProposta + '/follow-ups?currentPage=&pageSize=&isExcelExport=false&status=1&freightFollowUpActivityId=52', { headers: { 'Authorization': 'Bearer ' + $scope.crmToken } })
                    .then(function(response) {


                        if (response.data.items !== undefined) {
                            let date = new Date();
                            date.setDate(date.getDate() + 1);

                            const dd = String(date.getDate()).padStart(2, '0');
                            const mm = String(date.getMonth() + 1).padStart(2, '0');
                            const yyyy = date.getFullYear();
                            for (let followId of response.data.items) {
                                $http.put($scope.CRMURL2 + '/api/freights/coordination/bookings/' + idProposta + '/follow-ups/' + followId.id, {
                                        "id": followId.id, // Código do follow-up recuperado anteriormente
                                        "freightFollowUpActivity": {
                                            "id": 52 // Atividade "Em análise pelo Pricing", deve ser sempre 52
                                        },
                                        "freightFollowUpResponsible": {
                                            "id": 3 // Responsável "Pricing", deve ser sempre 3
                                        },
                                        "status": 2, // Status "Sucesso", deve ser sempre 2
                                        "freightFollowUpActions": [

                                            {
                                                "description": $scope.DescriptionBack, //$scope.DescriptionBack, // Observações, texto livre
                                                "freightFollowUpReplyId": 2 // Resposta "Atividade finalizada com sucesso.", deve ser sempre 2

                                            }
                                        ],
                                        "note": "", // Aqui é um texto livre, pode ser null
                                        "date": { "estimated": date }, // Data estimada de conclusão da atividade
                                        "notifyDate": null,
                                        "endDate": { "estimated": date },
                                        "city": null,
                                        "freightFollowUpNotification": null

                                    }, { headers: { 'Authorization': 'Bearer ' + $scope.crmToken } })
                                    .then(function(response) {

                                    })
                            }
                        }

                    });

            });
        });
    }

    $scope.btnChangeMdPagto = function(mdPagto, Class) {
        // row.permissao = $scope.permissao;

        if (mdPagto == '') {
            parent.parent.alertify.error('Modo de Pagamento Invalido!');
            return;
        }

        var params = { 'aUsuarioSessao': aUsuarioSessao, 'sPropostaId': $scope.proposta.idProposta, 'sClasse': Class, 'sMdPagto': mdPagto };

        callWS.get('/WVDF_WS/ws_hcgs3006.wso/fTrocaModPagtoPerClass/JSON', params).then(function(response) {
            if (response.data == '1') parent.parent.alertify.success('Alterado!');
            else parent.parent.alertify.error('Alterado!');
            $scope.btnRefreshInfo();
        });
    }

    $scope.propostaDTA = function() {

        debugger;  
        var params = { 'sUsuarioSessao': aUsuarioSessao, 'sProposta': $scope.proposta.idProposta};

        callWS.get('/WVDF_WS/ws_HCGS3004.wso/fMontaAmalogProp/JSON', params).then(function(response) {
            if (response.data.bError) {
                parent.parent.alertify.error(response.data.sMsg);
                refreshTabelas();
                loadProposta();
                $scope.btnRefreshInfo();
                $scope.Notify();
                $scope.loadTotals();
                $scope.loadingState = false;
                return;
            }

            debugger;
            var jsonPropDta = { 
                "apiType":"amalog-quotation",
                "cdProposta":0,
                "txCliente":response.data.sCliente,//"CRAFT MULTIMODAL LTDA",
                "txCnpj":response.data.sCNPJ,//"01.831.941/0001-30",
                "cdTipo":response.data.nTipo,//1
                "cdOrigem":response.data.nOrigem,//15
                "cdDestino":response.data.nDestino,//1
                "cdMoeda":response.data.nMoeda,//790
                "cdTerminal":response.data.nTerminal,//2
                "ckAnvisa":"N",
                "ckEmpilhavel":"S",
                "ckFreteDedicado":"N",
                "ckImo":"N",
                "txEmailTaxaFixa":"teste@amalog.com.br",//response.data.sEmalColaborador//"luis.pereira@craftmulti.com"
                "vlPeso": response.data.vlPeso,//50.0,
                "vlCubagem": response.data.vlCubagem,//1.000,
                "vlMercadoriaMoeda": response.data.vlMercadoria,//10000.0,
                "vlMercadoriaReal": response.data.vlMercadoria,//10000.0,
                "vlEmissaoDta": 200.0//?
            };
            jsonPropDta = JSON.stringify(jsonPropDta);

            $http({
                method: 'POST',
                url: 'https://connect-dev.craftmulti.com/pricing/amalog-request',
                headers: { 'craft-apikey-dev': '256c85795db241b196d06a9a4dec43bf', 'Content-Type': 'application/json' },
                data: jsonPropDta
            }).then(function success(response) {
                debugger;
                $scope.proposta.amalogId = response.data.cdProposta;

                if (response.data.cdProposta !== 0) {
                    
                    debugger;
                    var jsonPropDta2 = {
                        "nCdAmalog":response.data.cdProposta,
                        "sProposta":$scope.proposta.idProposta,
                        "sTxAmalog":response.data.txProposta,
                        "nValor1":response.data.vlFretePrevisto,
                        "nValor2":response.data.nDestino,
                    };
                    jsonPropDta = JSON.stringify(jsonPropDta2);

                    $http({
                        method: 'POST',
                        url: '/WVDF_WS/ws_HCGS3004.wso/fSaveAmalog/JSON',
                        headers: {'Content-Type': 'application/json'},
                        data: jsonPropDta2
                    }).then(function success(response) {
                    //buscaWS.get('', parametros).then(function(response) {
                        debugger;
                        if (response.data == '1') parent.parent.alertify.success('Proposta Amalog salva com sucesso!');

                        refreshTabelas();
                        loadProposta();
                        $scope.btnRefreshInfo();
                        $scope.Notify();
                        $scope.loadTotals();
                        $scope.loadingState = false;

                    });

                }

            }, function error(response) {
                parent.parent.alertify.error('Erro na proposta Amalog.');
            });   

        });                     
    }
    $scope.avisoRentabilidade ='';
    $scope.fRentabilidadeTerminal = function(valorGR) {
        debugger;
        var rentaPeso = ($scope.proposta.ttgw).replace('.','').replace(',','.');
        var rentaVolume = ($scope.proposta.ttcbm).replace('.','').replace(',','.');
        var simuCif = (parseFloat($scope.paramSimul.sValorCifBrl)*parseFloat($scope.conversorMoeda.valor)).toFixed(2);
        var jsonPropMargem = {
            "cliente": {
                "documento": $scope.paramSimul.sClienteDoc,//"74182593000190", 
                "cod2Pais": $scope.paramSimul.sClientePais//"BR"  
            },
            "seuCliente": {
                "documento": $scope.paramSimul.sNacDoc,//"00000000000000", 
                "cod2Pais": $scope.paramSimul.sNacPais//"BR"
            },
            "origem": $scope.paramSimul.sOrigem,//"MIAMI",
            "destino": $scope.paramSimul.sDestino,//"SANTOS", 
            "destinoFinal": $scope.paramSimul.sDestinoFinal,//"SANTOS", 
            "produto": $scope.paramSimul.sProduto,//"LCL", 
            "pesoKg": rentaPeso,//$scope.paramSimul.sPesoKg,//10.30,
            "volumeM3": rentaVolume,//$scope.paramSimul.sVolumeM3,//2.5, 
            "cargaIMO": $scope.paramSimul.sCargaImo,//"NÃO",    
            "cargaAnvisa": $scope.paramSimul.sCargaAnvisa,//"NÃO",    
            "valorCifBRL": simuCif,//$scope.paramSimul.sValorCifBrl,//0, 
            "terminal": {
                "documento": $scope.paramSimul.sTerminalDoc,//"58188756002210", 
                "cod2Pais": $scope.paramSimul.sTerminalPais//"BR" 
            },
            "valorGR": valorGR//3900.00 //valor do terminal
        };

        jsonPropMargem = JSON.stringify(jsonPropMargem);
        //verificar para prod
        $http({
            method: 'POST',
            //H
            url: 'https://connect-dev.craftmulti.com/integra-dados/receita-estimada',
            headers: { 'craft-apikey-dev': '3a2e2deb169d4b5eb8bf82543cae2b86', 'Content-Type': 'application/json' },
            //P
            //url: 'https://connect.craftmulti.com/integra-dados/receita-estimada',
            //headers: { 'craft-apikey': '735039e4b8f84499ba3f3bc2f819c8fc', 'Content-Type': 'application/json' },

            data: jsonPropMargem
        }).then(function success(response) {
            debugger;

            var jsonRenta = response.data.body;
            var convRenta = JSON.parse(jsonRenta);
            $scope.rentaTerm = convRenta.receitaCraftEstimada.valor.toFixed(2);
            $scope.avisoRentabilidade = convRenta.receitaCraftEstimada.comentario;

            parent.parent.alertify.success("Sucesso Rentabilidade.");
            

            //return convRenta.receitaCraftEstimada.valor.toFixed(2);
            //$scope.fConversorMoedaUSD();
            $scope.fAuxCalculoMoeda();
        }, function error(response) {
            parent.parent.alertify.error('Erro na Rentabilidade.');
            //$scope.fConversorMoedaUSD();
            $scope.fAuxCalculoMoeda();
        });  
    }

    $scope.fsaveTabelaTerminal = function() {
        debugger;
        var jsonPropMargem = {
            "cdTabela": 0,
            "ckGrupoEmpresaColoader": 0,
            "ckGrupoEmpresaImportador": 1,
            "ckGrupoEmpresaIndicador": 0,
            "txCnpjImportador": "01.831.941/0001-30",
            "txEmail": "cross@grupocraft.com",
            "vlTicketMinimo": 8000,
            "txCnpjColoader": null, 
        };

        jsonPropMargem = JSON.stringify(jsonPropMargem);

        $http({
            method: 'POST',
            url: 'https://connect-dev.craftmulti.com/pricing/deicmar/new-proposal',
            headers: { 'craft-apikey-dev': '256c85795db241b196d06a9a4dec43bf', 'Content-Type': 'application/json' },
            data: jsonPropMargem
        }).then(function success(response) {
            debugger;
            
            parent.parent.alertify.success(response.data.body.message);


        }, function error(response) {
            debugger;
            parent.parent.alertify.error('Erro na resposta do terminal!');
        }); 

    }

    $scope.fConversorMoeda = function() {
        debugger;
        
        var jsonPropMargem = {
            "currency": "EUR", // USD ou EUR
            "startDate": "11-17-2024", // MM-DD-YYY
            "endDate": "11-18-2024"
        };

        jsonPropMargem = JSON.stringify(jsonPropMargem);

        $http({
            method: 'POST',
            url: 'https://connect-dev.craftmulti.com/pricing/central-bank-quote/currency-period',
            headers: { 'craft-apikey-dev': '256c85795db241b196d06a9a4dec43bf', 'Content-Type': 'application/json' },
            data: jsonPropMargem
        }).then(function success(response) {
            debugger;
            
            if (response.data.success==false) {
                parent.parent.alertify.error(response.data.body.error);
            }
            else {            
                parent.parent.alertify.success("Sucesso Moeda.");
            }

        }, function error(response) {
            debugger;
            parent.parent.alertify.error('Erro no retorno da chamada!');
        }); 

    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}-${year}`;
    }

    $scope.fConversorMoedaUSD = function() {
        debugger;
        $scope.proposta.valorSeguroBRL = 0;
        $scope.conversorMoeda = {};
        $scope.conversorMoeda.info = '';
        
        const today = new Date();
        const dateInitFormatted = formatDate(today);

        const dateEnd = new Date();
        dateEnd.setDate(today.getDate() - 3);
        const dateEndFormatted = formatDate(dateEnd);

        var jsonPropMargem = {
            "startDate": dateEndFormatted, // MM-DD-YYY
            "endDate": dateInitFormatted
        };

        jsonPropMargem = JSON.stringify(jsonPropMargem);
        //verificar para prod
        $http({
            method: 'POST',
            //H
            url: 'https://connect-dev.craftmulti.com/pricing/central-bank-quote/usd-period',
            headers: { 'craft-apikey-dev': '256c85795db241b196d06a9a4dec43bf', 'Content-Type': 'application/json' },
            //P
            //url: 'https://connect.craftmulti.com/pricing/central-bank-quote/usd-period',
            //headers: { 'craft-apikey': '735039e4b8f84499ba3f3bc2f819c8fc', 'Content-Type': 'application/json' },

            data: jsonPropMargem
        }).then(function success(response) {
            debugger;
            var validConverse = response.data.body.value.length;
            var valorConverse = response.data.body.value;
            if (validConverse == 0 || validConverse == undefined) {
                //$scope.conversorMoeda.info = 'Não houve retorno da API.';
                $scope.conversorMoeda.valor = 2;
                $scope.conversorMoeda.date  = "Valor teste enquanto a API nao retorna valores!";
                
            }
            else {
                

                $scope.conversorMoeda.valor = valorConverse[validConverse-1].cotacaoCompra;
                $scope.conversorMoeda.date  = valorConverse[validConverse-1].dataHoraCotacao;
                
            }

            if (response.data.success==false) {
                parent.parent.alertify.error(response.data.body.error);
            }
            else {
                parent.parent.alertify.success("Sucesso USD.");
            }
            $scope.fTerminalVerify();

        }, function error(response) {
            debugger;
            $scope.conversorMoeda.info = 'Não houve retorno valido da API.';
            parent.parent.alertify.error('Erro no retorno da chamada!');
            $scope.fTerminalVerify();
        }); 

    }

    $scope.fAuxCalculoMoeda = function() {
        var coeficiente = $scope.conversorMoeda.valor;
        var valorTerminal = $scope.simulaTerm.valorTerminal;
        var valorRentabilidade = $scope.rentaTerm;
        var auxValueTerm;
        var auxValueRent;

        
        if (valorRentabilidade !== undefined){
            $scope.rentaConverse = (valorRentabilidade/coeficiente).toFixed(2);
            $scope.SaveLogRentabilidade();
        }
        if (valorTerminal !== undefined) $scope.termConverse = (valorTerminal/coeficiente).toFixed(2);
        
        
    }

    $scope.testePortal = function() {

        let params = {
            "sOrigem": 'AUADL',
            "sDestino": 'BRRIO',
            "sCliente": '06221176000150',
            "nVolumeTotal": 2,
            "nPesoTotal": 100,
            "sPass": 'Craft123@',
            "sUser": 'portal@portalcraft.com'
        }

        callWS.get('/WVDF_WS/ws_hcgs3006.wso/fPortalRoutes/JSON', params).then(function(response) {
            debugger;
        }); 

    }

    $scope.testePrimus = function() {
        debugger;
        let params = {

           "originCity": "ORLANDO",

           "originState": "FLORIDA",

           "originZipcode": "32819",//32819

           "originCountry": "USA",

           "destinationCity": "Doral",

           "destinationState": "Florida",

           "destinationZipcode": "33178 20",

           "destinationCountry": "USA",

           "UOM": "METRIC",

           "freightInfo": [

               {

                   "qty": 10,

                   "weight": 10,

                   "weightType": "each",

                   "length": 80,

                   "width": 200,

                   "height": 230,

                   "volume": 3.68,

                   "class": 300,

                   "UN": "CM",

                   "commodity": "string",

                   "dimType": "PLT",

                   "stack": true,

                   "stackAmount": 1,

                   "hazmat": true

               }

           ]

        };

        jsonPropMargem = JSON.stringify(params);
        
        $http({
            method: 'POST',
            url: 'https://connect-dev.craftmulti.com/pricing/primus/rates',
            headers: { 'craft-apikey-dev': '256c85795db241b196d06a9a4dec43bf', 'Content-Type': 'application/json' },
            data: jsonPropMargem
        }).then(function success(response) {
            debugger;
        }, function error(response) {
            debugger;
        }); 
    }

    $scope.ZipValidation = function() {

        debugger;
        var params = { 'sZip': $scope.proposta.cepOrigem, 'sPais': $scope.proposta.paisOrigem};
        callWS.get('/WVDF_WS/ws_HCGS3004.wso/fValidaZip/JSON', params).then(function(response) {
            debugger;
            if (response.data.id !== '') {
                $scope.proposta.paisPol = 'USA'
                $scope.proposta.pol = response.data;
            }
        });     


    }

    $scope.SaveLogRentabilidade = function() {

        var params = { 'sProposta': idProposta,'nValorCalculado': $scope.rentaConverse, 'nValorRent': $scope.rentaTerm, 'nValorConv': $scope.conversorMoeda.valor, 'sMoedaRent': 790, 'sMoedaConv': 220, 'sUsuarioSessao': aUsuarioSessao};
        callWS.get('/WVDF_WS/ws_HCGS3004.wso/pRentaLog/JSON', params).then(function(response) {
            debugger;
        });     

    }



    init();

});