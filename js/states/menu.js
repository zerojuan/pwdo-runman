define('Menu',[
	'jquery'
], function($){
	var Menu;

	Menu = {
		start : function(canvas, stage, assets){
			var that = this;
			this.canvas = canvas;
			this.stage = stage;
			this.assets = assets;
			
			var menuDiv = $('#menu');
			menuDiv.show();

			var title = menuDiv.find('#title');			

			var start = menuDiv.find('#start');			

			var titleBtn = new createjs.DOMElement(title[0]);
			var startBtn = new createjs.Bitmap(start[0]);
			var optsBtn = new createjs.DOMElement(menuDiv[0]);

			//start.hide();
			title.css('display', 'block');
			title.css('opacity', 0);
			//opts.hide();
//			title.fadeIn('slow');
			//start.fadeIn(2000);
			//opts.fadeIn(2400);

			createjs.CSSPlugin.install(createjs.Tween);

			startBtn.onPress = function(evt){
				that.exit();
			}

			//draw background
			var gfx = new createjs.Graphics().
							beginBitmapFill(that.assets['sky']).
							drawRect(0, 0, this.canvas.width, this.canvas.height).
							endFill();
			var background = new createjs.Shape(gfx);
			background.x = 0;
			
			createjs.Tween
				.get(title[0], {loop: true}).set({opacity:0, top: 0, left: 150}, title[0].style).wait(500)
				.to({opacity: 1, top: 90}, 1000, createjs.Ease.easeIn);

			this.stage.addChild(background);
			//this.stage.addChild(titleBtn);
			this.stage.addChild(startBtn);
			this.stage.addChild(optsBtn);

			createjs.Ticker.addListener(this);
			this.stage.update();
		},
		exit : function(){
			this.onExit({next : 'start'});
		},
		tick : function(){
			this.stage.update();
		}
	}

	return Menu;
});