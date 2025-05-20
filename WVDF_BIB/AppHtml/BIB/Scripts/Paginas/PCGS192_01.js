angular.module('PCGS192', ['ngAnimate', 'ui.bootstrap']);

angular.module("PCGS192").controller("MainController", MainController);
angular.module("PCGS192").controller("ModalController", ModalController);

ModalController.$inject = ['$http', 'literais', 'ref', '$uibModalInstance'];

function ModalController($http, literais, ref, $uibModalInstance) {
    let vm = this;
    vm.codigoModal = ref.sCodigo;
    vm.descricaoModal = ref.sDescricao;
    vm.statusModal = (ref.sStatus == "1") ? true : false;

    vm.tituloModal = ref.titulo;
    vm.literais = literais;

    vm.closeModal = closeModal;
    vm.saveReference = saveReference;

    function closeModal() {
        $uibModalInstance.dismiss();
    }

    function saveReference() {
        if (vm.descricaoModal == "") return parent.parent.alertify.error(vm.literais.LITERAL_18); 

        let status = (vm.statusModal) ? "1" : "2";

        $http({
            method: 'POST',
            url: '/wvdf_ws/ws_ccgs192.wso/fRegisterCCGS192/',
            data: {
                "aSave192": {
                    "sCodigo": vm.codigoModal,
                    "sDescricao": vm.descricaoModal,
                    "sStatus": status,
                    "sStatusDesc": ""
                },
                "aUsuarioSessao": Url.aUsuarioSessao
            }
        }).then(function(response) {
            $uibModalInstance.close(response);
        });
    }
}

MainController.$inject = ["$http", "$scope", "$uibModal"];

function MainController($http, $scope, $uibModal) {
    let vm = this;
    vm.optionsForPage = [5, 10, 20];
    vm.itemsForPage = 5;
    vm.currentPage = 1;   

    $http({
        method: 'GET',
        url: '/wvdf_ws/ws_csag309.wso/f_idiomas_literais_seq/JSON',
        params: {
            "aUsuarioSessao": Url.aUsuarioSessao,
            "sPrograma": "PCGS192_01",
            "iSeq": 0
        }
    }).then(function(response) {
        vm.literais = response.data;
    });
    
    $http({
        method: 'GET',
        url: '/wvdf_ws/ws_ccgs192.wso/fRelatorioCCGS192/JSON',
        params: {
            "aUsuarioSessao": Url.aUsuarioSessao
        }
    }).then(function(response) {
        vm.lstReference = response.data;
    });
    
    //vm.deleteReference = deleteReference;
    vm.newEditReference = newEditReference;

    /*function deleteReference(codigo) {
        Swal.fire({
            title: vm.literais.LITERAL_13,
            html: vm.literais.LITERAL_14,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: vm.literais.LITERAL_15,
            cancelButtonText: vm.literais.LITERAL_16,
            showClass: {
                backdrop: 'swal2-noanimation',
                popup: '',
                icon: ''
            },
            hideClass: {
                popup: ''
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $http({
                    method: 'POST',
                    url: '/wvdf_ws/ws_ccgs192.wso/fDeleteCCGS192/',
                    data: {
                        "sCodigo": codigo,
                        "aUsuarioSessao": Url.aUsuarioSessao
                    }
                }).then(function(response) {
                    vm.lstReference = response.data;
                });
            }
        });
    }*/

    function newEditReference(referencia) {
        if (referencia == "") {
            referencia = {
                "titulo": vm.literais.LITERAL_07,
                "sCodigo": "0",
                "sDescricao": "",
                "sStatus": "2"
            }
        } else referencia.titulo = vm.literais.LITERAL_08;

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            templateUrl: 'ModalReferencia.html',
            controller: 'ModalController',
            controllerAs: 'vm',
            appendTo: undefined,
            resolve: {
                ref: function() {
                    return referencia;
                },
                literais: function() {
                    return vm.literais;
                }
            }
        }).result.then(function(response) {
            vm.lstReference = response.data;
            parent.parent.alertify.success('Referencia salva!'); 
        }, function() {});
    }
}