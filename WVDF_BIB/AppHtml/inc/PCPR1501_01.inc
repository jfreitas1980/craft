        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TCPR1501", pRecNum, aPrograma)
            End function
        
            oPCPR1501_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPCPR1501_01.RequestFindbyRowId( "TCPR1501", RowId)
            Else 
                Err = oPCPR1501_01.RequestClear("TCPR1501",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("TCPR1501__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPCPR1501_01.RequestClear("TCPR1501",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPCPR1501_01.Call "Set_pbReportErrors", 0
                    Err = oPCPR1501_01.RequestSave("TCPR1501")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPCPR1501_01.RequestClear("TCPR1501",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TCPR1501, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPCPR1501_01.Call "Set_pbReportErrors", 0
                    Err = oPCPR1501_01.RequestDelete("TCPR1501")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPCPR1501_01.RequestClear("TCPR1501",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TCPR1501, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPCPR1501_01.RequestFind("TCPR1501", Index, LT)
                If Request("Find") <> "" Then Err = oPCPR1501_01.RequestFind("TCPR1501", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPCPR1501_01.RequestFind("TCPR1501", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPCPR1501_01.RequestFind("TCPR1501", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPCPR1501_01.RequestFind("TCPR1501", Index, LAST_RECORD)

            End If

        %>
        
       
