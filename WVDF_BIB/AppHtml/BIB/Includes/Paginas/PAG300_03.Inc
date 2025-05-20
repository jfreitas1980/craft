        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG300", pRecNum, aPrograma)
            End function
        
            oPAG300_03.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPAG300_03.RequestFindbyRecId( "Csag300", RecId)
            Else 
                Err = oPAG300_03.RequestClear("Csag300",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Csag300__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPAG300_03.RequestClear("Csag300",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"

                    oPAG300_03.Call "Set_pbReportErrors", 0
                    Err = oPAG300_03.RequestSave("Csag300")
                    
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPAG300_03.RequestClear("Csag300",1)
                       
                       aUsuarioNumero   = oPAG300_03.DDValue("CSAG300.Usuarionumero")
                       aUsuarioSenha    = oPAG300_03.DDValue("CSAG300.Usuariosenhain")

                       aUsuarioSenha    = SHA256(aUsuarioSenha) 
        
                       oPAG300_03.Call "msg_pPAG300_03SenhaHash", aUsuarioNumero, aUsuarioSenha
                       Retorno          = oPAG300_01Diversos.Call ("get_fPAG300_01Diversos_Enviando_Dados_Da_Conta_01", aUSUARIONUMERO )
                       
                       %>
                       <script language="JavaScript"><!-- 
                              {
                               window.location.href=("PAG300_03_3.asp?aUsuarioNumero=<%=aUsuarioNumero%>"); 
                             }
                       //--></script>
                       <%
             
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG300, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG300_03.Call "Set_pbReportErrors", 0
                    Err = oPAG300_03.RequestDelete("Csag300")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPAG300_03.RequestClear("Csag300",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("CSAG300, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPAG300_03.RequestFind("Csag300", Index, LT)
                If Request("Find") <> "" Then Err = oPAG300_03.RequestFind("Csag300", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG300_03.RequestFind("Csag300", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG300_03.RequestFind("Csag300", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG300_03.RequestFind("Csag300", Index, LAST_RECORD)

            End If
            
                    
        %>
