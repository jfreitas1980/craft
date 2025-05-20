        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TSTY504", pRecNum, aPrograma)
            End function
        
            oPSTY504_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPSTY504_01.RequestFindbyRowId( "TSTY504", RowId)
            Else 
                Err = oPSTY504_01.RequestClear("TSTY504",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("TSTY504__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPSTY504_01.RequestClear("TSTY504",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPSTY504_01.Call "Msg_SetUsuariosessao", aUsuarioSessao

                    oPSTY504_01.Call "Set_pbReportErrors", 0
                    Err = oPSTY504_01.RequestSave("TSTY504")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPSTY504_01.RequestClear("TSTY504",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSTY504, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPSTY504_01.Call "Set_pbReportErrors", 0
                    Err = oPSTY504_01.RequestDelete("TSTY504")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPSTY504_01.RequestClear("TSTY504",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSTY504, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPSTY504_01.RequestFind("TSTY504", Index, LT)
                If Request("Find") <> "" Then Err = oPSTY504_01.RequestFind("TSTY504", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPSTY504_01.RequestFind("TSTY504", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPSTY504_01.RequestFind("TSTY504", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPSTY504_01.RequestFind("TSTY504", Index, LAST_RECORD)

            End If

            If Request("AplicaRedeNeural")<>"" then
               aUSUARIONUMERO = Request("csag366__csag300_nrhd")
               Retorno        = oPSTY504_01.Call ("Get_fPAG366_01AplicaRedeNeural", aUSUARIONUMERO)
            End If

            If Request("ExcluiRedeNeural")<>"" then
               aUSUARIONUMERO = Request("csag366__csag300_nrhd")
               Retorno        = oPSTY504_01.Call ("Get_fPAG366_01ExcluiRedeNeural", aUSUARIONUMERO)
            End If

        %>
        
        <input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
        <input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
        <input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
        <input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />

