        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG306", pRecNum, aPrograma)
            End function
        
            oPAG306_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPAG306_01.RequestFindbyRecId( "Csag306", RecId)
            Else 
                Err = oPAG306_01.RequestClear("Csag306",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Csag306__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG306_01.RequestClear("Csag306",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG306_01.Call "Set_pbReportErrors", 0
                    Err = oPAG306_01.RequestSave("Csag306")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG306_01.RequestClear("Csag306",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG306, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG306_01.Call "Set_pbReportErrors", 0
                    Err = oPAG306_01.RequestDelete("Csag306")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG306_01.RequestClear("Csag306",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG306, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG306_01.RequestFind("Csag306", Index, LT)
                If Request("Find") <> "" Then Err = oPAG306_01.RequestFind("Csag306", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG306_01.RequestFind("Csag306", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG306_01.RequestFind("Csag306", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG306_01.RequestFind("Csag306", Index, LAST_RECORD)

            End If

        %>
