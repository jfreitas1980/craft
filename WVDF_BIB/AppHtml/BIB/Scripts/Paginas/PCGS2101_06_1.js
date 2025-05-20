// ANGULAR JS
app = angular.module('enviaFupApp', ['toaster', 'wsDominio']);

app.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.factory('buscaWS', function ($http) {
    return {
        get: function (url, parametros) {
            return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function (res) {
                return res.data;
            });
        }
    };
});

app.config(function ($sceProvider) {
    $sceProvider.enabled(false);
})

app.controller('enviaFupController', function ($scope, $timeout, buscaWS, $http, $q, $filter, callWS, toaster) {
    // $scope.emailFup = {};
    $scope.aProds = {};
	// $scope.emailShow = false;

    var aUsuarioSessao = getVariavelURL('aUsuarioSessao');
	var sCodigo = getVariavelURL('aCodigo');
	

	$(document).on('change', '#to', function() {

		$scope.emailFup.to = $('#to').val();

		parametros = "aFup=" +  sCodigo + '&aPara=' + $scope.emailFup.to;
        buscaWS.get('/WVDF_WS/ws_hcgs2101_06.wso/fEmailEditPara/JSON', parametros).then(function (data) {
        });

	});

	$scope.fnEditarPara = function (){

		parametros = "aFup=" +  sCodigo + '&aPara=' + $scope.emailFup.to;
		buscaWS.get('/WVDF_WS/ws_hcgs2101_06.wso/fEmailEditPara/JSON', parametros).then(function (data) {
        });

	}

	$scope.fnEditarCCO = function (texto){

		parametros = "aFup=" +  sCodigo + '&aCCO=' + $scope.emailFup.bcc;
		buscaWS.get('/WVDF_WS/ws_hcgs2101_06.wso/fEmailEditCCO/JSON', parametros).then(function (data) {
        });

	}

  	$scope.openEmail = function(){

		if ($scope.emailShow == true) {
			$scope.emailShow = false;
			$('#email_Show').hide();

		}
		else {
			$scope.loadingState = true;
			$scope.emailLink =  "pcgs2101_06_1x.asp?aUsuarioSessao=" + aUsuarioSessao + "&aFup=" + sCodigo;
			$('#email_Show').show();
			console.log($scope.emailLink);
			$scope.emailShow = true;
			$scope.posicionarDadosEmail();
		}
	};

	function closeIFrame(){
    	
    	// $('#modalPesquisa').hide();
    	$('#modalPesquisa').modal('hide');
    	// $scope.emailShow = false;
	}
	
    $scope.enviarEmail = function () {

    	if ($scope.emailFup.to == '')
    		{$scope.emailFup.to = $('#to').val();}

    	if ($scope.emailFup.bcc == '')
    		{$scope.emailFup.bcc = $('#bcc').val();}

    	if ($scope.emailFup.to == '' && $scope.emailFup.bcc == '') {
    		parent.parent.alertify.error("Sem Destinatarios.");
    		return;
    	}

        $scope.emailFup.aFup = sCodigo;
        $scope.emailFup.aUsuarioSessao = aUsuarioSessao;
        $scope.emailFup.urlPDF = $scope.urlPDF;
        var entidade = JSON.stringify($scope.emailFup);
        var params = {'sJSON': entidade};
        callWS.get('/WVDF_WS/ws_hcgs2101_06.wso/fEmailToSendFup/JSON', params)
                .then(function (response) {
                    // console.log(response);
                    if (response.data.hasError) {
                        parent.parent.alertify.error("Error ao consultar registro. <br/> Response: " + response.data.msgError);
                        // toaster.pop('error', "Error", ("Error ao consultar registro. <br/> Response: " + response.data.msgError), null, 'trustedHtml');
                    } else {
                		parent.parent.alertify.success("E-mail Enviado!");
                        // toaster.pop('sucess', "Sucesso", ("Follow-Up enviado"), null, 'trustedHtml');
                    }
                    $scope.$broadcast('updateDTContainer', '');
                }, function (error) {
                    console.log(error);
                });

                closeIFrame();

    };


    $scope.posicionarDadosEmail = function () {
        var params = {'aUsuarioSessao': aUsuarioSessao, 'aFup': sCodigo};
        callWS.get('/WVDF_WS/ws_hcgs2101_06.wso/fExibeEmailFup/JSON', params)
                .then(function (response) {
                    if (response.data.defaultMessage.hasError) {
                        toaster.pop('error', "Error", ("Error ao consultar registro. <br/> Response: " + response.data.defaultMessage.msgError), null, 'trustedHtml');
                    } else {
                        $scope.emailFup = response.data;
                    }
                    $scope.$broadcast('updateDTContainer', '');
                }, function (error) {
                    console.log(error);
                });

    	$scope.loadingState = false;
    };


    $scope.fnLimpa = function(){

        parametros = "aFup=" +  sCodigo;
        buscaWS.get('/WVDF_WS/ws_hcgs2101_06.wso/fEmailLimpar/JSON', parametros).then(function (data) {

        	$('#to').val(data);
			$('#bcc').val(data);

			$scope.emailFup.to = '';
	        $scope.emailFup.bcc = ''; 
			$scope.emailFup.msg = ''; 

        });

    }


    //--- CARREGA OS PRODUTOS - MOTIVOS - DETALHES
	// $scope.fnProds = function() {
	// 	parametros = "sCodigo=" +  sCodigo;
	//     buscaWS.get('/WVDF_WS/ws_hcgs2101_06.wso/f_hcgs2103_emissao/JSON', parametros).then(function (data) {

	//     	$scope.aProds = data;

	//     });
	// }
	// $scope.fnProds();

}); //Fim do Controller


