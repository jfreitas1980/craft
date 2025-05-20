    <meta http-equiv="cache-control"   content="no-cache" />
    <meta http-equiv="pragma" content="no-cache" />
    <link rel="stylesheet" href="/wvdf_bib/bootstrap/dist/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="/wvdf_bib/css/webapp.css" />
    <link rel="stylesheet" href="/wvdf_bib/stylesheet/stylesheet.css" />
    <link rel="stylesheet" href="/wvdf_bib/stylesheet/third/jquery.ui/redmond/jquery-ui-1.8.15.custom.css" /> 
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="assets/css/ace.min.css">
	<link rel="stylesheet" href="assets/css/ace-skins.min.css">
	<link rel="stylesheet" href="/wvdf_bib/css/jquery.fancybox.css?v=2.1.5" />
	<script src="/wvdf_bib/Js/jquery-2.1.4.min.js"></script>
    <script src="/wvdf_bib/scripts/third/jquery.ui/jquery-ui-1.8.16.custom.min.js"></script>    
	<script src="/wvdf_bib/scripts/third/jshotkeys/jquery.hotkeys.js"></script>
	<script src="/wvdf_bib/scripts/functions.js"></script>
    <script src="/wvdf_bib/Js/ts_picker.js"></script>
	
	<script language="javascript">
		function printdiv(printpage)
		{
			var headstr = "<html><head><title></title></head><body>";
			var footstr = "</body>";
			var newstr  = document.all.item(printpage).innerHTML;
			var oldstr  = document.body.innerHTML;
			document.body.innerHTML = headstr+newstr+footstr;
			window.print();
			document.body.innerHTML = oldstr;
			return false;
		}
	</script>