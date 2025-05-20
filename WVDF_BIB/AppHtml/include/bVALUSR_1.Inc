<%

   If (Vr_Direitos = "1") Then
  		Vr_IdNivel = oDireitos.Call("get_f_ValidaPrograma", UserName, aPrograma)
  		If (Vr_Controle="0" and Vr_IdNivel<>"4") Then Vr_Controle = "1"
   End If 

%>
