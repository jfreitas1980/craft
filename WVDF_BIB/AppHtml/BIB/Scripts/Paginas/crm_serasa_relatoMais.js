var analiseNeutralidadae = angular.module("serasaRelatoMais", ["ngTable", "ngRoute", "ui.bootstrap"]);



analiseNeutralidadae.controller("serasaRelatoMaisController", function Ctrl($scope, $filter, NgTableParams, $http, $window, $location, $sce) {

$scope.urlAPI = '';
   $scope.sessao = "";
$scope.documento = '';
	$scope.serasaInfo = '';	
  $scope.informacoesCadastrais = '';
	$scope.informacoesConcentre = '';
  $scope.consultasASerasa= '';
  $scope.creditRiskScoring= '';
  $scope.limiteCredito= '';
  $scope.faturamentoPresumido= '';
  $scope.irm= '';
  $scope.anotacoesSPC= '';
  $scope.consultasAoSPC= '';
  $scope.acoesJudicias = '';
  $scope.riscoCreditoSetor;
  $scope.scorePositivo = '';

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$scope.sessao = getParameterByName('aUsuarioSessao');
$scope.documento = getParameterByName('documento');
$scope.busca = getParameterByName('busca');

angular.element(document).ready(function () {

 $scope.baseUrl = new $window.URL($location.absUrl()).origin;
 //alert($scope.baseUrl);

if ($scope.baseUrl == 'http://192.168.6.18') 
{
      $scope.urlAPI = "http://192.168.6.23/api/";
    // $scope.urlAPI = 'http://localhost:21651/';

}
else 
 {
    $scope.urlAPI = "http://crm.grupocraft.com.br/api/";
 }


$scope.buscaSerasaInfo();

});


$scope.truncate = function(n) {
    return Math.trunc(n);
};

$scope.buscaSerasaInfo = function()
{
//alert($scope.sessao);
//var ses = $scope.sessao.replace('-','').replace('-','').replace('-','').replace('-','');
var url = $scope.urlAPI+'serasa/relatomais/'+ $scope.documento+"/"+$scope.sessao+"/"+$scope.busca;
console.log(url);
  $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
       console.log(response);
       $scope.serasaInfo = response.data.body.consultarRelatoMaisComFeatureResponse;
      $scope.informacoesCadastrais =  $scope.serasaInfo?.relatoMais?.informacoesCadastrais;
      $scope.informacoesConcentre =   $scope.serasaInfo?.relatoMais?.informacoesConcentre;
      $scope.limiteCredito =  $scope.serasaInfo?.limiteCredito;
      $scope.faturamentoPresumido = $scope.serasaInfo?.faturamentoPresumido;
	  $scope.scorePositivo = $scope.serasaInfo?.scorePositivo;
      $scope.informacoesConcentre = $scope.serasaInfo?.relatoMais?.informacoesConcentre;
      $scope.consultasASerasa =  $scope.serasaInfo?.relatoMais?.consultasASerasa;
      $scope.creditRiskScoring = $scope.serasaInfo?.relatoMais?.creditRiskScoring;
      $scope.consultasAoSPC = $scope.serasaInfo?.consultasAoSPC;
      $scope.anotacoesSPC = $scope.serasaInfo?.anotacoesSPC;
      $scope.protestos =  $scope.informacoesConcentre?.proteste;
      $scope.dadosSocios = '';
      $scope.acoesJudicias  = $scope.informacoesConcentre.acoesJudiciais;
      $scope.irm = $scope.serasaInfo.irm;
      $scope.riscoCreditoSetor = $scope.serasaInfo.riscoCreditoSetor;
	  console.log($scope.serasaInfo);
        console.log($scope.limiteCredito);
        $scope.loadScreen= true;
        $scope.populaDividasVencidas();
        $scope.populaAcoesJudiciais();
        $scope.popuplaTableontroleSocietario();
        $scope.populaTableFiliais();
       // $scope.populaTableProtestos();
        $scope.populaTableGrafias();
        $scope.populaConsultaSerasaResumo();
        $scope.populaConsultaSerasaDetalhado();
       $scope.populaParticipacoes();
       $scope.populaConcentrePefin();
       $scope.populaAnotacoesSPC();
       $scope.populaConcentreRefin();
       $scope.populaTableSocios();
       $scope.populaQuadroSocialAnotacoesNegativas();
       $scope.populaQuadroSocialAnotacoesSPC();
        $scope.populaAdministracao();
        $scope.populaProtesto();
		$scope.populaChequesSemFundos();
		$scope.populaFalenciaConcordata();
        $scope.loadScreen= false;
    }, function myError(response) {
});




$scope.popuplaTableontroleSocietario = function()
{
  //alert('teste');
var array = [];


if ($scope.informacoesCadastrais == null || $scope.informacoesCadastrais.quadroSocial == null || $scope.informacoesCadastrais.quadroSocial.socios ==  null) 
{
  return;
} 

console.log('controle Societario',$scope.informacoesCadastrais.quadroSocial.socios);
array.push($scope.informacoesCadastrais.quadroSocial.socios);
  $scope.tableControleSocietario = new NgTableParams(
            {
                page: 1,
                count: 5
            },
            {
                counts: [5, 10, 20, 50],
                dataset: array
            }); 

}


$scope.getCreditScore=function()
{

if ( $scope.creditRiskScoring == null || $scope.creditRiskScoring.fator == null) 
{
  return 0;
}

  var n = ($scope.creditRiskScoring.fator/10);
  return n;

}

$scope.populaTableFiliais = function()
{

var array = [];

if ($scope.informacoesCadastrais == null || $scope.informacoesCadastrais.filiais ==null || $scope.informacoesCadastrais.filiais.length>0) 
{
return;
}
else
{
    array.push($scope.informacoesCadastrais.filiais);
}

  $scope.tableFiliais = new NgTableParams(
            {
                page: 1,
                count: 5
            },
            {
                counts: [5, 10, 20, 50],
                dataset: array
            }); 
}


$scope.getCircleColor = function(value)
{
  value = $scope.truncate(value);
    console.log(value);

  var cor = '';
      if (value<25) 
      {
          cor ='red';
      }
      if (value>=25 && value<50) 
      {
          cor ='orange';
      }
      else if (value>=50 && value<=75) 
      {
          cor = 'yellow';
      }
      else if (value >75 &&  value<101)
      {
        cor = 'green';
      }
      return cor;
}




$scope.populaTableProtestos = function()
{

var array = [];
if ($scope.informacoesConcentre.protestos == null) 
  {
    return;
 }
console.log('populaTableProtestos',$scope.informacoesConcentre.protestos.length);
if ($scope.informacoesConcentre.protestos.length>0) 
{
  array = $scope.informacoesConcentre.protestos;
}
else
{
    array.push($scope.informacoesConcentre.protestos);
}

  $scope.tableConcentreProtestos = new NgTableParams(
            {
                page: 1,
                count: 5
            },
            {
                counts: [5, 10, 20, 50],
                dataset: array
            }); 
}

$scope.populaTableGrafias = function()
{

if ( $scope.informacoesConcentre == null || $scope.informacoesConcentre.grafias == null ) 
  {
    return;
   }
var array = [];
console.log('populaTableGrafias',$scope.informacoesConcentre.grafias.length);
if ($scope.informacoesConcentre.grafias.length>0) 
{
  array = $scope.informacoesConcentre.grafias;
}
else
{
    array.push($scope.informacoesConcentre.grafias);
}

  $scope.tableConcentreGrafias = new NgTableParams(
            {
                page: 1
            },
            {
                counts: [],
                dataset: array
            }); 
}


$scope.populaConsultaSerasaResumo = function()
{

if ( $scope.consultasASerasa == null  || $scope.consultasASerasa.resumo  ) 
  { 
    return;
  }

var array = [];
console.log('populaConsultaSerasaResumo', $scope.consultasASerasa.resumo.length);
if ($scope.consultasASerasa.resumo.length>0) 
{
  array = $scope.consultasASerasa.resumo;
}
else
{
    array.push($scope.consultasASerasa.resumo);
}

  $scope.tableConsultaSerasaResumo = new NgTableParams(
            {
                page: 1,
                count: 5
            },
            {
                counts: [5, 10, 20, 50],
                dataset: array
            }); 
}


$scope.populaConsultaSerasaDetalhado = function()
{
var array = [];


if ($scope.consultasASerasa == null  || $scope.consultasASerasa.detalhado == null ) 
{
  return null;  
}
if ($scope.consultasASerasa.detalhado.length>0) 
{
  array = $scope.consultasASerasa.detalhado;
}
else
{
    array.push($scope.consultasASerasa.detalhado);
}
console.log('populaConsultaSerasaDetalhado', $scope.consultasASerasa.detalhado.length);

  $scope.tableConsultaSerasaDetalhado = new NgTableParams(
            {
                page: 1,
               noPager: true
            },
            {
                counts: [5,10,20,50],
                dataset: array
            }); 
}





$scope.populaParticipacoes = function()
{
var array = [];


if ( $scope.informacoesCadastrais == null || $scope.informacoesCadastrais.participacoes == null) 
{
  return null;  
}
if ($scope.informacoesCadastrais.participacoes.length>0) 
{
  array = $scope.informacoesCadastrais.participacoes;
}
else
{
    array.push($scope.informacoesCadastrais.participacoes);
}
console.log('populaParticipacoes', $scope.informacoesCadastrais.participacoes.length);

  $scope.tableParticipacoes = new NgTableParams(
            {
                page: 1,
               noPager: true
            },
            {
                counts: [5,10,20,50],
                dataset: array
            }); 
}



$scope.populaConcentreParticipacoes = function()
{

var array = [];
if ($scope.informacoesCadastrais.participacoes == null) 
  { 

  //   $scope.informacoesCadastrais.participacoes = [];
  return;
    }

console.log('populaConcentreParticipacoes', $scope.informacoesCadastrais.participacoes);
//alert($scope.informacoesCadastrais.participacoes[1].dataAtualizacao);
if ($scope.informacoesCadastrais.participacoes.length>0) 
{
  array = $scope.informacoesCadastrais.participacoes;
}
else
{
    array.push($scope.informacoesCadastrais.participacoes);
}

  $scope.tableQuadroSocialParticipantes= new NgTableParams(
            {
                page: 1,
               noPager: 5
            },
            {
                counts: [5,10,20,50],
                dataset: array
            }); 
}



$scope.populaQuadroSocialSocios = function()
{

var array = [];
if ($scope.informacoesCadastrais.quadroSocial.socios == null) 
  { 

  //   $scope.informacoesCadastrais.participacoes = [];
  return;
    }

console.log('populaQuadroSocialSocios', $scope.informacoesCadastrais.quadroSocial.socios);
//alert($scope.informacoesCadastrais.participacoes[1].dataAtualizacao);
if ($$scope.informacoesCadastrais.quadroSocial.socios.length>0) 
{
  array = $scope.informacoesCadastrais.quadroSocial.socios;
}
else
{
    array.push($scope.informacoesCadastrais.quadroSocial.socios);
}

  $scope.tableQuadroSocialSocios= new NgTableParams(
            {
                page: 1,
               noPager: 5
            },
            {
                counts: [5,10,20,50],
                dataset: array
            }); 
}




$scope.populaQuadroSocialAnotacoesSPC = function()
{

var array = [];


if ($scope.informacoesCadastrais == null ||   $scope.informacoesCadastrais.quadroSocial == null || $scope.informacoesCadastrais.quadroSocial.anotacoesSPC == null) 
  { 

  //   $scope.informacoesCadastrais.participacoes = [];
  return;
    }

console.log('populaQuadroSocialAnotacoesSPC', $scope.informacoesCadastrais.quadroSocial.anotacoesSPC);
//alert($scope.informacoesCadastrais.participacoes[1].dataAtualizacao);
if ($scope.informacoesCadastrais.quadroSocial.anotacoesSPC.length>0) 
{
  array = $scope.informacoesCadastrais.quadroSocial.anotacoesSPCs;
}
else
{
    array.push($scope.informacoesCadastrais.quadroSocial.anotacoesSPC);
}

  $scope.tableQuadroSocialAnotacoesSPC= new NgTableParams(
            {
                page: 1,
               noPager: 5
            },
            {
                counts: [5],
                dataset: array
            }); 
}








$scope.populaQuadroSocialAnotacoesNegativas = function()
{

var array = [];
if ( $scope.informacoesCadastrais == null || $scope.informacoesCadastrais.quadroSocial == null ||  $scope.informacoesCadastrais.quadroSocial.anotacoesNegativas == null) 
  { 

  //   $scope.informacoesCadastrais.participacoes = [];
  return;
    }

console.log('populaQuadroSocialAnotacoesSPC', $scope.informacoesCadastrais.quadroSocial.anotacoesNegativas);
//alert($scope.informacoesCadastrais.participacoes[1].dataAtualizacao);
if ($scope.informacoesCadastrais.quadroSocial.anotacoesNegativas.length>0) 
{
  array = $scope.informacoesCadastrais.quadroSocial.anotacoesNegativas;
}
else
{
    array.push($scope.informacoesCadastrais.quadroSocial.anotacoesNegativas);
}

  $scope.tableQuadroSocialAnotacoesNegativas= new NgTableParams(
            {
                page: 1,
               noPager: 5
            },
            {
                counts: [5],
                dataset: array
            }); 
}






$scope.populaConsultaSPC = function()
{

var array = [];
if ($scope.informacoesCadastrais.participacoes == null) 
  { 
    return;
   }

console.log('populaConsultaSPC', $scope.consultasAoSPC.length);
if ($scope.consultasAoSPC.length>0) 
{
  array = $scope.consultasAoSPC;
}
else
{
    array.push($scope.consultasAoSPC);
}

  $scope.tableConsultaAoSPC = new NgTableParams(
            {
                page: 1,
               noPager: 5
            },
            {
                counts: [5],
                dataset: array
            }); 
}


$scope.populaAnotacoesSPC = function()
{

var array = [];
if ($scope.anotacoesSPC == null || $scope.anotacoesSPC.anotacao == null) 
  { 
    return;
   }

console.log('populaAnotacoesSPC', $scope.anotacoesSPC.anotacao.length);
if ($scope.anotacoesSPC.anotacao.length>0) 
{
  array = $scope.anotacoesSPC.anotacao;
}
else
{
    array.push($scope.anotacoesSPC.anotacao);
}

  $scope.tableAnotacoesSPC = new NgTableParams(
            {
                page: 1
            },
            {
                counts: [5],
                dataset: array
            }); 
}



$scope.populaConcentrePefin = function()
{
var array = [];
if (  $scope.informacoesConcentre == null ||  $scope.informacoesConcentre.pefin == null ||  $scope.informacoesConcentre.pefin.anotacao== null) 
  { 
  return;
   }

console.log('populaConcentrePefin', $scope.informacoesConcentre.pefin.anotacao.length);
if ($scope.informacoesConcentre.pefin.anotacao.length>0) 
{
  array = $scope.informacoesConcentre.pefin.anotacao ;
}
else
{
    array.push($scope.informacoesConcentre.pefin.anotacao);
}

  $scope.tableConcentrePefin = new NgTableParams(
            {
                page: 1
            },
            {
				count : 5,
				counts: [],
                dataset: array
            }); 
}




$scope.populaConcentreRefin = function()
{
var array = [];
if ( $scope.informacoesConcentre == null || $scope.informacoesConcentre.refin == null ||  $scope.informacoesConcentre.refin.anotacao == null)  {  return; }

console.log('populaConcentreRefin', $scope.informacoesConcentre.refin.anotacao.length);
if ($scope.informacoesConcentre.refin.anotacao.length>0) 
{
  array = $scope.informacoesConcentre.refin.anotacao ;
}
else
{
    array.push($scope.informacoesConcentre.refin.anotacao);
}

  $scope.tableConcentreRefin = new NgTableParams(
            {
                page: 1
            },
            {
                counts: [],
                dataset: array
            }); 
}









$scope.populaDividasVencidas = function()
{
var array = [];
if ($scope.informacoesConcentre == null || $scope.informacoesConcentre.dividasVencidas == null || $scope.informacoesConcentre.dividasVencidas.anotacao== null) 
  { 
  return;
    }

console.log('populaDividasVencidas', $scope.informacoesConcentre.dividasVencidas.anotacao);

if ($scope.informacoesConcentre.dividasVencidas.anotacao.length>0) 
{
  array = $scope.informacoesConcentre.dividasVencidas.anotacao;
}
else
{
    array.push($scope.informacoesConcentre.dividasVencidas.anotacao);
}

  $scope.tableDividasVencidas = new NgTableParams(
            {
                page: 1
            },
            {
                counts: [],
                dataset: array
            }); 
}




$scope.populaAdministracao = function()
{
var array = [];
if ( $scope.informacoesCadastrais == null || $scope.informacoesCadastrais.administracao == null ) 
  { 

  return;
    }
//alert('teste');
console.log('populaAdministracao', $scope.informacoesCadastrais.administracao.length);
if ($scope.informacoesCadastrais.administracao.length>0) 
{
  array = $scope.informacoesCadastrais.administracao;
}
else
{
    array.push($scope.informacoesCadastrais.administracao);
}

  $scope.tableAdministracao = new NgTableParams(
            {
                page: 1
            },
            {
                counts: [],
                dataset: array
            }); 
}



$scope.populaProtesto = function()
{
var array = [];



if ( $scope.informacoesConcentre?.protestos == null || $scope.informacoesConcentre?.protestos == null ) 
  { 

  return;
    }
//alert('teste');
console.log('populaProtesto', $scope.informacoesConcentre.protestos.protesto.length);
if ($scope.informacoesConcentre.protestos.protesto.length>0) 
{
  array = $scope.informacoesConcentre.protestos.protesto;
}
else
{
    array.push($scope.informacoesConcentre.protestos.protesto);
}

  $scope.tableProtesto = new NgTableParams(
            {
                page: 1
            },
            {
               counts: [],
                dataset: array
            }); 
}









$scope.populaTableSocios = function()
{
var array = [];
if ( $scope.informacoesCadastrais==null ||  $scope.informacoesCadastrais.quadroSocial == null ||  $scope.informacoesCadastrais.quadroSocial.socios== null) 
  { 
    return;
   }

console.log('populaTableSocios', $scope.informacoesCadastrais.quadroSocial.socios.length);

if ($scope.informacoesCadastrais.quadroSocial.socios.length>0) 
{
  array = $scope.informacoesCadastrais.quadroSocial.socios;
}
else
{
    array.push($scope.informacoesCadastrais.quadroSocial.socios);
}

console.log('dadosPF', $scope.informacoesCadastrais.quadroSocial.socios);

if ($scope.informacoesCadastrais.quadroSocial.socios.dadosPF != null || $scope.informacoesCadastrais.quadroSocial.socios.dadosPF != undefined) 
{
//  alert('teste');
   array.dadosPJ.push($scope.informacoesCadastrais.quadroSocial.socios.dadosPF);
}

 
console.log(array);

  $scope.TableParticipantes = new NgTableParams(
            {
                page: 1,
               noPager: 5
            },
            {
                counts: [],
                dataset: array
            }); 
}

$scope.populaAcoesJudiciais = function()
{
var array = [];
if ($scope.informacoesConcentre == null || $scope.informacoesConcentre.acoesJudiciais == null || $scope.informacoesConcentre.acoesJudiciais.anotacao== null) 
  { 
  return;
    }

console.log('acoesJudiciais', $scope.informacoesConcentre.acoesJudiciais.acaoJudicial);

if ($scope.informacoesConcentre.acoesJudiciais.acaoJudicial.length>0) 
{
  array = $scope.informacoesConcentre.acoesJudiciais.acaoJudicial;
}
else
{
    array.push($scope.informacoesConcentre.acoesJudiciais.acaoJudicial);
}

  $scope.tableAcoesJudiciais = new NgTableParams(
            {
                page: 1
            },
            {
                counts: [],
                dataset: array
            }); 
}

$scope.populaChequesSemFundos = function()
{
var array = [];
if ($scope.informacoesConcentre == null || $scope.informacoesConcentre.chequesSemFundos == null || $scope.informacoesConcentre.chequesSemFundos.chequesSemFundo == null) 
  { 
  return;
    }

console.log('chequesSemFundos', $scope.informacoesConcentre.chequesSemFundos.chequesSemFundo);

if ($scope.informacoesConcentre.chequesSemFundos.chequesSemFundo.length>0) 
{
  array = $scope.informacoesConcentre.chequesSemFundos.chequesSemFundo;
}
else
{
    array.push($scope.informacoesConcentre.chequesSemFundos.chequesSemFundo);
}

  $scope.tableChequesSemFundos = new NgTableParams(
            {
                page: 1
            },
            {
                counts: [],
                dataset: array
            }); 
}

$scope.populaFalenciaConcordata = function()
{
var array = [];
if ($scope.informacoesConcentre == null || $scope.informacoesConcentre.falenciasConcordatas == null || $scope.informacoesConcentre.falenciasConcordatas.falenciaConcordata == null) 
  { 
  return;
    }

console.log('falenciasConcordatas', $scope.informacoesConcentre.falenciasConcordatas.falenciaConcordata);

if ($scope.informacoesConcentre.falenciasConcordatas.falenciaConcordata.length>0) 
{
  array = $scope.informacoesConcentre.falenciasConcordatas.falenciaConcordata;
}
else
{
    array.push($scope.informacoesConcentre.falenciasConcordatas.falenciaConcordata);
}

  $scope.tableFalenciasConcordatas = new NgTableParams(
            {
                page: 1
            },
            {
                counts: [],
                dataset: array
            }); 
}



}
});
