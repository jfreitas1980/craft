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
                console.log('Status: ' + response.status);
                console.log('Error: ' + response.data);
            });
        }
    };
});


app.controller('pcgs300000Controller', function($scope, Alertify, buscaWS, callWS, $http, $q, $compile, toaster, $uibModal, $sce) {

$http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON', {
            params: {
                aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
                sPrograma: 'pcgs3000_00'
            }
        })
        .then(function(res) {
            Object.keys(res.data).forEach(function(key) {

                var elemfolderName = document.createElement('textarea');
                elemfolderName.innerHTML = res.data[key];
                var folderName = elemfolderName.value;
                res.data[key] = $sce.trustAsHtml(elemfolderName.value);
            })

            $scope.literais = res.data;
        });

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
            });

    };
    $scope.recarrega = function() {
        montaTabela();
    }

    var montaTabela = function() {
        buscaWS.get('/WVDF_WS/ws_hsag310.wso/fListarHSAG310/JSON', 'sTabela=' + sTabela).then(function(data) {
            // console.log(data);
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
        console.log(data);
        $scope.classeTaxa = data;
    });

    $scope.deleteRow = function(tarifario, index) {
        var modalInstance = $uibModal.open({
            templateUrl: 'modalTemplate.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                literais: function () {
                    return $scope.literais;
                }
            }
        });
        modalInstance.result.then(function(selectedItem) {
            buscaWS.get('/WVDF_WS/ws_hcgs3000.wso/f_Del_Tarifario/JSON', 'recId=' + tarifario).then(function(data) {
                $scope.lsResultados.splice($scope.tarifarioIndex, 1);
                toaster.success({ title: "Exclusao", body: "Excluido com Sucesso" });
                $scope.btnPesquisar();
                //  vm.message = data;
            });
        }, function() {
            //  console.log('Modal dismissed at: ' + new Date());
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

    // $scope.acCidades = function(texto) {
    //     return buscaWS.get('fbcsag325_descricao.asp', 'term=' + texto).then(function(data) {
    //         return data;
    //     });
    // };
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

    $scope.acTerminalO = function(query) {
        return buscaWS.get('fbcsag346_descricao.asp', 'term=' + query).then(function(data) {
            return data;
        });
    };

    $scope.acTerminalD = function(query) {
        return buscaWS.get('fbcsag346_descricao.asp', 'term=' + query).then(function(data) {
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
        var params = { 'aUsuarioSessao': aUsuarioSessao,'idClasse':''};
        callWS.get('/WVDF_WS/ws_HCGS3001.wso/fSerchComboTaxes/JSON', params)
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

    buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_cntr/JSON', '').then(function(data) {
        $scope.lsContainer = data;
    });

    $scope.btnImprimirEXCEL = function() {
        
        $scope.loadingState = true;
        // debugger;
        var params = gerarParametros();
        callWS.get('/WVDF_WS/ws_HCGS3000.wso/f_excel_tarifario/JSON', params)
            .then(function(response) {
                console.log(response);
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
        var auxTmO = "";
        var auxTmD = "";

        if ($scope.fTerminalO != undefined) {
            for (x in $scope.fTerminalO) {
                if (auxTmO === "") {
                    auxTmO = $scope.fTerminalO[x].id;
                } else {
                    auxTmO += "," + $scope.fTerminalO[x].id;
                }
            }
        }

        if ($scope.fTerminalD != undefined) {
            for (x in $scope.fTerminalD) {
                if (auxTmD === "") {
                    auxTmD = $scope.fTerminalD[x].id;
                } else {
                    auxTmD += "," + $scope.fTerminalD[x].id;
                }
            }
        }
        //----------------
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
        //    parametros.sID_C = ($scope.fComercial == undefined) ? "" : $scope.fComercial;
        //parametros.sID_O = ($scope.fOperacional == undefined) ? "" : $scope.fOperacional;
        //  parametros.sPROD = ($scope.fProduto == undefined) ? "" : $scope.fProduto;
        parametros.sTAXA = ($scope.fTaxa == undefined) ? "" : $scope.fTaxa;
        parametros.sTRADE = ($scope.fTrade == undefined) ? "" : $scope.fTrade;
        parametros.sCNTR = ($scope.fContainer == undefined) ? "" : $scope.fContainer;
        parametros.sMarca = ($scope.fMarca == undefined) ? "" : $scope.fMarca;
        parametros.sAgO = auxAgO;
        parametros.sAgD = auxAgD;
        parametros.sTmO = auxTmO;
        parametros.sTmD = auxTmD;
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
        debugger;
        var entidade = JSON.stringify($scope.pesquisa.params);
        var params = { 'sJSON': entidade };
        return params
    }

    $scope.btnAtualizarTb = function() {
        //debugger;
        if ($scope.tbAtualizar.validInicio !== undefined && $scope.tbAtualizar.validInicio !== '') 
        {
            var parts = $scope.tbAtualizar.validInicio.split('/');
            var d1 = Number(parts[2] + parts[1] + parts[0]);
            parts = $scope.tbAtualizar.validFim.split('/');
            var d2 = Number(parts[2] + parts[1] + parts[0]);
            
            var dtHoje = new Date();
            var hoje = dtHoje.toISOString().slice(0,10).replace(/-/g,"");

            if (d1 < hoje ||  d2 < hoje) {
                toaster.pop('error', "Erro", 'Data de Validade Invalida', null, 'trustedHtml');
                return;
            }
        }

        $scope.sweetAlert($scope.literais.LITERAL_80, $scope.literais.LITERAL_81 + " " + $scope.totalItems + " " + $scope.literais.LITERAL_82 + "!", "warning", "Ok").then((response) => {
            if (response) {
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
        });
    }

    $scope.sweetAlert = function(titulo, texto, icone, confirmarTexto) {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: titulo,
                html: texto,
                icon: icone,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: confirmarTexto,
                cancelButtonText: $scope.literais.LITERAL_79,
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
                    $('.swal2-popup').css('font-size', 15);
                }
            }).then((result) => {
                if (result.isConfirmed) resolve(true);
                else resolve(false);
            });
        });
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
        parametros.sTRADE = ($scope.fTrade == undefined) ? "" : $scope.fTrade;
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
        $scope.loadingState = true;
        // debugger;
        var params = gerarParametros();
        callWS.get('/WVDF_WS/ws_HCGS3000.wso/f_PesquisaHCGS3000/JSON', params)
            .then(function(response) {
                console.log(response);
                $scope.lsResultados = response.data.dados;
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

    $scope.zoomTarifa = function(recId, index) {
        console.log(recId);
        window.top.jaddTab("Tarifa #" + recId, "PCGS3000_01.asp?aUsuarioSessao=" + aUsuarioSessao + "&aTarifa=" + recId);
    }

    $scope.btnDelLote = function() {

        var modalInstance = $uibModal.open({
            templateUrl: 'modalExclusaoLote.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                literais: function () {
                    return $scope.literais;
                }
            }
        });
        modalInstance.result.then(function(selectedItem) {
            delLote();
            //  vm.message = data;
        }, function() {
            //  console.log('Modal dismissed at: ' + new Date());
        });

        /* Alertify.confirm('Deseja excluir o lote?')
            .then(function() {
                delLote();
            }, function() {});
    */
    };

    var delLote = function() {
        var params = gerarParametros();

        callWS.get('/WVDF_WS/ws_HCGS3000.wso/fDelTarifarioLote/JSON', params)
            .then(function(response) {
                toaster.success({ title: "Exclusao", body: "Lote excluido com Sucesso" });
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

app.controller('ModalInstanceCtrl', function($uibModalInstance, $scope, literais) {
    $scope.literais = literais;

    $scope.modalOk = function() {

        $uibModalInstance.close();
    };

    $scope.modalCancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});