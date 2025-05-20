				var jsOK = 1;
        
                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINI√á√ÉO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready(function () {
					parent.scrollTo(0,0);
					parent.parent.scrollTo(0,0);
                    $( "#csag320__data_nascfund" ).datepicker({
                        showOtherMonths: true,
                        selectOtherMonths: false,
                        changeMonth: true,
                        changeYear: true,
                        showButtonPanel: true,
                        dateFormat: "dd/mm/yy"
                    });
					
					$('#csag320__data_nascfund').removeClass('col-xs-6').addClass('col-xs-12');
					
					
					atualizarTabs();
					
					$('#aCSAG320Id', window.parent.document).val($('#csag320__codigo').val());
					$('#aCSAG320RowId', window.parent.document).val($('#csag320__rowid').val());
					
                    $('#csag320__nrdocto_ed').attr('disabled', 'disabled'); 
                    $('#csag320__status_dt_ativo').attr('disabled', 'disabled'); 
                    $('#csag320__status_dt_inativo').attr('disabled', 'disabled'); 
                    
                    $('#btn-SAVE').click(function(){
						jsSalvar(0);
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
				
				function atualizarTabs() {
					var sParametros = $('#csag320__codigo').val() + '","' + $('#jaUsuarioSessao').val();
					var sRetorno = ReadFuncValue(sParametros, "oPAG320_01", "get_f_atualizatabs");
					
					var obj = JSON.parse(sRetorno);
					
					if ($('#csag320__rowid').val() != "") {
						$('#li-pag366_01', window.parent.document).show();
						$('#li-pag323_01', window.parent.document).show();
						$('#li-pag374_01', window.parent.document).show();
						$('#li-pag350_01', window.parent.document).show();
						$('#li-pag378_01', window.parent.document).show();
						$('#li-pcgs2101_00', window.parent.document).show();
						
						((obj['340']) 		? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide());
						((obj['341']) 		? $('#li-pag341_01', window.parent.document).show() : $('#li-pag341_01', window.parent.document).hide());
						((obj['342'])		 	? $('#li-pag342_01', window.parent.document).show() : $('#li-pag342_01', window.parent.document).hide());
						((obj['343']) 			? $('#li-pag343_01', window.parent.document).show() : $('#li-pag343_01', window.parent.document).hide());
						//(tipos['despachante']) 	? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide()
						//(tipos['concorrencia']) 	? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide())
						((obj['349']) 	? $('#li-pag349_01', window.parent.document).show() : $('#li-pag349_01', window.parent.document).hide());
						//(tipos['customer']) 		? $('#li-pag340_01', window.parent.document).show() : $('#li-pag340_01', window.parent.document).hide())
						((obj['346']) 		? $('#li-pag346_01', window.parent.document).show() : $('#li-pag346_01', window.parent.document).hide());
						((obj['345']) 			? $('#li-pag345_01', window.parent.document).show() : $('#li-pag345_01', window.parent.document).hide());
						((obj['347']) 		? $('#li-pag347_01', window.parent.document).show() : $('#li-pag347_01', window.parent.document).hide());
					} else {
						$('#li-pag366_01', window.parent.document).hide();
						$('#li-pag323_01', window.parent.document).hide();
						$('#li-pag374_01', window.parent.document).hide();
						$('#li-pag350_01', window.parent.document).hide();
						$('#li-pag378_01', window.parent.document).hide();
					}
				}