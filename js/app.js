define('App', [
	'jquery',	
	'Preloader',
	'Menu',
	'Play',
	'GameOver',
	'easel',
	'sound',
	'preload'
], function($, Preloader, Menu, Play, GameOver){
	var App;

	App = {
		initialize : function(){			
			var that = this;

			//initialize canvas and stage
			
			//start preloader


		},		
		gotoMenu : function(){
			var that = this;
			//start Menu state			
			Menu.enter(this.canvas, this.stage, this.assets);
			Menu.onExit = function(data){				
				
			}
		},
		gotoPlay : function(){
			var that = this;
			//start Play state
			Play.enter(this.canvas, this.stage, this.assets);
			Play.onExit = function(data){
				console.log('Game Over');
			}
		},
		gotoGameOver : function(){

		}

	}

	return App;
});


//$(document).ready(function(){
	//dido.world.init('#game_canvas');
//});