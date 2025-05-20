        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TCRM2003", pRecNum, aPrograma)
            End function
        
            oPCRM2003_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPCRM2003_01.RequestFindbyRowId( "TCRM2003", RowId)
            Else 
                Err = oPCRM2003_01.RequestClear("TCRM2003",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("TCRM2003__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPCRM2003_01.RequestClear("TCRM2003",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPCRM2003_01.Call "Set_pbReportErrors", 0
                    Err = oPCRM2003_01.RequestSave("TCRM2003")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPCRM2003_01.RequestClear("TCRM2003",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TCRM2003, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPCRM2003_01.Call "Set_pbReportErrors", 0
                    Err = oPCRM2003_01.RequestDelete("TCRM2003")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPCRM2003_01.RequestClear("TCRM2003",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TCRM2003, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPCRM2003_01.RequestFind("TCRM2003", Index, LT)
                If Request("Find") <> "" Then Err = oPCRM2003_01.RequestFind("TCRM2003", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPCRM2003_01.RequestFind("TCRM2003", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPCRM2003_01.RequestFind("TCRM2003", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPCRM2003_01.RequestFind("TCRM2003", Index, LAST_RECORD)

            End If

        %>
