$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});

// AUTOCOMPLETE DESCRIÇÃO PARA POSICIONAR ID - TIPO PESSOA
$(function() {
    $("#csag319_descricao").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag319_descricao.asp",
				data: {
					aUsuarioSessao: $('#jaUsuarioSessao').val(),
					term: retiraAcento(request.term)
				},
				dataType: "json",
				success: function (data) {
					response(data);
				}
			});
		},
        minLength: 2,
		open: function(e,ui) {
			var termTemplate = '<strong>%s</strong>';
			var acData = $(this).data('uiAutocomplete');
			acData
			.menu
			.element
			.find('a')
			.each(function() {
				var me = $(this);
				var regex = new RegExp(acData.term, "gi");
				me.html(me.text().replace(regex, function (matched) {
					return termTemplate.replace('%s', matched);
				}));
			});
		},
        select: function(event, ui) {
            if (ui.item) {
				$('#SelStart5').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.value + "</a>").appendTo(ul);
	};
});

// AUTOCOMPLETE DESCRIÇÃO PARA POSICIONAR ID - MARCAS
$(function() {
    $("#csag374_descricao").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag308_descricao.asp",
				data: {
					aUsuarioSessao: $('#jaUsuarioSessao').val(),
					term: retiraAcento(request.term)
				},
				dataType: "json",
				success: function (data) {
					response(data);
				}
			});
		},
        minLength: 2,
		open: function(e,ui) {
			var termTemplate = '<strong>%s</strong>';
			var acData = $(this).data('uiAutocomplete');
			acData
			.menu
			.element
			.find('a')
			.each(function() {
				var me = $(this);
				var regex = new RegExp(acData.term, "gi");
				me.html(me.text().replace(regex, function (matched) {
					return termTemplate.replace('%s', matched);
				}));
			});
		},
        select: function(event, ui) {
            if (ui.item) {
				$('#SelStart9').val(ui.item.id);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.value + " - " + item.cidade + "</a>").appendTo(ul);
	};
});

// AUTOCOMPLETE DESCRIÇÃO PARA POSICIONAR ID - ESTADO
$(function() {
    $("#csag331_descricao").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag331_descricao.asp",
				data: {
					aUsuarioSessao: $('#jaUsuarioSessao').val(),
					term: retiraAcento(request.term)
				},
				dataType: "json",
				success: function (data) {
					response(data);
				}
			});
		},
        minLength: 2,
		open: function(e,ui) {
			var termTemplate = '<strong>%s</strong>';
			var acData = $(this).data('uiAutocomplete');
			acData
			.menu
			.element
			.find('a')
			.each(function() {
				var me = $(this);
				var regex = new RegExp(acData.term, "gi");
				me.html(me.text().replace(regex, function (matched) {
					return termTemplate.replace('%s', matched);
				}));
			});
		},
        select: function(event, ui) {
            if (ui.item) {
				$('#SelStart11').val(ui.item.sigla);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.value + "</a>").appendTo(ul);
	};
});

// AUTOCOMPLETE DESCRIÇÃO PARA POSICIONAR ID - CIDADE
$(function() {
    $("#csag325_descricao").autocomplete({
        source: function (request, response) {
			$.ajax({
				url: "fbcsag325_descricao.asp",
				data: {
					aUsuarioSessao: $('#jaUsuarioSessao').val(),
					term: retiraAcento(request.term)
				},
				dataType: "json",
				success: function (data) {
					response(data);
				}
			});
		},
        minLength: 2,
		open: function(e,ui) {
			var termTemplate = '<strong>%s</strong>';
			var acData = $(this).data('uiAutocomplete');
			acData
			.menu
			.element
			.find('a')
			.each(function() {
				var me = $(this);
				var regex = new RegExp(acData.term, "gi");
				me.html(me.text().replace(regex, function (matched) {
					return termTemplate.replace('%s', matched);
				}));
			});
		},
        select: function(event, ui) {
            if (ui.item) {
				$('#SelStart10').val(ui.item.sigla);
				$(this).val(ui.item.value);
				return false;
			}
        }
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append("<a>" + item.value + "</a>").appendTo(ul);
	};

	$(document).on('click', '#btnExecute', function() {

		scroll(0,0);
		return false;
   
	});

	
	$(document).ready(function() {
		
		
		if (getVariavelURL('RunReport') == 'RunReport' || getVariavelURL('RunReport') == '1') {
		// $('html, body').animate({scrollTop : 0},800);
			if ($('#botoesReportFinal').is(':empty')) {
				$('#botoesReportFinal').html($('#botoesReportAux').html());
				$('#botoesReportAux').empty();
			}
			
			$('#nextPageFinal').attr('href', $('#nextPageAux').val());

			// window.setInterval(function(){
				// $('div#pageTabContent div.active iframe', parent.parent.document).css('height', $('#ifrm-pag320_01', parent.document).prop('scrollHeight') + 85 + 'px');
				// $('div#pageTabContent', parent.parent.document).css('height', $('#ifrm-pag320_01', parent.document).prop('scrollHeight') + 110 + 'px');
			// }, 1000);
		}
	});
});