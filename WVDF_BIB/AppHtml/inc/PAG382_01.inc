        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG382", pRecNum, aPrograma)
            End function
        
            oPAG382_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG382_01.RequestFindbyRowId( "CSAG382", RowId)
            Else 
                Err = oPAG382_01.RequestClear("CSAG382",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("CSAG382__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG382_01.RequestClear("CSAG382",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG382_01.Call "Set_pbReportErrors", 0
                    Err = oPAG382_01.RequestSave("CSAG382")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG382_01.RequestClear("CSAG382",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG382, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG382_01.Call "Set_pbReportErrors", 0
                    Err = oPAG382_01.RequestDelete("CSAG382")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG382_01.RequestClear("CSAG382",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG382, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG382_01.RequestFind("CSAG382", Index, LT)
                If Request("Find") <> "" Then Err = oPAG382_01.RequestFind("CSAG382", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG382_01.RequestFind("CSAG382", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG382_01.RequestFind("CSAG382", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG382_01.RequestFind("CSAG382", Index, LAST_RECORD)

            End If

        %>
        
       
