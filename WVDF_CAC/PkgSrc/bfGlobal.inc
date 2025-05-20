//-2WA
Use btGlobal.pkg
Use EditaCpfCnpj.Pkg    

//------------------------------------------------------------------------
// Biblioteca fgRetErroDescricao Global: Retorna Descricao Do Erro usado
//                                       em dicionario de dados
//------------------------------------------------------------------------
     Function fgRetErroDescricao Global Number aNumeroErro String sTabela Returns String
             Clear    CSAG317
             Move sTabela                                to CSAG317.TABELA
             Move aNumeroErro                            to CSAG317.CODIGO
             Move (piUsuarioIdioma(oPAG800_01(Self)))    to CSAG317.IDIOMA
             Find Eq  CSAG317 by 1
                 If not (Found)  Function_Return "Erro Nao Cadastrado"

             Function_Return (Trim(CSAG317.Descricao))
     End_Function // fgRetErroDescricao
     
//------------------------------------------------------------------------
// Biblioteca fgRetConversion_measures Global: Retorna a Conversao 
//                                             de Valores.
//------------------------------------------------------------------------
     Function fgRetConversion_measures Global Number aValue String aMeasure Returns Number
        
        Number nReturn
        Move (Uppercase(aMeasure)) to aMeasure
                
        Case Begin
            Case (aMeasure = 'CM')
                Move (aValue / 2.54) to nReturn
            Case Break
            Case (aMeasure = 'INCH')
                Move (aValue * 2.54) to nReturn
            Case Break
            Case (aMeasure = 'KG')
                Move (aValue / 0.45359237) to nReturn
            Case Break
            Case (aMeasure = 'LBS')
                Move (aValue * 0.45359237) to nReturn
            Case Break
        Case End
        
        Move (ROUNDALL(nReturn,4)) to nReturn

        Function_Return nReturn
     
    End_Function // fgRetConversion_measures

//------------------------------------------------------------------------
// Biblioteca fgRetCalc_measures Global: Recebe as dimensoes e de acordo
//                                       com o tipo apura o volume em CBM
//                                       ou CFT.
//------------------------------------------------------------------------
    Function fgRetCalc_measures Global Number aValue1 Number aValue2 Number aValue3 String aMeasure Returns Number
        
        Number nReturn
        Move (Uppercase(aMeasure)) to aMeasure        
        Case Begin
            Case (aMeasure = 'CBM')
                Move ((aValue1 * aValue2 * aValue3) * 1) to nReturn
            Case Break //Case (aMeasure = 'CBM')
            Case (aMeasure = 'CFT')
                Move (((aValue1/12) * (aValue2/12) * (aValue3/12)) * 1) to nReturn
            Case Break //Case (aMeasure = 'CFT')
        Case End
        
        Move (ROUNDALL(nReturn,4)) to nReturn
                
    Function_Return nReturn
     
    End_Function // fgRetCalc_measures

//------------------------------------------------------------------------
// Biblioteca fGetLabelLangofTable Global: Retorna o Idioma da label 
//                                         de um campo.
//------------------------------------------------------------------------
    Function fGetLabelLangofTable Global String sTableName String sTableFieldName String sIdioma Returns String
        
        Clear   CSAG310
        Move sTableName         to CSAG310.TABELA
        Move sTableFieldName    to CSAG310.CAMPO
        Move sIdioma            to CSAG310.IDIOMA
        Find Eq CSAG310   by 1
        Function_Return (Trim(CSAG310.APPEARANCE))
        
    End_Function // fGetLabelLangofTable

//------------------------------------------------------------------------
// Biblioteca IntSplitToArray Global: Splits a string into an array 
//                                     of Integer using the given delimiter.
//
// Params:
//     sString     The string to split.
//     sDel        The delimiter (like "," or "|")
// Returns:
//     Array of strings (not including the delimiters itself.
//------------------------------------------------------------------------
    Function IntSplitToArray Global String sString String sDel Returns Integer[]
        Integer[] asResult
        Integer iStart iEnd iDel
        
        If (sString <> "") Begin
            
            Move 1 to iStart
            
            Move (Length(sDel)) to iDel
            Move (Pos(sDel, sString, iStart)) to iEnd
            
            If (iEnd > 0) Begin
                While (iEnd > 0)
                    Move (Mid(sString,  iEnd - iStart, iStart)) to asResult[SizeOfArray(asResult)]
                    
                    Move (iEnd + iDel) to iStart
                    Move (Pos(sDel, sString, iStart)) to iEnd
                Loop
                
                Move (Right(sString,  Length(sString) - iStart + 1)) to asResult[SizeOfArray(asResult)]
            End
            Else Begin
                Move sString to asResult[0]
            End
        End
        
        
        Function_Return asResult
    End_Function //IntSplitToArray
    

