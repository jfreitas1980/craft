var jsOK = 1;

// PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
// FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
$('document').ready(function() {
    parent.scrollTo(0, 0);
    parent.parent.scrollTo(0, 0);

    $('#csag320__data_nascfund').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    });

    $('#csag320__data_nascfund').removeClass('col-xs-6').addClass('col-xs-12');
    $('#csag320__data_nascfund').mask("99/99/9999")

    atualizarTabs();

    $('#aCSAG320Id', window.parent.document).val($('#csag320__codigo').val());

    $('#aCSAG320RowId', window.parent.document).val($('#csag320__rowid').val());
    $('#aCSAG320RecId', window.parent.document).val($('#csag320__recnum').val());

    $('#csag320__nrdocto_ed').attr('disabled', 'disabled');
    $('#csag320__status_dt_ativo').attr('disabled', 'disabled');
    $('#csag320__status_dt_inativo').attr('disabled', 'disabled');

    if ($('#csag320__codigo').val() == "0" || $('#csag320__codigo') == "")
        $('#modal-grp_clientes').hide();
    else
        $('#modal-grp_clientes').show();


    $('#csag320__observacao').blur(function() {
        TextAreaLimite(this, 1022);
    });


    if ($("#csag320__logomarca").val().length) {
        $(".file-upload-image").attr("src",$("#csag320__logomarca").val());
        console.log($("#csag320__logomarca").val());
        $('.file-upload').find('.image-upload-wrap').hide();
        $('.file-upload').find('.file-upload-content').show();
    }
});

// PREPARAR O MODAL DOS CLIENTES
$("#modal-grp_clientes").fancybox({
    fitToView: true,
    width: '50%',
    height: '50%',
    autoSize: false,
    modal: false,
    afterClose: function() {},
    helpers: {
        overlay: {
            locked: false
        }
    }
});

$(document).on('focus', '#csag320__fantasia', function() {
    if ($(this).val() == "") {
        $(this).val($('#csag320__nome').val());
    }
});

function atualizarTabs() {
    var sParametros = $('#csag320__codigo').val() + '","' + $('#jaUsuarioSessao').val();
    var sRetorno = ReadFuncValue(sParametros, "oPAG320_01", "get_f_atualizatabs");

    var obj = JSON.parse(sRetorno);

    if ($('#csag320__rowid').val() != "") {
        $('#li-pag366_01', window.parent.document).show();
        $('#li-pag352_01', window.parent.document).show();
        $('#li-pag374_01', window.parent.document).show();
        $('#li-pag335_01', window.parent.document).show();
        $('#li-pag350_01', window.parent.document).show();
        $('#li-pag378_01', window.parent.document).show();
        $('#li-pcgs2101_00', window.parent.document).show();
        $('#li-pagTeste', window.parent.document).show();


        ((obj['340']) ? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide());
        ((obj['341']) ? $('#li-pag341_01', window.parent.document).show() : $('#li-pag341_01', window.parent.document).hide());
        ((obj['342']) ? $('#li-pag342_01', window.parent.document).show() : $('#li-pag342_01', window.parent.document).hide());
        ((obj['343']) ? $('#li-pag343_01', window.parent.document).show() : $('#li-pag343_01', window.parent.document).hide());
        //(tipos['despachante'])    ? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide()
        //(tipos['concorrencia'])   ? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide())
        ((obj['349']) ? $('#li-pag349_01', window.parent.document).show() : $('#li-pag349_01', window.parent.document).hide());
        //(tipos['customer'])       ? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide())
        ((obj['346']) ? $('#li-pag346_01', window.parent.document).show() : $('#li-pag346_01', window.parent.document).hide());
        ((obj['345']) ? $('#li-pag345_01', window.parent.document).show() : $('#li-pag345_01', window.parent.document).hide());
        ((obj['347']) ? $('#li-pag347_01', window.parent.document).show() : $('#li-pag347_01', window.parent.document).hide());
        ((obj['395']) ? $('#li-pag395_01', window.parent.document).show() : $('#li-pag395_01', window.parent.document).hide());
    } else {
        $('#li-pag366_01', window.parent.document).hide();
        $('#li-pag352_01', window.parent.document).hide();
        $('#li-pag374_01', window.parent.document).hide();
        $('#li-pag335_01', window.parent.document).hide();
        $('#li-pag350_01', window.parent.document).hide();
        $('#li-pag378_01', window.parent.document).hide();
        $('#li-pcgs2101_00', window.parent.document).hide();
        $('#li-pag340_01', window.parent.document).hide();
        $('#li-pag342_01', window.parent.document).hide();
        $('#li-pag349_01', window.parent.document).hide();
        $('#li-pag341_01', window.parent.document).hide();
        $('#li-pag347_01', window.parent.document).hide();
        $('#li-pag395_01', window.parent.document).hide();
    }
}



var Thisinput = null;

function readURL(input) {
    Thisinput = $(input)
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function(e) {
            Thisinput.closest('.file-upload').find('.image-upload-wrap').hide();

            Thisinput.closest('.file-upload').find('.file-upload-image').attr('src', e.target.result);
            Thisinput.closest('.file-upload').find('.file-upload-content').show();

            Thisinput.closest('.file-upload').find('.image-title').html(input.files[0].name);

            $("#csag320__logomarca").val(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }

}

function removeUpload(input) {
    $('.file-upload').find('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload').find('.file-upload-content').hide();
    $('.file-upload').find('.image-upload-wrap').show();
    $(".csag320__logomarca").val("");
}

/*
Thisinput.closest('.file-upload').find('.image-upload-wrap').bind('dragover', function() {
    Thisinput.closest('.file-upload').find$('.image-upload-wrap').addClass('image-dropping');
});
Thisinput.closest('.file-upload').find('.image-upload-wrap').bind('dragleave', function() {
    Thisinput.closest('.file-upload').find('.image-upload-wrap').removeClass('image-dropping');
});*/