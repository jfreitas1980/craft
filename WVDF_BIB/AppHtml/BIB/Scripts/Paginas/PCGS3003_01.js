$(document).ready(function () {
    iFrameResize({
        checkOrigin: false,
        log: false, // Enable console logging
        enablePublicMethods: true, // Enable methods within iframe hosted page
    });
});
//, 'ui.utils.masks' 'ckeditor', , 'datatables.colreorder'

app = angular.module('pcgs300301', ['ngTagsInput', 'ui.bootstrap',  'angularSoap', 'datatables', 'datatables.buttons', 'toaster', 'ngSanitize']);

app.factory("soapService", ['$soap', function ($soap) {
        return {
            CallSoap: function (url, action, params) {
                return $soap.post(url, action, params);
            }
        }
    }]);

app.factory('callWS', function ($http) {
    return {
        get: function (url, parametros) {
            return $http({url: url, method: "GET", params: parametros});
        }
    };
});

app.controller('pcgs300301Controller', function ($scope, $http, $q, soapService, toaster, callWS, $sanitize) {
    $scope.hcgs3003 = {};
    $scope.lsPaises = {};
    $scope.lsIncoterms = {};
    $scope.lsCaracteristicasFrete = {};
    $scope.lsFretes = {};
    $scope.lsMarcas = {};
    $scope.lsProdutos = {};
    $scope.lsTrades = {};
    $scope.lsContainer = {};
    $scope.lsTaxas = {}; 
    $scope.lsDescricao = {};
    $scope.lsClasseTaxa = {};
    $scope.L = {};
    $scope.btnDeleteCtrl = true;
    $scope.textoAjuda = 'Use a tecla CTRL para selecionar mais de um item.';

    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    //  var idRegistro = getVariavelURL('Id');

    var init = function () {
        getLiterais();
        getListaPaises();
        getListaIncoterms();
        getListaSalesCondition();
        getListaCaracteristicasFrete();
        getListaMarcas();
        getListaProdutos();
        // getListaTrades();
        getListaContainers();
        getListaTaxas();
        getListaDescricao();
        getListaClasseTaxa();
        //  setRegistro();
    };

    var ctrlBtnDelete = function () {
        //verificando se foi passado um id
        if ($scope.hcgs3003.id != undefined) {
            $scope.btnDeleteCtrl = false;
        } else {
            $scope.btnDeleteCtrl = true;
        }
    }

    var getLiterais = function () {
        $scope.loadingState = true;
        var params = {'aUsuarioSessao': aUsuarioSessao, 'sPrograma': 'PCGS3003_01'};
        callWS.get('/WVDF_WS/ws_csag309.wso/f_idiomas_literais/JSON', params)
                .then(function (response) {
                    $scope.L = response.data;
                    $scope.loadingState = false;
                }, function (error) {
                    $scope.loadingState = false;
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: ("Error ao carregar literais. <br/> status: " + error.status + "<br/> statusText: " + error.statusText),
                        bodyOutputType: 'trustedHtml'
                    });
                });
    };

    var getListaClasseTaxa = function () {
        $scope.loadingState = true;
        $http({
            url: '/WVDF_WS/ws_CCGS221.wso/f_class_tx/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsClasseTaxa = response.data;
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    };

    var getListaDescricao = function () {
        $scope.loadingState = true;
        $http({
            url: '/WVDF_WS/ws_ccgs225.wso/f_CCGS225_combo/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsDescricao = response.data;
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    };

    var getListaTaxas = function () {
        $scope.loadingState = true;
        $http({
            url: '/WVDF_WS/ws_hcgs3001.wso/f_lista_HCGS3001/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsTaxas = response.data;
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    };

    var getListaPaises = function () {
        $scope.loadingState = true;
        $http({
            url: '/WVDF_WS/ws_hcgs3029.wso/f_combo_pais/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsPaises = response.data;
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    };

    var getListaIncoterms = function () {
        $scope.loadingState = true;
        $http({
            url: '/WVDF_WS/ws_HCGS3000.wso/f_combo_incorterm/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsIncoterms = response.data;
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    };

    var getListaSalesCondition = function () {
        $scope.loadingState = true;
        $http({
            url: '/WVDF_WS/ws_ccgs248.wso/f_CCGS248_combo/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsSalesCondition = response.data;
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    };

    var getListaCaracteristicasFrete = function () {
        $scope.loadingState = true;
        $http({
            url: '/WVDF_WS/ws_CCGS203.wso/f_CCGS203_lista/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsCaracteristicasFrete = response.data;
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    };

    var getListaMarcas = function () {
        $scope.loadingState = true;
        $http({
            url: '/WVDF_WS/ws_HCGS3029.wso/f_combo_marcas/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsMarcas = response.data;
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    };

    var getListaProdutos = function () {
        $scope.loadingState = true;
        $http({
            url: '/WVDF_WS/ws_HCGS3029.wso/f_combo_prod/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsProdutos = response.data;
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    };

    var getListaTrades = function () {
        $scope.loadingState = true;
        $http({
            url: '/WVDF_WS/ws_csag379.wso/f_tradeline_list/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsTrades = response.data;
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    };

    var getListaContainers = function () {
        $scope.loadingState = true;
        $http({
            url: '/WVDF_WS/ws_HCGS3029.wso/f_combo_cntr/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao}
        }).then(function (response) {
            $scope.lsContainer = response.data;
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    };

    $scope.setRegistro = function (id) {
        $scope.loadingState = true;
        // debugger;
        $http({
            url: '/WVDF_WS/wsHCGS3003.wso/fExibeHCGS3003/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao, 'Id': id}
        }).then(function (response) {
            $scope.hcgs3003 = response.data;

            ctrlBtnDelete();
            $scope.loadingState = false;
        }, function (response) {
            $scope.loadingState = false;
        });
    }

    $scope.getListaRotas = function (value) {
        return $http({
            url: '/WVDF_WS/wsHCGS3003.wso/fAutocompleteRotas/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao, 'aInicio': value}
        }).then(function (response) {
            return response.data;
        }, function (response) {
        });
    };

    $scope.acCidades = function (texto) {
        return	    $http({
            url: 'fbcsag325_descricao.asp',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao, 'term': texto}
        }).then(function (response) {
            return response.data;
        }, function (response) {
        });
    };

    $scope.acCarrier = function (texto) {
        return	    $http({
            url: 'fbcsag342_descricao.asp',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao, 'term': texto}
        }).then(function (response) {
            return response.data;
        }, function (response) {

        });
    };

    $scope.acTerminal = function (texto) {
        return	    $http({
            url: 'fbcsag346_descricao.asp',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao, 'term': texto}
        }).then(function (response) {
            return response.data;
        }, function (response) {

        });
    };

    $scope.acAgente = function (texto) {
        return	    $http({
            url: 'fbcsag345_descricao.asp',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao, 'term': texto}
        }).then(function (response) {
            return response.data;
        }, function (response) {

        });
    };

    $scope.btnSave = function () {
        // debugger;
        $scope.loadingState = true;
        $scope.hcgs3003.aUsuarioSessao = aUsuarioSessao;
     //   $scope.hcgs3003.remarks = $sanitize($scope.hcgs3003.remarks);

        // $scope.hcgs3003.remarks = $scope.hcgs3003.remarks.replace('"', "'");

        var entidade = JSON.stringify($scope.hcgs3003);
        debugger;
        soapService.CallSoap('/WVDF_WS/wsHCGS3003.wso', 'fGravarHCGS3003', {'sJSON': entidade}).then(function (response) {
            $scope.loadingState = false;
            $scope.hcgs3003.id = response;
            ctrlBtnDelete();
            toaster.pop('success', "Sucesso", ("Registro: " + $scope.hcgs3003.id + " criado com sucesso."), null, 'trustedHtml');
        }, function (error) {
            $scope.loadingState = false;
            toaster.pop('error', "Error", ("Error ao gravar registro. <br/> Response: " + error.data), null, 'trustedHtml');
        });

    };

    $scope.btnExcluir = function () {
        $http({
            url: '/WVDF_WS/wsHCGS3003.wso/fDeleteHCGS3003/JSON',
            method: "GET",
            params: {'aUsuarioSessao': aUsuarioSessao, 'Id': $scope.hcgs3003.id}
        }).then(function (response) {
            $scope.hcgs3003 = {};
            ctrlBtnDelete();
            $scope.$broadcast('atualizaTabela');
            $scope.loadingState = false;
            toaster.warning({title: "Exclusao", body: "Excluido com Sucesso"});
        }, function (response) {
            toaster.error({title: "Exclusao", body: "Excluido com Sucesso"});
            $scope.loadingState = false;
        });
    };

    $scope.btnNovo = function () {
        $scope.hcgs3003 = {};
    };

    init();
});

app.controller('pcgs300301ControllerDataTable', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, $q) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    $scope.report = {};

    var vm = this;
    vm.posicionaRegistro = posicionaRegistro;
    vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
        return $q.when($scope.lsResultados);
    }).withDOM('frtip')
            .withPaginationType('full_numbers')
           // .withColReorder().withOption('scrollX', '100%')
            .withOption('rowCallback', rowCallback)
            .withLanguageSource('//cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json');
            
    vm.dtColumns = [
        // DTColumnBuilder.newColumn('csag308Ids').withTitle('Marcas'),
        DTColumnBuilder.newColumn('ccgs210Ids').withTitle('Produtos'),
        // DTColumnBuilder.newColumn('hcgs3001Ids').withTitle('Taxas'),
        DTColumnBuilder.newColumn('ccgs225Ids').withTitle('Descricao'),
        // DTColumnBuilder.newColumn('ccgs221Ids').withTitle('Classes'),
        DTColumnBuilder.newColumn('ccgs223Ids').withTitle('Incoterms'),
        DTColumnBuilder.newColumn('carrierIds').withTitle('Carriers'),
        DTColumnBuilder.newColumn('csag329IdsO').withTitle('Pais Origem'),
        DTColumnBuilder.newColumn('csag329IdsD').withTitle('Pais Destino'),
        DTColumnBuilder.newColumn('csag325PolIds').withTitle('POL'),
        DTColumnBuilder.newColumn('csag325PodIds').withTitle('POD'),
        DTColumnBuilder.newColumn('ccgs217Ids').withTitle('Equip.'),
        DTColumnBuilder.newColumn('ccgs203Ids').withTitle('Carct. Frete'),
        DTColumnBuilder.newColumn('ccgs248Ids').withTitle('Sales Cond.'),
        DTColumnBuilder.newColumn('status').withTitle('Status'),
        DTColumnBuilder.newColumn('remarks').withTitle('Remarks')
    ];

    function posicionaRegistro(registro) {
        // debugger;
        $scope.setRegistro(registro.id);
        $('#collapse2').collapse('hide');
        // $('#collapse2').collapse('show');
        // $('#collapse2').removeClass('in');
        $('#collapse1').collapse('show');
        // $('#collapse1').addClass('in');

    }

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
        // debugger;
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function () {
            $scope.$apply(function () {
                vm.posicionaRegistro(aData);
            });
        });
        return nRow;
    }

    $scope.btnSearch = function () {
        $scope.lsResultados = "";
        $scope.$parent.loadingState = true;
        $scope.report.aUsuarioSessao = aUsuarioSessao;

        var entidade = JSON.stringify($scope.report);
        console.log(entidade);
        $http({
            url: '/WVDF_WS/wsHCGS3003.wso/fListaHCGS3003/JSON',
            method: "GET",
            params: {'sJSON': entidade}
        }).then(function (response) {
            $scope.lsResultados = response.data;
            $scope.$parent.loadingState = false;
        }, function (response) {
            $scope.$parent.loadingState = false;
        });
    };

    $scope.btnLimpar = function () {
        $scope.report = {};
    };

    $scope.$on('atualizaTabela', function (e) {
        $('#collapse1').collapse('hide');
        $('#collapse2').collapse('show');
        $('#collapse2').addClass('in');
        $('#collapse1').removeClass('in');
        $scope.lsResultados = "";
        $scope.btnSearch();
    });


});


