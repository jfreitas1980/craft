        <% 
            oPMEN3001_01.Call "Msg_fPMEN3001_01Dados", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN3001", pRecNum, aPrograma)
            End function
        
            oPMEN3001_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPMEN3001_01.RequestFindbyRecId( "Tmen3001", RecId)
            Else 
                Err = oPMEN3001_01.RequestClear("Tmen3001",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Tmen3001__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN3001_01.RequestClear("Tmen3001",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN3001_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN3001_01.RequestSave("Tmen3001")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPMEN3001_01.RequestClear("Tmen3001",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN3001, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN3001_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN3001_01.RequestDelete("Tmen3001")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPMEN3001_01.RequestClear("Tmen3001",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN3001, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPMEN3001_01.RequestFind("Tmen3001", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN3001_01.RequestFind("Tmen3001", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN3001_01.RequestFind("Tmen3001", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN3001_01.RequestFind("Tmen3001", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN3001_01.RequestFind("Tmen3001", Index, LAST_RECORD)

            End If
            
        %>

