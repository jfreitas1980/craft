        <% 
            oPAG371_03.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG371", pRecNum, aPrograma)
            End function
            
            oPAG371_03.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> 0 Then
                Err = oPAG371_03.RequestFindbyRecId( "CSAG371", RecId)
            Else 
                Err = oPAG371_03.RequestClear("CSAG371",1)
            End If
            
            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then
            
                aRecNum = Request("csag371__recnum")
                If Request ("Clear") <> "" Then
                    Err = oPAG371_03.RequestClear("CSAG371",1)
                End If
            
                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
            
                    oPAG371_03.Call "Set_pbReportErrors", 0
                    Err = oPAG371_03.RequestSave("CSAG371")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Response.Write("<p class=""alert alert-success"">Record Saved.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;"">Could not save. Errors Occurred:</font></br>")
                       oPAG371_03.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                If Request("Delete") <> "" Then
                    oPAG371_03.Call "Set_pbReportErrors", 0
                    Err = oPAG371_03.RequestDelete("CSAG371")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Response.Write("<p class=""alert alert-danger"">Record deleted.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;"">Record could not be deleted:</font></br>")
                       oPAG371_03.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG371_03.RequestFind("CSAG371", Index, LT)
                If Request("Find") <> "" Then Err = oPAG371_03.RequestFind("CSAG371", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG371_03.RequestFind("CSAG371", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG371_03.RequestFind("CSAG371", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG371_03.RequestFind("CSAG371", Index, LAST_RECORD)
            
            End If

        %>

		<input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
		<input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
		<input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
        
        <input type="hidden" id="hdn-aUsuarioSessao" value="<%=aUsuarioSessao%>" />
        <input type="hidden" id="hdn-asEMPRESA" value="<%=asEMPRESA%>" />
        <input type="hidden" id="hdn-asCSAG320_CD" value="<%=asCSAG320_CD%>" />
