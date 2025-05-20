$(document).ready(function () {
    // FORMATA COLUNAS NOVAS NAS _03
    $('#0 td').css("background-color", "#F9E6B6");

    // ESCONDE CAMPOS INATIVO DESDE EM TODAS AS TELAS
    var formDtInativo;
    var campoDtInativo;
    var valorDtInativo;

    formDtInativo = $('#form-2wa').attr('name');
    campoDtInativo = $('#' + formDtInativo + "__status_dt_inativo");

    valorDtInativo = campoDtInativo.val();

    if (valorDtInativo == "" || valorDtInativo == "1/1/1753 12:00:00 AM") {
        campoDtInativo.parent().parent().hide();
    }

    if (getVariavelURL('RunReport') == 'RunReport' || getVariavelURL('RunReport') == '1') {
        if ($('#botoesReportFinal').is(':empty')) {
            $('#botoesReportFinal').html($('#botoesReportAux').html());
            $('#botoesReportAux').empty();
        }

        $('#nextPageFinal').attr('href', $('#nextPageAux').val());
    }

    iFrameResize({
        checkOrigin: false,
        log: false, // Enable console logging
        enablePublicMethods: true, // Enable methods within iframe hosted page
    });

});

$(document).on('focusin', '.fld-2wa', function () {
    if ($(this).val() == '0') {
        $(this).val('');
    }
});