angular.module("uiCrafts", []);

angular.module("uiCrafts").directive("uiCraft", function(){
    return{
        require:"ngModel",

        link: function(scope,element, attrs, ctrl){
            //console.log(attrs);
            element.backgroundColor = "black";
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
                if(ctrl.$viewValue == angular.isDefined && ctrl.$viewValue != null )
                {
                    if(ctrl.$viewValue.length != 10)
                    {
                        ctrl.$setViewValue("");
                        ctrl.$render();
                    }
                }
                element.style = 'bg-danger';
            });
        }
    };
});