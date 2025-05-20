angular.module("CROSSApp").factory("IMO_CadastroIMDGServicos", function($window, $location, $http){
    
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

    function _getClass(){        
        var url = _getUrlAPI() + "cross/CCGS247"
        //console.log(url);

        return $http.get(url);

    };

    function _getUN(){
        var url = _getUrlAPI() + "Cadastro/CodigoUN";

        return $http.get(url).then(function(response){
            console.log(response.data);
            return response.data;
        }).catch(function(response){
            console.log("err", response);
            return response;
        });    
    };

    function _getUNById(value){
        var url = _getUrlAPIs() + "Cadastro/CodigoUN/" + value;

        return $http.Get(url).then(function(data){
            console.log(data);
            return data;
        }).catch(function(data){
            console.log("err", data);
            return data;
        });    
    };

    function _saveUN(value){
        var url = _getUrlAPI() + "Cadastro/CodigoUN";
        
        if(value.id_CodigoUN > 0)
        {
            url =url + "/" + value.id_CodigoUN
            url = url + "/" + getVariavelURL("aUsuarioSessao")
            console.log(url);
            return $http.patch(url, value).then(function(response){
                return response;
            }).catch(function(response){
                console.log("err", response);
                return response;
            });    

        }
        else{
            url = url + "/" + getVariavelURL("aUsuarioSessao")

            return $http.post(url, value).then(function(response){
                return response;
            }).catch(function(response){
                console.log("err", response);
                return response;
            });    
        }      
    };

    function _ExcluirUN(value){
        var url = _getUrlAPI() + "Cadastro/CodigoUN";

        if(value.id_CodigoUN > 0)
        {
            url =url + "/" + value.id_CodigoUN
            url = url + "/" + getVariavelURL("aUsuarioSessao")

            console.log(url);

            return $http.delete(url, value).then(function(response){
                return response;
            }).catch(function(response){
                console.log("err", response);
                return response;
            });    
        }
    };

    function _getEMS(){
        var url = _getUrlAPI() + "Cadastro/CodigoEMS";

        return $http.get(url).then(function(response){
            console.log(response.data);
            return response.data;
        }).catch(function(response){
            console.log("err", response);
            return response;
        });    
    };

    var IMO_CadastroIMDGServicos = {
        getClass : _getClass,
        saveUN : _saveUN,
        ExcluirUN : _ExcluirUN,
        getUN : _getUN,
        getUNById : _getUNById,
        getEMS : _getEMS
    };

    return IMO_CadastroIMDGServicos;
});