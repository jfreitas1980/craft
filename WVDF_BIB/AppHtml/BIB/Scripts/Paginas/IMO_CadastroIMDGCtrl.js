angular.module("CROSSApp", ['ngTable','ui.bootstrap']);

angular.module("CROSSApp").directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Confirma exclusão?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}])

angular.module("CROSSApp").controller("IMO_CadastroIMDGCtrl", function($scope, IMO_CadastroIMDGServicos, NgTableParams, $filter){
    $scope.lstUN = [];
    $scope.lstUNTeste = [];
    $scope.lstEMS = [];
    $scope.aUNPage = [];  
  
    $scope.oIMDG = {"nr_UN":"","ds_ProperShippingName":"", "ds_Class":"", "ds_SubsidiaryRisk":"", "ds_PackingGroup":"", "ds_NumeroUNEMS":"", "ds_LimitedQuantities":"","ds_UndMedida":"", "ds_FlashPointMin":"", "ds_FlashPointMax":"", "ds_MarinePollutantIMDGCode":"", "ds_PackingInstructions":"", "ds_IBCInstructions":""};
    
    $scope.btnSalvar = function(value)
    {
        if($scope.oFormModal.$valid)
        {
            $scope.loadingState = true;
        
            IMO_CadastroIMDGServicos.saveUN(value).then(function(response){
                    //$scope.lstUN = response;                                
                    //atualizarTable(response.data);
                    carregarUN();
                    $scope.loadingState = false;
                    $scope.oIMDGAlterar = {};
                    $('#modalNewUN').modal('hide');
                    parent.parent.alertify.success("Gravação efetuada!");
                }).catch(function(response){
                    console.log("err", response);     
                    $scope.loadingState = false;       
                    parent.parent.alertify.error(response);
                }
            );     
                            
            //$scope.Gravar($scope.oConsolidada);
        }
        else
        {
            parent.parent.alertify.error("Preencha todos os campos obrigatórios");
        }
    };

    $scope.btnFecharModal = function(value)
    {
        $('#modalNewUN').modal('hide');
        $scope.oIMDGAlterar = {};
    }

    $scope.btnExcluir = function(value)
    {
                
        $scope.loadingState = true;

        if(angular.isDefined(value))
        {
            if(value.id_CodigoUN > 0)
            {            
                IMO_CadastroIMDGServicos.ExcluirUN(value).then(function(response){
                        //$scope.lstUN = response;                                
                        //atualizarTable(response.data, true);
                        carregarUN();
                        $scope.oIMDGAlterar = {};
                        $scope.loadingState = false;
                        $('#modalNewUN').modal('hide');
                        parent.parent.alertify.success("Exclusão efetuada!");
                    }).catch(function(response){
                        console.log("err", response);          
                        $scope.loadingState = false;  
                        parent.parent.alertify.error(response);
                    }
                );                      
            }
            else
            {
                $scope.loadingState = false;
            }
        }
        //$scope.Gravar($scope.oConsolidada);
        
    };

    atualizarTable = function(oItem, bDelete){
        var iPos;
        var bAdd = true;
        console.log("Item alterar", oItem);        

        if($scope.lstUN != undefined)
        {        
            $scope.lstUN.forEach(function(element){
                if(element.id_CodigoUN == oItem.id_CodigoUN){                    
                    bAdd = false
                    
                    iPos = $scope.lstUN.indexOf(element);
                    console.log("alter", iPos);
                    if(bDelete)
                    {
                        $scope.lstUN.splice(iPos, 1);
                    }
                    else{
                        console.log("aqio");
                        $scope.lstUN.splice(iPos, 1, angular.copy(oItem));
                    }
                }
            });                        
        }
        else{
            console.log("Ops! Tente novamente");
        }     
        
        if(bAdd)
        {
            console.log("add");
            //$scope.lstUN.push(angular.copy(value));
            $scope.lstUN.push(angular.copy(oItem));
        };
    }

    $scope.openModal = function(value)
    {        
        $scope.oIMDGAlterar = {};
        if(value != undefined)
        {
            //console.log(value);
            $scope.oIMDGAlterar = angular.copy(value);
            //$scope.oIMDG.nr_UN = value.nr_UN;
            console.log("IMDG");
            console.log($scope.oIMDG);
        }
        
        $(document).ready(function(){
            $("#modalNewUN").modal();
        });
    };

    $scope.$watch('oFiltro', function(){
        //console.log("watched");
        var _lstUNFiltered = [];
        
        _lstUNFiltered = $filter('filter')($scope.lstUN, $scope.oFiltro);

        $scope.criarPaginacao(_lstUNFiltered);

    });

    $scope.criarPaginacao = function(_lstUNFiltered){
        console.log("Criar", _lstUNFiltered);

        $scope.tblIMDG = new NgTableParams(
        {
            page: 1,
            count: 5
        }, 
        { 
            filterSwitch: true,
            //counts: [10, 20, 50,100],
            dataset: _lstUNFiltered
            //dataset: $scope.lstUN
        });
    };

    carregarUN = function(){

        IMO_CadastroIMDGServicos.getUN().then(function(response){
            $scope.lstUN = response;          
            
            $scope.criarPaginacao($scope.lstUN);

            $scope.loadingState = false;
        }).catch(function(response){
            console.log("err", response);            
        });    

    };

    load = function(){
        $scope.loadingState = true;
        IMO_CadastroIMDGServicos.getClass().then(function(response){
            //console.log("a", $scope.lstClass);
            $scope.lstClass = response;
            $scope.loadingState = false;
        }).catch(function(response){
            console.log("err", $scope.lstClass);
            
        });

        $scope.loadingState = true;

        carregarUN();


        $scope.loadingState = true;
        IMO_CadastroIMDGServicos.getEMS().then(function(response){
            $scope.lstEMS = response;
            $scope.loadingState = false;
        }).catch(function(response){
            console.log("err", response);            
        });  
    } 

    load();

});