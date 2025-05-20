<%
   If (Request.QueryString("aUsuarioSessao")<>"") Then
      aUsuarioSessao           =Request.QueryString ("aUsuarioSessao")
      Session("aUsuarioSessao")=aUsuarioSessao
   Else
      aUsuarioSessao           =Session("aUsuarioSessao")
   End If  

   If (Request.QueryString("aGrupoDinamico")<>"") Then
      aGrupoDinamico           =Request.QueryString ("aGrupoDinamico")
      Session("aGrupoDinamico")=aGrupoDinamico
   Else
      aGrupoDinamico           =Session("aGrupoDinamico")
   End If  

   Retorno        =oPAG800_01.Call ("Get_fLogUSRSessao", aUsuarioSessao, "PMEN3101_01")
   nVALUSR        =Retorno
   
   If nVALUSR     ="0" Then aIdioma=oPAG800_01.Call ("Get_fRetIdioma", aUsuarioSessao)
   If nVALUSR     ="0" Then Retorno=oPAG309_01.Call ("Get_fIdiomaProgramas", aUsuarioSessao, "PMEN3101_01")
   If nVALUSR     ="0" Then Retorno=oPAG312_01.Call ("Get_fIdiomaBotoes", aUsuarioSessao)
   If nVALUSR     ="0" Then Retorno=oPMEN3101_01.Call ("Get_fPMEN3101_01", aUsuarioSessao, aGrupoDinamico)
   
%>
<%
   function fLogSistema (pIndice, pRecNum)
            Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN3101", pRecNum, "PMEN3101_01")
   end function

  oPMEN3101_01.call "set_pbReportErrors", 1 'normally show any errors that occur
  'We either find a record, or clear the WBO


  ' process various buttons that might have been pressed.
  ' only support Post submissions
  If request("Request_method")="POST" Then

      if Request("clear")<>"" then
         Err = oPMEN3101_01.RequestClear(TMEN3101,1)
      end if

      if Request("save")<>"" then
          
          aRecNum = oPMEN3101_01.DDValue("TMEN3101.RecNum")
          If aRecNum =  "0" Then aIndice="2"
          If aRecNum <> "0" Then aIndice="3"
      
          oPMEN3101_01.call "set_pbReportErrors", 0
          err = oPMEN3101_01.RequestSave(TMEN3101)
          
          if err = 0 then
              aRecNum = oPMEN3101_01.DDValue("TMEN3101.RecNum")
              If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
              Err = oPMEN3101_01.RequestClear(TMEN3101,1)
          else
              %>
              <script language="JavaScript"><!--
              {alert("TMEN3101, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");}
              //--></script>
              <%
          end if
      end if

      if Request("delete")<>"" then
          aRecNum = oPMEN3101_01.DDValue("TMEN3101.RecNum")
          If aRecNum<>"0" Then fLogSistema "4", aRecNum

          oPMEN3101_01.call "set_pbReportErrors", 0
          Err = oPMEN3101_01.RequestDelete(TMEN3101)
          if err = 0 then
          else
              %>
              <script language="JavaScript"><!--
              {alert("TMEN3101, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");}
              //--></script>
              <%
          end if
      end if

      if Request("validate")<>"" then
          aRecNum = oPMEN3101_01.DDValue("TMEN3101.RecNum")
          If aRecNum<>"0" Then fLogSistema "5", aRecNum

          oPMEN3101_01.call "set_pbReportErrors", 0
          err = oPMEN3101_01.RequestDDUpdate(TMEN3101,0)
          if Err = 0 then
              Response.Write("<table Align='Center'>")
              Response.Write("<tr>")
              Response.Write("<td>")
              Response.Write("<center> <h4>TMEN3101 - Informa‡Ses Corretas PoPMEN3101_01e Salvar</h4> </center>")
              Response.Write("</td>")
              Response.Write("</tr>")
              Response.Write("</table>")
          else
              Response.Write("<table Align='Center'>")
              Response.Write("<tr>")
              Response.Write("<td>")
              Response.Write("<center> <h4>TMEN3101 - Informacoes Incorretas, Registro Nao Pode Ser Salvo, Erros Abaixo</h4> </center>")
              Response.Write("</td>")
              Response.Write("</tr>")
              Response.Write("</table>")
              oPMEN3101_01.call "msg_ReportAllErrors"
              Response.Write("</font>")
          end if
      end if

      if Request("findprev") <>"" then  Err = oPMEN3101_01.RequestFind(TMEN3101, Index, LT)
      if Request("find")     <>"" then  Err = oPMEN3101_01.RequestFind(TMEN3101, Index, GE)
      if Request("findnext") <>"" then  Err = oPMEN3101_01.RequestFind(TMEN3101, Index, GT)
      if Request("findfirst")<>"" then  Err = oPMEN3101_01.RequestFind(TMEN3101, Index, FIRST_RECORD)
      if Request("findlast") <>"" then  Err = oPMEN3101_01.RequestFind(TMEN3101, Index, LAST_RECORD)

 end if

%>




