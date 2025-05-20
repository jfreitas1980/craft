$(document).ready(function() {

    $('#datainicial').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    }).mask('99/99/9999');

    $('#datafinal').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    }).mask('99/99/9999');

    $('#proximavisita').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    }).mask('99/99/9999');

    $("#horainicial").mask("99:99");
    $("#horafinal").mask("99:99");

});

$('#modal-grp_clientes').click(function() {
    window.parent.$.fancybox('height="90%" width="90%">');
});

$("#modal-grp_clientes").fancybox({
    fitToView: true,
    width: '90%',
    height: '90%',
    autoSize: true,
    modal: false,
    padding: 0,
    beforeShow: function() {
        window.parent.$('html, body').animate({ scrollTop: 0 }, 800);
    },
    beforeClose: function() {

    },
    helpers: {
        overlay: {
            locked: false
        }
    }
});

// ANGULAR JS
app = angular.module('pcgs210121App', ['ui.bootstrap', 'ngTable', 'diretivas', 'ngTagsInput', 'angularSoap', 'ngSanitize', 'wsDominio']);

app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                return res.data;
            });
        }
    };
});

app.factory("soapService", ['$soap', function($soap) {
    return {
        CallSoap: function(url, action, params) {
            return $soap.post(url, action, params);
        }
    }
}]);

app.directive('focusMe', function($timeout) {
    return {
        scope: { trigger: '@focusMe' },
        link: function(scope, element) {
            scope.$watch('trigger', function(value) {
                if (value === "true") {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
        }
    };
});

app.directive('jsonText', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            function into(input) {
                console.log(JSON.parse(input));
                return JSON.parse(input);
            }

            function out(data) {
                return JSON.stringify(data);
            }
            ngModel.$parsers.push(into);
            ngModel.$formatters.push(out);
        }
    };
});


