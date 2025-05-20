function retiraAcento(palavra)  
{  
    com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';  
    sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';  
    nova='';  
    for(i=0;i<palavra.length;i++) {  
        if (com_acento.search(palavra.substr(i,1))>=0) {  
            nova+=sem_acento.substr(com_acento.search(palavra.substr(i,1)),1);  
        } else {  
            nova+=palavra.substr(i,1);  
        }  
    }  
    return nova.toUpperCase();  
}  
