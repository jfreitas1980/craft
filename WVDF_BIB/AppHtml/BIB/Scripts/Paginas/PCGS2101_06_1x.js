$(document).ready(function() {
    
    var sUSUARIOSESSAO = getVariavelURL('aUsuarioSessao');
    var sCodigo = getVariavelURL('aCodigo');
    var sOption =  $('#modal-email-p').attr('value');
    
    var Link = "pcgs2101_06_2x.asp?aUsuarioSessao=" + sUSUARIOSESSAO + "&aFup=" + sCodigo + "&aOption=" + sOption;

    $('#modal-email-p').attr('href', Link);

    sOption =  $('#modal-email-c').attr('value');
    
    Link = "pcgs2101_06_2x.asp?aUsuarioSessao=" + sUSUARIOSESSAO + "&aFup=" + sCodigo + "&aOption=" + sOption;

    $('#modal-email-c').attr('href', Link);

});

// $(document).on('click', '#modal-email-p', function() {
        
//     $.fancybox({
//         'padding'       : 0,
//         'autoSize'      : false,
//         'width'         : 80%,
//         'height'        : 80%,
//         'href'          : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
//         'type'          : 'swf',
//         'swf'           : {
//             'wmode'             : 'transparent',
//             'allowfullscreen'   : 'true'
//         }

//     });

//     return false;
// });

// $(document).on('click', '#modal-email-p', function() {

//     window.parent.$.fancybox({
//             fitToView: false,
//             width: '70%',
//             height: '70%',
//             autoSize: true,
//             modal: false,
//             beforeShow: function() {
//                 window.parent.$('html, body').animate({ scrollTop: 0 }, 800);
//                 // window.focus($iframe.contents().find('to'));
            
//         },
//         beforeClose: function() {
//             // working
//             var $iframe = $('.fancybox-iframe');
//             // $iframe.contents().find('to').val();
//             // console.log($iframe.contents().find("#emails").val());
//             $('#to').val($iframe.contents().find("#emails").val());
//             // alert($('input', $iframe.contents().find("#emails").val()));
//         },
//         helpers: {
//             overlay: {
//                 locked: false
//             }
//         }
    
// });


$("#modal-email-p").fancybox({
    fitToView   : false,
    width       : '70%',
    height      : '70%',
    autoSize    : true,
    modal       : false,
    beforeShow : function(){
       window.parent.$('html, body').animate({scrollTop : 0},800);
        // window.focus($iframe.contents().find('to'));
    },
    beforeClose: function() {
        // working
        var $iframe = $('.fancybox-iframe');
        // $iframe.contents().find('to').val();
        // console.log($iframe.contents().find("#emails").val());
        $('#to').val($iframe.contents().find("#emails").val());
        // alert($('input', $iframe.contents().find("#emails").val()));
    },
    helpers: {
        overlay: {
            locked: false
        }
    }
});


$("#modal-email-c").fancybox({
    fitToView   : true,
    width       : '70%',
    height      : '70%',
    autoSize    : true,
    modal       : false,
    beforeShow : function(){
       window.parent.$('html, body').animate({scrollTop : 0},800);
        // window.focus($iframe.contents().find('to'));
    },
    beforeClose: function() {
        // working
        var $iframe = $('.fancybox-iframe');
        // $iframe.contents().find('to').val();
        // console.log($iframe.contents().find("#emails").val());
        $('#bcc').val($iframe.contents().find("#emails").val());
        // alert($('input', $iframe.contents().find("#emails").val()));
    },
    helpers: {
        overlay: {
            locked: false
        }
    }
});

// ANGULAR JS
app = angular.module('enviaFupApp', ['toaster', 'wsDominio']);

app.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.factory('buscaWS', function ($http) {
    return {
        get: function (url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function (res) {
                return res.data;
            });
        }
    };
});

app.config(function ($sceProvider) {
    $sceProvider.enabled(false);
})



app.controller('enviaFupController', function ($scope, buscaWS, $http, $q, $filter, callWS, toaster) {
    $scope.emailProposta = {};

    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    
    posicionarDadosEmail();
    
    $scope.fnReload = function(){

        posicionarDadosEmail();

    }

    $scope.enviarEmail = function () {

        $scope.emailFup.aFup = getVariavelURL('aFup');
        $scope.emailFup.aUsuarioSessao = aUsuarioSessao;
        $scope.emailFup.urlPDF = $scope.urlPDF;
        var entidade = JSON.stringify($scope.emailFup);
        var params = {'sJSON': entidade};
        callWS.get('/WVDF_WS/ws_hcgs2101_06.wso/fEmailToSendFup/JSON', params)
                .then(function (response) {
                    // console.log(response);
                    if (response.data.hasError) {
                        toaster.pop('error', "Error", ("Error ao consultar registro. <br/> Response: " + response.data.msgError), null, 'trustedHtml');
                    } else {
                        toaster.pop('sucess', "Sucesso", ("Follow-Up enviado"), null, 'trustedHtml');
                    }
                    $scope.$broadcast('updateDTContainer', '');
                }, function (error) {
                    console.log(error);
                });


    };


    var posicionarDadosEmail = function () {
        var params = {'aUsuarioSessao': aUsuarioSessao, 'aFup': getVariavelURL('aFup')};
        callWS.get('/WVDF_WS/ws_hcgs2101_06.wso/fExibeEmailFup/JSON', params)
                .then(function (response) {
                    if (response.data.defaultMessage.hasError) {
                        toaster.pop('error', "Error", ("Error ao consultar registro. <br/> Response: " + response.data.defaultMessage.msgError), null, 'trustedHtml');
                    } else {
                        $scope.emailFup = response.data;
                    }
                    $scope.$broadcast('updateDTContainer', '');
                }, function (error) {
                    console.log(error);
                });
    };

    $scope.fnLimpa = function(){

        $scope.emailFup.to = '';
        $scope.emailFup.bcc = ''; 

        parametros = "aFup=" +  getVariavelURL('aFup');
        buscaWS.get('/WVDF_WS/ws_hcgs2101_06.wso/fEmailLimpar/JSON', parametros).then(function (data) {
        });

    }

    
});
