				<% If (aI="1") Then %>
                        <img class="btn_toolbar_2"   src="<%=aIC_22_ACTIONS%>Save.png" id="btn-save" onClick="javascript:jConfirm('<%=oPAG312_01.DDValue("Csag312.CSalvar")%>', 'Atencao', function(r) {if (r) {document.<%=aNomeFormulario%>.action='<%=aAcaoFormulario%>&Save=1';document.<%=aNomeFormulario%>.submit();}});" Title="<%=oPAG312_01.DDValue("Csag312.Salvar")%>" />&nbsp;
                <% End If %>
                        <img class="btn_toolbar_2"   src="<%=aIC_22_ACTIONS%>Clear.png" id="btn-clear" onClick="javascript:jConfirm('Deseja limpar o regitro', 'Atencao', function(r) {if (r) {document.<%=aNomeFormulario%>.action='<%=aAcaoFormulario%>&Clear=1';document.<%=aNomeFormulario%>.submit();}});" Title="<%=oPAG312_01.DDValue("Csag312.Limpar")%>"/>
                        <!-- funcao jsRefresh(var) a variavel desta funcao se referencia a qual form estamos trabalhando geralmente eh o form[0] -->
				<% If (aE="1") Then %>
                        <img class="btn_toolbar_2" src="<%=aIC_22_ACTIONS%>Delete.png" id="btn-delete"	onClick="jsExcluir(0)" Title="<%=oPAG312_01.DDValue("Csag312.Excluir")%>"/>
                        <!-- funcao jsExcluir(var) a variavel desta funcao se referencia a qual form estamos trabalhando geralmente eh o form[0] -->
                <% End If %>
