        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG359", pRecNum, aPrograma)
            End function
        
            oPAG359_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG359_01.RequestFindbyRowId( "CSAG359", RowId)
            Else 
                Err = oPAG359_01.RequestClear("CSAG359",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG359__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG359_01.RequestClear("CSAG359",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG359_01.Call "Set_pbReportErrors", 0
                    Err = oPAG359_01.RequestSave("CSAG359")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG359_01.RequestClear("CSAG359",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG359, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG359_01.Call "Set_pbReportErrors", 0
                    Err = oPAG359_01.RequestDelete("CSAG359")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG359_01.RequestClear("CSAG359",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG359, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG359_01.RequestFind("CSAG359", Index, LT)
                If Request("Find") <> "" Then Err = oPAG359_01.RequestFind("CSAG359", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG359_01.RequestFind("CSAG359", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG359_01.RequestFind("CSAG359", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG359_01.RequestFind("CSAG359", Index, LAST_RECORD)

            End If

        %>
        
       
