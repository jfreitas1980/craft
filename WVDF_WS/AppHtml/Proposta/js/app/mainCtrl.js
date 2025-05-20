"use strict";

app.controller('MainCtrl', ['$scope', '$controller', 'WVDF', function($scope, $controller, WVDF) {
    console.log("controller on");
    var main = {};
    var parent = { parent: {} }; //remover
    parent.parent.alertify = { success: () => null, error: () => null }; //remover

    $scope.tabs = [
        { title: "Info. Geral", icon: "", include: "views/infoGeral.html", controller: "", disabled: false, hidden: false },
        { title: "Taxas", icon: "", include: "views/taxas.html", controller: "", disabled: false, hidden: false }
    ]

    $scope.combo = {};
    $scope.form = {
        info: {}
    };

    main.init = function() {
        $scope.Url = Url;
        $scope.WVDF = WVDF;
        WVDF.ws_csag308.f_fup_csag308_combo(Url.aUsuarioSessao, "", Url.idCliente).then((data) => $scope.combo.marcas = data);
        WVDF.ws_CCGS200.f_CCGS200_combo(Url.aUsuarioSessao).then((data) => $scope.combo.tpOperacao = data);
        WVDF.ws_CCGS202.f_CCGS202_lista(Url.aUsuarioSessao, "").then((data) => $scope.combo.modFrete = data);
        WVDF.ws_HCGS3000.f_combo_incorterm(Url.aUsuarioSessao).then((data) => $scope.combo.incoterm = data);
        WVDF.ws_CCGS204.f_CCGS204_lista(Url.aUsuarioSessao).then((data) => $scope.combo.embarque = data);
        WVDF.ws_hcgs3029.f_combo_pais(Url.aUsuarioSessao).then((data) => $scope.combo.pais = data);


        $controller('infoGeralCtrl', { $scope: $scope });
        $controller('chatCtrl', { $scope: $scope });
    };

    $scope.call = function(ws) {
        return ws.then(function(data) { return data; });
    }

    main.init();
}]);

app.controller('infoGeralCtrl', ['$scope', 'WVDF', function($scope, WVDF) {
    var info = {};
    $scope.info = {};
    $scope.taxa = {};
    $scope.common = {};

    info.init = function() {
        WVDF.ws_hcgs3004.fPropostaFristLoad(Url.idProposta, Url.aUsuarioSessao).then(function(data){
            console.log(data);
        });
        WVDF.ws_hcgs3004.f_busca_proposta(Url.idProposta, Url.aUsuarioSessao).then(function(data) { // solicitar alteração
            $scope.info = {
                cliente: data.sCSAG320_FANTASIA,
                clienteFinal: data.sClienteFinal.Fantasia,
                impressaoProposta: data.impressaoProposta,
                emailProposta: data.emailProposta,
                dataProposta: data.dataProposta
            }
            $scope.form.info = angular.merge({},{
                marca: data.sCSAG308_ID,
                tpOperacao: data.sCCGS200_ID,
                modFrete: data.sCCGS202_ID,
                incoterm: data.sCCGS223_ID,
                embarque: data.sCCGS204_ID,
                paisPol: data.paisPol,
                pol: data.arr_POL,
                paisPod: data.paisPod,
                pod: data.arr_POD,
                clienteFinal: data.sClienteFinal,
                internalReference: data.sInt_Ref,
                customReference: data.sCust_Ref,
                customerInstruction: data.sCust_Inst,
                criadoPor: data.criadoPor,
                criadoEm: data.criadoEm,
                alteradoPor: data.alteradoPor,
                alteradoEm: data.alteradoEm,
                status: '', //  adicionar
            },   $scope.form.info);
            $scope.taxa = {
                cliente: data.sCSAG320_FANTASIA,
                clienteFinal: data.sClienteFinal.Fantasia,
                idProposta: Url.idProposta,
                validadeDe: data.sDTVAL_INICIO,
                validadeAte: data.sDTVAL_TERMINO,
                pol: data.arr_POL,
                pod: data.arr_POD,
                via: { 'id': data.sVia, 'value': data.sVia_DS },
                embarque: data.sCCGS204_ID,
                incoterm: data.sCCGS223_ID,
                operacao: data.sCCGS200_ID,
                modalidades: data.sCCGS202_ID,
                agente: data.sCSAG345_AGENTE_D,
                transitTime: data.transitTime,
                freeTime: data.freetime,
                armador: data.arr_CARRIERS.label,
                paisOrigem: data.sORIGEM_PAIS,
                cidadeOrigem: data.arr_ORIGEM,
                cepOrigem: data.sORIGEM_CEP,
                cidadeDestino: data.arr_DESTINO,
                cepDestino: data.sDESTINO_CEP,
                customReference: data.sCust_Ref,
                internalReference: data.sInt_Ref,
                customerInstruction: data.sCust_Inst,
                totalPCS: data.TTPCS,
                totalWeight: data.TTGW,
                totalCBM: data.TTCBM
            };
        });

        WVDF.ws_HCGS3005.f_HCGS3005_lista(Url.idProposta, Url.aUsuarioSessao).then(function(data) {
            $scope.common.containers = data;
        });

        $scope.modal.status.verify();
    
    }

    // solicitar alteração
    $scope.common.btnVisualizar = function() {
        WVDF.ws_hcgs3004.f_HCGS3004_Status(Url.idProposta, Url.aUsuarioSessao).then(function(data) {
            switch (data) {
                case 3:
                    parent.parent.alertify.error('Proposta em Aguardo!');
                    break;
                case 4:
                    parent.parent.alertify.error('Proposta em Analise!');
                    break;
                case 10:
                    parent.parent.alertify.error('Proposta com Falta de Informacoes!');
                    break;
                case 11:
                case 12:
                    parent.parent.alertify.error('Proposta em Verificacao!');
                    break;
                case 5:
                    parent.parent.alertify.error('Proposta Expirada!');
                    break;
                default:
                    window.open("../PCGS3004_04.asp?aUsuarioSessao=" + Url.aUsuarioSessao + "&idProposta=" + Url.idProposta, 'propostadefrete', 'width=250px');
                    break;
            }
        });
    }

    $scope.modal = {
        status: {
            open: () => $("#status").modal('show'),
            close: () => null,
            save: function(value) {
                WVDF.ws_hcgs3004.p_att_status(Url.idProposta, value, "Usuario", Url.aUsuarioSessao).then(function(data) {
                    parent.parent.alertify.success('Status Alterado!');
                });
            },
            verify: function() {
                WVDF.ws_hcgs3004.fStatusVerify(Url.idProposta, Url.aUsuarioSessao).then(function(data) {
                    $scope.form.info.status = data;
                });
            }
        },
        arquivos: {
            open: () => {
                $('#arquivos iframe').attr('src', '../PCGS3040_10.asp?aUsuarioSessao=' + Url.aUsuarioSessao + '&Nm_Tabela=HCGS3004&idProposta=' + Url.idProposta);
                $("#arquivos").modal('show');
            },
            close: () => null,
        },
        mensagens: {
            open: () => $("#mensagens").modal('show'),
            close: () => null,
        },
        historico: {
            open: () => $("#historico").modal('show'),
            close: () => null,
        },
        negociacao: {
            open: () => $("#negociacao").modal('show'),
            close: () => null,
        }
    }

    info.init();
}]);