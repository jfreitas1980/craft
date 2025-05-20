
                var jsOK = 1;
        
                // PADRAO: A FUNCAO ABAIXO TEM POR DEFINIÇÃO
                // FORMATAR A TELA DE HTML QUE O ASP ACABOU DE MONTAR.
                $('document').ready( function () {
                    $('#csag371__csag308_nr').removeClass('ddEntryCombo');
                    $('#csag371__csag0370_tp').removeClass('ddEntryCombo');
                    
                    $('#csag371__csag320_nm').addClass('autocompletecsag320_nm');   
                    $(".autocompletecsag320_nm").autocomplete({
                        source: function( request, response ) {
                            $.ajax({
                                url: "/wvdf_cac_8/fbcsag320_clientenome.asp",
                                data: {
                                    aUsuarioSessao: $('#jaUsuarioSessao').val(), 
                                    aCSAG308_NR: $('#csag371__csag308_nr option:selected').val(),
                                    term: request.term
                                },
                                dataType: "json",
                                success: function( data ) {
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
                                me.html( me.text().replace(regex, function (matched) {
                                    return termTemplate.replace('%s', matched);
                                }));
                            });
                        },
                        select: function( event, ui ) {
                            if (ui.item) {
                                var selecionado_id = ui.item.id;
                                var selecionado_value = ui.item.value;
                                var selecionado_label = ui.item.label;
                                //alert('Selecionei o ID ' + selecionado_id + ' = '+selecionado_value);
                                //aqui, o value está em outro input para submit do form, poderá ser hidden
                                $("#csag371__csag320_cd").val(selecionado_id);
                                this.value = selecionado_value;
                                return false;
                            }
                        }
                    });
                    
                    //blur
                    $('#csag371__csag320_cd').blur(function(){
                        var acsag308_nr = $('#csag371__csag308_nr option:selected').val();
                        var sRetorno = ReadFuncValue($(this).val()+'","'+acsag308_nr,"oPAG320_01","get_f_pegaDescricao");
                        $('#csag371__csag320_nm').val(sRetorno);
                    });

                    // foi implementado para que a classe do autocomplete seja refeita com a empresa selecionada.
                    $('#csag371__csag308_nr').change(function(){
                        $(".autocompletecsag320_nm").autocomplete({
                            source: function( request, response ) {
                                $.ajax({
                                    url: "/wvdf_cac_8/fbcsag320_clientenome.asp",
                                    data: {
                                        aUsuarioSessao: $('#jaUsuarioSessao').val(), 
                                        aCSAG308_NR: $('#csag371__csag308_nr option:selected').val(),
                                        term: request.term
                                    },
                                    dataType: "json",
                                    success: function( data ) {
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
                                    me.html( me.text().replace(regex, function (matched) {
                                        return termTemplate.replace('%s', matched);
                                    }));
                                });
                            },
                            select: function( event, ui ) {
                                if (ui.item) {
                                    var selecionado_id = ui.item.id;
                                    var selecionado_value = ui.item.value;
                                    var selecionado_label = ui.item.label;
                                    //alert('Selecionei o ID ' + selecionado_id + ' = '+selecionado_value);
                                    //aqui, o value está em outro input para submit do form, poderá ser hidden
                                    $("#csag371__csag320_cd").val(selecionado_id);
                                    this.value = selecionado_value;
                                    return false;
                                }
                            }
                        });
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
   
   
                
        