<!--#include FILE="bHash_Sha256.inc"-->
<%
    Dim aUsuarioNumeroRetorno, aUsuarioIPSessao, aUsuarioSISessao
    Session.Timeout=1200

	If (Request.QueryString("aUsuarioSessao")<>"") Then
       aUsuarioSessao           =Request.QueryString ("aUsuarioSessao")
       Session("aUsuarioSessao")=aUsuarioSessao
    Else
       aUsuarioSessao           =Session("aUsuarioSessao")
    End If  
 
    If (Request.QueryString("aProgramaChamador")<>"") Then
       aProgramaChamador           =Request.QueryString ("aProgramaChamador")
       Session("aProgramaChamador")=aProgramaChamador
    Else
       aProgramaChamador           =Session("aProgramaChamador")
    End If  
    
    aUsuarioIPSessao = Request.ServerVariables("REMOTE_ADDR")
    aUsuarioSISessao = SHA256(Session.SessionID)


    Retorno          =oPAG800_01.Call ("Get_fLogUSRSessao", aUsuarioSessao, aPrograma, aUsuarioIPSessao, aUsuarioSISessao)
    If Retorno       ="0" Then Retorno=oPAG800_01.Call ("Get_f_SETAPROPRIEDADES", aUsuarioSessao, aPrograma)
	If Retorno       ="0" Then Retorno=oPAG309_01.Call ("Get_fIdiomaProgramas", aUsuarioSessao, aPrograma)
    If Retorno       ="0" Then Retorno=oPAG312_01.Call ("Get_fIdiomaBotoes", aUsuarioSessao)
    If Retorno       ="0" Then 

       aIdioma                        = oPAG800_01.Call  ("Get_f_IDIOMAUSUARIO")
       aASC_PRINCIPAL                 = oPAG800_01.Call  ("Get_f_ASC_PRINCIPAL")
       aADS_DESKTOPSIS                = oPAG800_01.Call  ("Get_f_ADS_DESKTOPSIS")
       
       aABA_01                        = oPAG800_01.Call  ("Get_f_ABA_01")
       aABA_02                        = oPAG800_01.Call  ("Get_f_ABA_02")
       aABA_03                        = oPAG800_01.Call  ("Get_f_ABA_03")
       aABA_04                        = oPAG800_01.Call  ("Get_f_ABA_04")
       aABA_05                        = oPAG800_01.Call  ("Get_f_ABA_05")
       aABA_06                        = oPAG800_01.Call  ("Get_f_ABA_06")
       aABA_07                        = oPAG800_01.Call  ("Get_f_ABA_07")
       aABA_08                        = oPAG800_01.Call  ("Get_f_ABA_08")
       aABA_09                        = oPAG800_01.Call  ("Get_f_ABA_09")
       aABA_10                        = oPAG800_01.Call  ("Get_f_ABA_10")
       
       aATA_PAG300_00                 = oPAG800_01.Call  ("Get_f_ATA_PAG300_00")
       aATA_PAG301_00                 = oPAG800_01.Call  ("Get_f_ATA_PAG301_00")
       aATA_PAG305_00                 = oPAG800_01.Call  ("Get_f_ATA_PAG305_00")
       aATA_PAG332_00                 = oPAG800_01.Call  ("Get_f_ATA_PAG332_00")
       aATA_PAG333_00                 = oPAG800_01.Call  ("Get_f_ATA_PAG333_00")
       aATA_PAG334_00                 = oPAG800_01.Call  ("Get_f_ATA_PAG334_00")
                                     
       aUSUARIOCLASSE                 = oPAG800_01.Call  ("Get_f_USUARIOCLASSE")
                                     
       aEMPRESA_Logo                  = oPAG800_01.Call  ("Get_f_EMPRESA_Logo")             
       aEMPRESA_LogoCor               = oPAG800_01.Call  ("Get_f_EMPRESA_LogoCor")          
       aEMPRESA_LogoSite              = oPAG800_01.Call  ("Get_f_EMPRESA_LogoSite")         
       aEMPRESA_Fundo                 = oPAG800_01.Call  ("Get_f_EMPRESA_Fundo")            
                                                                                            
       aEMPRESA_BGColorDefau          = oPAG800_01.Call  ("Get_f_RETORNAR_BgColorDefaut")   
       aEMPRESA_BGColorLogo           = oPAG800_01.Call  ("Get_f_RETORNAR_BgColorLogo")     
       aEMPRESA_BGColorHome           = oPAG800_01.Call  ("Get_f_RETORNAR_BgColorHome")     
       aEMPRESA_RazaoSocial           = oPAG800_01.Call  ("Get_f_RETORNAR_RazaoSocial")     
       aEMPRESA_Barra                 = oPAG800_01.Call  ("Get_f_RETORNAR_Barra")
       aEMPRESA_BGColorIndex          = oPAG800_01.Call  ("Get_f_RETORNAR_BgColorIndex")

       aCaminhoSite                   = oPAG800_01.Call  ("Get_f_RetCaminhoSite")           
       aConfiguracaoLogoInterno       = oPAG800_01.Call  ("Get_f_RetConfiguracaoTamanhoInternoLogo")           
       aConfiguracaoLogoExterno       = oPAG800_01.Call  ("Get_f_RetConfiguracaoTamanhoExternoLogo")           
                                     
       aUsuarioNumeroRetorno          = oPAG800_01.Call  ("Get_fRetNumUsuario", aUsuarioSessao)
       aDireitos                      = oPAG800_01.Call  ("Get_fPAG800_01RetornaDireitos", aUsuarioSessao)
                                     
       aUsuarioRazaoSocial            = oPAG800_01.Call  ("Get_f_RETORNAR_RazaoSocial")
       
       aUSUARIO_Nome                  = oPAG800_01.Call  ("Get_f_USUARIO_Nome", aUsuarioSessao )
       aUSUARIO_DtUltimoLogin         = oPAG800_01.Call  ("Get_f_USUARIO_Ultima_Data_Login" )
       aUSUARIO_HrUltimoLogin         = oPAG800_01.Call  ("Get_f_USUARIO_Ultima_Hora_Login" )
       aUSUARIO_EnviaEmail            = oPAG800_01.Call  ("Get_f_USUARIO_Envia_Email", aUsuarioSessao )
       
    End If  
    nVALUSR          =Retorno

%>


<%  If (nVALUSR = "2") Then %>

     <script>
        /*{window.location.href = ('Default_AcessoNegado.Htm');}*/
     </script>

<%  End If %>


<% aI=oPAG800_01.Call ("Get_fRetClassUserProgramI", aUsuarioSessao, aPrograma) %>
<% aE=oPAG800_01.Call ("Get_fRetClassUserProgramD", aUsuarioSessao, aPrograma) %>
<% aC=oPAG800_01.Call ("Get_fRetClassUserProgramC", aUsuarioSessao, aPrograma) %>

