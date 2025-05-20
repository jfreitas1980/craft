
<script language="JavaScript"><!--
var corFundo = "";
var corFonte = "";
function Hilight(oObj, bState, aColor, bColor){
  if ( oObj.getAttribute("RecId") == null )
    return
  if (bState)
  {
    oObj.style.backgroundColor = "#9BCDFF";
    oObj.style.color = "#FFFFFF";
	corFonte = aColor;
	corFundo = bColor;
  }
  else{
    oObj.style.backgroundColor = corFundo;
    oObj.style.color = corFonte;
  }
}
// --></script>
