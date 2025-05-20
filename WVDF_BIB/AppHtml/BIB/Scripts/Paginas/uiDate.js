angular.module("uiDates", []);

angular.module("uiDates").directive("uiDate", function(){
    return{        
        require:"ngModel",
		scope:
		{
			id:"@id"
		},

        link: function(scope,element, attrs, ctrl){
			
			
			$('#' + scope.id).datepicker({
                format: 'dd/mm/yyyy',
                language: 'pt-BR'            
            });
            
            var _formatDateMask = function(date){
                if( date != null)
                {
                    date = date.replace(/[^0-9]+/g, "");

                    if(date.length > 2){
                        date = date.substring(0, 2) + "/" + date.substring(2);
                    }

                    if(date.length > "5")
                    {
                        date = date.substring(0, 5) + "/" + date.substring(5,9);
                    }
                }

                return date;
            };

            var _isValidDate = function(date)
            {
                if(date.trim == /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/){ 
                    return true;
                }
                else{
                    return false;
                }
            }

            //element.bind("change", function(){
            //    console.log("dddd");
            //});

            element.bind("keyup", function(){

                ctrl.$setViewValue(_formatDateMask(ctrl.$viewValue));
                ctrl.$render();
                
            });

            element.bind("blur", function(value){				
				//console.log("blur", ctrl.$viewValue);
				//console.log("element", element[0].value);
				
				if(element[0].value == "" && ctrl.$viewValue != null ) //estava zerando ao sair do campo sem selecionar uma nova data
				{
					
					element[0].value = ctrl.$viewValue;
				}
				
                if(angular.isDefined(ctrl.$viewValue) && ctrl.$viewValue != null && ctrl.$viewValue.length > 0)
                {
                    if(ctrl.$viewValue.length != 10)
                    {
                        ctrl.$setViewValue("");
                        ctrl.$render();
                    }
                    //if(!_isValidDate(ctrl.$viewValue)){
                    //    ctrl.$setViewValue("");
                    //    ctrl.$render();
                    //}
                }
               

				ctrl.$setViewValue(element[0].value);
				ctrl.$render();
            });
            
            element.bind("change", function(){
                
            });

			element.bind("click", function(){
                //$('#' + scope.id).datepicker({
                //    format: 'dd/mm/yyyy',
                //    language: 'pt-BR'            
                //});          
            });
        }
    };
});