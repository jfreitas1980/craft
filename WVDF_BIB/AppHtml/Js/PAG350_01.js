                var jsOK = 1;
                var jCsag320Id ;
        
                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINI√á√ÉO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready( function () {
					parent.scrollTo(0,0);
					parent.parent.scrollTo(0,0);
                    jCsag320Id = $('#jCsag320Id').val();
                    $("#csag350__csag320_id").val(jCsag320Id);
					
					var valorRadio = $("input[name='csag350__principal']:checked").val();
					
					if (valorRadio == "P") {
						$('#switch-telefone').prop("checked", true);
					} else {
						$('#switch-telefone').prop("checked", false);
					}
					//$('#switch-telefone').prop("checked", true);
					//$("input[name='csag350__principal']:checked").val();
					
                    $('#btn-SAVE').click(function(){
					   jsSalvar(0);
                    });
					
					$('#switch-telefone').click(function() {
						var valorSwitch = $('#switch-telefone').prop("checked");
						
						if (valorSwitch) {
							$('input[name="csag350__principal"][value="P"]').prop('checked', true);
						} else {
							$('input[name="csag350__principal"][value="N"]').prop('checked', true)
						}
					});
                    
                  // FAZ COM QUE O BOTAO SAVE NAO SEJA EXIBIDO NA TELA
                  // SE O RECNUM ESTIVER IGUAL A ZERO.
                  if ($('#aCI').val()!=1) {
                      if ($('#btn-SAVE').is(':visible')) {
                          $('#btn-SAVE').hide(); 
                      }
                  }
                  else {
                      if ($('#btn-SAVE').is(':visible')) {}
                      else {
                          $('#btn-SAVE').show(); 
                      }
                  }
                    
                    
                  // FAZ COM QUE O BOTAO SAVE NAO SEJA EXIBIDO NA TELA
                  // SE O RECNUM ESTIVER IGUAL A ZERO.
                  if ($('#aCE').val()!=1) {
                      if ($('#btn-EXCLUIR').is(':visible')) {
                          $('#btn-EXCLUIR').hide(); 
                      }
                  }
                  else {
                      if ($('#btn-EXCLUIR').is(':visible')) {}
                      else {
                          $('#btn-EXCLUIR').show(); 
                      }
                  }
                  
                });
   
                function retiraAcento(palavra)  
                {  
                    com_acento = '·‡„‚‰ÈËÍÎÌÏÓÔÛÚıÙˆ˙˘˚¸Á¡¿√¬ƒ…» ÀÕÃŒœ”“’÷‘⁄Ÿ€‹«';  
                    sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';  
                    nova='';  
                    for(i=0;i<palavra.length;i++) {  
                        if (com_acento.search(palavra.substr(i,1))>=0) {   
                            nova+=sem_acento.substr(com_acento.search(palavra.substr(i,1)),1);  
                        } else {  
                            nova+=palavra.substr(i,1);  
                        }  
                    }  
                    return nova.toUpperCase();  
                }  
        