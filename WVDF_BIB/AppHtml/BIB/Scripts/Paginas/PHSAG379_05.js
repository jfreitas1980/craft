$(document).ready(function () {
	var listas = $('#listaDupla_esquerda').bootstrapDualListbox({
		nonSelectedListLabel: '<b>Cidades</b>',
		selectedListLabel: '<b>Cidades Atreladas</b>',
		infoTextEmpty: '',
		infoText: false,
		filterPlaceHolder: 'Pesquisar...'
	});
	
	$(document).on('click', '#btnPesquisar', function() {
		if ($('#listaTrade').val() == "0") {
			parent.parent.alertify.error("Escolha uma Trade");
            return;
		}

		if ($('#listaPais').val() == "0") {
			parent.parent.alertify.error("Escolha um Pais");
            return;
		}
		
		listas.empty();
		$('input[type="text"]').val('');
		
		$.ajax({
			url: '/WVDF_WS/ws_hsag379.wso/f_PesquisaHSAG379/JSON',
			type: 'POST',
			 data: { 
				'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
				'aTrade': $('#listaTrade').val(),
				'aPais': $('#listaPais').val()
			},
			dataType: 'json',
			success: function(json) {
				$.each(json, function(i, value) {
					//var selecionado = false;
					//if (value.SEL == 1)selecionado = true;
					
					listas.append($('<option>').text(value.DS).attr('value', value.ID).attr('selected', value.SEL == 1 ? true : false));
					//listas.bootstrapDualListbox('refresh');
				});
				
				listas.bootstrapDualListbox('refresh', true);
			}
		});
	});
	
	$(document).on('change', '#listaDupla_esquerda', function() {
		var valoresMarcados = $(this).val();
		
		if (valoresMarcados != null) {
			$.ajax({
				type: 'POST',
				url: '/WVDF_WS/ws_hsag379.wso/f_AtualizaHSAG379/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aTrade': $('#listaTrade').val(),
					'aPais': $('#listaPais').val(),
					'aRANGE': "" + valoresMarcados + ""
				},
				dataType: 'json',
				success: function(json) {
					console.log("WS Retornou: " + json);
				}
			});
		} else {
			$.ajax({
				type: 'POST',
				url: '/WVDF_WS/ws_hsag379.wso/f_AtualizaHSAG379/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aTrade': $('#listaTrade').val(),
					'aPais': $('#listaPais').val(),
					'aRANGE': ""
				},
				dataType: 'json',
				success: function(json) {
					console.log("WS Retornou: " + json);
				}
			});
		}
		
	})
});

