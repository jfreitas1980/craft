$(document).ready(function () {
	var listas = $('#listaDupla_esquerda').bootstrapDualListbox({
		nonSelectedListLabel: '<b>Produtos</b>',
		selectedListLabel: '<b>Produtos/Proposta</b>',
		infoTextEmpty: '',
		infoText: false,
		filterPlaceHolder: 'Pesquisar...'
	});
	
	montaLista();

	$(document).on('change', '#listaDupla_esquerda', function() {
		var valoresMarcados = $(this).val();
		
		if (valoresMarcados != null) {
			$.ajax({
				type: 'POST',
				url: '/WVDF_WS/ws_HCGS3011.wso/f_AtualizaHCGS3011/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aHCGS3013_ID': getVariavelURL('idProposta'),
					'aRANGE': "" + valoresMarcados + ""
				},
				dataType: 'json',
				success: function(json) {
					console.log("WS Retornou: " + json);
					montaLista();
				}
			});
		} else {
			$.ajax({
				type: 'POST',
				url: '/WVDF_WS/ws_HCGS3011.wso/f_AtualizaHCGS3011/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aHCGS3013_ID': getVariavelURL('idProposta'),
					'aRANGE': ""
				},
				dataType: 'json',
				success: function(json) {
					console.log("WS Retornou: " + json);
					montaLista();
				}
			});
		}
	});

	function montaLista() {
		listas.empty();
	
		$.ajax({
			url: '/WVDF_WS/ws_HCGS3011.wso/f_PesquisaHCGS3011/JSON',
			type: 'POST',
			 data: { 
				'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
				'aHCGS3013_ID': getVariavelURL('idProposta')
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