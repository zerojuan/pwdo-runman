define('World', [
		'jquery',
		'ParallaxLayer',
		'PlatformGenerator',
		'Hero',
		'easel',
		'sound',
		'preload'		
], function($, ParallaxLayer, PlatformGenerator, Hero){
	var World;

	var assetManifest = [
		{src:"assets/funrunframes.gif", id:"panda"},
		{src:"assets/parallax-sky.gif", id: "sky" },
		{src:"assets/mountain1.gif", id: "ground1"},
		{src:"assets/mountain2.gif", id: "ground2"},
		{src:"assets/platform-tiles.png", id: "platforms"}
	];

	World = {		
		init : function(element){		
			var that = this;

			this.canvas = $(element)[0];
			console.log(this.canvas);					

			this.stage = new createjs.Stage(this.canvas);

			if('ontouchstart' in document.documentElement){
				console.log('TOUCHE THIS SHIT');
				this.canvas.addEventListener('touchStart', function(e){
					console.log('Touch Happens');
					that.handleInput();
				});
			}else{
				console.log('CLICKED THIS SHIT');
				this.stage.onMouseDown = function(evt){
					that.handleInput(evt);
				}
				//this.canvas.addEventListener('click', that.handleInput);
				//this.canvas.addEventListener('click', = this.handleInput;
			}
			

			this.spriteSheet = {
				animations : {
					run : {
						frames : [0, 1, 2, 3, 4, 5],
						frequency: 2
					},
					jump : [6, 9, 'run', 2]
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
			

			this.assets = [];

			//load art assets
			this.loader = new createjs.PreloadJS();
			this.loader.useXHR = false;			
			this.loader.onFileLoad = function(evt){
				that.handleFileLoad(evt);
			};

			this.loader.onComplete = function(){
				that.handleComplete();
			}			
			this.loader.loadManifest(assetManifest);

			this.stage.autoClear = true;
		},
		handleFileLoad : function(event){
			this.assets.push(event);
		},
		handleComplete : function(){
			var that = this;			
			for(var i = 0; i < this.assets.length; i++){
				var item = this.assets[i];
				var id = item.id;
				var result = item.result;
				console.log(item.id);
				if(item.type == createjs.PreloadJS.IMAGE){
					var bmp = new createjs.Bitmap(result);
				}

				switch(id){
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
							acceleration : .0005});												
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
						that.platformGenerator = new PlatformGenerator({bitmap : bmp, x : 0, y: 0, acceleration: .01});
						break;
				}
				
			}

			this.stage.addChild(
				this.parallaxLayer['sky'].graphics, 
				this.parallaxLayer['ground1'].graphics, 
				this.parallaxLayer['ground2'].graphics,				
				this.hero.graphics,
				this.platformGenerator.graphics);				

			createjs.Ticker.setFPS(40);
			createjs.Ticker.addListener(this);
		},
		tick : function(){
			if(this.jumpClicked){
				console.log('JUMP CLICKED');
				this.hero.jump();
				this.jumpClicked = false;
			}
			//update			
			this.collideWithGroup(this.hero, this.platformGenerator);

			this.hero.update();
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
			console.log('INPUT IS WHATUP');
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
		separateX : function(objA, objB){
			console.log('Separate X');
			//ensure that the two objects are immovable
			if(objA.immovable && objB.immovable ){
				return false;
			}

			var overlap = 0;
			var obj1Delta = objA.getFuturePosition().x - objA.x;
			var obj2Delta = objB.getFuturePosition().x - objB.x;
			if(obj1Delta != obj2Delta){
				
			}
			return true;
		},
		separateY : function(objA, objB){
			console.log('Separate Y');
			return true;
		},
		collides : function(objA, objB, collider, objACallback, objBCallback){
			if(this.collider(objA, objB)){
				//do callback
				console.log('Do callback');
			}

			/*//console.log(objA);
			var rect1 = objA.boundingBox;
			var rect2 = objB.boundingBox;
			
			// first we have to calculate the
			// center of each rectangle and half of
			// width and height
			var dx, dy, r1={}, r2={};
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
			  objA.collide(objB, {width: x_overlap, height: y_overlap});			  
			} else {
			  return null;
			}
			*/
		}
	}

	return World;
})