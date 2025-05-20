	initializeWindows = function(){

		//-------------------------------------------------------------------------------------
		//---Inicializacao das janelas - INICIO IFRAME

             MUI.Grid_Clientes_Devedores = function(){
             	new MUI.Window({
             		id:         'Grid_Clientes_Devedores',
             		title:      'Iframe Tests',
             		loadMethod: 'iframe',
             		contentURL: 'xds_index.html'
             	});
             }
             if ($('iframetestsLinkCheck')) {
             	$('iframetestsLinkCheck').addEvent('click', function(e){
             	new Event(e).stop();
             		MUI.Grid_Clientes_Devedores();
             	});
             }

		//---Inicializacao das janelas - FINAL IFRAME
		//-------------------------------------------------------------------------------------

		//-------------------------------------------------------------------------------------
		//---Inicializacao do Relogio - INICIO

             MUI.clockWindow = function(){
             	new MUI.Window({
             		id: 'clock',
             		title: 'Canvas Clock',
             		addClass: 'transparent',
             		loadMethod: 'xhr',
             		contentURL: 'plugins/coolclock/index.html',
             		shape: 'gauge',
             		headerHeight: 30,
             		width: 160,
             		height: 160,
             		x: 0,
             		y: 115,
             		padding: { top: 0, right: 0, bottom: 0, left: 0 },
             		require: {
             			js: [MUI.path.plugins + 'coolclock/scripts/coolclock.js'],
             			onload: function(){
             				if (CoolClock) new CoolClock();
             			}
             		}
             	});
             }
             if ($('clockLinkCheck')){
             	$('clockLinkCheck').addEvent('click', function(e){
             		new Event(e).stop();
             		MUI.clockWindow();
             	});
             }

		//---Inicializacao do Relogio - FINAL
		//-------------------------------------------------------------------------------------

		//-------------------------------------------------------------------------------------
		//---Inicializacao dos Parametros das janelas - INICIO

		MUI.parametricsWindow = function(){
			new MUI.Window({
				id: 'parametrics',
				title: 'Window Parametrics',
				contentURL: MUI.path.plugins + 'parametrics/index.html',
				width: 305,
				height: 110,
				x: 570,
				y: 160,
				padding: { top: 12, right: 12, bottom: 10, left: 12 },
				resizable: false,
				maximizable: false,
				require: {
					css: [MUI.path.plugins + 'parametrics/css/style.css'],
					js: [MUI.path.plugins + 'parametrics/scripts/parametrics.js'],
					onload: function(){
						if (MUI.addRadiusSlider) MUI.addRadiusSlider();
						if (MUI.addShadowSlider) MUI.addShadowSlider();
					}
				}
			});
		};
		if ($('parametricsLinkCheck')){
			$('parametricsLinkCheck').addEvent('click', function(e){
				new Event(e).stop();
				MUI.parametricsWindow();
			});
		}

		//---Inicializacao dos Parametros das janelas - FINAL
		//-------------------------------------------------------------------------------------

		//-------------------------------------------------------------------------------------
		//---Inicializacao do menu - INICIO

		if ($('workLink')) {
			$('workLink').addEvent('click', function(e){
				new Event(e).stop();
				MUI.toggleWindowVisibility();
			});
		}

		if ($('cascadeLink')) {
			$('cascadeLink').addEvent('click', function(e){
				new Event(e).stop();
				MUI.arrangeCascade();
			});
		}

		if ($('tileLink')) {
			$('tileLink').addEvent('click', function(e){
				new Event(e).stop();
				MUI.arrangeTile();
			});
		}

		if ($('closeLink')) {
			$('closeLink').addEvent('click', function(e){
				new Event(e).stop();
				MUI.closeAll();
			});
		}

		if ($('minimizeLink')) {
			$('minimizeLink').addEvent('click', function(e){
				new Event(e).stop();
				MUI.minimizeAll();
			});
		}

		//---Inicializacao do menu - FINAL
		//-------------------------------------------------------------------------------------



		// Deactivate menu header links
		$$('a.returnFalse').each(function(el){
			el.addEvent('click', function(e){
				new Event(e).stop();
			});
		});

		// Build windows onLoad
	//	MUI.clockWindow();
	//	MUI.Grid_Clientes_Devedores();
		MUI.myChain.callChain();

	}

	// Initialize MochaUI when the DOM is ready
	window.addEvent('load', function(){

		MUI.myChain = new Chain();
		MUI.myChain.chain(
			function(){MUI.Desktop.initialize();},
			function(){MUI.Dock.initialize();},
			function(){initializeWindows();}
		).callChain();

	});

	window.addEvent('unload', function(){
		// This runs when a user leaves your page.
	});
