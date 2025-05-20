
        function RowClick(oObj) {
            var NewURL ;
            var RecId     = oObj.getAttribute("RECID");
            var jsPrograma= $('#hdn-aProgramaChamador').val();
            var jaUsuarioSessao = $('#hdn-aUsuarioSessao').val();
            var jasEMPRESA = $('#hdn-asEMPRESA').val();
            var jasCSAG320_CD = $('#hdn-asCSAG320_CD').val();

            allRows = document.getElementsByTagName('tr');
            for (i=0; i<allRows.length; i++){
              allRows[i].style.backgroundColor = "";
            }

            //window.open('PAG371_03.asp?aUsuarioSessao=<%=aUsuarioSessao%>&RecId='+RecId,'_self');
            NewURL = 'PAG371_03.asp?aUsuarioSessao='+jaUsuarioSessao+'&RecId='+RecId+'&asEMPRESA='+jasEMPRESA+'&asCSAG320_CD='+jasCSAG320_CD;
            location.href=NewURL;
            
            oObj.style.backgroundColor     = "#FAF0E6";
            sBackColor                     = "#FAF0E6";
        }

        function NewItem() {
            var jaUsuarioSessao = $('#hdn-aUsuarioSessao').val();
            var jasEMPRESA = $('#hdn-asEMPRESA').val();
            var jasCSAG320_CD = $('#hdn-asCSAG320_CD').val();
            var NewURL;
            NewURL = "PAG371_03.asp?aUsuarioSessao="+jaUsuarioSessao+"&asEMPRESA="+jasEMPRESA+"&asCSAG320_CD="+jasCSAG320_CD;
            location.href=NewURL;
        }
