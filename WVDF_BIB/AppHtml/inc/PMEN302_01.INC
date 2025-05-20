        <% 
            oPMEN302_01.Call "Msg_fPMEN302_01Dados", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN302", pRecNum, aPrograma)
            End function
        
            oPMEN302_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPMEN302_01.RequestFindbyRecId( "Tmen302", RecId)
            Else 
                Err = oPMEN302_01.RequestClear("Tmen302",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Tmen302__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN302_01.RequestClear("Tmen302",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN302_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN302_01.RequestSave("Tmen302")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPMEN302_01.RequestClear("Tmen302",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN302, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN302_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN302_01.RequestDelete("Tmen302")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPMEN302_01.RequestClear("Tmen302",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN302, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPMEN302_01.RequestFind("Tmen302", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN302_01.RequestFind("Tmen302", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN302_01.RequestFind("Tmen302", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN302_01.RequestFind("Tmen302", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN302_01.RequestFind("Tmen302", Index, LAST_RECORD)

            End If
            
        %>

        <script language=javascript>
        function fChecagem() {
        
        if(document.Tmen302.tmen302__descricao.value==""){
           alert("Obrigatorio Descricao Do Grupo");
           document.Tmen302.tmen302__descricao.focus();
        }
        }
        </script>
