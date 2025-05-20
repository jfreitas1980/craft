// JavaScript Document
function AbaPesquisa(titulo,pagina,tipoRetorno) {
	sTableAbas = document.getElementById('tabela_aba');
	sTBody  = sTableAbas.firstChild;
	sTrAbas  = sTBody.firstChild;
	sUltCell = sTrAbas.lastChild;
	linha = sTableAbas.rows
	celulas = linha[0].cells
	temp = 0
	if (sUltCell.getAttribute("id")){temp = celulas.length-2}
	else {temp = celulas.length-1}
	for (i=0; i<temp; i++){
		celulas[i].className = 'b_aba_off';
	}
	if(! sUltCell.getAttribute("id")){
		sTdAbas = document.createElement("td");
		//sTrAbas.insertBefore(sTdAbas, sUltCell);
		sTrAbas.appendChild(sTdAbas);
		sTdAbas.setAttribute("id", "b_aba_search");
		sTdAbas.className = "b_aba_search";
		sTdAbas.innerHTML = ('<span style="cursor:pointer" onclick="mostraPesquisa(this)">'+titulo+'</span>');
	}
	sDivBody    = document.getElementById('d_body');
	sAbasTitulo = sDivBody.getElementsByTagName('div');
	sDivPesquisa = sDivBody.lastChild;
	if(! sDivPesquisa.hasChildNodes()){
		sIFramePesquisa = document.createElement("iframe");
		sIFramePesquisa.setAttribute("src", (pagina+'&aTipoRetorno='+tipoRetorno));
		sIFramePesquisa.setAttribute("id", "iFrame_search"); 
		sIFramePesquisa.frameBorder=0;
		sIFramePesquisa.className = "iFrame_search";
		sDivPesquisa.appendChild(sIFramePesquisa);
	}
	else {
		sIFramePesquisa = document.getElementById('iFrame_search');
		sIFramePesquisa.setAttribute("src", (pagina+'&aTipoRetorno='+tipoRetorno));
		sIFramePesquisa.className = "iFrame_search";
	}
	for(var i = 0; i < sAbasTitulo.length; i++) {
		sAbasTitulo[i].style.visibility='hidden';
	}
	sDivPesquisa.style.visibility='visible';
}
// funcao para exibir pesquisa
function mostraPesquisa(celula_on) {
	sDivBody    = document.getElementById('d_body');
	sAbasTitulo = sDivBody.getElementsByTagName('div');
	sDivPesquisa = sDivBody.lastChild;
	for(var i = 0; i < sAbasTitulo.length; i++) {
		sAbasTitulo[i].style.visibility='hidden';
	}
	sTableAbas = document.getElementById('tabela_aba')
	sTBody     = sTableAbas.firstChild;
	sTrAbas    = sTBody.firstChild;
	sUltCell   = sTrAbas.lastChild;
	linha = sTableAbas.rows
	celulas = linha[0].cells
	temp = 0
	if (sUltCell.getAttribute("id")){temp = celulas.length-2}
	else {temp = celulas.length-1}
	for (i=0; i<temp; i++){
		celulas[i].className = 'b_aba_off';
	}
	celula_on.parentNode.className = 'b_aba_search'
	sDivPesquisa.style.visibility='visible';
}
		// funcao para exibir pesquisa
function fechaPesquisa() {
	sTableAbas = document.getElementById('tabela_aba');
	sTBody  = sTableAbas.firstChild;
	sTrAbas  = sTBody.firstChild;
	sUltCell = sTrAbas.lastChild;
	sTrAbas.removeChild(sUltCell);
	sIFramePesquisa = document.getElementById('iFrame_search');
	sIFramePesquisa.setAttribute("src", '');
	sIFramePesquisa.className = "iFrame_search";
}