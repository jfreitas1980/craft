angular.module("CROSSApp", []);

angular.module("CROSSApp").controller("blEletronicoAcessoClienteCtrl", function($scope, blEletronicoAcessoClienteServico, $window){

    $scope.oAccess = {};
    $scope.tipoAlerta = "alert alert-danger";
    
    $scope.open = function(_Token){
        
        $scope.oAccess = {};

        blEletronicoAcessoClienteServico.OpenBL(_Token).then(function(response) {
            console.log(response);
            $scope.oAccess = response.data;

            if(angular.isDefined($scope.oAccess))
            {
                console.log($scope.oAccess);
                if($scope.oAccess.tp_Valido == true)
                {
                    $scope.chamarTelaBLEletronico($scope.oAccess.id_Documento);
                }
                else
                {
                    console.log($scope.oAccess.ds_Mensagem);
                }
            }

        }, function(response) {
            console.log('ops! something went wrong!!');
        });
    }

    $scope.sendToken = function(){
        var _bookingId = getVariavelURL2('booking') ;
        console.log(_bookingId);
        if(angular.isDefined(_bookingId) && (_bookingId != ''))
        {
            blEletronicoAcessoClienteServico.sendEmailToken(_bookingId)
            .then(function(response){
                console.log("ok",response);
                $scope.oAccess.ds_Mensagem = response.data;
                $scope.tipoAlerta = "alert alert-success";
            },function(response){
                console.log("err",response);
                $scope.oAccess.ds_Mensagem = response.data;
            });
            
        }
        else
        {
            $scope.oAccess.ds_Mensagem = 'ops! something went wrong!';
            $scope.tipoAlerta = "alert alert-danger";
            console.log('ops! something went wrong!!!!!');
        }
    };

    $scope.chamarTelaBLEletronico = function (_idBooking) {
        //console.log(getVariavelURL('aUsuarioSessao'));
        
        var url = 'BLEletronico.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') 
        + '&id_BLEletonico=0' 
        + '&id_Booking=' + _idBooking
        +'&token=' + $scope.oAccess.ds_Token
        +'&tipoAcesso=1';

        //window.top.jaddTab("BL Eletronico", url);
        window.location.replace(url);
        
       //console.log("chamar tela bl");
    };

});

angular.module("CROSSApp").factory("blEletronicoAcessoClienteServico", function($http, $location, $window){
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

    _OpenBL = function(_Token)
    {
        var url = _getUrlAPI() + 
            "cross/BLEletronic/ValidaTokenClient/" + _Token;
            
            return $http({
                method: 'POST',
                url: url,
            }).then(function(response) {
                console.log(response);
                return response
            }).catch(function(response) {
                
                return response
            });   
    };

    _sendEmailToken = function(_BookingId)
    {          
        var url = _getUrlAPI() + 
            "security/SendEmailNewTokenBL/" + _BookingId;

        return $http({
            method: 'POST',
            url: url,
        });
        /*.then(function(response) {
            return response
        }).catch(function(response) {
            console.log(response.message);
            return response.message;
        });           
        */
    };
    
    var blEletronicoAcessoClienteServico ={
        sendEmailToken : _sendEmailToken,
        OpenBL: _OpenBL
    };

    return blEletronicoAcessoClienteServico;

});
