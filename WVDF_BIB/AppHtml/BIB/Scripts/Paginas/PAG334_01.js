function fVALIDASALVACAMPOS()
{

if (document.Csag334.csag334__grupo.value == "" || document.Csag334.csag334__grupo.value == "0" ) {
  document.Csag334.csag334__grupo.style.backgroundColor = "#F8F8FF";
  alert ("Informacao Invalida, Verifique. ESCOLHA UM GRUPO !!!");
  document.Csag334.csag334__grupo.style.backgroundColor = "#FFFFFF";
  document.Csag334.csag334__grupo.focus();
  return;
 }

if (document.Csag334.csag334__usuarionumero.value == "" || document.Csag334.csag334__usuarionumero.value == "0" ) {
  document.Csag334.csag334__usuarionumero.style.backgroundColor = "#F8F8FF";
  alert ("Informacao Invalida, Verifique. ESCOLHA UM USUARIO !!!");
  document.Csag334.csag334__usuarionumero.style.backgroundColor = "#FFFFFF";
  document.Csag334.csag334__usuarionumero.focus();
  return;
 }

jsSalvar(0)

}