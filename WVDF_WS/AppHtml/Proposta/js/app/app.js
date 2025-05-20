$(document).ready(function() {
    console.log("JQuery ON");
})

angular.element(function() {
    angular.bootstrap(document, ['myApp']);
});

var app = angular.module("myApp", ['ui.bootstrap', 'ngAnimate', '2WA']);

app.directive('datepicker', [function($parse, $http, Url) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, attrs, ngModelCtrl) {
            var data = {};

            $.ajax({
                url: "/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON?aUsuarioSessao=" + Url.aUsuarioSessao + "&sPrograma=calendario",
                async: false,
                success: function(res) {
                    data = res;
                }
            });

            element.datepicker({
                showOtherMonths: true,
                selectOtherMonths: false,
                changeYear: true,
                showButtonPanel: true,
                dateFormat: data.LITERAL_15,
                monthNames: [data.LITERAL_03, data.LITERAL_04, data.LITERAL_05, data.LITERAL_06, data.LITERAL_07, data.LITERAL_08, data.LITERAL_09, data.LITERAL_10, data.LITERAL_11, data.LITERAL_12, data.LITERAL_13, data.LITERAL_14],
                dayNames: [data.LITERAL_16, data.LITERAL_17, data.LITERAL_18, data.LITERAL_19, data.LITERAL_20, data.LITERAL_21, data.LITERAL_22],
                dayNamesMin: [data.LITERAL_23, data.LITERAL_24, data.LITERAL_25, data.LITERAL_26, data.LITERAL_27, data.LITERAL_28, data.LITERAL_29],
                nextText: data.LITERAL_01,
                prevText: data.LITERAL_02,
                yearRange: "-100:+100",
                zIndexOffset: '9999',
                beforeShow: function() {
                    let dateFormatted = undefined;

                    if ($scope.maxDays && $scope.minDate) {
                        let date = new Date($scope.minDate.split('/')[2], $scope.minDate.split('/')[1] - 1, $scope.minDate.split('/')[0]);
                        date.setDate(date.getDate() + $scope.maxDays);
                        let dd = date.getDate();
                        let mm = date.getMonth() + 1;
                        let y = date.getFullYear();

                        dateFormatted = dd + '/' + mm + '/' + y;
                    }

                    return {
                        minDate: $scope.minDate,
                        maxDate: dateFormatted || $scope.maxDate
                    }
                }
            });
        }
    };
}]);