        <% 
            If (Request.QueryString("aCLIENTE")<>"") Then
               aCLIENTE           =Request.QueryString ("aCLIENTE")
               Session("aCLIENTE")=aCLIENTE
            Else
               aCLIENTE           =Session("aCLIENTE")
            End If  
                    
            If (Request.QueryString("aPARAMETRO")<>"") Then
               aPARAMETRO           =Request.QueryString ("aPARAMETRO")
               Session("aPARAMETRO")=aPARAMETRO
            Else
               aPARAMETRO           =Session("aPARAMETRO")
            End If  
            
            
            oPMEN1000_01.Call "Msg_SetUsuariosessao", aUsuarioSessao
            oPMEN1000_01.Call "msg_pPMEN1000_01Dados", aUsuarioSessao, aUsuarioIPSessao, aPARAMETRO
            
            Function fLogSistema (pIndice, pRecNum)
                     Retorno        = oPAG800_01.Call ("Get_fAcaoSistema", aUsuarioSessao, pIndice, "TMEN1000", pRecNum, aPrograma)
            End Function
        
            oPMEN1000_01.Call "Set_pbReportErrors", 1 'Normally show any errors that occur
            'We either find a record, or clear the WBO
            If RowID <> "" Then
                Err = oPMEN1000_01.RequestFindbyRowId( "TMEN1000", RowID)
            Else 
                Err = oPMEN1000_01.RequestClear("TMEN1000",1)
            End If

            ' process various buttons that might have been pressed.
            ' only support Post submissions
            If Request ("Request_Method") = "POST" Then

                aRecNum = Request("TMEN1000__RecNum")
                If Request ("Clear") <> "" Then
                    Err = oPMEN1000_01.RequestClear("TMEN1000",1)
                End If

                If Request ("Save") <> "" then
                    If aRecNum =  "0" Then aIndice="2"
                    If aRecNum <> "0" Then aIndice="3"
      
                    oPMEN1000_01.Call "Set_pbReportErrors", 0
                    
                    aCODIGOHTMLESCOLHIDO = Request("tmen1000__csag324_id")
                    aMENSAGEM            = Request("tmen1000__mensagem")

                    Err = oPMEN1000_01.call("get_fPMEN1000_01Gravacao", aUsuarioSessao, aUsuarioIPSessao, aCLIENTE, aPARAMETRO, aCODIGOHTMLESCOLHIDO, aMENSAGEM)

                    If Err = "0" Then
                       If aRecNum<>"0" Then fLogSistema aIndice, aRecNum
                       Err = oPMEN1000_01.RequestClear("TMEN1000",1)
                       
                       %>
                          <SCRIPT language="JavaScript">
                                  {
                                  alert('Mensagem efetuada Com Sucesso !!!.');
                      	          var int=self.setInterval("top.close();",100);
                                  }
                          </SCRIPT>
                       <%
                       
                    Else
                       %>
                       <script language="JavaScript">
                              {
                               alert('Mensagem nao enviada ao cliente, pois o mesmo nao tem aplicativo baixado !!!.');
                      	       var int=self.setInterval("top.close();",100);
                              } 
                       </script>
                       <%
                    End If
                End If

                If Request("Delete") <> "" Then
                    oPMEN1000_01.Call "Set_pbReportErrors", 0
                    Err = oPMEN1000_01.RequestDelete("TMEN1000")
                    If Err = 0 Then
                       If aRecNum<>"0" Then fLogSistema "4", aRecNum
                       Err = oPMEN1000_01.RequestClear("TMEN1000",1)
                    Else
                       %>
                       <script language="JavaScript"><!-- {alert("TMEN1000, Sr(a). Registro Nao Pode Ser Excluido !! Clique OK");} //--></script>
                       <%
                    End If
                End If

                If Request("FindPrev") <> "" Then Err = oPMEN1000_01.RequestFind("TMEN1000", Index, LT)
                If Request("Find") <> "" Then Err = oPMEN1000_01.RequestFind("TMEN1000", Index, GE)
                If Request("FindNext") <> "" Then  Err = oPMEN1000_01.RequestFind("TMEN1000", Index, GT)
                If Request("FindFirst") <> "" Then  Err = oPMEN1000_01.RequestFind("TMEN1000", Index, FIRST_RECORD)
                If Request("FindLast") <> "" Then Err = oPMEN1000_01.RequestFind("TMEN1000", Index, LAST_RECORD)

            End If

        %>
