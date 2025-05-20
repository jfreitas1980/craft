// JavaScript Document

var req;
var t

function loadXMLDoc(url)
{
req = null;
    alert(url);
//    alert(Conteudo);
//    alert(Mensagem);
   
    // Procura por um objeto nativo (Mozilla/Safari)
    if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
        req.onreadystatechange = RetornaConteudo;
        req.open("GET", url, true);
        req.send(null);
        
    // Procura por uma versão ActiveX (IE)
    } else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        if (req) {
           req.onreadystatechange = RetornaConteudo;
           req.open("GET", url, true);
           req.send();
	   }
    }
    t = setTimeout("loadXMLDoc(url)",5000);
}

function RetornaConteudo()
{
    // apenas quando o estado for "completado"
    if (req.readyState == 4) {
        // apenas se o servidor retornar "OK"
        if (req.status == 200) {
            // procura pela div id="news" e insere o conteudo
            // retornado nela, como texto HTML

            document.getElementById(Conteudo).innerHTML = req.responseText;
            MostraMensagem(Mensagem);
            
        } else {
            alert("Houve um problema ao obter os dados:\n" + req.responseText);
        }
    }
}



