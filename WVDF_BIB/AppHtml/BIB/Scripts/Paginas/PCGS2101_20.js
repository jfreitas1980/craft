// PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
// FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
$('document').ready(function () {
	parent.scrollTo(0,0);
	parent.parent.scrollTo(0,0);
	carregaPaginas(1, "");
	
	preencheTextos('1');
});

function preencheTextos(numLingua) {
	$.ajax({
		url: "/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON",
		data: {aIDIOMA: numLingua, aPROGRAMA: 'PCGS207_03'}
	}).success(function(data) {
		$('#t1').text(data.LITERAL_01);
		
		$.ajax({
			url: "/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON",
			data: {aIDIOMA: numLingua, aPROGRAMA: 'PCGS200_03'}
		}).success(function(data) {
			$('#t2').text(data.LITERAL_01);
			
			$.ajax({
				url: "/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON",
				data: {aIDIOMA: numLingua, aPROGRAMA: 'PCGS208_03'}
			}).success(function(data) {
				$('#t3').text(data.LITERAL_01);
				
				$.ajax({
					url: "/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON",
					data: {aIDIOMA: numLingua, aPROGRAMA: 'PCGS201_03'}
				}).success(function(data) {
					$('#t4').text(data.LITERAL_01);
					
					$.ajax({
						url: "/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON",
						data: {aIDIOMA: numLingua, aPROGRAMA: 'PCGS215_03'}
					}).success(function(data) {
						$('#t5').text(data.LITERAL_01);
						
						$.ajax({
							url: "/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON",
							data: {aIDIOMA: numLingua, aPROGRAMA: 'PCGS216_03'}
						}).success(function(data) {
							$('#t6').text(data.LITERAL_01);
							
							$.ajax({
								url: "/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON",
								data: {aIDIOMA: numLingua, aPROGRAMA: 'PCGS210_01'}
							}).success(function(data) {
								$('#t7').text(data.LITERAL_01);
								
								$.ajax({
									url: "/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON",
									data: {aIDIOMA: numLingua, aPROGRAMA: 'PCGS209_03'}
								}).success(function(data) {
									$('#t8').text(data.LITERAL_01);
									
									$.ajax({
										url: "/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON",
										data: {aIDIOMA: numLingua, aPROGRAMA: 'PCGS213_03'}
									}).success(function(data) {
										$('#t9').text(data.LITERAL_01);
										
										$.ajax({
											url: "/WVDF_WS/ws_csag309.wso/fpCSAG309_01/JSON",
											data: {aIDIOMA: numLingua, aPROGRAMA: 'PCGS214_03'}
										}).success(function(data) {
											$('#t10').text(data.LITERAL_01);
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
}

$(document).on('click', '[id^="barra"]', function() {
	var vPagina = $(this).attr('id').substr(5);
	carregaPaginas(parseInt(vPagina), "AUMENTA");
	
	$('#barra1').removeClass('active').removeClass('complete');
	$('#barra2').removeClass('active').removeClass('complete');
	$('#barra3').removeClass('active').removeClass('complete');
	$('#barra4').removeClass('active').removeClass('complete');
	$('#barra5').removeClass('active').removeClass('complete');
	$('#barra6').removeClass('active').removeClass('complete');
	$('#barra7').removeClass('active').removeClass('complete');
	$('#barra8').removeClass('active').removeClass('complete');
	$('#barra9').removeClass('active').removeClass('complete');
	
	$('#step1').removeClass('active');
	$('#step2').removeClass('active');
	$('#step3').removeClass('active');
	$('#step4').removeClass('active');
	$('#step5').removeClass('active');
	$('#step6').removeClass('active');
	$('#step7').removeClass('active');
	$('#step8').removeClass('active');
	$('#step9').removeClass('active');
	
	$('#step' + vPagina + '').addClass('active');
	
	if (vPagina >= 2) {
		$('#barra1').addClass('complete');
		$('#barra2').addClass('active');
		
		if (vPagina >= 3) {
			$('#barra2').addClass('complete');
			$('#barra3').addClass('active');
			
			if (vPagina >= 4) {
				$('#barra3').addClass('complete');
				$('#barra4').addClass('active');
				
				if (vPagina >= 5) {
					$('#barra4').addClass('complete');
					$('#barra5').addClass('active');
					
					if (vPagina >= 6) {
						$('#barra5').addClass('complete');
						$('#barra6').addClass('active');
						
						if (vPagina >= 7) {
							$('#barra6').addClass('complete');
							$('#barra7').addClass('active');
							
							if (vPagina >= 8) {
								$('#barra7').addClass('complete');
								$('#barra8').addClass('active');
								
								if (vPagina >= 9) {
									$('#barra8').addClass('complete');
									$('#barra9').addClass('active');
								}
							}
						}
					}
				}
			}
		}
	}
});

$(document).on('click', '#vaiPg', function() {
	carregaPaginas((parseInt($('#paginaAtual').val()) + parseInt(1)), "AUMENTA");
});

$(document).on('click', '#voltaPg', function() {
	carregaPaginas((parseInt($('#paginaAtual').val()) - parseInt(1)), "DIMINUI");
});

$(document).on('click', '#barra1', function() {
	carregaPaginas(1, "");
	
	$('#barra2').removeClass('active').removeClass('complete');
	$('#barra3').removeClass('active').removeClass('complete');
	$('#barra4').removeClass('active').removeClass('complete');
	$('#barra5').removeClass('active').removeClass('complete');
	$('#barra6').removeClass('active').removeClass('complete');
	$('#barra7').removeClass('active').removeClass('complete');
	$('#barra8').removeClass('active').removeClass('complete');
	$('#barra9').removeClass('active').removeClass('complete');
	

	$('#step2').removeClass('active');
	$('#step3').removeClass('active');
	$('#step4').removeClass('active');
	$('#step5').removeClass('active');
	$('#step6').removeClass('active');
	$('#step7').removeClass('active');
	$('#step8').removeClass('active');
	$('#step9').removeClass('active');
});

function atePagina(iPaginaVai, iPaginaAtual, sTipo) {
	$('#vaiPg').prop("disabled", false);
	$('#voltaPg').prop("disabled", false);
	idFrame = $('#step' + iPaginaAtual);
	idBarra = $('#barra' + iPaginaAtual);
	
	idFrame.removeClass("active");
	
	if (sTipo == "AUMENTA") {
		idBarra.removeClass("active").addClass("complete");

		idFrame = $('#step' + iPaginaVai);
		idBarra = $('#barra' + iPaginaVai);
		
		idFrame.addClass("active");
		idBarra.addClass("active");
		
		$('#paginaAtual').val(parseInt(iPaginaVai));
	}
	else {
		idBarra.removeClass("active");
		
		idFrame = $('#step' + iPaginaVai);
		idBarra = $('#barra' + iPaginaVai);
		
		idFrame.addClass("active");
		idBarra.removeClass("complete").addClass("active");
		
		$('#paginaAtual').val(parseInt(iPaginaVai));
	}
	
	if (iPaginaVai == 10) {
		$('#vaiPg').prop("disabled", true);
	}
	if (iPaginaVai == 1) {
		$('#voltaPg').prop("disabled", true);
	}
}

function carregaPaginas(iPagina, sTipo) {
	vUsuarioSessao = $('#jaUsuarioSessao').val();

	switch (iPagina) {
		case 1:
			atePagina(iPagina, $('#paginaAtual').val(), sTipo);
			$("#ifrm-pcgs207_03").attr({
				"src" : "PCGS207_03.asp?aUsuarioSessao=" + vUsuarioSessao
			});
			
			// window.setInterval(function(){
				// redimensionarIframe(document.getElementById('ifrm-pcgs207_03'));
			// }, 1000);
			break;
		case 2:
			atePagina(iPagina, $('#paginaAtual').val(), sTipo);
			$("#ifrm-pcgs200_03").attr({
				"src" : "PCGS200_03.asp?aUsuarioSessao=" + vUsuarioSessao
			});
			break;
		case 3:
			atePagina(iPagina, $('#paginaAtual').val(), sTipo);
			$("#ifrm-pcgs208_03").attr({
				"src" : "PCGS208_03.asp?aUsuarioSessao=" + vUsuarioSessao
			});
			break;
		case 4:
			atePagina(iPagina, $('#paginaAtual').val(), sTipo);
			$("#ifrm-pcgs201_03").attr({
				"src" : "PCGS201_03.asp?aUsuarioSessao=" + vUsuarioSessao
			});
			break;
		case 5:
			atePagina(iPagina, $('#paginaAtual').val(), sTipo);
			$("#ifrm-pcgs215_03").attr({
				"src" : "pcgs215_03.asp?aUsuarioSessao=" + vUsuarioSessao
			});
			break;
		case 6:
			atePagina(iPagina, $('#paginaAtual').val(), sTipo);
			$("#ifrm-pcgs216_03").attr({
				"src" : "PCGS216_03.asp?aUsuarioSessao=" + vUsuarioSessao
			});
			break;
		case 7:
			atePagina(iPagina, $('#paginaAtual').val(), sTipo);
			$("#ifrm-pcgs210_01").attr({
				"src" : "PCGS210_01.asp?aUsuarioSessao=" + vUsuarioSessao
			});
			break;
		case 8:
			atePagina(iPagina, $('#paginaAtual').val(), sTipo);
			$("#ifrm-pcgs209_03").attr({
				"src" : "PCGS209_03.asp?aUsuarioSessao=" + vUsuarioSessao
			});
			break;
		case 9:
			atePagina(iPagina, $('#paginaAtual').val(), sTipo);
			$("#ifrm-pcgs213_03").attr({
				"src" : "PCGS213_03.asp?aUsuarioSessao=" + vUsuarioSessao
			});
			break;
		case 10:
			atePagina(iPagina, $('#paginaAtual').val(), sTipo);
			$("#ifrm-pcgs214_03").attr({
				"src" : "PCGS214_03.asp?aUsuarioSessao=" + vUsuarioSessao
			});
			break;
	}
}