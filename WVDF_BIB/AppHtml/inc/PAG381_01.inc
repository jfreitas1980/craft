        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG381", pRecNum, aPrograma)
            End function
        
            oPAG381_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG381_01.RequestFindbyRowId( "CSAG381", RowId)
            Else 
                Err = oPAG381_01.RequestClear("CSAG381",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG381__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG381_01.RequestClear("CSAG381",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG381_01.Call "Set_pbReportErrors", 0
                    Err = oPAG381_01.RequestSave("CSAG381")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG381_01.RequestClear("CSAG381",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG381, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG381_01.Call "Set_pbReportErrors", 0
                    Err = oPAG381_01.RequestDelete("CSAG381")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG381_01.RequestClear("CSAG381",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG381, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG381_01.RequestFind("CSAG381", Index, LT)
                If Request("Find") <> "" Then Err = oPAG381_01.RequestFind("CSAG381", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG381_01.RequestFind("CSAG381", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG381_01.RequestFind("CSAG381", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG381_01.RequestFind("CSAG381", Index, LAST_RECORD)

            End If

        %>
        
       
