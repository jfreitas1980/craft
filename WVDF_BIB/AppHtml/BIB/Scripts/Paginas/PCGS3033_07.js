// jQuery
$(document).ready(function() {
	$('#dtStart').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy",
		yearRange: "-100:+0"
	}).mask('99/99/9999');

	$('#dtEnd').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy",
		yearRange: "-100:+0"
	}).mask('99/99/9999');

	$("#idProtocolo").keyup(function (e) {
	    if (e.keyCode == 13) {
	        $('#btnFiltrar').click();
	    }
	});

	$("#dsTpContainer").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbccgs217_descricao.asp",
				data: {
					aUsuarioSessao: getVariavelURL('aUsuarioSessao'),
					term: retiraAcento(request.term)
				},
				dataType: "json",
				success: function (data) {
					response(data);
				}
			});
		},
        minLength: 2,
		open: function(e,ui) {
			var termTemplate = '<strong>%s</strong>';
			var acData = $(this).data('uiAutocomplete');
			acData
			.menu
			.element
			.find('a')
			.each(function() {
				var me = $(this);
				var regex = new RegExp(acData.term, "gi");
				me.html(me.text().replace(regex, function (matched) {
					return termTemplate.replace('%s', matched);
				}));
			});
		},
        select: function(event, ui) {
            if (ui.item) {
				$(this).val(ui.item.id);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
	};

	$(document).on('blur', '#dsTpContainer', function() {
		var aux = {};
		aux.id = $(this).val();
		angular.element($('#controller')).scope().montaWS(aux, 'sTp_Cont');
	});
});

// ANGULAR JS
var app = angular.module('pcgs303307App', ['ui.bootstrap']);

app.factory('buscaWS', function($http) {
	return {
		get: function(url, parametros) {
			return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
				return res.data;
			});
		}	
	};
});

