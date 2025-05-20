/*$(document).ready(function () {
    // FORMATA O TAMANHO DO IFRAME
    $('#ifrm-pag378_01', window.parent.document).height($('.container-fluid').height());

    if (getVariavelURL('RunReport') == 'RunReport' || getVariavelURL('RunReport') == '1') {
        if ($('#botoesReportFinal').is(':empty')) {
            $('#botoesReportFinal').html($('#botoesReportAux').html());
            $('#botoesReportAux').empty();
        }

        $('#nextPageFinal').attr('href', $('#nextPageAux').val());

        //window.setInterval(function(){
        //  $('div#pageTabContent div.active iframe', parent.parent.document).css('height', $('#ifrm-pag378_01', parent.document).prop('scrollHeight') + 85 + 'px');
        //  $('div#pageTabContent', parent.parent.document).css('height', $('#ifrm-pag378_01', parent.document).prop('scrollHeight') + 110 + 'px');
        //}, 1000);
    }

});

// SWITCH PODER DE DECISÃO
$(document).on('change', '#switchPowerDecision', function() {
    $(this).prop("checked") ? switchPoder("S") : switchPoder("N");
});
function switchPoder(sPoder) {
    if (sPoder != "") {
        (sPoder == "S") ? $('#switchPowerDecision').prop("checked", true) : $('#switchPowerDecision').prop("checked", false);
        $('#selstart6').val(sPoder);
    } else {
        switchPoder($('#selstart6').val());
    }
}
*/


"use strict";
angular.module('pag37802App', ['ui.bootstrap', 'ngSanitize', 'ngAnimate', 'NgSwitchery', 'ngMask']);

angular.module('pag37802App').directive('iframeSetDimensionsOnload', [function() {

    return {

        restrict: 'A',

        link: function(scope, element, attrs) {
            element.on('load', function() {

                /* Set the dimensions here, 
                   I think that you were trying to do something like this: */

                var iFrameHeight =

                    element[0].contentWindow.document.body.scrollHeight + 'px';
                var iFrameWidth = '100%';
                element.css('width', iFrameWidth);
                element.css('height', iFrameHeight);
            })
        }
    }
}]);

angular.module('pag37802App').directive('datepicker', function($parse, $http, Url) {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            minDate: '<',
            maxDate: '<',
            maxDays: '<'
        },
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
});

angular.module('pag37802App').directive('spinner', [function($parse) {
    return {
        restrict: "EA",
        transclude: true,
        replace: true,
        scope: {
            tableData: '<',
        },
        template: '<div class="spinner-wrapper"><div class="spinner spinner1"></div></div>',
    };
}]);

angular.module('pag37802App').factory('Url', [function() {
    let Url = {
        getInfo: function() {
            let query = window.location.href;
            this.url = query.split("?")[0];
            let lets = query.split("?")[1].split("&");
            for (let i = 0; i < lets.length; i++) {
                let pair = lets[i].split("=");
                let key = decodeURIComponent(pair[0]);
                let value = decodeURIComponent(pair[1]);
                if (typeof this[key] === "undefined") {
                    this[key] = decodeURIComponent(value);
                } else if (typeof this[key] === "string") {
                    let arr = [this[key], decodeURIComponent(value)];
                    this[key] = arr;
                } else {
                    this[key].push(decodeURIComponent(value));
                }
            }
        }
    }
    Url.getInfo();

    return Url;
}]);


angular.module('pag37802App').factory('$ws', ['$http', function($http) {
    return {
        get: function(ws, parametros) {
            return $http.get(ws, { 'params': parametros }).then(function(response) {
                return response.data;
            });
        }
    };
}]);

angular.module('pag37802App').factory('$spinner', [function() {

    function show() {
        $('.spinner-wrapper').addClass('spinner-show');
    }

    function hide() {
        $('.spinner-wrapper').removeClass('spinner-show');
    }

    function toggle() {
        $('.spinner-wrapper').toggleClass('spinner-show');
    }

    return {
        'show': show,
        'hide': hide,
        'toggle': toggle
    };
}]);

angular.module('pag37802App').factory('$alertify', [function() {
    function inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
    return {
        success: function(message) {
            if (inIframe()) {
                parent.parent.alertify.success(message);
            } else {
                alertify.success(message);
            }
        },
        error: function(message) {
            if (inIframe()) {
                parent.parent.alertify.error(message);
            } else {
                alertify.error(message);
            }
        }
    };
}]);

angular.module('pag37802App').service('combos', ['$ws', 'Url', function($ws, Url) {
    this.getDepartamentos = function() {
        let params = {
            'aUsuarioSessao': Url.aUsuarioSessao
        };

        return $ws.get('/WVDF_WS/ws_csag378.wso/fComboDepartamento/JSON', params).then(function(data) {
            return data;
        });
    }

    this.getCargos = function() {
        let params = {
            'aUsuarioSessao': Url.aUsuarioSessao
        };

        return $ws.get('/WVDF_WS/ws_csag378.wso/fComboCargo/JSON', params).then(function(data) {
            return data;
        });
    }
}]);

