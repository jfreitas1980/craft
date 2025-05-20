app = angular.module("CROSSApp", ["ngTable", 'smart-table']);

angular.module("CROSSApp").factory("operacional_DocumentosServicos", function($http, $window, $location){

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


    _getTiposDocumento = function()
    {
        //var url = _getUrlAPIs() + "cross/Document/GetByFilter";
                //+ "/" + getVariavelURL("aUsuarioSessao")

        var url = _getUrlAPIs() + "cross/Document/GetTypeDocuments";
        
        var data = "";
  
        console.log(url);
        
        return $http.get(url, data);
        
    };

    _getTipoAnexoByContext = function(_ContextTypeId)
    {
        var url = _getUrlAPIs() + "cross/Document/Get/" + _ContextTypeId;
        
        var data = "";
  
        console.log(url);
        
        return $http.post(url, data);
        
    };

    function _getLstConsolidadas(value) {
        var url = _getUrlAPIs() + "cross/Consolidation/ConsultaConsol";
        console.log(url);
        var data;
        return $http({
        method: "Post",
        url: url,
        data: value
        }).then(
        function mySuccess(response) {
            //data = response.data;
            //console.log(data);
            return response.data;
            //deffered.resolve(data);
        },
        function myError(response) {
            parent.parent.alertify.error(response.data);
            //console.log(response.status);
        });
    };        

    _getBookingByFiltro = function(_oFiltro){
        var url = _getUrlAPIs() + "cross/booking/GetByFilter";
        
        return $http.post(url, _oFiltro).then(function(data){
            console.log(data);
            return data;
        }).catch(function(data){

        });            
    };

    _getAllTipoAnexo = function(_ContextTypeId)
    {
        var url = _getUrlAPIs() + "cross/Document/GetAll";
        
        var data = "";

        console.log(url);
        
        return $http.post(url, data);        
    };

    _getManifestoCTNR = function(_consolidadaId, _crossSession)
    {
        var url = _getUrlAPIs() + "cross/Consolidation/Container/GetByConsol/"
        + _consolidadaId
        + "/" + _crossSession;
        
        var data = "";

        console.log(url);
        
        return $http.get(url, data);        
    };

    var docServicos = {
        getTiposDocumento: _getTiposDocumento,
        getLstConsolidadas: _getLstConsolidadas,
        getTipoAnexoByContext: _getTipoAnexoByContext,
        getBookingByFiltro: _getBookingByFiltro,
        getAllTipoAnexo: _getAllTipoAnexo,
        getManifestoCTNR: _getManifestoCTNR
    }

    return docServicos;
});

