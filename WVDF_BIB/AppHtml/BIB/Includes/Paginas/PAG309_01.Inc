        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG309", pRecNum, aPrograma)
            End function
        
            oPAG309_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG309_01.RequestFindbyRowId( "CSAG309", RowId)
            Else 
                Err = oPAG309_01.RequestClear("CSAG309",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG309__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG309_01.RequestClear("CSAG309",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG309_01.Call "Msg_SetUsuariosessao", aUsuarioSessao

                    oPAG309_01.Call "Set_pbReportErrors", 0
                    Err = oPAG309_01.RequestSave("CSAG309")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG309_01.RequestClear("CSAG309",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG309, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG309_01.Call "Set_pbReportErrors", 0
                    Err = oPAG309_01.RequestDelete("CSAG309")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG309_01.RequestClear("CSAG309",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG309, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG309_01.RequestFind("CSAG309", Index, LT)
                If Request("Find") <> "" Then Err = oPAG309_01.RequestFind("CSAG309", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG309_01.RequestFind("CSAG309", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG309_01.RequestFind("CSAG309", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG309_01.RequestFind("CSAG309", Index, LAST_RECORD)

            End If

        %>
        
       
