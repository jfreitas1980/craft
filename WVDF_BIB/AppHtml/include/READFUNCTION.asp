<%  '
    '  ReadFunction
    '
    Option Explicit ' Force explicit variable declaration.

    ' Declare variables

    Dim sObj
    Dim sFuncao
    Dim sValue
    Dim sExpression
    Dim Retorno

    sObj    = Request ("sObj")
    sFuncao = Request ("sFuncao")
    sValue  = Request ("sValue")

    If (IsNumeric(sValue)) Then
        sExpression = sObj &".Call (" &Chr(34) &sFuncao &Chr(34) &","  &sValue &")" 
    Else
        sExpression = sObj &".Call (" &Chr(34) &sFuncao &Chr(34) &"," &Chr(34) &sValue &Chr(34) &")" 
    End If

    Retorno     = Eval(sExpression)
    Response.Write Retorno
    'Response.Write sExpression

%>
