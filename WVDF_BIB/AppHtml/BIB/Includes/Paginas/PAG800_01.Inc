        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TSMG800", pRecNum, aPrograma)
            End function
        
            oPAG800_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPAG800_01.RequestFindbyRecId( "Tsmg800", RecId)
            Else 
                Err = oPAG800_01.RequestClear("Tsmg800",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Tsmg800__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG800_01.RequestClear("Tsmg800",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG800_01.Call "Set_pbReportErrors", 0
                    Err = oPAG800_01.call("get_Salvar")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG800_01.RequestClear("Tsmg800",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSMG800, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG800_01.Call "Set_pbReportErrors", 0
                    Err = oPAG800_01.RequestDelete("Tsmg800")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG800_01.RequestClear("Tsmg800",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSMG800, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPAG800_01.RequestFind("Tsmg800", Index, LT)
                If Request("Find") <> "" Then Err = oPAG800_01.RequestFind("Tsmg800", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG800_01.RequestFind("Tsmg800", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG800_01.RequestFind("Tsmg800", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG800_01.RequestFind("Tsmg800", Index, LAST_RECORD)

            End If

        %>
