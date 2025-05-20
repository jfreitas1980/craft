<script type="text/javascript">
    var jaUsuarioSessao;
    
    function formatItem(row) { return row[1]; }
    
    $(document).ready(function() {
      
        jaUsuarioSessao = $('#aUsuarioSessao').val();
        
        //ADD CLASS
        $('#selstart3').addClass('datepicker');
        //AUTOCOMPLETE
        /*
        $(".acArmador").autocomplete("/wvdf_bib/fBusca0016.asp?jaUsuarioSessao=<%=jaUsuarioSessao%>", {
            width: 350,
            max: 30,
            selectFirst: false,
            minChars: 2,
            formatItem:formatItem,
            autoFill:false
        });
        
        $(".acArmador").result(function(event, data, formatted) {
            $('#selstart2_nm_armador').val('');
            mtAddItem(data[0], data[1], 'lista_armador', 'hdn_armador');
        });
        */
        
        //BLUR
        /*
        $('#selstart2').blur(function(){ 
            var codigo = parseInt($(this).val());
            if(codigo == "" || codigo == 0) return false;
            
            var nome    = ReadFuncValue($(this).val(),'oARMADOR_02','get_f_pegaDescricao');
            if(nome != "") mtAddItem(codigo, nome, 'lista_armador', 'hdn_armador');
           
            $(this).val("");
        });
        */
        
        //CLICK
        $('#runreport').click(function(){
            var selstart1 = $('#SelStart1').val();
            var selstart2 = $('#hdn_armador').val();
            var selstart3 = $('#SelStart3').val();
            var selstart5 = $('#hdn_origem').val();
            var selstart6 = $('#hdn_destino').val();
            var selstart7 = $('#SelStart7').val();
            
            var url = "pfacebook_03.asp?jaUsuarioSessao=" + jaUsuarioSessao + "&SelStart1=" + selstart1 + "&SelStart2=" + selstart2 + "&SelStart3=" + selstart3 + "&SelStart5=" + selstart5 + "&SelStart6=" + selstart6 + "&SelStart7=" + selstart7
            $('#iframepfacebook_03').attr('src',url);
        });
        
    });

    function RowClick(oObj){
        var RecId     = oObj.getAttribute("RECID");
        var jsPrograma= "<%=aProgramaChamador%>";

        allRows = document.getElementsByTagName('tr');
        for (i=0; i<allRows.length; i++){
          allRows[i].style.backgroundColor = "";
        }

        oObj.style.backgroundColor     = "#FAF0E6";
        sBackColor                     = "#FAF0E6";
    }
    
</script>
