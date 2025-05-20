
<table width="80%" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="">

  <tr>
    <Td Align="Left" ><img src="<%=aLogoEmpresa%>" width="100px" height="40px"	></Td>
  
    <td align="Left">

           <img src="Images/Botoes/Sistema.gif" 	         Class="BotaoSistemas"       Title="<%=oPAG309_01.DDValue("Csag309.Literal_03")%>" onclick="javascript:parent.frames.Frame_Corpo.location.href = ('PAG999_01.Asp?aUsuarioSessao=<%=aUsuarioSessao%>&RunReport=1');mostrarMenu();">   

        <% If (aUsuarioTemMenu="1") Then %>                  
           <img src="Images/Botoes/Sistema.gif" 	         Class="BotaoSistemas"       Title="<%=oPAG309_01.DDValue("Csag309.Literal_03")%>" onclick="javascript:parent.frames.Frame_Menu.location.href = ('PAG999_02.Asp?aUsuarioSessao=<%=aUsuarioSessao%>&RunReport=1');mostrarMenu();">   
        <% End If %>                                         
                                                             
		<img src="Images/Botoes/Senha.gif" 			         Class="BotaoSenha" 	     Title="<%=oPAG309_01.DDValue("Csag309.Literal_04")%>" onclick="javascript:parent.frames.Frame_Corpo.location.href = ('PAG300_07.Asp?aUsuarioSessao=<%=aUsuarioSessao%>');">
                                                             
        <% If (aETerciaria<>"") Then %>                      
           <img src="Images/Botoes/Contatos.gif" 	         Class="BotaoContatos"       Title="<%=oPAG309_01.DDValue("Csag309.Literal_05")%>" onclick="javascript:parent.frames.Frame_Corpo.location.href = ('<%=sVariavelTerciaria%>'); ">
        <% End If %>                                         
		                                                     
        <% If (sVariavelMobile<>"") Then %>                  
          <img src="Images/Botoes/Convidar.gif"              Class="BotaoReconstituir"   Title="<%=oPAG309_01.DDValue("Csag309.Literal_20")%>" onclick="javascript:parent.frames.Frame_Corpo.location.href = ('<%=sVariavelMobile%>'); ">
        <% End If %>                                         
                                                             
		&nbsp;&nbsp;                                         
                                                             
        <img src="Images/Botoes/StatusConexao.gif" 	         Class="BotaoStatusConexao"  Title="<%=oPAG309_01.DDValue("Csag309.Literal_12")%>" onclick="javascript:parent.frames.Frame_Corpo.location.href = ('PAG300_11.Asp?aUsuarioSessao=<%=aUsuarioSessao%>');">
                                                             
        <% If (aEGrupoMenu<>"") Then %>                      
          <img src="Images/Botoes/Restricoes.gif"            Class="BotaoRestricoes"     Title="<%=oPAG309_01.DDValue("Csag309.Literal_13")%>" onclick="javascript:parent.frames.Frame_Corpo.location.href = ('<%=sVariavelGrupoMenu%>');">
        <% End If %>                                         
                                                             


		&nbsp;&nbsp;&nbsp;&nbsp;

        <% If (sVariavelEPRapidas<>"") Then %>
              <iframe src="<%=sVariavelEPRapidas%>"   name="Frame_PesquisasRapidas" style="border:1px solid #f2f2f2" marginwidth="0" width="215" height="25" marginheight="0" align="top" scrolling="no" frameborder="0"></iframe>
        <% End If %>
		
		&nbsp;&nbsp;&nbsp;&nbsp;

        <% If (aEReclamacoes<>"") Then %>
          <img src="Images/Botoes/Botao_desconectado.gif"   Class="BotaoCompromissos"   Title="<%=oPAG309_01.DDValue("Csag309.Literal_06")%>" onclick="javascript:parent.frames.Frame_Corpo.location.href = ('<%=sVariavelReclamacao%>');">
        <% End If %>
          
        <% If (sVariavelEClientes<>"") Then %>
              <img src="Images/Botoes/ClientePosicao.gif" 	Class="BotaoClientes"       Title="<%=oPAG309_01.DDValue("Csag309.Literal_17")%>" onclick="javascript:parent.frames.Frame_Corpo.location.href = ('<%=sVariavelEClientes%>');">
        <% End If %>
              
        <% If (sVariavelEMenuAplicacoes<>"") Then %>
              <img src="Images/Botoes/MenuAplicacao.gif" 	Class="BotaoMenuAplicacao"  Title="<%=oPAG309_01.DDValue("Csag309.Literal_18")%>" onclick="javascript:parent.frames.Frame_Menu.location.href = ('<%=sVariavelEMenuAplicacoes%>');mostrarMenu();"> 
        <% End If %>
              
        <% If (sVariavelEBroker<>"") Then %>
              <img src="Images/Botoes/Atendimento.gif"  	Class="BotaoMenuAplicacao"  Title="<%=oPAG309_01.DDValue("Csag309.Literal_19")%>" onclick="javascript:parent.frames.Frame_Corpo.location.href = ('<%=sVariavelEBroker%>');">
        <% End If %>
              
        <% If (sVariavelEROLine<>"") Then %>
              <img src="Images/Botoes/Grafico.gif"        	Class="BotaoMenuAplicacao"  Title="<%=oPAG309_01.DDValue("Csag309.Literal_21")%>" OnClick="javascript:window.open('<%=sVariavelEROLine%>','RISCOONLINE','location=0,menubar=1,toolbar=1,status=0,scrollbars=1,resizable=1,directores=0,left=5,top=5');">
        <% End If %>

		&nbsp;&nbsp;&nbsp;

        <img src="Images/Botoes/Sair.gif" 	                Class="BotaoSair"           Title="<%=oPAG309_01.DDValue("Csag309.Literal_50")%>"  onclick="javascript:top.location.href = ('PAG300_06.Asp?aUsuarioSessao=<%=aUsuarioSessao%>');" >
    	
		
	</td>	
  </tr>
</table>
