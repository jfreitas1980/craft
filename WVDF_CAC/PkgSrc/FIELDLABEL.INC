// ANDERSON
// 13.06.2003 - 01:44
// ROTINA PARA SER INCLUIDA EM TODOS OS DDOS DE TODOS WBOS
// 
// PROCEDURE FIELD_DEFAULTS FOI MODIFICADA PARA LER CSAG310
// E EMITIR A LABEL DE CADA CAMPO NA LINGUA INDICADA.
//-2WA
Procedure Field_Defaults
    Forward Send Field_Defaults

    Handle  hIdiomaFile
    String  sIdiomaFieldName
    String  sIdiomaLogicalName
    Integer iIdiomaNumFields
    Integer iIdiomaX
    
    Get Main_File                       To hIdiomaFile
    Get_Attribute DF_FILE_LOGICAL_NAME  Of hIdiomaFile                To sIdiomaLogicalName
    Get_Attribute DF_FILE_NUMBER_FIELDS Of hIdiomaFile                To iIdiomaNumFields

    For iIdiomaX from 1 To iIdiomaNumFields

        Get_Attribute DF_FIELD_NAME     Of hIdiomaFile iIdiomaX       To sIdiomaFieldName

        Clear   CSAG310
        Move sIdiomaLogicalName                     To CSAG310.TABELA
        Move sIdiomaFieldName                       To CSAG310.CAMPO
        Move (piUsuarioIdioma(oPAG800_01(Self)))    To CSAG310.IDIOMA
        Find Eq CSAG310   By 1

        If (CSAG310.APPEARANCE<>"")     Set Field_Label_Long iIdiomaX To (Trim(CSAG310.APPEARANCE))

    Loop

End_procedure // Field_Defaults