//------------------------------------------------------------------------
// Biblioteca fregistraLOGMAIL Global: Recebe os parametros e registra
//                                     na tabela que controla os emails
//                                     que serao disparados via sistema.
//                                     Retrona uma msg no padrao JSON.
//------------------------------------------------------------------------
    Function fregistraLOGMAIL Global String sUsuarioNumero;
                                     String sFrom;
                                     String sReplayTo;
                                     String sTo;
                                     String sCC;
                                     String sBCC;
                                     String sSubjetc;
                                     String sMsg;
                                     String sAnexo;
                                     String sHtmlBody;
                                     String sIpAddress;
                                    Returns stDefaultMessage
        
             Handle hObj_logmail
            Boolean bError
             String sHtml
             String sReturn
             Number nAnexo
  stDefaultMessage stDefaultMsg
  
        Move (Trim(sFrom))      to sFrom
        Move (Trim(sReplayTo))  to sReplayTo
        Move (Trim(sTo))        to sTo
        Move (Trim(sCC))        to sCC
        Move (Trim(sBCC))       to sBCC
        Move (Trim(sSubjetc))   to sSubjetc
        Move (Trim(sMsg))       to sMsg
        Move (Trim(sAnexo))     to sAnexo
        Move (Trim(sHtmlBody))  to sHtmlBody
        
        Move (Replaces(',',sTo,';')) to sTo
        Move (Replaces(',',sCC,';')) to sCC
        Move (Replaces(',',sBCC,';')) to sBCC
        
        Get Create (RefClass(DataDictionary)) to hObj_logmail
        Set Main_File of hObj_logmail to LOGMAIL.File_Number 
        Send DefineAllExtendedFields of hObj_logmail
        
        Clear CSAG300
        Move sUsuarioNumero to CSAG300.USUARIONUMERO
        Find EQ CSAG300 by 3
        If (sFrom = '') Move (Trim(CSAG300.USUARIOEMAIL)) to sFrom
        If (sReplayTo = '' and sBCC <> '') Move sBCC to sReplayTo
        If (sReplayTo = '') Move (Trim(CSAG300.USUARIOEMAIL)) to sReplayTo

        Send Clear of hObj_logmail
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.from to sFrom
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.REPLAYTO to sReplayTo
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.to to sTo
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.CC to sCC
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.BCC to sBCC
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.SUBJECT to sSubjetc
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.MSG to sMsg
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.USUARIO_ID_C to sUsuarioNumero
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.DATE_TIME_C to (CurrentDateTime())
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.IP_USUARIO to sIpAddress
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.ID_ENVIADO to '0'
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.ANEXO to sAnexo
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.ID_ANEXO to nAnexo
        Set Field_Changed_Value of hObj_logmail Field LOGMAIL.HTML_BODY to sHtmlBody
        
        Get Request_Validate of hObj_logmail to bError
        If (not(bError)) Begin
            Send Request_Save of hObj_logmail
            Move (Err) to stDefaultMsg.hasError
            If (Err) Move 'Could not send Email. Please verify!' to stDefaultMsg.msgError
            Else Move 'Email sent with success!' to stDefaultMsg.msgInfo
        End
        Else Begin
            Move True to stDefaultMsg.hasError
            Move 'Could not send Email. Please verify!' to stDefaultMsg.msgError
        End
            
        Send Destroy of hObj_logmail
        Function_Return stDefaultMsg
        
    End_Function //fregistraLOGMAIL

