// ANGULAR JS
app = angular.module('pcgs300005App', ['ngSanitize', 'Alertify', 'angularSoap', 'diretivas', 'wsDominio', 'smart-table', 'ui.bootstrap', 'datatables', 'datatables.buttons', 'datatables.colreorder', 'ngTagsInput', 'toaster']);

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

app.controller('pcgs300005Controller', function($scope, Alertify, buscaWS, callWS, $http, $q, $compile, toaster, $uibModal) {

    $scope.itemsByPage = 10;
    $scope.currentPage = 1;
    $scope.fCodigo = '';
    $scope.pesquisa = {};
    $scope.multiProp = {};

    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    $scope.sCodigo = getVariavelURL('sCodigo');

    var init = function() {
        buscaWS.get('/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON', '').then(function(data) {
            $scope.lsFretes = data;
        });

        buscaWS.get('/WVDF_WS/ws_CCGS202.wso/f_CCGS202_lista_prop/JSON', 'sProduto=').then(function(data) {
            $scope.lsModalidades = data
        });

        buscaWS.get('/WVDF_WS/ws_CCGS200.wso/f_CCGS200_combo/JSON', '').then(function(data) {
            $scope.lsOperacoes = data;
        });

        buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON', '').then(function(data) {
            $scope.lsPais = data;
        });
    }

    $scope.recarrega = function() {
        montaTabela();
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

    $scope.acCarrier = function(texto) {
        return buscaWS.get('fbcsag342_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    // AUTOCOMPLETE PARA O CAMPO VIA
    $scope.acCidades = function(query) {
        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesVia/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&idPais=&sCidade=' + query)
            .then(function(data) {
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
                return data;
            });
        return data;
    };

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
                return data;
            });
        return data;
    };

    $scope.acPais_O = function(query) {

        var data = buscaWS.get('/WVDF_WS/ws_csag329.wso/buscarPaisesPorDescricao/JSON', 'sPais=' + query)
            .then(function(data) {
                return data;
            });
        return data;
    };

    $scope.acPais_D = function(query) {

        var data = buscaWS.get('/WVDF_WS/ws_csag329.wso/buscarPaisesPorDescricao/JSON', 'sPais=' + query)
            .then(function(data) {
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
        //  
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'idPais': idPais, 'sCidade': cidade };
        return callWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', params)
            .then(function(response) {
                return response.data;
            }, function(error) {
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
        parametros.sTpServico = 'FCL';
        parametros.sColoader = $scope.fcoloader;
        parametros.sClienteDireto = $scope.fclienteDireto;
        parametros.sVia = auxVia;
        parametros.sClasseTaxa = ($scope.fclasseTaxa == undefined) ? "" : $scope.fclasseTaxa;
        parametros.sCliente = ($scope.fCliente == undefined) ? "" : $scope.fCliente;
        parametros.sNac = ($scope.fNac == undefined) ? "" : $scope.fNac;
        parametros.sCodigo = $scope.sCodigo;
        //DATA VALIDADE
        parametros.sDateInicio = ($scope.sDateInicio == undefined) ? "" : $scope.sDateInicio;
        parametros.sDateFim = ($scope.sDateFim == undefined) ? "" : $scope.sDateFim;

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
            debugger;
            return data;
        });
    }

    $scope.btnPesquisar = function() {
        $scope.loadingState = true;
        var params = gerarParametros();
        debugger;
        callWS.get('/WVDF_WS/ws_HCGS3000.wso/fPrePropostaMontageFcl/JSON', params).then(function(response) {
            console.log(response);
            debugger;
            $scope.lsResultados = response.data.comercial;
            $scope.DadosTarifario = response.data.dados;
            // $scope.lsModoEdicao = response.data.edicaocomercial;
            $scope.totalItems = response.data.qtdLinhas;
            $scope.mostraTela = true;
            $scope.loadingState = false;

        }, function(error) {
            toaster.pop({
                type: 'error',
                title: 'Error',
                body: ("Error ao carregar literais. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                bodyOutputType: 'trustedHtml'
            });
            $scope.loadingState = false;
        });

        // callWS.get('/WVDF_WS/ws_HCGS3013.wso/fSaveReferenciaMultiProp/JSON', params).then(function(response) {
        //     debugger;
        //     if (response.data.hasError) {
        //         parent.parent.alertify.error(response.data.msgError); 
        //         return;
        //     }
        //     else {
        //         parent.parent.alertify.success(response.data.msgInfo); 
        //     }

        // });
        
    };

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

    $scope.fGerarProposta = function (index) {
        $scope.loadingState = true;
        var cliente;
        var nac;
        
        if ($scope.fNac == undefined) nac = '';
        else nac = $scope.fNac.id
        
        if ($scope.fCliente == '' || $scope.fCliente == undefined) {
            parent.parent.alertify.error('Cliente Invalido!');
            $scope.loadingState = false;
            return;
        }
        else cliente = $scope.fCliente.id

        var param = '';
        param = 'sCliente=' + cliente +'&sClienteFinal=' + nac;
        param = param + '&origem=' + $scope.DadosTarifario[index].ORI_DS;
        param = param + '&destino=' + $scope.DadosTarifario[index].DES_DS;
        param = param + '&carrier=' + $scope.DadosTarifario[index].CARRIER;

        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fGeneratePropFromTarifario/JSON', param).then(function(data) {
            debugger;
            console.log(data);
            $scope.loadingState = false;
            if (data == '') {parent.parent.alertify.error('Proposta nao pode ser Gerada!'); return;}
            else parent.parent.alertify.success('Proposta Gerada!');
            var url = "Proposta_FCL/PCGS3004_01.html?aUsuarioSessao=" + aUsuarioSessao + "&idCliente=" + $scope.fCliente.id + "&idProposta=" + data + '&MultiProp=1';
            window.top.jaddTab("Nova Proposta - FCL", url);
        });
    }

    init();
});

app.controller('ModalInstance01Ctrl', function($uibModalInstance, $scope) {


    $scope.modalOk = function() {

        $uibModalInstance.close();
    };

    $scope.modalCancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});