        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG328", pRecNum, aPrograma)
            End function
        
            oPAG328_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG328_01.RequestFindbyRowId( "CSAG328", RowId)
            Else 
                Err = oPAG328_01.RequestClear("CSAG328",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG328__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG328_01.RequestClear("CSAG328",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG328_01.Call "Set_pbReportErrors", 0
                    Err = oPAG328_01.RequestSave("CSAG328")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG328_01.RequestClear("CSAG328",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG328, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG328_01.Call "Set_pbReportErrors", 0
                    Err = oPAG328_01.RequestDelete("CSAG328")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG328_01.RequestClear("CSAG328",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG328, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPAG328_01.RequestFind("CSAG328", Index, LT)
                If Request("Find") <> "" Then Err = oPAG328_01.RequestFind("CSAG328", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG328_01.RequestFind("CSAG328", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG328_01.RequestFind("CSAG328", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG328_01.RequestFind("CSAG328", Index, LAST_RECORD)

            End If

        %>
        
        




