// JavaScript Document


function jsSalvar(formulario) {
	jsForms       = document.getElementsByTagName('form');
	jsCurrentForm = jsForms[formulario];
	jsAction      = jsCurrentForm.getAttribute('action');
	jConfirm('Deseja Salvar este Registro?','Atenção',function(r) {if (r) {jsCurrentForm.action = (jsAction+'&Save=1');jsCurrentForm.submit();}});
}

function jsExcluir(formulario) {
	jsForms = document.getElementsByTagName('form');
	jsCurrentForm = jsForms[formulario];
	jsAction   = jsCurrentForm.getAttribute('action');
	jConfirm('Deseja Excluir este Registro?','Atenção',function(r) {if (r) {jsCurrentForm.action = (jsAction+'&Delete=1');jsCurrentForm.submit();}});
}

function jsRefresh(formulario) {
	jsForms = document.getElementsByTagName('form');
	jsCurrentForm = jsForms[formulario];
	jsAction   = jsCurrentForm.getAttribute('action');
	jConfirm('Deseja Limpar este Registro?','Atenção',function(r) {if (r) {jsCurrentForm.action = (jsAction+'&Clear=1');jsCurrentForm.submit();}});
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