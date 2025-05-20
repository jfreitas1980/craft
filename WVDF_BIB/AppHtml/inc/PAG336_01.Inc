        <% 
            oPAG336_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG336", pRecNum, aPrograma)
            End function
        
            oPAG336_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG336_01.RequestFindbyRowId( "Csag336", RowId)
            Else 
                Err = oPAG336_01.RequestClear("Csag336",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Csag336__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG336_01.RequestClear("Csag336",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG336_01.Call "Set_pbReportErrors", 0
                    Err = oPAG336_01.RequestSave("Csag336")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG336_01.RequestClear("Csag336",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG336, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG336_01.Call "Set_pbReportErrors", 0
                    Err = oPAG336_01.RequestDelete("Csag336")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG336_01.RequestClear("Csag336",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG336, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPAG336_01.RequestFind("Csag336", Index, LT)
                If Request("Find") <> "" Then Err = oPAG336_01.RequestFind("Csag336", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG336_01.RequestFind("Csag336", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG336_01.RequestFind("Csag336", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG336_01.RequestFind("Csag336", Index, LAST_RECORD)

            End If

        %>
