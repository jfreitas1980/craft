/* function autoTab() 
{ 
	$('input[@type=text]:visible').add('input[@type=password]:visible').add('textarea:visible').each( function(i) {
		
		var iNext = i + 1;
		
		$(this).keyup( function(e) {
		
			switch(e.keyCode)
			{
				case 9: // TAB
					return false;
				case 16: // SHIFT
					return false;
				case 20: // CAPSLOCK
					return false;
				default:
				
					var maxLen = $(this).attr("maxlength") || 10000; 
			
					if($(this).val().length+1 > maxLen)
					{
		                var sType = $('input[@type=text]:visible').add('input[@type=password]:visible').add('textarea:visible');
		                var sNext = sType.eq(iNext); 
		                
						sNext.focus();
					}
				
					break;
			}
					
		});
	});
}
 */
 
function Trim(str)
{
	return str.replace(/^\s+|\s+$/g,"");
}
 
function fOpenWindow(sHref,sName)
{ 
	//var windowNote = window.open(sHref,sName,'toolbar=1,location=0,directories=0,status=1,scrollbars=1,resizable=1,copyhistory=0,left=0,top=0');
    var windowNote = window.open(sHref,sName,'toolbar=1,location=0,directories=0,status=1,scrollbars=1,resizable=1,copyhistory=0,width='+screen.availWidth+',height='+screen.availHeight+',top=0,left=0');
	//if (windowNote.screen) {
    //    var aw = screen.availWidth;
    //    var ah = screen.availHeight;
    //    windowNote.moveTo(0, 0);
    //    windowNote.resizeTo(aw, ah);
    //}

    windowNote.focus();
	

	
    
	//if (windowNote.screen) {
    //    var aw = screen.availWidth;
    //    var ah = screen.availHeight;
    //    //windowNote.moveTo(0, 0);
    //    //windowNote.resizeTo(aw, ah);
    //}
	



	
    return false;
}


function mostraTab(aba)
{
	$('div').find('td[id^=btab_]').removeClass();
	$('div').find('td[id^=btab_]').addClass('tab-off');
	$('div').find("td[id=btab_"+aba+"]").removeClass('tab-off');
	$('div').find("td[id=btab_"+aba+"]").addClass('tab-on');
	$('div').find("div[id^=tab_]").hide();
	$('div').find("div[id=tab_"+aba+"]").show()._LoadIframeChildren();
}

function mostraTab2(aba)
{
	$('div').find('td[id^=btab2_]').removeClass();
	$('div').find('td[id^=btab2_]').addClass('tab-off');
	$('div').find("td[id=btab2_"+aba+"]").removeClass('tab-off');
	$('div').find("td[id=btab2_"+aba+"]").addClass('tab-on');
	$('div').find("div[id^=tab2_]").hide();
	$('div').find("div[id=tab2_"+aba+"]").show()._LoadIframeChildren();
}

// INICIO ADD TABLE

function fTableAdd_PreSave() 
{
	var arrValue = new Array();
	var i = 0;
	
	$(".tableAdd tr td.save").each(function(){
		arrValue[i] = $(this).find('input').val();
		i++;
	});
	
	fTableAdd_posSave(arrValue);
}

function fTableAdd() 
{ 
	$(".tableAdd tr td.action a").click(function(){
		
		fTableAdd_PreSave() ;
		
		return false;
	});
}


// INICIO EDIT TABLE

function fTableEdit () 
{ 
	$("table[class*=tableEdit] tr").each(function() {
	
		var trId = $(this).attr('id');
		
		$(this).find('td.action a').click(function(){
			
			switch ($(this).attr('class')){
				case "S": 
					fTableEdit_PreSave($(this),trId)
				break;
				case "D": 
					if(confirm('Deseja excluir o registro?'))
					{
						fTableEdit_PreDelete($(this),trId);
					}
					else 
					{
					 return false;
					}
					
					
					
				break;
				default : 
					fTableEdit_PosEdit($(this),trId);
			}

			return false;
		});
	
	});
}

function fTableEdit_PreDelete(o,trId) 
{
	var arrValue = new Array();
	arrValue[0] = trId;
	
	fTableEdit_posDelete(arrValue);
}

function fTableEdit_PreSave(o,trId) 
{
	var arrValue = new Array();
	var i = 1;
	var inputValue;
	
	arrValue[0] = trId;
	
	$('table[class*=tableEdit] tbody tr[id='+ trId +']').find('td[class=edit]').each(function(){
		
		inputValue = $(this).find('input').val();
		arrValue[i] = inputValue;
		$(this).html(inputValue);
		i++;
	});
	
	fTableEdit_posSave(arrValue);
	
	o.html('EDITAR');
	o.attr('class','E')
} 

