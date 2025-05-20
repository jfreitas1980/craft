        <% 
            oPAG331_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG331", pRecNum, aPrograma)
            End function
        
            oPAG331_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG331_01.RequestFindbyRowId( "Csag331", RowId)
            Else 
                Err = oPAG331_01.RequestClear("Csag331",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Csag331__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG331_01.RequestClear("Csag331",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG331_01.Call "Set_pbReportErrors", 0
                    Err = oPAG331_01.RequestSave("Csag331")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG331_01.RequestClear("Csag331",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG331, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG331_01.Call "Set_pbReportErrors", 0
                    Err = oPAG331_01.RequestDelete("Csag331")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG331_01.RequestClear("Csag331",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG331, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPAG331_01.RequestFind("Csag331", Index, LT)
                If Request("Find") <> "" Then Err = oPAG331_01.RequestFind("Csag331", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG331_01.RequestFind("Csag331", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG331_01.RequestFind("Csag331", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG331_01.RequestFind("Csag331", Index, LAST_RECORD)

            End If

        %>
