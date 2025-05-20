angular.module('wsDominiosDirectivas', ['wsDominio', 'ui.bootstrap', 'ngTagsInput'])
        .directive('directAcCliente', directAcCliente)
        .controller('directAcClienteCtrl', directAcClienteCtrl)
        .directive('directAcClientePorUsuario', directAcClientePorUsuario)
        .controller('directAcClientePorUsuarioCtrl', directAcClientePorUsuarioCtrl)
        .directive('directTagsCidade', directTagsCidade)
        .controller('directTagsCidadeCtrl', directTagsCidadeCtrl)
        .directive('directSelMarcas', directSelMarcas)
        .controller('directSelMarcasCtrl', directSelMarcasCtrl)
        ;

function directAcCliente() {
    return {
        restrict: 'E',
        require: '?ngModel',
        scope: {
            name: '@',
            form: '=',
            isRequired: '=',
            sessao: '@',
            label: '@'
        },
        template: ('<div class="form-group" ng-class="{\'has-error\':innerModel.status.id && innerModel.status.id != 1}">' +
                '<label class="control-label" for="{{name}}">{{label}}</label>' +
                '<input name="{{name}}" type="text" class="{{innerClass}}" ng-model="innerModel" ng-change="onChange()" uib-typeahead="cliente as cliente.label for cliente in getClientes(sessao, $viewValue)" typeahead-wait-ms="250" typeahead-on-select="onSelectInternal($item, $model, $label)" typeahead-min-length="2" typeahead-focus-first="true" ng-required="isRequired" typeahead-focus-first="true" typeahead-no-results="noResultsDirectAcCliente" typeahead-loading="loadingAutoCompletedirectAcCliente" />' +
                '</div>' +
                '<i ng-if="loadingAutoCompletedirectAcCliente" class="glyphicon glyphicon-refresh"></i>' +
                '<div ng-if="noResultsDirectAcCliente">' +
                '<i class="glyphicon glyphicon-remove"></i>No Results Found' +
                '</div>' +
                '<div class="help-block" ng-if="innerModel.status.id && innerModel.status.id != 1">Cliente {{innerModel.status.ds}}</div>'),
        controller: 'directAcClienteCtrl',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            }

            scope.attrs = attrs;
            // locationSuggest form-control
            scope.innerClass = attrs.class;
            attrs.$set('class', null);
            // invoked when model changes from the outside
            ngModel.$render = function () {
                //  console.log('ngModel.$render');
                scope.innerModel = ngModel.$modelValue;
            };

            //  invoked when model changes from the inside
            scope.onChange = function () {
                //  console.log('scope.onChange: ' + scope.innerModel);
                ngModel.$setViewValue(scope.innerModel);
            };

            scope.onSelectInternal = function ($item) {
                //    console.log('scope.onSelectInternal');
                //      console.log( $item);
                ngModel.$setViewValue($item);
                scope.innerModel = $item;
            };
            //   element.html(template);

            // $compile(element.contents())(scope);
        }
    };
}

function directAcClienteCtrl($scope, listaCliente) {
    $scope.getClientes = function (sessao, val) {
        var params = {'sSessionId': sessao, 'sInicial': val};
        return listaCliente.get(params)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                });
    };
}

