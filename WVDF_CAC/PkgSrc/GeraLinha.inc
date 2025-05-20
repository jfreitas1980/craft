//-------------------------------------
// ANDERSON RODRIGUES - 13:58 - 08/06/2015
// LEONARDO CAMPOS - 16:50 - 09/07/2015
//-2WA
    Procedure GeraLinha String sRowID tFieldTypeofGrid[] FieldTypeofGrid String sRecNum String sTable Handle hDD
        String  sHTMLPADRAO
        String  sHTML
        String  sFieldName
        String  sFieldValue
        String  sFieldSize
        String  sFieldNumber
        String  sPlaceHolder
        String  sFieldClassName
        
        String  sOption
        String  sParams
        String  sValue
        
        Integer iFieldType
        Integer iColumn
        Integer iNumColumns
        Integer iVType
        Integer icCount
        Integer iFieldCount
        
        Boolean bFOUND
        
        Handle  hTable

        Move (Lowercase(sTable)) to sTable
        
        Send WriteHtml ('<tr id="'+sRecNum+'"> ')
        Send WriteHtml ('<form action="'+(Lowercase(psDescription(Self)))+'.asp?aUsuarioSessao='+psUsuarioSessao(Self)+psPARAMETRO(Self)+'" method="POST" name="'+sTable+'" onsubmit="SetChangedStates(this)">')
        Send WriteHtml ('<input type="hidden" size="15" name="'+sTable+'__rowid" id="'+sTable+'__rowid" value="'+sRowID+'">')
        
        Move (Eval(sTable+'.FILE_NUMBER')) to hTable
        
        Get_Attribute DF_FILE_NUMBER_FIELDS of hTable to iNumColumns

        Move (SizeOfArray(FieldTypeofGrid)) to icCount
        
        For iColumn from 1 to iNumColumns
            
            Get_Attribute DF_FIELD_NAME             of hTable iColumn to sFieldName
            Get_Attribute DF_FIELD_TYPE             of hTable iColumn to iFieldType
            Get_Attribute DF_FIELD_NATIVE_LENGTH    of hTable iColumn to sFieldSize

        //- Fazer uma tratativa padrÆo para os campos.
        //- ANDERSON RODRIGUES - 2024-10-21
        //  Case Begin
        //     Case (iFieldType = DF_BCD)
        //          If (Integer(sFieldSize) = 0)   Move 15 to sFieldSize
        //          If (Integer(sFieldSize) <= 10) Move 15 to sFieldSize
        //          Case Break
        //     Case (iFieldType = DF_DATE)
        //          If (Integer(sFieldSize) = 0)   Move 15 to sFieldSize
        //          Case Break
        //     Case (iFieldType = DF_DATETIME)
        //          If (Integer(sFieldSize) = 0)   Move 30 to sFieldSize
        //          Case Break
        //     Case Else
        //          If (Integer(sFieldSize) = 0)   Move 55 to sFieldSize
        //          If (Integer(sFieldSize) <= 10) Move 25  to sFieldSize
        //          If (Integer(sFieldSize) > 100) Move 55 to sFieldSize
        //  Case End
            
            Move (Trim(sFieldName))      to sFieldName
            Move (Lowercase(sFieldName)) to sFieldName
            
            Move '' to sOption
            Move '' to sParams
            
            Move (icCount = 0) to bFOUND
            If (not(bFOUND)) Begin
                For iFieldCount from 0 to (icCount - 1)
                    If (FieldTypeofGrid[iFieldCount].igridFieldNum = iColumn) Begin
                        Move True to bFOUND
                        Move FieldTypeofGrid[iFieldCount].sgridFieldType  to sOption
                        Move FieldTypeofGrid[iFieldCount].sgridFieldParam to sParams
                        Move (icCount + 99) to iFieldCount    
                    End //(FieldTypeofGrid[iFieldCount].igridFieldNum = iColumn)
                Loop
            End //(not(bFOUND))
            
            If (bFOUND) Begin

                Get Field_Validation_Type of hDD iColumn to iVType
                
                If (iVType=FA_VALIDATION_TYPE_CHECKBOX) Begin
                    Case Begin
                       Case (sOption = 'DDCHECKBOXFRM')
                            Get DDFormControlCheckBox hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case Else
                            Get DDCheckboxControl hDD hTable iColumn sParams to sHTML
                    Case End
                End
                Else If (iVType=FA_VALIDATION_TYPE_CHECK or iVType=FA_VALIDATION_TYPE_TABLE) ;
                   Get DDComboControl hDD hTable iColumn sParams to sHTML
                Else Begin
                    Case Begin
                       Case (sOption = 'DDEXTERNAL')
                            Get_Field_Value hTable  iColumn to sValue
                            Move (SFormat(sParams, sValue)) to sParams
                            Move (Eval(sParams)) to sHTML                            
                            Case Break
                       Case (sOption = 'DDCOMBO')
                            Get DDComboControl hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case (sOption = 'DDEDIT')
                            Get DDEditControl hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case (sOption = 'DDFORM')
                            Get DDFormControl hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case (sOption = 'DDRADIO')
                            Get DDRadioControl hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case (sOption = 'DDPWD')
                            Get DDPwdControl hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case (sOption = 'DDFILE')
                            Get DDFileControl hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case (sOption = 'DDHIDDEN')
                            Get DDHiddenControl hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case (sOption = 'DDDISABLED')
                            Get DDFormControlDisabled hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case (sOption = 'DDCHECKBOX')
                            Get DDCheckboxControl hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case (sOption = 'DDDATEBUTTON')
                            Get DDDateInputForm hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case (sOption = 'DDDATEFRM')
                            Get DDFormControlDate hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case (sOption = 'DDCHECKBOXFRM')
                            Get DDFormControlCheckBox hDD hTable iColumn sParams to sHTML
                            Case Break
                       Case Else
                            Get DDFormControl hDD hTable iColumn sParams to sHTML
                   Case End
                End
    
            //- ANDERSON RODRIGUES - 2024-10-21 22:17 ------------
            //  configurar a classe para que o input tamb‚m fique 
            //  alinhado com o cabecalho.
                If (not(Pos('class="%1"',sHTML))) Begin
                  //Move (Replaces('<input',sHTML,'<input class="%1" size="%2"')) to sHTML
                    Move (Replaces('<input',sHTML,'<input class="%1"')) to sHTML
                End
                Move ('<td class="%1">'+sHTML+'</td>')  to sHTML
                
                Move '' to sFieldValue
                
                Case Begin
                    Case (iFieldType = DF_BCD)   //Showln " - Numeric"
                          Move  (SFormat(sHTML, 'rptR', sFieldSize)) to sHTML
                          Send WriteHtml sHTML
                        Case Break
                    Case (iFieldType = DF_DATE)  //Showln " - Date"
                          Move  (SFormat(sHTML, 'rptC', sFieldSize)) to sHTML
                          Send WriteHtml sHTML
                        Case Break
                    Case Else 
                          //(iFieldType = DF_TEXT)  //Showln " - Text"
                          //(iFieldType = DF_DATETIME)  //Showln " - DateTime"
                          //(iFieldType = DF_ASCII) //Showln " - Ascii"
                          If (sOption = 'DDCHECKBOXFRM') Begin
                            //Move 60 to sFieldSize
                            Move  (SFormat(sHTML, 'rptC', sFieldSize)) to sHTML
                          End
                          Else Move  (SFormat(sHTML, 'rptL', sFieldSize)) to sHTML
                          Send WriteHtml sHTML
                        Case Break
                Case End
                
            End //(bFound)
        Loop
        
        Send WriteHtml  '<td style="width: 112px;">'
        Send WriteHtml  '<button type="Submit" name="Save" id="Save" value="Save" class="btn btn-success" title="Save"><i class="fa fa-floppy-o"></i></button>&nbsp;'
        Send WriteHtml ('<button type="Submit" name="Delete" id="Delete" value="Delete"' * If(sRecNum='0', 'disabled', '') * 'class="btn btn-danger" title="Delete"><i class="fa fa-trash-o"></i></button>')
        Send WriteHtml  '</td>'
        Send WriteHtml  '</form>'
        Send WriteHtml  '</tr>'
    End_Procedure //GeraLinha
