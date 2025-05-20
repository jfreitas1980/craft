        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "HSAG338", pRecNum, aPrograma)
            End function
        
            oPHSAG338_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPHSAG338_01.RequestFindbyRowId( "HSAG338", RowId)
            Else 
                Err = oPHSAG338_01.RequestClear("HSAG338",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("HSAG338__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPHSAG338_01.RequestClear("HSAG338",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPHSAG338_01.Call "Set_pbReportErrors", 0
                    Err = oPHSAG338_01.RequestSave("HSAG338")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPHSAG338_01.RequestClear("HSAG338",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG338, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPHSAG338_01.Call "Set_pbReportErrors", 0
                    Err = oPHSAG338_01.RequestDelete("HSAG338")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPHSAG338_01.RequestClear("HSAG338",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG338, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPHSAG338_01.RequestFind("HSAG338", Index, LT)
                If Request("Find") <> "" Then Err = oPHSAG338_01.RequestFind("HSAG338", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPHSAG338_01.RequestFind("HSAG338", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPHSAG338_01.RequestFind("HSAG338", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPHSAG338_01.RequestFind("HSAG338", Index, LAST_RECORD)

            End If

        %>
        
       
