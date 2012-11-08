define('Platform', [	
	'Tilemap',
	'easel',
	'sound',
	'preload'	
	], function(Tilemap){

	var Platform;

	Platform = function(opts){
		// INITIALIZE PROPERTIES
		this.width = 0;
		this.height = 0;
		this.rows = 10;
		this.cols = 10;
		this.isVisible = true;
		this.tileWidth = 16;
		this.tileHeight = 16;
		this.x = 50;
		this.y = 50;
		this.tilesheet = null;	
		this.speed = 0;
		this.immovable = true;
		this.velocity = {x : -.5, y: 0};

		for(var prop in opts){		
			this[prop] = opts[prop];		
		}

		this.width = this.cols * this.tileWidth;
		this.height = this.rows * this.tileHeight;
		this.outside = -this.width;

		/* SETUP BOUNDING BOX */


		/* SETUP TILE MAP DATA*/
				

		/* INITIALIZE TILEMAP */
		
		
		/* GRAPHICS */
	}

	Platform.prototype = {
		update : function(){
			/* UPDATE LOGIC */
			
		},
		render : function(){
			this.graphics.x = this.x;
		},		
		getFuturePosition : function(){
			return {
				x : this.x + this.velocity.x,
				y : this.y + this.velocity.y
			}
		},
		reset : function(opts){
			/* INITIALIZE TILEMAP */
		}
	}

	return Platform;

});