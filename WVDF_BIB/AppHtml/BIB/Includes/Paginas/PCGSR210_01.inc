<% 
            oPCGSR210_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "HCGSR210", pRecNum, aPrograma)
            End function
            
            oPCGSR210_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPCGSR210_01.RequestFindbyRowId( "HCGSR210", RowId)
            Else 
                Err = oPCGSR210_01.RequestClear("HCGSR210",1)
            End If
            
            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then
            
                aRecNum = Request("HCGSR210__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPCGSR210_01.RequestClear("HCGSR210",1)
                End If
            
                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
            
                    oPCGSR210_01.Call "Set_pbReportErrors", 0
                    Err = oPCGSR210_01.RequestSave("HCGSR210")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Response.Write("<p class=""alert alert-success""><i class=""fa fa-info-circle""></i>&nbsp;Record Saved.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Could not save. Errors Occurred:</font></br>")
                       oPCGSR210_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                If Request("Delete") <> "" Then
                    oPCGSR210_01.Call "Set_pbReportErrors", 0
                    Err = oPCGSR210_01.RequestDelete("HCGSR210")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Response.Write("<p class=""alert alert-danger""><i class=""fa fa-info-circle""></i>&nbsp;Record deleted.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Record could not be deleted:</font></br>")
                       oPCGSR210_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPCGSR210_01.RequestFind("HCGSR210", Index, LT)
                If Request("Find") <> "" Then Err = oPCGSR210_01.RequestFind("HCGSR210", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPCGSR210_01.RequestFind("HCGSR210", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPCGSR210_01.RequestFind("HCGSR210", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPCGSR210_01.RequestFind("HCGSR210", Index, LAST_RECORD)
            
            End If

        %>

		<input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
		<input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
		<input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
		<input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />