<% If Vr_IdNivel  < "2" Then %><input type="submit" name="clear" value="Clear" class="input-on">&nbsp;<% End If %>
<% If Vr_IdNivel >= "2" Then %><input type="submit" name="save" value="Save" class="input-on">&nbsp;<% End If %>
<% If Vr_IdNivel >= "3" Then %><input type="submit" name="clear" value="Clear" class="input-off">&nbsp;<% End If %>
<% If (Vr_IdNivel = "4" and Vr_Controle = "0") Then %><input type="submit" name="delete" value="Delete" class="input-off"><% End If %>