$(document).ready(function() {
	
	var sUSUARIOSESSAO = getVariavelURL('aUsuarioSessao');
    var sCodigo = getVariavelURL('aCodigo');
    var sOption =  $('#modal-email-p').attr('value');

	var Link = "pcgs2101_06_2x.asp?aUsuarioSessao=" + sUSUARIOSESSAO + "&aFup=" + sCodigo + "&aOption=" + sOption;

    $('#modal-email-p').attr('href', Link);

    sOption =  $('#modal-email-c').attr('value');
    
    Link = "pcgs2101_06_2x.asp?aUsuarioSessao=" + sUSUARIOSESSAO + "&aFup=" + sCodigo + "&aOption=" + sOption;

    $('#modal-email-c').attr('href', Link);

	preencheSolicitado();

});

$("#modal-email-p").fancybox({
    fitToView   : false,
    width       : '70%',
    height      : '70%',
    autoSize    : true,
    modal       : false,
    beforeShow : function(){
       window.$('html, body').animate({scrollTop : 0},800);
       // var $iframe = $('.fancybox-iframe');
       // $iframe.contents().find("#emails").val($('#to').val());
        // window.focus($iframe.contents().find('to'));
    },
    beforeClose: function() {
        // working
        var $iframe = $('.fancybox-iframe');
        // $iframe.contents().find('to').val();
        // console.log($iframe.contents().find("#emails").val());
        $('#to').val($iframe.contents().find("#emails").val());
        // alert($('input', $iframe.contents().find("#emails").val()));

    },
    helpers: {
        overlay: {
            locked: false
        }
    }
});


$("#modal-email-c").fancybox({
    fitToView   : true,
    width       : '70%',
    height      : '70%',
    autoSize    : true,
    modal       : false,
    beforeShow : function(){
       window.$('html, body').animate({scrollTop : 0},800);
        // window.focus($iframe.contents().find('to'));
    },
    beforeClose: function() {
        // working
        var $iframe = $('.fancybox-iframe');
        // $iframe.contents().find('to').val();
        // console.log($iframe.contents().find("#emails").val());
        $('#bcc').val($iframe.contents().find("#emails").val());
        // alert($('input', $iframe.contents().find("#emails").val()));
    },
    helpers: {
        overlay: {
            locked: false
        }
    }
});

function BtnEditar()
{

	var SESSAO =  getVariavelURL('aUsuarioSessao');
	var FUP =  getVariavelURL('aCodigo');
	
	window.open('pcgs2101_21.asp?aUsuarioSessao='+SESSAO+'&fupid='+FUP,'_self');

}

function preencheSolicitado() {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_06.wso/f_hcgs2101_emissao/JSON",
		data: { 
			sUSUARIOSESSAO: getVariavelURL('aUsuarioSessao'),
			sCodigo: getVariavelURL('aCodigo')
		},
		dataType: "json",
		type: "post"
	}).done(function(data) {

		$('#infoNumeroFup').empty().text(data.numerofup);
		$('#infoCliente').empty().text(data.clientefup);
		$('#infoVendedor').empty().text(data.Participantes);
		$('#infoMarca').empty().text(data.marcafup);
		$('#infoElaborador').empty().text(data.elaboradorfup);
		$('#infoInicio').empty().text(data.fup_start);
		$('#infoTermino').empty().text(data.fup_end);
		$('#solicitadoFup').empty().html(data.solicitadofup);
		$('#localFup').empty().html(data.Local);
		
		// QUANDO TERMINAR DE LER JSON SOLICITADO RODA JSON LOCAL
		preencheMotivos();
	});
}

function preencheMotivos() {
	$.ajax({
		url: "/WVDF_WS/ws_hcgs2101_06.wso/f_hcgs2103_emissao/JSON",
		data: { 
			aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
			sCodigo: getVariavelURL('aCodigo')
		},
		dataType: "json",
		type: "post"
	}).done(function(data) {

		if (data.length > 0) {
			// Primeira etapa - Produtos
			for (p = 0; p <= (data.length - 1); p++) {

				var linhaNovaP = '';
				var linhaNovaM = '';
				var linhaNovaD = '';

				if (data[p].motivos.length > 0){
					linhaNovaP = "<tr><th class='rptL' colspan='11'>" + data[p].prod_ds;
				}
				else{
					linhaNovaP = "<tr><th class='rptL' colspan='12'>" + data[p].prod_ds;
				}

				if (data[p].pot_v !== '' && data[p].pot_t !== '') 
				{ 
					linhaNovaP += " [ " + data[p].pot_v + " - " + data[p].pot_t + " - " + data[p].pot_f + " ]</th>";
				}

				if (data[p].motivos.length > 0) {
					linhaNovaP += "<td class='rptC' id='PFup"+p+"' style='background-color: #f9f9f9;'><i class='fa fa-minus-square'></i></td>";
				}
				
				linhaNovaP += "</tr>";

				// Segunda etapa - Motivos
				linhaNovaM = '0';
				if (data[p].motivos.length > 0) {

					for (m = 0; m <= (data[p].motivos.length - 1); m++) {
						
						// Terceira etapa - Detalhes
						var r = 0;
						linhaNovaD = '0';
						if (data[p].motivos[m].detalhes.length > 0) {

							r = data[p].motivos[m].detalhes.length;
							r = r * 2;
							r = r + 2;

							linhaNovaD  = "<tr class ='DFup"+p+m+" PFup"+p+"'>";
								linhaNovaD  +="<td></td>"; //Numero da Contagem de Detalhes.
								linhaNovaD  +="<td>DATA</td>"; // Data de Criação do Detalhe.
								linhaNovaD  +="<td colspan='2'>SEU CLIENTE</td>";
								linhaNovaD  +="<td>ORIGEM</td>";
								linhaNovaD  +="<td>DESTINO</td>";
								// linhaNovaD  +="<td>TRADE</td>";
								linhaNovaD  +="<td>MERCADORIA</td>";
								linhaNovaD  +="<td colspan='2'>CONCORRENTE</td>";
								// linhaNovaD  +="<td>POTENCIAL</td>";
								// linhaNovaD  +="<td>UNIDADE</td>";
								// linhaNovaD  +="<td>FREQUENCIA</td>";
								linhaNovaD  +="<td colspan='2'>ELABORADOR</td>";
							linhaNovaD  +="</tr>";

							for (d = 0; d <= (data[p].motivos[m].detalhes.length - 1); d++) {

								linhaNovaD +="<tr class ='DFup"+p+m+" PFup"+p+"'>";
									linhaNovaD +="<td class='rptR'>#"+(d+1)+"</td>"; 
									linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].data+"</td>";
									linhaNovaD +="<td colspan='2'>"+data[p].motivos[m].detalhes[d].seuCliente+"</td>";
									linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].origem+"</td>";
									linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].destino+"</td>";
									// linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].trade+"</td>";
									linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].mercadoria+"</td>";
									linhaNovaD +="<td colspan='2'>"+data[p].motivos[m].detalhes[d].concorrente+"</td>";
									// linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].potencial+"</td>";
									// linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].unidade+"</td>";
									// linhaNovaD +="<td>"+data[p].motivos[m].detalhes[d].frequencia+"</td>";
									linhaNovaD +="<td colspan='2'>"+data[p].motivos[m].detalhes[d].elaborador+"</td>";
								linhaNovaD +="</tr>";
								linhaNovaD +="<tr class ='DFup"+p+m+" PFup"+p+"' >";
									linhaNovaD +="<td class='rptR'>NOTES #"+(d+1)+"</td>";
									linhaNovaD +="<td colspan='11' >"+data[p].motivos[m].detalhes[d].comentario+"</td>";
								linhaNovaD +="</tr>";

							} //for (d = 0; d <= (data[p].motivos[m].detalhes.length - 1); d++) {						

						} //if (data[p].motivos[m].detalhes.length > 0) {
						
						if (r > 0) {
							linhaNovaM = "<tr class ='PFup"+p+"'>";
								linhaNovaM +="<td id='rowM"+p+m+"' style='background-color: #f9f9f9;' rowspan='"+r+"'>&nbsp;</td>";
								linhaNovaM += "<td colspan='11'>"+data[p].motivos[m].motivo_ds;
						}
						else {
							linhaNovaM = "<tr class ='PFup"+p+"'>";
								linhaNovaM +="<td id='rowM"+p+m+"' style='background-color: #f9f9f9;'>&nbsp;</td>";
								linhaNovaM += "<td colspan='11'>"+data[p].motivos[m].motivo_ds;
						}

						if (data[p].motivos[m].obs !== "") {
							linhaNovaM += ' [' + data[p].motivos[m].obs + ']';
						}	

						if (data[p].motivos[m].submotivo_ds !== '') {
							linhaNovaM += " <i class='fa fa-arrow-right'></i> "+data[p].motivos[m].submotivo_ds;
						}
						
						linhaNovaM += "</td>";

						// if (r>0) {
						// 	linhaNovaM += "<td class='rptC' id='MFup"+p+m+"' style='background-color: #f9f9f9;'><i class='fa fa-minus-square'></i></td>";
						// }
						
						linhaNovaM += "</tr>";

						if (linhaNovaD !== '0') linhaNovaM += linhaNovaD;

						if (linhaNovaM !== '0') linhaNovaP +=linhaNovaM;
					
					} //for (m = 0; m <= (data[p].motivos.length - 1); m++) {

				} //if (data[p].motivos.length > 0) {

				linhaNovaP += "<tr id='Prods"+ (p+1) +"'><td style='background-color: #f9f9f9;'colspan='12'></td></tr>";

				$('#Prods'+ p).after(linhaNovaP);

			} //for (p = 0; p <= (data.length - 1); p++) {

		} //if (data.length > 0) {
		
	});
}