function fTableEdit_PosEdit(o,trId) 
{
	o.html('SALVAR');
	o.attr('class','S')
	
	var i = 0;
	var txtID;
	var txtValue;
	
	$('table[class*=tableEdit] tbody tr[id='+ trId +']').find('td[class=edit]').each(function(){
		
		txtName = "editText_" + i + "_" + trId;
		txtValue = $(this).html();
		
		$(this).html("<input type=\"text\" name=\""+txtID + "\" id=\""+txtID + "\" value=\"" + txtValue + "\" style=\"width: 100%;\"" );
		
		i++;
	});
}

function SomenteNumero(e){
    var tecla=(window.event)?event.keyCode:e.which;
    
    if((tecla > 47 && tecla < 58)) 
    {
        return true;
    }
    else
    {
        if (tecla != 8) 
            return false;
        else 
            return true;
    }
}
// FIM INICIO EDIT TABLE


jQuery.fn.extend({
    
	readfunction: function (val, obj, fnc) {
		
		return this.each(function() { 
			
			var retorno = $.ajax({
				type: "GET",
				url: "readfunction.asp",
				data: "sObj=" + obj + "&sFuncao=" + fnc + "&sValue=" + val,
				async: false
			}).responseText;

			$(this).val(retorno);
			
		});
    
	}
});





function ReadFuncValue(valor,obj,func) 
{
	var retorno = $.ajax({
		type: "GET",
		url: "readfunction.asp",
		data: "sObj=" + obj + "&sFuncao=" + func + "&sValue=" + valor,
		async: false
	}).responseText;

	return retorno;
} 



/**
 * Método GLOBAL para gerar o botão GED
 */
$.fn.botaoGed = function(oGed, jqueryBind) {     

    var oBotao = this;

	if(typeof(jqueryBind) != 'function'){
		jqueryBind = $;            
	}
	//return false;
    jqueryBind.ajaxSetup({ scriptCharset: "iso-8859-1", jsonp:false});
    // Verifica se o jQuery UI está incluido no sistema
    if(!jqueryBind.ui){
	
        jqueryBind.getScript("/wvdf_bib/scripts/third/jquery.ui/jquery-ui-1.8.16.custom.min.js?" + Math.random(), function(data, textStatus){
            //alert("OK");
            if(textStatus == 'success'){
                jqueryBind("head").append("<link>");
                css = jqueryBind("head").children(":last");
                css.attr({
                  rel:  "stylesheet",
                  type: "text/css",
                  href: "/wvdf_bib/stylesheet/third/jquery.ui/redmond/jquery-ui-1.8.15.custom.css"
                }); // css                
                jqueryBind(oBotao).botaoGed(oGed, jqueryBind);  
            } else {
            //    alert("Erro ao carregar o GED");
            }
        });
        return false;
    }
    // Transforma o botão GED em um botão usando jQuery UI
    $(this).button();

	if(typeof(geraGed) != "function"){
		jqueryBind.getScript("/wvdf_bib/scripts/page/wvdf_cac_8/pged0379.js?" + Math.random(), function(data, textStatus){			
			if(textStatus == 'success'){
				if(typeof(geraGed) == 'undefined'){
					eval(data.toString());
					//alert(data);
				}
			} else {
				alert("Erro ao carregar o GED");
			}
		});       
	}
    
    // Implementa o método CLICK no botão
    jqueryBind(this).click(function(){
        
        jqueryBind.ajaxSetup({ scriptCharset: "iso-8859-1"});
        jqueryBind("#gedModal").remove();
        jqueryBind("body").append(jqueryBind("<div>").attr({'id':'gedModal'}));
        geraGed(oGed, jqueryBind);  
               
        return false;
    });
}; // botaoGed 

function getUrl(getter){
    if(getter != ''){
        var matcher  = RegExp("(" + getter + "([^&|\#]+))", "i");
        var replacer = RegExp(getter + "=", "i");
        if(window.location.href.match(/\?/gi)){
            var gets = window.location.href.split("?");
            if(gets[1] && gets[1].match(matcher)){
                return window.location.href.split("?")[1].match(matcher)[0].replace(replacer , '');
            }        
        }
    }
    
    return '';
    
}
function getVrSessionId(){
    return getUrl('vrsessionid');
}

if(!VrSessionId || getVrSessionId() != ""){
    var VrSessionId = getVrSessionId();
}

function getUserName(){
	if(UserName){
		return UserName;
	}
}

