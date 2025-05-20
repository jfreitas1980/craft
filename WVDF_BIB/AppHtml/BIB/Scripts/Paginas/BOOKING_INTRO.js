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
app = angular.module('bookingintroApp', ['ngTagsInput','smart-table', 'ngSanitize', 'ui.select', 'wsDominio', 'diretivas', 'ui.bootstrap', 'toaster']);

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
app.controller('bookingintroController', function($scope, $q, buscaWS, callWS, $http, $q, $filter, toaster, $timeout) {

    $scope.clockTimer = 60 * 15;
    $scope.ssStart = 60 * 15;
    $scope.ss = 60 * 15;
    $scope.timerModel = 15;

    var timeoutClock = {};

    $scope.changeClock = function($event, timer) {
        if(timer < 5){
            toaster.pop('warning', "Error","O tempo de refresh deve ser maior que 5 minutos!" , null, 'trustedHtml'); 
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
                $scope.refresh();
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
    $scope.pesquisa.customerRef = '';

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

    $scope.loadCont= function(query) {
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

    $scope.loadPais= function(query,tipo) {
        // debugger;
        var continente = '';
        var parametros = 'aInicio=' + query;
        if (tipo == 'D') {
            for (var i = $scope.pesquisa.contdest.length - 1; i >= 0; i--) {
                if (continente == '') {continente = $scope.pesquisa.contdest[i].id;}
                else {continente += ','+$scope.pesquisa.contdest[i].id;}
            }
            parametros += '&aCont=' + continente;
        }
        if (tipo == 'O') {
            for (var i = $scope.pesquisa.contorig.length - 1; i >= 0; i--) {
                if (continente == '') {continente = $scope.pesquisa.contorig[i].id;}
                else {continente += ','+$scope.pesquisa.contorig[i].id;}
            }
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

    $scope.NovaPropostaClick = function() {

        $scope.filterTxt = '';
        $scope.cliente = '';
        $scope.prospeccao = '';
    }

    $scope.loadCidade= function(query,tipo){
        // debugger;
        var pais = '';
        var parametros = 'aInicio=' + query;
        if (tipo == 'D') {
            for (var i = $scope.pesquisa.paisdest.length - 1; i >= 0; i--) {
                if (pais == '') {pais = $scope.pesquisa.paisdest[i].id;}
                else {pais += ','+$scope.pesquisa.paisdest[i].id;}
            }
            parametros += '&aPais=' + pais;
        }
        if (tipo == 'O') {
            for (var i = $scope.pesquisa.paisorig.length - 1; i >= 0; i--) {
                if (pais == '') {pais = $scope.pesquisa.paisorig[i].id;}
                else {pais += ','+$scope.pesquisa.paisorig[i].id;}
            }
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
    buscaWS.get('/WVDF_WS/WS_HCGS3000.wso/f_combo_incorterm/JSON', '').then(function(data) {
        $scope.lsIncoterm = data;
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
        }
        else {$scope.lsClientes = [];}

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
        entidade.IBP        = $scope.itemsByPage;
        entidade.CP         = $scope.currentPage;

        var params = { 'sJSON': entidade };

        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_lista_propostas/JSON', params)
        .then(function(data) {
            $scope.lsPropostas = data.data.dados;
            $scope.totalItems = data.data.qtdLinhas;
            $scope.loadingState = false;
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

    $scope.refresh = function() {
        //posicionaProposta();
        $scope.btnPesquisaPropostaLista();
    }
    // EXIBE A PROPOSTA
    $scope.clickExibirProposta = function(oProposta) {
        var url = "PCGS3004_06.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA + "&idVendedor=" + oProposta.aVendedor;
        window.top.jaddTab("Proposta #" + oProposta.sPROPOSTA, url);
    };

    $scope.clone = {};
    $scope.clone.cliente = '';
    $scope.clone.proposta = '';
    // CLONA A PROPOSTA
    $scope.clickClonarProposta = function(oProposta) {
        
        // debugger;
        $scope.clone.cliente = oProposta.CSAG320_FANTASIA;
        $scope.clone.cliente_id = oProposta.CSAG320_ID;
        $scope.clone.proposta = oProposta.sPROPOSTA;
        

    };
    $scope.fSaveCloneProp = function(oClone) {
        debugger;
        if (oClone.cliente.idCliente !== undefined) {
            oClone.cliente_id = oClone.cliente.idCliente;
        }
        if (oClone.cliente.idCliente !== 0) 
        {
            buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_clone_prop/JSON', 'aProp=' + oClone.proposta + "&aCliente=" + oClone.cliente_id + "&sClienteProspect=" + oClone.cliente + "&aUsuarioSessao=" + getVariavelURL('aUsuarioSessao')).then(function(data) {
                // debugger;    
                var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oClone.cliente_id + "&idProposta=" + data.aProp + "&idClone=1";
                window.top.jaddTab("Proposta #" + data.aProp, url);
    
            });
        }
        else {

            buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_clone_prop/JSON', 'aProp=' + oClone.proposta + "&aCliente=" + oClone.cliente_id + "&sClienteProspect=" + oClone.cliente + "&aUsuarioSessao=" + getVariavelURL('aUsuarioSessao')).then(function(data) {
                // debugger;    
                var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + oClone.cliente_id + "&idProposta=" + data.aProp + "&idProspect=" + data.sProspect  + "&idClone=1";
                window.top.jaddTab("Proposta #" + data.aProp, url);
    
            });

        }
    }
    // VISUALIZAR 
    $scope.btnVisualizarProposta = function(oProposta) {
        //debugger;
        var prev = oProposta.StatusID;
        
        if (prev == '3' || prev == '4' || prev == '5' || prev == '11' || prev == '12' || prev == '10') {
        // if (oProposta.Status == "EM ANALISE PELO PRICING") {
            if (prev == '4') {
                parent.parent.alertify.error('Proposta em Analise!');
                return;
                // toaster.pop({
                //     type: 'error',
                //     title: 'Bloqueado',
                //     body: ("Proposta em Analise nao pode ser impressa!"),
                //     bodyOutputType: 'trustedHtml'
                // });
            }

            if (prev == '3') {
                parent.parent.alertify.error('Proposta em Aguardo!');
                return;
                // toaster.pop({
                //     type: 'error',
                //     title: 'Bloqueado',
                //     body: ("Proposta em Aguardo nao pode ser impressa!"),
                //     bodyOutputType: 'trustedHtml'
                // });
            }

            if (prev == '5') {
                parent.parent.alertify.error('Proposta Expirada!');
                return;
                // toaster.pop({
                //     type: 'error',
                //     title: 'Bloqueado',
                //     body: ("Proposta Expirada nao pode ser impressa!"),
                //     bodyOutputType: 'trustedHtml'
                // });
            }

            if (prev == '10') {
                parent.parent.alertify.error('Proposta com Falta de Informacoes!');
                return;
                // toaster.pop({
                //     type: 'error',
                //     title: 'Bloqueado',
                //     body: ("Proposta com Falta de Informacoes nao pode ser impressa!"),
                //     bodyOutputType: 'trustedHtml'
                // });
            }

            if (prev == '11' || prev == '12') {
                parent.parent.alertify.error('Proposta em Verificacao!');
                return;
                // toaster.pop({
                //     type: 'error',
                //     title: 'Bloqueado',
                //     body: ("Proposta em Verificacao nao pode ser impressa!"),
                //     bodyOutputType: 'trustedHtml'
                // });
            }

        }
        else {
            var url = "PCGS3004_04.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + oProposta.sPROPOSTA;
            window.open(url, 'propostadefrete', 'width=250px');
        }
    };

    // EDITAR PROPOSTA
    $scope.clickEditarProposta = function(oProposta) {
        //    console.log(getVariavelURL('idVendedor'));
        var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idVendedor=" + getVariavelURL('idVendedor') + "&idCliente=" + oProposta.CSAG320_ID + "&idProposta=" + oProposta.sPROPOSTA;
        window.top.jaddTab("Proposta #" + oProposta.sPROPOSTA, url);
    }
    
    // debugger;
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

    $scope.RefreshExcel = function(params) {
        // debugger;
        $scope.aLista = {};
        $scope.excelGo = 0;
        // buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_relatorio_proposta/JSON', params).then(function(data) {
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/f_relatorio_proposta/JSON', params).then(function(data) {
            // debugger;
            $scope.aLista = data.data;  
            $scope.excelGo = 1;
            // $scope.loadingState=false;      
        });        
    }

    //---- IMPRESSAO EM EXCEL
    $scope.btnImprimirEXCEL = function() { 
        var blob = new Blob([document.getElementById('export').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Proposta_Report.xls"); 
    };

    //AUTOCOMPLETE CLIENTE
    $scope.loadClientes = function(query) {
        if (query.length > 2) {
            // debugger;
            var parametros = 'sInicio=' + query;
            var data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_proposta_complete_client/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    // debugger;
                    return data;
                });
            return data;
        }
    };

    $scope.btnNovaProposta = function() {
        // debugger;
        if ($scope.cliente.length != 0 || $scope.prospeccao!=='') {
            console.log($scope.cliente);
            if ($scope.prospeccao!=='') {
                var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=&idVendedor=&Prospect=" + $scope.prospeccao;
            }
            else {    
                var url = "PCGS3004_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idCliente=" + $scope.cliente[0].ID + "&idVendedor=" + $scope.cliente[0].aVendedor+ "&Prospect=" + $scope.prospeccao;
            }
            window.top.jaddTab("Nova proposta", url);
        } else {
            toaster.pop({
                type: 'error',
                title: 'Error',
                body: ("Clique em Pesquisa e selecione um cliente"),
                bodyOutputType: 'trustedHtml'
            });
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
        // debugger;
        console.log(data);
        $scope.StatusProposta = data;
    });

    /* $scope.changeStatusProposta = function(oProposta) {
        $scope.loadingState = true;
        buscaWS.get('/WVDF_WS/ws_HCGS3004.wso/f_chg_status/JSON', 'aProposta=' + oProposta.sPROPOSTA + '&aStatus=' + oProposta.Status).then(function(data) {});
        $scope.loadingState = false;
    }
*/  
    $scope.btnAcaoClick = function(status) {
        // debugger;
        var prev = $scope.currentPropostaCan.previusStat;
        if (status == '8') {
            if (prev == '3' || prev == '4' || prev == '5' || prev == '11' || prev == '12') {
                toaster.pop({
                    type: 'error',
                    title: 'Bloqueado',
                    body: ("Proposta Incompleta nao pode ser Aprovada!"),
                    bodyOutputType: 'trustedHtml'
                });
                return;
            }
            $scope.currentPropostaCan.Status=status;
            $scope.SaveStatusProposta($scope.currentPropostaCan);
        }
        else {
            if (status == '6') {
                if (prev == '3' || prev == '4' || prev == '5' || prev == '11' || prev == '12') {
                    toaster.pop({
                        type: 'error',
                        title: 'Bloqueado',
                        body: ("Proposta Incompleta nao pode ser Rejeitada!"),
                        bodyOutputType: 'trustedHtml'
                    });
                    return;
                }
            }
            $scope.currentPropostaCan.Status=status;
            $scope.currentPropostaCan.justifica=true;
        }

    }

    // PESQUISA DOS FILTROS EM CIMA DA TELA
    $scope.btnPesquisaPropostaLista = function() {
        $scope.lsPropostas = {};
        var entidade = $scope.pesquisa;
        entidade.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        // debugger;
        var continente = '';
        var pais = '';
        var cidade = '';

        if ($scope.pesquisa.contdest !== '') {
            for (var i = $scope.pesquisa.contdest.length - 1; i >= 0; i--) {
                if (continente == '') {continente = $scope.pesquisa.contdest[i].id;}
                else {continente += ','+$scope.pesquisa.contdest[i].id;}
            }
            entidade.contdest_i=continente;
        }
        else {entidade.contdest_i='';}

        if ($scope.pesquisa.contorig !== '') {
            for (var i = $scope.pesquisa.contorig.length - 1; i >= 0; i--) {
                if (continente == '') {continente = $scope.pesquisa.contorig[i].id;}
                else {continente += ','+$scope.pesquisa.contorig[i].id;}
            }
            entidade.contorig_i=continente;
        }
        else {entidade.contorig_i='';}


        if ($scope.pesquisa.paisdest !== '') {
            for (var i = $scope.pesquisa.paisdest.length - 1; i >= 0; i--) {
                if (pais == '') {pais = $scope.pesquisa.paisdest[i].id;}
                else {pais += ','+$scope.pesquisa.paisdest[i].id;}
            }
            entidade.paisdest_i=pais;
        }
        else {entidade.paisdest_i='';}

        if ($scope.pesquisa.paisorig !== '') {
            for (var i = $scope.pesquisa.paisorig.length - 1; i >= 0; i--) {
                if (pais == '') {pais = $scope.pesquisa.paisorig[i].id;}
                else {pais += ','+$scope.pesquisa.paisorig[i].id;}
            }
            entidade.paisorig_i=pais;
        }
        else {entidade.paisorig_i='';}

        
        if ($scope.pesquisa.destino !== '') {
            for (var i = $scope.pesquisa.destino.length - 1; i >= 0; i--) {
                if (cidade == '') {cidade = $scope.pesquisa.destino[i].id;}
                else {cidade += ','+$scope.pesquisa.destino[i].id;}
            }
            entidade.destino_i=cidade;
        }
        else {entidade.destino_i='';}

        if ($scope.pesquisa.origem !== '') {
            for (var i = $scope.pesquisa.origem.length - 1; i >= 0; i--) {
                if (cidade == '') {cidade = $scope.pesquisa.origem[i].id;}
                else {cidade += ','+$scope.pesquisa.origem[i].id;}
            }
            entidade.origem_i=cidade;
        }
        else {entidade.origem_i='';}

        entidade.IBP        = $scope.itemsByPage;
        entidade.CP         = $scope.currentPage;

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
        $scope.RefreshExcel(params);
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
        $scope.pesquisa.customerRef = '';
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
            if (data.data !== 0) 
            {
                var texto;
                if (data.data == 8) texto= 'Proposta Aprovada!';
                if (data.data == 9) texto= 'Proposta Cancelada!';
                if (data.data == 6) texto= 'Proposta Perdida!';
                toaster.pop('success', "Status Alterado",texto, null, 'trustedHtml');

            }
            else toaster.pop('warning', "Error","Status nao pode ser alterado!" , null, 'trustedHtml');  
            $scope.loadingState = true;
            $scope.refresh()  
            $scope.loadingState = false;        
        });
        $scope.loadingState = false;

    }
    $scope.changeStatusProposta = function(oProposta) {
        // debugger;
        $scope.currentPropostaCan.prop = oProposta.sPROPOSTA;
        $scope.currentPropostaCan.previusStat = oProposta.StatusID
        $scope.currentPropostaCan.motivoCancelamento = '';
        $scope.currentPropostaCan.motivo = '0';
        $scope.currentPropostaCan.justifica=false;
        $scope.currentPropostaCan.status_click=false;
        
        $timeout(function() {
            angular.element('#modalButtonCancelamento').trigger('click');
        });
        
    }

    // $("#modalButtonPesquisa").trigger("click");

    ///// select infinity
    // $scope.lsClientes = [];
    // $scope.clientesPage = 1;
    // var loadClientes = function() {
    //     $scope.loading = true;

    //     buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_clixvend/JSON', 'itemsByPage=' + 40 + '&currentPage=' + $scope.clientesPage).then(function(data) {
    //         // debugger;
    //         $scope.lsClientes = $scope.lsClientes.concat(data.dados);

    //     });
    //     $scope.clientesPage++;
    //     $scope.loading = false;
    // }

    // $scope.scrollWatchClientes = function(scroll) {
    //     if (scroll.scrollTop >= scroll.maxScrollTop / 2) {
    //         loadClientes();
    //     }
    // }

    // loadCl
    // $scope.changeCliente2();
    posicionaProposta();
    // $scope.btnPesquisaPropostaLista();
    $scope.desabilitarProposta = true;
    $scope.loadingState = false;
    // end select

});
