// var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
// var idVendedor = getVariavelURL('idVendedor');
// var idCliente = getVariavelURL('idCliente');
// var idProposta = getVariavelURL('idProposta');
// var idClone = getVariavelURL('idClone');
// var idProspect = getVariavelURL('Prospect');
// var idAprovado = getVariavelURL('Booking');

// $(function() {
    // $('.bs-example-modal-lg').on('show.bs.modal', function(e) {
        // if (window.top.document.querySelector('iframe')) {
            // $('.bs-example-modal-lg').css('top', window.top.scrollY);
        // }
    // });
// });

// // ANGULAR JS
// app = angular.module('propostaNovaApp', ['ngTagsInput', 'wsDominio', 'toaster', 'diretivas', 'ngMaterial', 'ui.bootstrap', 'ui.utils.masks', 'ngTable']);

// app.factory('buscaWS', function($http) {
    // return {
        // get: function(url, parametros) {
            // return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                // return res.data;
            // });
        // }
    // };
// });

// app.directive("typeaheadWatchChanges", function() {
    // return {
        // require: ["ngModel"],
        // link: function(scope, element, attr, ctrls) {
            // scope.$watch('proposta.pol', function(value) {
                // ctrls[0].$setViewValue(value);
            // });
        // }
    // };
// });

// app.filter('FilterArray', function() {
    // return function(inputArray, filterIDs) {
        // if (angular.isUndefined(inputArray) || angular.isUndefined(filterIDs)) return;
        // return inputArray.filter(function(entry) {
            // return this.indexOf(entry.ID) !== -1;
        // }, filterIDs);
    // };
// });

// app.controller('comboCtrl', function($scope, buscaWS, callWS, $http) {

    // var init = function() {
        // if (getVariavelURL("debug")) return;
        // getMoedas();
        // getMarcas();
        // getModPgto();
        // getEmbarques();
        // getFrete();
        // getModalidades();
        // getTpOperacao();
        // getIncoterm();
        // getPais();
        // getStatus();
        // getListaMercadorias();
        // getContainers();
        // getDescricao();
        // getTpCalculos();
        // getPackageType();
        // getSupervisor();
        // $scope.hasTaxa = false;
    // }
    
    // var getSupervisor = function() {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fSupervisorCombo/JSON', "sBookingId="+idAprovado).then(function(data) {
            // $scope.lsSupervisor = data;
        // });
    // }
    // var getMoedas = function() {
        // var params = { 'aUsuarioSessao': aUsuarioSessao };
        // return callWS.get('/WVDF_WS/ws_ccgs218.wso/buscarMoeda_proposta/JSON', params)
            // .then(function(response) {
                // $scope.lsMoedas = response.data;
            // });
    // }

    // var getDescricao = function() {
        // var params = { 'aUsuarioSessao': aUsuarioSessao };
        // callWS.get('/WVDF_WS/ws_ccgs225.wso/f_CCGS225_combo/JSON', params)
            // .then(function(response) {
                // $scope.lsDescricao = response.data;
            // });
    // }

    // var getMarcas = function() {
        // parametros = 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + "&sCONTEUDO=" + '' + "&Cliente=" + getVariavelURL('idCliente');
        // buscaWS.get('/WVDF_WS/ws_csag308.wso/f_fup_csag308_combo/JSON', parametros).then(function(data) {
            // $scope.lsMarcas = data
        // });
    // }

    // var getModPgto = function() {
        // buscaWS.get('/WVDF_WS/ws_ccgs206.wso/listarModPgto/JSON', '').then(function(data) {
            // $scope.lsModPgto = data;
        // });
    // }

    // var getEmbarques = function() {
        // buscaWS.get('/WVDF_WS/ws_CCGS204.wso/f_CCGS204_lista/JSON', '').then(function(data) {
            // $scope.lsEmbarques = data;
        // });
    // }

    // var getFrete = function() {
        // buscaWS.get('/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON', '').then(function(data) {
            // $scope.lsFretes = data;
        // });
    // }

    // var getModalidades = function() {
        // buscaWS.get('/WVDF_WS/ws_CCGS202.wso/f_CCGS202_lista/JSON', 'sProduto=').then(function(data) {
            // $scope.lsModalidades = data
        // });
    // }

    // var getTpOperacao = function() {
        // buscaWS.get('/WVDF_WS/ws_CCGS200.wso/f_CCGS200_combo/JSON', '').then(function(data) {
            // $scope.lsOperacoes = data;
        // });
    // }

    // var getIncoterm = function() {
        // buscaWS.get('/WVDF_WS/ws_HCGS3000.wso/f_combo_incorterm/JSON', '').then(function(data) {
            // $scope.lsIncoterm = data;
        // });
    // }

    // var getPais = function() {
        // buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON', '').then(function(data) {
            // $scope.lsPais = data;
        // });
    // }

    // var getStatus = function() {
        // // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_combo_statprop/JSON', '').then(function(data) {
        // //     $scope.lsStatus = data;
        // // });
    // }

    // var getListaMercadorias = function() {
        // buscaWS.get('/WVDF_WS/ws_ccgs219.wso/f_prop_combo/JSON', 'aUsuarioSessao=' + aUsuarioSessao).then(function(data) {
            // $scope.lsMercadoria = data;
        // });
    // }

    // var getContainers = function() {
        // buscaWS.get('/WVDF_WS/ws_CCGS217.wso/f_CCGS217_lista/JSON', '').then(function(data) {
            // debugger;
            // $scope.lsContainer = data;
        // });
    // }

    // var getTpCalculos = function() {
        // buscaWS.get('/WVDF_WS/ws_ccgs220.wso/f_combo_tpcalc/JSON', '').then(function(data) {
            // $scope.lsCalculos = data;
        // });
    // }

    // var getPackageType = function() {
        // buscaWS.get('/WVDF_WS/ws_CCGS228.wso/f_CCGS228_pkg_type/JSON', '').then(function(data) {
            // $scope.lsPackages = data;
        // });
    // }


    // angular.element(function() {
        // setTimeout(function() {
            // init();
        // }, 500);
    // });

// });

// app.controller('chatCtrl', ['$scope', 'buscaWS', 'callWS', '$http', 'toaster', function($scope, buscaWS, callWS, $http, toaster) {
    // $scope.messages = [];

    // var init = function() {
        // if (getVariavelURL("debug")) return;
        // if (idProposta !== 0) {
            // $scope.getMessages();
        // }
    // }

    // $scope.getMessages = function() {
        // var message = {};
        // // message.msg = "teste";
        // // message.elaborador = "Anderson";
        // // message.data = "10/11/2017";
        // // $scope.messages.push(message);
        
        
        // if (idProposta == '' || idProposta == 0) {
           // return;
        // }
        // message = 'aProp='+idProposta+'&aUsuarioSessao='+aUsuarioSessao;
        // buscaWS.get('/WVDF_WS/ws_hsag558.wso/f_listacomments/JSON', message).then(function(data) {
            
            // $scope.messages = data;
        // });
    // }

    // $scope.sendMsg = function(msg,stat) {
        // $scope.loadingState=true;
        // var params = {};
        
        // if (idProposta == '' || idProposta == 0) {
            // idProposta = $scope.proposta.idProposta;
        // }

        // if (idProposta == '' || idProposta == 0) {
            // // toaster.pop('error', "Error", 'Proposta Invalida!', null, 'trustedHtml');
            // parent.parent.alertify.error('Proposta Invalida!');
            // return;
        // }

        // params.aProp = idProposta;
        // params.msg = msg;
        // params.stats = stat;
        // params.aUsuarioSessao = aUsuarioSessao;
        // console.log(params);
        
        // var param = { 'sJSON': params };

        // callWS.get('/WVDF_WS/ws_hsag558.wso/f_savecomments/JSON', param).then(function(response) {
            // $scope.getMessages();
            // $scope.chat_msg = '';
            // $scope.chat_stat = '';
            // $scope.loadingState=false;
        // });
    // }

    // $scope.history = [];

    // $scope.openHistorico = function() {
        // var params = {};
        // params.aUsuarioSessao = aUsuarioSessao;
        // params.aProp = idProposta;
        // callWS.get('/WVDF_WS/ws_hsag558.wso/f_full_msgs/JSON', params).then(function(response) {
            // $scope.history = response.data;
        // });
    // }
    // init();
// }]);

// app.controller('literalCtrl', ['$scope', function($scope) {
    // $scope.LITERAL_99 = "Modo de Pagamento";
    // $scope.LITERAL_98 = "Moeda - Compra";
    // $scope.LITERAL_97 = "Valor - Compra";
    // $scope.LITERAL_96 = "Valor Min";
    // $scope.LITERAL_95 = "Valor Max";
// }]);


