// ANGULAR JS
app = angular.module('pcgs300605App', ['toaster', 'wsDominio']);

app.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                return res.data;
            });
        }
    };
});

app.factory('callWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http({ url: url, method: "GET", params: parametros });
        }
    };
});

app.directive('ngInitial', function() {
    return {
        restrict: 'A',
        controller: [
            '$scope', '$element', '$attrs', '$parse',
            function($scope, $element, $attrs, $parse) {
                var getter, setter, val;
                val = $attrs.ngInitial || $attrs.value;
                getter = $parse($attrs.ngModel);
                setter = getter.assign;
                setter($scope, val);
            }
        ]
    };
});

app.config(function($sceProvider) {
    $sceProvider.enabled(false);
})

app.controller('pcgs300605Ctrl', function($scope, buscaWS, $http, $q, $filter, callWS, toaster) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    var aRecnum = getVariavelURL('aRecnum');
    var idProposta = getVariavelURL("idProposta");
    var params = '';

    $scope.tb = {};

    buscaWS.get('/WVDF_WS/ws_ccgs218.wso/f_CCGS218_lista/JSON', '').then(function(data) {
        $scope.lsMoedas = data;
    });


    var closeTab = function() {
        var tabId = window.frameElement.id.replace('frame', '');
        console.log(tabId);
        window.parent.$('#tab' + tabId).trigger('click');
    }


    angular.element(function() {
        var url = "PCGS3004_07.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&idProposta=" + getVariavelURL('idProposta');
        $scope.urlPDF = url;
        $scope.exibiPDF = true;
    });

    $scope.options = ['Aceitar', 'Negar', 'Contra-valor'];
    $scope.tbPendencias = {};

    var init = function() {
        getModPgto();
        
        // --- Completa a tela
        params = 'aRecnum=' + aRecnum;
        params += "&aProposta=" + idProposta;
        buscaWS.get('/WVDF_WS/ws_hcgs3006.wso/f_negociation/JSON', params).then(function(data) {
            $scope.tbPendencias = data;
        });
    }

    var getModPgto = function(){
          buscaWS.get('/WVDF_WS/ws_ccgs206.wso/listarModPgto/JSON', '').then(function(data) {
            $scope.lsModPgto = data;
        });
    }

    $scope.btnAceitar = function() {

        for (var i = $scope.tbPendencias.negociation.length - 1; i >= 0; i--) {
            $scope.tbPendencias.negociation[i].radio = {};
            $scope.tbPendencias.negociation[i].radio = 'Aceitar';
        }
    }

    $scope.btnRecusar = function() {
        $scope.exibeRecusa = true;
        $scope.exibeContraProposta = false;

        for (var i = $scope.tbPendencias.negociation.length - 1; i >= 0; i--) {
            $scope.tbPendencias.negociation[i].radio = {};
            $scope.tbPendencias.negociation[i].radio = 'Negar';
        }

    }

    $scope.btnContraProposta = function() {
        $scope.exibeContraProposta = true;
        $scope.exibeRecusa = false

        for (var i = $scope.tbPendencias.negociation.length - 1; i >= 0; i--) {
            $scope.tbPendencias.negociation[i].radio = {};
            $scope.tbPendencias.negociation[i].radio = 'Contra-valor';
        }
    }

    $scope.btnSaveAll = function() {
        var params = {};
        params.aUsuarioSessao = getVariavelURL("aUsuarioSessao");
        params.idProposta = getVariavelURL("idProposta");
        params.recPend = $scope.tbPendencias.pendRecnum;
        params.negociation = $scope.tbPendencias.negociation;

        callWS.get('/WVDF_WS/ws_hcgs3006.wso/f_dealresp/JSON', { 'aJson': params }).then(function(response) {
            closeTab();
        });
        
    }

    init();
});
