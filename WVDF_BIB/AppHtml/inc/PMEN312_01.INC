        <% 
            oPMEN312_01.Call "Msg_pPMEN312_01Dados", aUsuarioSessao
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN312", pRecNum, aPrograma)
            End function
        
            oPMEN312_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RecId <> "" Then
                Err = oPMEN312_01.RequestFindbyRecId( "Tmen312", RecId)
            Else 
                Err = oPMEN312_01.RequestClear("Tmen312",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("Tmen312__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN312_01.RequestClear("Tmen312",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN312_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN312_01.RequestSave("Tmen312")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Retorno=oPMEN312_01.Call ("Get_fPMEN312_01GeracaoNoticias", "1")
                       Retorno=oPMEN312_01.Call ("get_fPMEN312_01DivulgacaoNoticias", aUsuarioSessao)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN312, Sr(a). Registro Nao Pode Ser Gravado, Ja Esta Cadastrado !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN312_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN312_01.RequestDelete("Tmen312")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN312, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                ' note we use the Index variable we created above
                If Request("FindPrev") <> "" Then Err = oPMEN312_01.RequestFind("Tmen312", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN312_01.RequestFind("Tmen312", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN312_01.RequestFind("Tmen312", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN312_01.RequestFind("Tmen312", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN312_01.RequestFind("Tmen312", Index, LAST_RECORD)

            End If
            
        %>

<script language=javascript>
function fChecagem() {

if(document.Tmen312.tmen312__mensagem.value==""){
   alert("E OBRIGATORIO, digitar uma MENSAGEM");
   document.Tmen312.tmen312__mensagem.focus();
}
}
</script>

