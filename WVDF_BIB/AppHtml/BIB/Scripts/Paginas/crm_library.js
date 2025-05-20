
var app = angular.module('crmLibrary', []);


app.factory('crmLibrary', ['$http', function($http) {
	
 var UrlAPI = 'http://192.168.6.23/api/';

  //var UrlAPI = 'http://localhost:21651/';
   //var UrlAPI = 'https://crm.grupocraft.com.br/api/';


    var filterDataYesNo = [ {id:true , title:"SIM"},{id:false , title:"NÃO"} ];

    var filterDataAtivoInativo =  [ { id: true, title: "ATIVO"} ,  { id: false, title: "INATIVO"}];

    var filterDataTipoACordo =  [ { id: "!", title: "EXCLUSIVO POR CLIENTE"} ,  { id: "!!" , title: "POR GRUPO ECONOMICO"}];







    var getRequest = function(caminho)
    {
    console.log(UrlAPI+caminho);
      return  $http.get(UrlAPI+caminho)
    .then(function(response) {
      return response;
    });
    }


    var postRequest = function(caminho, data)
    {
    console.log(UrlAPI+caminho);
    var url = UrlAPI+caminho;
      return   $http({
      method: 'POST',
    url: url,
    data: data,
    headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
        return response;
    });
    }





 var getTodosProdutos = function()
{
        var url = UrlAPI + 'Cross/Produtos';
        console.log(url);
      return   $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
                   console.log('sucesso ao buscar produtos.', response);
                  return response.data; 
   
    }, function myError(response) { 
          console.log('Erro ao buscar produtos.',response);
    });
}


 var getDatasConversaoCambio = function()
{
        var url = UrlAPI + 'CRM/AcordosFinanceiros/DatasConversaoCambio';
        console.log(url);
      return   $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
                   console.log('sucesso ao buscar datas de cambio.', response);
                  return response.data; 
   
    }, function myError(response) { 
          console.log('Erro ao buscar datas de cambio.',response);
    });
}



 var getTaxasCambio = function()
{
        var url = UrlAPI + 'CRM/AcordosFinanceiros/TaxaCambio';
        console.log(url);
      return   $http({
        method : "GET",
        url : url
    }).then(function mySuccess(response) {
                   console.log('sucesso ao buscar Taxas de cambio.', response);
                  return response.data; 
   
    }, function myError(response) { 
          console.log('Erro ao buscar datas de Taxas.',response);
    });
}



     var putRequest = function(caminho, data)
    {
    console.log(UrlAPI+caminho);
    var url = UrlAPI+caminho;
      return   $http({
      method: 'PUT',
    url: url,
    data: data,
    headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
        return response;
    });
    }

     var deleteRequest = function(caminho)
    {
    console.log(UrlAPI+caminho);
    var url = UrlAPI+caminho;
      return   $http({
      method: 'DELETE',
    url: url,
    headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
        return response;
    });
    }




	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	  function fechaModal(idModal)
	{
		 $('#'+idModal).modal('toggle'); 
	}

 function goToTopPage()
  {
    document.location.href = "#top";
  }






    return {
         UrlAPI: UrlAPI,
         getRequest : getRequest,
         getParameterByName: getParameterByName,
         postRequest:postRequest,
         fechaModal:fechaModal,
         putRequest : putRequest,
         deleteRequest:deleteRequest,
         goToTopPage : goToTopPage,
         filterDataYesNo:filterDataYesNo,
         filterDataAtivoInativo:filterDataAtivoInativo,
         filterDataTipoACordo: filterDataTipoACordo,
         getTodosProdutos:getTodosProdutos,
         getDatasConversaoCambio: getDatasConversaoCambio,
         getTaxasCambio: getTaxasCambio
    };


}]);