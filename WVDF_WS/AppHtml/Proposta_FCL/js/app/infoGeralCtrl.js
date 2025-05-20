app.controller('infoGeralCtrl', ['$scope', 'WVDF', 'toaster', function($scope, WVDF, toaster) {
    var info = {};
    $scope.info = {};
    $scope.info.equipamentos = {};
    $scope.info.equipamentos.table = [];
    $scope.info.form = {}

    info.init = function(form) {
        form.modFrete = "FCL";
        form.aUsuarioSessao = Url.aUsuarioSessao;
        form.idCliente = Url.idCliente;

        if (Url.idProposta) {
            $scope.activeTab = 1;

            $scope.info.load(Url.idProposta);
        } else if (Url.idClone) {
            $scope.activeTab = 0;
            $scope.info.load(Url.idClone);
        } else {
            WVDF.ws_hcgs2101_01.f_DescricaoCSAG340(Url.idCliente, Url.aUsuarioSessao).then((data) => { $scope.info.form.cliente = data.cDescricao; });
            $scope.info.equipamentos.editable = true;

            if (!$scope.info.form.marca) {
                WVDF.ws_csag308.f_fup_csag308_combo(Url.aUsuarioSessao, "", Url.idCliente).then(function(data) { $scope.info.form.marca = data[0].ID; });
            }
        }
    }

    $scope.info.load = function(idProposta) {
        WVDF.ws_hcgs3004.f_proposta_preenchimento(idProposta, Url.aUsuarioSessao).then(function(data) {
            console.log(data);

            if (Url.idClone && !Url.idProposta) {
                delete data.idProposta;
                delete data.criadoPor;
                delete data.criadoEm;
                delete data.alteradoEm;
                delete data.alteradoPor;
                delete data.status;
                delete data.statusProp;
                WVDF.ws_csag308.f_fup_csag308_combo(Url.aUsuarioSessao, "", Url.idCliente).then(function(data2) {
                    data.marca = data2[0].ID;
                    $scope.info.form = data;
                    $scope.info.form.idCliente = Url.idCliente;
                    $scope.info.equipamentos.load(idProposta);
                    WVDF.ws_hcgs2101_01.f_DescricaoCSAG340(Url.idCliente, Url.aUsuarioSessao).then((data) => { $scope.info.form.cliente = data.cDescricao; });
                    $scope.taxa.init();
                });
            } else {
                $scope.info.form = data;
                $scope.info.form.idCliente = Url.idCliente;
                $scope.info.equipamentos.load(idProposta);
                WVDF.ws_hcgs2101_01.f_DescricaoCSAG340(Url.idCliente, Url.aUsuarioSessao).then((data) => { $scope.info.form.cliente = data.cDescricao; });
                $scope.taxa.init();
            }
        });
    }

    $scope.info.equipamentos.load = function(idProposta) {
        WVDF.ws_HCGS3005.f_HCGS3005_list(idProposta, Url.aUsuarioSessao).then(function(data) {
            console.log(data);
            if (Url.idClone && !Url.idProposta) {
                for (var i = data.length - 1; i >= 0; i--) {
                    delete data[i].aRecnum;
                    delete data[i].idProposta;
                    for (var j = data[i].detalhes.mercadorias.length - 1; j >= 0; j--) {
                        delete data[i].detalhes.mercadorias[j].srecnum;
                        delete data[i].detalhes.mercadorias[j].srecnum_05;
                    }
                }

                $scope.info.equipamentos.editable = true;
            }

            $scope.info.equipamentos.table = data;
        });
    }


    $scope.info.save = function(form) {
        if (!cargoValidation()) return;

        //Marca
        if (isEmpty(form.marca)) {
            $scope.alertify.error('Proposta sem MARCA!');
            return;
        }
        //TIPO OPERACAO
        // form.operacao = 'FCL';
        if (isEmpty(form.operacao)) {
            $scope.alertify.error('Proposta sem OPERACAO!');
            return;
        }
        //MODALIDADE
        form.modalidades = 'FCL';
        // if (isEmpty(form.modalidades)) {
        //     $scope.alertify.error('Proposta sem MODALIDADE DO FRETE!');
        //     return;
        // }
        //INCOTERM
        if (isEmpty(form.incoterm)) {
            $scope.alertify.error('Proposta sem INCOTERM!');
            return;
        }
        //EMBARQUE
        if (isEmpty(form.embarque)) {
            $scope.alertify.error('Proposta sem EMBARQUE!');
            return;
        } else {
            //DOOR-DOOR
            if (form.embarque === '4') {
                if (isEmpty(form.paisOrigem) || isEmpty(form.cidadeOrigem) || isEmpty(form.paisDestino) ||
                    isEmpty(form.cidadeDestino) || isEmpty(form.cepOrigem) || isEmpty(form.cepDestino)) {
                    $scope.alertify.error('Proposta sem os requisitos minimos!');
                    return;
                }
            }
            //DOOR-PORT
            if (form.embarque === '3') {
                if (isEmpty(form.paisOrigem) || isEmpty(form.cidadeOrigem) || isEmpty(form.paisPod) ||
                    isEmpty(form.pod) || isEmpty(form.cepOrigem)) {
                    $scope.alertify.error('Proposta sem os requisitos minimos!');
                    return;
                }
            }
            //PORT-PORT
            if (form.embarque === '1') {
                if (isEmpty(form.paisPol) || isEmpty(form.pol) || isEmpty(form.paisPod) || isEmpty(form.pod)) {
                    $scope.alertify.error('Proposta sem os requisitos minimos!');
                    return;
                }
            }
            //PORT-DOOR
            if (form.embarque === '2') {
                if (isEmpty(form.paisPol) || isEmpty(form.pol) || isEmpty(form.paisDestino) ||
                    isEmpty(form.cidadeDestino) || isEmpty(form.cepDestino)) {
                    $scope.alertify.error('Proposta sem os requisitos minimos!');
                    return;
                }
            }
        }

        WVDF.ws_hcgs3004.fGravarHCGS3004(form, Url.aUsuarioSessao).then(function(data) {

            Url.idProposta = data.idProposta;
            $scope.Url.idProposta = data.idProposta;
            var promisses = [];

            WVDF.ws_hcgs3004.f_proposta_preenchimento(Url.idProposta, Url.aUsuarioSessao).then(function(data) {
                $scope.info.form = data;
                $scope.info.form.idCliente = Url.idCliente;
                $scope.info.equipamentos.load(Url.idProposta);
                WVDF.ws_hcgs2101_01.f_DescricaoCSAG340(Url.idCliente, Url.aUsuarioSessao).then((data) => { $scope.info.form.cliente = data.cDescricao; })
            });

            for (var i = $scope.info.equipamentos.table.length - 1; i >= 0; i--) {
                promisses.push(WVDF.ws_HCGS3005.f_HCGS3005_save($scope.info.equipamentos.table[i], "FCL", Url.idProposta, Url.aUsuarioSessao));
            }

            Promise.all(promisses).then(function() {
                $scope.info.equipamentos.editable = false;
                $scope.modal.via.open();
                $scope.taxa.init();
            });
        });
    }

    $scope.info.equipamentos.newEquipamento = function() {
        var novo = {
            qtd: 1,
            equipamento: '',
            grossWeight: '',
            editable: true
        };
        $scope.info.equipamentos.table.unshift(novo);
    }

    $scope.info.equipamentos.clone = function(row) {
        var clone = cloneObj(row);
        clone.aRecnum = "";
        clone.editable = true;
        $scope.info.equipamentos.table.unshift(clone);
    }

    $scope.info.equipamentos.deleteEquipamento = function(index) {
        var dt = $scope.info.equipamentos.table[index];
        if (!dt.aRecnum) {
            $scope.info.equipamentos.table.splice(index, 1);
            return;
        }

        WVDF.ws_HCGS3005.f_HCGS3005_del(dt.aRecnum, Url.aUsuarioSessao).then(function(data) {
            if (!data.defaultMessage.hasError) {
                $scope.info.equipamentos.table.splice(index, 1);
                $scope.alertify.success(data.defaultMessage.msgInfo);
            } else {
                $scope.alertify.error(data.defaultMessage.msgError);
            }
        })
    }

    var cargoValidation = function() {
        if ($scope.info.form.modFrete == 'FCL') {
            if ($scope.info.equipamentos.table.length == 0) {
                $scope.alertify.error('Nenhuma Carga Cadastrada!');
                return false;
            }
            /*  if ($scope.info.equipamentos.table.length == 1) {
                  if ($scope.info.equipamentos.table[0].grossWeight == '') {
                      $scope.alertify.error('Nenhuma Carga Cadastrada!');
                      return false;
                  }
              }*/
        }
        return true;
    }

    $scope.saveEquipamentos = function(row) {
        WVDF.ws_HCGS3005.f_HCGS3005_save(row, "FCL", Url.idProposta, Url.aUsuarioSessao).then((data) => {
            if (!data.defaultMessage.hasError) {
                $scope.alertify.success(data.defaultMessage.msgInfo);
                row.aRecnum = data.recId;
                row.editable = false;
            } else $scope.alertify.error(data.defaultMessage.hasError);
        });
    }

    $scope.detalheCargaSave = function() {
        $scope.ValidaCarga = false;
        $scope.edit2 = false;
        if ($scope.proposta.modalidades == 'LCL') {
            for (var i = $scope.tbContainers.containerLCL.length - 1; i >= 0; i--) {
                $scope.tbContainers.containerLCL[i].editable = false;
                $scope.btnTableSaveRow($scope.tbContainers.containerLCL[i], 'LCL')
            }
        }
        if ($scope.proposta.modalidades == 'FCL') {
            for (var i = $scope.tbContainers.containerFCL.length - 1; i >= 0; i--) {
                $scope.tbContainers.containerFCL[i].editable = false;
                $scope.btnTableSaveRow($scope.tbContainers.containerFCL[i], 'FCL')
            }
        }
        setTimeout(function() {
            refreshTabelas();
            $scope.modal.via.open();
        }, 2500);
    }

    $scope.btnTableSaveRow = function(row, modalidade) {

        if (modalidade == "FCL" && row.equipamento == '') {
            parent.parent.alertify.error('Quantidade Invalida!');
            return;
        }

        row.modalidade = modalidade;
        $scope.btnAddItem2(row);
        row.editable = false;
    }

    $scope.btnAddItem2 = function(entrada) {
        // $scope.loadingState = true;
        var aTotalWeight;
        var nValue1;

        if (entrada.total.weight == 0 || entrada.total.weight == '') {
            $scope.loadingState = false;
            parent.parent.alertify.error('Peso Invalido!');
            return;
        }

        if (entrada.pcs == 0 || entrada.pcs == '') {
            $scope.loadingState = false;
            parent.parent.alertify.error('PCS/ Quantidade Invalido!');
            return;
        }

        if (entrada.total.grossUnit !== 'KG' && entrada.total.grossUnit !== 'LB') {
            $scope.loadingState = false;
            parent.parent.alertify.error('Unidade de Medida Invalida!');
            return;
        }

        if ($scope.proposta.modalidades == 'LCL') {
            if (entrada.total.volume == 0 || entrada.total.volume == '') {
                $scope.loadingState = false;
                parent.parent.alertify.error('Volume Invalido!');
                return;
            }
            if (entrada.total.volumeUnit !== 'CBM' && entrada.total.volumeUnit !== 'CFT') {
                $scope.loadingState = false;
                parent.parent.alertify.error('Unidade de Medida Invalida!');
                return;
            }

            if (entrada.UOM == 'CM') {
                if (entrada.height > 200) { entrada.aOversize = 1 }
                if (entrada.length > 300) { entrada.aOversize = 1 }
                if (entrada.width > 200) { entrada.aOversize = 1 }
            }
            if (entrada.aUOM == 'Inches') {
                if (entrada.height > 79) { entrada.aOversize = 1 }
                if (entrada.length > 120) { entrada.aOversize = 1 }
                if (entrada.width > 79) { entrada.aOversize = 1 }
            }
            // debugger;
            if (entrada.total.grossUnit == 'KG') {
                nValue1 = entrada.total.weight / entrada.pcs;
                if (nValue1 > 2000) { entrada.aOversize = 1 }
            }
            if (entrada.total.grossUnit == 'LB') {
                nValue1 = entrada.total.weight / entrada.pcs
                if (nValue1 > 4409.24) { entrada.aOversize = 1 }
            }

            if (entrada.total.grossUnit == 'LB') {
                aTotalWeight = entrada.total.weight / 2.20462;
            } else aTotalWeight = entrada.total.weight;

            if (entrada.total.volumeUnit == 'CBM' && aTotalWeight > 999) {
                nValue1 = aTotalWeight / entrada.total.volume;
                if (nValue1 > 1000) { entrada.aOversize = 1 }
            }

            if (entrada.total.volumeUnit == 'CBM' && aTotalWeight > 3999) {
                nValue1 = aTotalWeight / entrada.total.volume;
                if (nValue1 > 500) { entrada.aOversize = 1 }
            }

            if (entrada.total.volumeUnit == 'CBM' && entrada.total.volume > 14) { entrada.aOversize = 1 }
        }

        if ($scope.proposta.modalidades == 'FCL') {
            nValue1 = aTotalWeight / entrada.pcs;
            if (nValue1 > 28000) { entrada.aOversize = 1 }
        }

        if (entrada.aOversize == 1) parent.parent.alertify.log('Carga Over Identificada.');
        else entrada.aOversize = 0;

        var parametros = {};
        parametros = entrada;
        parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
        parametros.aPROP = $scope.proposta.idProposta;
        parametros.aRecnum = entrada.aRecnum;
        parametros.aMod_Frt = entrada.modalidade;
        parametros.aPcs = entrada.pcs;
        parametros.package = entrada.package;
        parametros.aWght = entrada.weight;
        parametros.aWght_tp = entrada.unitweight;
        parametros.aLght = entrada.length;
        parametros.aWdth = entrada.width;
        parametros.aHght = entrada.height;
        parametros.aUOM = entrada.UOM;
        parametros.aEQUIP = entrada.equipamento;
        parametros.grossUnit = entrada.total.grossUnit;
        parametros.volumeUnit = entrada.total.volumeUnit;
        parametros.aTotalWeight = entrada.total.weight;
        parametros.aTotalVolume = entrada.total.volume;
        parametros.aTotalVolumeU = entrada.unitvolume;

        var param = { 'sJSON': parametros };

        $http({
            url: '/WVDF_WS/ws_HCGS3005.wso/f_HCGS3005_save/JSON',
            method: 'GET',
            params: param
        }).success(function(data) {
            if (data.defaultMessage.msgInfo !== '') {
                parent.parent.alertify.log(data.defaultMessage.msgInfo);
                if (data.defaultMessage.msgSession == 1) {
                    $scope.ValidaCarga = true;
                    // $('').trigger('click');
                    $("#btnAlert3").trigger('click');
                }
                return;
            } else {
                parent.parent.alertify.success('Detalhe Salvo!');
                return;
            }
        });
    };

    info.init($scope.info.form);
}]);