define('Platform', [
	'World',
	'Tilemap',
	'easel',
	'sound',
	'preload'	
	], function(World, Tilemap){

	var Platform;

	Platform = function(opts){
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

		this.boundingBox = new createjs.Rectangle(0, 8, this.cols * this.tileWidth, this.rows * this.tileHeight);

		//var tilemap = new createjs.Container();

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

		var tilemap = new Tilemap({tileSheet : this.tilesheet, map : map});		
		var boundingBoxGfx = new createjs.Graphics();
		boundingBoxGfx.beginStroke('#00ff00').drawRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
		var debugBox = new createjs.Shape(boundingBoxGfx);

		this.graphics = new createjs.Container();
		this.graphics.addChild(tilemap, debugBox);
		this.graphics.x = this.x;
		this.graphics.y = this.y;		
	}

	Platform.prototype = {
		update : function(){
			this.velocity.x -= this.acceleration;
			this.x += this.velocity.x;
			if(this.x < this.outside){
				this.isVisible = false;
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

			this.width = this.cols * this.tileWidth;
			this.height = this.rows * this.tileHeight;
			this.outside = -this.width;

			this.boundingBox = new createjs.Rectangle(0, 8, this.cols * this.tileWidth, this.rows * this.tileHeight);

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

			var tilemap = new Tilemap({tileSheet : this.tilesheet, map : map});	

			var boundingBoxGfx = new createjs.Graphics();
			boundingBoxGfx.beginStroke('#00ff00').drawRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
			var debugBox = new createjs.Shape(boundingBoxGfx);

						
			this.graphics.removeAllChildren();
			this.graphics.addChild(tilemap, debugBox);
			this.graphics.x = this.x;
			this.graphics.y = this.y;

			this.isVisible = true;
		}
	}

	return Platform;

});