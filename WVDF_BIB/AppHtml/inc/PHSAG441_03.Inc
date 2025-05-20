        
        <% 
            If (Request.QueryString("aID")<>"") Then
               aID           =Request.QueryString ("aID")
               Session("aID")=aID
            Else
               aID           =Session("aID")
            End If  
            oPHSAG441_03.Call "Msg_pHSAH441_03Dados", aUsuarioSessao, aID
        %>
        
        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "HSAG441", pRecNum, aPrograma)
            End Function
        
            oPHSAG441_03.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowID <> "" Then
                Err = oPHSAG441_03.RequestFindbyRowId( "HSAG441", RowID)
            Else 
                Err = oPHSAG441_03.RequestClear("HSAG441",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("HSAG441__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPHSAG441_03.RequestClear("HSAG441",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPHSAG441_03.Call "Msg_SetUsuariosessao", aUsuarioSessao

                    oPHSAG441_03.Call "Set_pbReportErrors", 0
                    Err = oPHSAG441_03.RequestSave("HSAG441")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPHSAG441_03.RequestClear("HSAG441",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG441, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPHSAG441_03.Call "Set_pbReportErrors", 0
                    Err = oPHSAG441_03.RequestDelete("HSAG441")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPHSAG441_03.RequestClear("HSAG441",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG441, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPHSAG441_03.RequestFind("HSAG441", Index, LT)
                If Request("Find") <> "" Then Err = oPHSAG441_03.RequestFind("HSAG441", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPHSAG441_03.RequestFind("HSAG441", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPHSAG441_03.RequestFind("HSAG441", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPHSAG441_03.RequestFind("HSAG441", Index, LAST_RECORD)

            End If

        %>
        
       
    