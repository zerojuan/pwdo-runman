define('Hero',[
	'World',
	'easel',
	'sound',
	'preload'
	], function(World){
	var Hero;

	Hero = function(opts){		
		this.width = 30;
		this.height = 30;
		this.x = 0;
		this.y = 0;
		this.last = {x: 0, y: 0};
		this.spriteSheet = null;	
		this.velocity = {x: 0, y: 0};


		for(var prop in opts){		
			this[prop] = opts[prop];		
		}

		this.boundingBox = new createjs.Rectangle(20, 20, this.width, this.height);

		var boundingBoxGfx = new createjs.Graphics();
		boundingBoxGfx.beginStroke('#00ff00').drawRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
		var debugBox = new createjs.Shape(boundingBoxGfx);

		this.animation = new createjs.BitmapAnimation(this.spriteSheet);
		this.animation.gotoAndPlay('run');

		this.graphics = new createjs.Container();		
		this.graphics.addChild(this.animation);//,debugBox);

		this.graphics.x = this.x;
		this.graphics.y = this.y;

		this.onGround = false;		
		
	};

	Hero.prototype = {
		update : function(){
			var	dy = 0;
			if(this.collision){				
				//dy = -this.collision.height;				
				this.collision = null;							
			}else{
				//this.x += this.speed;				
				this.onGround = false;		
				this.velocity.y += .4;			
			}

			this.x += this.velocity.x;
			this.y += this.velocity.y;

			
							
			
			if(this.y > 600){
				this.y = 50;
			}
			
		},
		jump : function(){
			console.log('JUMP!!');
			this.velocity.y = -10;
		},
		collide : function(objB, data){
			//console.log('DATA: ' + data.width + ', ' + data.height);
			this.collision = data;

			if(data.width < data.height){
				this.separateX(objB);	
			}else{
				this.separateY(objB);		
			}
			
		},
		separateX : function(objB){
			var overlap = this.collision.width;
			var objBX = objB.x;
			//get how much the overlap
			var objADX = this.x - this.getFuturePosition().x;
			var objBDX = objB.x - objB.getFuturePosition().x;
			console.log('Change in X: ' + objADX + ' VS ' + objBDX);

			if(!objB.movable){
				//have the player absorb all the impact
				
			}
			if(objBX > this.x){
				this.x -= overlap;
			}else{
				this.x += overlap;
			}			
			
		},
		separateY : function(objB){
			var overlap = this.collision.height;
			//get how much the overlap
			if(overlap > 0){
				this.y -= overlap;
				//this.velocity.y = objB.velocity.y;	
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
		}
	}	

	return Hero;
})