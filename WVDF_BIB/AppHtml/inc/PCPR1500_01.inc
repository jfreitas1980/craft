        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TCPR1500", pRecNum, aPrograma)
            End function
        
            oPCPR1500_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPCPR1500_01.RequestFindbyRowId( "TCPR1500", RowId)
            Else 
                Err = oPCPR1500_01.RequestClear("TCPR1500",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("TCPR1500__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPCPR1500_01.RequestClear("TCPR1500",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPCPR1500_01.Call "Set_pbReportErrors", 0
                    Err = oPCPR1500_01.RequestSave("TCPR1500")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPCPR1500_01.RequestClear("TCPR1500",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TCPR1500, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPCPR1500_01.Call "Set_pbReportErrors", 0
                    Err = oPCPR1500_01.RequestDelete("TCPR1500")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPCPR1500_01.RequestClear("TCPR1500",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TCPR1500, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPCPR1500_01.RequestFind("TCPR1500", Index, LT)
                If Request("Find") <> "" Then Err = oPCPR1500_01.RequestFind("TCPR1500", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPCPR1500_01.RequestFind("TCPR1500", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPCPR1500_01.RequestFind("TCPR1500", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPCPR1500_01.RequestFind("TCPR1500", Index, LAST_RECORD)

            End If

        %>
        
       
