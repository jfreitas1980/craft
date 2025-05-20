<%
    Dim EmailDe
    Dim EmailPara     
    Dim EmailCCopia   
    Dim EmailCOculta   
    Dim EmailNmArquivo, EmailArquivo
    Dim EmailNmArquivo2, EmailArquivo2, EmailArquivo3, EmailArquivo4
    Dim EmailAssunto 
    Dim EmailBody 
    Dim EmailBodyHTML 
    Dim EmailCreateBodyHTML 
    Dim objCDOSYSMail
    Dim objCDOSYSCon
    Dim textfile2
    Dim iPageTotal
    Dim iPage
    Dim aCaminhoUpload   
    Dim o_msg
    Dim o_conf
%>
    
<%
   function enviar_email (EmailDe,EmailPara,EmailCCopia,EmailCOculta,EmailArquivo,EmailArquivo2,EmailAssunto,EmailBody,EmailBodyHTML,EmailCreateBodyHTML)

        ' cria o objeto para o envio de e-mail ------------------------------------------------------'
        Set objCDOSYSMail= Server.CreateObject ("CDO.Message")
        
        ' cria o objeto para configura+’o do SMTP ---------------------------------------------------'
        Set objCDOSYSCon = Server.CreateObject ("CDO.Configuration")                                '
        
        ' SMTP --------------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "smtp.as.asiashipping.com.br" '
        
        ' porta do SMTP -----------------------------------------------------------------------------' 
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25   '
        
        ' porta do CDO ------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2         '
        
        ' timeout -----------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout") = 30 '
        
        ' atualizar os campos configurados ----------------------------------------------------------' 
        objCDOSYSCon.Fields.update                                                                  '
        
        ' atualiza a configura+’o do CDOSYS para o envio do e-mail ----------------------------------'
        Set objCDOSYSMail.Configuration = objCDOSYSCon                                              '
    
        ' monta os cabecalhos do email --------------------------------------------------------------'    
        objCDOSYSMail.BodyPart.Charset = "iso-8859-1"
        objCDOSYSMail.From = EmailDe
        objCDOSYSMail.To   = EmailPara
        objCDOSYSMail.Cc   = EmailCCopia
        objCDOSYSMail.Bcc  = EmailCOculta
    
        ' verifica e monta os arquivos em anexo -----------------------------------------------------'
        if (EmailArquivo <>"") then objCDOSYSMail.AddAttachment ("file://" & EmailArquivo )
        if (EmailArquivo2<>"") then objCDOSYSMail.AddAttachment ("file://" & EmailArquivo2)
    
        ' verifica e monta o corpo do email a partir de um arquivo HTML -----------------------------'
        ' se for um site basta substituir por ("http://www.w3school.com/asp/asp_send_email.asp")     '
        if (EmailCreateBodyHTML<>"") then objCDOSYSMail.CreateMHTMLBody ("file://" & EmailCreateBodyHTML)
        
        ' coloca o assunto do email -----------------------------------------------------------------'
        objCDOSYSMail.Subject = EmailAssunto
    
        ' conteœdo da mensagem qdo for no padrao TEXTO -----------------------------------------------'
        if (EmailBody<>"") then objCDOSYSMail.TextBody = EmailBody
        
        ' para envio da mensagem no formato html altere o TextBody para HtmlBody ---------------------'
        if (EmailBodyHTML<>"") then objCDOSYSMail.HTMLBody = EmailBodyHTML
        
        ' para determinar a importacia do email enviado utilizar: ------------------------------------' 
        ' 0 (prioridade baixa)                                                                        '
        ' 1 (prioridade normal)                                                                       '
        ' 2 (prioridade alta)                                                                         '
        'objCDOSYSMail.Fields("urn:schemas:httpmail:importance").Value = 2;                           '
        objCDOSYSMail.Fields.Update()                                                                '
       
        ' enviar o email -----------------------------------------------------------------------------'
        objCDOSYSMail.Send
        
        ' destruir os objetos criados ----------------------------------------------------------------'
        Set objCDOSYSMail= nothing
        Set objCDOSYSCon = Nothing                                                                   '

   end function

   'function enviar_email2 (de_email,para_email,copia_email,oculta_email,arquivo_email,nmarquivo_email,assunto,texto)
   '   Set oMail           = Server.CreateObject ("CDONTS.NewMail")      
   '  'oMail.BodyFormat    = 1
   '  'oMail.MailFormat    = 1
   '   oMail.From          = de_email
   '   oMail.To            = para_email
   '   oMail.Cc            = copia_email
   '   oMail.Bcc           = oculta_email
   '   oMail.AttachFile    arquivo_email, nmarquivo_email
   '   oMail.Subject       = assunto
   '   oMail.Body          = texto
   '   oMail.Importance    = 2    
   '   oMail.Send
   '   Set oMail           = nothing
   'end function

   function enviar_email3 (EmailDe,EmailPara,EmailCCopia,EmailCOculta,EmailArquivo,EmailArquivo2,EmailArquivo3,EmailAssunto,EmailBody,EmailBodyHTML,EmailCreateBodyHTML,EmailArquivo4)

        ' cria o objeto para o envio de e-mail ------------------------------------------------------'
        Set objCDOSYSMail= Server.CreateObject ("CDO.Message")
        
        ' cria o objeto para configura+’o do SMTP ---------------------------------------------------'
        Set objCDOSYSCon = Server.CreateObject ("CDO.Configuration")                                '
        
        ' SMTP --------------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "smtp.as.asiashipping.com.br" '
        
        ' porta do SMTP -----------------------------------------------------------------------------' 
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25   '
        
        ' porta do CDO ------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2         '
        
        ' timeout -----------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout") = 30 '
        
        ' atualizar os campos configurados ----------------------------------------------------------' 
        objCDOSYSCon.Fields.update                                                                  '
        
        ' atualiza a configura+’o do CDOSYS para o envio do e-mail ----------------------------------'
        Set objCDOSYSMail.Configuration = objCDOSYSCon                                              '
    
        ' monta os cabecalhos do email --------------------------------------------------------------'    
        objCDOSYSMail.BodyPart.Charset = "iso-8859-1"
        objCDOSYSMail.From = EmailDe
        objCDOSYSMail.To   = EmailPara
        objCDOSYSMail.Cc   = EmailCCopia
        objCDOSYSMail.Bcc  = EmailCOculta

        ' verifica e monta os arquivos em anexo -----------------------------------------------------'
        if (EmailArquivo <>"") then objCDOSYSMail.AddAttachment ("file://"+EmailArquivo )
        if (EmailArquivo2<>"") then objCDOSYSMail.AddAttachment ("file://"+EmailArquivo2)
        if (EmailArquivo4<>"") then objCDOSYSMail.AddAttachment ("file://"+EmailArquivo4)

        ' O sistema vai saber qtos bls tera que enviar ----------------------------------------------'
        ' Desde que o EmailArquivo3 esteja diferente de branco.
        if (EmailArquivo3<>"") then
            iPageTotal = oSessionId.Call("get_f_GetSessionId", VrSessionId, "TOTALBLS")
            if (iPageTotal<>"") then 
                iPageTotal = Cint(iPageTotal)
                    
                ' Para cada pagina o sistema ira carregar os arquivos ---------------------------------------'
                For iPage=1 To iPageTotal  
                        EmailArquivo3 = oSessionId.Call("get_f_GetSessionId", VrSessionId, iPage)
                    if (EmailArquivo3<>"") then objCDOSYSMail.AddAttachment ("file://"+EmailArquivo3)            
                Next
            end if 
        end if 
            
        ' verifica e monta o corpo do email a partir de um arquivo HTML -----------------------------'
        ' se for um site basta substituir por ("http://www.w3school.com/asp/asp_send_email.asp")     '
        if (EmailCreateBodyHTML<>"") then objCDOSYSMail.CreateMHTMLBody ("file://"+EmailCreateBodyHTML)
        
        ' coloca o assunto do email -----------------------------------------------------------------'
        objCDOSYSMail.Subject = EmailAssunto
    
        ' conteœdo da mensagem qdo for no padrao TEXTO -----------------------------------------------'
        if (EmailBody<>"") then objCDOSYSMail.TextBody = EmailBody
        
        ' para envio da mensagem no formato html altere o TextBody para HtmlBody ---------------------'
        if (EmailBodyHTML<>"") then objCDOSYSMail.HTMLBody = EmailBodyHTML
        
        ' para determinar a importacia do email enviado utilizar: ------------------------------------' 
        ' 0 (prioridade baixa)                                                                        '
        ' 1 (prioridade normal)                                                                       '
        ' 2 (prioridade alta)                                                                         '
        'objCDOSYSMail.Fields("urn:schemas:httpmail:importance").Value = 2;                           '
        'objCDOSYSMail.Fields.Update()                                                                '
       
        ' enviar o email -----------------------------------------------------------------------------'
        objCDOSYSMail.Send
        
        ' destruir os objetos criados ----------------------------------------------------------------'
        Set objCDOSYSMail= nothing
        'Set objCDOSYSCon = Nothing                                                                   '

   end function

   function enviar_email4 (EmailDe,EmailPara,EmailCCopia,EmailCOculta,EmailArquivo,EmailArquivo2,EmailAssunto,EmailBody,EmailBodyHTML,EmailCreateBodyHTML)

        ' cria o objeto para o envio de e-mail ------------------------------------------------------'
        Set objCDOSYSMail= Server.CreateObject ("CDO.Message")
        
        ' cria o objeto para configura+’o do SMTP ---------------------------------------------------'
        Set objCDOSYSCon = Server.CreateObject ("CDO.Configuration")                                '
        
        ' SMTP --------------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "smtp.as.asiashipping.com.br" '
        
        ' porta do SMTP -----------------------------------------------------------------------------' 
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25   '
        
        ' porta do CDO ------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2         '
        
        ' timeout -----------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout") = 30 '
        
        ' atualizar os campos configurados ----------------------------------------------------------' 
        objCDOSYSCon.Fields.update                                                                  '
        
        ' atualiza a configura+’o do CDOSYS para o envio do e-mail ----------------------------------'
        Set objCDOSYSMail.Configuration = objCDOSYSCon                                              '
    
        ' monta os cabecalhos do email --------------------------------------------------------------'    
        objCDOSYSMail.BodyPart.Charset = "iso-8859-1"
        objCDOSYSMail.From = EmailDe
        objCDOSYSMail.To   = EmailPara
        objCDOSYSMail.Cc   = EmailCCopia
        objCDOSYSMail.Bcc  = EmailCOculta
        
        ' verifica e monta os arquivos em anexo -----------------------------------------------------'
        if (EmailArquivo <>"") then objCDOSYSMail.AddAttachment ("file://" & EmailArquivo )

        ' O sistema vai saber qtos bls tera que enviar ----------------------------------------------'
        ' Desde que o EmailArquivo2 esteja diferente de branco.
        if (EmailArquivo2<>"") then
            aCaminhoUpload=oSessionId.Call ("Get_PegaPastaServerUsuario", UserName, "")    
            iPageTotal = oSessionId.Call("get_f_GetSessionId", VrSessionId, "TOTALFILES")
            if (iPageTotal<>"") then 
                iPageTotal = Cint(iPageTotal)
                    
                ' Para cada pagina o sistema ira carregar os arquivos ---------------------------------------'
                For iPage=1 To iPageTotal  
                        EmailArquivo2 = oSessionId.Call("get_f_GetSessionId", VrSessionId, ("FILE_" & iPage) )
                    if (EmailArquivo2<>"") then objCDOSYSMail.AddAttachment ("file://" & aCaminhoUpload & EmailArquivo2)            
                Next
            end if 
        end if 
    
        ' verifica e monta o corpo do email a partir de um arquivo HTML -----------------------------'
        ' se for um site basta substituir por ("http://www.w3school.com/asp/asp_send_email.asp")     '
        if (EmailCreateBodyHTML<>"") then objCDOSYSMail.CreateMHTMLBody ("file://" & EmailCreateBodyHTML)
        
        ' coloca o assunto do email -----------------------------------------------------------------'
        objCDOSYSMail.Subject = EmailAssunto
    
        ' conteœdo da mensagem qdo for no padrao TEXTO -----------------------------------------------'
        if (EmailBody<>"") then objCDOSYSMail.TextBody = EmailBody
        
        ' para envio da mensagem no formato html altere o TextBody para HtmlBody ---------------------'
        if (EmailBodyHTML<>"") then objCDOSYSMail.HTMLBody = EmailBodyHTML
        
        ' para determinar a importacia do email enviado utilizar: ------------------------------------' 
        ' 0 (prioridade baixa)                                                                        '
        ' 1 (prioridade normal)                                                                       '
        ' 2 (prioridade alta)                                                                         '
        objCDOSYSMail.Fields("urn:schemas:httpmail:importance").Value = 2                             '
        objCDOSYSMail.Fields.Update()                                                                 '
       
        ' enviar o email -----------------------------------------------------------------------------'
        objCDOSYSMail.Send
        
        ' destruir os objetos criados ----------------------------------------------------------------'
        Set objCDOSYSMail= nothing
        'Set objCDOSYSCon = Nothing                                                                   '

   end function

   function enviar_email5 (EmailDe,EmailPara,EmailCCopia,EmailCOculta,EmailArquivo,EmailArquivo2,EmailAssunto,EmailBody,EmailBodyHTML,EmailCreateBodyHTML)
    ' create the e-mail
    set o_msg = createobject("cdo.message")
    set o_conf = createobject("cdo.configuration")

    With o_conf.Fields
        .Item("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2
        .Item("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "smtp.as.asiashipping.com.br"
        .Item("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") =  0
        '.Item("http://schemas.microsoft.com/cdo/configuration/sendusername") = "as\anderson.as "
        '.Item("http://schemas.microsoft.com/cdo/configuration/sendpassword") = "kkch7325!"
        .Item("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25 
        .Item("http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout") = 30
        .Update
    End With

    With o_msg
        set .Configuration = o_conf
        .BodyPart.Charset = "iso-8859-1"
        .AutoGenerateTextBody = true
        .Fields("urn:schemas:httpmail:importance").Value = 2
        .Fields.Update()
        .To = EmailPara
        .From = EmailDe
        .Cc = EmailCCopia
        .Bcc = EmailCOculta
        .Subject = EmailAssunto
        if (EmailBody<>"" and EmailCreateBodyHTML="" and EmailBodyHTML="") then .TextBody = EmailBody
        if (EmailBody=""  and EmailCreateBodyHTML="" and EmailBodyHTML<>"") then .HTMLBody = EmailBodyHTML end if
        if (EmailBody=""  and EmailCreateBodyHTML<>"" and EmailBodyHTML="") then .CreateMHTMLBody (EmailCreateBodyHTML) end if
        ' verifica e monta os arquivos em anexo -----------------------------------------------------'
        if (EmailArquivo <>"") then .AddAttachment (EmailArquivo ) end if
        ' O sistema vai saber qtos bls tera que enviar ----------------------------------------------'
        ' Desde que o EmailArquivo2 esteja diferente de branco.
        if (EmailArquivo2<>"") then
            aCaminhoUpload=oSessionId.Call ("Get_PegaPastaServerUsuario", UserName, "")    
            iPageTotal = oSessionId.Call("get_f_GetSessionId", VrSessionId, "TOTALFILES")
            if (iPageTotal<>"") then 
                iPageTotal = Cint(iPageTotal)
                ' Para cada pagina o sistema ira carregar os arquivos ---------------------------------------'
                For iPage=1 To iPageTotal  
                        EmailArquivo2 = oSessionId.Call("get_f_GetSessionId", VrSessionId, ("FILE_" & iPage) )
                    if (EmailArquivo2<>"") then .AddAttachment (aCaminhoUpload & EmailArquivo2)            
                Next
            end if 
        end if 
        .Send
    End With

    set o_msg = nothing
    set o_conf = nothing

   End Function
    
    
    Function enviar_email6 (EmailDe,EmailPara,EmailCCopia,EmailCOculta,EmailArquivo,EmailArquivo2,EmailAssunto,EmailBody,EmailBodyHTML,EmailCreateBodyHTML)

        ' cria o objeto para o envio de e-mail ------------------------------------------------------'
        Set objCDOSYSMail= Server.CreateObject ("CDO.Message")
        
        ' cria o objeto para configura+’o do SMTP ---------------------------------------------------'
        Set objCDOSYSCon = Server.CreateObject ("CDO.Configuration")                                '
        
        ' SMTP --------------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "smtp.as.asiashipping.com.br" '
        
        ' porta do SMTP -----------------------------------------------------------------------------' 
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25   '
        
        ' porta do CDO ------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2         '
        
        ' timeout -----------------------------------------------------------------------------------'
        objCDOSYSCon.Fields("http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout") = 30 '
        
        ' atualizar os campos configurados ----------------------------------------------------------' 
        objCDOSYSCon.Fields.update                                                                  '
        
        ' atualiza a configura+’o do CDOSYS para o envio do e-mail ----------------------------------'
        Set objCDOSYSMail.Configuration = objCDOSYSCon                                              '
    
        ' monta os cabecalhos do email --------------------------------------------------------------'    
        objCDOSYSMail.BodyPart.Charset = "iso-8859-1"
        objCDOSYSMail.from = EmailDe
        objCDOSYSMail.to   = EmailPara
        objCDOSYSMail.Cc   = EmailCCopia
        objCDOSYSMail.Bcc  = EmailCOculta
    
        ' verifica e monta os arquivos em anexo -----------------------------------------------------'
        If (EmailArquivo <>"") then objCDOSYSMail.AddAttachment ("file://"+EmailArquivo )
        If (EmailArquivo2<>"") then objCDOSYSMail.AddAttachment ("file://"+EmailArquivo2)
    
        ' verifica e monta o corpo do email a partir de um arquivo HTML -----------------------------'
        ' se for um site basta substituir por ("http://www.w3school.com/asp/asp_send_email.asp")     '
        If (EmailCreateBodyHTML<>"") then objCDOSYSMail.CreateMHTMLBody ("file://"+EmailCreateBodyHTML)
        
        ' coloca o assunto do email -----------------------------------------------------------------'
        objCDOSYSMail.Subject = EmailAssunto
    
        ' conteœdo da mensagem qdo for no padrao TEXTO -----------------------------------------------'
        If (EmailBody<>"") then objCDOSYSMail.TextBody = EmailBody
        
        ' para envio da mensagem no formato html altere o TextBody para HtmlBody ---------------------'
        If (EmailBodyHTML<>"") then objCDOSYSMail.HTMLBody = EmailBodyHTML
        
        ' para determinar a importacia do email enviado utilizar: ------------------------------------' 
        ' 0 (prioridade baixa)                                                                        '
        ' 1 (prioridade normal)                                                                       '
        ' 2 (prioridade alta)                                                                         '
        'objCDOSYSMail.Fields("urn:schemas:httpmail:importance").Value = 2;                           '
        
        objCDOSYSMail.fields("urn:schemas:mailheader:disposition-notification-to") = EmailDe
        objCDOSYSMail.fields("urn:schemas:mailheader:return-receipt-to") = EmailDe 
        objCDOSYSMail.DSNOptions = 14
        
        objCDOSYSMail.Fields.Update()                                                                '
       
        ' enviar o email -----------------------------------------------------------------------------'
        objCDOSYSMail.Send
        
        ' destruir os objetos criados ----------------------------------------------------------------'
        Set objCDOSYSMail= Nothing
        Set objCDOSYSCon = Nothing                                                                   '

   End Function

%>
