// FORMATA A PAGINA
$(document).on('click', '#dashboard', function() {
    $('#frameDashBoard').attr('src', $('#frameDashBoard').attr('src'));
});

var jaddTab = function(title, link) {

    Fingerprint2.getLocalHash().then(function(hash) {
        var paramsl = { 'aUsuarioSessao': getVariavelURL("aUsuarioSessao") };
        paramsl.fingerprint = hash;

        $.getJSON('/WVDF_WS/ws_login.wso/acessoLogin/JSON?sJSON=' + JSON.stringify(paramsl)).then(function(data) {
            if (data.hasError) {
                window.location.href = "sessionTimeout.html";
            }
        });
    });

    pageNum++;
    $('#pageTab').append(
        $('<li><a href="#page' + pageNum + '" data-toggle="tab">' +
            title +
            '<button id="tab' + pageNum + '"class="close" type="button" ' +
            'title="Remove this page">x</button>' +
            '</a></li>'));

    $('#pageTabContent').append(
        $('<div class="tab-pane" style="height: 100%;" id="page' + pageNum + '"><iframe id="frame' + pageNum + '" src="' + link + '" frameborder="0" scrolling="no" style="border: none; width: 100%; overflow:scroll;"></iframe></div>'));

    $('#pageTab a:last').tab('show');

    iFrameResize();

    $('#frame' + pageNum).load(function() {
        this.style.height =
            this.contentWindow.document.body.offsetHeight + 'px';
    });
};


$(document).ready(function() {
    $("#notificationLink").click(function() {
        $("#notificationContainer").fadeToggle(300);
        $("#notification_count").fadeOut("slow");
        if ($('#notificationLink').hasClass('fa-envelope-o')) {
            $('#notificationLink').addClass('fa-envelope-open-o');
            $('#notificationLink').removeClass('fa-envelope-o');
        } else {
            $('#notificationLink').addClass('fa-envelope-o');
            $('#notificationLink').removeClass('fa-envelope-open-o');
        }
        console.log("feito");
        return false;
    });

    $(document).click(function() {
        $("#notificationContainer").hide();
        $('#notificationLink').addClass('fa-envelope-o');
        $('#notificationLink').removeClass('fa-envelope-open-o');
    });

    $("#notificationContainer").click(function() {
        return false;
    });


    var validar = function(time) {
        setTimeout(function() {
            Fingerprint2.getLocalHash().then(function(hash) {
                var paramsl = { 'aUsuarioSessao': getVariavelURL("aUsuarioSessao") };

                paramsl.fingerprint = hash;
                console.log(paramsl.fingerprint);
                $.getJSON('/WVDF_WS/ws_login.wso/acessoValidade/JSON?sJSON=' + JSON.stringify(paramsl)).then(function(data) {
                    //console.log(data); return;
                    if (getVariavelURL("debug")) return;
                    console.log(data);
                    if (data.hasError) {
                        if (window.top) {
                            window.top.location.href = "sessionTimeout.html";
                        } else window.location.href = "sessionTimeout.html";
                    } else {
                        validar(data.msgInfo * 60 * 1000 + 1000 * 60);
                    }
                });


            });
        }, time);
    }

    validar(100);
});

// ANGULAR JS
app = angular.module('homeApp', ['ui.bootstrap', 'wsDominio', 'ngSanitize', 'toaster']);

app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                return res.data;
            });
        }
    };
});

app.directive('scrollTo', function($location, $anchorScroll) {
    return function(scope, element, attrs) {

        element.bind('click', function(event) {
            event.stopPropagation();
            var off = scope.$on('$locationChangeStart', function(ev) {
                off();
                ev.preventDefault();
            });
            var location = attrs.scrollTo;
            $location.hash(location);
            $anchorScroll();
        });

    };
});


