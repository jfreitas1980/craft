<div id="divpopup" style="overflow:hidden; width:0%; height:0%; top:0px; left:0px; position:absolute; visibility:hidden; z-index:999; border:1px solid #CCCCCC">
	<div id="divpopupH" align="center" style="width:100%; height:35px; position:relative; background-image:url(Images/celso/cabecalho_C.gif); background-repeat:repeat; font-family:Verdana, Arial, Helvetica, sans-serif; font-size:18px;"></div>
	<div style="position:absolute; top:0px; right:0px;"><img src="Images/PadraoNovoBotoes/22x22/actions/stop.png" alt="Fecha" style="cursor:pointer;" onClick="ocultaPopup()"></div>
	<div id="divpopupB" style="overflow:hidden; width:100%; height:90%; position:absolute;">
		<iframe id="framepopup" frameborder="0" width="100%" height="100%" scrolling="auto" src=""></iframe>
	</div>
</div>

<script language="javascript" type="text/javascript">
function exibePopup(elemento){
	a = document.getElementById(elemento);
	b = a.getAttribute("titulo");
	f = a.getAttribute("pagina");
	c = document.getElementById("divpopupH");
	d = document.getElementById("divpopup");
	e = document.getElementById("framepopup");
	
	d.style.visibility="visible";
	d.style.width="50%";
	d.style.height="50%";
	d.style.top="20%";
	d.style.left="20%";
	c.innerHTML = b;
	e.src=f;
}

function ocultaPopup(){
	c = document.getElementById("divpopupH");
	d = document.getElementById("divpopup");
	e = document.getElementById("framepopup");
	
	d.style.visibility="hidden";
	d.style.width="0%";
	d.style.height="0%";
	d.style.top="0%";
	d.style.left="0%";
	c.innerHTML = "";
	e.src="";
}

</script>