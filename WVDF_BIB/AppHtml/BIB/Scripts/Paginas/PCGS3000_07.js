// ANGULAR JS
app = angular.module('pcgs300000App', ['ngSanitize', 'Alertify', 'angularSoap', 'diretivas', 'wsDominio', 'smart-table', 'ui.bootstrap', 'datatables', 'datatables.buttons', 'datatables.colreorder', 'ngTagsInput', 'toaster']);

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


app.controller('pcgs300000Controller', function($scope, Alertify, buscaWS, callWS, $http, $q, $compile, toaster, $uibModal) {

    var bComercial = getVariavelURL('bComercial');
    $scope.exibeExclusaoLote = !bComercial;
    var sTabela = getVariavelURL('sTabela');
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    $scope.modalColunas = "PHSAG310_01.asp?aUsuarioSessao=" + aUsuarioSessao + "&aTabela=" + sTabela;
    $scope.lsModalidades = [];
    var init = function() {
        getTaxas();
        getModalidades();
    }

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
    $scope.recarrega = function() {
        montaTabela();
    }

    var montaTabela = function() {
        buscaWS.get('/WVDF_WS/ws_hsag310.wso/fListarHSAG310/JSON', 'sTabela=' + sTabela).then(function(data) {
            // console.log(data);
            console.log(data);
            $scope.colums = data;
        });
    }

    buscaWS.get('/WVDF_WS/ws_hsag310.wso/fListarHSAG310/JSON', 'sTabela=' + sTabela).then(function(data) {
        if (bComercial) {
            $scope.colums = data;
        } else {
            $scope.colums = data;
        }
    });

    /*vm.someClickHandler = function(info) {
        var url = "PCGS3000_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&RowId=" + info.sRowid;
        document.location = url;
    };
*/


    $scope.classeTaxa = [];

    buscaWS.get('/WVDF_WS/ws_ccgs221.wso/f_class_tx/JSON', '').then(function(data) {
        console.log(data);
        $scope.classeTaxa = data;
    });

    $scope.deleteRow = function(tarifario, index) {
        var modalInstance = $uibModal.open({
            templateUrl: 'modalTemplate.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg'
        });
        modalInstance.result.then(function(selectedItem) {
            buscaWS.get('/WVDF_WS/ws_hcgs3000.wso/f_Del_Tarifario/JSON', 'recId=' + tarifario).then(function(data) {
                $scope.lsResultados.splice($scope.tarifarioIndex, 1);
                toaster.success({ title: "Exclusao", body: "Excluido com Sucesso" });
                //  vm.message = data;
            });
        }, function() {
            //  console.log('Modal dismissed at: ' + new Date());
        });
    }



    var auxParametros = {};
    auxParametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

    $scope.isOptionsReady = false;
    $scope.fComercial = "";
    $scope.fOperacional = "";
    $scope.mostraOpcoes = true;

    $scope.lsPOD = {};
    $scope.lsPOL = {};

    $scope.colums = [];

    buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_marcas/JSON', '').then(function(data) {
        $scope.lsMarcas = data;
    });

    buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_modal_15/JSON', '').then(function(data) {
        $scope.lsModais = data;
    });

    $scope.acCarrier = function(texto) {
        return buscaWS.get('fbcsag342_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.acCidades = function(texto) {
        return buscaWS.get('fbcsag325_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    buscaWS.get('/WVDF_WS/ws_csag379.wso/f_tradeline_list/JSON', '').then(function(data) {
        $scope.lsTrades = data;
    });

    buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON', '').then(function(data) {
        $scope.lsPais = data;
    });

    buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_prod/JSON', '').then(function(data) {
        $scope.lsProdutos = data;
    });

    $scope.changeProduto = function() {
        /*buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_taxprod/JSON', 'sCCGS210_ID=' + $scope.fProduto).then(function(data) {
            $scope.lsTaxas = data;
        });*/
    };

    $scope.acCidadesVia = function(texto) {
        return getCidades(0, '', texto);
    }

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

    buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_cntr/JSON', '').then(function(data) {
        $scope.lsContainer = data;
    });

    $scope.btnImprimirEXCEL = function() {
        var blob = new Blob([document.getElementById('export').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };

    $scope.itemsByPage = 10;
    $scope.currentPage = 1;
    $scope.pesquisa = {};

    var gerarParametros = function() {
        $scope.lsResultados = "";
        var auxPol = "";
        var auxPod = "";

        if ($scope.fPol != undefined) {
            for (x in $scope.fPol) {
                if (auxPol === "") {
                    auxPol = $scope.fPol[x].id;
                } else {
                    auxPol += "," + $scope.fPol[x].id;
                }
            }
        }

        if ($scope.fPod != undefined) {
            for (x in $scope.fPod) {
                if (auxPod === "") {
                    auxPod = $scope.fPod[x].id;
                } else {
                    auxPod += "," + $scope.fPod[x].id;
                }
            }
        }

        var parametros = {};
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        //parametros.sMODAL = ($scope.fModal == undefined) ? "" : $scope.fModal;
        parametros.sCARRIER = ($scope.fCarrier == undefined) ? "" : (($scope.fCarrier.id == undefined) ? "" : $scope.fCarrier.id);
        //    parametros.sID_C = ($scope.fComercial == undefined) ? "" : $scope.fComercial;
        //parametros.sID_O = ($scope.fOperacional == undefined) ? "" : $scope.fOperacional;
        //  parametros.sPROD = ($scope.fProduto == undefined) ? "" : $scope.fProduto;
        parametros.sTAXA = ($scope.fTaxa == undefined) ? "" : $scope.fTaxa;
        parametros.sTRADE = ($scope.fTrade == undefined) ? "" : $scope.fTrade;
        parametros.sCNTR = ($scope.fContainer == undefined) ? "" : $scope.fContainer;
        parametros.sMarca = ($scope.fMarca == undefined) ? "" : $scope.fMarca;
        parametros.sOri = auxPol;
        parametros.sDes = auxPod;
        parametros.sPais = ($scope.fPais == undefined) ? "" : $scope.fPais;
        parametros.sDtBgn = ($scope.mDataInicial == undefined) ? "" : $scope.mDataInicial;
        parametros.sDtEnd = ($scope.mDataFinal == undefined) ? "" : $scope.mDataFinal;
        parametros.sContrato = ($scope.fContrato == undefined) ? "" : $scope.fContrato;
        parametros.sDescricao = ($scope.fDescricao == undefined) ? "" : $scope.fDescricao;
        parametros.sValor = ($scope.fValor == undefined) ? "" : $scope.fValor;
        parametros.sPropostaValidade = ($scope.fPropostaValidade == undefined) ? "" : $scope.fPropostaValidade;
        parametros.sTpServico = $scope.fTpServico;
        parametros.sColoader = $scope.fcoloader;
        parametros.sClienteDireto = $scope.fclienteDireto;
        parametros.sVia = ($scope.fvia == undefined) ? "" : $scope.fvia;
        parametros.sClasseTaxa = ($scope.fclasseTaxa == undefined) ? "" : $scope.fclasseTaxa;

        parametros.itemsByPage = ($scope.itemsByPage == undefined) ? 0 : $scope.itemsByPage;
        parametros.currentPage = $scope.currentPage;
        parametros.aUsuarioSessao = aUsuarioSessao;

        $scope.pesquisa.params = parametros;
        var entidade = JSON.stringify($scope.pesquisa.params);
        var params = { 'sJSON': entidade };
        return params
    }

    $scope.btnPesquisar = function() {
        $scope.loadingState = true;

        var params = gerarParametros();
        callWS.get('/WVDF_WS/ws_HCGS3000.wso/f_PesquisaHCGS3000/JSON', params)
            .then(function(response) {
                console.log(response);
                $scope.lsResultados = response.data.dados;
                $scope.totalItems = response.data.qtdLinhas;
                $scope.mostraTela = true;

            }, function(error) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar literais. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
        $scope.loadingState = false;
    };

    $scope.zoomTarifa = function(recId, index) {
        console.log(recId);
        window.top.jaddTab("Tarifa #" + recId, "PCGS3000_01.asp?aUsuarioSessao=" + aUsuarioSessao + "&aTarifa=" + recId);
    }

    $scope.btnDelLote = function() {

        var modalInstance = $uibModal.open({
            templateUrl: 'modalExclusaoLote.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg'
        });
        modalInstance.result.then(function(selectedItem) {
            delLote();
            //  vm.message = data;
        }, function() {
            //  console.log('Modal dismissed at: ' + new Date());
        });

        /* Alertify.confirm('Deseja excluir o lote?')
            .then(function() {
                delLote();
            }, function() {});
    */
    };

    var delLote = function() {
        var params = gerarParametros();

        callWS.get('/WVDF_WS/ws_HCGS3000.wso/fDelTarifarioLote/JSON', params)
            .then(function(response) {
                toaster.success({ title: "Exclusao", body: "Lote excluido com Sucesso" });
                $scope.btnPesquisar();
            }, function(error) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao excluir lote. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
        $scope.loadingState = false;
    }

    $scope.btnLimpar = function() {
        $scope.fMarca = "";
        $scope.fPais = "";
        $scope.fModal = "";
        $scope.fCarrier = "";
        $scope.fPol = "";
        $scope.lsPOL = "";
        $scope.fPod = "";
        $scope.lsPOD = "";
        $scope.fTrade = "";
        $scope.fProduto = "";
        $scope.fTaxa = "";
        $scope.fComercial = "";
        $scope.fOperacional = "";
        $scope.fContainer = "";
        $scope.fValidadeI = "";
        $scope.fValidadeF = "";
        $scope.mDataInicial = "";
        $scope.mDataFinal = "";
        $scope.fContrato = "";
        $scope.fDescricao = "";
        $scope.fPropostaValidade = "";
        $scope.fValor = "";

        $scope.lsResultados = [];
        $scope.listaPesquisa = [];
        $scope.totalItems = 0;
    };

    $scope.abreTela = function(sRowid) {
        url = "PCGS3000_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&RowId=" + sRowid;
        document.location = url;
    };

    init();
});

app.controller('ModalInstanceCtrl', function($uibModalInstance, $scope) {


    $scope.modalOk = function() {

        $uibModalInstance.close();
    };

    $scope.modalCancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});
