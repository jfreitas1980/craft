angular.module("CROSSApp", ["ngTable"]);
/*
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
*/
angular.module("CROSSApp").controller("CadastroEmbalagemCtrl", function($scope, CadastroEmbalagemServico, NgTableParams){
    $scope.lstEmbalagem = [];            
    $scope.lstInnerPackaging = [];

    $scope.btnSalvar = function(value)
    {
        if($scope.oFormModal.$valid)
        {
            $scope.loadingState = true;
        
            CadastroEmbalagemServico.save(value).then(function(response){
                                    
                $('#modalNewUN').modal('hide');
                $scope.oEmbalagemAlterar = {};

                carregarEmbalagens();  
                
                parent.parent.alertify.success("Gravação efetuada!");
            }).catch(function(response){
                    console.log("err", response);     
                    $scope.loadingState = false;       
                    parent.parent.alertify.error(response);
            });     
                            
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
        $scope.oEmbalagemAlterar = {};
    }

    $scope.btnExcluir = function(value)
    {
        
        $scope.loadingState = true;

        if(angular.isDefined(value))
        {
            if(value.id_EmbalagemIMO > 0)
            {   
                CadastroEmbalagemServico.Excluir(value).then(function(response){
                        //$scope.lstEmbalagem = response;                                
                        //atualizarTable(response.data, true);
                        
                        $('#modalNewUN').modal('hide');
                        $scope.oEmbalagemAlterar = {};

                        carregarEmbalagens(); 
                        
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
/*
    atualizarTable = function(oItem, bDelete){
        var iPos;
        var bAdd = true;
        console.log("Item alterar", oItem);        

        if($scope.lstEmbalagem != undefined)
        {        
            $scope.lstEmbalagem.forEach(function(element){
                if(element.recnum == oItem.recnum){                    
                    bAdd = false

                    iPos = $scope.lstEmbalagem.indexOf(element);

                    if(bDelete)
                    {
                        $scope.lstEmbalagem.splice(iPos, 1);
                    }
                    else{
                        $scope.lstEmbalagem.splice(iPos, 1, angular.copy(oItem));
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
            //$scope.lstEmbalagem.push(angular.copy(value));
            $scope.lstEmbalagem.push(angular.copy(oItem));
        };
    }
*/
    $scope.openModal = function(value)
    {
        $scope.oEmbalagemAlterar = {};
        if(value != undefined)
        {
            //console.log(value);
            $scope.oEmbalagemAlterar = angular.copy(value);          
        }
        
        $(document).ready(function(){
            $("#modalNewUN").modal();
        });
    };

    $scope.openModalExcluir = function(value)
    {
        $scope.oEmbalagemAlterar = {};
        if(value != undefined)
        {
            $scope.oEmbalagemAlterar = angular.copy(value);          
        }
        
        $(document).ready(function(){
            $("#modaluserConfirm").modal();
        });
    };

    carregarEmbalagens = function(){
        $scope.loadingState = true;

        CadastroEmbalagemServico.get().then(function(response){
            $scope.lstEmbalagem = response;

            $scope.tblEmb = new NgTableParams(
            {
                page: 1,
                count: 10
            }, 
            { 
                counts: [10, 20, 50,100],
                dataset: $scope.lstEmbalagem
            });
            console.log(response);
            $scope.loadingState = false;

        }).catch(function(response){
            console.log("err", response);            
            $scope.loadingState = false;
        });            
    };

    carregarlstInnerPackaging = function(){
        $scope.loadingState = true;

        CadastroEmbalagemServico.getlstInnerPackaging().then(function(response){
            $scope.lstInnerPackaging = response;
            $scope.loadingState = false;
        }).catch(function(response){
            console.log("err", response);            
            $scope.loadingState = false;
        });            
    };

    load = function(){        
        carregarEmbalagens();  
        carregarlstInnerPackaging();
        
    } 

    load();

});