var app = angular.module('pcgsApp', ['ui.bootstrap', 'diretivas', 'ngTagsInput', 'wsDominio']);

app.controller('pcgsCtrl', ['$scope', '$timeout', 'callWS', function($scope, $timeout, callWS) {
    $scope.lsUsers = [];
    $scope.tagEmail = [];
    $scope.mails = '';

    var init = function() {
        getEmails();
        posicionaEmails();

    }
    
    var getEmails = function() {
        var params = {
            'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
            'GRUPO': $('#listaGrupos').val(),
            'aFup': getVariavelURL('aFup'),
            'aOption': getVariavelURL('aOption')
        };

        callWS.get('/WVDF_WS/ws_hcgs2101.wso/f_PesquisaEmail/JSON', params)
            .then(function(response) {
                $scope.lsUsers = response.data;
            });
    }

    $scope.btnClick = function (){

        getEmails();

    }

    var posicionaEmails = function() {
        $scope.tagEmail = [];
        $scope.mails = '';

        var params = {
            'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
            'GRUPO': $('#listaGrupos').val(),
            'aFup': getVariavelURL('aFup'),
            'aOption': getVariavelURL('aOption')
        };

        callWS.get('/WVDF_WS/ws_hcgs2101_06.wso/fEmailRetorno/JSON', params)
            .then(function(response) {
                var dt = response.data.trim().slice(0, -1).split(';');
                console.log(dt);
                //  console.log(dt);
                for (var i = dt.length - 1; i >= 0; i--) {
                    if (dt[i] != "") {;
                        var nobj = {};
                        nobj.ID = dt[i];
                        nobj.DS = dt[i];

                        var json = JSON.stringify(nobj);

                        var userClone = JSON.parse(json);
                        $scope.addTag(userClone);
                    }
                }
                
            });
    }

    var saveEmail = function() {

        var params = {
            'Text': $scope.mails,
            'aFup': getVariavelURL('aFup'),
            'aOption': getVariavelURL('aOption')
        };

        callWS.get('/WVDF_WS/ws_hcgs2101.wso/fEmailEditar/JSON', params)
            .then(function(response) {});
    }

    $scope.addTag = function(tag) {
        console.log(tag);
        try {
            $scope.mails += tag.ID + ";";

            $timeout(function() {
                if (!contains($scope.tagEmail, tag)) {
                    $scope.tagEmail.push(tag);
                }
            }, 100);
            console.log($scope.mails);  
            saveEmail();
        } catch (error) {}
    }

    function contains(a, obj) {
        var i = a.length;
        while (i--) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }

    $scope.autoComplete = function(text) {
        var obj = {}
        obj.ID = text;
        obj.DS = text;
        var liste = [];
        liste.push(obj);
        return liste;
    }
    $scope.changeUser = function(user) {
        if (angular.isUndefined(user)) return;

        var index = $scope.lsUsers.indexOf(user);
        var json = JSON.stringify(user);

        var userClone = JSON.parse(json);



        $scope.lsUsers.splice(index, 1);
        // $scope.mails += user.ID + ";";
        $scope.addTag(userClone);
    }

    $scope.tagRemoved = function(tag) {
        // $scope.lsUsers.push(tag);
        $scope.mails = $scope.mails.replace(tag.ID + ";", "");

        saveEmail();

        getEmails();
    }

    $scope.btnMoveAll = function() {
        for (var i = $scope.lsUsers.length - 1; i >= 0; i--) {
            $scope.changeUser($scope.lsUsers[i]);
        }

        saveEmail();
    }

    init();


    $(document).ready(function() {
        var listas = $('#listaDupla_esquerda').bootstrapDualListbox({
            nonSelectedListLabel: '<b>Usu&aacute;rios</b>',
            selectedListLabel: '<b>Usu&aacute;rio Selecionados</b>',
            infoTextEmpty: '',
            infoText: false,
            filterPlaceHolder: 'Pesquisar...'
        });

        $(".box2").hide();

        var option = getVariavelURL('aOption');

        if (option == '1') { $('#nome').empty().text('PARA:'); } else { $('#nome').empty().text('CC:'); }

        $.ajax({
            url: '/WVDF_WS/ws_hcgs2101.wso/f_PesquisaEMAILS/JSON',
            type: 'POST',
            data: {
                'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
                'GRUPO': $('#listaGrupos').val(),
                'aFup': getVariavelURL('aFup'),
                'aOption': getVariavelURL('aOption')
            },
            dataType: 'json',
            success: function(json) {
                $.each(json, function(i, value) {

                    listas.append($('<option>').text(value.DS).attr('value', value.ID).attr('selected', value.SEL == 1 ? true : false));

                });

                listas.bootstrapDualListbox('refresh', true);
            }
        });


        $.ajax({
            url: '/WVDF_WS/ws_hcgs2101_06.wso/fEmailRetorno/JSON',
            type: 'POST',
            data: {
                'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
                'GRUPO': $('#listaGrupos').val(),
                'aFup': getVariavelURL('aFup'),
                'aOption': getVariavelURL('aOption')
            },
            dataType: 'json',
            success: function(data) {
                $('#emails').empty().text(data);
            }
        });


        // $(document).on('click', '#btnPesquisar', function() {
        //     if ($('#listaGrupos').val() != "0") {
        //         listas.empty();
        //         $('input[type="text"]').val('');

        //         $.ajax({
        //             url: '/WVDF_WS/ws_hcgs2101.wso/f_PesquisaEMAILS/JSON',
        //             type: 'POST',
        //             data: {
        //                 'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
        //                 'GRUPO': $('#listaGrupos').val(),
        //                 'aFup': getVariavelURL('aFup'),
        //                 'aOption': getVariavelURL('aOption')
        //             },
        //             dataType: 'json',
        //             success: function(json) {
        //                 $.each(json, function(i, value) {
        //                     listas.append($('<option>').text(value.DS).attr('value', value.ID).attr('selected', value.SEL == 1 ? true : false));

        //                 });

        //                 listas.bootstrapDualListbox('refresh', true);
        //             }
        //         });
        //     }
        // });

        $(document).on('change', '#listaDupla_esquerda', function() {
            var valoresMarcados = $(this).val();

            if (valoresMarcados != null) {
                $.ajax({
                    type: 'POST',
                    url: '/WVDF_WS/ws_hcgs2101.wso/f_AtualizaCSAG369/JSON',
                    data: {
                        'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
                        'aFup': getVariavelURL('aFup'),
                        'aOption': getVariavelURL('aOption'),
                        'aRANGE': "" + valoresMarcados + ""
                    },
                    dataType: 'json',
                    success: function(json) {
                        console.log("WS Retornou: " + json);
                        $('#emails').text(json);
                    }
                });
            } else {
                $.ajax({
                    type: 'POST',
                    url: '/WVDF_WS/ws_hcgs2101.wso/f_AtualizaCSAG369/JSON',
                    data: {
                        'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
                        'aFup': getVariavelURL('aFup'),
                        'aOption': getVariavelURL('aOption'),
                        'aRANGE': ""
                    },
                    dataType: 'json',
                    success: function(json) {
                        console.log("WS Retornou: " + json);
                        $('#emails').text(json);
                    }
                });
            }

        });

        $(document).on('blur', '#emails', function() {

            $.ajax({
                url: '/WVDF_WS/ws_hcgs2101.wso/fEmailEditar/JSON',
                type: 'POST',
                data: {
                    'Text': $('#emails').val(),
                    'aFup': getVariavelURL('aFup'),
                    'aOption': getVariavelURL('aOption')
                },
                dataType: 'json',
                success: function(json) {}

            });
        });
    });
}]);
