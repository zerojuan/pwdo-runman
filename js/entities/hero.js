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
		this.last = {x: 0, y: 0};
		this.spriteSheet = null;	
		this.velocity = {x: 0, y: 0};

		for(var prop in opts){		
			this[prop] = opts[prop];		
		}

		this.alive = true;
		this.onGround = false;

		/* SETUP BOUNDING BOX */
		

		/* SETUP ANIMATION */
		
		
	};

	Hero.prototype = {
		update : function(){			
			var	dy = 0;
			if(this.collision){	
				if(this.animation.currentAnimation != 'run')
					this.animation.gotoAndPlay('run');
				this.onGround = true;				
				this.collision = null;							
			}else{							
				this.velocity.y += .4;			
			}

			this.x += this.velocity.x;
			this.y += this.velocity.y;

			
							
			
			if(this.y > 800){
				this.alive = false;
			}
			
		},
		jump : function(){			
			this.animation.gotoAndPlay('jump');
			this.onGround = false;
			this.velocity.y = -10;
		},
		collide : function(objB, data){									
			if(data.width < data.height){
				this.separateX(objB, data);	
			}else{
				this.separateY(objB, data);		
				this.collision = data;
			}			
		},
		separateX : function(objB, data){
			var overlap = data.width;
			var objBX = objB.getFuturePosition().x;
			//get how much the overlap
			var objADX = this.x - this.getFuturePosition().x;
			var objBDX = objB.x - objB.getFuturePosition().x;			

			
				if(objBX > this.x){
					//this.collision.face = 'right';			
					this.x -= overlap;
					this.velocity.x = objB.velocity.x;
				}else{
					//this.collision.face = 'left';
					this.x += overlap;
				}				
				
			
			
		},
		separateY : function(objB, data){
			var overlap = data.height;
			//get how much the overlap
			var objADX = this.y - this.getFuturePosition().y;
			var objBDX = objB.y - objB.getFuturePosition().y;			

			if(Math.abs(overlap) > 1 ){
				//this.collision.face = 'bottom';
				this.y = (objB.y + objB.boundingBox.y) - this.boundingBox.height - this.boundingBox.y;
				this.velocity.y = 0;					
				return true;
			}else{
				return false;
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