        <% 
            oPMEN3002_01.Call "msg_pPMEN3002_01Dados", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN3002", pRecNum, aPrograma)
            End function
            
            oPMEN3002_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPMEN3002_01.RequestFindbyRowId( "TMEN3002", RowId)
            Else 
                Err = oPMEN3002_01.RequestClear("TMEN3002",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("TMEN3002__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN3002_01.RequestClear("TMEN3002",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN3002_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN3002_01.RequestSave("TMEN3002")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPMEN3002_01.RequestClear("TMEN3002",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN3002, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN3002_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN3002_01.RequestDelete("TMEN3002")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPMEN3002_01.RequestClear("TMEN3002",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN3002, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPMEN3002_01.RequestFind("TMEN3002", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN3002_01.RequestFind("TMEN3002", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN3002_01.RequestFind("TMEN3002", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN3002_01.RequestFind("TMEN3002", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN3002_01.RequestFind("TMEN3002", Index, LAST_RECORD)

            End If

        %>
        
        




