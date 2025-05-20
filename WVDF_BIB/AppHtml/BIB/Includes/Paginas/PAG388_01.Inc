        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG388", pRecNum, aPrograma)
            End function
        
            oPAG388_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG388_01.RequestFindbyRowId( "CSAG388", RowId)
            Else 
                Err = oPAG388_01.RequestClear("CSAG388",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG388__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG388_01.RequestClear("CSAG388",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG388_01.Call "Set_pbReportErrors", 0
                    Err = oPAG388_01.RequestSave("CSAG388")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG388_01.RequestClear("CSAG388",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG388, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG388_01.Call "Set_pbReportErrors", 0
                    Err = oPAG388_01.RequestDelete("CSAG388")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG388_01.RequestClear("CSAG388",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG388, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG388_01.RequestFind("CSAG388", Index, LT)
                If Request("Find") <> "" Then Err = oPAG388_01.RequestFind("CSAG388", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG388_01.RequestFind("CSAG388", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG388_01.RequestFind("CSAG388", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG388_01.RequestFind("CSAG388", Index, LAST_RECORD)

            End If

        %>
        
       
