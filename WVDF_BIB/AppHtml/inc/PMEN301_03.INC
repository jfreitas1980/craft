        <% 
            oPMEN301_03.Call "Msg_fPMEN301_03Dados", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN301", pRecNum, aPrograma)
            End function
        
            oPMEN301_03.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPMEN301_03.RequestFindbyRecId( "Tmen301", RecId)
            Else 
                Err = oPMEN301_03.RequestClear("Tmen301",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Tmen301__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN301_03.RequestClear("Tmen301",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN301_03.Call "Set_pbReportErrors", 0
                    Err = oPMEN301_03.RequestSave("Tmen301")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       oPMEN301_03.Call "Msg_fPMEN301_03Compromissos", aUsuarioSessao
                       Err = oPMEN301_03.RequestClear("Tmen301",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN301, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN301_03.Call "Set_pbReportErrors", 0
                    Err = oPMEN301_03.RequestDelete("Tmen301")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPMEN301_03.RequestClear("Tmen301",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN301, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPMEN301_03.RequestFind("Tmen301", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN301_03.RequestFind("Tmen301", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN301_03.RequestFind("Tmen301", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN301_03.RequestFind("Tmen301", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN301_03.RequestFind("Tmen301", Index, LAST_RECORD)

            End If
            
        %>

