/*var jsOK = 1;
var jCsag320Id;
var jCsag378Id;

// FORMATAR PAGINA
$('document').ready( function () {
    parent.scrollTo(0,0);
    parent.parent.scrollTo(0,0);
    jCsag320Id = $('#jCsag320Id').val();
    $("#csag378__csag320_id").val(jCsag320Id);
    
    // ZERA SWITCHS
    comboSexo("");
    switchPoder("");
    
    $('#csag378__dt_nascimento').removeClass('col-xs-6').addClass('col-xs-12');
    $('#csag378__dt_nascimento').mask("99/99/9999");
    $( "#csag378__dt_nascimento" ).datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    });

    $('#csag378__observacao').blur(function(){
        TextAreaLimite(this,1022);
    });
    
});

// COMBO SEXO
$(document).on('change', '#comboSexo', function() {
    comboSexo($(this).val());
});
function comboSexo(sSexo) {
    if (sSexo != "") {
        $('#csag378__sexo').val(sSexo);
    } else {
        $('#comboSexo').val($('#csag378__sexo').val());
    }
}

// SWITCH PODER DE DECISÃO
$(document).on('change', '#switchPoder', function() {
    $(this).prop("checked") ? switchPoder("S") : switchPoder("N");
});
function switchPoder(sPoder) {
    if (sPoder != "") {
        (sPoder == "S") ? $('#switchPoder').prop("checked", true) : $('#switchPoder').prop("checked", false);
        $('#csag378__poder_decisao').val(sPoder);
    } else {
        switchPoder($('#csag378__poder_decisao').val());
    }
}

// CONFIGURAÇÃO BOTÕES TAB
$(document).on('click', '#btab_0', function () {
    $('#btab_0').addClass('active');
    $('#btab_1').removeClass('active');
    $('#bcontent_0').addClass('active');
    $('#bcontent_1').removeClass('active');
});
$(document).on('click', '#btab_1', function () {
    jCsag378Id = $('#csag378__codigo').val();

    $("#ifrm-pcgs212_03").attr({
        "src" : "PCGS212_03.asp?aUsuarioSessao=" + $('#jaUsuarioSessao').val() + "&aCSAG378Id=" + $('#csag378__codigo').val() 
    });
    $('#btab_1').addClass('active');
    $('#btab_0').removeClass('active');
    $('#bcontent_1').addClass('active');
    $('#bcontent_0').removeClass('active');
});*/



// novo


"use strict";
angular.module('pag378App', ['ui.bootstrap', 'ngSanitize', 'ngAnimate', 'NgSwitchery', 'ngMask']);

angular.module('pag378App').filter('isEmpty', function() {
    var bar;
    return function(obj) {
        for (bar in obj) {
            if (obj.hasOwnProperty(bar)) {
                return false;
            }
        }
        return true;
    };
});

