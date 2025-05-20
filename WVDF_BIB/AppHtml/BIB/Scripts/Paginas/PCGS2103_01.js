var aHCGS2102Id;

$(document).ready(function() {
	if ($('#hcgs2103__rowid').val() == "") {
		$('#btnGed').hide();
	}
	
	url = "HGED4001_03.asp?aUsuarioSessao="+getVariavelURL('aUsuarioSessao')+"&Nm_Tabela=HCGS2103&Id_Registro="+$('#hcgs2103__rowid').val()+"&Nm_Campo=rowid";
	
	$('#iframeUpload').attr('src', url);
});

function showErrorAlert (reason, detail) {
	var msg='';
	if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
	else {
		console.log("error uploading file", reason, detail);
	}
	$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
	 '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
}

$(document).on('change', '#switch-CLIENTE_VISUALIZA_checkbox', function() {
	configuraSwitchs($(this).prop('checked').toString(), $(this), 'hcgs2103__cliente_visualiza');
});