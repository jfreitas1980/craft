angular.module("CrossApp").factory("BLServicos", function($http, $location, $window){

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

    _getUrlAPI = function(){
        var baseUrl = new $window.URL($location.absUrl()).origin;
        var urlAPI = "https://crm.grupocraft.com.br/api/";

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

    function _getById(_BLId, _Token){
        var url = _getUrlAPIs() + "cross/BLEletronic/" + _BLId
        + "/" + _Token;

        return $http.get(url).then(function(data){
            console.log("ret", data);
            return data;
        }).catch(function(data){
            console.log("err", data);
            return data;
        });        
    };

    function _printBL(_bookingId, _Token){
        var url = _getUrlAPIs() + "cross/BLEletronic/GetBookingPrint/" + _bookingId
        + "/" + _Token;

        return $http.get(url).then(function(data){
            console.log("ret", data);
            return data;
        }).catch(function(data){
            console.log("err", data);
            return data;
        });        
    };

    function _getNewBL(_BookingId, _Token)
    {
        var url = _getUrlAPIs() + "cross/BLEletronic/NewBL/" 
            + _BookingId
            + '/' + _Token;

        return $http.get(url).then(function(data){
            console.log("ret", data);
            return data;
        }, function(data){
            console.log("err4", data);
            return data;
        });   
    };

    function _getNewBLClient(_BookingId, _Token)
    {
        var url = _getUrlAPIs() + "cross/BLEletronic/OpenBLClient/" 
            + _BookingId
            + '/' + _Token;

        return $http.get(url).then(function(response){
            return response;
        }, function(err){            
            return err;
        });   
    };

    function _gravarBL(_oBL, _Token)
    {
        var url = _getUrlAPIs() + "cross/BLEletronic" + "/" + getVariavelURL("aUsuarioSessao")
        + '/' + _Token;
        
        return $http.post(url, _oBL);

        /*return $http.post(url, _oBL).then(function(data){
            console.log("ret", data);
            parent.parent.alertify.success("Versão Gerada");
            return data;
        },function(response){
                        
            if(angular.isDefined(response.data))
            {
                console.log("response.data");
                console.log(response.data);
                parent.parent.alertify.error(response.data.Message);
            }
            parent.parent.alertify.error(response.Message);
            return response;
        }); 
        */
    }

    _validarBL = function(_validarBL){
        
        var url = _getUrlAPIs() + "cross/BLEletronic/validarBL/"         
            + _validarBL
            + '/' + getVariavelURL("id_Reserva")
            + '/' + getVariavelURL("aUsuarioSessao");

        console.log(url);

        return $http.get(url).then(function(response){
            return response;
        }, function(err){            
            return err;
        });   
    };
    
    var BLServicos = {
        getById: _getById, 
        getNewBL: _getNewBL,
        getNewBLClient: _getNewBLClient,
        gravarBL: _gravarBL,
        validarBL: _validarBL,
        printBL: _printBL        
    };

    return BLServicos;
});