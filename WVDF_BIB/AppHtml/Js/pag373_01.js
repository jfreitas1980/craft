
                var jsOK = 1;
        
                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready( function () {
   
                    $('#csag373__csag308_nr').removeClass('ddEntryCombo');
                
                    $('#btn-SAVE').click(function(){
                        var aEmpresa = $('#csag373__csag308_nr').val();
                        if (aEmpresa == 0 || aEmpresa == '') {
                          jAlert('warning', 'Selecione uma Empresa', 'Atencao', function(r){
                              if (r) {
                                $('#csag373__csag308_nr').select();
                                $('#csag373__csag308_nr').focus();
                                return false;
                              }
                          });
                        } else { jsOK=0 };
                        
                        if (jsOK==0) {
                           jsSalvar(0);
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
   
   
                
        