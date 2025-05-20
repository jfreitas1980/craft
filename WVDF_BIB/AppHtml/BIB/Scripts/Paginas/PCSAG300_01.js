angular.module("myApp", ["ngSanitize", "toaster", "ui.bootstrap", 'ngTagsInput']);

angular.module("myApp")
    .controller("PCSAG300_01_Controller", PCSAG300_01_Controller);

PCSAG300_01_Controller.$inject = ["$http", "$scope", "toaster"];

function PCSAG300_01_Controller($http, $scope, toaster) {
    let vm = this;
    let aUsuarioSessao = Url.aUsuarioSessao;

    vm.tabela = [];
    vm.menuRemoved = [];

    vm.itemsPorPagina = 5;
    vm.paginaAtual = 1;
    vm.adicionarNovaLinha = adicionarNovaLinha;
    vm.adicionandoMenu = adicionandoMenu;
    vm.carregarAutoComplete = carregarAutoComplete;
    vm.carregarAutoCompleteMenu = carregarAutoCompleteMenu;
    vm.salvarLinha = salvarLinha;

    $http.get('/wvdf_ws/ws_HCGS3327.wso/fFeedKeyControl/JSON', {
            params: {
                "aUsuarioSessao": aUsuarioSessao
            }
        })
        .then(function(response) {
            vm.aGrupos = response.data.aGrupos;
            vm.aMarcas = response.data.aMarcas;
            vm.aDash = response.data.aDash;
            vm.aMenu = response.data.aMenu;
            vm.aClasse = response.data.aClasse;
            vm.aStatus = response.data.aStatus;
            console.log(vm.aClasse);

            $http.get('/wvdf_ws/ws_HCGS3327.wso/fControlKeyScreen/JSON', {
                    params: {
                        "aUsuarioSessao": aUsuarioSessao
                    }
                })
                .then(function(response) {
                    vm.tabela = response.data;
                });
        });

    function adicionarNovaLinha() {
        let novaLinha = {
            'id': 0,
            'editar': true,
            'nome': "",
            'grupos': [],
            'menus': [],
            'marcas': [],
            'classe': "1",
            'status': "1",
            'emailTemplate': "1",
            'dashs': []
        };

        vm.tabela.unshift(novaLinha);
    }

    function adicionandoMenu(tag, menus) {
        if (tag.sTipo == 'M') {
            for (let i = 0; i < menus.length; i++) {
                if (menus[i].sMenu == tag.sId) {
                    menus.splice(i, 1);
                    i--;
                }
            }
        }    
        return true;
    }

    function carregarAutoComplete(array, query, id) {
        let idAC = document.querySelector("#" + id);
        idAC.style.position = "absolute";
        idAC.style.left = -document.getElementById("table-position").scrollLeft + "px";

        let filtroArray = array.filter(function(item) {
            return item.value.toLowerCase().indexOf(query.toLowerCase()) >= 0;
        });
        return filtroArray;
    }

    function carregarAutoCompleteMenu(array, query, id, menus) {
        let idAC = document.querySelector("#" + id);
        idAC.style.position = "absolute";
        idAC.style.left = -document.getElementById("table-position").scrollLeft + "px";

        for (let i = 0; i < menus.length; i++) {
            if (menus[i].sTipo == 'M') {
                array = array.filter(function(item) {
                    return item.sMenu !== menus[i].sId;
                });
            }
        }

        let filtroArray = array.filter(function(item) {
            return item.value.toLowerCase().indexOf(query.toLowerCase()) >= 0;
        });
        return filtroArray;
    }

    function salvarLinha(linha) {
        let arrayMenus = linha.menus.filter(x => x.sTipo === 'M');
        let arrayAtalhos = linha.menus.filter(x => x.sTipo === 'A');
        console.log(linha);
        let data = {
            "aControlKey": {
                "id": linha.id,
                "nome": linha.nome, 
                "grupos": linha.grupos.map(a => a.id),
                "menus": arrayMenus.map(a => a.sId),
                "atalhos": arrayAtalhos.map(a => a.sId),
                "marcas": linha.marcas.map(a => a.id),
                "classe": linha.classe,
                "status": linha.status,
                "emailTemplate": "0",
                "dashs": linha.dashs.map(a => a.id),
            },
            "aUsuarioSessao": aUsuarioSessao
        }
        debugger;
        $http.post("/wvdf_ws/ws_HCGS3327.wso/fSaveControlKey/JSON", data).then(function(response) {
            if (response.data.hasError) parent.parent.alertify.error(response.data.msgError);
            else {
                parent.parent.alertify.success(response.data.msgInfo);
                linha.editar = false;
            }
        });
    }

    /*
    function removerAutoComplete(e) {
        let classAC = document.querySelector(".autocomplete");
        if (classAC && e.target != classAC) classAC.remove();
    }

    document.addEventListener("mousedown", removerAutoComplete);
    */
}