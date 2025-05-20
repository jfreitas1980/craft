var jsOK = 1;
var jCsag320Id;

// PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
// FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
$('document').ready( function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
	jCsag320Id = $('#jCsag320Id').val();
	$("#csag342__csag320_id").val(jCsag320Id);
	
	// ZERA SWITCHS
	switchColoader("");
	switchArmador("");
	
	// ESCONDE BOTÃO NOVO E PESQUISAR.
	$('#btnNovo').hide();
	$('#btnPesquisar').hide();

	$('#csag342__observacao').blur(function(){
		TextAreaLimite(this,1022);
	});


	$('#dtInicio').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy",
		yearRange: "-100:+0"
	}).mask('99/99/9999');

	$('#dtFim').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy",
		yearRange: "-100:+0"
	}).mask('99/99/9999');

});    

// SWITCH COLOADER
$(document).on('change', '#switchColoader', function() {
	$(this).prop("checked") ? switchColoader("S") : switchColoader("N");
});
function switchColoader(sTexto) {
	if (sTexto != "") {
		(sTexto == "S") ? $('#switchColoader').prop("checked", true) : $('#switchColoader').prop("checked", false);
		$('#csag342__coloader').val(sTexto);
	} else {
		if ($('#csag342__coloader').val() != "") {
			switchColoader($('#csag342__coloader').val());
		} else {
			switchColoader($('#csag342__coloader').val("N").val());
		}
	}
}

// SWITCH ARMADOR
$(document).on('change', '#switchArmador', function() {
	$(this).prop("checked") ? switchArmador("S") : switchArmador("N");
});
function switchArmador(sTexto) {
	if (sTexto != "") {
		(sTexto == "S") ? $('#switchArmador').prop("checked", true) : $('#switchArmador').prop("checked", false);
		$('#csag342__armador').val(sTexto);
	} else {
		if ($('#csag342__armador').val() != "") {
			switchArmador($('#csag342__armador').val());
		} else {
			switchArmador($('#csag342__armador').val("N").val());
		}
	}
}

// AngularJS
var app = angular.module('pag34201App', ['ui.bootstrap', 'smart-table']);

app.factory('buscaWS', function($http) {
	return {
		get: function(url, parametros) {
			return $http.get(url + '?aUsuarioSessao=' + getVariavelURL('aUsuarioSessao') + '&' + parametros).then(function(res) {
				return res.data;
			});
		}	
	};
});

app.filter('customArray', function($filter){
    return function(list, arrayFilter, element){
        if(arrayFilter){
            return $filter("filter")(list, function(listItem){
                return arrayFilter.indexOf(listItem[element]) != -1;
            });
        }
    };
});

