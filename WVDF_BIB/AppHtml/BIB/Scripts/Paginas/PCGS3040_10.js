// FORMATA A PAGINA
$(document).ready(function() {
    $('#dialogs').dialog({
        autoOpen: false,
        width: 360,
        height: 260,
        modal: true,
        hide: 'clip',
        close: function(event, ui) {
            $('#dialogs').children().hide();
        }
    });

    // Lista arquivos
    //debugger;
    listaArquivos();

    $.ajax({
        url: '/WVDF_WS/ws_log3040.wso/fUserIdLOG3040/JSON',
        type: 'POST',
        data: {
            'aUsuarioSessao': getVariavelURL('aUsuarioSessao')
        },
        dataType: 'json',
        success: function(json) {
            $('#fileInput').uploadify({
                'removeCompleted': false,
                'auto': false,
                'swf': 'uploadify/uploadify.swf',
                'folder': getVariavelURL('Nm_Tabela'),
                'buttonClass': true,
                'multi': true,
                'buttonText': 'Buscar',
                'formData': { "novoNome": "nome" },
                'uploader': 'envioXls.asp?Nm_Tabela=' + getVariavelURL('Nm_Tabela') + '&idProposta=' + getVariavelURL('idProposta') + '&Id_Usuario=' + json.sReturn,
                'onFallback': function() {
                    console.log("log");
                    $('#dvflash').show();
                    $("#dvContent").hide();
                },

                onUploadError: function(a, b, c, d) {
                    //console.log('erro');
                    parent.parent.alertify.erro('Arquivo invalido');
                },
                onUploadSuccess: function(file, data, response) {
                    var status = $('#status').val();
                    console.log(file);
                    console.log(data);
                    //  return;
                    //("C:\\WWW.SISTEMAS.COM.BR\\WEB.CRAFT.COM.BR\\WVDF_CAC_v8r0\\AppHtml\\FILES\\PROPOSTA\\"+ getVariavelURL('idProposta') + '\\' + file.name)
                    debugger;
                    $.ajax({
                        url: '/WVDF_WS/ws_log3040.wso/fRegisterLOG3040/JSON',
                        type: 'POST',
                        data: {
                            'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
                            'sTabela': getVariavelURL('Nm_Tabela'),
                            'idProposta': getVariavelURL('idProposta'),
                            'aStatus': status,
                            'sFileName': file.name,
                            'sFilePath': data+'\\'+ file.name 
                        },
                        dataType: 'json',
                        success: function(json) {
                            listaArquivos();
                            console.log(json);
                            parent.parent.alertify.success(json.sReturn_Ds);

                            file.name = json.sReturn_Id;
                        }
                    });
                }
            });
        }
    });


    $(document).on('click', '#btnExcluir', function() {
        $.ajax({
            url: '/WVDF_WS/ws_log3040.wso/fDeleteLOG3040/JSON',
            type: 'POST',
            data: {
                'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
                'recId': $(this).attr('idArquivo')
            },
            dataType: 'json',
            success: function(json) {
                alertify.success('Arquivo excluido com sucesso.');
                $("#tabela > tbody").html("");
                listaArquivos();
            }
        });
    });

    $(document).on('click', '#btnDownload', function() {
        //console.log($(this).parent().parent().attr('idarquivo'));

        $.ajax({
            url: '/WVDF_WS/ws_log3040.wso/fRegisterLOGFILE/JSON',
            type: 'POST',
            data: {
                'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
                'recId': $(this).parent().parent().attr('idarquivo')
            },
            dataType: 'json',
            success: function(json) {}
        });
        var tabela = getVariavelURL('Nm_Tabela');
        var folder;
        //debugger;
        switch (tabela) {
            case 'HCGS3000':
                folder = 'TARIFARIOS';
                break;
            case 'HCGS3034':
                folder = 'TXLOCAIS';
                break;
            case 'HCGS3040':
                folder = 'TRACKINGS';
                break;
            case 'HCGS3004':
                folder = 'PROPOSTA';
                break;
        }
        debugger;
        var proposta = getVariavelURL('idProposta');
        var a = $('<a>')
            .attr('href', 'FILES/' + folder + '/' + proposta + '/' + $(this).attr('nomeArquivo'))
            .attr('download', '')
            .appendTo('body');

        a[0].click();
        a.remove();
    });

    function listaArquivos() {
        $("#tabela > tbody").html("");

        $.ajax({
            url: '/WVDF_WS/ws_log3040.wso/fListaLOG3040/JSON',
            type: 'POST',
            data: {
                'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
                'sTabela': getVariavelURL('Nm_Tabela'),
                'idProposta': getVariavelURL('idProposta')
            },
            dataType: 'json',
            success: function(json) {

                $.each(json, function(i, dados) {
                    var tipo = "";
                    var arquivo = "";
                    var id = dados.id;
                    if (dados.value.indexOf(".") !== -1) {
                        var tipo = (dados.value.split('.'))[1].toUpperCase();
                        var arquivo = (dados.value.split('.'))[0].toLowerCase();
                    } else {
                        var arquivo = dados.value.toLowerCase();
                    }
                    var fstatus = dados.fstatus;
                    var signature = dados.signature;
                    $('#tabela > tbody:last-child').append('<tr id="linhaTabela" idArquivo="' + id + '"><td class="rptC">' + id + '</td><td class="rptL">' + tipo + '</td><td id="sArquivo-' + id + '"class="rptL">' + arquivo + '</td><td class="rptL">' + fstatus + '</td><td class="rptL">' + signature + '</td><td class="rptC"><span id="btnExcluir" style="cursor:pointer;" idArquivo="' + id + '" class="fa fa-trash-o" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;&nbsp;<span id="btnDownload" nomeArquivo="' + dados.value + '"  style="cursor:pointer;" class="fa fa-cloud-download" aria-hidden="true"></span></td></tr>');
                });
            }
        });
    }
});