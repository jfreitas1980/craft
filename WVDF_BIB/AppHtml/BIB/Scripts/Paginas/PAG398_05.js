$(document).ready(function () {
	var listas = $('#listaDupla_esquerda').bootstrapDualListbox({
		nonSelectedListLabel: '<b>Usu&aacute;rio</b>',
		selectedListLabel: '<b>Usu&aacute;rio/Privil&eacute;gio</b>',
		infoTextEmpty: '',
		infoText: false,
		filterPlaceHolder: 'Pesquisar...'
	});
	
	$(document).on('click', '#btnPesquisar', function() {
		if ($('#listaUsuarios').val() != "0") {
			listas.empty();
			$('input[type="text"]').val('');
			
			$.ajax({
				url: '/WVDF_WS/ws_csag398.wso/f_PesquisaCSAG398/JSON',
				type: 'POST',
				 data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
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
				url: '/WVDF_WS/ws_csag398.wso/f_AtualizaCSAG398/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
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
				url: '/WVDF_WS/ws_csag398.wso/f_AtualizaCSAG398/JSON',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
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

