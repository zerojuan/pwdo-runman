define('Play',[
	'ParallaxLayer',
	'PlatformGenerator',
	'Hero'
], function(ParallaxLayer, PlatformGenerator, Hero){
	var Play;

	Play = {
		start : function(canvas, stage, assets){
			var that = this;
			this.canvas = canvas;
			this.stage = stage;
			this.assets = assets;
			this.gameOver = false;

			//bind to mouseup event
			
			//setup spritesheets
			

			//initialize parallax layer
			this.parallaxLayer = [];

			//initialize hero
			

			//loop through the assets, and initialize objects based on it
			

			//add the display elements to the stage
			

			//activate the DOM UI
			
			
			//set FPS and start listening to game ticks
			createjs.Ticker.setFPS(40);
			createjs.Ticker.addListener(this);
		},
		end : function(){

		},
		tick : function(){			
			this.stage.update();
		},
		collideWithGroup : function(objA, objB){			
			var groupB = objB.collidables;
			for(var i in groupB){				
				this.collides(objA, groupB[i], this.collider, objA.collide, objB.collide);
			}
		},		
		collides : function(objA, objB, collider, objACallback, objBCallback){			
			var rect1 = objA.boundingBox;
			var rect2 = objB.boundingBox;
			
			// calculate if there is an overlap between the bounds
			var r1={}, r2={};
			r1.left = rect1.x + objA.getFuturePosition().x;
			r1.top = rect1.y + objA.getFuturePosition().y;
			r1.right = r1.left + rect1.width;
			r1.bottom = r1.top + rect1.height;

			r2.left = rect2.x + objB.getFuturePosition().x;
			r2.top = rect2.y + objB.getFuturePosition().y;
			r2.right = r2.left + rect2.width;
			r2.bottom = r2.top + rect2.height;

			var x_overlap = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
			var y_overlap = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));			
			if (x_overlap > 0 && y_overlap > 0) {	
				objACallback.call(objA, objB, {width: x_overlap, height: y_overlap})						   
			} else {
			  	return null;
			}			
		}
	}

	return Play;
});