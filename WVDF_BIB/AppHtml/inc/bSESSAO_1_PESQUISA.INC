<!--#include FILE="bHash_Sha256.inc"-->
<%
    Dim aUsuarioNumeroRetorno, aUsuarioIPSessao, aUsuarioSISessao
    Dim aPES_HTTPLINK   
    Dim aPES_PROGRAMA   
    Dim aPES_PESSOA     
    Dim aPES_CLIENTE    
    Dim aPES_PESQUISA   
    Dim aPES_MENSAGEM   
    Dim aPES_EMPRESALOGO
    Session.Timeout=1200

	If (Request.QueryString("aUsuarioSessao")<>"") Then
       aUsuarioSessao           =Request.QueryString ("aUsuarioSessao")
       Session("aUsuarioSessao")=aUsuarioSessao
    Else
       aUsuarioSessao           =Session("aUsuarioSessao")
    End If  
 
    If (Request.QueryString("aProgramaChamador")<>"") Then
       aProgramaChamador           =Request.QueryString ("aProgramaChamador")
       Session("aProgramaChamador")=aProgramaChamador
    Else
       aProgramaChamador           =Session("aProgramaChamador")
    End If  
    

    If (Request.QueryString("aCLIENTE")<>"") Then
          aCLIENTE           =Request.QueryString ("aCLIENTE")
          Session("aCLIENTE")=aCLIENTE
    Else
          aCLIENTE           =Session("aCLIENTE")
    End If  
    
       
    If (Request.QueryString("aPESQUISA")<>"") Then
          aPESQUISA           =Request.QueryString ("aPESQUISA")
          Session("aPESQUISA")=aPESQUISA
    Else
          aPESQUISA           =Session("aPESQUISA")
    End If  
    
    aUsuarioIPSessao = Request.ServerVariables("REMOTE_ADDR")
    aUsuarioSISessao = SHA256(Session.SessionID)


    Retorno          =oPAG342_01.Call ("Get_f_VALIDAPESQUISA", aUSUARIOSESSAO, aCLIENTE, aPESQUISA)
    
    If Retorno       ="0" Then  

       aPES_HTTPLINK    = oPAG342_01.Call  ("Get_f_HTTPLINK",    aUSUARIOSESSAO, aCLIENTE, aPESQUISA)
       aPES_PROGRAMA    = oPAG342_01.Call  ("Get_f_PROGRAMA",    aUSUARIOSESSAO, aCLIENTE, aPESQUISA)
       aPES_PESSOA      = oPAG342_01.Call  ("Get_f_PESSOA",      aUSUARIOSESSAO, aCLIENTE, aPESQUISA)
       aPES_CLIENTE     = oPAG342_01.Call  ("Get_f_CLIENTE",     aUSUARIOSESSAO, aCLIENTE, aPESQUISA)
       aPES_PESQUISA    = oPAG342_01.Call  ("Get_f_PESQUISA",    aUSUARIOSESSAO, aCLIENTE, aPESQUISA)
       aPES_MENSAGEM    = oPAG342_01.Call  ("Get_f_MENSAGEM",    aUSUARIOSESSAO, aCLIENTE, aPESQUISA)
       aPES_EMPRESALOGO = oPAG342_01.Call  ("Get_f_EMPRESALOGO", aUSUARIOSESSAO, aCLIENTE, aPESQUISA)
       
    End If  
    
    If Retorno       ="1" Then  
       %>
            <SCRIPT language="JavaScript"><!--
                    {
                      alert('Pesquisa Inativa, Obrigado !!!');
        	          self.close();
                    }
            // --></SCRIPT>
       <%
    
    End If  
    nVALUSR          =Retorno

%>

