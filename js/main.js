requirejs.config({
	baseUrl : './js',
	shim : {		
		'App' : {
			deps : ['jquery', 'easel', 'sound', 'preload']			
		} 	
	},
	paths : {
		'text' : 'lib/text',
		'easel' : 'lib/easeljs-0.5.0.min', //'http://code.createjs.com/easeljs-0.5.0.min',
		'sound' : 'lib/soundjs-0.3.0.min', //'http://code.createjs.com/soundjs-0.3.0.min',
		'preload' : 'lib/preloadjs-0.2.0.min', //'http://code.createjs.com/preloadjs-0.2.0.min',
		'jquery' : 'lib/jquery-1.8.2', //'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min',
		'App' : 'app',
		'World' : 'entities/world',
		'ParallaxLayer' : 'entities/parallaxLayer',
		'Hero' : 'entities/hero',
		'Platform' : 'entities/platform',
		'PlatformGenerator' : 'entities/platformgenerator'
	},
	urlArgs : "bust="+(new Date()).getTime()
});

require(['App'], function(App){	
	App.initialize();
});