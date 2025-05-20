        <% 
            oPCIM204_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CCIM204", pRecNum, aPrograma)
            End function
            
            oPCIM204_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> 0 Then
                Err = oPCIM204_01.RequestFindbyRecId( "CCIM204", RecId)
            Else 
                Err = oPCIM204_01.RequestClear("CCIM204",1)
            End If
            
            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then
            
                aRecNum = Request("CCIM204__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPCIM204_01.RequestClear("CCIM204",1)
                End If
            
                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
            
                    oPCIM204_01.Call "Set_pbReportErrors", 0
                    Err = oPCIM204_01.RequestSave("CCIM204")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Response.Write("<p class=""alert alert-success"">Record Saved.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;"">Could not save. Errors Occurred:</font></br>")
                       oPCIM204_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                If Request("Delete") <> "" Then
                    oPCIM204_01.Call "Set_pbReportErrors", 0
                    Err = oPCIM204_01.RequestDelete("CCIM204")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Response.Write("<p class=""alert alert-danger"">Record deleted.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;"">Record could not be deleted:</font></br>")
                       oPCIM204_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPCIM204_01.RequestFind("CCIM204", Index, LT)
                If Request("Find") <> "" Then Err = oPCIM204_01.RequestFind("CCIM204", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPCIM204_01.RequestFind("CCIM204", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPCIM204_01.RequestFind("CCIM204", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPCIM204_01.RequestFind("CCIM204", Index, LAST_RECORD)
            
            End If

        %>

		<input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
		<input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
		<input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
		<input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />
