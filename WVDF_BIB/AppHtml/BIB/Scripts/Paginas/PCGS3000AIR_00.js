// ANGULAR JS
app = angular.module('pcgs300000App', ['ngSanitize', 'Alertify', 'angularSoap', 'diretivas', 'wsDominio', 'smart-table', 'ui.bootstrap', 'datatables', 'datatables.buttons', 'datatables.colreorder', 'ngTagsInput', 'toaster']);

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
                //console.log('Status: ' + response.status);
                //console.log('Error: ' + response.data);
            });
        }
    };
});

app.filter('isEmpty', function() {
    var bar;
    return function(obj) {
        for (bar in obj) {
            if (obj.hasOwnProperty(bar)) {
                return false;
            }
        }
        return true;
    };
});

app.factory('Url', [function() {
    let Url = {
        getInfo: function() {
            let query = window.location.href;
            this.url = query.split("?")[0];
            let lets = query.split("?")[1].split("&");
            for (let i = 0; i < lets.length; i++) {
                let pair = lets[i].split("=");
                let key = decodeURIComponent(pair[0]);
                let value = decodeURIComponent(pair[1]);
                if (typeof this[key] === "undefined") {
                    this[key] = decodeURIComponent(value);
                } else if (typeof this[key] === "string") {
                    let arr = [this[key], decodeURIComponent(value)];
                    this[key] = arr;
                } else {
                    this[key].push(decodeURIComponent(value));
                }
            }
        }
    }
    Url.getInfo();

    return Url;
}]);

app.factory('excel', [function() {

    let isIE = /MSIE|Trident/.test(window.navigator.userAgent);
    let isEdge = /Edge/.test(navigator.userAgent);


    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        let byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    function objectValues(obj) {
        let res = [];
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                res.push(obj[i]);
            }
        }
        return res;
    }

    function buildTable(titles, arr) {
        let virtualTable = '<tr>';
        for (let i = 0; i < titles.length; i++) {
            virtualTable += '<th>' + titles[i].sTitle + '</th>';
        }
        virtualTable += '</tr></thead><tbody>'

        for (let i = 0; i < arr.length; i++) {
            virtualTable += '<tr>';
            let values = objectValues(arr[i]);
            for (let j = 0; j < titles.length; j++) {
                if (!isNaN(values[j]) && !(typeof values[j] === 'string' || values[j] instanceof String)) {
                    virtualTable += '<td style="' + "mso-number-format:'\#\,\#\#0\.00_ \;\[Red\]\-\#\,\#\#0\.00\ '" + '">' + parseFloat(values[j]).toLocaleString() + '</td>';
                } else {
                    virtualTable += '<td style="mso-number-format:' + "'\@'" + ';">' + values[j] + '</td>';
                }
            }
            virtualTable += "</tr>";

        }

        return virtualTable;
    }

    let tableToExcel = function(filename, titles, arr) {
        let virtualTable = buildTable(titles, arr);
        let uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><?xml version="1.0" encoding="UTF-8" standalone="yes"?><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
            format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        let ctx = { table: virtualTable }
        let blob = b64toBlob(base64(format(template, ctx)), "application/vnd.ms-excel");
        let blobUrl = URL.createObjectURL(blob);

        if (isIE || isEdge) navigator.msSaveOrOpenBlob(blob, filename);
        else {
            var a = $("<a style='display: none;'/>");
            a.attr("href", blobUrl);
            a.attr("download", filename);
            $("body").append(a);
            a[0].click();
            window.URL.revokeObjectURL(blobUrl);
            a.remove();
            //  window.location = blobUrl;
        }
    };

    function download(filename, titles, data) {
        tableToExcel(filename, JSON.parse(angular.toJson(titles)), JSON.parse(angular.toJson(data)))
    };
    return {
        'download': download
    };
}])

