// config da barra
var BarraNumero = 24;
var BarraCor1 = '#7F8DA8'; // cor clara
var BarraCor2 = '#667077'; // cor escura

var dC = document;
function $(id) {
	return document.getElementById(id);
}

function adjustIframeHeightOnLoad(s){ 
    typeof(adjustIframeHeight)!="undefined" ? adjustIframeHeight(s) : setTimeout(function(){adjustIframeHeightOnLoad(s)},100);
}

/* funções para módulo de videos */
/* mescla tags do editor com as tags padrão, excluindo duplicadas */
var concatArrays = function(tags) {
	var a = configVideosEstacao.listConfig.tagsIds;
	var b = tags;
	
	var aArray = a.split(',');
	var bArray = b.split(',');
	for(var i=0;i<aArray.length;i++){
		var c = aArray[i];
		for(var j=0;j<bArray.length;j++){
		
			if(c == bArray[j]) {
				bArray.splice(j);
				if(j>0)j--;
			}
		}
	}
	return aArray.concat(bArray).join(",");
}

/* concatena ids do editorsChoice*/
var concatIds = function() {

	var id,ids=[];
	for(id in editorsChoice.list) {
		if(editorsChoice.list.hasOwnProperty(id)) {//segurança de código
			if(id != 'zero') ids.push(id);
		}
	}
	
	return ids.join(',');
	
}
/* funções para módulo de videos */



