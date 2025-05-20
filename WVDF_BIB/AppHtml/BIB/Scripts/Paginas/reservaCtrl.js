var app = angular.module("CROSSApp", ['ngTable', "ui.bootstrap", "uiDates", "scheduleServices", "uiCrafts"]);

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

app.controller("reservaCtrl", function($scope, reservaServicos, scheduleServices, $filter, NgTableParams){
    $scope.oFiltro = {dt_ReservaFim : ""};
    $scope.DataAtual = new Date(Date.now());
    
    $scope.getNavio = function (value) {
        return scheduleServices.getNavios(value);
    };

    $scope.getCliente = function (value) {        
        return reservaServicos.getClientes(value);
    };

    $scope.PesquisalstReserva= function(oFiltro)
    {        
        $scope.loadingState = true;
        reservaServicos.getByFiltro(oFiltro).then(function(response){            
            $scope.lstReservas = response.data;

            $scope.tblReserva = new NgTableParams(
            {
                page: 1,
                count: 5
            }, 
            { 
                counts: [10, 20, 50,100],
                dataset: $scope.lstReservas
            });

            $scope.loadingState = false;
        }).catch(function(){
            $scope.loadingState = false;
        });
    };
    
    $scope.btnClearSearch = function(){
        
        $scope.oFiltro = {nr_Reserva: ""};

    };

    // Chamar tela Consolidada
    $scope.chamarTelaReservaInfo = function (_oReserva) {
        //console.log(getVariavelURL('aUsuarioSessao'));
        var url = 'ReservaInfo.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&id_Reserva=' + _oReserva.id_Booking;
        window.top.jaddTab("Info. Reserva " + _oReserva.nr_Booking, url);
    };

    $scope.chamarTelaBLEletronico = function (_id_BLEletronico) {
        
        var url = 'BLEletronicoTeste.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') 
        + '&id_BLEletonico=' + _id_BLEletronico
        +'&token=';
        window.top.jaddTab("BL Eletronico", url);
    };

    $scope.setClass = function(reserva){
        var Currentdate = new Date();
        var DeadLine;

        DeadLine = new Date (reserva.dt_DeadLineCarga);
        DeadLine = DeadLine.getTime();
        Currentdate = Currentdate.getTime();
        
        if(DeadLine > 0)
        {
            switch (reserva.ds_StatusReserva) {
                case "OK":
                    return "alert alert-success";
                    break;
                case null:
                    if(Currentdate > DeadLine)        
                    {
                        return "alert alert-danger";        
                    }
                    break;
            } 
        }
    };

    loadPage = function(){
        
        $scope.oFiltro.dt_ReservaFim = $filter('date')($scope.DataAtual, "dd/MM/yyyy"); 
        var dtFim = $scope.DataAtual;
        dtFim.setDate($scope.DataAtual.getDate() - 30);       
        $scope.oFiltro.dt_ReservaIni = $filter('date')(dtFim, "dd/MM/yyyy");

        $scope.PesquisalstReserva($scope.oFiltro);

        //$scope.dtTeste.setDate($scope.dtTeste.getDate() - 10);
        //console.log($scope.dtTeste);
        //oFiltro.dt_ReservaIni = "27/04/2019";
        //oFiltro.dt_ReservaFim =  new Date();
    };

    loadPage();
});

