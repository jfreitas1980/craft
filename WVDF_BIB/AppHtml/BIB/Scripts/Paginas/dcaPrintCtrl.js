var app = angular.module("CROSSApp",[]);

angular.module("CROSSApp").factory("DCAPrintServico", function($http, $location, $window, $filter){

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

    _getUrlAPIs = function(){
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
        else if (baseUrl == "http://localhost/") 
        {
            urlAPI = "http://localhost:21651/";
        }
        else
        {
            parent.parent.alertify.error("error");
        }
        
       return urlAPI;
    };

    _getDCA = function(_Id){
        var url = _getUrlAPIs() + "cross/dca/" + _Id;

        console.log(url);

        return $http.get(url);
        
    };

    var DCAPrintServico = {
        getDCA: _getDCA
    };

    return DCAPrintServico;
});

angular.module("CROSSApp").controller("DCAPrintCtrl", function($scope, DCAPrintServico){
    $scope.oDCA = {};

    $scope.printDCA = function()
    {      
      var btn = document.getElementById('btnPrint');
      
      btn.style.display = 'none';

      window.print();

      btn.style.display ='initial';
    }

    load = function(){
        var css = '@page { size:  portrait; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        
        style.type = 'text/css';
        style.media = 'print';
        
        if (style.styleSheet){
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
        
        head.appendChild(style);

        DCAPrintServico.getDCA(getVariavelURL2("IdDCAForm")).then(function(response){
            console.log("OK", response);
            $scope.oDCA = response.data;
            //$scope.printDCA();
        }, function(err){
            console.log("err", err);
        });
    };

    load();

});
