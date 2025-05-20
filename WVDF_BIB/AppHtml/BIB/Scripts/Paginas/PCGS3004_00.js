var urlPadrao = "http://server-bi2:8092";
//var urlPadrao = "https://crm.grupocraft.com.br:8092";

$(document).ready(function() {
    $('#dtInicial').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    });

    $('#dtFinal').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    });
});

var windowOpenContent;
let window_open = function() {
    windowOpenContent = window.open('', 'propostadefrete', 'width=250px');
}

// ANGULAR JS
app = angular.module('propostaNovaApp', ['ngTagsInput', 'smart-table', 'ngSanitize', 'ui.select', 'wsDominio', 'diretivas', 'ui.bootstrap', 'toaster']);

app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                return res.data;
            });
        }
    };
});

app.filter("emptyToEnd", function() {
    return function(array, key) {
        if (!angular.isArray(array)) return;
        var present = array.filter(function(item) {
            return item[key];
        });
        var empty = array.filter(function(item) {
            return !item[key]
        });
        return present.concat(empty);
    };
});
app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);
app.controller('produtosController', function($scope, $q, buscaWS, callWS, $http, $q, $filter, toaster, $timeout, $sce) {
    const promises = [];

    for (i = 0; i < 2; i++) {
        promises.push(
            $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais_seq/JSON', {
                params: {
                    aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
                    sPrograma: 'PCGS3004_00',
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
        count = 121;
        for (i = 1; i < values.length; i++) {
            for (var attrname in values[i]) {
                if (attrname.includes('LITERAL')) {
                    $scope.literais["LITERAL_" + count] = values[i][attrname];
                    count++;
                }
            }
        }
    });

    $scope.clockTimer = 60 * 15;
    $scope.ssStart = 60 * 15;
    $scope.ss = 60 * 15;
    $scope.timerModel = 15;
    $scope.btnWallet = 0;

    var timeoutClock = {};

    //VERIFICA SE O USUARIO TEM CARTEIRA COMERCIAL
    buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/fTurnOnButtonWalletComex/JSON', '').then(function(data) {

        $scope.btnWallet = data;
    });

    $scope.changeClock = function($event, timer) {
        if (timer < 5) {
            parent.parent.alertify.log("O tempo de refresh deve ser maior que 5 minutos!");
            // toaster.pop('warning', "Error","O tempo de refresh deve ser maior que 5 minutos!" , null, 'trustedHtml'); 
            $event.stopPropagation();
            return;
        }

        $scope.ssStart = timer * 60;
        $scope.ss = timer * 60;
        clearTimeout(timeoutClock);
        fClock();
    }

    var fClock = function() {
        timeoutClock = window.setTimeout(function() {
            $scope.ss -= 1;

            if ($scope.ss < 0) {
                $scope.ss = $scope.ssStart;
                $scope.refreshListaProposta();
            }
            $scope.$apply();
            fClock();
        }, 1000);
    }

    fClock();

    // Monta a tela inicial.
    $scope.textoAjuda = 'Use a tecla CTRL para desmarcar o cliente.';
    $scope.loadingState = true;
    $scope.cliente = '';
    $scope.currentPropostaCan = [];
    $scope.currentPropostaCan.motivoCancelamento = '';
    $scope.currentPropostaCan.motivo = '';

    $scope.pesquisa = {};
    $scope.pesquisa.status = '';
    $scope.pesquisa.proposta = '';
    $scope.pesquisa.modal = '';
    $scope.pesquisa.validade = '';
    $scope.pesquisa.data_elab = '';
    $scope.pesquisa.elaborador = '';
    $scope.pesquisa.destino = '';
    $scope.pesquisa.origem = '';
    $scope.pesquisa.fantasia = '';
    $scope.pesquisa.documento = '';
    $scope.pesquisa.paisorig = '';
    $scope.pesquisa.contorig = '';
    $scope.pesquisa.paisdest = '';
    $scope.pesquisa.contdest = '';
    $scope.pesquisa.marca = '';
    $scope.pesquisa.incoterm = '';
    $scope.pesquisa.caractfrete = '';
    $scope.pesquisa.customerRef = '';
    $scope.pesquisa.seuCliente = '';
    $scope.pesquisa.terminalD = '';
    $scope.pesquisa.walletComex = false;
    $scope.pesquisa.imo = 0;
    $scope.pesquisa.naoEmpilhavel = 0;
    $scope.pesquisa.bagagem = 0;
    $scope.pesquisa.consumoHumano = 0;
    $scope.pesquisa.consumoAnimal = 0;
    $scope.pesquisaOriginal = angular.copy($scope.pesquisa);

    $scope.itemsByPageFilter = '10';
    $scope.itemsByPage = 10;
    $scope.currentPage = '';

    $scope.excelGo = 0;

    // Posiciona Literais
    buscaWS.get('/WVDF_WS/ws_csag309.wso/f_idiomas_literais/JSON', 'sPrograma=PCGS3004_00').then(function(data) {
        $scope.L = data;
    });

    $scope.alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z"];

    ////
    var selectedRowsIndexes = [];
    $scope.rows = [{ name: 'Happy Butterfly' }, { name: 'Wonderful Bee' }];

    $scope.loadCont = function(query) {
        // 
        var parametros = 'aInicio=' + query;
        var data = buscaWS.get('/WVDF_WS/ws_CSAG399.wso/autoContinentes/JSON', parametros)
            .then(function(data) {
                // console.log(data);
                return data;
            });
        return data;

    }
    // buscaWS.get('/WVDF_WS/ws_CSAG399.wso/listarContinentes/JSON', '').then(function(data) {
    //     $scope.lsCont = data;
    // });    

    $scope.loadPais = function(query, tipo) {
        // 
        var continente = '';
        var parametros = 'aInicio=' + query;
        if (tipo == 'D') {
            // for (var i = $scope.pesquisa.contdest.length - 1; i >= 0; i--) {
            //     if (continente == '') {continente = $scope.pesquisa.contdest[i].id;}
            //     else {continente += ','+$scope.pesquisa.contdest[i].id;}
            // }
            parametros += '&aCont=' + continente;
        }
        if (tipo == 'O') {
            // for (var i = $scope.pesquisa.contorig.length - 1; i >= 0; i--) {
            //     if (continente == '') {continente = $scope.pesquisa.contorig[i].id;}
            //     else {continente += ','+$scope.pesquisa.contorig[i].id;}
            // }
            parametros += '&aCont=' + continente;
        }
        var data = buscaWS.get('/WVDF_WS/ws_CSAG329.wso/autoPaises/JSON', parametros)
            .then(function(data) {
                // 
                // console.log(data);
                return data;
            });
        return data;
    }
    // buscaWS.get('/WVDF_WS/ws_csag329.wso/buscarPaisesPorTrade/JSON', 'idCont=').then(function(data) {
    //     $scope.lsPais = data;
    // }); 

    $scope.loadCidade = function(query, tipo) {
        // 
        var pais = '';
        var parametros = 'aInicio=' + query;
        if (tipo == 'D') {
            // for (var i = $scope.pesquisa.paisdest.length - 1; i >= 0; i--) {
            //     if (pais == '') {pais = $scope.pesquisa.paisdest[i].id;}
            //     else {pais += ','+$scope.pesquisa.paisdest[i].id;}
            // }
            parametros += '&aPais=' + pais;
        }
        if (tipo == 'O') {
            // for (var i = $scope.pesquisa.paisorig.length - 1; i >= 0; i--) {
            //     if (pais == '') {pais = $scope.pesquisa.paisorig[i].id;}
            //     else {pais += ','+$scope.pesquisa.paisorig[i].id;}
            // }
            parametros += '&aPais=' + pais
        }
        var data = buscaWS.get('/WVDF_WS/ws_CSAG325.wso/autoCidades/JSON', parametros)
            .then(function(data) {
                // 
                // console.log(data);

                return data;
            });
        return data;
    }

    $scope.loadTerminal = function(query, tipo) {
        // 
        var pais = '';
        var parametros = 'aInicio=' + query;
        if (tipo == 'D') {
            
        }
        if (tipo == 'O') {
            
        }
        var data = buscaWS.get('/WVDF_WS/WS_HCGS3004.wso/autoTerminal/JSON', parametros)
            .then(function(data) {
                // 
                // console.log(data);

                return data;
            });
        return data;
    }


    //Alimenta o Combo de Incoterm
    buscaWS.get('/WVDF_WS/WS_HCGS3000.wso/f_combo_incorterm/JSON', '').then(function(data) {
        $scope.lsIncoterm = data;
    });
    //Alimenta o Combo de Campanhas
    buscaWS.get('/WVDF_WS/WS_HCGS3004.wso/fComboCampanhas/JSON', '').then(function(data) {
        $scope.lsCampanha = data;
    });

    //Alimenta o Combo de Caracteristicas de Frete
    buscaWS.get('/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON', '').then(function(data) {
        $scope.lsFretes = data;
    });

    $scope.selectRow = function(event, rowIndex) {
        if (event.ctrlKey) {
            changeSelectionStatus(rowIndex);
        } else if (event.shiftKey) {
            selectWithShift(rowIndex);
        } else {
            selectedRowsIndexes = [rowIndex];
        }
        //console.log(selectedRowsIndexes);
        //console.log(getSelectedRows());
        //console.log(getFirstSelectedRow());
    };

    function selectWithShift(rowIndex) {
        var lastSelectedRowIndexInSelectedRowsList = selectedRowsIndexes.length - 1;
        var lastSelectedRowIndex = selectedRowsIndexes[lastSelectedRowIndexInSelectedRowsList];
        var selectFromIndex = Math.min(rowIndex, lastSelectedRowIndex);
        var selectToIndex = Math.max(rowIndex, lastSelectedRowIndex);
        selectRows(selectFromIndex, selectToIndex);
    }

    function getSelectedRows() {
        var selectedRows = [];
        angular.forEach(selectedRowsIndexes, function(rowIndex) {
            selectedRows.push($scope.rows[rowIndex]);
        });
        return selectedRows;
    }

    function getFirstSelectedRow() {
        var firstSelectedRowIndex = selectedRowsIndexes[0];
        return $scope.rows[firstSelectedRowIndex];
    }

    function selectRows(selectFromIndex, selectToIndex) {
        for (var rowToSelect = selectFromIndex; rowToSelect <= selectToIndex; rowToSelect++) {
            select(rowToSelect);
        }
    }

    function changeSelectionStatus(rowIndex) {
        if ($scope.isRowSelected(rowIndex)) {
            unselect(rowIndex);
        } else {
            select(rowIndex);
        }
    }

    function select(rowIndex) {
        if (!$scope.isRowSelected(rowIndex)) {
            selectedRowsIndexes.push(rowIndex)
        }
    }

    function unselect(rowIndex) {
        var rowIndexInSelectedRowsList = selectedRowsIndexes.indexOf(rowIndex);
        var unselectOnlyOneRow = 1;
        selectedRowsIndexes.splice(rowIndexInSelectedRowsList, unselectOnlyOneRow);
    }

    function resetSelection() {
        selectedRowsIndexes = [];
    }

    $scope.isRowSelected = function(rowIndex) {
        return selectedRowsIndexes.indexOf(rowIndex) > -1;
    };

    $scope.buscarClienteFantasia = function(texto) {

        if (texto !== '') {
            var entidade = {};
            entidade.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
            entidade.aInicio = texto;

            var params = { 'sJSON': entidade };

            callWS.get('/WVDF_WS/ws_csag340.wso/buscarClienteFantasiaPropostadeFrete/JSON', params)
                .then(function(response) {
                    //console.log(response);
                    $scope.lsClientes = response.data;
                });
        } else { $scope.lsClientes = []; }

    }

    $scope.prospectFunc = function() {
        $scope.lsPropostas = '';
        $scope.totalItems = 0;
    }

    var posicionaProposta = function() {
        $scope.loadingState = true;
        // 
        var entidade = $scope.pesquisa;
        entidade.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        entidade.IBP = $scope.itemsByPage;
        entidade.CP = $scope.currentPage;

        var params = { 'sJSON': entidade };

        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_lista_propostas/JSON', params)
            .then(function(data) {
                //debugger
                $scope.lsPropostas = data.data.dados;
                $scope.totalItems = data.data.qtdLinhas;
                $scope.loadingState = false;
                $scope.BetaFcl = data.data.iBetaTesterFcl;
                $scope.BetaAir = data.data.iBetaTesterAir;
                setTimeout(function() {
                    $('[data-toggle="tooltip"]').tooltip({
                        position: {
                            my: "center bottom", 
                            at: "center top",     
                            using: function(position, feedback) {
                                $(this).css({
                                    left: position.left,
                                    top: position.top - 10 
                                });
                                $(this).addClass("ui-tooltip-top");
                            }
                        }
                    });
                }, 100); 
            });
    }

    // AutoComplete de Clientes
    $scope.acClientes = function(texto) {
        return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/f_proposta_complete_client_busca/JSON', 'sInicio=' + texto).then(function(data) {
            return data;
        });
    };

    var createArray = function(len, itm) {
        var arr1 = [itm],
            arr2 = [];
        while (len > 0) {
            if (len & 1) arr2 = arr2.concat(arr1);
            arr1 = arr1.concat(arr1);
            len >>>= 1;
        }
        return arr2;
    }

    // var updateOptions = function(arr) {
    //     for (var i = $scope.lsClientes.length - 1; i >= 0; i--) {
    //         if ($scope.lsClientes[i] == undefined) {
    //             $scope.lsClientes[i] = { "DS": "" };
    //         }
    //     }
    // }

    var lastPosition = 0;
    var populateArray = function(arrayDst, arraySrc) {
        if (lastPosition >= arrayDst.length) {
            return;
        }
        for (var i = arraySrc.length - 1; i >= 0; i--) {
            arrayDst[lastPosition] = arraySrc[i];
            lastPosition++;
        }
    }

    // Posisiona Cliente no AutoComplete de prospeccao
    $scope.fnSelecionaCliente = function(cliente) {
        $scope.prospeccao = "";

        if (cliente.ACESSO == "0") {
            return parent.parent.alertify.error("Nao possui acesso!");
        }

        $scope.cliente = (cliente.idCliente);
    };

    // Cliente

    $scope.itemsByPageFilter = '10';
    $scope.itemsByPage = 10;
    $scope.currentPage = 1;
    $scope.idClienteSave = '';

    $scope.changeCliente2 = function() {
    $scope.itemsByPage = parseInt($scope.itemsByPageFilter);
        $scope.loadingState = true;
        $scope.btnPesquisaPropostaLista();
        //     posicionaProposta();
        // try {
        //     if (idClienteSave === undefined || idClienteSave == null) {
        //         idClienteSave = {};
        //         idClienteSave.ID = '';
        //     }
        // } catch (error) {
        //     idClienteSave = {};
        //     idClienteSave.ID = ''
        // }

        // $scope.vendedor = parseInt(idClienteSave.aVendedor);
        // // Posiciona Propostas
        // $scope.loadingState = true;
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_lista_propostas/JSON', 'aCSAG320_ID=' + idClienteSave.ID + '&itemsByPage=' + $scope.itemsByPage + '&currentPage=' + $scope.currentPage).then(function(data) {
        //     // 
        //     $scope.lsPropostas = data.dados;
        //     $scope.totalItems = data.qtdLinhas;

        //     $scope.loadingState = false;
        // });
    };

    // $scope.changeCliente = function(idCliente) {

    // if ($scope.cliente.length > 1) {
    //     //  console.log("log");
    //     $scope.cliente = $scope.cliente.splice(1, $scope.cliente.length - 1);
    //     $scope.changeCliente($scope.cliente[0]);
    //     return;
    // }
    // if (idCliente === undefined || idCliente == null) {
    //     idCliente = {};
    //     idCliente.ID = '';
    //     idClienteSave = {};
    //     idClienteSave.ID = '';
    //     $scope.desabilitarProposta = true;
    // } else {
    //     idClienteSave = idCliente;
    //     $scope.desabilitarProposta = false;
    // }

    // $scope.vendedor = parseInt(idCliente.aVendedor);
    // // Posiciona Propostas
    // $scope.loadingState = true;
    // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_lista_propostas/JSON', 'aCSAG320_ID=' + idCliente.ID + '&itemsByPage=' + $scope.itemsByPage + '&currentPage=' + $scope.currentPage).then(function(data) {
    //     // 
    //     $scope.lsPropostas = data.dados;
    //     $scope.totalItems = data.qtdLinhas;
    //     $scope.loadingState = false;
    // });
    // };

    $scope.refreshListaProposta = function() {
        //posicionaProposta();
        $scope.pesquisa = angular.copy($scope.pesquisaOriginal);
        $scope.btnPesquisaPropostaLista();        
    }
    // EXIBE A PROPOSTA
    // $scope.clickExibirProposta = function(oProposta) {
    //     //   console.log(oProposta);
    //     var url = "PCGS3004_06.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA + "&idVendedor=" + oProposta.aVendedor;
    //     window.top.jaddTab("Proposta #" + oProposta.sPROPOSTA, url);
    // };

    $scope.clone = {};
    $scope.clone.cliente = '';
    $scope.clone.proposta = '';
    $scope.clone.produto = '';
    // CLONA A PROPOSTA
    $scope.clickClonarProposta = function(oProposta) {
        //console.log(oProposta);
        $scope.clone.cliente = oProposta.CSAG320_FANTASIA;
        $scope.clone.cliente_id = oProposta.CSAG320_ID;
        $scope.clone.proposta = oProposta.sPROPOSTA;
        $scope.clone.produto = oProposta.sCCGS202_ID;
        //console.log($scope.clone);
    };
    $scope.fSaveCloneProp = function(oClone) {
        // 
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
                if (data.info3 == "FCL") {
                    var url = "Proposta_FCL/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + data.infoId + "&idClone=" + data.info2;
                    window.top.jaddTab("Nova Proposta - FCL", url);
                }
                if (data.info3 == "AIR") {
                    var url = "Proposta_air/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + data.infoId + "&idClone=" + data.info2;
                    window.top.jaddTab("Nova Proposta - Air", url);
                }
            } else {
                parent.parent.alertify.error(data.infoDs);
                return;
            }

        });
    }

    $scope.clickVisualizarProposta = function(oProposta) {

        $scope.vizuprop = oProposta;
    };
    // VISUALIZAR 
    $scope.btnVisualizarProposta = function(oProposta) {
        buscaWS.get('/WVDF_WS/ws_HCGS3004.wso/fStatusVerify/JSON', 'aProp=' + oProposta.sPROPOSTA).then(function(data) {
            //debugger
            if (data.ID == 3) {
                parent.parent.alertify.error('Proposta em Aguardo! Nao pode ser impressa!');
                return;
            }
            if (data.ID == 4) {
                parent.parent.alertify.error('Proposta em Analise! Nao pode ser impressa!');
                return;
            }
            if (data.ID == 10) {
                parent.parent.alertify.error('Proposta com Falta de Informacoes! Nao pode ser impressa!');
                return;
            }
            if (data.ID == 11 || data.ID == 12) {
                parent.parent.alertify.error('Proposta em Verificacao! Nao pode ser impressa!');
                return;
            }
            if (data.ID == 5) {
                parent.parent.alertify.error('Proposta Expirada! Nao pode ser impressa!');
                return;
            }
            if (data.ID == 99) {
                parent.parent.alertify.error('Proposta em gravaçao!');
                return;
            }

            var url = oProposta.sCCGS202_ID == 'AIR' ? 'PCGS3004_04.asp' : 'PCGS3004_04.asp';
            url += "?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + oProposta.sPROPOSTA;
            window.open(url, 'propostadefrete', 'width=250px');
            // windowOpenContent.location.href = url;
        });
    };

    // VISUALIZAR 
    $scope.btnVisualizarProposta_02 = function(oProposta) {
        buscaWS.get('/WVDF_WS/ws_HCGS3004.wso/fStatusVerify/JSON', 'aProp=' + oProposta.sPROPOSTA).then(function(data) {
            //debugger
            if (data.ID == 3) {
                parent.parent.alertify.error('Proposta em Aguardo! Nao pode ser impressa!');
                return;
            }
            if (data.ID == 4) {
                parent.parent.alertify.error('Proposta em Analise! Nao pode ser impressa!');
                return;
            }
            if (data.ID == 10) {
                parent.parent.alertify.error('Proposta com Falta de Informacoes! Nao pode ser impressa!');
                return;
            }
            if (data.ID == 11 || data.ID == 12) {
                parent.parent.alertify.error('Proposta em Verificacao! Nao pode ser impressa!');
                return;
            }
            if (data.ID == 5) {
                parent.parent.alertify.error('Proposta Expirada! Nao pode ser impressa!');
                return;
            }
            if (data.ID == 99) {
                parent.parent.alertify.error('Proposta em gravaçao!');
                return;
            }

            var url = 'PCGS3004_04_02.asp';
            url += "?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + oProposta.sPROPOSTA;
            window.open(url, 'propostadefrete', 'width=250px');
            // windowOpenContent.location.href = url;
        });

        // var prev = oProposta.StatusID;
        // if (prev == 3) {
        //     parent.parent.alertify.error('Proposta em Aguardo! Nao pode ser impressa!');
        //     return;
        // }
        // if (prev == 4) {
        //     parent.parent.alertify.error('Proposta em Analise! Nao pode ser impressa!');
        //     return;
        // }
        // if (prev == 10) {
        //     parent.parent.alertify.error('Proposta com Falta de Informacoes! Nao pode ser impressa!');
        //     return;
        // }
        // if (prev == 11 || prev == 12) {
        //     parent.parent.alertify.error('Proposta em Verificacao! Nao pode ser impressa!');
        //     return;
        // }
        // if (prev == 5) {
        //     parent.parent.alertify.error('Proposta Expirada! Nao pode ser impressa!');
        //     return;
        // }

        // var url = "PCGS3004_04.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + oProposta.sPROPOSTA;
        // window.open(url, 'propostadefrete', 'width=250px');
    };
    // EDITAR PROPOSTA
    $scope.clickEditarProposta = function(oProposta) {
        //    console.log(getVariavelURL('idVendedor'));
        $scope.url = '';
        $scope.PropostaAux = oProposta.sPROPOSTA;
        if (oProposta.sCCGS202_ID == "LCL") {
            $scope.url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA;
        }
        if (oProposta.sCCGS202_ID == "FCL") {
            $scope.url = "Proposta_FCL/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA;
        }
        if (oProposta.sCCGS202_ID == "AIR") {
            $scope.url = "Proposta_air/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA;
        }

        buscaWS.get('/WVDF_WS/ws_HCGS3008.wso/fValidaBooking/JSON', 'aProp=' + oProposta.sPROPOSTA).then(function(data) {
            if (data !== '') $scope.url = $scope.url + "&Booking=" + data;
            window.top.jaddTab("Proposta #" + $scope.PropostaAux, $scope.url);
        });
    }

    // 
    // var starter = {};
    // starter.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    // var parameters = { 'sJSON': starter };
    // $scope.aLista = {};
    // $scope.excelGo = 0;
    // // $scope.loadingState = true;
    // // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_relatorio_proposta/JSON',parameters).then(function(data) {
    // callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_relatorio_proposta/JSON', parameters).then(function(data) {
    //     $scope.aLista = data.data;  
    //     $scope.excelGo = 1;
    //     // $scope.loadingState=false;      
    // });

    $scope.RefreshExcel = function() {

        $scope.loadingState = true;

        var entidade = $scope.pesquisaOriginal;
        entidade.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        var continente = '';
        var pais = '';
        var cidade = '';

        if ($scope.pesquisaOriginal.contdest !== '') {
            for (var i = $scope.pesquisaOriginal.contdest.length - 1; i >= 0; i--) {
                if (continente == '') { continente = $scope.pesquisaOriginal.contdest[i].id; } else { continente += ',' + $scope.pesquisaOriginal.contdest[i].id; }
            }
            entidade.contdest_i = continente;
        } else { entidade.contdest_i = ''; }

        if ($scope.pesquisaOriginal.contorig !== '') {
            for (var i = $scope.pesquisaOriginal.contorig.length - 1; i >= 0; i--) {
                if (continente == '') { continente = $scope.pesquisaOriginal.contorig[i].id; } else { continente += ',' + $scope.pesquisaOriginal.contorig[i].id; }
            }
            entidade.contorig_i = continente;
        } else { entidade.contorig_i = ''; }


        if ($scope.pesquisaOriginal.paisdest !== '') {
            for (var i = $scope.pesquisaOriginal.paisdest.length - 1; i >= 0; i--) {
                if (pais == '') { pais = $scope.pesquisaOriginal.paisdest[i].id; } else { pais += ',' + $scope.pesquisaOriginal.paisdest[i].id; }
            }
            entidade.paisdest_i = pais;
        } else { entidade.paisdest_i = ''; }

        if ($scope.pesquisaOriginal.paisorig !== '') {
            for (var i = $scope.pesquisaOriginal.paisorig.length - 1; i >= 0; i--) {
                if (pais == '') { pais = $scope.pesquisaOriginal.paisorig[i].id; } else { pais += ',' + $scope.pesquisaOriginal.paisorig[i].id; }
            }
            entidade.paisorig_i = pais;
        } else { entidade.paisorig_i = ''; }


        if ($scope.pesquisaOriginal.destino !== '') {
            for (var i = $scope.pesquisaOriginal.destino.length - 1; i >= 0; i--) {
                if (cidade == '') { cidade = $scope.pesquisaOriginal.destino[i].id; } else { cidade += ',' + $scope.pesquisaOriginal.destino[i].id; }
            }
            entidade.destino_i = cidade;
        } else { entidade.destino_i = ''; }

        if ($scope.pesquisaOriginal.origem !== '') {
            for (var i = $scope.pesquisaOriginal.origem.length - 1; i >= 0; i--) {
                if (cidade == '') { cidade = $scope.pesquisaOriginal.origem[i].id; } else { cidade += ',' + $scope.pesquisaOriginal.origem[i].id; }
            }
            entidade.origem_i = cidade;
        } else { entidade.origem_i = ''; }

        entidade.IBP = $scope.itemsByPage;
        entidade.CP = $scope.currentPage;

        var params = { 'sJSON': entidade };
        $scope.aLista = {};
        $scope.excelGo = 0;

        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_relatorio_proposta/JSON', params).then(function(data) {
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_relatorio_proposta/JSON', params).then(function(data) {
            $scope.aLista = data.data;
            $scope.excelGo = 1;

            setTimeout(function() {

                if ($scope.aLista.length > 0) { $scope.btnImprimirEXCEL(); }
                $scope.loadingState = false;

            }, 3500);

        });
    }

    //---- IMPRESSAO EM EXCEL
    $scope.btnImprimirEXCEL = function() {
        $scope.loadingState = false;
        var blob = new Blob([document.getElementById('export').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Proposta_Report.xls");

        $scope.aLista = {};
    };

    //AUTOCOMPLETE CLIENTE
    $scope.loadClientes = function(query) {
        if (query.length > 2) {
            // 
            var parametros = 'sInicio=' + query;
            var data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_proposta_complete_client_busca/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    // 
                    return data;
                });
            return data;
        }
    };



    $scope.btnNovaPropostaAIR = function() {
        // 
        if ($scope.cliente.length != 0) {
            var url = "Proposta_air/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
            url += "&idCliente=" + $scope.cliente[0].ID;
            window.top.jaddTab("Nova proposta - AIR", url);
        } else {
            parent.parent.alertify.error("Clique em Pesquisa e selecione um cliente!");
        }
    }

    $scope.btnNovaPropostaFCL = function() {
        // 
        if ($scope.cliente.length != 0) {
            var url = "Proposta_FCL/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
            url += "&idCliente=" + $scope.cliente[0].ID;
            window.top.jaddTab("Nova proposta - FCL", url);
        } else {
            parent.parent.alertify.error("Clique em Pesquisa e selecione um cliente!");
        }
    }

    $scope.btnNovaProposta = function() {
        // 
        if ($scope.cliente.length != 0) {
            var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + $scope.cliente[0].ID;
            window.top.jaddTab("Nova proposta - LCL", url);
        } else {
            parent.parent.alertify.error("Clique em Pesquisa e selecione um cliente!");
        }
    }

    $scope.btnAbrirTarifario = function() {
        var url = "PCGS3000_00.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&bComercial=true&sTabela=HCGS3000_1";
        window.top.jaddTab("Tarifario", url);
    }

    $scope.btnAbrirSolicitacao = function() {
        var url = "PCGS2100_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
        window.top.jaddTab("Nova solicitacao", url);
    }

    buscaWS.get('/WVDF_WS/ws_HCGS3004.wso/f_lista_status/JSON', '').then(function(data) {
        $scope.itemsStatusProposta = data;
    });

    buscaWS.get('/WVDF_WS/ws_CCGS229.wso/listaMotivosProp/JSON', '').then(function(data) {
        // 
        //console.log(data);
        $scope.StatusProposta = data;
    });

    $scope.btnAcaoClick = function(status) {
        // 
        $scope.currentPropostaCan.Status = status;
        if (status == '8') {
            $scope.SaveStatusProposta($scope.currentPropostaCan);
        } else {
            $scope.currentPropostaCan.justifica = true;
            $scope.currentPropostaCan.status_click = false;
            $scope.currentPropostaCan.motivo = "";
        }
    }

    $scope.OpenBooking = function(oProposta) {
        // 
        $scope.url = '';
        if (oProposta.sCCGS202_ID == "LCL") {
            $scope.url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA;
        }
        if (oProposta.sCCGS202_ID == "FCL") {
            $scope.url = "Proposta_FCL/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA;
        }
        if (oProposta.sCCGS202_ID == "AIR") {
            $scope.url = "Proposta_air/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA;
        }

        buscaWS.get('/WVDF_WS/ws_HCGS3008.wso/fCriaBooking/JSON', 'aProp=' + oProposta.sPROPOSTA).then(function(data) {
            $scope.url = $scope.url + "&Booking=" + data;
            // var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA + "&Booking=" + data;
            // 
            window.top.jaddTab("Proposta #" + oProposta.sPROPOSTA, $scope.url);
        });
    }

    buscaWS.get('/WVDF_WS/ws_ccgs202.wso/f_CCGS202_lista/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + "&sProduto=").then(function(data) {
        $scope.lsModalidadesFrete = data;
    });

    // PESQUISA DOS FILTROS EM CIMA DA TELA
    $scope.btnPesquisaPropostaLista = function() {
        $scope.lsPropostas = {};
        var entidade = $scope.pesquisa;
        entidade.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        // 
        var continente = '';
        var pais = '';
        var cidade = '';
        var terminal = '';

        if (entidade.walletComex == true) entidade.walletComex = 1;
        else entidade.walletComex = 0;

        if ($scope.pesquisa.contdest !== '') {
            for (var i = $scope.pesquisa.contdest.length - 1; i >= 0; i--) {
                if (continente == '') { continente = $scope.pesquisa.contdest[i].id; } else { continente += ',' + $scope.pesquisa.contdest[i].id; }
            }
            entidade.contdest_i = continente;
        } else { entidade.contdest_i = ''; }

        if ($scope.pesquisa.contorig !== '') {
            for (var i = $scope.pesquisa.contorig.length - 1; i >= 0; i--) {
                if (continente == '') { continente = $scope.pesquisa.contorig[i].id; } else { continente += ',' + $scope.pesquisa.contorig[i].id; }
            }
            entidade.contorig_i = continente;
        } else { entidade.contorig_i = ''; }


        if ($scope.pesquisa.paisdest !== '') {
            for (var i = $scope.pesquisa.paisdest.length - 1; i >= 0; i--) {
                if (pais == '') { pais = $scope.pesquisa.paisdest[i].id; } else { pais += ',' + $scope.pesquisa.paisdest[i].id; }
            }
            entidade.paisdest_i = pais;
        } else { entidade.paisdest_i = ''; }

        if ($scope.pesquisa.paisorig !== '') {
            for (var i = $scope.pesquisa.paisorig.length - 1; i >= 0; i--) {
                if (pais == '') { pais = $scope.pesquisa.paisorig[i].id; } else { pais += ',' + $scope.pesquisa.paisorig[i].id; }
            }
            entidade.paisorig_i = pais;
        } else { entidade.paisorig_i = ''; }


        if ($scope.pesquisa.destino !== '') {
            for (var i = $scope.pesquisa.destino.length - 1; i >= 0; i--) {
                if (cidade == '') { cidade = $scope.pesquisa.destino[i].id; } else { cidade += ',' + $scope.pesquisa.destino[i].id; }
            }
            entidade.destino_i = cidade;
        } else { entidade.destino_i = ''; }

        if ($scope.pesquisa.origem !== '') {
            for (var i = $scope.pesquisa.origem.length - 1; i >= 0; i--) {
                if (cidade == '') { cidade = $scope.pesquisa.origem[i].id; } else { cidade += ',' + $scope.pesquisa.origem[i].id; }
            }
            entidade.origem_i = cidade;
        } else { entidade.origem_i = ''; }
        
        if ($scope.pesquisa.terminalD !== '') {
            for (var i = $scope.pesquisa.terminalD.length - 1; i >= 0; i--) {
                if (terminal == '') { terminal = $scope.pesquisa.terminalD[i].id; } else { terminal += ',' + $scope.pesquisa.terminalD[i].id; }
            }
            entidade.terminal_d = terminal;
        } else { entidade.terminal_d = ''; }

        entidade.IBP = $scope.itemsByPage;
        entidade.CP = $scope.currentPage;
        entidade.modalFreight = $scope.pesquisa.modalFreight;
        var params = { 'sJSON': entidade };
        $scope.loadingState = true;
        // 
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_lista_propostas/JSON', params)
            .then(function(data) {
                //debugger; 
                $scope.lsPropostas = data.data.dados;
                $scope.totalItems = data.data.qtdLinhas;
                $scope.loadingState = false;
                $scope.BetaFcl = data.data.iBetaTesterFcl;
                $scope.BetaAir = data.data.iBetaTesterAir;
                $scope.pesquisaOriginal = angular.copy($scope.pesquisa);
                setTimeout(function() {
                    $('[data-toggle="tooltip"]').tooltip({
                        position: {
                            my: "center bottom", 
                            at: "center top",     
                            using: function(position, feedback) {
                                $(this).css({
                                    left: position.left,
                                    top: position.top - 10 
                                });
                                $(this).addClass("ui-tooltip-top");
                            }
                        }
                    });
                }, 100); 
                
                if (window.parent.innerWidth < 1268) $('#frame2', window.parent.document).height(300 * $scope.itemsByPage);
                else $('#frame2', window.parent.document).height(150 * $scope.itemsByPage);
            });
        // $scope.loadingState = false;  
        // -
        // $scope.RefreshExcel(params);
    }

    $scope.btnClearPesquisa = function() {
        $scope.pesquisa.status = '';
        $scope.pesquisa.proposta = '';
        $scope.pesquisa.modal = '';
        $scope.pesquisa.validade = '';
        $scope.pesquisa.data_elab = '';
        $scope.pesquisa.elaborador = '';
        $scope.pesquisa.destino = '';
        $scope.pesquisa.origem = '';
        $scope.pesquisa.fantasia = '';
        $scope.pesquisa.documento = '';
        $scope.pesquisa.paisorig = '';
        $scope.pesquisa.contorig = '';
        $scope.pesquisa.paisdest = '';
        $scope.pesquisa.contdest = '';
        $scope.pesquisa.marca = '';
        $scope.pesquisa.incoterm = '';
        $scope.pesquisa.caractfrete = '';
        $scope.pesquisa.customerRef = '';
        $scope.pesquisa.booking = '';
        $scope.pesquisa.modalFreight = '';
        $scope.pesquisa.seuCliente = '';
        $scope.pesquisa.campanha = '';
        $scope.pesquisa.walletComex = false;
        $scope.pesquisa.fechamento = false;
        $scope.pesquisa.imo = 0;
        $scope.pesquisa.naoEmpilhavel = 0;
        $scope.pesquisa.bagagem = 0;
        $scope.pesquisa.consumoHumano = 0;
        $scope.pesquisa.consumoAnimal = 0;
        $scope.excelGo = 0;
        $scope.btnPesquisaPropostaLista();
    }

    $scope.SaveStatusProposta = function(oModel) {
        $scope.loadingState = true;

        var params = {
            'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
            'aProposta': oModel.prop,
            'aStatus': oModel.Status,
            'aJustificativa': oModel.motivoCancelamento,
            'aMotivo': oModel.motivo
        };

        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_chg_status/JSON', params).then(function(data) {
            if (data.data !== 0 && data.data !== 99 && data.data !== 98 && data.data !== 97) {
                var texto;
                if (data.data == 8) texto = 'Proposta Aprovada!';
                if (data.data == 9) {
                    texto = 'Proposta Cancelada!';

                    // if (oModel.netship_ref != "") {
                    //     insurances._getToken().then(function(response) {
                    //         $http.post(
                    //             urlPadrao + '/api/freights/coordination/bookings/' + oModel.prop + '/cancellation',
                    //             'reason=' + oModel.motivo, {
                    //                 headers: {
                    //                     'Authorization': 'Bearer ' + response.securityToken,
                    //                     'Content-Type': 'application/x-www-form-urlencoded'
                    //                 }
                    //             }).then(function(response) {
                    //             $scope.loadingState = false;
                    //         });
                    //     });
                    // }

                    callWS.get('/WVDF_WS/ws_hcgs3004.wso/fVerificaSeguro/JSON', { 'sProposta': oModel.prop, 'aUsuarioSessao': getVariavelURL('aUsuarioSessao') }).then(function(data) {

                        if (data.data.ID !== '' && data.data.DS2 == 1) {
                            const path = '/quotes/{targetCode}/cancel'.replace("{targetCode}", data.data.ID);
                            const parameters = {
                                "reasonCode": 1 || "",
                                "Observation": '"Cancelado junto a proposta ' + oModel.prop || "",
                                "modifiedById": data.data.DS || ""
                            }

                            $scope.loadingState = true;
                            return insurances._getToken().then(function(response) {
                                return $http.post(insurances.baseURL + path, parameters, { headers: { 'Authorization': 'Bearer ' + response.securityToken } }).then(function(response) {
                                    $scope.loadingState = false;
                                    return response.data
                                });
                            });
                        }
                    });
                }
                if (data.data == 6) texto = 'Proposta Perdida!';
                parent.parent.alertify.success("Status Alterado!");
            } else {
                if (data.data == 99) {
                    parent.parent.alertify.error("Proposta nao pode ser alterada, Modo de Pagamento Faltanto!");
                    $scope.loadingState = false;
                    return;
                } 
                if (data.data == 98) {
                    parent.parent.alertify.error("Nao foram encontradas taxas na proposta!");
                    $scope.loadingState = false;
                    return;
                } 
                if (data.data == 0) {
                    parent.parent.alertify.error("Status nao pode ser alterado!");
                    $scope.loadingState = false;
                    return; 
                }
                if (data.data == 97) {
                    parent.parent.alertify.error("Propostas com SI somentem podem ser canceladas pelo Customer Service!");
                    $scope.loadingState = false;
                    return; 
                }
            }

            $scope.loadingState = true;
            $scope.refreshListaProposta()
            $scope.loadingState = false;
        });
        $scope.loadingState = false;
        $('#modalCancelamento').modal('hide');
    }

    const insurances = {
        aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
        baseURL: urlPadrao + '/api/freights/insurances',
        targetCode: '',
        _getToken: function() {
            const tokenURL = urlPadrao + '/api/accounts/users/security-tokens';
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
                // $scope.NetshipValidation = false;
                // parent.parent.alertify.error(response.data.error);
            });
        }
        // ,
        // cancel: function(reasonCode, Observation, modifiedById) {
        //     const path = '/quotes/{targetCode}/cancel'.replace("{targetCode}", insurances.targetCode);;
        //     const parameters = {
        //         "reasonCode": 1 || "",
        //         "Observation": '"Cancelado junto a proposta ' + $scope.proposta.idProposta || "",
        //         "modifiedById": $scope.proposta.sAtualUser || ""
        //     }

        //     $scope.loadingState = true;
        //     return insurances._getToken().then(function(response) {
        //         return $http.post(insurances.baseURL + path, parameters, { headers: { 'Authorization': 'Bearer ' + response.securityToken } }).then(function(response) {
        //             $scope.loadingState = false;
        //             return response.data
        //         }, function(err){
        //             $scope.loadingState = false;
        //             return err;
        //         });
        //     }, function(err){  $scope.loadingState = false; return err;});
        // }
    }

    $scope.validarDataDeValidade = function(data_validade) {
        let hoje = new Date();
        let dt_validade = data_validade.split("/");
        dt_validade = new Date(dt_validade[1] + "/" + dt_validade[0] + "/" + dt_validade[2]);
        if (hoje > dt_validade) {
            return $scope.sweetAlert($scope.literais.LITERAL_124, $scope.literais.LITERAL_123, "warning");
        } else return true;
    }

    $scope.CloneBooking = async function(oProposta) {
        let dataValidadeOk = await $scope.validarDataDeValidade(oProposta.sDTVAL_TERMINO);

        if (dataValidadeOk) {
            $scope.loadingState = true;
            var params = {
                'sPropostaOld': oProposta.prop,
                'aUsuarioSessao': getVariavelURL('aUsuarioSessao')
            };

            callWS.get('/WVDF_WS/ws_HCGS3004.wso/f_clone_prop/JSON', params).then(function(data) {
                $scope.loadingState = false;

                if (data.data.DS !== '') {
                    parent.parent.alertify.error(data.data.DS);
                    return;
                }

                // if (data.data == '') {
                //     parent.parent.alertify.error("Sessao Invalida! Nao foi possivel clonar o Booking!");
                //     return;
                // }
                // if (data.data == '1') {
                //     parent.parent.alertify.error("Proposta vencida! Para clonar o booking devera solicitar uma revalidacao ao pricing!");
                //     return;
                // }
                // if (data.data == '2') {
                //     parent.parent.alertify.error("Cliente Inativo! Nao foi possivel clonar o Booking.");
                //     return;
                // }
                // if (data.data == '3') {
                //     parent.parent.alertify.error("Proposta Invalida! Nao foi possivel clonar o Booking.");
                //     return;
                // }
                else {
                    parent.parent.alertify.success("Processo Clonado!");

                    // data = data.data.ID + "&aUsuarioSessao=" + getVariavelURL('aUsuarioSessao')
                    window.top.jaddTab("Booking Clonado", data.data.ID);
                }
            });
        }
    }

    $scope.changeStatusProposta = function(oProposta) {
        debugger;
        //sCCGS200_DESCRICAO: "EXPORT"

        $scope.currentPropostaCan.prop = oProposta.sPROPOSTA;
        $scope.currentPropostaCan.status = oProposta.StatusID;
        $scope.currentPropostaCan.motivoCancelamento = '';
        $scope.currentPropostaCan.motivo = '0';
        $scope.currentPropostaCan.justifica = false;
        $scope.currentPropostaCan.status_click = false;
        $scope.currentPropostaCan.book = oProposta.book;
        $scope.currentPropostaCan.netship_ref = oProposta.netship_ref;
        $scope.currentPropostaCan.sDTVAL_TERMINO = oProposta.sDTVAL_TERMINO;
        $scope.currentPropostaCan.operacao = oProposta.sCCGS200_DESCRICAO;

        //BOTAO CLONE BOOKING
        $scope.currentPropostaCan.btnBook = false;
        if (oProposta.book == '1') {

            if (oProposta.sCCGS200_DESCRICAO == 'IMPORT') $scope.currentPropostaCan.btnBook = true;
            if (oProposta.sCCGS200_DESCRICAO == 'EXPORT') {
                if (oProposta.StatusID == '1') $scope.currentPropostaCan.btnBook = true;
                if (oProposta.StatusID == '13') $scope.currentPropostaCan.btnBook = true;
                if (oProposta.StatusID == '16') $scope.currentPropostaCan.btnBook = true;
                if (oProposta.StatusID == '2') $scope.currentPropostaCan.btnBook = true;
                if (oProposta.StatusID == '8') $scope.currentPropostaCan.btnBook = true;
            }
        }



        $timeout(function() {
            angular.element('#modalButtonCancelamento').trigger('click');
        });

    }

    $scope.buscarClienteFantasiaMob = function(texto) {

        if (texto.length > 2) {
            var entidade = {};
            entidade.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
            entidade.aInicio = texto;

            var params = { 'sJSON': entidade };

            return callWS.get('/WVDF_WS/ws_csag340.wso/buscarClienteFantasiaPropostadeFrete/JSON', params)
                .then(function(response) {
                    return response.data;
                });
        }

    }

    $scope.changeCliente = function(model) {

        $scope.cliente = [];
        $scope.cliente.push(model);
        //console.log($scope.cliente);
    }

    $scope.sweetAlert = function(titulo, texto, icone) {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: titulo,
                html: texto,
                icon: icone,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: $scope.literais.LITERAL_121,
                cancelButtonText: $scope.literais.LITERAL_122,
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

    posicionaProposta();
    $scope.desabilitarProposta = true;
    $scope.loadingState = false;
});