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
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');

    // Posiciona Literais
    $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON', {
        params: {
            aUsuarioSessao: aUsuarioSessao,
            sPrograma: 'pcgs3004_70'
        }
    })
    .then(function(res) {
        $scope.literais = res.data;
        $scope.textoAjuda = $scope.literais.LITERAL_65;
    });

    $scope.clockTimer = 60 * 15;
    $scope.ssStart = 60 * 15;
    $scope.ss = 60 * 15;
    $scope.timerModel = 15;

    var timeoutClock = {};

    $scope.changeClock = function($event, timer) {
        if (timer < 5) {
            parent.parent.alertify.log($scope.literais.LITERAL_88);
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

    $scope.itemsByPage = '';
    $scope.currentPage = '';

    $scope.excelGo = 0;

    $scope.alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z"];

    ////
    var selectedRowsIndexes = [];
    $scope.rows = [{ name: 'Happy Butterfly' }, { name: 'Wonderful Bee' }];

    $scope.loadCont = function(query) {
        // debugger;
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
        // debugger;
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
                // debugger;
                // console.log(data);
                return data;
            });
        return data;
    }
    // buscaWS.get('/WVDF_WS/ws_csag329.wso/buscarPaisesPorTrade/JSON', 'idCont=').then(function(data) {
    //     $scope.lsPais = data;
    // }); 

    $scope.loadCidade = function(query, tipo) {
        // debugger;
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
                // debugger;
                // console.log(data);
                return data;
            });
        return data;
    }

    //Alimenta o Combo de Incoterm
    buscaWS.get('/WVDF_WS/WS_HCGS3000.wso/f_combo_incorterm/JSON', '').then(function(data) {
        $scope.lsIncoterm = data;
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


    // $scope.buscarClienteRazao = function(texto) {
    //     var entidade = {};
    //     entidade.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    //     entidade.aInicio = texto;

    //     var params = { 'sJSON': entidade };

    //     callWS.get('/WVDF_WS/ws_csag340.wso/buscarClienteRazao/JSON', params)
    //         .then(function(response) {
    //             console.log(response);
    //             $scope.lsClientes = response.data;
    //         });
    // }

    $scope.buscarClienteFantasia = function(texto) {

        if (texto !== '') {
            var entidade = {};
            entidade.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
            entidade.aInicio = texto;

            var params = { 'sJSON': entidade };

            callWS.get('/WVDF_WS/ws_csag340.wso/buscarClienteFantasia/JSON', params)
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
        // debugger;
        var entidade = $scope.pesquisa;
        entidade.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        // entidade.status     = $scope.pesquisa.status;
        // entidade.modal      = $scope.pesquisa.modal;
        // entidade.validade   = $scope.pesquisa.validade;
        // entidade.data_elab  = $scope.pesquisa.data_elab;
        // entidade.elaborador = $scope.pesquisa.elaborador;
        // entidade.destino    = $scope.pesquisa.destino;
        // entidade.origem     = $scope.pesquisa.origem;
        // entidade.fantasia   = $scope.pesquisa.fantasia;
        entidade.IBP = $scope.itemsByPage;
        entidade.CP = $scope.currentPage;

        var params = { 'sJSON': entidade };

        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_lista_propostas/JSON', params)
            .then(function(data) {
                // debugger;
                $scope.lsPropostas = data.data.dados;
                $scope.totalItems = data.data.qtdLinhas;
                $scope.loadingState = false;
            });

    }

    // AutoComplete de Clientes
    $scope.acClientes = function(texto) {
        // console.log(vendedor);
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
            return parent.parent.alertify.error($scope.literais.LITERAL_66);
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
    $scope.clickExibirProposta = function(oProposta) {
        var url = "PCGS3004_06.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA + "&idVendedor=" + oProposta.aVendedor;
        window.top.jaddTab($scope.literais.LITERAL_06 + "#" + oProposta.sPROPOSTA, url);
    };

    $scope.clone = {};
    $scope.clone.cliente = '';
    $scope.clone.proposta = '';
    // CLONA A PROPOSTA
    $scope.clickClonarProposta = function(oProposta) {
        debugger;
        $scope.clone.cliente = oProposta.CSAG320_FANTASIA;
        $scope.clone.cliente_id = oProposta.CSAG320_ID;
        $scope.clone.proposta = oProposta.sPROPOSTA;
    };
    $scope.fSaveCloneProp = function(oClone) {
        if (oClone.cliente.idCliente !== undefined) {
            oClone.cliente_id = oClone.cliente.idCliente;
        }
        debugger;
        if (oClone.modulo == "LCL") {
             _USER.storage.set('aCx0127x_1', 1);
            var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') /*+ "&Guest=1"*/ + "&idCliente=" + oClone.cliente_id + "&idClone=" + oClone.proposta;
            window.top.jaddTab($scope.literais.LITERAL_23, url);
        } 
        if (oClone.modulo == "FCL") {
             _USER.storage.set('aCx0127x_1', 1);
            var url = "Proposta_FCL_G/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') /*+ "&Guest=1"*/ + "&idCliente=" + oClone.cliente_id + "&idClone=" + oClone.proposta;
            window.top.jaddTab($scope.literais.LITERAL_22, url);
        }    
    }
    // VISUALIZAR 
    $scope.btnVisualizarProposta = function(oProposta) {
        var prev = oProposta.StatusID;
        if (prev == 3) {
            parent.parent.alertify.error($scope.literais.LITERAL_67);
            return;
        }
        if (prev == 4) {
            parent.parent.alertify.error($scope.literais.LITERAL_68);
            return;
        }
        if (prev == 10) {
            parent.parent.alertify.error($scope.literais.LITERAL_69);
            return;
        }
        if (prev == 11 || prev == 12) {
            parent.parent.alertify.error($scope.literais.LITERAL_70);
            return;
        }
        if (prev == 5) {
            parent.parent.alertify.error($scope.literais.LITERAL_71);
            return;
        }

        var url = "PCGS3004_04.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + oProposta.sPROPOSTA;
        window.open(url, $scope.literais.LITERAL_72, 'width=250px');
    };
    // EDITAR PROPOSTA
    $scope.clickEditarProposta = function(oProposta) {
        if (oProposta.sCCGS202_ID == "LCL") {
             _USER.storage.set('aCx0127x_1', 1);
            var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') /*+ "&Guest=1"*/ + "&idVendedor=" + getVariavelURL('idVendedor') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA + "&Booking=";
            window.top.jaddTab($scope.literais.LITERAL_73 + oProposta.sPROPOSTA, url);
        } else {
             _USER.storage.set('aCx0127x_1', 1);
            var url = "Proposta_FCL_G/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') /*+ "&Guest=1"*/ + "&idVendedor=" + getVariavelURL('idVendedor') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA + "&Booking=";
            window.top.jaddTab($scope.literais.LITERAL_74 + oProposta.sPROPOSTA, url);
        }
    }

    $scope.RefreshExcel = function() {
        debugger;
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
            debugger;
            $scope.aLista = data.data;
            $scope.excelGo = 1;

            setTimeout(function() {
                debugger;
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
        saveAs(blob, $scope.literais.LITERAL_75 + ".xls");
        debugger;
        $scope.aLista = {}; 
    };

    //AUTOCOMPLETE CLIENTE
    $scope.loadClientes = function(query) {
        if (query.length > 2) {
            // debugger;
            var parametros = 'sInicio=' + query;
            var data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_proposta_complete_client/JSON', parametros)
                .then(function(data) {
                    return data;
                });
            return data;
        }
    };


    $scope.btnNovaPropostaFCL = function() {
        if ($scope.cliente.length != 0) {
             _USER.storage.set('aCx0127x_1', 1);
            var url = "Proposta_FCL_G/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') /*+ "&Guest=1"*/;
            url += "&idCliente=" + $scope.cliente[0].ID;
            window.top.jaddTab($scope.literais.LITERAL_22, url);
        } else {
            parent.parent.alertify.error($scope.literais.LITERAL_76);
        }
    }

    $scope.btnNovaProposta = function() {
        if ($scope.cliente.length != 0) {
             _USER.storage.set('aCx0127x_1', 1);
            var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') /*+ "&Guest=1"*/ + "&idCliente=" + $scope.cliente[0].ID;
            window.top.jaddTab($scope.literais.LITERAL_23, url);
        } else {
            parent.parent.alertify.error($scope.literais.LITERAL_76);
        }
    }

    $scope.btnAbrirTarifario = function() {
        var url = "PCGS3000_00.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&bComercial=true&sTabela=HCGS3000_1";
        window.top.jaddTab($scope.literais.LITERAL_77, url);
    }

    $scope.btnAbrirSolicitacao = function() {
        var url = "PCGS2100_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
        window.top.jaddTab($scope.literais.LITERAL_78, url);
    }

    buscaWS.get('/WVDF_WS/ws_HCGS3004.wso/f_lista_status/JSON', '').then(function(data) {
        $scope.itemsStatusProposta = data;
    });

    buscaWS.get('/WVDF_WS/ws_CCGS229.wso/listaMotivosProp/JSON', '').then(function(data) {
        console.log(data);
        $scope.StatusProposta = data;
    });

    $scope.btnAcaoClick = function(status) {
        if (status == '8') {
            $scope.currentPropostaCan.Status=status;
            $scope.SaveStatusProposta($scope.currentPropostaCan);
        }
        else {
            $scope.currentPropostaCan.Status=status;
            $scope.currentPropostaCan.justifica=true;
        }
    }

    $scope.OpenBooking = function(oProposta) {
        $scope.url = ''; 
        if (oProposta.sCCGS202_ID == "LCL") {
            _USER.storage.set('aCx0127x_1', 1);
            $scope.url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') /*+ "&Guest=1"*/ + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA + "&Booking=";
        } else {
             _USER.storage.set('aCx0127x_1', 1);
            $scope.url = "Proposta_FCL_G/PCGS3004_01.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') /*+ "&Guest=1"*/ + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA + "&Booking=";
        }

        buscaWS.get('/WVDF_WS/ws_HCGS3008.wso/fCriaBooking/JSON', 'aProp=' + oProposta.sPROPOSTA).then(function(data) {
            $scope.url = $scope.url + data;  
            window.top.jaddTab($scope.literais.LITERAL_06 + "#" + oProposta.sPROPOSTA, $scope.url);
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
        // entidade.status     = $scope.pesquisa.status;
        // entidade.modal      = $scope.pesquisa.modal;
        // entidade.validade   = $scope.pesquisa.validade;
        // entidade.data_elab  = $scope.pesquisa.data_elab;
        // entidade.elaborador = $scope.pesquisa.elaborador;
        // entidade.destino    = $scope.pesquisa.destino;
        // entidade.origem     = $scope.pesquisa.origem;
        // entidade.fantasia   = $scope.pesquisa.fantasia;
        // debugger;
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
        // debugger;
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_lista_propostas/JSON', params)
            .then(function(data) {
                // debugger;
                $scope.lsPropostas = data.data.dados;
                $scope.totalItems = data.data.qtdLinhas;
                $scope.loadingState = false;
            });
        // $scope.loadingState = false;  
        // debugger;
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
        $scope.excelGo = 0;
        $scope.btnPesquisaPropostaLista();
    }

    $scope.SaveStatusProposta = function(oModel) {

        // debugger;
        $scope.loadingState = true;
        var params = {
            'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
            'aProposta': oModel.prop,
            'aStatus': oModel.Status,
            'aJustificativa': oModel.motivoCancelamento,
            'aMotivo': oModel.motivo
        };
        console.log(params);
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_chg_status/JSON', params).then(function(data) {
            // debugger;
            if (data.data !== 0 && data.data !== 99 && data.data !== 98) 
            {
                var texto;
                if (data.data == 8) texto= 'Proposta Aprovada!';
                if (data.data == 9) texto= 'Proposta Cancelada!';
                if (data.data == 6) texto= 'Proposta Perdida!';
                parent.parent.alertify.success($scope.literais.LITERAL_79);
            }
            else { 
                if (data.data == 99) 
                {
                    parent.parent.alertify.error($scope.literais.LITERAL_80); 
                    $scope.loadingState = false;  
                    return; 
                }
                else
                {
                    if (data.data == 98) 
                    {
                        parent.parent.alertify.error($scope.literais.LITERAL_81);
                        $scope.loadingState = false;  
                        return;
                    }
                    else {
                        parent.parent.alertify.error($scope.literais.LITERAL_82);
                        $scope.loadingState = false;  
                        return;
                    }
                }
            }  
            
            $scope.loadingState = true;
            $scope.refreshListaProposta()  
            $scope.loadingState = false;        
        });
        $scope.loadingState = false;

    }

    $scope.CloneBooking = function(oProposta) {

        $scope.loadingState = true;
        var params = {
            'sPropostaOld': oProposta.prop,
            'aUsuarioSessao': getVariavelURL('aUsuarioSessao')
        };
        console.log(params);
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_clone_prop/JSON', params).then(function(data) {
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
    
    $scope.changeStatusProposta = function(oProposta) {
        // debugger;
        $scope.currentPropostaCan.prop = oProposta.sPROPOSTA;
        $scope.currentPropostaCan.status = oProposta.StatusID;
        $scope.currentPropostaCan.motivoCancelamento = '';
        $scope.currentPropostaCan.motivo = '0';
        $scope.currentPropostaCan.justifica = false;
        $scope.currentPropostaCan.status_click = false;
        $scope.currentPropostaCan.book = oProposta.book;

        $timeout(function() {
            angular.element('#modalButtonCancelamento').trigger('click');
        });

    }

    posicionaProposta();
    $scope.desabilitarProposta = true;
    $scope.loadingState = false;

});