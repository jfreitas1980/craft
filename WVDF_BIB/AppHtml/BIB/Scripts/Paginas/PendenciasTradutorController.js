var app = angular.module('PendenciasApp', ['ui.bootstrap']);

    app.controller('PendenciasTradutorController', ['$scope', '$http', function($scope, $http) {

 $scope.LogProp = [];
  $http.get("http://192.168.6.23/api/lib/cross/logproposta/2018030492")
    .then(function(response) {

        $scope.LogProp = response.data;
        console.log($scope.LogProp);
    });


        $scope.acModel2 = function() {



            var arr = [
            {
            	"id": 831034,
            	"logMsg": "ATUALIZANDO VOLUME,PESO E PCS.",
            	"usuarioNome":"ANDERSON RODRIGUES",
            	"alterDate": "2018-05-23 16:02:24.327",
            	"inverted": "badge"
            },
            {
            	"recnum": 831036,
            	"log_msg": "ATUALIZANDO O CONTAINER DA PROPOSTA",
            	"usuarionome":"ANDERSON RODRIGUES",
            	"date_date_a": "2018-05-23 16:02:24.583",
            	"inverted": "inverted"
            },
            {
            	"recnum": 831038,
            	"log_msg": "ATUALIZANDO O AGENTE/TERMINA/VALIDADE DA PROPOSTA BASEADO NO FRET",
            	"usuarionome":"ANDERSON RODRIGUES",
            	"date_date_a": "2018-05-23 00:00:00.000",
            	"inverte": "badge"
            },
            {
            	"recnum": 831041,
            	"log_msg": "DELETANDO TAXAS PARA RECALCULAR",
            	"usuarionome":"ANDERSON RODRIGUES",
            	"date_date_a": "22018-05-23 00:00:00.000",
            	"inverted": "inverted"
            }
           
            ]
            return arr;
        }
    }])