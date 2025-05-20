        <% 
            oPAG300_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG300", pRecNum, aPrograma)
            End function
        
            oPAG300_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPAG300_01.RequestFindbyRecId( "Csag300", RecId)
            Else 
                Err = oPAG300_01.RequestClear("Csag300",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("csag300__recnum")
                If Request ("Clear") <> "" Then
                    Err = oPAG300_01.RequestClear("CSAG300",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
            
                    oPAG300_01.Call "Set_pbReportErrors", 0
                    Err = oPAG300_01.RequestSave("CSAG300")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Response.Write("<p class=""alert alert-success""><i class=""fa fa-info-circle""></i>&nbsp;Record Saved.</p>")

                       aUsuarioNumero  = oPAG300_01.DDValue("CSAG300.USUARIONUMERO")
                       If aIndice ="2" Then oPAG800_01.Call "msg_pEnvioDeEmail", aUsuarioSessao, "5", aUsuarioNumero
                       If aIndice ="3" Then oPAG800_01.Call "msg_pEnvioDeEmail", aUsuarioSessao, "3", aUsuarioNumero

                       'Err = oPAG300_01.RequestClear("Csag300",1)
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Could not save. Errors Occurred:</font></br>")
                       oPAG300_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG300_01.Call "Set_pbReportErrors", 0
                    Err = oPAG300_01.RequestDelete("CSAG300")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Response.Write("<p class=""alert alert-danger""><i class=""fa fa-info-circle""></i>&nbsp;Record deleted.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Record could not be deleted:</font></br>")
                       oPAG300_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
                
                If Request("FindPrev") <> "" Then Err = oPAG300_01.RequestFind("Csag300", Index, LT)
                If Request("Find") <> "" Then Err = oPAG300_01.RequestFind("Csag300", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG300_01.RequestFind("Csag300", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG300_01.RequestFind("Csag300", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG300_01.RequestFind("Csag300", Index, LAST_RECORD)

            End If
            
                    
            If Request("fAplicacaoPrograma")<>"" then
               aUsuarioNumero=oPAG300_01.DDValue("CSAG300.USUARIONUMERO")
               Retorno       =oPAG300_01.Call ("Get_fAplicacaoPrograma", aUsuarioNumero)
            End If

            If Request("fAplicacaoClasse")<>"" then
               aUsuarioNumero=oPAG300_01.DDValue("CSAG300.USUARIONUMERO")
               Retorno       =oPAG300_01.Call ("Get_fAplicacaoClasse", aUsuarioNumero)
            End If

            If Request("fAplicacaoDistribuicao")<>"" then
               oPAG300_01.Call "Msg_pPAG300_01AplicaEntradaUsuarios"
            End If

            If Request("fEnviarEmailSenha")<>"" then
			   aUsuarioNumero=oPAG300_01.DDValue("CSAG300.USUARIONUMERO")
               Retorno       =oPAG300_01.Call ("Get_fEnviarEmailSenha", aUsuarioNumero)
            End If

        %>
		
		<input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
		<input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
		<input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
		<input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />