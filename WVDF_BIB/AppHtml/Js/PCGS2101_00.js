// PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
// FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
 $('document').ready(function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
 });
var paginas = 5;
$(document).on('click', '#vaiPg', function() {
	var paginaAtual = $('#paginaAtual').val();
	var idFrame = $('#step' + paginaAtual);
	var idBarra = $('#barra' + paginaAtual);
	
	idFrame.removeClass("active");
	idFrame = $('#step' + (parseInt(paginaAtual) + parseInt(1)));
	idFrame.addClass("active");
	
	idBarra.addClass("complete").removeClass("active");
	idBarra = $('#barra' + (parseInt(paginaAtual) + parseInt(1)));
	idBarra.addClass("active");
	
	$('#paginaAtual').val(parseInt($('#paginaAtual').val()) + 1);
	
	if (paginaAtual == 1) {
		$('#voltaPg').prop("disabled", false);
	}
	if (paginaAtual == 4) {
		$(this).prop("disabled", true);
	}
	
});

$(document).on('click', '#voltaPg', function() {
	var paginaAtual = $('#paginaAtual').val();
	var idFrame = $('#step' + paginaAtual);
	var idBarra = $('#barra' + paginaAtual);
	
	idFrame.removeClass("active");
	idFrame = $('#step' + (parseInt(paginaAtual) - parseInt(1)));
	idFrame.addClass("active");

	idBarra.removeClass("active");
	idBarra = $('#barra' + (parseInt(paginaAtual) - parseInt(1)));
	idBarra.removeClass("complete").addClass("active");
	idBarra = $('#barra' + (parseInt(paginaAtual) - parseInt(2)));
	idBarra.removeClass("active").addClass("complete");
	
	$('#paginaAtual').val(parseInt($('#paginaAtual').val()) - 1);
	
	if (paginaAtual == 4) {
		$('#vaiPg').prop("disabled", false);
	}
	if (paginaAtual == 2) {
		$(this).prop("disabled", true);
	}
});


