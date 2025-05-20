angular.module("scheduleServices", [])
angular.module("scheduleServices").factory("scheduleServices", function($http, $q, $window, $location){    

    _getUrlAPI = function(){
        var baseUrl = new $window.URL($location.absUrl()).origin;

        if (baseUrl == "http://192.168.6.18") 
        {
            urlAPI = "http://192.168.6.23/api/";
            //urlAPI = "http://localhost:21651/";
        }
        else if (baseUrl == "http://craftcross.grupocraft.com.br")
        {
            urlAPI = "http://crm.grupocraft.com.br/api/";  
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


    var scheduleServices = {
        getNavios: _getNavios,
        scheduleBookCROSS: _scheduleBookCROSS
    };
    return scheduleServices;
});