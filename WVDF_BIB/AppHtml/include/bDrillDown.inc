<script type="text/Javascript"> 
<!--
function MostrarOcultar (postid) { 

   whichpost = document.getElementById(postid); 

   if (whichpost.className=="Mostrar") { 
      whichpost.className="Ocultar"; 
   } 
   else { 
      whichpost.className="Mostrar"; 

   } 
} 
function Setas (aName) { 

   aSpan = document.getElementById(aName); 

   if (aSpan.className=="SetaPraBaixo") { 
      aSpan.className="SetaPraCima"; 
   } 
   else { 
      aSpan.className="SetaPraBaixo"; 

   } 
}
function aSeta(NomeImagem) {
   var SrcImagem = document.images[NomeImagem].nameProp;
   
   if (SrcImagem=="images/botoes/icon_plus.gif") { 
      document.images[NomeImagem].src = "images/botoes/icon_minus.gif"; 
   } 
   else { 
      document.images[NomeImagem].src = "images/botoes/icon_plus.gif"; 
   } 
}
function Imagem() {
   var aImagem = document.getElementsByName("seta");
   var MinhaImagem = document.images["seta"].nameProp;
   if (document.images["seta"].src=="images/botoes/icon_plus.gif") { 
   alert("imagem");
   } 
      alert(MinhaImagem);

}
function CheckAll() {
	if(!ok){
	  for (var i=0;i<document.form1.elements.length;i++) {
	    var x = document.form1.elements[i];
	    if (x.name == 'UIDL') {		
		    	x.checked = true;
				ok=true;
			}
	    }
	}
	else{
	for (var i=0;i<document.form1.elements.length;i++) {
	    var x = document.form1.elements[i];
	    if (x.name == 'UIDL') {		
		    	x.checked = false;
				ok=false;
			}
	    }	
	}
}
function MostrarOcutarTodos() {
	  var Elementos = document.all.length // Pega Todos os Elemento do Pagina
	  
	  for (var i=0;i<Elementos;i++) { //Passa por todos os elementos da pagina
		  var y = ('id'+i) // Montar o iD do Objeto
		  var x = document.getElementById(y);
		  if (x=="[object]"){
			  if (x.className=="Mostrar"){
				x.className = "Ocultar"
			  }
		  }
	  } 
}
//-->
</script>
