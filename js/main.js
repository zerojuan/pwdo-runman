requirejs.config({
	baseUrl : './js',
	shim : {		
		'App' : {
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
		'jquery' : 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min'		
	}
});

require(['App', 'jquery'], function(App, $){	
	App.initialize();		
});