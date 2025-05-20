// FORMATA A PAGINA
$(document).ready(function () {
	$('#selstart6').mask('99/99/9999').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	
	$('#selstop6').mask('99/99/9999').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	
	$('#selstart7').mask('99/99/9999').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	
	$('#selstop7').mask('99/99/9999').datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "dd/mm/yy"
	});
	
	$('#Index').removeClass('col-xs-6').addClass('form-control');
	
	
	//blur
    $('#Selstart1').blur(function(){
            monta_usuario();
			monta_grupo();
    }); // $('#Selstart1').blur
	
	//blur
    $('#Selstart3').blur(function(){
            monta_grupo();
    }); // $('#Selstart3').blur
	
	if (getVariavelURL('RunReport') == 'RunReport' || getVariavelURL('RunReport') == '1') {
		if ($('#botoesReportFinal').is(':empty')) {
			$('#botoesReportFinal').html($('#botoesReportAux').html());
			$('#botoesReportAux').empty();
		}
		
		$('#nextPageFinal').attr('href', $('#nextPageAux').val());

	};
	
});


function monta_usuario(){
	
	var aMarca = $('#Selstart1 option:selected').val();
	var aUsuario = $('#Selstart3_1').val();
	var aUsuarioSessao = $('#jaUsuarioSessao').val();
	
	var sRetorno = ReadFuncValue('Selstart3'+'","'+aMarca+'","'+aUsuario+'","'+aUsuarioSessao,"oPCGS2100_02","Get_fcsag300_usuariocombo_p");
	
	$('#jsusuario').html(sRetorno);
	
	$('#Selstart3').blur(function(){
            monta_grupo();
    }); // $('#hcgs2100__usuarioecodigo').blur
	
 }
 
 
 function monta_grupo(){
	
	var aUsuario = $('#Selstart3 option:selected').val();
	var aGrupo = $('#Selstar4_1').val();
	var aUsuarioSessao = $('#jaUsuarioSessao').val();
	
	var sRetorno = ReadFuncValue('Selstar4'+'","'+aUsuario+'","'+aGrupo+'","'+aUsuarioSessao,"oPCGS2100_02","Get_fcsag332_grupocombo_p");
	
	$('#jsgrupo').html(sRetorno);
	
 }
 
 
 