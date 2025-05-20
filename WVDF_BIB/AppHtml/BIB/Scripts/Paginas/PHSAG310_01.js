angular.module('phsag310App', ['ui.bootstrap', 'wsDominiosDirectivas', 'toaster', 'angularSoap'])
    .controller('phsag310Ctrl', phsag310Ctrl);

function phsag310Ctrl($scope, callWS, toaster, soapService) {
    $scope.L = {};
    $scope.source = [];
    $scope.destination = [];
    $scope.lsDestination = [];
    $scope.lsSource = [];
    $scope.lsSourceTemp = [];
    $scope.userTable = {};

    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    var aTabela = getVariavelURL('aTabela');
    $scope.aUsuarioSessao = aUsuarioSessao;
    var init = function() {
        getSource();
    };

    var getDestination = function() {
        $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'sTabela': aTabela };   
    
        callWS.get('/WVDF_WS/ws_hsag310.wso/fListarHSAG310/JSON', params)
            .then(function(response) {
                $scope.lsDestination = response.data;    
                $scope.loadingState = false;
                processInformation();
            }, function(error) {
                $scope.loadingState = false;
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar campos do usuario. <br> status: " + error.status + "<br> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    };

    var getSource = function() {
        $scope.loadingState = true;
        var params = { 'aUsuarioSessao': aUsuarioSessao, 'sTabela': aTabela };
        callWS.get('/WVDF_WS/ws_csag310.wso/f_idioma_campos/JSON', params)
            .then(function(response) {
                $scope.lsSource = response.data;
                $scope.lsDestination = response.data;
                $scope.loadingState = false;
                getDestination();
            }, function(error) {
                $scope.loadingState = false;
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: ("Error ao carregar campos do relatorio. <br> status: " + error.status + "<br> statusText: " + error.statusText),
                    bodyOutputType: 'trustedHtml'
                });
            });
    };

    var processInformation = function() {
        $scope.lsSourceTemp = angular.copy($scope.lsSource);

        for (var i = 0; i < $scope.lsDestination.length; i++) {
            for (var j = 0; j < $scope.lsSource.length; j++) {
                if ($scope.lsDestination[i].data === $scope.lsSource[j].data) {
                    var index = arrayObjectIndexOf($scope.lsSourceTemp, $scope.lsSource[j]);
                    $scope.lsSourceTemp.splice(index, 1);
                }
            }
        }
    };

    function arrayObjectIndexOf(arr, obj) {
        for (var i = 0; i < arr.length; i++) {
            if (angular.equals(arr[i], obj)) {
                return i;
            }
        };
        return -1;
    }

    $scope.adicionarTodos = function() {
        $scope.lsDestination = $scope.lsDestination.concat($scope.lsSourceTemp);
        $scope.lsSourceTemp = [];
    };

    $scope.adicionarItem = function() {
        for (var i = 0; i < $scope.sourceCol.length; i++) {
            $scope.lsDestination.push($scope.sourceCol[i]);
            var index = arrayObjectIndexOf($scope.lsSourceTemp, $scope.sourceCol[i]);
            $scope.lsSourceTemp.splice(index, 1);
        }
    };

    $scope.removerItem = function() {
        for (var i = 0; i < $scope.destinationCol.length; i++) {
            $scope.lsSourceTemp.push($scope.destinationCol[i]);
            var index = arrayObjectIndexOf($scope.lsDestination, $scope.destinationCol[i]);
            $scope.lsDestination.splice(index, 1);
        }
    };

    $scope.removerTodos = function() {
        $scope.lsSourceTemp = $scope.lsSourceTemp.concat($scope.lsDestination);
        $scope.lsDestination = [];
    };

    $scope.moveUp = function() {
        for (var i = 0; i < $scope.destinationCol.length; i++) {
            var itemIndex = arrayObjectIndexOf($scope.lsDestination, $scope.destinationCol[i]);
            $scope.moveItem(itemIndex, itemIndex - 1);
        }
    };

    $scope.moveDown = function() {
        for (var i = 0; i < $scope.destinationCol.length; i++) {
            var itemIndex = arrayObjectIndexOf($scope.lsDestination, $scope.destinationCol[i]);
            $scope.moveItem(itemIndex, itemIndex + 1);
        }
    };


    $scope.moveItem = function(origin, destination) {
        var temp = $scope.lsDestination[destination];
        $scope.lsDestination[destination] = $scope.lsDestination[origin];
        $scope.lsDestination[origin] = temp;
    };

    $scope.salvarColunas = function() {
        $scope.loadingState = true;
        $scope.userTable.aUsuarioSessao = aUsuarioSessao;
        $scope.userTable.tabela = aTabela;
        $scope.userTable.colunas = $scope.lsDestination;
        var entidade = JSON.stringify($scope.userTable);
        //   console.log(entidade);
        soapService.CallSoap('/WVDF_WS/ws_hsag310.wso', 'fGravarHSAG310', { 'sJSON': entidade })
            .then(function(response) {
                $scope.loadingState = false;
                //$scope.edi.id = response;
                //  ctrlBtnDelete();
                //  toaster.pop('success', "Sucesso", ("Registro: " + $scope.edi.processo + " criado com sucesso."), null, 'trustedHtml');
            }, function(error) {
                $scope.loadingState = false;
                toaster.pop('error', "Error", ("Error ao gravar registro. <br/> Response: " + error.data), null, 'trustedHtml');
            });

        $scope.loadingState = false;

    };


    init();
}
