        <% 
            oPCIM2206_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "HCIM2206", pRecNum, aPrograma)
            End function
            
            oPCIM2206_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> 0 Then
                Err = oPCIM2206_01.RequestFindbyRecId( "HCIM2206", RecId)
            Else 
                Err = oPCIM2206_01.RequestClear("HCIM2206",1)
            End If
            
            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then
            
                aRecNum = Request("HCIM2206__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPCIM2206_01.RequestClear("HCIM2206",1)
                End If
            
                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
            
                    oPCIM2206_01.Call "Set_pbReportErrors", 0
                    Err = oPCIM2206_01.RequestSave("HCIM2206")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Response.Write("<p class=""alert alert-success"">Record Saved.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;"">Could not save. Errors Occurred:</font></br>")
                       oPCIM2206_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                If Request("Delete") <> "" Then
                    oPCIM2206_01.Call "Set_pbReportErrors", 0
                    Err = oPCIM2206_01.RequestDelete("HCIM2206")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Response.Write("<p class=""alert alert-danger"">Record deleted.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;"">Record could not be deleted:</font></br>")
                       oPCIM2206_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPCIM2206_01.RequestFind("HCIM2206", Index, LT)
                If Request("Find") <> "" Then Err = oPCIM2206_01.RequestFind("HCIM2206", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPCIM2206_01.RequestFind("HCIM2206", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPCIM2206_01.RequestFind("HCIM2206", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPCIM2206_01.RequestFind("HCIM2206", Index, LAST_RECORD)
            
            End If

        %>

		<input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
		<input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
		<input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
		<input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />
