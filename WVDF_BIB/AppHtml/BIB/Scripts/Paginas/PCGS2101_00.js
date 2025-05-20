$(document).ready(function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
	
	$("#ifrm-pcgs2101_01").attr({
		"src" : "PCGS2101_02.asp?RunReport=1&aUsuarioSessao=" + getVariavelURL('aUsuarioSessao') + "&aCSAG320Id=" + getVariavelURL('aCSAG320Id') 
	});
	
	
	
});

