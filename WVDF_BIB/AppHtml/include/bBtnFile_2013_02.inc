<% 
    ' JOÃO MILTON - 22/04/2013 - 18:12

	Function Formata_Btn(frase)
		Dim FraseTemp
		FraseTemp = UCase(Left(frase,1)) & LCase(mid(frase,2))
		Formata_Btn = FraseTemp
	End Function
%>

<% If Vr_IdNivel  < "0" Then %>
    <input type="button" name="btn_clear" id="btn_clear" value="<%= Formata_Btn(oPSGC0377_03.DDValue("TSGC0377.LIMPAR")) %>" Class="btn btn-mini btn-success">&nbsp;
<% End If %>

<% '----------- SOMENTE ALTERACAO -------------------- %>
<% If Vr_IdNivel = "1" Then %>
    <input type="button" name="btn_save" id="btn_save" value="<%= Formata_Btn(oPSGC0377_03.DDValue("TSGC0377.SALVAR"))%>" Class="btn btn-mini btn-success">&nbsp;
<% End If %>

<% '----------- SOMENTE INCLUSAO -------------------- %>
<% If Vr_IdNivel  = "2" Then %>
    <input type="button" name="btn_save" id="btn_save" value="<%= Formata_Btn(oPSGC0377_03.DDValue("TSGC0377.SALVAR")) %>" Class="btn btn-mini btn-success">&nbsp;
    <input type="button" name="btn_clear" id="btn_clear" value="<%= Formata_Btn(oPSGC0377_03.DDValue("TSGC0377.LIMPAR")) %>" Class="btn btn-mini">&nbsp;
<% End If %>

<% '----------- INCLUSAO/ALTERACAO -------------------- %>
<% If Vr_IdNivel >= "3" Then %>
    <input type="button" name="btn_save" id="btn_save" value="<%= Formata_Btn(oPSGC0377_03.DDValue("TSGC0377.SALVAR")) %>" Class="btn btn-mini btn-success">&nbsp;
    <input type="button" name="btn_clear" id="btn_clear" value="<%= Formata_Btn(oPSGC0377_03.DDValue("TSGC0377.LIMPAR")) %>" Class="btn btn-mini">&nbsp;
<% End If %>

<% '----------- EXCLUSAO -------------------- %>
<% If (Vr_IdNivel = "4" and Vr_Controle = "0") Then %>
    <input type="button" name="btn_delete" id="btn_delete" value="<%= Formata_Btn(oPSGC0377_03.DDValue("TSGC0377.EXCLUIR")) %>" Class="btn btn-mini">&nbsp;
<% End If %>
