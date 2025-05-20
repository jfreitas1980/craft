<%
	FUNCTION getXML(urlXML) 
		
		urlXML = getPathDomain() & urlXML & "&now=" & Server.HTMLEncode(now())
		
		DIM xmlhttp : SET xmlhttp = Server.CreateObject("Msxml2.XMLHTTP.3.0")
		xmlhttp.Open "GET", urlXML, FALSE
		xmlhttp.Send

		DIM xmldoc : SET xmldoc = Server.CreateObject("Msxml2.DOMDocument.3.0")
		xmldoc.setProperty "ServerHTTPRequest", True
        xmldoc.async = FALSE
        xmldoc.setProperty "SelectionLanguage", "XPath"
		xmldoc.loadxml(xmlhttp.ResponseText) 
		
		DIM isValid : isValid = CBOOL(xmldoc.parseError.errorCode = 0)
		
		IF NOT isValid THEN
            Response.Write getXMLError(xmldoc)
        END IF

		SET getXML = xmldoc
	END FUNCTION ' getXML(urlXML) 
	
	
    FUNCTION getXMLXPath(urlXML)
        
        urlXML = getPathDomain() & urlXML & "&now=" & Server.HTMLEncode(now())
		
		DIM xmlhttp : SET xmlhttp = Server.CreateObject("Msxml2.XMLHTTP.3.0")
		xmlhttp.Open "GET", urlXML, FALSE
		xmlhttp.Send
		
		DIM xmldoc : SET xmldoc = Server.CreateObject("Msxml2.DOMDocument.3.0")
		xmldoc.setProperty "ServerHTTPRequest", True
        xmldoc.async = FALSE
        xmldoc.setProperty "SelectionLanguage", "XPath"
		xmldoc.loadxml(xmlhttp.ResponseText) 
		
		DIM isValid : isValid = CBOOL(xmldoc.parseError.errorCode = 0)
		
		IF NOT isValid THEN
            Response.Write getXMLError(xmldoc)
        END IF
    
        set getXMLXPath = xmldoc
    END function ' getXMLXPath(urlXML)
	
	
	FUNCTION getXSL(strXSL) 
		
		SET xsldoc = Server.CreateObject("Msxml2.DOMDocument.3.0")
		xsldoc.async = false
		xsldoc.loadxml strXSL
		
		DIM isValid : isValid = CBOOL(xsldoc.parseError.errorCode = 0)
		
		IF NOT isValid THEN
            Response.Write getXMLError(xsldoc)
        END IF

		SET getXSL = xsldoc
	END FUNCTION ' getXSL(urlXML) 
	
	
	FUNCTION getPathDomain() 
		
		DIM path : path = Request.ServerVariables("SERVER_NAME")
		
		IF Request.ServerVariables("HTTPS") = "on" THEN 
			path = "https://" & path 
		ELSE 
			path = "http://" & path 
		END IF 
		
		getPathDomain = path
	END FUNCTION ' getPathDomain() 
	
	
	FUNCTION getXMLError(xmlDoc)
        DIM strError : strError = "Invalid XML file!" & vbNewline & "<br />" & _
								  "File: " & xmlDoc.parseError.url & vbNewline & "<br />" & _
								  "Line: " & xmlDoc.parseError.line & vbNewline & "<br />" & _
								  "Character: " & xmlDoc.parseError.linepos & vbNewline & "<br />" & _
								  "Source Text: " & xmlDoc.parseError.srcText & vbNewline & "<br />" & _
								  "Description: " & xmlDoc.parseError.reason
        getXMLError = strError
    END FUNCTION ' getXMLError
%>

