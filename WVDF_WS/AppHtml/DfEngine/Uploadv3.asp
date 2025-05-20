<%
    Option Explicit

'   
'   This script represents the default handler of file uploads in the DataFlex Web 
'   Application framework. The cWebFileUploader class works with this script. A key is posted with 
'   the request containing details for handling the file upload. A call is made to the 
'   oWebResourceHandler passing this key which will return the local file path to store the file. It 
'   uses the FreeAspUpload script to parse the request and provide us with the filestream used to 
'   store the file.
'
'   Revision:
'       2012/12/18 (HW, DAW)
'           Created the initial version.
'
Response.CodePage=65001
Response.CharSet="UTF-8"

%><!-- #include file="freeaspupload.asp" --><%
    Dim bResult, sMessage
    Dim oFSO, oUpload, oFileStream, oFile, sFilePath, sResultKey, iFile, sOutFileName, sOutLocalFileName, aKeys
    Dim oWebResourceManager
	Dim aUsuarioSessao
	Dim aRetorno
	Dim aSize
	Dim aPropostaId
	Dim aFingerPrint
    Dim aTipoDocumento
    Dim aTabela
    Dim aPasta
	'aUsuarioSessao = Request.Form("aUsuarioSessao")
	
    '   Initialize and configure WebApp object & session
    WebAppServerSession.PageScopedSession=True 
    Set oWebResourceManager = Server.CreateObject("WebAppServer.WebBusinessProcess.18.0")
    oWebResourceManager.Name = "oWebResourceManager"

    '   Initialize the upload
    Set oUpload = New FreeASPUpload
    oUpload.Upload

    '   Check if file are posted
    If (oUpload.UploadedFiles.Exists("file")) Then
        
        '   Convert key into number
        aKeys = oUpload.UploadedFiles.Keys
        For iFile = 0 to oUpload.UploadedFiles.Count -1
            If (aKeys(iFile) = "file") Then
                
                Exit For
            End If
                
        Next
        
        Set oFile = oUpload.UploadedFiles("file")
		
		aUsuarioSessao = oUpload.FormElements("ausuariosessao")
		aSize = oUpload.FormElements("asize")
		aPropostaId = oUpload.FormElements("apropostaid")
        aFingerPrint = oUpload.FormElements("afingerprint")
        aTipoDocumento = oUpload.FormElements("atipodocumento")
        aPasta = oUpload.FormElements("apasta")
        aTabela = oUpload.FormElements("atabela")
		
        '   Validate upload and get save path
        'sFilePath = oWebResourceManager.call("Get_FileUpload", oFile.FileName, oUpload.FormElements("hash"), "51A9B391-4D24-4D19-8045-090DE97D5432")
        sFilePath = oWebResourceManager.call("Get_UpdloadDestinoProposta", aUsuarioSessao, aFingerPrint, aPasta, aPropostaId)
		
        If (sFilePath <> "") Then
            '   Special error for illegal upload location
            If (sFilePath <> "[invalid folder]") Then
				sFilePath = (sFilePath & oFile.FileName)
                '   Determine if file exists
                Set oFSO = Server.CreateObject("Scripting.FileSystemObject")
                If (Not(oFSO.FileExists(sFilePath))) Then
                    
                    Set oFileStream = oUpload.GetFileStream(iFile)
                    oFileStream.SaveToFile sFilePath, adSaveCreateOverWrite
                    oFileStream.Close
                    Set oFileStream = Nothing
                    
                    aRetorno = oWebResourceManager.call("Get_UploadFileFinishedProposta", sFilePath, oFile.FileName, aUsuarioSessao, aFingerPrint, aSize, aPropostaId, aTipoDocumento, aTabela)
                    Response.Write(aRetorno)
                
                Else 
                    Response.Write("File already exists.")
                End If
            Else
                Response.Write("Invalid upload folder.")
            End If
        Else
            Response.Write("Invalid resource string.")
        End If
    Else
        Response.Write("Invalid request format.")
    End If
    
    Set oWebResourceManager = Nothing
%>
