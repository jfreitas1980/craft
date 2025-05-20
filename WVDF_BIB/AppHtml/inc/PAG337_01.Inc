        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG337", pRecNum, aPrograma)
            End function
        
            oPAG337_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG337_01.RequestFindbyRowId( "CSAG337", RowId)
            Else 
                Err = oPAG337_01.RequestClear("CSAG337",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG337__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG337_01.RequestClear("CSAG337",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG337_01.Call "Set_pbReportErrors", 0
                    Err = oPAG337_01.RequestSave("CSAG337")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG337_01.RequestClear("CSAG337",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG337, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG337_01.Call "Set_pbReportErrors", 0
                    Err = oPAG337_01.RequestDelete("CSAG337")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG337_01.RequestClear("CSAG337",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG337, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPAG337_01.RequestFind("CSAG337", Index, LT)
                If Request("Find") <> "" Then Err = oPAG337_01.RequestFind("CSAG337", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG337_01.RequestFind("CSAG337", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG337_01.RequestFind("CSAG337", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG337_01.RequestFind("CSAG337", Index, LAST_RECORD)

            End If

        %>
        
        




