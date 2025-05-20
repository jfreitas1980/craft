// Anderson
// 13.06.2003 - 11:33
// FUNCAO USADA PARA ESCREVER A LABEL DE CADA COLUNA DO RELATORIO
//
// PARA QUE ESTA FUNCAO TRAGA A LABEL CORRESPONDENTE NO IDIOMA
// EH PRECISO QUE NO DDO DO WBO ESTEJA O PACOTE FIELDLABEL.INC
//-2WA
Function ddValueFieldLabel Integer iDDO String sField Returns String 
    Integer iFile 
    Integer iField
    String  sVal
    String  sLabel
    Handle  hFile
    
    Move (Left(sField,(Pos(".",sField)))+"File_Number")      to sVal
    Move (Replace(Left(sField,(Pos(".",sField))),sField,"")) to sField
    
    Move (Eval(sVal)) to hFile
    //Pegar o numero do arquivo
    Get_Attribute DF_FILE_NUMBER Of hFile to iFile

    //Pegar o numero do campo no arquivo
    Field_Map iFile sField to iField      
    
    Get Field_Label_Long of iDDO iField To sLabel
    Function_Return (HtmlEncode(sLabel))
    
End_Function // ddValueFieldLabel

