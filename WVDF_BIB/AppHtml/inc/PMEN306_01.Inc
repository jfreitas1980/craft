        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN306", pRecNum, aPrograma)
            End function
        
            oPMEN306_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPMEN306_01.RequestFindbyRecId( "TMEN306", RecId)
            Else 
                Err = oPMEN306_01.RequestClear("TMEN306",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("TMEN306__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN306_01.RequestClear("TMEN306",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN306_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN306_01.RequestSave("TMEN306")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPMEN306_01.RequestClear("TMEN306",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN306, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN306_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN306_01.RequestDelete("TMEN306")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPMEN306_01.RequestClear("TMEN306",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN306, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPMEN306_01.RequestFind("TMEN306", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN306_01.RequestFind("TMEN306", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN306_01.RequestFind("TMEN306", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN306_01.RequestFind("TMEN306", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN306_01.RequestFind("TMEN306", Index, LAST_RECORD)

            End If
            
        %>