app.controller('pcgs303307Controller', function($scope, buscaWS, $http, $filter, $location) {
	acordo = this;

	acordo.camposWS = {};

	$scope.idProtocolo = getVariavelURL('sProtocolo');

	$scope.limparTela = function() {
		$scope.dtStart = $filter('date')(new Date(), "dd/MM/yyyy");
		
		buscaWS.get('/WVDF_WS/ws_hcgs3033.wso/f_calc_dt_val_fim/JSON', 'sVal_ini=' + $scope.dtStart).then(function(data) {
			$scope.dtEnd = data;
		});

		acordo.camposWS.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
		acordo.camposWS.sHCGS3033_ID = ($scope.idAcordo == undefined) ? "" : $scope.idAcordo;
		acordo.camposWS.sPtcol = 0;
		acordo.camposWS.sCSAG308_ID = ($scope.marcas == undefined) ? 0 : $scope.marcas.id;
		acordo.camposWS.sDESCRICAO  = ($scope.descricao == undefined) ? "" : $scope.descricao.id;
		acordo.camposWS.sCSAG340_ID = 0;
		acordo.camposWS.sCSAG345_ID = 0;
		acordo.camposWS.sCSAG342_ID = 0;
		acordo.camposWS.sCSAG343_ID = 0;
		acordo.camposWS.sCSAG346_ID = 0;
		acordo.camposWS.sCSAG349_ID = 0;
		acordo.camposWS.sNamed_Acc = 0;
		acordo.camposWS.sCSAG379_ID = 0;
		acordo.camposWS.sOrg = 0;
		acordo.camposWS.sDtn = 0;
		acordo.camposWS.sPoD = 0;
		acordo.camposWS.sPoR = 0;
		acordo.camposWS.sTp_Cont = "";
		acordo.camposWS.sDTA = 0;
		acordo.camposWS.sVdd_i = $scope.dtStart;
		acordo.camposWS.sVdd_f = $scope.dtEnd;
		acordo.camposWS.sS_Cliente = "";
		acordo.camposWS.sMod_Pagto = "";
		acordo.camposWS.sIMO = 0;
		acordo.camposWS.sRouting = 0;

		$scope.IMO = false;
		$scope.ROUTING = false;
		$scope.idProtocolo = "";
		$scope.dsCliente = "";
		$scope.dsAgente = "";
		$scope.dsArmador = "";
		$scope.dsCiaAerea = "";
		$scope.dsTerminal = "";
		$scope.dsTransportadora = "";
		$scope.dsNamedAccount = "";
		$scope.dsTradeline = "";
		$scope.dsOrigem = "";
		$scope.dsDestino = "";
		$scope.dsDelivery = "";
		$scope.dsReceipt = "";
		$('#dsTpContainer').val("");
		$scope.dsDTA = "";
		$scope.dsSeuCliente = "";

		$('[id^=switchMP').each(function(e, a) {
		  $(a).prop('checked', false);
		});

		console.log(acordo.camposWS);
	};

	buscaWS.get('fbcsag342_descricao.asp', '').then(function(data) {
		$scope.ac342 = data;
	});

	buscaWS.get('fbcsag379_descricao.asp', '').then(function(data) {
		$scope.ac379 = data;
	});

	buscaWS.get('/WVDF_WS/ws_hcgs3029.wso/f_combo_marcas/JSON', '').then(function(data) {
		$scope.listaMarcas = data;
		$scope.marca = data[0].id;
	});
	
	buscaWS.get('/WVDF_WS/ws_ccgs225.wso/f_CCGS225_combo/JSON', '').then(function(data) {
		$scope.listaDescricao = data;
	});

	$scope.$watch('idAcordo', function(novo) {
		if (novo != undefined)
			acordo.camposWS.sHCGS3033_ID = novo;

		if (novo == "")
    	acordo.camposWS.sHCGS3033_ID = "";
	});

	$scope.$watch('idProtocolo', function(novo) {
		if (novo != undefined)
    	acordo.camposWS.sPtcol = novo;

  	if (novo == "")
    	acordo.camposWS.sPtcol = 0;
	});

  $scope.$watch('marcas', function(novo) {
  	if (novo != undefined)
  		acordo.camposWS.sCSAG308_ID = novo.id;
  });
  
  $scope.$watch('descricao', function(novo) {
  	if (novo != undefined)
  		acordo.camposWS.sDESCRICAO = novo;
  });

  $scope.$watch('dsSeuCliente', function(novo) {
  	if (novo != undefined)
  		acordo.camposWS.sS_Cliente = novo;
  });

  $scope.$watch('dtStart', function(novo) {
  	if (novo != undefined)
  		acordo.camposWS.sVdd_i = novo;
  });

  $scope.$watch('dtEnd', function(novo) {
  	if (novo != undefined)
  		acordo.camposWS.sVdd_f = novo;
  });

	$scope.acCliente = function(texto) {
		return buscaWS.get('fbcsag340_clientevsuser.asp', 'term='+texto).then(function(data) {
			return data;
		});
	};

	$scope.acAgente = function(texto) {
		return buscaWS.get('fbcsag345_descricao.asp', 'term='+texto).then(function(data) {
			return data;
		});
	};

	$scope.acArmador = function(texto) {
		return buscaWS.get('fbcsag342_descricao.asp', 'term='+texto).then(function(data) {
			return data;
		});
	};

	$scope.acCiaAerea = function(texto) {
		return buscaWS.get('fbcsag343_descricao.asp', 'term='+texto).then(function(data) {
			return data;
		});
	};

	$scope.acTerminal = function(texto) {
		return buscaWS.get('fbcsag346_descricao.asp', 'term='+texto).then(function(data) {
			return data;
		});
	};

	$scope.acTransportadora = function(texto) {
		return buscaWS.get('fbcsag349_descricao.asp', 'term='+texto).then(function(data) {
			return data;
		});
	};

	$scope.acTradeline = function(texto) {
		return buscaWS.get('fbcsag379_descricao.asp', 'term='+texto).then(function(data) {
			return data;
		});
	};

	$scope.acContainer = function(texto) {
		return buscaWS.get('fbccgs217_descricao.asp', 'term='+texto).then(function(data) {
			return data;
		});
	};

	$scope.acCidades = function(texto) {
		return buscaWS.get('fbcsag325_descricao.asp', 'term='+texto).then(function(data) {
			return data;
		});
	};
	
	$scope.montaWS = function($item, $campo) {
		acordo.camposWS[$campo] = $item.id;
		console.log(acordo.camposWS);
	}

	$scope.gerarAcordo = function() {
		acordo.camposWS.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
		acordo.camposWS.sCSAG308_ID = ($scope.marcas == undefined) ? "" : $scope.marcas;
		acordo.camposWS.sDESCRICAO = ($scope.descricao == undefined) ? "" : $scope.descricao;
		acordo.camposWS.sCCGS210_ID	= getVariavelURL('s210');
		acordo.camposWS.sCCGS216_ID	= getVariavelURL('s216');
		acordo.camposWS.sCSAG329_ID	= getVariavelURL('s329');
		acordo.camposWS.sIMO = ($scope.IMO) ? 1 : 0;
		acordo.camposWS.sRouting = ($scope.ROUTING) ? 1 : 0;

		$('#selMarca').val("string:" + acordo.camposWS.sCSAG308_ID);
		if (acordo.camposWS.sCSAG308_ID == "") {
			parent.parent.parent.alertify.error('Selecione uma marca!');
			return;
		}

		if (acordo.camposWS.sMod_Pagto == "") {
			parent.parent.parent.alertify.error('Selecione pelo menos uma modalidade de pagamento!');
			return;
		}

		console.log(acordo.camposWS);

		$http({
			url: '/WVDF_WS/ws_hcgs3033.wso/f_sv_acordo/JSON',
			method: 'GET',
			params: acordo.camposWS
		}).then(function(data) {
			
			if ((data.data.MSG).substr(0, 4) == "ERR#") {
				parent.parent.parent.alertify.error(data.data.MSG.substr(4));
				return;
			}

			$scope.idAcordo    = (data.data.ID);
			$scope.idProtocolo = (data.data.PTC);
			parent.parent.parent.alertify.success(data.data.MSG + "<br /><b>Protocolo: " + data.data.PTC + "</b>");
		});

	};

	$scope.novoAcordo = function() {
		$scope.idAcordo = "";
		$scope.limparTela();
	};

	$scope.posicionaAcordo = function() {
		console.log(acordo.camposWS);
		buscaWS.get('/WVDF_WS/ws_hcgs3033.wso/f_busca_acd/JSON', 'sProt=' + $scope.idProtocolo).then(function(data) {
			// Acordo
			acordo.camposWS.sHCGS3033_ID = data.s3033_ID;
			$scope.idAcordo = data.s3033_ID;
			
			// Protocolo
			acordo.camposWS.sPtcol = data.PROTOCOLO_ID;
			$scope.idProtocolo = data.PROTOCOLO_ID;

			// Marca
			acordo.camposWS.sCSAG308_ID = data.s308_ID;
			$('#selMarca').val("string:" + data.s308_ID);
			
			// Descricao
			acordo.camposWS.sDESCRICAO = data.sDESCRICAO;
			$('#selDescricao').val("string:" + data.sDESCRICAO);

			// Cliente
			acordo.camposWS.sCSAG340_ID = data.s340_ID;
			$scope.dsCliente = data.s340_DS;

			// Agente
			acordo.camposWS.sCSAG345_ID = data.s345_ID;
			$scope.dsAgente = data.s345_DS;

			// Armador
			acordo.camposWS.sCSAG342_ID = data.s342_ID;
			$scope.dsArmador = data.s342_DS;
			
			// Cia Aerea
			acordo.camposWS.sCSAG343_ID = data.s343_ID;
			$scope.dsCiaAerea = data.s343_DS;
			
			// Terminal
			acordo.camposWS.sCSAG346_ID = data.s346_ID;
			$scope.dsTerminal = data.s346_DS;
			
			// Transportadora
			acordo.camposWS.sCSAG349_ID = data.s349_ID;
			$scope.dsTransportadora = data.s349_DS;

			// Named Account
			acordo.camposWS.sNamed_Acc = data.NAC_ID;
			$scope.dsNamedAccount = data.NAC_DS;
			
			// Tradeline
			acordo.camposWS.sCSAG379_ID = data.s379_ID;
			$scope.dsTradeline = data.s379_DS;
			
			// Origem
			acordo.camposWS.sOrg = data.ORIGEM_ID;
			$scope.dsOrigem = data.ORIGEM_DS;
			
			// Destino
			acordo.camposWS.sDtn = data.DESTINO_ID;
			$scope.dsDestino = data.DESTINO_DS;
			
			// PoD
			acordo.camposWS.sPoD = data.POD_ID;
			$scope.dsDelivery = data.POD_DS;

			// PoR
			acordo.camposWS.sPoR = data.POR_ID;
			$scope.dsReceipt = data.POR_DS;
			
			// Tipos de Container
			acordo.camposWS.sTp_Cont = data.s217_ID;
			$('#dsTpContainer').val(data.s217_ID);
			
			// DTA
			acordo.camposWS.sDTA = data.DTA_ID;
			$scope.dsDTA = data.DTA_DS;
			
			// Data de
			acordo.camposWS.sVdd_i = data.DT_VALIDADE_I;
			$scope.dtStart = data.DT_VALIDADE_I;
			
			// Data até
			acordo.camposWS.sVdd_f = data.DT_VALIDADE_F;
			$scope.dtEnd = data.DT_VALIDADE_F;

			// Seu Cliente
			acordo.camposWS.sS_Cliente = data.SC_DS;
			$scope.dsSeuCliente = data.SC_DS;

			// Mod. Pagamento
			$('[id^=switchMP').each(function(e, a) {
			  $(a).prop('checked', false);
			});

			aux = data.MOD_PAGMENTO_ID;
			aux = aux.split(',');

			campoMP = "";

			for (x in aux) {
				$('#switchMP-' +aux[x] + '_checkbox').prop('checked', true);
				campoMP += aux[x] + ',';
			}

			campoMP = campoMP.substr(0, campoMP.length - 1);
			acordo.camposWS.sMod_Pagto = campoMP;

			// IMO
			acordo.camposWS.sIMO = data.IMO_ID;
			$scope.IMO = (data.IMO_ID == 1) ? true : false;
		
			// Routing
			acordo.camposWS.sRouting = data.ROUTING_ID;
			$scope.ROUTING = (data.ROUTING_ID == 1) ? true : false;
		});
		console.log(acordo.camposWS);
	}; 

	$scope.clickModPagamento = function () {
	
		var campoMP = "";
		
		$('[id^="switchMP-"]:checked').each(function(index, value) {
			campoMP += $(value).attr('mp') + ",";
		});

		campoMP = campoMP.substr(0, campoMP.length - 1);

		acordo.camposWS.sMod_Pagto = campoMP;
	};

	$scope.exibirTaxas = function() {
		console.log(acordo.camposWS);
		src = "PCGS3033_05.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&sHCGS3033=" + acordo.camposWS.sHCGS3033_ID;
  		
  		parent.$('#ifrm3').attr('src', src);
  		parent.$('#pagina3').click();
	};

	if ($scope.idProtocolo != "") {
		$scope.posicionaAcordo();
		console.log(acordo);
	} else {
		$scope.limparTela();
	}
	
});