// ANGULAR JS
app = angular.module('propostaNovaApp', ['ngTagsInput', 'ngMaterial', 'ui.bootstrap']);

app.factory('buscaWS', function($http) {
  return {
    get: function(url, parametros) {
      return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
        return res.data;
      });
    } 
  };
});

app.controller('produtosController', function($scope, buscaWS, $http, $q, $filter) {
  // v2.0
  $scope.textoAjuda = 'Use a tecla CTRL para selecionar mais de um item.';
  // Define variaveis tela.
  $scope.proposta = {};

  $scope.hideAbaixo = true;

  // Tipo Operacao
  buscaWS.get('/WVDF_WS/ws_CCGS200.wso/f_CCGS200_combo/JSON', '').then(function(data) {
    $scope.lsOperacoes = data;
    $scope.proposta.operacao = $scope.lsOperacoes[0].ID

    // Produtos
    buscaWS.get('/WVDF_WS/ws_CCGS210.wso/f_CCGS210_lista/JSON', 'sOperacao=' + $scope.proposta.operacao).then(function(data) {
      $scope.lsProdutos = data;

      // Modalidades
      buscaWS.get('/WVDF_WS/ws_CCGS202.wso/f_CCGS202_lista/JSON', 'sProduto=').then(function(data) {
        $scope.lsModalidades = data;

        // Incoterm
        buscaWS.get('/WVDF_WS/ws_HCGS3000.wso/f_combo_incorterm/JSON', '').then(function(data) {
          $scope.lsIncoterm = data;

          // Caracteristicas do Frete
          buscaWS.get('/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON', '').then(function(data) {
            $scope.lsFretes = data;

            // Caracteristicas do Embarque
            buscaWS.get('/WVDF_WS/ws_CCGS204.wso/f_CCGS204_lista/JSON', '').then(function(data) {
              $scope.lsEmbarques = data;

              // Detalhes do Embarque
              buscaWS.get('/WVDF_WS/ws_CCGS205.wso/f_CCGS205_lista/JSON', '').then(function(data) {
                $scope.lsDetalhes = data;
                
                // Cliente
                buscaWS.get('/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG340/JSON', 'sUSUARIOSESSAO=' + getVariavelURL('aUsuarioSessao') + '&sCodigo=' + getVariavelURL('idCliente')).then(function(data) {
                  $scope.proposta.cliente = data.cDescricao;

                  buscaWS.get('/WVDF_WS/ws_HCGS3029.wso/f_combo_marcas/JSON', '').then(function(data) {
                    $scope.lsMarcas = data

                    // Vendedor
                    buscaWS.get('/WVDF_WS/ws_hcgs2101_01.wso/f_DescricaoCSAG341/JSON', 'sUSUARIOSESSAO=' + getVariavelURL('aUsuarioSessao') + '&sCodigo=' + getVariavelURL('idVendedor')).then(function(data) {
                      $scope.proposta.vendedor = data.vDescricao;
                      
                      $('body').height('2000');
                      
                      // Começa a posicionar a página.
                      // Checa se tela veio com informações para posicionar na tela.
                      if (getVariavelURL('idProposta')) {
                        $scope.proposta.idProposta = getVariavelURL('idProposta');
                        $scope.hideAbaixo = false;

                        buscaWS.get('/WVDF_WS/ws_hcgs3004.wso/f_busca_proposta/JSON', 'aPROPOSTA_ID=' + $scope.proposta.idProposta).then(function(data) {
                          console.log(data);

                          $scope.proposta.marca         = data[0].sCSAG308_ID;
                          $scope.proposta.operacao      = data[0].sCCGS200_ID;
                          $scope.changeOperacao($scope.proposta.operacao);

                          $scope.proposta.produtos      = data[0].sCCGS210_ID.split(',');
                          $scope.changeProdutos($scope.proposta.produtos);

                          
                          $scope.changeModalidades($scope.proposta.modalidades);

                          $scope.proposta.incoterm      = data[0].sCCGS223_ID;
                          $scope.proposta.origem        = data[0].arr_ORIGEM;
                          $scope.proposta.destino       = data[0].arr_DESTINO;

                          $scope.proposta.fretes        = data[0].sCCGS203_ID.split(',');

                          $scope.proposta.embarque      = data[0].sCCGS204_ID;
                          $scope.proposta.detalhes      = data[0].sCCGS205_ID.split(',');
                          $scope.proposta.carriers      = data[0].arr_CARRIERS;
                          $scope.proposta.containers    = data[0].sCONTAINERS.split(',');
                          $scope.proposta.pickup        = data[0].sCSAG325_PICKUP_LC;
                          $scope.proposta.delivery      = data[0].sCSAG325_DELIVERY_LC;
                          $scope.proposta.terminal      = data[0].sCSAG346_CFSTERMINAL;
                          $scope.proposta.agentedestino = data[0].sCSAG345_AGENTE;
                          $scope.proposta.validadede    = new Date(data[0].sDTVAL_INICIO);
                          $scope.proposta.validade      = new Date(data[0].sDTVAL_TERMINO);
                        });
                      }
                    });
                  });
                });              
              });
            });
          });
        });
      });
    });
  });  

  // Eventos
  // Change

  // Operacao
  $scope.changeOperacao = function(idOperacao) {
    // Produtos
    buscaWS.get('/WVDF_WS/ws_CCGS210.wso/f_CCGS210_lista/JSON', 'sOperacao=' + idOperacao).then(function(data) {
      $scope.lsProdutos = data;
    });
  };

  // Produtos
  $scope.changeProdutos = function(oProdutos) {
    // TODO: Posiciona modalidade conforme produto.
    // Pesquisa modalidades
    var modalidades = [];
    $scope.proposta.modalidades = [];

    oProdutos.forEach(function(iProduto) {
      buscaWS.get('/WVDF_WS/ws_CCGS210.wso/f_prod_mod/JSON', 'aProd=' + iProduto).then(function(data) {
        data.forEach(function(cada) {

          if (arrayObjectIndexOf(modalidades, cada) == -1) {
            modalidades.push(cada);
            $scope.proposta.modalidades.push(cada.ID);
          }
          
          //console.log(modalidades);
        });
      });
    });

    
  };

  // Modalidades
  $scope.changeModalidades = function(oModalidades) {
    console.log(oModalidades);
    // Se for só uma modalidade marca na entrada de dados.
    if (oModalidades.length == 1) {
      $scope.entrada.modalidade = oModalidades[0].ID;
    }

    var isLCL = false;
    oModalidades.forEach(function(oModalidade) {
      if (oModalidade == "LCL") {
        isLCL = true;
      }
    });

    if (isLCL) {
      $scope.proposta.containers.push("N.S.A.");
    }
  };

  // Carrier
  $scope.loadCarriers = function(query) {
    // TODO: IMPLEMENTAR CARRIERS
    // var id;

    // var aux = ($scope.mProduto != undefined) ? $scope.mProduto.ID_215 : "";
    // switch(aux) {
    //   case 'AIR':
    //     id = "343";
    //     break;
    //   case 'SEA':
    //     id = "342";
    //     break;
    //   case 'LAND':
    //     id = "349";
    //     break;
    //   default:
    //     id = "342"
    //     break;
    // }

    return $http.get('fbcsag342_descricao.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&term=' + query);
  };

  // Containers
  buscaWS.get('/WVDF_WS/ws_CCGS217.wso/f_CCGS217_lista/JSON', '').then(function(data) {
    $scope.lsContainers = data;
  });

  // Terminal
  $scope.loadTerminal = function(query) {
    return $http.get('fbcsag346_descricao.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&term=' + query);
  };

  // Agentes
  $scope.loadAgente = function(query) {
    return $http.get('fbcsag345_descricao.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&term=' + query);
  };

  // Zera data de validade
  var data = new Date();
  $scope.proposta.validade = (new Date(data.getFullYear(), data.getMonth() + 1, 0));
  $scope.proposta.validadede = data;

  // Zera campos
  $scope.proposta.idProposta  = "0";
  $scope.proposta.origem      = [];
  $scope.proposta.destino     = [];
  $scope.proposta.fretes      = [];
  $scope.proposta.detalhes    = [];
  $scope.proposta.carriers    = [];
  $scope.proposta.produtos    = [];
  $scope.proposta.modalidades = [];
  $scope.proposta.containers  = [];

  // Lista de items
  // TODO: Adicionar todas modalidades aqui. OU colocar para criar automaticamente atraves do WS.
  $scope.lsItems = [];
  $scope.lsItems.LCL = [];
  $scope.lsItems.FCL = [];
  $scope.lsItems.AIR = [];

  // Origem e Destino
  $scope.loadCidades = function(query) {
    return $http.get('fbcsag325_descricao.asp?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&term=' + query);
  };  

  // Funcão para filtrar retorno AJAX.
  $scope.filterAutoComplete = function(query, field) {
    var deferred = $q.defer();
    deferred.resolve( $filter('filter')($scope[field], query) );
    return deferred.promise;
  };

  // Cria objeto entrada
  $scope.entrada             = {};
  $scope.entrada.recnum      = "";
  $scope.entrada.equipamento = "";

  $scope.entrada.check  = {};
  $scope.entrada.haz    = {};
  $scope.entrada.total  = {};

  zerarEntrada();

  function zerarEntrada() {
    $scope.entrada.recnum            = "";
    $scope.entrada.pcs               = 1;
    $scope.entrada.package           = "";
    $scope.entrada.weight            = "";
    $scope.entrada.unitweight        = "KGS";
    $scope.entrada.length            = "";
    $scope.entrada.width             = "";
    $scope.entrada.height            = "";
    $scope.entrada.UOM               = "KGS";

    $scope.entrada.check.lift        = 0;
    $scope.entrada.check.hazardous   = 0;
    $scope.entrada.check.residential = 0;
    $scope.entrada.check.limited     = 0;
    $scope.entrada.check.personnal   = 0;
    $scope.entrada.check.over        = 0;

    $scope.entrada.haz.class         = "";
    $scope.entrada.haz.un            = "";
    $scope.entrada.haz.flash         = "";
    $scope.entrada.haz.unitFlash     = "C";
    $scope.entrada.haz.packing       = "";
    
    $scope.entrada.total.weight = $scope.entrada.pcs * $scope.entrada.weight;
    $scope.entrada.total.volume = $scope.entrada.length * $scope.entrada.width * $scope.entrada.height;
  };

  $scope.btnAddItem = function(item) {
    // Comandos do banco
    var parametros            = {};
    parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    parametros.aPROP          = $scope.proposta.idProposta;
    parametros.aRecnum        = $scope.entrada.recnum;
    parametros.aMod_Frt       = $scope.entrada.modalidade;
    parametros.aPcs           = $scope.entrada.pcs;
    parametros.aPack_Tp       = $scope.entrada.package;
    parametros.aWght          = $scope.entrada.weight;
    parametros.aWght_tp       = $scope.entrada.unitweight;
    parametros.aLght          = $scope.entrada.length;
    parametros.aWdth          = $scope.entrada.width;
    parametros.aHght          = $scope.entrada.height;
    parametros.aUOM           = $scope.entrada.UOM;
    parametros.aL_Gate        = $scope.entrada.check.lift;
    parametros.aHaz           = $scope.entrada.check.hazardous;
    parametros.aResid         = $scope.entrada.check.residential;
    parametros.aLim_Acc       = $scope.entrada.check.limited;
    parametros.aPnnal_Eff     = $scope.entrada.check.personnal;
    parametros.aAny_Pi        = $scope.entrada.check.over;
    parametros.aHaz_Cl        = $scope.entrada.haz.class;
    parametros.aHaz_Un        = $scope.entrada.haz.un;
    parametros.aHaz_Fl        = $scope.entrada.haz.flash;
    parametros.aHaz_Temp      = $scope.entrada.haz.unitFlash;
    parametros.aHaz_PGr       = $scope.entrada.haz.packing;
    parametros.aEQUIP         = $scope.entrada.equipamento;

    $http({
        url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_save/JSON', 
        method: 'GET',
        params: parametros
    }).success(function(data) {
      console.log(data);
      item.recnum = data;
      $scope.lsItems[item.modalidade].push(angular.copy(item));

      zerarEntrada();
    });  
  };

  $scope.btnDeleteItem = function(item) {
    buscaWS.get('/WVDF_WS/ws_hcgs3005.wso/f_HCGS3005_del/JSON', 'sRECNUM=' + item.recnum).then(function(data) {
      $scope.entrada.recnum = "";
      var index = $scope.lsItems[item.modalidade].indexOf(item);
      $scope.lsItems[item.modalidade].splice(index, 1);
    });    
  };

  $scope.btnEditItem = function(item) {
    // TODO: Remover item da lista.
    var index = $scope.lsItems[item.modalidade].indexOf(item);
    $scope.lsItems[item.modalidade].splice(index, 1);

    $scope.entrada = item;
  };

  $scope.btnVisualizarProposta = function() {
    var url = "propostaNova_06.html?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao');
    window.open(url,'name', 'width=250px');
  };

  $scope.btnSalvar = function(oProposta) {
    $scope.hideAbaixo = false;

    // Formatar Campos
    var aux = {};

    // Cesta de Produtos
    aux.produtos = "";
    
    $scope.proposta.produtos.forEach(function(item) {
      aux.produtos += item + ",";
    });

    aux.produtos = aux.produtos.substring(0, aux.produtos.length - 1);

    // Modalidade do Frete
    aux.modalidades = "";
    
    $scope.proposta.modalidades.forEach(function(item) {
      aux.modalidades += item + ",";
    });

    aux.modalidades = aux.modalidades.substring(0, aux.modalidades.length - 1);
    
    // Origem
    aux.origem = "";
    
    $scope.proposta.origem.forEach(function(item) {
      aux.origem += item.id + ",";
    });

    aux.origem = aux.origem.substring(0, aux.origem.length - 1);

    // Destino
    aux.destino = "";
    
    $scope.proposta.destino.forEach(function(item) {
      aux.destino += item.id + ",";
    });

    aux.destino = aux.destino.substring(0, aux.destino.length - 1);

    // Caracteristicas do Frete
    aux.caracteristicas = "";
    
    $scope.proposta.fretes.forEach(function(item) {
      aux.caracteristicas += item + ",";
    });

    aux.caracteristicas = aux.caracteristicas.substring(0, aux.caracteristicas.length - 1);

    // Detalhes
    aux.detalhes = "";
    
    $scope.proposta.detalhes.forEach(function(item) {
      aux.detalhes += item + ",";
    });

    aux.detalhes = aux.detalhes.substring(0, aux.detalhes.length - 1);

    // Carriers
    aux.carriers = "";
    
    $scope.proposta.carriers.forEach(function(item) {
      aux.carriers += item.id + ",";
    });

    aux.carriers = aux.carriers.substring(0, aux.carriers.length - 1);
    
    // Equipamentos
    aux.containers = "";
    
    $scope.proposta.containers.forEach(function(item) {
      aux.containers += item + ",";
    });

    aux.containers = aux.containers.substring(0, aux.containers.length - 1);


    var parametros = {};
    parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    parametros.aMARCA         = $scope.proposta.marca;
    parametros.aPROP          = ($scope.proposta.idProposta == undefined) ? "0" : $scope.proposta.idProposta;
    parametros.aTP_OP         = $scope.proposta.operacao;
    parametros.aPROD          = aux.produtos;
    parametros.aMOD           = aux.modalidades;
    parametros.aPICK          = ($scope.proposta.pickup != undefined && $scope.proposta.pickup.length > 0) ? $scope.proposta.pickup[0].id : "";
    parametros.aINCO          = $scope.proposta.incoterm;
    parametros.aORI           = aux.origem;
    parametros.aDEST          = aux.destino;
    parametros.aCRR           = aux.carriers;
    parametros.aCNTR          = aux.containers;
    parametros.aDT_VAL_F      = $scope.proposta.validade.toLocaleDateString();
    parametros.aEMB           = ($scope.proposta.embarque == undefined) ? "" : $scope.proposta.embarque;
    parametros.aDET           = aux.detalhes;
    parametros.aCFS           = ($scope.proposta.terminal != undefined && $scope.proposta.terminal.length > 0) ? $scope.proposta.terminal[0].id : "";
    parametros.aAGNT          = "";
    parametros.aFRT           = aux.caracteristicas;
    parametros.aCSAG320_ID    = getVariavelURL('idCliente');
    parametros.aCSAG341_ID    = getVariavelURL('idVendedor');

    $http({
        url: '/WVDF_WS/ws_hcgs3004.wso/f_proposta_frete/JSON', 
        method: 'GET',
        params: parametros
    }).success(function(data) {
      $scope.proposta.idProposta = data;
    });
  };

  // Funcoes calculo dos totais
  $scope.fnCalcTotal = function() {
    $scope.entrada.total.weight = $scope.entrada.pcs * $scope.entrada.weight;

    $scope.entrada.total.volume = $scope.entrada.length * $scope.entrada.width * $scope.entrada.height;
  };

  // Função para checar se array é igual
  function arrayObjectIndexOf(arr, obj){
    for(var i = 0; i < arr.length; i++){
      if(angular.equals(arr[i], obj)){
        return i;
      }
    };
    return -1;
  }

});

function getVariavelURL(variavel)
{
 var query = window.location.search.substring(1);
 var vars = query.split("&");
 for (var i=0;i<vars.length;i++) {
         var pair = vars[i].split("=");
         if(pair[0] == variavel){return pair[1];}
 }
 return(false);
}
