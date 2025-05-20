<%
   If (Request.QueryString("aGrupoDinamico")<>"") Then
      aGrupoDinamico           =Request.QueryString ("aGrupoDinamico")
      Session("aGrupoDinamico")=aGrupoDinamico
   Else
      aGrupoDinamico           =Session("aGrupoDinamico")
   End If  

   oPMEN3103_01.Call "msg_fPMEN3103_01CarregaSessao", aUsuarioSessao
   Retorno=oPMEN3103_01.Call ("Get_fPMEN3103_01CarregaDados", aUsuarioSessao, aGrupoDinamico)
   nVALUSR=Retorno
   Retorno=oPMEN3103_01.Call ("Get_fPMEN3103_01DesativaStatusDigitacao", aUsuarioSessao, aGrupoDinamico)
%>

<% If (nVALUSR=9) Then %>
   <script language="JavaScript"><!--
   {alert("TMEN3103, Sr(a). SESSAO ENCERRADA !! Clique OK");}
   //--></script>
<% End If %>

<%
   function fLogSistema (pIndice, pRecNum)
            Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN3103", pRecNum, "PMEN3103_01")
   end function

  oPMEN3103_01.call "set_pbReportErrors", 1 'normally show any errors that occur
  'We either find a record, or clear the WBO

  If RecId <> "" Then
      Err = oPMEN3103_01.RequestFindbyRecId( "TMEN3103", RecId)
  else 
      Err = oPMEN3103_01.RequestClear("TMEN3103",1)
  End if

  ' process various buttons that might have been pressed.
  ' only support Post submissions
  If request("Request_method")="POST" Then

      aRecNum = Request("Tmen3103__Recnum")
      if Request("clear")<>"" then
         Err = oPMEN3103_01.RequestClear("TMEN3103",1)
      end if

      if Request("save")<>"" then
          If aRecNum =  "0" Then aIndice="2"
          If aRecNum <> "0" Then aIndice="3"
         
          err=oPMEN3103_01.Call ("Get_fPMEN3103_01VerificaQtUsuarioGrupo", aUsuarioSessao, aGrupoDinamico)
   
          If (err=1) Then
              %>
              <script language="JavaScript"><!--
              {alert("TMEN3103, Sr(a). SESSAO ENCERRADA !! Clique OK");}
              //--></script>
              <%
          End If
          If (err=2) Then
              %>
              <script language="JavaScript"><!--
              {alert("TMEN3103, Sr(a). USUARIO INEXISTENTE !! Clique OK");}
              //--></script>
              <%
          End If
          If (err=9) Then
              %>
              <script language="JavaScript"><!--
              {alert("TMEN3103, Sr(a). Nao Existe Usuarios Suficientes Para uma CONVERSA !! Clique OK");}
              //--></script>
              <%
          End If
          
          If (err=0) Then
              oPMEN3103_01.call "set_pbReportErrors", 0
              err = oPMEN3103_01.RequestSave("TMEN3103")
              
              If err = 0 Then
                  aNumeroMensagem  = oPMEN3103_01.DDValue("TMEN3103.MenNumero")
                  oPMEN3103_01.Call "msg_fPMEN3103_01EnviaEmailUsuariosOffLine", aNumeroMensagem
                  
                  If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                  Err = oPMEN3103_01.RequestClear("TMEN3103",1)
              Else
                  %>
                  <script language="JavaScript"><!--
                  {alert("TMEN3103, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");}
                  //--></script>
                  <%
              End If
          End If
      End If


 end if

%>

<script language=javascript>
<!--

function fChecaVariavel()
{
 if(document.Tmen3103.tmen3103__mensagem.value=="")
    {
      document.Tmen3103.submit();
    }

 var sMensagem=document.Tmen3103.tmen3103__mensagem.value
 if (sMensagem.length==0)
     {
      document.Tmen3103.submit();
     }  
     
 if (sMensagem.length>250)
     {
      alert("Texto MUITO GRANDE, maior que 250 Characters");
      document.Tmen3103.tmen3103__mensagem.focus();
     }  
}

function fSubmit()
{
      document.Tmen3103.submit();
}
// -->
</script>
