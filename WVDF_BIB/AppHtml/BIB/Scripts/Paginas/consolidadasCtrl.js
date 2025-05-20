var app = angular.module("CROSSApp", ['ngTagsInput','ngTable', 'ngRoute', 'ui.bootstrap', 'uiDates']);//'ngTagsInput',

var urlAPI;
var baseUrl;

app.factory("buscaWS", function ($http) {
  return {
    get: function (url, parametros) {
      return $http
        .get(
          url +
          "?aUsuarioSessao=" +
          getVariavelURL("aUsuarioSessao") +
          "&" +
          parametros
        )
        .then(function (res) {
          return res.data;
        });
    }
  };
});

app.directive('date', function (dateFilter) {
  if(dateFilter != undefined)
  {
    return {
        require:'ngModel',
        link:function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs['date'] || 'yyyy-MM-dd';
            
            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
  }
});

app.filter('groupBy', function(){
  return function(list, group_by) {

  var filtered = [];
  var prev_item = null;
  var group_changed = false;
  // this is a new field which is added to each item where we append "_CHANGED"
  // to indicate a field change in the list
  var new_field = group_by + '_CHANGED';

  // loop through each item in the list
  angular.forEach(list, function(item) {

    group_changed = false;

    // if not the first item
    if (prev_item !== null) {

      // check if the group by field changed
      if (prev_item[group_by] !== item[group_by]) {
        group_changed = true;
      }

    // otherwise we have the first item in the list which is new
    } else {
      group_changed = true;
    }

    // if the group changed, then add a new field to the item
    // to indicate this
    if (group_changed) {
      item[new_field] = true;
    } else {
      item[new_field] = false;
    }

    filtered.push(item);
    prev_item = item;

  });

  return filtered;
  };
});

//Controller da Consolidada.html
app.controller("consolidadasCtrl", function ($scope, $http, operacaoServicos, $window, $location, NgTableParams) {

  $scope.btnClearSearch = function () {
    $scope.oFiltro = {
      id_Consolidada: "",
      id_Consolidada: "",
      tp_Excluida: "N",
      optFinalizado:"P"
    };
  };


  
  // Chamar tela Consolidada
  $scope.chamarTelaConsolidada = function (_oConsolidada, _sTab) {
    //console.log(getVariavelURL('aUsuarioSessao'));
    var _ConsolidadaID = _oConsolidada.id_Consolidada;    
    var _ConsolidadaNum = _oConsolidada.nr_Consolidada;

    if(_ConsolidadaID == undefined){_ConsolidadaID = 0;}
    if(_ConsolidadaNum == undefined){_ConsolidadaNum = "";}

    var url = 'ConsolidadaInfo.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') 
      + '&id_ConsolidadaCarregar=' + _ConsolidadaID
      +'&tab=' + _sTab;
    window.top.jaddTab("Info. Consolidada " + _ConsolidadaNum, url);
  };
    // Chamar tela Consolidada
    //$scope.chamarTelaConsolidadaTab = function (_ConsolidadaID) {
    //  //console.log(getVariavelURL('aUsuarioSessao'));
    //  var url = 'ConsolidadaTab.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&id_ConsolidadaCarregar=' + _ConsolidadaID;
    //  window.top.jaddTab("Info. Consolidada", url);
    //};

  $scope.openModal = function(value)
  {        
    
      $scope.oConsolidadaExcluir = {};
      if(value != undefined)
      {
          $scope.oConsolidadaExcluir = angular.copy(value);
      }
      
      $(document).ready(function(){
          $("#modaluserConfirm").modal();
      });
  };

  $scope.btnDelete = function () {
      return operacaoServicos.delete($scope.oConsolidadaExcluir.id_Consolidada).then(function () {
        $scope.PesquisalstConsolidada($scope.oFiltro);
      }); 
  };

  $scope.getNavio = function (value) {
    return operacaoServicos.getNavios(value);
  };

  $scope.getPessoa = function (sNome, CSAG319_ID) {
    return operacaoServicos.getPessoas(sNome, CSAG319_ID);
  };

  $scope.loadContinente = function (value) {
    return operacaoServicos.loadContinentes(value);
  };

  $scope.PesquisalstConsolidada = function (oFiltro) {
    if (oFiltro == undefined) {
      $scope.btnClearSearch();
    }

    oFiltro.bNaoCarregarCTNR = false;
    oFiltro.bNaoCarregarReservas = false;
    $scope.loadingState = true;

    operacaoServicos.getLstConsolidadas(oFiltro).then(function (data) {
      $scope.lstConsolidada = data;
      $scope.loadingState = false;

      $scope.tblConsolidada = new NgTableParams(
        {
          page: 1,
          count: 10,
          sorting: { date: 'asc' }
        }, 
        { 
          counts: [10, 20, 50,100],
          dataset: $scope.lstConsolidada
          
        }); 

    }).catch(function(){
      $scope.loadingState = false;
    });

    //$scope.loadingState = false;
  };

  $scope.getPais = function (valor, tipo) {
    return operacaoServicos.getPais(valor, tipo);
  };

  $scope.getCidade = function (sNome, CSAG319_ID) {
    return operacaoServicos.getCidades(sNome, CSAG319_ID);
  };

  loadFormConsolidada = function () {    
    $scope.btnClearSearch();
    $scope.PesquisalstConsolidada($scope.oFiltro);
  };


  loadFormConsolidada();
});

//Controller da infoConsolidada.html

//------------------------------------------------------------------------------------------------------------------------------

