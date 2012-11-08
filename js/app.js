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
			console.log('INITIALIZE');
			//start preloader
			Preloader.start(this.canvas, this.stage);
			Preloader.onExit = function(data){
				console.log('Preloading done..');
				that.assets = data.assets;						
				that.gotoMenu();
			}

			createjs.Ticker.setFPS(40);			
		},		
		gotoMenu : function(){
			var that = this;
			console.log('GOTO MENU');
			Menu.start(this.canvas, this.stage, this.assets);
			Menu.onExit = function(data){
				console.log('Menu Done');
				//where does it want to go?
				if(data.next == 'start'){
					that.gotoPlay();
				}else if(data.next == 'option'){
					that.gotoOption();
				}
			}
		},
		gotoPlay : function(){
			var that = this;
			Play.start(this.canvas, this.stage, this.assets);
			Play.onExit = function(data){
				console.log('Game Over');
			}
		},
		gotoGameOver : function(){

		},		
		gotoOption : function(){

		}

	}

	return App;
});


//$(document).ready(function(){
	//dido.world.init('#game_canvas');
//});