function directAcClientePorUsuario() {
    return {
        restrict: 'E',
        require: '?ngModel',
        scope: {
            name: '@',
            form: '=',
            isRequired: '=',
            sessao: '@',
            label: '@'
        },
        template: ('<div class="form-group" ng-class="{\'has-error\':innerModel.status.id && innerModel.status.id != 1}">' +
                '<label class="control-label" for="{{name}}">{{label}}</label>' +
                '<input name="{{name}}" type="text" class="{{innerClass}}" ng-model="innerModel" ng-change="onChange()" uib-typeahead="cliente as cliente.label for cliente in getClientes(sessao, $viewValue)" typeahead-wait-ms="250" typeahead-on-select="onSelectInternal($item, $model, $label)" typeahead-min-length="2" typeahead-focus-first="true" ng-required="isRequired" typeahead-focus-first="true" typeahead-no-results="noResultsDirectAcClientePorUsuario" typeahead-loading="loadingAutoCompletedirectAcClientePorUsuario" />' +
                '</div>' +
                '<i ng-if="loadingAutoCompletedirectAcClientePorUsuario" class="glyphicon glyphicon-refresh"></i>' +
                '<div ng-if="noResultsDirectAcClientePorUsuario">' +
                '<i class="glyphicon glyphicon-remove"></i>No Results Found' +
                '</div>' +
                '<div class="help-block" ng-if="innerModel.status.id && innerModel.status.id != 1">Cliente {{innerModel.status.ds}}</div>'),
        controller: 'directAcClientePorUsuarioCtrl',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            }

            scope.attrs = attrs;
            // locationSuggest form-control
            scope.innerClass = attrs.class;
            attrs.$set('class', null);
            // invoked when model changes from the outside
            ngModel.$render = function () {
                //  console.log('ngModel.$render');
                scope.innerModel = ngModel.$modelValue;
            };

            scope.onChange = function () {
                ngModel.$setViewValue(scope.innerModel);
            };

            scope.onSelectInternal = function ($item) {
                //    console.log('scope.onSelectInternal');
                //      console.log( $item);
                ngModel.$setViewValue($item);
                scope.innerModel = $item;
            };
            //   element.html(template);

            // $compile(element.contents())(scope);
        }
    };
}

function directAcClientePorUsuarioCtrl($scope, listaClientePorUsuario) {
    $scope.getClientes = function (sessao, val) {
        var params = {'sSessionId': sessao, 'sInicial': val};
        return listaClientePorUsuario.get(params)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                }, function (error) {
                    console.log(error);
                });
    };
}

function directTagsCidade() {
    return {
        restrict: 'E',
        scope: {
            sessao: '@'
        },
        template: ('<auto-complete source="getCidades(sessao, $query)" min-length="2"></auto-complete>'),
        controller: 'directTagsCidadeCtrl'
    };
}

function directTagsCidadeCtrl($scope, listaCidades) {
    $scope.getCidades = function (sessao, val) {
        var params = {'aUsuarioSessao': sessao, 'sInicial': val};
        return listaCidades.get(params)
                .then(function (response) {
                    return response.data.dados;
                }, function (error) {
                    console.log(error);
                });
    };
}


function directSelMarcas() {
    console.log('directSelMarcas');
    var x = {
        restrict: 'A',
        scope: {
            sessao: '@directSelMarcasSessao'
        },
        template: ('ng-options="aux.id as aux.value for aux in lsMarcas2"'),
        controller: 'directSelMarcasCtrl',
        link: function (scope, element, attrs) {
             scope.lsMarcas2 = [{'id': 'sessao', 'value': 'teste'}];
            console.log('scope');
            console.log(scope);
            console.log('element');
            console.log(element);
            console.log('attrs');
            console.log(attrs);
        }
    };

    console.log(x);
    return x;
}

function directSelMarcasCtrl($scope, getMarcas) {

    console.log('directSelMarcasCtrl');
  //  $scope.lsMarcas2 = [{'id': 'sessao', 'value': 'teste'}];
    console.log($scope.lsMarcas2);
    $scope.lsMarcas22 = function (sessao) {
        console.log('directSelMarcasCtrl');
        var params = {'aUsuarioSessao': sessao};
        return   getMarcas.get(params)
                .then(function (response) {
                    console.log('foi');
                    console.log(response);
                    return response.data;
                    //    console.log($scope.lsMarcas2);
                }, function (error) {
                    console.log(error);
                });
    };

    //   $scope.getMarcas2('13bed26ed5922e991eccb503bda2921b837d15594ab82bdd8b256adfa7087b07');

}