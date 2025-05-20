<% 
    ' ANDERSON RODRIGUES - 29.12.2008 - 22:30 
    ' ANDERSON RODRIGUES - 04.06.2009 - 18:32 
    '
%>

<% If Vr_IdNivel  < "0" Then %>
    <input type="button" name="clear" value="Clear" onclick="javascript:if(confirm('Deseja limpar as informacoes contidas na tela?') == true ){document.<%=Vr_Form%>.action='<%=Vr_FormAction%>&clear=1';document.<%=Vr_Form%>.submit();}" class="input-on">&nbsp;
<% End If %>

<% '----------- SOMENTE ALTERACAO -------------------- %>
<% If Vr_IdNivel = "1" Then %>
    <input type="button" name="save"  value="Save"  onclick="javascript:if(confirm('Deseja salvar o registro?') == true ){document.<%=Vr_Form%>.action='<%=Vr_FormAction%>&save=1';document.<%=Vr_Form%>.submit();}" class="input-on">&nbsp;
<% End If %>

<% '----------- SOMENTE INCLUSAO -------------------- %>
<% If Vr_IdNivel  = "2" Then %>
    <input type="button" name="save"  value="Save"  onclick="javascript:if(confirm('Deseja salvar o registro?') == true ){document.<%=Vr_Form%>.action='<%=Vr_FormAction%>&save=1';document.<%=Vr_Form%>.submit();}" class="input-on">&nbsp;
    <input type="button" name="clear" value="Clear" onclick="javascript:if(confirm('Deseja limpar as informacoes contidas na tela?') == true ){document.<%=Vr_Form%>.action='<%=Vr_FormAction%>&clear=1';document.<%=Vr_Form%>.submit();}" class="input-off">&nbsp;
<% End If %>

<% '----------- INCLUSAO/ALTERACAO -------------------- %>
<% If Vr_IdNivel >= "3" Then %>
    <input type="button" name="save"  value="Save"  onclick="javascript:if(confirm('Deseja salvar o registro?') == true ){document.<%=Vr_Form%>.action='<%=Vr_FormAction%>&save=1';document.<%=Vr_Form%>.submit();}" class="input-on">&nbsp;
    <input type="button" name="clear" value="Clear" onclick="javascript:if(confirm('Deseja limpar as informacoes contidas na tela?') == true ){document.<%=Vr_Form%>.action='<%=Vr_FormAction%>&clear=1';document.<%=Vr_Form%>.submit();}" class="input-off">&nbsp;
<% End If %>

<% '----------- EXCLUSAO -------------------- %>
<% If (Vr_IdNivel = "4" and Vr_Controle = "0") Then %>
    <input type="button" name="delete" value="Delete" onclick="javascript:if(confirm('Deseja excluir o registro?') == true ){document.<%=Vr_Form%>.action='<%=Vr_FormAction%>&delete=1';document.<%=Vr_Form%>.submit();}" class="input-off">&nbsp;
<% End If %>
