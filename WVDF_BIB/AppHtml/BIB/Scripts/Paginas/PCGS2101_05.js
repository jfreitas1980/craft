// FORMATA A PAGINA
$(document).ready(function() {
    $('#selstart3').mask('99/99/9999').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    });

    $('#selstop3').mask('99/99/9999').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    });

    $('#selstart6').removeClass('col-xs-12').addClass('col-xs-6');
    $('#Index').removeClass('col-xs-6').addClass('form-control');

    if (getVariavelURL('RunReport') == 'RunReport' || getVariavelURL('RunReport') == '1') {
        if ($('#botoesReportFinal').is(':empty')) {
            $('#botoesReportFinal').html($('#botoesReportAux').html());
            $('#botoesReportAux').empty();
        }

        $('#nextPageFinal').attr('href', $('#nextPageAux').val());

    };

    // FORMATA OS SWITCHS
    configuraSwitchs("", $('#switch-SELSTART_5_checkbox'), 'selstart5');

});

// CONFIGURA SWITCHS
$(document).on('change', '#switch-SELSTART_5_checkbox', function() {
    configuraSwitchs($(this).prop('checked').toString(), $(this), 'selstart5');
});

// -- APP && CONTROLER
var app = angular.module('relFupApp', ['ui.bootstrap', 'ngTagsInput', 'wsDominio']);

app.factory('buscaWS', function($http) {
    return {
        get: function(url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
                return res.data;
            });
        }
    };
});

app.directive('jsonText', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            function into(input) {
                console.log(JSON.parse(input));
                return JSON.parse(input);
            }

            function out(data) {
                return JSON.stringify(data);
            }
            ngModel.$parsers.push(into);
            ngModel.$formatters.push(out);
        }
    };
});

app.controller('relFupCtrl', function($scope, $timeout, callWS, buscaWS) {

	$scope.aLista = {};

	var parametros = 'aFup=' + $('#codlist').val();

	// buscaWS.get('/WVDF_WS/ws_HCGS2101.wso/f_hcgs2101_05/JSON', parametros)
	// .then(function(data) {
	//     $scope.aLista = data;
	// });

	$scope.btnImprimirEXCEL = function() {
        var blob = new Blob([document.getElementById('export').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "ReportFup.xls");
    };

    $scope.loadAutocomplete = function(query, campo) {

        var parametros = 'aInicio=' + query;

        if (campo === "Vendedor") {
            
            // data = buscaWS.get('/WVDF_WS/ws_CSAG341.wso/f_VendedorComplete/JSON', parametros)
            //     .then(function(data) {
            //         // console.log(data);
            //         return data;
            //     });
            // //  console.log(data);
            // return data;
        
        }

        if (campo === "Destino" || campo === "Origem") {
            // debugger;
            parametros = "idTrade=&idPais=&sCidade=" + query ;
            
            data = buscaWS.get('/WVDF_WS/ws_CSAG325.wso/buscarCidadesPorPaisesPorTrade/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    return data;
                });
            //  console.log(data);
            return data;

        }

        if (campo === "Concorrente") {

            parametros = 'sInicio=' + query;
            
            data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_proposta_complete_client/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    return data;
                });
            //  console.log(data);
            return data;

        }

        if (campo === "Cliente") {

            parametros = 'sInicio=' + query;
        	
            data = buscaWS.get('/WVDF_WS/ws_CSAG340.wso/f_proposta_complete_client/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    return data;
                });
            //  console.log(data);
            return data;

        }

        if (campo === "Elaborador") {

        	data = buscaWS.get('/WVDF_WS/ws_CSAG300.wso/f_UsuarioComplete/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    return data;
                });
            //  console.log(data);
            return data;

        }

        if (campo === "Produto") {

        	data = buscaWS.get('/WVDF_WS/ws_CCGS210.wso/f_ProdutoComplete/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    return data;
                });
            //  console.log(data);
            return data;

        }

        if (campo === "Motivo") {

        	data = buscaWS.get('/WVDF_WS/ws_CCGS213.wso/f_MotivoComplete/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    return data;
                });
            //  console.log(data);
            return data;

        }

        if (campo === "Marca") {

        	data = buscaWS.get('/WVDF_WS/ws_csag308.wso/f_MarcaComplete/JSON', parametros)
                .then(function(data) {
                    // console.log(data);
                    return data;
                });
            //  console.log(data);
            return data;

        }

    };

    $.fn.appendVal = function(newPart) {
        return this.each(function() { $(this).val($(this).val() + newPart); });
    };

    $scope.addTag = function(tag, campo) {
        console.log(tag);

        if (campo === "Vendedor") {
            
            $('#selstart7').appendVal("," + tag.id);
            
        }

        if (campo === "Destino") {
            
            $('#selstart20').appendVal("," + tag.id);
            
        }

        if (campo === "Origem") {
            
            $('#selstart19').appendVal("," + tag.id);
            
        }

        if (campo === "Cliente") {

        	$('#selstart8').appendVal("," + tag.idCliente);

        }

        if (campo === "Concorrente") {

            $('#selstart21').appendVal("," + tag.idCliente);

        }

        if (campo === "Elaborador") {

        	$('#selstart15').appendVal("," + tag.id);

        }

        if (campo === "Produto") {

        	$('#selstart14').appendVal("," + tag.id);

        }

        if (campo === "Motivo") {

        	$('#selstart13').appendVal("," + tag.id);

        }

        if (campo === "Marca") {

        	$('#selstart6').appendVal("," + tag.id);

        }

    }; // -- FIM TAG ADDED

    $scope.tagRemoved = function(tag, campo) {

    	if (campo === "Vendedor") {
            
            var replac = $("#selstart7").val();
	    	var subts = replac.replace(("," + tag.id) , "");
	    	$('#selstart7').val(subts);
            
        }

        if (campo === "Origem") {
            
            var replac = $("#selstart19").val();
            var subts = replac.replace(("," + tag.id) , "");
            $('#selstart19').val(subts);
            
        }

        if (campo === "Destino") {
            
            var replac = $("#selstart20").val();
            var subts = replac.replace(("," + tag.id) , "");
            $('#selstart20').val(subts);
            
        }

        if (campo === "Cliente") {

        	var replac = $("#selstart8").val();
	    	var subts = replac.replace(("," + tag.idCliente) , "");
	    	$('#selstart8').val(subts);

        }

        if (campo === "Concorrente") {

            var replac = $("#selstart21").val();
            var subts = replac.replace(("," + tag.idCliente) , "");
            $('#selstart21').val(subts);

        }

        if (campo === "Elaborador") {

			var replac = $("#selstart15").val();
	    	var subts = replac.replace(("," + tag.id) , "");
	    	$('#selstart15').val(subts);

        }

        if (campo === "Produto") {

        	var replac = $("#selstart14").val();
	    	var subts = replac.replace(("," + tag.id) , "");
	    	$('#selstart14').val(subts);

        }

        if (campo === "Motivo") {

        	var replac = $("#selstart13").val();
	    	var subts = replac.replace(("," + tag.id) , "");
	    	$('#selstart13').val(subts);


        }

        if (campo === "Marca") {

        	var replac = $("#selstart6").val();
	    	var subts = replac.replace(("," + tag.id) , "");
	    	$('#selstart6').val(subts);

        }
    
    };
    // -- FIM TAG REMOVED

});
