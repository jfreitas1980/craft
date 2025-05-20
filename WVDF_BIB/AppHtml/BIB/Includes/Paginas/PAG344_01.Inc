        <% 
            oPAG344_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPAG344_01.RequestFindbyRowId( "Csag344", RowId)
            Else 
                Err = oPAG344_01.RequestClear("Csag344",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                If Request ("Clear") <> "" Then
                    Err = oPAG344_01.RequestClear("Csag344",1)
                End If

                If Request ("Save") <> "" then
                    oPAG344_01.Call "Set_pbReportErrors", 0
                    Err = oPAG344_01.RequestSave("Csag344")
                    If Err = 0 Then
                        Response.Write("<center><h4>Csag344 Record Saved</h4> </center>")
                    Else
                        Response.Write("<font color=""red"">")
                        Response.Write("<center><h4>Could not save changes. Errors Occurred</h4> </center>")
                        oPAG344_01.Call "Msg_ReportAllErrors"
                        Response.Write("</font>")
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPAG344_01.Call "Set_pbReportErrors", 0
                    Err = oPAG344_01.RequestDelete("Csag344")
                    If Err = 0 Then
                        Response.Write("<center><h4>The record has been deleted.</h4></center>")
                    Else
                        Response.Write("<font color=""red"">")
                        Response.Write("<center><h4>The record could not be deleted.</h4></center>")
                        oPAG344_01.Call "Msg_ReportAllErrors"
                        Response.Write("</font>")
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPAG344_01.RequestFind("Csag344", Index, LT)
                If Request("Find") <> "" Then Err = oPAG344_01.RequestFind("Csag344", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPAG344_01.RequestFind("Csag344", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPAG344_01.RequestFind("Csag344", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPAG344_01.RequestFind("Csag344", Index, LAST_RECORD)

            End If

        %>