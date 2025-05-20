        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG354", pRecNum, aPrograma)
            End function
        
            oPAG354_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG354_01.RequestFindbyRowId( "CSAG354", RowId)
            Else 
                Err = oPAG354_01.RequestClear("CSAG354",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG354__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG354_01.RequestClear("CSAG354",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG354_01.Call "Msg_SetUsuariosessao", aUsuarioSessao

                    oPAG354_01.Call "Set_pbReportErrors", 0
                    Err = oPAG354_01.RequestSave("CSAG354")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG354_01.RequestClear("CSAG354",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG354, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG354_01.Call "Set_pbReportErrors", 0
                    Err = oPAG354_01.RequestDelete("CSAG354")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG354_01.RequestClear("CSAG354",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG354, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG354_01.RequestFind("CSAG354", Index, LT)
                If Request("Find") <> "" Then Err = oPAG354_01.RequestFind("CSAG354", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG354_01.RequestFind("CSAG354", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG354_01.RequestFind("CSAG354", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG354_01.RequestFind("CSAG354", Index, LAST_RECORD)

            End If

        %>
        
       
