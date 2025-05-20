$(document).ready(function() {
	setTimeout(function() {
		$('div#pageTabContent div.active iframe', parent.parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);

		$('div#pageTabContent .tab-pane.active', parent.parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);
		
		$('#ifrm-pcgs2101_00', parent.parent.document).css('height', ($('#ifrm-pcgs2106_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2107_01', parent.document).prop('scrollHeight') + $('#ifrm-pcgs2108_01', parent.document).prop('scrollHeight')) * 2);
	}, 1000);
});