/*$(document).ready(function() {
    var version = "_v1.0"
    var injectJS = function(file) {
        $('head').append('<script src="' + file + '"><\/script>');
    }
    var injectCSS = function(file) {
        $('head').append('<link rel="stylesheet" href="' + file + '?' + version + '" >');
    }
*/
/*(function() {
var version = "_v1.0"

var injectCSS = function(file) {

    link = document.createElement('link');
    link.href =  file + '?' + version;
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
}

var injectJS = function(file) {
   // $('head').append();
    link = document.createElement('script');
    link.src = file + '?' + version ;
    document.getElementsByTagName('head')[0].appendChild(link);
}

injectCSS("/wvdf_bib/BIB/Template/css/bootstrap.css");
injectCSS("/wvdf_bib/BIB/Template/css/font-awesome.css");
injectCSS("/wvdf_bib/BIB/Template/css/ace-fonts.css");
injectCSS("/wvdf_bib/BIB/Template/css/ace.css");
injectCSS("/wvdf_bib/BIB/Template/css/ace-skins.css");
injectCSS("/wvdf_bib/BIB/Estilos/Bibliotecas/diretivas.css");
injectCSS("/wvdf_bib/BIB/Estilos/Bibliotecas/jquery.ui.css");
injectCSS("/wvdf_bib/BIB/Estilos/padroes.css");
injectCSS("/wvdf_bib/BIB/Estilos/Bibliotecas/jquery.alertify.css");
injectCSS("/wvdf_bib/BIB/Estilos/Bibliotecas/jquery.alertify.theme.css");

injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/jquery.base.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/jquery.ui.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/jquery.fancybox.js?v=2.1.5");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/jquery.alertify.js");
injectJS("/wvdf_bib/BIB/Template/js/bootstrap.js");
injectJS("/wvdf_bib/BIB/Template/js/ace.js");
injectJS("/wvdf_bib/BIB/Template/js/ace-extra.js");
injectJS("/wvdf_bib/BIB/Template/js/ace-elements.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/jquery.alertify.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/jquery.maskedinput.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/jquery.moment.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/fullcalendar.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/locale/pt-br.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/angular.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/angular-ui.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/soapclient.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/angular.soap.js");
injectJS("https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.min.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/diretivas.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/ws-dominios.js");
injectJS("/wvdf_bib/BIB/Scripts/Bibliotecas/ws-dominios-directivas.js");
//});
})();
*/
var app = angular.module('indexApp02', ['ui.bootstrap', 'wsDominio', 'diretivas', 'ngAnimate']);

