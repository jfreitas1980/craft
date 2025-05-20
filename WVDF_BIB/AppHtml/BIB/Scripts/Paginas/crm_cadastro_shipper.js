var app = angular.module('myApp', ['ngTable', 'ngRoute', 'ui.bootstrap']);

app.controller('crmController', function ($scope, $http, NgTableParams, $filter, $window, $location) {


	$scope.tpDocPais;
	$scope.selectedDoc;
	$scope.loadingScreen = false;
	$scope.disablePais = false;
	

	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};

	$scope.pageMode = '';
	$scope.idCliente = undefined;
	$scope.paisEdicao = ''; 
	$scope.tpEnderecoIncial = 0;

	$scope.tiposEndereco = 
		[{value:"MATR", label:"MATRIZ"},
		{value:"FIL", label:"FILIAL"},
		{value:"COB", label:"COBRANCA"},
		{value:"ENTR", label:"ENTREGA"}
	 ];

	$scope.getEmpresaPorId = function()
	{
		var url = $scope.urlAPI + 'crm/pessoa/buscaporid/'+$scope.idCliente;

		$http({
	        method : "GET",
	        url : url
	    }).then(function mySuccess(response) {

	    	console.log(response);
	        $scope.myWelcome = response.data;
	        var data = response.data;

			$scope.clienteDadosManual.cnpj = data.empresa.nrdocto;
			$scope.clienteDadosManual.nome = data.empresa.nome;
			$scope.clienteDadosManual.fantasia = data.empresa.fantasia;

			if (data.endereco != null) {
				$scope.clienteDadosEdicao.cep = data.endereco.cep.trim();
				$scope.clienteDadosEdicao.uf = data.endereco.estado.trim();
				$scope.clienteDadosEdicao.numero = data.endereco.numero.trim();
				$scope.clienteDadosEdicao.bairro = data.endereco.bairro.trim();
				$scope.clienteDadosEdicao.logradouro = data.endereco.logradouro.trim();
				$scope.clienteDadosEdicao.municipio = data.cidadeNome.trim();
			}
		
			$scope.selectedPais = data.empresa.pais
			var paises = $scope.getPaisPorNome(data.empresa.pais);

			paises.then(function(data) {
				console.log('paises', data);
				$scope.selectedPais = data;
				$scope.disablePais = true;
				console.log('index',response.data.indexTipoEndereco);
				$scope.setTipoEndereco(response.data.indexTipoEndereco);

				$scope.canEditName();

			});

			if (data.tipoDocumento != null) 
			{
				$scope.selectedDoc.no_documento = data.tipoDocumento.no_documento;
			}

		}, function myError(response) {
        	$scope.myWelcome = response.statusText;
    	});
	}

	$scope.canEditName = function(){
		var ret = false;

		if($scope.idCliente > 0
				&& $scope.selectedPais?.sigla != "BRA" 
				&& ($scope.tipoCadastro?.value == undefined || $scope.tipoCadastro?.value == 16)){
			console.log("canEditName liberado");
			ret = true;
		}			
		else{
			ret = !$scope.disablePais
			console.log("canEditName", ret);
		}

		return ret;
	};

	$scope.cliente_cnpj = "";
	$scope.iconOK = 'fas fa-plus-circle';
	$scope.iconLoading = 'fa fa-spinner fa-spin';
	$scope.btnBuscarClasse = $scope.iconLoading;
	$scope.clienteDados = {};
	$scope.showAlert = "none";
	$scope.mostraTextDoc = "block";
	$scope.mostraComboDoc = "none";
	$scope.checkProspect = false;
	$scope.tipoCadastro = [];
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
	$scope.enableEnderecoEdit = false ;
	$scope.dismiss = '';
	$scope.showBuscaNotFound = 'none';
	$scope.clienteDadosManual = {};
	$scope.disableTipoCadastro = true;
	$scope.disableBusca = true;
    $scope.modoPagina = "Novo";

	$scope.observacaoCadastro = '';
	$scope.urlAPI = '';
	$scope.selectedPais = undefined;
	$scope.clienteDadosEdicao.tipo = 'MATR';

	$scope.redirect = function (value) {
		value = value + '?aUsuarioSessao=' + $scope.sessao;
		console.log(value);
		$window.location.href = value;
	}

	angular.element(document).ready(function () {
		$scope.sessao = getParameterByName('aUsuarioSessao');

		$scope.tipoCadastro = [ { name: "SHIPPER", value: 16} ]


	 	$scope.baseUrl = new $window.URL($location.absUrl()).origin;
		console.log('base url',$scope.baseUrl);

		if ($scope.baseUrl == 'http://192.168.6.18') 
		{
			$scope.urlAPI = "http://192.168.6.23/api/";
			//$scope.urlAPI = "http://localhost:21651/";			
		}
		else if ($scope.baseUrl == 'http://craftcross.grupocraft.com.br' || $scope.baseUrl == 'https://craftcross.grupocraft.com.br')
		{
				$scope.urlAPI = "http://crm.grupocraft.com.br/api/";
		}
		else
		{
			parent.parent.alertify.error('error');
		}

		$scope.loadingScreen = true;

		$scope.idCliente =  getParameterByName('idEmpresa');

		console.log('idEmpresa',$scope.idCliente);
		if ($scope.idCliente == undefined  || $scope.idCliente == null || $scope.idCliente == '') 
		{
			$scope.pageMode = 'create';
			$scope.modoPagina = "Novo";
		}
		else
		{
			$scope.getEmpresaPorId();
			$scope.pageMode = 'edit';	
			$scope.modoPagina = "Editar";
		}

		console.log('pagemode',$scope.pageMode);

		$scope.loadingScreen = false;	

		//$scope.buscarApiCRM();
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
		//$("select#tipoCadastroSelect")[0].selectedIndex = 0;

		console.log($scope.paises);
		var url = $scope.urlAPI + 'crm/pais/' + value;
		
		console.log(url);
		console.log(url);

		$scope.loadingScreen = true;

		return $http.get(url)
			.then(function (response) {
				console.log(response.data);
				$scope.loadingScreen = false;
				//	$scope.paisEdicao = response.data[0].descricao;
				//alert($scope.paisEdicao);
				return response.data;

		}, function (response) {
				$scope.loadingScreen = false;
			 	$scope.clienteDados = {};
			 	$scope.selectedDoc="";
			 	$scope.mostraTextDoc = "block";
			 	$scope.mostraComboDoc = "none";
			 	$scope.cliente_cnpj = "";
    	});
	}

	$scope.getPaisPorNome = function (value) {
		$scope.disableBusca = true;
		$scope.clienteDados = {};
		$scope.cliente_cnpj = "";
		$scope.selectedDoc="";
		$scope.mostraTextDoc = "block";
		$scope.mostraComboDoc = "none";
		$scope.disableTipoCadastro = true;
		//$("select#tipoCadastroSelect")[0].selectedIndex = 0;

		console.log($scope.paises);

		var url = $scope.urlAPI + 'crm/pais/BuscaPorSigla/' + value;

		console.log(url);
			$scope.loadingScreen = true;

		return $http.get(url)
			.then(function (response) {
				console.log(response.data);
				$scope.loadingScreen = false;
			//	$scope.paisEdicao = response.data[0].descricao;
				//alert($scope.paisEdicao);
				return response.data;

		}, function (response) {
				$scope.loadingScreen = false;
			 	$scope.clienteDados = {};
			 	$scope.selectedDoc="";
			 	$scope.mostraTextDoc = "block";
			 	$scope.mostraComboDoc = "none";
			 	$scope.cliente_cnpj = "";
    	});
	}

	$scope.getCidades = function (value) {
		$scope.disableBusca = true;

		//$("select#tipoCadastroSelect")[0].selectedIndex = 0;
		console.log("url", $scope.urlAPI + 'crm/cidades/' + value+"/"+$scope.selectedPais.sigla);

		console.log($scope.paises);

		var url = $scope.urlAPI + 'crm/cidades/' + value+"/"+$scope.selectedPais.sigla;
		console.log(url);

		$scope.loadingScreen = true;

		return $http.get(url)
			.then(function (response) {
				console.log(response.data);
				$scope.loadingScreen = false;

				return response.data;

		}, function (response) {
				$scope.loadingScreen = false;
    	});
	}

	$scope.setTipoEndereco = function(value)
	{
		$scope.clienteDadosEdicao.tipo = $scope.tiposEndereco[value];
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
			parent.parent.alertify.error("Seleciona um Pa�s.");
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
		console.log('teste',value);
	
		if (value != undefined || value != '') { 
			console.log($scope.paises);
			var url = $scope.urlAPI + 'crm/pais/cep/' + value;
			
			console.log(url);
			
			return $http.get(url)
				.then(function (response) {
				//if (response.data.length>0) 
			//	{
				console.log('cep',response.data);
				var r = response.data;
			 //   $scope.clienteDadosEdicao.tipo = r.tipo;
				$scope.clienteDadosEdicao.uf = r.uf;
				$scope.clienteDadosEdicao.bairro = r.bairro;
				$scope.clienteDadosEdicao.logradouro = r.d_LOGRADOURO;
				$scope.clienteDadosEdicao.municipio = r.cidade;
				$scope.enableEnderecoEdit = true;
				$scope.cnpj = $scope.clienteDados.cnpj;
			//	}
			//	else
				//{
				//  parent.parent.alertify.error('CEP nao encontrado');
				//}


			}, function (response) {
				parent.parent.alertify.error('CEP nao encontrado');
	            enableEnderecoEdit = true;
			});
		}
		else
		{
			return null;
		}
	}
	
	$scope.cadastraMaual = function()
	{

		console.log('pais', $scope.selectedPais);
		console.log('tipo cadastro', $scope.tipoCadastro);
		//console.log('documento',  $scope.selectedDoc.id_documento);
		if ($scope.selectedPais == undefined || $scope.selectedPais =="") 
		{
			parent.parent.alertify.error("Selecione um Pais.");
			return;
		}
		if ($scope.tipoCadastro == undefined || $scope.tipoCadastro == 0) 
			{
				  parent.parent.alertify.error('Selecione um tipo de Cadastro.'); 
				  return;
			}
	//	if($scope.clienteDadosManual.cnpj == undefined || $scope.clienteDadosManual.cnpj == null || $scope.clienteDadosManual.cnpj =='')
		//{
		//	parent.parent.alertify.error("Digite um Numero de Documento.");
		//	return;
		//}
		if($scope.clienteDadosManual.nome == undefined || $scope.clienteDadosManual.nome  == null || $scope.clienteDadosManual.nome  =='')
		{
			parent.parent.alertify.error("Digite um Nome para o Cadastro.");
			return;
		}
			if($scope.clienteDadosManual.fantasia == undefined || $scope.clienteDadosManual.fantasia == null || $scope.clienteDadosManual.fantasia =='')
		{
			parent.parent.alertify.error("Digite um nome Fantasia para o cadastro.");
			return;
		}
		console.log('clienteDadosEdicao.tipo',$scope.clienteDadosEdicao.tipo);
				if( $scope.clienteDadosEdicao.tipo== undefined ||  $scope.clienteDadosEdicao.tipo == null ||  $scope.clienteDadosEdicao.tipo =='')
		{
			parent.parent.alertify.error("Selecione um Tipo de Endereco.");
			return;
		}
		 var e = $scope.clienteDadosEdicao;
		// $scope.clienteDadosEdicao = {};
		$scope.clienteDadosManual.tipo = e.tipo.value;
		$scope.clienteDadosManual.cep = e.cep;
		$scope.clienteDadosManual.uf = e.uf;
		$scope.clienteDadosManual.municipio = e.municipio;
		$scope.clienteDadosManual.bairro = e.bairro;
		$scope.clienteDadosManual.logradouro = e.logradouro;
		$scope.clienteDadosManual.numero = e.numero;
		console.log('manual',$scope.clienteDadosManual);
		// $scope.clienteDadosEdicao.tipo = $scope.tiposEndereco;
		if ($scope.pageMode == 'create') 
		{
	        $scope.salvarCadastroManual();
	         console.log('Criar');
		}
		else
		{
			$scope.alterarCadastroManual();
			console.log('Alterar');
		}
	

	}
	
	
	
	$scope.salvarAlteracao = function()
	{	
		$scope.loadingScreen = true;
		
		console.log('clienteDadosEdicao',$scope.clienteDadosEdicao);
		
		var url = $scope.urlAPI + 'crm/pessoa/'+$scope.sessao;
		
		$http({
        	url:  url,
        	method: "PUT",
        	data: $scope.clienteDadosEdicao
    	}).then(function(response) {
    		$scope.loadingScreen = false;

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
    		$scope.loadingScreen = false;

			console.log(response);
       		parent.parent.alertify.error(response.data); 
			$scope.enableEnderecoEdit = false;
    	});
	};	
		
	$scope.salvarCadastroManual = function()
	{

		console.log('clienteDadosManual',$scope.clienteDadosManual);

		if ($scope.selectedDoc == undefined || $scope.selectedDoc == null|| $scope.selectedDoc == []) 
		{
          $scope.selectedDoc = {};
          $scope.selectedDoc.id_documento = 0;
		}

		console.log('tipoCadastroT');

		console.log($scope.tipoCadastro);

		$scope.loadingScreen = true;
		var url = $scope.urlAPI + 'crm/pessoa/' + $scope.selectedDoc.id_documento + '/' + $scope.tipoCadastro[0].value + '/'+$scope.selectedPais.sigla.trim()+'/' + $scope.sessao;
		//var url =  'http://localhost:21651/crm/pessoa/' + $scope.selectedDoc.id_documento + '/' + $scope.tipoCadastro[0].value + '/'+$scope.selectedPais.sigla.trim()+'/' + $scope.sessao;
		console.log(url);
		console.log("data");
		 
		$http({
	        url:  url,
	        method: "POST",
	        data: $scope.clienteDadosManual
	    }).then(function(response) {
			$scope.loadingScreen = false;
			console.log(response.data);
			parent.parent.alertify.success('Cadastrado com sucesso!'); 
			$scope.clienteDadosManual = {};
			$scope.clienteDadosEdicao = {}; 
			$scope.clienteDadosEdicao.tipo = $scope.tiposEndereco;
			$scope.clienteDados = response.data;
	    }, 
	    function(response) { // optional
	    	console.log(response);
	      	$scope.loadingScreen = false;

	       	parent.parent.alertify.error('Erro ao Salvar. '+ response.data); 
			$scope.enableEnderecoEdit = false;
		});	
	};
		
	$scope.alterarCadastroManual = function()
	{

		console.log('clienteDadosManual',$scope.clienteDadosManual);
		if ($scope.selectedDoc == undefined || $scope.selectedDoc == null|| $scope.selectedDoc == []) 
		{
          $scope.selectedDoc = {};
          $scope.selectedDoc.id_documento = 0;
		}

		console.log('tipoCadastro',$scope.tipoCadastro );

		$scope.loadingScreen = true;

		var url =  $scope.urlAPI + '/crm/pessoa/'+$scope.selectedPais.sigla.trim()+'/' + $scope.sessao;
		//var url =  'http://localhost:21651/crm/pessoa/'+$scope.selectedPais.sigla.trim()+'/' + $scope.sessao;

		$scope.clienteDadosManual.id = $scope.idCliente;
	   	console.log('idEmpresa',$scope.idCliente);
		console.log('envio',$scope.clienteDadosManual);
		console.log(url);
		
		$http({
        	url:  url,
        	method: "PUT",
        	data: $scope.clienteDadosManual
    	}).then(function(response) {
	      	$scope.loadingScreen = false;
		  	console.log(response.data);
		  	parent.parent.alertify.success('Alterado com sucesso!'); 
		  	//$scope.clienteDadosManual = {};
	  		//$scope.clienteDados = response.data;
    	}, 
    	function(response) { // optional
    		console.log(response);
      		$scope.loadingScreen = false;
       		parent.parent.alertify.error('Erro ao Salvar. '+ response.data); 
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
			parent.parent.alertify.error("Selecione um Cliente para edi��o.");
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


	$scope.onSelectCidade = function(item)
	{
		//alert(item);
	    $scope.clienteDadosEdicao.uf =  item.uf;
	};

	$scope.buscarCliente = function () {
		$scope.btnBuscarClasse = $scope.iconLoading;

		console.log($scope.selectedPais);
		if ($scope.selectedPais == undefined || $scope.selectedPais == null) {
			parent.parent.alertify.error('Selecione um Pa�s.');
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

			return;
		}

		if ($scope.tipoCadastro == undefined || $scope.tipoCadastro == null) {
			parent.parent.alertify.error('Selecione um Tipo de Cadastro.');
			$scope.clienteDados = {};
			$scope.btnBuscarClasse = $scope.iconOK;

			return;
		}

		console.log('teste', $scope.cliente_cnpj);
		if ($scope.cliente_cnpj == undefined || $scope.cliente_cnpj == null || $scope.cliente_cnpj == '' || $scope.cliente_cnpj == {}) {
			parent.parent.alertify.error('Digite uma Empresa ou Documento.');
			$scope.clienteDados = {};
			$scope.btnBuscarClasse = $scope.iconOK;
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

		if($scope.cliente_cnpj.nrdoctO_ED != undefined)
		{
			cnpj = $scope.cliente_cnpj.nrdoctO_ED.replace(/[^\d]+/g,"");
		}
		else
		{
			cnpj = $scope.cliente_cnpj.replace(/[^\d]+/g,"");
		}			
			
		
		//	console.log('cnpj com trim', cnpj);
		//	if ($scope.selectedDoc.id_documento == 1 || $scope.selectedDoc.id_documento == 2) {
		//	console.log('lengh', cnpj.length);
		//		var zeros = cnpj.length - total;
		//console.log('zeros',zeros);
		//	console.log(zeros, total);
		//	cnpj = cnpj.substring(zeros, total);

		console.log('cnpj',cnpj);
		
		if ($scope.sessao == undefined || $scope.sessao == '' || $scope.sessao == null) {
			parent.parent.alertify.error('Sess�o de Usu�ro inv�lida. Abra novamente esta p�gina.');
			return;
		}

		var postdata = 
		{ 
			"Doc" : cnpj, 
			"TipoDoc": $scope.selectedDoc.id_documento, 
			"TpCliente": $scope.tipoCadastro, 
			"sessaoCross": $scope.sessao, 
			"observacoes": $scope.observacaoCadastro
		};

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

	$scope.onBlurName = function(args){				
		$scope.clienteDadosManual.nome = $scope.removerCaracterEspecial(args.target.value); 
	}
	
	$scope.onBlurFantasia = function(args){				
		$scope.clienteDadosManual.fantasia = $scope.removerCaracterEspecial(args.target.value); 
	}
	
	$scope.onBlurLogradouro = function(args){				
		$scope.clienteDadosEdicao.logradouro = $scope.removerCaracterEspecial(args.target.value); 
	}

	$scope.removerCaracterEspecial = function(text){
		return text.replace(/[^0-9a-zA-Z]+/, "");
	}
});

var demo = angular.module("demo", []);

demo.controller("Ctrl",

	function Ctrl($scope, $filter) {

	var today = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

	$scope.boleto = [{
			value: "Sim"
		}, {
			value: "N�o"
		}
	];
	$scope.model = {
		contacts: [{
				id: 1,
				produtoNome: "AIR EXPO",
				spread: 28,
				tipoSpread: "Abertura",
				prazo: 5,
				tipoPrazo: "Atraca��o",
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

var assignacaoComercial = angular.module('assignacaoComercial', ['ngTable', 'ngRoute', 'ui.bootstrap']);

assignacaoComercial.controller('assignacaoComercialController', function ($scope, $http, NgTableParams, $filter, $window) {

	$scope.model = {

		acordosFinanceiros: [{
				id: 1,
				target: null,
				produto: "AIR EXPO",
				vendedor: "",
				is: "",
				cs: "",
				sponsor: ""
			}, {
				id: 2,
				target: false,
				produto: "AIR IMPO",
				vendedor: "",
				is: "",
				cs: "",
				sponsor: ""
			}, {
				id: 3,
				target: true,
				produto: "FCL IMPO",
				vendedor: "",
				is: "",
				cs: "",
				sponsor: ""
			}, {
				id: 4,
				target: true,
				produto: "FCL EXPO",
				vendedor: "",
				is: "",
				cs: "",
				sponsor: ""
			}, {
				id: 5,
				target: false,
				produto: "LCL IMPO",
				vendedor: "",
				is: "",
				cs: "",
				sponsor: ""
			}, {
				id: 6,
				target: true,
				produto: "LCL EXPO",
				vendedor: "",
				is: "",
				cs: "",
				sponsor: ""
			}
		],
		selected: {}
	};

	$scope.redirect = function (value) {
		value = value + '?aUsuarioSessao=' + $scope.sessao;
		console.log(value);
		alert(value);
		$window.location.href = value;
	}

	$scope.tableParams = new NgTableParams({
			page: 1,
			count: 5
		}, {
			counts: [5, 10, 20, 50],
			dataset: $scope.clientePendente
		});

	$scope.vendedor = [{
			id: "1",
			nome: "teste 1"
		}, {
			id: "2",
			nome: "teste 2"
		}
	];

	$scope.getVendedor = function (value) {
		return $scope.vendedor;
	};
	$scope.getIs = function (value) {
		return $scope.vendedor;
	};
	$scope.getCs = function (value) {
		return $scope.vendedor;
	};
	$scope.getSponsor = function (value) {
		return $scope.vendedor;
	};

	$scope.is = [{
			id: "1",
			nome: "teste 1"
		}, {
			id: "2",
			nome: "teste 2"
		}
	];

	$scope.cs = [{
			id: "1",
			nome: "teste 1"
		}, {
			id: "2",
			nome: "teste 2"
		}
	];

	$scope.sponsor = [{
			id: "1",
			nome: "teste 1"
		}, {
			id: "2",
			nome: "teste 2"
		}
	];

	$scope.enviarNeutralidade = function () {
		alert('Enviado para An�lise de Neutralidade');
		$window.location.href = 'cadastro_analise_neutralidade.html';

	}

	$scope.setSelectedItem = function (item) {
		$scope.selected = item;
		// $scope.buscaDatalinerMaritmo(item.cnpj);
	};

	// gets the template to ng-include for a table row / item
	$scope.getTemplate = function (item) {
		if (item.id === $scope.model.selected.id)
			return 'edit';
		else
			return 'display';
	};

	$scope.editAcordo = function (contact) {

		$scope.model.selected = angular.copy(contact);
	};

	$scope.saveAcordo = function (item, index) {
		console.log(item); //valor anterior

		console.log("Saving contact");
		$scope.model.acordosFinanceiros[index] = angular.copy($scope.model.selected);
		console.log(item);
		console.log($scope.model.selected); // valor alterado
		$scope.reset();
	};

	$scope.reset = function () {
		$scope.model.selected = {};
	};

});