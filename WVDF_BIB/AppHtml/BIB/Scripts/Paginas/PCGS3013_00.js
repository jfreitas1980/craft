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
let window_open = function(){
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
app.controller('produtosController', function($scope, $q, buscaWS, callWS, $http, $q, $filter, toaster, $timeout) {

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
    $scope.pesquisa.walletComex = false;

    $scope.itemsByPage = '';
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
        console.log(selectedRowsIndexes);
        console.log(getSelectedRows());
        console.log(getFirstSelectedRow());
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
                    console.log(response);
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
            });
    }

    // AutoComplete de Clientes
    $scope.acClientes = function(texto) {
        return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/f_proposta_complete_client/JSON', 'sInicio=' + texto).then(function(data) {
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
            console.log("opa maior");
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

    $scope.itemsByPage = 10;
    $scope.currentPage = 1;
    $scope.idClienteSave = '';

    $scope.changeCliente2 = function() {
        $scope.loadingState = true;
        $scope.btnPesquisaPropostaLista();
    };

   

    $scope.refreshListaProposta = function() {
        $scope.btnPesquisaPropostaLista();
    }
    // EXIBE A PROPOSTA
    $scope.clone = {};
    $scope.clone.cliente = '';
    $scope.clone.proposta = '';
    $scope.clone.produto = '';
    // CLONA A PROPOSTA
    $scope.clickClonarProposta = function(oProposta) {

        $scope.clone.cliente = oProposta.CSAG320_FANTASIA;
        $scope.clone.cliente_id = oProposta.CSAG320_ID;
        $scope.clone.proposta = oProposta.sPROPOSTA;
        $scope.clone.produto = oProposta.sCCGS202_ID;
    };
    $scope.fSaveCloneProp = function(oClone) {
        if (oClone.cliente.idCliente !== undefined) {
            oClone.cliente_id = oClone.cliente.idCliente;
        }

        if (oClone.modulo == "LCL") {
            var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oClone.cliente_id + "&idClone=" + oClone.proposta;
            window.top.jaddTab("Nova Proposta - LCL", url);
        }
        if (oClone.modulo == "FCL") {
            var url = "Proposta_FCL/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oClone.cliente_id + "&idClone=" + oClone.proposta;
            window.top.jaddTab("Nova Proposta - FCL", url);
        }
        if (oClone.modulo == "AIR") {
            var url = "Proposta_air/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oClone.cliente_id + "&idClone=" + oClone.proposta;
            window.top.jaddTab("Nova Proposta - Air", url);
        }
    }
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

            var url = "PCGS3004_04.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + oProposta.sPROPOSTA;
            window.open(url, 'propostadefrete', 'width=250px');
        });

       
    };
    // EDITAR PROPOSTA
    $scope.clickEditarProposta = function(oProposta) {
       $scope.url = '';
       $scope.PropostaAux = oProposta.sPROPOSTA;
        if (oProposta.sCCGS202_ID == "LCL") {
            $scope.url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA ;
        }
        if (oProposta.sCCGS202_ID == "FCL") {
            $scope.url = "Proposta_FCL/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA;
        }
        if (oProposta.sCCGS202_ID == "AIR") {
            $scope.url = "Proposta_air/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA;
        }

        buscaWS.get('/WVDF_WS/ws_HCGS3008.wso/fValidaBooking/JSON', 'aProp=' + oProposta.sPROPOSTA).then(function(data) {
            if (data !== '') $scope.url = $scope.url + "&Booking="+ data;
            window.top.jaddTab("Proposta #" + $scope.PropostaAux, $scope.url);
        });
    }

    $scope.RefreshExcel = function() {

        $scope.loadingState = true;

        var entidade = $scope.pesquisa;
        entidade.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

        var continente = '';
        var pais = '';
        var cidade = '';

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

        entidade.IBP = $scope.itemsByPage;
        entidade.CP = $scope.currentPage;

        var params = { 'sJSON': entidade };

        $scope.aLista = {};
        $scope.excelGo = 0;
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
            var data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_proposta_complete_client/JSON', parametros)
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
        console.log(data);
        $scope.StatusProposta = data;
    });

    $scope.btnAcaoClick = function(status) {
        // 
        if (status == '8') {
            $scope.currentPropostaCan.Status = status;
            $scope.SaveStatusProposta($scope.currentPropostaCan);
        } else {
            $scope.currentPropostaCan.Status = status;
            $scope.currentPropostaCan.justifica = true;
        }
    }

    $scope.OpenBooking = function(oProposta) {
        // 
        $scope.url = '';
        if (oProposta.sCCGS202_ID == "LCL") {
            $scope.url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA ;
        }
        if (oProposta.sCCGS202_ID == "FCL") {
            $scope.url = "Proposta_FCL/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA;
        }
        if (oProposta.sCCGS202_ID == "AIR") {
            $scope.url = "Proposta_air/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA;
        }

        buscaWS.get('/WVDF_WS/ws_HCGS3008.wso/fCriaBooking/JSON', 'aProp=' + oProposta.sPROPOSTA).then(function(data) {
            $scope.url = $scope.url + "&Booking="+ data;
            window.top.jaddTab("Proposta #" + oProposta.sPROPOSTA, $scope.url);
        });
    }

    buscaWS.get('/WVDF_WS/ws_ccgs202.wso/f_CCGS202_lista/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + "&sProduto=").then(function(data) {
        $scope.lsModalidadesFrete = data;
    });

    // PESQUISA DOS FILTROS EM CIMA DA TELA
    $scope.btnPesquisaMultiPropLista = function() {
        $scope.lsMultiProp = {};
        var entidade = $scope.pesquisa;
        entidade.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        
        var continente = '';
        var pais = '';
        var cidade = '';

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

        entidade.IBP = $scope.itemsByPage;
        entidade.CP = $scope.currentPage;
        entidade.modalFreight = $scope.pesquisa.modalFreight;
        
        var params = { 'sJSON': entidade };
        
        $scope.loadingState = true;

        callWS.get('/WVDF_WS/ws_hcgs3013.wso/fListaMultiProp/JSON', params).then(function(data) {
            $scope.lsPropostas = data.data.dados;
            $scope.totalItems = data.data.qtdLinhas;
            $scope.loadingState = false;
            $scope.BetaFcl = data.data.iBetaTesterFcl;
            $scope.BetaAir = data.data.iBetaTesterAir;
        });
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
        $scope.excelGo = 0;
        $scope.btnPesquisaPropostaLista();
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
        console.log($scope.cliente);
    }

    posicionaProposta();
    
    $scope.loadingState = false;

});