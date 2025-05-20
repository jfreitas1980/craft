<table class="ss-default">
	<thead>
		<tr>
			<td><b>ACESSO AO WEBMAIL</b></td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td id="content-webmail" class="ss-default-content" style="background: none;text-align: center;">
			    <%
				    Dim urlSAO
				    Dim urlSSZ
				    Dim urlCWB
				    
				    urlSAO = oPARAMETRO_02.Call("Get_f_Pega_Parametro", "DEFAULT_WEBMAIL_SAO", "VL_PARAMETRO")
				    urlSSZ = oPARAMETRO_02.Call("Get_f_Pega_Parametro", "DEFAULT_WEBMAIL_SSZ", "VL_PARAMETRO")
				    urlCWB = oPARAMETRO_02.Call("Get_f_Pega_Parametro", "DEFAULT_WEBMAIL_CWB", "VL_PARAMETRO")
				%>
				<%  IF Trim(urlSAO) <> "" THEN %>
				        <a href="<%=urlSAO%>" target="_blank" title="<%=urlSAO%>">SAO - SAO PAULO</a>
				<%  END IF %>
				<%  IF Trim(urlSSZ) <> "" THEN %>
				        <br />
				        <a href="<%=urlSSZ%>" target="_blank" title="<%=urlSSZ%>">SSZ - SANTOS</a>
				<%  END IF %>
				<%  IF Trim(urlCWB) <> "" THEN %>
				        <br />
				        <a href="<%=urlCWB%>" target="_blank" title="<%=urlCWB%>">CWB - CURITIBA</a>
				<%  END IF %>
			</td>
		</tr>
	</tbody>
</table>