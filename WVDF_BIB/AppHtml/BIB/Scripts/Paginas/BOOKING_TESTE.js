var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
// ANGULAR JS
app = angular.module('bookingTesteApp', ['ngTagsInput', 'wsDominio', 'toaster', 'diretivas', 'ngMaterial', 'ui.bootstrap', 'ui.utils.masks', 'ngTable']);

app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                return res.data;
            });
        }
    };
});

app.directive("typeaheadWatchChanges", function() {
    return {
        require: ["ngModel"],
        link: function(scope, element, attr, ctrls) {
            scope.$watch('proposta.pol', function(value) {
                ctrls[0].$setViewValue(value);
                console.log('value', value);
                console.log('$setViewValue', ctrls[0].$setViewValue.$viewValue);
            });
        }
    };
});

app.filter('FilterArray', function() {
    // the filter takes an additional input filterIDs
    return function(inputArray, filterIDs) {
        // filter your original array to return only the objects that
        // have their ID in the filterIDs array
        if (angular.isUndefined(inputArray) || angular.isUndefined(filterIDs)) return;
        return inputArray.filter(function(entry) {
            return this.indexOf(entry.ID) !== -1;
        }, filterIDs); // filterIDs here is what "this" is referencing in the line above
    };
});

app.controller('bookingTesteController', function($scope, $controller, buscaWS, callWS, $http, $q, toaster, $filter, NgTableParams) {
    
    var init = function() {
        $scope.loadingState = false;
    }

    init();
});