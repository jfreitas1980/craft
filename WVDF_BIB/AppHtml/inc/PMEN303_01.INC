        <% 
            oPMEN303_01.Call "Msg_fPMEN303_01Dados", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN303", pRecNum, aPrograma)
            End function
        
            oPMEN303_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPMEN303_01.RequestFindbyRecId( "Tmen303", RecId)
            Else 
                Err = oPMEN303_01.RequestClear("Tmen303",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Tmen303__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN303_01.RequestClear("Tmen303",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN303_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN303_01.RequestSave("Tmen303")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPMEN303_01.RequestClear("Tmen303",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN303, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN303_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN303_01.RequestDelete("Tmen303")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPMEN303_01.RequestClear("Tmen303",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN303, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPMEN303_01.RequestFind("Tmen303", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN303_01.RequestFind("Tmen303", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN303_01.RequestFind("Tmen303", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN303_01.RequestFind("Tmen303", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN303_01.RequestFind("Tmen303", Index, LAST_RECORD)

            End If
            
        %>

        <script language=javascript>
        function fChecagem() {
        
        if(document.Tmen303.Tmen303__descricao.value==""){
           alert("Obrigatorio Descricao Do Grupo");
           document.Tmen303.Tmen303__descricao.focus();
        }
        }
        </script>
