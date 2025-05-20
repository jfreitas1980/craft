"use strict";

app.controller('chatCtrl', ['$scope', 'WVDF', function($scope, WVDF) {
    $scope.chat = {
        messages: [],
        form: {},
        history: []
    }
    var init = function() {
        if (Url.idProposta !== 0)
            $scope.chat.getMessages();
    }

    $scope.chat.getMessages = function() {
        if (Url.idProposta == '' || Url.idProposta == 0) return;
        WVDF.ws_hsag558.f_listacomments(Url.idProposta, Url.aUsuarioSessao).then(function(data) {
            $scope.chat.messages = data;
        });
    }

    $scope.chat.sendMsg = function(msg, stat) {
        if (Url.idProposta == '' || Url.idProposta == 0) {
            parent.parent.alertify.error('Proposta Invalida!');
            return;
        }

        WVDF.ws_hsag558.f_savecomments(Url.idProposta, msg, stat, Url.aUsuarioSessao).then(function(data) {
            $scope.chat.getMessages();
        });

    }

    $scope.chat.openHistorico = function() {
        WVDF.ws_hsag558.f_full_msgs(Url.idProposta, Url.aUsuarioSessao).then(function(data) {
            $scope.chat.history = data;
        });
    }
    init();
}]);