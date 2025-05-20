        <% 
            oPMEN300_01.Call "msg_pPMEN300_01Dados", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN300", pRecNum, aPrograma)
            End function
            
            oPMEN300_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPMEN300_01.RequestFindbyRowId( "Tmen300", RowId)
            Else 
                Err = oPMEN300_01.RequestClear("Tmen300",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Tmen300__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN300_01.RequestClear("Tmen300",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN300_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN300_01.RequestSave("Tmen300")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPMEN300_01.RequestClear("Tmen300",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("Tmen300, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN300_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN300_01.RequestDelete("Tmen300")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPMEN300_01.RequestClear("Tmen300",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("Tmen300, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPMEN300_01.RequestFind("Tmen300", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN300_01.RequestFind("Tmen300", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN300_01.RequestFind("Tmen300", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN300_01.RequestFind("Tmen300", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN300_01.RequestFind("Tmen300", Index, LAST_RECORD)

            End If

        %>
        
        




