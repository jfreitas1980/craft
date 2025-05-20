$(document).ready(function() {

	// APLICA EFEITO QUANDO UM CAMPO DO FORM RECEBE FOCU
	
	//$(this).find('input[type=text]').focus( function () { $(this).addClass('input-focus'); });
	//$(this).find('input[type=text]').blur( function () { $(this).removeClass('input-focus'); });
	//
	//$(this).find('input[type=password]').focus( function () { $(this).addClass('input-focus'); });
	//$(this).find('input[type=password]').blur( function () { $(this).removeClass('input-focus'); });
	//
	//$(this).find('textarea').focus( function () { $(this).addClass('input-focus'); });
	//$(this).find('textarea').blur( function () { $(this).removeClass('input-focus'); });
	//
	//$(this).find('select').focus( function () { $(this).addClass('input-focus'); });
	//$(this).find('select').blur( function () { $(this).removeClass('input-focus'); });
	
	$(this).find(':input:not(submit):not(button):not(:radio):not(:checkbox)').on('focus', function () { $(this).addClass('input-focus'); });
	$(this).find(':input:not(submit):not(:radio):not(:checkbox)').on('blur', function () { $(this).removeClass('input-focus'); });
	// -->
	
	// APLICA EFEITO QUANDO O MOUSE PASSA EM CIMA DE UMA LINHA DA GRID	
	
	$(this).find('table[class=tableGrid] tbody tr').mouseover( function () { $(this).addClass('hilight'); });
	$(this).find('table[class=tableGrid] tbody tr').mouseout( function () { $(this).removeClass('hilight'); });
	
	$(this).find('table[class=tablegriddetails] tbody tr:not(.d_details)').mouseover( function () { $(this).addClass('t_hightlight'); });
	$(this).find('table[class=tablegriddetails] tbody tr:not(.d_details)').mouseout( function () { $(this).removeClass('t_hightlight'); });
	
	// -->

    $('table.tableAccordion tbody tr td[class=tableAccordionContent]').parent().hide();
	$('table.tableAccordion tbody tr td[class=tableAccordionContent]:first').parent().show();
	$('table.tableAccordion tbody tr th').click(function(){
		var returnRquest = $(this).parent().next('tr');
		(!returnRquest.is(':visible')) ? returnRquest.slideDown('slow') : returnRquest.slideUp('fast');
	});
	// Carrega todos os iframes com attr src2load definido do Accordion
    $('table.tableAccordion tbody tr').click(function () {
        $(this).next('tr > td.tableAccordionContent > iframe')._LoadIframeChildren();
    });
	
	
	$('input[class*=datecalendar]').each(function(){
		Calendar.setup({inputField : $(this).attr('id'), ifFormat : "%d/%m/%Y", button : $(this).attr('id') + "_button"});
	});
	
	
	// Rotina para detectar se há click nos botões padrões para salvar, limpar ou deletar.
	// Isso é padrão para todo o sistema, se houver click, não executa nada, se não houver, coloca o click.
    /*
	if($("[id*='btn_']").length > 0){
		$("[id*='btn_']").each(function(a,input){
			var $this = $(input);
			var msg = '';
			var action = '';
			
			switch($this.attr('id')){
				case 'btn_save':
					msg = 'Deseja salvar o registro?';
					action = '&save=1';
				break;
				
				case 'btn_clear':
					msg = 'Deseja limpar as informacoes contidas na tela?';
					action = '&clear=1';
				break;
				
				case 'btn_delete':
					msg = 'Deseja excluir o resgistro?';
					action = '&delete=1';
				break;
			}
			
			if($this.data('events') == null){
				$this.click(function(){
					jConfirm(msg, 
					    'Atencao', 
					    function(r) { 
						if (r) {
							$this.parents("form").attr('action', $this.parents("form").attr('action') + action).submit();
						}
					    }
					);
					return false;				
				});
			} else {
				//console.log("TEM CLICK");
			}
		});
	}
    */
});



// FUNCOES (Iniciar sempre com _ )
(function(jQuery){
    // Function - Carrega todos os iframes filhos com src2load definido
    jQuery.fn._LoadIframeChildren = function(options){ 
        return jQuery(this).find('iframe').each(function () {
            if ($(this).attr('src2load') && !jQuery(this).attr('src2loaded')) {
                this.src = jQuery(this).attr('src2load');
                jQuery(this).attr('src2loaded', 1);
            }
        });  
    };  
})(jQuery);