// app.controller('produtosController', function($scope, $controller, buscaWS, callWS, $http, $q, toaster, $filter, NgTableParams) {

    // $controller('comboCtrl', { $scope: $scope });
    // $controller('chatCtrl', { $scope: $scope });
    // $controller('literalCtrl', { $scope: $scope });
	// // $controller('lclExpoCtrl', { $scope: $scope });
    
    // $scope.urltab5 = 'timeline.html?query=2018030492';
    
    // $scope.lsFrequencias = {};
    // $scope.edit1 = false;
    // $scope.edit2 = false;

    // $scope.schedule = '';
    // $scope.scheduleTruck = '';

    // $scope.proposta = {};
    // $scope.proposta.idProposta = idProposta;
    // $scope.proposta.vendedor = {};

    // $scope.entrada = {};
    // $scope.tabledata = [];

    // $scope.unitCmIn = [];
    // $scope.unitCmIn.push({ 'ID': 'C', 'DS': 'CM' });
    // $scope.unitCmIn.push({ 'ID': 'I', 'DS': 'Inches' });
    // $scope.options = ['Aceitar', 'Negar', 'Contra-valor'];

    // $scope.containerFCL = [];
    // $scope.containerLCL = [];
    // $scope.containerAIR = [];

    // $scope.lsVia = [];

    // $scope.permissao = '';

    // $scope.negociarTaxa = [];

    // $scope.lsItems = [];
    // $scope.lsItems.LCL = [];
    // $scope.lsItems.FCL = [];
    // $scope.lsItems.AIR = [];
    // $scope.lsItems.BLCL = [];
    // $scope.lsItems.BFCL = [];

    // $scope.parametros300401 = {};

    // // $scope.btnCalc = false;
    // $scope.showVia = false;

    // $scope.proposta.caracteristicasFrete = [];
    // $scope.proposta.modalidades = '';
    // $scope.proposta.incoterm = '';
    // $scope.proposta.embarque = '';
    // $scope.proposta.operacao = '';
    // $scope.proposta.negociation_id = false;
    // $scope.proposta.marca = '';
    // $scope.proposta.paisPol = '';
    // $scope.proposta.pol = '';
    // $scope.proposta.paisPod = '';
    // $scope.proposta.pod = '';
    // $scope.proposta.paisOrigem = '';
    // $scope.proposta.paisDestino = '';
    // $scope.proposta.cidadeOrigem = '';
    // $scope.proposta.cidadeDestino = '';
    // $scope.proposta.cepOrigem = '';
    // $scope.proposta.cepDestino = '';
    // $scope.proposta.ttcbm = '';
    // $scope.proposta.ttgw = '';
    // $scope.proposta.anexo = 0;
    // $scope.proposta.vianome='';
    // $scope.proposta.armadornome='';
    // $scope.proposta.transitTime='';
    // $scope.proposta.freeTime = '';
    // $scope.proposta.frequencia ='';
    // $scope.dtInicioFormated = '';
    // $scope.dtfimFormated = '';

    // $scope.negociarValidade = {};
    // $scope.negociarValidade.valid_ex = '';
    // $scope.negociarValidade.concorrente = '';
    // $scope.negociarValidade.option = '';

    // $scope.analise = {};

    // $scope.acordeonDestino = false;
    // $scope.acordeonOrigem = false;
    // $scope.acordeonFrete = false;
    // $scope.acordeonComissao = false;

    // $scope.debug = false;
    // $scope.booking = false;
	// $scope.via = null;

    // $scope.lsSchedule = '';
    // $scope.lsScheduleTruck = '';
    // $scope.Consolidada_net = '';
	  
    // $scope.editProposta = [];

    // $scope.editProp = function(model) {
   // // alert('teste');

         // //console.log($scope.editProposta.via);
        // if ($scope.editProposta.via == undefined) {
            // parent.parent.alertify.error('Preencha o campo Via.');
            // return;
        // }
        // if ($scope.editProposta.armador == undefined) {
            // parent.parent.alertify.error('Preencha o campo Armador.');
            // return;
        // }
        // if ($scope.editProposta.transitTime == undefined) {
            // parent.parent.alertify.error('Preencha o campo Transit Time.');
            // return;
        // }
        // if ($scope.editProposta.freeTime == undefined) {
            // parent.parent.alertify.error('Preencha o campo Free Time.');
            // return;
        // }
        // if ($scope.editProposta.frequencia == undefined) {
            // parent.parent.alertify.error('Preencha o campo Frequencia.');
            // return;
        // }
        // if ($scope.editProposta.dtinicial == undefined) {
            // parent.parent.alertify.error('Preencha o campo Data Incial.');
            // return;
        // }
        // if ($scope.editProposta.dtFinal == undefined) {
            // parent.parent.alertify.error('Preencha o campo Data Final.');
            // return;
        // }
        // data = (new Date(),'yyyy-MM-dd')

        // var dtinicial = $filter("date")($scope.editProposta.dtinicial, 'dd-MM-yyyy');

        // var dtFinal = $filter("date")($scope.editProposta.dtFinal, 'dd-MM-yyyy');

        // var jsonEditProp = 
        // {
         // "CSAG325_VIA": $scope.editProposta.via.id,
         // "FREQUENCIA": $scope.editProposta.frequencia,
         // "VALIDADE_INICIO": dtinicial,
         // "VALIDADE_TERMINO": dtFinal,
         // "TRANSITTIME":$scope.editProposta.transitTime,
         // "FREETIME":$scope.editProposta.freeTime,
         // "CARRIER_ID":$scope.editProposta.armador.id,
         // "ID_PROPOSTA": $scope.proposta.idProposta,
         // "TAXASARMADOR " : $scope.editProposta.taxasArmador,
         // "FTARMADOR " : $scope.proposta.ftarmador
        // };
        // var jasonop = JSON.stringify(jsonEditProp);
        // console.log(jasonop);
		// debugger;	
        // $http({
    		// method: 'PATCH',
    		// url: $scope.CRMURL+'api/cross/proposta',
    		// data : jsonEditProp
		// }).then(function success(response) {
    		// console.log('sucess', response);
            
            // parent.parent.alertify.success('Salvo com sucesso!');
            // // location.reload();
            // debugger;
            
            // //atualiza valores
            // $scope.proposta.armadornome = $scope.editProposta.armador.value;
            // $scope.proposta.transitTime = $scope.editProposta.transitTime;
            // $scope.proposta.freeTime    = $scope.editProposta.freeTime;

            // if ($scope.editProposta.taxasArmador =='1') { $scope.fAplicarTaxasArmador(); $scope.loadingState=true; }

		// }, function error(response) {
			// console.log('error', response);
            // parent.parent.alertify.error('Erro ao Salvar!');
	    // });
	
    // };
	
    // $scope.fAplicarTaxasArmador = function() {

        // buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/ftaxas_armador/JSON', 'sPropostaId='+idProposta).then(function(data) {
            // parent.parent.alertify.success('Taxas do Armador Aplicadas!');
            // $scope.btnRefreshInfo();
            // // $scope.loadingState = false;
        // });

    // }

    // $scope.loadingState = true;
    // var params = { 'aUsuarioSessao': aUsuarioSessao };
    // callWS.get('/WVDF_WS/WS_CCGS226.wso/f_CCGS226_freq/JSON', params)
    // .then(function(response) {
        // $scope.lsFrequencias = response.data;
    	// console.log($scope.lsFrequencias);
        // $scope.loadingState = false;
    // }, function(error) {
        // $scope.loadingState = false;
        // toaster.pop({
            // type: 'error',
            // title: 'Error',
            // body: ("Error ao carregar Frequencia. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
            // bodyOutputType: 'trustedHtml'
        // });
    // });
				
    // var init = function() {
        // if (getVariavelURL("debug")) {
            // $('#tab3Link').trigger('click');
            // $scope.debug = true;
        // } else {

            // getLiterais();
            // getPermissao();

            // getTaxas();
            // // $scope.getVia();
            // // $scope.getTaxas_Comissao_Array('');

            // if (idProspect !== false && idProspect !== '0' && idProspect !== '') {

                // $scope.proposta.dsCliente = idProspect;

            // } else { getCliente(); }


            // if (idProposta) {
                // loadProposta();
                // $scope.attnum();
                // refreshTabelas();
                // $scope.Notify();
                // $scope.hideAbaixo = false;


                // if (idClone == 1) 
                // {
                    // $('#tab1Link').trigger('click');
                    // $scope.edit2 = true;
                // }
                
                // else {
                    // // debugger;
                    // if (idAprovado !== '0' && idAprovado !== '' && idAprovado !== false) {
                        // $scope.snp = '1';
                        // $scope.booking = true;
                        // angular.element(function() {
                            // $('#tab3Link').trigger('click');
                        // });
                        // // if ($scope.proposta.operacao == 'LCL')
                            // // $scope.fScheduleBook();
                        // $scope.refreshContatos('O');
                        // $scope.refreshContatos('D');             
                        // // $scope.fCarregaDetBook();
                        // $scope.fBookingBusca();
                        // $scope.fDetalhesCargaBooking();
                    // } else {
                        // angular.element(function() {
                            // $('#tab2Link').trigger('click');
                        // });

                    // }
                // }
                // //Comissao
                // $scope.gridComissao_lista();

            // } else {
                // $scope.proposta.sMercadoria = "0000";
                // // $scope.proposta.caracteristicasFrete[0] = "4";
                // $scope.edit2 = true;
            // }
        // }

    // }

    // //AUTOCOMPLETE CLIENTE
    // $scope.loadClientes = function(query) {
        // if (query.length > 2) {
            // var parametros = 'sInicio=' + query;
            // var data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_proposta_complete_client/JSON', parametros)
                // .then(function(data) {
                    // return data;
                // });
            // return data;
        // }
    // };

    // $scope.changeModalidades = function(oModalidades) {
        // $scope.entrada.modalidade = $scope.proposta.modalidades;
        // $scope.proposta.modalidade = $scope.proposta.modalidades;
    // };

    // var getCliente = function() {
        // if (getVariavelURL('idCliente')) {
            // buscaWS.get('/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG340/JSON', 'sUSUARIOSESSAO=' + getVariavelURL('aUsuarioSessao') + '&sCodigo=' + getVariavelURL('idCliente')).then(function(data) {
                // $scope.proposta.dsCliente = data.cDescricao;
            // });
        // }
    // }

    // var getLiterais = function() {
        // buscaWS.get('/WVDF_WS/ws_csag309.wso/f_idiomas_literais/JSON', 'sPrograma=PCGS3004_01').then(function(data) {
            // $scope.L = data;
        // });
    // }

    // $scope.attnum = function() {
        // params = 'sTabela=HCGS3004&idProposta=' + $scope.proposta.idProposta;
        // buscaWS.get('/WVDF_WS/ws_log3040.wso/fCountLog3040/JSON', params).then(function(data) {
            // $scope.proposta.anexo = data;
        // });
    // }

    // $scope.gridComissao = [];
    // $scope.gridComissao_addTaxa = function() {
        // var obj = {};
        // obj.DS_T = 'CUSTOMER COMISSION';
        // obj.ID_T = 45;
        // obj.tipo = 'O';
        // obj.valor = 0;
        // obj.moeda = '';
        // obj.valormin = 0;
        // obj.valormax = 0;
        // obj.modPgto = '';
        // obj.tp_calc = '';
        // obj.note = '';
        // obj.editable = true;
        // $scope.gridComissao.push(obj);
    // }
    // $scope.desc_grid = true;
    // $scope.fControlTaxComisao = function (taxa) {
        
        // if (taxa == null) $scope.desc_grid = true;
        // else $scope.desc_grid = false;
    // }

    // $scope.fBtnDelComissao = function(recnum) {
        // params = 'sRecnum='+recnum;
        // buscaWS.get('/WVDF_WS/ws_hcgs3007.wso/f_del_comissao/JSON', params).then(function(data) {
            // $scope.gridComissao_lista();
        // });
    // }

    // $scope.gridComissao_lista = function() {
        // params = 'aProp=' + $scope.proposta.idProposta;
        // buscaWS.get('/WVDF_WS/ws_hcgs3007.wso/f_lista_comissao/JSON', params).then(function(data) {
            // $scope.gridComissao = data;
            // if ($scope.gridComissao.length !== 0) { $scope.acordeonComissao = true; }
        // });
    // }

    // var loadProposta = function() {
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_busca_proposta/JSON', 'aPROPOSTA_ID=' + $scope.proposta.idProposta).then(function(data) {
            // $scope.proposta.dsCliente = data.sCSAG320_FANTASIA;
           
            // $scope.proposta.cliente_documento = data.sCSAG320_DOCUMENTO;
            // $scope.AnaliseCliente();

            // $scope.proposta.sAcordo = data.sAcordo;
            // $scope.proposta.impressaoProposta = data.impressaoProposta;
            // $scope.proposta.emailProposta = data.emailProposta;
            // $scope.proposta.modalidades = {};
            // $scope.proposta.dataProposta = data.dataProposta;
            // $scope.proposta.marca = data.sCSAG308_ID;
            // $scope.proposta.operacao = data.sCCGS200_ID;

            // if (data.negociation_id == '1')
                // $scope.proposta.negociation_id = true;

            // $scope.proposta.produtos        = data.sCCGS210_ID.split(',');
            // $scope.proposta.modalidades     = data.sCCGS202_ID; //
            // $scope.proposta.idAgente        = data.sCSAG345_AGENTE_D;
            // $scope.proposta.idAgente_D      = data.sCSAG345_AGENTE_D;
            // $scope.proposta.idAgente_O      = data.sCSAG345_AGENTE_O;
            // $scope.proposta.AgenteId_D      = data.arr_AGENTE_D;
            // $scope.proposta.AgenteId_O      = data.arr_AGENTE_O;
            // $scope.proposta.incoterm        = data.sCCGS223_ID;
            // $scope.proposta.embarque        = data.sCCGS204_ID;
            
            // $scope.proposta.caracteristicasFrete = data.sCCGS203_ID.split(',');
            // $scope.labelCaracteristicas();
            
            // $scope.proposta.paisPol         = data.paisPol;
            // $scope.proposta.paisPod         = data.paisPod;
            // $scope.proposta.criadoEm        = data.criadoEm;
            // $scope.proposta.criadoPor       = data.criadoPor;
            // $scope.proposta.alteradoEm      = data.alteradoEm;
            // $scope.proposta.alteradoPor     = data.alteradoPor;
            // $scope.proposta.pol             = data.arr_POL;
            // $scope.proposta.pod             = data.arr_POD;
            // $scope.proposta.carrier         = data.arr_CARRIERS.id;
            // $scope.proposta.containers      = data.sCONTAINERS.split(',');
            // $scope.proposta.sMercadoria     = data.sMercadoria;
            
            // $scope.negociarValidade.concorrente_nm = data.sConcorrente;
            
            // $scope.proposta.sClienteFinal   = data.sClienteFinal.Razao;
            // $scope.proposta.sCommons        = data.sCommons;
            // $scope.proposta.sCust_Ref       = data.sCust_Ref;
            // $scope.proposta.sInt_Ref        = data.sInt_Ref;
            // $scope.proposta.sCust_Inst      = data.sCust_Inst;
            // $scope.proposta.sCust_RefS      = data.sCust_RefS;
            
            // $scope.proposta.sStatus = data.sStatus;
            // if (data.sStatus == '9') {
                // $scope.proposta.motivoCancelamento = data.sCANCELADA_MOTIVO;
                // $('#propc').show();
            // }

            // $scope.status = data.telaStatus;

            // $scope.proposta.paisOrigem          = data.sORIGEM_PAIS;
            // $scope.proposta.cepOrigem           = data.sORIGEM_CEP;
            // $scope.proposta.cidadeOrigem        = data.arr_ORIGEM;
            // $scope.proposta.enderecoOrigem      = data.sORIGEM_ENDERECO;
            // $scope.proposta.numeroOrigem        = data.sORIGEM_NUMERO;
            // $scope.proposta.complementoOrigem   = data.sORIGEM_COMPLEMENTO;
            // $scope.proposta.paisDestino         = data.sDESTINO_PAIS;
            // $scope.proposta.cepDestino          = data.sDESTINO_CEP;
            // $scope.proposta.cidadeDestino       = data.arr_DESTINO;
            // $scope.proposta.enderecoDestino     = data.sDESTINO_ENDERECO;
            // $scope.proposta.numeroDestino       = data.sDESTINO_NUMERO;
            // $scope.proposta.complementoDestino  = data.sDESTINO_COMPLEMENTO;
            // $scope.proposta.validadeDe          = data.sDTVAL_INICIO;
            // $scope.proposta.validadeAte         = data.sDTVAL_TERMINO;
            // $scope.proposta.ttcbm               = data.TTCBM;
            // $scope.proposta.ttgw                = data.TTGW;

            // $scope.proposta.freeTime            = data.freetime;
            // $scope.proposta.transitTime         = data.transitTime;
            // $scope.proposta.frequencia          = data.frequencia;
            // // debugger;
            // $scope.via = {
                // "id": data.sVIA,
				// "pais":"",
				// "trade":"",
				// "value": data.sVia_DS
			// };

            // $scope.proposta.VIA = $scope.via;
            // $scope.proposta.vianome     = data.sVia_DS;
            // $scope.proposta.armadornome = data.arr_CARRIERS.label;

            // if (data.retorno_id !== '0') $scope.retorno_id = true;
            // else  $scope.retorno_id = false;
  
            // var datei = $scope.proposta.validadeDe;
            // var datef = $scope.proposta.validadeAte;

            // $scope.editProposta.via             = $scope.via;
            // $scope.editProposta.armador         = data.arr_CARRIERS;
            // $scope.editProposta.transitTime     = data.transitTime;
            // $scope.editProposta.freeTime        = data.freetime;
            // $scope.editProposta.frequencia      = data.frequencia;

            // $scope.editProposta.dtinicial       = $scope.proposta.validadeDe;
            // $scope.editProposta.dtFinal         = $scope.proposta.validadeAte;

            // $scope.editProposta.ftarmador       = data.ftarmador;
            // $scope.editProposta.taxasArmador    = data.taxasArmador;

            // $scope.proposta.carrier_hide        = (data.carrier_hide == "1" ? true : false);

            // $scope.proposta.VIA = data.sVIA;

            // $scope.btnRefreshInfo();
                // // debugger;
            // if (idAprovado !== '0' && idAprovado !== '' && idAprovado !== false) {
                // if ($scope.proposta.modalidades == 'LCL') $scope.fScheduleBook();
            // }

            // $scope.getVia();

        // });
    // }

    // $scope.AnaliseCliente = function() {
        // var ws = 'http://192.168.6.19:8090/targetanalyzerws/resources/status/cliente/' + $scope.proposta.cliente_documento;
        // callWS.get(ws, '').then(function(response) {
            // $scope.analise = response.data;
        // });
    // }

    // //GERADOR DO TOKEN
    // // $scope.genToken = function () {
    // //     var data = "grant_type=password&username=CROSSEDI&password=CRMCRAFT"; 
    // //     $http.post('http://192.168.6.23/api/token', data, {
    // //         headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
    // //         }).then(function success(response) {
    // //         // debugger;
    // //         $scope.crmtk = response.data.access_token;
    // //     });
    // // }

    // //FUNCAO DESATIVADA
    // // $scope.valToken = function () {
    // //     $http.get('http://192.168.6.23/api/teste', {
    // //     headers:{ 'Authorization' : 'Bearer '+response.data.access_token }
    // //     }).then(function success(response) {
    // //         debugger;
    // //     });
    // // }

    // $scope.fSaveEditBook = function () {
        // debugger;
        // $scope.edit1 = false;
        // var oProposta = $scope.proposta;

        // //INCOTERM
        // if (oProposta.incoterm == '' || oProposta.incoterm == undefined) {

            // // toaster.pop('error', "Error", 'Proposta sem INCOTERM!', null, 'trustedHtml');
            // parent.parent.alertify.error('Proposta sem INCOTERM!');
            // return;
        // }
        // //EMBARQUE
        // if (oProposta.embarque == '' || oProposta.embarque == undefined) {

            // // toaster.pop('error', "Error", 'Proposta sem EMBARQUE!', null, 'trustedHtml');
            // parent.parent.alertify.error('Proposta sem EMBARQUE!');
            // return;
        // } else {
            // //DOOR-DOOR
            // if (oProposta.embarque === '4') {
                // if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisDestino == '' ||
                    // oProposta.cidadeDestino == '' || oProposta.cepOrigem == '' || oProposta.cepDestino == '') {
                    // // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    // parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    // return;
                // }
            // }
            // //DOOR-PORT
            // if (oProposta.embarque === '3') {
                // if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisPod == '' ||
                    // oProposta.pod == '' || oProposta.cepOrigem == '') {
                    // // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    // parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    // return;
                // }
            // }
            // //PORT-PORT
            // if (oProposta.embarque === '1') {
                // if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisPod == '' || oProposta.pod == '') {
                    // // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    // parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    // return;
                // }
            // }
            // //PORT-DOOR
            // if (oProposta.embarque === '2') {
                // if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisDestino == '' ||
                    // oProposta.cidadeDestino == '' || oProposta.cepDestino == '') {
                    // // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    // parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    // return;
                // }
            // }
        // }
        
        // if (oProposta.pod != '' && oProposta.pol != '' && $scope.lsVia.length > 1) {
            // if (oProposta.VIA == '') {
                // // toaster.pop('error', "Error", 'Selecione um VIA!', null, 'trustedHtml');
                // parent.parent.alertify.error('Selecione um VIA!');
                // return;
            // }
        // }
        // $scope.loadingState = true;
        // var aux = angular.copy(oProposta);

        // //--- Comentarios.
        // aux.sCust_Ref = oProposta.sCust_Ref;
        // aux.sCust_RefS = oProposta.sCust_RefS;
        // //--- PERMISSAO
        // aux.permissao = $scope.permissao;

        // if (!angular.isUndefined(oProposta.pol)) {
            // if (oProposta.pol !== '') {
                // aux.pol = oProposta.pol.id;
            // }
        // }
        // if (!angular.isUndefined(oProposta.pod)) {
            // if (oProposta.pod !== '') {
                // aux.pod = oProposta.pod.id;
            // }
        // }

        // aux.via = oProposta.VIA;

        // if (!angular.isUndefined(oProposta.cidadeOrigem)) {
            // if (oProposta.cidadeOrigem != '') {
                // aux.cidadeOrigem = oProposta.cidadeOrigem.id;
            // }
        // }
        // if (!angular.isUndefined(oProposta.cidadeDestino)) {
            // if (oProposta.cidadeDestino != '') {
                // aux.cidadeDestino = oProposta.cidadeDestino.id;
            // }
        // }

        // aux.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        // if ((aux.incoterm == 'EXW' || aux.incoterm == 'FCA' || aux.incoterm == 'DAP' || aux.incoterm == 'DDP') && aux.paisDestino == "" && aux.paidPod) {
            // return parent.parent.alertify.error("Selecione um pais de destino");
        // }

        // var params = { 'sJSON': aux};
        // callWS.get('/WVDF_WS/ws_hcgs3004.wso/fSalveEditBook/JSON', params).then(function(data) {
            // debugger;
            // loadProposta();
        // });
    // }

    // $scope.CodBooking = '';
    // $scope.json= '';
    // $scope.GerarBookingLclExp = function() {
        // $scope.loadingState = true;

        // if ($scope.schedule == '') {
            // parent.parent.alertify.error('Schedule nao selecionado!');
            // $scope.loadingState = false;
            // return;
        // }
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fGeraBookingProtocol/JSON', 'sProposta='+idProposta).then(function(data) {
            // $scope.CodBooking = data.protocolo;
            // parent.parent.alertify.success("Booking Gerado!");
            // // debugger;
            // // var via;
            // // if (data.via == '') via = 0;
            // // else via = $scope.proposta.VIA;
            // var jsonEditProp = 
            // {
             // "cliente": idCliente,
             // "SeuCliente":data.seuCliente,
             // "portoOrigem": data.PoL, //$scope.proposta.pol.id
             // "paisPortoOrigem": data.Ppol,
             // "portoDestino": data.PoD, //$scope.proposta.pod.id
             // "paisPortoDestino":data.Ppod,
             // "via":data.via,
             // "viaPais":"",
             // "MoedaMaritimo":"",
             // "TipoCalculo":data.pagamento,
             // "Incoterm":$scope.proposta.incoterm,
             // "Vendedor":"",
             // "Elaborador":data.elaborador,
             // "PackingGroup":data.packingGroup,
             // "TipoVolume":"",
             // "TaxaMaritimoHouseExpo":data.taxas,
             // "tipoContainer":data.containers,
             // "EmissaoBL":data.emissaobl,
             // "placeOfReceipt":data.PoR,
             // "finalDestination":data.finalDest
             // // "TaxaMaritimoMasterExpo" : []
            // };
            // jsonEditProp = JSON.stringify(jsonEditProp);
            // debugger;
            // $http({
                // method: 'POST',
                // url: $scope.CRMURL+'api/Tradutor/cotacao',
                // data : jsonEditProp
            // }).then(function success(response) {
                // debugger;   
                
                // if (response.data.clienteCotacao == null) {
                    // $scope.loadingState = false;
                    // parent.parent.alertify.error('Cliente nao encontrado no NetShip! /n Operacao abortada.');
                    // return;                    
                // }

                // var autorizado = false;
                
                // for (var i = response.data.log.length - 1; i >= 0; i--) {
                    // if (response.data.log[i].origemID !== '0' && response.data.log[i].origemID !== null && response.data.log[i].origemID !== '-1')
                    // {
                        // parent.parent.alertify.log(response.data.log[i].mensagem);
                        // // if (response.data.log[i].propriedade == 'TaxaMaritimoHouseExpo') 
                        // autorizado = true;
                    // }
                // }
                
                // if (autorizado) {
                    // $scope.loadingState = false;
                    // parent.parent.alertify.error('Taxa nao encotrada no NetShip! /n Operacao abortada.');
                    // return;
                // }
                // else {
                    // parent.parent.alertify.success('Traduzido!');
                // }

                // response.data.aUsuarioSessao = aUsuarioSessao;
                // response.data.idProposta = idProposta;
                // var params = { 'sJSON': response.data };
                // callWS.get('/WVDF_WS/ws_hcgs3008.wso/fSaveNetShip/JSON', params)
                // .then(function(data) {
                    // debugger;
                    // parent.parent.alertify.success('Estrutura montada!');
                    // $scope.json = data.data;
                    // // jason = JSON.stringify(json);

                    // var texto = data.data.cotaExpo.ce_TipoCarga;
                    // texto = texto.replace('I', '\u00cd');
                    
                    // data.data.cotaExpo.ce_TipoCarga = texto;

                    // console.log(JSON.stringify($scope.json));

                    // var data = "grant_type=password&username=CROSSEDI&password=CRMCRAFT";//CRMCR4T 
                    // $http.post($scope.CRMURL+'api/token', data, {
                    // headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
                    // }).then(function success(response) {
                        // $scope.crmtk = response.data.access_token;
                        // debugger;
                        // $http({
                            // method: 'POST',
                            // url: $scope.CRMURL+'api/Netship/bra/cotacao',
                            // headers:{ 'Authorization' : 'Bearer '+$scope.crmtk },
                            // data : $scope.json
                        // }).then(function success(response) {
                           // debugger;
                            // parent.parent.alertify.success('Salvo no NetShip!'); 
                            // $scope.CodBooking_net = response.data.numReserva;
                            // response.data.sBookingId = idAprovado;
                            // var params = { 'sJSON': response.data };
                            // // debugger;   
                            // callWS.get('/WVDF_WS/ws_hcgs3008.wso/pSaveRefNS/JSON', params)
                            // .then(function(data) {
                                // parent.parent.alertify.success('Ref Gravada no Cross!'); 
                                // $scope.loadingState = false;
                            // }); 
                        // }, function error(response) {
                            // debugger;
                            // if (response.status == 401) {parent.parent.alertify.error('Nao autorizado!');}
                            // else {     
                                // if (response.data.message !== undefined) parent.parent.alertify.error(response.data.message);
                                // else {
                                    // if (response.statusText == 'Conflict') parent.parent.alertify.error('NetShip ja contem essa Proposta/Reserva!');
                                    // $scope.CodBooking_net = response.data.numReserva;
                                // }
                            // }
                            // $scope.loadingState = false;
                        // });
                    // }, function error(response) {
                            // debugger;
                            // $scope.loadingState = false;
                        // });
                // });

            // }, function error(response) {
                // parent.parent.alertify.error(response.data);
                // $scope.loadingState = false;
            // });

        // });
    // }

    // $scope.GerarBookingFclExp = function () {
        
        // if ($scope.schedule.dtchegada == '') 
        // {
            // parent.parent.alertify.error('Data de Chegada faltando!');
            // return;
        // }

        // $scope.loadingState = true;
        // debugger;
        // var data = "grant_type=password&username=CROSSEDI&password=CRMCRAFT";//CRMCR4T 
        // $http.post($scope.CRMURL+'api/token', data, {
        // headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
        // }).then(function success(response) {
            // $scope.crmtk = response.data.access_token;
            // debugger;
            // if ($scope.schedule == '') {
                // parent.parent.alertify.error('Schedule faltante!');
                // $scope.loadingState = false;
                // return;
            // }
            // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fGeraBookingProtoConsol/JSON', 'sProposta='+idProposta).then(function(data) {
                // $scope.CodBooking = data.protocolo;
                // parent.parent.alertify.success("Booking Cross Gerado!");
                // debugger;

                // if (data.iValidacaoVenda == 1) {
                    // parent.parent.alertify.error("Taxa(s) sem Modalidade de Pagamento de Venda")
                    // return;
                // }
                // if (data.iValidacaoCompra == 1) {
                    // parent.parent.alertify.error("Taxa(s) sem Modalidade de Pagamento de Compra")
                    // return;
                // }

                // var jsonEditProp = 
                // {
                    // "cliente": idCliente,
                    // "SeuCliente":data.seuCliente,
                    // "portoOrigem": data.PoL, //$scope.proposta.pol.id
                    // "paisPortoOrigem": data.Ppol,   
                    // "portoDestino": data.PoD, //$scope.proposta.pod.id
                    // "paisPortoDestino":data.Ppod,
                    // "via":data.via,
                    // "viaPais":"",
                    // "MoedaMaritimo":"",
                    // "TipoCalculo":data.pagamento,
                    // "Incoterm":$scope.proposta.incoterm,
                    // "Vendedor":"",
                    // "Elaborador":data.elaborador,
                    // "PackingGroup":data.packingGroup,
                    // "TipoVolume":"",
                    // "TaxaMaritimoHouseExpo":data.taxas,
                    // "tipoContainer":data.containers,
                    // "EmissaoBL":data.emissaobl,
                    // "placeOfReceipt":data.PoR,
                    // "finalDestination":data.finalDest,
                    // "agente": data.agente,
                    // "terminal" :data.terminal,
                    // "armador" : data.armador,
                    // "navio" : data.navio,
                    // "supervisor" : data.supervisor,
                    // "agenciaMar": data.agmaritimo,
                    // "TaxaMaritimoMasterExpo" : data.taxas,
                    // "consolAgenteEmissaoBL": data.agemissao,
                    // "consolEntregaDocumentos": data.document
                // };
                // jsonEditProp = JSON.stringify(jsonEditProp);
                // console.log(jsonEditProp);
                // debugger;
                // $http({
                    // method: 'POST',
                    // url: $scope.CRMURL+'api/Tradutor/Cotacao',
                    // data : jsonEditProp
                // }).then(function success(response) {
                    // debugger;   
                    
                    // if (response.data.clienteCotacao == null) {
                        // $scope.loadingState = false;
                        // parent.parent.alertify.error('Cliente nao encontrado no NetShip! /n Operacao abortada.');
                        // return;                    
                    // }

                    // var autorizado = false;
                    
                    // for (var i = response.data.log.length - 1; i >= 0; i--) {
                        // if (response.data.log[i].origemID !== '0' && response.data.log[i].origemID !== null && response.data.log[i].origemID !== '-1' )
                        // {
                            // parent.parent.alertify.log(response.data.log[i].mensagem);
                            // // if (response.data.log[i].propriedade == 'TaxaMaritimoHouseExpo')
                            // autorizado = true;
                        // }
                    // }
                    
                    // if (autorizado) {
                        // $scope.loadingState = false;
                        // parent.parent.alertify.error('Dados nao encotrados no NetShip! /n Operacao abortada.');
                        // return;
                    // }
                    // else {
                        // parent.parent.alertify.success('Traduzido!');
                    // }

                    // response.data.aUsuarioSessao = aUsuarioSessao;
                    // response.data.idProposta = idProposta;
                    
                    // $scope.traducao = { 'sJSON': response.data };
                    
                    // callWS.get('/WVDF_WS/ws_hcgs3008.wso/fSaveNetConsol/JSON', $scope.traducao) //Gera a estrutura da CONSOLIDADA
                    // .then(function(data) {
                        // debugger;
                        // parent.parent.alertify.success('Estrutura Consolidada montada!');
                        // $scope.jsonConso = data.data;
                        // console.log(JSON.stringify($scope.jsonConso));
                        
                        // $http({
                            // method: 'POST',
                            // url: $scope.CRMURL+'api/netship/bra/consolidadaExpo', //SALVA A CONSOLIDADA NO NETSHIP
                            // headers:{ 'Authorization' : 'Bearer '+$scope.crmtk },
                            // data : $scope.jsonConso
                        // }).then(function success(response) {
                           // debugger;
                            // parent.parent.alertify.success('Salvo no NetShip!'); 
                            
                            // $scope.Consolidada_net = response.data.numConsolidada;

                            // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticConsolidada/JSON', 'sValor1='+response.data.id+'&sValor2='+response.data.numConsolidada+'&sBookingId='+idAprovado)
                            // .then(function(data) {
                                // parent.parent.alertify.success('Consolidada gravada no Cross!');                                 
                                // $scope.loadingState = false;
                                
                                // //------ RESERVA
                                // callWS.get('/WVDF_WS/ws_hcgs3008.wso/fSaveNetShip/JSON', $scope.traducao)
                                // .then(function(data) {
                                    // debugger;
                                    // parent.parent.alertify.success('Estrutura Reserva montada!');
                                    // $scope.jsonRes = data.data;

                                    // var texto = $scope.jsonRes.cotaExpo.ce_TipoCarga;
                                    // texto = texto.replace('I', '\u00cd');
                                    
                                    // $scope.jsonRes.cotaExpo.ce_TipoCarga = texto;

                                    // console.log(JSON.stringify($scope.jsonRes));

                                    // var data = "grant_type=password&username=CROSSEDI&password=CRMCRAFT";//CRMCR4T 
                                    // $http.post($scope.CRMURL+'api/token', data, {
                                    // headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
                                    // }).then(function success(response) {
                                        // $scope.crmtk = response.data.access_token;
                                        // debugger;
                                        // $http({
                                            // method: 'POST',
                                            // url: $scope.CRMURL+'api/Netship/bra/cotacao',
                                            // headers:{ 'Authorization' : 'Bearer '+$scope.crmtk },
                                            // data : $scope.jsonRes
                                        // }).then(function success(response) {
                                           // debugger;
                                            // parent.parent.alertify.success('Salvo no NetShip!'); 
                                            // $scope.CodBooking_net = response.data.numReserva;
                                            // response.data.sBookingId = idAprovado;
                                            // var params = { 'sJSON': response.data };
                                            // // debugger;   
                                            // callWS.get('/WVDF_WS/ws_hcgs3008.wso/pSaveRefNS/JSON', params)
                                            // .then(function(data) {
                                                // parent.parent.alertify.success('Reserva Gravada no Cross!'); 
                                                // $scope.loadingState = false;
                                            // }); 
                                        // }, function error(response) {
                                            // debugger;
                                            // if (response.status == 401) {parent.parent.alertify.error('Nao autorizado!');}
                                            // else {     
                                                // if (response.data.message !== undefined) parent.parent.alertify.error(response.data.message);
                                                // else {
                                                    // if (response.statusText == 'Conflict') parent.parent.alertify.error('NetShip ja contem essa Proposta/Reserva!');
                                                    // $scope.CodBooking_net = response.data.numReserva;
                                                // }
                                            // }
                                            // $scope.loadingState = false;
                                        // });
                                    // }, function error(response) {
                                            // debugger;
                                            // $scope.loadingState = false;
                                        // });
                                // });


                                // //---- RESERVA FIM
                            // }); 
                            
                        // }, function error(response) {
                            // debugger;
                            // if (response.status == 401) {parent.parent.alertify.error('Nao autorizado!');}
                            // else {     
                                // if (response.data.message !== undefined) parent.parent.alertify.error(response.data.message);
                                // else {
                                    // if (response.statusText == 'Conflict') parent.parent.alertify.error('NetShip ja contem essa Consolidada!');
                                    // $scope.CodBooking_net = response.data.numReserva;
                                // }
                            // }
                            // $scope.loadingState = false;
                        // });
                    // });
                // }, function error(response) {
                    // parent.parent.alertify.error(response.data);
                    // $scope.loadingState = false;
                // });
            // });
        // });
    // }

    // $scope.Passo1FCLEXPO = function() {

    // };

    // $scope.Passo2FCLEXPO = function () {

    // };

    // $scope.Passo3FCLEXPO = function () {

    // }

    // $scope.changeLote = function() {}

    // $scope.labelCaracteristicas = function() {};

    // $scope.loadCarriers = function(query) {
        // return buscaWS.get('/WVDF_WS/WS_csag320.wso/f_bCSAG342_armador/JSON', 'sInicial=' + query + "&sSessionId=" + aUsuarioSessao).then(function(data) {
            // return data;
        // });
    // };

    // $scope.loadNavios = function(query) {
        // return buscaWS.get('/WVDF_WS/WS_hcgs3008.wso/fNavio_descricao/JSON', 'sInicial=' + query + "&sSessionId=" + aUsuarioSessao).then(function(data) {
            // return data;
        // });
    // };

    // $scope.acDocument = function(query) {
        // return buscaWS.get('/WVDF_WS/WS_hcgs3008.wso/fDocumentacao_pessoa/JSON', 'sInicial=' + query + "&sSessionId=" + aUsuarioSessao).then(function(data) {
            // return data;
        // });
    // };

    // $scope.acAgente = function(texto) {
        // return buscaWS.get('fbcsag345_descricao.asp', 'term=' + texto).then(function(data) {
            // return data;
        // });
    // };

    // $scope.acTerminal = function(texto) {
        // return buscaWS.get('fbcsag346_descricao.asp', 'term=' + texto).then(function(data) {
            // return data;
        // });
    // };

    // $scope.loadAutocomplete = function(texto) {

        // var parametros = 'aInicio=' + texto;
        // data = buscaWS.get('/WVDF_WS/ws_CSAG300.wso/f_UsuarioComplete/JSON', parametros)
        // .then(function(data) {
            // return data;
        // });
        // return data;

    // };

    // function zerarEntrada() {
        // $scope.entrada.recnum = "";
        // $scope.entrada.pcs = 1;

        // buscaWS.get('/WVDF_WS/ws_CCGS228.wso/f_CCGS228_pkg_type/JSON', '').then(function(data) {
            // $scope.lsPackages = data;
            // $scope.entrada.package = data[3];
        // });

        // $scope.entrada.weight = "";
        // $scope.entrada.unitweight = "KG";
        // $scope.entrada.length = "";
        // $scope.entrada.width = "";
        // $scope.entrada.height = "";
        // $scope.entrada.UOM = "M";
        // $scope.entrada.oversize = "";
        // $scope.entrada.unitvolume = "CBM";
        // $scope.entrada.haz.class = "";
        // $scope.entrada.haz.un = "";
        // $scope.entrada.haz.flash = "";
        // $scope.entrada.haz.unitFlash = "C";
        // $scope.entrada.haz.packing = "";

        // $scope.entrada.total.weight = $scope.entrada.pcs * $scope.entrada.weight;
        // $scope.entrada.total.volume = $scope.entrada.length * $scope.entrada.width * $scope.entrada.height;
    // };

    // var posicionaTabelas = function(data) {
        
        // for (var i = data.length - 1; i >= 0; i--) {
            // if (data[i].modalidade == 'FCL') {
                // $scope.containerFCL.push(data[i]);

                // // buscaWS.get('/WVDF_WS/ws_CCGS217.wso/f_CCGS217_lista/JSON', '').then(function(data) {
                // //     debugger;
                // //     $scope.lsContainer = data;
                // // });

            // } else if (data[i].modalidade == 'LCL') {
                // $scope.containerLCL.push(data[i]);
            // } else if (data[i].modalidade == 'AIR') {
                // $scope.containerAIR.push(data[i]);
            // }
        // }

        // // if ($scope.containerFCL.length > 0) {
        // //     $scope.btnCalc = true;
        // // }

        // // if ($scope.containerLCL.length > 0) {
        // //     if ($scope.containerLCL[0].total.weight > 0 && $scope.containerLCL[0].total.volume)
        // //         $scope.btnCalc = true;
        // //     else
        // //         $scope.btnCalc = false;
        // // }

        // // if ($scope.containerAIR.length > 0)
        // //     if ($scope.containerAIR[0].total.weight > 0 && $scope.containerAIR[0].total.volume)
        // //         $scope.btnCalc = true;
        // //     else
        // //         $scope.btnCalc = false;
    // }

    // $scope.lockNewFCL = false;
    // $scope.lockNewLCL = false;
    // $scope.lockNewAIR = false;

    // $scope.lockNewOrigem = false;
    // $scope.lockNewFrete = false;
    // $scope.lockNewDestino = false;

    // $scope.btnTableSaveRow = function(row, modalidade) {
        // debugger;
        // if (modalidade == "FCL" && row.equipamento == '') {
            // parent.parent.alertify.error('Quantidade Invalida!');
            // return;
        // }
        
        // row.modalidade = modalidade;
        // $scope.btnAddItem2(row);
        // // refreshTabelas();
        // row.editable = false;

        // // if ($scope.containerFCL.length > 0) {
        // //     $scope.btnCalc = true;
        // // }

        // // if ($scope.containerLCL.length > 0)
        // //     if ($scope.containerLCL[0].total.weight > 0 && $scope.containerLCL[0].total.volume)
        // //         $scope.btnCalc = true;
        // //     else
        // //         $scope.btnCalc = false;

        // // if ($scope.containerAIR.length > 0)
        // //     if ($scope.containerAIR[0].total.aTotalWeight > 0 && $scope.containerAIR[0].total.volume)
        // //         $scope.btnCalc = true;
        // //     else
        // //         $scope.btnCalc = false;

        // // if (modalidade == "FCL") {
        // //     $scope.lockNewFCL = false;
        // // } else if (modalidade == "LCL") {
        // //     $scope.lockNewLCL = false;
        // // } else if (modalidade == "AIR") {
        // //     $scope.lockNewAIR = false;
        // // }
    // }

    // $scope.btnAddItem2 = function(entrada) {
        // $scope.loadingState = true;
        
        // if (entrada.total.weight == 0 || entrada.total.weight == '') {
            // $scope.loadingState = false;
            // parent.parent.alertify.error('Peso Invalido!');
            // return;
        // }
        // if ($scope.proposta.modalidades == 'LCL' && (entrada.total.volume == 0 || entrada.total.volume == '')) {
            // $scope.loadingState = false;
            // parent.parent.alertify.error('Volume Invalido!');
            // return;
        // }

        // if (entrada.pcs == 0 || entrada.pcs == '') {
            // $scope.loadingState = false;
            // parent.parent.alertify.error('PCS/ Quantidade Invalido!');
            // return;
        // }

        // if (entrada.total.grossUnit !== 'KG' && entrada.total.grossUnit !== 'LB') {
            // $scope.loadingState = false;
            // parent.parent.alertify.error('Unidade de Medida Invalida!');
            // return;
        // }

        // if ($scope.proposta.modalidades == 'LCL' && (entrada.total.volumeUnit !== 'CBM' && entrada.total.volumeUnit !== 'CFT')) {
            // $scope.loadingState = false;
            // parent.parent.alertify.error('Unidade de Medida Invalida!');
            // return;
        // }

        // var parametros = {};
        // parametros = entrada;
        // parametros.aUsuarioSessao   = getVariavelURL('aUsuarioSessao');
        // parametros.aPROP            = $scope.proposta.idProposta;
        // parametros.aRecnum          = entrada.aRecnum;
        // parametros.aMod_Frt         = entrada.modalidade;
        // parametros.aPcs             = entrada.pcs;
        // parametros.aWght            = entrada.weight;
        // parametros.aWght_tp         = entrada.unitweight;
        // parametros.aLght            = entrada.length;
        // parametros.aWdth            = entrada.width;
        // parametros.aHght            = entrada.height;
        // parametros.aUOM             = entrada.UOM;
        // parametros.aEQUIP           = entrada.equipamento;
        // parametros.grossUnit        = entrada.total.grossUnit;
        // parametros.volumeUnit       = entrada.total.volumeUnit;
        // parametros.aTotalWeight     = entrada.total.weight;
        // parametros.aTotalVolume     = entrada.total.volume;
        // parametros.aTotalVolumeU    = entrada.unitvolume;


        // var param = { 'sJSON': parametros };

        // $http({
            // url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_save/JSON',
            // method: 'GET',
            // params: param
        // }).success(function(data) {
            // // $scope.loadingState = false;
            // // $scope.Notify();
            // // $scope.loadTotals();
            // // refreshTabelas();
            // // $scope.btnRefreshInfo();
            // // debugger;
            // if (data.defaultMessage.msgInfo !== '') {
                // // $scope.proposta.sStatus = '4';
                // parent.parent.alertify.log(data.defaultMessage.msgInfo);
                // return;
            // } else {
                // // $scope.proposta.sStatus = '1';
                // parent.parent.alertify.success('Detalhe Salvo!');
                // return;
            // }
        // });
    // };

    // $scope.btnDeleteItem = function(item) {
        // $scope.loadingState = true;

        // buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'sRECNUM=' + item.recnum).then(function(data) {
            // $scope.entrada.recnum = "";
            // var index = $scope.lsItems[item.modalidade].indexOf(item);
            // $scope.lsItems[item.modalidade].splice(index, 1);
            // $scope.loadingState = false;

            // parent.parent.alertify.success('Detalhe Deletado!');
            // return;

        // });
    // };

    // $scope.btnEditItem = function(item) {
        // var index = $scope.lsItems[item.modalidade].indexOf(item);
        // $scope.lsItems[item.modalidade].splice(index, 1);

        // delete item.package.$$hashKey;

        // $scope.entrada = angular.copy(item);
    // };

    // $scope.btnVisualizarProposta = function() {
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_HCGS3004_Status/JSON','aProp='+$scope.proposta.idProposta).then(function(data) {
            
            // if (data == 3) {
                // parent.parent.alertify.error('Proposta em Aguardo!');
                // return;
            // }
            // if (data == 4) {
                // parent.parent.alertify.error('Proposta em Analise!');
                // return;
            // }
            // if (data == 10) {
                // parent.parent.alertify.error('Proposta com Falta de Informacoes!');
                // return;
            // }
            // if (data == 11 || data == 12) {
                // parent.parent.alertify.error('Proposta em Verificacao!');
                // return;
            // }

            // if (data == 5) {
                // parent.parent.alertify.error('Proposta Expirada!');
                // return;
            // }
            
            // var url = "PCGS3004_04.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + $scope.proposta.idProposta;
            // window.open(url, 'propostadefrete', 'width=250px');
            
        // });
    // };

    // $scope.btnVisualizarBook = function() {
        // var url = "PCGS3008_04.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + $scope.proposta.idProposta;
        // window.open(url, 'Booking', 'width=250px');
    // };

    // $scope.acClientes = function(texto) {
        // return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/f_proposta_complete_client/JSON', 'sInicio=' + texto).then(function(data) {
            // return data;
        // });
    // };

    // $scope.acCarrier = function(texto) {
        // return $scope.proposta.carrier;
    // }

    // $scope.loadCidadesByPaisOrig = function(query, paisID) {
        // if (paisID == undefined)
            // paisID = '';
        // if (query.length > 3) {
            // // 
            // var parametros = 'sPais=' + paisID + '&sCidade=' + query + '&sMod=' + $scope.proposta.modalidades + '&sCliente=' + idCliente;
            // var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/propostaCidadeOrigem/JSON', parametros)
                // .then(function(data) {
                    // return data;
                // });
            // return data;
        // }
    // };

    // $scope.loadCidadesByPaisDest = function(query, paisID) {
        // if (paisID == undefined)
            // paisID = '';
        // if (query.length > 3) {
            // // 
            // var parametros = 'sPais=' + paisID + '&sCidade=' + query + '&sMod=' + $scope.proposta.modalidades + '&sCliente=' + idCliente + '&sPol=' + $scope.proposta.pol.id;
            // var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/propostaCidadeDestino/JSON', parametros)
                // .then(function(data) {
                    // return data;
                // });
            // return data;
        // }
    // };

    // $scope.loadAgentes = function(query) {
        // if (query.length > 3) {
            // var parametros = 'sInicio=' + query;
            // var data = buscaWS.get('/WVDF_WS/ws_csag345.wso/f_agentes_descricao/JSON', parametros)
                // .then(function(data) {
                    // return data;
                // });
            // return data;
        // }
    // };

    // $scope.loadClientesTag = function(query) {
        // var parametros = 'sInicio=' + query;
        // var data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_fup_concorrente/JSON', parametros)
            // .then(function(data) {
                // return data;
            // });
        // return data;
    // };


    // $scope.loadTotals = function() {
        // var parametros = 'aProp=' + $scope.proposta.idProposta;
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_kg_cbm/JSON', parametros)
            // .then(function(data) {
                // $scope.proposta.ttcbm = data.id;
                // $scope.proposta.ttgw = data.value;
            // });
    // }

    // $scope.ValuesChange = function(row) {
        // row.weight = String(row.weight).replace(',', '.');
        // row.total.weight = String(row.total.weight).replace(',', '.');
    // }

    // $scope.count = function(row) {

        // row.weight = String(row.weight).replace(',', '.');

        // if (row.unitweight == '' || row.total.volumeUnit == '')
            // return;

        // if (row.weight !== '' && row.weight !== 0) {
            // if (row.unitweight == "KG") {
                // row.total.weight = row.pcs * parseFloat(row.weight);
            // } else if (row.unitweight == "LB") {
                // var calc = 2.20462;
                // row.total.weight = row.pcs * parseFloat(row.weight) * calc;
            // }
        // }
    // }

    // $scope.applyCalcVolume = function(row) {
        // row.height = String(row.height).replace(',', '.');
        // row.length = String(row.length).replace(',', '.');
        // row.width = String(row.width).replace(',', '.');

        // if (row.UOM == '' || row.total.volumeUnit == '')
            // return;

        // var H = row.height;
        // var L = row.length;
        // var W = row.width;

        // if (H == 0 || L == 0 || W == 0) return;
        // if (row.UOM == "CM") {
            // H /= 100;
            // L /= 100;
            // W /= 100;
        // } else if (row.UOM == "Inches") {
            // H = inchesToMeters(H);
            // L = inchesToMeters(L);
            // W = inchesToMeters(W);
        // }

        // if (row.total.volumeUnit == "CBM") {
            // row.total.volume = arredonda(calcCBM(L, W, H, row.pcs), 4);
        // } else if (row.total.volumeUnit == "CFT") {
            // row.total.volume = arredonda(calcCFT(L, W, H, row.pcs), 4);
        // }
    // }

    // var arredonda = function(numero, casasDecimais) {
        // casasDecimais = typeof casasDecimais !== 'undefined' ? casasDecimais : 2;
        // return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
    // };

    // var calcCBM = function(L, W, H, qtde) {
        // return L * W * H * qtde;
    // }

    // var calcCFT = function(L, W, H, qtde) {
        // L = metersToInches(L);
        // W = metersToInches(W);
        // H = metersToInches(H);

        // return ((L / 12) * (W / 12) * (H / 12)) * qtde;
    // }

    // var calcLB = function(value, qtde) {
        // value = kilogramsToLibras(value);

        // return (value * qtde);
    // }

    // var metersToInches = function(value) {
        // return value / 0.0254;
    // }

    // var inchesToMeters = function(value) {
        // return value * 0.0254;
    // }

    // var metersToFeet = function(value) {
        // return value / 0.3048;
    // }

    // var feetToMeters = function(value) {
        // return value * 0.3048;
    // }

    // var kilogramsToLibras = function(value) {
        // return value / 2.20462;
    // }

    // var librasToKilograms = function(value) {
        // return value * 2.20462;
    // }

    // $scope.CBMxCFT = function(row) {
        // if (row.total.volumeUnit == "CBM") {
            // row.total.volume = arredonda(row.total.volume * 0.0283, 4);
        // } else if (row.total.volumeUnit == "CFT") {
            // row.total.volume = arredonda(row.total.volume * 35.3147, 4);
        // }
    // }

    // $scope.cloneContainerFCL = function(index) {
        // var nobj = JSON.parse(JSON.stringify($scope.containerFCL[index]));
        // nobj.editable = true;
        // nobj.aRecnum = '';
        // $scope.containerFCL.unshift(nobj);
    // }
    // $scope.cloneContainerLCL = function(index) {
        // // 
        // var nobj = JSON.parse(JSON.stringify($scope.containerLCL[index]));
        // nobj.editable = true;
        // nobj.aRecnum = '';
        // $scope.containerLCL.unshift(nobj);
    // }

    // $scope.cloneContainerAIR = function(index) {
        // // 
        // var nobj = JSON.parse(JSON.stringify($scope.containerAIR[index]));
        // nobj.editable = true;
        // nobj.aRecnum = '';
        // $scope.containerAIR.unshift(nobj);
    // }

    // $scope.excluirRowFCL = function(index) {
        // var cnt = $scope.containerFCL[index];

        // if (cnt.aRecnum == '') {
            // $scope.containerFCL.splice(index, 1);
        // } else {
            // buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'aRecnum=' + cnt.aRecnum).then(function(data) {

                // if (data.defaultMessage.hasError) {
                    // // toaster.pop('error', "Error", data.defaultMessage.msgError, null, 'trustedHtml');
                    // parent.parent.alertify.error(data.defaultMessage.msgError);
                // } else {
                    // // toaster.pop('success', "Success", (data.defaultMessage.msgInfo), null, 'trustedHtml');
                    // parent.parent.alertify.success(data.defaultMessage.msgInfo);
                // }

                // refreshTabelas();
                // $scope.Notify();
                // $scope.loadTotals();
            // });
        // }
    // }
    // $scope.excluirRowLCL = function(index) {
        // var cnt = $scope.containerLCL[index];
        // // debugger;
        // if (cnt.aRecnum == '') {
            // $scope.containerLCL.splice(index, 1);
        // } 
        // else {
            // buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'aRecnum=' + cnt.aRecnum).then(function(data) {
                // if (data.defaultMessage.hasError) {
                    // // toaster.pop('error', "Error", data.defaultMessage.msgError, null, 'trustedHtml');
                    // parent.parent.alertify.error(data.defaultMessage.msgError);
                // } else {
                    // // toaster.pop('success', "Success", (data.defaultMessage.msgInfo), null, 'trustedHtml');
                    // parent.parent.alertify.success(data.defaultMessage.msgInfo);
                // }
                // refreshTabelas();
            // });
        // }
    // }

    // $scope.excluirRowAIR = function(index) {
        // var cnt = $scope.containerAIR[index];
        // if (cnt.aRecnum == '') {
            // $scope.containerAIR.splice(index, 1);
        // } else {
            // buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'aRecnum=' + cnt.aRecnum).then(function(data) {

                // if (data.defaultMessage.hasError) {
                    // // toaster.pop('error', "Error", data.defaultMessage.msgError, null, 'trustedHtml');
                    // parent.parent.alertify.error(data.defaultMessage.msgError);
                // } else {
                    // // toaster.pop('success', "Success", (data.defaultMessage.msgInfo), null, 'trustedHtml');
                    // parent.parent.alertify.success(data.defaultMessage.msgInfo);
                // }
                // refreshTabelas();
            // });
        // }

    // }

    // var createNullMercadoria = function () {
        // var mercado = {};
        // mercado.mercadoria = '';
        // mercado.descricao = '';
        // mercado.ncm = '';
        // mercado.un = '';
        // mercado.class = '';
        // mercado.pkg = '';
        // mercado.subrisk = '';
        // mercado.editable = true;
        // return mercado;
    // }
    // var createNullContainer = function() {
        // var ncontainer = {};
        // ncontainer.arr_hz = {};
        // ncontainer.arr_hz.package = {};
        // ncontainer.recnum = '';
        // ncontainer.aRecnum = '';
        // ncontainer.modalidade = '';
        // ncontainer.pcs = 1;
        // ncontainer.package = '';
        // ncontainer.weight = '';
        // ncontainer.length = '';
        // ncontainer.width = '';
        // ncontainer.equipamento = '';
        // ncontainer.height = '';
        // ncontainer.total = {};
        // ncontainer.total.weight = '';
        // ncontainer.total.volume = '';
        // ncontainer.volume = '';
        // ncontainer.unitvolume = '';
        // ncontainer.total.volumeUnit = 'CBM';
        // ncontainer.editable = true;
        // ncontainer.aHaz_Fl = '';
        // ncontainer.aHaz_Temp = '';

        // ncontainer.arr_hz.Origin = '';
        // ncontainer.arr_hz.bagagem = '0';
        // ncontainer.arr_hz.classimo = '';
        // ncontainer.arr_hz.consAnimal = '0';
        // ncontainer.arr_hz.consHumano = '0';
        // ncontainer.arr_hz.imo = '0';
        // ncontainer.arr_hz.lift = '';
        // ncontainer.arr_hz.limited = 'N';
        // ncontainer.arr_hz.mercadorias = [];
        // ncontainer.arr_hz.nempilhavel = '0';
        // ncontainer.arr_hz.shipperctnr = '0';
        // ncontainer.arr_hz.outros = '0';
        // ncontainer.arr_hz.outrosTxt = '';
        // ncontainer.arr_hz.over = '';
        // ncontainer.arr_hz.package.ID = '';
        // ncontainer.arr_hz.package.DS = '';
        // ncontainer.arr_hz.packing = '';
        // ncontainer.arr_hz.personnal = 'N';
        // ncontainer.arr_hz.pkg = '';
        // ncontainer.arr_hz.residential = 'N';
        // ncontainer.arr_hz.subclassimo = '';
        // ncontainer.arr_hz.un = '';
        // ncontainer.arr_hz.unitFlash = '';

        // ncontainer.unitweight = 'KG';
        // ncontainer.UOM = 'CM';
        // ncontainer.total.grossUnit = 'KG';
        // ncontainer.total.volumeUnit = 'CBM';
        // return ncontainer;
    // }

    // var refreshTabelas = function() {
        
        // buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_lista/JSON', 'aProposta=' + $scope.proposta.idProposta).then(function(data) {
            // $scope.containerFCL = [];
            // $scope.containerLCL = [];
            // $scope.containerAIR = [];
            // debugger;
            // posicionaTabelas(data);
            
            // data.forEach(function(oItem) {
                // oItem.recnum = oItem.srecum;
                // delete oItem.srecum;
                // // oItem.haz = oItem.arr_hz;
                // // delete oItem.arr_hz;
                // // oItem.haz.class = oItem.haz.sclass;
                // // delete oItem.haz.sclass;
                // $scope.lsItems[oItem.modalidade].push(angular.copy(oItem));
            // });
        // });

    // }
    
    // $scope.stMercadoria = {};

    // $scope.addMercadoria = function() {
        // $scope.stMercadoria.unshift(createNullMercadoria());
        // $scope.lockNewMercadoria = true;
    // }

    // $scope.addContainerFCL = function() {
        // $scope.containerFCL.unshift(createNullContainer());
        // $scope.lockNewFCL = true;
    // }

    // $scope.addContainerLCL = function() {
        // $scope.containerLCL.unshift(createNullContainer());
        // $scope.lockNewLCL = true;
    // }

    // $scope.addContainerAIR = function() {
        // $scope.containerAIR.unshift(createNullContainer());
        // $scope.lockNewAIR = true;
    // }

    // $scope.fnChangeDate = function() {

        // parametros = 'dValidade=' + $scope.proposta.validadeDe;
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_validade/JSON', parametros).then(function(data) {

            // $scope.proposta.validadeAte = data;
        // });

    // }

    // $scope.hideAbaixo = true;

    // // AutoComplete de Clientes
    // $scope.acClientes = function(texto) {
        // return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/f_proposta_complete_client/JSON', 'sInicio=' + texto).then(function(data) {
            // return data;
        // });
    // };

    // $scope.btnSalvar = function(oProposta) {
        // //Marca
        // if (oProposta.marca == '' || oProposta.marca == undefined) {

            // // toaster.pop('error', "Error", 'Proposta sem MARCA!', null, 'trustedHtml');
            // parent.parent.alertify.error('Proposta sem MARCA!');
            // return;
        // }
        // //TIPO OPERACAO
        // if (oProposta.operacao == '' || oProposta.operacao == undefined) {

            // // toaster.pop('error', "Error", 'Proposta sem OPERACAO!', null, 'trustedHtml');
            // parent.parent.alertify.error('Proposta sem OPERACAO!');
            // return;
        // }

        // //MODALIDADE
        // if (oProposta.modalidades == '' || oProposta.modalidades == undefined) {

            // // toaster.pop('error', "Error", 'Proposta sem MODALIDADE DO FRETE!', null, 'trustedHtml');
            // parent.parent.alertify.error('Proposta sem MODALIDADE DO FRETE!');
            // return;
        // }

        // //INCOTERM
        // if (oProposta.incoterm == '' || oProposta.incoterm == undefined) {

            // // toaster.pop('error', "Error", 'Proposta sem INCOTERM!', null, 'trustedHtml');
            // parent.parent.alertify.error('Proposta sem INCOTERM!');
            // return;
        // }
        // //EMBARQUE
        // if (oProposta.embarque == '' || oProposta.embarque == undefined) {

            // // toaster.pop('error', "Error", 'Proposta sem EMBARQUE!', null, 'trustedHtml');
            // parent.parent.alertify.error('Proposta sem EMBARQUE!');
            // return;
        // } else {
            // //DOOR-DOOR
            // if (oProposta.embarque === '4') {
                // if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisDestino == '' ||
                    // oProposta.cidadeDestino == '' || oProposta.cepOrigem == '' || oProposta.cepDestino == '') {
                    // // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    // parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    // return;
                // }
            // }
            // //DOOR-PORT
            // if (oProposta.embarque === '3') {
                // if (oProposta.paisOrigem == '' || oProposta.cidadeOrigem == '' || oProposta.paisPod == '' ||
                    // oProposta.pod == '' || oProposta.cepOrigem == '') {
                    // // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    // parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    // return;
                // }
            // }
            // //PORT-PORT
            // if (oProposta.embarque === '1') {
                // if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisPod == '' || oProposta.pod == '') {
                    // // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    // parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    // return;
                // }
            // }
            // //PORT-DOOR
            // if (oProposta.embarque === '2') {
                // if (oProposta.paisPol == '' || oProposta.pol == '' || oProposta.paisDestino == '' ||
                    // oProposta.cidadeDestino == '' || oProposta.cepDestino == '') {
                    // // toaster.pop('error', "Error", 'Proposta sem os requisitos minimos!', null, 'trustedHtml');
                    // parent.parent.alertify.error('Proposta sem os requisitos minimos!');
                    // return;
                // }
            // }
        // }
        
        // if (oProposta.pod != '' && oProposta.pol != '') { //&& $scope.lsVia.length > 1
            // if (oProposta.VIA == '') {
                // // toaster.pop('error', "Error", 'Selecione um VIA!', null, 'trustedHtml');
                // parent.parent.alertify.error('Selecione um VIA!');
                // return;
            // }
        // }
        // $scope.loadingState = true;
        // var aux = angular.copy(oProposta);

        // aux.sMercadoria = oProposta.sMercadoria;

        // if (oProposta.carrier !== '' && oProposta.carrier !== undefined) { aux.carrier = oProposta.carrier.id; } else { aux.carrier = ''; }
        // // 
        // aux.sStatus = oProposta.sStatus;

        // //--- Comentarios.
        // aux.sCommons = oProposta.sCommons;
        // aux.sCust_Ref = oProposta.sCust_Ref;
        // aux.sInt_Ref = oProposta.sInt_Ref;
        // aux.sCust_Inst = oProposta.sCust_Inst;

        // //--- PERMISSAO
        // aux.permissao = $scope.permissao;

        // aux.produtos = "";
        // aux.modalidades = oProposta.modalidades;

        // if (!angular.isUndefined(oProposta.pol)) {
            // if (oProposta.pol !== '') {
                // aux.pol = oProposta.pol.id;
            // }
        // }
        // if (!angular.isUndefined(oProposta.pod)) {
            // if (oProposta.pod !== '') {
                // aux.pod = oProposta.pod.id;
            // }
        // }

        // aux.via = oProposta.VIA;

        // //--- CARACTERISTICAS DE FRETE
        // // aux.caracteristicasFrete = "";

        // // if (!angular.isUndefined(oProposta.caracteristicasFrete)) {
        // //     oProposta.caracteristicasFrete.forEach(function(item) {
        // //         aux.caracteristicasFrete += item + ",";
        // //     });

        // //     aux.caracteristicasFrete = aux.caracteristicasFrete.substring(0, aux.caracteristicasFrete.length - 1);
        // // }

        // if (!angular.isUndefined(oProposta.cidadeOrigem)) {
            // if (oProposta.cidadeOrigem != '') {
                // aux.cidadeOrigem = oProposta.cidadeOrigem.id;
            // }
        // }
        // if (!angular.isUndefined(oProposta.cidadeDestino)) {
            // if (oProposta.cidadeDestino != '') {
                // aux.cidadeDestino = oProposta.cidadeDestino.id;
            // }
        // }

        // aux.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        // aux.cliente = getVariavelURL('idCliente');
        // // aux.validadeDe = aux.validadeDe;
        // // aux.validadeAte = aux.validadeAte;

        // if ((aux.incoterm == 'EXW' || aux.incoterm == 'FCA' || aux.incoterm == 'DAP' || aux.incoterm == 'DDP') && aux.paisDestino == "" && aux.paidPod) {
            // return parent.parent.alertify.error("Selecione um pais de destino");
        // }

        // // aux.aOversize = "";

        // $scope.hideAbaixo = false;
        // aux.motivoCancelamento = $scope.proposta.motivoCancelamento;
        // idProposta = $scope.proposta.idProposta;
        // if (idProposta != false)
            // aux.idProposta = idProposta;
        // else
            // aux.idProposta = '';

        // $scope.parametros300401 = aux;

        // var params = { 'sJSON': aux }

        // callWS.get('/WVDF_WS/ws_hcgs3004.wso/fGravarHCGS3004/JSON', params).then(function(response) {
            // $scope.showVendedorCombo = false;

            // if (!response.data.defaultMessage.hasError) {
                // if ($scope.proposta.vendedor.DS == undefined) {} else {
                    // $scope.proposta.vendedor = $scope.proposta.vendedor.DS;
                // }
                
                // $scope.proposta.idProposta = response.data.idProposta;
                // if (idProposta==0) {idProposta = response.data.idProposta;}
                // $scope.Notify();

                // // toaster.pop('success', "Success", (response.data.defaultMessage.msgInfo), null, 'trustedHtml');
                // parent.parent.alertify.success(response.data.defaultMessage.msgInfo);
                
                
                // $scope.getMessages();
                // loadProposta();           
                // $scope.hideAbaixo = false;     

            // } else {
                // // toaster.pop('error', "Error", (response.data.defaultMessage.msgError), null, 'trustedHtml');
                // parent.parent.alertify.error(response.data.defaultMessage.msgError);
            // }
            // $scope.loadingState = false;
        // });
    // };

    // $scope.btnVoltar = function() {
        // aux = {}
        // aux.cliente = 0;
        // aux.proposta = $scope.proposta.idProposta;
        // var url = '';

        // if (getVariavelURL('idCliente').length > 0) {
            // aux.cliente = getVariavelURL('idCliente');
            // url = "PCGS3004_06.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idVendedor=" + getVariavelURL('idVendedor') + "&idCliente=" + aux.cliente + "&idProposta=" + aux.proposta;
        // } else {
            // url = "PCGS3004_00.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
        // }
        // window.location = url;
    // };

    // $scope.checkItem = function(id) {
        // var checked = false;
        // if (id == 1)
            // checked = true;

        // return checked;
    // };

    // $scope.checkItemCarrier = function(id) {
        // var checked = false;
        // if (id == 1)
            // checked = true;

        // return checked;
    // };

    // function arrayObjectIndexOf(arr, obj) {
        // for (var i = 0; i < arr.length; i++) {
            // if (angular.equals(arr[i], obj)) {
                // return i;
            // }
        // };
        // return -1;
    // }

    // $scope.setNgTables = function() {
        // for (var i = 0; i < $scope.lsAplicar.length; i++) {
            // $scope.tabledata[i] = {};
            // $scope.tabledata[i].tableParamsOrigem = $filter('filter')($scope.lsAplicar[i].arr_ptx, { 'aClass': 'O' });
            // $scope.tabledata[i].tableParamsFrete = $filter('filter')($scope.lsAplicar[i].arr_ptx, { 'aClass': 'F' });
            // $scope.tabledata[i].tableParamsDestino = $filter('filter')($scope.lsAplicar[i].arr_ptx, { 'aClass': 'D' });

        // }

        // for (var i = $scope.tabledata[0].tableParamsOrigem.length - 1; i >= 0; i--) {

            // if ($scope.tabledata[0].tableParamsOrigem[i].aStatus == 1)
                // $scope.tabledata[0].tableParamsOrigem[i].aStatus = true;
            // else
                // $scope.tabledata[0].tableParamsOrigem[i].aStatus = false;
        // }

        // for (var i = $scope.tabledata[0].tableParamsFrete.length - 1; i >= 0; i--) {

            // if ($scope.tabledata[0].tableParamsFrete[i].aStatus == 1)
                // $scope.tabledata[0].tableParamsFrete[i].aStatus = true;
            // else
                // $scope.tabledata[0].tableParamsFrete[i].aStatus = false;
        // }

        // for (var i = $scope.tabledata[0].tableParamsDestino.length - 1; i >= 0; i--) {

            // if ($scope.tabledata[0].tableParamsDestino[i].aStatus == 1)
                // $scope.tabledata[0].tableParamsDestino[i].aStatus = true;
            // else
                // $scope.tabledata[0].tableParamsDestino[i].aStatus = false;
        // }

        // if ($scope.tabledata[0].tableParamsDestino.length !== 0) { $scope.acordeonDestino = true; }
        // if ($scope.tabledata[0].tableParamsOrigem.length !== 0) { $scope.acordeonOrigem = true; }
        // if ($scope.tabledata[0].tableParamsFrete.length !== 0) { $scope.acordeonFrete = true; }

    // };

    // var getTaxas = function() {
        // // 
        // var params = {
            // 'aClasse': 'O'
        // };
        // callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params).then(function(response) {
            // $scope.lsTaxasO = response.data;
        // });

        // params = {
            // 'aClasse': 'F'
        // };
        // callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params).then(function(response) {
            // $scope.lsTaxasF = response.data;
        // });

        // params = {
            // 'aClasse': 'D'
        // };
        // callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params).then(function(response) {
            // $scope.lsTaxasD = response.data;

        // });
        // params = {
            // 'aClasse': ''
        // }
        // // callWS.get('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params).then(function(response) {
        // //     $scope.lsTaxas = response.data;

        // // });
        // $scope.loadingState = false;
    // };

    // // ALIMENTA PRINCIPAL DO ARRAY DA COMISSAO
    // $scope.getTaxas_Comissao_Array = function(aClasse) {
        // $scope.loadingState = true;
        // params = {
            // 'aClasse': aClasse,
            // 'aProp':$scope.proposta.idProposta
        // }
        // callWS.get('/WVDF_WS/ws_HCGS3001.wso/taxas_tarifarioxproposta/JSON', params).then(function(response) {
            
            // $scope.lsTaxasComissao = response.data;
            // $scope.lsTaxas = response.data;
            // $scope.loadingState = false;
        // });
    // }

    // function setDefaultVal(value, defaultValue) {
        // return (value === undefined) ? defaultValue : value;
    // }

    // //BOOKING FUNCTIONS
    // //salva os detalhes avancados da carga
    // $scope.btnSaveDetAvancado = function (detalhes) {
        // debugger;
        // var parametros = {};
        // parametros = detalhes;
        // parametros.aUsuarioSessao = aUsuarioSessao;
        // parametros.sPropostaId  = idProposta;
        // var param = { 'sJSON': parametros };

        // $http({
            // url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_advanced/JSON',
            // method: 'GET',
            // params: param
        // }).success(function(data) {
            // $scope.loadingState = false;
            // refreshTabelas();
            // // $scope.btnRefreshInfo();
        // });


    // }
    // //ALIMENTA O SCHEDULE
    // $scope.fScheduleBook = function() {
        // $scope.SchdMtg = []; //SCHEDULE MONTAGEM
        // debugger;
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fMontaSchedule/JSON', 'aProposta='+idProposta).then(function(data) {
            // debugger;
            // $scope.SchdMtg = data;

            // if (data.truck == 1)
            // {   
                // //http://192.168.6.23/api/Netship/BRA/ScheduleTruck/10/10/2018-04-18
                // //GET /Netship/{database}/ScheduleTruck/{tOrig}/{tDest}/{dtSaida}
                // // debugger;
                // var url = $scope.CRMURL+'api/Netship/BRA/ScheduleTruck/'+$scope.SchdMtg.terminal_origem+'/'+$scope.SchdMtg.terminal_destino;
                // url = url+'/'+$scope.SchdMtg.data;
                // url = url.replace(/'/g,"");    
                // $http({
                    // method: 'GET',
                    // url: url,
                    // // data : jsonEditProp
                // }).then(function success(response) {
                    // console.log('sucess', response);
                    // // debugger;
                    // $scope.lsScheduleTruck = response.data;
    
                // }, function error(response) {
                    // // debugger;
                    // console.log('error', response);
                    // parent.parent.alertify.error('Schedule nao encontrado!');
    
                // });
            // }

            // if (data.truck == 0) 
            // {
                // var url = $scope.CRMURL+'api/cross/Schedule/'+$scope.SchdMtg.pol+'/'+$scope.SchdMtg.pod+'/'+$scope.SchdMtg.via+'/LCL';//+$scope.SchdMtg.modalidade
                // url = url+'/'+$scope.SchdMtg.data;
                // url = url.replace(/'/g,"");    
                // $http({
                    // method: 'GET',
                    // url: url,
                    // // data : jsonEditProp
                // }).then(function success(response) {
                    // console.log('sucess', response);
                    // // debugger;
                    // $scope.lsSchedule = response.data;
    
                // }, function error(response) {
                    // // debugger;
                    // console.log('error', response);
                    // parent.parent.alertify.error('Schedule nao encontrado!');
    
                // });
            // }
        // });

    // };

    // $scope.fScheduleTruckSelect = function(array) {
        
        // $scope.loadingState = true;
        // array.sBookingId = idAprovado;
        // array.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        // var parametros = {};
        // parametros = array;
        // var param = { 'sJSON': parametros };
        // debugger;
        // $http({
            // url: '/WVDF_WS/ws_hsag563.wso/fSaveSchedTruck/JSON',
            // method: 'GET',
            // params: param
        // }).success(function(data) {
            // $scope.lsSchedule = [];
            // parent.parent.alertify.success('Schedule (Truck) Selecionado!');
            // $scope.loadingState = false;
            // debugger;
            // $scope.scheduleTruck = data;

            // var today = data.dataChegada;
            // // var today = ;
            // var dd = today.substr(0,2);
            // var mm = today.substr(3,2);
            // var yyyy = today.substr(6,4);

            // // if (dd < 10) {
            // //     dd = '0' + dd
            // // }

            // // if (mm < 10) {
            // //     mm = '0' + mm
            // // }

            // today = yyyy + '-' + mm + '-' + dd;

            // var url = $scope.CRMURL+'api/cross/Schedule/'+$scope.SchdMtg.pol+'/'+$scope.SchdMtg.pod+'/'+$scope.SchdMtg.via+'/LCL';//$scope.SchdMtg.modalidade
            // url = url+'/'+today;
            // // url = url.replace(/'/g,"");    
            // $http({
            // method: 'GET',
            // url: url,
            // // data : jsonEditProp
            // }).then(function success(response) {
                // console.log('sucess', response);
                // debugger;
                // $scope.lsSchedule = response.data;

            // }, function error(response) {
                // debugger;
                // console.log('error', response);
                // parent.parent.alertify.error('Schedule nao encontrado!');

            // });

        // });

    // };

    // $scope.fScheduleSelect = function(array) {
        
        // $scope.loadingState = true;
        // array.sBookingId = idAprovado;
        // array.propostaId = $scope.proposta.idProposta;
        // array.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        // var parametros = {};
        // parametros = array;
        // var param = { 'sJSON': parametros };
        
        // $http({
            // url: '/WVDF_WS/ws_hsag561.wso/fSaveSched/JSON',
            // method: 'GET',
            // params: param
        // }).success(function(data) {
            
            // parent.parent.alertify.success('Schedule (Navio) Selecionado!');
            // $scope.loadingState = false;
            // // debugger;
            // $scope.schedule = data;

            // $scope.Booking.deadLineImo  = data.dlimo;
            // $scope.Booking.deadLineDTA  = data.dldta;
            // $scope.Booking.deadLineCG   = data.dl;
            // $scope.Booking.prevSaida    = data.prev;
        // });

    // }

    // //Save Contatos
    // $scope.btnSaveAuxContact = function(row,tipo) {

        // row.sTipo = tipo;
        // // row.sEmpresa = row.sEmpresa.ID;
        // debugger;
        // $scope.btnAddContact(row);
        // row.editable = false;

        // if (tipo == "O") {
            // $scope.lockContactOrigem = false;
        // } 
        // if (tipo == "D") {
            // $scope.lockContactDestino = false;
        // }
    // }

    // $scope.btnSaveMercadoria = function(row) {

        // $scope.lockNewMercadoria = false;
        // row.editable = false;
        // $scope.loadingState = true;

        // if (row.mercadoria == '' ) {
            // $scope.loadingState = false;
            // parent.parent.alertify.error('Mercadoria invalida!');
            // return;
        // }
        // if (row.ncm == '' ) {
            // $scope.loadingState = false;
            // parent.parent.alertify.error('NCM invalido!');
            // return;
        // }

        // var parametros = {};
        // parametros = row;
        // parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        // parametros.sPropostaId = idProposta;
        // parametros.imo = $scope.Detalhes.imo;
        
        // var param = { 'sJSON': parametros };
        // debugger;
        // $http({
            // url: '/WVDF_WS/ws_hsag560.wso/fSaveMercadoria/JSON',
            // method: 'GET',
            // params: param
        // }).success(function(data) {
            // // $scope.refreshContatos(data);
            // $scope.loadingState = false;
        // });
    // }

    // $scope.btnAddContact = function(entrada) {
        
        // $scope.loadingState = true;
        // debugger;
        // if (entrada.sEmpresa == '' ) {
            // $scope.loadingState = false;
            // parent.parent.alertify.error('Empresa invalida!');
            // return;
        // }
        // if (entrada.sNome == '' ) {
            // $scope.loadingState = false;
            // parent.parent.alertify.error('Nome invalido!');
            // return;
        // }
        // if (entrada.sEmail == '') {
            // $scope.loadingState = false;
            // parent.parent.alertify.error('E-mail invalida!');
            // return;
        // }
        // if (entrada.sTel == '' ) {
            // $scope.loadingState = false;
            // parent.parent.alertify.error('Telefone invalida!');
            // return;
        // }

        // var parametros = {};
        // parametros = entrada;
        // parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        // parametros.sBookingId = idAprovado;
        
        // // parametros.srecnum = entrada.aRecnum;
        // // parametros.sEmpresa = entrada.sEmpresa;
        // // parametros.sTipo = entrada.sTipo;
        // // parametros.sNome = entrada.sNome;
        // // parametros.sTel = entrada.sTel;
        // // parametros.sEmail = entrada.sEmail;

        // var param = { 'sJSON': parametros };
        
        // $http({
            // url: '/WVDF_WS/ws_hsag559.wso/fSvContatoBook/JSON',
            // method: 'GET',
            // params: param
        // }).success(function(data) {
            // $scope.refreshContatos(data);
            // $scope.loadingState = false;
        // });
    // };

    // $scope.BtnDelContact = function(row,tipo) {
        // debugger;
        // buscaWS.get('/WVDF_WS/ws_hsag559.wso/fDlContatoBook/JSON', 'sRecnum='+row.sRecnum+'&sTipo='+tipo).then(function(data) {
            // $scope.refreshContatos(data);
            // parent.parent.alertify.success('Contato Deletado!');
        // });
    // }

    // $scope.refreshContatos = function(tipo) {
        // if (tipo == 'O') 
        // {
            // buscaWS.get('/WVDF_WS/ws_hsag562.wso/fEmpresasBookingCombo/JSON', "sBookingId="+idAprovado+'&sTipo=O').then(function(data) {
                // // debugger;
                // $scope.lsEmpresaOrigem = data;
                // buscaWS.get('/WVDF_WS/ws_hsag559.wso/fListaContatBook/JSON', "sBookingId="+idAprovado+'&sTipo='+tipo).then(function(data) {
                    // // debugger;
                    // $scope.ContactOrigem = data;
                // });
            // });
        // }

        // if (tipo == 'D')
        // {
            // buscaWS.get('/WVDF_WS/ws_hsag559.wso/fListaContatBook/JSON', "sBookingId="+idAprovado+'&sTipo='+tipo).then(function(data) {
                // $scope.ContactDestino = data;
                // // buscaWS.get('/WVDF_WS/ws_hsag562.wso/fEmpresasBookingCombo/JSON', "sBookingId="+idAprovado+'&sTipo=D').then(function(data) {
                // //     $scope.lsEmpresaDestino = data;
                // // });
            // });
        // }
    // }
    // $scope.fChangeCustServ = function() {
        // if ($scope.Booking.custserv !== '0' && $scope.Booking.custserv !== undefined) 
        // {
            // var valor = $scope.Booking.custserv; 
            // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_CustServ/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {
                
                // parent.parent.alertify.success('Customer Salvo!');
            // });
        // }
    // }

    // $scope.fContatoAberto = function(tipo) {

        // if (tipo == 'N') {var cod = $scope.Booking.Notify_id;}
        // if (tipo == 'C') {var cod = $scope.Booking.Cnee_id;}
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fSaveOneContact/JSON', 'sBookingId='+idAprovado+'&sTipo='+tipo+'&aPessoa='+cod).then(function(data) {            
            // parent.parent.alertify.success('Salvo!');
        // });

    // }
    // //----------------------------------------------------------------------------------------
    // //----------------------------- NOVAS ------------------------------------
    // //PREVISAO DE SAIDA
    // $scope.fChangePrevSaida = function() {
        // var valor = $scope.Booking.prevSaida; 
        
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_PrevSaida/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {
            
            // parent.parent.alertify.success('Previsao de Saida Salvo!');
        // });
    // }

    // $scope.fRetorno_Check = function() {
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fRetornoMsg/JSON', 'aProp='+$scope.proposta.idProposta).then(function(data) {
            
            // if (data.ID !=='0') parent.parent.alertify.success('Retorno ativado: '+ data.DS);
            // else parent.parent.alertify.success('Retorno desativado!');
        // });
    // }

    // //------------------------------ FIM NOVAS
    // //-----------------------------------------------------------------------------------
    // $scope.fChangeClienteHBL = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ClienteHBL/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
        
        // });
    // }
    // $scope.fChangePartLote = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_PartLote/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {
        // });
    // }
    // $scope.fChangeLocalHBL = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_LocalHBL/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {
        // });
    // }
    // $scope.fChangeVendaOD = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_VendaOD/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {
        // });
    // }
    // $scope.fChangeReserva = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_Reserva/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {
        // });
    // }
    // $scope.fChangeHBL = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_HBL/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {
        // });
    // }
    // //CONTROLE ENTRE OS CAMPOS TAGS
    // $scope.addTag = function(tag, campo) {
        // // console.log(tag);
        // // debugger;
        // if (campo === "Shipper") {
            // if ($scope.Booking.Shipper_id == '') {$scope.Booking.Shipper_id = tag.idCliente+'|';}
            // else {$scope.Booking.Shipper_id = $scope.Booking.Shipper_id+tag.idCliente+'|';}
            // // $('#selstart7').appendVal("," + tag.idCliente);           
            // buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId="+idAprovado+'&sPessoa='+tag.idCliente+'&sTipo=S').then(function(data) {});
        // }

        // if (campo === "Forwarder") {
            // if ($scope.Booking.Forwarder_id == '') {$scope.Booking.Forwarder_id = tag.idCliente+'|';}
            // else {$scope.Booking.Forwarder_id = $scope.Booking.Forwarder_id+tag.idCliente+'|';}
            // // $('#selstart20').appendVal("," + tag.idCliente);     
            // buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId="+idAprovado+'&sPessoa='+tag.idCliente+'&sTipo=F').then(function(data) {});       
        // }

        // if (campo === "Despachante") {
            // if ($scope.Booking.Despachante_id == '') {$scope.Booking.Despachante_id = tag.idCliente+'|';}
            // else {$scope.Booking.Despachante_id = $scope.Booking.Despachante_id+tag.idCliente+'|';}
            // // $('#selstart19').appendVal("," + tag.idCliente);
            // buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId="+idAprovado+'&sPessoa='+tag.idCliente+'&sTipo=D').then(function(data) {});            
        // }

        // if (campo === "Cnee") {
            // if ($scope.Booking.Cnee_id == '') {$scope.Booking.Cnee_id = tag.idCliente+'|';}
            // else {$scope.Booking.Cnee_id = $scope.Booking.Cnee_id+tag.idCliente+'|';}
            // // $('#selstart8').appendVal("," + tag.idCliente);
            // buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId="+idAprovado+'&sPessoa='+tag.idCliente+'&sTipo=C').then(function(data) {});
        // }

        // if (campo === "Notify") {
            // if ($scope.Booking.Notify_id == '') {$scope.Booking.Notify_id = tag.idCliente+'|';}
            // else {$scope.Booking.Notify_id = $scope.Booking.Notify_id+tag.idCliente+'|';}
            // // $('#selstart21').appendVal("," + tag.idCliente);
            // buscaWS.get('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', "sBookingId="+idAprovado+'&sPessoa='+tag.idCliente+'&sTipo=N').then(function(data) {});
        // }
    // }; // -- FIM TAG ADDED
    // $scope.tagRemoved = function(tag, campo) {
        // // debugger;
        // if (campo === "Shipper") {
            // var replac = $scope.Booking.Shipper_id;
            // var subts = replac.replace((tag.id+'|') , "");
            // $scope.Booking.Shipper_id = subts;
            // buscaWS.get('/WVDF_WS/ws_hsag562.wso/pDLContatoBook_external/JSON', "sBookingId="+idAprovado+'&sPessoa='+tag.idCliente+'&sTipo=S').then(function(data) {});
        // }

        // if (campo === "Forwarder") {
            // var replac = $scope.Booking.Forwarder_id;
            // var subts = replac.replace((tag.id+'|') , "");
            // $scope.Booking.Forwarder_id = subts;
            // buscaWS.get('/WVDF_WS/ws_hsag562.wso/pDLContatoBook_external/JSON', "sBookingId="+idAprovado+'&sPessoa='+tag.idCliente+'&sTipo=F').then(function(data) {});
        // }

        // if (campo === "Despachante") {
            // var replac = $scope.Booking.Despachante_id;
            // var subts = replac.replace((tag.id+'|') , "");
            // $scope.Booking.Despachante_id = subts;  
            // buscaWS.get('/WVDF_WS/ws_hsag562.wso/pDLContatoBook_external/JSON', "sBookingId="+idAprovado+'&sPessoa='+tag.idCliente+'&sTipo=D').then(function(data) {});          
        // }

        // if (campo === "Cnee") {
            // var replac = $scope.Booking.Cnee_id;
            // var subts = replac.replace((tag.id+'|') , "");
            // $scope.Booking.Cnee_id = subts;
            // buscaWS.get('/WVDF_WS/ws_hsag562.wso/pDLContatoBook_external/JSON', "sBookingId="+idAprovado+'&sPessoa='+tag.idCliente+'&sTipo=C').then(function(data) {});
        // }

        // if (campo === "Notify") {
            // var replac = $scope.Booking.Notify_id;
            // var subts = replac.replace((tag.id+'|') , "");
            // $scope.Booking.Notify_id = subts;
            // buscaWS.get('/WVDF_WS/ws_hsag562.wso/pDLContatoBook_external/JSON', "sBookingId="+idAprovado+'&sPessoa='+tag.idCliente+'&sTipo=N').then(function(data) {});
            
        // }
    // };// -- FIM TAG REMOVED

    // // Modal de Shippers
    // function fListaShippers() {
        // $scope.loadingState = true
        // buscaWS.get('/WVDF_WS/ws_hsag559.wso/fListaShipperBook/JSON', "sBookingId="+idAprovado).then(function(data) {
            
            // $scope.lsShipper = data;
            // $scope.loadingState = false;
        // });
    // }

    // $scope.addContLclExpBook = function() {
        // $scope.containerLclExpoBook.unshift(createNullContainer());
        // $scope.containerLclExpoBook[0].unitweight = 'KG';
        // $scope.containerLclExpoBook[0].UOM = 'CM';
        // $scope.containerLclExpoBook[0].total.grossUnit = 'KG';
        // $scope.containerLclExpoBook[0].total.volumeUnit = 'CBM';
        // $scope.lockNewBookLCL = true;
    // }

    // $scope.addNewOrigemContact = function() {
        
        // $scope.ContactOrigem.unshift(createNullContact());
        // $scope.lockContactOrigem = true;
    // }

    // $scope.addNewDestinoContact = function() {
        // $scope.ContactDestino.unshift(createNullContact());
        // $scope.lockContactDestino = true;
    // }

    // var createNullContact = function() {
        // var ncontact = {};
        // ncontact.recnum = '';
        // ncontact.empresa = '';
        // ncontact.tipo = '';
        // ncontact.nome = '';
        // ncontact.tel = '';
        // ncontact.email = '';
        // ncontact.editable = 'true';
        // return ncontact;
    // }

    // $scope.ContactDestino = [];
    // $scope.ContactOrigem = [];

    // $scope.fDetalhesAvancados = function (row)
    // {
        // debugger;
        // $scope.Detalhes = row.arr_hz;
        // $scope.Detalhes.sRecnum = row.aRecnum;

        // $scope.stMercadoria = row.st_mercadorias;
        // $scope.stMercadoria.srecnum_05 = row.aRecnum;

        // if (row.arr_hz.imo == '1') $scope.Detalhes.imo = true;
        // else  $scope.Detalhes.imo = false;

        // if (row.arr_hz.nempilhavel == '1') $scope.Detalhes.nempilhavel = true;
        // else  $scope.Detalhes.nempilhavel = false;

        // if (row.arr_hz.shipperctnr == '1') $scope.Detalhes.shipperctnr = true;
        // else $scope.Detalhes.shipperctnr = false;

        // if (row.arr_hz.bagagem == '1') $scope.Detalhes.bagagem = true;
        // else  $scope.Detalhes.bagagem = false;

        // if (row.arr_hz.consHumano == '1') $scope.Detalhes.consHumano = true;
        // else  $scope.Detalhes.consHumano = false;

        // if (row.arr_hz.consAnimal == '1') $scope.Detalhes.consAnimal = true;
        // else  $scope.Detalhes.consAnimal = false;

        // if (row.arr_hz.outros == '1') $scope.Detalhes.outros = true;
        // else  $scope.Detalhes.outros = false;
    // }

    // $scope.fDetalhesAvancadosProp = function (row,tipo)
    // {
        // debugger;

        // $scope.Detalhes = row.arr_hz;
        
        // $scope.Detalhes.pcs = row.pcs;
        // $scope.Detalhes.grossUnit = row.total.grossUnit;
        // $scope.Detalhes.weight  = row.total.weight;

        // $scope.Detalhes.volume = row.total.volume;
        // $scope.Detalhes.volumeUnit = row.total.volumeUnit;
        // $scope.stMercadoria = row.st_mercadorias;
        
        // if (tipo == 'LCL')  var index = $scope.containerLCL.indexOf(row);
        // if (tipo == 'FCL') {
           // var index = $scope.containerFCL.indexOf(row); 
           // $scope.Detalhes.equipamento = row.equipamento.DS;
       // }  

        // $scope.Detalhes.Origin = index;
        // if (row.arr_hz.imo == '1') $scope.Detalhes.imo = true;
        // else  $scope.Detalhes.imo = false;

        // if (row.arr_hz.nempilhavel == '1') $scope.Detalhes.nempilhavel = true;
        // else  $scope.Detalhes.nempilhavel = false;

        // if (row.arr_hz.bagagem == '1') $scope.Detalhes.bagagem = true;
        // else  $scope.Detalhes.bagagem = false;

        // if (row.arr_hz.consHumano == '1') $scope.Detalhes.consHumano = true;
        // else  $scope.Detalhes.consHumano = false;

        // if (row.arr_hz.consAnimal == '1') $scope.Detalhes.consAnimal = true;
        // else  $scope.Detalhes.consAnimal = false;

        // if (row.arr_hz.outros == '1') $scope.Detalhes.outros = true;
        // else  $scope.Detalhes.outros = false;
    // }

    // $scope.fDetalhePropConclui = function () {
        // debugger;
        // // var row = $scope.containerLCL[$scope.Detalhes.Origin];
        // // row.arr_hz = $scope.Detalhes;
        // // $scope.Detalhes.sRecnum = row.aRecnum;
        
        // if ($scope.Detalhes.imo == true) $scope.Detalhes.imo = '1';
        // else  $scope.Detalhes.imo = '0';

        // if ($scope.Detalhes.nempilhavel == true)  $scope.Detalhes.nempilhavel = '1';
        // else  $scope.Detalhes.nempilhavel = '0';

        // if ($scope.Detalhes.bagagem == true) $scope.Detalhes.bagagem = '1';
        // else  $scope.Detalhes.bagagem = '0';

        // if ($scope.Detalhes.consHumano == true) $scope.Detalhes.consHumano = '1';
        // else  $scope.Detalhes.consHumano = '0';

        // if ($scope.Detalhes.consAnimal == true) $scope.Detalhes.consAnimal = '1';
        // else  $scope.Detalhes.consAnimal = '0';

        // if ($scope.Detalhes.outros == true) $scope.Detalhes.outros = '1';
        // else  $scope.Detalhes.outros = '0';

        // // $scope.containerLCL[$scope.Detalhes.Origin].arr_hz = $scope.Detalhes;
    // }

    // //alimenta os detalhes de CARGA BOOKING
    // $scope.fDetalhesCargaBooking = function () 
    // {
        // buscaWS.get('/WVDF_WS/ws_HCGS3005.wso/fListaDetNEdit/JSON', "sPropostaId="+idProposta).then(function(data) {
            // $scope.CargaBooking = data;
            // $scope.DetalhesBooking = data.detalhes;
            // $scope.fBookingTT();
        // });
    // }
    // //alimenta o Total mostrado abaixo dos Detalhes de Carga do Booking
    // $scope.fBookingTT = function () 
    // {
        // buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/fTxBookingTT/JSON', "sPropostaId="+idProposta).then(function(data) {
            // $scope.TT_BOOKING = data;
        // });
    // }

    // //alimenta o array do Booking, informacoes.
    // $scope.fBookingBusca = function () {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fInfoBooking/JSON', "sBookingId="+idAprovado).then(function(data) {
            // $scope.Booking = data;
            // $scope.Booking.BookingId = idAprovado;

            // $scope.CodBooking = data.CodBooking;
            // $scope.CodBooking_net = data.CodBooking_net;
            
            // $scope.Booking.Shipper_id       = data.sShipper;
            // $scope.Booking.Forwarder_id     = data.sForwarder;
            // $scope.Booking.Despachante_id   = data.sDespachante;
            // $scope.Booking.Cnee_id          = data.sCnee;
            // $scope.Booking.Notify_id        = data.sNotify;
            // // if (data.sVendaOrigem == '1') $scope.Booking.sVendaOrigem   = true;
            // // else $scope.Booking.sVendaOrigem   = false;
            // // if (data.sVendaDestino == '1') $scope.Booking.sVendaDestino   = true;
            // // else $scope.Booking.sVendaDestino   = false;
            // if (data.sClienteHBL == '1') $scope.Booking.sClienteHBL    = true;
            // else $scope.Booking.sClienteHBL   = false;
            // // if (data.sBlArmador == '1') $scope.Booking.sBlArmador    = true;
            // // else $scope.Booking.sBlArmador   = false;
            // // if (data.sPartLote == '1') $scope.Booking.sPartLote    = true;
            // // else $scope.Booking.sPartLote   = false;

            // // debugger;
            // //SCHEDULE LCL
            // if (data.schedule.armador !== '' && $scope.proposta.modalidades == 'LCL') $scope.schedule = data.schedule;
            // //SCHEDULE FCL
            // if ($scope.proposta.modalidades == 'FCL') {
                // $scope.schedule = data.schedule;
                // $scope.Consolidada_net = data.schedule.numeroConsolidada;
            // }
            // if (data.scheduleTruck.consolidadaTruck !== '') $scope.scheduleTruck = data.scheduleTruck;
            // // debugger;
            // $scope.Booking.deadLineImo  = data.schedule.dlimo; 
            // $scope.Booking.deadLineDTA  = data.schedule.dldta;
            // $scope.Booking.deadLineCG   = data.schedule.dl;
            // $scope.Booking.prevSaida    = data.schedule.prev;

            // //alimenta Shipper e afins
            // // $scope.refreshContatos('D');             
            // // $scope.refreshContatos('O');
        // });
    // }
        
    // // CIDADES BOOKING
    // $scope.acCidades = function (texto) {
        // if (texto.length > 2) {
            // return buscaWS.get('fbcsag325_descricao.asp', 'term=' + texto).then(function (data) {
                // return data;
            // });
        // }
    // };

    // //------------------------------------------------------------------------------------------------

    // $scope.btnRefreshInfo = function() {
        // var aux = '';

        // $scope.loadingState = true;
        // buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/f_hcgs3006_rel/JSON', 'aProp=' + $scope.proposta.idProposta).then(function(data) {
            // // debugger;
            // $scope.lsAplicar = data;
            // if ($scope.lsAplicar[0].venda.length) { $scope.hasTaxa = true; }
            // $scope.lsAplicar[0].totalgeral = 0;
            // $scope.lsAplicar[0].totalcompra = 0;
            // $scope.lsAplicar[0].totalvenda = 0;
            // $scope.lsAplicar[0].comissao = 0;
            // $scope.lsAplicar[0].recTerminal = 0;
            // $scope.lsAplicar[0].agente = 0;
            // $scope.lsAplicar[0].msg = '| ';
            // //Alimenta o modal de Negociacao por Taxa
            // for (var i = $scope.lsAplicar[0].arr_ptx.length - 1; i >= 0; i--) {
                // $scope.negociarTaxa[i] = {};
                // $scope.negociarTaxa[i].venda = $scope.lsAplicar[0].arr_ptx[i].venda;
                // texto = $scope.lsAplicar[0].arr_ptx[i].DS_T;
                // if ($scope.lsAplicar[0].arr_ptx[i].descricao !== '') {
                    // texto = texto + " (" + $scope.lsAplicar[0].arr_ptx[i].descricao + ")";
                // }
                // // 
                // texto = texto + " [" + $scope.lsAplicar[0].arr_ptx[i].aClass + "]";
                // $scope.negociarTaxa[i].DS_T = texto;
                // $scope.negociarTaxa[i].recId = $scope.lsAplicar[0].arr_ptx[i].sRecnum;
                // $scope.negociarTaxa[i].valor = $scope.lsAplicar[0].arr_ptx[i].valorVenda;
                // $scope.negociarTaxa[i].moeda = $scope.lsAplicar[0].arr_ptx[i].moedaVenda;
                // $scope.negociarTaxa[i].valormin = $scope.lsAplicar[0].arr_ptx[i].vlMin;
                // $scope.negociarTaxa[i].valormax = $scope.lsAplicar[0].arr_ptx[i].vlMax;
                // $scope.negociarTaxa[i].note = $scope.lsAplicar[0].arr_ptx[i].N_Note;
                // $scope.negociarTaxa[i].modPgto = $scope.lsAplicar[0].arr_ptx[i].modPgto;
            // }

            // //--- CALCULA O TOTAL DE VENDA
            // // 
            // for (var i = $scope.lsAplicar[0].venda.length - 1; i >= 0; i--) {
                // if ($scope.lsAplicar[0].venda[i].id !== 'R$' && $scope.lsAplicar[0].venda[i].value !== 0) {
                    // Convert($scope.lsAplicar[0].venda[i].id, $scope.lsAplicar[0].venda[i].value, 'v', function(response) {
                        // // 
                        // $scope.lsAplicar[0].totalvenda += response.data.valor;
                    // });
                // } else { $scope.lsAplicar[0].totalvenda += $scope.lsAplicar[0].venda[i].value; }
            // }
            // //--- CALCULA O VALOR DE COMPRA TOTAL
            // for (var i = $scope.lsAplicar[0].compra.length - 1; i >= 0; i--) {
                // if ($scope.lsAplicar[0].compra[i].id !== 'R$' && $scope.lsAplicar[0].compra[i].value !== 0) {
                    // // 
                    // Convert($scope.lsAplicar[0].compra[i].id, $scope.lsAplicar[0].compra[i].value, 'c', function(response) {
                        // // 
                        // $scope.lsAplicar[0].totalcompra += response.data.valor;
                    // });
                // } else { $scope.lsAplicar[0].totalcompra += $scope.lsAplicar[0].compra[i].value; }
            // }
            // // 
            // //--- COMISSAO DO CLIENTE - CONVERSAO CASO NECESSARIO
            // if ($scope.lsAplicar[0].descliente.id !== 'R$' && $scope.lsAplicar[0].descliente[i].value !== 0) {
                // Convert($scope.lsAplicar[0].descliente.id, $scope.lsAplicar[0].descliente.value, 'v', function(response) {
                    // $scope.lsAplicar[0].comissao += response.data.valor;
                // });
            // } else { $scope.lsAplicar[0].comissao += $scope.lsAplicar[0].descliente.value; }

            // //--- AGENTE - CONVERSAO CASO NECESSARIO
            // if ($scope.lsAplicar[0].recagente.id !== 'R$' && $scope.lsAplicar[0].recagente.value !== 0) {
                // // 
                // Convert($scope.lsAplicar[0].recagente.id, $scope.lsAplicar[0].recagente.value, 'v', function(response) {
                    // // 
                    // $scope.lsAplicar[0].agente += response.data.valor;
                // });
            // } else { $scope.lsAplicar[0].agente += $scope.lsAplicar[0].recagente.value; }

            // //--- TERMINAL - CONVERSAO CASO NECESSARIO
            // if ($scope.lsAplicar[0].recterminal.id !== 'R$' && $scope.lsAplicar[0].recterminal.value !== 0) {
                // Convert($scope.lsAplicar[0].recterminal.id, $scope.lsAplicar[0].recterminal.value, 'v', function(response) {
                    // $scope.lsAplicar[0].recTerminal += response.data.valor;
                // });
            // } else { $scope.lsAplicar[0].recTerminal += $scope.lsAplicar[0].recterminal.value; }

            // for (var i = $scope.lsAplicar[0].coins.length - 1; i >= 0; i--) {
                // if ($scope.lsAplicar[0].coins[i].id !== 'R$' && $scope.lsAplicar[0].coins.value !== 0) {
                    // infoDados($scope.lsAplicar[0].coins[i].id, 1, 'c', function(response) {});
                // }
            // }

            // //validacao das taxas
            // for (var i = $scope.lsAplicar[0].arr_ptx.length - 1; i >= 0; i--) {
                // if ($scope.lsAplicar[0].arr_ptx[i].valorVenda == 0 && $scope.lsAplicar[0].arr_ptx[i].bTarifario == 1) {
                    // $scope.lsAplicar[0].arr_ptx[i].valorVenda = 'Sob Consulta';
                // } 
                // if ($scope.lsAplicar[0].arr_ptx[i].valorCompra == 0 && $scope.lsAplicar[0].arr_ptx[i].bTarifario == 1) {
                    // $scope.lsAplicar[0].arr_ptx[i].valorCompra = 'Sob Consulta';
                // }
            // }

            // // debugger;
            // $scope.setNgTables();
            // $scope.getTaxas_Comissao_Array('');
            // $scope.loadingState = false;

        // });

    // }

    // var Convert = function(moeda, valor, tipo, callback) {

        // var today = new Date();
        // var dd = today.getDate();
        // var mm = today.getMonth() + 1; //January is 0!
        // var yyyy = today.getFullYear();

        // if (dd < 10) {
            // dd = '0' + dd
        // }

        // if (mm < 10) {
            // mm = '0' + mm
        // }

        // today = yyyy + '-' + mm + '-' + dd;

        // var ws = 'http://192.168.6.19:8087/monetario/converter/' + valor + '/' + moeda + '/BRL/' + today + '/' + tipo;
        // callWS.get(ws, '').then(function(response) {
            // callback(response);
        // });

    // }

    // var infoDados = function(moeda, valor, tipo, callback) {

        // var today = new Date();
        // var dd = today.getDate();
        // var mm = today.getMonth() + 1; //January is 0!
        // var yyyy = today.getFullYear();

        // if (dd < 10) {
            // dd = '0' + dd
        // }

        // if (mm < 10) {
            // mm = '0' + mm
        // }

        // today = yyyy + '-' + mm + '-' + dd;

        // var ws = 'http://192.168.6.19:8087/monetario/converter/1/' + moeda + '/BRL/' + today + '/' + tipo;

        // callWS.get(ws, '').then(function(response) {
            // // 

            // $scope.lsAplicar[0].msg += moeda + ':' + (response.data.ptax.valorBase).toFixed(2) + '(' + response.data.ptax.dataReferencia + ') | ';

            // callback(response);
        // });

    // }

    // $scope.Notify = function() {
        // $scope.ListaMsgs = {}
        // buscaWS.get('/WVDF_WS/ws_TMEN1003.wso/f_lista_msgs/JSON', 'aProp=' + $scope.proposta.idProposta).then(function(data) {
            // $scope.ListaMsgs = data;
        // });

    // }

    // $scope.btnAceitar = function() {

        // var param = {};
        // param.aUsuarioSessao = getVariavelURL("aUsuarioSessao");
        // param.idProposta = $scope.proposta.idProposta;
        // param.taxas = $scope.negociarTaxa;
        // param.valid_ex = $scope.negociarValidade.valid_ex;
        // param.concorrente = [];
        // for (var i = $scope.negociarValidade.concorrente.length - 1; i >= 0; i--) {
            // param.concorrente.push($scope.negociarValidade.concorrente[i].idCliente);
        // }

        // var params = { 'aJSON': param };

        // callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_taxdeals/JSON', params).then(function(response) {
            // if (response.data = 1) $scope.proposta.sStatus = '4'
            // $scope.Notify();
            // loadProposta();
        // });
    // }

    // $scope.checkTaxasArray = function() {
        // for (var i = $scope.negociarTaxa.length - 1; i >= 0; i--) {
            // if (!angular.isUndefined($scope.negociarTaxa[i].valor))
                // if ($scope.negociarTaxa[i].valor.length)
                    // return false;

            // if (!angular.isUndefined($scope.negociarTaxa[i].moeda))
                // if ($scope.negociarTaxa[i].moeda.length)
                    // return false;

            // if (!angular.isUndefined($scope.negociarTaxa[i].note))
                // if ($scope.negociarTaxa[i].note.length)
                    // return false;
        // }
        // return true;
    // };

    // var getPermissao = function() {
        // var params = {};
        // params.aUsuarioSessao = getVariavelURL("aUsuarioSessao");

        // callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_userprop/JSON', params).then(function(response) {
            // $scope.permissao = response.data;
        // });
    // }

    // $scope.fnCalcTotal = function() {
        // $scope.entrada.total.weight = $scope.entrada.pcs * $scope.entrada.weight;

        // $scope.entrada.total.volume = $scope.entrada.length * $scope.entrada.width * $scope.entrada.height;
    // };

    // $scope.btnAplicarCalculo = function() {
        // $scope.loadingState = true;

        // buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/f_apl_cacl/JSON', 'aPROP=' + $scope.proposta.idProposta).then(function(data) {
            // $('#tab2Link').trigger('click');
            // $scope.Notify();
            // $scope.btnRefreshInfo();
            // $scope.loadingState = false;
            // // Convert()
        // });

    // };

    // $scope.getVia = function() {
        // $scope.lsVia = [];
        // if ($scope.proposta.pol !== "" && $scope.proposta.pod !== "") {
            // buscaWS.get('/WVDF_WS/ws_csag325.wso/propostaVia/JSON', 'sPol=' + $scope.proposta.pol.id + '&sPod=' + $scope.proposta.pod.id + '&sMod=' + $scope.proposta.modalidades + '&sCliente=' + idCliente).then(function(data) {
                // // debugger;
                // $scope.lsVia = data;
                // // if ($scope.lsVia.length == 1) { $scope.proposta.VIA = ''; }
            // });
        // }
    // }

    // $scope.getCarrier = function() {
        // // 
        // $scope.lsCarrier = {};
        // if ($scope.proposta.pol !== "" && $scope.proposta.pod !== "") {
            // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/propostaCarrier/JSON', 'sPol=' + $scope.proposta.pol.id + '&sPod=' + $scope.proposta.pod.id + '&sVia=' + $scope.proposta.VIA + '&sMod=' + $scope.proposta.modalidades).then(function(data) {
                // // 
                // $scope.lsCarrier = data;
            // });
        // }
    // }

    // $scope.addPolRow = function(table, Class) {

        // var row = {};
        // row.aStatus = true;
        // row.taxa = '';
        // row.moeda = '';
        // row.valorCompra = '0';
        // row.valorVenda = '0';
        // row.tpCalc = '';
        // row.modPgto = '';
        // row.moedaCompra = '';
        // row.moedaVenda = '';
        // row.editable = true;
        // row.aClass = Class;
        // row.descricao = '';
        // row.equipamento = '';
        // //    
        // if ($scope.proposta.modalidades == 'LCL') {
            // row.vlMin = '0';
            // row.vlMax = '0';
            // row.vlMinCompra = '0';
            // row.vlMaxCompra = '0';
        // }

        // table.unshift(row);

        // if (Class == "O")
            // $scope.lockNewOrigem = true;
        // else if (Class == "F")
            // $scope.lockNewFrete = true;
        // else if (Class == "D")
            // $scope.lockNewDestino = true;
    // }

    // $scope.btnTableSaveRowTax = function(row, Class) {
        // row.aUsuarioSessao = aUsuarioSessao;
        // row.idProposta = $scope.proposta.idProposta;
        // row.permissao = $scope.permissao;
			// console.log("rowJson = " + JSON.stringify(row));

		// console.log('teste salvar',row);
		// //console.log(Class);
	
        // callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_change_line/JSON', { 'aJSON': row }).then(function(response) {
            // row.editable = false;
			// console.log(response);
            // if (Class == "O")
                // $scope.lockNewOrigem = false;
            // else if (Class == "F")
                // $scope.lockNewFrete = false;
            // else if (Class == "D")
                // $scope.lockNewDestino = false;

            // $scope.btnRefreshInfo();
            // $scope.Notify();
        // });

    // }

    // $scope.modalIMO = function()
    // {
        // $scope.givenUrl ="PCGS3040_10.asp?aUsuarioSessao="+aUsuarioSessao+"&Nm_Tabela=HCGS3004"+"&idProposta="+$scope.proposta.idProposta;
    // }


    // $scope.f_check_tax = function(recnum, status) {
        // var params = {};
        // params.aUsuarioSessao = aUsuarioSessao;
        // params.sRecnum = recnum;
        // params.aStatus = status;
        // callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_check_tax/JSON', params).then(function(response) { $scope.btnRefreshInfo(); });
    // }

    // $scope.btnActNg = function() {

        // for (var i = $scope.tbPendencias.negociation.length - 1; i >= 0; i--) {
            // $scope.tbPendencias.negociation[i].radio = {};
            // $scope.tbPendencias.negociation[i].radio = 'Aceitar';
        // }
    // }

    // $scope.btnRcrNg = function() {
        // $scope.exibeRecusa = true;
        // $scope.exibeContraProposta = false;

        // for (var i = $scope.tbPendencias.negociation.length - 1; i >= 0; i--) {
            // $scope.tbPendencias.negociation[i].radio = {};
            // $scope.tbPendencias.negociation[i].radio = 'Negar';
        // }

    // }

    // $scope.btnCPNg = function() {
        // $scope.exibeContraProposta = true;
        // $scope.exibeRecusa = false

        // for (var i = $scope.tbPendencias.negociation.length - 1; i >= 0; i--) {
            // $scope.tbPendencias.negociation[i].radio = {};
            // $scope.tbPendencias.negociation[i].radio = 'Contra-valor';
        // }
    // }

    // $scope.btnSaveAll = function() {
        
        // var params = {};
        // params.aUsuarioSessao = getVariavelURL("aUsuarioSessao");
        // params.idProposta = $scope.proposta.idProposta;
        // params.negociation = $scope.tbPendencias.negociation;
        // params.valid_ex = $scope.negociarValidade.valid_ex;
        // params.option = $scope.negociarValidade.option;
        // $scope.proposta.negociation_id = false;

        // callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_dealresp/JSON', { 'aJson': params }).then(function(response) {
            // $scope.btnRefreshInfo();
            // $scope.Notify();
        // });

    // }

    // $scope.btnTableSaveRowComissao = function(row) {
        // row.editable = false;
        // var param = {};
        // param = row;
        // param.aUsuarioSessao = getVariavelURL("aUsuarioSessao");
        // param.idProposta = $scope.proposta.idProposta;
        // var params = { 'sJSON': param };

        // callWS.get('/WVDF_WS/ws_hcgs3007.wso/f_save_comissao/JSON', params).then(function(response) {
            // $scope.gridComissao_lista();
        // });

    // }

    // $scope.fNegociationResp = function() {
        // params = "aProposta=" + $scope.proposta.idProposta;
        // buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/f_negociation/JSON', params).then(function(data) {
            // $scope.tbPendencias = data;
            // $scope.negociarValidade.valid_ex = data.aValid
            // $scope.negociarValidade.concorrente = data.aConcorrente
        // });
    // }

    // $scope.getDS = function(array, ID) {
        // // debugger;
        // try {
            // return array.filter(function(item) {
                // return (item.ID === ID || item.id === ID);
            // })[0].DS;
        // } catch (err) {
            // return '';
        // }
    // }

    // $scope.getValue = function(array, id) {
        // try {
            // return array.filter(function(item) {
                // return (item.id === id);
            // })[0].value;
        // } catch (err) {
            // return '';
        // }
    // }

    // init();
    
    // $scope.alertOK = function() {
        // $scope.edit1 = true;
    // }

    // $scope.alertOK2 = function() {
        // $scope.edit2 = true;
        // if ($scope.proposta.modalidades=='LCL'){
            // for (var i = $scope.containerLCL.length - 1; i >= 0; i--) {
                // $scope.containerLCL[i].editable = true;
            // }
        // }
        // if ($scope.proposta.modalidades == 'FCL')
        // {
            // for (var i = $scope.containerFCL.length - 1; i >= 0; i--) {
                // $scope.containerFCL[i].editable = true;
            // }   
        // }
    // }

    // $scope.untitleSave = function() {
        // $scope.edit1 = false;
    // }

    // $scope.untitleSave2 = function() {
        // $scope.edit2 = false;
        // parent.parent.alertify.success('Salvo!');
        // return;
    // }

    // $scope.detalheCargaSave = function()
    // {   
        // $scope.loadingState=true;
        // $scope.edit2 = false;
        // debugger;
        // if ($scope.proposta.modalidades=='LCL')
        // {
            // for (var i = $scope.containerLCL.length - 1; i >= 0; i--) {
                // $scope.containerLCL[i].editable = false;
                // $scope.btnTableSaveRow($scope.containerLCL[i],'LCL')
            // }
        // }
        // if ($scope.proposta.modalidades=='FCL')
        // {
            // for (var i = $scope.containerFCL.length - 1; i >= 0; i--) {
                // $scope.containerFCL[i].editable = false;
                // $scope.btnTableSaveRow($scope.containerFCL[i],'FCL')
            // }
        // }
        // // debugger;
        // setTimeout(function () {
            // // debugger;
            
            // // $scope.Notify();
            // refreshTabelas();
            // $scope.btnAplicarCalculo()
            // $scope.loadTotals();    
            // // $scope.btnRefreshInfo();
            // // $scope.loadingState=false;    

        // }, 2500);

    // }

    // //NOVO AQUI
    // var params = { 'aUsuarioSessao': aUsuarioSessao };
    // callWS.get('/WVDF_WS/ws_hcgs3004.wso/buscarCrm/JSON', params).then(function(response) {
        // // debugger;
        // $scope.CRMURL = response.data;
    // });

    // $scope.fChangeBlArmador = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_BlArmador/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error('FOI!.');
        // });
    // }

    // $scope.fChangeNavio = function(valor) {
        // // debugger;
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticNavio/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // debugger;
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeViagem = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticViagem/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeETA = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticETA/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeObsReserva = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ObsReserva/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeArmador = function(valor) {
        // // debugger;
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticArmador/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeAgente = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticAgente/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeBookArmador = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticBookArmador/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeMasterArmador = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticMasterArmador/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeDlCarga = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticDlCarga/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeDlDraft = function(valor) {
        // debugger;
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticDlDraft/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // debugger;
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeDlVgm = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticDlVgm/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeDlImo = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticDlImo/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }
    
    // $scope.fChangeObsInterna = function(valor) {
        // var params = { 'aUsuarioSessao': aUsuarioSessao, 'sBookingId': idAprovado, 'sValor':valor};
        // debugger;
        // callWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ObsInterna/JSON', params).then(function(data) {            
            // debugger;
            // // parent.parent.alertify.error(data);
        // });
    // }
    
    // $scope.fChangeObsBookDesk = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ObsDesk/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeNrCtrArmador = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_nrContratoArmador/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeFtArmador = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fAutomaticSave_ftArmador/JSON', 'sPropostaId='+idProposta+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeFtCliente = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fAutomaticSave_ftCliente/JSON', 'sPropostaId='+idProposta+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeRefArmador = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_refArmador/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeDtChegada = function(valor) {
        // // debugger;
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticChegada/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
            // // debugger;
        // });
    // }

    // $scope.fChangeSupervisor = function(valor) {
        // debugger;
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticSupervisor/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // debugger;
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeMargem = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticMargem/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeAgEmissaobl = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticAgEmissaobl/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeAgMar = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticAgMar/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeDocument = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticDoc/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeTerminal = function(valor) {
        // debugger;
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticTerminal/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fChangeObsConsol = function(valor) {
        // buscaWS.get('/WVDF_WS/ws_hsag561.wso/fAutomaticObsConsol/JSON', 'sBookingId='+idAprovado+'&sValor='+valor).then(function(data) {            
            // // parent.parent.alertify.error(data);
        // });
    // }

    // $scope.fBtnSolBook = function() {

    // }

    // $scope.fBtnAutBook = function() {

    // }

    // $scope.fStatusChange = function(valor) {
        // // debugger;
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/p_att_status/JSON', 'aProp='+idProposta+'&aStatus='+valor+'&aPrograma=Usuario').then(function(data) {            
            // parent.parent.alertify.success('Status Alterado!');
            // $scope.fStatusVerify();
        // });
    // }

    // $scope.fStatusVerify = function (){
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fStatusVerify/JSON', 'aProp='+idProposta).then(function(data) {            
            // debugger;
            // $scope.status = data;
            // $scope.proposta.aStatus = data.ID;
        // });
    // }

    // // NOVO AQUI - FIM

    // //TIMELINE - TAB5 - INICIO
    // // if (idProposta !== '') {
    // //     $scope.LogProp = [];
    // //     $http.get("http://192.168.6.23/api/lib/cross/logproposta/"+idProposta)
    // //     .then(function(response) {
    // //         $scope.LogProp = response.data;
    // //         console.log($scope.LogProp);
    // //     });
    // // }

    // // var id =  $location;
    // // console.log(id);
    // // $scope.acModel2 = function() {

    // // var arr = [
    // //     {
    // //         "id": 831034,
    // //         "logMsg": "ATUALIZANDO VOLUME,PESO E PCS.",
    // //         "usuarioNome":"ANDERSON RODRIGUES",
    // //         "alterDate": "2018-05-23 16:02:24.327",
    // //         "inverted": "badge"
    // //     },
    // //     {
    // //         "recnum": 831036,
    // //         "log_msg": "ATUALIZANDO O CONTAINER DA PROPOSTA",
    // //         "usuarionome":"ANDERSON RODRIGUES",
    // //         "date_date_a": "2018-05-23 16:02:24.583",
    // //         "inverted": "inverted"
    // //     },
    // //     {
    // //         "recnum": 831038,
    // //         "log_msg": "ATUALIZANDO O AGENTE/TERMINA/VALIDADE DA PROPOSTA BASEADO NO FRET",
    // //         "usuarionome":"ANDERSON RODRIGUES",
    // //         "date_date_a": "2018-05-23 00:00:00.000",
    // //         "inverte": "badge"
    // //     },
    // //     {
    // //         "recnum": 831041,
    // //         "log_msg": "DELETANDO TAXAS PARA RECALCULAR",
    // //         "usuarionome":"ANDERSON RODRIGUES",
    // //         "date_date_a": "22018-05-23 00:00:00.000",
    // //         "inverted": "inverted"
    // //     }
       
    // //     ]
    // //     return arr;
    // // }
    // //TIMELINE - TAB5 - FIM

// });