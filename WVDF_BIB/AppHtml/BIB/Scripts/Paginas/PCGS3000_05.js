var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
var idMultiProp = getVariavelURL('sCodigo');

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

app.directive('spinner', [function($parse) {
    return {
        restrict: "EA",
        transclude: true,
        replace: true,
        scope: {
            tableData: '<',
        },
        template: '<div class="spinner-wrapper"><div class="spinner spinner1"></div></div>',
    };
}]);

app.factory('$spinner', [function() {

    function show() {
        $('.spinner-wrapper').addClass('spinner-show');


        if (window.frameElement && window.frameElement.nodeName == "IFRAME") {
            let spinner = document.querySelector('.spinner');
            spinner.style.top = window.top.scrollY +250 + 'px';
            spinner.style.position = "absolute";
        }
    }

    function hide() {
        $('.spinner-wrapper').removeClass('spinner-show');
    }

    function toggle() {
        $('.spinner-wrapper').toggleClass('spinner-show');
         if (window.frameElement && window.frameElement.nodeName == "IFRAME") {
            let spinner = document.querySelector('.spinner');
            spinner.style.top = window.top.scrollY +250 + 'px';
            spinner.style.position = "absolute";
        }
    }

    return {
        'show': show,
        'hide': hide,
        'toggle': toggle
    };
}]);

app.controller('pcgs300005Controller', function($scope, Alertify, buscaWS, callWS, $http, $q, $compile, toaster, $uibModal, $rootScope, $spinner) {

    $scope.itemsByPage = 10;
    $scope.currentPage = 1;
    $scope.filtro = {};
    $scope.filtro.fCodigo = '';
    $scope.multiProp = {};
    $scope.filtro = {};
    $scope.filtroCache = {};

    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    $scope.sCodigo = getVariavelURL('sCodigo');

    let init = function() {

        if (idMultiProp !== '' && idMultiProp !== false) {

            $spinner.show();
            buscaWS.get('/WVDF_WS/ws_HCGS3013.wso/fPosicionaMultiProp/JSON', 'sCodigo=' + idMultiProp).then(function(response) {
                debugger;
                console.log(response);

                $scope.MultiOrigem = response.multiOrigem;
                $scope.bShow = true;
                $scope.bExecute = true;
                $scope.filtroCache = response;
                $scope.filtro = response;

                if ($scope.MultiOrigem == undefined) return;
                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;

                $scope.filteredTodos = $scope.MultiOrigem.slice(begin, end);

                $spinner.hide();

            }, function(error) {
                $spinner.hide();
            });
        } else $scope.openFiltro('lg', '');

    }

    $scope.fGerarProposta = function(row) {
        row.fCliente = $scope.filtro.fCliente;
        row.sCodigo = $scope.filtro.fCodigo;
        console.log(row);
        $scope.open('lg', row);
    }

    $scope.animationsEnabled = true;

    $scope.btnDownloadPdf = function() {

        if (!$scope.MultiOrigem.length) return;

        $scope.currentPage = 1;
        $scope.numPerPage = $scope.MultiOrigem.length;

        for (var i = $scope.dayDataCollapse.length - 1; i >= 0; i--) {
            $scope.dayDataCollapse[i] = false;
        }
        setTimeout(function() {
            $('#content button').hide();
            $('.pagination-area').hide();

            setTimeout(function() {
                printJS({
                    printable: 'content',
                    type: 'html',
                    scanStyles: true,
                    showModal: false,
                    modalMessage: "",
                    targetStyle: ["*"],
                    targetStyles: ["*"],
                    onLoadingEnd: function() {


                        $('#content button').show();
                        $('.pagination-area').show()

                        for (var i = $scope.dayDataCollapse.length - 1; i >= 0; i--) {
                            $scope.dayDataCollapse[i] = true;
                        }

                        $scope.currentPage = 1;
                        $scope.numPerPage = 10;

                        $scope.$apply();
                    }
                });
            }, 100);
        }, 100);
    }

    $scope.open = function(size, mdata) {
        var parentElem = undefined;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'modalBook.html',
            controller: 'ModalBookCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                mdata: function() {
                    return mdata;
                }
            }
        });
        modalInstance.rendered.then(function() {
            if (window.frameElement && window.frameElement.nodeName == "IFRAME") {
                let modal = document.querySelector('.modal-dialog');
                modal.style.top = window.top.scrollY + 'px';
            }
        });
        modalInstance.result.then(function() {}, function() {

        });
    };

    $scope.btnModal = function() {
        $scope.open('lg');
    }

    $scope.openFiltro = function(size, mdata) {
        var parentElem = undefined;
        mdata = mdata || {};
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'modalFiltro.html',
            controller: 'ModalFiltroCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                modaldata: function() {
                    return mdata;
                }
            }
        });
        modalInstance.rendered.then(function() {
            if (window.frameElement && window.frameElement.nodeName == "IFRAME") {
                let modal = document.querySelector('.modal-dialog');
                modal.style.top = window.top.scrollY + 'px';
            }
        });
        modalInstance.result.then(function(result) {
            console.log(result);
            $scope.MultiOrigem = result.data;
            $scope.bShow = result.bShow;
            $scope.bExecute = result.bExecute;
            $scope.filtro = result.filtro;
            $scope.filtroCache = result.filtro;
            console.log(result.filtro);

            if ($scope.MultiOrigem == undefined) return;
            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                end = begin + $scope.numPerPage;

            $scope.filteredTodos = $scope.MultiOrigem.slice(begin, end);
        });
    };

    $scope.btnFiltrar = function() {
        $scope.openFiltro('lg', $scope.filtroCache);
    }

    $scope.tableRowExpanded = false;
    $scope.tableRowIndexCurrExpanded = "";
    $scope.tableRowIndexPrevExpanded = "";
    $scope.storeIdExpanded = "";
    $scope.dayDataCollapse = [true, true, true, true, true, true, true, true, true, true, true, true, true, true];

    $scope.todos = [];
    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;


    $scope.$watch("currentPage + numPerPage", function() {

        if ($scope.MultiOrigem !== undefined) {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                end = begin + $scope.numPerPage;


            $scope.filteredTodos = $scope.MultiOrigem.slice(begin, end);
        }
    });

    $scope.dayDataCollapseFn = function() {
        for (var i = 0; $scope.MultiOrigem.length - 1; i += 1) {
            $scope.dayDataCollapse.append('true');
        }
    };

    $scope.selectTableRow = function(index, storeId) {
        if ($scope.dayDataCollapse === 'undefined') {
            $scope.dayDataCollapse = $scope.dayDataCollapseFn();
        } else {

            if ($scope.tableRowExpanded === false && $scope.tableRowIndexCurrExpanded === "" && $scope.storeIdExpanded === "") {
                $scope.tableRowIndexPrevExpanded = "";
                $scope.tableRowExpanded = true;
                $scope.tableRowIndexCurrExpanded = index;
                $scope.storeIdExpanded = storeId;
                $scope.dayDataCollapse[index] = false;
            } else if ($scope.tableRowExpanded === true) {
                if ($scope.tableRowIndexCurrExpanded === index && $scope.storeIdExpanded === storeId) {
                    $scope.tableRowExpanded = false;
                    $scope.tableRowIndexCurrExpanded = "";
                    $scope.storeIdExpanded = "";
                    $scope.dayDataCollapse[index] = true;
                } else {
                    $scope.tableRowIndexPrevExpanded = $scope.tableRowIndexCurrExpanded;
                    $scope.tableRowIndexCurrExpanded = index;
                    $scope.storeIdExpanded = storeId;
                    $scope.dayDataCollapse[$scope.tableRowIndexPrevExpanded] = true;
                    $scope.dayDataCollapse[$scope.tableRowIndexCurrExpanded] = false;
                }
            }
        }
    }


    $scope.$on('tableOnData', function(response) {
        console.log("teste", response);
    });

    init();
});

