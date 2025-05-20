<%
Dim startRId
Dim endRId

If Len(StartRowId) > 0 Then
	startRId = StartRowId
End If
If Len(EndRowId) > 0 Then
	endRId = EndRowId
End If
If Len(StartRecId) > 0 Then
	startRId = StartRecId
End If
If Len(EndRecId) > 0 Then
	endRId = EndRecId
End If
%>
<% If startRId <> "" Then %>
	<a class="btn btn-purple" onClick="history.go(-1);return false;">
		&nbsp;
		<i class="ace-icon fa fa-arrow-left bigger-125 icon-only"></i>
		&nbsp;
	</a>
<% End If %>
							
<a class="btn btn-warning" href="<%=aPrograma%>.asp?aUsuarioSessao=<%=aUsuarioSessao%>&RunReport=1">
	<% =oPAG312_01.ddValue("CSAG312.NOVO")%> 
	<i class="ace-icon fa fa-search align-top bigger-125 icon-on-right"></i>
</a>

<a class="btn btn-inverse" onClick="self.print();">
	<% =oPAG312_01.ddValue("CSAG312.IMPRIMIR")%> 
	<i class="ace-icon fa fa-print align-top bigger-125 icon-on-right"></i>
</a>

<a class="btn btn-primary" href="<%=aProgramaNovo%>.asp?aUsuarioSessao=<%=aUsuarioSessao%>">
	<% =oPAG312_01.ddValue("CSAG312.RETORNAR")%> 
	<i class="ace-icon fa fa-pencil align-top bigger-125 icon-on-right"></i>
</a>

<% If endRId <> "" Then %>
	<a class="btn btn-purple" id="nextPageFinal" href="">
		&nbsp;
		<i class="ace-icon fa fa-arrow-right bigger-125 icon-only"></i>
		&nbsp;
	</a>
<% End If %>