function jsSalvar(formulario) {
	jsForms       = document.getElementsByTagName('form');
	jsCurrentForm = jsForms[formulario];
	jsAction      = jsCurrentForm.getAttribute('action');
	
	alertify.confirm('Deseja salvar este registro?', function (e) {
		if (e) {
			jsCurrentForm.action = (jsAction+'&Save=1');
			jsCurrentForm.submit();
		}
	});
	
	parent.parent.scrollTo(0,0);
}

function jsSalvarFechar(formulario) {
	jsForms       = document.getElementsByTagName('form');
	jsCurrentForm = jsForms[formulario];
	jsAction      = jsCurrentForm.getAttribute('action');
	
	alertify.confirm('Deseja salvar este registro?', function (e) {
		if (e) {
			jsCurrentForm.action = (jsAction+'&Save=1');
			jsCurrentForm.submit();
			top.close();
		}
	});
	
	parent.parent.scrollTo(0,0);
}

function jsExcluir(formulario) {
	jsForms = document.getElementsByTagName('form');
	jsCurrentForm = jsForms[formulario];
	jsAction   = jsCurrentForm.getAttribute('action');
	
	alertify.confirm('Deseja excluir este registro?', function (e) {
		if (e) {
			jsCurrentForm.action = (jsAction+'&Delete=1');
			jsCurrentForm.submit();
		}
	});
	
	parent.parent.scrollTo(0,0);
}

function jsRefresh(formulario) {
	jsForms = document.getElementsByTagName('form');
	jsCurrentForm = jsForms[formulario];
	jsAction   = jsCurrentForm.getAttribute('action');
	
	alertify.confirm('Deseja criar um novo registro?', function (e) {
		
			jsCurrentForm.action = (jsAction+'&Clear=1');
			jsCurrentForm.submit();
		
	});
	
	parent.parent.scrollTo(0,0);
}

function jsFindFirst(formulario) {
	jsForms              = document.getElementsByTagName('form');
	jsCurrentForm        = jsForms[formulario];
	jsAction             = jsCurrentForm.getAttribute('action');
	jsCurrentForm.action = (jsAction+'&FindFirst=1');
	jsCurrentForm.submit();
}

function jsFindPrev(formulario) {
	jsForms              = document.getElementsByTagName('form');
	jsCurrentForm        = jsForms[formulario];
	jsAction             = jsCurrentForm.getAttribute('action');
	jsCurrentForm.action = (jsAction+'&FindPrev=1');
	jsCurrentForm.submit();
}

function jsFind(formulario) {
	jsForms              = document.getElementsByTagName('form');
	jsCurrentForm        = jsForms[formulario];
	jsAction             = jsCurrentForm.getAttribute('action');
	jsCurrentForm.action = (jsAction+'&Find=1');
	jsCurrentForm.submit();
}

function jsFindNext(formulario) {
	jsForms              = document.getElementsByTagName('form');
	jsCurrentForm        = jsForms[formulario];
	jsAction             = jsCurrentForm.getAttribute('action');
	jsCurrentForm.action = (jsAction+'&FindNext=1');
	jsCurrentForm.submit();
}

function jsFindLast(formulario) {
	jsForms              = document.getElementsByTagName('form');
	jsCurrentForm        = jsForms[formulario];
	jsAction             = jsCurrentForm.getAttribute('action');
	jsCurrentForm.action = (jsAction+'&FindLast=1');
	jsCurrentForm.submit();
}