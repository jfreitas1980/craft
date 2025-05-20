var app = angular.module('myApp', ['ngTable', 'ngRoute',  'crmLibrary', 'ui.bootstrap']);

app.controller('crmController', function ($scope, $http, NgTableParams, crmLibrary, $filter, $window,  $location,$sce) {


	$scope.tpDocPais;
	$scope.selectedDoc;

	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};




$scope.btnTimeline = '';
     $scope.urlTimelinPendencia = "";
	$scope.cliente_cnpj = "";
	$scope.iconOK = 'fas fa-plus-circle';
	$scope.iconLoading = 'fa fa-spinner fa-spin';
	$scope.btnBuscarClasse = $scope.iconLoading;
	$scope.clienteDados = {};
	$scope.showAlert = "none";
	$scope.mostraTextDoc = "block";
	$scope.mostraComboDoc = "none";
	$scope.checkProspect = false;
	$scope.tipoCadastro;
	$scope.selectedComboPessoa;
	$scope.tpWell;
	$scope.mostraWell = "none";
	$scope.msgWell;
	$scope.mostraPendencia = 'none';
	$scope.modalEditaCliente = '';
	$scope.iconAtivo = 'far fa-check-circle';
	$scope.iconInativo = 'far fa-times-circle';
	$scope.clienteDadosEdicao = {};
	$scope.iconStatusCross;
	var receitaURL = 'multilog';
	$scope.btnBuscaEnable = 'false';
	$scope.clienteStatusCraft = "";
	$scope.enableEnderecoEdit = true ;
	$scope.dismiss = '';
	$scope.showBuscaNotFound = 'none';
	$scope.clienteDadosManual = {};
	$scope.loadingScreen = false;
	$scope.disableTipoCadastro = true;
	$scope.disableBusca = true;
$scope.observacaoCadastro = '';
	$scope.urlAPI = '';
$scope.fotografia = '';


	$scope.redirect = function (value) {
		value = value + '?aUsuarioSessao=' + $scope.sessao;
		console.log(value);
		$window.location.href = value;
	}

$scope.buscarApiCRM = function()
{

var url = $scope.baseUrl+'/WVDF_WS/ws_hcgs3004.wso/buscarCrm/json'
console.log('url', url);
//alert(url);
  $http({
        method : "GET",
        url : url,
    }).then(function mySuccess(response) {
        // console.log(response.data.ID);
         $scope.urlApiCRM =response.data.ID;
           $scope.urlApiCRM+'api/';
           alert(  $scope.urlApiCRM);
         return $scope.urlApiCRM;
    }, function myError(response) {
 parent.parent.alert.error("Erro de comunicação com o servidor." + response.data);
    });
}





angular.element(document).ready(function () {
$scope.sessao = getParameterByName('aUsuarioSessao');
$scope.idCliente = getParameterByName('idCliente');

 $scope.baseUrl = new $window.URL($location.absUrl()).origin;
console.log('base url',$scope.baseUrl);

$scope.urlAPI = crmLibrary.UrlAPI;

$scope.getFotografia();

 $scope.urlGrupoEconomico = "crm_grupo_economico.html?documento="+ $scope.doc;
 console.log($scope.urlGrupoEconomico);
});




	$scope.paises = [];
//	$scope.selectedPais;

	function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
	
	
	$scope.getPaises = function (value) {
				 	$scope.disableBusca = true;
				 		 	$scope.clienteDados = {};
				 		 	$scope.cliente_cnpj = "";
			 	$scope.selectedDoc="";
			 	$scope.mostraTextDoc = "block";
			 	$scope.mostraComboDoc = "none";
			 	$scope.disableTipoCadastro = true;
$("select#tipoCadastroSelect")[0].selectedIndex = 0;

		console.log($scope.paises);
		var url = $scope.urlAPI + 'crm/pais/' + value;
		console.log(url);
		console.log(url);
			$scope.loadingScreen = true;

		return $http.get(url)
		.then(function (response) {
			console.log(response.data);
			$scope.loadingScreen = false;

			return response.data;

		}, function (response) {
			 	$scope.clienteDados = {};
			 	$scope.selectedDoc="";
			 	$scope.mostraTextDoc = "block";
			 	$scope.mostraComboDoc = "none";
			 	$scope.cliente_cnpj = "";
				$scope.loadingScreen = false;
    });
	}


$scope.populaLogComex = function()
{
	$scope.tableLogComex = new NgTableParams({
			page: 1,
			count: 5
		}, {
			counts: [5, 10, 20, 50],
			dataset: $scope.fotografia.logComex
		});
}

$scope.populaBudget = function()
{
	$scope.tableBudget = new NgTableParams({
			page: 1,
			count: 5
		}, {
			counts: [5, 10, 20],
			dataset: $scope.fotografia.budget
		});
}



$scope.populaDataliner= function()
{
	console.log('dataliner:',  $scope.fotografia.dataliner);
	$scope.tableDataliner = new NgTableParams({
			page: 1,
			count: 5
		}, {
			counts: [5, 10, 20, 50],
			dataset: $scope.fotografia.dataliner
		});
}

$scope.populaControleDiario= function()
{
	$scope.ControleDiarioTab = new NgTableParams({
			page: 1,
			count: 5
		}, {
			counts: [5, 10, 20, 50],
			dataset: $scope.fotografia.controleDiario
		});
}

$scope.populaEmbarcadosChegados= function()
{
	$scope.embarcadosTab = new NgTableParams({
			page: 1,
			count: 5
		}, {
			counts: [5, 10, 20, 50],
			dataset: $scope.fotografia.embarcadosChegados
		});
}

$scope.populaTableAssigncao = function()
{

     $scope.tableAssignacao = new
  NgTableParams( 
  {
    page: 1,
    count: 5
  },
  {
    counts: [ 5, 10, 20 ],
    dataset: $scope.fotografia.assignacaoComercial
  } );

}


$scope.populaTerminal = function()
{
	$scope.terminalTab = new NgTableParams({
			page: 1,
			count: 5
		}, {
			counts: [5, 10, 20, 50],
			dataset: $scope.fotografia.terminal
		});
}


	
	
	$scope.getFotografia = function () {
		$scope.loadingScreen = true;
		console.log($scope.paises);
		var url = $scope.urlAPI + 'crm/fotografiaCliente/' + $scope.idCliente+'/'+$scope.sessao;
console.log(url);
 $http.get(url)
		.then(function (response) {
			console.log(response.data);
		    $scope.fotografia = response.data;
		    $scope.populaLogComex();
	$scope.populaControleDiario();
	$scope.populaTerminal();
	$scope.populaEmbarcadosChegados();
	$scope.populaTableAssigncao();
	$scope.populaLogComex();
	$scope.populaBudget();
	console.log('receita', $scope.fotografia.receitaInfo);
	
	if ($scope.fotografia.receitaInfo !=null) 
	{
	 console.log($scope.fotografia.receitaInfo.cnpj);
	 if ($scope.fotografia.receitaInfo.cnpj!=null && $scope.fotografia.receitaInfo.cnpj!= undefined) 
	 {
	 	     $scope.doc =  $scope.fotografia.receitaInfo.cnpj.replace(/[\/.-]/g, "").trim();
             $scope.urlGrupoEconomico = "crm_grupo_economico.html?documento="+ $scope.doc;
            $scope.urlSerasaRelatoMais = "crm_serasa_relatoMais.html?documento="+ $scope.doc+ "&aUsuarioSessao=" + $scope.sessao+"&busca=false";
	 }
	 else
	 {
	 	parent.parent.alertify.error("Cliente não possui documento válido, não possível buscar informaçoes da Receita Federal.");
	 }

	}


		$scope.populaDataliner();
			    console.log(  $scope.fotografia );
			    		$scope.loadingScreen = false;

		}, function (response) {
						    		$scope.loadingScreen = false;


    });
	}

	$scope.getEmpresas = function (value) {

			   value = value.replace(/[\/.-]/g, "").trim();
		$scope.loadingScreen = true;

		if ($scope.tipoCadastro == null|| $scope.tipoCadastro == undefined || $scope.tipoCadastro == '') 
		{
			parent.parent.alertify.error("Seleciona um tipo de Cadastro.");
			return;
		}
						    $scope.clienteDados = {};
				    $scope.clienteDadosEdicao = {};
				    $scope.clienteDadosManual = {};
				    $scope.mostraPendencia = 'none';
				     $scope.mostraWell = 'none';
				     console.log('pais', $scope.selectedPais);
				     if ($scope.selectedPais == null || $scope.selectedPais == undefined || $scope.selectedPais == '')  
				     {
				        $scope.cliente_cnpj = "";
				     	parent.parent.alertify.error("Seleciona um País.");
								$scope.loadingScreen = false;

				     	return;
				     }
		console.log('value', value);
		if (value != undefined || value != '') { 
	
			console.log($scope.paises);

			var url = $scope.urlAPI + 'crm/pessoa/' + value + '/' + $scope.selectedDoc.id_documento;
			console.log(url);
			console.log(url);
			return $http.get(url)
			.then(function (response) {
				$scope.loadingScreen = false;
				if(response.data.length>0)
				{
					$scope.btnBuscaEnable = true;
					$scope.showBuscaNotFound = 'none';
				}
				else
				{
					$scope.loadingScreen = false;
					$scope.btnBuscaEnable = false;
				    $scope.showBuscaNotFound = 'block';
				    $scope.clienteDados = {};
				    $scope.clienteDadosEdicao = {};
				    $scope.clienteDadosManual = {};
				    $scope.mostraPendencia = 'none';
				    $scope.mostraWell = 'none';

				   // $scope.tablePendencia.settings().dataset = [];
                    //$scope.tablePendencia.reload();
				}
				console.log(response.data);
				return response.data;
			} , function (response) {
			// $scope.showBuscaNotFound = 'block';
				$scope.loadingScreen = false;
			 	$scope.clienteDados = {};
    });
		}
		else
		{
			$scope.clienteDados = {};
			$scope.loadingScreen = false;

			return null;
		}
	}
	
		$scope.getCEP = function () {
			var value = $scope.clienteDadosEdicao.cep;
		if (value != undefined || value != '') { 
			console.log($scope.paises);
			var url = $scope.urlAPI + 'crm/pais/cep/' + value;
			console.log(url);
			return $http.get(url)
			.then(function (response) {
				console.log('cep',response.data);
				var r = response.data;
			    $scope.clienteDadosEdicao.tipo = r.tipo;
				$scope.clienteDadosEdicao.uf = r.uf;
				$scope.clienteDadosEdicao.bairro = r.bairro;
				$scope.clienteDadosEdicao.logradouro = r.d_LOGRADOURO;
				$scope.clienteDadosEdicao.municipio = r.cidade;
				$scope.enableEnderecoEdit = true;
				$scope.cnpj = $scope.clienteDados.cnpj;
			}, function (response) {
				parent.parent.alertify.error('CEP não encontrado');
         enableEnderecoEdit = false;
    });
		}
		else
		{
			return null;
		}
	}
	


	


  
	  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
}

        $scope.myFunc = function() {
       // $scope.currentProject = $scope.projects[id];
    //  $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.currentProject.url)

     // $scope.urlTimelinPendencia = "crm_pendencias_timeline.html?cdReferencia=7767&cdProcesso=1";
   	if ($scope.clienteDados.cnpj == null || $scope.clienteDados.cnpj == undefined || $scope.clienteDados.cnpj == {}) {
			parent.parent.alertify.error("Selecione um Cliente.");
			return;
		}

     $scope.urlTimelinPendencia = "crm_pendencias_timeline.html?cdReferencia="+$scope.clienteDados.id +"&cdProcesso=0";
      $scope.urlGrupoEconomico = "crm_grupo_economico.html?documento="+$scope.clienteDados.cnpj;

     console.log('url',  $scope.urlTimelinPendencia);
     $scope.goToTopPage();
   /// parent.parent.alertify.success( $scope.urlTimelinPendencia ); 
        }
	
	$scope.cadastraMaual = function()
	{
		if($scope.clienteDadosManual.nome == undefined || $scope.clienteDadosManual.nome  == null || $scope.clienteDadosManual.nome  =='')
		{
			parent.parent.alertify.error("Digite um Nome para o cadastro.");
			return;
		}
			if($scope.clienteDadosManual.fantasia == undefined || $scope.clienteDadosManual.fantasia == null || $scope.clienteDadosManual.fantasia =='')
		{
			parent.parent.alertify.error("Digite um nome Fantasia para o cadastro.");
			return;
		}
			if($scope.clienteDadosManual.cnpj == undefined || $scope.clienteDadosManual.cnpj == null || $scope.clienteDadosManual.cnpj =='')
		{
			parent.parent.alertify.error("Digite um número de Documento.");
			return;
		}
		 var e = $scope.clienteDadosEdicao;
		 $scope.clienteDadosEdicao = {};
		$scope.clienteDadosManual.tipo = e.tipo;
		$scope.clienteDadosManual.cep = e.cep;
		$scope.clienteDadosManual.uf = e.uf;
		$scope.clienteDadosManual.municipio = e.municipio;
		$scope.clienteDadosManual.bairro = e.bairro;
		$scope.clienteDadosManual.logradouro = e.logradouro;
		$scope.clienteDadosManual.numero = e.numero;
		console.log('manual',$scope.clienteDadosManual);
		    $scope.salvarCadastroManual();

	}
	
	  $scope.goToTopPage = function()
  {
    document.location.href = "#top";
  }
	
	$scope.salvarAlteracao = function()
	{
		console.log('clienteDadosEdicao',$scope.clienteDadosEdicao);
		var url = $scope.urlAPI + 'crm/pessoa/'+$scope.sessao;
		 $http({
        url:  url,
        method: "PUT",
        data: $scope.clienteDadosEdicao
    })
    .then(function(response) {
		console.log(response.data);
	  parent.parent.alertify.success('Alterado com sucesso!'); 
	  				 $scope.clienteDados.fantasia = $scope.clienteDadosEdicao.fantasia;
	  			    $scope.clienteDados.tipo = $scope.clienteDadosEdicao.tipo ;
				$scope.clienteDados.uf = $scope.clienteDadosEdicao.uf ;
				 $scope.clienteDados.bairro = $scope.clienteDadosEdicao.bairro;
				 $scope.clienteDados.logradouro = $scope.clienteDadosEdicao.logradouro;
			 $scope.clienteDados.cidade = 	$scope.clienteDadosEdicao.municipio;
			 	 $scope.clienteDados.cep = $scope.clienteDadosEdicao.cep;
				 	 $scope.clienteDados.numero = $scope.clienteDadosEdicao.numero
				$scope.enableEnderecoEdit = true;
			 $scope.dismiss = 'modal';
    }, 
    function(response) { // optional
       					  parent.parent.alertify.error(response.data); 
				$scope.enableEnderecoEdit = false;

    });
	};
	
	
		
	$scope.salvarCadastroManual = function()
	{
		console.log('clienteDadosManual',$scope.clienteDadosManual);
		var url =  'http://192.168.6.23/api/crm/pessoa/' + $scope.selectedDoc.id_documento + '/' + $scope.tipoCadastro + '/' + $scope.sessao;
		 $http({
        url:  url,
        method: "POST",
        data: $scope.clienteDadosManual
    })
    .then(function(response) {
		console.log(response.data);
	  parent.parent.alertify.success('Cadastrado com sucesso!'); 
	  			$scope.clienteDados = response.data;

    }, 
    function(response) { // optional
       					  parent.parent.alertify.error(response.data); 
				$scope.enableEnderecoEdit = false;

    });
	};
	
	
	


	$scope.onSelectPais = function (item) {
		console.log($scope.paises);
		//alert($scope.urlAPI);
		var url = $scope.urlAPI + 'crm/pais/' + item.sigla + '/documento';

		console.log(url);
		$scope.loadingScreen = true;
		return $http.get(url)
		.then(function (response) {
			  $scope.disableBusca = false;
			 	$scope.disableTipoCadastro = false;
			$scope.tpDocPais = response.data;
					$scope.loadingScreen = false;

			console.log('doc', $scope.tpDocPais);
			if ($scope.tpDocPais.length > 1) {
				$scope.mostraTextDoc = "none";
				$scope.mostraComboDoc = "block";
			} else {
				$scope.mostraTextDoc = "block";
				$scope.mostraComboDoc = "none";
			}
			$scope.selectedDoc = $scope.tpDocPais[0];
			
			console.log($scope.selectedDoc);
			return response.data;
		});

	};

	$scope.alterarDadosCliente = function () {

		console.log($scope.clienteDados);
		var dados = $scope.clienteDados;
		if ($scope.clienteDados.cnpj == null || $scope.clienteDados.cnpj == undefined || $scope.clienteDados.cnpj == {}) {
			parent.parent.alertify.error("Selecione um Cliente para edição.");
			return;
		} else {
			if(dados.cep != null || dados.cep != undefined || dados.cep == '')
			{
				dados.cep = dados.cep.replace('-','').replace('.','').replace('/','').trim();
			}
			$scope.clienteDadosEdicao = {
				"id": dados.id,
				"fantasia": dados.fantasia,
				"tipo": dados.tipo,
				"cep": dados.cep,
				"uf": dados.uf,
				"numero": dados.numero,
				"municipio": dados.municipio,
				"bairro": dados.bairro,
				"logradouro": dados.logradouro
			};
			$scope.modalEditaCliente = '#editClienteModal';
		}
	};

	$scope.getDocumentoPorPais = function (selected) {
		console.log(selected.nrdocto);
		return selected.doc;
	}

	$scope.buscarCliente = function () {
		$scope.btnBuscarClasse = $scope.iconLoading;
		console.log($scope.selectedPais);
		if ($scope.selectedPais == undefined || $scope.selectedPais == null) {
			parent.parent.alertify.error('Selecione um País.');
			$scope.clienteDados = {};
			$scope.btnBuscarClasse = $scope.iconOK;

			return;
		}
		console.log($scope.selectedDoc);
		if ($scope.selectedDoc == undefined || $scope.selectedDoc == null) {
			console.log('selectedDoc',$scope.selectedDoc );
			parent.parent.alertify.error('Selecione um Tipo de Documento.');
			$scope.clienteDados = {};
			$scope.btnBuscarClasse = $scope.iconOK;
	    	$scope.loadingScreen = false;

			return;
		}

		if ($scope.tipoCadastro == undefined || $scope.tipoCadastro == null) {
			parent.parent.alertify.error('Selecione um Tipo de Cadastro.');
			$scope.clienteDados = {};
			$scope.btnBuscarClasse = $scope.iconOK;
	    	$scope.loadingScreen = false;

			return;
		}
		console.log('teste', $scope.cliente_cnpj);
		if ($scope.cliente_cnpj == undefined || $scope.cliente_cnpj == null || $scope.cliente_cnpj == '' || $scope.cliente_cnpj == {}) {
			parent.parent.alertify.error('Digite uma Empresa ou Documento.');
			$scope.clienteDados = {};
			$scope.btnBuscarClasse = $scope.iconOK;
				    	$scope.loadingScreen = false;

			return;
		}

		console.log($scope.cliente_cnpj);
		var cnpj = '';
		var total = 0;

		//if ($scope.cliente_cnpj.nrdocto != undefined || $scope.cliente_cnpj.nrdocto != null) {
		//	if ($scope.selectedDoc.id_documento == 1) {
			//	total = 14;
			//} else
			//	if ($scope.selectedDoc.id_documento == 2) {
			//		total = 11;
				//}
				if($scope.cliente_cnpj.nrdocto != undefined)
				{
						cnpj = $scope.cliente_cnpj.nrdocto.replace(/[^\d]+/g,"");
				}
				else
				{
						cnpj = $scope.cliente_cnpj.replace(/[^\d]+/g,"");
				}
			
		//	cnpj = $scope.cliente_cnpj.nrdocto;
		
		//	console.log('cnpj com trim', cnpj);
	//		if ($scope.selectedDoc.id_documento == 1 || $scope.selectedDoc.id_documento == 2) {
			//	console.log('lengh', cnpj.length);
		//		var zeros = cnpj.length - total;
				//console.log('zeros',zeros);
			//	console.log(zeros, total);
			//	cnpj = cnpj.substring(zeros, total);

			console.log('cnpj',cnpj);

		
		if ($scope.sessao == undefined || $scope.sessao == '' || $scope.sessao == null) {
			parent.parent.alertify.error('Sessão de Usuáro inválida. Abra novamente esta página.');
			return;
		}
		var postdata = 
		{ 
			"Doc" : cnpj, 
			"TipoDoc": $scope.selectedDoc.id_documento, 
			"TpCliente": $scope.tipoCadastro, 
			"sessaoCross": $scope.sessao, 
			"observacoes": $scope.observacaoCadastro};
console.log(postdata);
		var url = $scope.urlAPI + 'crm/pessoa/' + cnpj + '/' + $scope.selectedDoc.id_documento + '/' + $scope.tipoCadastro + '/' + $scope.sessao;
		console.log(url);
		$scope.loadingScreen = true;
		//$http.get(url)
		$http({
        url: $scope.urlAPI+'crm//pessoa',
        method: "POST",
        data: postdata
    }).then(function (response) {
			console.log(response.data);
			$scope.clienteDados = response.data;
			console.log('tam', $scope.clienteDados.length);
			$scope.loadingScreen = false;
			if ($scope.clienteDados.statusProcess == 'created') {
				$scope.btnBuscarClasse = $scope.iconOK;
				$scope.showBuscaNotFound = 'none';
				$scope.cliente_cnpj = ""; 
			    $scope.btnBuscaEnable = 'false';
			    $scope.observacaoCadastro = '';
			    var tpAnalise= "Analise ";
			    if ($scope.tipoCadastro == 1 ) 
			    {
			    	tpAnalise += "de Neutralidade.";
			    }
			    else
			    	if ($scope.tipoCadastro == 2) 
			    	{
			    		tpAnalise += "Financeira.";
			    	}
				parent.parent.alertify.success('Cadastro efetuado com sucesso! Enviado para '+tpAnalise);
			}
			if ($scope.clienteDados.statusCross == 1) {
				$scope.mostraWell = "block";
				$scope.tpWell = "success";
				$scope.msgWell = "Ativo";
				$scope.mostraPendencia = 'none';
				$scope.iconStatusCross = $scope.iconAtivo;
			} else if ($scope.clienteDados.statusCross == 2) {
				$scope.mostraWell = "block";
				$scope.tpWell = "danger";
				$scope.msgWell = "Inativo";
				if ($scope.clienteDados.pendencia.length > 0) {
					$scope.mostraPendencia = 'block';

					$scope.tablePendencia = new NgTableParams({
					
						}, {
							counts: [],
							dataset: $scope.clienteDados.pendencia
						});
				} else {
					$scope.mostraPendencia = 'none';
				}
				$scope.iconStatusCross = $scope.iconInativo;

			}

			return response.data;
		}, function (response) {
			$scope.loadingScreen = false;
			//Second function handles error
			parent.parent.alertify.error(response.data);

		});

	};
	function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
});

