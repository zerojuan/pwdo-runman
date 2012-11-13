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


		// bounding box graphics
		

		// setup animation
		
		// Create our graphics container
	};

	Hero.prototype = {
		update : function(){			

			
		},
		render : function(){
			
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