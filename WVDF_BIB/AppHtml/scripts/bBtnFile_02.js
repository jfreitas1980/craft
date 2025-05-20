        	// DEFINE ONCLICK DO BOTAO
            // CLEAR
        	$('#btn_clear').click(function(){
                    jConfirm('<%=oPSGC0377_03.DDValue("TSGC0377.CANCELAR")%>', 
                            '<%=oPSGC0377_03.DDValue("TSGC0377.DATA")%>', 
                            function(r) { 
                                if (r) {
                                document.<%=Vr_Form%>.action='<%=Vr_FormAction%>&clear=1';
                                document.<%=Vr_Form%>.submit();
                                }
                            }
                    );
        
        			//return false;
        	});
            // SAVE
        	$('#btn_save').click(function(){
                    jConfirm('<%=oPSGC0377_03.DDValue("TSGC0377.CSALVAR")%>', 
                            '<%=oPSGC0377_03.DDValue("TSGC0377.DATA")%>', 
                            function(r) {
                                if (r) {
                                document.<%=Vr_Form%>.action='<%=Vr_FormAction%>&save=1';
                                document.<%=Vr_Form%>.submit();
                                }
                            }
                    );
        
        			//return false;
        	});
            // DELETE
        	$('#btn_delete').click(function(){
                    jConfirm('<%=oPSGC0377_03.DDValue("TSGC0377.CEXCLUIR")%>', 
                            '<%=oPSGC0377_03.DDValue("TSGC0377.DATA")%>', 
                            function(r) {
                                if (r) {
                                document.<%=Vr_Form%>.action='<%=Vr_FormAction%>&delete=1';
                                document.<%=Vr_Form%>.submit();
                                }
                            }
                    );
        
        			//return false;
        	});
