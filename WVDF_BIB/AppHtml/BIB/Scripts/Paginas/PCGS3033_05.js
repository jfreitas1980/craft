$(document).ready(function () {
	var listas = $('#listaDupla_esquerda').bootstrapDualListbox({
		nonSelectedListLabel: '<b>Taxas do Produto</b>',
		selectedListLabel: '<b>Taxas Acordadas</b>',
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
				url: '/WVDF_WS/ws_hcgs3034.wso/f_AtualizaHCGS3034/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aHCGS3033_ID': getVariavelURL('sHCGS3033'),
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
				url: '/WVDF_WS/ws_hcgs3034.wso/f_AtualizaHCGS3034/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'aHCGS3033_ID': getVariavelURL('sHCGS3033'),
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
			url: '/WVDF_WS/ws_HCGS3034.wso/f_PesquisaHCGS3034/JSON',
			type: 'POST',
			 data: { 
				'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
				'aHCGS3033_ID': getVariavelURL('sHCGS3033')
			},
			dataType: 'json',
			success: function(json) {
				$.each(json, function(i, value) {
					var selecionado = false;
					
					if (value.SEL == 1)
						selecionado = true;
					
					listas.append($('<option>').text(value.DS).attr('value', value.ID + '|' + value.Classe + '|' + value.ID_34).attr('selected', selecionado));
					//listas.bootstrapDualListbox('refresh');
				});
				
				listas.bootstrapDualListbox('refresh', true);
			}
		});
	}
});