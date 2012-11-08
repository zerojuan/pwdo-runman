requirejs.config({
	baseUrl : './js',
	shim : {		
		'App' : {
			deps : ['jquery', 'easel', 'sound', 'preload', 'tween', 'cssplugin']			
		} 	
	},
	paths : {
		'text' : 'lib/text',
		'easel' : 'lib/easeljs-0.5.0.min', //'http://code.createjs.com/easeljs-0.5.0.min',
		'sound' : 'lib/soundjs-0.3.0.min', //'http://code.createjs.com/soundjs-0.3.0.min',
		'preload' : 'lib/preloadjs-0.2.0.min', //'http://code.createjs.com/preloadjs-0.2.0.min',
		'tween' : 'http://code.createjs.com/tweenjs-0.3.0.min',
		'cssplugin' : 'lib/cssplugin',
		'jquery' : 'lib/jquery-1.8.2', //'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min',
		'App' : 'app',
		'Preloader' : 'states/preloader',
		'Play' : 'states/play',
		'Menu' : 'states/menu',
		'GameOver' : 'states/gameover',
		'Tilemap' : 'utils/tilemap',		
		'ParallaxLayer' : 'entities/parallaxlayer',
		'Hero' : 'entities/hero',
		'Platform' : 'entities/platform',
		'PlatformGenerator' : 'entities/platformgenerator'
	},
	urlArgs : "bust=istouching"+(new Date()).getTime()
});

console.log('Whoah');

require(['App', 'jquery'], function(App, $){
	console.log('WHAT IS HAPPENING');
	App.initialize();
	console.log('WHAT IS HAPPENING');
	window.onerror = function(msg, url, line){
		console.log('Error');
		$('.error_container').append('<p><b>'+line+':</b>'+msg+'</p>');
	}
}, function(err){	
	$('.error_container').append('<p><b>'+err.requireModules[0]+':</b>'+err+'</p>');
});