app.controller('NotificacoesCtrl', ['$scope', '$interval', 'callWS', '$timeout', function($scope, $interval, callWS, $timeout) {

    var aUsuarioSessao = getVariavelURL("aUsuarioSessao");
    $scope.notifications = [];
    var timeoutClock = {};

    var init = function() {
        f_lista_notify();
        fClock();
    }

    var f_lista_notify = function() {
        var params = {
            'aUsuarioSessao': aUsuarioSessao
        };

        callWS.get('/WVDF_WS/ws_tmen1004.wso/f_lista_notify/JSON', params).then(function(response) {
            $scope.notifications = response.data.dados;
            $(".alertify-logs").remove();
            if (response.data.dados.length > 0) {
                alertify.log(response.data.mensagem);
            }
        });
    }

    var p_del_notify = function(notify) {

        var params = {
            'SRECNUM': notify.srecnum,
        };

        callWS.get('/WVDF_WS/ws_tmen1004.wso/p_del_notify/JSON', params).then(function(response) {
            for (var i = 0; i < $scope.notifications.length; i++) {
                if ($scope.notifications[i].srecnum == notify.srecnum) {
                    $scope.notifications.splice(i, 1);
                    break;
                }
            }
        });
    }

    $scope.notificationClick = function(notify) {
        $scope.$parent.addTab("Notify", notify.link + aUsuarioSessao);
        p_del_notify(notify);
    }


    $scope.p_clear_notify = function() {
        var params = {
            'aUsuarioSessao': aUsuarioSessao
        };

        callWS.get('/WVDF_WS/ws_tmen1004.wso/p_clear_notify/JSON', params).then(function(response) {
            f_lista_notify();
        });
    }

    var fClock = function() {
        timeoutClock = window.setTimeout(function() {
            f_lista_notify();
            clearTimeout(timeoutClock);
            fClock();
        }, 1000 * 60 * 5); // 5 minutos
    }

    init();
}]);



