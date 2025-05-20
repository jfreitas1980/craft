        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG307", pRecNum, aPrograma)
            End function
        
            oPAG307_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPAG307_01.RequestFindbyRecId( "Csag307", RecId)
            Else 
                Err = oPAG307_01.RequestClear("Csag307",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Csag307__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG307_01.RequestClear("Csag307",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG307_01.Call "Set_pbReportErrors", 0
                    Err = oPAG307_01.RequestSave("Csag307")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG307_01.RequestClear("Csag307",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG307, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG307_01.Call "Set_pbReportErrors", 0
                    Err = oPAG307_01.RequestDelete("Csag307")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG307_01.RequestClear("Csag307",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG307, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG307_01.RequestFind("Csag307", Index, LT)
                If Request("Find") <> "" Then Err = oPAG307_01.RequestFind("Csag307", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG307_01.RequestFind("Csag307", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG307_01.RequestFind("Csag307", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG307_01.RequestFind("Csag307", Index, LAST_RECORD)

            End If

        %>