app.controller('pcgs210121Controller', function($scope, $timeout, soapService, $window, buscaWS, $http, $q, $filter, NgTableParams, callWS) {


    // DECLARACAO DE VARIAVEIS
    $scope.fup = {};
    $scope.fup.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    $scope.fup.codigo = 0;
    $scope.fup.marca = 0;
    $scope.fup.cliente = {};
    $scope.fup.cliente.idCliente = 0;
    $scope.fup.cliente.DS = '';
    $scope.fup.acaocomercial = "";
    $scope.fup.elaborador = "";
    $scope.fup.solicitadopor = 0;
    $scope.fup.local = 0;
    $scope.fup.localoutro = "Local...";
    $scope.fup.dataInicial = "";
    $scope.fup.horaInicial = "";
    $scope.fup.dataFinal = "";
    $scope.fup.horaFinal = "";
    $scope.fup.diainteiro = 0;
    $scope.fup.cancelado = 0;
    $scope.fup.canceladomotivo = "Motivo...";
    $scope.fup.proximavisita = "";
    $scope.fup.participantes = "";
    $scope.fup.tela = 0;
    $scope.fup.save = 0;
    // $scope.fup.tagPart = {};

    // GERA A TABELA DOS POTENCIAIS
    $scope.fnMontaPotencial = function() {

        buscaWS.get('/WVDF_WS/ws_hcgs2103.wso/f_combo_potencial/JSON', '').then(function(data) {
            $scope.lsPotencialT = data;
        });

    }

    // VERIFICA SE O FUP POSSUI OBJETOS
    $scope.fnVerificaProd = function(Fup) {

        parametros = 'aFup=' + Fup;

        buscaWS.get('/WVDF_WS/ws_hcgs2103.wso/f_valid_potfup/JSON', parametros).then(function(data) {
            if (data == 1) {
                $scope.fnMontaPotencial();
            }
        });

    }

    if (getVariavelURL('fupid')) {
        $scope.fup.codigo = getVariavelURL('fupid');
        $scope.fup.sRowId = getVariavelURL('sRowId');

        parametros = 'aFup=' + $scope.fup.codigo;

        buscaWS.get('/WVDF_WS/ws_hcgs2101.wso/f_fup_posiciona/JSON', parametros).then(function(data) {
            $scope.fup.recnum = data.sRecnum_01;
            $scope.fup.cliente = data.DS_320;
            $scope.fup.auxCliente = data.ID_320;
            $scope.fup.marca = data.ID_308;
            $scope.fup.acaocomercial = data.AcaoC;
            $scope.fup.solicitadopor = data.SOL_P;
            $scope.fup.local = data.LOCAL;
            $scope.fup.localoutro = data.NM_LOCAL;
            $scope.fup.dataInicial = data.DT_IN;
            $scope.fup.dataFinal = data.DT_FM;
            $scope.fup.horaInicial = data.HR_IN;
            $scope.fup.horaFinal = data.HR_FM;
            $scope.fup.cancelado = data.Cancel;
            $scope.fup.canceladomotivo = data.Motivo;
            if (data.DT_PROX !== '01/01/1795' && data.DT_PROX !== '01/01/1753') { $scope.fup.proximavisita = data.DT_PROX; }
            $scope.fup.elaborador = data.ELABORADOR;
            $scope.fup.participantes = data.Participantes;
            $('#participante_fup').val(data.Participantes);
            $scope.fup.tagPart = data.tLista;
            // console.log(data.Participantes);
            // console.log(data.tLista);


            parametros = "sCONTEUDO=" + data.ID_308 + "&Cliente=" + data.ID_320;;
            buscaWS.get('/WVDF_WS/ws_CSAG308.wso/f_fup_csag308_combo/JSON', parametros).then(function(data) {
                $scope.listaMarcas = data;
            });

            $scope.fup.tela = 1;

        });

    } else {
        $scope.fup.save = 1;

        parametros = "sCONTEUDO=" + $scope.fup.marca + "&Cliente=" + $scope.fup.cliente.idCliente;
        buscaWS.get('/WVDF_WS/ws_CSAG308.wso/f_fup_csag308_combo/JSON', parametros).then(function(data) {
            $scope.listaMarcas = data;
            $scope.fup.marca = data[0].ID;
        });

    }

    if (getVariavelURL('Data')) {
        if ($scope.fup.codigo === 0) {
            $scope.fup.dataInicial = getVariavelURL('Data');
            $scope.fup.dataFinal = getVariavelURL('Data');
        }
    }

    // MONTA TELA   
    buscaWS.get('/WVDF_WS/ws_ccgs235.wso/f_CCGS235_radios/JSON', '').then(function(data) {
        $scope.acAcComercial = data;
    });

    if ($scope.fup.codigo !== 0 && $scope.fup.codigo !== undefined) {
        var parames = "aFup=" + $scope.fup.codigo;
        buscaWS.get('/WVDF_WS/ws_hcgs2103.wso/f_fup_prod/JSON', parames).then(function(data) {
            $scope.lsProdutos = data;

            $scope.lsProdutos.forEach(function(produto, index) {
                $scope.lsProdutos[index].ID = parseInt($scope.lsProdutos[index].ID);
            })

            $scope.fnMontaPotencial();

        });

    }

    // AUTOCOMPLETES

    // CLIENTES
    $scope.acClientes = function(texto) {

        if (texto.length > 2) {

            var params = {
                'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
                'sInicio': texto
            };

            return callWS.get('/WVDF_WS/WS_CSAG340.wso/f_proposta_complete_client/JSON', params).then(function(data) {
                return data.data;
            });
        }

    };

    //Data inicio - Fim
    $scope.blurData = function() {
        if ($scope.fup.dataInicial != '') {
            $scope.fup.dataFinal = $scope.fup.dataInicial;
        }
    };

    //Horario
    $scope.blurHora = function() {

        $scope.fup.horaInicial = $('#horainicial').val();

        var hora = $scope.fup.horaInicial.substring(0, 2)
        var min = $scope.fup.horaInicial.substring(3, 5)
        if (hora > 24 || hora === '' || hora === '__') {
            parent.parent.alertify.error("Hora Inicial Invalida!");
            return;
        }
        if (min > 59 || min === '__') {
            parent.parent.alertify.error("Hora Inicial Invalida!");
            return;
        }

        if ($scope.fup.horaInicial.length = 5) {

            hora = parseInt(hora) + 2;
            if (hora > 24) {
                hora = parseInt(hora) - 24;
            }
            hora = hora.toString();
            if (hora.length < 2) {
                hora = 0 + hora;
            }

            $scope.fup.horaFinal = hora + ':' + min;

        }

    }

    // FUNCOES

    // GERAR CODIGO FUP
    $scope.fnGeraCodigoFup = function() {
        if ($scope.fup.codigo == 0) {

            var cliente = $scope.fup.cliente;

            if ($scope.fup.marca !== 0 && $scope.fup.marca !== undefined && $scope.fup.cliente.idCliente !== undefined) {
                parametros = "aMarca=" + $scope.fup.marca + "&aCliente=" + $scope.fup.cliente.idCliente;

                buscaWS.get('/WVDF_WS/ws_hcgs2101.wso/f_fup_pre_save/JSON', parametros).then(function(data) {
                    $scope.fup.codigo = data.ID;
                    console.log(data);
                    // $scope.fup.horaInicial = data.DS;
                    // $scope.fup.horaFinal = data.DS;
                    $('#codigo_fup').val(data.ID);
                    $scope.fup.elaborador = data.DS;
                    var teste = [];

                    teste.push(data.user);
                    $scope.fup.tagPart = teste;
                    $scope.addTag(data.user);

                    // $('#participante_fup').appendVal("," + data.user.id);

                });

            }

        }
    };

    $scope.fnBlurProdutos = function() {
        if ($scope.fup.codigo !== 0) {
            parametros = 'aFup=' + $scope.fup.codigo + '&aUser=' + getVariavelURL('aUsuarioSessao');
            buscaWS.get('/WVDF_WS/ws_hcgs2103.wso/p_pre_save_prods/JSON', parametros).then(function(data) {});
        }
    }

    // SALVA A ACAO COMERCIAL E GERA OS CHECKBOX
    $scope.fnSalvarAcaoC = function(Fup, Acao) {
        if (Fup != '0' && Acao != '') {

            parametros = "aFup=" + Fup + "&aAcaoC=" + Acao;
            buscaWS.get('/WVDF_WS/ws_hcgs2101.wso/f_fup_save_ac/JSON', parametros).then(function(data) {

                if (data.ID !== '0')
                    $scope.fup.solicitadopor = data.ID;
                else
                    $scope.fup.solicitadopor = '1';

                if (data.DS !== '0')
                    $scope.fup.local = data.DS;
                else
                    $scope.fup.local = '1';

            });

            $scope.fnBlurProdutos();
        }
    }

    // ATUALIZAR COMBO MARCAS
    $scope.fnUpdateMarcas = function(cliente) {
        parametros = "sCONTEUDO=" + $scope.fup.marca + "&Cliente=" + cliente.idCliente;
        buscaWS.get('/WVDF_WS/ws_CSAG308.wso/f_fup_csag308_combo/JSON', parametros).then(function(data) {
            $scope.listaMarcas = data;
            $scope.fup.marca = data[0].ID;

            $scope.fnGeraCodigoFup();
        });
    };

    // SELECIONAR PRODUTO
    $scope.fnSelecionaProduto = function(produtoId) {

        parametros = "aFup=" + $scope.fup.codigo + "&aProd=" + produtoId;
        buscaWS.get('/WVDF_WS/WS_HCGS2103.wso/f_hcgs2103_change/JSON', parametros).then(function(data) {

            if (data == '1') {

                $scope.fnMontaPotencial();
                $scope.fnReload();

            }

        });

    };

    //RELOAD NA TELA
    $scope.fnReload = function() {
        // $scope.loadingState = true;
        parametros = "aFup=" + $scope.fup.codigo;
        buscaWS.get('/WVDF_WS/ws_hcgs2103.wso/f_fup_prod/JSON', parametros).then(function(data) {
            $scope.lsProdutos = data;

            $scope.lsProdutos.forEach(function(produto, index) {
                $scope.lsProdutos[index].ID = parseInt($scope.lsProdutos[index].ID);
            })
        });

    }

    // SELECIONAR MOTIVO
    $scope.fnSelecionaMotivo = function(motivoRecnum) {

        parametros = "aRecnum_05=" + motivoRecnum;
        buscaWS.get('/WVDF_WS/WS_HCGS2104.wso/f_hcgs2104_change/JSON', parametros).then(function(data) {

            if (data == '1') {

                $scope.fnReload();

            }

        });

    };

    // PRODUTOS - POTENCIAL ANUAL - VALOR 
    $scope.fnAtualizaPotencialV = function(produtoId, valor) {
        parametros = "aFup=" + $scope.fup.codigo + "&aProd=" + produtoId + "&sPotencial=" + valor;
        buscaWS.get('/WVDF_WS/ws_hcgs2103.wso/f_hcgs2103_potencial_value/JSON', parametros).then(function(data) {});
    };

    // PRODUTOS - POTENCIAL ANUAL - TIPO 
    $scope.fnAtualizaPotencialT = function(produtoId, valor) {
        parametros = "aFup=" + $scope.fup.codigo + "&aProd=" + produtoId + "&sPotencial=" + valor;
        buscaWS.get('/WVDF_WS/ws_hcgs2103.wso/f_hcgs2103_potencial_tipo/JSON', parametros).then(function(data) {});
    };

    // PRODUTOS - POTENCIAL ANUAL - FREQ 
    $scope.fnAtualizaPFrequencia = function(produtoId, valor) {
        parametros = "aFup=" + $scope.fup.codigo + "&aProd=" + produtoId + "&sPotencial=" + valor;
        buscaWS.get('/WVDF_WS/ws_hcgs2103.wso/f_hcgs2103_potencial_freq/JSON', parametros).then(function(data) {});
    };

    //JUSTIFICATIVA DOS MOTIVOS
    $scope.fnJustificaMotivo = function(motivoRecnum, texto) {
        if (texto != "") {
            parametros = "aRecnum_05=" + motivoRecnum + "&aInicio=" + texto;
            buscaWS.get('/WVDF_WS/ws_hcgs2104.wso/f_hcgs2104_justifica/JSON', parametros).then(function(data) {});
        } else {

            parent.parent.alertify.error("Sem Observacao!");
            return;
        }
    };

    //GERA OS MOTIVOS PREVIAMENTE
    $scope.fnBlurMotivos = function() {
        debugger;
        if ($scope.fup.codigo !== 0) {
            parametros = "aFup=" + $scope.fup.codigo + "&aAcaoC=" + $scope.fup.acaocomercial + '&sUser=' + getVariavelURL('aUsuarioSessao');
            buscaWS.get('/WVDF_WS/ws_hcgs2104.wso/p_pre_save_mot/JSON', parametros).then(function(data) {});
        }
    };


    //EMITIR FUP
    $scope.RowClick = function(fupid, Acao) {
        var sPROGRAMA = "pcgs2101_06_1";
        //if (Acao =="C"){sPROGRAMA = "pcgs2101_06_2";}
        //else {sPROGRAMA = "pcgs2101_06_1";}

        var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        var jsUrl = "pcgs2101_06.asp?aCodigo=" + fupid + "&aPrograma=" + sPROGRAMA + "&aUsuarioSessao=" + aUsuarioSessao;

        window.open(jsUrl, '_self');
        sBackColor = "#FAF0E6";
    }


    // SALVAR FUP
    $scope.fnSalvarFup = function(oFup) {

        if ((oFup.local === "3" && oFup.localoutro === "Local...")) {
            parent.parent.alertify.error("Defina o Local");
            return;
        }

        if (oFup.acaocomercial === '') {
            parent.parent.alertify.error("Escolha uma Acao Comercial");
            return;
        }

        if (oFup.local === 0) {
            parent.parent.alertify.error("Escolha um Local");
            return;
        }

        if (oFup.cancelado === 1 && oFup.canceladomotivo === "Motivo...") {
            parent.parent.alertify.error("Defina o Motivo do Cancelamento");
            return;
        }
        if (oFup.dataInicial === '' || oFup.dataFinal === '') {
            parent.parent.alertify.error("Data Invalida");
            return;
        }

        if (oFup.horaInicial === ':' || oFup.horaInicial === '') {
            parent.parent.alertify.error("Horario Invalido");
            return;
        }

        var hora = $scope.fup.horaInicial.substring(0, 2)
        var min = $scope.fup.horaInicial.substring(3, 5)
        if (hora > 24 || hora === '' || hora === '__') {
            parent.parent.alertify.error("Hora Inicial Invalida!");
            return;
        }
        if (min > 59 || min === '__') {
            parent.parent.alertify.error("Hora Inicial Invalida!");
            return;
        }

        oFup.horaFinal = $('#horafinal').val();
        var hora = oFup.horaFinal.substring(0, 2)
        var min = oFup.horaInicial.substring(3, 5)
        if (hora > 24) {
            parent.parent.alertify.error("Hora Final Invalida!");
            return;
        }
        if (min > 59) {
            parent.parent.alertify.error("Hora Final Invalida!");
            return;
        }

        if (oFup.solicitadopor === 0) {
            parent.parent.alertify.error("'Solicitado Por' em Branco");
            return;
        }

        if (oFup.cliente.idCliente != undefined) oFup.auxCliente = oFup.cliente.idCliente;
        debugger;
        oFup.participante = $('#participante_fup').val();

        parametros = 'aFup=' + oFup.codigo;
        parametros = parametros + '&Marca=' + oFup.marca;
        parametros = parametros + '&Cliente=' + oFup.auxCliente;
        parametros = parametros + '&All_day=' + oFup.diainteiro;
        parametros = parametros + '&Cancel=' + oFup.cancelado;
        parametros = parametros + '&DT_PROX=' + oFup.proximavisita;
        parametros = parametros + '&DT_START=' + oFup.dataInicial;
        parametros = parametros + '&DT_END=' + oFup.dataFinal;
        parametros = parametros + '&HR_START=' + oFup.horaInicial;
        parametros = parametros + '&HR_END=' + oFup.horaFinal;
        parametros = parametros + '&Motivo=' + oFup.canceladomotivo;
        parametros = parametros + '&Sol_P=' + oFup.solicitadopor;
        parametros = parametros + '&Sol_L=' + oFup.local;
        parametros = parametros + '&Sol_NM=' + oFup.localoutro;
        parametros = parametros + '&A_C=' + oFup.acaocomercial;
        parametros = parametros + '&Participantes=' + oFup.participante;


        $scope.loadingState = true;
        buscaWS.get('/WVDF_WS/ws_hcgs2101.wso/f_save_fup/JSON', parametros).then(function(data) {
            $scope.fup.codigo = data;

            $scope.fnReload();

            $scope.fup.tela = 1;
            $scope.fup.save = 0;


            $scope.loadingState = false;

            parent.parent.alertify.success("Follow Up Salvo.");
        });

        return;

    };

    //NOVO FOLLOW
    $scope.NewFUP = function() {

        $scope.fup = {};
        $scope.fup.codigo = 0;
        $scope.fup.marca = 0;
        $scope.fup.cliente = {};
        $scope.fup.cliente.ID = 0;
        $scope.fup.cliente.DS = "";
        $scope.fup.acaocomercial = "";
        $scope.fup.solicitadopor = 0;
        $scope.fup.local = 0;
        $scope.fup.localoutro = "Local...";
        $scope.fup.dataInicial = "";
        $scope.fup.horaInicial = "";
        $scope.fup.dataFinal = "";
        $scope.fup.horaFinal = "";
        $scope.fup.diainteiro = 0;
        $scope.fup.cancelado = 0;
        $scope.fup.canceladomotivo = "Motivo...";
        $scope.fup.proximavisita = "";
        $scope.fup.tela = 0;

        if (getVariavelURL('Data')) {
            if ($scope.fup.codigo === 0) {
                $scope.fup.dataInicial = getVariavelURL('Data');
                $scope.fup.dataFinal = getVariavelURL('Data');
            }
        }

    }

    //REMONTA O COMBO DE PRODUTOS
    $scope.fnComboProd = function(aFup) {
        parametros = "aFup=" + aFup;
        buscaWS.get('/WVDF_WS/ws_CCGS210.wso/f_fup_combo_prod/JSON', parametros).then(function(data) {
            $scope.lsProdutosCombo = data;
        });
    }

    //FAZ A CONTAGEM DOS DETALHES POR PRODUTO
    $scope.fnContagemDetalhes = function(aFup, aProd, aMot) {
        parametros = "aFup=" + aFup + "&aProd=" + aProd + "&aMot=" + aMot;
        buscaWS.get('/WVDF_WS/ws_hcgs2105.wso/f_conta_detalhes/JSON', parametros).then(function(data) {
            return data;
        });
    }


    $scope.loadAutocomplete = function(query) {

        var parametros = 'aInicio=' + query;

        data = buscaWS.get('/WVDF_WS/ws_CSAG300.wso/f_UsuarioComplete/JSON', parametros)
            .then(function(data) {

                return data;
            });
        return data;

    };

    $.fn.appendVal = function(newPart) {
        return this.each(function() { $(this).val($(this).val() + newPart); });
    };

    $scope.addTag = function(tag) {

        $('#participante_fup').appendVal("," + tag.id);

        $scope.fup.save = 1;

    }; // -- FIM TAG ADDED

    $scope.tagRemoved = function(tag) {

        var replac = $("#participante_fup").val();
        var subts = replac.replace(("," + tag.id), "");
        $('#participante_fup').val(subts);

        $scope.fup.save = 1;

    };
    // -- FIM TAG REMOVED

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