angular.module('pag378App').directive('iframeSetDimensionsOnload', [function() {
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

angular.module('pag378App').directive('datepicker', function($parse, $http, Url) {
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

angular.module('pag378App').directive('spinner', [function($parse) {
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

angular.module('pag378App').factory('Url', [function() {
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


angular.module('pag378App').factory('$ws', ['$http', function($http) {
    return {
        get: function(ws, parametros) {
            return $http.get(ws, { 'params': parametros }).then(function(response) {
                return response.data;
            });
        }
    };
}]);

angular.module('pag378App').factory('$spinner', [function() {

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

angular.module('pag378App').factory('$alertify', [function() {
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

angular.module('pag378App').service('combos', ['$ws', 'Url', function($ws, Url) {
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

    this.getProdutos = function() {
        let params = {
            'aUsuarioSessao': Url.aUsuarioSessao
        };

        return $ws.get('/WVDF_WS/ws_csag378.wso/fListaProdutos/JSON', params).then(function(data) {
            return data;
        });
    }
}]);

angular.module('pag378App').service('ac', ['$ws', 'Url', function($ws, Url) {

}]);

angular.module('pag378App').service('pagService', ['$ws', 'Url', function($ws, Url) {
    this.load = function(form) {

        let params = {
            'aUsuarioSessao': Url.aUsuarioSessao,
            'sCodigo': form.sCodigo
        };

        return $ws.get('/WVDF_WS/ws_csag378.wso/fPosicionaCSAG378/JSON', params).then(function(data) {

            if (data.sPoderDecisao == 'S') data.sPoderDecisao = true;
            else data.sPoderDecisao = false;

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

    this.descricao = function(cliente) {
        let params = {
            'sCodigo': cliente
        };

        return $ws.get('/WVDF_WS/ws_csag320.wso/fDescricaoPessoa/JSON', params).then(function(data) {
            return data;
        });
    }

}]);


angular.module('pag378App').controller('MainCtrl', ['$scope', '$spinner', '$alertify', 'Url', 'combos', 'ac', 'pagService', '$http', '$sce', function($scope, $spinner, $alertify, Url, combos, ac, pagService, $http, $sce) {
    $scope.form = {};
    $scope.combo = {};
    $scope.lista = {};
    $scope.urlAcoes = '';

    let promisesLiterais = [];

    for (let i = 0; i < 3; i++) {
        promisesLiterais.push(
            $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais_seq/JSON', {
                params: {
                    aUsuarioSessao: Url.aUsuarioSessao,
                    sPrograma: 'PAG378_01',
                    iSeq: i
                }
            })
            .then(function(res) {
                return res.data;
            })
        );
    }

    Promise.all(promisesLiterais).then((values) => {
        $scope.literais = [];
        $scope.literais = values[0];
        let count = 121;
        for (let i = 1; i < values.length; i++) {
            for (let attrname in values[i]) {
                if (attrname.includes('LITERAL')) {
                    $scope.literais["LITERAL_" + count] = values[i][attrname];
                    count++;
                }
            }
        }
    });

    let init = function() {
        $spinner.show();

        let promises = [
            combos.getDepartamentos().then(function(data) {

                $scope.combo.departamentos = data;
                $scope.form.sDepartamento = data[3].id;
            }),
            combos.getCargos().then(function(data) {
                $scope.combo.cargos = data;
                $scope.form.sCargo = data[5].id;
            }),
            combos.getProdutos().then(function(data) {
                $scope.lista.produtos = data;
            })
        ];

        if (Url.sCliente && Url.sCodigo) {
            $scope.form.sCodigo = Url.sCodigo;

            promises.push(pagService.load($scope.form).then(function(data) {
                $scope.form = data;
            }));
        } else {
            $scope.form.sCodigo = 0;
        }

        Promise.all(promises).then(function() {
            if ($scope.form.sProdutos != "" && $scope.form.sProdutos != undefined) {
                $scope.form.sProdutos = $scope.form.sProdutos.split(',');

                if ($scope.form.sProdutos.length == $scope.lista.produtos.length) $scope.checkUncheckAll = true;

                for (let i = 0; i < $scope.form.sProdutos.length; i++) {
                    for (let j = 0; j < $scope.lista.produtos.length; j++) {
                        if ($scope.form.sProdutos[i] == $scope.lista.produtos[j].sId) {
                            $scope.lista.produtos[j].bCheck = true;
                            break;
                        }
                    }
                }
            }
            $scope.fDescricaoPessoa(Url.sCliente);
            $spinner.hide();
        });
    }

    $scope.checkTodosProdutos = function(check) {
        for (let i = 0; i < $scope.lista.produtos.length; i++) $scope.lista.produtos[i].bCheck = check;
    }

    $scope.tabAcoesSelected = function() {
        let codigo = $scope.form.sCodigo; //|| Url.aCSAG320Id
        codigo = codigo; //|| ''
        $scope.urlAcoes = "PCGS212_03.asp?aUsuarioSessao=" + Url.aUsuarioSessao + "&aCSAG378Id=" + codigo;
    }
    $scope.tabBookingNotifySelected = function() {
        let codigo = $scope.form.sCodigo; //|| Url.aCSAG320Id
        codigo = codigo; //|| ''
        $scope.urlAcoes = "PHSAG212_03.asp?aUsuarioSessao=" + Url.aUsuarioSessao + "&aCSAG378Id=" + codigo;
    }

    $scope.save = function(form) {
        $spinner.show();
        if (form.sSexo == '' || form.sSexo == undefined) {
            $alertify.error($scope.literais.LITERAL_246);
            $spinner.hide();
            return;
        }

        if (form.sNome == '' || form.sNome == undefined) {
            $alertify.error($scope.literais.LITERAL_247);
            $spinner.hide();
            return;
        }

        if (form.sEmail != '' && form.sEmail != undefined) {
            let emailsValidate = form.sEmail.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/g);
            if (emailsValidate != null && emailsValidate.length > 1) {
                $alertify.error($scope.literais.LITERAL_248);
                $spinner.hide();
                return;
            }
            let emailValidate = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(form.sEmail);
            if (!emailValidate) {
                $alertify.error($scope.literais.LITERAL_249);
                $spinner.hide();
                return;
            }
            form.sEmail = form.sEmail.toLowerCase();
        }

        form.sProdutos = $scope.lista.produtos.filter(x => { return x.bCheck }).map(x => { return x.sId });

        form.sCliente = Url.sCliente;
        pagService.save(form).then(function(data) {
            if (!data.hasError) {
                $alertify.success(data.msgInfo);
                $scope.form.sCodigo = data.msgSession;
            } else {
                $alertify.error(data.msgError);
            }
            $spinner.hide();
        });
    }

    $scope.relatorio = function() {
        // let codigo = Url.sCliente || '';
        window.location.href = "PAG378_02.asp?aUsuarioSessao=" + Url.aUsuarioSessao + "&sCliente=" + Url.sCliente;
    }

    $scope.fDescricaoPessoa = function(cliente) {
        pagService.descricao(cliente).then(function(data) {
            $scope.form.sClienteDesc = data;
        });
    }

    init();
}]);