        <% 
            oPAG362_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
             Retorno= oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "CSAG362", pRecNum, aPrograma)
            End function
        
            oPAG362_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            
            'We either find a record, or clear the WBO
            If RowID <> "" Then
                Err = oPAG362_01.RequestFindbyRowId( "CSAG362", RowID)
            Else 
                Err = oPAG362_01.RequestClear("CSAG362",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then
                aRecNum = Request("csag362__recnum")
                If Request ("Clear") <> "" Then
                    Err = oPAG362_01.RequestClear("CSAG362",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPAG362_01.Call "Msg_SetUsuariosessao", aUsuarioSessao

                    oPAG362_01.Call "Set_pbReportErrors", 0
                    Err = oPAG362_01.RequestSave("CSAG362")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       
                       Response.Write("<p class=""alert alert-success""><i class=""fa fa-info-circle""></i>&nbsp;Record Saved.</p>")
                       'Err = oPAG362_01.RequestClear("CSAG362",1)
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Could not save. Errors Occurred:</font></br>")
                       oPAG362_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG362_01.Call "Set_pbReportErrors", 0
                    Err = oPAG362_01.RequestDelete("CSAG362")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Response.Write("<p class=""alert alert-danger""><i class=""fa fa-info-circle""></i>&nbsp;Record deleted.</p>")
                    Else
                       Response.Write("<p class=""alert alert-warning"">")
                       Response.Write("<font style=""text-decoration:underline;""><i class=""fa fa-ban""></i>&nbsp;Record could not be deleted:</font></br>")
                       oPAG362_01.call "msg_ReportAllErrors"
                       Response.Write("</p>")
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG362_01.RequestFind("CSAG362", Index, LT)
                If Request("Find") <> "" Then Err = oPAG362_01.RequestFind("CSAG362", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG362_01.RequestFind("CSAG362", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG362_01.RequestFind("CSAG362", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG362_01.RequestFind("CSAG362", Index, LAST_RECORD)

            End If

        %>
        
       
