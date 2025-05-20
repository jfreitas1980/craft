function consultaCenter(){
				var sDiv = document.getElementById("divPAG327_01");
				sDiv.style.display = "";
			}

			function fechaDivPopUp(){
				var sDiv = document.getElementById("divPAG327_01");
				sDiv.style.display = "none";
			}

			function posiciona(RetCampos,RetValores,Programa){
				valores = RetValores.split('|');
				switch(Programa){
					case 'UPLOAD':

                        document.Csag327.csag327__cf_banner.disabled                = "";
                        document.Csag327.csag327__cl_banner.disabled                = "";

						document.Csag327.csag327__cf_banner.value                   = valores[0];
						document.Csag327.csag327__cl_banner.value                   = valores[1];

					    fechaDivPopUp();
					break

					default:
						alert('falha no relatorio')
				}
				//alert(RetCampos);
			}
			


function fVALIDASALVACAMPOS()
         {

          if (document.Csag333.csag333__grupo.value == "" || document.Csag333.csag333__grupo.value == "0" ) {
              document.Csag333.csag333__grupo.style.backgroundColor = "#F8F8FF";
              alert ("Informacao Invalida, Verifique. ESCOLHA UM GRUPO !!!");
              document.Csag333.csag333__grupo.style.backgroundColor = "#FFFFFF";
              document.Csag333.csag333__grupo.focus();
              return;
		     }

          if (document.Csag333.csag333__menuclasse.value == "" || document.Csag333.csag333__menuclasse.value == "0" ) {
              document.Csag333.csag333__menuclasse.style.backgroundColor = "#F8F8FF";
              alert ("Informacao Invalida, Verifique. ESCOLHA UMA CLASSE !!!");
              document.Csag333.csag333__menuclasse.style.backgroundColor = "#FFFFFF";
              document.Csag333.csag333__menuclasse.focus();
              return;
		     }

          if (document.Csag333.csag333__menunumero.value == "" || document.Csag333.csag333__menunumero.value == "0" ) {
              document.Csag333.csag333__menunumero.style.backgroundColor = "#F8F8FF";
              alert ("Informacao Invalida, Verifique. ESCOLHA UMA CLASSE !!!");
              document.Csag333.csag333__menunumero.style.backgroundColor = "#FFFFFF";
              document.Csag333.csag333__menunumero.focus();
              return;
		     }

          jsSalvar(0)

         }

