        <% 
            Retorno=oPMEN305_03.Call ("get_fPMEN305_03DesativaSom", aUsuarioSessao)
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN305", pRecNum, aPrograma)
            End function
        
            oPMEN305_03.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPMEN305_03.RequestFindbyRecId( "Tmen305", RecId)
            Else 
                Err = oPMEN305_03.RequestClear("Tmen305",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Tmen305__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN305_03.RequestClear("Tmen305",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN305_03.Call "Set_pbReportErrors", 0
                    Err = oPMEN305_03.RequestSave("Tmen305")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPMEN305_03.RequestClear("Tmen305",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN305, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN305_03.Call "Set_pbReportErrors", 0
                    Err = oPMEN305_03.RequestDelete("Tmen305")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPMEN305_03.RequestClear("Tmen305",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN305, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPMEN305_03.RequestFind("Tmen305", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN305_03.RequestFind("Tmen305", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN305_03.RequestFind("Tmen305", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN305_03.RequestFind("Tmen305", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN305_03.RequestFind("Tmen305", Index, LAST_RECORD)

            End If
            
        %>

