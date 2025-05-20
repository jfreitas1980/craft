var app = angular.module('pcgs23405', ['ui.bootstrap', 'wsDominio', 'diretivas']);

app.controller('pcgs23405Ctrl', ['$scope', 'callWS', '$timeout', function($scope, callWS, $timeout) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');

    $scope.dualListArray = [];
    var currentLeftPage = 1;
    var currentRightPage = 1;

    var init = function() {}

    $(document).on('change', '#listaPessoas', function() {
        $scope.dualListArray = [];
        getDualList(1, 0, '');
        getDualList(1, 1, '');
    });

    var getDualList = function(currentPage, aOption, aPessoa) {
        var params = {

            'aUsuarioSessao': aUsuarioSessao,
            'aCCGS213_ID': $('#listaPessoas').val(),
            'aOption': aOption,
            'aInicio': aPessoa,
            'itemsByPage': 20,
            'currentPage': currentPage
        };

        callWS.get('/WVDF_WS/ws_ccgs234.wso/f_PesquisaCCGS234/JSON', params).then(function(response) {
            $scope.dualListArray = $scope.dualListArray.concat(response.data.dados);
           // console.log(response.data);
        });
    }

    var atualizaWS = function(value) {
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'aCCGS213_ID': $('#listaPessoas').val(),
            'aSubMot_ID': value.ID,
            'bSel': value.SEL
        };
      //  console.log(params);
        callWS.get('/WVDF_WS/ws_ccgs234.wso/f_AtualizaCCGS234/JSON', params).then(function(response) {});
    }


    $scope.filterLeft = function($value) {
        for (var i = $scope.dualListArray.length - 1; i >= 0; i--) {
            if ($scope.dualListArray[i].SEL == 0) {
                $scope.dualListArray.splice(i, 1);
            }
        }

        currentLeftPage = 2;
        getDualList(1, 0, $value);
    }

    $scope.filterRight = function($value) {
        for (var i = $scope.dualListArray.length - 1; i >= 0; i--) {
            if ($scope.dualListArray[i].SEL == 1) {
                $scope.dualListArray.splice(i, 1);
            }
        }
        currentRightPage = 2;
        getDualList(1, 1, $value);
    }

    $scope.dualListChange = function($value) {
        atualizaWS($value);
    }

    $scope.dualBoxScrollLeft = function($value) {
        if ($value.scroll.scrollTop >= $value.scroll.maxScrollTop / 2) {
            getDualList(currentLeftPage, 0, $value.filter);
            currentLeftPage++;
        }
    }

    $scope.dualBoxScrollRight = function($value) {
        if ($value.scroll.scrollTop >= $value.scroll.maxScrollTop / 2) {
            getDualList(currentRightPage, 1, $value.filter);
            currentRightPage++;
        }
    }

    init();
}]);
