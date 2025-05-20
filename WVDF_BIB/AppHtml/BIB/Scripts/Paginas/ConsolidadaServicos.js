angular.module("CROSSApp").factory("operacaoServicos", function($http, $q, $window, $location){    

    _getUrlAPI = function(){
        var baseUrl = new $window.URL($location.absUrl()).origin;
        var urlAPI = "";
        
        if (baseUrl == "http://192.168.6.18") 
        {
            urlAPI = "http://192.168.6.23/api/";
            //urlAPI = "http://localhost:21651/";
        }
        else if (baseUrl == "http://craftcross.grupocraft.com.br")
        {
            urlAPI = "http://crm.grupocraft.com.br/api/";  
        }
        else if (baseUrl == "https://craftcross.grupocraft.com.br")
        {
			urlAPI = "https://crm.grupocraft.com.br/api/";
		}
        else
        {
            parent.parent.alertify.error("error");
        }
        
       return urlAPI;
    };

    _buscaWS = function (url, parametros) {
        return $http.get(
            url +
                "?aUsuarioSessao=" +
                getVariavelURL("aUsuarioSessao") +
                "&" +
                parametros
        ).then(function(res) {
            return res.data;
        });
    };

    function _gravar(oData, metodo){        
        var url = _getUrlAPI() + "cross/Consolidation"

        return $http({
            method: metodo,
            url: url,
            data: oData
          }).then(
            function successCallback(response) {   
                parent.parent.alertify.success("Gravação efetuada no CROSS");
                //_enviarNetShip(oData.id_Consolidada)
                console.log("FCROSS OK");
                return response.data;
            },
            function errorCallback(response) {
              //console.log(response);
              console.log("FCROSS ERROR");
              parent.parent.alertify.error(response.data);
              return response.data;
            }   
        );
    };

    function _enviarNetShip(iConsolidadaID){ 
        console.log(iConsolidadaID);       
        var url = _getUrlAPI() + "cross/Consolidation/EnviarNetShip/" + iConsolidadaID
        return $http({
            method: "Get",
            url: url
          }).then(function(response){
                console.log("NetShipOK");     
                parent.parent.alertify.success("NetShip atualizado: " + response.data);    
                
                return response;
          }, function errorCallback(response) {
              console.log("NetShipErr");
              parent.parent.alertify.error(response.data.Message);
              
              return response;              
        });        
    };

    function _getConsolidada(value) {      

        var url = _getUrlAPI() + "cross/Consolidation/" + value;
        return $http({
          method: "GET",
          url: url
        }).then(
          function mySuccess(response) {
            return response.data;
          },
          function myError(response) {
            console.log(response);
          }
        );
    };
    
    /*
    function _getLstConsolidadas(value) {
        var url = _getUrlAPI() + "cross/Consolidation/GetAll";
        console.log(url);
        var data;
        return $http({
          method: "Post",
          url: url,
          data: value
        }).then(
          function mySuccess(response) {
            //data = response.data;
            //console.log(data);
            return response.data;
            //deffered.resolve(data);
          },
          function myError(response) {
            parent.parent.alertify.error(response.data);
            //console.log(response.status);
          }
        );
    };
    */
    /*
   function _getLstConsolidadas(value) {
        var url = _getUrlAPI() + "cross/Consolidation/ConsultaConsol";
        console.log(url);
        var data;
        return $http({
        method: "Post",
        url: url,
        data: value
        }).then(
        function mySuccess(response) {
            //data = response.data;
            //console.log(data);
            return response.data;
            //deffered.resolve(data);
        },
        function myError(response) {
            parent.parent.alertify.error(response.data);
            //console.log(response.status);
        });
    };  
    */
    function _getLstConsolidadas(value) {
        var url = _getUrlAPI() + "cross/Consolidation/Search";
        console.log(url);
        
        if(value.currentPage == null || value.currentPage <= 0)
        {
            value.currentPage = 1;
        }

        if(value.pageSize == null || value.pageSize <= 0)
        {
            value.pageSize = 20;
        }

        return $http({
        method: "Post",
        url: url + "?",
        data: value
        }).then(
        function mySuccess(response) {
            //data = response.data;
            console.log(response.data);
            return response.data.items;
            //deffered.resolve(data);
        },
        function myError(response) {
            parent.parent.alertify.error(response.data);
            //console.log(response.status);
        });
    };  
    
    function _getNavios(value){
        value = value.replace(/[\/.-]/g, "")
            
        var url = _getUrlAPI() + "cross/Consolidation/GetShipbyName/" + value;
        return $http({method: "GET", url: url}).then(
            function mySuccess(response) {		
                return response.data;
            },
            function myError(response) {
                parent.parent.alertify.error(response.data);
            }
        );
    };

    //var url =  "http://localhost:21651/cross/Consolidation/GetAllFormType";
    function _getTipoFormulario(){
        var url = _getUrlAPI()  + "cross/Consolidation/GetAllFormType";    
        
        return $http({method: "GET", url: url}).then(			
            function mySuccess(response) {
                return response.data;
            },
            function myError(response) {
                parent.parent.alertify.error(response.data);
            }           
        );
    };

    function _getTipoEmissaoBL(){
        var url = _getUrlAPI()  + "cross/Consolidation/GetAllTipoEmissaoBL";    
        
        return $http({method: "GET", url: url}).then(			
            function mySuccess(response) {
                return response.data;
            },
            function myError(response) {
                parent.parent.alertify.error(response.data);
            }           
        );
    };
    
    function _delete(value){
        //value = value.replace(/[\/.-]/g, "")
        
        var url = _getUrlAPI() + "cross/Consolidation/?ConsolidadaId=" + value + "&CrossSessionID=" + getVariavelURL("aUsuarioSessao");
        
        return $http({method: "Delete", url: url}).then(
            function mySuccess(response) {	
                parent.parent.alertify.success("Exclusão efetuada no CROSS");	                
                return response.data;
            },
            function myError(response) {
                console.log(response.data);
            parent.parent.alertify.error(response.data);
            }
        );
    };
    
    function _getPessoas(sNome, CSAG319_ID) {
        if (sNome.length > 2) {
            sNome = sNome.replace(/[\/.-]/g, "").trim();
            var url = _getUrlAPI() + 'crm/pesquisaPessoa/BuscaPessoaPorTipo/?sNome=' + sNome + '&CSAG319_ID=' + CSAG319_ID;
            return $http({
            method: "GET",
            url: url
            }).then(
            function mySuccess(response) {
                //$scope.retornoCliente = response.data;
                return response.data;
            },
            function myError(response) {
                parent.parent.alertify.error(response.data);
            }
            );
        }
    };

    function _loadContinentes(query) {
        var parametros = 'aInicio=' + query;
        var data = _buscaWS('/WVDF_WS/ws_CSAG399.wso/autoContinentes/JSON', parametros)
            .then(function(data) {
                return data;
            });
        return data;

    };

    function _getPais(query, tipo) {
        var continente = '';
        var parametros = 'aInicio=' + query;
        if (tipo == 'D') {
            parametros += '&aCont=' + continente;
        }
        if (tipo == 'O') {
            parametros += '&aCont=' + continente;
        }
        var data = _buscaWS('/WVDF_WS/ws_CSAG329.wso/autoPaises/JSON', parametros)
            .then(function(data) {
                //console.log(data);
                return data;
            });
        return data;
    }

    function _getCidades(query, paisID) {
        if (paisID == undefined) paisID = "";
        if (query.length > 2) {
          var parametros = "sPais=&sCidade=" + query + '&sMod=LCL' + '&sCliente=';
          
          var data = _buscaWS("/WVDF_WS/ws_csag325.wso/propostaCidadeOrigem/JSON", parametros)
            .then(function(data) {
              return data;
            });
          return data;
        }
    };

    function _getTiposContainer(){
        var url = _getUrlAPI() + 'cross/generic/GetTipoContainer';
        return $http.get(url).then(function(data){
            return data;
        }).catch(function(){
            parent.parent.alertify.error(data);
        });       
    };

    function _moveBookingConsolidation(BookingID, ConsolidadaID, Container){
        var url = _getUrlAPI() + "cross/Booking/AddBookingContainer?iBookingID=" + BookingID + "&iConsolidadaID=" + ConsolidadaID + "&sContainer=" + Container;
        return $http.post(url).then(function(data){
            return data;
        }).catch(function(){
            parent.parent.alertify.error(data);
        });
    };
    
    function _transferBookingContainer(BookingID, ConsolidadaID)
    {
        var url = _getUrlAPI() + "cross/Booking/AddBookingContainer?iBookingID=" + BookingID + "&iConsolidadaID=" + ConsolidadaID + "&sContainer=''&CrossSessionID=" + getVariavelURL("aUsuarioSessao");
        console.log(url);
    };

    function _scheduleBookCROSS(iPortoOrigId, iPortoDestId, iViaId, deadLine) 
    {
        var url = _getUrlAPI() + 'cross/Schedule/cross/' + iPortoOrigId + '/' + iPortoDestId + '/' + iViaId + '/LCL/'+ deadLine;

        return $http({
                        method: 'GET',
                        url: url,
                    }).then(function(response) {
                        return response
                    }).catch(function(response) {
                        console.log('ops no sucesssss2');
                    });        
    }

    function _transferContainer(iCurrentConsolidadaID, ds_Container, iNewConsolidadaID){
        //value = value.replace(/[\/.-]/g, "")
        
        var url = _getUrlAPI() + "cross/Consolidation/TransferContainer?iCurrentConsolidadaID="+ iCurrentConsolidadaID 
        + "&sContainer=" + ds_Container 
        + "&iNewConsolidadaID=" + iNewConsolidadaID 
        + "&CrossSessionID=" + getVariavelURL("aUsuarioSessao");
        
        return $http.post(url).then(
            function mySuccess(response) {	
                parent.parent.alertify.success("Transferência realizada");	                
                return response.data;
            },
            function myError(response) {
                console.log(response.data);
            parent.parent.alertify.error(response.data);
            }
        );
    };

    function _transferBooking(iBookingID, iCurrentConsolidadaID, iNewConsolidadaID){
        
        var url = _getUrlAPI() + "cross/Booking/TransferBooking?iBookingID="+ iBookingID
                            + "&iCurrentConsolidadaID="+ iCurrentConsolidadaID
                            + "&iNewConsolidadaID=" + iNewConsolidadaID
                            + "&CrossSessionID=" + getVariavelURL("aUsuarioSessao");
        //console.log(url);
        //headers: { 'Authorization': 'Bearer ' + $scope.crmtk }
        return $http.post(url).then(
            function mySuccess(response) {	
                parent.parent.alertify.success("Transferência realizada");	                
                return response.data;
            },
            function myError(response) {
                console.log(response.data);
            parent.parent.alertify.error(response.data);
            }
        );
        
    };

    function _addEquipment(_iQuantity, _oCtnr){
        
        var url = _getUrlAPI() + "cross/Consolidation/equipament/add?"              
                            + "quantity=" + _iQuantity                                          
                            + "&CrossSessionID=" + getVariavelURL("aUsuarioSessao");
        //console.log(url);
        //headers: { 'Authorization': 'Bearer ' + $scope.crmtk }
        return $http.post(url, _oCtnr).then(
            function mySuccess(response) {	
                parent.parent.alertify.success("equipamentos atualizado");	                
                return response.data;
            },
            function myError(response) {
                console.log(response);
            parent.parent.alertify.error(response);
            }
        );
        
    };

    function _getValuesContainer(_Funcao, _Param, _sJson){
        
        var param = ""
        //var param = 'aUsuarioSessao=094711A9-8B99-42A2-9AF9-F14920FF9EED';
        param = param +'agenteDestino=' + _sJson.agenteDestino;
        param = param + '&armador=' + _sJson.armador;
        param = param + '&destino=' + _sJson.destino;
        param = param + '&equipamentos=' + _sJson.equipamentos;
        param = param + '&origem=' + _sJson.origem;
        param = param + '&qtd=' + _sJson.qtd;

        console.log("parametros", param);

        var data = _buscaWS("/WVDF_WS/ws_HCGS3000.wso/fCalculoOperacional/JSON", param)                
          .then(function(response) {
              console.log("retorno");
              console.log(response);
            return response;
          }, function(err){
            console.log("erro", err);
            return err;
          });
          
          
          //return data;        
        
    };


    //Gerar Consolidada
    //WVDF.ws_hcgs3008.fSaveNetConsol($scope.traducao).then(function(data) {

    var operacaoServicos = {
        buscaWS: _buscaWS,
        getConsolidada: _getConsolidada,
        getLstConsolidadas: _getLstConsolidadas,
        getNavios: _getNavios,
        getPessoas: _getPessoas,
        loadContinentes: _loadContinentes,        
        getPais: _getPais,
        getCidades: _getCidades,
        delete: _delete,
        getTipoFormulario: _getTipoFormulario,
        getTipoEmissaoBL: _getTipoEmissaoBL,
        gravar: _gravar,
        getTiposContainer: _getTiposContainer,
        moveBookingConsolidation: _moveBookingConsolidation,
        transferBookingContainer: _transferBookingContainer,
        scheduleBookCROSS: _scheduleBookCROSS,
        transferContainer: _transferContainer,
        transferBooking: _transferBooking,
        enviarNetShip: _enviarNetShip,
        addEquipment: _addEquipment,
        getValuesContainer: _getValuesContainer
    };
    return operacaoServicos;
});