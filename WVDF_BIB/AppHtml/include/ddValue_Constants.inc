<script LANGUAGE="VBSCRIPT" RunAt="Server">

' constants for Find modes
    Const LT                = 0
    Const LE                = 1
    Const EQ                = 2
    Const GE                = 3
    Const GT                = 4
    Const NEXT_RECORD       = 5
    Const FIRST_RECORD      = 6
    Const LAST_RECORD       = 7

' Const constants for ddValue for "01" interface
' Const all values for DDValue
' reserve 0-99 for DD field information values

    Const DDCRNTVALUE       = 0
    Const DDDESC            = 1
    Const DDLONGLABEL       = 2
    Const DDSHORTLABEL      = 3
    Const DDTAGLABEL        = 4
    Const DDSTHELP          = 5
    Const DDOPT             = 6
                            
    Const DDVALNUM          = 7
    Const DDVALDATA         = 8
    Const DDVALDESC         = 9

' reserve 100-199 = HTML specfic "helper"
' return values

    Const DDSEL             = 103
    Const DDCHCK            = 104
    Const DDOPTION          = 105
    Const DDREADONLY        = 106
    Const DDRECS            = 107
    Const DDTITLE           = 108
    Const DDFIELDERROR      = 109
    Const DDSHORTFIELDERROR = 110
    Const DDROWIDS          = 111

' reserve 200-299 = HTML control '
    Const DDFORM            = 200
    Const DDEDIT            = 201
    Const DDRADIO           = 202
    Const DDCOMBO           = 203
    Const DDPARENTCOMBO     = 204
    Const DDAUTO            = 205
    Const DDCHECKBOX        = 206
    Const DDHIDDEN          = 207
    Const DDFILE            = 208
    Const DDPWD             = 209
    Const DDDISABLED        = 210
    Const DDDATEBUTTON      = 211
</script>

<link rel="stylesheet" type="text/css" media="all" href="/wvdf_bib/jscalendar/calendar-blue2.css">
<script type="text/javascript" language="javascript" src="/wvdf_bib/jscalendar/calendar.js"></script>
<script type="text/javascript" language="javascript" src="/wvdf_bib/jscalendar/lang/calendar-pt-br.js"></script>
<script type="text/javascript" language="javascript" src="/wvdf_bib/jscalendar/calendar-setup.js"></script>

<script LANGUAGE="JavaScript">
<!--
// JavaScript Document
// para esta função funcional perfeitamente, o nome do form no asp deve 
// ser igual ao nome da tabela em lowercase que esta sendo utilizada na entrada de dados  
// Nao esquecer de incluir este arquivo no corpo de sua pagina
function FieldNumberCheck(field,inteiros,decimais)
{ 
	with (field)
	{ 
		menos = value.indexOf("-") // 0 eh o primeiro caracter
		mais  = value.indexOf("+") // 0 eh o primeiro caracter
		ponto = value.indexOf(".")
		
		if (decimais==0){
			if (mais==0) {
				convertedString = value.split("+");
				convertedString = convertedString.join("");
				value           = convertedString;
			}
			if (menos==-1) {
				if (value.length > inteiros) {
					alert("E permitido apenas o sinal de - e "+inteiros+" digitos.");
					field.focus();
					return false;
				}
			}
			if (ponto!=-1 || value.indexOf(",")!=-1) {
				alert("Nao e permitido casas decimais");
				field.focus();
				return false;
			}
			if ((isFinite(value))==false) {
				alert("Nao e um numero valido");
				field.focus();
				return false;
			}
		}
		
		if (decimais!=0){
			var convertedString = value.split(",");
			convertedString = convertedString.join(".");
			value       = convertedString;
			ponto = value.indexOf(".")
			
			if (ponto==0) {value= "0" + value}
			if (mais==0) {
				convertedString = value.split("+");
				convertedString = convertedString.join("");
				value           = convertedString;
			}
			
			if (menos==0) {
				if (ponto!=-1){
					if (ponto-1>inteiros){
						alert("E permitido apenas o sinal de - e "+inteiros+" digitos antes da virgula.");
						field.focus();
						return false;
					}
				}
				else { 
					if (value.length-1>inteiros){
						alert("E permitido apenas o sinal de - e "+inteiros+" digitos antes da virgula.");
						field.focus();
						return false;
					}
				}
			}
			if (menos==-1) {
				if (ponto!=-1){
					if (ponto>inteiros){
						alert("E permitido apenas o sinal de - e "+inteiros+" digitos antes da virgula.");
						field.focus();
						return false;
					}
				}
				else {
					if (value.length>inteiros){
						alert("E permitido apenas o sinal de - e "+inteiros+" digitos antes da virgula.");
						field.focus();
						return false;
					}
				}
			}
			
			if (ponto!=-1) {
				if (value.length-1-ponto>decimais){
					alert("E permitido apenas "+decimais+" digitos depois da virgula.");
					field.focus();
					return false;
				}
			}
			
			if ((isFinite(value))==false) {
				alert("Nao e um numero valido");
				field.focus();
				return false;
			}
			convertedString = value.split(".");
			convertedString = convertedString.join(",");
			value       = convertedString;
		}
	}
}

function SetCheckedStates(field,fieldhidden,strue,sfalse)
{
with (field)
	{ 
		if (checked){
			fieldhidden.value = strue
		}
		else {
			fieldhidden.value = sfalse
		}
	}
}

function TextAreaLength(field,inputLength)
{
	with (field)
	{
		if (value.length > inputLength) {
			alert("Voce utilizou "+value.length+" caracteres, e este campo aceita apenas "+inputLength+" caracteres!");
			field.focus();
			return false;
		}
	}
} 
// -->
</script>
