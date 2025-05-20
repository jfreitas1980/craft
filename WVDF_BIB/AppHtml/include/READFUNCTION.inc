<script language="JavaScript" type="text/javascript">

var req; 
var Campo; 

function ReadFunc(sValue,sObj,sFuncao,sCampo) {
Campo = sCampo
var url = "readfunction.asp?sObj=" + sObj + "&sFuncao=" + sFuncao + "&sValue=" + sValue; 

req = null; 
// Procura por um objeto nativo (Mozilla/Safari) 
	if (window.XMLHttpRequest) { 
		req = new XMLHttpRequest(); 
		req.onreadystatechange = processReqChange; 
		req.open("GET", url, true); 
		req.send(null); 
	// Procura por uma vers∆o ActiveX (IE) 
	} 
	else if (window.ActiveXObject) { 
		req = new ActiveXObject("Microsoft.XMLHTTP"); 
		if (req) { 
			req.onreadystatechange = processReqChange; 
			req.open("GET", url, true); 
			req.send(); 
		} 
	} 
} 

function processReqChange() { 
    // Enquanto Nao Carrega
  //  document.getElementById(iId).innerHTML = "<center><b>Carregando...</b></center>"; 
    // apenas quando o estado for "completado" 
	if (req.readyState == 4) { 
		// apenas se o servidor retornar "OK" 
		if (req.status == 200) { 
			// procura pela div id="news" e insere o conteudo 
			// retornado nela, como texto HTML 
			
			document.getElementById(Campo).value = req.responseText;
			
		}
		else {
			alert("Houve um problema ao obter os dados:\n" + req.statusText); 
		} 
	} 
} 
</script>
