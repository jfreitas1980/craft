// ANGULAR JS
app = angular.module('pcgs300003App', ['ngSanitize', 'Alertify', 'angularSoap', 'diretivas', 'wsDominio', 'smart-table', 'ui.bootstrap', 'datatables', 'datatables.buttons', 'datatables.colreorder', 'ngTagsInput', 'toaster']);

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

app.controller('pcgs300003Controller', function($scope, Alertify, buscaWS, callWS, $http, $q, $compile, toaster, $uibModal) {

    var bComercial = getVariavelURL('bComercial');
    $scope.exibeExclusaoLote = !bComercial;
    $scope.exibeLupa = !bComercial;
    $scope.classeTaxa = [];

    $scope.itemsByPage = 10;
    $scope.currentPage = 1;
    $scope.pesquisa = {};

    var sTabela = getVariavelURL('sTabela');
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    $scope.modalColunas = "PHSAG310_01.asp?aUsuarioSessao=" + aUsuarioSessao + "&aTabela=" + sTabela;
    $scope.lsModalidades = [];
    $scope.tbAtualizar = {};
    $scope.NotShow = false;
    
    var init = function() {
        getTaxas();
        getModalidades();
        montaTabela();

        buscaWS.get('/WVDF_WS/ws_ccgs221.wso/f_class_tx/JSON', '').then(function(data) {
            console.log(data);
            $scope.classeTaxa = data;
        });

        var comboImoTipos = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/fImoTiposCombo/JSON', '').then(function(data) {
            $scope.lsImoTipos = data;
        });
    } 

    // var getMoedas = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_ccgs218.wso/buscarMoeda_proposta/JSON', params).then(function(response) {
            $scope.lsMoedas = response.data;
        });
    // }

    // var getMarcas = function() {
        parametros = 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + "&sCONTEUDO=" + '' + "&Cliente=" + getVariavelURL('idCliente');
        buscaWS.get('/WVDF_WS/ws_csag308.wso/f_fup_csag308_combo/JSON', parametros).then(function(data) {
            $scope.lsMarcas = data
        });
    // }

    // var getModPgto = function() {
        buscaWS.get('/WVDF_WS/ws_ccgs206.wso/listarModPgtoGuide/JSON', '').then(function(data) {
            $scope.lsModPgto = data;
        });
    // }

    // var getEmbarques = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS204.wso/f_CCGS204_lista/JSON', '').then(function(data) {
            $scope.lsEmbarques = data;
        });
    // }

    // var getFrete = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON', '').then(function(data) {
            $scope.lsFretes = data;
        });
    // }

    // var getModalidades = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS202.wso/f_CCGS202_lista_prop/JSON', 'sProduto=').then(function(data) {
            $scope.lsModalidades = data
        });
    // }

    // var getTpOperacao = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS200.wso/f_CCGS200_combo/JSON', '').then(function(data) {
            $scope.lsOperacoes = data;
        });
    // }

    // var getIncoterm = function() {
        buscaWS.get('/WVDF_WS/ws_HCGS3000.wso/f_combo_incorterm/JSON', '').then(function(data) {
            $scope.lsIncoterm = data;
        });
    // }

    // var getPais = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON', '').then(function(data) {
            $scope.lsPais = data;
        });
    // }

    // var getContainers = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS217.wso/f_CCGS217_lista/JSON', '').then(function(data) {
            // 
            $scope.lsContainer = data;
        });
    // }

    // var getTpCalculos = function() {
        buscaWS.get('/WVDF_WS/ws_ccgs220.wso/f_combo_tpcalc/JSON', 'aModal=').then(function(data) {
            $scope.lsCalculos = data;
        });
    // }

    // var getPackageType = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS228.wso/f_CCGS228_pkg_type/JSON', '').then(function(data) {
            $scope.lsPackages = data;
        });
    // }

    // var getMotivosCancelamento = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS229.wso/listaMotivosProp/JSON', '').then(function(data) {
            $scope.StatusProposta = data;
        });
    // }
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
        buscaWS.get('/WVDF_WS/ws_CSAG310.wso/fHcgs3000_3/JSON', 'sTabela=HCGS3000_3').then(function(data) {
            // console.log(data);
            console.log(data);
            $scope.colums = data;
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

    // AUTOCOMPLETE PARA O CAMPO VIA
    $scope.acCidades = function(query) {
        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesVia/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&idPais=&sCidade=' + query)
            .then(function(data) {
                // console.log(data);
                return data;
            });
        return data;
    }; 

    $scope.acCidades_D = function(query) {
        var paisID = "";

        if ($scope.fPaisD != undefined) {
            for (x in $scope.fPaisD) {
                if (paisID === "") {
                    paisID = $scope.fPaisD[x].id;
                } else {
                    paisID += "," + $scope.fPaisD[x].id;
                }
            }
        }

        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&idPais=' + paisID + '&sCidade=' + query)
            .then(function(data) {
                // console.log(data);
                return data;
            });
        return data;
    };

    // $scope.acAgente = function(texto) {
    //         return buscaWS.get('fbcsag345_descricao.asp', 'term=' + texto).then(function(data) {
    //             return data;
    //         });
    //     };

    $scope.acAgentesO = function(query) {
        return buscaWS.get('fbcsag345_descricao.asp', 'term=' + query).then(function(data) {
            return data;
        });
    };

    $scope.acAgentesD = function(query) {
        return buscaWS.get('fbcsag345_descricao.asp', 'term=' + query).then(function(data) {
            return data;
        });
    };

    $scope.acCidades_O = function(query) {
        var paisID = "";

        if ($scope.fPais != undefined) {
            for (x in $scope.fPais) {
                if (paisID === "") {
                    paisID = $scope.fPais[x].id;
                } else {
                    paisID += "," + $scope.fPais[x].id;
                }
            }
        }

        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&idPais=' + paisID + '&sCidade=' + query)
            .then(function(data) {
                // console.log(data);
                return data;
            });
        return data;
    };

    $scope.acPais_O = function(query) {

        var data = buscaWS.get('/WVDF_WS/ws_csag329.wso/buscarPaisesPorDescricao/JSON', 'sPais=' + query)
            .then(function(data) {
                // console.log(data);
                return data;
            });
        return data;
    };

    $scope.acPais_D = function(query) {

        var data = buscaWS.get('/WVDF_WS/ws_csag329.wso/buscarPaisesPorDescricao/JSON', 'sPais=' + query)
            .then(function(data) {
                // console.log(data);
                return data;
            });
        return data;
    };

    buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON', '').then(function(data) {
        $scope.lsPais = data;
    });

    buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_prod/JSON', '').then(function(data) {
        $scope.lsProdutos = data;
    });

    $scope.acCidadesVia = function(texto) {
        return getCidades('', texto);
    }

    var getCidades = function(idPais, cidade) {
        //  $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'idPais': idPais, 'sCidade': cidade };
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
        
        $scope.loadingState = true;
        var params = gerarParametros();
        callWS.get('/WVDF_WS/ws_HCGS3000.wso/f_excel_tarifario/JSON', params)
            .then(function(response) {
                console.log(response);
                $scope.lsResults = response.data.dados;
                var blob = new Blob([document.getElementById('export').innerHTML], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "Report.xls");
                $scope.loadingState = false;
        });
            
    };

    var gerarParametros = function() {
        $scope.lsResultados = "";
        var auxPol = "";
        var auxPod = "";
        var auxPaisO = "";
        var auxPaisD = "";
        var auxVia = "";
        var auxAgO = "";
        var auxAgD = "";

        if ($scope.fAgenteO != undefined) {
            for (x in $scope.fAgenteO) {
                if (auxAgO === "") {
                    auxAgO = $scope.fAgenteO[x].id;
                } else {
                    auxAgO += "," + $scope.fAgenteO[x].id;
                }
            }
        }

        if ($scope.fAgenteD != undefined) {
            for (x in $scope.fAgenteD) {
                if (auxAgD === "") {
                    auxAgD = $scope.fAgenteD[x].id;
                } else {
                    auxAgD += "," + $scope.fAgenteD[x].id;
                }
            }
        }
        //----------------
        if ($scope.fVia != undefined) {
            for (x in $scope.fVia) {
                if (auxVia === "") {
                    auxVia = $scope.fVia[x].id;
                } else {
                    auxVia += "," + $scope.fVia[x].id;
                }
            }
        }

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

        if ($scope.fPaisD != undefined) {
            for (x in $scope.fPaisD) {
                if (auxPaisD === "") {
                    auxPaisD = $scope.fPaisD[x].id;
                } else {
                    auxPaisD += "," + $scope.fPaisD[x].id;
                }
            }
        }

        if ($scope.fPais != undefined) {
            for (x in $scope.fPais) {
                if (auxPaisO === "") {
                    auxPaisO = $scope.fPais[x].id;
                } else {
                    auxPaisO += "," + $scope.fPais[x].id;
                }
            }
        }

        var parametros = {};
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        parametros.sCARRIER = ($scope.fCarrier == undefined) ? "" : (($scope.fCarrier.id == undefined) ? "" : $scope.fCarrier.id);
        parametros.sTAXA = ($scope.fTaxa == undefined) ? "" : $scope.fTaxa;
        parametros.sTRADE = ($scope.fTrade == undefined) ? "" : $scope.fTrade;
        parametros.sCNTR = ($scope.fContainer == undefined) ? "" : $scope.fContainer;
        parametros.sMarca = ($scope.fMarca == undefined) ? "" : $scope.fMarca;
        parametros.sAgO = auxAgO;
        parametros.sAgD = auxAgD;
        parametros.sOri = auxPol;
        parametros.sDes = auxPod;
        parametros.sPais = auxPaisO;
        parametros.sPaisD = auxPaisD;
        parametros.sDtBgn = ($scope.mDataInicial == undefined) ? "" : $scope.mDataInicial;
        parametros.sDtEnd = ($scope.mDataFinal == undefined) ? "" : $scope.mDataFinal;
        parametros.sContrato = ($scope.fContrato == undefined) ? "" : $scope.fContrato;
        parametros.sDescricao = ($scope.fDescricao == undefined) ? "" : $scope.fDescricao;
        parametros.sValor = ($scope.fValor == undefined) ? "" : $scope.fValor;
        parametros.sPropostaValidade = ($scope.fPropostaValidade == undefined) ? "" : $scope.fPropostaValidade;
        parametros.sTpServico = $scope.fTpServico;
        parametros.sColoader = $scope.fcoloader;
        parametros.sClienteDireto = $scope.fclienteDireto;
        parametros.sVia = auxVia;
        parametros.sClasseTaxa = ($scope.fclasseTaxa == undefined) ? "" : $scope.fclasseTaxa;
        parametros.sCliente = ($scope.fCliente == undefined) ? "" : $scope.fCliente;

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
        var params = gerarParametros();
        callWS.get('/WVDF_WS/ws_HCGS3000.wso/f_PesquisaComercial/JSON', params).then(function(response) {
            console.log(response);
            debugger;
            $scope.lsResultados = response.data.comercial;
            // $scope.lsModoEdicao = response.data.edicaocomercial;
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

    $scope.fChangingRecord = function(row) {


    }
    
    $scope.btnLimpar = function() {
        $scope.fMarca = "";
        $scope.fPais = "";
        $scope.fPaisD = "";
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
        $scope.fCliente = '';

        $scope.lsResultados = [];
        $scope.listaPesquisa = [];
        $scope.totalItems = 0;
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