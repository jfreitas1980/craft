var app = angular.module('pcsag30005', ['ui.bootstrap', 'wsDominio', 'diretivas', 'toaster']);

app.controller('pcsag30005Ctrl', ['$scope', 'callWS', '$timeout', 'toaster', function($scope, callWS, $timeout, toaster) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');

    var init = function() {}

    //funcao para equiparacao
    $scope.btnAplicar = function() {
        debugger;
        var limpar=0;
        if ($scope.limpeza == true) limpar=1
        
        if ($scope.usuario.id == $scope.usuario2.id) {
            parent.parent.alertify.error('Nao podem ser repetidos usuarios!');
            return;
        }
        var vDe = parseFloat($scope.usuario.id);
        var vPara = parseFloat($scope.usuario2.id);
        var params = {

            'aUsuarioSessao': aUsuarioSessao,
            'nUserDe': vDe,//$scope.usuario.id, //de
            'nUserPara': vPara,//$scope.usuario2.id, //para
            'iLimpeza': limpar
        };

        Swal.fire({
            title: 'Aten&ccedil;&atilde;o',
            html: "Esta a&ccedil;&atilde;o &eacute; <b>irrevers&iacute;vel</b> e o usu&aacute;rio selecionado perder&aacute; todas as " +
            "configura&ccedil;&otilde;es (Marcas, Grupos e Menus) para ent&atilde;o receber apenas as que estiverem" +
            " no usu&aacute;rio designado como origem. <br>Confirmar mesmo assim?",
            icon: 'warning',
            confirmButtonText: 'Aplicar',
            confirmButtonColor: '#87b87f',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
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
            if (result.isConfirmed) {
                callWS.get('/WVDF_WS/ws_csag300.wso/faplicarEquivalencia/JSON', params).then(function(response) {
                    if (response.data.hasError == true) parent.parent.alertify.error(response.data.msgInfo);
                    else parent.parent.alertify.success(response.data.msgInfo);
                });
            } 
        });
    }


    //autocomplete usuarios
    $scope.acCliente = function(query) {
        var params = {
            'aUsuarioSessao': aUsuarioSessao,
            'aInicio': query,
        };
        return callWS.get('/WVDF_WS/ws_csag300.wso/f_UsuarioComplete/JSON', params).then(function(response) {
            return response.data;
        });
    }

    $scope.acCliente2 = function(query) {
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