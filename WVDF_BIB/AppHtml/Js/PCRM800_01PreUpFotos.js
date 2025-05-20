$(document).ready(function () {
	$('#enviaArquivo').ace_file_input({
		no_file: 'Sem Arquivo...',
		btn_choose: 'Escolher',
		btn_change: 'Mudar',
		droppable: false,
		onchange: null,
		thumbnail: false
	});
});
