var app = angular.module('MSAG300_01', ['ui.bootstrap', 'wsDominio', 'diretivas']);

app.controller('MSAG300_01Ctrl', ['$scope', 'callWS', '$timeout', function($scope, callWS, $timeout) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    var fp = 0;


    $scope.dualListArray = [];
    var currentLeftPage = 1;
    var currentRightPage = 1;

    var init = function() {
        $scope.dualListArray = [];
        Fingerprint2.getLocalHash().then(function(hash) {
            fp = hash;

            getDualList(1, false, '', fp);
            getDualList(1, true, '', fp);
        });
    }

    $scope.usuarioChange = function() {
        $scope.dualListArray = [];
        Fingerprint2.getLocalHash().then(function(hash) {
            fp = hash;

            getDualList(1, false, '', fp);
            getDualList(1, true, '', fp);
        });
    };


    var getDualList = function(currentPage, aOption, aPessoa, fp) {
        var params = {

            'aUsuarioSessao': aUsuarioSessao,
            // 'aCSAG300_ID': $scope.usuario.id,
            'aOption': aOption,
            'aInicio': aPessoa,
            'aItemsByPage': 20,
            'aFingerPrint': fp,
            'aCurrentPage': currentPage
        };

        callWS.get('/WVDF_WS/ws_MSAG300.wso/f_PesquisaMSAG300/JSON', { 'sJSON': params }).then(function(response) {
            console.log(response);
            $scope.dualListArray = $scope.dualListArray.concat(response.data.dados);
            // console.log(response.data);
        });
    }


    var getList = function(currentPage, aOption, aPessoa, fp) {
        var params = {

            'aUsuarioSessao': aUsuarioSessao,
            // 'aCSAG300_ID': $scope.usuario.id,
            'aOption': aOption,
            'aInicio': aPessoa,
            'aItemsByPage': 20,
            'aFingerPrint': fp,
            'aCurrentPage': currentPage
        };

        callWS.get('/WVDF_WS/ws_MSAG300.wso/f_PesquisaMSAG300/JSON', { 'sJSON': params }).then(function(response) {
            console.log(response);
            $scope.dualListArray = response.data.dados;
            // console.log(response.data);
        });
    }

    var atualizaWS = function(value) {
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'aCSAG300_ID': value.ID,
            'aFingerPrint': fp,
            'aOption': value.SEL == 1 ? true : false
        };
        //  console.log(params);
        callWS.get('/WVDF_WS/ws_MSAG300.wso/f_AtualizaMSAG300/JSON', { 'sJSON': params }).then(function(response) {});
    }


    $scope.filterLeft = function($value) {
        currentLeftPage = 2;
        Fingerprint2.getLocalHash().then(function(hash) {
            fp = hash;
            getList(1, false, $value, fp);
        });
    }

    $scope.filterRight = function($value) {
        currentRightPage = 2;
        Fingerprint2.getLocalHash().then(function(hash) {
            fp = hash;
            getList(1, true, $value, fp);
        });
    }

    $scope.dualListChange = function($value) {
        atualizaWS($value);
    }

    $scope.dualBoxScrollLeft = function($value) {
        Fingerprint2.getLocalHash().then(function(hash) {
            fp = hash;
            if ($value.scroll.scrollTop >= $value.scroll.maxScrollTop / 2) {
                getDualList(currentLeftPage, false, $value.filter, fp);
                currentLeftPage++;
            }
        });
    }

    $scope.dualBoxScrollRight = function($value) {
        Fingerprint2.getLocalHash().then(function(hash) {
            fp = hash;
            if ($value.scroll.scrollTop >= $value.scroll.maxScrollTop / 2) {
                getDualList(currentRightPage, true, $value.filter, fp);
                currentRightPage++;
            }
        });
    }


    $scope.acCliente = function(query) {
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'aInicio': query,
        };
        return callWS.get('/WVDF_WS/ws_csag300.wso/f_UsuarioComplete/JSON', params).then(function(response) {
            return response.data;
        });
    }

    init();
}]);