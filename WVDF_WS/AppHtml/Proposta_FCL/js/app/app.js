$(document).ready(function() {
    console.log("JQuery ON");

    (function($) {
        "use strict";

        $(document).on('show.bs.modal', function(e) {
            if (window.top.document.querySelector('iframe')) {
                $('.modal').css('top', parent.top.scrollY);
            }
        });
    }(jQuery));

})

function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0 || val == '') ? true : false;
}

var isEmptyObject = function(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
};

var diffJSON = function(obj1, obj2) {
    var result = {};
    var change;
    for (var key in obj1) {
        if (typeof obj2[key] == 'object' && typeof obj1[key] == 'object') {
            change = diffJSON(obj1[key], obj2[key]);
            if (isEmptyObject(change) === false) {
                result[key] = change;
            }
        } else if (obj2[key] != obj1[key]) {
            result[key] = obj2[key];
        }
    }
    return result;
};

String.prototype.replaceAll || (function() {
    var regMetaChars = /[-\\^$*+?.()|[\]{}]/g;
    String.prototype.replaceAll = function(needle, replacement) {
        return this.replace(new RegExp(needle.replace(regMetaChars, '\\$&'), 'g'), replacement);
    };
}());

function cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}
var alertify = {
    success: function(message) {
        parent.parent.alertify.success(message);
    },
    error: function(message) {
        parent.parent.alertify.error(message);
    }
}

angular.element(function() {
    angular.bootstrap(document, ['myApp']);
});

var app = angular.module("myApp", ['ui.bootstrap', 'ngAnimate', 'ngTagsInput', 'toaster', 'ngSanitize', '2WA']);

app.directive("confirmClick", [
    function() {
        return {
            priority: -1,
            restrict: 'A',
            scope: { confirmFunction: "&confirmClick" },
            link: function(scope, element, attrs) {
                element.bind('click', function(e) {
                    var message = attrs.confirmClickMessage ? attrs.confirmClickMessage : "Tem certeza?";
                    if (confirm(message)) {
                        scope.confirmFunction();
                    }
                });
            }
        }
    }
]);

app.directive('alertOk', alertOK);

function alertOK() {
    var vx = document.documentElement.clientWidth / 2 - 400 / 2;

    return {
        require: 'ngModel',
        restrict: 'E',
        transclude: true,
        replace: true,
        // template: '<div class="switch"><input type="checkbox" class="toggle-checkbox" id="{{cbName}}" name="{{cbName}}" data-ng-checked="cbChecked" data-ng-model="cbChecked" data-ng-disabled="cbDisabled"><label for="{{cbName}}"></label>',
        scope: {
            label: "@",
            title: "@",
            onOk: "&",
        },

        template: `<div class="modal fade text-center" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="z-index: 9900">
                    <div class="modal-dialog center-modal" role="document"  style="width: 400px !important;margin-top:50px;margin-left:auto">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myLargeModalLabel">{{title}}</h4>
                            </div>
                            <div class="modal-body">
                                <label>{{label}}</label>
                                <div class="row" style="margin-top: 10px;">
                                    <div class="col-md-12 text-center">
                                        <button class="btn btn-success" ng-click="onOk()" data-dismiss="modal">OK</button> <button class="btn btn-danger" data-dismiss="modal" aria-label="Close">CANCELAR</button>
                                    </div>
                                    <div class="col-md-1"></div>
                                    <div class="col-md-4 text-left">
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    }
}

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