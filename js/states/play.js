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

			this.stage.onMouseUp = function(evt){
				that.handleInput(evt);
			}

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

			this.parallaxLayer = [];

			var ss = new createjs.SpriteSheet(this.spriteSheet);
			this.hero = new Hero({
							spriteSheet : ss,
							x : 100,
							y: 100,
							velocity : {x: 0, y:5}
							});

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

			this.stage.addChild(
				this.parallaxLayer['sky'].graphics,
				this.parallaxLayer['ground1'].graphics,
				this.parallaxLayer['ground2'].graphics,
				this.hero.graphics,
				this.platformGenerator.graphics);

			var score = document.getElementById('game');
			score.style.display = 'block';			
			console.log(score);
			var scoreUI = new createjs.DOMElement(score);
			scoreUI.x = 0;
			scoreUI.y = 100;
			scoreUI.alpha = 1;
			this.stage.addChild(scoreUI);

			createjs.Ticker.setFPS(40);
			createjs.Ticker.addListener(this);
		},
		exit : function(){

		},
		tick : function(){
			if(this.hero.alive && !this.gameOver){
				if(this.jumpClicked){
					console.log('JUMP CLICKED');
					this.hero.jump();
					this.jumpClicked = false;
				}
				//update			
				this.collideWithGroup(this.hero, this.platformGenerator);

				this.hero.update();				
			}else{
				//show death state
				this.exit();
				this.gameOver = true;
			}

			this.platformGenerator.update();

			for(var i in this.parallaxLayer){
				this.parallaxLayer[i].update();
			}
			

			//render
			this.hero.render();
			this.platformGenerator.render();
			this.stage.update();
		},		
		handleInput : function(){
			this.jumpClicked = true;
		},
		collideWithGroup : function(objA, objB){			
			var groupB = objB.collidables;
			for(var i in groupB){				
				this.collides(objA, groupB[i], this.collider, objA.collide, objB.collide);
			}
		},
		collider : function(objA, objB){
			var separatedX = this.separateX(objA, objB);
			var separatedY = this.separateY(objA, objB);
			return separatedY || separatedX;
		},
		collides : function(objA, objB, collider, objACallback, objBCallback){
			/*if(this.collider(objA, objB)){
				//do callback
				objACallback.call(objA);
			}*/

			//console.log(objA);
			var rect1 = objA.boundingBox;
			var rect2 = objB.boundingBox;
			
			// first we have to calculate the
			// center of each rectangle and half of
			// width and height
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