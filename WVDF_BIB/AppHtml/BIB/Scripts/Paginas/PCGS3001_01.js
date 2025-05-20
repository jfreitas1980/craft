// FORMATA A PAGINA
$(document).ready(function () {
	$('#hcgs3001__codigo').removeClass().addClass('col-xs-3');
	$('#hcgs3001__contabil_cd').removeClass();

	$('[id^="switch-"]').each(function(index, value) {
		var aux = "hcgs3001__" + (value.id).toLowerCase().replace('switch-', '').replace('_checkbox', '');

		configuraSwitchs("", value, aux);
	});

});

$(document).on('click', '[id^=switchop-]', function() {
	var campoOp = "";
	$('[id^="switchop-"]:checked').each(function(index, value) {
		campoOp += $(value).attr('opid') + ",";
	});

	campoOp = campoOp.substr(0, campoOp.length - 1);

	$('#hcgs3001__classe_taxa').val(campoOp);

});


$(document).on('change', '[id^=switch-]', function() {
	aux = "hcgs3001__" + $(this).attr('id').toLowerCase().replace('switch-', '').replace('_checkbox', '');
	configuraSwitchs($(this).prop('checked').toString(), $(this), aux);
});

// ANGULAR JS

app = angular.module('pcgs300101App', []);

app.factory('buscaWS', function($http) {
	return {
		get: function(url, parametros) {
			return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
				return res.data;
			});
		}	
	};
});

app.controller('pcgs300101Controller', function($scope, buscaWS) {
	$scope.listaClasses;

	buscaWS.get('/WVDF_WS/ws_ccgs221.wso/f_class_tx/JSON', '').then(function(data) {
		$scope.listaClasses = data;
		$scope.classes = $('#hcgs3001__classe_taxa').val().split(',');
	});
});