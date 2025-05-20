       <%  
          Dim aMenuHorizontal
          aMenuHorizontal =oPAG803_01.Call  ("Get_fRETORNAR_MENU_HORIZONTAL_TREE_Clientes", aUsuarioSessao)
      
       %>
      
      
       <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
       <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
       <head>
           <meta http-equiv="content-type" content="text/html;charset=iso-8859-1" />
 	      <meta http-equiv="X-UA-Compatible" content="IE=8" />
           <title><%=aUsuarioRazaoSocial%></title>
 
           <script src="SpryAssets/SpryMenuBar.js" type="text/javascript"></script>
 		  <script src="js/jquery-1.10.1.min.js"></script>
 		  
           <link rel="stylesheet" href="css/tabs.css" type="text/css" media="screen" />
 		  <link href="SpryAssets/SpryMenuBarHorizontal.css" rel="stylesheet" type="text/css" />
           <link href="css/layout.css" rel="stylesheet" type="text/css" />
 		  
 		  <!--[If IE]>
               <link href="css/layout_ie.css" rel="stylesheet" type="text/css" />
           <![endif]-->
 
       </head>
 
       <body>
 			  <div id="content">
 				   <div id="head_content"><img src="images/tit_bem_vindo.jpg" width="990px"></div>
 				   <div id="menu"><%Response.Write(aMenuHorizontal)%></div>
 				   
