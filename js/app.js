define('App', [
	'jquery',	
	'World',
	'easel',
	'sound',
	'preload'
], function($, World){
	var App;

	App = {
		initialize : function(){
			console.log('Initialized');
			World.init('#game_canvas');
		},

	}

	return App;
});


//$(document).ready(function(){
	//dido.world.init('#game_canvas');
//});