Number.prototype.formatMoney = function(c, d, t){
var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

 
 

/**
 * Método jQuery para obter descrição através de códigos.
 * @param obj - Objeto dataflex utilizado
 * @param func - Função do objeto dataflex que pega a descrição
 * @param target - Objeto jQuery do campo que irá receber o valor
 */
$.fn.pegaDescricao = function(obj, func, target, callback){
	
	var $this = $(this);

	if(!obj){
		if($(this).attr('id').split("__")[1].match(/cd_/gi)){
			obj = "o" + $(this).attr('id').split("__")[1].replace(/cd_/, "").toUpperCase() + "_02";
		} else {
			obj = "o" + $(this).attr('id').split("__")[0].toUpperCase() + "_02";
		}
	}

	if(!func){
		func = "get_f_pegaDescricao";
	}

	if(!target){
	   var campo = $this;
	   var index = $(campo).parents("form").find(":input").index($(campo));
	   var target = $(campo).parents("form").find(":input").eq(index+1);          
	}
	
	$this.blur(function(){
		$.get("readfunction.asp", "sObj=" + obj + "&sFuncao=" + func + "&sValue=" + $this.val(), function(data){
			target.val(data);      
			if(callback){
				callback();
			}
		});
	});
}		


/**
 * Método jQuery para obter descrição através de códigos.
 * @param obj - Objeto dataflex utilizado
 * @param func - Função do objeto dataflex que pega a descrição
 * @param target - Objeto jQuery do campo que irá receber o valor
 * @param indexes - Indices dos valores obtidos via servidor
 * @param callback - Se informado, método que é executado ao selecionar
 * @param segundoArgumento - Segundo argumento que vai no lugar do session id (em alguns casos vai user name)
 */
$.fn.busca = function(obj, func, target, indexes, callback, segundoArgumento){
	
	
	var $this = $(this);
	var segundoArgumento;
	if(!segundoArgumento){
		segundoArgumento = getVrSessionId();
	} else {
		if(typeof(segundoArgumento)=='object'&&(segundoArgumento instanceof Array)){
			segundoArgumento = segundoArgumento.join("\",\"")
		}
	}
	
	if(!obj){
		if($(this).attr('id').match(/_nm_/gi)){
			obj = "o" + $(this).attr('id').split("__")[1].replace(/nm_/, "").toUpperCase() + "_02";
		} else {
			obj = "o" + $(this).attr('id').split("__")[0].toUpperCase() + "_02";
		}
	}	
	
	if(!func){
		if($(this).attr('id').match(/_nm_/gi)){
			func = "Get_fBusca" + $(this).attr('id').split("_nm_")[1].toUpperCase();
		} else {
			func = "Get_fBusca" + $(this).attr('id').split("__")[0].toUpperCase();
		}
		
		
	}	

	if(!target){
		var campo = this;
		var index = $(campo).parents("form").find(":input").index($(campo));
		var target = $(campo).parents("form").find(":input").eq(index-1);        
	}	
	
	if(!indexes){
		var indexes = {'id':0, 'value':1};				
	} else {
	
		// Verifica se indexes é array com 2 itens = CÓDIGO e VALOR
		if(typeof(indexes)=='object'&&(indexes instanceof Array) && indexes.length == 2){
			indexes = {'id':indexes[0], 'value':indexes[1]}
		}
		// Verifica se indexes é array com 3 itens = CÓDIGO, VALOR e EXIBIÇÃO
		if(typeof(indexes)=='object'&&(indexes instanceof Array) && indexes.length == 3){
			indexes = {'id':indexes[0], 'value':indexes[1], 'label':indexes[2]}
		}
		// Verifica se indexes é array com 3 itens = CÓDIGO, VALOR, EXIBIÇÃO e DESCRICAO
		if(typeof(indexes)=='object'&&(indexes instanceof Array) && indexes.length == 4){
			indexes = {'id':indexes[0], 'value':indexes[1], 'label':indexes[2], 'desc':indexes[3]}
		}					
	}
	
	if(!callback){
		callback = function( event, ui ) {
			if(target){
				target.val(ui.item.id);
			}
		}
	}
	
	
	$(this).autocomplete({
		source:function(request, response){
			var dados;
			$.ajaxSetup({'async':false});
			var content = $.get("readfunction.asp", "sObj=" + obj + "&sFuncao=" + func + "&sValue=" + request.term + "\",\"" + segundoArgumento);
			var linhas = content.responseText.split("\n");
			var data = [];
			for (x in linhas){
				dados = linhas[x].split("|");
				data[x] = {}
				for(y in indexes){
					data[x][y] = dados[indexes[y]];
				}
			}
			
			response(data);
		},

		focus: function( event, ui ) {
			$this.val( ui.item.value );
			return false;
		},
		select: callback					

	})
	.data( "autocomplete" )._renderItem = function( ul, item ) {
		
		if(item.label && !item.desc){
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a>" + item.label + "</a>" )
				.appendTo( ul );					
		}
		
		if(item.label && item.desc){
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a><strong>" + item.label + "</strong><br>" + item.desc + "</a>" )
				.appendTo( ul );						
		}
	};
}

//--- function para validar formato do e-mail.
function is_email(email)
{
	var er = RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
       
	if(email == "")
		return false;
	else if(er.test(email) == false)
		return false;
   
	return true;
}


/**
* moeda
*
* @abstract Classe que formata de desformata valores monetários
* em float e formata valores de float em moeda.
*
* @example
* moeda.formatar(1000)
* >> retornar 1.000,00
* moeda.desformatar(1.000,00)
* >> retornar 1000
*
* @version 1.0
**/
var moeda = {

	/**
	* retiraFormatacao
	* Remove a formatação de uma string de moeda e retorna um float
	* @param {Object} num
	*/
	desformatar: function(num){
		while(num.indexOf('.') != -1){
			num = num.replace(".","");
		}
		while(num.indexOf(',') != -1){
			num = num.replace(",",".");
		}
		while(num.indexOf(' ') != -1){
			num = num.replace(" ","");
		}
		return parseFloat(num);
	},
	
	/**
	* formatar
	* Deixar um valor float no formato monetário
	* @param {Object} num
	*/
	formatar: function(num){
		num = num.toString();
		while(num.indexOf(' ') != -1){
			num = num.replace(" ","");
		}
		num = parseFloat(num);
		x = 0;
		if(num<0){
			num = Math.abs(num);
		x = 1;
		}
		if(isNaN(num)) {
			num = "0";
		}
		cents = Math.floor((num*100+0.5)%100);
		num = Math.floor((num*100+0.5)/100).toString();
		if(cents < 10) {
			cents = "0" + cents;
		}
		for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++){
			num = num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
		}
		ret = num + ',' + cents;
		if (x == 1){
			ret = ' – ' + ret;
		}
		ret = ret.replace(" ","");
		return ret;
	},
	
	/**
	* arredondar
	* @abstract Arredonda um valor quebrado para duas casas
	* decimais.
	* @param {Object} num
	*/
	arredondar: function(num){
		return Math.round(num*Math.pow(10,2))/Math.pow(10,2);
	}
}

