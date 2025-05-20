angular.module("myApp", ["ngSanitize", "toaster", "ui.bootstrap"]);

angular.module("myApp")
    .controller("ModalDeleteController", ModalDeleteController)
    .controller("ModalLanguagesController", ModalLanguagesController)
    .controller("MenuRegisterController", MenuRegisterController);


ModalDeleteController.$inject = ["$http", "items", "toaster", "$uibModalInstance"];

function ModalDeleteController($http, items, toaster, $uibModalInstance) {
    var vm = this;	

    vm.titulo = items.titulo;
    vm.row_id = items.row_id
    vm.cancelModal = cancelModal;
    vm.confirmModal = confirmModal;

    function cancelModal() {
        $uibModalInstance.dismiss();
    }

    function confirmModal() {
        var aUsuarioSessao = Url.aUsuarioSessao;

        var data = {
            "aUsuarioSessao": aUsuarioSessao,
            "aRowId": vm.row_id
        }

        $http.post("/wvdf_ws/ws_csag362.wso/fDelete", data).then(function(response) {
            if (response.data.hasError) {
            	toaster.pop('error', response.data.msgError);
            }
            $uibModalInstance.close();
        });
    }

}

ModalLanguagesController.$inject = ["$http", "items", "toaster", "$uibModalInstance"];

function ModalLanguagesController($http, items, toaster, $uibModalInstance) {
    var vm = this;
    vm.idiomas = items;

    vm.closeModal = closeModal;
    vm.saveModal = saveModal;

    function closeModal() {
        $uibModalInstance.close();
    }

    function saveModal() {
        var aUsuarioSessao = Url.aUsuarioSessao;

        var data = {
            "aUsuarioSessao": aUsuarioSessao,
            "aFdCSAG362Idiomas": vm.idiomas
        }

        $http.post("/wvdf_ws/ws_csag362.wso/fSaveCSAG362Idiomas", data).then(function(response) {                      
            if (response.data.message.hasError) {
                toaster.pop('error', response.data.message.msgError);
            }
            else {
                toaster.pop('success', response.data.message.msgInfo);
            }
            $uibModalInstance.close();
        });
    }

};

MenuRegisterController.$inject = ["$http", "$scope", "toaster", "$uibModal"];

