//-------------------------------------
// ANDERSON RODRIGUES - 13:58 - 08/06/2015
//-2WA
    //Struct tFieldTypeofGrid
    //    Integer iGridFieldNum   
    //    String  sGridFieldType  
    //    String  sgridFieldParam 
    //End_Struct //tFieldTypeofGrid

    #Include FIELDLABELRPT.INC


    { Published = True  }
    { Description = ""  }
    Function GeraTabela String sStartRowId Integer iMaximo Integer iIndex Integer iNovo String sFields Returns String
        Handle  hDD
        Handle  hTable
        
        String  sHTML
        String  sRecNum
        String  sTable
        String  sColumnName
        String  sFieldName
        String  sFieldParam
        String  sValue
        String  sOption
        
        String  sRowid
        RowID   riFileNumber
    
        Integer iFieldType
        Integer iX
        Integer iNumColumns
        Integer iColumn
        Integer iFieldCount
        Integer iFieldParam
        Integer iSpacePos
        Integer iPos
        Integer icCount

        Boolean bFOUND
        
        tFieldTypeofGrid[] FieldTypeofGrid
        
        Get Main_DD   to hDD
        Get Main_File of hDD to hTable

        //Header da Grid
        Send WriteHtml '<table class="table table-bordered table-striped table-hover">'
        Send WriteHtml '<thead>'
        Send WriteHtml '<tr>'
        
        
        //--- IDENTIFICAR OS PARAMETROS
            // Repeat as long as sText contains data
        Move (ResizeArray(FieldTypeofGrid, 0)) to FieldTypeofGrid             
        While (sFields <> "")
            // Find the first/next space
            Move (Pos ("|", sFields)) to iSpacePos
            Move "" to sFieldParam
            
            // If a space was found
            If (iSpacePos > 0) Begin
                // Take the left part
                Move (Left (sFields, iSpacePos - 1)) to sFieldParam
                // Move the remainder to the text variable
                Move (Right (sFields, Length (sFields) - iSpacePos)) to sFields
            End //(iSpacePos > 0)
            Else Move sFields to sFieldParam
            
            If (sFieldParam <> "") Begin
                Move 0 to iFieldParam
                
                While (sFieldParam <> "")
                    // Find the first/next space
                    Move (Pos (";", sFieldParam)) to iPos
                    
                    // If a space was found
                    If (iPos > 0) Begin
                        // Take the left part
                        Move (Left (sFieldParam, iPos - 1)) to sValue
                        // Move the remainder to the text variable
                        Move (Right (sFieldParam, Length (sFieldParam) - iPos)) to sFieldParam
 
                        If (iFieldParam = 0);
                            Move sValue to FieldTypeofGrid[iFieldCount].igridFieldNum
                        If (iFieldParam = 1);
                            Move sValue to FieldTypeofGrid[iFieldCount].sgridFieldType

                    End //(iPos > 0)
                    Else Begin
                        Move sFieldParam to sValue
                        If (iFieldParam = 0);
                            Move sValue to FieldTypeofGrid[iFieldCount].igridFieldNum
                        If (iFieldParam = 1);
                            Move sValue to FieldTypeofGrid[iFieldCount].sgridFieldType
                        If (iFieldParam = 2);
                            Move sValue to FieldTypeofGrid[iFieldCount].sgridFieldParam
                        // Empty text to stop the loop
                        Move "" to sFieldParam
                    End
                    Increment iFieldParam
                Loop
                
            End //(sFieldParam <> "")
            
            If (iSpacePos = 0) Move "" to sFields                
            Increment iFieldCount
        Loop

        Get_Attribute DF_FILE_NUMBER_FIELDS of hTable to iNumColumns
        Get_Attribute DF_FILE_TABLE_NAME    of hTable to sTable
        
        Move (SizeOfArray(FieldTypeofGrid)) to icCount
        Move (Trim(sTable)) to sTable
        
        For iColumn from 1 to iNumColumns
            
            Get_Attribute DF_FIELD_NAME of hTable iColumn to sFieldName
            Get_Attribute DF_FIELD_TYPE of hTable iColumn to iFieldType
            
            Move (Trim(sFieldName)) to sFieldName
            Move (icCount = 0) to bFOUND
            If (not(bFOUND)) Begin
                For iFieldCount from 0 to (icCount - 1)
                    If (FieldTypeofGrid[iFieldCount].igridFieldNum = iColumn) Begin
                        Move FieldTypeofGrid[iFieldCount].sgridFieldType to sOption    
                        Move True to bFOUND
                        Move (icCount + 99) to iFieldCount
                    End //(FieldTypeofGrid[iFieldCount].igridFieldNum = iColumn)
                Loop
            End

            If (bFOUND) Begin
                Get ddValueFieldlabel hDD (sTable+"."+sFieldName) to sColumnName  
                
                Move '' to sHTML
                If (sOption = 'DDEXTERNAL' or sOption = 'DDCOMBO' or sOption = 'DDRADIO' or sOption = 'DDCHECKBOX' or sOption = 'DDPWD') ;
                    Move ('<th class="rptL">%1</th>') to sHTML
                    
                Move (Trim(sColumnName)) to sColumnName  
                Case Begin
                    Case (iFieldType = DF_BCD)   //Showln " - Numeric"
                          If (sHTML = '');
                              Move ('<th class="rptR">%1</th>') to sHTML
                          Move (SFormat(sHTML, sColumnName)) to sHTML
                          Send WriteHtml sHTML
                        Case Break
                    Case (iFieldType = DF_DATE)  //Showln " - Date"
                          Move ('<th style="width: 20%;" class="rptC">%1</th>') to sHTML
                          Move (SFormat(sHTML, sColumnName)) to sHTML
                          Send WriteHtml sHTML
                        Case Break
                    Case Else 
                          //(iFieldType = DF_DATETIME)  //Showln " - DateTime"
                          //(iFieldType = DF_ASCII) //Showln " - Ascii"
                          //(iFieldType = DF_TEXT) //Showln " - Text"
                          Move ('<th class="rptL">%1</th>') to sHTML
                          Move (SFormat(sHTML, sColumnName)) to sHTML
                          Send WriteHtml sHTML
                        Case Break
                Case End
            End //(bFound)
        Loop

        Send WriteHtml '<th style="width: 112px;"></th>'
        Send WriteHtml '</tr>'
        Send WriteHtml '</thead>'
        Send WriteHtml '<tbody>'

        If (iNovo=1) Begin
        //--- Gera linha para Inclusao de um Novo Registro
            Move 0 to sRecNum
            Send GeraLinha sRowId FieldTypeofGrid sRecNum sTable hDD
        End

        Move False to bFOUND
        
        If (sStartRowId<>'') Begin
        //--- Se sStartRowId<>'' posiciona o registro inicial pelo sStartRowId
            Move (DeserializeRowId(sStartRowId)) to riFileNumber
            If (not(IsNullRowId(riFileNumber))) Begin      
                Move (FindByRowId(hTable, riFileNumber)) to bFOUND
            End
        End
        
        If (bFOUND) Begin
            Send FindByRowId of hDD hTable riFileNumber
        End //(bFOUND)
        Else Begin
        //--- Senao busca pelo primeiro registro ou pelo ­ndice iIndex
            Send Clear of hDD
            Send Find  of hDD Gt iIndex
        End
        
        //--- Se encontrou o primeiro, prosseguir at, o nœmero mÿx linhas ou final do arquivo
        While ((Found) and (iX<iMaximo))
            //--- Contador de linhas geradas
            Increment iX

            //--- Recuperando valores dos campos a serem exibidos
            Move (GetRowID(hTable))             to riFileNumber
            Move (SerializeRowId(riFileNumber)) to sRowid
            
            //--- Gerando linhas da Grid
            Get Current_Record of hDD to sRecNum
            Send GeraLinha sRowid FieldTypeofGrid sRecNum sTable hDD

            //--- Procurar proximo registro
            Send Find of hDD Gt iIndex
            
            //--- Guardar o proximo registro a ser lido
            Move (GetRowID(hTable))             to riFileNumber
            Move (SerializeRowId(riFileNumber)) to sRowid
        Loop
        
        //--- Se for fim de arquivo, limpar sRowid
        If (not(Found) or (iX<iMaximo)) Move "" to sRowid
        
        //--- Final da grid
        Send WriteHtml '</tbody>'
        Send WriteHtml '</table>'
        
        Function_Return sRowid
    End_Procedure // GeraTabela
