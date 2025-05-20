$(document).ready(function() {
    $('#dtInicial').mask('99/99/9999').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    });

    $('#dtFinal').mask('99/99/9999').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    });

});

// ANGULAR JS
var app = angular.module('pcgs303300App', ['ngSanitize', 'Alertify', 'angularSoap', 'diretivas', 'wsDominio', 'smart-table', 'ui.bootstrap',
    'datatables', 'datatables.buttons', 'datatables.colreorder', 'ngTagsInput', 'toaster'
]);

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

app.controller('pcgs303300Controller', function($scope, Alertify, buscaWS, callWS, $http, $q, $compile, toaster, $uibModal) {
    
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    var idAcordo = getVariavelURL('idAcordo');
    $scope.lsModalidades = [];
    $scope.habilitado = false;
    
    $scope.loadingState=false;
    
    $scope.acordo = [];
    $scope.acordo.idAcordo = '';
    $scope.acordo.ID = '';

    $scope.pesquisa = {};
    $scope.lsResultados = {};
    $scope.lsPesquisa = {};
    
    var init = function() {
        getTaxas();
        getModalidades();
        getMoedas();
        getModPgto();
        getTpCalculos();
    }

    if (idAcordo) {
        callWS.get('/WVDF_WS/ws_HCGS3033.wso/fZoomAcordos/JSON', { 'aUsuarioSessao': aUsuarioSessao, 'idAcordo': idAcordo })
        .then(function(response) {
            $scope.acordo = response.data;
        });
    }

    $scope.ClearAba1 = function() {

        $scope.acordo.itemsByPage = 10;
        $scope.acordo.currentPage = 1;

    }

    $scope.ClearAba2 = function() {

        $scope.pesquisa.itemsByPage = 10;
        $scope.pesquisa.currentPage = 1;  
        $scope.totalItems = 0;      

    }

    // AutoComplete de Clientes
    $scope.acClientes = function(texto) {
        return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/f_proposta_complete_client/JSON', 'sInicio=' + texto).then(function(data) {
            return data;
        });
    };

    // autocomplete de Agentes
    $scope.acAgentes = function(query) {
        return buscaWS.get('fbcsag345_descricao.asp', 'term=' + query).then(function(data) {
            return data;
        });
    };

    // autocomplete de Terminal
    $scope.acTerminal = function(query) {
        return buscaWS.get('fbcsag346_descricao.asp', 'term=' + query).then(function(data) {
            return data;
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
    
    $scope.classeTaxa = [];

    buscaWS.get('/WVDF_WS/ws_ccgs221.wso/f_class_tx/JSON', '').then(function(data) {
        console.log(data);
        $scope.classeTaxa = data;
    });

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

    // $scope.loadCidade = function(query, tipo) {
    //     // 
    //     var pais = '';
    //     var parametros = 'aInicio=' + query;
    //     if (tipo == 'D') {
    //         // for (var i = $scope.pesquisa.paisdest.length - 1; i >= 0; i--) {
    //         //     if (pais == '') {pais = $scope.pesquisa.paisdest[i].id;}
    //         //     else {pais += ','+$scope.pesquisa.paisdest[i].id;}
    //         // }
    //         parametros += '&aPais=' + pais;
    //     }
    //     if (tipo == 'O') {
    //         // for (var i = $scope.pesquisa.paisorig.length - 1; i >= 0; i--) {
    //         //     if (pais == '') {pais = $scope.pesquisa.paisorig[i].id;}
    //         //     else {pais += ','+$scope.pesquisa.paisorig[i].id;}
    //         // }
    //         parametros += '&aPais=' + pais
    //     }
    //     var data = buscaWS.get('/WVDF_WS/ws_CSAG325.wso/autoCidades/JSON', parametros)
    //         .then(function(data) {
    //             // 
    //             // console.log(data);
    //             debugger;
    //             return data;
    //         });
    //     return data;
    // }

    $scope.acCidades = function(query) {
        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/autoCidades/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&aPais=&aInicio=' + query)
        // var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&idPais=&sCidade=' + query)
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

        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/autoCidades/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&aPais=&aInicio=' + query)
        // var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&idPais=' + paisID + '&sCidade=' + query)
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

        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/autoCidades/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&aPais=&aInicio=' + query)
        // var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&idPais=' + paisID + '&sCidade=' + query)
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

    $scope.btnGerar = function() {
        // 
        var params;
        // var params = { 'aUsuarioSessao': aUsuarioSessao, 'sProduto': '' };
        params = {'sCliente':$scope.acordo.Cliente,'ValidadeI':$scope.acordo.validadeI,'ValidadeF':$scope.acordo.validadeF,'sSeuCliente':$scope.acordo.seuCliente,'sTitulo':$scope.acordo.titulo,'aUsuarioSessao':aUsuarioSessao};
        callWS.get('/WVDF_WS/ws_HCGS3033.wso/f_gerarAcordo/JSON', params).then(function(response) {
        // callWS.get('/WVDF_WS/ws_HCGS3033.wso/f_gerarAcordo/JSON', params).then(function(data) {
            
            if (data !== ''){
                $scope.acordo.idAcordo = data;
            }
            else {
                // toaster.pop('error', "Error",'Erro, ', null, 'trustedHtml');
                parent.parent.alertify.error("Error");
                return;
            }

        });

    };

    var getCidades = function(idPais, cidade) {
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

    // COMBO CONTAINER
    buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_cntr/JSON', '').then(function(data) {
        $scope.lsContainer = data;
    });

    // COMBO INCOTERM
    buscaWS.get('/WVDF_WS/ws_HCGS3000.wso/f_combo_incorterm/JSON', '').then(function(data) {
        $scope.lsIncoterm = data;
    });

    $scope.btnLimpar = function() {
        // 
        $scope.acordo = {};
        $scope.acordo.idAcordo = '';
        $scope.acordo.ID = '';

        $scope.totalItems = 0;
        // $scope.totalItemsCad = 0;

        $scope.pesquisa.itemsByPage = 10;
        $scope.pesquisa.currentPage = 1;

        $scope.acordo.itemsByPage = 10;
        $scope.acordo.currentPage = 1;
        
        // $scope.itemsByPageCad = 10;
        // $scope.currentPageCad = 1;
        
        $scope.pesquisa = {};

    };

    // novo
    $scope.cadastrarAcordo = function() {
        $scope.loadingState = true;
        
        $scope.acordo.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        var cad = {};
        var auxCliente = "";
        var auxSeuCliente = "";
        
        if ($scope.acordo.Cliente != undefined) {
            for (x in $scope.acordo.Cliente) {
                if (auxCliente === "") {
                    auxCliente = $scope.acordo.Cliente[x].idCliente;
                } else {
                    auxCliente += "," + $scope.acordo.Cliente[x].idCliente;
                }
            }
        }

        if ($scope.acordo.seuCliente != undefined) {
            for (x in $scope.acordo.seuCliente) {
                if (auxSeuCliente === "") {
                    auxSeuCliente = $scope.acordo.seuCliente[x].idCliente;
                } else {
                    auxSeuCliente += "," + $scope.acordo.seuCliente[x].idCliente;
                }
            }
        }

        cad.AgenteOrigem = ($scope.acordo.AgenteOrigem == undefined) ? "" : (($scope.acordo.AgenteOrigem.id == undefined) ? "" : $scope.acordo.AgenteOrigem.id);
        cad.AgenteDestino = ($scope.acordo.AgenteDestino == undefined) ? "" : (($scope.acordo.AgenteDestino.id == undefined) ? "" : $scope.acordo.AgenteDestino.id);
        cad.TerminalOrigem = ($scope.acordo.TerminalOrigem == undefined) ? "" : (($scope.acordo.TerminalOrigem.id == undefined) ? "" : $scope.acordo.TerminalOrigem.id);
        cad.TerminalDestino = ($scope.acordo.TerminalDestino == undefined) ? "" : (($scope.acordo.TerminalDestino.id == undefined) ? "" : $scope.acordo.TerminalDestino.id);

        //fora de uso
        // 'sAgOrg':cad.AgenteOrigem,
        // 'sAgDst':cad.AgenteDestino,
        // 'sTrOrg':cad.TerminalOrigem,
        // 'sTrDst':cad.TerminalDestino,

        if (auxCliente == '' || auxCliente == undefined) {
            parent.parent.alertify.error('Cliente(s) do Acordo nao definido!');
            return;
        }
        if ($scope.acordo.validadeI == '' || $scope.acordo.validadeI == undefined) {
            parent.parent.alertify.error('Validade Inicial do Acordo nao definida!');
            return; 
        }
        if ($scope.acordo.validadeF == '' || $scope.acordo.validadeF == undefined) {
            parent.parent.alertify.error('Validade Final do Acordo nao definida!');
            return;
        }
        if ($scope.acordo.titulo == '' || $scope.acordo.titulo == undefined) {
            parent.parent.alertify.error('Titulo do Acordo nao definido!');
            return;
        }
        if ($scope.acordo.TpServico == '' || $scope.acordo.TpServico == undefined) {
            parent.parent.alertify.error('Tipo de Servico do Acordo nao definido!');
            return;
        }

        var params = {
            'sCliente':auxCliente,
            'ValidadeI':$scope.acordo.validadeI,
            'ValidadeF':$scope.acordo.validadeF,
            'sSeuCliente':auxSeuCliente,
            'sTitulo':$scope.acordo.titulo,
            'aUsuarioSessao':aUsuarioSessao,
            'idadc':$scope.acordo.ID,
            'sModulo':$scope.acordo.TpServico
        };

        var entidade = JSON.stringify(params);
        debugger;
        callWS.get('/WVDF_WS/ws_HCGS3033.wso/fGravarAcordo/JSON', { 'sJSON': entidade }).then(function(response) {
            $scope.loadingState = false;
            
            if (response.data.defaultMessage.hasError) {
                $scope.acordo.idAcordo = '';
                // toaster.pop('error', "Error", response.data.defaultMessage.msgError, null, 'trustedHtml');
                parent.parent.alertify.error(response.data.defaultMessage.msgError);
                return;
            }
            else {
                $scope.acordo.idAcordo = response.data.protocolo;   
                $scope.acordo.ID = response.data.id;
                // toaster.pop('success', "Success", response.data.defaultMessage.msgInfo, null, 'trustedHtml');
                parent.parent.alertify.success(response.data.defaultMessage.msgInfo);
                return;
            }

        });

        $scope.loadingState = false;
    };

    $scope.btnTableSaveRow = function(row) {
        
        $scope.loadingState = true;
        if (row.VLC == 'Guide') row.VLC = -1;
        if (row.VLC_MIN == 'Guide') row.VLC_MIN = 0;
        if (row.VLC_MAX == 'Guide') row.VLC_MAX = 0;

        var params = {'aUsuarioSessao':aUsuarioSessao,'idTarifario':row.recId,'idAcordo':$scope.acordo.ID,
            'venda_v':row.VLV,'venda_min':row.VLV_MIN,'venda_max':row.VLV_MAX,
            'venda_md':row.MD_V_ID,'venda_mod':row.MODPGTOV_ID,'venda_tp':row.TPV_CAL_ID,
            'compra_v':row.VLC,'compra_min':row.VLC_MIN,'compra_max':row.VLC_MAX,
            'compra_md':row.MD_C_ID,'compra_mod':row.MODPGTOC_ID,'compra_tp':row.TPC_CAL_ID,
            'volume':row.VOLUME,'peso':row.PESO
        };

        var entidade = JSON.stringify(params);
        debugger;
        callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_save/JSON', { 'sJSON': entidade }).then(function(response) {

            $scope.btnPesquisarCad();
            row.editable = false;

            if (response.data.defaultMessage.hasError) {
                parent.parent.alertify.error(response.data.defaultMessage.msgError);
                // toaster.pop('error', "Error", , null, 'trustedHtml');
                return;
            }
            else {
                parent.parent.alertify.success(response.data.defaultMessage.msgInfo);
                // toaster.pop('success', "Success", response.data.defaultMessage.msgInfo, null, 'trustedHtml');
                return;
            }

        });
    }

    //--- ALIMENTA O COMBO COM OS CAMPOS.
    buscaWS.get('/WVDF_WS/ws_hsag310.wso/fListarCSAG310/JSON', '').then(function(data) {
        // console.log(data);
        console.log(data);
        $scope.colums = data;
    });

    $scope.acordo.itemsByPage = 10;
    $scope.acordo.currentPage = 1;

    $scope.pesquisa.itemsByPage = 10;
    $scope.pesquisa.currentPage = 1;
    
    $scope.pesquisa = {};

    var gerarParametrosCad = function() {
        $scope.lsResultados = "";
        var auxPol = "";
        var auxPod = "";
        var auxPaisO = "";
        var auxPaisD = "";
        var auxVia = "";
        var auxAgO = "";
        var auxAgD = "";

        // 

        if ($scope.acordo.AgenteO != undefined) {
            for (x in $scope.acordo.AgenteO) {
                if (auxAgO === "") {
                    auxAgO = $scope.acordo.AgenteO[x].id;
                } else {
                    auxAgO += "," + $scope.acordo.AgenteO[x].id;
                }
            }
        }
        //--- AGENTE DESTINO
        if ($scope.acordo.AgenteD != undefined) {
            for (x in $scope.acordo.AgenteD) {
                if (auxAgD === "") {
                    auxAgD = $scope.acordo.AgenteD[x].id;
                } else {
                    auxAgD += "," + $scope.acordo.AgenteD[x].id;
                }
            }
        }
        //--- VIA
        if ($scope.acordo.Via != undefined) {
            for (x in $scope.acordo.Via) {
                if (auxVia === "") {
                    auxVia = $scope.acordo.Via[x].id;
                } else {
                    auxVia += "," + $scope.acordo.Via[x].id;
                }
            }
        }
        //--- CIDADE ORIGEM
        if ($scope.acordo.Pol != undefined) {
            for (x in $scope.acordo.Pol) {
                if (auxPol === "") {
                    auxPol = $scope.acordo.Pol[x].id;
                } else {
                    auxPol += "," + $scope.acordo.Pol[x].id;
                }
            }
        }
        //--- CIDADE DESTINO
        if ($scope.acordo.Pod != undefined) {
            for (x in $scope.acordo.Pod) {
                if (auxPod === "") {
                    auxPod = $scope.acordo.Pod[x].id;
                } else {
                    auxPod += "," + $scope.acordo.Pod[x].id;
                }
            }
        }
        //--- PAIS DESTINO
        if ($scope.acordo.PaisD != undefined) {
            for (x in $scope.acordo.PaisD) {
                if (auxPaisD === "") {
                    auxPaisD = $scope.acordo.PaisD[x].id;
                } else {
                    auxPaisD += "," + $scope.acordo.PaisD[x].id;
                }
            }
        }
        //--- PAIS ORIGEM
        if ($scope.acordo.PaisO != undefined) {
            for (x in $scope.acordo.PaisO) {
                if (auxPaisO === "") {
                    auxPaisO = $scope.acordo.PaisO[x].id;
                } else {
                    auxPaisO += "," + $scope.acordo.PaisO[x].id;
                }
            }
        }

        var parametros = {};
        parametros.idAcordo = $scope.acordo.ID;
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        parametros.sCARRIER = ($scope.acordo.Carrier == undefined) ? "" : (($scope.acordo.Carrier.id == undefined) ? "" : $scope.acordo.Carrier.id);
        parametros.sTAXA = ($scope.acordo.Taxa == undefined) ? "" : $scope.acordo.Taxa;
        parametros.sCNTR = ($scope.acordo.Container == undefined) ? "" : $scope.acordo.Container;
        parametros.sMarca = ($scope.acordo.Marca == undefined) ? "" : $scope.acordo.Marca;
        parametros.sAgO = auxAgO;
        parametros.sAgD = auxAgD;
        parametros.sOri = auxPol;
        parametros.sDes = auxPod;
        parametros.sPais = auxPaisO;
        parametros.sPaisD = auxPaisD;
        parametros.sContO = $scope.acordo.ContO;
        parametros.sContD = $scope.acordo.ContD;
        parametros.sIncoterm = $scope.acordo.Incoterm;
        parametros.sTpServico = $scope.acordo.TpServico;
        parametros.sVia = auxVia;
        parametros.sClasseTaxa = ($scope.acordo.ClasseTaxa == undefined) ? "" : $scope.acordo.ClasseTaxa;
        
        parametros.itemsByPage = ($scope.acordo.itemsByPage == undefined) ? 10 : $scope.acordo.itemsByPage;
        parametros.currentPage = ($scope.acordo.currentPage == undefined) ? 1 : $scope.acordo.currentPage;
        parametros.aUsuarioSessao = aUsuarioSessao;

        $scope.pesquisa.params = parametros;
        var entidade = JSON.stringify($scope.pesquisa.params);
        var params = { 'sJSON': entidade };
        return params

    }

    $scope.btnPesquisarRel = function() {
        $scope.loadingState = true; 
        // 
        var params = gerarParametrosPesquisa();
        console.log(params);
        debugger;
        callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_lista/JSON', params)
            .then(function(response) {
                console.log(response);
                $scope.lsPesquisa = response.data.dados;
                $scope.totalItems = response.data.qtdLinhas;

                $scope.loadingState = false;
            });
    };


    $scope.btnPesquisarCad = function() {
        $scope.loadingState = true;
        
        var params = gerarParametrosCad();
        debugger;
        callWS.get('/WVDF_WS/ws_HCGS3000.wso/f_acordo_tarifario/JSON', params)
            .then(function(response) {
                console.log(response);
                
                $scope.lsResultados = response.data.dados;
                $scope.totalItems = response.data.qtdLinhas;
                
                $scope.loadingState = false;
            });
    };

    var getMoedas = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'aInicial': '' };
        return callWS.get('/WVDF_WS/ws_ccgs218.wso/buscarMoeda/JSON', params)
            .then(function(response) {
                $scope.lsMoedas = response.data;
            });
    }

    var getModPgto = function() {
        buscaWS.get('/WVDF_WS/ws_ccgs206.wso/listarModPgtoGuide/JSON', '').then(function(data) {
            $scope.lsModPgto = data;
        });
    }

    var getTpCalculos = function() {
        buscaWS.get('/WVDF_WS/ws_ccgs220.wso/f_combo_tpcalc/JSON', 'aModal=').then(function(data) {
            
            $scope.lsCalculos = data;
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

    var gerarParametrosPesquisa = function() {
        $scope.lsResultados = "";
        var auxPol = "";
        var auxPod = "";
        var auxPaisO = "";
        var auxPaisD = "";
        var auxVia = "";
        var auxAgO = "";
        var auxAgD = "";

        // 

        if ($scope.pesquisa.AgenteO != undefined) {
            for (x in $scope.pesquisa.AgenteO) {
                if (auxAgO === "") {
                    auxAgO = $scope.pesquisa.AgenteO[x].id;
                } else {
                    auxAgO += "," + $scope.pesquisa.AgenteO[x].id;
                }
            }
        }
        //--- AGENTE DESTINO
        if ($scope.pesquisa.AgenteD != undefined) {
            for (x in $scope.pesquisa.AgenteD) {
                if (auxAgD === "") {
                    auxAgD = $scope.pesquisa.AgenteD[x].id;
                } else {
                    auxAgD += "," + $scope.pesquisa.AgenteD[x].id;
                }
            }
        }
        //--- VIA
        if ($scope.pesquisa.Via != undefined) {
            for (x in $scope.pesquisa.Via) {
                if (auxVia === "") {
                    auxVia = $scope.pesquisa.Via[x].id;
                } else {
                    auxVia += "," + $scope.pesquisa.Via[x].id;
                }
            }
        }
        //--- CIDADE ORIGEM
        if ($scope.pesquisa.Pol != undefined) {
            for (x in $scope.pesquisa.Pol) {
                if (auxPol === "") {
                    auxPol = $scope.pesquisa.Pol[x].id;
                } else {
                    auxPol += "," + $scope.pesquisa.Pol[x].id;
                }
            }
        }
        //--- CIDADE DESTINO
        if ($scope.pesquisa.Pod != undefined) {
            for (x in $scope.pesquisa.Pod) {
                if (auxPod === "") {
                    auxPod = $scope.pesquisa.Pod[x].id;
                } else {
                    auxPod += "," + $scope.pesquisa.Pod[x].id;
                }
            }
        }
        //--- PAIS DESTINO
        if ($scope.pesquisa.PaisD != undefined) {
            for (x in $scope.pesquisa.PaisD) {
                if (auxPaisD === "") {
                    auxPaisD = $scope.pesquisa.PaisD[x].id;
                } else {
                    auxPaisD += "," + $scope.pesquisa.PaisD[x].id;
                }
            }
        }
        //--- PAIS ORIGEM
        if ($scope.pesquisa.PaisO != undefined) {
            for (x in $scope.pesquisa.PaisO) {
                if (auxPaisO === "") {
                    auxPaisO = $scope.pesquisa.PaisO[x].id;
                } else {
                    auxPaisO += "," + $scope.pesquisa.PaisO[x].id;
                }
            }
        }

        var parametros = {};
        parametros.idAcordo = $scope.acordo.ID;
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        parametros.sCARRIER = ($scope.pesquisa.Carrier == undefined) ? "" : (($scope.pesquisa.Carrier.id == undefined) ? "" : $scope.pesquisa.Carrier.id);
        parametros.sTAXA = ($scope.pesquisa.Taxa == undefined) ? "" : $scope.pesquisa.Taxa;
        parametros.sCNTR = ($scope.pesquisa.Container == undefined) ? "" : $scope.pesquisa.Container;
        parametros.sMarca = ($scope.pesquisa.Marca == undefined) ? "" : $scope.pesquisa.Marca;
        parametros.sAgO = auxAgO;
        parametros.sAgD = auxAgD;
        parametros.sOri = auxPol;
        parametros.sDes = auxPod;
        parametros.sPais = auxPaisO;
        parametros.sPaisD = auxPaisD;
        parametros.sContO = $scope.pesquisa.ContO;
        parametros.sContD = $scope.pesquisa.ContD;
        parametros.sIncoterm = $scope.pesquisa.Incoterm;
        parametros.sTpServico = $scope.pesquisa.TpServico;
        parametros.sVia = auxVia;
        parametros.sClasseTaxa = ($scope.pesquisa.ClasseTaxa == undefined) ? "" : $scope.pesquisa.ClasseTaxa;

        parametros.itemsByPage = ($scope.pesquisa.itemsByPage == undefined) ? 10 : $scope.pesquisa.itemsByPage;
        parametros.currentPage = ($scope.pesquisa.currentPage == undefined) ? 1 : $scope.pesquisa.currentPage;
        parametros.aUsuarioSessao = aUsuarioSessao;

        $scope.pesquisa.params = parametros;
        var entidade = JSON.stringify($scope.pesquisa.params);
        var params = { 'sJSON': entidade };
        return params
    }

    $scope.deleteRow = function(tarifario) {
        buscaWS.get('/WVDF_WS/ws_hcgs3034.wso/f_Del_acd/JSON', 'recId=' + tarifario).then(function(data) {
            $scope.btnPesquisarRel();
            // toaster.pop('success', "Success", , null, 'trustedHtml');
            parent.parent.alertify.success("Excluido com Sucesso");
            return;
        });
    }

    init();
});