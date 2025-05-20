        <% 
            oPAG367_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            oPAG367_01.Call "msg_pCSAG367_01BloquearCampo"
            
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG367", pRecNum, aPrograma)
            End function
            
            oPAG367_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> 0 Then
                Err = oPAG367_01.RequestFindbyRecId( "CSAG367", RecId)
            Else 
                Err = oPAG367_01.RequestClear("CSAG367",1)
            End If
            
            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then
            
                aRecNum = Request("csag370__recnum")
                If Request ("Clear") <> "" Then
                    Err = oPAG367_01.RequestClear("CSAG367",1)
                End If
            
                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
            
                    oPAG367_01.Call "Set_pbReportErrors", 0
                    Err = oPAG367_01.RequestSave("CSAG367")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Response.Write("<p style=""text-align:center"">Record Saved.</p>")
                    Else
                       Response.Write("<p style=""color:#ff0000;text-align:left"">")
                       Response.Write("<font style=""text-decoration:underline;"">Could not save. Errors Occurred:</font></br>")
                       oPAG367_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                If Request("Delete") <> "" Then
                    oPAG367_01.Call "Set_pbReportErrors", 0
                    Err = oPAG367_01.RequestDelete("CSAG367")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Response.Write("<p style=""text-align:center"">Record deleted.</p>")
                    Else
                       Response.Write("<p style=""color:#ff0000;text-align:left"">")
                       Response.Write("<font style=""text-decoration:underline;"">Record could not be deleted:</font></br>")
                       oPAG367_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG367_01.RequestFind("CSAG367", Index, LT)
                If Request("Find") <> "" Then Err = oPAG367_01.RequestFind("CSAG367", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG367_01.RequestFind("CSAG367", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG367_01.RequestFind("CSAG367", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG367_01.RequestFind("CSAG367", Index, LAST_RECORD)
            
            End If

        %>

		<input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
		<input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
		<input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
		<input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />
