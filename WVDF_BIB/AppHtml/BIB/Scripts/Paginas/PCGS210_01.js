$(document).ready(function() {
	configuraSwitchs("", $('#switch-ANUAL_AWB_checkbox'), 'ccgs210__anual_awb');
	configuraSwitchs("", $('#switch-ANUAL_TEUS_checkbox'), 'ccgs210__anual_teus');
	configuraSwitchs("", $('#switch-ANUAL_CBM_checkbox'), 'ccgs210__anual_cbm');
	configuraSwitchs("", $('#switch-ANUAL_HBL_checkbox'), 'ccgs210__anual_hbl');
	configuraSwitchs("", $('#switch-ANUAL_TON_checkbox'), 'ccgs210__anual_ton');
	configuraSwitchs("", $('#switch-FOLLOW_UP_checkbox'), 'ccgs210__follow_up');

	$('#ccgs210__observacao').blur(function(){
		TextAreaLimite(this,1022);
	});

	$(document).on('click', '#btnTelaDois', function () {
		$("#ifrm-pcgs3029_05").attr({
			"src" : "PCGS3029_05.asp?aUsuarioSessao=" + $('#jaUsuarioSessao').val()
		});
	});
	
	$(document).on('click', '#btnTelaTres', function () {
		$("#ifrm-pcgs3029_00").attr({
			"src" : "PCGS3029_02.asp?aUsuarioSessao=" + $('#jaUsuarioSessao').val()
		});
	});

	$('#iframeremarks').attr('src', $('#iframeremarks').attr('src'));
	$('#iframelegal').attr('src', $('#iframelegal').attr('src'));

	if ($('#ccgs210__codigo').val() == 0)
		$('#tabs').hide();
});

$(document).on('change', '#switch-ANUAL_AWB_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'ccgs210__anual_awb');
});
$(document).on('change', '#switch-ANUAL_TEUS_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'ccgs210__anual_teus');
});
$(document).on('change', '#switch-ANUAL_CBM_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'ccgs210__anual_cbm');
});
$(document).on('change', '#switch-ANUAL_HBL_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'ccgs210__anual_hbl');
});
$(document).on('change', '#switch-ANUAL_TON_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'ccgs210__anual_ton');
});
$(document).on('change', '#switch-FOLLOW_UP_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'ccgs210__follow_up');
});
$(document).on('click', '[id^=switch-op]', function() {
	var campoOp = "";
	$('[id^="switch-op"]:checked').each(function(index, value) {
		campoOp += $(value).attr('opid') + ",";
	});

	campoOp = campoOp.substr(0, campoOp.length - 1);

	$('#ccgs210__operacao').val(campoOp);

});
$(document).on('click', '[id^=switch-mf]', function() {
	var campoMf = "";
	$('[id^="switch-mf"]:checked').each(function(index, value) {
		campoMf += $(value).attr('mfid') + ",";
	});

	campoMf = campoMf.substr(0, campoMf.length - 1);

	$('#ccgs210__modal_freight').val(campoMf);

});

// ANGULAR JS

app = angular.module('pcgs21001App', []);

app.factory('buscaWS', function($http) {
	return {
		get: function(url, parametros) {
			return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
				return res.data;
			});
		}	
	};
});

app.controller('pcgs21001Controller', function($scope, buscaWS) {
	$scope.listaOperacoes;

	buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_opc/JSON', '').then(function(data) {
		$scope.listaOperacoes = data;
		$scope.operacoes = $('#ccgs210__operacao').val().split(',');
	});
	$scope.listamdlfreight;

	buscaWS.get('/WVDF_WS/ws_ccgs202.wso/f_combo_ccgs202/JSON', '').then(function(data) {
		$scope.listamdlfreight = data;
		$scope.mdlfreights = $('#ccgs210__modal_freight').val().split(',');
	});
});