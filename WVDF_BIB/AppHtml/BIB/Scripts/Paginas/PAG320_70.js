var vUsuarioSessao;
var vCsag320Codigo;
var vCsag320RowId;

function variaveis() {
    vUsuarioSessao = $('#jaUsuarioSessao').val();
    vCsag320Codigo = $('#aCSAG320Id').val();
    vCsag320RowId = $('#aCSAG320RowId').val();
}
$(document).ready(function() {
    variaveis();
    if (vCsag320RowId === "") {
        $("#ifrm-pag320_70").attr({
            "src": "pag320_72_70new.asp?aUsuarioSessao=" + vUsuarioSessao + "&RowId=" + vCsag320RowId
        });
    } else {
        $("#ifrm-pag320_70").attr({
            "src": "pag320_72_70new.asp?aUsuarioSessao=" + vUsuarioSessao + "&RowId=" + vCsag320RowId
        });
    }


    $('#tabPaginas').on('click', 'li', function() {
        $('#tabPaginas li.active').removeClass('active');
        $('#tbcMain div.active').removeClass('active');
        $(this).addClass('active');
        var frameId = "#tbc-" + $(this).attr('id').split('-')[1];
        $('#tbcMain ' + frameId).addClass('active');
    });

    $(document).on('click', '#li-pagTeste', function() {
        variaveis();

        $("#ifrm-pagTeste").attr({
            "src": "Fotografia_70.html?id=" + $('#dataFotografia').val()
        })
    });

    $(document).on('click', '#li-pag320_70', function() {
        variaveis();

        if (vCsag320RowId === "") {
            $("#ifrm-pag320_70").attr({
                "src": "pag320_72_70.asp?aUsuarioSessao=" + vUsuarioSessao + "&RowId=" + vCsag320RowId
            });
        } else {
            $("#ifrm-pag320_70").attr({
                "src": "pag320_72_70new.asp?aUsuarioSessao=" + vUsuarioSessao + "&RowId=" + vCsag320RowId
            });
        }

    });

    $(document).on('click', '#li-pag366_70', function() {
        variaveis();
        $("#ifrm-pag366_70").attr({
            "src": "pag366_73.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag352_70', function() {
        variaveis();
        $("#ifrm-pag352_70").attr({
            "src": "pag352_72.asp?RunReport=1&aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag374_70', function() {
        variaveis();
        $("#ifrm-pag374_70").attr({
            "src": "pag374_73.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag350_70', function() {
        variaveis();
        $("#ifrm-pag350_70").attr({
            "src": "pag350_72.asp?RunReport=1&aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag340_70', function() {
        variaveis();
        $("#ifrm-pag340_70").attr({
            "src": "pag340_71.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag378_70', function() {
        variaveis();
        $("#ifrm-pag378_70").attr({
            "src": "pag378_72.asp?RunReport=1&aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag341_70', function() {
        variaveis();
        $("#ifrm-pag341_70").attr({
            "src": "pag341_71.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag395_70', function() {
        variaveis();
        $("#ifrm-pag395_70").attr({
            "src": "pag395_71.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag342_70', function() {
        variaveis();
        $("#ifrm-pag342_70").attr({
            "src": "pag342_71.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag343_70', function() {
        variaveis();
        $("#ifrm-pag343_70").attr({
            "src": "pag343_71.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag345_70', function() {
        variaveis();
        $("#ifrm-pag345_70").attr({
            "src": "pag345_71.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag346_70', function() {
        variaveis();
        $("#ifrm-pag346_70").attr({
            "src": "pag346_71.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag347_70', function() {
        variaveis();
        $("#ifrm-pag347_70").attr({
            "src": "pag347_71.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag349_70', function() {
        variaveis();
        $("#ifrm-pag349_70").attr({
            "src": "pag349_71.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pcgs2101_00', function() {
        variaveis();
        $("#ifrm-pcgs2101_00").attr({
            "src": "pcgs2101_70.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
    $(document).on('click', '#li-pag335_70', function() {
        variaveis();
        $("#ifrm-pag335_70").attr({
            "src": "pag335_73.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG320Id=" + vCsag320Codigo
        });
    });
});

// AngularJS
var app = angular.module('pag32000App', ['ui.bootstrap', 'ngTagsInput', 'wsDominio', 'diretivas', 'toaster', 'angularSoap']);

app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                return res.data;
            });
        }
    };
});

app.filter('customArray', function($filter) {
    return function(list, arrayFilter, element) {
        if (arrayFilter) {
            return $filter("filter")(list, function(listItem) {
                return arrayFilter.indexOf(listItem[element]) != -1;
            });
        }
    };
});

app.config(function(tagsInputConfigProvider) {
    tagsInputConfigProvider.setDefaults('tagsInput', { placeholder: '' });
    tagsInputConfigProvider.setActiveInterpolation('tagsInput', { placeholder: true });
});

app.controller('acordosController', function($scope, buscaWS, $sce, $http, soapService, toaster, callWS) {
    $scope.textoAjuda = "Segure control pra selecionar mais de 1";
    $scope.showTaxas = true;

    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');

    $scope.coLoaderChange = function() {
        $scope.acordo.fclienteDireto = false;
    }

    $scope.clienteDiretoChange = function() {
        $scope.acordo.fcoloader = false;
    }

    $scope.acCidadesOrigem = function(texto) {
        var trade = $scope.acordo.tradeOrigem == null ? 0 : $scope.acordo.tradeOrigem;
        var pais = $scope.acordo.paisOrigem == null ? '' : $scope.acordo.paisOrigem;
        return getCidades(trade, pais, texto);
    };

    $scope.acCidadesDestino = function(texto) {
        var trade = $scope.acordo.tradeDestino == null ? 0 : $scope.acordo.tradeDestino;
        var pais = $scope.acordo.paisDestino == null ? '' : $scope.acordo.paisDestino;
        return getCidades(trade, pais, texto);
    };

    var getCidades = function(idTrade, idPais, cidade) {
        //  $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'idTrade': idTrade, 'idPais': idPais, 'sCidade': cidade };
        return callWS.get('/WVDF_WS/ws_csag325.wso/buscarCidadesPorPaisesPorTrade/JSON', params)
            .then(function(response) {
                //    $scope.loadingState = false;
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

    var getTrades = function() {
        $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/WS_csag379.wso/f_tradeline_list/JSON', params)
            .then(function(response) {
                $scope.lsTrades = response.data;
                $scope.loadingState = false;
            }, function(error) {
                $scope.loadingState = false;
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar Trades. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    };

    var getPais = function(idTrade, flOriDest) {
        $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao, idTrade: idTrade };
        callWS.get('/WVDF_WS/ws_csag329.wso/buscarPaisesPorTrade/JSON', params)
            .then(function(response) {
                if (flOriDest === 'O') {
                    $scope.lsPaisOrigem = response.data;
                } else if (flOriDest === 'D') {
                    $scope.lsPaisDestino = response.data;
                } else {
                    $scope.lsPaisOrigem = response.data;
                    $scope.lsPaisDestino = response.data;
                }
                $scope.loadingState = false;
            }, function(error) {
                $scope.loadingState = false;
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar Pais. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    };
    $scope.acCidadesVia = function(texto) {
        return getCidades(0, '', texto);
    }

    getTrades();
    getPais(0, 'T');

    $scope.changePaisDestino = function() {
        getPais(($scope.acordo.tradeDestino == null ? 0 : $scope.acordo.tradeDestino), 'D');
    };

    $scope.changePaisOrigem = function() {
        getPais(($scope.acordo.tradeOrigem == null ? 0 : $scope.acordo.tradeOrigem), 'O');
    };

    $scope.posicionaAcordos = function() {
        var entidade = {
            'aUsuarioSessao': aUsuarioSessao,
            'aCSAG320Id': $('#aCSAG320Id').val(),
            'aTIPO': 'CL'
        }

        callWS.get('/WVDF_WS/WS_hcgs3033.wso/listarAcordosPessoa/JSON', { 'sJSON': entidade }).then(function(response) {
            $scope.acordos = response.data;
            $scope.quantosRegistros = response.data.length;
        });
    }

    $scope.teste = function() {
        console.log($scope.acordo.modalidades);
    }
    $scope.lastAcordo = '';
    $scope.clickTabela = function(oAcordo) {
        $scope.lastAcordo = oAcordo;
        $scope.novoAcordo();
        $scope.showDados = true;
        $scope.linha = oAcordo.ID_PROTOCOLO;
        //$scope.urlBaixo = $sce.trustAsResourceUrl("http://2wapps2.dyndns.org/WEB_BLU/PCGS3033_07.asp?aUsuarioSessao="+getVariavelURL("aUsuarioSessao") + "&aCSAG320Id=" +  vCsag320Codigo  + "&sProtocolo=" + oAcordo.ID_PROTOCOLO+ "&idAcordo=" + oAcordo.ID_ACORDO);
        buscaWS.get('/WVDF_WS/WS_hcgs3033.wso/fZoomAcordos/JSON', 'idAcordo=' + oAcordo.ID_ACORDO).then(function(data) {

            /*()   console.log(data);
               $scope.acordo.id = data.id;
               $scope.acordo.protocolo = data.protocolo;
               $scope.acordo.produto = data.produto;
               $scope.acordo.modalidades = data.modalidades;(",");
               $scope.acordo.marca = data.marca;
               $scope.acordo.destino = data.destino;
               $scope.acordo.origem = data.origem;
               $scope.acordo.equipamento = data.equipamento;
               $scope.acordo.dtInicio = data.dtInicio;
               $scope.acordo.dtFim = data.dtFim;*/

            // $scope.acordo.taxas = data.taxas.split(",");

            $scope.acordo = data;
            $scope.acordo.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
            console.log($scope.acordo);
        });
    };

    // novo 


    $scope.paginaAtual = 1;
    $scope.mostrarVoltar = false;
    $scope.showDados = true;
    $scope.acordo = {};
    $scope.acordo.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    $scope.zerarTela = function() {
        $scope.listaOperacoes = '';
        $scope.pcgs3035List = [];
        $scope.acordo = {};
        $scope.acordo.protocolo = "";
        $scope.acordo.produto = "";
        $scope.acordo.modalidades = "";
        $scope.acordo.marca = "";
        $scope.acordo.destino = "";
        $scope.acordo.equipamento = "";
        $scope.acordo.dtInicio = "";
        $scope.acordo.dtFim = "";
        $scope.acordo.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    };

    $scope.zerarTela();

    // Lista Acordos
    $scope.listaAcordos = function() {
        /*      buscaWS.get('/WVDF_WS/WS_hcgs3033.wso/fAcordosGerais/JSON', 'aCSAG320Id=' + getVariavelURL('aCSAG320Id') + '&aTIPO=AR').then(function(data) {
            $scope.lsAcordos = data;
        });
*/

        var entidade = {
            'aUsuarioSessao': aUsuarioSessao,
            'aCSAG320Id': $('#aCSAG320Id').val(),
            'aTIPO': 'CL'
        }
        console.log($('#aCSAG320Id').val());
        callWS.get('/WVDF_WS/WS_hcgs3033.wso/listarAcordosPessoa/JSON', { 'sJSON': entidade }).then(function(response) {
            console.log(response);
            $scope.acordos = response.data;
            $scope.lsAcordos = response.data;
            $scope.quantosRegistros = response.data.length;
        });
    };

    $scope.listaAcordos();

    ///////////////
    $scope.acCliente = function(texto) {
        return buscaWS.get('fbcsag340_clientenome.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.acAgente = function(texto) {
        return buscaWS.get('fbcsag345_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.acArmador = function(texto) {
        return buscaWS.get('fbcsag342_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.acCiaAerea = function(texto) {
        return buscaWS.get('fbcsag343_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.acTerminal = function(texto) {
        return buscaWS.get('fbcsag346_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.acTransportadora = function(texto) {
        return buscaWS.get('fbcsag349_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.acTradelane = function(texto) {
        return buscaWS.get('fbcsag379_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.acContainer = function(texto) {
        return buscaWS.get('fbccgs217_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.acCidades = function(texto) {
        return buscaWS.get('fbcsag325_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    /////////////

    // Lista Modalidades de Frete
    buscaWS.get('/WVDF_WS/ws_ccgs202.wso/f_combo_ccgs202/JSON', '').then(function(data) {
        $scope.lsModalidades = data;
    });

    // Lista Produtos
    buscaWS.get('/WVDF_WS/WS_HCGS3029.wso/f_combo_prod/JSON', '').then(function(data) {
        $scope.lsProdutos = data;
    });

    // Lista Marcas
    buscaWS.get('/WVDF_WS/WS_HCGS3029.wso/f_combo_marcas/JSON', '').then(function(data) {
        $scope.lsMarcas = data;
    });

    // Lista equipamento
    buscaWS.get('/WVDF_WS/ws_CCGS217.wso/f_CCGS217_lista/JSON', '').then(function(data) {
        $scope.lsequipamento = data;
    });

    // Lista Taxas buscarTaxas ou f_lista_HCGS3001
    buscaWS.get('/WVDF_WS/ws_hcgs3001.wso/buscarTaxas/JSON', '').then(function(data) {
        $scope.lsTaxas = data;
        console.log(data);
    });

    // AutoComplete Cidades
    $scope.acCidades = function(texto) {
        return buscaWS.get('fbcsag325_descricao.asp', 'term=' + texto).then(function(data) {
            return data;
        });
    };

    $scope.posicionaAcordo = function(acordo) {
        buscaWS.get('/WVDF_WS/WS_hcgs3033.wso/f_acd_click/JSON', 'idAcordo=' + acordo.ID_ACORDO).then(function(data) {
            $scope.acordo.id = data.id;
            $scope.acordo.protocolo = data.protocolo;
            $scope.acordo.produto = data.produto;
            $scope.acordo.modalidades = data.modalidades;
            (",");
            $scope.acordo.marca = data.marca;
            $scope.acordo.destino = data.destino;
            $scope.acordo.equipamento = data.equipamento; //.split(",");
            $scope.acordo.dtInicio = data.dtInicio;
            $scope.acordo.dtFim = data.dtFim;
            $scope.acordo.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
            //   $scope.acordo.taxas = data.taxas.split(",");
        });
    }

    $scope.changeTaxas = function(taxasSelecionadas) {
        $scope.loadingState = true;
        //console.log(taxasSelecionadas);

        var aux = "";

        taxasSelecionadas.forEach(function(taxa) {
            aux += taxa + ",";
        });

        aux = aux.substring(0, aux.length - 1);

        buscaWS.get('/WVDF_WS/ws_hcgs3034.wso/f_save_taxs/JSON', 'aProtocolo=' + $scope.acordo.protocolo + '&aTax=' + aux).then(function(data) {
            //console.log(data);
            $scope.loadingState = false;
        });
    }

    $scope.clickTaxasAcordadas = function(taxa) {
        //console.log(taxa);
        //debugger;
        $scope.loadingState = true;
        buscaWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_rowid/JSON', 'idAcordo=' + $scope.acordo.id + '&aTax=' + taxa.id).then(function(rowIds) {

            buscaWS.get('/WVDF_WS/WS_hcgs3033.wso/fOperacaoProdutoAcordo/JSON', 'sHCGS3033_ID=' + $scope.acordo.id).then(function(operacoes) {
                $scope.listaOperacoes = operacoes.split(',');
                a = taxa.id.substring(0, taxa.id.length - 1)

                src = "PCGS3035_70.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aHCGS3034Id=" + rowIds.id3034 + "&aHCGS3033Id=" + $scope.acordo.id + "&RowId=" + rowIds.r3035;
                $('#iframe-pcgs3035_70').attr('src', src);

                src = "PCGS3036_70.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aHCGS3034Id=" + rowIds.id3034 + "&aHCGS3033Id=" + $scope.acordo.id + "&RowId=" + rowIds.r3036;
                $('#iframe-pcgs3036_70').attr('src', src);

                src = "PCGS3037_70.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aHCGS3034Id=" + rowIds.id3034 + "&aHCGS3033Id=" + $scope.acordo.id + "&RowId=" + rowIds.r3037;
                $('#iframe-pcgs3037_70').attr('src', src);
                $scope.loadingState = false;
            });
        });


    };


    $scope.setClickedRow = function(index) {
        $scope.acordo.selectedRow = index;
    }
    $scope.setTopClickedRow = function(index) {
        $scope.acordo.selectedTopRow = index;
    }

    $scope.novoAcordo = function() {
        //    $scope.linha = "";
        //$scope.urlBaixo = $sce.trustAsResourceUrl("/WEB_BLU/PCGS3033_07.asp?aUsuarioSessao=" + getVariavelURL("aUsuarioSessao") + "&aCSAG320Id=" + getVariavelURL('aCSAG320Id'));
        $scope.zerarTela();
        $scope.showDados = true;
    };

    //    $scope.acordo.aCSAG320Id=getVariavelURL('aCSAG320Id');

    $scope.cadastrarAcordo = function() {
        $scope.loadingState = true;
        $scope.acordo.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        $scope.acordo.aCSAG320Id = $('#aCSAG320Id').val();
        $scope.acordo.aTIPO = 'CL';
        var entidade = JSON.stringify($scope.acordo);


        callWS.get('/WVDF_WS/ws_HCGS3033.wso/fGravarAcordo/JSON', { 'sJSON': entidade }).then(function(response) {
            $scope.loadingState = false;


            //  toaster.pop('success', "Sucesso", ("Registro: " + $scope.acordo.protocolo + " criado com sucesso."), null, 'trustedHtml');
            console.log(response.data);

            if (response.data.defaultMessage.hasError) {
                toaster.pop('error', "Error", response.data.defaultMessage.msgError, null, 'trustedHtml');
                return;
            }

            $scope.listaAcordos();


            console.log("ID retorno: " + response.data.id);

            buscaWS.get('/WVDF_WS/WS_hcgs3033.wso/fZoomAcordos/JSON', 'idAcordo=' + response.data.id).then(function(data) {

                console.log("ID zoom: " + data.id);
                $scope.acordo = data;
                $scope.acordo.id = data.id;
                $scope.acordo.protocolo = data.protocolo;
                $scope.acordo.produto = data.produto;
                $scope.acordo.modalidades = data.modalidades; //.split(",");
                $scope.acordo.marca = data.marca;
                $scope.acordo.destino = data.destino;
                $scope.acordo.equipamento = data.equipamento; // .split(",");
                $scope.acordo.dtInicio = data.dtInicio;
                $scope.acordo.dtFim = data.dtFim;

                console.log("acordo gerado");
                $scope.acordo.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
                $scope.posicionaAcordos();

                var params = {
                    'aUsuarioSessao': aUsuarioSessao,
                    'aAcordo': data.id,
                };
                callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_lista/JSON', params)
                    .then(function(response) {

                        $scope.pcgs3035List = response.data;
                    });
            });
        }, function(error) {
            $scope.loadingState = false;
            //   toaster.pop('error', "Error", ("Error ao gravar registro. <br/> Response: " + error.data), null, 'trustedHtml');
        });

        $scope.loadingState = false;
    };

    $scope.setClickedRow = function(index) {
        $scope.selectedRow = index;
    }

    $scope.setUrlBaixo = function(sUrl) {
        $scope.urlBaixo = $sce.trustAsResourceUrl(sUrl);
        //console.log($scope.urlBaixo);
    }

    ////


    //console.log($scope.acordo.produto);
    //  if ($scope.acordo.produto != undefined && $scope.acordo.produto != false) {
    //console.log("log1");
    // console.log($scope.acordo.produto);
    /*   buscaWS.get('/WVDF_WS/WS_HCGS3029.wso/f_relacaoProd/JSON', 'aCCGS210_ID=' + $scope.acordo.produto).then(function(data1) {
           $scope.lsPaises = data1;
           console.log(data1);
       });*/
    //  } else {
    //      console.log("log2");
    //  $scope.lsPaises = [];
    // }


    $scope.btnRefresh = function() {
        $scope.acordo = {};
        $scope.novoAcordo();
        $scope.listaAcordos();
        $scope.posicionaAcordos();

    }

    $scope.refreshTaxas = function() {
        if ($scope.lastAcordo != '')
            $scope.clickTabela($scope.lastAcordo)
    }

    $scope.excluirAcordo = function() {
        var params = {
            'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
            'id': $scope.acordo.id
        }
        callWS.get('/WVDF_WS/ws_HCGS3033.wso/fExcluirAcordo/JSON', { 'sJSON': params }).then(function(response) {

            $scope.btnRefresh();
        });
    }

    buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON', '').then(function(data) {
        $scope.lsPaises = data;

    });



    $scope.loadMoedas = function(query) {
        return buscaWS.get('/WVDF_WS/ws_ccgs218.wso/f_CCGS218_lista/JSON', '').then(function(data) {
            return data;
        });
    };


    buscaWS.get('/WVDF_WS/ws_ccgs218.wso/f_CCGS218_lista/JSON', '').then(function(data) {
        $scope.lsMoeda = data;
    });
    buscaWS.get('/WVDF_WS/ws_CCGS220.wso/f_combo_tpcalc/JSON', 'aModal=').then(function(data) {
        $scope.comboTpcalc = data;
    });

    var getDescricao = function() {
        $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao };
        callWS.get('/WVDF_WS/ws_ccgs225.wso/f_CCGS225_combo/JSON', params)
            .then(function(response) {
                //  console.log(response);
                $scope.lsDescricao = response.data;

                $scope.loadingState = false;
            }, function(error) {
                $scope.loadingState = false;
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar marcas. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    };
    getDescricao();
    // 0 cliente; armador 2; cie aerea = 3; terminal = 6; agente = 5/ transportadora 9;
    if (getVariavelURL('aCSAG320Id')) {

        buscaWS.get('/WVDF_WS/WS_hcgs3033.wso/fZoomAcordos/JSON', 'idAcordo=' + getVariavelURL('aCSAG320Id')).then(function(data) {

            $scope.acordo = data;
            try {
                $scope.acordo.modalidades = data.modalidades;
                (",");
            } catch (err) {
                $scope.acordo.modalidades = '';
            }

            try {
                $scope.acordo.equipamento = data.equipamento;
            } catch (err) {
                $scope.acordo.equipamento = '';
            }

            try {
                // $scope.acordo.taxas = data.taxas.split(",");
            } catch (err) {
                //    $scope.acordo.taxas = '';
            }
            $scope.acordo.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        });
    }

    var sTabela = "HCGS3033_0";
    $scope.modalColunas = "PHSAG310_70.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aTabela=" + sTabela;

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
    montaTabela();

    $scope.pcgs3035List = [];

    $scope.posicionaRegistro3035 = function(item) {
        $scope.clickTabela(item);
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'aAcordo': item.ID_ACORDO,
        };
        callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_lista/JSON', params)
            .then(function(response) {
                console.log(response);
                $scope.pcgs3035List = response.data;
            });
    }

    $scope.pcgs3035NewRow = function() {
        var nobj = {};
        nobj.recId = '';
        nobj.aAcordo = getVariavelURL('aCSAG320Id');
        nobj.aPagar = {};
        nobj.equipamento = '';
        nobj.taxa = '';
        nobj.descricao = '';
        nobj.imprimeNota = '';
        nobj.IRRF = '';
        nobj.aPagar.tipo = '';
        nobj.aPagar.moeda = '';
        nobj.aPagar.valor = '';
        nobj.aPagar.valorPor = '';
        nobj.aPagar.pagamento = '';
        nobj.aPagar.prepaidAbroad = '';
        nobj.aPagar.prepaid = '';
        nobj.aPagar.collect = '';
        nobj.aPagar.aplicaFormulaCalculo = '';
        nobj.aPagar.formula = '';

        nobj.aReceber = {};
        nobj.aReceber.tipo = '';
        nobj.aReceber.moeda = '';
        nobj.aReceber.valor = '';
        nobj.aReceber.valorPor = '';
        nobj.aReceber.valorMin = '';
        nobj.aReceber.permiteDesconto = '';
        nobj.aReceber.prepaidAbroad = '';
        nobj.aReceber.prepaid = '';
        nobj.aReceber.collect = '';
        nobj.aReceber.valorAplicado = '';
        nobj.aReceber.aplicaMultaTaxa = '';
        nobj.aReceber.aplicaFormulaCalculo = '';
        nobj.aReceber.formula = '';

        nobj.editable = true;
        $scope.pcgs3035List.unshift(nobj);
    }

    $scope.cloneRow3035 = function(row) {
        var nobj = JSON.parse(JSON.stringify(row));
        nobj.recId = '';
        nobj.editable = true;
        $scope.pcgs3035List.unshift(nobj);
    }

    $scope.btnTableSavePCGS3035 = function(row) {
        row.aUsuarioSessao = aUsuarioSessao;
        row.aAcordo = $scope.acordo.id;


        callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_save/JSON', { 'sJSON': row })
            .then(function(response) {

                row.aAcordo = response.data.id_hcgs3033;
                row.recId = response.data.recId;
                row.editable = false;


                var params = {
                    'aUsuarioSessao': aUsuarioSessao,
                    'aAcordo': response.data.id_hcgs3033,
                };
                callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_lista/JSON', params)
                    .then(function(response) {
                        console.log(response);
                        $scope.pcgs3035List = response.data;
                    });


            }, function(error) {

                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Erro ao gravar registro"),
                    bodyOutputType: 'trustedHtml'
                });
            });
    }

    $scope.btnSalvar3035 = function() {
        $scope.loadingState = true;
        $scope.form.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        $scope.form.bApagar = true;

        var entidade = JSON.stringify($scope.form);
        // console.log(entidade);

        //  debugger;
        callWS.get('/WVDF_WS/ws_HCGS3033.wso/fGravarAcordo/JSON', { 'sJSON': entidade }).then(function(response) {
                $scope.loadingState = false;
                $scope.listaAcordos();
                console.log(response)
                if (response.data.defaultMessage.hasError) {
                    toaster.pop('error', "Error", response.data.defaultMessage.msgError, null, 'trustedHtml');
                    console.log("toaster");
                    return;

                } else {
                    toaster.pop('success', "Sucesso", ("Registrocriado com sucesso."), null, 'trustedHtml');
                }

                buscaWS.get('/WVDF_WS/WS_hcgs3033.wso/fZoomAcordos/JSON', 'idAcordo=' + response.data.id).then(function(data) {

                    $scope.acordo = data;
                    try {
                        $scope.acordo.modalidades = data.modalidades;
                        (",");
                    } catch (err) {
                        $scope.acordo.modalidades = '';
                    }

                    try {
                        $scope.acordo.equipamento = data.equipamento;
                    } catch (err) {
                        $scope.acordo.equipamento = '';
                    }

                    try {
                        // $scope.acordo.taxas = data.taxas.split(",");
                    } catch (err) {
                        //    $scope.acordo.taxas = '';
                    }
                    $scope.acordo.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
                    $scope.posicionaAcordos();
                });

            },
            function(error) {
                $scope.loadingState = false;
                toaster.pop('error', "Error", ("Error ao gravar registro. <br/> Response: " + error.data), null, 'trustedHtml');
            });

        $scope.loadingState = false;
    }

    $scope.excluirRowPCGS3035 = function(row, index) {

        var params = {
            'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
            'recId': row.recId
        }
        callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_del/JSON', params)
            .then(function(response) {
                $scope.pcgs3035List.splice(index, 1);
            }, function(error) {

                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Erro ao apagar registro"),
                    bodyOutputType: 'trustedHtml'
                });
            });
    }

    $scope.posicionaModal = function(row) {
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'aAcordo': getVariavelURL('aCSAG320Id'),
            'recId': row.recId,
        };
        callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_zoom/JSON', params)
            .then(function(response) {
                console.log(response);
                $scope.form = response.data;
            });
    }


    $scope.btnTableSavePCGS3035R = function(row) {
        row.aUsuarioSessao = aUsuarioSessao;
        row.aAcordo = getVariavelURL('aCSAG320Id');
        row.bAPagar = true;

        callWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_save/JSON', { 'sJSON': row })
            .then(function(response) {

                row.aAcordo = response.data.id_hcgs3033;
                row.recId = response.data.recId;
                row.editable = false;

                toaster.pop('success', "Sucesso", ("Registro salvo com sucesso."), null, 'trustedHtml');
            }, function(error) {

                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Erro ao gravar registro"),
                    bodyOutputType: 'trustedHtml'
                });
            });
    }
});