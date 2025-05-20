
                var jsOK = 1;
        
                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready( function () {

                    mostraTab(0);

                    $('#csag320__csag308_nr').removeClass('ddEntryCombo');
                    $('#csag320__id_csag325').removeClass('ddEntryCombo');
                    $('#csag320__csag331_nr').removeClass('ddEntryCombo');
                    $('#csag320__csag336_nr').removeClass('ddEntryCombo');
                    $('#csag320__uf').removeClass('ddEntryCombo');
                    $('#csag320__pais').removeClass('ddEntryCombo');
                    $('#csag320__sexo').removeClass('ddEntryCombo');
                    $('#csag320__estadocivil').removeClass('ddEntryCombo');
                                    
                    $('#btn-SAVE').click(function(){
                        var aEmpresa = $('#csag320__csag308_nr').val();
                        if (aEmpresa == 0 || aEmpresa == '') {
                          jAlert('warning', 'Selecione uma Empresa', 'Atencao', function(r){
                              if (r) {
                                $('#csag320__csag308_nr').select();
                                $('#csag320__csag308_nr').focus();
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
   
   
                
        