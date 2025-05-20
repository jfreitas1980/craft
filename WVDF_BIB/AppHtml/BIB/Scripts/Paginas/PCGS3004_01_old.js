var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
var idVendedor = getVariavelURL('idVendedor');
var idCliente = getVariavelURL('idCliente');
var idProposta = getVariavelURL('idProposta');
var idClone = getVariavelURL('idClone');
var idProspect = getVariavelURL('Prospect');

if (idProposta == false) {idProposta=0;}
if (idProspect == false) {idProspect='';}

// ANGULAR JS
app = angular.module('propostaNovaApp', ['ngTagsInput', 'wsDominio', 'toaster', 'diretivas', 'ngMaterial', 'ui.bootstrap', 'ui.utils.masks', 'ngTable']);

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
                console.log('value', value);
                console.log('$setViewValue', ctrls[0].$setViewValue.$viewValue);
            });
        }
    };
});

app.filter('FilterArray', function() {
    // the filter takes an additional input filterIDs
    return function(inputArray, filterIDs) {
        // filter your original array to return only the objects that
        // have their ID in the filterIDs array
        if (angular.isUndefined(inputArray) || angular.isUndefined(filterIDs)) return;
        return inputArray.filter(function(entry) {
            return this.indexOf(entry.ID) !== -1;
        }, filterIDs); // filterIDs here is what "this" is referencing in the line above
    };
});

app.controller('comboCtrl', function($scope, buscaWS, callWS, $http) {

    var init = function() {

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
        getPackageType();
        $scope.hasTaxa = false;
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
        });
    }

    var getModalidades = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS202.wso/f_CCGS202_lista/JSON', 'sProduto=').then(function(data) {
            $scope.lsModalidades = data
        });
    }

    var getTpOperacao = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS200.wso/f_CCGS200_combo/JSON', '').then(function(data) {
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
        buscaWS.get('/WVDF_WS/ws_ccgs220.wso/f_combo_tpcalc/JSON', '').then(function(data) {
            $scope.lsCalculos = data;
        });
    }

    var getPackageType = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS228.wso/f_CCGS228_pkg_type/JSON', '').then(function(data) {
            $scope.lsPackages = data;
        });
    }
    // debugger;
    init();
});

app.controller('chatCtrl', function($scope, buscaWS, callWS, $http) {
    $scope.messages = [];

    var init = function() {
        // debugger;
        if (idProposta !== 0)
        {
            $scope.getMessages();
        }
    }

    $scope.getMessages = function() {
        var message = {};
        // message.msg = "teste";
        // message.elaborador = "Anderson";
        // message.data = "10/11/2017";
        // $scope.messages.push(message);
        // debugger;
        // debugger;
        if (idProposta == '' || idProposta == 0) {
           return;
        }
        message = 'aProp='+idProposta+'&aUsuarioSessao='+aUsuarioSessao;
        buscaWS.get('/WVDF_WS/ws_hsag558.wso/f_listacomments/JSON', message).then(function(data) {
            // debugger;
            $scope.messages = data;
        });
    }

    $scope.sendMsg = function(msg,stat) {
        $scope.loadingState=true;
        var params = {};
        // debugger;
        if (idProposta == '' || idProposta == 0) {
            idProposta = $scope.proposta.idProposta;
        }

        if (idProposta == '' || idProposta == 0) {
            // toaster.pop('error', "Error", 'Proposta Invalida!', null, 'trustedHtml');
            parent.parent.alertify.error('Proposta Invalida!');
            return;
        }

        params.aProp = idProposta;
        params.msg = msg;
        params.stats = stat;
        params.aUsuarioSessao = aUsuarioSessao;
        console.log(params);
        
        var param = { 'sJSON': params };

        callWS.get('/WVDF_WS/ws_hsag558.wso/f_savecomments/JSON', param).then(function(response) {
            $scope.getMessages();
            $scope.chat_msg = '';
            $scope.chat_stat = '';
            $scope.loadingState=false;
        });

    }

    $scope.history = [];

     $scope.openHistorico = function() {
        debugger;
        var params = {};
        params.aUsuarioSessao = aUsuarioSessao;
        params.aProp = idProposta;
        callWS.get('/WVDF_WS/ws_hsag558.wso/f_full_msgs/JSON', params).then(function(response) {
            // debugger;
            $scope.history = response.data;
        });
    }


    init();
});

app.controller('literalCtrl', function($scope, buscaWS, callWS, $http) {

    $scope.LITERAL_99 = "Modo de Pagamento";
    $scope.LITERAL_98 = "Moeda - Compra";
    $scope.LITERAL_97 = "Valor - Compra";
    $scope.LITERAL_96 = "Valor Min";
    $scope.LITERAL_95 = "Valor Max";
});

