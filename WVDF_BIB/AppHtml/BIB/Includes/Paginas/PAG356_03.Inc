        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG356", pRecNum, aPrograma)
            End function
        
            oPAG356_03.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG356_03.RequestFindbyRowId( "CSAG356", RowId)
            Else 
                Err = oPAG356_03.RequestClear("CSAG356",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG356__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG356_03.RequestClear("CSAG356",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG356_03.Call "Msg_SetUsuariosessao", aUsuarioSessao
      
                    oPAG356_03.Call "Set_pbReportErrors", 0
                    Err = oPAG356_03.RequestSave("CSAG356")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG356_03.RequestClear("CSAG356",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG356, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG356_03.Call "Set_pbReportErrors", 0
                    Err = oPAG356_03.RequestDelete("CSAG356")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG356_03.RequestClear("CSAG356",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG356, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG356_03.RequestFind("CSAG356", Index, LT)
                If Request("Find") <> "" Then Err = oPAG356_03.RequestFind("CSAG356", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG356_03.RequestFind("CSAG356", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG356_03.RequestFind("CSAG356", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG356_03.RequestFind("CSAG356", Index, LAST_RECORD)

            End If

        %>
        
       
