 /*
created by João Milton Lavoier Filho
functions calls to ajax, json and autocomplete
more details in "document default-front-end.txt"
*/

 $.fn.get_ajax_function = (function(obj,func,param,error){
 	//Move the object seletor in variable
	var thisobj = $(this);
	//Adding the dataflex object like parameter
	param.obj = obj;
	//Adding the dataflex function like parameter
	param.func = func;
	//
	$(thisobj).html("");
	
	$.ajax({
		type:"post",
		url:"ajax_function.asp",
		data : param,
		success: function(data){
			
			$(thisobj).html(data);
		},
		error: function(data){
			if (error){
				$(thisobj).html("<p>Erro ajax: <strong> ajax_function.asp </strong></p>");
				$(thisobj).append(data.responseText);
			}
		}
	});
	return ;
});

$.fn.get_ajax_function_prepend = (function(obj,func,param,error){
 	//Move the object seletor in variable
	var thisobj = $(this);
	//Adding the dataflex object like parameter
	param.obj = obj;
	//Adding the dataflex function like parameter
	param.func = func;
	//
	$.ajax({
		type:"post",
		url:"ajax_function.asp",
		data : param,
		success: function(data){
			$(thisobj).prepend(data);
		},
		error: function(data){
			if (error){
				$(thisobj).html("<p>Erro ajax: <strong> /webassn91/ajax_function.asp </strong></p>");
				$(thisobj).append(data.responseText);
			}
		}
	});
	return ;
});

$.fn.get_ajax_function_append = (function(obj,func,param,error){
 	//Move the object seletor in variable
	var thisobj = $(this);
	//Adding the dataflex object like parameter
	param.obj = obj;
	//Adding the dataflex function like parameter
	param.func = func;
	//
	$.ajax({
		type:"post",
		url:"ajax_function.asp",
		data : param,
		success: function(data){
			$(thisobj).append(data);
		},
		error: function(data){
			if (error){
				$(thisobj).html("<p>Erro ajax: <strong> ajax_function.asp </strong></p>");
				$(thisobj).append(data.responseText);
			}
		}
	});
	return ;
});

var get_ajax_function = (function(obj,func,param,error,callback){
	var d = new Date();
	var n = d.getTime();
 	//Move the object seletor in variable
	var thisobj = $(this);
	//Adding the dataflex object like parameter
	param.obj = obj;
	//Adding the dataflex function like parameter
	param.func = func;
	//
	$.ajax({
		type:"post",
		url:"ajax_function.asp?time="+n,
		data : param,
		success: function(data){
			callback(data);
		},
		error: function(data){
			if (error){
				callback("<p>Erro ajax: <strong> ajax_function.asp </strong></p>"+ data.responseText);
			}
		}
	});
	return ;
});

var get_json_function = (function(obj,func,param,error,callback){
	//Get time to fix buffer problem of internet explorer
	var d = new Date();
	var n = d.getTime();
 	//Move the object seletor in variable
	var thisobj = $(this);
	//Adding the dataflex object like parameter
	param.obj = obj;
	//Adding the dataflex function like parameter
	param.func = func;
	//
	$.ajax({
		type:"post",
		dataType: "json",
		async: false,
		url:"ajax_function.asp?time="+n,
		data : param,
		success: function(data){
			callback(data);
		},
		error: function(err){
			callback(err);
			//callback("<p>Erro ajax: <strong> ajax_function.asp </strong></p>"+ data.responseText);
		}
	});
	return ;
});

var global_scroll_top = $(window).scrollTop();

