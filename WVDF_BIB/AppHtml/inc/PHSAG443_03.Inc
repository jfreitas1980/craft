        
        <% 
            If (Request.QueryString("aID")<>"") Then
               aID           =Request.QueryString ("aID")
               Session("aID")=aID
            Else
               aID           =Session("aID")
            End If  
            oPHSAG443_03.Call "Msg_pHSAH440_03Dados", aUsuarioSessao, aID
        %>
        
        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "HSAG443", pRecNum, aPrograma)
            End Function
        
            oPHSAG443_03.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowID <> "" Then
                Err = oPHSAG443_03.RequestFindbyRowId( "HSAG443", RowID)
            Else 
                Err = oPHSAG443_03.RequestClear("HSAG443",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("HSAG443__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPHSAG443_03.RequestClear("HSAG443",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPHSAG443_03.Call "Msg_SetUsuariosessao", aUsuarioSessao

                    oPHSAG443_03.Call "Set_pbReportErrors", 0
                    Err = oPHSAG443_03.RequestSave("HSAG443")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPHSAG443_03.RequestClear("HSAG443",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG443, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPHSAG443_03.Call "Set_pbReportErrors", 0
                    Err = oPHSAG443_03.RequestDelete("HSAG443")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPHSAG443_03.RequestClear("HSAG443",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG443, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPHSAG443_03.RequestFind("HSAG443", Index, LT)
                If Request("Find") <> "" Then Err = oPHSAG443_03.RequestFind("HSAG443", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPHSAG443_03.RequestFind("HSAG443", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPHSAG443_03.RequestFind("HSAG443", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPHSAG443_03.RequestFind("HSAG443", Index, LAST_RECORD)

            End If

        %>
        
       
    