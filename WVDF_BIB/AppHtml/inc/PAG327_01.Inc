        <% 
            oPAG327_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG327", pRecNum, aPrograma)
            End function
        
            oPAG327_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG327_01.RequestFindbyRowId( "Csag327", RowId)
            Else 
                Err = oPAG327_01.RequestClear("Csag327",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Csag327__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG327_01.RequestClear("Csag327",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG327_01.Call "Set_pbReportErrors", 0
                    Err = oPAG327_01.RequestSave("Csag327")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG327_01.RequestClear("Csag327",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG327, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG327_01.Call "Set_pbReportErrors", 0
                    Err = oPAG327_01.RequestDelete("Csag327")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG327_01.RequestClear("Csag327",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG327, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPAG327_01.RequestFind("Csag327", Index, LT)
                If Request("Find") <> "" Then Err = oPAG327_01.RequestFind("Csag327", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG327_01.RequestFind("Csag327", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG327_01.RequestFind("Csag327", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG327_01.RequestFind("Csag327", Index, LAST_RECORD)

            End If

        %>
