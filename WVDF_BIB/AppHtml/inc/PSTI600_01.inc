        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TSTI600", pRecNum, aPrograma)
            End function
        
            oPSTI600_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPSTI600_01.RequestFindbyRowId( "TSTI600", RowId)
            Else 
                Err = oPSTI600_01.RequestClear("TSTI600",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("TSTI600__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPSTI600_01.RequestClear("TSTI600",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPSTI600_01.Call "Msg_SetUsuariosessao", aUsuarioSessao

                    oPSTI600_01.Call "Set_pbReportErrors", 0
                    Err = oPSTI600_01.RequestSave("TSTI600")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPSTI600_01.RequestClear("TSTI600",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSTI600, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPSTI600_01.Call "Set_pbReportErrors", 0
                    Err = oPSTI600_01.RequestDelete("TSTI600")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPSTI600_01.RequestClear("TSTI600",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSTI600, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPSTI600_01.RequestFind("TSTI600", Index, LT)
                If Request("Find") <> "" Then Err = oPSTI600_01.RequestFind("TSTI600", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPSTI600_01.RequestFind("TSTI600", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPSTI600_01.RequestFind("TSTI600", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPSTI600_01.RequestFind("TSTI600", Index, LAST_RECORD)

            End If

            If Request("AplicaRedeNeural")<>"" then
               aUSUARIONUMERO = Request("csag366__csag300_nrhd")
               Retorno        = oPSTI600_01.Call ("Get_fPAG366_01AplicaRedeNeural", aUSUARIONUMERO)
            End If

            If Request("ExcluiRedeNeural")<>"" then
               aUSUARIONUMERO = Request("csag366__csag300_nrhd")
               Retorno        = oPSTI600_01.Call ("Get_fPAG366_01ExcluiRedeNeural", aUSUARIONUMERO)
            End If

        %>
        
        <input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
        <input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
        <input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
        <input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />

