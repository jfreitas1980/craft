        
        <% 
        
            If (Request.QueryString("aCANALFILHO_ID")<>"") Then
               aCANALFILHO_ID           =Request.QueryString ("aCANALFILHO_ID")
               Session("aCANALFILHO_ID")=aCANALFILHO_ID
            Else
               aCANALFILHO_ID           =Session("aCANALFILHO_ID")
            End If  
         
         
            If (Request.QueryString("aCANALFILHO_DS")<>"") Then
               aCANALFILHO_DS           =Request.QueryString ("aCANALFILHO_DS")
               Session("aCANALFILHO_DS")=aCANALFILHO_DS
            Else
               aCANALFILHO_DS           =Session("aCANALFILHO_DS")
            End If  
         
         
            If (Request.QueryString("aUSUARIO_ID")<>"") Then
               aUSUARIO_ID           =Request.QueryString ("aUSUARIO_ID")
               Session("aUSUARIO_ID")=aUSUARIO_ID
            Else
               aUSUARIO_ID           =Session("aUSUARIO_ID")
            End If  
         
         
            If (Request.QueryString("aUSUARIO_DS")<>"") Then
               aUSUARIO_DS           =Request.QueryString ("aUSUARIO_DS")
               Session("aUSUARIO_DS")=aUSUARIO_DS
            Else
               aUSUARIO_DS           =Session("aUSUARIO_DS")
            End If  
        
            oPAG353_03.Call "Msg_pPAG353_03Dados", aUsuarioSessao, aCANALFILHO_ID, aCANALFILHO_DS, aUSUARIO_ID, aUSUARIO_DS
        %>
        
       
        <script language="JavaScript"><!--
        alert ('Cadastro do canal filho realizado com sucesso');
        {top.close();}
        // --></script>
    