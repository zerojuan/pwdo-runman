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
		
		this.isOutsideLeft = false;
		this.tileWidth = 16;
		this.tileHeight = 16;
		this.x = 50;
		this.y = 50;
		this.tilesheet = null;			
		this.immovable = true;
		this.acceleration = .5;
		this.velocity = {x : -.5, y: 0};

		this.reset(opts);
	}

	Platform.prototype = {
		update : function(){
			/* UPDATE LOGIC */
			this.velocity.x += this.acceleration;
			this.x += this.velocity.x;
			if(this.x < this.outside){
				this.isOutsideLeft = true;
			}
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
			for(var prop in opts){		
				this[prop] = opts[prop];		
			}

			//width and height are based on rows and cols
			this.width = this.cols * this.tileWidth;
			this.height = this.rows * this.tileHeight;
			this.outside = -this.width;
			
			// Setup bounding box
			this.boundingBox = new createjs.Rectangle(0, 8, this.cols * this.tileWidth, this.rows * this.tileHeight);
			var boundingBoxGfx = new createjs.Graphics();
				boundingBoxGfx.beginStroke('#00ff00')
					.drawRect(
						this.boundingBox.x, this.boundingBox.y, 
						this.boundingBox.width, this.boundingBox.height);
			var debugBox = new createjs.Shape(boundingBoxGfx);
					

			// Setup tilemap data
			var map = [];
			for(var i=0; i < this.cols; i++){
				map.push([]);
				for(var j=0; j < this.rows; j++){
					if(j == 0){					
						map[i][j] = 1;					
					}else{
						map[i][j] = 0;					
					}								
				}
			}
			
			/* INITIALIZE TILEMAP */
			var tilemap = new Tilemap({tileSheet : this.tilesheet, map : map});
						
			/* GRAPHICS */
			if(this.graphics){
				this.graphics.removeAllChildren();				
				this.isOutsideLeft = false;				
			}else{
				this.graphics = new createjs.Container();					
			}			
			this.graphics.addChild(tilemap, debugBox);
			this.graphics.x = this.x;
			this.graphics.y = this.y;					
		}
	}

	return Platform;

});