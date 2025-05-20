var jsOK = 1;
var jCsag320Id;

// PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
// FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
$('document').ready( function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
	jCsag320Id = $('#jCsag320Id').val();
	$("#csag347__csag320_id").val(jCsag320Id);
	
	// CONFIGURA SWITCHS
	switchAereo("");
	switchMaritimo("");
	switchRodoviario("");
	switchCabotagem("");
	switchFerroviario("");
	switchImo("");
	switchImp("");
	switchExp("");
	switchDom("");
	
	// ESCONDE BOTÃO NOVO E PESQUISAR.
	$('#btnNovo').hide();
	$('#btnPesquisar').hide();

	$('#csag347__observacao').blur(function(){
		TextAreaLimite(this,1022);
	});
});

// SWITCH AEREO
$(document).on('change', '#switchAereo', function() {
	$(this).prop("checked") ? switchAereo("S") : switchAereo("N");
});
function switchAereo(sTexto) {
	if (sTexto != "") {
		(sTexto == "S") ? $('#switchAereo').prop("checked", true) : $('#switchAereo').prop("checked", false);
		$('#csag347__modal_aereo').val(sTexto);
	} else {
		if ($('#csag347__modal_aereo').val() != "") {
			switchAereo($('#csag347__modal_aereo').val());
		} else {
			switchAereo($('#csag347__modal_aereo').val("N").val());
		}
	}
}

// SWITCH MARITIMO
$(document).on('change', '#switchMaritimo', function() {
	$(this).prop("checked") ? switchMaritimo("S") : switchMaritimo("N");
});
function switchMaritimo(sTexto) {
	if (sTexto != "") {
		(sTexto == "S") ? $('#switchMaritimo').prop("checked", true) : $('#switchMaritimo').prop("checked", false);
		$('#csag347__modal_maritimo').val(sTexto);
	} else {
		if ($('#csag347__modal_maritimo').val() != "") {
			switchMaritimo($('#csag347__modal_maritimo').val());
		} else {
			switchMaritimo($('#csag347__modal_maritimo').val("N").val());
		}
	}
}

// SWITCH RODOVIARIO
$(document).on('change', '#switchRodoviario', function() {
	$(this).prop("checked") ? switchRodoviario("S") : switchRodoviario("N");
});
function switchRodoviario(sTexto) {
	if (sTexto != "") {
		(sTexto == "S") ? $('#switchRodoviario').prop("checked", true) : $('#switchRodoviario').prop("checked", false);
		$('#csag347__modal_rodoviario').val(sTexto);
	} else {
		if ($('#csag347__modal_rodoviario').val() != "") {
			switchRodoviario($('#csag347__modal_rodoviario').val());
		} else {
			switchRodoviario($('#csag347__modal_rodoviario').val("N").val());
		}
	}
}

// SWITCH CABOTAGEM
$(document).on('change', '#switchCabotagem', function() {
	$(this).prop("checked") ? switchCabotagem("S") : switchCabotagem("N");
});
function switchCabotagem(sTexto) {
	if (sTexto != "") {
		(sTexto == "S") ? $('#switchCabotagem').prop("checked", true) : $('#switchCabotagem').prop("checked", false);
		$('#csag347__modal_cabotagem').val(sTexto);
	} else {
		if ($('#csag347__modal_cabotagem').val() != "") {
			switchCabotagem($('#csag347__modal_cabotagem').val());
		} else {
			switchCabotagem($('#csag347__modal_cabotagem').val("N").val());
		}
	}
}

// SWITCH FERROVIARIO
$(document).on('change', '#switchFerroviario', function() {
	$(this).prop("checked") ? switchFerroviario("S") : switchFerroviario("N");
});
function switchFerroviario(sTexto) {
	if (sTexto != "") {
		(sTexto == "S") ? $('#switchFerroviario').prop("checked", true) : $('#switchFerroviario').prop("checked", false);
		$('#csag347__modal_ferroviario').val(sTexto);
	} else {
		if ($('#csag347__modal_ferroviario').val() != "") {
			switchFerroviario($('#csag347__modal_ferroviario').val());
		} else {
			switchFerroviario($('#csag347__modal_ferroviario').val("N").val());
		}
	}
}

// SWITCH IMO
$(document).on('change', '#switchImo', function() {
	$(this).prop("checked") ? switchImo("S") : switchImo("N");
});
function switchImo(sTexto) {
	if (sTexto != "") {
		(sTexto == "S") ? $('#switchImo').prop("checked", true) : $('#switchImo').prop("checked", false);
		$('#csag347__carga_imo').val(sTexto);
	} else {
		if ($('#csag347__carga_imo').val() != "") {
			switchImo($('#csag347__carga_imo').val());
		} else {
			switchImo($('#csag347__carga_imo').val("N").val());
		}
	}
}

// SWITCH IMP
$(document).on('change', '#switchImp', function() {
	$(this).prop("checked") ? switchImp("S") : switchImp("N");
});
function switchImp(sTexto) {
	if (sTexto != "") {
		(sTexto == "S") ? $('#switchImp').prop("checked", true) : $('#switchImp').prop("checked", false);
		$('#csag347__operacao_imp').val(sTexto);
	} else {
		if ($('#csag347__operacao_imp').val() != "") {
			switchImp($('#csag347__operacao_imp').val());
		} else {
			switchImp($('#csag347__operacao_imp').val("N").val());
		}
	}
}

// SWITCH EXP
$(document).on('change', '#switchExp', function() {
	$(this).prop("checked") ? switchExp("S") : switchExp("N");
});
function switchExp(sTexto) {
	if (sTexto != "") {
		(sTexto == "S") ? $('#switchExp').prop("checked", true) : $('#switchExp').prop("checked", false);
		$('#csag347__operacao_exp').val(sTexto);
	} else {
		if ($('#csag347__operacao_exp').val() != "") {
			switchExp($('#csag347__operacao_exp').val());
		} else {
			switchExp($('#csag347__operacao_exp').val("N").val());
		}
	}
}

// SWITCH DOM
$(document).on('change', '#switchDom', function() {
	$(this).prop("checked") ? switchDom("S") : switchDom("N");
});
function switchDom(sTexto) {
	if (sTexto != "") {
		(sTexto == "S") ? $('#switchDom').prop("checked", true) : $('#switchDom').prop("checked", false);
		$('#csag347__operacao_dom').val(sTexto);
	} else {
		if ($('#csag347__operacao_dom').val() != "") {
			switchDom($('#csag347__operacao_dom').val());
		} else {
			switchDom($('#csag347__operacao_dom').val("N").val());
		}
	}
}