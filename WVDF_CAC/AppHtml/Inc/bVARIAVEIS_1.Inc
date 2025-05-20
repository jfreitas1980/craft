<%'response.CacheControl="Private"%>
<%response.Expires=-1%>

<%
    Dim aPrograma, aUsuarioSessao, Retorno, nVALUSR, aIdioma, nTipoUsuario, aNomeFormulario, aAcaoFormulario, aRecNum, aIndice, aCaminhoSite, aUsuarioRazaoSocial
    Dim aC, aI, aE, aProgramaChamador, aClassePrograma
    Dim aLogoEmpresa, aDireitos, aTipoRetorno, aEscondeImagens, aConfiguracaoLogoExterno, aConfiguracaoLogoInterno
    
    Dim aIc_16_ACTIONS, aIc_16_APPS, aIc_16_DEVICES, aIC_16_FILESYSTEMS, aIc_16_MIMETYPES 
    Dim aIc_16_EMPRESA
    Dim aIc_22_ACTIONS, aIc_22_APPS, aIc_22_DEVICES, aIC_22_FILESYSTEMS, aIc_22_MIMETYPES 
    
    Dim aASC_PRINCIPAL      
    Dim aADS_DESKTOPSIS   
        
    Dim aABA_01         
    Dim aABA_02         
    Dim aABA_03 
    Dim aABA_04    
    Dim aABA_05      
    Dim aABA_06   
    Dim aABA_07
    Dim aABA_08
    Dim aABA_09
    Dim aABA_10
     
    Dim aATA_PAG300_00      
    Dim aATA_PAG301_00      
    Dim aATA_PAG305_00      
    Dim aATA_PAG332_00      
    Dim aATA_PAG333_00      
    Dim aATA_PAG334_00      
    Dim aUSUARIOCLASSE     
            
    Dim aEMPRESA_Logo     
    Dim aEMPRESA_LogoCor
    Dim aEMPRESA_LogoSite     
    Dim aEMPRESA_Fundo    
    Dim aEMPRESA_RazaoSocial
    Dim aEMPRESA_Barra    
    Dim aEMPRESA_BGColorIndex    
    Dim aEMPRESA_BGColorDefau
    Dim aEMPRESA_BGColorLogo    
    Dim aEMPRESA_BGColorHome    
    Dim aEMPRESA_Banners
    Dim aEMPRESA_Identificacao

    Dim aUSUARIO_Nome
    Dim aUSUARIO_DtUltimoLogin
    Dim aUSUARIO_HrUltimoLogin
    Dim aUSUARIO_EnviaEmail

    aEscondeImagens = 0
    aTipoRetorno = Request ("aTipoRetorno")
    aEscondeImagens = Request ("aEscondeImagens")	
%>
