"use strict";

app.controller('MainCtrl', ['$scope', '$controller', 'toaster', 'WVDF', '$http', function($scope, $controller, toaster, WVDF, $http) {
    console.log("controller on");
    var main = {};
    $scope.common = {};

    $scope.activeTab = 0;
    $scope.tabs = [
        { title: "Info. Geral", icon: "", include: "views/infoGeral.html?cache=" + Math.random(), controller: "", disabled: false, hidden: false },
        { title: "Taxas", icon: "", include: "views/taxas.html?cache=" + Math.random(), controller: "", disabled: false, hidden: false }
    ]

    $scope.combo = {};
    $scope.combo.taxas = {};
    $scope.CRMURL = {};
    $scope.CRMPWD = {};

    main.init = function() {
        $scope.Url = Url;
        $scope.WVDF = WVDF;
        WVDF.ws_csag308.f_fup_csag308_combo(Url.aUsuarioSessao, "", Url.idCliente).then((data) => $scope.combo.marcas = data);
        WVDF.ws_CCGS200.f_CCGS200_combo(Url.aUsuarioSessao).then((data) => $scope.combo.tpOperacao = data);
        WVDF.ws_CCGS202.f_CCGS202_lista(Url.aUsuarioSessao, "").then((data) => $scope.combo.modFrete = data);
        WVDF.ws_HCGS3000.f_combo_incorterm(Url.aUsuarioSessao).then((data) => $scope.combo.incoterm = data);
        WVDF.ws_CCGS204.f_CCGS204_lista(Url.aUsuarioSessao).then((data) => $scope.combo.embarque = data);
        WVDF.ws_hcgs3029.f_combo_pais(Url.aUsuarioSessao).then((data) => $scope.combo.pais = data);
        WVDF.WS_CCGS226.f_CCGS226_freq(Url.aUsuarioSessao).then((data) => $scope.combo.frequencia = data);
        WVDF.ws_CCGS217.f_CCGS217_lista(Url.aUsuarioSessao).then((data) => $scope.combo.equipamento = data);
        WVDF.ws_CCGS203.f_CCGS203_lista(Url.aUsuarioSessao).then((data) => $scope.combo.mercadoria = data);
        WVDF.ws_HCGS3001.buscarTaxasPorClasse('O', Url.aUsuarioSessao).then((data) => $scope.combo.taxas.origem = data);
        WVDF.ws_HCGS3001.buscarTaxasPorClasse('D', Url.aUsuarioSessao).then((data) => $scope.combo.taxas.destino = data);
        WVDF.ws_HCGS3001.buscarTaxasPorClasse('F', Url.aUsuarioSessao).then((data) => $scope.combo.taxas.frete = data);
        WVDF.ws_HCGS3001.buscarTaxas(Url.aUsuarioSessao).then((data) => $scope.combo.taxas.all = data);
        WVDF.ws_ccgs218.buscarMoeda_proposta(Url.aUsuarioSessao).then((data) => $scope.combo.moeda = data);
        WVDF.ws_ccgs220.f_combo_tpcalc(Url.aUsuarioSessao).then((data) => $scope.combo.tpCalculo = data);
        WVDF.ws_ccgs206.listarModPgto(Url.aUsuarioSessao).then((data) => $scope.combo.modPagamento = data);

        WVDF.ws_hcgs3004.f_userprop(Url.aUsuarioSessao).then((data) => $scope.common.permissao = data);
        $scope.common.NetshipValidation = true;

        main.crmFunctions();
        $scope.modal.status.verify();

        $scope.combo.tpTaxa = [
            { id: "O", value: "ORIGEM" },
            { id: "F", value: "FRETE" },
            { id: "D", value: "DESTINO" },
        ];

        WVDF.ws_HCGS3005.fMontaCombo().then((data) => {
            $scope.combo.pkg = data.packingGroup;
            $scope.combo.class = data.classIMO;
            $scope.combo.subrisk = data.subclassIMO;
        });
        $controller('infoGeralCtrl', { $scope: $scope });
        $controller('taxasCtrl', { $scope: $scope });
        $controller('chatCtrl', { $scope: $scope });

    };

    main.crmFunctions = function() {
        WVDF.ws_hcgs3004.buscarCrm(Url.aUsuarioSessao).then(function(data) {
            $scope.CRMURL = data.ID;
            $scope.CRMPWD = data.DS;
        });
    }

    $scope.setDbg = function(value) {
        WVDF.dbg = value;
    }

    $scope.alertify = {
        success: function(message) {
            if (isEmpty(message)) message = " ";
            if (Url.debug || WVDF.dbg) toaster.pop('success', "Sucesso", message, null, 'trustedHtml');
            else parent.parent.alertify.success(message);
        },
        error: function(message) {
            if (isEmpty(message)) message = " ";
            if (Url.debug || WVDF.dbg) toaster.pop('error', "Erro", message, null, 'trustedHtml');
            else parent.parent.alertify.error(message);
        }
    }

    $scope.call = function(ws) {
        return ws.then(function(data) { return data; });
    }

    $scope.common.btnVisualizar = function() {
        WVDF.ws_hcgs3004.f_HCGS3004_Status(Url.idProposta, Url.aUsuarioSessao).then(function(data) {
            if (data == 3) {
                $scope.alertify.error('Proposta em Aguardo!');
                return;
            }
            if (data == 4) {
                $scope.alertify.error('Proposta em Analise!');
                return;
            }
            if (data == 10) {
                $scope.alertify.error('Proposta com Falta de Informacoes!');
                return;
            }
            if (data == 11 || data == 12) {
                $scope.alertify.error('Proposta em Verificacao!');
                return;
            }
            if (data == 5) {
                $scope.alertify.error('Proposta Expirada!');
                return;
            }

            window.open("../PCGS3004_04.asp?aUsuarioSessao=" + Url.aUsuarioSessao + "&idProposta=" + Url.idProposta, 'propostadefrete', 'width=250px');
        });
    }

    $scope.modal = {
        status: {
            data: {},
            open: (status) => {
                $scope.modal.status.data.status = status;
                $("#status").modal('show')
            },
            close: () => null,
            save: function(value) {
                console.log(value);
                // debugger;
                WVDF.ws_hcgs3004.f_att_status(Url.idProposta, value.id, Url.aUsuarioSessao).then(function(data) {
                    // debugger;
                    console.log(value);
                    $scope.info.form.statusProp = value;
                    $scope.alertify.success("Status Alterado!");
                     $scope.modal.status.verify();
                });
            },
            verify: function() {
                if (!Url.idProposta) return;
                WVDF.ws_hcgs3004.fStatusVerify(Url.idProposta, Url.aUsuarioSessao).then(function(data) {
                    console.log(data);
                    // debugger;
                    $scope.info.form.statusProp = [];
                    $scope.info.form.statusProp.id = data.ID;
                    $scope.info.form.statusProp.value = data.DS;
                });
            }
        },
        arquivos: {
            open: () => {
                $('#arquivos iframe').attr('src', '../PCGS3040_10.asp?aUsuarioSessao=' + Url.aUsuarioSessao + '&Nm_Tabela=HCGS3004&idProposta=' + Url.idProposta);
                $("#arquivos").modal('show');
            },
            close: () => null,
        },
        mensagens: {
            open: () => $("#mensagens").modal('show'),
            close: () => null,
        },
        historico: {
            open: () => $("#historico").modal('show'),
            close: () => null,
        },
        editarTaxa: {
            data: {},
            open: () => {
                debugger;
                WVDF.ws_hcgs3004.f_proposta_editartaxa(Url.idProposta, Url.aUsuarioSessao).then(function(data) {
                    debugger;
                    console.log(data);
                    $scope.modal.editarTaxa.data = data;
                    // $scope.modal.editarTaxa.data.validadeDe     = $scope.info.form.validadeDe;
                    // $scope.modal.editarTaxa.data.validadeAte    = $scope.info.form.validadeAte;
                });

                // $scope.modal.editarTaxa.data.agenteOri      = $scope.info.form.ageOri;
                // $scope.modal.editarTaxa.data.agenteDest     = $scope.info.form.ageDes;
                // $scope.modal.editarTaxa.data.armador        = $scope.info.form.armador;
                // $scope.modal.editarTaxa.data.transitTime    = $scope.info.form.transitTime;
                // $scope.modal.editarTaxa.data.freeTime       = $scope.info.form.freetime;
                // $scope.modal.editarTaxa.data.concorrentes   = $scope.info.form.concorrentes;
                // $scope.modal.editarTaxa.data.frequencia     = $scope.info.form.frequencia.ID;
                // $scope.modal.editarTaxa.data.ftarmador      = $scope.info.form.ftarmador;
                // $scope.modal.editarTaxa.data.validadeDe     = $scope.info.form.validadeDe;
                // $scope.modal.editarTaxa.data.validadeAte    = $scope.info.form.validadeAte;

                $("#editarTaxa").modal('show')
            },
            close: () => null,
            save: (form) => {
                debugger;
                var agenteO = 0;
                var agenteD = 0;
                var armador = 0;
                var frequencia = 0;
                if (form.agenteOri !== undefined) agenteO = form.agenteOri.id;
                if (form.agenteDest !== undefined) agenteD = form.agenteDest.id;
                if (form.armador !== undefined) armador = form.armador.id;
                if (form.frequencia !== undefined) frequencia = form.frequencia.ID;

                var json = {
                    // "CSAG325_VIA": "",
                    "FREQUENCIA": frequencia,
                    "VALIDADE_INICIO": form.validadeDe,
                    "VALIDADE_TERMINO": form.validadeAte,
                    "TRANSITTIME": form.transitTime,
                    "FREETIME": form.freeTime,
                    "CARRIER_ID": armador,
                    "ID_PROPOSTA": Url.idProposta,
                    // "TAXASARMADOR ": form.taxasArmador,
                    "CSAG345_AGENTE_ORIGEM": agenteO,
                    "CSAG345_AGENTE_DESTINO": agenteD,
                    "CONCORRENTE": ''//form.concorrentes.sRecnum,
                };

                $http({
                    method: 'PATCH',
                    url: $scope.CRMURL + 'api/cross/proposta',
                    data: json
                }).then(function success(response) {
                    debugger;
                    $scope.alertify.success('Salvo com sucesso!');
                    // $scope.info.form.armador.value = form.armador.value;
                    // $scope.info.form.transitTime = form.transitTime;
                    // $scope.info.form.freetime = form.freeTime;

                    $scope.info.form.agenteOri = $scope.modal.editarTaxa.data.agenteOri.value
                    $scope.info.form.agenteDest = $scope.modal.editarTaxa.data.agenteDest.value
                    $scope.info.form.armador = $scope.modal.editarTaxa.data.armador;
                    $scope.info.form.transitTime = $scope.modal.editarTaxa.data.transitTime;
                    $scope.info.form.freetime = $scope.modal.editarTaxa.data.freeTime;
                    // $scope.info.form.concorrentes = $scope.modal.editarTaxa.data.concorrentes;
                    // $scope.info.form.frequencia = $scope.modal.editarTaxa.data.frequencia;
                    $scope.info.form.ftarmador = $scope.modal.editarTaxa.data.ftarmador;
                    $scope.info.form.validadeDe = $scope.modal.editarTaxa.data.validadeDe;
                    $scope.info.form.validadeAte = $scope.modal.editarTaxa.data.validadeAte;
                }, function error(response) {
                    debugger;
                    $scope.alertify.error('Erro ao Salvar!');
                });
            }
        },
        gerarAcordo: {
            data: {
                clientes: [],
                table: {
                    origem: [],
                    destino: [],
                    frete: [],
                }
            },
            checkAll: function(value) {
                for (var i = $scope.modal.gerarAcordo.data.table.origem.length - 1; i >= 0; i--)
                    $scope.modal.gerarAcordo.data.table.origem[i].aplicar = value;
                for (var i = $scope.modal.gerarAcordo.data.table.frete.length - 1; i >= 0; i--)
                    $scope.modal.gerarAcordo.data.table.frete[i].aplicar = value;
                for (var i = $scope.modal.gerarAcordo.data.table.destino.length - 1; i >= 0; i--)
                    $scope.modal.gerarAcordo.data.table.destino[i].aplicar = value;
            },
            setCheckAll: function(taxas) {
                for (var i = $scope.modal.gerarAcordo.data.table.origem.length - 1; i >= 0; i--)
                    if (!$scope.modal.gerarAcordo.data.table.origem[i].aplicar) return;
                for (var i = $scope.modal.gerarAcordo.data.table.frete.length - 1; i >= 0; i--)
                    if (!$scope.modal.gerarAcordo.data.table.frete[i].aplicar) return;
                for (var i = $scope.modal.gerarAcordo.data.table.destino.length - 1; i >= 0; i--)
                    if (!$scope.modal.gerarAcordo.data.table.destino[i].aplicar) return;

                $scope.modal.gerarAcordo.data.table._checkAll = true;
            },
            gerarAcordo: function(form) {
                form = cloneObj(form);
                if (form.table) {
                    var table = form.table.origem.filter(arr => arr.aplicar == true);
                    table = table.concat(form.table.frete.filter(arr => arr.aplicar == true));
                    table = table.concat(form.table.destino.filter(arr => arr.aplicar == true));
                    table = table.map(arr => arr.recId);
                    form.aplicar = table;
                    delete form.table;
                }
                debugger;
                console.log(JSON.stringify(form));
                WVDF.ws_HCGS3033.fNewConvertToAgreement(form, Url.idProposta, Url.aUsuarioSessao).then(function(data) {
                    if (!data.defaultMessage.hasError) {
                        $scope.alertify.success(data.defaultMessage.msgInfo);
                    } else {
                        $scope.alertify.error(data.defaultMessage.msgError);
                    }
                });
            },
            open: (taxas, cliente, validadeDe, validadeAte) => {
                if (cliente) {
                    WVDF.ws_CSAG340.f_proposta_complete_client(cliente, Url.aUsuarioSessao).then(function(data) {
                        if (data) $scope.modal.gerarAcordo.data.clientes.push(data[0]);
                    })
                }
                if (validadeDe)
                    $scope.modal.gerarAcordo.data.dtInicial = cloneObj(validadeDe);
                if (validadeAte)
                    $scope.modal.gerarAcordo.data.dtFinal = cloneObj(validadeAte);
                if (taxas) {
                    taxas = cloneObj(taxas);
                    taxas.origem = taxas.origem.filter(arr => arr.tabela == 'HCGS3000');
                    taxas.destino = taxas.destino.filter(arr => arr.tabela == 'HCGS3000');
                    taxas.frete = taxas.frete.filter(arr => arr.tabela == 'HCGS3000');

                    $scope.modal.gerarAcordo.data.table = taxas;

                    if ($scope.modal.gerarAcordo.data.table.origem.length > 0) $scope.origem_statusN = true;
                    if ($scope.modal.gerarAcordo.data.table.frete.length > 0) $scope.frete_statusN = true;
                    if ($scope.modal.gerarAcordo.data.table.destino.length > 0) $scope.destino_statusN = true;
                }

                $scope.modal.gerarAcordo.setCheckAll($scope.modal.gerarAcordo.data.table);

                $("#gerarAcordo").modal('show');
            },
            close: () => null,
        },
        netnet: {
            data: {
                table: {
                    origem: [],
                    destino: [],
                    frete: [],
                }
            },
            checkAll: function(value) {
                for (var i = $scope.modal.netnet.data.table.origem.length - 1; i >= 0; i--)
                    $scope.modal.netnet.data.table.origem[i].aplicar = value;
                for (var i = $scope.modal.netnet.data.table.frete.length - 1; i >= 0; i--)
                    $scope.modal.netnet.data.table.frete[i].aplicar = value;
                for (var i = $scope.modal.netnet.data.table.destino.length - 1; i >= 0; i--)
                    $scope.modal.netnet.data.table.destino[i].aplicar = value;
            },
            setCheckAll: function(taxas) {
                for (var i = $scope.modal.netnet.data.table.origem.length - 1; i >= 0; i--)
                    if (!$scope.modal.netnet.data.table.origem[i].aplicar) return;
                for (var i = $scope.modal.netnet.data.table.frete.length - 1; i >= 0; i--)
                    if (!$scope.modal.netnet.data.table.frete[i].aplicar) return;
                for (var i = $scope.modal.netnet.data.table.destino.length - 1; i >= 0; i--)
                    if (!$scope.modal.netnet.data.table.destino[i].aplicar) return;

                $scope.modal.netnet.data.table._checkAll = true;
            },
            netnet: function(form) {
                form = cloneObj(form);
                if (form.table) {
                    var table = form.table.origem.filter(arr => arr.aplicar == true);
                    table = table.concat(form.table.frete.filter(arr => arr.aplicar == true));
                    table = table.concat(form.table.destino.filter(arr => arr.aplicar == true));
                    table = table.map(arr => arr.recId);
                    form.aplicar = table;
                    delete form.table;
                }

                WVDF.ws_hcgs3006.f_apply_netnet(form, Url.idProposta, Url.aUsuarioSessao).then(function(data) {
                    if (!data.defaultMessage.hasError) {
                        $scope.alertify.success(data.defaultMessage.msgInfo);
                        if (Url.idProposta) $scope.taxa.table.load(Url.idProposta);
                        else if (Url.idClone) $scope.taxa.table.load(Url.idClone);
                        $('#netnet').modal('hide');
                    } else {
                        $scope.alertify.error(data.defaultMessage.msgError);
                    }
                });
            },
            open: (taxas) => {
                if (taxas) {
                    $scope.modal.netnet.data.table = cloneObj(taxas);

                    if ($scope.modal.netnet.data.table.origem.length > 0) $scope.origem_statusNE = true;
                    if ($scope.modal.netnet.data.table.frete.length > 0) $scope.frete_statusNE = true;
                    if ($scope.modal.netnet.data.table.destino.length > 0) $scope.destino_statusNE = true;
                }

                $scope.modal.netnet.setCheckAll($scope.modal.netnet.data.table);
                $("#netnet").modal('show');
            },
            close: () => null,
        },
        detalhesAvancados: {
            data: {},
            open: (model) => {
                model.editable = true;
                $('#detalhesAvancados').one('hidden.bs.modal', () => {
                    $scope.modal.detalhesAvancados.close();
                    $scope.$digest();
                });
                if (!model.detalhes) model.detalhes = { mercadorias: [] };
                $scope.modal.detalhesAvancados.data = model.detalhes;
                $("#detalhesAvancados").modal('show');
            },
            close: () => {
                for (var i = $scope.modal.detalhesAvancados.data.mercadorias.length - 1; i >= 0; i--)
                    if ($scope.modal.detalhesAvancados.data.mercadorias[i].editable) {
                        if (!$scope.modal.detalhesAvancados.data.mercadorias[i].aRecnum)
                            $scope.modal.detalhesAvancados.deleteRow(i);
                        else
                            $scope.modal.detalhesAvancados.data.mercadorias[i].editable = false;

                    }
            },
            addRow: () => {
                var novo = {
                    mercadoria: '',
                    descricao: '',
                    ncm: '',
                    un: '',
                    pkg: '',
                    class: '',
                    subrisk: '',
                    editable: true,
                }
                $scope.modal.detalhesAvancados.data.mercadorias.unshift(novo);
            },
            deleteRow: (index) => {
                WVDF.ws_hsag560.pDelMercadoria($scope.modal.detalhesAvancados.data.mercadorias[index].srecnum, Url.aUsuarioSessao).then(function(data) {
                    console.log(data);
                    $scope.modal.detalhesAvancados.data.mercadorias.splice(index, 1);
                })
            }
        },
        via: {
            data: {},
            selectedData: null,
            checkChange: function(row) {
                if (!row.status) return;
                if ($scope.modal.via.selectedData != null)
                    $scope.modal.via.selectedData.status = false;
                $scope.modal.via.selectedData = row;
            },
            open: function() {
                WVDF.ws_hcgs3004.fChoosePathFcl(Url.idProposta, Url.aUsuarioSessao).then(function(data) {
                    if (data.length == 0) {
                        $scope.alertify.error("Rota nao encontrada! Proposta enviada para Analise do Pricing.")
                        if (Url.idProposta) $scope.info.load(Url.idProposta);
                        else if (Url.idClone) $scope.info.load(Url.idClone);
                        $scope.taxa.init();
                    } else {
                        console.log(data);
                        data.forEach(function(element, index) {
                            element.sVia = element.sVia.replaceAll("(OF)", "<i class='fa fa-ship'></i>")
                                .replaceAll("(DTA)", '<i class="fa fa-truck" style="transform: scaleX(-1);"></i>')
                        })

                        $scope.modal.via.data = cloneObj(data);
                        $('#via').modal('show');
                    }
                });

            },
            save: function() {
                if ($scope.modal.via.selectedData == undefined || $scope.modal.via.selectedData == null) {
                    $scope.alertify.error("Selecione uma via");
                    return;
                } else {
                    $scope.alertify.success("Calculando Proposta!");
                    // return;
                }
                $('#via').modal('hide');
                $scope.loadingState = true;
                WVDF.ws_hcgs3006.fPatchChosenFcl(Url.idProposta, $scope.modal.via.selectedData.sRecnum1, $scope.modal.via.selectedData.sRecnum2, Url.aUsuarioSessao).then(function(data) {
                    if (Url.idProposta) $scope.info.load(Url.idProposta);
                    else if (Url.idClone) $scope.info.load(Url.idClone);
                    $scope.taxa
                    $scope.activeTab = 1;
                });

            }
        },
        taxasArmador: {
            data: {},
            open: function(taxas) {

            },
        },
        negociacao: {
            data: {},
            startTable: [],
            options: ['Aceitar', 'Recusar', 'Contra-Proposta'],
            open: (taxas) => {

                WVDF.ws_hcgs3006.f_negociationFcl(Url.idProposta, Url.aUsuarioSessao).then(function(data) {

                    var tx = data.negociation;
                    // var taxaClone = cloneObj(taxas);
                    // tx = taxaClone.origem.concat(taxaClone.frete).concat(taxaClone.destino);
                    tx = tx.map(function(item) {
                        delete item.N_Status;
                        delete item.N_Value;
                        delete item.IdOrigem;
                        delete item.aplicar;
                        delete item.bAutorizado;
                        delete item.bTarifario;
                        delete item.idProposta;
                        delete item.compra;
                        delete item.N_Moeda;
                        delete item.venda.descricao;

                        return item;
                    });
                    $scope.modal.negociacao.data.dt_new = data.dt_new;
                    $scope.modal.negociacao.data.recusa = false;
                    $scope.modal.negociacao.data.contraProposta = false;
                    $scope.modal.negociacao.data.aUsuarioSessao = Url.aUsuarioSessao;
                    $scope.modal.negociacao.data.idProposta = Url.idProposta;
                    $scope.modal.negociacao.data.table = tx;
                    $scope.modal.negociacao.startTable = cloneObj(tx);
                    console.log(tx);
                });
                $("#negociacao").modal('show');
            },
            aceitar: function() {
                $scope.modal.negociacao.data.contraProposta = false;
                $scope.modal.negociacao.data.recusa = false;
                for (var i = $scope.modal.negociacao.data.table.length - 1; i >= 0; i--) {
                    $scope.modal.negociacao.data.table[i].option = {};
                    $scope.modal.negociacao.data.table[i].option = 'Aceitar';
                }
            },
            recusar: function() {
                $scope.modal.negociacao.data.contraProposta = false;
                $scope.modal.negociacao.data.recusa = true;
                for (var i = $scope.modal.negociacao.data.table.length - 1; i >= 0; i--) {
                    $scope.modal.negociacao.data.table[i].option = {};
                    $scope.modal.negociacao.data.table[i].option = 'Recusar';
                }

                //$("#txtmotivo").focus();
            },
            contraProposta: function() {
                $scope.modal.negociacao.data.contraProposta = true;
                $scope.modal.negociacao.data.recusa = false;

                for (var i = $scope.modal.negociacao.data.table.length - 1; i >= 0; i--) {
                    $scope.modal.negociacao.data.table[i].option = {};
                    $scope.modal.negociacao.data.table[i].option = 'Contra-Proposta';
                }
            },
            save: function(value) {
                $scope.loadingState = true;
                var i, j, temparray, chunk = 10;
                for (i = 0, j = value.table.length; i < j; i += chunk) {
                    var payload = {
                        'aUsuarioSessao': Url.aUsuarioSessao,
                        'idProposta': Url.idProposta,
                        'validadeOption': value.validadeOption,
                        'dt_new': value.dt_new,
                        'table': [],
                    }
                    temparray = value.table.slice(i, i + chunk);
                    payload.table = temparray;
                    WVDF.ws_hcgs3006.f_dealrespFcl(payload).then(function(data) {
                        if (!data.hasError) {
                            $scope.alertify.success(data.msgInfo);
                        } else {
                            $scope.alertify.error(data.msgError);
                        }
                        $scope.taxa.init();
                    });
                }
            },
            close: () => null,
        },
        abrirNegociacao: {
            data: {},
            open: (taxas) => {
                console.log(taxas);
                var tx = [];
                var taxaClone = cloneObj(taxas);
                tx = taxaClone.origem.concat(taxaClone.frete).concat(taxaClone.destino);
                tx = tx.map(function(item) {
                    delete item.N_Status;
                    delete item.N_Value;
                    delete item.IdOrigem;
                    delete item.aplicar;
                    delete item.bAutorizado;
                    delete item.bTarifario;
                    delete item.idProposta;
                    delete item.compra;
                    delete item.N_Moeda;
                    delete item.venda.descricao;

                    return item;
                });
                $scope.modal.abrirNegociacao.data.aUsuarioSessao = Url.aUsuarioSessao;
                $scope.modal.abrirNegociacao.data.idProposta = Url.idProposta;
                $scope.modal.abrirNegociacao.data.table = tx;
                console.log(tx);
                $("#abrirNegociacao").modal('show')
            },
            save: function(value) {
                $scope.loadingState = true;
                var i, j, temparray, chunk = 10;
                for (i = 0, j = value.table.length; i < j; i += chunk) {
                    var payload = {
                        'aUsuarioSessao': Url.aUsuarioSessao,
                        'idProposta': Url.idProposta,
                        'dt_new': value.dt_new,
                        'concorrente': value.concorrente,
                        'table': [],
                    }
                    temparray = value.table.slice(i, i + chunk);
                    payload.table = temparray;
                    console.log(JSON.stringify(payload));
                    WVDF.ws_hcgs3006.f_taxdealsFcl(payload).then(function(data) {
                        if (!data.hasError) {
                            $scope.alertify.success(data.msgInfo);
                        } else {
                            $scope.alertify.error(data.msgError);
                        }
                        $scope.modal.status.verify();
                        $scope.taxa.init();
                    });
                }
            },
            close: () => null,
        }
    }

    main.init();
}]);