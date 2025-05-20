        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG313", pRecNum, aPrograma)
            End function
        
            oPAG313_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPAG313_01.RequestFindbyRecId( "Csag313", RecId)
            Else 
                Err = oPAG313_01.RequestClear("Csag313",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Csag313__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG313_01.RequestClear("Csag313",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG313_01.Call "Set_pbReportErrors", 0
                    Err = oPAG313_01.RequestSave("Csag313")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG313_01.RequestClear("Csag313",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG313, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG313_01.Call "Set_pbReportErrors", 0
                    Err = oPAG313_01.RequestDelete("Csag313")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG313_01.RequestClear("Csag313",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG313, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG313_01.RequestFind("Csag313", Index, LT)
                If Request("Find") <> "" Then Err = oPAG313_01.RequestFind("Csag313", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG313_01.RequestFind("Csag313", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG313_01.RequestFind("Csag313", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG313_01.RequestFind("Csag313", Index, LAST_RECORD)

            End If

        %>
