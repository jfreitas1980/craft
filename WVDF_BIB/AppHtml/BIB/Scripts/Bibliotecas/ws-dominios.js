angular.module('wsDominio', [])
    .factory('callWS', callWS)
    .factory('buscarVendedorPorId', buscarVendedorPorId)
    .factory('listaLiterais', listaLiterais)
    .factory('listaContainers', listaContainers)
    .factory('listaNavios', listaNavios)
    .factory('listaMoedas', listaMoedas)
    .factory('listaCidades', listaCidades)
    .factory('listaCidadesPorPais',listaCidadesPorPais)
    .factory('listaTerminais', listaTerminais)
    .factory('listaPaises', listaPaises)
    .factory('listaMarcas', listaMarcas)
    .factory('listaOperacoes', listaOperacoes)
    .factory('listaProdutos', listaProdutos)
    .factory('listaIncorterms', listaIncorterms)
    .factory('listaEmbarques', listaEmbarques)
    .factory('listaFretes', listaFretes)
    .factory('listaCarries', listaCarries)
    .factory('listaStatusProposta', listaStatusProposta)
    .factory('listaVendedor', listaVendedor)
    .factory('listaCliente', listaCliente)
    .factory('listaClientePorId', listaClientePorId)
    .factory('listaClientePorUsuario', listaClientePorUsuario)
    .factory('getMarcas', getMarcas);

function callWS($http) {
    return {
        get: function(url, parametros, timeout) {
             timeout = timeout || 1000 * 60 * 2;
            return $http({ url: url, method: "GET", params: parametros });
        },
        post: function(url, parametros, timeout) {
             timeout = timeout || 1000 * 60 * 2;
            return $http({ url: url, method: "POST", params: parametros });
        }
    };
}

function listaVendedor(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG341/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function buscarVendedorPorId(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_csag341.wso/buscarVendedorPorId/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaCliente(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_CSAG340.wso/fbCSAG340ClienteNome/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaClientePorId(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_CSAG340.wso/fbCSAG340ClienteNomePorId/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaClientePorUsuario(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_CSAG340.wso/fbCSAG340ClienteVsUser/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaStatusProposta(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_HCGS3004.wso/f_lista_status/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaFretes(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaEmbarques(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_CCGS204.wso/f_CCGS204_lista/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaIncorterms(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_HCGS3000.wso/f_combo_incorterm/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaProdutos(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_CCGS210.wso/f_CCGS210_lista/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaOperacoes(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_CCGS200.wso/f_CCGS200_combo/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaLiterais(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_csag309.wso/f_idiomas_literais/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaCarries(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('fbcsag342_descricao.asp', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaContainers(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/WS_HCGS3029.wso/f_combo_cntr/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaNavios(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_ccgs227.wso/fCCGS227Navios/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}



function listaCidades(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_CSAG325.wso/fCSAG325Cidades/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaCidadesPorPais(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_CSAG325.wso/listaCidadesPorPais/JSON', parametros).then(function(response) {
                return response;
            }, function(error) {
                return error;
            });
        }
    };
}

function listaTerminais(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('fbcsag346_descricao.asp', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaPaises(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaMarcas(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_marcas/JSON', parametros)
                .then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function getMarcas(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_csag308.wso/getMarcas/JSON', parametros)
                .then(function(response) {
                    //         console.log('response');
                    //       console.log(response);
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}

function listaMoedas(callWS) {
    return {
        get: function(parametros) {
            return callWS.get('/WVDF_WS/ws_ccgs218.wso/fListaMoedas/JSON', parametros)
                .then(function(response) {
                    //         console.log('response');
                    //       console.log(response);
                    return response;
                }, function(error) {
                    return error;
                });
        }
    };
}
