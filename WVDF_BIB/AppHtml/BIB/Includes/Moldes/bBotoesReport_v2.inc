<% if StartRowId <> "" then %>
	<a class="btn btn-purple" onClick="history.go(-1);return false;">
		&nbsp;
		<i class="ace-icon fa fa-arrow-left bigger-125 icon-only"></i>
		&nbsp;
	</a>
<% end if %>
							
<a class="btn btn-warning" href="<%=aPesquisa%>?aUsuarioSessao=<%=aUsuarioSessao%><%=aPesquisaParametro%>">
	<% =oPAG312_01.ddValue("CSAG312.NOVO")%> 
	<i class="ace-icon fa fa-search align-top bigger-125 icon-on-right"></i>
</a>

<a class="btn btn-inverse" onClick="self.print();">
	<% =oPAG312_01.ddValue("CSAG312.IMPRIMIR")%> 
	<i class="ace-icon fa fa-print align-top bigger-125 icon-on-right"></i>
</a>

<% if aProgramaNovo <> "" then %>
<a class="btn btn-primary" href="<%=aProgramaNovo%>?aUsuarioSessao=<%=aUsuarioSessao%><%=aPesquisaParametro%>">
	<% =oPAG312_01.ddValue("CSAG312.RETORNAR")%> 
	<i class="ace-icon fa fa-pencil align-top bigger-125 icon-on-right"></i>
</a>
<% end if %>

<% if EndRowId <> "" then %>
	<a class="btn btn-purple" id="nextPageFinal" href="">
		&nbsp;
		<i class="ace-icon fa fa-arrow-right bigger-125 icon-only"></i>
		&nbsp;
	</a>
<% end if %>