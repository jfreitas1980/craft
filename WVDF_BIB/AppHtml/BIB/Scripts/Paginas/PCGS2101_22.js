// ANGULAR JS
app = angular.module('pcgs210122App', ['ui.bootstrap', 'ngTable', 'angularSoap', 'ngSanitize']);

app.factory('buscaWS', function ($http) {
    return {
        get: function (url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function (res) {
                return res.data;
            });
        }
    };
});

app.factory("soapService", ['$soap', function ($soap) {
    return {
        CallSoap: function (url, action, params) {
            return $soap.post(url, action, params);
        }
    }
}]); 

app.controller('pcgs210122Controller', function ($scope, soapService, $window, buscaWS, $http, $q, $filter, NgTableParams) {

    // DECLARACAO DE VARIAVEIS
    $scope.novo = {};
    $scope.novo.fup = 0;
    $scope.novo.produto = 0;
    $scope.novo.DS = "";
    $scope.novo.motivo = 0;
    $scope.novo.DS_MOT = "";

    $scope.novo.origem = {};
    $scope.novo.origem.id = 0;
    $scope.novo.origem.value = "";

    $scope.novo.destino = {};
    $scope.novo.destino.id = 0;
    $scope.novo.destino.value = "";

    $scope.novo.trade = {};
    $scope.novo.trade.id = 0;
    $scope.novo.trade.value = "";

    $scope.novo.mercadoria = {};
    $scope.novo.mercadoria.ID = 0;
    $scope.novo.mercadoria.DS = "";

    $scope.novo.concorrencia = {};
    $scope.novo.concorrencia.idCliente = 0;
    $scope.novo.concorrencia.DS = "";

    $scope.novo.seuCliente = {};
    $scope.novo.seuCliente.idCliente = 0;
    $scope.novo.seuCliente.DS = "";

    $scope.novo.potencial = 0;
    $scope.novo.unidade = '';
    $scope.novo.historico = '';

    $scope.novo.frequencia = 0;

    $scope.novo.observacao = "";
    $scope.novo.sRecnum_05 = 0;

    $scope.novo.origemAUX = 0;
    $scope.novo.destinoAUX = 0;
    $scope.novo.mercadoriaAUX = 0;
    $scope.novo.tradeAUX = 0;
    $scope.novo.concorrenciaAUX = 0;
    $scope.novo.seuClienteAUX = 0;
    $scope.novo.unidadeAUX = '';

    $scope.novo.fup     = getVariavelURL('fupid');
    $scope.novo.produto = getVariavelURL('proid');
    $scope.novo.motivo  = getVariavelURL('motid');
    $scope.novo.aUsuarioSessao = getVariavelURL('aUsuarioSessao');

    parametros = 'aFup=' + $scope.novo.fup + '&aProd=' + $scope.novo.produto + '&aMot=' + $scope.novo.motivo+ '&sRecnum=' + 0;

    buscaWS.get('/WVDF_WS/ws_hcgs2105.wso/f_hcgs2105_rel/JSON', parametros).then(function (data) {
        $scope.lsDetalhes = data;
        $scope.novo.DS = data[0].DS;
        $scope.novo.DS_MOT = data[0].DS_MOT;
    });

    // buscaWS.get('/WVDF_WS/ws_CCGS226.wso/f_CCGS226_freq/JSON', '').then(function (data) {
    //     $scope.lsFrequencias = data;
    // });
    // buscaWS.get('/WVDF_WS/ws_hcgs2103.wso/f_combo_potencial/JSON', '').then(function (data) {
    //     $scope.lsUnidades = data;
    // });
    parametros = 'aFup=' + $scope.novo.fup + '&aProd=' + $scope.novo.produto + '&aMot=' + $scope.novo.motivo;
    buscaWS.get('/WVDF_WS/ws_hcgs2105.wso/f_valida_historico/JSON', parametros).then(function (data) {
        $scope.novo.historico = data;
    });

    // AUTOCOMPLETES

    // CONCORRENTES
    $scope.acConcorrente = function (texto) {
        if (texto.length > 2) {
            return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/f_fup_concorrente/JSON', 'sInicio=' + texto).then(function (data) {
                return data;
            });
        }
    };

    // SEU CLIENTE
    $scope.acSeuCliente = function (texto) {
        if (texto.length > 2) {
            return buscaWS.get('/WVDF_WS/WS_CSAG340.wso/f_fup_concorrente/JSON', 'sInicio=' + texto).then(function (data) {
                return data;
            });
        }
    };

    // NCM / MERCADORIAS
    $scope.acMercadoria = function (texto) {
        if (texto.length > 2) {
            return buscaWS.get('/WVDF_WS/ws_ccgs219.wso/f_fup_mer_complete/JSON', 'aInicio=' + texto).then(function (data) {
                return data;
            });
        }
    };
    
    // CIDADES
    $scope.acCidades = function (texto) {
        if (texto.length > 2) {
            return buscaWS.get('/WVDF_WS/ws_CSAG325.wso/autoCidades/JSON', 'aInicio=' + texto + '&aPais=').then(function (data) {
                return data;
            });

            // return buscaWS.get('fbcsag325_descricao.asp', 'term=' + texto).then(function (data) {
            //     return data;
            // });
        }
    };

    // TRADES
    // $scope.acTrades = function (texto) {
    //     if (texto.length > 2) {
    //         return buscaWS.get('fbcsag379_descricao.asp', 'term=' + texto).then(function (data) {
    //             return data;
    //         });
    //     }
    // };

    // FUNCOES
    
    // DELETAR DETALHE
    $scope.fnDeletarDetalhes = function (sRecnum) {

        var parametros = {};
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        parametros.sRecnum_05 = sRecnum;

        $http({
            url: '/WVDF_WS/ws_hcgs2105.wso/f_hcgs2105_fup_del/JSON',
            method: 'GET',
            params: parametros
        }).then(function (data) {
            
            parametros = 'aFup=' + $scope.novo.fup + '&aProd=' + $scope.novo.produto + '&aMot=' + $scope.novo.motivo + '&sRecnum=' + 0;

            buscaWS.get('/WVDF_WS/ws_hcgs2105.wso/f_hcgs2105_rel/JSON', parametros).then(function (data) {
                $scope.lsDetalhes = data;
            });
            
        });
    };

    $scope.fnCarregaHistorico = function () {

        parametros = 'aFup=' + $scope.novo.fup + '&aFup_Anterior=' + $scope.novo.historico + '&aProd=' + $scope.novo.produto + '&aMot=' + $scope.novo.motivo;
        buscaWS.get('/WVDF_WS/ws_hcgs2105.wso/f_hitorico_detalhes/JSON', parametros).then(function (data) {
            
            paramiters = 'aFup=' + $scope.novo.fup + '&aProd=' + $scope.novo.produto + '&aMot=' + $scope.novo.motivo + '&sRecnum=' + 0;

            buscaWS.get('/WVDF_WS/ws_hcgs2105.wso/f_hcgs2105_rel/JSON', paramiters).then(function (data) {
                $scope.lsDetalhes = data;
            });
        
        });

    };

    //POSICIONA DETALHE
    $scope.fnPosicionaDetalhes = function(sRecnum){
        
        var parametros = '';
        parametros = "sRecnum_05=" + sRecnum;
        buscaWS.get('/WVDF_WS/ws_hcgs2105.wso/f_hcgs2105_fup_edit/JSON', parametros).then(function (data) {
            
            $scope.novo.origemAUX = data.Origem_id;
            $scope.novo.origem = data.Origem_ds;

            $scope.novo.destinoAUX = data.Destino_id;
            $scope.novo.destino = data.Destino_ds;
            
            $scope.novo.tradeAUX = data.Trade_id;
            $scope.novo.trade = data.Trade_ds;

            $scope.novo.mercadoriaAUX = data.Mercadoria_id;
            $scope.novo.mercadoria = data.Mercadoria_ds;

            $scope.novo.concorrenciaAUX = data.Concorrencia_id;
            $scope.novo.concorrencia = data.Concorrencia_ds;

            $scope.novo.seuClienteAUX = data.SeuCliente_id;
            $scope.novo.seuCliente = data.SeuCliente_ds;

            $scope.novo.potencial = data.Potencial_id;

            $scope.novo.unidade = data.Unidade_ds;            

            $scope.novo.frequencia = data.Frequencia_id;

            CKEDITOR.instances.novo_observacao.setData(data.Observacao);
            $scope.novo.sRecnum_05 = data.sRecnum_05;

            parametros = 'aFup=' + $scope.novo.fup + '&aProd=' + $scope.novo.produto + '&aMot=' + $scope.novo.motivo + '&sRecnum=' + sRecnum;

            buscaWS.get('/WVDF_WS/ws_hcgs2105.wso/f_hcgs2105_rel/JSON', parametros).then(function (data) {
                $scope.lsDetalhes = data;
            });

        });

    }

    // SALVAR DETALHE NOVO
    $scope.fnSalvarDetalhe = function () {
        
        // if ($scope.novo.destinoAUX !== 0) {}
        var Detalhe = $scope.novo;

        if (Detalhe.seuCliente == "" && Detalhe.concorrencia == "" && Detalhe.destino == "" && Detalhe.frequencia == 0 && Detalhe.mercadoria == "" && Detalhe.origem == "" && Detalhe.trade == "" && CKEDITOR.instances.novo_observacao.getData() == "") {            
            parent.parent.alertify.error("Sem Campos Preenchidos!");
            return;
        }
            
        if (CKEDITOR.instances.novo_observacao.getData().length > 8001){
            var limite = CKEDITOR.instances.novo_observacao.getData().length;
            var msg = "Limite excedido! \n 8000 < " + limite;
            parent.parent.alertify.error(msg);
            //CKEDITOR.instances.notes_texto.showNotification('Limite de letras excedido!', 'warning');
            CKEDITOR.instances.notes_texto.focus();
            return;   
        }
        else {
            
            Detalhe.observacao = CKEDITOR.instances.novo_observacao.getData();
            var entidade = JSON.stringify(Detalhe);
            soapService.CallSoap('/WVDF_WS/ws_hcgs2105.wso', 'fGravarHCGS2105', {'sJSON': entidade}).then(function (response) {

                $scope.novo.origem = "";
                $scope.novo.destino = "";
                $scope.novo.trade = "";
                $scope.novo.mercadoria = "";
                $scope.novo.concorrencia = "";
                $scope.novo.seuCliente = "";
                $scope.novo.potencial = "";
                $scope.novo.unidade = "";
                $scope.novo.frequencia = 0;
                $scope.novo.observacao = "";
                CKEDITOR.instances.novo_observacao.setData('');
                $scope.novo.sRecnum_05 = 0;

                $scope.novo.origemAUX = 0;
                $scope.novo.destinoAUX = 0;
                $scope.novo.mercadoriaAUX = 0;
                $scope.novo.tradeAUX = 0;
                $scope.novo.concorrenciaAUX = 0;
                $scope.novo.seuClienteAUX = 0;

                parametros = 'aFup=' + $scope.novo.fup + '&aProd=' + $scope.novo.produto + '&aMot=' + $scope.novo.motivo + '&sRecnum=' + 0;

                buscaWS.get('/WVDF_WS/ws_hcgs2105.wso/f_hcgs2105_rel/JSON', parametros).then(function (data) {
                    $scope.lsDetalhes = data;
                });

            });
        }
    };

     // LIMPA O CAMPO EM CASOS NAO SELECIONADOS OPÇÕES VALIDAS
    $scope.fnOrigem = function (origemAUX, origem_id) { 
        debugger;
        if (origem_id == undefined) {

            $scope.novo.origem = '';

        }

    };

    $scope.fnDestino = function (AUX, id) { 

        if (id == undefined) {

            $scope.novo.destino = '';

        }

    };

    $scope.fnTrade = function (AUX, id) { 

        if (id == undefined) {

            $scope.novo.trade = '';

        }

    };

    $scope.fnMercadoria = function (AUX, id) { 

        if (id == undefined) {

            $scope.novo.mercadoria = '';

        }

    };

    $scope.fnConcorrente = function (AUX, id) { 

        if (id == undefined) {

            $scope.novo.concorrencia = '';

        }

    };

    $scope.fnSeuCliente = function (AUX, id) { 

        if (id == undefined) {

            $scope.novo.seuCliente = '';

        }

    };

});

// FUNCAO AUX ARRAY OBJETO
function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