app.controller("reservaCtrlInfo", function($scope, reservaServicos, $filter){

    $scope.lstTipoDocumento = [];
    $scope.lstDocumento = [];
    $scope.oDadosCompararBL = {};
    $scope.lstMailNotify = [];
    $scope.itemAccordion = 1;
    $scope.lstTipoAviso = {};
    $scope.oAddMail = {};
    $scope.aTagTipo=[];
    $scope.givenUrlAnexo = "";
    
    $scope.SetObjectId = function (oItem, oTipo) {
        
        var _id = 0;
        var _dsNome = "";

        if (oTipo == "ds_PaisPOL") {
            console.log(oItem.ds_PaisPOL);
            oItem.cd_PaisPOL = oItem.ds_PaisPOL.id;
            oItem.ds_PaisPOL = oItem.ds_PaisPOL.value;
            console.log(oItem);
        }

        if (oTipo == "ds_POL") {
            console.log(oItem.ds_PaisPOL);
            oItem.id_CidadePOL = oItem.ds_POL.id;
            oItem.ds_POL = oItem.ds_POL.value;
        }

        if (oTipo == "ds_PaisPOD") {
            oItem.cd_PaisPOD = oItem.ds_PaisPOD.id;
            oItem.ds_PaisPOD = oItem.ds_PaisPOD.value;
        }
        if (oTipo == "ds_POD") {
            oItem.id_CidadePOD = oItem.ds_POD.id;
            oItem.ds_POD = oItem.ds_POD.value;
        }
        if (oTipo == "ds_Navio") {
            oItem.id_Navio = oItem.ds_Navio.id;
            oItem.ds_Navio = oItem.ds_Navio.value;
        }
    }

    $scope.getReserva = function(id_Reserva)
    {
        reservaServicos.getReserva(id_Reserva).then(function(response){
            $scope.oResreva = response.data;
        }).catch(function(response){
            parent.parent.alertify.error("Não foi possível carregar a reserva", response);    
        });          
    };

    $scope.btnAdddControle = function(){
        console.log("adc");
        if($scope.oResreva.lstHub == undefined)
        {
            $scope.oResreva.lstHub = [{id_BookingHUB:0, ds_PaisPOL:""}]
        }
        else{
            $scope.oResreva.lstHub.push({id_BookingHUB:0, ds_PaisPOL:""});
        }        
    };

    $scope.getCidade = function (sNome, CSAG319_ID) {
        return reservaServicos.getCidades(sNome, CSAG319_ID);
    };
    
    $scope.getPais = function (valor, tipo) {
        return reservaServicos.getPais(valor, tipo);
    };

    $scope.getNavio = function (value) {
        return reservaServicos.getNavios(value);
    };

    $scope.btnGravarHUB = function(){
        console.log($scope.oResreva.lstHub);
        return reservaServicos.gravarHUB($scope.oResreva.lstHub).then(function(response){
            //console.log($scope.oResreva.id_Booking);
            parent.parent.alertify.success("Gravação efetuada!");
        }).catch(function(response){
            console.log("Erro", response);
            parent.parent.alertify.error("Não foi possívelgravar o HUB");
        })

    };

    $scope.carregarHub = function(){
        reservaServicos.getListBookingHUB($scope.oResreva.id_Booking).then(function(response){
            $scope.oResreva.lstHub = response.data;
        }).catch(function(response){
            console.log("Erro", response);
            parent.parent.alertify.error("Não foi possível carregar HUB");
        });
    };

    $scope.DeleteHub = function(_oHub){
        var iPos; 

        reservaServicos.excluirHUB(_oHub.id_BookingHUB).then(function(){
            iPos = $scope.oResreva.lstHub.indexOf(_oHub);    
            $scope.oResreva.lstHub.splice(iPos,1);
        }).catch(function(){
            console.log("Erro", response);
            parent.parent.alertify.error("Não foi possível excluir o HUB");
        });                
    };

    $scope.LimparoReserva = function(){
        $scope.oResreva = {id_Reserva:""};
    };

    $scope.chamarTelaCadUN = function () {
        var url = 'IMO/IMO_CadastroIMDG.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao')           
        window.top.jaddTab("Cadastro IMDG", url);
    };

    $scope.chamarTelaBL = function (_id_BLEletronico) {
        var url = 'BLEletronico.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') 
            + '&id_BLEletonico=' + _id_BLEletronico           
            + '&id_Booking=' + $scope.oResreva.id_Booking;

        window.top.jaddTab("BL Eletronico", url);
    };    

    $scope.viewDocument = function(_TipoDoc, _value)
    {
        console.log("viewdoc", _TipoDoc)
        if(_TipoDoc == "BL")
        {
            $scope.openModal(_TipoDoc);
        }
        if(_TipoDoc == "DCA")
        {
            $scope.openFormDCA();
        }
        if(_TipoDoc == "DUE")
        {
            //$scope.openModal(_value);
        }
        if(_TipoDoc == "INVOICE")
        {
            //$scope.openModal(_value);
        }
    };

    $scope.uploadFile = function(_oTipoDocumento){

        $scope.givenUrlAnexo = 'uploadf.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao')
        + '&Nm_Tabela=' + 'tBookingAnexo'
        + '&idProposta=' + getVariavelURL2('id_Reserva')
        + '&tipoArquivo=' + _oTipoDocumento.CCGS243_Codigo;
        
    };

    $scope.openModal = function(value)
    {                
        if(value != undefined)
        {   
            if(value === "BL")
            {
                console.log($scope.oResreva);
                reservaServicos.getlstBL($scope.oResreva.id_Booking).then(function(response){
                    $scope.lstDocumento = response.data;
                }).catch(function(){
                    console.log("failed to get docs");
                });
            }
            else if(value === "'DUE'")
            {
                console.log("tipo de doc DUE");    
                $scope.lstDocumento = [];
            }
            else
            {
                console.log("tipo de doc não configurado");    
            }
            
            $(document).ready(function(){
                $("#modalexibirDoc").modal();
            });
        }
        else
        {
            console.log("tipo de doc não informado");
        }
        
    };

    $scope.abrirDoc = function(_oBL)
    {        
        $scope.chamarTelaBL(_oBL.id_BLEletronico);
    }

    $scope.buscarComparacao = function(_BookingId)
    {        
        reservaServicos.buscarComparacao(_BookingId).then(function(response){
            $scope.oDadosCompararBL = response.data;
        }).catch(function(response){
            console.log("Erro", response);
            parent.parent.alertify.error("Não foi possível carregar HUB");
        });        

        //oDadosCompararBL
    };

    $scope.MostrarEmail = function(iBookingId, sTipoAviso)
    {
        reservaServicos.GetListMailNotify(iBookingId).then(function(response)
        {               
            $scope.lstMailNotify = response.data
        }, function(response){
            $scope.lstMailNotify = [];
            parent.parent.alertify.error("Não foi possível carregar a lista de e-mail", response.message);
        });

        $(document).ready(function(){
            $("#modalExibirEmail").modal();
        });
        
    }

    $scope.addEmail = function(_objAddMail){

        console.log(_objAddMail);

        if(!angular.isDefined(_objAddMail.Nome))
        {
            parent.parent.alertify.error("Informe o nome");
            return;
        }

        if(!angular.isDefined(_objAddMail.Email)){
            parent.parent.alertify.error("Informe o e-mail");
            return;
        }
        
        if(!angular.isDefined(_objAddMail.lstTipoAviso)) 
        {
            parent.parent.alertify.error("Informe o tipo de aviso!");
            return;
        }

        if(_objAddMail.lstTipoAviso.length == 0)
        {
            parent.parent.alertify.error("Informe o tipo de aviso");
            return;
        }

        reservaServicos.addEmail($scope.oResreva.id_Booking, _objAddMail).then(function(response){            
            
            $scope.lstMailNotify = response.data;
            parent.parent.alertify.success("E-mail adicionado a lista");
            $scope.limparoAddMail();

        }, function(response){
            parent.parent.alertify.error("Não foi possível incluir: " + response.data);
        });
    }

    $scope.removeEmail = function(_mail)
    {        
        reservaServicos.removeEmail(_mail.id_ReservaEmailNotificacao).then(function(response){            
            var _oItemRemover = $scope.lstMailNotify.indexOf(_mail);
            $scope.lstMailNotify.splice(_oItemRemover, 1);
            parent.parent.alertify.success("Item removido");
            
        }, function(response){            
            parent.parent.alertify.error("Não foi possível excluir", response.message);
        });
    }

    $scope.sendEmailLink = function(){
        var _bookingId = $scope.oResreva.id_Booking
        console.log("enviou", _bookingId);
        if(angular.isDefined(_bookingId) && (_bookingId != ''))
        {
            reservaServicos.sendEmailLink(_bookingId)
            .then(function(response){
                console.log("ok",response);
                if(response.status != 200)
                {
                    parent.parent.alertify.error("Falha ao enviar o e-mail", response.data);
                }
                else
                {
                    parent.parent.alertify.success("E-mail enviado");
                }
            },function(response){
                var ret = response.data.Message;
                console.log("err send email", ret);
                parent.parent.alertify.error(ret);
            });
            
        }
        else
        {
            $scope.oAccess.ds_Mensagem = 'ops! something went wrong!';
            $scope.tipoAlerta = "alert alert-danger";
            console.log('ops! something went wrong!!!!!');
        }
    };

    $scope.setClassDif = function(a, b){        

        if(a == null){a = ""}
        if(b == null){b = ""}

        if(angular.isString(a) || angular.isDefined(a))
        {   
            a = a.trim(); 
        }

        if(angular.isString(b) || angular.isDefined(b))
        {     
            b = b.trim(); 
        }

        if(a != b)
        {
            return "text-danger";                    
        }
    };

    $scope.setClassDifValor = function(a, b){        
        if(a != b)
        {
            return "text-danger";                    
        }
    };
    
    $scope.getTipoAviso = function()
    {
        $scope.loadingState = true;
        return reservaServicos.getTipoAviso().then(function(response){
            $scope.lstTipoAviso = response.data;
            $scope.loadingState = false;
        }, function(){
            parent.parent.alertify.error("Não foi possível carregar o tipo de aviso");
            $scope.loadingState = false;
        });
    }

    $scope.limparoAddMail = function(){
        $scope.oAddMail = {};
        $scope.oAddMail.lstTipoAviso = [];
        $scope.aTagTipo = [];
    };

    $scope.addTag = function(_NewTipoAviso)
    {
        var oNew ={};
        console.log(_NewTipoAviso);

        if(angular.isDefined(_NewTipoAviso))
        {
            oNew.descricao = _NewTipoAviso.descricao
            console.log(oNew);
            console.log($scope.aTagTipo.indexOf(oNew));

            if($scope.aTagTipo.indexOf(oNew) <= 0)
            {
                var oTeste = [];
                oTeste = _NewTipoAviso.codigo;
                $scope.oAddMail.lstTipoAviso.unshift(oTeste);
                $scope.aTagTipo.unshift(oNew);

            }
        }
    }

    /*
    $scope.getTipoAvisoByParam = function(_param)
    {
        console.log("tipoAviso", _param)
        return reservaServicos.getTipoAviso(_param).then(function(response){
            $scope.lstTipoAviso = response.data;
        }, function(){
            parent.parent.alertify.error("Não foi possível carregar o tipo de aviso");
        });
    }
    */

   $scope.openFormDCA = function(){
        var url = 'DCA.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + "&bookingId=" + getVariavelURL('id_Reserva');           
        window.top.jaddTab("Formulario DCA", url);
   };   

   $scope.validarBL = function(_bValidado){
        console.log("validarbl", _bValidado);
        reservaServicos.validarBL(_bValidado).then(function(response){
            $scope.loadingState = false;
            $scope.oDadosCompararBL.tp_Aprovado = response.data;
            console.log(response);
            parent.parent.alertify.success("Status alterado");

        },function(response){
            $scope.loadingState = false;
            console.log(response);
        });
    };
/*
   $(function() {
       console.log("chamou popover");
    $('[data-toggle="popover"]').popover({
          html: true,
      content: function() {
        return $('#popover-content').html();
      }
    });
  })
*/
    loadPage = function(){
        
        var id_ReservaCarregar;
        
        id_ReservaCarregar = 0;
        id_ReservaCarregar = getVariavelURL('id_Reserva');
    
        if (id_ReservaCarregar > 0) {
          $scope.getReserva(id_ReservaCarregar);
        } else {
          $scope.LimparoReserva();
        }    

        $scope.lstTipoDocumento = reservaServicos.getTiposDocumento(); 

        $scope.limparoAddMail();

        $scope.lstTipoAviso = $scope.getTipoAviso();
   
    };

    loadPage();
});