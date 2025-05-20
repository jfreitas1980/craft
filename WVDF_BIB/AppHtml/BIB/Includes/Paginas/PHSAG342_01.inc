<% 
            oPHSAG342_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "HSAG342", pRecNum, aPrograma)
            End function
            
            oPHSAG342_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPHSAG342_01.RequestFindbyRowId( "HSAG342", RowId)
            Else 
                Err = oPHSAG342_01.RequestClear("HSAG342",1)
            End If
            
            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then
            
                aRecNum = Request("HSAG342__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPHSAG342_01.RequestClear("HSAG342",1)
                End If
            
                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
            
                    oPHSAG342_01.Call "Set_pbReportErrors", 0
                    Err = oPHSAG342_01.RequestSave("HSAG342")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Response.Write("<p class=""alert alert-success""><i class=""fa fa-info-circle""></i>&nbsp;Record Saved.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Could not save. Errors Occurred:</font></br>")
                       oPHSAG342_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                If Request("Delete") <> "" Then
                    oPHSAG342_01.Call "Set_pbReportErrors", 0
                    Err = oPHSAG342_01.RequestDelete("HSAG342")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Response.Write("<p class=""alert alert-danger""><i class=""fa fa-info-circle""></i>&nbsp;Record deleted.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Record could not be deleted:</font></br>")
                       oPHSAG342_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If
            
                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPHSAG342_01.RequestFind("HSAG342", Index, LT)
                If Request("Find") <> "" Then Err = oPHSAG342_01.RequestFind("HSAG342", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPHSAG342_01.RequestFind("HSAG342", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPHSAG342_01.RequestFind("HSAG342", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPHSAG342_01.RequestFind("HSAG342", Index, LAST_RECORD)
            
            End If

        %>

		<input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />
