requirejs.config({
	baseUrl : './js',
	shim : {		
		'App' : { 
			//make sure these modules are loaded before starting the app
			deps : ['jquery', 'easel', 'sound', 'preload', 'tween', 'cssplugin']			
		} 	
	},
	paths : {
		'text' : 'lib/text',
		'easel' : 'lib/easeljs-0.5.0.min', 
		'sound' : 'lib/soundjs-0.3.0.min', 
		'preload' : 'lib/preloadjs-0.2.0.min',
		'tween' : 'http://code.createjs.com/tweenjs-0.3.0.min',
		'cssplugin' : 'lib/cssplugin',
		'jquery' : 'lib/jquery-1.8.2'
		// LOAD OUR OWN MODULES		
	}
});

require(['App'], function(App){	
	App.initialize();		
});