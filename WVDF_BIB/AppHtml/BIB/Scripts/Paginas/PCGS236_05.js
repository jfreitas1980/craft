$(document).ready(function () {
	var listas = $('#listaDupla_esquerda').bootstrapDualListbox({
		nonSelectedListLabel: '<b>Embarque</b>',
		selectedListLabel: '<b>INCOTERM x Embarque</b>',
		infoTextEmpty: '',
		infoText: false,
		filterPlaceHolder: 'Pesquisar...'
	});
	
	$(document).on('click', '#btnPesquisar', function() {
		if ($('#listaUsuarios').val() != "0") {
			listas.empty();
			$('input[type="text"]').val('');
			
			$.ajax({
				url: '/WVDF_WS/ws_ccgs236.wso/f_PesquisaCCGS236/JSON',
				type: 'POST',
				 data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aINCOTERM_ID': $('#listaIncoterm').val()
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
				url: '/WVDF_WS/ws_ccgs236.wso/f_AtualizaCCGS236/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aINCOTERM_ID': $('#listaIncoterm').val(),
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
				url: '/WVDF_WS/ws_ccgs236.wso/f_AtualizaCCGS236/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aINCOTERM_ID': $('#listaIncoterm').val(),
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

