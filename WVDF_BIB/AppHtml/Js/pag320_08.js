
                var jsOK = 1;
                var jsRetorno;
        
                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready( function () {

                    mostraTab(0);
                    
                    //VALIDAR ABA DO MOTORISTA
                    jsRetorno = ReadFuncValue($('#csag320__csag308_nr').val()+'","'+$('#csag320__codigo').val(),"oPAG320_01","get_f_pegaID_MOTORISTA");
                    if (jsRetorno == '0') {
                        $('#btab_1').hide();
                    } else {
                        if ($('#btab_1').is(':visible')) {}
                        else {
                            $('#btab_1').show(); 
                        }    
                    }
                    
   
                    $('#csag320__codigo').attr('disabled', 'disabled'); 
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
   
                function fCAMPOS_BLOQUEIOS() {
                  document.Csag320.csag320__csag308_nm.style.backgroundColor    = "#F8F8FF";
                  $('#csag320__csag308_nm').attr('disabled', 'disabled');

                  document.Csag320.csag320__csag319_ds.style.backgroundColor    = "#F8F8FF";
                  $('#csag320__csag319_ds').attr('disabled', 'disabled');
                }

                function fCAMPOS_CHECA_CLIENTES() {
                   parent.frames[2].location.href = ('PAG308_03.Asp?aUsuarioSessao=<%=aUsuarioSessao%>&RunReport=1&aProgramaChamador=PAG320_08');
                }

                function fCAMPOS_CHECA_REGIAO() {
                   var iCLIENTE=$('#csag320__csag308_nr').val();
                   if (iCLIENTE==0){
                       jAlert('warning', 'Informacao Invalida, Verifique. PARA SELECIONAR UMA REGIÃO É NECESSÁRIO TER UM CLIENTE SELECIONADO !', 'Atencao', function(r){
                            return;
                       });
                   }
                   parent.frames[2].location.href = ('PAG319_03.Asp?aUsuarioSessao=<%=aUsuarioSessao%>&RunReport=1&aProgramaChamador=PAG320_08&Selstart1='+iCLIENTE+'&SelStop1='+iCLIENTE);
                }

                function fVALIDALIBERACAMPOS() {
                   jsSalvar(0)
                   top.close();
                }
   
                function fFUNCAO_VERIFICA(iCLIENTE,iREGIAO,sTIPO,aTABELA) {
                         jsUrl = ("PAG999_01Diversos.asp?aFUNCAO=PAG320_08&aCLIENTE="+iCLIENTE +"&aREGIAO="+iREGIAO +"&aTIPO="+sTIPO +"&aTABELA="+aTABELA);
                         loadXMLDoc(jsUrl);
                }

        function retAjaxText(retornoAjax)
                {
                  alert (retornoAjax)

                  if (retornoAjax=="308_OK" ) {
                       parent.frames[2].location.href = ('PAG308_03.Asp?aUsuarioSessao=<%=aUsuarioSessao%>&RunReport=1&aProgramaChamador=PAG320_08');
                     }
                }
                
        