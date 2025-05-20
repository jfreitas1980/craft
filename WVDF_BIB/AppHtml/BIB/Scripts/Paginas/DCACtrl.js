var app = angular.module("CROSSApp", ["uiDates"]);

angular.module("CROSSApp").factory("DCAServicos", function($http, $location, $window, $filter){

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
            //urlAPI = "http://192.168.6.23/api/";
            urlAPI = "http://localhost:21651/";
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

    _getByBooking = function(_Id){
        var url = _getUrlAPIs() + "cross/dca/GetbyBooking/" + _Id;

        console.log(url);

        return $http.get(url);
        
    };

    _getUNList = function(_Id){
        var url = _getUrlAPIs() + "cross/dca/GetUNList/" + _Id;

        console.log(url);

        return $http.get(url);
        
    };


    _gravar = function(_oDCA)
    {
        var url = _getUrlAPIs() + "cross/dca";        
        var sMetodo = 'post';
        
        if(angular.isDefined(_oDCA.id_DCAForm) && _oDCA.id_DCAForm > 0)
        {
            sMetodo = 'patch';
        }

        console.log("Metodo", sMetodo);

        return $http({
            method: sMetodo,
            url: url,
            data: _oDCA
          }).then(
            function successCallback(response) {   
                parent.parent.alertify.success("Gravação efetuada");
                return response.data;
            },
            function errorCallback(response) {
                parent.parent.alertify.error(response.data);
                return response.data;
            }   
        );

    }

    _getNewDca = function(_IdBooking){        
        var url = _getUrlAPIs() + "cross/dca/GetNewFormDCA/" + _IdBooking;

        console.log(url);

        return $http.get(url);
    }

    _getListIMDG = function(_codUn){
        var url = _getUrlAPIs() + "Cadastro/CodigoUN/GetByCode/" + _codUn;
        return $http.get(url);
    }

    _getEMS = function(){
        var url = _getUrlAPIs() + "Cadastro/CodigoEMS";

        return $http.get(url).then(function(response){
            console.log(response.data);
            return response.data;
        }).catch(function(response){
            console.log("err", response);
            return response;
        });    
    };

    _getlstInnerPackaging = function(){
        var url = _getUrlAPIs() + "Cadastro/InnerPackaging";

        return $http.get(url).then(function(response){
            console.log(response.data);
            return response.data;
        }).catch(function(response){
            console.log("err", response);
            return response;
        });    
    };

    _getPackageType = function() {
        return _buscaWS('/WVDF_WS/ws_CCGS228.wso/f_CCGS228_pkg_type/JSON', '').then(function(response) {
            return response;
        });
    }

    var dcaServico = {
        getNewDca: _getNewDca,
        getDCA: _getDCA,
        getByBooking: _getByBooking,
        gravar: _gravar,
        getListIMDG : _getListIMDG,
        getEMS: _getEMS,
        getlstInnerPackaging: _getlstInnerPackaging,
        getPackageType: _getPackageType,
        getUNList: _getUNList
    };

    return dcaServico;
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

angular.module("CROSSApp").controller("DCACtrl", function($scope, DCAServicos, $filter){
    $scope.oDCA = {};
    $scope.lstDCA = [];
    $scope.lstEMS = [];
    $scope.UNList = [];
    $scope.lstPackage = [];
    $scope.lstInnerPackaging = [];
    $scope.Id_BookingAtual = 0;    

    function toDate(dateStr) {
        var Dateparts;

        if(dateStr != null)
        {
            Dateparts = dateStr.split("/")  

            if(Dateparts.length == 3)
            {   
                return Dateparts[2] + '-' + Dateparts[1]  + '-' + Dateparts[0];
            }else{
                return dateStr;
            }
        }
    }

    $scope.gravar = function(){
        
        if($scope.oDCA.vl_GrossCargoWeight <= 0){
            parent.parent.alertify.error("Preencha o campo: Gross Cargo Weight");
            return;
        }
        if($scope.oDCA.kg_Net <= 0){
            parent.parent.alertify.error("Preencha o campo: Net(KG)");
            return;
        }

        $scope.loadingState = true;
        if ($scope.oForm.$valid) {

            
            $scope.oDCA.id_Booking = getVariavelURL2("bookingId");

            $scope.oDCA.dt_TankLastInspection = toDate($scope.oDCA.dt_TankLastInspection );
            $scope.oDCA.ds_EMSMFAGNumbers = $('#id_EMSMFAGNumbers :selected').text();
            $scope.oDCA.ds_InnerPackaging = $('#id_InnerPackaging :selected').text();
            $scope.oDCA.ds_OuterPackaging = $('#id_OuterPackaging :selected').text();
            
            DCAServicos.gravar($scope.oDCA).then(function(response){
                $scope.lstDCA = response;                
            }, function(err){
                console.log(err);
            });        
        }
        else{
            parent.parent.alertify.error("Preencha todos os campos obrigatórios!");
            $scope.loadingState = false;
        }
        
    };

    $scope.getListIMDG = function(){
        if($scope.oDCA.nr_IMDGUNNumber > 0)
        {
            DCAServicos.getListIMDG($scope.oDCA.nr_IMDGUNNumber).then(function(response){
                $scope.lstIMDG = response.data;
            }, function(err){
                console.log(err);
            });
        }
        else if($scope.oDCA.nr_IMDGUNNumber <= 0){
            $scope.lstIMDG = [];
        }
    }

    getListEMS = function(){
        DCAServicos.getEMS().then(function(response){
            $scope.lstEMS = response;
            $scope.loadingState = false;
        }).catch(function(response){
            console.log("err", response);            
        });  
    }

    carregarlstInnerPackaging = function(){
        $scope.loadingState = true;

        DCAServicos.getlstInnerPackaging().then(function(response){
            $scope.lstInnerPackaging = response;
            $scope.loadingState = false;
        }).catch(function(response){
            console.log("err", response);            
            $scope.loadingState = false;
        });            
    };

    loadUNList = function(_Id_BookingAtual){

        $scope.loadingState = true;

        DCAServicos.getUNList(_Id_BookingAtual).then(function(response){
            $scope.UNList = response.data;
            $scope.loadingState = false;
        }).catch(function(response){
            console.log("err", response);            
            $scope.loadingState = false;
        });
    };

    $scope.changeProper = function()
    {
        var _oIMDG = {};
        var Indice = -1;
  
        $scope.lstIMDG.forEach(function(element){
            if(element.id_CodigoUN == $scope.oDCA.id_ProperShippingName)
            {
                _oIMDG = element;
            }
        });

        if(_oIMDG != null)
        {

            $scope.oDCA.tp_MarinePollutant = (_oIMDG.ds_MarinePollutantIMDGCode == null ? "--" : _oIMDG.ds_MarinePollutantIMDGCode);
            $scope.oDCA.ds_FlashPoint =  (_oIMDG.ds_FlashPointMin == null ? '' : _oIMDG.ds_FlashPointMin) + ' - ' + (_oIMDG.ds_FlashPointMax == null ? '' : _oIMDG.ds_FlashPointMax);
            $scope.oDCA.ds_PagePackingGroup = _oIMDG.ds_PackingGroup;
            $scope.oDCA.id_EMSMFAGNumbers = _oIMDG.id_CodigoEMS;
            $scope.oDCA.ds_ProperShippingName = _oIMDG.ds_ProperShippingName;
        }
    };
    
    $scope.$watch('oDCA.vl_GrossCargoWeight', function(){
        if(angular.isDefined($scope.oDCA.vl_GrossCargoWeight))
        {

          $scope.oDCA.vl_GrossCargoWeight = String($scope.oDCA.vl_GrossCargoWeight).replace(',', '.');
        }
    });

    $scope.$watch('oDCA.kg_Net', function(){
        if(angular.isDefined($scope.oDCA.kg_Net))
        {          
          $scope.oDCA.kg_Net = String($scope.oDCA.kg_Net).replace(',', '.');
        }
    });

    $scope.$watch('oDCA.nr_VolM3', function(){
        if(angular.isDefined($scope.oDCA.nr_VolM3))
        {
          $scope.oDCA.nr_VolM3 = String($scope.oDCA.nr_VolM3).replace(',', '.');
        }
    });    

    $scope.changeIMDG = function(){
        $scope.getListIMDG();
    };

    $scope.viewDCA = function(_IdDCAForm){

        var url = 'dca_print.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') 
        + '&IdDCAForm=' + _IdDCAForm;   
        
        window.top.jaddTab("Impressão DCA", url);
    };

    getListPackage = function(){
        console.log("packages");
        DCAServicos.getPackageType().then(function(response){
            $scope.lstPackage =  response;
        }, function(err){
            console.log(err);
        });
        
            //$scope.lsPackages = data;
        //};
        
    };

    $scope.setClassPreenchido = function(_oDCA){      
        switch (_oDCA.ds_StatusDCA) {
            case "OK":
                return "text-success";
                break;
            default:
                return "text-danger";                        
                break;
        } 
    };

    $scope.carregarDCA= function(_oDCA){
        $scope.oDCA = _oDCA;
    }


    load = function(){
        $scope.Id_BookingAtual =  getVariavelURL2("bookingId");
        getListEMS();
        getListPackage();
        carregarlstInnerPackaging();        
        loadUNList($scope.Id_BookingAtual);
    };

    load();

});