$(document).on('click', '[id^="MFup"]', function() {
	if (!$(this).children().hasClass('fa-square')){
		if ($(this).children().hasClass('fa-plus-square')) {

			$(this).children().removeClass('fa-plus-square').addClass('fa-minus-square');
			var motivosub = '.DFup' + ($(this).attr('id')).substr(4) + '';
			$(motivosub).show();
			
			var qntdMotivos = $(motivosub).length + 1;
			var rowsAtuais = $('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan');
			var rowsNovos  = (qntdMotivos + parseInt(rowsAtuais));
			
			$('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan', rowsNovos);

		} else {

			$(this).children().removeClass('fa-minus-square').addClass('fa-plus-square');
			var motivosub = '.DFup' + ($(this).attr('id')).substr(4);
			$(motivosub).hide();
			
			var qntdMotivos = $(motivosub).length +1;
			var rowsAtuais = $('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan');
			var rowsNovos  = (parseInt(rowsAtuais) - qntdMotivos);
			
			$('#rowM' + ($(this).attr('id')).substr(4)).attr('rowspan', rowsNovos);

		}
	}
});

$(document).on('click', '[id^="PFup"]', function() {
	if (!$(this).children().hasClass('fa-square')){
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


$(document).on('click', '#btnPrint', function() {

	var url = "PCGS2101_23.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aFup=" + getVariavelURL('aCodigo');
    
    window.open(url,'Report Follow Up', 'width=900px');
    
});
