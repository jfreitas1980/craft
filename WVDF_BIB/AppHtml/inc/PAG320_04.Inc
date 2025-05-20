        <% 
            oPAG320_04.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG320", pRecNum, aPrograma)
            End function
        
            oPAG320_04.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG320_04.RequestFindbyRowId( "CSAG320", RowId)
            Else 
                Err = oPAG320_04.RequestClear("CSAG320",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG320__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG320_04.RequestClear("CSAG320",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG320_04.Call "Set_pbReportErrors", 0
                    Err = oPAG320_04.RequestSave("CSAG320")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG320_04.RequestClear("CSAG320",1)
                       
                       %>
                          <SCRIPT language="JavaScript"><!--
                                  {
                                  alert('Altera‡Æo efetuada Com Sucesso !!!.');
                      	          var int=self.setInterval("top.close();",1000);
                                  }
                          // --></SCRIPT>
                       <%
                       
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG320, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG320_04.Call "Set_pbReportErrors", 0
                    Err = oPAG320_04.RequestDelete("CSAG320")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG320_04.RequestClear("CSAG320",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG320, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPAG320_04.RequestFind("CSAG320", Index, LT)
                If Request("Find") <> "" Then Err = oPAG320_04.RequestFind("CSAG320", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG320_04.RequestFind("CSAG320", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG320_04.RequestFind("CSAG320", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG320_04.RequestFind("CSAG320", Index, LAST_RECORD)

            End If

        %>
