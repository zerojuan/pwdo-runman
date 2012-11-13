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
			$('.ui').css('display', 'none');
			var menuDiv = $('#menuDiv');
			menuDiv.css('display', 'block');

			this.title = menuDiv.find('#title');
			this.start = menuDiv.find('#start');

			this.title.css('opacity', 0);
			this.title.css('position', 'absolute');			


			//img tags can also be used as bitmap
			var startBtn = new createjs.Bitmap(this.start[0]);
			this.start.remove(); //*quirk* mouse events don't work unless you remove the dom element first
			startBtn.onClick = function(evt){
				that.exit();
			}
			startBtn.x = 350;
			startBtn.y = 400;

			//draw background
			var gfx = new createjs.Graphics().
				beginBitmapFill(this.assets['sky']).
				drawRect(0, 0, this.canvas.width, this.canvas.height).
				endFill();
			var background = new createjs.Shape(gfx);
			background.x = 0;

			//add to display list
			this.stage.addChild(background, startBtn);

			//listen to ticks
			createjs.Ticker.setFPS(40);
			createjs.Ticker.addListener(this);

			createjs.CSSPlugin.install(createjs.Tween);

			//do some simple tweening
			createjs.Tween
				.get(this.title[0])
				.set({top: 0, left: 150}, this.title[0].style)
				.wait(500)
				.to({opacity: 1, top: 150}, 1000, createjs.Ease.easeIn);			
		},
		exit : function(){
			//kill the tick listeners
			createjs.Ticker.removeListener(this);
			//remove children
			this.stage.removeAllChildren();
			this.onExit();
		},
		tick : function(){
			this.stage.update(); //update the stage every tick
		}
	}

	return Menu;
});