<%
Dim sDominio
Dim sEstilo 	' define prefixo estilo default.css
Dim sTitulo 	' define titulo da pagina

sDominio = Request.ServerVariables("SERVER_NAME") ' recupera dominio

Select Case sDominio
	Case "web.wil-haven.com.br"
		sEstilo = "wil-haven" 
		sTitulo = "WIL-HAVEN"
	Case "web.fr8logistics.com.br"
		sEstilo = "fr8" 
		sTitulo = "FR8"
	Case Else
		sEstilo = "asiashipping"
		sTitulo = "ASIA SHIPPING"
End Select
%>

