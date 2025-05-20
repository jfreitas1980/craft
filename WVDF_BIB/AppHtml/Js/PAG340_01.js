var jsOK = 1;
var jCsag320Id;
var vUsuarioSessao = $('#jaUsuarioSessao').val();


// PADRAO: A FUNCAO ABAIXO TEM POR DEFINI√á√ÉO
// FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
$('document').ready( function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
    var aCSAG340_CODIGO = $('#csag340__codigo').val();
	//$("#ifrm-phsag340_03").attr({
	//	"src" : "phsag340_03.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG340Id=" + aCSAG340_CODIGO
	//});
	$("#modal-grp_clientes").attr({
		"href" : "phsag340_03.asp?aUsuarioSessao=" + vUsuarioSessao + "&aCSAG340Id=" + aCSAG340_CODIGO
	});
	jCsag320Id = $('#jCsag320Id').val();
	$("#csag340__csag320_id").val(jCsag320Id);
	
	$('#csag340__situacao').removeClass('col-xs-6').addClass('col-xs-5');
	$('#csag340__situacao_dthr').height(16);
	
	// CONFIGURA ATIVO/INATIVO RECEITA FEDERAL
	var valCampo = $('#csag340__ativo_inativo_rf').val();
	
	if (valCampo == "A") {
		$('#switch-ATIVO_INATIVO_RF_checkbox').prop("checked", true);
	} else {
		$('#switch-ATIVO_INATIVO_RF_checkbox').prop("checked", false);
	}
						
	$('#switch-ATIVO_INATIVO_RF_checkbox').click(function() {
		var valCampo = $('#switch-ATIVO_INATIVO_RF_checkbox').prop("checked");
		if (valCampo) {
			$('#csag340__ativo_inativo_rf').prop("value", "A");
		} else {
			$('#csag340__ativo_inativo_rf').prop("value", "I");
		}
	});
	
	// CONFIGURA IFF
	var valCampo = $('#csag340__iff').val();
	
	if (valCampo == "Y") {
		$('#switch-IFF_checkbox').prop("checked", true);
	} else {
		$('#switch-IFF_checkbox').prop("checked", false);
	}
						
	$('#switch-IFF_checkbox').click(function() {
		var valCampo = $('#switch-IFF_checkbox').prop("checked");
		if (valCampo) {
			$('#csag340__iff').prop("value", "Y");
		} else {
			$('#csag340__iff').prop("value", "N");
		}
	});
	
	// CONFIGURA KEY ACCOUNT
	var valCampo = $('#csag340__key_account').val();
	
	if (valCampo == "Y") {
		$('#switch-KEY_ACCOUNT_checkbox').prop("checked", true);
	} else {
		$('#switch-KEY_ACCOUNT_checkbox').prop("checked", false);
	}
						
	$('#switch-KEY_ACCOUNT_checkbox').click(function() {
		var valCampo = $('#switch-KEY_ACCOUNT_checkbox').prop("checked");
		if (valCampo) {
			$('#csag340__key_account').prop("value", "Y");
		} else {
			$('#csag340__key_account').prop("value", "N");
		}
	});
	
	// CONFIGURA BLUE BOOK
	var valCampo = $('#csag340__blue_book').val();
	
	if (valCampo == "Y") {
		$('#switch-BLUE_BOOK_checkbox').prop("checked", true);
		$('#tr-blue_book').show();
	} else {
		$('#switch-BLUE_BOOK_checkbox').prop("checked", false);
		$('#tr-blue_book').hide();
	}
						
	$('#switch-BLUE_BOOK_checkbox').click(function() {
		var valCampo = $('#switch-BLUE_BOOK_checkbox').prop("checked");
		if (valCampo) {
			$('#csag340__blue_book').prop("value", "Y");
			$('#tr-blue_book').fadeIn();
		} else {
			$('#csag340__blue_book').prop("value", "N");
			$('#tr-blue_book').fadeOut();
		}
	});
	
	// CONFIGURA GRUPO DE CLIENTES
	var valCampo = $('#csag340__grp_clientes').val();
	
	if (valCampo == "Y") {
		$('#switch-GRP_CLIENTES_checkbox').prop("checked", true);
		$('#modal-grp_clientes').show();
	} else {
		$('#switch-GRP_CLIENTES_checkbox').prop("checked", false);
		$('#modal-grp_clientes').hide();
	}
						
	$('#switch-GRP_CLIENTES_checkbox').click(function() {
		var valCampo = $('#switch-GRP_CLIENTES_checkbox').prop("checked");
		if (valCampo) {
			$('#csag340__grp_clientes').prop("value", "Y");
			$('#modal-grp_clientes').fadeIn();
		} else {
			$('#csag340__grp_clientes').prop("value", "N");
			$('#modal-grp_clientes').fadeOut();
		}
	});
	
	// CONFIGURA BLACKLIST
	var valCampo = $('#csag340__backlist').val();
	
	if (valCampo == "Y") {
		$('#switch-BACKLIST_checkbox').prop("checked", true);
	} else {
		$('#switch-BACKLIST_checkbox').prop("checked", false);
	}
						
	$('#switch-BACKLIST_checkbox').click(function() {
		var valCampo = $('#switch-BACKLIST_checkbox').prop("checked");
		if (valCampo) {
			$('#csag340__backlist').prop("value", "Y");
		} else {
			$('#csag340__backlist').prop("value", "N");
		}
	});

	$('#btn-SAVE').click(function(){
	   jsSalvar(0);
	});
	
	// PREPARAR O MODAL DOS CLIENTES
	$("#modal-grp_clientes").fancybox({
		fitToView	: true,
		width		: '50%',
		height		: '50%',
		autoSize	: false,
		modal		: false,
		afterClose	:  function () { $('#btn-SAVE').click(); $('#popup_ok').click(); }
	});


	
  // FAZ COM QUE O BOTAO SAVE NAO SEJA EXIBIDO NA TELA
  // SE O RECNUM ESTIVER IGUAL A ZERO.
  if ($('#aCI').val()!=1) {
	  if ($('#btn-SAVE').is(':visible')) {
		  $('#btn-SAVE').hide(); 
	  }
  }
  else {
	  if ($('#btn-SAVE').is(':visible')) {}
	  else {
		  $('#btn-SAVE').show(); 
	  }
  }
	
	
  // FAZ COM QUE O BOTAO SAVE NAO SEJA EXIBIDO NA TELA
  // SE O RECNUM ESTIVER IGUAL A ZERO.
  if ($('#aCE').val()!=1) {
	  if ($('#btn-EXCLUIR').is(':visible')) {
		  $('#btn-EXCLUIR').hide(); 
	  }
  }
  else {
	  if ($('#btn-EXCLUIR').is(':visible')) {}
	  else {
		  $('#btn-EXCLUIR').show(); 
	  }
  }
	
});

function retiraAcento(palavra)  
{  
	com_acento = '·‡„‚‰ÈËÍÎÌÏÓÔÛÚıÙˆ˙˘˚¸Á¡¿√¬ƒ…» ÀÕÃŒœ”“’÷‘⁄Ÿ€‹«';  
	sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';  
	nova='';  
	for(i=0;i<palavra.length;i++) {  
		if (com_acento.search(palavra.substr(i,1))>=0) {  
			nova+=sem_acento.substr(com_acento.search(palavra.substr(i,1)),1);  
		} else {  
			nova+=palavra.substr(i,1);  
		}  
	}  
	return nova.toUpperCase();  
}  
        