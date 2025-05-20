        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TCRM2004", pRecNum, aPrograma)
            End function
        
            oPCRM2004_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPCRM2004_01.RequestFindbyRowId( "TCRM2004", RowId)
            Else 
                Err = oPCRM2004_01.RequestClear("TCRM2004",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("TCRM2004__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPCRM2004_01.RequestClear("TCRM2004",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPCRM2004_01.Call "Set_pbReportErrors", 0
                    Err = oPCRM2004_01.RequestSave("TCRM2004")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPCRM2004_01.RequestClear("TCRM2004",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TCRM2004, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPCRM2004_01.Call "Set_pbReportErrors", 0
                    Err = oPCRM2004_01.RequestDelete("TCRM2004")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPCRM2004_01.RequestClear("TCRM2004",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TCRM2004, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPCRM2004_01.RequestFind("TCRM2004", Index, LT)
                If Request("Find") <> "" Then Err = oPCRM2004_01.RequestFind("TCRM2004", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPCRM2004_01.RequestFind("TCRM2004", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPCRM2004_01.RequestFind("TCRM2004", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPCRM2004_01.RequestFind("TCRM2004", Index, LAST_RECORD)

            End If

        %>
