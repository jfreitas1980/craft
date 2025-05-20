$(document).ready(function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
	
	// if (getVariavelURL('Sched') == "1") {
		// if (getVariavelURL('RowId')) {
			// $("#ifrm-pcgs2101_01").attr({
				// "src" : "PCGS2101_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&Sched=1&RowId=" + getVariavelURL('RowId') + "&aCSAG340Id=" + getVariavelURL('aCSAG340Id')
			// });			
			
		// } else {
			// $("#ifrm-pcgs2101_01").attr({
				// "src" : "PCGS2101_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&Sched=1&Data=" + getVariavelURL('Data')
			// });
		// }
	// } else {
		// $("#ifrm-pcgs2101_01").attr({
			// "src" : "PCGS2101_02.asp?RunReport=1&aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aCSAG320Id=" + getVariavelURL('aCSAG320Id') 
		// });
	// }
	
	//blur
    // $('#idCliente').blur(function(){
            // monta_marca();
    // }); // $('#idCliente').blur
	
});

// function monta_marca(){
	
	// var aCliente = $('#idCliente').val();
	// var aUsuarioSessao = $('#jaUsuarioSessao').val();
	// var aMarca = $('#idMarca').val();
	
	// var sRetorno = ReadFuncValue('idMarca'+'","'+aMarca+'","'+aUsuarioSessao+'","'+aCliente,"oPAG308_01","Get_fCSAG308_fup");
	
	// $('#jsmarca').html(sRetorno);
	
// }

$(document).on('click', '[id^=switch-op]', function() {
	var campoOp = "";
	$('[id^="switch-op"]:checked').each(function(index, value) {
		campoOp += $(value).attr('opid') + ",";
	});

	campoOp = campoOp.substr(0, campoOp.length - 1);

	$('#ProdId').val(campoOp);

});
// $(document).on('click', '[id^=switch-mf]', function() {
	// var campoMf = "";
	// $('[id^="switch-mf"]:checked').each(function(index, value) {
		// campoMf += $(value).attr('mfid') + ",";
	// });

	// campoMf = campoMf.substr(0, campoMf.length - 1);

	// $('#ccgs210__modal_freight').val(campoMf);

// });

// ANGULAR JS
app = angular.module('pcgs210100App', []);

app.factory('buscaWS', function($http) {
	return {
		get: function(url, parametros) {
			return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
				return res.data;
			});
		}	
	};
});

app.controller('pcgs210100Controller', function($scope, buscaWS) {
	$scope.listaProdutos;

	buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_prod/JSON', '').then(function(data) {
		$scope.listaProdutos = data;
		$scope.produto = $('#ProdId').val().split(',');
	});
	// $scope.listamdlfreight;

	// buscaWS.get('/WVDF_WS/ws_ccgs202.wso/f_combo_ccgs202/JSON', '').then(function(data) {
		// $scope.listamdlfreight = data;
		// $scope.mdlfreights = $('#ccgs210__modal_freight').val().split(',');
	// });
});
 

