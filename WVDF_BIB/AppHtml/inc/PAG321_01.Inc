        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG321", pRecNum, aPrograma)
            End function
        
            oPAG321_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPAG321_01.RequestFindbyRecId( "CSAG321", RecId)
            Else 
                Err = oPAG321_01.RequestClear("CSAG321",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG321__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG321_01.RequestClear("CSAG321",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG321_01.Call "Set_pbReportErrors", 0
                    Err = oPAG321_01.RequestSave("CSAG321")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG321_01.RequestClear("CSAG321",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG321, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG321_01.Call "Set_pbReportErrors", 0
                    Err = oPAG321_01.RequestDelete("CSAG321")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG321_01.RequestClear("CSAG321",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG321, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG321_01.RequestFind("CSAG321", Index, LT)
                If Request("Find") <> "" Then Err = oPAG321_01.RequestFind("CSAG321", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG321_01.RequestFind("CSAG321", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG321_01.RequestFind("CSAG321", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG321_01.RequestFind("CSAG321", Index, LAST_RECORD)

            End If

        %>
