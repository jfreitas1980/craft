        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN304", pRecNum, aPrograma)
            End function
        
            oPMEN304_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPMEN304_01.RequestFindbyRecId( "Tmen304", RecId)
            Else 
                Err = oPMEN304_01.RequestClear("Tmen304",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Tmen304__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN304_01.RequestClear("Tmen304",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN304_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN304_01.RequestSave("Tmen304")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPMEN304_01.RequestClear("Tmen304",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN304, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN304_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN304_01.RequestDelete("Tmen304")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPMEN304_01.RequestClear("Tmen304",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN304, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPMEN304_01.RequestFind("Tmen304", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN304_01.RequestFind("Tmen304", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN304_01.RequestFind("Tmen304", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN304_01.RequestFind("Tmen304", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN304_01.RequestFind("Tmen304", Index, LAST_RECORD)

            End If
            
        %>

