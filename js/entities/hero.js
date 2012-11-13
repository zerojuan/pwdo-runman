define('Hero',[	
	'easel',
	'sound',
	'preload'
	], function(){
	var Hero;

	Hero = function(opts){
		// INITIALIZE PROPERTIES		
		this.width = 30;
		this.height = 30;
		this.x = 0;
		this.y = 0;		
		this.spriteSheet = null;
		this.acceleration = .4;	
		this.velocity = {x: 0, y: 0};

		for(var prop in opts){		
			this[prop] = opts[prop];		
		}

		this.alive = true;
		this.onGround = false;

		// setup bounding box with an offset of x: 20, y: 20
		this.boundingBox = new createjs.Rectangle(20, 20, this.width, this.height);

		// Bounding box graphics					
		var boundingBoxGfx = new createjs.Graphics();
		boundingBoxGfx.beginStroke('#00ff00')
			.drawRect(this.boundingBox.x, 
					this.boundingBox.y, 
					this.boundingBox.width, 
					this.boundingBox.height);
		var debugBox = new createjs.Shape(boundingBoxGfx);
		
		
		// setup animation
		this.animation = new createjs.BitmapAnimation(this.spriteSheet);
		this.animation.gotoAndPlay('run');
		
		// Create our graphics container
		this.graphics = new createjs.Container();		
		this.graphics.addChild(this.animation, debugBox);

		this.graphics.x = this.x;
		this.graphics.y = this.y;
	};

	Hero.prototype = {
		update : function(){
			if(this.collision){	
				if(this.animation.currentAnimation != 'run')
					this.animation.gotoAndPlay('run');
				this.onGround = true;				
				this.collision = null;
			}else{							
				this.velocity.y += this.acceleration;			
			}

			this.x += this.velocity.x;
			this.y += this.velocity.y;

			if(this.y > 800){
				this.y = -50;
			}			
		},
		render : function(){
			this.graphics.x = this.x;
			this.graphics.y = this.y;			
		},
		getFuturePosition : function(){
			return {
				x : this.x + this.velocity.x,
				y : this.y + this.velocity.y
			}
		},
		jump : function(){	
			this.animation.gotoAndPlay('jump');
			this.onGround = false;
			this.velocity.y = -10;
		},
		collide : function(objB, data){
		    //check if the hero collided from the top/bottom 
		    //or from the sides
			if(data.width < data.height){
				this._separateX(objB, data);	
			}else{
				this._separateY(objB, data);		
				this.collision = data;
			}
		},
		_separateX : function(objB, data){
			var overlap = data.width;
			var objBX = objB.getFuturePosition().x;		

			if(objBX > this.x){
				//Collided on 'right';			
				this.x -= overlap;        
		                //'absorb' the velocity of the collided object
				this.velocity.x = objB.velocity.x;
			}else{
				//Collided on 'left';
				this.x += overlap;
			}
		},
		_separateY : function(objB, data){
			var overlap = data.height;	

			if(overlap > 1 ){
				//Collided on bottom
				this.y = (objB.y + objB.boundingBox.y) - this.boundingBox.height - this.boundingBox.y;
				this.velocity.y = 0;			
			}
		}
	}	

	return Hero;
})