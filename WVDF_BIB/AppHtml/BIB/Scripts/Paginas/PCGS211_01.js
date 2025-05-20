$(document).ready(function() {
	configuraStatus(1);

	$('#ccgs211__observacao').blur(function(){
		TextAreaLimite(this,1022);
	});
});

// CONFIGURA STATUS
$(document).on('click', '#switch-STATUS_checkbox', function() {
	configuraStatus(2);
});		

function configuraStatus(idChamada) {
	var valCampo = $('#ccgs211__status');
	var checkbox = $('#switch-STATUS_checkbox');
	
	if (idChamada == 1) {
		(valCampo.val() == "A") ? checkbox.prop("checked", true) : checkbox.prop("checked", false);
	} else {
		(checkbox.prop("checked")) ? valCampo.val("A") : valCampo.val("I");
	}
}