app.controller('ModalInstance01Ctrl', function($uibModalInstance, $scope, mdata, callWS) {
    $scope.modalOk = function() {

        $uibModalInstance.close();
    };

    $scope.modalCancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalBookCtrl', function($scope, $uibModalInstance, mdata, callWS, $spinner) {

    var init = function() {
        $scope.container = {};
        $scope.data = mdata;
    }

    $scope.ok = function() {
        $spinner.show();
        parent.parent.alertify.success('Preparando Proposta!');
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'sCodigo': mdata.sCodigo,
            'fretes': mdata.sRecnum,
            's20dryQtd': $scope.container.dry20Qtd,
            's20dryPeso': $scope.container.dry20Peso,
            's40dryQtd': $scope.container.dry40Qtd,
            's40dryPeso': $scope.container.dry40Peso,
            's40hcQtd': $scope.container.hc40Qtd,
            's40hcPeso': $scope.container.hc40Peso,
        }
        console.log(mdata);
        callWS.get('/WVDF_WS/ws_hcgs3004.wso/fGeneratePropFromTarifario/JSON', { 'sJson': params }).then(function(response) {

            console.log(response);

            if (response.data.id == '' || response.data.value == '') {
                parent.parent.alertify.error('Booking nao pode ser gerado!');
                $spinner.hide();
                return;
            }

            var url = "Proposta_FCL/PCGS3004_01.html?aUsuarioSessao=" + aUsuarioSessao + "&idCliente=" + mdata.fCliente.idCliente + "&idProposta=" + response.data.id + "&Booking=" + response.data.value;
            console.log(url);
            window.top.jaddTab("Proposta FCL - " + response.data.id, url);
            $spinner.hide();
            $uibModalInstance.close();

        });
    }

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    init();
});


