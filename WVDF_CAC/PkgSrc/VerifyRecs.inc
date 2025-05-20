// ESTA PROCEDURE PODE SER USADA PARA EXIBIR UMA MENSAGEM PADRAO
// ONDE O RELATORIO ENCONTROU REGISTROS, POREM SE O REPORT NAO EMITIU NADA
// VAMOS INFOMAR AO USUARIO.
//-2WA
Property String   psUsuarioSessao
Property String   psPrograma

Procedure NaoPossuiRegistro String sMsg String sClasse
    Send WriteHtmlTableBegin 'border="0" width="95%" class="ReportTable" align="center"'
         Send WriteHtml '<tbody>'    
         Send WriteHtmlRowBegin
               Send WriteHtml '<br />'
         Send WriteHtmlRowEnd
    
         Send WriteHtmlRowBegin
             Send WriteHtmlCellHeader  sMsg  ('class="'+sClasse+'"  align="center"')
         Send WriteHtmlRowEnd
    
         Send WriteHtmlRowBegin
               Send WriteHtml '<br />'
         Send WriteHtmlRowEnd
         Send WriteHtml '</tbody>'    
    
    Send WriteHtmlTableEnd
End_Procedure // NaoPossuiRegistro


// Visual DataFlex 16.1 Migration Utility, added July 28, 2013: 19:16:08
#IF (!@ >= 120)
{ Published = True }
{ Description = "" }
#ENDIF
Procedure SetUsuariosessao String sStart
    Set psUsuarioSessao to sStart
End_Procedure // SetUsuariosessao


// Visual DataFlex 16.1 Migration Utility, added July 28, 2013: 19:16:11
#IF (!@ >= 120)
{ Published = True }
{ Description = "" }
#ENDIF
Procedure SetPrograma String sStart
    Set psPrograma to sStart
End_Procedure // SetUsuariosessao
