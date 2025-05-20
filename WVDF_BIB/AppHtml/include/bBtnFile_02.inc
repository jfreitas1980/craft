<% 
    ' ANDERSON RODRIGUES - 10.06.2009 - 14:33 
    '
%>

<% If Vr_IdNivel  < "0" Then %>
    <input type="button" name="btn_clear" id="btn_clear" value="<%=oPSGC0377_03.DDValue("TSGC0377.LIMPAR")%>" Class="input-on">&nbsp;
<% End If %>

<% '----------- SOMENTE ALTERACAO -------------------- %>
<% If Vr_IdNivel = "1" Then %>
    <input type="button" name="btn_save" id="btn_save" value="<%=oPSGC0377_03.DDValue("TSGC0377.SALVAR")%>" Class="input-on">&nbsp;
<% End If %>

<% '----------- SOMENTE INCLUSAO -------------------- %>
<% If Vr_IdNivel  = "2" Then %>
    <input type="button" name="btn_save" id="btn_save" value="<%=oPSGC0377_03.DDValue("TSGC0377.SALVAR")%>" Class="input-on">&nbsp;
    <input type="button" name="btn_clear" id="btn_clear" value="<%=oPSGC0377_03.DDValue("TSGC0377.LIMPAR")%>" Class="input-off">&nbsp;
<% End If %>

<% '----------- INCLUSAO/ALTERACAO -------------------- %>
<% If Vr_IdNivel >= "3" Then %>
    <input type="button" name="btn_save" id="btn_save" value="<%=oPSGC0377_03.DDValue("TSGC0377.SALVAR")%>" Class="input-on">&nbsp;
    <input type="button" name="btn_clear" id="btn_clear" value="<%=oPSGC0377_03.DDValue("TSGC0377.LIMPAR")%>" Class="input-off">&nbsp;
<% End If %>

<% '----------- EXCLUSAO -------------------- %>
<% If (Vr_IdNivel = "4" and Vr_Controle = "0") Then %>
    <input type="button" name="btn_delete" id="btn_delete" value="<%=oPSGC0377_03.DDValue("TSGC0377.EXCLUIR")%>" Class="input-off">&nbsp;
<% End If %>
