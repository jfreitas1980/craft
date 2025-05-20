// ANGULAR JS
app = angular.module('pcgs303306App', ['ngSanitize', 'Alertify', 'angularSoap', 'diretivas', 'wsDominio', 'smart-table', 'ui.bootstrap', 'datatables', 'datatables.buttons', 'datatables.colreorder', 'ngTagsInput', 'toaster']);

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


app.controller('pcgs303306Ctrl', function($scope, Alertify, buscaWS, callWS, $http, $q, $compile, toaster, $uibModal) {

    $scope.acCidadesOrigem = function(texto) {
        var trade = $scope.fContOrigem == null ? 0 : $scope.fContOrigem;
        var pais = $scope.fPaisOrigem == null ? '' : $scope.fPaisOrigem;
        return getCidades(trade, pais, texto);
    };

    $scope.acCidadesDestino = function(texto) {
        var trade = $scope.fContDestino == null ? 0 : $scope.fContDestino;
        var pais = $scope.fPaisDestino == null ? '' : $scope.fPaisDestino;
        return getCidades(trade, pais, texto);
    };

    var getDescricao = function() {
        $scope.loadingState = true;
        var params = { 'aUsuarioSessao': getVariavelURL('aUsuarioSessao') };
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

    getDescricao();

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

    $scope.novaTaxa = function() {
        var url = "PCGS3033_00.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
        window.top.jaddTab("Novo Acordo", url);
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
  
    $scope.montaTabela = function() {
        // debugger;
        buscaWS.get('/WVDF_WS/ws_hsag310.wso/fListarHSAG310/JSON', 'sTabela=' + sTabela).then(function(data) {
            // console.log(data);
            // debugger;
            $scope.colums = data;
        });
    }

    buscaWS.get('/WVDF_WS/ws_hsag310.wso/fListarHSAG310/JSON', 'sTabela=' + sTabela).then(function(data) {
        // debugger;
        if (bComercial) {
            $scope.colums = data;
        } else {
            $scope.colums = data;
        }
    });

    /*vm.someClickHandler = function(info) {
        var url = "PCGS3000_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&RowId=" + info.sRowid;
        document.location = url;
    };*/

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
            buscaWS.get('/WVDF_WS/ws_hcgs3000.wso/f_Del_Tarifario/JSON', 'recId=' + $scope.tarifarioExclusao).then(function(data) {
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

    $scope.acCidades = function(texto) {
        return buscaWS.get('fbcsag325_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    buscaWS.get('/WVDF_WS/ws_CSAG399.wso/listarContinentes/JSON', '').then(function(data) {
        $scope.lsCont = data;
    });

    buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_prod/JSON', '').then(function(data) {
        $scope.lsProdutos = data;
    });

    $scope.acCidadesVia = function(texto) {
        return getCidades(0, '', texto);
    }

    var getPais = function(idTrade, flOriDest) {
        // $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'idCont': idTrade };
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
                //  $scope.loadingState = false;
            }, function(error) {
                //  $scope.loadingState = false;
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar Pais. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    };

    getPais('', '');
    
    $scope.changePaisDestino = function() {
        getPais(($scope.fContDestino == null ? 0 : $scope.fContDestino), 'D');
    };

    $scope.changePaisOrigem = function() {
        getPais(($scope.fContOrigem == null ? 0 : $scope.fContOrigem), 'O');
    };

    $scope.changePaisDestino();
    $scope.changePaisOrigem();

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

        if ($scope.fOrigem != undefined) {
            for (x in $scope.fOrigem) {
                if (auxPol === "") {
                    auxPol = $scope.fOrigem[x].id;
                } else {
                    auxPol += "," + $scope.fOrigem[x].id;
                }
            }
        }

        if ($scope.fDestino != undefined) {
            for (x in $scope.fDestino) {
                if (auxPod === "") {
                    auxPod = $scope.fDestino[x].id;
                } else {
                    auxPod += "," + $scope.fDestino[x].id;
                }
            }
        }

        var parametros = {};
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        //parametros.sMODAL = ($scope.fModal == undefined) ? "" : $scope.fModal;
        parametros.sCARRIER = ($scope.fCarrier == undefined) ? "" : (($scope.fCarrier.id == undefined) ? "" : $scope.fCarrier.id);
        parametros.sAGENTE = ($scope.fAgente == undefined) ? "" : (($scope.fAgente.id == undefined) ? "" : $scope.fAgente.id);
        parametros.sTERMINAL = ($scope.fTerminal == undefined) ? "" : (($scope.fTerminal.id == undefined) ? "" : $scope.fTerminal.id);
        //    parametros.sID_C = ($scope.fComercial == undefined) ? "" : $scope.fComercial;
        //parametros.sID_O = ($scope.fOperacional == undefined) ? "" : $scope.fOperacional;
        //  parametros.sPROD = ($scope.fProduto == undefined) ? "" : $scope.fProduto;
        parametros.sTAXA = ($scope.fTaxa == undefined) ? "" : $scope.fTaxa;
        parametros.sTRADE_ORIGEM = ($scope.fTradeOrigem == undefined) ? "" : $scope.fTradeOrigem;
        parametros.sTRADE_DESTINO = ($scope.fTradeDestino == undefined) ? "" : $scope.fTradeDestino;
        parametros.sCNTR = ($scope.fContainer == undefined) ? "" : $scope.fContainer;
        parametros.sMarca = ($scope.fMarca == undefined) ? "" : $scope.fMarca;
        parametros.sAcordos = ($scope.fAcordos == undefined) ? "" : $scope.fAcordos;
        parametros.sOri = auxPol;
        parametros.sDes = auxPod;
        parametros.sPaisOrigem = ($scope.fPaisOrigem == undefined) ? "" : $scope.fPaisOrigem;
        parametros.sPaisDestino = ($scope.fPaisDestino == undefined) ? "" : $scope.fPaisDestino;
        parametros.sDtBgn = ($scope.mDataInicial == undefined) ? "" : $scope.mDataInicial;
        parametros.sDtEnd = ($scope.mDataFinal == undefined) ? "" : $scope.mDataFinal;
        parametros.sTitulo = ($scope.fTitulo == undefined) ? "" : $scope.fTitulo;
        parametros.fProtocolo = ($scope.fProtocolo == undefined) ? "" : $scope.fProtocolo;
        parametros.sDescricao = ($scope.fDescricao == undefined) ? "" : $scope.fDescricao;
        parametros.sValor = ($scope.fValor == undefined) ? "" : $scope.fValor;
        parametros.sPropostaValidade = ($scope.fPropostaValidade == undefined) ? "" : $scope.fPropostaValidade;
        parametros.sTpServico = $scope.fTpServico;
        parametros.sColoader = $scope.fcoloader;
        parametros.sClienteDireto = $scope.fclienteDireto;
        parametros.sCliente = ($scope.fCliente == undefined) ? "" : $scope.fCliente;
        parametros.sNAC = ($scope.fNAC == undefined) ? "" : $scope.fNAC;
        parametros.sVia = ($scope.fvia == undefined) ? "" : $scope.fvia;
        parametros.sTaxa = ($scope.fTaxa == undefined) ? "" : $scope.fTaxa;
        parametros.sClasseTaxa = ($scope.fclasseTaxa == undefined) ? "" : $scope.fclasseTaxa;

        parametros.itemsByPage = ($scope.itemsByPage == undefined) ? 0 : $scope.itemsByPage;
        parametros.currentPage = $scope.currentPage;
        parametros.aUsuarioSessao = aUsuarioSessao;

        $scope.pesquisa.params = parametros;
        var entidade = JSON.stringify($scope.pesquisa.params);
        var params = { 'sJSON': entidade };
        return params
    }

    $scope.acCliente = function(texto) {
        return buscaWS.get('fbcsag340_clientenome.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    }

    $scope.btnPesquisar = function() {
        $scope.loadingState = true;
        // debugger;
        var params = gerarParametros();
        callWS.get('/WVDF_WS/ws_HCGS3033.wso/relatorioHCGS3033/JSON', params)
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
        window.top.jaddTab("Acordo #" + $scope.listaPesquisa[index].protocolo, "PCGS3033_00.html?aUsuarioSessao=" + aUsuarioSessao + "&idAcordo=" + recId);
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
        $scope.fAgente = "";
        $scope.fTerminal = "";
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

        $scope.fTpServico = '';
        $scope.fTitulo = '';
        $scope.fProtocolo = '';
        $scope.fAcordos = '';
        $scope.fTradeOrigem = '';
        $scope.fPaisOrigem = '';
        $scope.fOrigem = '';
        $scope.fTradeDestino = '';
        $scope.fPaisDestino = '';
        $scope.fDestino = '';
        $scope.fvia = '';
        $scope.fCliente = '';
        $scope.fNAC = '';
        $scope.fcoloader = false;
        $scope.fclienteDireto = false;

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
