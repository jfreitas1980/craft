angular.module("CrossApp", []);

angular.module("CrossApp").controller("blEletronicoCtrl", function($scope, BLServicos, $location, $window){
    $scope.id_BLEletonico = 0;
    $scope.id_Booking = 0;
    $scope.oBL = {};
    $scope.oCurrentDate = new Date();

    // Chamar tela Consolidada
    $scope.chamarTelaReservaInfo = function (_BLEletronicId) {
        var url = 'BLEletronico.html?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&id_BLEletonico=' + _BLEletronicId;
        window.top.jaddTab("Info. Reserva", url);
    };

    $scope.gravarBL = function(){
        console.log($scope.oBL);
       
        if(angular.isUndefined($scope.oBL.id_Booking))
        {            
            $scope.oBL.id_Booking = getVariavelURL('id_Booking')
        }
        $scope.loadingState = true;

        BLServicos.gravarBL($scope.oBL, $scope.ds_Token).then(function(response){
            $scope.loadingState = false;
            console.log("ok bl");
            console.log(response);
            parent.parent.alertify.success("Versão Gerada");

        },function(response){
            $scope.loadingState = false;
            console.log("err bl");
            console.log(response);
            
            if(angular.isDefined(response.data))
            {
                console.log("response.data");
                console.log(response.data.Message);
                parent.parent.alertify.error(response.data.Message);

                if(response.status == 401){
                    var baseUrl = new $window.URL($location.absUrl()).origin;                                
                    var url = baseUrl + "/webcraft/BLEletronico_AcessoCliente.html?booking=" + getVariavelURL('id_Booking')

                    //window.top.jaddTab("BL Eletronico", url);
                    window.location.replace(url);
                }
            }
            else
            {
                console.log("response");
                parent.parent.alertify.error(response);
            }

        });       
    }

    $scope.$watch('oBL.kg_GrossWeight', function()
    {        
        if(angular.isDefined($scope.oBL) && angular.isDefined($scope.oBL.kg_GrossWeight))
        {            
            $scope.oBL.kg_GrossWeight = String($scope.oBL.kg_GrossWeight).replace(',', '.');
        }
        
        
    });

    $scope.$watch('oBL.kg_NetWeight', function()
    {        
        if(angular.isDefined($scope.oBL) && angular.isDefined($scope.oBL.kg_NetWeight))
        {
            $scope.oBL.kg_NetWeight = String($scope.oBL.kg_NetWeight).replace(',', '.');
        }
        
    });    

    $scope.$watch('oBL.kg_Measurement', function()
    {        
        if(angular.isDefined($scope.oBL) && angular.isDefined($scope.oBL.kg_Measurement))
        {
            $scope.oBL.kg_Measurement = String($scope.oBL.kg_Measurement).replace(',', '.');
        }        
    });    
    

    $scope.export = function(){
        html2canvas(document.getElementById('divExport'), {
            scale: 2,
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 600,
                        height:760
                    }]
                };
                //window.open(data);
                pdfMake.createPdf(docDefinition).download('BL_Book_' + $scope.oBL.nr_Booking + getVariavelURL('id_BLEletonico') + ".pdf");
            }
        });
    };

    $(document).ready(function () {
        $('textarea[data-limit-rows=true]')
          .on('keypress', function (event) {
              var textarea = $(this),
                  text = textarea.val(),
                  numberOfLines = (text.match(/\n/g) || []).length + 1,
                  maxRows = parseInt(textarea.attr('rows'));
      
              if (event.which === 13 && numberOfLines === maxRows ) {
                return false;
              }
          });
    });



    $scope.printBL = function()
    {      
        var btn = document.getElementById('btnPrint');
        
        btn.style.display = 'none';

        window.print();

        btn.style.display ='initial';
    };

    load = function()
    {   
        //Config impressao
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
        //Fim Config impressao
        
        $scope.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        $scope.id_BLEletonico = getVariavelURL('id_BLEletonico');
        $scope.id_Booking = getVariavelURL('id_Booking');
        
        if(getVariavelURL2('tipoAcesso') == 1)
        //{
        //    $scope.ds_Token =  getVariavelURL2('token');
        //}
        //else
        {
            $scope.ds_Token =  getVariavelURL2('aUsuarioSessao');
        }
                
        $scope.loadingState = true;
        BLServicos.printBL($scope.id_Booking, $scope.ds_Token).then(function(response){
            $scope.oBL = response.data;

            setTimeout(function() {                    
                $scope.$digest();
                $scope.printBL();
            }, 1000);
            
            window.close();
            $scope.loadingState = false;
            console.log($scope.oBL);                
        }).catch(function(err){
            parent.parent.alertify.error(err);
        });
    };

    load();
});
