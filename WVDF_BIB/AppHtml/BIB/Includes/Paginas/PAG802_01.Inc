        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TSMG802", pRecNum, aPrograma)
            End function
        
            oPAG802_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPAG802_01.RequestFindbyRecId( "Tsmg802", RecId)
            Else 
                Err = oPAG802_01.RequestClear("Tsmg802",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Tsmg802__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG802_01.RequestClear("Tsmg802",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG802_01.Call "Set_pbReportErrors", 0
                    Err = oPAG802_01.RequestSave("Tsmg802")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG802_01.RequestClear("Tsmg802",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSMG802, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG802_01.Call "Set_pbReportErrors", 0
                    Err = oPAG802_01.RequestDelete("Tsmg802")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG802_01.RequestClear("Tsmg802",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSMG802, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG802_01.RequestFind("Tsmg802", Index, LT)
                If Request("Find") <> "" Then Err = oPAG802_01.RequestFind("Tsmg802", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG802_01.RequestFind("Tsmg802", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG802_01.RequestFind("Tsmg802", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG802_01.RequestFind("Tsmg802", Index, LAST_RECORD)

            End If

        %>