//------------------------------------------------------------------------
// Biblioteca fCreateFolderToday Global: Recebe um diretorio e dentro
//                                       dele verifica se existe uma pasta
//                                       do ano corrente (se nao existir cria)
//                                       dentro o ano o mes e depois o dia. 
//------------------------------------------------------------------------
    Function fCreateFolderToday Global String sDiretorio Returns String  
        Boolean bFileExist
        String  sParametro     
        String  sHoje
        String  sDia
        String  sMes
        String  sAno
        
        Move (Get_Sysdate(False)) to sHoje  
        Move (Mid(sHoje,2,1))     to sDia   
        Move (Mid(sHoje,2,4))     to sMes 
        Move (Mid(sHoje,4,7))     to sAno  
        
        File_Exist sDiretorio bFileExist
        If (not(bFileExist)) Make_Directory sDiretorio
        File_Exist sDiretorio bFileExist
        If (not(bFileExist)) Begin
            Function_Return
        End //If (not(bFileExist)) Begin
    
        Move (sDiretorio+"\"+sAno) to sDiretorio
        File_Exist sDiretorio bFileExist
        If (not(bFileExist)) Make_Directory sDiretorio
        File_Exist sDiretorio bFileExist
        If (not(bFileExist)) Begin
            Function_Return
        End //If (not(bFileExist)) Begin
        
        Move (sDiretorio+"\"+sMes) to sDiretorio
        File_Exist sDiretorio bFileExist
        If (not(bFileExist)) Make_Directory sDiretorio
        File_Exist sDiretorio bFileExist
        If (not(bFileExist)) Begin
            Function_Return
        End //If (not(bFileExist)) Begin            
        
        Move (sDiretorio+"\"+sDia) to sDiretorio
        File_Exist sDiretorio bFileExist
        If (not(bFileExist)) Make_Directory sDiretorio
        File_Exist sDiretorio bFileExist
        If (not(bFileExist)) Begin
            Function_Return
        End //If (not(bFileExist)) Begin  
        
        //DEVOLVER O DIRETORIO PRONTO
        Move (sDiretorio+"\") to sDiretorio
        
        Function_Return sDiretorio    
    End_Function //fCreateFolderToday
    
//------------------------------------------------------------------------
// Biblioteca fRemoveCharEmail Global: Recebe um email
//                                     e remove caracteres que nao
//                                     pertencam ao email
//------------------------------------------------------------------------
    Function fRemoveCharEmail Global String sEmail Returns String     
        
        Move (Replaces("~",sEmail,"")) to sEmail
        Move (Replaces("/",sEmail,"")) to sEmail 
        Move (Replaces("\",sEmail,"")) to sEmail 
        Move (Replaces("|",sEmail,"")) to sEmail   
        Move (Replaces(":",sEmail,"")) to sEmail  
        Move (Replaces("?",sEmail,"")) to sEmail  
        Move (Replaces("^",sEmail,"")) to sEmail  
        Move (Replaces("ï",sEmail,"")) to sEmail 
        Move (Replaces("`",sEmail,"")) to sEmail    
        Move (Replaces(" ",sEmail,"")) to sEmail
        
        Function_Return sEmail
    End_Function //fRemoveCharEmail
        
//------------------------------------------------------------------------
// Biblioteca doUppLTrim Global: Recebe uma string e aplica Rtrim,
//                               Ltrim e Uppercase e devolve a string
//------------------------------------------------------------------------
    Function doUppLTrim Global String sCAMPO Returns String
        Move (Rtrim(sCAMPO)) to sCAMPO
        Move (Ltrim(sCAMPO)) to sCAMPO
        Move (Uppercase(sCAMPO)) to sCAMPO
        Function_Return sCAMPO
    End_Function //doUppLTrim

//------------------------------------------------------------------------
// Biblioteca doNumber Global: recebe um valor como string 
//                             e devolve como numero
//------------------------------------------------------------------------
    Function doNumber Global String sValue Returns Number
        Integer iTypeThousandsSeparator
        Integer iTypeDecimalSeparator
        
        //-- PADRONIZANDO OS DADOS NUMERICOS
        Get_Attribute DF_THOUSANDS_SEPARATOR  to iTypeThousandsSeparator  
        Get_Attribute DF_DECIMAL_SEPARATOR    to iTypeDecimalSeparator    

        If (Pos(Character(iTypeDecimalSeparator), sValue)) 
        Else If (Pos('.', sValue)) Begin
                Move (Replace('.', sValue, Character(iTypeDecimalSeparator))) to sValue
             End
        Else If (Pos(',', sValue)) Begin
                Move (Replace(',', sValue, Character(iTypeDecimalSeparator))) to sValue
        End
        Function_Return sValue
    End_Function //doNumber

//------------------------------------------------------------------------
// Biblioteca fGetNewDate Global: Retorna a data de inicio 
//                                ou final do mˆs informado
//------------------------------------------------------------------------
    Function fGetNewDate Global Date dData Boolean bFinaldoMes Returns Date
        Integer iMes 
        Integer iAno 
        Integer iDate_Tp
        Date    dNewDate
        
        Get_Attribute DF_DATE_FORMAT to iDate_Tp
        Set_Attribute DF_DATE_FORMAT to DF_DATE_USA //-- mm/dd/yyyy
        
        Move (Mid(dData, 2, 1)) to iMes
        Move (Mid(dData, 4, 7)) to iAno
        If (bFinaldoMes) Begin
            Add 1 to iMes
            If (iMes > 12) Begin
               Move 1 to iMes 
               Add  1 to iAno 
            End
            Move (If(iMes<10, '0', '')+String(iMes)+'/01/'+String(iAno)) to dNewDate
            Subtract 1 from dNewDate
        End
        Else Begin
            Move (If(iMes<10, '0', '')+String(iMes)+'/01/'+String(iAno)) to dNewDate
        End

        Set_Attribute DF_DATE_FORMAT to iDate_Tp

        Function_Return dNewDate            
    End_Function //fGetNewDate        

//------------------------------------------------------------------------
// Biblioteca RemoveAcentos Global: Recebe uma string e devolve a mesma 
//                                  trocanto todos os caracteres 
//                                  acentuados pelo correspondente sem 
//                                  acento.
//------------------------------------------------------------------------
Function RemoveAcentos Global String sValue$ Returns String
    Integer iPos iAscii
    String sLetra sRetorno
    
    Move (ToAnsi(sValue$)) to sValue$
    Move "" to sRetorno
    
    For iPos from 1 to (Length(sValue$))
        Move (Mid(sValue$,1,iPos)) to sLetra
        Move (Ascii(sLetra)) to iAscii
        
        If ((iAscii>=224) and (iAscii<=228)) Move 97 to iAscii
        Else If ((iAscii>=192) and (iAscii<=196)) Move 65 to iAscii
        Else If ((iAscii>=232) and (iAscii<=235)) Move 101 to iAscii
        Else If ((iAscii>=200) and (iAscii<=203)) Move 69 to iAscii
        Else If ((iAscii>=236) and (iAscii<=239)) Move 105 to iAscii
        Else If ((iAscii>=204) and (iAscii<=207)) Move 73 to iAscii
        Else If ((iAscii>=242) and (iAscii<=246)) Move 111 to iAscii
        Else If ((iAscii>=210) and (iAscii<=214)) Move 79 to iAscii
        Else If ((iAscii>=249) and (iAscii<=252)) Move 117 to iAscii
        Else If ((iAscii>=217) and (iAscii<=220)) Move 85 to iAscii
        Else If (iAscii=231) Move 99 to iAscii
        Else If (iAscii=199) Move 67 to iAscii
        Else If (iAscii=241) Move 110 to iAscii
        Else If (iAscii=209) Move 78 to iAscii
        
        Move (Character(iAscii)) to sLetra
        Move (Append(sRetorno,sLetra)) to sRetorno
    Loop

    Function_Return (ToOEM(sRetorno))
End_Function // RemoveAcentos

//---------------------------------------------------------------------------------------
// Biblioteca NFeRemoveCaracteresEspeciais Global: Recebe uma string e devolve a mesma 
//                                                 trocanto todos os caracteres especiais
//                                                 pelo correspondente em HTML.
//---------------------------------------------------------------------------------------
Function NFeRemoveCaracteresEspeciais Global String sTexto Returns String
    Move (Trim(RemoveAcentos(sTexto))) to sTexto  
    Move (Replaces(Character(166),sTexto,".o"))               to sTexto // 
    Move (Replaces(Character(167),sTexto,".o"))               to sTexto // o
    Move (Replaces(Character(248),sTexto,".a"))               to sTexto // Ý
    Move (Replaces(Character(245),sTexto,""))                 to sTexto // o
    Move (Replaces(Character(38),sTexto ,"&amp;"))            to sTexto // &
    Move (Replaces(Character(60),sTexto ,"&lt;"))             to sTexto // <
    Move (Replaces(Character(62),sTexto ,"&gt;"))             to sTexto // >
    Move (Replaces(Character(34),sTexto ,"&quot;"))           to sTexto // "
    Move (Replaces(Character(39),sTexto ,"&#39;"))            to sTexto // '
    Move (Replaces(Character(13)+Character(10),sTexto," / ")) to sTexto // Quebra de Linha
    Move (Replaces(Character(9),sTexto," "))                  to sTexto // TAB
    Move (Replaces(Character(239),sTexto,"&#39"))             to sTexto // ‹
    Move (Replaces(Character(96),sTexto,"&#39"))              to sTexto // `

    Function_Return sTexto
End_Function // NFeRemoveCaracteresEspeciais

// Generates a string of 40 random characters between ASCII 33 & ASCII 126
// This should produce a unique string suitable for a 16 character encryption key.
// Excludes the ;"' characters
// Used by WebApps to give the psEncryptPassword property a unique value.
Function GenerateEncryptString Global Returns String
    Integer i iASCII
    String sChar sKey
    
    For i from 0 to 39
        Move (Random(93)) to iASCII
        Move (iASCII + 34) to iASCII
        
        If (iASCII = 34 or iASCII = 39 or iASCII = 59) Begin
            Increment iASCII
        End
        
        Move (Character(iASCII)) to sChar
        Move (sKey + sChar) to sKey
    Loop
    
    Function_Return sKey
End_Function //GenerateEncryptString

Procedure InitPassword
    // Note to the developer: For security purposes each installation of the WebOrder workspace must
    // contain a unique value for the framework's encryption key. This value is stored in the cWebApp
    // object's psEncryptPassword property.
    //
    // To ensure each running installation of WebOrder is different we have modified the Web App's OnLoad
    // event to generate a random psEncryptPassword value the first time that the web app is run. This 
    // value is then used and is stored in the OrdSys system table so that it does not get re-generated
    // in subsequent instances of this web application.
    //
    // Since WebOrder is installed and run automatically when you install DataFlex we are required to 
    // ensure that the encryption password cannot be guessed. Normally you would not need, or want, 
    // to Use this technique in your own web applications. Instead you would manually set psEncryptPassword
    // to a trusted, unique value for each web application that you deploy.
    
    Handle hObj
    Boolean bErro
    String  encryptPassword
    // Test if an encryption password has already been generated.
    If (Trim(TSMG800.ENCRYPTPASSWORD) = "") Begin
        Get Create (RefClass(DataDictionary)) to hObj
        Set Main_File of hObj to TSMG800.File_Number
        Send Request_Assign of hObj TSMG800.File_Number
        //Reread TSMG800
        // Just in case another instance wrote to OrdSys.EncryptPassword in the millisecond
        // between the above two lines of code we will test this value again
        If (Trim(TSMG800.ENCRYPTPASSWORD) = "") Begin
            Get GenerateEncryptString to encryptPassword
            Set Field_Changed_Value of hObj Field TSMG800.ENCRYPTPASSWORD to encryptPassword
            Get Request_Validate of hObj to bErro
            If (not(bErro)) Begin
                Send Request_Save of hObj
                Send Refind_Records of hObj
            End
            //SaveRecord TSMG800
        End
        //Unlock
        Send Destroy of hObj
    End

    #IFDEF Is$WebApp
    String sPath
    Move (Rtrim(TSMG800.COPY_FOTOS)) to sPath 
    Send RegisterDownloadFolder of ghoWebResourceManager (sPath+"Download")
    Send RegisterUploadFolder   of ghoWebResourceManager (sPath+"Upload")
    
    Set psEncryptPassword of ghoWebApp to (Trim(TSMG800.ENCRYPTPASSWORD))
    #ENDIF
End_Procedure //InitPassword



//------------------------------------------------------------------------
// Biblioteca onLogMail Global: Guardar LOG dos e-mail disparados.
//                                 
//                                   
// ANDERSON RODRIGUES - 2021.04.08
//------------------------------------------------------------------------

Procedure onLogMail Global stLogMail tDados String aUsuarioSessao
    Boolean bErr
    Handle  hoLogMail
    DateTime dtUsuario
    //-
    Clear CSAG311
    Move aUsuarioSessao to CSAG311.USUARIOSESSAO
    Find Eq CSAG311 by 1
    If (not(Found)) Procedure_Return
    //-
    Get Create (RefClass(DataDictionary)) to hoLogMail
    Set Main_File of hoLogMail to LOGMAIL.File_Number
    //-
    Move (CurrentDateTime()) to dtUsuario
    //-
    Send Clear of hoLogMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.from          to tDados.fromMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.REPLAYTO      to tDados.replaytoMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.to            to tDados.toMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.CC            to tDados.ccMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.BCC           to tDados.bccMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.SUBJECT       to tDados.subjectMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.MSG           to tDados.msgMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.IP_USUARIO    to tDados.ipusuarioMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.ID_ENVIADO    to tDados.idenviadoMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.DT_HR_ENVIADO to tDados.dthrenviadoMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.ANEXO         to tDados.anexoMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.ID_ANEXO      to tDados.idanexoMail
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.HTML_BODY     to tDados.htmlbodyMaIL
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.USUARIO_ID_C  to CSAG311.USUARIONUMERO
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.DATE_TIME_C   to dtUsuario
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.USUARIO_ID_A  to CSAG311.USUARIONUMERO
    Set Field_Changed_Value of hoLogMail Field LOGMAIL.DATE_TIME_A   to dtUsuario
    //-
    Get Request_Validate of hoLogMail to bErr
    If (not(bErr)) Send Request_Save of hoLogMail
    //-
    Send Destroy of hoLogMail
End_Procedure


//------------------------------------------------------------------------
// Biblioteca fSanitizarTexto Global: Recebe um texto e procura remover  
//                                    caracteres indesejaveis.
//                                   
// ANDERSON RODRIGUES - 2021.04.08
//------------------------------------------------------------------------
Function fSanitizarTexto Global String sParameter Returns String
    //SANITIZACAO
    Boolean bOk
    Integer iAsc
    Integer iIndex
    String sReturn
    
    Move (Trim(sParameter)) to sParameter
    
    For iIndex from 1 to (Length(sParameter))
        Move (Ascii(Mid(sParameter, 1, iIndex))) to iAsc
        Move False to bOk
        
        Case Begin
            Case (iAsc = 128) //€
                Move 67 to iAsc
                Move True to bOk
                Case Break
            Case (iAsc = 135) //‡
                Move 99 to iAsc
                Move True to bOk
                Case Break
            Case ((iAsc >= 131 and iAsc <= 134) or iAsc = 160 or iAsc = 198) //  … ƒ † „ a
                Move 97 to iAsc
                Move True to bOk
                Case Break
            Case ((iAsc >= 181 and iAsc <= 183) or iAsc = 142 or iAsc = 143 or iAsc = 199) //Ž  A A A A
                Move 65 to iAsc
                Move True to bOk
                Case Break
            Case ((iAsc >= 147 and iAsc <= 149) or iAsc = 162 or iAsc = 228) //¢ “ • ” o
                Move 111 to iAsc
                Move True to bOk
                Case Break
            Case ((iAsc >= 226 and iAsc <= 229) or iAsc = 224 or iAsc = 153) //™ O O O O
                Move 79 to iAsc
                Move True to bOk
                Case Break
            Case ((iAsc >= 150 and iAsc <= 151) or iAsc = 129 or iAsc = 163) //£ – — 
                Move 117 to iAsc
                Move True to bOk
                Case Break
            Case ((iAsc >= 233 and iAsc <= 235) or iAsc = 154) //š U U U
                Move 85 to iAsc
                Move True to bOk
                Case Break
            Case ((iAsc >= 136 and iAsc <= 138) or iAsc = 130) //‚ ˆ ‰ Š
                Move 101 to iAsc
                Move True to bOk
                Case Break
            Case ((iAsc >= 210 and iAsc <= 212) or iAsc = 144) // E E E
                Move 69 to iAsc
                Move True to bOk
                Case Break
            Case ((iAsc >= 139 and iAsc <= 141) or iAsc = 161) //¡ Œ  ‹
                Move 105 to iAsc
                Move True to bOk
                Case Break
            Case ((iAsc >= 214 and iAsc <= 216) or iAsc = 222) //I I I I
                Move 73 to iAsc
                Move True to bOk
                Case Break
            Case (iAsc >= 32 and iAsc <= 126)  //numerais e carcateres validos
                Move True to bOk
                Case Break
        Case End
        
        If (bOk) Add (Character(iAsc)) to sReturn
    Loop
    
    Function_Return sReturn

End_Function //fSanitizarTexto

//------------------------------------------------------------------------
// Biblioteca fIsNumber Global: Confirma True/False se o valor e um  
//                              numero.
//                                   
// ANDERSON RODRIGUES - 2021.04.29
//------------------------------------------------------------------------
Function fIsNumber Global String sParameter Returns Boolean
    Boolean bOk
    Integer iAsc
    Integer iIndex
    
    Move (Trim(sParameter)) to sParameter
    
    For iIndex from 1 to (Length(sParameter))
        Move (Ascii(Mid(sParameter, 1, iIndex))) to iAsc
        Move False to bOk
        
        Case Begin
            Case (iAsc >= 44 and iAsc <= 46)  // , - . (comma, minus, dot)
                Move True to bOk
                Case Break
            Case (iAsc >= 48 and iAsc <= 57)  //numerais
                Move True to bOk
                Case Break
            Case Else
                Move False to bOk
                Case Break
        Case End
        
        If (not(bOk)) Function_Return False
    Loop
    
    Function_Return True

End_Function //fIsNumber

//------------------------------------------------------------------------
// Biblioteca fFindElement Global: Procura por um valor dentro de um 
//                                 array.
//                                   
// ANDERSON RODRIGUES - 2021.05.26
//------------------------------------------------------------------------
Function fFindElement Global String[] aStrArray String sElemtStr Returns Integer
    Integer ndx 
    Integer retVal 
    Integer arrMax
    Integer elementStr
    String  arrVal
    
    Move (SizeOfArray(aStrArray))   to arrMax
    Move -1                         to retVal
    Move 0                          to ndx
    Move (Integer(sElemtStr))       to elementStr
    
    While (ndx < arrMax and retVal = -1)
        //If (elementStr = ndx) Move ndx to retVal
        Move aStrArray[ndx] to arrVal
        If (arrVal <> "") Move ndx to retVal
        Add 1 to ndx
    End
    Function_Return retVal
End_Function //fFindElement

//------------------------------------------------------------------------
// Biblioteca fMinutes2Hours Global: Recebe o total em minutos e converte 
//                                   para horas trabalhando com
//                                   0.25, 0.50, 0.75 e 1.00
//
// ANDERSON RODRIGUES - 2025.01.24
//------------------------------------------------------------------------
Function fMinutes2Hours Global String sTempoApurado Returns Number
    Number nHours
    String[] aTempoApurado
    Number nDd
    Number nHr
    Number nMn
    
    Move (ResizeArray(aTempoApurado,0)) to aTempoApurado
    
    Move (StrSplitToArray(sTempoApurado,':')) to aTempoApurado
    
    Move (aTempoApurado[0]) to nDd
    Move (aTempoApurado[1]) to nHr
    Move (aTempoApurado[2]) to nMn
    
    Move (nDd * 24) to nHours
    Add  nHr        to nHours
    
    Case Begin
        Case (nMn >= 59)
            Add 1 to nHours
            Case Break
        Case (nMn >= 45 and nMn < 59)
            Add 0.75 to nHours
            Case Break
        Case (nMn >= 30 and nMn < 45)
            Add 0.50 to nHours
            Case Break
        Case (nMn >= 15 and nMn < 30)
            Add 0.25 to nHours
            Case Break
    Case End

    Function_Return nHours
End_Function //fMinutes2Hours

  