$(document).ready(function () {
	var listas = $('#listaDupla_esquerda').bootstrapDualListbox({
		nonSelectedListLabel: '<b>Grupos</b>',
		selectedListLabel: '<b>Grupos/Menus</b>',
		infoTextEmpty: '',
		infoText: false,
		filterPlaceHolder: 'Pesquisar...'
	});
	
	$(document).on('click', '#btnPesquisar', function() {
		if ($('#listaGrupos').val() != "0") {
			listas.empty();
			$('input[type="text"]').val('');
			
			$.ajax({
				url: '/WVDF_WS/ws_csag333.wso/f_PesquisaCSAG333/JSON',
				type: 'POST',
				 data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aCSAG332_ID': $('#listaGrupos').val()
				},
				dataType: 'json',
				success: function(json) {
					$.each(json, function(i, value) {
						var selecionado = false;
						
						if (value.SEL == 1)
							selecionado = true;
						
						listas.append($('<option>').text(value.DS).attr('value', value.ID).attr('selected', selecionado));
						//listas.bootstrapDualListbox('refresh');
					});
					
					listas.bootstrapDualListbox('refresh', true);
				}
			});
		}
	});
	
	$(document).on('change', '#listaDupla_esquerda', function() {
		var valoresMarcados = $(this).val();
		
		if (valoresMarcados != null) {
			$.ajax({
				type: 'POST',
				url: '/WVDF_WS/ws_csag333.wso/f_AtualizaCSAG333/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aCSAG332_ID': $('#listaGrupos').val(),
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
				url: '/WVDF_WS/ws_csag333.wso/f_AtualizaCSAG333/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aCSAG332_ID': $('#listaGrupos').val(),
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