//
app.controller("consolidadasInfoCtrl", function ($scope, buscaWS, operacaoServicos, $window, $location, $sce, $filter, $http) {

  $scope.bDetalheCTNROK;
  $scope.id_ConsolidadaCarregar = 0;
  $scope.oArmador = [];
  $scope.oAgente = [];
  $scope.lstVia = [];
  $scope.lstReservaNaoAlocada = [];
  $scope.lstBookingSelected = [];
  $scope.oPaginaModal = "ConsolidadaInfo_LCL.html"
  $scope.tags = [
    { text: 'Tag1' }
  ];

  $scope.oValuesConsol = {"valuesContainer":[]};

  $scope.sServicoCalculo = "";

  //$scope.oParamCalculo = {};

  
  $scope.AvisoEquipamento = function(){
    
  }

  $scope.lstConsolidadaReservaFilter = function(_oCTNR)
  {
    return $scope.oConsolidada.lstConsolidadaReserva.filter(function(elemento){
      return elemento.id_ContainerDetalhe == _oCTNR;
    });

  }

  $scope.$watch('oConsolidada.ds_Modal', function(){

    if(angular.isDefined($scope.oConsolidada))
    {
      if($scope.oConsolidada.ds_Modal == "TRUCK")
      {
        $scope.oPaginaModal = "ConsolidadaInfo_Truck.html";
      }
      else
      {
        $scope.oPaginaModal = "ConsolidadaInfo_LCL.html";
      } 
    }
  });

  $scope.LimparoConsolidada = function () {

      $scope.oConsolidada = {
      "id_Consolidada": 0,
      "CrossSessionID": getVariavelURL('aUsuarioSessao'),
      "ds_Modal": "LCL",
      "id_Agente": 0,
      "ds_Agente": "",
      "id_Armador": 0,
      "ds_Armador": "",
      "id_CidadeOrigem": 0,
      "ds_CidadeOrigem": "",
      "id_CidadeDestino": 0,
      "ds_CidadeDestino": "",
      "id_Via": null,
      "ds_Via": "",
      "id_Navio": 0,
      "ds_Navio": "",
      "ds_Viagem": "",
      "ds_Margem": "dir",
      "nr_FreeTimeOrigem": "",
      "nr_FreeTimeDestino": "",
      "nr_TransitTime": "",
      "id_TerminalEstufagem": null,
      "ds_TerminalEstufagem": "",
      "id_TerminalPreStacking": null,
      "ds_TerminalPreStacking": "",
      "id_TipoEmissaoBL": null,
      "ds_TipoEmissaoBL": "",
      "id_TipoFormulario": null,
      "ds_TipoFormulario": "",
      "nr_Courrier": "",
      "tp_PossibilidadeProrrogacao": "N",
      "id_Transportadora": 0,
      "ds_Transportadora": null,
      "id_TerminalOrigem": 0,
      "ds_TerminalOrigem": "",
      "id_TerminalDestino": 0,
      "ds_TerminalDestino": "",
      "id_TerminalDesova": null,
      "ds_TerminalDesova":"",
      "nr_IdentificacaoMaster": null,
      "dt_Saida": null,
      "dt_Chegada": null,
      "dt_EnvioDraft": null,
      "dt_RecebimentoCargaGeral": null,
      "dt_RecebimentoCargaImo": null,
      "dt_ETA": null,
      "dt_ETD": null,
      "dt_ChegadaEstimada": null,
      "DetalheCTNR": [],
      "lstDetalheCTNR" : [],
      "nr_ConsolidadaNetShip" : ""
    }
  };

  $scope.limparTotais = function(){
    $scope.aTotalBooking = [{id_ContainerDetalhe:null, sContainer: 'totalGeral', dTotalM3Reserva: 0, dTotalPesoReserva: 0, dTotalQuantidade: 0},
                            {id_ContainerDetalhe:null, sContainer: 'null', dTotalM3Reserva: 0, dTotalPesoReserva: 0, dTotalQuantidade: 0}];
  };

  $scope.SetObjectId = function (oItem, oTipo) {
    var _id = 0;
    var _dsNome = "";

    if (oItem.codigo > 0) {
      _dsNome = oItem.fantasia;
      _id = oItem.codigo;
    }

    if (oTipo == "Agente") {
      $scope.oConsolidada.id_Agente = oItem.id;
      $scope.oConsolidada.ds_Agente = oItem.value;
    }

    if (oTipo == "Armador") {
      $scope.oConsolidada.id_Armador = _id;
      $scope.oConsolidada.ds_Armador = _dsNome;
    }

    if (oTipo == "CidadeOrigem") {
      $scope.oConsolidada.id_CidadeOrigem = oItem.id;
      $scope.oConsolidada.ds_CidadeOrigem = oItem.value;
    }

    if (oTipo == "CidadeDestino") {
      $scope.oConsolidada.id_CidadeDestino = oItem.id;
      $scope.oConsolidada.ds_CidadeDestino = oItem.value;
    }

    if (oTipo == "Via") {
      $scope.oConsolidada.id_Via = oItem.id;
      $scope.oConsolidada.ds_Via = oItem.value;
    }

    if (oTipo == "Navio") {
      $scope.oConsolidada.id_Navio = oItem.id;
      $scope.oConsolidada.ds_Navio = oItem.value;
    }

    if (oTipo == "TerminalEstufagem") {
      $scope.oConsolidada.id_TerminalEstufagem = oItem.id;
      $scope.oConsolidada.ds_TerminalEstufagem = oItem.value;
    }

    if (oTipo == "TerminalPreStacking") {
      $scope.oConsolidada.id_TerminalPreStacking = oItem.id;
      $scope.oConsolidada.ds_TerminalPreStacking = oItem.value;
    }

    if (oTipo == "TerminalOrigem") {
      $scope.oConsolidada.id_TerminalOrigem = oItem.id;
      $scope.oConsolidada.ds_TerminalOrigem = oItem.value;
    }

    if (oTipo == "TerminalDestino") {
      $scope.oConsolidada.id_TerminalDestino = oItem.id;
      $scope.oConsolidada.ds_TerminalDestino = oItem.value;
    }

    if (oTipo == "TerminalDesova") {
      $scope.oConsolidada.id_TerminalDesova = oItem.id;
      $scope.oConsolidada.ds_TerminalDesova = oItem.value;
    }    
    
    if (oTipo == "TipoEmissao") {
      
      $scope.oConsolidada.id_TipoEmissao = oItem.id;
      $scope.oConsolidada.ds_TipoEmissao = oItem.value;
    }    
  };

  $scope.evtLostFocus = function (oTipo) {
    if (oTipo == "Agente" && $scope.oConsolidada.id_Agente <= 0) {
      $scope.oConsolidada.ds_Agente = "";
    }

    if (oTipo == "Armador" && $scope.oConsolidada.id_Armador <= 0) {
      $scope.oConsolidada.ds_Armador = "";
    }

    if (oTipo == "CidadeOrigem" && $scope.oConsolidada.id_CidadeOrigem <= 0) {
      $scope.oConsolidada.ds_CidadeOrigem = "";
    }

    if (oTipo == "CidadeDestino" && $scope.oConsolidada.id_CidadeDestino <= 0) {
      $scope.oConsolidada.ds_CidadeDestino = "";
    }

    if (oTipo == "Via" && $scope.oConsolidada.id_Via <= 0) {
      $scope.oConsolidada.ds_Via = "";
    }

    if (oTipo == "Navio" && $scope.oConsolidada.id_Navio <= 0) {
      $scope.oConsolidada.ds_Navio = "";
    }

    if (oTipo == "TerminalEstufagem" && $scope.oConsolidada.id_TerminalEstufagem <= 0) {
      $scope.oConsolidada.ds_TerminalEstufagem = "";
    }

    if (oTipo == "TerminalPreStacking" && $scope.oConsolidada.id_TerminalPreStacking <= 0) {
      $scope.oConsolidada.ds_TerminalPreStacking = "";
    }

    if (oTipo == "TerminalOrigem" && $scope.oConsolidada.id_TerminalOrigem <= 0) {
      $scope.oConsolidada.ds_TerminalOrigem = "";
    }

    if (oTipo == "TerminalDestino" && $scope.oConsolidada.id_TerminalDestino <= 0) {
      $scope.oConsolidada.ds_TerminalDestino = "";
    }

    if (oTipo == "TerminalDesova" && $scope.oConsolidada.id_TerminalDesova <= 0) {
      $scope.oConsolidada.ds_TerminalDesova = "";
    }    

    if (oTipo == "TipoEmissao") {      
      $scope.oConsolidada.ds_TipoEmissao = "";
    } 

  };

  $scope.formatarValor = function(){
    $scope.oConsolidada.kg_Tara = $filter('currency')($scope.oConsolidada.kg_Tara, '');
  };

  /*
  AjustarDatas = function () {
    $scope.oConsolidada.dt_Saida = $filter('date')($scope.oConsolidada.dt_Saida, 'dd/MM/yyyy');
    $scope.oConsolidada.dt_Chegada = $filter('date')($scope.oConsolidada.dt_Chegada, 'dd/MM/yyyy');
    }
*/
  $scope.validateDate = function (testdate) {
    
    if (testdate != undefined) {
      
      if(testdate.length == 19){//criar regex
        
        $scope.bDetalheCTNROK = true;
        return $scope.bDetalheCTNROK;
      }
      if (testdate.length > 0) {
        var date_regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
        $scope.bDetalheCTNROK = date_regex.test(testdate);
        
        return $scope.bDetalheCTNROK;
      } else {
        
        $scope.bDetalheCTNROK = true;
        return $scope.bDetalheCTNROK;
      }
    }
    else{
      $scope.bDetalheCTNROK = true;
      return $scope.bDetalheCTNROK;
    }
  }

  $scope.GetConsolidada = function (value) {
    $scope.loadingState = true;
    $scope.oPaginaModal = "ConsolidadaInfo_LCL.html";
    operacaoServicos.getConsolidada(value).then(function (response) {      
      $scope.oConsolidada = response;            
      $scope.lstBookingSelected = [];  
      $scope.SumTotalBooking();   

      //AjustarDatas();
      $scope.loadingState = false;

    },function mySuccess(err) {
      $scope.loadingState = false;
    });

    /* ,
     function mySuccess(response) {
       $scope.oConsolidada = response.data;
       console.log('b');
     },
     function myError(response) {
       console.log(response);
     });
     */
  };

  $scope.getNavio = function (value) {
    return operacaoServicos.getNavios(value);
  };

  $scope.getPessoa = function (sNome, CSAG319_ID) {
    return operacaoServicos.getPessoas(sNome, CSAG319_ID);
  };

  $scope.getCidade = function (sNome, CSAG319_ID) {
    return operacaoServicos.getCidades(sNome, CSAG319_ID);
  };

  $scope.moveBookingConsolidation = function(_ConsolidadaReserva)
  {
    return operacaoServicos.moveBookingConsolidation(_ConsolidadaReserva.id_Booking, _ConsolidadaReserva.id_Consolidada, _ConsolidadaReserva.ds_Container);
  };

  $scope.loadAgentes = function (query) {
    if (query.length > 2) {
      var parametros = 'sInicio=' + query;
      var data = buscaWS.get('/WVDF_WS/ws_csag345.wso/f_agentes_descricao/JSON', parametros)
        .then(function (data) {
          return data;
        });
      return data;
    }
  };

  $scope.buscaWS = function ($http) {
    return {
      get: function (url, parametros) {
        return $http
          .get(
            url +
            "?aUsuarioSessao=" +
            getVariavelURL("aUsuarioSessao") +
            "&" +
            parametros
          )
          .then(function (res) {
            return res.data;
          });
      }
    };
  };

  $scope.getVia = function (id_CidadeOrig, id_CidadeDest) {
    if (id_CidadeOrig > 0 && id_CidadeDest > 0) {
      buscaWS
        .get(
          "/WVDF_WS/ws_csag325.wso/propostaVia/JSON",
          "sPol=" +
          id_CidadeOrig +
          "&sPod=" +
          id_CidadeDest +
          "&sMod=LCL" +
          "&sCliente=1"
        )
        .then(function (data) {
          $scope.lstVia = data;
        });
    }
  };

  $scope.acTerminal = function (texto) {
    return buscaWS.get('fbcsag346_descricao.asp', 'term=' + texto).then(function (data) {
      return data;
    });
  };


  getTipoFormulario = function () {
    return operacaoServicos.getTipoFormulario().then(
      function mySuccess(response) {
        $scope.aTipoFormulario = response;
      }
    );
  };

  getTipoEmissaoBL = function () {
    return operacaoServicos.getTipoEmissaoBL().then(
      function mySuccess(response) {
        $scope.aTipoEmissaoBL = response;
      }
    );
  };

  $scope.showSchedule = function(){
    var currentdate;
    var _oConsolidada;
    
    currentdate = new Date();
    currentdate = $filter('date')(currentdate, 'yyyy-MM-dd');

    _oConsolidada = $scope.oConsolidada

    operacaoServicos.scheduleBookCROSS(_oConsolidada.id_CidadeOrigem, _oConsolidada.id_CidadeDestino, _oConsolidada.id_Via, currentdate
      ).then(
          function(response){
            $scope.lsSchedule = response.data;
          });  
  };

  $scope.transferContainer = function(_oCTNR){

    $scope.lsSchedule = [];
    $scope.oItemTransferir = [];

    $scope.oItemTransferir = _oCTNR;
    $scope.oItemTransferir.Tipo = "Equipamento";
       
    $scope.showSchedule();                                    
  };

  
  $scope.transferBooking = function()
  {     
      
    $scope.lsSchedule = [];
    $scope.oItemTransferir = [];

    $scope.oItemTransferir = $scope.lstBookingSelected;
    $scope.oItemTransferir.Tipo = "Booking";

    $scope.showSchedule();
  };

  $scope.scheduleSelected = function(schedule) {
    $scope.loadingState = true;
    if($scope.oItemTransferir.Tipo == "Booking")
    { 
      $scope.lstBookingSelected.forEach(function(elemento){
                                             
        operacaoServicos.transferBooking(elemento.id_Booking, elemento.id_Consolidada, schedule.id_consolidada_cross).then(
          function(response){
            
            $scope.GetConsolidada($scope.oConsolidada.id_Consolidada);
            $scope.lstBookingSelected = [];
            $scope.loadingState = false;
            $('#modalTransferenciaCTNR').modal('hide')
          }), function(){
            console.log("something went wrong while transfering booking");
            
            $scope.loadingState = false;
          };
      });
      
    }
    else{ 
        
      operacaoServicos.transferContainer($scope.oItemTransferir.id_Consolidada, $scope.oItemTransferir.ds_Container, schedule.id_consolidada_cross
                                        ).then(
                                            function(response){
                                              
                                              $scope.GetConsolidada($scope.oConsolidada.id_Consolidada);
                                              $scope.lstBookingSelected = [];
                                              $('#modalTransferenciaCTNR').modal('hide')
                                              $scope.loadingState = false;
                                            }
                                        ), function(){
                                          console.log("something went wrong while transfering container");
                                          $('#modalTransferenciaCTNR').modal('hide')
                                          $scope.loadingState = false;
                                        };
                                        
                                        
    }       
  }

  getTiposContainer = function () {
    operacaoServicos.getTiposContainer().then(function (response) {
      $scope.aTipoContainer = response.data;
    });

  }

  $scope.searchItem = function(aDados, ItemToCompare){
    if(! angular.isUndefined(aDados))
    {
      return _searchItem = aDados.filter(function(aDados){        
          return aDados.id_ContainerDetalhe == ItemToCompare;          
      });
    }
  };

  $scope.lstReservaNaoAlocada = function(){    
    var lst = [];
    
    if(! angular.isUndefined($scope.oConsolidada))
    {
      if(! angular.isUndefined($scope.oConsolidada.lstConsolidadaReserva))
      {
        //lst = $scope.searchItem($scope.oConsolidada.lstConsolidadaReserva, null);  
        lst = $scope.searchItem($scope.oConsolidada.lstConsolidadaReserva, 0);  
      }
    
    }
    return lst;
  };

  $scope.searchArrayTotal = function(aDados, ItemToCompare){
    var oItem;
    if(! angular.isUndefined(aDados))
    {
      oItem = _searchItem = aDados.filter(function(aDados){
        if(ItemToCompare == "totalGeral"){ 
          return aDados.sContainer == ItemToCompare;
        }
        else{
          return aDados.id_ContainerDetalhe == ItemToCompare;
        }
      });
    }
    return oItem[0];
  };

  $scope.SumTotalBooking = function(value){
    var row;

    $scope.limparTotais();

    for(var i = 0; i < $scope.oConsolidada.lstConsolidadaReserva.length; i++)
    {
      row = $scope.oConsolidada.lstConsolidadaReserva[i];
      
      oTotalBooking = $scope.searchArrayTotal($scope.aTotalBooking, row.id_ContainerDetalhe)
      
      if(angular.isUndefined(oTotalBooking))
      {
        oTotalBooking = {"id_ContainerDetalhe": row.id_ContainerDetalhe, sContainer: row.ds_Container, dTotalM3Reserva: row.nr_Volume, dTotalPesoReserva: row.kg_Peso, dTotalQuantidade: row.qt_Item};
        $scope.aTotalBooking.push(oTotalBooking);
      }
      else
      {
        if(angular.isNumber(row.nr_Volume))
        {
          oTotalBooking.dTotalM3Reserva = oTotalBooking.dTotalM3Reserva + row.nr_Volume;  
        }
        if(angular.isNumber(row.kg_Peso))
        {
          oTotalBooking.dTotalPesoReserva =  oTotalBooking.dTotalPesoReserva + row.kg_Peso;
        }
        if(angular.isNumber(row.qt_Item))
        {
          oTotalBooking.dTotalQuantidade =  oTotalBooking.dTotalQuantidade + row.qt_Item;
        }
      }
      if(angular.isNumber(row.nr_Volume))
      {
        $scope.aTotalBooking[0].dTotalM3Reserva = $scope.aTotalBooking[0].dTotalM3Reserva + row.nr_Volume;
      }
      if(angular.isNumber(row.kg_Peso))
      {
        $scope.aTotalBooking[0].dTotalPesoReserva = $scope.aTotalBooking[0].dTotalPesoReserva + row.kg_Peso;
      }
      if(angular.isNumber(row.qt_Item))
      {
        $scope.aTotalBooking[0].dTotalQuantidade = $scope.aTotalBooking[0].dTotalQuantidade + row.qt_Item;
      }
    }
  };

  $scope.getTotalBooking = function(_id_ContainerDetalhe){
    var sRetorno;
    if(_id_ContainerDetalhe != null)
    {
      var oTotalBooking = $scope.searchArrayTotal($scope.aTotalBooking, _id_ContainerDetalhe)
      if(! angular.isUndefined(oTotalBooking))
      {
        sRetorno = oTotalBooking;
      }
    }

    return sRetorno;
  }

  setarTab = function (value) { 
    var indiceTab = 0;   
    if(angular.isDefined(value))
    {
      
      if( value == 'tab2Link')
      {
        indiceTab = 1;
      }      
      else if( value == 'tab4Link')
      {
        indiceTab = 3;
      }


      $('#myTab li:eq(' + indiceTab + ') a').tab('show');
    }
    
    
  };

  load = function () {
    $scope.loadingState = true;
    getTipoFormulario();
    getTipoEmissaoBL();
    getTiposContainer();
    $scope.limparTotais();

    $scope.id_ConsolidadaCarregar = 0;
    $scope.id_ConsolidadaCarregar = getVariavelURL('id_ConsolidadaCarregar');

    if ($scope.id_ConsolidadaCarregar > 0) {
      $scope.GetConsolidada($scope.id_ConsolidadaCarregar);
      
      setarTab(getVariavelURL('tab'));
      $scope.loadingState = false;
    } 
    else{
      $scope.LimparoConsolidada();
      $scope.loadingState = false;
    }

  };

  $scope.GravarPincipal = async function(oData){
    $scope.Gravar(oData);
    //console.log($scope.Gravar(oData));
    //await $scope.Gravar(oData).then(function(){      
    //    setarTab("tab2Link");
    //},function(){console.log("ops");});
    
  }

  $scope.Gravar = async function (oData) {
    
    var url = _getUrlAPI() + "cross/Consolidation"

    $scope.loadingState = true;
    
    if ($scope.oForm.$valid) {
      var metodo = "post";
      $scope.oConsolidada.CrossSessionID = getVariavelURL('aUsuarioSessao');

      if ($scope.oConsolidada.id_Consolidada > 0) {
        metodo = "patch";
      }
      
      var ret = await $http({
        method: metodo,
        url: url,
        data: oData
      }).then(
        function successCallback(response) {   
            parent.parent.alertify.success("Gravação efetuada no CROSS");
            $scope.oConsolidada = response.data;
            if($scope.oConsolidada.ds_Modal == "LCL" )
            {              
              $scope.enviarNetShip($scope.oConsolidada);             
            }
            else
            {
              $scope.loadingState = false;
            }     
        },
        function errorCallback(response) {
          
          $scope.loadingState = false;
          console.log (response);
          parent.parent.alertify.error(response.data);      
        }   
      );
      return ret;
/*
      return operacaoServicos.gravar(oData, metodo).then(
        function successCallback(response) {
          $scope.enviarNetShip(oData); 
          $scope.oConsolidada = response;      
          console.log("CROSS OK");
          $scope.loadingState = false;
          //AjustarDatas();
        },
        function errorCallback(response) {
          console.log("CROSS ERROR");
          $scope.loadingState = false;
          parent.parent.alertify.error(response);
        }
      );
      */
    } 
    else {
      parent.parent.alertify.error("Preencha todos os campos obrigatórios!");
      $scope.loadingState = false;
    }
  };

  $scope.enviarNetShip = function(oData){
    $scope.loadingState = true;
    parent.parent.alertify.success("Gravando no NetShip");
    operacaoServicos.enviarNetShip(oData.id_Consolidada).then(function successCallback(response){
        $scope.oConsolidada.nr_ConsolidadaNetShip = response.data;
        $scope.loadingState = false;
        console.log(response);
        
    },function errorCallback(response) {
         $scope.loadingState = false;

         console.log(response.data);
         parent.parent.alertify.error(response);
         parent.parent.alertify.error(response.data.Message);
       });
  };

  $scope.cleanModalDetailContainer = function(){

    $scope.oDetalheCTNRAlterar = {};
  };

  $scope.fecharModal = function(_objModal)
  {
    $scope.oDetalheCTNRAlterar = {};

    $('#'+ _objModal).modal('hide');
		$('body').removeClass('modal-open');
    $('.modal-backdrop').remove();    
  }

  $scope.addContainer = function (_oDetalheCTNRAlterar) 
  {

    if(!$scope.isContainerValid())
    {
      parent.parent.alertify.error("Container inválido");      
      return;
    }
    
    _oDetalheCTNRAlterar.ds_Lacre = "";
    if(_oDetalheCTNRAlterar.ds_LacreTag != undefined)
    {
      _oDetalheCTNRAlterar.ds_LacreTag.forEach(function(elemento)
      {
        console.log(elemento);
        _oDetalheCTNRAlterar.ds_Lacre +=  elemento.text + "/";
        
      });
    }

    var iPos;
    var bDuplicado= false;
    if(angular.isDefined($scope.oConsolidada.lstDetalheCTNR))
    {
      if($scope.oConsolidada.lstDetalheCTNR.length > 0)
      {
        if($scope.oConsolidada.lstDetalheCTNR.indexOf(_oDetalheCTNRAlterar) < 0) //Significa que e alteracao
        {
          for(var i=0; i < $scope.oConsolidada.lstDetalheCTNR.length; i++)
          {
          if(_oDetalheCTNRAlterar.ds_Container == $scope.oConsolidada.lstDetalheCTNR[i].ds_Container)
          {
              bDuplicado = true;
          }        
          }
        }
      }
    }
    if (!bDuplicado)
    {    
      if(angular.isUndefined($scope.oConsolidada.lstDetalheCTNR))
      {
        $scope.oConsolidada.lstDetalheCTNR = [];
      }

      iPos = -1;
      iPos = $scope.oConsolidada.lstDetalheCTNR.indexOf(_oDetalheCTNRAlterar);
      if(iPos >= 0)
      {
        $scope.oConsolidada.lstDetalheCTNR.splice(iPos, 1, angular.copy(_oDetalheCTNRAlterar));
      }
      else
      {
        $scope.oConsolidada.lstDetalheCTNR.push(angular.copy(_oDetalheCTNRAlterar));
      }      

      $('#modalDetalhesAvancados').modal('hide');
      parent.parent.alertify.success("Lista alterada!");

      console.log($scope.oConsolidada);
      parent.parent.alertify.success("Gravando consolidada");
      $scope.Gravar($scope.oConsolidada);
      
      
      $scope.cleanModalDetailContainer();
    }
    else
    {
      parent.parent.alertify.error("Este Container/Veículo já existe na lista!");
    }
  };

  $scope.hasBooking = function(aDados, ItemCompare){
    return _HasBooking = aDados.some(function(aDados){
        return aDados.id_ContainerDetalhe == ItemCompare;
    });
  };

  $scope.evtClickDelete = function(_oDetalheCTNR){
    var iPos; 

    if(! $scope.hasBooking($scope.oConsolidada.lstConsolidadaReserva, _oDetalheCTNR.id_ContainerDetalhe))
    {
      iPos = $scope.oConsolidada.lstDetalheCTNR.indexOf(_oDetalheCTNR);    
      $scope.oConsolidada.lstDetalheCTNR.splice(iPos,1);
      $scope.Gravar($scope.oConsolidada);
    }
    else
    {
      parent.parent.alertify.error("Existem reservas neste container.");
    }
  };

  $scope.evtClickUpdate = function(oDetalheCTNR){
    
    console.log("chamou updt");

    $scope.oDetalheCTNRAlterar = oDetalheCTNR;    

    console.log("LACRE", $scope.oDetalheCTNRAlterar.ds_Lacre);

    if($scope.oDetalheCTNRAlterar.ds_Lacre != undefined & $scope.oDetalheCTNRAlterar.ds_Lacre != "")
    {
      var atag = []; //$scope.oDetalheCTNRAlterar.ds_Lacre.split("/");
      var tag = {};

      //atag.forEach(function(elemento)
      //{
      //  console.log(elemento);
      //});

      $scope.oDetalheCTNRAlterar.ds_Lacre.split("/").forEach(function(elemento)
      {
        console.log(elemento);

        tag.text = elemento;

        atag.unshift(angular.copy(tag));
      });

    }
    else
    {
      console.log("nao tem lacre");
    }

    console.log(atag);

    $scope.oDetalheCTNRAlterar.ds_LacreTag = atag;

    //$scope.oDetalheCTNRAlterar.ds_LacreTag = [{"text":"Jean"},{"text":"Carlos"}];
  };
  /*
  $scope.$watch('oDetalheCTNRAlterar.ds_Lacre', function(value){
    console.log("changed tag", value);
    tagLacre = value;
    
      $('.tagLacre input').val(value);
    
  });
  */

  $scope.evtClickDuplicarEquipamento = function(oDetalheCTNR){
    $scope.oDetalheCTNRAlterar = angular.copy(oDetalheCTNR);
    $scope.oDetalheCTNRAlterar.id_ContainerDetalhe = 0;
    $scope.oDetalheCTNRAlterar.ds_Container = "";
    $scope.oDetalheCTNRAlterar.ds_Lacre = "";    
  };

  $scope.ValuesChange = function(oDado) {
    if(angular.isDefined(oDado.kg_Tara))
    {
      oDado.kg_Tara = String(oDado.kg_Tara).replace(',', '.');
    }
    if(angular.isDefined(oDado.kg_VGM))
    {
      oDado.kg_VGM = String(oDado.kg_VGM).replace(',', '.');
    }
  }

  isSelecionado = function (_booking) {
    if (_booking.selecionado) { return _booking }
  };
  
  $scope.evtClickchkSelect = function(){
    var _lstBooking = [];
    _lstBooking = $scope.oConsolidada.lstConsolidadaReserva  

    $scope.lstBookingSelected = _lstBooking.filter(function (_booking) {

      if(isSelecionado(_booking))
      {
        console.log((_booking.nr_Booking == null || _booking.nr_Booking.trim() == '' ? 'a':'b'));
        if(_booking.nr_Booking == null || _booking.nr_Booking.trim() == '')
        {
          console.log('nao permitido');
        }
        else
        {
          console.log('permitido');
        }

        return _booking
      }
    })
    /*
    _lstBooking = lstReservaNaoAlocada()
    $scope.lstBookingSelected = _lstBooking.filter(function (_booking) {
      if(isSelecionado(_booking))
      {
          return _booking
      }
    })
*/
    //console.log($scope.lstBookingSelected);
  }

  $scope.evtBlurETAArmador = function(){
    
    if($scope.oConsolidada.dt_Chegada == "" || $scope.oConsolidada.dt_Chegada == null)
    {
      $scope.oConsolidada.dt_Chegada = $scope.oConsolidada.dt_ETA;      
    }
   
    //preenche o ETD de acordo com o transit time
    if($scope.oConsolidada.dt_ETD == "" || $scope.oConsolidada.dt_ETD == null)
    {      
      var _atual = moment($scope.oConsolidada.dt_ETA, 'DD/MM/YYYY');
      var newDtETD = "";

      if(!_atual._isValid)
      {
        _atual = new moment($scope.oConsolidada.dt_ETA, 'YYYY-MM-DD');
        newDtETD = new moment(_atual).add($scope.oConsolidada.nr_TransitTime, 'days').format('DD/MM/YYYY');
      }
      else
      {
        newDtETD = new moment(_atual._i, 'DD/MM/YYYY').add($scope.oConsolidada.nr_TransitTime, 'days').format('DD/MM/YYYY');
      }
      //if(_atual._isValid)
      //{
        if(newDtETD != "Invalid date")        
        {
          $scope.oConsolidada.dt_ETD = newDtETD;
        }
      //}
    }

  };

  $scope.evtBlurETDArmador = function(){

    if($scope.oConsolidada.dt_Saida == "" || $scope.oConsolidada.dt_Saida == null)
    {
      $scope.oConsolidada.dt_Saida = $scope.oConsolidada.dt_ETD;
    }
  };

  $scope.evtBlurChegadaEstimadaArmador = function(){

    if($scope.oConsolidada.dt_ChegadaEstimadaDestCliente == "" || $scope.oConsolidada.dt_ChegadaEstimadaDestCliente == null)
    {
      $scope.oConsolidada.dt_ChegadaEstimadaDestCliente = $scope.oConsolidada.dt_ChegadaEstimadaDest;
    }
  };

  $scope.evtBlurEnvioDraft = function(){

    if($scope.oConsolidada.dt_EnvioDraftCliente == "" || $scope.oConsolidada.dt_EnvioDraftCliente == null)
    {
      $scope.oConsolidada.dt_EnvioDraftCliente = $scope.oConsolidada.dt_EnvioDraft;
    }
  }

  $scope.evtBlurHrEnvioDraft = function(){
    if($scope.oConsolidada.hr_EnvioDraftCliente == "" || $scope.oConsolidada.hr_EnvioDraftCliente == null)
    {
      $scope.oConsolidada.hr_EnvioDraftCliente = $scope.oConsolidada.hr_EnvioDraft;
    }
  }

  $scope.evtBlurDtRecebtoCargaGeral = function(){

    if($scope.oConsolidada.dt_RecebtoCargaGeralCliente == "" || $scope.oConsolidada.dt_RecebtoCargaGeralCliente == null)
    {
      $scope.oConsolidada.dt_RecebtoCargaGeralCliente = $scope.oConsolidada.dt_RecebtoCargaGeral;
    }
  }

  $scope.evtBlurHrRecebtoCargaGeral = function(){
    
    if($scope.oConsolidada.hr_RecebtoCargaGeralCliente == "" || $scope.oConsolidada.hr_RecebtoCargaGeralCliente == null)
    {
      $scope.oConsolidada.hr_RecebtoCargaGeralCliente = $scope.oConsolidada.hr_RecebtoCargaGeral;
    }
  }

  $scope.evtBlurDtRecebtoCargaImo = function(){

    if($scope.oConsolidada.dt_RecebtoCargaImoCliente == "" || $scope.oConsolidada.dt_RecebtoCargaImoCliente == null)
    {
      $scope.oConsolidada.dt_RecebtoCargaImoCliente = $scope.oConsolidada.dt_RecebtoCargaImo;
    }
  }

  $scope.evtBlurHrRecebtoCargaImo = function(){
    
    if($scope.oConsolidada.hr_RecebtoCargaImoCliente == "" || $scope.oConsolidada.hr_RecebtoCargaImoCliente == null)
    {
      $scope.oConsolidada.hr_RecebtoCargaImoCliente = $scope.oConsolidada.hr_RecebtoCargaImo;
    }
  }

  $scope.$watch('oConsolidada.tp_ViaDireto', function(){
    if(angular.isDefined($scope.oConsolidada))
    {
      console.log($scope.oConsolidada.tp_ViaDireto);
    }
  });

  $scope.ViewManifest = function()
  {
    //window.print();
    var url = 'bookingSheet.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') 
      + '&iConsolId=' + $scope.oConsolidada.id_Consolidada

      window.top.jaddTab("Booking Sheet", url);
      
    //window.open("manifestReport.html", url);
    //window.open(url);
  };

  $scope.ViewStorageMap = function()
  {
    //console.log("imprimir");
    //window.print();
    var url = 'MapaEstufagem.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') 
      + '&iConsolId=' + $scope.oConsolidada.id_Consolidada;

    window.top.jaddTab("Mapa Estufagem", url);
    //window.open("manifestReport.html", url);
    //window.open(url);
  };

  $scope.addPreviaCtnr = function(_oNewPreviaCtnr)
  {
    var sErr = "";

    if(_oNewPreviaCtnr == undefined){sErr = "Dados inválidos"}
    else if(_oNewPreviaCtnr.quantity == undefined){sErr = "Quantidade inválida"}
    else if(_oNewPreviaCtnr.quantity <= 0){sErr = "Quantidade inválida"}
    else if(_oNewPreviaCtnr.typeContainer == undefined){sErr = "Equipamento inválido"}

    var oCtnr = {
      "id_ContainerDetalhe":0,
      "id_Consolidada": $scope.oConsolidada.id_Consolidada,
      "ds_TipoContainer": _oNewPreviaCtnr.typeContainer,
      "ds_Container": ""
    };

    if(sErr == ""){
      
      
      $scope.loadingState = true;
      operacaoServicos.addEquipment(_oNewPreviaCtnr.quantity, oCtnr).then(
            function(response){
              $scope.oConsolidada.lstDetalheCTNR = response;
              $scope.loadingState = false;
            }
        ), function(err){
          console.log(err);
          $scope.loadingState = false;
        };

        $scope.oNewPreviaCtnr.typeContainer = "";
        $scope.oNewPreviaCtnr.quantity = "";
      
        parent.parent.alertify.success("Equipamento gerado");
    }
    else
    {
      console.log(sErr);
      parent.parent.alertify.error(sErr);
      return;
    }
  };


  $scope.carregarobjCalaulo = function(){

    var _lsCTNR = "";

    if($scope.oConsolidada.lstDetalheCTNR.length > 0)
    {
      $scope.oConsolidada.lstDetalheCTNR.forEach(function(elemento){
        console.log("ctnr", elemento.ds_Container);
        _lsCTNR += elemento.ds_TipoContainer.trim() + ","
      });

      if(_lsCTNR.trim() != "")
      {
        _lsCTNR = _lsCTNR.substr(0, _lsCTNR.length - 1);
      }
    }

    $scope.oParamCalculoJson = {
        "aUsuarioSessao":"094711A9-8B99-42A2-9AF9-F14920FF9EED",
        "origem":$scope.oConsolidada.id_CidadeOrigem,
        "destino":$scope.oConsolidada.id_CidadeDestino,
        "armador":$scope.oConsolidada.id_Armador,
        "agenteDestino":$scope.oConsolidada.id_Agente,        
        "equipamentos":_lsCTNR
    }
  
  };
  
  $scope.getValuesContainer = function(_oParamCalculoJson){
    
    $scope.loadingState = true;

    $scope.carregarobjCalaulo();

    //var oRetorno = operacaoServicos.getValuesContainer($scope.sServicoCalculo, $scope.oParamCalculo, $scope.oParamCalculoJson);
    //----------------

    var _sJson = $scope.oParamCalculoJson;
        
      var param = ""
      //var param = 'aUsuarioSessao=094711A9-8B99-42A2-9AF9-F14920FF9EED';
      param = param +'agenteDestino=' + _sJson.agenteDestino;
      param = param + '&armador=' + _sJson.armador;
      param = param + '&destino=' + _sJson.destino;
      param = param + '&equipamentos=' + _sJson.equipamentos;
      param = param + '&origem=' + _sJson.origem;
      param = param + '&qtd=' + _sJson.qtd;

      console.log("parametros", param);

      operacaoServicos.buscaWS("/WVDF_WS/ws_HCGS3000.wso/fCalculoOperacional/JSON", param)                
        .then(function(response) {
            console.log("retorno");
            console.log(response);
            $scope.oValuesConsol.valuesContainer =  response;
            $scope.loadingState = false;
          return response;
        }, function(err){
          console.log("erro", err);
          $scope.loadingState = false;
          return err;
        });
      
    //-----------
  };

  $scope.isContainerValid = function()
  {  
    var bretorno = true;

    if($scope.oDetalheCTNRAlterar != undefined)
    {
      if($scope.oDetalheCTNRAlterar.ds_Container != undefined && $scope.oDetalheCTNRAlterar.ds_Container != "")    
      {
        var date_regex = /^\w{4}-\d{3}\.\d{3}-\d{1}$/;

        if($scope.oDetalheCTNRAlterar.ds_Container.trim.length > 14){ bretorno = false;}


        if(! date_regex.test($scope.oDetalheCTNRAlterar.ds_Container))
        {
          bretorno = false;
        }      
      }    
    }
    return bretorno;

  }

  $scope.containerInvalid = function()
  {
    if(!$scope.isContainerValid())
    {
      return "alert-danger"
    }
  }

  load();
});