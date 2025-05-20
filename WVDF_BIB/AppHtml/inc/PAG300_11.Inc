        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG300", pRecNum, aPrograma)
            End function
         
            oPAG300_11.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPAG300_11.RequestFindbyRecId( "Csag300", RecId)
            Else 
                Err = oPAG300_11.RequestClear("Csag300",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Csag300__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG300_11.RequestClear("Csag300",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"

                    oPAG300_11.Call "Set_pbReportErrors", 0
                    Err = oPAG300_11.RequestSave("Csag300")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG300_11.RequestClear("Csag300",1)
                       Err = oPAG300_11.Call ("get_fPAG300_11AtivaRefresh", aUsuarioSessao)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG300, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG300_11.Call "Set_pbReportErrors", 0
                    Err = oPAG300_11.RequestDelete("Csag300")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG300_11.RequestClear("Csag300",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG300, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG300_11.RequestFind("Csag300", Index, LT)
                If Request("Find") <> "" Then Err = oPAG300_11.RequestFind("Csag300", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG300_11.RequestFind("Csag300", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG300_11.RequestFind("Csag300", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG300_11.RequestFind("Csag300", Index, LAST_RECORD)

            End If
        %>
