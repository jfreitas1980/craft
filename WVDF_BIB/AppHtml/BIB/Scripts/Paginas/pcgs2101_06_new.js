var app = angular.module('pcgs2101App', ['smart-table', 'ngSanitize', 'wsDominio', 'diretivas', 'ui.bootstrap', 'toaster']);

app.controller('pcgs2101Ctrl', ['$scope', '$timeout', 'callWS', 'toaster', function($scope, $timeout, callWS, toaster) {
    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
    var aCodigo = getVariavelURL('aCodigo');

    $scope.lsData = [];

    var init = function() {
        getMotivos();
    }

    var getMotivos = function() {
        var params = {
            'sUSUARIOSESSAO': aUsuarioSessao,
            'sCodigo': aCodigo
        }
        callWS.get('/WVDF_WS/ws_hcgs2101_06.wso/f_hcgs2103_emissao/JSON', params).then(function(response) {
            //  $scope.lsData = response.data;
            // console.log($scope.lsData);


            var data = response.data;


            if (data.length > 0) {
                // Primeira etapa - Produtos
                for (p = 0; p <= (data.length - 1); p++) {

                    var linhaNovaP = '';
                    var linhaNovaM = '';
                    var linhaNovaD = '';

                    if (data[p].motivos.length > 0) {
                        linhaNovaP = "<tr><th class='rptL' colspan='11'>" + data[p].prod_ds;
                    } else {
                        linhaNovaP = "<tr><th class='rptL' colspan='12'>" + data[p].prod_ds;
                    }

                    if (data[p].pot_v !== '' && data[p].pot_t !== '') {
                        linhaNovaP += " [ " + data[p].pot_v + " - " + data[p].pot_t + " - " + data[p].pot_f + " ]</th>";
                    }

                    if (data[p].motivos.length > 0) {
                        linhaNovaP += "<td class='rptC' id='PFup" + p + "' style='background-color: #f9f9f9;'><i class='fa fa-minus-square'></i></td>";
                    }

                    linhaNovaP += "</tr>";

                    // Segunda etapa - Motivos
                    linhaNovaM = '0';
                    console.log(data);
                    if (data[p].motivos.length > 0) {

                        for (m = 0; m <= (data[p].motivos.length - 1); m++) {

                            // Terceira etapa - Detalhes
                            var r = 0;
                            linhaNovaD = '0';
                            if (data[p].motivos[m].detalhes.length > 0) {

                                r = data[p].motivos[m].detalhes.length;
                                r = r * 2;
                                r = r + 2;

                                linhaNovaD = "<tr class ='DFup" + p + m + " PFup" + p + "'>";
                                linhaNovaD += "<td></td>"; //Numero da Contagem de Detalhes.
                                linhaNovaD += "<td>DATA</td>"; // Data de Criação do Detalhe.
                                linhaNovaD += "<td>ORIGEM</td>";
                                linhaNovaD += "<td>DESTINO</td>";
                                linhaNovaD += "<td>TRADE</td>";
                                linhaNovaD += "<td>MERCADORIA</td>";
                                linhaNovaD += "<td>CONCORRENTE</td>";
                                linhaNovaD += "<td>POTENCIAL</td>";
                                linhaNovaD += "<td>UNIDADE</td>";
                                linhaNovaD += "<td>FREQUENCIA</td>";
                                linhaNovaD += "<td>ELABORADOR</td>";
                                linhaNovaD += "</tr>";

                                for (d = 0; d <= (data[p].motivos[m].detalhes.length - 1); d++) {

                                    linhaNovaD += "<tr class ='DFup" + p + m + " PFup" + p + "'>";
                                    linhaNovaD += "<td class='rptR'>#" + (d + 1) + "</td>";
                                    linhaNovaD += "<td class='rptC'>" + data[p].motivos[m].detalhes[d].data + "</td>";
                                    linhaNovaD += "<td class='rptC'>" + data[p].motivos[m].detalhes[d].origem + "</td>";
                                    linhaNovaD += "<td class='rptC'>" + data[p].motivos[m].detalhes[d].destino + "</td>";
                                    linhaNovaD += "<td class='rptC'>" + data[p].motivos[m].detalhes[d].trade + "</td>";
                                    linhaNovaD += "<td class='rptC'>" + data[p].motivos[m].detalhes[d].mercadoria + "</td>";
                                    linhaNovaD += "<td class='rptC'>" + data[p].motivos[m].detalhes[d].concorrente + "</td>";
                                    linhaNovaD += "<td class='rptC'>" + data[p].motivos[m].detalhes[d].potencial + "</td>";
                                    linhaNovaD += "<td class='rptC'>" + data[p].motivos[m].detalhes[d].unidade + "</td>";
                                    linhaNovaD += "<td class='rptC'>" + data[p].motivos[m].detalhes[d].frequencia + "</td>";
                                    linhaNovaD += "<td class='rptC'>" + data[p].motivos[m].detalhes[d].elaborador + "</td>";
                                    linhaNovaD += "</tr>";
                                    linhaNovaD += "<tr class ='DFup" + p + m + " PFup" + p + "' >";
                                    linhaNovaD += "<td class='rptR'>NOTES #" + (d + 1) + "</td>";
                                    linhaNovaD += "<td colspan='10' >" + data[p].motivos[m].detalhes[d].comentario + "</td>";
                                    linhaNovaD += "</tr>";

                                } //for (d = 0; d <= (data[p].motivos[m].detalhes.length - 1); d++) {                       

                            } //if (data[p].motivos[m].detalhes.length > 0) {

                            linhaNovaM = "<tr class ='PFup" + p + "'>";

                            if (r > 0) {
                                linhaNovaM += "<td id='rowM" + p + m + "' style='background-color: #f9f9f9;' rowspan='" + r + "'>&nbsp;</td>";
                                linhaNovaM += "<td colspan='10'>" + data[p].motivos[m].motivo_ds;
                            } else {
                                linhaNovaM += "<td id='rowM" + p + m + "' style='background-color: #f9f9f9;'>&nbsp;</td>";
                                linhaNovaM += "<td colspan='11'>" + data[p].motivos[m].motivo_ds;
                            }

                            if (data[p].motivos[m].submotivo_ds !== '') {
                                linhaNovaM += " <i class='fa fa-arrow-right'></i> " + data[p].motivos[m].submotivo_ds;
                            }

                            linhaNovaM += "</td>";

                            if (r > 0) {
                                linhaNovaM += "<td class='rptC' id='MFup" + p + m + "' style='background-color: #f9f9f9;'><i class='fa fa-minus-square'></i></td>";
                            }

                            linhaNovaM += "</tr>";

                            if (linhaNovaD !== '0') linhaNovaM += linhaNovaD;

                            if (linhaNovaM !== '0') linhaNovaP += linhaNovaM;

                        } //for (m = 0; m <= (data[p].motivos.length - 1); m++) {

                    } //if (data[p].motivos.length > 0) {

                    linhaNovaP += "<tr id='Prods" + (p + 1) + "'><td style='background-color: #f9f9f9;'colspan='12'></td></tr>";

                    $('#Prods' + p).after(linhaNovaP);

                } //for (p = 0; p <= (data.length - 1); p++) {

            } //if (data.length > 0) {
        });
    }

    $(document).on('click', '[id^="MFup"]', function() {
        if (!$(this).children().hasClass('fa-square')) {
            if ($(this).children().hasClass('fa-plus-square')) {

                $(this).children().removeClass('fa-plus-square').addClass('fa-minus-square');
                var motivosub = '.DFup' + ($(this).attr('id')).substr(4) + '';
                $(motivosub).show();

                var qntdMotivos = $(motivosub).length + 1;
                var rowsAtuais = $('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan');
                var rowsNovos = (qntdMotivos + parseInt(rowsAtuais));

                $('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan', rowsNovos);

            } else {

                $(this).children().removeClass('fa-minus-square').addClass('fa-plus-square');
                var motivosub = '.DFup' + ($(this).attr('id')).substr(4);
                $(motivosub).hide();

                var qntdMotivos = $(motivosub).length + 1;
                var rowsAtuais = $('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan');
                var rowsNovos = (parseInt(rowsAtuais) - qntdMotivos);

                $('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan', rowsNovos);

            }
        }
    });

    $(document).on('click', '[id^="PFup"]', function() {
        if (!$(this).children().hasClass('fa-square')) {
            if ($(this).children().hasClass('fa-plus-square')) {

                $(this).children().removeClass('fa-plus-square').addClass('fa-minus-square');
                var motivo = '.PFup' + ($(this).attr('id')).substr(4) + '';
                $(motivo).show();

            } else {

                $(this).children().removeClass('fa-minus-square').addClass('fa-plus-square');
                var motivo = '.PFup' + ($(this).attr('id')).substr(4) + '';
                $(motivo).hide();

            }
        }
    });



    $scope.showTitle = function(index) {
        return !(index == 0);
    }
    init();
}])
