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
			this.canvas = $('#game_canvas')[0];
			this.stage = new createjs.Stage(this.canvas);

			createjs.Touch.enable(this.stage);
			
			//start preloader
			Preloader.enter(this.canvas, this.stage);
			Preloader.onExit = function(assets){
				console.log('Preloading done..');
				that.assets = assets;						
				that.gotoMenu();
			}


		},		
		gotoMenu : function(){
			var that = this;
			//start Menu state			
			Menu.enter(this.canvas, this.stage, this.assets);
			Menu.onExit = function(data){				
				that.gotoPlay();
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