
        <% 
        	If (Request.QueryString("aCLIENTE")<>"") Then
               aCLIENTE           =Request.QueryString ("aCLIENTE")
               Session("aCLIENTE")=aCLIENTE
            Else
               aCLIENTE           =Session("aCLIENTE")
            End If  
        
            oPHSAG320_01.Call "Msg_pHSAG320_01Dados", aUsuarioSessao, aCLIENTE 
            oPHSAG320_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "HSAG320", pRecNum, aPrograma)
            End function
        
            oPHSAG320_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPHSAG320_01.RequestFindbyRowId( "HSAG320", RowId)
            Else 
                Err = oPHSAG320_01.RequestClear("HSAG320",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("HSAG320__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPHSAG320_01.RequestClear("HSAG320",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPHSAG320_01.Call "Set_pbReportErrors", 0
                    Err = oPHSAG320_01.RequestSave("HSAG320")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPHSAG320_01.RequestClear("HSAG320",1)
                       
                       %>
                          <SCRIPT language="JavaScript"><!--
                                  {
                                  alert('Notificacao efetuada Com Sucesso !!!.');
                      	          var int=self.setInterval("top.close();",1000);
                                  }
                          // --></SCRIPT>
                       <%

                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG320, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPHSAG320_01.Call "Set_pbReportErrors", 0
                    Err = oPHSAG320_01.RequestDelete("HSAG320")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPHSAG320_01.RequestClear("HSAG320",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG320, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPHSAG320_01.RequestFind("HSAG320", Index, LT)
                If Request("Find") <> "" Then Err = oPHSAG320_01.RequestFind("HSAG320", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPHSAG320_01.RequestFind("HSAG320", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPHSAG320_01.RequestFind("HSAG320", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPHSAG320_01.RequestFind("HSAG320", Index, LAST_RECORD)

            End If

        %>
