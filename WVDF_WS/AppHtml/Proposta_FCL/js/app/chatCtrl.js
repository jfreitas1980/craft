"use strict";

app.controller('chatCtrl', ['$scope', 'WVDF', function($scope, WVDF) {
    $scope.chat = {
        messages: [],
        form: {},
        history: []
    }
    var init = function() {
        if (Url.idProposta)
            $scope.chat.getMessages();
    }

    $scope.chat.saveRefs = function() {
        console.log("save");
        var refs = {
            cRef: $scope.chat.form.customReference,
            iRef: $scope.chat.form.internalReference,
            cInst: $scope.chat.form.customerInstruction,
            iCmts: $scope.chat.form.privateComments,
            proposta: Url.idProposta,
            status: $scope.chat.form.stats
        };
        WVDF.ws_hcgs3004.fclReferences(refs, Url.aUsuarioSessao).then(function(data) {
            if(!data.hasError){
                 $scope.alertify.success(data.msgInfo);
            }
            else{
                $scope.alertify.error(data.msgError);
            }
        });
    }

    $scope.chat.getMessages = function() {
        if (Url.idProposta == '' || Url.idProposta == 0) return;
        WVDF.ws_hsag558.f_listacomments(Url.idProposta, Url.aUsuarioSessao).then(function(data) { 
            $scope.chat.messages = data;
            if(data.length > 0) $scope.comments_status = true;
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
             if(data.length > 0) $scope.comments_status = true;
        });
    }
    init();
}]);