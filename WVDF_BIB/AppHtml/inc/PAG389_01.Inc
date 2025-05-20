        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG389", pRecNum, aPrograma)
            End function
        
            oPAG389_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG389_01.RequestFindbyRowId( "CSAG389", RowId)
            Else 
                Err = oPAG389_01.RequestClear("CSAG389",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG389__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG389_01.RequestClear("CSAG389",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG389_01.Call "Set_pbReportErrors", 0
                    Err = oPAG389_01.RequestSave("CSAG389")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG389_01.RequestClear("CSAG389",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG389, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG389_01.Call "Set_pbReportErrors", 0
                    Err = oPAG389_01.RequestDelete("CSAG389")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG389_01.RequestClear("CSAG389",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG389, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG389_01.RequestFind("CSAG389", Index, LT)
                If Request("Find") <> "" Then Err = oPAG389_01.RequestFind("CSAG389", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG389_01.RequestFind("CSAG389", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG389_01.RequestFind("CSAG389", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG389_01.RequestFind("CSAG389", Index, LAST_RECORD)

            End If

        %>
        
       
