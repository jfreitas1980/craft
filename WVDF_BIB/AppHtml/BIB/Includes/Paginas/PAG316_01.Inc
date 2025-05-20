        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG316", pRecNum, aPrograma)
            End function
        
            oPAG316_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG316_01.RequestFindbyRowId( "CSAG316", RowId)
            Else 
                Err = oPAG316_01.RequestClear("CSAG316",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG316__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG316_01.RequestClear("CSAG316",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG316_01.Call "Set_pbReportErrors", 0
                    Err = oPAG316_01.RequestSave("CSAG316")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG316_01.RequestClear("CSAG316",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG316, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG316_01.Call "Set_pbReportErrors", 0
                    Err = oPAG316_01.RequestDelete("CSAG316")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG316_01.RequestClear("CSAG316",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG316, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPAG316_01.RequestFind("CSAG316", Index, LT)
                If Request("Find") <> "" Then Err = oPAG316_01.RequestFind("CSAG316", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG316_01.RequestFind("CSAG316", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG316_01.RequestFind("CSAG316", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG316_01.RequestFind("CSAG316", Index, LAST_RECORD)

            End If

        %>
