        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TSTI602", pRecNum, aPrograma)
            End function
        
            oPSTI602_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowId <> "" Then
                Err = oPSTI602_01.RequestFindbyRowId( "TSTI602", RowId)
            Else 
                Err = oPSTI602_01.RequestClear("TSTI602",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("TSTI602__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPSTI602_01.RequestClear("TSTI602",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPSTI602_01.Call "Msg_SetUsuariosessao", aUsuarioSessao

                    oPSTI602_01.Call "Set_pbReportErrors", 0
                    Err = oPSTI602_01.RequestSave("TSTI602")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPSTI602_01.RequestClear("TSTI602",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSTI602, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPSTI602_01.Call "Set_pbReportErrors", 0
                    Err = oPSTI602_01.RequestDelete("TSTI602")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPSTI602_01.RequestClear("TSTI602",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TSTI602, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPSTI602_01.RequestFind("TSTI602", Index, LT)
                If Request("Find") <> "" Then Err = oPSTI602_01.RequestFind("TSTI602", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPSTI602_01.RequestFind("TSTI602", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPSTI602_01.RequestFind("TSTI602", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPSTI602_01.RequestFind("TSTI602", Index, LAST_RECORD)

            End If

            If Request("AplicaRedeNeural")<>"" then
               aUSUARIONUMERO = Request("csag366__csag300_nrhd")
               Retorno        = oPSTI602_01.Call ("Get_fPAG366_01AplicaRedeNeural", aUSUARIONUMERO)
            End If

            If Request("ExcluiRedeNeural")<>"" then
               aUSUARIONUMERO = Request("csag366__csag300_nrhd")
               Retorno        = oPSTI602_01.Call ("Get_fPAG366_01ExcluiRedeNeural", aUSUARIONUMERO)
            End If

        %>
        
        <input type="hidden" name="aCI" id="aCI" value="<%=aI%>" />
        <input type="hidden" name="aCE" id="aCE" value="<%=aE%>" />
        <input type="hidden" name="aCC" id="aCC" value="<%=aC%>" />
        <input type="hidden" name="jaUsuarioSessao" id="jaUsuarioSessao" value="<%=aUsuarioSessao%>" />

