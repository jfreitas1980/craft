angular.module("CROSSApp").factory("reservaServicos", function($http, $location, $window){
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

    function _getByFiltro(oFiltro){
        var url = _getUrlAPIs() + "cross/booking/GetByFilter";

        //console.log(url);
        //console.log(oFiltro);

        return $http.post(url, oFiltro).then(function(data){
            return data;
        }).catch(function(data){

        });
        
    };

    function _getReserva(id_Reserva){
        var url = _getUrlAPIs() + "cross/booking/" + id_Reserva;

        //console.log(url);

        return $http.get(url).then(function(data){
            return data;
        }).catch(function(data){
            console.log("err", data);
            return data;
        });

    };

    // AutoComplete de Clientes
    function _getClientes(texto) {
        return _buscaWS('/WVDF_WS/WS_CSAG340.wso/fCompleteClienteTp/JSON', 'sInicio=' + texto).then(function(data) {
            return data;
        });
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

    function _getNavios(value){
        value = value.replace(/[\/.-]/g, "")
            
        var url = _getUrlAPIs() + "cross/Consolidation/GetShipbyName/" + value;
        return $http({method: "GET", url: url}).then(
            function mySuccess(response) {		
                return response.data;
            },
            function myError(response) {
                parent.parent.alertify.error(response.data);
            }
        );
    };

    function _gravarHUB(lstHUB)
    {
        var url = _getUrlAPIs() + "cross/Booking/SavelstBookingHUB";

        return $http.post(url, lstHUB).then(function(data){
            console.log(data);
            return data;
        }).catch(function(data){
            console.log("err", data);
            return data;
        });
    };

    function _getListBookingHUB(iBookingID)
    {
        var url = _getUrlAPIs() + "cross/Booking/GetListBookingHUB?iBookingID=" + iBookingID;
        return $http.get(url).then(function(data){
            console.log(data);
            return data;
        }).catch(function(data){
            console.log("err", data);
            return data;
        });
    };

    function _excluirHUB(id_BookingHub)
    {
        var url = _getUrlAPIs() + "cross/Booking/ExcluirHub?id_BookingHub=" + id_BookingHub;
        return $http.get(url).then(function(data){
            console.log(data);
            return data;
        }).catch(function(data){
            console.log("err", data);
            return data;
        });
    };
    
    function _getlstBL(_BookingId)
    {
        var url = _getUrlAPIs() + "cross/BLEletronic/GetByBooking/" + _BookingId;

        return $http.get(url).then(function(data){
            return data;
        }).catch(function(data){
            console.log("err", data);
            return data;
        });        
    };

    function _buscarComparacao(_BookingId)
    {
        var url = _getUrlAPIs() + "cross/BLEletronic/CompararBL/" + _BookingId;

        return $http.get(url).then(function(data){
            console.log("ret", data);
            return data;
        }).catch(function(data){
            console.log("err", data);
            return data;
        });        
    }    

    function _GetListMailNotify(_BookingId)
    {
        var url = _getUrlAPIs() + "cross/booking/GetListMailNotify/" + _BookingId;

        return $http.get(url);
    }

    function _removeEmail(_id_ReservaEmailNotificacao)
    {
        var url = _getUrlAPIs() + "cross/booking/MailNotify/" + _id_ReservaEmailNotificacao;

        return $http.delete(url);
    }

    function _addEmail(_id_Booking, _objAddMail)
    {        
        var url = _getUrlAPIs() + "cross/booking/MailNotify";

        var oBody= {};

        oBody.id_ReservaEmailNotificacao = 0;
        oBody.id_Booking = _id_Booking;
        oBody.ds_Email = _objAddMail.Email;
        oBody.ds_Nome = _objAddMail.Nome;
        oBody.ds_Telefone = _objAddMail.Telefone;
        oBody.id_CCGS207 = _objAddMail.id_CCGS207;
        oBody.lstTipoAviso = _objAddMail.lstTipoAviso;

        console.log(oBody);

        return $http.post(url, oBody);
        
    }

    _sendEmailLink = function(_BookingId)
    {          
        var url = _getUrlAPIs() + 
            "security/SendEmailLinkBL/" + _BookingId;

        return $http({
            method: 'POST',
            url: url,
        });
    };

    function _getTipoAviso()
    {
        var url = _getUrlAPIs() + "cross/cadastro/CCGS207";

        return $http.get(url);
    }    

    function _getTiposDocumento()
    {   var teste = [
            {'id_TipoDocumento': 4, 'ds_TipoDocumento':'DUE','tp_Upload': true, 'CCGS243_Codigo': 4},
            {'id_TipoDocumento': 5, 'ds_TipoDocumento':'BL', 'tp_Upload': false, 'CCGS243_Codigo': 5},
            {'id_TipoDocumento': 6, 'ds_TipoDocumento':'DCA', 'tp_Upload': false, 'CCGS243_Codigo': 6}, 
            {'id_TipoDocumento': 11, 'ds_TipoDocumento':'Nota Fiscal','tp_Upload': true, 'CCGS243_Codigo': 11},
            {'id_TipoDocumento': 12, 'ds_TipoDocumento':'RUC','tp_Upload': true, 'CCGS243_Codigo': 12},
            {'id_TipoDocumento': 13, 'ds_TipoDocumento':'INVOICE','tp_Upload': true, 'CCGS243_Codigo': 13}
        ]
        return teste;
        //return $http.get(url);
    }

    _validarBL = function(_validarBL){
        
        var url = _getUrlAPIs() + "cross/BLEletronic/validarBL/"         
            + _validarBL
            + '/' + getVariavelURL("id_Reserva")
            + '/' + getVariavelURL("aUsuarioSessao");

        console.log(url);

        return $http.post(url).then(function(response){
            return response;
        }, function(err){            
            return err;
        });   
    };

    var reservaServicos = {
        getByFiltro: _getByFiltro,
        getClientes: _getClientes,
        getReserva: _getReserva,
        getCidades: _getCidades,
        getPais: _getPais,
        getNavios: _getNavios,
        gravarHUB: _gravarHUB,
        getListBookingHUB: _getListBookingHUB,
        excluirHUB: _excluirHUB,
        getlstBL: _getlstBL,
        buscarComparacao: _buscarComparacao,
        GetListMailNotify: _GetListMailNotify,
        removeEmail: _removeEmail,
        addEmail: _addEmail,
        sendEmailLink: _sendEmailLink,
        getTipoAviso: _getTipoAviso,
        getTiposDocumento: _getTiposDocumento,
        validarBL: _validarBL
    };

    return reservaServicos;
});