app.controller('ModalFiltroCtrl', function($scope, modaldata, Alertify, buscaWS, callWS, $http, $q, $compile, toaster, $uibModalInstance, $spinner) {

    $scope.pesquisa = {};
    $scope.filtro = {};
    $scope.fCodigo = modaldata.fCodigo;
    var init = function() {

        if (modaldata.fCodigo) {
            /* $scope.fCodigo = modaldata.fCodigo;
             $scope.fProtocolo = modaldata.fProtocolo;
             $scope.fPais = modaldata.fPais;
             $scope.fPaisD = modaldata.fPaisD;
             $scope.fArmador = modaldata.fArmador;
             $scope.fPol = modaldata.fPol;
             $scope.fPod = modaldata.fPod;
             $scope.fCliente = modaldata.fCliente;
             $scope.fNac = modaldata.fNac;*/
             debugger;
            $scope.filtro = modaldata;
        }
    }

    var auxParametros = {};
    auxParametros.aUsuarioSessao = aUsuarioSessao;

    $scope.lsPOD = {};
    $scope.lsPOL = {};

    $scope.colums = [];

    $scope.acCarrier = function(query) {
        return buscaWS.get('/WVDF_WS/WS_csag320.wso/f_bCSAG342_armador/JSON', 'sInicial=' + query + "&sSessionId=" + aUsuarioSessao).then(function(data) {
            return data;
        });
    };

    // AUTOCOMPLETE PARA O CAMPO VIA
    $scope.acCidades = function(query) {
        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesVia/JSON', 'aUsuarioSessao=' + aUsuarioSessao + '&idPais=&sCidade=' + query)
            .then(function(data) {
                return data;
            });
        return data;
    };

    $scope.acCidades_D = function(query, pais, cliente) {
        var paisID = pais ? Object.keys(pais).map(function(k) { return pais[k].id }).join(",") : '';
        cliente = cliente || '';
        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/multiOrigemCidadeDestino/JSON', 'aUsuarioSessao=' + aUsuarioSessao + '&sPais=' + paisID + '&sCliente=' + cliente + '&sCidade=' + query)
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
    //O filtro de cidades não respeita o pais informado;
    $scope.acCidades_O = function(query, pais, cliente) {
        var paisID = pais ? Object.keys(pais).map(function(k) { return pais[k].id }).join(",") : '';
        cliente = cliente || '';
        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/multiOrigemCidadeOrigem/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&sPais=' + paisID + '&sCliente=' + cliente + '&sCidade=' + query)
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

    //IMPRESSAO DESATIVADA MOMENTANEAMENTE.
    // $scope.btnImprimirEXCEL = function() {

    //     $scope.loadingState = true;
    //     var params = gerarParametros();
    //     callWS.get('/WVDF_WS/ws_HCGS3000.wso/f_excel_tarifario/JSON', params)
    //         .then(function(response) {
    //             console.log(response);
    //             $scope.lsResults = response.data.dados;
    //             var blob = new Blob([document.getElementById('export').innerHTML], {
    //                 type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    //             });
    //             saveAs(blob, "Report.xls");
    //             $scope.loadingState = false;
    //     });

    // };

    var gerarParametros = function() {
        $scope.lsResultados = "";
        var auxPol = "";
        var auxPod = "";
        var auxPaisO = "";
        var auxPaisD = "";
        var auxVia = "";
        var auxAgO = "";
        var auxAgD = "";
        var auxArm = "";
        debugger;
        if ($scope.filtro.fArmador != undefined) {
            for (x in $scope.filtro.fArmador) {
                if (auxArm === "") {
                    auxArm = $scope.filtro.fArmador[x].id;
                } else {
                    auxArm += "," + $scope.filtro.fArmador[x].id;
                }
            }
        }

        if ($scope.filtro.fAgenteO != undefined) {
            for (x in $scope.filtro.fAgenteO) {
                if (auxAgO === "") {
                    auxAgO = $scope.filtro.fAgenteO[x].id;
                } else {
                    auxAgO += "," + $scope.filtro.fAgenteO[x].id;
                }
            }
        }

        if ($scope.filtro.fAgenteD != undefined) {
            for (x in $scope.filtro.fAgenteD) {
                if (auxAgD === "") {
                    auxAgD = $scope.filtro.fAgenteD[x].id;
                } else {
                    auxAgD += "," + $scope.filtro.fAgenteD[x].id;
                }
            }
        }

        if ($scope.filtro.fPol != undefined) {
            for (x in $scope.filtro.fPol) {
                if (auxPol === "") {
                    auxPol = $scope.filtro.fPol[x].id;
                } else {
                    auxPol += "," + $scope.filtro.fPol[x].id;
                }
            }
        }

        if ($scope.filtro.fPod != undefined) {
            for (x in $scope.filtro.fPod) {
                if (auxPod === "") {
                    auxPod = $scope.filtro.fPod[x].id;
                } else {
                    auxPod += "," + $scope.filtro.fPod[x].id;
                }
            }
        }

        if ($scope.filtro.fPaisD != undefined) {
            for (x in $scope.filtro.fPaisD) {
                if (auxPaisD === "") {
                    auxPaisD = $scope.filtro.fPaisD[x].id;
                } else {
                    auxPaisD += "," + $scope.filtro.fPaisD[x].id;
                }
            }
        }

        if ($scope.filtro.fPais != undefined) {
            for (x in $scope.filtro.fPais) {
                if (auxPaisO === "") {
                    auxPaisO = $scope.filtro.fPais[x].id;
                } else {
                    auxPaisO += "," + $scope.filtro.fPais[x].id;
                }
            }
        }

        var parametros = {};
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        parametros.sArmador = auxArm;
        parametros.sOri = auxPol;
        parametros.sDes = auxPod;
        parametros.sPais = auxPaisO;
        parametros.sPaisD = auxPaisD;
        parametros.sTpServico = 'FCL';
        if ($scope.filtro.fCliente)
            parametros.sCliente = ($scope.filtro.fCliente.idCliente == undefined) ? "" : $scope.filtro.fCliente;
        else
            parametros.sCliente = '';

        parametros.sNac = ($scope.filtro.fNac == undefined) ? "" : $scope.filtro.fNac;
        parametros.sCodigo = ($scope.filtro.sCodigo == false) ? "" : $scope.filtro.sCodigo;

        parametros.itemsByPage = 10; //($scope.itemsByPage == undefined) ? 0 : $scope.itemsByPage;
        parametros.currentPage = $scope.currentPage;
        parametros.aUsuarioSessao = aUsuarioSessao;


        if (parametros.sCliente.idCliente == '') {
            parent.parent.alertify.error('Cliente em Branco!');
            $scope.loadingState = false;
            return;
        }

        if (parametros.sOri == '') {
            parent.parent.alertify.error('Cidade Origem em Branco!');
            $scope.loadingState = false;
            return;
        }

        if (parametros.sDes == '') {
            parent.parent.alertify.error('Cidade Destino em Branco!');
            $scope.loadingState = false;
            return;
        }

        if (parametros.sPais == '') {
            parent.parent.alertify.error('Pais Origem em Branco!');
            $scope.loadingState = false;
            return;
        }

        if (parametros.sPaisD == '') {
            parent.parent.alertify.error('Pais Destino em Branco!');
            $scope.loadingState = false;
            return;
        }
        parametros.sCodigo = $scope.filtro.fCodigo;
        $scope.pesquisa.params = parametros;

        var entidade = JSON.stringify($scope.pesquisa.params);
        //console.log($scope.filtro);
        var params = { 'sJSON': entidade };
        return params
    }


    // AutoComplete de Clientes
    $scope.acCliente = function(texto) {
        return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/fCompleteClienteTp/JSON', 'sInicio=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.bShow = false;
    $scope.bExecute = false;

    $scope.btnPesquisar = function() {
        $scope.loadingState = true;
        $spinner.show();

        var params = gerarParametros();
        //callWS.get('data.json', params).then(function(response) {
        callWS.get('/WVDF_WS/ws_HCGS3013.wso/fSaveReferenciaMultiProp/JSON', params).then(function(response) {
            // debugger;
            console.log(response);
            if (response.data.message.hasError) {
                parent.parent.alertify.error(response.data.message.msgError);
                $spinner.hide();
                return;
            }

            parent.parent.alertify.success(response.data.message.msgInfo);

            $scope.MultiOrigem = response.data.multiOrigem.multiOrigem;
             console.log(response.data);
            idMultiProp = response.data.sCodigo;
            $scope.filtro.sCodigo = response.data.sCodigo;
            if($scope.filtroCache)
                $scope.filtroCache.sCodigo = response.data.sCodigo;
            
            if ($scope.MultiOrigem.length == 0) $scope.bShow = false;
            else $scope.bShow = true;

            $scope.bExecute = true;
            $spinner.hide();
            $uibModalInstance.close({ data: $scope.MultiOrigem, bShow: $scope.bShow, bExecute: $scope.bExecute, filtro: response.data.multiOrigem });

        }, function(error) {

            parent.parent.alertify.error('Error!');
            $scope.loadingState = false;
            $spinner.hide();

        });

    };

    $scope.btnLimpar = function() {

        $scope.filtro = {};

        $scope.lsResultados = [];
        $scope.listaPesquisa = [];
        $scope.totalItems = 0;
    };

    $scope.ok = function() {
        $uibModalInstance.close();
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    init();
});