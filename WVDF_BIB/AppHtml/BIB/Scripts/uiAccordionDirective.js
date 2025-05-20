angular.module("CROSSApp").directive("uiAccordions", function(){
    return{
        controller: function($scope, $element, $attrs){
            var accordions = [];
            this.registerAccordion = function(accordion){
                accordions.push(accordion);
            };

            this.closeAll = function(){
                accordions.forEach(function(accordion){
                    accordion.isOpened = false;
                });
            }
        }
    };
});

angular.module("CROSSApp").directive("uiAccordion", function(){
    return{
        templateUrl: "/wvdf_bib/BIB/Scripts/accordion.html",
        transclude: true,
        scope:{
            title:"@"
        },
        require: "^uiAccordions",
        link: function(scope, element, attrs, ctrl){
            ctrl.registerAccordion(scope);

            scope.open = function(){
                var _isOpened2 = scope.isOpened;
                ctrl.closeAll();                
                scope.isOpened = !_isOpened2;
            };
        }
    };
});