app.directive('report', function($http) {
    return {
        restrict: "EA",
        transclude: true,
        replace: true,
        scope: {
            tableData: '<',
            tablePermission: '<',
            tableFilter: '<'
        },
        templateUrl: 'reportTemplate.html',
        controller: ['$scope', 'excel', 'Url', 'callWS', function($scope, excel, Url, callWS) {
            let self = this;

            self.$onInit = function() {
                $scope.pageCount = [10, 25, 50];
                $scope.currentPage = 1;
                $scope.itemsPerPage = $scope.pageCount[0];
                $scope.$watch('tableData', function() {
                    if ($scope.tableData && $scope.tableData.relatorio) {
                        $scope.totalItems = $scope.tableData.qtdLinhas;
                        //setPagingData($scope.currentPage);
                    }
                });

                $scope.$watch("currentPage", function() {
                    if ($scope.tableData && $scope.tableData.relatorio) {
                        setPagingData($scope.currentPage);
                    }
                });

                $scope.$watch("itemsPerPage", function() {
                    if ($scope.tableData && $scope.tableData.relatorio) {
                        $scope.currentPage = 1;
                        $scope.$parent.currentPage = $scope.currentPage;
                        $scope.$parent.itemsByPage = $scope.itemsPerPage;

                        setPagingData($scope.currentPage);
                    }
                });
            }

            function setPagingData(page) {
                //$scope.$parent.itemsByPage
                $scope.$parent.currentPage = page;
                // $scope.gerarParametros();
                //$scope.$parent.btnPesquisar();

                Fingerprint2.getLocalHash().then(function(hash) {
                    $scope.$parent.loadingState = true;

                    var params = $scope.$parent.gerarParametros();
                    params.aFingerPrint = hash;
                    params.aTabela = Url.sTabela;
                    params = { myAirParam: params };
                    let callUrl = '';
                    if ($scope.$parent.fclasseTaxa == 'F') {
                        callUrl = '/WVDF_WS/ws_pricing.wso/fReportAirFreight/JSON';
                    } else {
                        callUrl = '/WVDF_WS/ws_pricing.wso/fReportAirLocalTax/JSON';
                    }
                    $http.post(callUrl, params).then(function(response) {
                        $scope.$parent.lsTableData = response.data;
                        $scope.$parent.lsResultados = response.data.relatorio;
                        $scope.$parent.totalItems = response.data.qtdLinhas;
                        $scope.$parent.mostraTela = true;

                        let pagedData = null;
                        /* var pagedData = $scope.tableData.relatorio.slice(
                             (page - 1) * $scope.itemsPerPage,
                             page * $scope.itemsPerPage
                         );*/

                        //$scope.pagedTableData = {};
                        //$scope.pagedTableData.titulo = $scope.tableData.titulo;
                        //$scope.pagedTableData.relatorio = $scope.tableData.relatorio; //pagedData;

                        $scope.$parent.loadingState = false;
                    });
                });


            }

            $scope.downloadExcelWholeData = function() {
                Fingerprint2.getLocalHash().then(function(hash) {
                    $scope.$parent.loadingState = true;

                    var params = $scope.$parent.gerarParametros();
                    params.itemsByPage = $scope.$parent.totalItems;
                    params.aFingerPrint = hash;
                    params.aTabela = Url.sTabela;
                    params = { myAirParam: params };
                    let callUrl = '';
                    if ($scope.$parent.fclasseTaxa == 'F') {
                        callUrl = '/WVDF_WS/ws_pricing.wso/fReportAirFreight/JSON';
                    } else {
                        callUrl = '/WVDF_WS/ws_pricing.wso/fReportAirLocalTax/JSON';
                    }
                    callWS.get(callUrl, params).then(function(response) {

                        let ex = prepareData(response.data);

                        excel.download('excel.xls', ex.titulo, ex.relatorio);




                        $scope.$parent.loadingState = false;
                    });
                });
            }

            let prepareData = function(data) {
                let ex = {};
                ex.titulo = data.titulo;
                ex.relatorio = [];

                for (var i = 0; i < data.relatorio.length; i++) {
                    ex.relatorio[i] = {};
                    for (var j = 0; j < ex.titulo.length; j++) {
                        ex.relatorio[i][ex.titulo[j].sCampo] = data.relatorio[i][ex.titulo[j].sCampo];
                    }
                }

                return ex;
            }
            $scope.downloadExcel = function() {

                let ex = prepareData($scope.tableData);
                console.log(ex);
                excel.download('excel.xls', ex.titulo, ex.relatorio);

            }

            $scope.zoomTarifa = function(row, index) {
                let recId = row.aRecnum || '';
                let tipo = row.aClasse || '';
                window.top.jaddTab("Tarifa #" + recId, "PCGS3000Air_06.asp?aUsuarioSessao=" + Url.aUsuarioSessao + "&aTarifa=" + recId + "&tipo=" + tipo);
            }

            $scope.deleteRow = $scope.$parent.deleteRow;
        }]
    }
});

