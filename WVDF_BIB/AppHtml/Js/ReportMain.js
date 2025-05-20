// JavaScript Document
// Criando elementos
sBody		  = document.getElementsByTagName('body');
sDivCellExplain   = document.createElement("div");
iFrameExplain     = document.createElement("iframe");
jsRunReport       = document.createElement("input");
jsRunReport.type  = ("hidden");
jsRunReport.name  = ("RunReport");
jsRunReport.value = ("RunReport");
jsSessao          = document.createElement("input");
jsSessao.type     = ("hidden");
jsSessao.name     = ("aUsuarioSessao");

sBackColor        = "";

function Hilight(oObj, bState){
	if (bState)	{
		oldBgColor = oObj.style.backgroundColor;
		sBackColor = oldBgColor;
		oObj.style.backgroundColor = "#E3E3FF";
	}
	else {
		oObj.style.backgroundColor = sBackColor;
	}
}

j = true
allRows = document.getElementsByTagName('tr')
for (i=0; i<allRows.length; i++){
	if (allRows[i].className == 'tr_body'){
		if (j){
			allRows[i].style.backgroundColor = "#F5F9F9";
			j = false;
		}
		else{
			allRows[i].style.backgroundColor = "#FEFEFE";
			j = true;
		}
	}
}

function RowClick2(linha){
	valor = linha.getAttribute('valores');
	campo = linha.getAttribute('campos');
	jsTabela = linha.getAttribute('programa');
	jsTipoRetorno = ('<%= aTipoRetorno %>');
	switch(jsTipoRetorno){
		case '1':
		parent.posiciona(campo,valor,jsTabela);
		break    
		case '2':
		break    
		default:
		parent.posiciona(campo,valor,jsTabela);
	}
}

function Explain(campo, bState, pagina) {

	if (bState)	{
		sDivCellExplain.className = "DivCellExplain";
		sDivCellExplain.setAttribute("id", "DivCellExplain");
		iFrameExplain.setAttribute("src", (pagina));
		iFrameExplain.setAttribute("id", "iFrameExplain"); 
		iFrameExplain.frameBorder=0;
		iFrameExplain.className = "iFrameExplain";
		sDivCellExplain.appendChild(iFrameExplain);
		sBody[0].appendChild(sDivCellExplain);
		sDivCellExplain.style.dysplay='none';
	}
	else {
		sDivCellExplain.style.dysplay='block';
	}
}

function jsEnviar(formulario, sessao) {
    jsSessao.value       = sessao;
	jsForms              = document.getElementsByTagName('form');
	jsCurrentForm        = jsForms[formulario];
	jsCurrentForm.appendChild(jsRunReport);
	jsCurrentForm.appendChild(jsSessao);
	jsAction             = jsCurrentForm.getAttribute('action');
	jsCurrentForm.action = (jsAction);
	jsCurrentForm.submit();
}
