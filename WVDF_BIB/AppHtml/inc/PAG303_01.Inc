        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG303", pRecNum, aPrograma)
            End function
        
            oPAG303_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPAG303_01.RequestFindbyRecId( "Csag303", RecId)
            Else 
                Err = oPAG303_01.RequestClear("Csag303",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Csag303__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG303_01.RequestClear("Csag303",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG303_01.Call "Set_pbReportErrors", 0
                    Err = oPAG303_01.RequestSave("Csag303")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG303_01.RequestClear("Csag303",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG303, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG303_01.Call "Set_pbReportErrors", 0
                    Err = oPAG303_01.RequestDelete("Csag303")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG303_01.RequestClear("Csag303",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG303, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG303_01.RequestFind("Csag303", Index, LT)
                If Request("Find") <> "" Then Err = oPAG303_01.RequestFind("Csag303", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG303_01.RequestFind("Csag303", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG303_01.RequestFind("Csag303", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG303_01.RequestFind("Csag303", Index, LAST_RECORD)

            End If

        %>
