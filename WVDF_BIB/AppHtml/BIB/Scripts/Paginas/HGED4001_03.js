// FORMATA A PAGINA
$(document).ready(function() {
	$('#dialogs').dialog({
		autoOpen: false,
		width: 360,
		height: 260,
		modal: true,
		hide: 'clip',
		close: function( event, ui ) {
			$('#dialogs').children().hide();
		}
	});
	
	// Lista arquivos
	listaArquivos();
	
	// Configuração do uploadify
	$('#fileInput').uploadify({
		'removeCompleted': false,
		'auto'			 : false,
		'swf'			 : 'uploadify/uploadify.swf',
		'folder'         : getVariavelURL('Nm_Tabela'),
		'buttonClass' 	 : true,
		'multi'			 : true,
		'buttonText'	 : 'Buscar',
		'uploader'		 : 'envioGed.asp?Nm_Tabela='+getVariavelURL('Nm_Tabela')+'&Id_Registro='+getVariavelURL('Id_Registro'),
		onUploadError	 : function (a, b, c, d) {
			console.log('erro');
		},
		onUploadSuccess	: function(file, data, response) {
			$.ajax({
				url: '/WVDF_WS/ws_HGED4001.wso/f_HGED4001_arq/JSON',
				type: 'POST',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'), 
					'sTABELA_NOME': getVariavelURL('Nm_Tabela'),
					'sTABELA_ID': getVariavelURL('Id_Registro'),
					'sTABELA_FIELD': getVariavelURL('Nm_Campo'),
					'sNOME_ARQ': file.name,
					'sPATH': (data + '\\' + file.name)
				},
				dataType: 'json',
				success: function(json) {
					listaArquivos();
				}
			});
		}
	});
	
	$(document).on('click', '#btnExcluir', function() {
		$.ajax({
			url: '/WVDF_WS/ws_HGED4001.wso/f_HGED4001_del/JSON',
			type: 'POST',
			data: { 
				'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
				'sHGED4001_CODIGO': $(this).attr('idArquivo')
			},
			dataType: 'json',
			success: function(json) {
				alertify.success('Arquivo excluido com sucesso.');
				$("#tabela > tbody").html("");
				listaArquivos();
			}
		});
	});
	
	$(document).on('click', '#btnSalvarInfo', function() {
		$.ajax({
			url: '/WVDF_WS/ws_HGED4001.wso/f_HGED4001_obs/JSON',
			type: 'POST',
			data: { 
				'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
				'sHGED4001_CODIGO': $('#modalInformacoes').find('#idArquivoEmail').val(),
				'sASSUNTO': $('#modalInformacoes').find('#assunto').val(),
				'sOBS': $('#modalInformacoes').find('#observacao').val()
			},
			dataType: 'json',
			success: function(json) {
				alertify.success('Informa&ccedil;&otilde;es alteradas com sucesso.');
				$("#tabela > tbody").html("");
				listaArquivos();
			}
		});
	});
	
	$(document).on('click', '#btnDownload', function() {
		var a = $('<a>')
			.attr('href', 'FILES/' + getVariavelURL('Nm_Tabela') + '/ID_' + getVariavelURL('Id_Registro') + '/' + $(this).attr('nomeArquivo'))
			.attr('download', '')
			.appendTo('body');
		
		a[0].click();
		a.remove();
    });
	
	$(document).on('click', '#btnEnviarEmail', function() {
		if ($('#emailPara').val() != "" && $('#emailAssunto').val() != "") {
			$.ajax({
				url: '/WVDF_WS/ws_LOGMAIL.wso/f_registra_LOGMAIL/JSON',
				type: 'POST',
				data: { 
					'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
					'sTo': $('#emailPara').val(),
					'sCC': $('#emailCC').val(),
					'sBCC': $('#emailCCO').val(),
					'sSubjetc': $('#emailAssunto').val(),
					'sMsg': $('#emailMensagem').val(),
					'sAnexo': $('#idArquivo').val()
				},
				dataType: 'json',
				success: function(json) {
					alertify.success(json);
				}
			});
			
			$('#btnCancelarEmail').click();
			return;
		}		
		alertify.error("Preencha os campos necessários!");
	});
	
	$('#modalInformacoes').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget); // Button that triggered the modal
		var idArquivo = button.data('arquivo'); // Extract info from data-* attributes
		// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
		// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
		var modal = $(this);
		modal.find('#idArquivoEmail').val(idArquivo);
		modal.find('#assunto').val($('#sAssunto-'+idArquivo).text());
		modal.find('#observacao').val($('#sObservacao-'+idArquivo).text());
		modal.find('#modalInformacoesLabel').html('Informa&ccedil;&otilde;es: <b>' + $('#sArquivo-'+idArquivo).text() + '</b>');
	});
	
	$('#modalEmail').on('show.bs.modal', function (event) {
		$('#emailAnexo').attr('readonly', true);
		
		var button = $(event.relatedTarget); // Button that triggered the modal
		var idArquivo = button.data('arquivo'); // Extract info from data-* attributes
		// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
		// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
		var modal = $(this);
		modal.find('#idArquivo').val(idArquivo);
		modal.find('#emailAssunto').val($('#sAssunto-'+idArquivo).text());
		modal.find('#emailAnexo').val(button.data('nome'));
	});
	
	function listaArquivos() {
		$("#tabela > tbody").html("");
		
		$.ajax({
			url: '/WVDF_WS/ws_HGED4001.wso/f_HGED4001_lista/JSON',
			type: 'POST',
			data: { 
				'aUsuarioSessao': getVariavelURL('aUsuarioSessao'),
				'sFUP': '',
				'sTABELA_NM': getVariavelURL('Nm_Tabela'),
				'sTABELA_ID': getVariavelURL('Id_Registro')
			},
			dataType: 'json',
			success: function(json) {
				$.each(json, function(i, value) {
					var id			= value.ID;
					var tipo		= (value.DS.split('.'))[1].toUpperCase();
					var arquivo		= (value.DS.split('.'))[0].toLowerCase();
					var assunto		= value.ASS;
					var observacao  = value.OBS;
					$('#tabela > tbody:last-child').append('<tr id="linhaTabela" idArquivo="'+id+'"><td class="rptC">'+id+'</td><td class="rptR">'+tipo+'</td><td id="sArquivo-'+id+'"class="rptR">'+arquivo+'</td><td id="sAssunto-'+id+'" class="rptR">'+assunto+'</td><td id="sObservacao-'+id+'"class="rptR">'+observacao+'</td><td class="rptC"><span style="cursor: pointer;" class="glyphicon glyphicon-edit" aria-hidden="true" data-toggle="modal" data-target="#modalInformacoes" data-arquivo="'+id+'"></span> <span id="btnEmail" style="cursor:pointer;" class="glyphicon glyphicon-envelope" aria-hidden="true" data-toggle="modal" data-target="#modalEmail" data-arquivo="'+id+'" data-nome="'+value.DS+'"></span> <span id="btnExcluir" style="cursor:pointer;" idArquivo="'+id+'" class="glyphicon glyphicon-remove" aria-hidden="true"></span> <span id="btnDownload" nomeArquivo="'+value.DS+'"  style="cursor:pointer;" class="glyphicon glyphicon-download-alt" aria-hidden="true"></span></td></tr>');
				});
			}
		});
	}
});