app.controller('pcgs300000Controller', function($scope, Alertify, buscaWS, callWS, $http, $q, $compile, toaster, $uibModal) {

    var bComercial = getVariavelURL('bComercial');
    $scope.exibeExclusaoLote = !bComercial;
    $scope.exibeLupa = !bComercial;

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


        buscaWS.get('/WVDF_WS/ws_ccgs223.wso/fcomboIncoterm/JSON', '').then(function(data) {
            $scope.lsIncoterm = data;
        });

        callWS.get('/WVDF_WS/ws_ccgs201.wso/f_CCGS201_combo/JSON', { 'aUsuarioSessao': aUsuarioSessao, 'aService': 'N' }).then(function(response) {
            $scope.lsService1 = response.data;
        });

        callWS.get('/WVDF_WS/ws_ccgs201.wso/f_CCGS201_combo/JSON', { 'aUsuarioSessao': aUsuarioSessao, 'aService': 'Y' }).then(function(response) {
            $scope.lsService2 = response.data;
        });


    }

    $scope.lsMoeda = [];
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
                $scope.fTpServico = $scope.lsModalidades[0].ID;
            });

    };

    $scope.alertify = {
        success: function(message) {
            message = message || '';
            parent.parent.alertify.success(message);
        },
        error: function(message) {
            message = message || '';
            parent.parent.alertify.error(message);
        }
    }

    $scope.openModalColunas = function() {
        let tabela = '';

        if ($scope.fclasseTaxa == 'F') {
            tabela = 'HCGS3000_AIRFR8';
        } else {
            tabela = 'HCGS3000_AIR';
        }

        $scope.modalColunas = "PHSAG310_01.asp?aUsuarioSessao=" + aUsuarioSessao + "&aTabela=" + tabela;
        $("#myModal").modal('show');
    }

    $scope.recarrega = function() {
        montaTabela();
    }

    var montaTabela = function() {
        let tabela = '';

        if ($scope.fclasseTaxa == 'F') {
            tabela = 'HCGS3000_AIRFR8';
        } else {
            tabela = 'HCGS3000_AIR';
        }
        buscaWS.get('/WVDF_WS/ws_hsag310.wso/fListarHSAG310/JSON', 'sTabela=' + tabela).then(function(data) {
            // //console.log(data);
            console.log(data);
            $scope.colums = data;
        });
    }

    /*buscaWS.get('/WVDF_WS/ws_hsag310.wso/fListarHSAG310/JSON', 'sTabela=' + sTabela).then(function(data) {
        if (bComercial) {
            $scope.colums = data;
        } else {
            $scope.colums = data;
        }
    });*/

    /*vm.someClickHandler = function(info) {
        var url = "PCGS3000_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&RowId=" + info.sRowid;
        document.location = url;
    };
*/


    $scope.classeTaxa = [];

    buscaWS.get('/WVDF_WS/ws_ccgs221.wso/f_class_tx/JSON', '').then(function(data) {
        //console.log(data);
        $scope.classeTaxa = data;
        $scope.fclasseTaxa = $scope.classeTaxa[3].ID;
    });

    $scope.deleteRow = function(tarifario, index) {
        var modalInstance = $uibModal.open({
            templateUrl: 'modalTemplate.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg'
        });
        modalInstance.result.then(function(selectedItem) {
            Fingerprint2.getLocalHash().then(function(hash) {

                let callUrl = '';
                if ($scope.fclasseTaxa == 'F') {
                    callUrl = '/WVDF_WS/ws_pricing.wso/fdeleteAirFreight/JSON';
                } else {
                    callUrl = '/WVDF_WS/ws_pricing.wso/fdeleteAirLocalTax/JSON';
                }

                let params = {};
                params.aFingerPrint = hash;
                params.aRecnum = tarifario.aRecnum;
                params.aUsuarioSessao = aUsuarioSessao;
                debugger;

                callWS.get(callUrl, params).then(function(response) {
                    $scope.lsResultados.splice($scope.tarifarioIndex, 1);
                    let data = response.data;
                    if (!data.hasError) {
                        $scope.alertify.success(data.msgInfo);
                    } else {
                        $scope.alertify.error(data.msgError);
                        return;
                    }

                    $scope.btnPesquisar();
                });
            });

        }, function() {
            //  //console.log('Modal dismissed at: ' + new Date());
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
        /* return buscaWS.get('fbcsag342_descricao.asp', 'term=' + texto).then(function(data) {
             return data;
         });*/
        return buscaWS.get('/WVDF_WS/ws_csag343.wso/f_bCSAG343_cia_aerea/JSON', 'aInicial=' + texto).then(function(data) {
            return data;
        });
    };

    // $scope.acCidades = function(texto) {
    //     return buscaWS.get('fbcsag325_descricao.asp', 'term=' + texto).then(function(data) {
    //         return data;
    //     });
    // };
    // AUTOCOMPLETE PARA O CAMPO VIA
    $scope.acCidades = function(query) {
        var data = buscaWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesVia/JSON', 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&idPais=&sCidade=' + query)
            .then(function(data) {
                // //console.log(data);
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


        var params = {
            'sPais': '',
            'sCidade': query,
            'sMod': $scope.fTpServico ? $scope.fTpServico : '',
            'sCliente': '',
            'aUsuarioSessao': getVariavelURL('aUsuarioSessao')
        }
        ////console.log(params);

        return callWS.get('/WVDF_WS/ws_csag325.wso/propostaCidadeOrigem/JSON', params)
            .then(function(response) {
                ////console.log(response);
                return response.data;
            });
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

        var params = {
            'sPais': '',
            'sCidade': query,
            'sMod': $scope.fTpServico ? $scope.fTpServico : '',
            'sCliente': '',
            'aUsuarioSessao': getVariavelURL('aUsuarioSessao')
        }
        ////console.log(params);

        return callWS.get('/WVDF_WS/ws_csag325.wso/propostaCidadeOrigem/JSON', params)
            .then(function(response) {
                ////console.log(response);
                return response.data;
            });
    };

    $scope.acPais_O = function(query) {

        var data = buscaWS.get('/WVDF_WS/ws_csag329.wso/buscarPaisesPorDescricao/JSON', 'sPais=' + query)
            .then(function(data) {
                // //console.log(data);
                return data;
            });
        return data;
    };

    $scope.acPais_D = function(query) {

        var data = buscaWS.get('/WVDF_WS/ws_csag329.wso/buscarPaisesPorDescricao/JSON', 'sPais=' + query)
            .then(function(data) {
                // //console.log(data);
                return data;
            });
        return data;
    };

    // buscaWS.get('/WVDF_WS/ws_csag379.wso/f_tradeline_list/JSON', '').then(function(data) {
    //     $scope.lsTrades = data;
    // });

    buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON', '').then(function(data) {
        $scope.lsPais = data;
    });

    buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_prod/JSON', '').then(function(data) {
        $scope.lsProdutos = data;
    });

    $scope.changeProduto = function() {
        /*buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_taxprod/JSON', 'sCCGS210_ID=' + $scope.fProduto).then(function(data) {
            $scope.lsTaxas = data;
        });*/
    };

    $scope.acCidadesVia = function(texto) {
        return getCidades('', texto);
    }

    var getCidades = function(idPais, cidade) {
        //  $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'idPais': idPais, 'sCidade': cidade };
        return callWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', params)
            .then(function(response) {
                //    $scope.loadingState = false;
                debugger;
                return response.data;
            }, function(error) {
                //       $scope.loadingState = false;
                ////console.log(error);
                ////console.log($scope.tarifario.taxa);
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
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'idClasse': '' };
        callWS.get('/WVDF_WS/ws_HCGS3001.wso/fSerchComboTaxes/JSON', params)
            .then(function(response) {
                //     //console.log(response);
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
        // debugger;
        var params = gerarParametros();
        callWS.get('/WVDF_WS/ws_HCGS3000.wso/f_excel_tarifario/JSON', params)
            .then(function(response) {
                //console.log(response);
                $scope.lsResults = response.data.dados;
                // debugger;
                var blob = new Blob([document.getElementById('export').innerHTML], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "Report.xls");
                $scope.loadingState = false;
            });
    };

    $scope.itemsByPage = 10;
    $scope.currentPage = 1;
    $scope.pesquisa = {};

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
        //parametros.sMODAL = ($scope.fModal == undefined) ? "" : $scope.fModal;
        parametros.sCARRIER = ($scope.fCarrier == undefined) ? "" : (($scope.fCarrier.id == undefined) ? "" : $scope.fCarrier.id);

        parametros.fRoute = $scope.ffRoute || '';
        //    parametros.sID_C = ($scope.fComercial == undefined) ? "" : $scope.fComercial;
        //parametros.sID_O = ($scope.fOperacional == undefined) ? "" : $scope.fOperacional;
        //  parametros.sPROD = ($scope.fProduto == undefined) ? "" : $scope.fProduto;
        parametros.sTAXA = ($scope.fTaxa == undefined) ? "" : $scope.fTaxa;
        parametros.sAgO = auxAgO;
        parametros.sAgD = auxAgD;
        parametros.sOri = auxPol;
        parametros.sDes = auxPod;
        parametros.sPais = auxPaisO;
        parametros.sPaisD = auxPaisD;
        parametros.sDtBgn = ($scope.mDataInicial == undefined) ? "" : $scope.mDataInicial;
        parametros.sDtEnd = ($scope.mDataFinal == undefined) ? "" : $scope.mDataFinal;
        parametros.sDescricao = ($scope.fDescricao == undefined) ? "" : $scope.fDescricao;
        parametros.sValor = ($scope.fValor == undefined) ? "" : $scope.fValor;
        parametros.sPropostaValidade = ($scope.fPropostaValidade == undefined) ? "" : $scope.fPropostaValidade;
        parametros.sTpServico = $scope.fTpServico;
        parametros.sTRADE = $scope.fTrade || "";
        parametros.sColoader = $scope.fcoloader || '';
        parametros.itemsByPage = ($scope.itemsByPage == undefined) ? 0 : $scope.itemsByPage;
        parametros.currentPage = $scope.currentPage;
        parametros.aUsuarioSessao = aUsuarioSessao;
        parametros.terminalOrigem = $scope.terminalOrigem || {id: '', value: ''};
        parametros.terminalDestino = $scope.terminalDestino || {id: '', value: ''};
        parametros.fIncoterm = $scope.fIncoterm || '';
        parametros.fclasseTaxa = $scope.fclasseTaxa || '';
        parametros.sDropdown = $scope.fNameDropdown || '';
        parametros.fType = $scope.fType || '';
        parametros.fService = $scope.fService || '';
        $scope.pesquisa.params = parametros;
        // var entidade = JSON.stringify($scope.pesquisa.params);
        let arr = {};
        angular.copy($scope.pesquisa.params, arr);
        return arr;
    }

    $scope.gerarParametros = gerarParametros;

    $scope.acTerminal = function(texto) {
        return buscaWS.get('fbcsag346_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };


    $scope.btnAtualizarTb = function() {
        debugger;
        if ($scope.tbAtualizar.validInicio !== undefined && $scope.tbAtualizar.validInicio !== '') {
            var parts = $scope.tbAtualizar.validInicio.split('/');
            var d1 = Number(parts[2] + parts[1] + parts[0]);
            parts = $scope.tbAtualizar.validFim.split('/');
            var d2 = Number(parts[2] + parts[1] + parts[0]);

            var dtHoje = new Date();
            var hoje = dtHoje.toISOString().slice(0, 10).replace(/-/g, "");

            if (d1 < hoje || d2 < hoje) {
                toaster.pop('error', "Erro", 'Data de Validade Invalida', null, 'trustedHtml');
                return;
            }
        }

        var params = {
            'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
            'search': getParamsPesquisa(),
            'form': $scope.tbAtualizar,
        }
        $scope.loadingState = true;
        callWS.get('/WVDF_WS/ws_hcgs3000.wso/f_att_tarifario/JSON', { 'sJSON': params })
            .then(function(response) {
                //console.log(params);
                $scope.btnPesquisar();
                $scope.loadingState = false;
            });
        toaster.pop('success', "Atualizado", 'Registros Atualizados', null, 'trustedHtml');
        return;
    }

    var getParamsPesquisa = function() {
        $scope.lsResultados = "";
        var auxPol = "";
        var auxPod = "";
        var auxPaisO = "";
        var auxPaisD = "";
        var auxVia = "";

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

        //parametros.sMODAL = ($scope.fModal == undefined) ? "" : $scope.fModal;
        parametros.sCARRIER = ($scope.fCarrier == undefined) ? "" : (($scope.fCarrier.id == undefined) ? "" : $scope.fCarrier.id);
        //    parametros.sID_C = ($scope.fComercial == undefined) ? "" : $scope.fComercial;
        //parametros.sID_O = ($scope.fOperacional == undefined) ? "" : $scope.fOperacional;
        //  parametros.sPROD = ($scope.fProduto == undefined) ? "" : $scope.fProduto;
        parametros.sTAXA = ($scope.fTaxa == undefined) ? "" : $scope.fTaxa;
        parametros.sTRADE = $scope.fTrade || "";
        parametros.sCNTR = ($scope.fContainer == undefined) ? "" : $scope.fContainer;
        parametros.sMarca = ($scope.fMarca == undefined) ? "" : $scope.fMarca;
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

        parametros.itemsByPage = ($scope.itemsByPage == undefined) ? 0 : $scope.itemsByPage;
        parametros.currentPage = $scope.currentPage;
        parametros.aUsuarioSessao = aUsuarioSessao;

        $scope.pesquisa.params = parametros;
        return $scope.pesquisa.params;
    }

    $scope.LimpaAtt = function() {
        $scope.tbAtualizar.venda.valor = '';
        $scope.tbAtualizar.venda.min = '';
        $scope.tbAtualizar.venda.max = '';
        $scope.tbAtualizar.venda.opvenda = '';
        $scope.tbAtualizar.compra.opcompra = '';
        $scope.tbAtualizar.compra.valor = '';
        $scope.tbAtualizar.compra.min = '';
        $scope.tbAtualizar.compra.max = '';
        $scope.tbAtualizar.validInicio = '';
        $scope.tbAtualizar.validFim = '';
    }

    $scope.btnPesquisar = function() {
        montaTabela();
        Fingerprint2.getLocalHash().then(function(hash) {
            $scope.loadingState = true;

            var params = gerarParametros();
            params.aFingerPrint = hash || '';
            params.aTabela = sTabela;
            params = { myAirParam: params };
            let callUrl = '';
            if ($scope.fclasseTaxa == 'F') {
                callUrl = '/WVDF_WS/ws_pricing.wso/fReportAirFreight/JSON';
            } else {
                callUrl = '/WVDF_WS/ws_pricing.wso/fReportAirLocalTax/JSON';
            }
            $http.post(callUrl, params)
                .then(function(response) {
                    $scope.lsTableData = response.data;
                    $scope.lsResultados = response.data.relatorio;
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
        });
    };

    $scope.zoomTarifa = function(row, index) {
        //console.log(row);
        let recId = row.aRecnum;
        let tipo = row.aClasse;
        //console.log(row);
        window.top.jaddTab("Tarifa #" + recId, "PCGS3000Air_06.asp?aUsuarioSessao=" + aUsuarioSessao + "&aTarifa=" + recId + "&tipo=" + tipo);
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
            //  //console.log('Modal dismissed at: ' + new Date());
        });

        /* Alertify.confirm('Deseja excluir o lote?')
            .then(function() {
                delLote();
            }, function() {});
    */
    };

    var delLote = function() {
        Fingerprint2.getLocalHash().then(function(hash) {
            var params = gerarParametros();

            params.aFingerPrint = hash;
            params = { myAirParam: params };
            let callUrl = '';
            if ($scope.fclasseTaxa == 'F') {
                callUrl = '/WVDF_WS/ws_pricing.wso/fdeleteLoteAirFreight/JSON';
            } else {
                callUrl = '/WVDF_WS/ws_pricing.wso/fdeleteLoteAirLocalTax/JSON';
            }

            $http.post(callUrl, params)
                .then(function(response) {
                    let data = response.data;
                    if (!data.hasError) {
                        $scope.alertify.success(data.msgInfo);
                    } else {
                        $scope.alertify.error(data.msgError);
                        return;
                    }
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
        });
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
        $scope.fPropostaValidade = "T";
        $scope.fValor = "";
        $scope.fPais = "";
        $scope.fPol = "";
        $scope.fAgenteO = "";
        $scope.fPod = "";

        $scope.lsTableData = [];
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