angular.module("CROSSApp").factory("CadastroEmbalagemServico", function($window, $location, $http){
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

    function _get(){
        var url = _getUrlAPI() + "Cadastro/Embalagem";

        return $http.get(url).then(function(response){
            console.log(response.data);
            return response.data;
        }).catch(function(response){
            console.log("err", response);
            return response;
        });    
    };

    function _getById(value){
        var url = _getUrlAPIs() + "Cadastro/Embalagem/" + value;

        return $http.Get(url).then(function(data){
            console.log(data);
            return data;
        }).catch(function(data){
            console.log("err", data);
            return data;
        });    
    };

    function _save(value){
        var url = _getUrlAPI() + "Cadastro/Embalagem";

        console.log(value);
        
        if(value.recnum > 0)
        {
        
            url =url + "/" + value.recnum
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

    function _Excluir(value){
        var url = _getUrlAPI() + "Cadastro/Embalagem";
        if(value.recnum > 0)
        {
            url =url + "/" + value.recnum
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

    function _getlstInnerPackaging(){
        var url = _getUrlAPI() + "Cadastro/InnerPackaging";

        return $http.get(url).then(function(response){
            console.log(response.data);
            return response.data;
        }).catch(function(response){
            console.log("err", response);
            return response;
        });    
    };

    var CadastroEmbalagemServico = {
        save : _save,
        Excluir : _Excluir,
        get : _get,
        getById : _getById,
        getlstInnerPackaging : _getlstInnerPackaging
    };

    return CadastroEmbalagemServico;
});