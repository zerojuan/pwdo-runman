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
			this.spriteSheet = {
				animations : {
					run : {
						frames : [0, 1, 2, 3, 4, 5],
						frequency: 2
					},
					jump : {
						frames : [6, 7, 8, 9, 8],
						frequency: 2,
						next : 'false'
					}
				},
				frames : {
					width : 68.5, height: 57
				},
				images : ['assets/funrunframes.gif']
			};

			//initialize parallax layer
			this.parallaxLayer = [];

			//initialize hero
			var ss = new createjs.SpriteSheet(this.spriteSheet);
			this.hero = new Hero({
							spriteSheet : ss,
							x : 100,
							y: 100,
							velocity : {x: 0, y:5}
							});

			//loop through the assets, and initialize objects based on it
			for(var i in this.assets){
				var result = this.assets[i];

				switch(i){
					case "sky" :												
						that.parallaxLayer['sky'] = new ParallaxLayer({
							bitmap: result, 
							x: 0, y: 0, 
							width: 800,
							height: 600, 
							speed: 0,
							acceleration : 0
						});												
						break;
					case "ground1" :
						that.parallaxLayer['ground1'] = new ParallaxLayer({
							bitmap: result, 
							x: 0, y: 250, 
							width: 700, height: 300, 
							speed: .5,
							acceleration : .0005
						});												
						break;
					case "ground2" :
						that.parallaxLayer['ground2'] = new ParallaxLayer({
							bitmap: result, 
							x: 0, y: 280, 
							width: 900, height: 300, 
							speed: 1,
							acceleration : .005
						});																		
						break;
					case "platforms" : 
						that.platformGenerator = new PlatformGenerator({bitmap : result, x : 0, y: 0, acceleration: .01});
						break;
				}
			}

			//add the display elements to the stage
			this.stage.addChild(
				this.parallaxLayer['sky'].graphics,
				this.parallaxLayer['ground1'].graphics,
				this.parallaxLayer['ground2'].graphics,
				this.hero.graphics,
				this.platformGenerator.graphics);

			//activate the DOM UI
			
			
			//set FPS and start listening to game ticks
			createjs.Ticker.setFPS(40);
			createjs.Ticker.addListener(this);
		},
		exit : function(){

		},
		tick : function(){
			//while game over condition is not yet met
			if(this.hero.alive && !this.gameOver){
				//listen to user input
				if(this.jumpClicked){
					console.log('JUMP CLICKED');
					this.hero.jump();
					this.jumpClicked = false;
				}
				//try collision			
				this.collideWithGroup(this.hero, this.platformGenerator);

				//update hero info
				this.hero.update();				
			}else{
				//trigger death state
				this.exit();
				this.gameOver = true;
			}

			//update our platform generator			

			//update our parallax
			for(var i in this.parallaxLayer){
				this.parallaxLayer[i].update();
			}
			

			//render everything
			this.hero.render();
			this.platformGenerator.render();
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