var demo = angular.module("demo", []);

demo.controller("Ctrl",

	function Ctrl($scope, $filter) {

	var today = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

	$scope.boleto = [{
			value: "Sim"
		}, {
			value: "Não"
		}
	];
	$scope.model = {
		contacts: [{
				id: 1,
				produtoNome: "AIR EXPO",
				spread: 28,
				tipoSpread: "Abertura",
				prazo: 5,
				tipoPrazo: "Atracação",
				boleto: "Sim",
				limiteValor: "500",
				validadeData: today
			}, {
				id: 2,
				produtoNome: "AIR IMPO",
				age: 24
			}, {
				id: 3,
				produtoNome: "FLC IMPO",
				age: 32
			}, {
				id: 4,
				produtoNome: "FCL EXPO",
				age: 40
			}, {
				id: 5,
				produtoNome: "LCL IMPO",
				age: 40
			}, {
				id: 6,
				produtoNome: "LCL EXPO",
				age: 40
			}
		],
		selected: {}
	};

	// gets the template to ng-include for a table row / item
	$scope.getTemplate = function (contact) {
		if (contact.id === $scope.model.selected.id)
			return 'edit';
		else
			return 'display';
	};

	$scope.editContact = function (contact) {
		$scope.model.selected = angular.copy(contact);
	};

	$scope.saveContact = function (item, index) {
		console.log(item); //valor anterior

		console.log("Saving contact");
		$scope.model.contacts[index] = angular.copy($scope.model.selected);
		console.log(item);
		console.log($scope.model.selected); // valor alterado
		$scope.reset();
	};

	$scope.reset = function () {
		$scope.model.selected = {};
	};
});


