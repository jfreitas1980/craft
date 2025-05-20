<%@ Language=VBScript %>
<% 
option explicit 
Response.Expires = -1
Server.ScriptTimeout = 600
' All communication must be in UTF-8, including the response back from the request
Session.CodePage  = 65001
%>
<!-- #include file="freeaspupload.asp" -->
<%
Dim uploadsDirVar
Dim Upload 
Dim fileName
Dim fileSize
Dim ks
Dim i 
Dim fileKey

uploadsDirVar = "E:\temp" 

Set Upload = New FreeASPUpload
    
Upload.Save(uploadsDirVar)

If Err.Number = 0 then 
	
	ks = Upload.UploadedFiles.keys
    
	If (UBound(ks) <> -1) Then
	
        'For Each fileKey In Upload.UploadedFiles.keys
		'            Upload.UploadedFiles(fileKey).FileName & " (" & Upload.UploadedFiles(fileKey).Length & "B) "
        'next
		
    end if
	
	Response.Write "1"
	
End If

%>