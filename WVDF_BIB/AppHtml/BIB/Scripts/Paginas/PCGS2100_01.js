$(document).ready(function() {
	$('#hcgs2100__dthr_abertura').datetimepicker({
		lang: 'en',
		step: 10,
		format:'d/m/Y H:i:00'
	});
	
	
	
	//blur
    $('#hcgs2100__usuarioecodigo').blur(function(){
    		if ($('#hcgs2100__usuarioecodigo').val() == undefined) {
    			parent.parent.alertify.error("Escolha uma Marca");
                return;
    		}
            monta_usuario();
    }); // $('#hcgs2100__usuarioecodigo').blur
	
	//blur
    $('#hcgs2100__usuarionumero').blur(function(){
            monta_grupo();
    }); // $('#hcgs2100__usuarioecodigo').blur
	
	
});

function monta_usuario(){
	
	var aMarca = $('#hcgs2100__usuarioecodigo option:selected').val();
	var aUsuario = $('#hcgs2100_usuarionumero').val();
	var aUsuarioSessao = $('#jaUsuarioSessao').val();
	
	var sRetorno = ReadFuncValue('hcgs2100__usuarionumero'+'","'+aMarca+'","'+aUsuario+'","'+aUsuarioSessao,"oPCGS2100_02","Get_fcsag300_usuariocombo_p");
	
	$('#jsusuario').html(sRetorno);
	
	$('#hcgs2100__usuarionumero').blur(function(){
            monta_grupo();
    }); // $('#hcgs2100__usuarioecodigo').blur
	
 }
 
 
 function monta_grupo(){
	
	var aUsuario = $('#hcgs2100__usuarionumero option:selected').val();
	var aGrupo = $('#hcgs2100_csag332_id').val();
	var aUsuarioSessao = $('#jaUsuarioSessao').val();
	
	var sRetorno = ReadFuncValue('hcgs2100__csag332_id'+'","'+aUsuario+'","'+aGrupo+'","'+aUsuarioSessao,"oPCGS2100_02","Get_fcsag332_grupocombo_p");
	
	$('#jsgrupo').html(sRetorno);
	
 }
 
 