angular.module("myApp", ["ngSanitize", "toaster", "ui.bootstrap"]);

angular.module("myApp")
    .controller("NotificacaoController", NotificacaoController);

NotificacaoController.$inject = ["$http", "$scope", "toaster"];

function NotificacaoController($http, $scope, toaster) {
    let vm = this;

    let aUsuarioSessao = Url.aUsuarioSessao;

    vm.itemsPerPage = 5;
    vm.currentPage = 1;

    vm.saveNotificacoes = saveNotificacoes;

    $http.get('/wvdf_ws/ws_csag309.wso/f_idiomas_literais/JSON', {
            params: {
                aUsuarioSessao: aUsuarioSessao,
                sPrograma: 'PTMEN1000'
            }
        })
        .then(function(response) {
            console.log(response);
        });

    function saveNotificacoes() {
        parent.parent.alertify.success("Teste!");

    }
}