
                var jsOK = 1;
                var jasEMPRESA;
                var jasCSAG320_CD;
                var jaUsuarioSessao;
                var sNewURL;
                
                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready( function () {
                    jasEMPRESA = $('#hdn-asEMPRESA').val();
                    jasCSAG320_CD = $('#hdn-asCSAG320_CD').val();
                    jaUsuarioSessao = $('#hdn-aUsuarioSessao').val();
                    
                    $('#csag371__csag308_nr').val(jasEMPRESA);
                    $('#csag371__csag320_cd').val(jasCSAG320_CD);
                    
                    $('#csag371__csag0370_tp').removeClass('ddEntryCombo');

                    $('#a-RunRpt').click(function(){
                        sNewURL = "pag371_04.asp?RunReport=1&aUsuarioSessao="+jaUsuarioSessao+"&SelStart1="+jasEMPRESA+"&SelStart2="+jasCSAG320_CD;
                        location.href=sNewURL;
                    });
                    
                    $('#btn-SAVE').click(function(){
                        var aEmpresa = $('#csag371__csag308_nr').val();
                        if (aEmpresa == 0 || aEmpresa == '') {
                          jAlert('warning', 'Selecione uma Empresa', 'Atencao', function(r){
                              if (r) {
                                $('#csag371__csag308_nr').select();
                                $('#csag371__csag308_nr').focus();
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

                
        