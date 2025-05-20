angular.module('2WA', []);
angular.module('2WA').factory('WVDF', ['$http', function($http) {
    function $$callGetJson(path, params) {
        if (WVDF_ws.dbg) { console.log(params); }
        return $http.get(path, { params: params }).then(function(response) { if (WVDF_ws.dbg) { console.log(response.data); } return response.data });
    }

    function $$callPostJson(path, params) {
        if (WVDF_ws.dbg) { console.log(params); }
        return $http.post(path, JSON.stringify(params)).then(function(response) { if (WVDF_ws.dbg) { console.log(response.data); } return response.data });
    }

    var WVDF_ws = {
        ws_HCGS3033: {
            fNewConvertToAgreement: function(value, idProposta, aUsuarioSessao) {
                value.aUsuarioSessao = aUsuarioSessao;
                value.idProposta = idProposta;
                return $$callGetJson('/WVDF_WS/ws_HCGS3033.wso/fNewConvertToAgreement/JSON', { 'sJSON': value });
            }
        },
        ws_hcgs3008: {
            fSupervisorCombo: function(aUsuarioSessao, sBookingId) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao,
                    'sBookingId': sBookingId
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fSupervisorCombo/JSON', params);
            },
            fGeraBookingProtocol: function(sProposta, aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao,
                    'sProposta': sProposta
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fGeraBookingProtocol/JSON', params);
            },
            fSaveNetShip: function() {
                // PERGUNTAR AO LEONARDO SOBRE A PARAMETRIZAÇÃO
            },
            pSaveRefNS: function() {
                // PERGUNTAR
            },
            fGeraBookingSI: function(sProposta, aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao,
                    'sProposta': sProposta
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fGeraBookingSI/JSON', params);
            },
            fSaveNetShipSI: function() {
                // PERGUNTAR
            },
            pSaveRefNS: function() {
                // PERGUNTAR
            },
            fGeraBookingProtoConsol: function(sProposta, aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao,
                    'sProposta': sProposta
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fGeraBookingSI/JSON', params);
            },
            fSaveNetConsol: function() {
                // PERGUNTAR
            },
            fNavio_descricao: function(sInicial, sSessionId) {
                var params = {
                    'sSessionId': sSessionId,
                    'sInicial': sInicial
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fNavio_descricao/JSON', params);
            },
            fDocumentacao_pessoa: function(sInicial, sSessionId) {
                var params = {
                    'sSessionId': sSessionId,
                    'sInicial': sInicial
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fDocumentacao_pessoa/JSON', params);
            },
            pAutomaticSave_CustServ: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_CustServ/JSON', params);
            },
            fSaveOneContact: function(sBookingId, sTipo, aPessoa, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sTipo': sTipo,
                    'aPessoa': aPessoa,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fSaveOneContact/JSON', params);
            },
            pAutomaticSave_PrevSaida: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sTipo,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_PrevSaida/JSON', params);
            },
            fAutomaticSave_ClienteHBL: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sTipo,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ClienteHBL/JSON', params);
            },
            fAutomaticSave_PartLote: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sTipo,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_PartLote/JSON', params);
            },
            pAutomaticSave_LocalHBL: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sTipo,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_LocalHBL/JSON', params);
            },
            pAutomaticSave_VendaOD: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sTipo,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_VendaOD/JSON', params);
            },
            pAutomaticSave_Reserva: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sTipo,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_Reserva/JSON', params);
            },
            pAutomaticSave_HBL: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sTipo,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/pAutomaticSave_HBL/JSON', params);
            },
            fInfoBooking: function(sBookingId, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fInfoBooking/JSON', params);
            },
            fAutomaticSave_BlArmador: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_BlArmador/JSON', params);
            },
            fAutomaticSave_ObsReserva: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ObsReserva/JSON', params);
            },
            fAutomaticSave_ObsInterna: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ObsInterna/JSON', params);
            },
            fAutomaticSave_ObsDesk: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_ObsDesk/JSON', params);
            },
            fAutomaticSave_nrContratoArmador: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_nrContratoArmador/JSON', params);
            },
            fAutomaticSave_refArmador: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_refArmador/JSON', params);
            },
            fAutomaticSave_localCarga: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_localCarga/JSON', params);
            },
            fAutomaticSave_localDoc: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3008.wso/fAutomaticSave_localDoc/JSON', params);
            }
        },

        ws_ccgs218: {
            buscarMoeda_proposta: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_ccgs218.wso/buscarMoeda_proposta/JSON', params);
            }
        },

        ws_ccgs225: {
            f_CCGS225_combo: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_ccgs225.wso/f_CCGS225_combo/JSON', params);
            },
            f_CCGS225_busca: function(descricaoSI, aUsuarioSessao) {
                var params = {
                    'descricaoSI': descricaoSI,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_ccgs225.wso/f_CCGS225_busca/JSON', params);
            }
        },
        ws_csag308: {
            f_fup_csag308_combo: function(aUsuarioSessao, sCONTEUDO, Cliente) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao,
                    'sCONTEUDO': sCONTEUDO,
                    'Cliente': Cliente
                }
                return $$callGetJson('/WVDF_WS/ws_csag308.wso/f_fup_csag308_combo/JSON', params);
            }
        },
        ws_ccgs206: {
            listarModPgto: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_ccgs206.wso/listarModPgto/JSON', params);
            }
        },
        ws_CCGS204: {
            f_CCGS204_lista: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_CCGS204.wso/f_CCGS204_lista/JSON', params);
            }
        },
        ws_CCGS203: {
            f_CCGS203_lista: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON', params);
            }
        },
        ws_CCGS202: {
            f_CCGS202_lista: function(aUsuarioSessao, sProduto) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao,
                    'sProduto': sProduto
                }
                return $$callGetJson('/WVDF_WS/ws_CCGS202.wso/f_CCGS202_lista/JSON', params);
            }
        },
        ws_CCGS200: {
            f_CCGS200_combo: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_CCGS200.wso/f_CCGS200_combo/JSON', params);
            }
        },
        ws_HCGS3000: {
            f_combo_incorterm: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_HCGS3000.wso/f_combo_incorterm/JSON', params);
            }
        },
        ws_hcgs3029: {
            f_combo_pais: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON', params);
            }
        },
        ws_ccgs219: {
            f_prop_combo: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_ccgs219.wso/f_prop_combo/JSON', params);
            }
        },
        ws_CCGS217: {
            f_CCGS217_lista: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_CCGS217.wso/f_CCGS217_lista/JSON', params);
            }
        },
        ws_ccgs220: {
            f_combo_tpcalc: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_ccgs220.wso/f_combo_tpcalc/JSON', params);
            }
        },
        ws_CCGS228: {
            f_CCGS228_pkg_type: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_CCGS228.wso/f_CCGS228_pkg_type/JSON', params);
            }
        },
        ws_hsag558: {
            f_listacomments: function(aProp, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag558.wso/f_listacomments/JSON', params);
            },
            f_savecomments: function(aProp, msg, stats, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'msg': msg,
                    'stats': stats,
                    'aUsuarioSessao': aUsuarioSessao
                }

                return $$callGetJson('/WVDF_WS/ws_hsag558.wso/f_savecomments/JSON', { 'sJSON': JSON.stringify(params) });
            },
            f_full_msgs: function(aProp, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag558.wso/f_full_msgs/JSON', params);
            }
        },
        ws_hcgs3006: {
            ftaxas_armador: function(sPropostaId, aUsuarioSessao) {
                var params = {
                    'sPropostaId': sPropostaId,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/ftaxas_armador/JSON', params);
            },
            f_apply_netnet: function(table, idProposta, aUsuarioSessao) {
                var params = {
                    "idProposta": idProposta,
                    "aUsuarioSessao": aUsuarioSessao,
                    "aplicar": table
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/f_apply_netnet/JSON', { 'sJSON': params });
            },
            fPatchChosen: function(sProposta, sRecnum1, sRecnum2, aUsuarioSessao) {
                var params = {
                    'sProposta': sProposta,
                    'sRecnum1': sRecnum1,
                    'sRecnum2': sRecnum2,
                    'aUsuarioSessao': aUsuarioSessao
                };
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/fPatchChosen/JSON', params);
            },
            fPatchChosenFcl: function(sProposta, sRecnum1, sRecnum2, aUsuarioSessao) {
                var params = {
                    'sProposta': sProposta,
                    'sRecnum1': sRecnum1,
                    'sRecnum2': sRecnum2,
                    'aUsuarioSessao': aUsuarioSessao
                };
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/fPatchChosenFcl/JSON', params);
            },
            f_hcgs3006_rel: function(aProp, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/f_hcgs3006_rel/JSON', params);
            },
            f_hcgs3006_rpt: function(aProp, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/f_hcgs3006_rpt/JSON', params);
            },
            f_taxdeals: function() {
                // PERGUNTAR
            },
            f_taxdealsFcl: function(data) {
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/f_taxdealsFcl/JSON', { 'aJSON': data });
            },
            f_apl_cacl: function(aPROP, aUsuarioSessao) {
                var params = {
                    'aProp': sPropostaId,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/f_apl_cacl/JSON', params);
            },
            fcl_change_line: function(form, classe, idProposta, aUsuarioSessao) {
                form.idProposta = idProposta;
                form.classe = classe;
                form.aUsuarioSessao = aUsuarioSessao;
                var params = { 'aJSON': form };
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/fcl_change_line/JSON', params);
            },
            f_check_tax: function(sRecnum, aStatus, aUsuarioSessao) {
                var params = {
                    'sRecnum': sRecnum,
                    'aStatus': aStatus,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/f_check_tax/JSON', params);
            },
            f_dealresp: function(sRecnum, aStatus, aUsuarioSessao) {
                // PERGUNTAR
            },
            f_dealrespFcl: function(data) {
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/f_dealrespFcl/JSON', { 'aJson': data });
            },
            f_negociation: function(aProposta, aUsuarioSessao) {
                var params = {
                    'aProposta': aProposta,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/f_negociation/JSON', params);
            },
             f_negociationFcl: function(aProposta, aUsuarioSessao) {
                var params = {
                    'aProposta': aProposta,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3006.wso/f_negociationFcl/JSON', params);
            }
        },
        WS_CCGS226: {
            f_CCGS226_freq: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/WS_CCGS226.wso/f_CCGS226_freq/JSON', params);
            }
        },
        ws_CSAG340: {
            f_proposta_complete_client: function(sInicio, aUsuarioSessao) {
                var params = {
                    'sInicio': sInicio,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_CSAG340.wso/f_proposta_complete_client/JSON', params);
            },
            f_fup_concorrente: function(sInicio, aUsuarioSessao) {
                var params = {
                    'sInicio': sInicio,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_CSAG340.wso/f_fup_concorrente/JSON', params);
            }
        },
        ws_hcgs2101_01: {
            f_DescricaoCSAG340: function(sCodigo, aUsuarioSessao) {
                var params = {
                    'sCodigo': sCodigo,
                    'sUSUARIOSESSAO': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG340/JSON', params);
            }
        },
        ws_csag309: {
            f_idiomas_literais: function(sPrograma, aUsuarioSessao) {
                var params = {
                    'sPrograma': sPrograma,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_csag309.wso/f_idiomas_literais/JSON', params);
            }
        },
        ws_log3040: {
            fCountLog3040: function(sTabela, idProposta, aUsuarioSessao) {
                var params = {
                    'sTabela': sTabela,
                    'idProposta': idProposta,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_log3040.wso/fCountLog3040/JSON', params);
            }
        },
        ws_hcgs3007: {
            f_del_comissao: function(sRecnum, aUsuarioSessao) {
                var params = {
                    'sRecnum': sRecnum,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3007.wso/f_del_comissao/JSON', params);
            },
            f_lista_comissao: function(aProp, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3007.wso/f_del_comissao/JSON', params);
            },
            f_save_comissao: function(form, idProposta, aUsuarioSessao) {
                form.idProposta = idProposta;
                form.aUsuarioSessao = aUsuarioSessao;

                return $$callGetJson('/WVDF_WS/ws_hcgs3007.wso/f_save_comissao/JSON', { 'sJSON': form });
            },
            f_lista_comissao_new: function(aProp, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3007.wso/f_lista_comissao_new/JSON', params);
            },
            f_save_comissao_new: function(form, idProposta, aUsuarioSessao) {
                form.idProposta = idProposta;
                form.aUsuarioSessao = aUsuarioSessao;

                return $$callGetJson('/WVDF_WS/ws_hcgs3007.wso/f_save_comissao_new/JSON', { 'sJSON': form });
            },
            f_del_comissao_new: function() {

            }
        },
        ws_hcgs3004: {
            f_busca_proposta: function(aPROPOSTA_ID, aUsuarioSessao) {
                var params = {
                    'aPROPOSTA_ID': aPROPOSTA_ID,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/f_busca_proposta/JSON', params);
            },
            f_proposta_preenchimento: function(sPropostaId, aUsuarioSessao) {
                var params = {
                    'sPropostaId': sPropostaId,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/f_proposta_preenchimento/JSON', params);
            },
            f_proposta_editartaxa: function(sPropostaId, aUsuarioSessao) {
                var params = {
                    'sPropostaId': sPropostaId,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/f_proposta_editartaxa/JSON', params);
            },
            fSalveEditBook: function() {
                // PERGUNTAR AO LEONARDO SOBRE A PARAMETRIZAÇÃO
            },
            fReferences: function(model, aUsuarioSessao) {
                model.aUsuarioSessao = aUsuarioSessao;
                var params = { 'sJSON': model };
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/fReferences/JSON', params);
            },
            fclReferences: function(model, aUsuarioSessao) {
                model.aUsuarioSessao = aUsuarioSessao;
                var params = { 'sJSON': model };
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/fclReferences/JSON', params);
            },
            f_HCGS3004_Status: function(aProp, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/f_HCGS3004_Status/JSON', params);
            },
            f_kg_cbm: function(aProp, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/f_kg_cbm/JSON', params);
            },
            f_validade: function(dValidade, aUsuarioSessao) {
                var params = {
                    'dValidade': dValidade,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/f_validade/JSON', params);
            },
            fGravarHCGS3004: function(model, aUsuarioSessao) {
                model.aUsuarioSessao = aUsuarioSessao;
                var params = { 'sJSON': model };
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/fGravarHCGS3004/JSON', params);
            },
            fMontaSchedule: function(aProposta, aUsuarioSessao) {
                var params = {
                    'aProposta': aProposta,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/fMontaSchedule/JSON', params);
            },
            fRetornoMsg: function(aProp, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/fRetornoMsg/JSON', params);
            },
            f_userprop: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/f_userprop/JSON', params);
            },
            fChoosePath: function(idProposta, aUsuarioSessao) {
                var params = {
                    'sProposta': idProposta,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/fChoosePath/JSON', params);
            },
            fChoosePathFcl: function(idProposta, aUsuarioSessao) {
                var params = {
                    'sProposta': idProposta,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/fChoosePathFcl/JSON', params);
            },
            propostaCarrier: function(sPol, sPod, sVia, sMod, aUsuarioSessao) {
                var params = {
                    'sPol': sPol,
                    'sPod': sPod,
                    'sVia': sVia,
                    'sMod': sMod,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/propostaCarrier/JSON', params);
            },
            buscarCrm: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/buscarCrm/JSON', params);
            },
            fAutomaticSave_ftArmador: function(sPropostaId, sValor, aUsuarioSessao) {
                var params = {
                    'sPropostaId': sPropostaId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/fAutomaticSave_ftArmador/JSON', params);
            },
            fAutomaticSave_ftCliente: function(sPropostaId, sValor, aUsuarioSessao) {
                var params = {
                    'sPropostaId': sPropostaId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/fAutomaticSave_ftCliente/JSON', params);
            },
            f_att_status: function(aProp, aStatus, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aStatus': aStatus,
                    'aPrograma': 'Usuario',
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/f_att_status/JSON', params);
            },
            fStatusVerify: function(aProp, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hcgs3004.wso/fStatusVerify/JSON', params);
            }
        },
        ws_hsag561: {
            fAutomaticConsolidada: function(sValor1, sValor2, sBookingId, aUsuarioSessao) {
                var params = {
                    'sValor1': sValor1,
                    'sValor2': sValor2,
                    'sBookingId': sBookingId,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticConsolidada/JSON', params);
            },
            fSaveSched: function() {
                // PERGUNTAR
            },
            fAutomaticNavio: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticNavio/JSON', params);
            },
            fAutomaticViagem: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticViagem/JSON', params);
            },
            fAutomaticETA: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticETA/JSON', params);
            },
            fAutomaticArmador: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticArmador/JSON', params);
            },
            fAutomaticAgente: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticAgente/JSON', params);
            },
            fAutomaticBookArmador: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticBookArmador/JSON', params);
            },
            fAutomaticMasterArmador: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticMasterArmador/JSON', params);
            },
            fAutomaticDlCarga: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticDlCarga/JSON', params);
            },
            fAutomaticDlDraft: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticDlDraft/JSON', params);
            },
            fAutomaticDlVgm: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticDlVgm/JSON', params);
            },
            fAutomaticDlImo: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticDlImo/JSON', params);
            },
            fAutomaticChegada: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticChegada/JSON', params);
            },
            fAutomaticSupervisor: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticSupervisor/JSON', params);
            },
            fAutomaticMargem: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticMargem/JSON', params);
            },
            fAutomaticAgEmissaobl: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticAgEmissaobl/JSON', params);
            },
            fAutomaticAgMar: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticAgMar/JSON', params);
            },
            fAutomaticDoc: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticDoc/JSON', params);
            },
            fAutomaticTerminal: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticTerminal/JSON', params);
            },
            fAutomaticObsConsol: function(sBookingId, sValor, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sValor': sValor,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag561.wso/fAutomaticObsConsol/JSON', params);
            }
        },
        WS_csag320: {
            f_bCSAG342_armador: function(sInicial, aUsuarioSessao) {
                var params = {
                    'sInicial': sInicial,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/WS_csag320.wso/f_bCSAG342_armador/JSON', params);
            }
        },
        ws_CSAG300: {
            f_UsuarioComplete: function(aInicio, aUsuarioSessao) {
                var params = {
                    'sInicial': sInicial,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_CSAG300.wso/f_UsuarioComplete/JSON', params);
            }
        },
        ws_HCGS3005: {
            f_HCGS3005_save: function(form, modalidade, idProposta, aUsuarioSessao) {
                form.idProposta = idProposta;
                form.aUsuarioSessao = aUsuarioSessao;
                form.aMod_Frt = modalidade;
                return $$callGetJson('/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_save/JSON', { 'sJSON': JSON.stringify(form) });
            },
            f_HCGS3005_del: function(sRECNUM, aUsuarioSessao) {
                var params = {
                    'aRecnum': sRECNUM,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_del/JSON', params);
            },
            f_HCGS3005_lista: function(aProposta, aUsuarioSessao) {
                var params = {
                    'aProposta': aProposta,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_lista/JSON', params);
            },
            f_HCGS3005_list: function(aProposta, aUsuarioSessao) {
                var params = {
                    'aProposta': aProposta,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_list/JSON', params);
            },
            f_HCGS3005_advanced: function() {
                // PERGUNTAR
            },
            fListaDetNEdit: function(sPropostaId, aUsuarioSessao) {
                var params = {
                    'sPropostaId': aProposta,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_HCGS3005.wso/fListaDetNEdit/JSON', params);
            },
            fTxBookingTT: function(sPropostaId, aUsuarioSessao) {
                var params = {
                    'sPropostaId': aProposta,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_HCGS3005.wso/fTxBookingTT/JSON', params);
            },
            fMontaCombo: function() {
                return $$callGetJson('/WVDF_WS/ws_HCGS3005.wso/fMontaCombo/JSON');
            }
        },
        ws_csag325: {
            propostaCidadeOrigem: function(sPais, sCidade, sMod, sCliente, aUsuarioSessao) {
                var params = {
                    'sPais': sPais,
                    'sCidade': sCidade,
                    'sMod': sMod,
                    'sCliente': sCliente,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_csag325.wso/propostaCidadeOrigem/JSON', params);
            },
            propostaCidadeDestino: function(sPais, sCidade, sMod, sCliente, sPol, aUsuarioSessao) {
                var params = {
                    'sPais': sPais,
                    'sCidade': sCidade,
                    'sMod': sMod,
                    'sCliente': sCliente,
                    'sPol': sPol,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_csag325.wso/propostaCidadeDestino/JSON', params);
            },
            propostaVia: function(sPol, sPod, sMod, sCliente, aUsuarioSessao) {
                var params = {
                    'sPol': sPais,
                    'sPod': sCidade,
                    'sMod': sMod,
                    'sCliente': sCliente,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_csag325.wso/propostaVia/JSON', params);
            }
        },
        ws_csag345: {
            f_agentes_descricao: function(sInicio, aUsuarioSessao) {
                var params = {
                    'sInicio': sInicio,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_csag345.wso/f_agentes_descricao/JSON', params);
            }
        },
        ws_hsag560: {
            pDelMercadoria: function(aRecnum, aUsuarioSessao) {
                var params = {
                    'aRecnum': aRecnum,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag560.wso/pDelMercadoria/JSON', params);
            }
        },
        ws_HCGS3001: {
            buscarTaxasPorClasse: function(aClasse, aUsuarioSessao) {
                var params = {
                    'aClasse': aClasse,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_HCGS3001.wso/buscarTaxasPorClasse/JSON', params);
            },
            buscarTaxas: function(aUsuarioSessao) {
                var params = {
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_HCGS3001.wso/buscarTaxas/JSON', params);
            },
            taxas_tarifarioxproposta: function(aClasse, aProp) {
                var params = {
                    'aClasse': aClasse,
                    'aProp': aProp,
                }
                return $$callGetJson('/WVDF_WS/ws_HCGS3001.wso/taxas_tarifarioxproposta/JSON', params);
            }
        },
        ws_hsag563: {
            fSaveSchedTruck: function() {
                // PERGUNTAR
            }
        },
        ws_hsag559: {
            fSvContatoBook: function() {
                // PERGUNTAR
            },
            fDlContatoBook: function(sRecnum, sTipo, aUsuarioSessao) {
                var params = {
                    'sRecnum': sRecnum,
                    'sTipo': sTipo,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag559.wso/fDlContatoBook/JSON', params);
            },
            fListaContatBook: function(sBookingId, sTipo, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sTipo': sTipo,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag559.wso/fListaContatBook/JSON', params);
            },
            fListaShipperBook: function(sBookingId, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag559.wso/fListaShipperBook/JSON', params);
            }
        },
        ws_hsag562: {
            fEmpresasBookingCombo: function(sBookingId, sTipo, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sTipo': sTipo,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag562.wso/fEmpresasBookingCombo/JSON', params);
            },
            pSVContatoBook_external: function(sBookingId, sPessoa, sTipo, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sTipo': sTipo,
                    'sPessoa': sPessoa,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag562.wso/pSVContatoBook_external/JSON', params);
            },
            pDLContatoBook_external: function(sBookingId, sPessoa, sTipo, aUsuarioSessao) {
                var params = {
                    'sBookingId': sBookingId,
                    'sTipo': sTipo,
                    'sPessoa': sPessoa,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_hsag562.wso/pDLContatoBook_external/JSON', params);
            }
        },
        ws_TMEN1003: {
            f_lista_msgs: function(aProp, aUsuarioSessao) {
                var params = {
                    'aProp': aProp,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('/WVDF_WS/ws_TMEN1003.wso/f_lista_msgs/JSON', params);
            }
        },
        Asp: {
            fbcsag345_descricao: function(term, aUsuarioSessao) {
                var params = {
                    'term': term,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('fbcsag345_descricao.asp', params);
            },
            fbcsag346_descricao: function(term, aUsuarioSessao) {
                var params = {
                    'term': term,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('fbcsag346_descricao.asp', params);
            },
            fbcsag325_descricao: function(term, aUsuarioSessao) {
                var params = {
                    'term': term,
                    'aUsuarioSessao': aUsuarioSessao
                }
                return $$callGetJson('fbcsag325_descricao.asp', params);
            }
        }
    }

    WVDF_ws.dbg = false;

    return WVDF_ws;
}]);