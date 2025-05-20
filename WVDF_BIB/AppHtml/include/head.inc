	<meta http-equiv="cache-control"   content="no-cache" />
	<meta http-equiv="pragma" content="no-cache" />
	<link rel="stylesheet" href="/wvdf_bib/bootstrap/dist/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="/wvdf_bib/css/webapp.css" />
	<link rel="stylesheet" href="/wvdf_bib/stylesheet/stylesheet.css" />
	<link rel="stylesheet" href="/wvdf_bib/css/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="/wvdf_bib/BIB/Template/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" />
	<link rel="stylesheet" href="assets/css/ace-skins.min.css">
	<link rel="stylesheet" href="/wvdf_bib/scripts/third/jquery-ui-1.11.4/jquery-ui.min.css">
	<script src="/wvdf_bib/scripts/third/jquery-1.11.3.min.js"></script>
	<script src="/wvdf_bib/scripts/third/jquery-ui-1.11.4/jquery-ui.min.js"></script>    
	<script src="/wvdf_bib/scripts/third/jshotkeys/jquery.hotkeys.js"></script>
	<script src="/wvdf_bib/scripts/functions.js"></script>
	<script src="/wvdf_bib/scripts/init.js"></script>
	<script src="/wvdf_bib/Js/ts_picker.js"></script>
	<script src="/wvdf_bib/scripts/third/fancybox/jquery.fancybox.pack.js?v=2.1.5"></script>
	<script src="assets/js/ace.min.js"></script>
	<script src="assets/js/ace-elements.min.js"></script>
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