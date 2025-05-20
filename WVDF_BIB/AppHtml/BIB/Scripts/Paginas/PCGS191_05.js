var Url = {
    getInfo: function() {
        var query = window.location.href;
        this.url = query.split("?")[0];
        var vars = query.split("?")[1].split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1]);
            if (typeof this[key] === "undefined") {
                this[key] = decodeURIComponent(value);
            } else if (typeof this[key] === "string") {
                var arr = [this[key], decodeURIComponent(value)];
                this[key] = arr;
            } else {
                this[key].push(decodeURIComponent(value));
            }
        }
    }
}

Url.getInfo();

var app = angular.module('pcgs19105', ['ui.bootstrap', 'wsDominio', 'diretivas']);

app.controller('pcgs19105Ctrl', ['$scope', 'callWS', '$timeout', '$http', function($scope, callWS, $timeout, $http) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');

    $scope.comboMotivo = [];
    $scope.dualListArray = [];
    var currentLeftPage = 1;
    var currentRightPage = 1;

    var init = function() {
        comboMotivo();
    }

    var comboMotivo = function() {
        Fingerprint2.getLocalHash().then(function(hash) {
            var fp = hash;

            var sJSON = {
                aUsuarioSessao: Url.aUsuarioSessao,
                aFingerPrint: fp
            };
            $http.get("../WVDF_WS/ws_ccgs190.wso/f_CCGS190_list/JSON", { params: { 'sJSON': sJSON } }).then(function(response) {
                $scope.comboMotivo = response.data.dados;
            });
        });
    }

    $scope.tpMotivoChange = function() {
        $scope.dualListArray = [];
        getDualList(1, 0, '');
        getDualList(1, 1, '');
    }

    function UniqueArraybyId(collection, keyname) {
              var output = [], 
                  keys = [];

              angular.forEach(collection, function(item) {
                  var key = item[keyname];
                  if(keys.indexOf(key) === -1) {
                      keys.push(key);
                      output.push(item);
                  }
              });
        return output;
   };

    var getDualList = function(currentPage, aOption, aPessoa) {
        Fingerprint2.getLocalHash().then(function(hash) {
            var fp = hash;
            var params = {

                'aUsuarioSessao': aUsuarioSessao,
                'tpMotivo': $scope.tpMotivo.id,
                'aOption': aOption,
                'aInicio': aPessoa,
                'itemsByPage': 20,
                'currentPage': currentPage,
                'aFingerPrint': fp
            };

            callWS.get('/WVDF_WS/ws_ccgs191.wso/f_PesquisaHCGS190/JSON', { 'sJSON': params }).then(function(response) {
                $scope.dualListArray = UniqueArraybyId($scope.dualListArray.concat(response.data.dados), "ID");
            });
        });
    }

    var atualizaWS = function(value) {
        Fingerprint2.getLocalHash().then(function(hash) {
            var fp = hash;
            var params = {
                'aUsuarioSessao': aUsuarioSessao,
                'tpMotivo': $scope.tpMotivo.id,
                'infoCompl': value.ID,
                'bSel': value.SEL,
                'aFingerPrint': fp
            };
            //  console.log(params);
            callWS.get('/WVDF_WS/ws_ccgs191.wso/f_AtualizaHCGS190/JSON', { 'sJSON': params }).then(function(response) {});
        });
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