app.controller('produtosController', function($scope, $controller, buscaWS, callWS, $http, $q, toaster, $filter, NgTableParams) {
    $controller('comboCtrl', { $scope: $scope }); // controller de combobox
    $controller('chatCtrl', { $scope: $scope }); // controller de Mensagens
    // $scope.cctrl = $scope.$new();    
    // $controller('chatCtrl', { $scope: cctrl });

    $scope.proposta = {};
    $scope.proposta.idProposta = idProposta;
    // $scope.proposta.modalidades = {};
    $scope.proposta.vendedor = {};

    $scope.aListaNCM = '';

    $scope.entrada = {};
    $scope.tabledata = [];

    $scope.unitCmIn = [];
    $scope.unitCmIn.push({ 'ID': 'C', 'DS': 'CM' });
    $scope.unitCmIn.push({ 'ID': 'I', 'DS': 'Inches' });
    $scope.options = ['Aceitar', 'Negar', 'Contra-valor'];

    $scope.containerFCL = [];
    $scope.containerLCL = [];
    $scope.containerAIR = [];

    $scope.lsVia = [];

    $scope.permissao = '';

    $scope.negociarTaxa = [];

    $scope.lsItems = [];
    $scope.lsItems.LCL = [];
    $scope.lsItems.FCL = [];
    $scope.lsItems.AIR = [];

    $scope.parametros300401 = {};

    $scope.LITERAL_99 = "Modo de Pagamento";
    $scope.LITERAL_98 = "Moeda - Compra";
    $scope.LITERAL_97 = "Valor - Compra";
    $scope.LITERAL_96 = "Valor Min";
    $scope.LITERAL_95 = "Valor Max";

    $scope.btnCalc = false;
    $scope.showVia = false;

    $scope.proposta.caracteristicasFrete = [];

    //seta variaveis
    $scope.proposta.modalidades = '';
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
    $scope.proposta.anexo = 0;

    $scope.negociarValidade = {};
    $scope.negociarValidade.valid_ex = '';
    $scope.negociarValidade.concorrente = '';
    $scope.negociarValidade.option = '';

    $scope.analise = {};

    $scope.acordeonDestino = false;
    $scope.acordeonOrigem = false;
    $scope.acordeonFrete = false;
    $scope.acordeonComissao = false;

    var init = function() {
        getLiterais();
        getPermissao();

        getTaxas();
        // $scope.getTaxas_Comissao('');

        if (idProspect !== '') {
            debugger;
            idProspect = idProspect.replace('%20', ' ');
            $scope.proposta.dsCliente = idProspect;

        } else { getCliente(); }

        // debugger;
        if (idProposta) {
            loadProposta();
            $scope.attnum();
            refreshTabelas();
            $scope.Notify();

            if (idClone == 1) $('#tab1Link').trigger('click');
            else {
                // $scope.btnRefreshInfo();
                $('#tab2Link').trigger('click');
            }


        } else {
            // debugger;
            $scope.proposta.sMercadoria = "0000";
            $scope.proposta.caracteristicasFrete[0] = "4";
        }
    }

    //AUTOCOMPLETE CLIENTE
    $scope.loadClientes = function(query) {
        if (query.length > 2) {
            // debugger;
            var parametros = 'sInicio=' + query;
            var data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_proposta_complete_client/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    // debugger;
                    return data;
                });
            return data;
        }
    };

    $scope.changeModalidades = function(oModalidades) {
        $scope.entrada.modalidade = $scope.proposta.modalidades;
        $scope.proposta.modalidade = $scope.proposta.modalidades;
    };

    var getCliente = function() {
        // 
        if (getVariavelURL('idCliente')) {
            buscaWS.get('/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG340/JSON', 'sUSUARIOSESSAO=' + getVariavelURL('aUsuarioSessao') + '&sCodigo=' + getVariavelURL('idCliente')).then(function(data) {
                $scope.proposta.dsCliente = data.cDescricao;
            });
        }
    }

    var getLiterais = function() {
        buscaWS.get('/WVDF_WS/ws_csag309.wso/f_idiomas_literais/JSON', 'sPrograma=PCGS3004_01').then(function(data) {
            $scope.L = data;
        });
    }

    $scope.attnum = function () {
        // debugger;
        params = 'sTabela=HCGS3004&idProposta='+$scope.proposta.idProposta;
         buscaWS.get('/WVDF_WS/ws_log3040.wso/fCountLog3040/JSON', params).then(function(data) {
            $scope.proposta.anexo = data;
        });

    }

    $scope.gridComissao_addTaxa = function()
    {
       var obj ={};
       obj.DS_T = 'CUSTOMER COMISSION';
       obj.ID_T = 45;
        obj.valor  = 0;
        obj.moeda = '';
        obj.valormin = 0;
        obj.valormax = 0;
        obj.modPgto = '';
        obj.tp_calc = '';
        obj.note = '';
        obj.equipamento='';
        obj.editable = true;
        $scope.gridComissao.push(obj);
        $scope.desc_grid=true;
    }

    $scope.gridComissao_lista = function()
    {
        params = 'aProp='+$scope.proposta.idProposta;
        buscaWS.get('/WVDF_WS/ws_hcgs3007.wso/f_lista_comissao/JSON', params).then(function(data) {
            // debugger;
            $scope.gridComissao = data;
            if ($scope.gridComissao.length !== 0) {$scope.acordeonComissao = true;}
        });
    }

    $scope.fBtnDelComissao = function(recnum) {

        params = 'sRecnum='+recnum;
        buscaWS.get('/WVDF_WS/ws_hcgs3007.wso/f_del_comissao/JSON', params).then(function(data) {
            $scope.gridComissao_lista();
        });

    }

    var loadProposta = function() {
        // 
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_busca_proposta/JSON', 'aPROPOSTA_ID=' + $scope.proposta.idProposta).then(function(data) {
            // debugger;
            $scope.proposta.dsCliente = data.sCSAG320_FANTASIA;
            
            $scope.proposta.cliente_documento = data.sCSAG320_DOCUMENTO;
            $scope.AnaliseCliente();

            $scope.proposta.sAcordo = data.sAcordo;
            $scope.proposta.impressaoProposta = data.impressaoProposta;
            $scope.proposta.emailProposta = data.emailProposta;
            $scope.proposta.modalidades = {};
            $scope.proposta.dataProposta = data.dataProposta;
            $scope.proposta.marca = data.sCSAG308_ID;
            $scope.proposta.operacao = data.sCCGS200_ID;

            $scope.retorno_id = data.retorno_id;
            $scope.retorno_ds = data.retorno_ds;

            if (data.negociation_id == '1')
                $scope.proposta.negociation_id = true;

            $scope.proposta.produtos = data.sCCGS210_ID.split(',');
            $scope.proposta.modalidades = data.sCCGS202_ID; //
            $scope.proposta.idAgente_D = data.sCSAG345_AGENTE_D;
            $scope.proposta.idAgente_O = data.sCSAG345_AGENTE_O;

            $scope.proposta.incoterm = data.sCCGS223_ID;
            $scope.proposta.embarque = data.sCCGS204_ID;
            $scope.proposta.modPgto = data.sCCGS206_ID;
            // debugger;
            $scope.proposta.caracteristicasFrete = data.sCCGS203_ID.split(',');
            $scope.labelCaracteristicas();
            $scope.proposta.paisPol = data.paisPol;
            $scope.proposta.paisPod = data.paisPod;

            $scope.proposta.criadoEm = data.criadoEm;
            $scope.proposta.criadoPor = data.criadoPor;
            $scope.proposta.alteradoEm = data.alteradoEm;
            $scope.proposta.alteradoPor = data.alteradoPor;

            $scope.proposta.pol = data.arr_POL;
            $scope.proposta.pod = data.arr_POD;
            $scope.proposta.carrier = data.arr_CARRIERS.id;
            $scope.proposta.containers = data.sCONTAINERS.split(',');
            $scope.proposta.sMercadoria = data.sMercadoria;

            $scope.negociarValidade.concorrente_nm = data.sConcorrente;

            // var tempClienteFinal = { "idCliente": data.sClienteFinal.idCliente, "Razao": data.sClienteFinal.Razao };
            // $scope.proposta.sClienteFinal = tempClienteFinal;
            $scope.proposta.sClienteFinal = data.sClienteFinal.Razao;

            $scope.proposta.sCommons = data.sCommons;
            $scope.proposta.sCust_Ref = data.sCust_Ref;
            $scope.proposta.sInt_Ref = data.sInt_Ref;
            $scope.proposta.sCust_Inst = data.sCust_Inst;

            $scope.proposta.idAgente = data.sCSAG345_AGENTE_D;

            $scope.proposta.sStatus = data.sStatus;
            if (data.sStatus == '9') {
                $scope.proposta.motivoCancelamento = data.sCANCELADA_MOTIVO;
                $('#propc').show();
            }

            $scope.proposta.VIA_DESC = data.sVia_DS;            

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

            $scope.proposta.carrier_hide = (data.carrier_hide == "1" ? true : false);
            // debugger;
            $scope.getVia();
            $scope.proposta.VIA = data.sVIA;

            $scope.btnRefreshInfo();
            parent.parent.alertify.log("Proposta Carregada!"); //teste

        });
    }

    $scope.fRetorno_Check = function () {

        // debugger;
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fRetornoMsg/JSON', 'aProp=' + $scope.proposta.idProposta).then(function(data) {
            // debugger;
            // $scope.retorno_id = data.ID;
            $scope.retorno_ds = data.DS;

        });     
    }

    $scope.AnaliseCliente = function() {
        // debugger;
        var ws = 'http://192.168.6.19:8090/targetanalyzerws/resources/status/cliente/' + $scope.proposta.cliente_documento;
        callWS.get(ws, '').then(function(response) {
            // debugger;
            $scope.analise = response.data;
        });

    }

    $scope.labelCaracteristicas = function() {
        // $scope.proposta.labelCF = '';

        // var label = '';
        // var modelo = $scope.proposta.caracteristicasFrete;
        // // 
        // for(var i = 0; i< modelo.length; i++) {
        //     label.push() = $filter('filter')($scope.lsFretes, modelo[i])[i]; 
        // }
        // $scope.proposta.labelCF = label.DS;
    };

    $scope.loadCarriers = function(query) {
        return buscaWS.get('/WVDF_WS/WS_csag320.wso/f_bCSAG342_armador/JSON', 'sInicial=' + query + "&sSessionId=" + aUsuarioSessao).then(function(data) {
            return data;
        });
    };

    function zerarEntrada() {
        $scope.entrada.recnum = "";
        $scope.entrada.pcs = 1;

        // Package Type
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
                $scope.containerFCL.push(data[i]);

                buscaWS.get('/WVDF_WS/ws_CCGS217.wso/f_CCGS217_lista/JSON', '').then(function(data) {
                    $scope.lsContainer = data;
                });

            } else if (data[i].modalidade == 'LCL') {
                $scope.containerLCL.push(data[i]);

            } else if (data[i].modalidade = 'AIR') {
                $scope.containerAIR.push(data[i]);
            }
        }

        if ($scope.containerFCL.length > 0) {
            $scope.btnCalc = true;
        }

        if ($scope.containerLCL.length > 0) {
            if ($scope.containerLCL[0].total.weight > 0 && $scope.containerLCL[0].total.volume)
                $scope.btnCalc = true;
            else
                $scope.btnCalc = false;
        }

        if ($scope.containerAIR.length > 0)
            if ($scope.containerAIR[0].total.weight > 0 && $scope.containerAIR[0].total.volume)
                $scope.btnCalc = true;
            else
                $scope.btnCalc = false;
    }

    $scope.lockNewFCL = false;
    $scope.lockNewLCL = false;
    $scope.lockNewAIR = false;
    $scope.lockNewOrigem = false;
    $scope.lockNewFrete = false;
    $scope.lockNewDestino = false;

    // $scope.addContainerFCL = function() {
    //     $scope.containerFCL.unshift(createNullContainer());

    // }

    // $scope.addContainerLCL = function() {
    //     $scope.containerLCL.unshift(createNullContainer());
    // }

    // $scope.addContainerAIR = function() {
    //     $scope.containerAIR.unshift(createNullContainer());
    // }

    $scope.btnTableSaveRow = function(row, modalidade) {
        // 
        if (modalidade == "FCL" && row.equipamento == '') {
            // toaster.pop('error', "Error", 'Quantidade Invalida!', null, 'trustedHtml');
            parent.parent.alertify.error('Quantidade Invalida!');
            return;
        }

        // if (row.equipamento >= 0) {
        //     toaster.pop('error', "Error", 'Selecione um equipamento', null, 'trustedHtml');
        //     return;
        // }

        row.modalidade = modalidade;
        $scope.btnAddItem2(row);
        refreshTabelas();
        row.editable = false;

        if ($scope.containerFCL.length > 0) {
            $scope.btnCalc = true;
        }

        if ($scope.containerLCL.length > 0)
            if ($scope.containerLCL[0].total.weight > 0 && $scope.containerLCL[0].total.volume)
                $scope.btnCalc = true;
            else
                $scope.btnCalc = false;

        if ($scope.containerAIR.length > 0)
            if ($scope.containerAIR[0].total.aTotalWeight > 0 && $scope.containerAIR[0].total.volume)
                $scope.btnCalc = true;
            else
                $scope.btnCalc = false;

        if (modalidade == "FCL") {
            $scope.lockNewFCL = false;
        } else if (modalidade == "LCL") {
            $scope.lockNewLCL = false;
        } else if (modalidade == "AIR") {
            $scope.lockNewAIR = false;
        }
    }

    $scope.btnAddItem2 = function(entrada) {
        $scope.loadingState = true;
        // 
        // Comandos do banco

        if (entrada.total.weight == 0 || entrada.total.weight == '') {
            $scope.loadingState = false;
            // toaster.pop('error', "Erro", 'Peso Invalido', null, 'trustedHtml');
            parent.parent.alertify.error('Peso Invalido!');
            return;
        }
        if ($scope.proposta.modalidades == 'LCL' && (entrada.total.volume == 0 || entrada.total.volume == '')) {
            $scope.loadingState = false;
            // toaster.pop('error', "Erro", 'Volume Invalido', null, 'trustedHtml');
            parent.parent.alertify.error('Volume Invalido!');
            return;
        }

        if (entrada.pcs == 0 || entrada.pcs == '') {
            $scope.loadingState = false;
            // toaster.pop('error', "Erro", 'PCS/ Quantidade Invalido', null, 'trustedHtml');
            parent.parent.alertify.error('PCS/ Quantidade Invalido!');
            return;
        }

        // if (entrada.unitweight !== 'KG' && entrada.unitweight !== 'LB' ) {
        //     $scope.loadingState = false;
        //     toaster.pop('error', "Erro", 'Unidade de Medida Invalida!', null, 'trustedHtml');return;
        // }

        // if (entrada.UOM !== 'CBM' && entrada.UOM !== 'CFT') {
        //     $scope.loadingState = false;
        //     toaster.pop('error', "Erro", 'Unidade de Medida Invalida!', null, 'trustedHtml');return;
        // }

        if (entrada.total.grossUnit !== 'KG' && entrada.total.grossUnit !== 'LB') {
            $scope.loadingState = false;
            // toaster.pop('error', "Erro", 'Unidade de Medida Invalida!', null, 'trustedHtml');
            parent.parent.alertify.error('Unidade de Medida Invalida!');
            return;
        }

        if ($scope.proposta.modalidades == 'LCL' && (entrada.total.volumeUnit !== 'CBM' && entrada.total.volumeUnit !== 'CFT')) {
            $scope.loadingState = false;
            // toaster.pop('error', "Erro", 'Unidade de Medida Invalida!', null, 'trustedHtml');
            parent.parent.alertify.error('Unidade de Medida Invalida!');
            return;
        }

        var parametros = {};
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        parametros.aPROP = $scope.proposta.idProposta;
        parametros.aRecnum = entrada.aRecnum;
        parametros.aMod_Frt = entrada.modalidade;
        parametros.aPcs = entrada.pcs;
        parametros.aPack_Tp = entrada.package;
        parametros.aWght = entrada.weight;
        parametros.aWght_tp = entrada.unitweight;
        parametros.aLght = entrada.length;
        parametros.aWdth = entrada.width;
        parametros.aHght = entrada.height;
        parametros.aUOM = entrada.UOM;

        // Temperatura Controlada
        parametros.aTemp = ($scope.proposta.caracteristicasFrete.indexOf('11') != -1) ? "0" : "1";

        // Residential
        parametros.aL_Gate = ($scope.proposta.caracteristicasFrete.indexOf('15') != -1) ? "0" : "1";

        // Residential
        parametros.aResid = ($scope.proposta.caracteristicasFrete.indexOf('16') != -1) ? "0" : "1";

        // Limited Access
        parametros.aLim_Acc = ($scope.proposta.caracteristicasFrete.indexOf('13') != -1) ? "0" : "1";

        // Personnal Effects
        parametros.aPnnal_Eff = ($scope.proposta.caracteristicasFrete.indexOf('17') != -1) ? "0" : "1";

        // Any Piece Over 10' in Length
        parametros.aAny_Pi = ($scope.proposta.caracteristicasFrete.indexOf('6') != -1) ? "0" : "1";

        // Hazardous
        parametros.aHaz = ($scope.proposta.caracteristicasFrete.indexOf('14') != -1) ? "0" : "1";

        parametros.aHaz_Cl = '';
        parametros.aHaz_Un = '';
        parametros.aHaz_Fl = '';
        parametros.aHaz_Temp = '';
        parametros.aHaz_PGr = '';
        // Equipamento
        parametros.aEQUIP = entrada.equipamento;

        parametros.aOversize = '';
        // Total
        parametros.aTotalWeight = entrada.total.weight;
        parametros.aTotalVolume = entrada.total.volume;
        parametros.aTotalVolumeU = entrada.unitvolume;

        parametros.aHaz_Fl = entrada.aHaz_Fl;
        parametros.aHaz_Temp = entrada.aHaz_Temp;

        parametros.aHaz_Cl = entrada.aHaz_Cl;
        parametros.aHaz_Un = entrada.aHaz_Un;
        parametros.aHaz_PGr = entrada.aHaz_PGr;
        parametros.grossUnit = entrada.total.grossUnit;
        parametros.volumeUnit = entrada.total.volumeUnit;
        var param = { 'sJSON': parametros };

        $http({
            url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_save/JSON',
            method: 'GET',
            params: param
        }).success(function(data) {
            // 
            $scope.loadingState = false;
            $scope.Notify();
            $scope.loadTotals();
            refreshTabelas();
            $scope.btnRefreshInfo();

            if (data.defaultMessage.msgInfo !== '') {
                $scope.proposta.sStatus = '4';
                // toaster.pop('Warning', "Aviso", data.defaultMessage.msgInfo, null, 'trustedHtml');
                parent.parent.alertify.log(data.defaultMessage.msgInfo);
                return;
            } else {
                $scope.proposta.sStatus = '1';
                // toaster.pop('success', "Sucesso", 'Detalhe Salvo!', null, 'trustedHtml');
                parent.parent.alertify.success('Detalhe Salvo!');
                return;
            }

        });
    };

    $scope.btnDeleteItem = function(item) {
        $scope.loadingState = true;

        buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'sRECNUM=' + item.recnum).then(function(data) {
            $scope.entrada.recnum = "";
            var index = $scope.lsItems[item.modalidade].indexOf(item);
            $scope.lsItems[item.modalidade].splice(index, 1);
            $scope.loadingState = false;


            // toaster.pop('success', "Sucesso", 'Detalhe Deletado!', null, 'trustedHtml');
            parent.parent.alertify.success('Detalhe Deletado!');
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
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_HCGS3004_Status/JSON','aProp='+$scope.proposta.idProposta).then(function(data) {
            // debugger;
            
            if (data == 3) {
                parent.parent.alertify.error('Proposta em Aguardo!');
                return;
            }
            if (data == 4) {
                parent.parent.alertify.error('Proposta em Analise!');
                return;
            }
            if (data == 10) {
                parent.parent.alertify.error('Proposta com Falta de Informacoes!');
                return;
            }
            if (data == 11 || data == 12) {
                parent.parent.alertify.error('Proposta em Verificacao!');
                return;
            }

            if (data == 5) {
                parent.parent.alertify.error('Proposta Expirada!');
                return;
            }
            
            var url = "PCGS3004_04.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + $scope.proposta.idProposta;
            window.open(url, 'propostadefrete', 'width=250px');
            
        });
    };

    $scope.acClientes = function(texto) {
        return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/f_proposta_complete_client/JSON', 'sInicio=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.acCarrier = function(texto) {
        return $scope.proposta.carrier;
    }

    // $scope.loadCidades = function(query) {
    //     var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&idTrade=&idPais=&sCidade=' + query)
    //         .then(function(data) {
    //             return data;
    //         });
    //     return data;
    // };

    $scope.loadCidadesByPaisOrig = function(query, paisID) {
        if (paisID == undefined)
            paisID = '';
        if (query.length > 3) {
            // 
            var parametros = 'sPais=' + paisID + '&sCidade=' + query + '&sMod=' + $scope.proposta.modalidades + '&sCliente=' + idCliente;
            var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/propostaCidadeOrigem/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    return data;
                });
            return data;


            // var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', 'idPais=' + paisID + '&sCidade=' + query)
            //     .then(function(data) {
            //         // console.log(data);
            //         return data;
            //     });
            // return data;

        }
    };

    $scope.loadCidadesByPaisDest = function(query, paisID) {
        if (paisID == undefined)
            paisID = '';
        if (query.length > 3) {
            // 
            var parametros = 'sPais=' + paisID + '&sCidade=' + query + '&sMod=' + $scope.proposta.modalidades + '&sCliente=' + idCliente + '&sPol=' + $scope.proposta.pol.id;
            var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/propostaCidadeDestino/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    return data;
                });
            return data;

        }
    };


    $scope.loadClientesTag = function(query) {
        var parametros = 'sInicio=' + query;
        var data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_fup_concorrente/JSON', parametros)
            .then(function(data) {
                 console.log(data);
                return data;
            });
        return data;
    };


    $scope.loadTotals = function() {
        var parametros = 'aProp=' + $scope.proposta.idProposta;
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_kg_cbm/JSON', parametros)
            .then(function(data) {

                $scope.proposta.ttcbm = data.id;
                $scope.proposta.ttgw = data.value;

            });
    }

    $scope.ValuesChange = function(row) {
        // debugger;
        row.weight = String(row.weight).replace(',','.');
        row.total.weight = String(row.total.weight).replace(',', '.');
        // var calc = 2.20462;
        // if (row.total.grossUnit == "KG") {
        //     row.total.weight = parseFloat(row.total.weight) / calc;
        // } else if (row.total.grossUnit == "LB") {
        //     row.total.weight = (parseFloat(row.total.weight) * calc);
        // }
    }

    $scope.count = function(row) {

        row.weight = String(row.weight).replace(',', '.');

        if (row.unitweight == '' || row.total.volumeUnit == '')
            return;

        if (row.weight !== '' && row.weight !== 0) {
            if (row.unitweight == "KG") {
                row.total.weight = row.pcs * parseFloat(row.weight);
            } else if (row.unitweight == "LB") {
                var calc = 2.20462;
                row.total.weight = row.pcs * parseFloat(row.weight) * calc;
            }
        }
    }

    $scope.applyCalcVolume = function(row) {
        // debugger;
        row.height = String(row.height).replace(',', '.');
        row.length = String(row.length).replace(',', '.');
        row.width = String(row.width).replace(',', '.');
        // row.total.volume = row.total.volume.replace(',','.');

        if (row.UOM == '' || row.total.volumeUnit == '')
            return;
        // debugger;

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
    }

    var arredonda = function(numero, casasDecimais) {
        // debugger;
        casasDecimais = typeof casasDecimais !== 'undefined' ? casasDecimais : 2;
        return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
    };

    var calcCBM = function(L, W, H, qtde) {
        // debugger;
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
        // debugger;
        if (row.total.volumeUnit == "CBM") {
            row.total.volume = arredonda(row.total.volume * 0.0283, 4);
        } else if (row.total.volumeUnit == "CFT") {
            row.total.volume = arredonda(row.total.volume * 35.3147, 4);
        }
    }

    $scope.cloneContainerFCL = function(index) {
        // 
        var nobj = JSON.parse(JSON.stringify($scope.containerFCL[index]));
        nobj.editable = true;
        nobj.aRecnum = '';
        $scope.containerFCL.unshift(nobj);
    }
    $scope.cloneContainerLCL = function(index) {
        // 
        var nobj = JSON.parse(JSON.stringify($scope.containerLCL[index]));
        nobj.editable = true;
        nobj.aRecnum = '';
        $scope.containerLCL.unshift(nobj);
    }

    $scope.cloneContainerAIR = function(index) {
        // 
        var nobj = JSON.parse(JSON.stringify($scope.containerAIR[index]));
        nobj.editable = true;
        nobj.aRecnum = '';
        $scope.containerAIR.unshift(nobj);
    }

    $scope.excluirRowFCL = function(index) {
        var cnt = $scope.containerFCL[index];

        if (cnt.aRecnum == '') {
            $scope.containerFCL.splice(index, 1);
        } else {
            buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'aRecnum=' + cnt.aRecnum).then(function(data) {

                if (data.defaultMessage.hasError) {
                    // toaster.pop('error', "Error", data.defaultMessage.msgError, null, 'trustedHtml');
                    parent.parent.alertify.error(data.defaultMessage.msgError);
                } else {
                    // toaster.pop('success', "Success", (data.defaultMessage.msgInfo), null, 'trustedHtml');
                    parent.parent.alertify.success(data.defaultMessage.msgInfo);
                }

                refreshTabelas();
                $scope.Notify();
                $scope.loadTotals();
            });
        }

    }

    $scope.excluirRowLCL = function(index) {
        var cnt = $scope.containerLCL[index];
        if (cnt.aRecnum == '') {
            $scope.containerLCL.splice(index, 1);
        } else {
            buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'aRecnum=' + cnt.aRecnum).then(function(data) {
                if (data.defaultMessage.hasError) {
                    // toaster.pop('error', "Error", data.defaultMessage.msgError, null, 'trustedHtml');
                    parent.parent.alertify.error(data.defaultMessage.msgError);
                } else {
                    // toaster.pop('success', "Success", (data.defaultMessage.msgInfo), null, 'trustedHtml');
                    parent.parent.alertify.success(data.defaultMessage.msgInfo);
                }


                refreshTabelas();
            });
        }
    }

    $scope.excluirRowAIR = function(index) {
        var cnt = $scope.containerAIR[index];
        if (cnt.aRecnum == '') {
            $scope.containerAIR.splice(index, 1);
        } else {
            buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'aRecnum=' + cnt.aRecnum).then(function(data) {

                if (data.defaultMessage.hasError) {
                    // toaster.pop('error', "Error", data.defaultMessage.msgError, null, 'trustedHtml');
                    parent.parent.alertify.error(data.defaultMessage.msgError);
                } else {
                    // toaster.pop('success', "Success", (data.defaultMessage.msgInfo), null, 'trustedHtml');
                    parent.parent.alertify.success(data.defaultMessage.msgInfo);
                }
                refreshTabelas();
            });
        }

    }



    var createNullContainer = function() {
        var ncontainer = {};
        ncontainer.recnum = '';
        ncontainer.modalidade = '';
        ncontainer.pcs = 1;
        ncontainer.package = '';
        ncontainer.weight = '';
        ncontainer.unitweight = '';
        ncontainer.length = '';
        ncontainer.width = '';
        ncontainer.equipamento = '';
        ncontainer.height = '';
        ncontainer.UOM = '';
        ncontainer.total = {};
        ncontainer.total.weight = '';
        ncontainer.total.grossUnit = '';
        ncontainer.total.volume = '';
        ncontainer.total.unitvolume = ''
        ncontainer.volume = '';
        ncontainer.unitvolume = '';
        ncontainer.total.volumeUnit = 'CBM';
        ncontainer.editable = true;
        ncontainer.aHaz_Fl = '';
        ncontainer.aHaz_Temp = '';
        return ncontainer;
    }

    var refreshTabelas = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_lista/JSON', 'aProposta=' + $scope.proposta.idProposta).then(function(data) {

            $scope.containerFCL = [];
            $scope.containerLCL = [];
            $scope.containerAIR = [];

            posicionaTabelas(data);
            data.forEach(function(oItem) {
                oItem.recnum = oItem.srecum;
                delete oItem.srecum;
                oItem.check = oItem.arr_ck;
                delete oItem.arr_ck;
                oItem.haz = oItem.arr_hz;
                delete oItem.arr_hz;
                oItem.haz.class = oItem.haz.sclass;
                delete oItem.haz.sclass;
                $scope.lsItems[oItem.modalidade].push(angular.copy(oItem));
            });
        });

    }

    $scope.addContainerFCL = function() {
        $scope.containerFCL.unshift(createNullContainer());
        $scope.lockNewFCL = true;
    }

    $scope.addContainerLCL = function() {
        // debugger;
        $scope.containerLCL.unshift(createNullContainer());
        $scope.containerLCL[0].unitweight = 'KG';
        $scope.containerLCL[0].UOM = 'CM';
        $scope.containerLCL[0].total.grossUnit = 'KG';
        $scope.containerLCL[0].total.volumeUnit = 'CBM';
        $scope.lockNewLCL = true;
    }

    $scope.addContainerAIR = function() {
        $scope.containerAIR.unshift(createNullContainer());
        $scope.lockNewAIR = true;
    }

    // $scope.btnTableSaveRow = function(row, modalidade) {
    //     if (modalidade == "FCL" && row.equipamento == '') {
    //         toaster.pop('error', "Error", 'Selecione um equipamento', null, 'trustedHtml');
    //         return;
    //     }
    //     row.modalidade = modalidade;
    //     $scope.btnAddItem2(row);
    //     refreshTabelas();
    //     row.editable = false;
    // }

    $scope.fnChangeDate = function() {

        parametros = 'dValidade=' + $scope.proposta.validadeDe;
        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_validade/JSON', parametros).then(function(data) {

            $scope.proposta.validadeAte = data;
        });

    }

    $scope.btnSalvar = function(oProposta) {

        /*if (oProposta.marca === '') {

            toaster.pop('error', "Error", 'Selecione uma Marca', null, 'trustedHtml');
            return;
        }*/

        // if (oProposta.validadeDe === '') {

        //     toaster.pop('error', "Error", 'Validade Invalida', null, 'trustedHtml');
        //     return;
        // }


        //Marca
        if (oProposta.marca == '' || oProposta.marca == undefined) {

            // toaster.pop('error', "Error", 'Proposta sem MARCA!', null, 'trustedHtml');
            parent.parent.alertify.error('Proposta sem MARCA!');
            return;
        }
        //TIPO OPERACAO
        if (oProposta.operacao == '' || oProposta.operacao == undefined) {

            // toaster.pop('error', "Error", 'Proposta sem OPERACAO!', null, 'trustedHtml');
            parent.parent.alertify.error('Proposta sem OPERACAO!');
            return;
        }

        //MODALIDADE
        if (oProposta.modalidades == '' || oProposta.modalidades == undefined) {

            // toaster.pop('error', "Error", 'Proposta sem MODALIDADE DO FRETE!', null, 'trustedHtml');
            parent.parent.alertify.error('Proposta sem MODALIDADE DO FRETE!');
            return;
        }

        //INCOTERM
        if (oProposta.incoterm == '' || oProposta.incoterm == undefined) {

            // toaster.pop('error', "Error", 'Proposta sem INCOTERM!', null, 'trustedHtml');
            parent.parent.alertify.error('Proposta sem INCOTERM!');
            return;
        }
        //EMBARQUE
        if (oProposta.embarque == '' || oProposta.embarque == undefined) {

            // toaster.pop('error', "Error", 'Proposta sem EMBARQUE!', null, 'trustedHtml');
            parent.parent.alertify.error('Proposta sem EMBARQUE!');
            return;
        } else {
            //DOOR-DOOR
            if (oProposta.embarque === '4') {
                if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisDestino == '' ||
                    oProposta.cidadeDestino == '' || oProposta.cepOrigem == '' || oProposta.cepDestino == '') {
                    // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    return;
                }
            }
            //DOOR-PORT
            if (oProposta.embarque === '3') {
                if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisPod == '' ||
                    oProposta.pod == '' || oProposta.cepOrigem == '') {
                    // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    return;
                }
            }
            //PORT-PORT
            if (oProposta.embarque === '1') {
                if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisPod == '' || oProposta.pod == '') {
                    // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    return;
                }
            }
            //PORT-DOOR
            if (oProposta.embarque === '2') {
                if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisDestino == '' ||
                    oProposta.cidadeDestino == '' || oProposta.cepDestino == '') {
                    // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    return;
                }
            }
        }
        // debugger;
        if (oProposta.pod != '' && oProposta.pol != '' && $scope.lsVia.length > 1) {
            if (oProposta.VIA == '') {
                // toaster.pop('error', "Error", 'Selecione um VIA!', null, 'trustedHtml');
                parent.parent.alertify.error('Selecione um VIA!');
                return;
            }
        }
        // 
        $scope.loadingState = true;
        var aux = angular.copy(oProposta);

        aux.sMercadoria = oProposta.sMercadoria;

        if (oProposta.carrier !== '' && oProposta.carrier !== undefined) { aux.carrier = oProposta.carrier.id; } else { aux.carrier = ''; }
        // 
        aux.sStatus = oProposta.sStatus;

        //--- Comentarios.
        aux.sCommons = oProposta.sCommons;
        aux.sCust_Ref = oProposta.sCust_Ref;
        aux.sInt_Ref = oProposta.sInt_Ref;
        aux.sCust_Inst = oProposta.sCust_Inst;

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
        // debugger;
        aux.via = oProposta.VIA;
        // if (oProposta.VIA_aux == undefined) {aux.via = '';}
        aux.caracteristicasFrete = "";

        //--- CARACTERISTICAS DE FRETE
        // $scope.proposta.labelCF = '';
        // for (var i = oProposta.caracteristicasFrete.length - 1; i >= 0; i--) {
        //     if (aux.caracteristicasFrete == '') {aux.caracteristicasFrete = modulo.ID;}
        //     else {aux.caracteristicasFrete += modulo.ID;}
        // }

        if (!angular.isUndefined(oProposta.caracteristicasFrete)) {
            oProposta.caracteristicasFrete.forEach(function(item) {
                aux.caracteristicasFrete += item + ",";
            });

            aux.caracteristicasFrete = aux.caracteristicasFrete.substring(0, aux.caracteristicasFrete.length - 1);

        }

        // aux.containers = "N.S.A.";
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

        // if (getVariavelURL('idVendedor'))
        //     aux.vendedor = parseInt(getVariavelURL('idVendedor'));

        // if ($scope.showVendedorCombo) {
        //     aux.vendedor = $scope.proposta.vendedor.ID;
        // }

        aux.cliente = getVariavelURL('idCliente');
        aux.validadeDe = aux.validadeDe;
        aux.validadeAte = aux.validadeAte;

        if ((aux.incoterm == 'EXW' || aux.incoterm == 'FCA' || aux.incoterm == 'DAP' || aux.incoterm == 'DDP') && aux.paisDestino == "" && aux.paidPod) {
            return parent.parent.alertify.error("Selecione um pais de destino");
        }

        aux.aOversize = "";

        $scope.hideAbaixo = false;
        aux.motivoCancelamento = $scope.proposta.motivoCancelamento;
        // 
        if (idProposta == 0) {aux.idProposta = '';}
        else {aux.idProposta = idProposta;}
        
        // idProposta = $scope.proposta.idProposta;
        // if (idProposta != false)
        //     aux.idProposta = idProposta;
        // else
        //     aux.idProposta = '';

        //   aux.modalidades = aux.modalidades[0];
        $scope.parametros300401 = aux;

        var params = { 'sJSON': aux }

        callWS.get('/WVDF_WS/ws_hcgs3004.wso/fGravarHCGS3004/JSON', params)
            .then(function(response) {
                $scope.showVendedorCombo = false;

                if (!response.data.defaultMessage.hasError) {
                    if ($scope.proposta.vendedor.DS == undefined) {} else {
                        $scope.proposta.vendedor = $scope.proposta.vendedor.DS;
                    }
                    // debugger;
                    $scope.proposta.idProposta = response.data.idProposta;
                    if (idProposta==0) {idProposta = response.data.idProposta;}
                    $scope.Notify();
                    // if ($scope.ListaMsgs.red.length == 0) 
                    //     {toaster.pop('Warning', "Aviso", 'Informacoes faltantes, proposta enviada ao Pricing!', null, 'trustedHtml');}
                    // else {}

                    // toaster.pop('success', "Success", (response.data.defaultMessage.msgInfo), null, 'trustedHtml');
                    parent.parent.alertify.success(response.data.defaultMessage.msgInfo);
                    
                    // debugger;
                    $scope.getMessages();
                    loadProposta();

                    // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_busca_proposta/JSON', 'aPROPOSTA_ID=' + $scope.proposta.idProposta).then(function(data) {

                    //     $scope.proposta.criadoPor   = data.criadoPor;
                    //     $scope.proposta.criadoEm    = data.criadoEm;
                    //     $scope.proposta.alteradoPor = data.alteradoPor;
                    //     $scope.proposta.alteradoEm  = data.alteradoEm;

                    //     $scope.proposta.validadeDe = data.sDTVAL_INICIO;
                    //     $scope.proposta.validadeAte = data.sDTVAL_TERMINO;

                    //     $scope.proposta.idAgente    = data.sCSAG345_AGENTE_D;
                    //     $scope.proposta.ttcbm       = data.TTCBM;
                    //     $scope.proposta.ttgw        = data.TTGW;

                    //     $scope.proposta.sStatus     = data.sStatus;
                    //     if (data.sStatus == '9') {
                    //         $scope.proposta.motivoCancelamento = data.sCANCELADA_MOTIVO;
                    //         $('#propc').show();
                    //     }

                    //     console.log(data);
                    //     // refreshTabelas();
                    //     refreshTabelas();
                    //     $scope.btnRefreshInfo();
                    // });

                } else {
                    // toaster.pop('error', "Error", (response.data.defaultMessage.msgError), null, 'trustedHtml');
                    parent.parent.alertify.error(response.data.defaultMessage.msgError);
                }

                // $scope.btnAplicarCalculo();

                $scope.loadingState = false;
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

    $scope.setNgTables = function() {
        for (var i = 0; i < $scope.lsAplicar.length; i++) {
            $scope.tabledata[i] = {};
            $scope.tabledata[i].tableParamsOrigem = $filter('filter')($scope.lsAplicar[i].arr_ptx, { 'aClass': 'O' });
            $scope.tabledata[i].tableParamsFrete = $filter('filter')($scope.lsAplicar[i].arr_ptx, { 'aClass': 'F' });
            $scope.tabledata[i].tableParamsDestino = $filter('filter')($scope.lsAplicar[i].arr_ptx, { 'aClass': 'D' });

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
        // debugger;
        if ($scope.tabledata[0].tableParamsDestino.length !== 0) {$scope.acordeonDestino = true;}
        if ($scope.tabledata[0].tableParamsOrigem.length !== 0) {$scope.acordeonOrigem = true;}
        if ($scope.tabledata[0].tableParamsFrete.length !== 0) {$scope.acordeonFrete = true;}

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
        // params = {
        //     'aClasse': ''
        // }
        // callWS.get('/WVDF_WS/ws_HCGS3001.wso/taxas_tarifarioxproposta/JSON', params).then(function(response) {
        //     $scope.lsTaxas = response.data;

        // });
        $scope.loadingState = false;
    };

    $scope.fControlTaxComisao = function(valor) {
        // debugger;
        if (valor !== '' && valor !== null) {$scope.desc_grid=false;}
        else {$scope.desc_grid=true;}

    }

    // ALIMENTA O ARRAY DA COMISSAO
    $scope.getTaxas_Comissao = function(aClasse) {
        $scope.loadingState = true;
        params = {
            'aClasse': aClasse,
            'aProp':$scope.proposta.idProposta
        }
        callWS.get('/WVDF_WS/ws_HCGS3001.wso/taxas_tarifarioxproposta/JSON', params).then(function(response) {
            $scope.lsTaxas = response.data;

            $scope.loadingState = false;
        });
    }

    // ALIMENTA PRINCIPAL DO ARRAY DA COMISSAO
    $scope.getTaxas_Comissao_Array = function(aClasse) {
        $scope.loadingState = true;
        params = {
            'aClasse': aClasse,
            'aProp':$scope.proposta.idProposta
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

    $scope.btnRefreshInfo = function() {
        // 
        var aux = '';

        $scope.loadingState = true;
        buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/f_hcgs3006_rel/JSON', 'aProp=' + $scope.proposta.idProposta).then(function(data) {
            // 
            $scope.lsAplicar = data;
            if ($scope.lsAplicar[0].venda.length) { $scope.hasTaxa = true; }
            $scope.lsAplicar[0].totalgeral = 0;
            $scope.lsAplicar[0].totalcompra = 0;
            $scope.lsAplicar[0].totalvenda = 0;
            $scope.lsAplicar[0].comissao = 0;
            $scope.lsAplicar[0].recTerminal = 0;
            $scope.lsAplicar[0].agente = 0;
            $scope.lsAplicar[0].msg = '| ';
            //Alimenta o modal de Negociacao por Taxa
            console.log($scope.lsAplicar[0].arr_ptx);
            for (var i = $scope.lsAplicar[0].arr_ptx.length - 1; i >= 0; i--) {
                $scope.negociarTaxa[i] = {};
                $scope.negociarTaxa[i].venda = $scope.lsAplicar[0].arr_ptx[i].venda;
                texto = $scope.lsAplicar[0].arr_ptx[i].DS_T;
                if ($scope.lsAplicar[0].arr_ptx[i].descricao !== '') {
                    texto = texto + " (" + $scope.lsAplicar[0].arr_ptx[i].descricao + ")";
                }
                texto = texto + " [" + $scope.lsAplicar[0].arr_ptx[i].aClass + "]";
                if ($scope.proposta.modalidades == 'FCL') {texto = texto + " - "+ $scope.lsAplicar[0].arr_ptx[i].equipamento;}
                $scope.negociarTaxa[i].DS_T = texto;
                $scope.negociarTaxa[i].recId = $scope.lsAplicar[0].arr_ptx[i].sRecnum;
                $scope.negociarTaxa[i].valor = $scope.lsAplicar[0].arr_ptx[i].valorVenda;
                $scope.negociarTaxa[i].moeda = $scope.lsAplicar[0].arr_ptx[i].moedaVenda;
                $scope.negociarTaxa[i].valormin = $scope.lsAplicar[0].arr_ptx[i].vlMin;
                $scope.negociarTaxa[i].valormax = $scope.lsAplicar[0].arr_ptx[i].vlMax;
                $scope.negociarTaxa[i].note = $scope.lsAplicar[0].arr_ptx[i].N_Note;
                $scope.negociarTaxa[i].modPgto = $scope.lsAplicar[0].arr_ptx[i].modPgto;
            }

            //--- CALCULA O TOTAL DE VENDA
            for (var i = $scope.lsAplicar[0].venda.length - 1; i >= 0; i--) {
                if ($scope.lsAplicar[0].venda[i].id !== 'R$' && $scope.lsAplicar[0].venda[i].value !== 0) {
                    Convert($scope.lsAplicar[0].venda[i].id, $scope.lsAplicar[0].venda[i].value, 'v', function(response) {
                        // 
                        $scope.lsAplicar[0].totalvenda += response.data.valor;
                    });
                } else { $scope.lsAplicar[0].totalvenda += $scope.lsAplicar[0].venda[i].value; }
            }
            //--- CALCULA O VALOR DE COMPRA TOTAL
            for (var i = $scope.lsAplicar[0].compra.length - 1; i >= 0; i--) {
                if ($scope.lsAplicar[0].compra[i].id !== 'R$' && $scope.lsAplicar[0].compra[i].value !== 0) {
                    // 
                    Convert($scope.lsAplicar[0].compra[i].id, $scope.lsAplicar[0].compra[i].value, 'c', function(response) {
                        // 
                        $scope.lsAplicar[0].totalcompra += response.data.valor;
                    });
                } else { $scope.lsAplicar[0].totalcompra += $scope.lsAplicar[0].compra[i].value; }
            }
            // 
            //--- COMISSAO DO CLIENTE - CONVERSAO CASO NECESSARIO
            if ($scope.lsAplicar[0].descliente.id !== 'R$' && $scope.lsAplicar[0].descliente[i].value !== 0) {
                Convert($scope.lsAplicar[0].descliente.id, $scope.lsAplicar[0].descliente.value, 'v', function(response) {
                    $scope.lsAplicar[0].comissao += response.data.valor;
                });
            } else { $scope.lsAplicar[0].comissao += $scope.lsAplicar[0].descliente.value; }

            //--- AGENTE - CONVERSAO CASO NECESSARIO
            if ($scope.lsAplicar[0].recagente.id !== 'R$' && $scope.lsAplicar[0].recagente.value !== 0) {
                // 
                Convert($scope.lsAplicar[0].recagente.id, $scope.lsAplicar[0].recagente.value, 'v', function(response) {
                    // 
                    $scope.lsAplicar[0].agente += response.data.valor;
                });
            } else { $scope.lsAplicar[0].agente += $scope.lsAplicar[0].recagente.value; }

            //--- TERMINAL - CONVERSAO CASO NECESSARIO
            if ($scope.lsAplicar[0].recterminal.id !== 'R$' && $scope.lsAplicar[0].recterminal.value !== 0) {
                Convert($scope.lsAplicar[0].recterminal.id, $scope.lsAplicar[0].recterminal.value, 'v', function(response) {
                    $scope.lsAplicar[0].recTerminal += response.data.valor;
                });
            } else { $scope.lsAplicar[0].recTerminal += $scope.lsAplicar[0].recterminal.value; }

            for (var i = $scope.lsAplicar[0].coins.length - 1; i >= 0; i--) {
                if ($scope.lsAplicar[0].coins[i].id !== 'R$' && $scope.lsAplicar[0].coins.value !== 0) {
                    infoDados($scope.lsAplicar[0].coins[i].id, 1, 'c', function(response) {});
                }
            }

            $scope.setNgTables();
            $scope.gridComissao_lista();
            $scope.getTaxas_Comissao_Array('');

            $scope.loadingState = false;
        });

    }

    var Convert = function(moeda, valor, tipo, callback) {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        // today = '2017-05-29';
        // var ws = 'http://192.168.6.19:8087/monetario/converter/' + valor + '/' + moeda + '/BRL/' + today + '/' + tipo;
        // callWS.get(ws, '').then(function(response) {
        //     callback(response);
        // });

    }

    var infoDados = function(moeda, valor, tipo, callback) {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        var ws = 'http://192.168.6.19:8087/monetario/converter/1/' + moeda + '/BRL/' + today + '/' + tipo;

        callWS.get(ws, '').then(function(response) {
            // 

            $scope.lsAplicar[0].msg += moeda + ':' + (response.data.ptax.valorBase).toFixed(2) + '(' + response.data.ptax.dataReferencia + ') | ';

            callback(response);
        });

    }

    $scope.Notify = function() {
        // 
        $scope.ListaMsgs = {}
        // callWS.get('', params ).then(function(response) {
        buscaWS.get('/WVDF_WS/ws_TMEN1003.wso/f_lista_msgs/JSON', 'aProp=' + $scope.proposta.idProposta).then(function(data) {
            // 
            $scope.ListaMsgs = data;
            // if ($scope.proposta.sStatus !== '8') 
            // {
            //     if ($scope.ListaMsgs.red.length == 0) 
            //         {$scope.proposta.sStatus = '1';}
            //     else {$scope.proposta.sStatus = '4';}
            // }

        });

    }

    $scope.btnAceitar = function() {
        
        // debugger;
        var param = {};
        param.aUsuarioSessao = getVariavelURL("aUsuarioSessao");
        param.idProposta = $scope.proposta.idProposta; //getVariavelURL("idProposta");
        param.taxas = $scope.negociarTaxa;
        param.valid_ex = $scope.negociarValidade.valid_ex;
        param.concorrente = [];
        for (var i = $scope.negociarValidade.concorrente.length - 1; i >= 0; i--) {
            param.concorrente.push($scope.negociarValidade.concorrente[i].idCliente);
        }
        
        var params = { 'aJSON': param };

        callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_taxdeals/JSON', params).then(function(response) {
            if (response.data = 1) $scope.proposta.sStatus = '4'
            $scope.Notify();
            loadProposta();
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
        var params = {};
        params.aUsuarioSessao = getVariavelURL("aUsuarioSessao");

        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_userprop/JSON', params).then(function(response) {
            $scope.permissao = response.data;
            // $scope.permissao = 0;
            if (!$scope.permissao) {
                // $scope.L.LITERAL_42 += " - Venda";
                // $scope.L.LITERAL_41 += " - Venda";
                // $scope.L.LITERAL_43 += " - Venda";
            }

        });
    }

    $scope.fnCalcTotal = function() {
        $scope.entrada.total.weight = $scope.entrada.pcs * $scope.entrada.weight;

        $scope.entrada.total.volume = $scope.entrada.length * $scope.entrada.width * $scope.entrada.height;
    };

    $scope.btnAplicarCalculo = function() {
        $scope.loadingState = true;
        // 
        buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/f_apl_cacl/JSON', 'aPROP=' + $scope.proposta.idProposta).then(function(data) {
            // 
            $('#tab2Link').trigger('click');
            $scope.Notify();
            $scope.btnRefreshInfo();

        });

    };

    $scope.getVia = function() {
        // debugger;
        $scope.lsVia = [];
        if ($scope.proposta.pol !== "" && $scope.proposta.pod !== "") {
            buscaWS.get('/WVDF_WS/ws_csag325.wso/propostaVia/JSON', 'sPol=' + $scope.proposta.pol.id + '&sPod=' + $scope.proposta.pod.id + '&sMod=' + $scope.proposta.modalidades+'&sCliente='+idCliente).then(function(data) {
                // debugger;
                $scope.lsVia = data;
                if ($scope.lsVia.length == 1) { $scope.proposta.VIA = ''; }
                // if ($scope.lsVia.length==1) {$scope.proposta.VIA_aux = $scope.lsVia[0].value;}
                // $scope.getCarrier();
            });
        }
    }

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

    $scope.btnTableSaveRowTax = function(row, Class) {

        row.aUsuarioSessao = aUsuarioSessao;
        row.idProposta = $scope.proposta.idProposta;
        row.permissao = $scope.permissao;
        // 
        callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_change_line/JSON', { 'aJSON': row }).then(function(response) {
            row.editable = false;

            if (Class == "O")
                $scope.lockNewOrigem = false;
            else if (Class == "F")
                $scope.lockNewFrete = false;
            else if (Class == "D")
                $scope.lockNewDestino = false;

            $scope.btnRefreshInfo();
            $scope.Notify();
        });

    }

    $scope.modalIMO = function()
    {
        $scope.givenUrl ="PCGS3040_10.asp?aUsuarioSessao="+aUsuarioSessao+"&Nm_Tabela=HCGS3004"+"&idProposta="+$scope.proposta.idProposta;
    }

    $scope.f_check_tax = function(recnum, status) {
        var params = {};
        params.aUsuarioSessao = aUsuarioSessao;
        params.sRecnum = recnum;
        params.aStatus = status;
        callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_check_tax/JSON', params).then(function(response) { $scope.btnRefreshInfo(); });
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
        // debugger; 
        var params = {};
        params.aUsuarioSessao = getVariavelURL("aUsuarioSessao");
        params.idProposta   = $scope.proposta.idProposta;
        params.negociation  = $scope.tbPendencias.negociation;
        params.valid_ex     = $scope.negociarValidade.valid_ex;
        params.option       = $scope.negociarValidade.option;
        $scope.proposta.negociation_id = false;
        
        callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_dealresp/JSON', { 'aJson': params }).then(function(response) {
            // closeTab();
            $scope.btnRefreshInfo();
            $scope.Notify();
        });

    }

    $scope.btnTableSaveRowComissao = function(row) {

        // debugger;
        row.editable = false;
        var param = {};
        param = row;
        param.aUsuarioSessao = getVariavelURL("aUsuarioSessao");
        param.idProposta = $scope.proposta.idProposta; //getVariavelURL("idProposta");
        //param.taxas = $scope.negociarTaxa;
        //param.valid_ex = $scope.negociarValidade.valid_ex;
        // param.concorrente = [];
        // for (var i = $scope.negociarValidade.concorrente.length - 1; i >= 0; i--) {
        //     param.concorrente.push($scope.negociarValidade.concorrente[i].idCliente);
        // }
        
        var params = { 'sJSON': param };

        callWS.get('/WVDF_WS/ws_hcgs3007.wso/f_save_comissao/JSON', params).then(function(response) {
            // if (response.data = 1) $scope.proposta.sStatus = '4'
            // $scope.Notify();
            $scope.gridComissao_lista();
        });

    }

    $scope.fNegociationResp = function() {
        // 
        //--- alimenta a tela inicial da negociacao
        params = "aProposta=" + $scope.proposta.idProposta;
        buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/f_negociation/JSON', params).then(function(data) {
            // debugger;
            $scope.tbPendencias = data;
            $scope.negociarValidade.valid_ex = data.aValid
            $scope.negociarValidade.concorrente = data.aConcorrente
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
        // 
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