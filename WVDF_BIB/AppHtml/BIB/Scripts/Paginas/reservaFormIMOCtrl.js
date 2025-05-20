var appIMO = angular.module("CROSSAppIMO", []);

appIMO.controller("reservaFormImoCtrl", function($scope){
    $scope.at = "addd";



    $scope.teste = function(value){
        console.log("foi");
        console.log(value);
    };


    loadPage = function(){
        console.log("load");
    };

    loadPage();
});