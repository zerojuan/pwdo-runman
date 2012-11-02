define('Platform', [
	'World',
	'easel',
	'sound',
	'preload'	
	], function(World){

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
		this.velocity = {x : .5, y: 0};

		for(var prop in opts){		
			this[prop] = opts[prop];		
		}

		this.width = this.cols * this.tileWidth;
		this.height = this.rows * this.tileHeight;
		this.outside = -this.width;

		this.boundingBox = new createjs.Rectangle(0, 8, this.cols * this.tileWidth, this.rows * this.tileHeight);

		var tilemap = new createjs.Container();

		for(var i=0; i < this.cols; i++){
			for(var j=0; j < this.rows; j++){
				if(j == 0){
					console.log('I: '+i +' J: ' + j);
					this.drawTile(tilemap, this.tilesheet, 1, i, j);						
				}else{
					this.drawTile(tilemap, this.tilesheet, 0, i, j);						
				}								
			}
		}		
				
		var boundingBoxGfx = new createjs.Graphics();
		boundingBoxGfx.beginStroke('#00ff00').drawRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
		var debugBox = new createjs.Shape(boundingBoxGfx);

		this.graphics = new createjs.Container();
		this.graphics.addChild(tilemap);//, debugBox);
		this.graphics.x = this.x;
		this.graphics.y = this.y;		
	}

	Platform.prototype = {
		update : function(){
			this.velocity.x += this.acceleration;
			this.x -= this.velocity.x;
			if(this.x < this.outside){
				this.isVisible = false;
			}
		},
		render : function(){
			this.graphics.x = this.x;
		},
		drawTile : function(graphics, tilesheet, frame, row, col){
			var tile = tilesheet.clone();
			tile.sourceRect = new createjs.Rectangle(frame * this.tileWidth, 0, this.tileWidth, this.tileHeight);
			tile.x = row * this.tileWidth;
			tile.y = col * this.tileHeight;
			graphics.addChild(tile);					
		},
		getFuturePosition : function(){
			return {
				x : this.x + this.velocity.x,
				y : this.y + this.velocity.y
			}
		},
		reset : function(opts){
			this.x = opts.x;
			this.isVisible = true;
		}
	}

	return Platform;

});