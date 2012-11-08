define('Tilemap',[	
	'easel',
	'sound',
	'preload'
	], function(easel){
	var Tilemap  = function(opts){
		this.initialize(opts);
	}

	var p = Tilemap.prototype = new createjs.DisplayObject();

	p.DisplayObject_initialize = p.initialize;

	p.initialize = function(opts){
		this.DisplayObject_initialize();
		if(opts.tileSheet){
			this.tileSheet = opts.tileSheet;
		}
		if(opts.map){
			this.map = opts.map;			
		}else{
			this.map = [
				[0, 0],
				[1, 1]
			];
		}
		var canvas = document.createElement('canvas');
		canvas.width = this.map.length * 16;
		canvas.height = this.map[0].length * 16;
		var localContext = canvas.getContext("2d");
		var img = this.tileSheet;
		for(var x = 0; x < this.map.length; x++){
				for(var y = 0; y < this.map[x].length; y++){
					localContext.drawImage(img, this.map[x][y] * 16, 0, 16, 16, x * 16, y * 16, 16, 16 );		
				}
		}	
		this.image = new Image();
		this.image.src = canvas.toDataURL("image/png");	
		this.isDirty = true;
	}

	p.DisplayObject_draw = p.draw;

	p.draw = function(ctx, ignoreCache){
		//this is where you draw				
		//if(this.isDirty){
			var img = this.image;
			ctx.drawImage(img, 0, 0, img.width, img.height);							
			this.isDirty = false;
		//}
		

		return true;
	}

	return Tilemap;

});