/*$(document).ready(function(){
    jQuery.datetimepicker.setLocale('pt');
})
*/

var app = angular.module('diretivas', ['ui.bootstrap']);//, 'ae-datetimepicker']);


app.directive('dynamicModel', ['$compile', '$parse', function($compile, $parse) {
    return {
        restrict: 'A',
        terminal: true,
        priority: 100000,
        link: function(scope, elem) {
            var name = $parse(elem.attr('dynamic-model'))(scope);
            elem.removeAttr('dynamic-model');
            elem.attr('ng-model', name);
            $compile(elem)(scope);
        }
    };
}]);

app.directive('datepicker', [function($parse, $http) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, attrs, ngModelCtrl) {
            var data = {};

            $.ajax({
                url: "/wvdf_ws/ws_csag309.wso/f_idiomas_literais_external/JSON?aUsuarioSessao=EXTERNAL&aPrograma=calendario&aIdioma="+navigator.language || navigator.userLanguage,
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
                closeText: data.LITERAL_30,
                currentText: data.LITERAL_31,
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


app.directive('dateTimePicker', [function($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                step: 10,
                format: 'd/m/Y H:i:00'
            });
        }
    };
}]);

/*
app.directive('dateTimePicker', dateTimePicker);

function dateTimePicker() {
    return {
        restrict: 'E',
        transclude: false,
        replace: true,
        ngModel: "=",
        template: `<div class="input-group" datetimepicker>
        <input class="form-control" />
        <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
        </span>
    </div>`
    }
}
*/

/*
app.directive("dateTimePicker", function($compile, $parse) {

    return {
        restrict: 'E',
        compile: function(element, attrs) {
            var fieldGetter = $parse(attrs.field);
            var uniqueId = 1;

            return function(scope, element, attrs) {
                var template, field, id;
                field = fieldGetter(scope);
                model = attrs.ngModel;

                var id = attrs.id;
                var ubj = "{dropdownSelector : '#dropb" + id + "'}";
                template = "<div class='dropdown'><a class='dropdown-toggle' id='dropb" + id + "' role='button' data-toggle='dropdown' data-target='data.date' href='#''>" +
                    '<input type="text" id="date" name="date" class="form-control" data-ng-model="' + model + '" data-date-time-input="DD/MM/YYYY HH:mm"  data-date-parse-strict="false">' +
                    '</a>' +
                    '<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">' +
                    '<datetimepicker data-ng-model="' + model + '" data-datetimepicker-config="' + ubj + '"></datetimepicker>' +
                    '</ul>' +
                    '</div>'
                element.replaceWith($compile(template)(scope));
            }
        }
    }
});*/

app.directive('mask', [function($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr) {
            element.mask(attr.mask);
        }
    };
}]);

app.directive('alertNullEmpty', function($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            attr.$observe('ngModel', function(value) {
                scope.$watch(attr.ngModel, function(value) {
                    if (value == null || value == "") {
                        element.addClass('submitted');;
                    } else {
                        element.removeClass("submitted");
                    }
                }, true);
            });
        }
    };
});

app.directive('scrollWatch', [function($parse) {
    return {
        restrict: 'A',
        scope: {
            "scrollWatchCallback": "="
        },
        link: function($scope, element, attrs, ngModelCtrl) {
            var raw = element[0];
            element.bind('scroll', function() {
                var maxScrollTop = raw.scrollHeight - raw.offsetHeight;
                var scrollObj = {
                    'scrollHeight': raw.scrollHeight,
                    'scrollLeft': raw.scrollLeft,
                    'scrollTop': raw.scrollTop,
                    'scrollWidth': raw.scrollWidth,
                    'scrollElementHeight': raw.offsetHeight,
                    'maxScrollTop': maxScrollTop
                }
                $scope.scrollWatchCallback(scrollObj);
            })
        }
    };
}]);

app.directive('scrollOffset', [function($parse) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs, ngModelCtrl) {
            var entrace = true;
            var applyScroll = true;
            var scrollDefaultSize = 0;
            element.context.scrollTop == 0
            element.bind('scroll', function() {
                if (applyScroll) {
                    applyScroll = false;
                    if (entrace) {
                        scrollDefaultSize = element.context.scrollTop;
                        entrace = false;
                    }
                    element.context.scrollTop = (element.context.scrollTop - scrollDefaultSize) + parseInt(attrs.scrollOffset);
                } else {
                    applyScroll = true;
                }
            })
        }
    };
}]);