app.controller("operacional_DocumentosCtrl", function($scope, $filter, operacional_DocumentosServicos, NgTableParams){
    $scope.DataAtual = new Date(Date.now());
    $scope.lstTipoDocumento = [];
    $scope.lstTipoDocPorTab = [];
    $scope.selectedTab = {"dsContextType": "Consolidada", "ContextTypeId":0, "dsHTMLPage": "operacional_Documentos_Consol.html"};
    $scope.documentIdSelected = 0;
    $scope.oDocumentSelected = {};

    $scope.lstDocumento = [];
    $scope.lstTipoDocHelp = [];
    $scope.oFiltro = {
        id_Consolidada: "",
        id_Consolidada: "",
        tp_Excluida: "N",
        optFinalizado:"P"
    };
    
    $scope.setDocument = function(_tipoDoc){
        //console.log("set document", _tipoDoc);
        
        if(_tipoDoc.contextTypeId == 1)//Consolidada
        {
            $scope.oFiltro = {
                id_Consolidada: "",
                id_Consolidada: "",
                tp_Excluida: "N",
                optFinalizado:"P"
            };

            //console.log('consol', $scope.oFiltro);
        }
        
        if(_tipoDoc.contextTypeId == 2)//Reserva
        {
            $scope.oFiltro.dt_ReservaFim = $filter('date')($scope.DataAtual, "dd/MM/yyyy"); 
            var dtFim = $scope.DataAtual;
            dtFim.setDate($scope.DataAtual.getDate() - 30);       
            $scope.oFiltro.dt_ReservaIni = $filter('date')(dtFim, "dd/MM/yyyy");

            //console.log('reserva', $scope.oFiltro);
        }
        
        $scope.lstDocumento = [];
        
        $scope.selectedTab = _tipoDoc;
       
        $scope.carregarTipoAnexo($scope.selectedTab.contextTypeId);
    }

    $scope.carregarTipoAnexo = function(_ContextTypeId){
        operacional_DocumentosServicos.getTipoAnexoByContext(_ContextTypeId).then(function(response){
            console.log(response.data);
            $scope.lstTipoDocPorTab =  response.data;
        }, function(err){
            console.log(err);
        });
    }

    $scope.getTiposDocumento = function()
    {
        $scope.loadingState = true;
        operacional_DocumentosServicos.getTiposDocumento().then(function(response){
            console.log(response.data);
            $scope.lstTipoDocumento =  response.data;
            $scope.loadingState = false;
        }, function(err){
            $scope.loadingState = false;
            console.log(err);
        });
    };

    $scope.showDocument = function(_oItem, _DocumentoId){
        
        $scope.oDocumentSelected.Doc =  _oItem;

        console.log("showDocument", $scope.oDocumentSelected);

        $scope.documentIdSelected = _DocumentoId;
        if($scope.documentIdSelected == null || $scope.documentIdSelected == "" || $scope.documentIdSelected == 0)
        {
            console.log("Id do documento inválido!");
            return;
        }
    };

    $scope.pesquisar = function(){
        console.log('chmou pesq, tab:', $scope.selectedTab.dsContextType.toUpperCase());
        if($scope.selectedTab.dsContextType.toUpperCase() == "CONSOLIDADA") {$scope.pesquisalstConsolidada()}

        if($scope.selectedTab.dsContextType.toUpperCase() == "RESERVA") {$scope.pesquisarReserva()}
    };

    $scope.pesquisalstConsolidada = function (oFiltro) {

        console.log('chmou PESQ CONSOL');

        //$scope.lstDocumento = [];
    
        oFiltro.bNaoCarregarCTNR = false;
        oFiltro.bNaoCarregarReservas = false;
        $scope.loadingState = true;
    
        operacional_DocumentosServicos.getLstConsolidadas(oFiltro).then(function (data) {
            $scope.lstDocumento = data;
            $scope.loadingState = false;

            console.log($scope.lstDocumento);
 
    
        }).catch(function(){
          $scope.loadingState = false;
        });
    
        //$scope.loadingState = false;
    };    

    $scope.pesquisalstReserva= function()
    {        
        $scope.loadingState = true;
        operacional_DocumentosServicos.getBookingByFiltro($scope.oFiltro).then(function(response){            
            $scope.lstDocumento = response.data;

            $scope.loadingState = false;
        }).catch(function(){
            $scope.loadingState = false;
        });
    };
    
    $scope.uploadFile = function(_oTipoDocumento){

        if(_oTipoDocumento.dsTabelaAnexo == null || _oTipoDocumento.dsTabelaAnexo == undefined)
        {
            console.error("Não é possivel anexar este tipo de documento");
            return;
        }

        _oTipoDocumento.documentoId = $scope.documentIdSelected
        if(_oTipoDocumento.documentoId == null || _oTipoDocumento.documentoId == "" || _oTipoDocumento.documentoId == 0)
        {
            console.log("Id do documento inválido!");
            return;
        }

        //$scope.closeModal("#showDocument");

        $scope.givenUrlAnexo = 'uploadf.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao')
        + '&Nm_Tabela=' + _oTipoDocumento.dsTabelaAnexo //'tBookingAnexo'
        + '&idProposta=' + _oTipoDocumento.documentoId
        + '&tipoArquivo=' + _oTipoDocumento.ccgS243_Codigo;

        console.log('busca Anexo', $scope.givenUrlAnexo);

        $scope.openModal("#modalAnexo");        
    };

    $scope.openFilter = function()
    {
        if($scope.selectedTab.dsContextType.toUpperCase() == "CONSOLIDADA") {$scope.openModal("#modalFiltrosConsol")}

        if($scope.selectedTab.dsContextType.toUpperCase() == "RESERVA") { $scope.openModal("#modalFiltrosReserva")}

    }

    $scope.viewDocument = function(_oTipoDoc, _value)
    {
        var _TipoDoc = _oTipoDoc.dsTipoDocumento

        $scope.oDocumentSelected.oTipoDocumento = _oTipoDoc;

        console.log("viewdoc", _TipoDoc)

        console.log("value", _value)
        console.log(_oTipoDoc);

        if(_TipoDoc == "BL")
        {
            $scope.openModal(_TipoDoc);
        }

        if(_TipoDoc == "DCA")
        {
            console.log($scope.documentIdSelected);
            var url = 'DCA.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') 
            + "&bookingId=" + $scope.oDocumentSelected.Doc.id_Booking;

            $scope.openForm("Formulario DCA", url);
        }

        if(_TipoDoc == "MAPA ESTUFAGEM")
        {
            
            var url = _oTipoDoc.dsLinkFormulario
            url = url.replace('#aUsuarioSessao#', getVariavelURL('aUsuarioSessao'));
            url = url.replace('#iConsolId#',$scope.oDocumentSelected.Doc.id_Consolidada);

            $scope.openForm("Mapa Estufagem", url);
        }   
        
        if(_TipoDoc == "Booking Sheet")
        {            
            var url = _oTipoDoc.dsLinkFormulario
            url = url.replace('#aUsuarioSessao#', getVariavelURL('aUsuarioSessao'));
            url = url.replace('#iConsolId#',$scope.oDocumentSelected.Doc.id_Consolidada);

            $scope.openForm("Booking Sheet", url);
        }           

        if(_TipoDoc == "DUE")
        {
            //$scope.openModal(_value);
        }

        if(_TipoDoc == "INVOICE")
        {
            //$scope.openModal(_value);
        }

        if(_TipoDoc == "MANIFESTO")
        {
            console.log("viewDoc_manifesto");

            $scope.loadingState = true;
            operacional_DocumentosServicos.getManifestoCTNR($scope.oDocumentSelected.Doc.id_Consolidada, getVariavelURL('aUsuarioSessao')).then(function(response){            
                
                $scope.lstManifestCTNR = response.data;
                console.log("CTNR", $scope.lstManifestCTNR);    
                $scope.loadingState = false;
                $scope.openModal("#modalManifestoCTNR");

            }).catch(function(){
                $scope.loadingState = false;
            });            
            
        } 
    };

    $scope.showPreviewManifest = function(_oManifestCTNR)
    {
        console.log("ctnr", _oManifestCTNR);

        console.log("$scope.oDocumentSelected", $scope.oDocumentSelected.oTipoDocumento.dsLinkFormulario);

        var url = $scope.oDocumentSelected.oTipoDocumento.dsLinkFormulario;
        url = url.replace('#aUsuarioSessao#', getVariavelURL('aUsuarioSessao'));
        url = url.replace('#iCtnrDetalheId#',_oManifestCTNR.id_ContainerDetalhe);

        //url = url.replace('#iConsolId#',$scope.oDocumentSelected.Doc.id_Consolidada);

        $scope.openForm("Manifesto Ctnr:" +  _oManifestCTNR.ds_Container, url);
    };

    $scope.loadHelp = function(){
        
        $scope.loadingState = true;
        operacional_DocumentosServicos.getAllTipoAnexo().then(function(response){            
            
            console.log(response.data);
            $scope.lstTipoDocHelp = response.data;                                
                
            $scope.loadingState = false;
        }).catch(function(err){
            console.log("get tipo anexo",err);
            $scope.loadingState = false;
        });
    };

    $scope.setclassItemHelp = function(_tipoDoc){
        var _class = "";

        if(_tipoDoc.dsTipoContexto == "Consolidada")
        {
            _class = "table-secondary"
        }
        if(_tipoDoc.dsTipoContexto == "Reserva")
        {
            _class = "table-danger"
        }
        console.log("setar class", _class);
        return _class;
    };

    $scope.openForm = function(_Title, _URL){
        window.top.jaddTab(_Title, _URL);
   };  

   $scope.ajustarDados = function(_oTipoDoc)
   {
        _oTipoDoc.tpTipologiaCargaNormal = "";
        _oTipoDoc.tpTipologiaCargaPerigosa = "";

       if(_oTipoDoc.dsTipologiaCarga == "Normal/Perigosa")
       {
            _oTipoDoc.tpTipologiaCargaNormal = "X";
            _oTipoDoc.tpTipologiaCargaPerigosa = "X";
       }
       if(_oTipoDoc.dsTipologiaCarga == "Normal")
       {
            _oTipoDoc.tpTipologiaCargaNormal = "X";
            _oTipoDoc.tpTipologiaCargaPerigosa = "X";
       }
       if(_oTipoDoc.dsTipologiaCarga == "Perigosa")
       {
            _oTipoDoc.tpTipologiaCargaPerigosa = "X";
       }

       if(_oTipoDoc.tpUpload){_oTipoDoc.dsTipoResultado = "Anexo";}
       else{_oTipoDoc.dsTipoResultado = "Sistêmico";}

   }

   $scope.btnPrint = function(_oTipoDoc)
   {
        if(_oTipoDoc.dsTipoDocumento == "BL")
        {
            var url = 'BLEletronicoPrint.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') 
                + '&id_BLEletonico=' + 0           
                + '&id_Booking=' + $scope.oDocumentSelected.Doc.id_Booking;

            window.top.jaddTab("BL Eletronico", url);
        }
   };

    $scope.openModal = function(_modal){
        $(document).ready(function(){
            $(_modal).modal();
        });
    };

    $scope.closeModal = function(_modal){
        $(_modal).modal('hide')
    };

    load = function(){
        $scope.loadingState = true;
        $scope.getTiposDocumento();
        $scope.carregarTipoAnexo(1);
    };

    load();
});