app.controller('homeController', function($scope, buscaWS, $http, toaster, $location, $anchorScroll, $sce) {
    $scope.dashboard = '';

    
    $http.get("/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON?aUsuarioSessao=" + getVariavelURL("aUsuarioSessao") + "&sPrograma=HOME").then(function(res){
        $scope.literais = res.data;
    });

    buscaWS.get('/WVDF_WS/ws_CSAG364_00.wso/f_Menu_CSAG364/JSON', '').then(function(data) {
        $scope.items = data;
        console.log($scope.items);
    });

    buscaWS.get('/WVDF_WS/ws_csag300.wso/loadDashboard/JSON', '').then(function(data) {
        $scope.dashboardUrl = $sce.trustAsResourceUrl(data + getVariavelURL('aUsuarioSessao'));
    });
    // buscaWS.get('/WVDF_WS/ws_hcgs2100.wso/f_home_pendencia/JSON', '').then(function(data) {
    //     if (data.Alto > 0 | data.Normal > 0 | data.Baixo > 0)
    //         toaster.pop('warning', "Voce possui pendencias em aberto!", "Alta: " + data.Alto + "<br/>Normal: " + data.Normal + "<br/>Baixa: " + data.Baixo);
    // });


    $scope.aCallToaster = function(type, mensagem) {
        toaster.pop(type, mensagem);
    }

    $scope.clickToaster = function() {}

    $scope.fnSelecionaMenu = function(menu) {
        $scope.pesquisaMenu = "";

        $scope.addTab(menu.sPrograma, menu.sLink);
    };

    $scope.acMenu = function(texto) {
        return buscaWS.get('/WVDF_WS/WS_csag363.wso/f_busca_menu/JSON', 'sInicio=' + texto).then(function(data) {
            console.log(data);
            return data;
        });

    };

    $scope.addTab = function addTab(title, link, includesSessionId = true, tabControlSelector = null, tabItemSelector = null) {

        Fingerprint2.getLocalHash().then(function(hash) {
            var paramsl = { 'aUsuarioSessao': getVariavelURL("aUsuarioSessao") };
            paramsl.fingerprint = hash;

            $.getJSON('/WVDF_WS/ws_login.wso/acessoLogin/JSON?sJSON=' + JSON.stringify(paramsl)).then(function(data) {
                if (data.hasError) {
                    window.location.href = "sessionTimeout.html";
                }
            });
        });

        callGoogleAnalytics(getVariavelURL("aUsuarioSessao"), link);

        pageNum++;
        $('#pageTab').append(
            $('<li><a href="#page' + pageNum + '" data-toggle="tab">' +
                title +
                '<button id="tab' + pageNum + '"class="close" type="button" ' +
                'title="Remove this page">x</button>' +
                '</a></li>'));

        if (link.lastIndexOf('http') > 0) {
            link = link.substring(link.lastIndexOf('http'));
        }

        if (includesSessionId) {
            if (!link.includes('aUsuarioSessao')) {
                link += (!link.includes('?') ? '?' : '&') + 'aUsuarioSessao=' + getVariavelURL('aUsuarioSessao');
            }
        }

        $('#pageTabContent').append(
            $('<div class="tab-pane" style="height: 100%;" id="page' + pageNum + '"><iframe id="frame' + pageNum + '" src="' + link + '" frameborder="0" scrolling="no" style="border: none; width: 100%; overflow:scroll;"></iframe></div>'));

        $('#pageTab a:last').tab('show');

        $('#frame' + pageNum).load(function() {
            $(this).iFrameResize();

            try {
                this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
            } catch {}

            if (tabControlSelector && tabItemSelector) {
                var tabControl = $(this.contentDocument).find(tabControlSelector)[0];

                var mutationObserver = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        $(tabControl).find(tabItemSelector).tab('show');
                    });
                });

                mutationObserver.observe(tabControl, {
                    attributes: false,
                    characterData: false,
                    childList: true,
                    subtree: false,
                    attributeOldValue: false,
                    characterDataOldValue: false
                });
            }
        });

        $('#pageTab').find('a[href="#page' + pageNum + '"]').click(function() {
            var href = $(this).attr('href');
            var tabNumber = href.substr(5, href.length);

            setTimeout(() => {
                let iFrame = $('#frame' + tabNumber);
                iFrame.focus();
            }, 100);
        });

        scrollToPosition(0, 0);
    };

    window.addTab = $scope.addTab;

    $scope.notif = {};

});

var callToaster = function(type, mensagem) {
    angular.element(document.getElementById('homeacCtrl')).scope().aCallToaster(type, mensagem);
}

window.addEventListener("message", function(event) {
    if (event.data) {
        if (event.data.type == 'not-authorized') {
            window.location.href = "sessionTimeout.html";
        }
        if (event.data.type == 'open-tab' && event.data.url) {
            window.addTab(event.data.title, event.data.url, false, event.data.tabControlSelector, event.data.tabItemSelector);
        }
        if (event.data.type == 'scroll-to') {
            scrollToIFrameElement(event.data.top, event.data.left);
        }
    } else {
        alertify.error('Evento Invalido!');
    }
});

function scrollToIFrameElement(elementTop, elementLeft) {
    var tabPane = document.querySelector('.tab-pane.active');

    var bodyRect = document.body.getBoundingClientRect();
    var tabPaneRect = tabPane.getBoundingClientRect();

    var top = (elementTop + (tabPaneRect.top - bodyRect.top)) - 10;
    var left = (elementLeft + (tabPaneRect.left - bodyRect.left)) - 10;

    scrollToPosition(top, left);
}

function scrollToPosition(top, left) {
    $('html, body').animate({
        scrollTop: top,
        scrollLeft: left
    }, 200);
}

var callGoogleAnalytics = function(_token, _url) {
    console.log("chamou analytics");
    console.log("_token", _token);
    console.log("_url", _url);
    //(window).ga('create', 'UA-148383555-1', 'auto');
    //(window).ga('set', 'userId', _token);
    //(window).ga('send', 'pageview');
}