<%
    aCaminhoUpload = oSessionId.Call ("Get_PegaPastaServerUsuario", UserName, "")
    
    Server.ScriptTimeout = 50000
    ForWriting = 2
    lngNumberUploaded = 0
	
    noBytes = Request.TotalBytes  
    binData = Request.BinaryRead(noBytes)

    Set RST = CreateObject("ADODB.Recordset")
    LenBinary = LenB(binData)
    
    If LenBinary > 0 Then
      RST.Fields.Append "myBinary", 201, LenBinary
      RST.Open
      RST.AddNew
      RST("myBinary").AppendChunk BinData
      RST.Update
      strDataWhole = RST("myBinary")
    End if

    teste = strDataWhole
    
    strBoundry       = "multipart/form-data"
    lngBoundryPos    = instr(1,strBoundry,"boundary=") + 8 
    strBoundry       = "--" & right(strBoundry,len(strBoundry)-lngBoundryPos)

    lngCurrentBegin  = instr(1,strDataWhole,strBoundry)
    lngCurrentEnd    = instr(lngCurrentBegin + 1,strDataWhole,strBoundry) - 1

    Do While lngCurrentEnd > 0
	 
        strData = mid(strDataWhole,lngCurrentBegin, lngCurrentEnd - lngCurrentBegin)
    
        strDataWhole = replace(strDataWhole,strData,"")
    				
        lngBeginFileName = instr(1,strdata,"filename=") + 10
        lngEndFileName = instr(lngBeginFileName,strData,chr(34)) 

        If lngBeginFileName <> lngEndFileName and lngBeginFileName - 10 <> 0 Then

            strFilename = mid(strData,lngBeginFileName,lngEndFileName - lngBeginFileName)

            tmpLng = instr(1,strFilename,"\")
            Do While tmpLng > 0
                PrevPos = tmpLng
                tmpLng = instr(PrevPos + 1,strFilename,"\")
            Loop
    		
            FileName = right(strFilename,len(strFileName) - PrevPos)
   	
            lngCT = instr(1,strData,"Content-Type:")
    	
            If lngCT > 0 Then
                lngBeginPos = instr(lngCT,strData,chr(13) & chr(10)) + 4
            else
    	        lngBeginPos = lngEndFileName
            End if

            lngEndPos = len(strData) 
            
            lngDataLenth = lngEndPos - lngBeginPos
            
            strFileData = mid(strData,lngBeginPos,lngDataLenth)

            Set fso = CreateObject("Scripting.FileSystemObject")

            path = aCaminhoUpload

            Set f = fso.OpenTextFile( path & FileName, ForWriting, True)
            f.Write strFileData
            Set f = nothing
            Set fso = nothing

            lngNumberUploaded = lngNumberUploaded + 1

            oSessionId.Call  "get_f_SetSessionId", VrSessionId, ("FILE_" & lngNumberUploaded), FileName          
            oSessionId.Call  "get_f_SetSessionId", VrSessionId, "TOTALFILES", lngNumberUploaded          
    	
        End if
    		
        lngCurrentBegin = instr(1,strDataWhole,strBoundry)
        lngCurrentEnd = instr(lngCurrentBegin + 1,strDataWhole,strBoundry) - 1
   loop
        
    
    
    FUNCTION GetFileUpload(VrSessionId)
        Dim iTotal
        Dim iCount
        Dim sMailFile
        Dim sTotalMailFile
        
        iTotal = oSessionId.Call("get_f_GetSessionId", VrSessionId, "TOTALFILES")
        iTotal = Cint(iTotal)
        
        For iCount=1 To iTotal  
            
            sMailFile = oSessionId.Call("get_f_GetSessionId", VrSessionId, ("FILE_" & iCount))
            
            IF  sTotalMailFile <> ""  THEN 
                sTotalMailFile = sTotalMailFile & " ; " & sMailFile
            ELSE 
                sTotalMailFile = sMailFile
            END IF 

        NEXT 
        
        GetFileUpload = sTotalMailFile
    END FUNCTION
%>

