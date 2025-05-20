
angular.module("CROSSApp").directive("uiDatepicker", function($compile){    
    return{        
        templateUrl:"/wvdf_bib/BIB/Scripts/Componentes/uiDatePicker/uiDatePicker.html",
        scope:{
            title:"@",
            id:"@id",
            ngModel:"="
        },        
        require: "ng-model",
        
        link: function($scope,element, attrs, ctrl){
            
            //console.log('element',ctrl);

            $('#' + $scope.id).datepicker({
                format: 'dd/mm/yyyy',
                language: 'pt-BR'            
            });
            
            element.bind("keyup", function(){
                console.log("id", '#' + $scope.id);
                console.log(ctrl.$modelValue); 
            });

            element.bind("blur", function(value){
                console.log("blur");
                if(ctrl.$viewValue == angular.isDefined && ctrl.$viewValue != null )
                {
                    if(ctrl.$viewValue.length != 10)
                    {
                        ctrl.$setViewValue("");
                        ctrl.$render();
                    }
                }
            });

            /*
            element.bind("focus", function(){
                console.log("focou");                
            });

            element.bind("click", function(){
                console.log("clicou");      
                $('#' + scope.id).datepicker({
                    format: 'dd/mm/yyyy',
                    language: 'pt-BR'            
                });          
            });
            */
        }
    };
});