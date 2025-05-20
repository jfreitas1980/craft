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
    // var bComercial = getVariavelURL('bComercial');
    // $scope.exibeExclusaoLote = !bComercial;
    // var sTabela = getVariavelURL('sTabela');
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    $scope.pesquisa = [];
    // $scope.pesquisa.idAcordo = '';
    $scope.pesquisa.idAcordo = getVariavelURL('idAcordo');
    // $scope.modalColunas = "PHSAG310_01.asp?aUsuarioSessao=" + aUsuarioSessao + "&aTabela=" + sTabela;
    $scope.lsModalidades = [];
    
    var init = function() {
        getTaxas();
        getModalidades();
        getMoedas();
        getModPgto();
        getTpCalculos();
    }

    callWS.get('/WVDF_WS/ws_ccgs218.wso/buscarMoeda/JSON', { 'aUsuarioSessao': aUsuarioSessao, 'aInicial': '' })
    .then(function(response) {
        $scope.lsMoeda = response.data;

        for (var i = $scope.lsMoeda.length - 1; i >= 0; i--) {
            $scope.lsMoeda[i].label = $scope.lsMoeda[i].DS.split(" - ")[1];
        }
    });

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
            });
        }, function() {});
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

    $scope.acCidades = function(query) {
        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&idPais=&sCidade=' + query)
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
        
        $scope.totalItems = 0;
        $scope.itemsByPage = 10;
        $scope.currentPage = 1;
        $scope.pesquisa = {};

    };

    //--- ALIMENTA O COMBO COM OS CAMPOS.
    buscaWS.get('/WVDF_WS/ws_hsag310.wso/fListarHSAG310/JSON', 'sTabela=HCGS3000_0').then(function(data) {
        // console.log(data);
        console.log(data);
        $scope.colums = data;
    });

    $scope.itemsByPage = 10;
    $scope.currentPage = 1;
    $scope.pesquisa = {};

    var gerarParametrosPesquisa = function() {
        $scope.lsResultados = "";
        var auxPol = "";
        var auxPod = "";
        var auxPaisO = "";
        var auxPaisD = "";
        var auxVia = "";
        var auxAgO = "";
        var auxAgD = "";

        // debugger;

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
        parametros.idAcordo = $scope.pesquisa.idAcordo;
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

        parametros.itemsByPage = ($scope.itemsByPage == undefined) ? 0 : $scope.itemsByPage;
        parametros.currentPage = $scope.currentPage;
        parametros.aUsuarioSessao = aUsuarioSessao;

        $scope.pesquisa.params = parametros;
        var entidade = JSON.stringify($scope.pesquisa.params);
        var params = { 'sJSON': entidade };
        return params
    }

    $scope.btnPesquisarRel = function() {
        $scope.loadingState = true;
        // debugger;
        var params = gerarParametrosPesquisa();
        callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_lista/JSON', params)
            .then(function(response) {
                console.log(response);
                $scope.lsPesquisa = response.data.dados;
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
        // $scope.LimpaAtt(); 
        $scope.loadingState = false;
    };

    var getMoedas = function() {
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'aInicial': '' };
        return callWS.get('/WVDF_WS/ws_ccgs218.wso/buscarMoeda/JSON', params)
            .then(function(response) {
                $scope.lsMoedas = response.data;
            });
    }

    var getModPgto = function() {
        buscaWS.get('/WVDF_WS/ws_ccgs206.wso/listarModPgto/JSON', '').then(function(data) {
            $scope.lsModPgto = data;
        });
    }

    var getTpCalculos = function() {
        buscaWS.get('/WVDF_WS/ws_ccgs220.wso/f_combo_tpcalc/JSON', 'aModal=').then(function(data) {
            $scope.lsCalculos = data;
        });
    }

   
    init();
});