/**
 * Médoto para salvar seguindo o padrão DataFlex + ASP utilizando retorno em JSON
 * @param url - URL que os dados serão enviados. O não preenchimento tenta deduzir através do action do form. Caso não haja, é retornado um alerta.
 * @param callbackSuccess - Function para ser executada em caso de sucesso.
 * @param callbackError - Function para ser executada em caso de erro.
 */
$.fn.savePadrao = function(url, callbackSuccess, callbackError){
	var $t = $(this);
	var data = $t.find(":input").serializeArray();
	var post = {}
	
	if(!url){
		var url = $t.attr('action');
		if(url == "") alert("Erro de implementação\nDefinir URL no <form action=\"url.asp\"> ou \n$(\"form\").savePadrao(\"url.asp\")");
		return false;
	}
	for(x in data){
		post[data[x].name] = data[x].value;
	}
	
	delete data;
	post['Request'] = "Save";		
			    
	$.ajax({
		type: 'POST',
		url: url,
		data: post,
		success: function(data) {
			if(typeof(data) == "object"){
				$t.loadJson(data);
			}
			
		},
		error:function(jqXHR, textStatus, errorThrown) {
			console.log([jqXHR, textStatus, errorThrown]);
			if (errorThrown.match(/ERROS DO SISTEMA/gi)) {
				var msg = errorThrown.split("ERROS DO SISTEMA</strong>")[1];
				msg = msg.replace(/<br \/><br \/><br \/>/gi, "");
				$("<div>" + msg + "</div>").dialog({title:"ERRO"});
			}					
		}
	});
}		
	
$.fn.loadJson = function(data){
	var $t = $(this);
	var campo;
	
	if($t.is("form")){
		for(x in data){
			campo = $("[name='" + x + "']", $t);
			
			if(campo.is(":input:radio") || campo.is(":input:checkbox")){
				campo.each(function(){
					if($(this).val() == data[x]){
						$(this).attr('checked', true);
					} else {
						$(this).attr('checked', false);
					}
				});
			} else {
				campo.val(data[x]);
			}
		}
	}
}
