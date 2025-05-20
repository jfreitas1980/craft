        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG365", pRecNum, aPrograma)
            End function
        
            oPAG365_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG365_01.RequestFindbyRowId( "CSAG365", RowId)
            Else 
                Err = oPAG365_01.RequestClear("CSAG365",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG365__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG365_01.RequestClear("CSAG365",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG365_01.Call "Msg_SetUsuariosessao", aUsuarioSessao

                    oPAG365_01.Call "Set_pbReportErrors", 0
                    Err = oPAG365_01.RequestSave("CSAG365")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG365_01.RequestClear("CSAG365",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG365, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG365_01.Call "Set_pbReportErrors", 0
                    Err = oPAG365_01.RequestDelete("CSAG365")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG365_01.RequestClear("CSAG365",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG365, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG365_01.RequestFind("CSAG365", Index, LT)
                If Request("Find") <> "" Then Err = oPAG365_01.RequestFind("CSAG365", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG365_01.RequestFind("CSAG365", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG365_01.RequestFind("CSAG365", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG365_01.RequestFind("CSAG365", Index, LAST_RECORD)

            End If

        %>
        
        <input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
        <input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
        <input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
        <input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />
