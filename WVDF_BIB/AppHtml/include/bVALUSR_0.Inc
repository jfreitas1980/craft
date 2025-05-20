<%
    '
    ' ANDERSON RODRIGUES - 05.08.2004 - 15:01
    '
    ' CRIADO PACOTE PARA VALIDAR ABERTURA DE UMA PAGINA .ASP
    ' 
    '
    'ANDERSON RODRIGUES - 05.01.2013 - 15:01
    'THE PAGE WILL NEVER BE CACHED   
    response.Expires=-1	
%>

<%
   Dim bSessionId, VrSessionId
   Dim UserName, UserPass
   Dim Vr_LoginOk, Vr_LoginUsr, IpAddressOk
   Dim Vr_Titulo
   Dim Vr_Direitos, Vr_IdNivel, Vr_Controle
   Dim aPrograma
   Dim Vr_Remote_Addr
   Dim aIdioma
   Dim Var_Msg, Err_Msg
   
   'VrSessionId = request("VrSessionId")
   
   bSessionId = (request.querystring("VrSessionId")<>"")
   
   if bSessionId then
      VrSessionId = request.querystring ("VrSessionId")
      Session("VrSessionId") = VrSessionId
   else 
      VrSessionId = Session("VrSessionId")
	  if VrSessionId=Null then VrSessionId = ""
   end if
   
   UserName  = oSessionId.Call("get_f_GetSessionId", VrSessionId, "UsrName")
   UserPass  = oSessionId.Call("get_f_GetSessionId", VrSessionId, "UsrPass")
   
   Vr_LoginOk  = oDireitos.call("get_f_Login_User", UserName, UserPass)
   Vr_LoginUsr = oDireitos.call("get_f_Validate_Access", UserName, UserPass)
   'IpAddressOk = oDireitos.call("get_f_UserIpAddress", VrSessionId, UserName)
       aIdioma = oDireitos.Call("get_f_Idioma_Usuario", UserName)
   
   'If (IpAddressOk="0") then
        Vr_Remote_Addr = Request.ServerVariables("REMOTE_ADDR")
           IpAddressOk = oDireitos.call("get_f_AutenticaUserIpAddress", VrSessionId, UserName, Vr_Remote_Addr) 
   'end if
   
   If (Vr_LoginOk > "0" and Vr_LoginUsr = "I" and IpAddressOk = "1") Then
  		Vr_Direitos = "1"
  		Vr_IdNivel  = oDireitos.Call("get_f_IdNivel", UserName)
  		Vr_Controle = oDireitos.Call("get_f_Controle", UserName)
   Else 
  		Vr_Direitos = "0"
  		Vr_IdNivel  = "1"
  		Vr_Controle = "1"
   End if 
   
   '--- Function HTMLDecode
   '	@desc: usada para decodificar texto encode.
   '	@author: Thiago Bovo
   '	@date: 05/07/2011
   Function HTMLDecode(sText)
        Dim I
        sText = Replace(sText, "&quot;", Chr(34))
        sText = Replace(sText, "&lt;"  , Chr(60))
        sText = Replace(sText, "&gt;"  , Chr(62))
        sText = Replace(sText, "&amp;" , Chr(38))
        sText = Replace(sText, "&nbsp;", Chr(32))
        For I = 1 to 255
            sText = Replace(sText, "&#" & I & ";", Chr(I))
        Next
        HTMLDecode = sText
    End Function 'HTMLDecode(sText)

%>
