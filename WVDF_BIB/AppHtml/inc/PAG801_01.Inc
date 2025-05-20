        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TSMG801", pRecNum, aPrograma)
            End function
        
            oPAG801_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG801_01.RequestFindbyRowId( "TSMG801", RowId)
            Else 
                Err = oPAG801_01.RequestClear("TSMG801",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("TSMG801__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG801_01.RequestClear("TSMG801",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG801_01.Call "Set_pbReportErrors", 0
                    Err = oPAG801_01.call("get_Salvar")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG801_01.RequestClear("TSMG801",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSMG801, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG801_01.Call "Set_pbReportErrors", 0
                    Err = oPAG801_01.RequestDelete("TSMG801")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG801_01.RequestClear("TSMG801",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSMG801, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPAG801_01.RequestFind("TSMG801", Index, LT)
                If Request("Find") <> "" Then Err = oPAG801_01.RequestFind("TSMG801", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG801_01.RequestFind("TSMG801", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG801_01.RequestFind("TSMG801", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG801_01.RequestFind("TSMG801", Index, LAST_RECORD)

            End If

        %>
        