app.directive('ngDualList', function() {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            listArray: '=',
            titleLeft: "@",
            titleRight: "@",
            onChange: '&',
            onScrollLeft: '&',
            onScrollRight: '&',
            filterLeft: '&',
            filterRight: '&',
        },
        controller: 'ngDualListCtrl',
        template: `<div class="row">
                    <div class="col-md-3">
                        <b>{{titleLeft}}</b>
                        <input type="text" placeholder="Pesquisar..." class="form-control" 
                        style="margin-bottom: 3px" ng-model="leftSearch" ng-change="onLeftFilter()">
                        <div class="btn-group" style="width:100%">
                            <button type="button" class="btn btn-default" style="width: 100%" 
                            title="Move all" ng-click="btnMoveAll()">
                                <i class="glyphicon glyphicon-arrow-right"></i>
                                <i class="glyphicon glyphicon-arrow-right"></i>
                            </button>
                        </div>
                        <select tooltip-placement="top" ng-disabled="prospeccao" style="height: 190px;" 
                        class="form-control" multiple="false" ng-model="ngModel"  
                        scroll-watch scroll-watch-callback="onInternalScrollLeft"
                        ng-options="aux as aux.DS for aux in listArray | filter : leftSearch | filter : {SEL : '0'}" ng-change="dualList_onChange(ngModel)">
                        </select>
                    </div>
                    <div class="col-md-3">
                     <b>{{titleRight}}</b>
                        <input type="text" placeholder="Pesquisar..." class="form-control"
                         style="margin-bottom: 3px" ng-model="rightSearch" ng-change="onRightFilter()">
                        <div class="btn-group" style="width:100%">
                            <button type="button" class="btn btn-default" 
                            style="width: 100%" title="Remove all" ng-click="btnRemoveAll()">
                                <i class="glyphicon glyphicon-arrow-left"></i>
                                <i class="glyphicon glyphicon-arrow-left"></i>
                            </button>
                        </div>
                        <select tooltip-placement="top" ng-disabled="prospeccao" 
                        style="height: 190px;" class="form-control" multiple="false" ng-model="ngModel" 
                        scroll-watch scroll-watch-callback="onInternalScrollRight"
                        ng-options="aux as aux.DS for aux in listArray | filter : rightSearch | filter : {SEL : '1'}" ng-change="dualList_onChange(ngModel)">
                        </select>
                    </div>
                </div>`,
        transclude: true,
        link: function postLink(scope, element, attrs) {

        }
    };
});


app.controller('ngDualListCtrl', ['$scope', function($scope) {
    var _this = this;

    function setDefaultVal(value, defaultValue) {
        return (value === undefined) ? defaultValue : value;
    }


    $scope.btnMoveAll = function() {
        for (var i = $scope.listArray.length - 1; i >= 0; i--) {
            if (!angular.isUndefined($scope.leftSearch))
                if ($scope.leftSearch != null && $scope.leftSearch != '')
                    if ($scope.listArray[i].DS.toLowerCase().indexOf($scope.leftSearch.toLowerCase()) < 0)
                        continue;

            $scope.listArray[i].SEL = 1;
            var $value = { '$value': $scope.listArray[i] };
            $scope.onChange($value);
        }
    }

    $scope.btnRemoveAll = function() {
        for (var i = $scope.listArray.length - 1; i >= 0; i--) {
            if (!angular.isUndefined($scope.rightSearch))
                if ($scope.rightSearch != null && $scope.rightSearch != '')
                    if ($scope.listArray[i].DS.toLowerCase().indexOf($scope.rightSearch.toLowerCase()) < 0)
                        continue;

            $scope.listArray[i].SEL = 0;
            var $value = { '$value': $scope.listArray[i] };
            $scope.onChange($value);
        }
    }

    $scope.dualList_onChange = function(value) {
        for (var i = value.length - 1; i >= 0; i--) {
            if (!angular.isUndefined(value[i])) {
                (value[i].SEL == 0) ? value[i].SEL = 1: value[i].SEL = 0;
                var $value = { '$value': value[i] };
                $scope.onChange($value);
            }
        }
    }

    $scope.onRightFilter = function() {
        var $value = { '$value': $scope.rightSearch };
        $scope.filterRight($value)
    }

    $scope.onLeftFilter = function() {
        var $value = { '$value': $scope.leftSearch };
        $scope.filterLeft($value)
    }

    $scope.onInternalScrollRight = function(scrollTop) {
        var value = { 'scroll': scrollTop, 'filter': setDefaultVal($scope.rightSearch, '') };
        var $value = { '$value': value };
        $scope.onScrollRight($value);
    }

    $scope.onInternalScrollLeft = function(scrollTop) {
        var value = { 'scroll': scrollTop, 'filter': setDefaultVal($scope.leftSearch, '') };
        var $value = { '$value': value };
        $scope.onScrollLeft($value);
    }
}]);


app.directive('checkbox', checkbox);

function checkbox() {
    return {
        require: 'ngModel',
        restrict: 'E',
        transclude: true,
        replace: true,
        // template: '<div class="switch"><input type="checkbox" class="toggle-checkbox" id="{{cbName}}" name="{{cbName}}" data-ng-checked="cbChecked" data-ng-model="cbChecked" data-ng-disabled="cbDisabled"><label for="{{cbName}}"></label>',
        scope: {
            label: "@",
            ngChecked: "=",
            ngModel: "=",
            id: "=",
            x: "=",
            ngDisabled: "=",
            onChange: "&",
        },

        template: `<div><label>{{label}}</label>
                    <label class="switch">
                        <input id="id" ng-model="ngModel" ng-checked="ngModel" ng-click="onChange()" type="checkbox" ng-disabled="ngDisabled">
                        <div class="slider round"></div>
                    </label></div>`
    }
}

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
                    <div class="modal-dialog center-modal" role="document"  style="width: 400px !important;margin-top:50px;margin-left:` + vx / 2 + `px">
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

app.directive("toggle", function($compile, $parse) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            bindModel: '=ngModel',
            eventHandler: '&ngClick',
            checkedEvent: '&ngChecked',
        },
        compile: function(element, attrs) {
            var fieldGetter = $parse(attrs.field);
            var uniqueId = 1;

            return function(scope, element, attrs) {
                var template, field, id;
                field = fieldGetter(scope);
                model = attrs.ngModel;

                var id = attrs.id;
                console.log(id);
                if (scope.bindModel) {
                    template = `<div class="toggler">
                              <input id="` + id + `" name="` + id + `" type="checkbox" ng-click="eventHandler()" ng-model="bindModel" ng-checked="checkedEvent()"/>
                              <label for="` + id + `">
                                <svg class="toggler-on" version="1.1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 130.2 130.2">
                                  <polyline class="path check" points="100.2,40.2 51.5,88.8 29.8,67.5 "></polyline>
                                </svg>
                                <svg class="toggler-off" version="1.1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 130.2 130.2">
                                  <line class="path line" x1="34.4" y1="34.4" x2="95.8" y2="95.8"></line>
                                  <line class="path line" x1="95.8" y1="34.4" x2="34.4" y2="95.8"></line>
                                </svg>
                              </label>
                            </div>`;
                } else {
                    template = `<div class="toggler">
                              <input id="` + id + `" name="` + id + `" type="checkbox" ng-click="eventHandler()" ng-model="bindModel" ng-checked="checkedEvent()"/>
                              <label for="` + id + `">
                                <svg class="toggler-off" version="1.1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 130.2 130.2">
                                  <polyline class="path check" points="100.2,40.2 51.5,88.8 29.8,67.5 "></polyline>
                                </svg>
                                <svg class="toggler-on" version="1.1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 130.2 130.2">
                                  <line class="path line" x1="34.4" y1="34.4" x2="95.8" y2="95.8"></line>
                                  <line class="path line" x1="95.8" y1="34.4" x2="34.4" y2="95.8"></line>
                                </svg>
                              </label>
                            </div>`;
                }

                /* element.bind('click', function(){
                     scope.ngModel = !scope.ngModel;
                     scope.$apply();
                   })*/
                element.replaceWith($compile(template)(scope));
            }
        }
    }
});