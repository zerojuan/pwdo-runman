define('Menu',[
	'jquery'
], function($){
	var Menu;

	Menu = {
		enter : function(canvas, stage, assets){
			var that = this;
			this.canvas = canvas;
			this.stage = stage;
			this.assets = assets;

			//initialize our DOM based UI			

			//wrap our DOM element to handle mouse/touch events

			//draw background

			//add to display list

			//listen to ticks

			//do some simple tweening			
		},
		exit : function(){
			this.onExit();
		},
		tick : function(){

		}
	}

	return Menu;
});