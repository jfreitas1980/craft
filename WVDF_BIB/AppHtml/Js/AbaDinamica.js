// JavaScript Document
	// montar abas -- comeco d_body
	sDivBody      = document.getElementById('d_body');
	sAbasTitulo = sDivBody.getElementsByTagName('div');
	parentDiv         = sDivBody.parentNode;
	sDivAba           = document.createElement("div");
	sDivAba.className = "d_aba";
	sDivAba.setAttribute("id", "d_aba");
	parentDiv.insertBefore(sDivAba, sDivBody);
	sDivAbas   = document.getElementById('d_aba');
	sTableAbas = document.createElement("table");
	sTBodyAbas = document.createElement("tbody");
	sTrAbas = document.createElement("tr");
	for(var i = 0; i < sAbasTitulo.length; i++) {
		sTdAbas = document.createElement("td");
		sTrAbas.appendChild(sTdAbas);
		sTdAbas.className = "b_aba_off";
//		sTdAbas.setAttribute("onclick", "altera(this)");  Nao funciona com o Internet Explorer
		sTdAbas.innerHTML = ('<span style="cursor:pointer" onclick="altera(this,'+i+')">'+sAbasTitulo[i].getAttribute('titulo')+'</span>');
	}
	sTdAbas = document.createElement("td");
	sTrAbas.appendChild(sTdAbas);
	sTBodyAbas.appendChild(sTrAbas);
	sTableAbas.appendChild(sTBodyAbas);
	sDivAbas.appendChild(sTableAbas);
	sTableAbas.setAttribute("cellspacing", "0");
	sTableAbas.setAttribute("id", "tabela_aba");
	sTableAbas.style.width="100%";
	sTableAbas.style.textAlign="left";
	// montar abas -- fim
	// mostrar primeira aba -- comeco
	sTrAbas.firstChild.className="b_aba_on";
	sAbasTitulo[0].style.visibility='visible';
	// mostrar primeira aba -- fim
	sDivPesquisa  = document.createElement("div");
	sDivPesquisa.className = "dAbaBody";
	sDivPesquisa.setAttribute("id", "dAbaBodyP");
	sDivBody.appendChild(sDivPesquisa);
	// funcao para trocar as abas
	function altera(celula_on,aba_body) {
		sDivBody    = document.getElementById('d_body');
		sAbasTitulo = sDivBody.getElementsByTagName('div');
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
		celula_on.parentNode.className = 'b_aba_on'
		sAbasTitulo[aba_body].style.visibility='visible';
	}
	// funcao para retornar a aba correta, nao esquecer q a primeira abaeh a numero 0 a segunda e o numero 1 e assim por diante
	function altera2(abaVisivel) {
		sDivBody    = document.getElementById('d_body');
		sAbasTitulo = sDivBody.getElementsByTagName('div');
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
		sTrAbas = sTrAbas.cells;
		sTrAbas[abaVisivel].className="b_aba_on";
		sAbasTitulo[abaVisivel].style.visibility='visible';
	}