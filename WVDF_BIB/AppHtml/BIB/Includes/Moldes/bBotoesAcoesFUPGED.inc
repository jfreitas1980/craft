<button type="button" id="btnSalvar" class="btn btn-success"  onClick="jsSalvar(0)">  <i class="fa fa-floppy-o"></i> <%=oPAG312_01.DDValue("Csag312.Salvar")%> </button>
<button type="button" id="btnNovo" class="btn btn-primary"  onClick="jsRefresh(0)"> <i class="fa fa-file-o">  </i> <%=oPAG312_01.DDValue("Csag312.Limpar")%> </button>
<button type="button" id="btnExcluir" class="btn btn-danger"   onClick="jsExcluir(0)"> <i class="fa fa-trash-o"> </i> <%=oPAG312_01.DDValue("Csag312.Excluir")%></button>
<button type="button" id="btnPesquisar" class="btn btn-warning"  onClick="javascript:window.open('<%=aPesquisa%>.asp?aUsuarioSessao=<%=aUsuarioSessao%><%=aPesquisaParametro%>','_self'); scrollTo(0,0); parent.scrollTo(0,0); parent.parent.scrollTo(0,0);"><i class="fa fa-search"></i> <%=oPAG312_01.DDValue("Csag312.Pesquisar")%></button>
<button type="button" id="btnGed" data-toggle="modal" data-target="#uploadModal" class="btn btn-purple"> <i class="fa fa-cloud-upload"> </i> Documentos</button>

<!-- Modal -->
<div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="uploadModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <hr />
		<h4 class="modal-title well well-sm" id="uploadModalLabel">
			Gerenciamento de Documentos
		</h4>
      </div>
      <div class="modal-body">
        <iframe id="iframeUpload" width="100%" height="100%" frameborder="0"></iframe>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>