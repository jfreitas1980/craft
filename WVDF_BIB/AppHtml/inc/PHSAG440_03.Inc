        
        <% 
            If (Request.QueryString("aID")<>"") Then
               aID           =Request.QueryString ("aID")
               Session("aID")=aID
            Else
               aID           =Session("aID")
            End If  
            oPHSAG440_03.Call "Msg_pHSAH440_03Dados", aUsuarioSessao, aID
        %>
        
        <% 
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "HSAG440", pRecNum, aPrograma)
            End Function
        
            oPHSAG440_03.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowID <> "" Then
                Err = oPHSAG440_03.RequestFindbyRowId( "HSAG440", RowID)
            Else 
                Err = oPHSAG440_03.RequestClear("HSAG440",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("HSAG440__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPHSAG440_03.RequestClear("HSAG440",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPHSAG440_03.Call "Msg_SetUsuariosessao", aUsuarioSessao

                    oPHSAG440_03.Call "Set_pbReportErrors", 0
                    Err = oPHSAG440_03.RequestSave("HSAG440")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPHSAG440_03.RequestClear("HSAG440",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG440, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPHSAG440_03.Call "Set_pbReportErrors", 0
                    Err = oPHSAG440_03.RequestDelete("HSAG440")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPHSAG440_03.RequestClear("HSAG440",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("HSAG440, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPHSAG440_03.RequestFind("HSAG440", Index, LT)
                If Request("Find") <> "" Then Err = oPHSAG440_03.RequestFind("HSAG440", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPHSAG440_03.RequestFind("HSAG440", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPHSAG440_03.RequestFind("HSAG440", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPHSAG440_03.RequestFind("HSAG440", Index, LAST_RECORD)

            End If

        %>
        
       
    