angular.module('pag37802App').service('ac', ['$ws', 'Url', function($ws, Url) {

}]);

angular.module('pag37802App').service('pagService', ['$ws', 'Url', function($ws, Url) {
    this.descricao = function(cliente) {
        let params = {
            'sCodigo': cliente
        };

        return $ws.get('/WVDF_WS/ws_csag320.wso/fDescricaoPessoa/JSON', params).then(function(data) {
            return data;
        });
    }

    this.load = function(form) {
        let params = {
            'aUsuarioSessao': Url.aUsuarioSessao,
            'sCodigo': form.sCodigo
        };

        return $ws.get('/WVDF_WS/ws_csag378.wso/fPosicionaCSAG378/JSON', params).then(function(data) {
            return data;
        });
    }

    this.report = function(form) {

        form.aUsuarioSessao = Url.aUsuarioSessao;
        let params = { 'sJSON': form };
        return $ws.get('/WVDF_WS/ws_csag378.wso/fRelatorioCSAG378/JSON', params).then(function(data) {
            return data;
        });
    }

    this.delete = function(form) {

        let params = {
            'aUsuarioSessao': Url.aUsuarioSessao,
            'sCodigo': form.sCodigo
        };

        return $ws.get('/WVDF_WS/ws_csag378.wso/fDeleteCSAG378/JSON', params).then(function(data) {
            return data;
        });
    }

    this.save = function(form) {
        form.aUsuarioSessao = Url.aUsuarioSessao;
        let params = { 'sJSON': form };

        return $ws.get('/WVDF_WS/ws_csag378.wso/fSaveCSAG378/JSON', params).then(function(data) {
            return data;
        });
    }
}]);



angular.module('pag37802App').controller('MainCtrl', ['$scope', '$spinner', '$alertify', 'Url', 'combos', 'ac', 'pagService', '$uibModal', '$sce', '$http', 
    function($scope, $spinner, $alertify, Url, combos, ac, pagService, $uibModal, $sce, $http) {
    $scope.form = {};
    $scope.form.sStatus = "1";
    $scope.report = [];
    $scope.combo = {};
    $scope.urlAcoes = '';

    $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON', {
            params: {
                aUsuarioSessao: Url.aUsuarioSessao,
                sPrograma: 'PAG378_02'
            }
        })
        .then(function(res) {
            // debugger;
            // Object.keys(res.data).forEach(function(key) {

            //     var elemfolderName = document.createElement('textarea');
            //     elemfolderName.innerHTML = res.data[key];
            //     var folderName = elemfolderName.value;
            //     res.data[key] = $sce.trustAsHtml(elemfolderName.value);
            // });
            
            $scope.literais = res.data;
        });

    let init = function() {
        let promises = [];

        $spinner.show();
        Promise.all(promises).then(function() {
            $scope.form.sCliente = Url.sCliente;
            $scope.btnExecutar($scope.form);
            $scope.fDescricaoPessoa(Url.sCliente);
            $spinner.hide();
        });
    }

    $scope.btnExecutar = function(form) {
        pagService.report(form).then(function(data) {
            $scope.report = data;
        });
    }

    $scope.fDescricaoPessoa = function(cliente) {
        pagService.descricao(cliente).then(function(data) {
            $scope.form.sClienteDesc = data;
        });
    }

    $scope.btnDeletar = function(form) {
        $scope.sweetAlert($scope.literais.LITERAL_15, $scope.literais.LITERAL_18, "warning").then((response) => {
            if (response) {                
                pagService.delete(form).then(function(data) {
                    $scope.btnExecutar($scope.form);
                });
            }
        });
    }

    $scope.btnZoom = function(row) {

        window.location.href = "PAG378_01.asp?aUsuarioSessao=" + Url.aUsuarioSessao + "&sCliente=" + Url.sCliente + "&sCodigo=" + row.sCodigo;
    }

    $scope.btnBack = function() {
        // 
        window.location.href = "PAG320_02_78.asp?aUsuarioSessao=" + Url.aUsuarioSessao;
    }

    $scope.btnNovo = function() {
        // 
        window.location.href = "PAG378_01.asp?aUsuarioSessao=" + Url.aUsuarioSessao + "&sCliente=" + Url.sCliente;
    }

    $scope.sweetAlert = function(titulo, texto, icone) {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: titulo,
                text: texto,
                icon: icone,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: $scope.literais.LITERAL_17,
                cancelButtonText: $scope.literais.LITERAL_16,
                showClass: {
                    backdrop: 'swal2-noanimation', // disable backdrop animation
                    popup: '', // disable popup animation
                    icon: '' // disable icon animation
                },
                hideClass: {
                    popup: '' // disable popup animation
                },
                willOpen: () => {
                    $('.swal2-popup').css('top', window.top.scrollY + 200 - self.innerHeight / 2);
                    $('.swal2-popup').css('font-size', 14);
                }
            }).then((result) => {
                if (result.isConfirmed) resolve(true);
                else resolve(false);
            });
        });
    }

    init();
}]);