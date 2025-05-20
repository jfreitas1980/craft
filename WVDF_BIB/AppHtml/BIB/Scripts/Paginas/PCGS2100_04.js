// ANGULAR JS
app = angular.module('pcgs210004App', ['ngSanitize', 'ui.bootstrap', 'smart-table']);

app.filter('dateToISO', function() {
    return function(input) {
        input = new Date(input).toISOString();
        return input;
    };
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

app.controller('pcgs210004Controller', function($scope, buscaWS) {
    $scope.listaPendencias;
    $scope.countAlta = 0;
    $scope.countNormal = 0;
    $scope.countBaixa = 0;

    buscaWS.get('/WVDF_WS/ws_hcgs2100.wso/f_PesquisaHCGS2100/JSON', '').then(function(data) {
        $scope.listaPendencias = data;
        $scope.totalItems = data.length;
    });

    buscaWS.get('/WVDF_WS/ws_hcgs2100.wso/f_home_pendencia/JSON', '').then(function(data) {
        $scope.countAlta = data.Alto;
        $scope.countNormal = data.Normal;
        $scope.countBaixa = data.Baixo;
    });

    $scope.refresh = function() {
        buscaWS.get('/WVDF_WS/ws_hcgs2100.wso/f_PesquisaHCGS2100/JSON', '').then(function(data) {
            $scope.listaPendencias = data;
            $scope.totalItems = data.length;
        });

        buscaWS.get('/WVDF_WS/ws_hcgs2100.wso/f_home_pendencia/JSON', '').then(function(data) {
            $scope.countAlta = data.Alto;
            $scope.countNormal = data.Normal;
            $scope.countBaixa = data.Baixo;
        });
    }

    $scope.clickSelectAll = function() {
        $('input:checkbox[name="chk_status"]').prop('checked', true);
    };

    $scope.clickSelectNone = function() {
        $('input:checkbox[name="chk_status"]').prop('checked', false);
    };

    $scope.clickPendencia = function(RecId, UrlId) {
        console.log(RecId);
        console.log(UrlId);
        // parent.parent.addTab('PENDENCIA '+RecId, UrlId+ getVariavelURL('aUsuarioSessao'));
        window.top.jaddTab("PENDENCIA" + RecId, UrlId + getVariavelURL('aUsuarioSessao'));
    };

    $scope.clickBaixaPendencia = function() {
        var jaUsuarioSessao = getVariavelURL('aUsuarioSessao');
        var sSend = '';
        var bErro = false;

        alertify.confirm('Deseja dar baixa nesta pendencia?', function(r) {
            if (r) {
                $('input:checkbox[name="chk_status"]').each(function() {
                    var sThisVal = (this.checked ? '1' : '0');
                    if (sThisVal == 1) {

                        if ($(this).attr('tabela') == "HCGS2102") {
                            sSend = $(this).attr('recnum');

                            jaProcessReturn = ReadFuncValue(sSend, "oPCGS2101_01", "get_f_pendencia_FUP");

                            if (jaProcessReturn == 1) {
                                sSend = $(this).val();
                                jaProcessReturn = ReadFuncValue(sSend + '","' + jaUsuarioSessao, "oPCGS2100_01", "get_f_HCGS2100AtuaSTATUS");

                                $(this).parent().parent().hide();

                                buscaWS.get('/WVDF_WS/ws_hcgs2100.wso/f_PesquisaHCGS2100/JSON', '').then(function(data) {
                                    $scope.listaPendencias = data;
                                    $scope.totalItems = data.length;
                                });
                            } else {
                                bErro = true;
                            }
                        } else {
                            sSend = $(this).val();
                            jaProcessReturn = ReadFuncValue(sSend + '","' + jaUsuarioSessao, "oPCGS2100_01", "get_f_HCGS2100AtuaSTATUS");

                            $(this).parent().parent().hide();

                            buscaWS.get('/WVDF_WS/ws_hcgs2100.wso/f_PesquisaHCGS2100/JSON', '').then(function(data) {
                                $scope.listaPendencias = data;
                                $scope.totalItems = data.length;
                            });
                        }
                    }
                });

                if (bErro)
                    parent.parent.parent.alertify.error('A pend&ecirc;ncia ainda n&atilde;o foi resolvida. Favor verificar.');
            }
        });
    };
});
