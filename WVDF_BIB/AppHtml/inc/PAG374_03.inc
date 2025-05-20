        <% 
            oPAG374_03.Call "Msg_SetUsuariosessao", aUsuarioSessao
            oPAG374_03.Call "Msg_Set_CSAG320_ID", aCSAG320Id
            Function fLogSistema (pIndice, pRecNum)
				Retorno = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG374", pRecNum, aPrograma)
            End function
            
            oPAG374_03.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG374_03.RequestFindbyRowId( "CSAG374", RowId)
            Else 
                Err = oPAG374_03.RequestClear("CSAG374",1)
            End If
            
            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then
            
                aRecNum = Request("CSAG374__recnum")
                If Request ("Clear") <> "" Then
                    Err = oPAG374_03.RequestClear("CSAG374",1)
                End If
            
                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
            
                    oPAG374_03.Call "Set_pbReportErrors", 0
                    Err = oPAG374_03.RequestSave("CSAG374")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Response.Write("<p class=""alert alert-success""><i class=""fa fa-info-circle""></i>&nbsp;Record Saved.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Could not save. Errors Occurred:</font></br>")
                       oPAG374_03.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                If Request("Delete") <> "" Then
                    oPAG374_03.Call "Set_pbReportErrors", 0
                    Err = oPAG374_03.RequestDelete("CSAG374")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Response.Write("<p class=""alert alert-danger""><i class=""fa fa-info-circle""></i>&nbsp;Record deleted.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Record could not be deleted:</font></br>")
                       oPAG374_03.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG374_03.RequestFind("CSAG374", Index, LT)
                If Request("Find") <> "" Then Err = oPAG374_03.RequestFind("CSAG374", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG374_03.RequestFind("CSAG374", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG374_03.RequestFind("CSAG374", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG374_03.RequestFind("CSAG374", Index, LAST_RECORD)
            
            End If

        %>

		<input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
		<input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
		<input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
		<input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />
