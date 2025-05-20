        
        <% 
            If (Request.QueryString("aID")<>"") Then
               aID           =Request.QueryString ("aID")
               Session("aID")=aID
            Else
               aID           =Session("aID")
            End If  

            If (Request.QueryString("aFEED_ID")<>"") Then
               aFEED_ID           =Request.QueryString ("aFEED_ID")
               Session("aFEED_ID")=aFEED_ID
            Else
               aFEED_ID           =Session("aFEED_ID")
            End If  

            oPHSAG444_03.Call "Msg_pHSAH444_03Dados", aUsuarioSessao, aID, aFEED_ID
        %>
        
        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "HSAG444", pRecNum, aPrograma)
            End Function
        
            oPHSAG444_03.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowID <> "" Then
                Err = oPHSAG444_03.RequestFindbyRowId( "HSAG444", RowID)
            Else 
                Err = oPHSAG444_03.RequestClear("HSAG444",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("HSAG444__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPHSAG444_03.RequestClear("HSAG444",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPHSAG444_03.Call "Msg_SetUsuariosessao", aUsuarioSessao

                    oPHSAG444_03.Call "Set_pbReportErrors", 0
                    Err = oPHSAG444_03.RequestSave("HSAG444")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPHSAG444_03.RequestClear("HSAG444",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG444, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPHSAG444_03.Call "Set_pbReportErrors", 0
                    Err = oPHSAG444_03.RequestDelete("HSAG444")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPHSAG444_03.RequestClear("HSAG444",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG444, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPHSAG444_03.RequestFind("HSAG444", Index, LT)
                If Request("Find") <> "" Then Err = oPHSAG444_03.RequestFind("HSAG444", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPHSAG444_03.RequestFind("HSAG444", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPHSAG444_03.RequestFind("HSAG444", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPHSAG444_03.RequestFind("HSAG444", Index, LAST_RECORD)

            End If

        %>
        
       
    