app.controller('indexCtrl02', ['$scope', 'callWS', function($scope, callWS) {

    // login = 0, registrar = 1, alterarSenha = 2 
    $scope.loginMode = 0;
    $scope.login = {};
    $scope.reg = {};
    $scope.newPass = {};

    $scope.lsIdiomas = [];
    $scope.lsMarcas = [];
    $scope.lsGeneros = [];
    $scope.lsPaises = [];
    $scope.lsPlaceholders = [];

    var init = function() {
        debugger;
        Fingerprint2.get(function(components) {
            var Dedo = Fingerprint2.x64hash128(components.map(function(pair) { return pair.value }).join(), 31);
            
            var params = {'sDedoImpressora': Dedo};
            debugger;
            callWS.get("/WVDF_WS/ws_login.wso/fValidFingerPrintExternal/JSON", params).then(function(response) {
                debugger;
                if (response.data = 1) {
                    
                    alertify.success('Redirecionando');
                    //window.location.href = response.data.msgInfo;
                    
                }
            
            });

        });

    }

    var loadRegister = function() {
        $scope.reg.idioma = "2";
        $scope.reg.marca = "1";

        listarIdiomas();
        listarMarcas();
        listarGeneros();
        listarPaises();
        listaPlaceholders();
    }

    // WS FUNCTIONS 
    var listarIdiomas = function() {
        var params = {};
        callWS.get('/WVDF_WS/ws_csag303.wso/listarIdiomas/JSON', params).then(function(response) {
            $scope.lsIdiomas = response.data;
        });
    }

    var listarMarcas = function() {
        var params = {};
        return callWS.get('/WVDF_WS/ws_csag308.wso/listarMarcas/JSON', params).then(function(response) {
            $scope.lsMarcas = response.data;
        });
    }

    var listarGeneros = function() {
        var params = {};
        callWS.get("/WVDF_WS/ws_csag300.wso/listarGeneros/JSON", params).then(function(response) {
            $scope.lsGeneros = response.data;
        });
    }

    var listarPaises = function() {
        var params = {};
        callWS.get("/WVDF_WS/ws_csag329.wso/listarPaises/JSON", params).then(function(response) {
            $scope.lsPaises = response.data;
        });
    }

    var listaPlaceholders = function() {
        var params = {
            'aIDIOMA': $scope.reg.idioma,
            'aPROGRAMA': "PAG300_03"
        };

        callWS.get("/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON", params).then(function(response) {
            $scope.lsPlaceholders = response.data;
        });
    }

    // END WS


    // Login Form

    $(document).keypress(function(e) {
        if (e.which == 13) {
            if ($scope.loginMode == 0)
                $scope.btnEntrar();
            else if ($scope.loginMode == 2)
                $scope.btnSalvarNovaSenha();
        }
    });

    $scope.btnEsqueceuSenha = function() {
        var params = { 'sJSON': $scope.login };

        callWS.get("/WVDF_WS/ws_login.wso/esqueceuSenha/JSON", params).then(function(response) {
            if (response.data.hasError)
                alertify.error(response.data.msgError);
            else
                alertify.success(response.data.msgInfo);
        });
    }

    $scope.btnContinuar = function() {

        Fingerprint2.get(function(components) {
            form.fingerprint = Fingerprint2.x64hash128(components.map(function(pair) { return pair.value }).join(), 31);
            form.step = 1;


            // debugger;
            // var ws = 'http://192.168.6.23/crm/Account/Login.aspx?login=gabriel.franca@2wa.com.br&senha=2831996Zz!';
            // callWS.get(ws, '').then(function(response) {
            //     debugger;
            //     alertify.success('Logado no CRM');

            var params = { 'sJSON': form };

            callWS.get("/WVDF_WS/ws_login.wso/loginUsuario/JSON", params).then(function(response) {
                if (response.data.hasError) {
                    if (response.data.msgError == "6") {
                        $scope.loginMode = 2;
                    } else {
                        alertify.error(response.data.msgError);
                    }
                } else {

                    // myWindow = window.open("http://192.168.6.18/crm/Account/Login.aspx?login=gabriel.franca@2wa.com.br&senha=2831996Zz!", "myWindow", "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=10, height=10, visible=none");
                    // self.focus();
                    // setTimeout(function () { 
                    // myWindow.close();
                    window.location.href = response.data.msgInfo;
                    // }, 3000);
                }
            });
        })

        $("#lgs1").toggle();
        $("#lgs2").toggle();
        $scope.loginMode = 3;
    }


    $scope.btnEntrar = function(form) {
        Fingerprint2.get(function(components) {
            form.fingerprint = Fingerprint2.x64hash128(components.map(function(pair) { return pair.value }).join(), 31);
            form.step = 2;
            console.log(form);


            // debugger;
            // var ws = 'http://192.168.6.23/crm/Account/Login.aspx?login=gabriel.franca@2wa.com.br&senha=2831996Zz!';
            // callWS.get(ws, '').then(function(response) {
            //     debugger;
            //     alertify.success('Logado no CRM');

            var params = { 'sJSON': form };

            callWS.get("/WVDF_WS/ws_login.wso/loginUsuario/JSON", params).then(function(response) {
                if (response.data.hasError) {
                    if (response.data.msgError == "6") {
                        $scope.loginMode = 2;
                    } else {
                        alertify.error(response.data.msgError);
                    }
                } else {

                    // myWindow = window.open("http://192.168.6.18/crm/Account/Login.aspx?login=gabriel.franca@2wa.com.br&senha=2831996Zz!", "myWindow", "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=10, height=10, visible=none");
                    // self.focus();
                    // setTimeout(function () { 
                    // myWindow.close();
                    window.location.href = response.data.msgInfo;
                    // }, 3000);
                }
            });
        })
        // });

    }

    $scope.btnShowRegistrar = function() {
        $scope.reg.email = $scope.login.email;
        $scope.reg.senha = $scope.login.senha;
        $scope.loginMode = 1;
        loadRegister();
    }

    // END Login Form


    // Register Form
    $scope.btnShowLogin = function() {
        $scope.loginMode = 0;
        $("#lgs1").show();
        $("#lgs2").hide();
    }

    $scope.btnEnviar = function() {
        var params = { 'sJSON': $scope.reg };

        callWS.get("/WVDF_WS/ws_csag300.wso/gravaNovoUsuario/JSON", params).then(function(response) {
            if (response.data.defaultMessage.hasError) {
                alertify.error(response.data.defaultMessage.msgError);
            } else {
                alertify.success(response.data.defaultMessage.msgInfo);
                $scope.loginMode = 0;
            }
        });
    }

    // END Register Form


    // Nova Senha Form

    $scope.btnSalvarNovaSenha = function() {
        $scope.newPass.email = $scope.login.email;
        var params = { 'sJSON': $scope.newPass };

        console.log(params);
        callWS.get("/WVDF_WS/ws_CSAG300.wso/expiradaSenhaUsuario/JSON", params).then(function(response) {
            if (response.data.hasError) {
                alertify.error(response.data.msgError);
            } else {
                alertify.success(response.data.msgInfo);
                $scope.loginMode = 0;
            }
        });
    }

    // NED Nova Senha Form

    init();
}]);