$.fn.autocomplete = (function(oAC){
		var input		= $(this);
		var inputParent = $(this).parent();
		var objListagem;

		$(this).keyup(function(){
			//vars
			var strVal  	= input.val();
			var type		= (oAC.type != null && oAC.type !="")? oAC.type : "select";
			var strLen  	= (oAC.lengthtrigger != null)? oAC.lengthtrigger : 3;
			var desc		= (oAC.desc != null && oAC.desc !="")? oAC.desc : "desc";
			var widthsum    = (oAC.widthsum != null && oAC.widthsum !="")? oAC.widthsum : 0;
			var htmlMenu	= "";
			var qnt			= 0;
			
			var params 		= $.extend({inicial:strVal},oAC.params);
			
			//trigger condition
			if (strVal.length >= strLen){
			
				inputParent.children(".autocomplete-list").remove();
				
				//Get JSON list objects 
				get_json_function(oAC.obj,oAC.func,params,1,function(retorno){
					objListagem = retorno;
				});
				
				qnt = objListagem.length;
				
				//PARA DEBUGAR DESCOMENTE ESTA LINHA, PARA SABER O RETORNO
				//MOSTRARA UM ALERT COM O RETORNO
				//get_ajax_function(oAC.obj,oAC.func,params,1,function(retorno){
				//	objListagem = retorno;
				//	alert(retorno);
				//});
				
				/*//LOG
				var d = new Date();
				var h = d.getHours();
				var m = d.getMinutes();
				var s = d.getSeconds();
				console.log("Digitando texto: "+strVal+" "+h+":"+m+":"+s);
				var txtobj = '[';
				for (var keyobj in objListagem){
					txtobj += keyobj+':{';
					for (var keyitem in objListagem[keyobj]){
						txtobj += '"'+keyitem+'" : "'+objListagem[keyobj][keyitem]+'", ';
					}
					txtobj += '},';
				}
				txtobj += ']';
				console.log("obj: "+txtobj);
				//Fim LOG*/
				
				//if the type of autocomplete is select
				if (type == "select"){
					var val	= (oAC.val != null && oAC.val !="")? oAC.val : "val";
					htmlMenu = '<ul class="dropdown-menu autocomplete-list selecttype" id="aqui">';
					for (var item in objListagem){
						htmlMenu += '<li >';
						htmlMenu += 	'<input type="hidden" class="item" value="'+item+'" />';
						htmlMenu +=		'<input type="hidden" class="val"  value="'+objListagem[item][val]+'" />';
						htmlMenu +=		'<a href="#">'+objListagem[item][desc]+'</a>';
						htmlMenu +=	'</li>';
					}
					htmlMenu += '</ul>';
					
				//if the type of autocomplete is a link
				}else if (type == "link"){
					var href	= (oAC.href != null && oAC.href != "")? oAC.href : "href";
					htmlMenu = '<ul class="dropdown-menu autocomplete-list linktype">';
					for (var item in objListagem){
						htmlMenu += '<li><input type="hidden" class="item" value="'+item+'" />';
						htmlMenu += '<a href="'+objListagem[item][href]+'" target="_blank">'+objListagem[item][desc]+'</a></li>';
					}
					htmlMenu += '</ul>';
				}
				
				//if there is return show the list
				if (qnt > 0){
					inputParent.append(htmlMenu);
					var valor_drop = (inputParent.offset().top-($(window).height()/2));
					if(global_scroll_top < valor_drop) inputParent.addClass("dropup");
					else inputParent.removeClass("dropup");
					inputParent.children(".autocomplete-list").css({display:"block","min-width":input.width()+widthsum});
				}
			//if the trigger is disabled remove list
			}else{
				inputParent.children(".autocomplete-list").remove();
			}
		});
		
		//start the click event of list
		inputParent.delegate(".autocomplete-list li","click",function(e){
			e.preventDefault();
			var line		= $(this);
			var lineParent  = line.parent();
			var item 		= line.children(".item").val();
			var val 		= line.children(".val").val();
	
			/*//LOG
			var d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
			var s = d.getSeconds();
			console.log("click na linha: "+item+" "+h+":"+m+":"+s);
			var txtobj = '{';
			for (var keyobj in objListagem[item]){
				txtobj += '"'+keyobj+'" : "'+objListagem[item][keyobj]+'", ';
			}
			txtobj += '}';
			console.log("obj: "+txtobj);
			//Fim LOG*/
			
			input.val(val);
			lineParent.remove();
			
			oAC.onclick(objListagem[item]);
		});
		
		
});

$(window).scroll(function (e) {
	e.preventDefault();
	global_scroll_top = $(this).scrollTop();
});

var navegacao_mini = function(){
	var btnismini = $(".navegacao-col input").hasClass("btn-mini");
	var selismini = $(".navegacao-col select[name=Index]").hasClass("txt-mini");
	if(!btnismini) $(".navegacao-col input").addClass("btn-mini");
	if(!selismini) $(".navegacao-col select[name=Index]").addClass("txt-mini");
}

var navegacao = function(){
	var btnismini = $(".navegacao-col input").hasClass("btn-mini");
	var selismini = $(".navegacao-col select[name=Index]").hasClass("txt-mini");
	if(btnismini) $(".navegacao-col input").removeClass("btn-mini");
	if(selismini) $(".navegacao-col select[name=Index]").removeClass("txt-mini");
}

//if click on anything in screen then remove the list
//$(document).live("click",function(){$(".autocomplete-list").remove();});



$(document).ready(function(){
	var n = 0;
	//Manipulando os alerts de erros dos forms
	$(".alertform").each(function(){
		var obj = $(this);
		var strAlert = $(this).html().trim();
		if (strAlert){
			obj.show();
			obj.children("br").last().remove("br");
			obj.children("br").last().remove("br");
			obj.children("br").last().remove("br");
		}else{
			obj.hide();
		}
	});
	
		
	// === Resize window related === //
	
	
	$(window).resize(function(){
		//console.log(n+++": 4 ");
		if($(window).width() < 795){
			//console.log(n+++": 4.1 "+$(window).width());
			if ($(window).width() <= 640 && $(window).width() > 400 ) navegacao();
			else navegacao_mini();
		}
		if($(window).width() > 795){
		   //console.log(n+++": 4.2 "+$(window).width());
		   navegacao();
		}
	});

	if($(window).width() < 795){
		//console.log(n+++": 4.4");
		if ($(window).width() <= 640 && $(window).width() > 400 ) {
			//console.log(n+++": 4.4.1 "+$(window).width());
			navegacao();
		}else{
			//console.log(n+++": 4.4.1 "+$(window).width());
			navegacao_mini();
		}
	}
	
	if($(window).width() > 795){
		//console.log(n+++": 4.5 "+$(window).width());
		navegacao();
	}
});