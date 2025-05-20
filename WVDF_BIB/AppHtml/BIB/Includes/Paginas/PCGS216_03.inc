        <% 
            oPCGS216_03.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CCGS216", pRecNum, aPrograma)
            End function
            
            oPCGS216_03.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPCGS216_03.RequestFindbyRowId( "CCGS216", RowId)
            Else 
                Err = oPCGS216_03.RequestClear("CCGS216",1)
            End If
            
            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then
            
                aRecNum = Request("CCGS216__recnum")
                If Request ("Clear") <> "" Then
                    Err = oPCGS216_03.RequestClear("CCGS216",1)
                End If
            
                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
            
                    oPCGS216_03.Call "Set_pbReportErrors", 0
                    Err = oPCGS216_03.RequestSave("CCGS216")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Response.Write("<p class=""alert alert-success""><i class=""fa fa-info-circle""></i>&nbsp;Record Saved.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Could not save. Errors Occurred:</font></br>")
                       oPCGS216_03.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                If Request("Delete") <> "" Then
                    oPCGS216_03.Call "Set_pbReportErrors", 0
                    Err = oPCGS216_03.RequestDelete("CCGS216")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Response.Write("<p class=""alert alert-danger""><i class=""fa fa-info-circle""></i>&nbsp;Record deleted.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Record could not be deleted:</font></br>")
                       oPCGS216_03.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPCGS216_03.RequestFind("CCGS216", Index, LT)
                If Request("Find") <> "" Then Err = oPCGS216_03.RequestFind("CCGS216", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPCGS216_03.RequestFind("CCGS216", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPCGS216_03.RequestFind("CCGS216", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPCGS216_03.RequestFind("CCGS216", Index, LAST_RECORD)
            
            End If

        %>

		<input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
		<input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
		<input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
		<input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />
