app.controller('taxasCtrl', ['$scope', 'WVDF', 'toaster', function($scope, WVDF, toaster) {
    var taxa = {};
    $scope.taxa = {};
    $scope.taxa.form = {};
    $scope.taxa.aplicarNetNet = function() {
        var table = $scope.taxa.table.origem.filter(arr => arr.aplicar == true);
        table = table.concat($scope.taxa.table.frete.filter(arr => arr.aplicar == true));
        table = table.concat($scope.taxa.table.destino.filter(arr => arr.aplicar == true));
        table = table.map(arr => arr.recId);
        WVDF.ws_hcgs3006.f_apply_netnet(table, Url.idProposta, Url.aUsuarioSessao).then(function(data) {
            if (!data.defaultMessage.hasError) {
                $scope.taxa.table.origem = data.arr_ptx.filter(arr => arr.classe == 'O');
                $scope.taxa.table.frete = data.arr_ptx.filter(arr => arr.classe == 'F');
                $scope.taxa.table.destino = data.arr_ptx.filter(arr => arr.classe == 'D');

                $scope.notify.success(data.defaultMessage.msgInfo);
            } else {
                $scope.notify.error(data.defaultMessage.msgError);
            }
        })
    }
    $scope.taxa.table = {
        origem: [],
        frete: [],
        destino: [],
        newTaxa: function(table) {
            var novo = {
                aplicar: false,
                editable: true,
                venda: {
                    descricao: '',
                    equipamento: '',
                    moeda: '',
                    valor: '',
                    tpCalculo: '',
                    modPagamento: '',
                },
                compra: {
                    modPagamento: '',
                    moeda: '',
                    valor: '',
                    tpCalculo: '',
                    modPagamento: '',
                }
            };

            table.unshift(novo);
        },
        checkAll: function(value) {
            if ($scope.taxa.table.origem)
                for (var i = $scope.taxa.table.origem.length - 1; i >= 0; i--)
                    $scope.taxa.table.origem[i].aplicar = value;
            if ($scope.taxa.table.frete)
                for (var i = $scope.taxa.table.frete.length - 1; i >= 0; i--)
                    $scope.taxa.table.frete[i].aplicar = value;
            if ($scope.taxa.table.destino)
                for (var i = $scope.taxa.table.destino.length - 1; i >= 0; i--)
                    $scope.taxa.table.destino[i].aplicar = value;
        },
        save: function(row, classe) {
            row.permissao = $scope.common.permissao;
            WVDF.ws_hcgs3006.fcl_change_line(row, classe, Url.idProposta, Url.aUsuarioSessao).then(function(data) {
                if (!data.defaultMessage.hasError) {
                    row.recId = data.recId;
                    row.editable = false;
                    $scope.alertify.success(data.defaultMessage.msgInfo);
                } else $scope.alertify.error(data.defaultMessage.hasError);
            });
        },
        load: function(idProposta) {
            if (Url.idClone && !Url.idProposta) return;
            WVDF.ws_hcgs3006.f_hcgs3006_rpt(idProposta, Url.aUsuarioSessao).then(function(data) {
                if (data.length) {
                    if (data[0].arr_ptx) {
                        $scope.taxa.table.origem = data[0].arr_ptx.filter(arr => arr.classe == 'O');
                        $scope.taxa.table.frete = data[0].arr_ptx.filter(arr => arr.classe == 'F');
                        $scope.taxa.table.destino = data[0].arr_ptx.filter(arr => arr.classe == 'D');
                    }
                    if ($scope.taxa.table.origem.length > 0) $scope.origem_status = true;
                    if ($scope.taxa.table.frete.length > 0) $scope.frete_status = true;
                    if ($scope.taxa.table.destino.length > 0) $scope.destino_status = true;
                }
            });
        }
    };

    $scope.taxa.comissao = {
        table: [],
        combo: {
            taxas: [],
            load: function(idProposta, classe) {
                WVDF.ws_HCGS3001.taxas_tarifarioxproposta(classe, idProposta).then(function(data) {
                    $scope.taxa.comissao.combo.taxas = data;
                });
            }
        },
        new: function() {
            var item = {
                tipo: "",
                taxa: "",
                descricao: "",
                moeda: "",
                valor: "",
                tpCalculo: "",
                equipamento: "",
                modPagamento: "",
                note: "",
                editable: true
            };
            $scope.taxa.comissao.table.unshift(item);
        },
        save: function(row) {
            WVDF.ws_hcgs3007.f_save_comissao_new(row, Url.idProposta, Url.aUsuarioSessao).then(function(data) {
                if (!data.defaultMessage.hasError) {
                    row.editable = false;
                    row.redId = data.recId;
                    $scope.alertify.success(data.defaultMessage.msgInfo);
                } else $scope.alertify.error(data.defaultMessage.hasError);
            });
        },
        load: function(idProposta) {
            
            if (Url.idClone && !Url.idProposta) return;
            WVDF.ws_hcgs3007.f_lista_comissao_new(idProposta, Url.aUsuarioSessao).then(function(data) {
                console.log(data);
                $scope.taxa.comissao.table = data;
                if ($scope.taxa.comissao.table.length > 0) $scope.comissao_status = true;
            });
        }
    }
    $scope.taxa.init = function() {
        if (Url.idProposta) {
            $scope.taxa.table.load(Url.idProposta);
            $scope.taxa.comissao.load(Url.idProposta);
            console.log("taxa init");
        } else if (Url.idClone) {
            $scope.taxa.table.load(Url.idClone);
            $scope.taxa.comissao.load(Url.idClone);
            console.log("taxa init");
        }
        $scope.loadingState = false;
    }


}]);