var jsOK = 1;
var jCsag320Id;

// FORMATAR PAGINA
$('document').ready( function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
	jCsag320Id = $('#jCsag320Id').val();
	$("#csag350__csag320_id").val(jCsag320Id);
	
	var valorRadio = $("input[name='csag350__principal']:checked").val();
	
	if (valorRadio == "P") {
		$('#switch-telefone').prop("checked", true);
	} else {
		$('#switch-telefone').prop("checked", false);
	}
	//$('#switch-telefone').prop("checked", true);
	//$("input[name='csag350__principal']:checked").val();

	$('#csag350__observacao').blur(function(){
		TextAreaLimite(this,1022);
	});
});
	
$(document).on('change', '#switch-telefone', function() {
	var valorSwitch = $('#switch-telefone').prop("checked");
	
	if (valorSwitch) {
		$('input[name="csag350__principal"][value="P"]').prop('checked', true);
	} else {
		$('input[name="csag350__principal"][value="N"]').prop('checked', true)
	}
});