app.controller('acordosController', function($scope, buscaWS, $sce, $http) {
	$scope.paginaAtual = 1;
	$scope.mostrarVoltar = false;

	$scope.zerarTela = function() {
		$scope.listaOperacoes = '';

		$scope.acordo             = {};
		$scope.acordo.protocolo   = "";
		$scope.acordo.produto     = "";
		$scope.acordo.modalidades = "";
		$scope.acordo.marca       = "";
		$scope.acordo.destino     = "";
		$scope.acordo.containers  = "";
		$scope.acordo.dtInicio    = "";
		$scope.acordo.dtFim       = "";
	};

	$scope.zerarTela();

	// Lista Acordos
	$scope.listaAcordos = function() {
		buscaWS.get('/WVDF_WS/WS_hcgs3033.wso/f_acordos_gerais/JSON', 'aCODIGO=' + getVariavelURL('aCSAG320Id') + '&aTIPO=AR').then(function(data) {
			$scope.lsAcordos = data;
		});	
	};

	$scope.listaAcordos();

	// Lista Modalidades de Frete
	buscaWS.get('/WVDF_WS/ws_ccgs202.wso/f_combo_ccgs202/JSON', '').then(function(data) {
		$scope.lsModalidades = data;
	});

	// Lista Produtos
	buscaWS.get('/WVDF_WS/WS_HCGS3029.wso/f_combo_prod/JSON', '').then(function(data) {
		$scope.lsProdutos = data;
	});

	// Lista Marcas
	buscaWS.get('/WVDF_WS/WS_HCGS3029.wso/f_combo_marcas/JSON', '').then(function(data) {
		$scope.lsMarcas = data;
	});

	// Lista Containers
	buscaWS.get('/WVDF_WS/ws_CCGS217.wso/f_CCGS217_lista/JSON', '').then(function(data) {
	    $scope.lsContainers = data;
	});

	// Lista Taxas
	buscaWS.get('/WVDF_WS/ws_hcgs3001.wso/f_lista_HCGS3001/JSON', '').then(function(data) {
	    $scope.lsTaxas = data;
	});

	// AutoComplete Cidades
	$scope.acCidades = function(texto) {
		return buscaWS.get('fbcsag325_descricao.asp', 'term='+texto).then(function(data) {
			return data;
		});
	};

	// Função para WS gerar acordo.
	$scope.gerarAcordo = function(oAcordo) {

		var parametros = {};
		parametros = angular.copy(oAcordo);
		parametros.aUsuarioSessao = getVariavelURL('aUsuarioSessao');
		parametros.destino = (oAcordo.destino.id != undefined) ? (oAcordo.destino.id) : "";
		parametros.Tipo = "AR";
		parametros.ID_320 = getVariavelURL('aCSAG320Id');

		// Containers
	    parametros.containers = "";
	    
	    if (oAcordo.containers.length > 0) {
		    oAcordo.containers.forEach(function(item) {
		      parametros.containers += item + ",";
		    });

	    	parametros.containers = parametros.containers.substring(0, parametros.containers.length - 1);
	    }

	    // Modalidades
	    parametros.modalidades = "";
	    
	    if (oAcordo.modalidades.length > 0) {
		    oAcordo.modalidades.forEach(function(item) {
		      parametros.modalidades += item + ",";
		    });
		    
		    parametros.modalidades = parametros.modalidades.substring(0, parametros.modalidades.length - 1);
		}

		$http({
		    url: '/WVDF_WS/ws_HCGS3033.wso/f_single_save/JSON', 
		    method: 'GET',
		    params: parametros
		}).then(function(data) {
			oAcordo.protocolo = data.data;
			$scope.listaAcordos();
		});
	};

	$scope.posicionaAcordo = function(acordo) {
		buscaWS.get('/WVDF_WS/WS_hcgs3033.wso/f_acd_click/JSON', 'idAcordo=' + acordo.ID_ACORDO).then(function(data) {
			$scope.acordo.id          = data.id;
			$scope.acordo.protocolo   = data.protocolo;
			$scope.acordo.produto     = data.produto;
			$scope.acordo.modalidades = data.modalidades.split(",");
			$scope.acordo.marca       = data.marca;
			$scope.acordo.destino     = data.destino;
			$scope.acordo.containers  = data.containers.split(",");
			$scope.acordo.dtInicio    = data.dtInicio;
			$scope.acordo.dtFim       = data.dtFim;

			$scope.acordo.taxas       = data.taxas.split(",");

		});	
	}

	$scope.changeTaxas = function(taxasSelecionadas) {
		$scope.loadingState = true;
		console.log(taxasSelecionadas);

		var aux = "";

		taxasSelecionadas.forEach(function(taxa) {
			aux += taxa + ",";
		});

		aux = aux.substring(0, aux.length - 1);

		buscaWS.get('/WVDF_WS/ws_hcgs3034.wso/f_save_taxs/JSON', 'aProtocolo=' + $scope.acordo.protocolo + '&aTax=' + aux).then(function(data) {
			console.log(data);
			$scope.loadingState = false;
		});
	}

	$scope.clickTaxasAcordadas = function(taxa) {
		console.log(taxa);
		debugger;
		$scope.loadingState = true;
		buscaWS.get('/WVDF_WS/ws_hcgs3034.wso/f_hcgs3034_rowid/JSON', 'idAcordo=' + $scope.acordo.id + '&aTax=' + taxa.ID).then(function(rowIds) {

			buscaWS.get('/WVDF_WS/WS_hcgs3033.wso/f_prod_hcgs3033/JSON', 'sHCGS3033_ID=' + $scope.acordo.id).then(function(operacoes) {
				$scope.listaOperacoes = operacoes.split(',');
				a = taxa.ID.substring(0, taxa.ID.length - 1)

				src = "PCGS3035_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aHCGS3034Id=" + rowIds.id3034 + "&aHCGS3033Id="+ $scope.acordo.id +"&RowId=" + rowIds.r3035;
				$('#iframe-pcgs3035_01').attr('src', src);

				src = "PCGS3036_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aHCGS3034Id=" + rowIds.id3034 + "&aHCGS3033Id="+ $scope.acordo.id +"&RowId=" + rowIds.r3036;
				$('#iframe-pcgs3036_01').attr('src', src);

				src = "PCGS3037_01.asp?aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aHCGS3034Id=" + rowIds.id3034 + "&aHCGS3033Id="+ $scope.acordo.id +"&RowId=" + rowIds.r3037;
				$('#iframe-pcgs3037_01').attr('src', src);
				$scope.loadingState = false;
			});
		});


	};

	$scope.clickTabela = function(oAcordo) {
		$scope.linha = oAcordo.ID_PROTOCOLO;
		$scope.urlBaixo = $sce.trustAsResourceUrl("http://2wapps2.dyndns.org/WEB_BLU/PCGS3033_07_01.asp?aUsuarioSessao="+getVariavelURL("aUsuarioSessao") + "&sCliente=" + getVariavelURL('aCSAG320Id') + "&sProtocolo=" + oAcordo.ID_PROTOCOLO);
	};

	$scope.novoAcordo = function() {
		$scope.linha = "";
		$scope.urlBaixo = $sce.trustAsResourceUrl("http://2wapps2.dyndns.org/WEB_BLU/PCGS3033_07.asp?aUsuarioSessao="+getVariavelURL("aUsuarioSessao") + "&sCliente=" + getVariavelURL('aCSAG320Id'));		
	};

	$scope.setUrlBaixo = function(sUrl) {
		$scope.urlBaixo = $sce.trustAsResourceUrl(sUrl);
		console.log($scope.urlBaixo);		
	}
});