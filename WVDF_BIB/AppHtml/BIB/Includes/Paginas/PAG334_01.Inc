        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG334", pRecNum, aPrograma)
            End function
        
            oPAG334_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG334_01.RequestFindbyRowId( "CSAG334", RowId)
            Else 
                Err = oPAG334_01.RequestClear("CSAG334",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG334__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG334_01.RequestClear("CSAG334",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG334_01.Call "Set_pbReportErrors", 0
                    Err = oPAG334_01.RequestSave("CSAG334")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG334_01.RequestClear("CSAG334",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG334, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG334_01.Call "Set_pbReportErrors", 0
                    Err = oPAG334_01.RequestDelete("CSAG334")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG334_01.RequestClear("CSAG334",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG334, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPAG334_01.RequestFind("CSAG334", Index, LT)
                If Request("Find") <> "" Then Err = oPAG334_01.RequestFind("CSAG334", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG334_01.RequestFind("CSAG334", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG334_01.RequestFind("CSAG334", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG334_01.RequestFind("CSAG334", Index, LAST_RECORD)

            End If

            If Request("fGERACAO_CSAG304CSAG306")<>"" then
               oPAG334_01.Call "Msg_pPAG334_GeracaoMenus_CSAG304_CSAG306"
            End If

        %>
        
        




