        <% 
            oPMEN314_01.Call "Msg_pPMEN314_01Dados", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN314", pRecNum, aPrograma)
            End function
        
            oPMEN314_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPMEN314_01.RequestFindbyRecId( "Tmen314", RecId)
            Else 
                Err = oPMEN314_01.RequestClear("Tmen314",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Tmen314__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN314_01.RequestClear("Tmen314",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN314_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN314_01.RequestSave("Tmen314")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN314, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN314_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN314_01.RequestDelete("Tmen314")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN314, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPMEN314_01.RequestFind("Tmen314", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN314_01.RequestFind("Tmen314", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN314_01.RequestFind("Tmen314", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN314_01.RequestFind("Tmen314", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN314_01.RequestFind("Tmen314", Index, LAST_RECORD)

            End If
            
        %>