function MenuRegisterController($http, $scope, toaster, $uibModal) {
    var vm = this;

    var aUsuarioSessao = Url.aUsuarioSessao;
    var aRowId = (Url.RowId == undefined) ? "" : Url.RowId;
    vm.RowId = aRowId;
    vm.hasError = false;

    vm.classeLst = [];
    vm.localizacaoLst = [];
    vm.statusLst = [];
    vm.workspaceLst = [];
    vm.sistemaLst = [];

    vm.deleteMenu = deleteMenu;
    vm.getClasse = getClasse;
    vm.getLocalizacao = getLocalizacao;
    vm.getMenu = getMenu;
    vm.getStatus = getStatus;
    vm.getWorkspace = getWorkspace;
    vm.modalLanguages = modalLanguages;
    vm.reloadPage = reloadPage;
    vm.saveMenu = saveMenu;
    vm.searchMenu = searchMenu;


    getMenu().then(function(response) {
        if (aRowId != "") {
            if (response.data.message.hasError) {
            	vm.hasError = true;
               	toaster.pop('error', response.data.message.msgError);
		       	return;    		
            } else vm.menu = response.data.menu;
        }
		            		
        vm.titulo = (aRowId != "") ? vm.menu.titulo : "";
        vm.programa = (aRowId != "") ? vm.menu.programa : "";
        vm.iconebootsp = (aRowId != "") ? vm.menu.iconebootsp : "";
        vm.id = (aRowId != "") ? vm.menu.id : 0;
        vm.row_id = (aRowId != "") ? vm.menu.row_id : "";

        getClasse().then(function(response) {
            vm.classeLst = response.data;
            vm.classe = (aRowId != "") ? vm.classeLst.find(x => x.id === vm.menu.classe) : vm.classeLst[0];


	        getWorkspace(aRowId, aUsuarioSessao, vm.classe.id).then(function(response) {
	            vm.workspaceLst = response.data;
	            vm.workspace = (aRowId != "") ? vm.workspaceLst.find(x => x.id === vm.menu.classemenu) : vm.workspaceLst[0];

	        });
        });

        getLocalizacao().then(function(response) {
            vm.localizacaoLst = response.data;
            vm.localizacao = (aRowId != "") ? vm.localizacaoLst.find(x => x.id === vm.menu.localizacao) : vm.localizacaoLst[0];
        });

        getSistema().then(function(response) {
            vm.sistemaLst = response.data;
            vm.sistema = (aRowId != "") ? vm.sistemaLst.find(x => x.id === vm.menu.sistema.toString()) : vm.sistemaLst[0];
        });

        getStatus().then(function(response) {
            vm.statusLst = response.data;
            vm.status = (aRowId != "") ? vm.statusLst.find(x => x.id === vm.menu.status) : vm.statusLst[0];
        });
    });

    function deleteMenu() {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: "modal-title",
            ariaDescribedBy: "modal-body",
            backdrop: "static",
            keyboard: false,
            size: "md",
            templateUrl: "ModalDelete.html",
            controller: "ModalDeleteController",
            controllerAs: "vm",
            appendTo: undefined,
            resolve: {
                items: function() {
                    return vm;
                }
            }
        });
        modalInstance.result.then(function() {
            reloadPage();
        }, function() {});
    }

    function getClasse() {
        return $http.post("/wvdf_ws/ws_csag362.wso/fClasseCSAG362", {});
    }

    function getLocalizacao() {
        return $http.post("/wvdf_ws/ws_csag362.wso/fLocalizacaoCSAG362", {});
    }

    function getMenu() {
        var data = {
            "aUsuarioSessao": aUsuarioSessao,
            "aRowId": aRowId
        }
        return $http.post("/wvdf_ws/ws_csag362.wso/fLoadRecord", data);
    }

    function getStatus() {
        return $http.post("/wvdf_ws/ws_csag362.wso/fStatusCSAG362", {});
    }

    function getSistema() {
        return $http.post("/wvdf_ws/ws_csag362.wso/fSistemaCSAG362", {});
    }

    function getWorkspace(aRowId, aUsuarioSessao, aClasse) {
        var data = {
            "aRowId": aRowId,
            "aUsuarioSessao": aUsuarioSessao,
            "aClasse": aClasse
        }
        return $http.post("/wvdf_ws/ws_csag362.wso/fWorkspaceEnderecoCSAG305", data);
    }

    function modalLanguages(codigo, titulo, id) {
        var data = {
            "aUsuarioSessao": aUsuarioSessao,
            "aSistema": codigo,
            "aTitulo": titulo,
            "aId": id
        }

        $http.post("/wvdf_ws/ws_csag362.wso/fListaCSAG362Idiomas", data).then(function(response) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: "static",
                keyboard: false,
                size: "lg",
                templateUrl: "ModalLanguages.html",
                controller: "ModalLanguagesController",
                controllerAs: "vm",
                appendTo: undefined,
                resolve: {
                    items: function() {
                        return response.data.idiomas;
                    }
                }
            })

        });
    }

    function reloadPage() {
        window.location = "PAG362_01.html?aUsuarioSessao=" + aUsuarioSessao;
    }

    function saveMenu() {
        var data = {
            "aUsuarioSessao": aUsuarioSessao,
            "myCSAG362": {
                "sistema": vm.sistema.id,
     			"classemenu": vm.workspace.id,
     			"id": vm.id,              
     		    "titulo": vm.titulo,        
                "programa": vm.programa,
			    "localizacao": vm.localizacao.id,    
			    "status": vm.status.id,
			    "classe": vm.classe.id,        
			    "iconebootsp": vm.iconebootsp,
			    "row_id": vm.row_id
            }
        }
        $http.post("/wvdf_ws/ws_csag362.wso/fSave", data).then(function(response) {
            if (response.data.message.hasError) {
            	toaster.pop('error', response.data.message.msgError);
            }
            else {
            	vm.id = response.data.menu.id;
            	vm.row_id = response.data.menu.row_id;
            	toaster.pop('success', response.data.message.msgInfo);
            }
        });

    }

    function searchMenu() {
        window.location = "../PAG362_02.asp?aUsuarioSessao=" + aUsuarioSessao;
    }
};