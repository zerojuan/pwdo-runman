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
		'Tilemap' : 'utils/tilemap',
		'World' : 'entities/world',
		'ParallaxLayer' : 'entities/parallaxlayer',
		'Hero' : 'entities/hero',
		'Platform' : 'entities/platform',
		'PlatformGenerator' : 'entities/platformgenerator'
	},
	urlArgs : "bust=13242.2323"//+(new Date()).getTime()
});

require(['App', 'jquery'], function(App, $){	
	App.initialize();
	window.onerror = function(msg, url, line){
		console.log('Error');
		$('.error_container').append('<p><b>'+line+':</b>'+msg+'</p>');
	}
}, function(err){	
	$('.error_container').append('<p><b>'+err.requireModules[0]+':</b>'+err+'</p>');
});