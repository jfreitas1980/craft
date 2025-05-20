app = angular.module("CROSSApp", []);

angular.module("CROSSApp").controller("manifestReportCtrl", function($scope, $window,$location, $http){
    $scope.oManifest = {};

    $scope.printBook = function()
    {      

      var btn = document.getElementById('btnPrintManifest');
      
      btn.style.display = 'none';

      window.print();

      btn.style.display ='initial';
    }

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
      else
      {
          parent.parent.alertify.error("error");
      }
      
     return urlAPI;
  };

    $scope.GetManifest = function(_Id){
      var url = _getUrlAPIs() + "cross/Consolidation/PrintManifest/" 
              +  getVariavelURL("iConsolId")
              + "/" + getVariavelURL("aUsuarioSessao")

      console.log(url);
      
      $http.get(url).then(function(response){
        console.log("ok", response);
        $scope.oManifest = response.data;
      }).catch(function(err){
        console.log("err",err);
      });
      
    }

    load = function()
    {

      var css = '@page { size: landscape; }',
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

      $scope.GetManifest();
    }

    load();

});