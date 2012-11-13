define('ParallaxLayer', [				
		'easel',
		'sound'		
	], function(){
	var ParallaxLayer;

	ParallaxLayer = function(opts){
		this.width = 0;
		this.height = 0;
		this.x = 0;
		this.y = 0;
		this.bitmap = null;
		this.velocity = {}			
		this.acceleration = 0;

		for(var prop in opts){		
			this[prop] = opts[prop];		
		}

		this.outside = -this.width;
		
		var graphicsLocal = new createjs.Graphics()
		.beginBitmapFill(this.bitmap)
		.drawRect(0,0, this.width, this.height)
		.endFill();

		//create two copies of the image		
		this.shapeA = new createjs.Shape(graphicsLocal);
		this.shapeB = new createjs.Shape(graphicsLocal);
		//position our 2nd image to the left of the 1st one
		this.shapeB.x = this.width;

		this.graphics = new createjs.Container();		
		this.graphics.addChild(this.shapeA, this.shapeB);

		this.graphics.x = this.x;
		this.graphics.y = this.y;		
	};

	ParallaxLayer.prototype = {
		update : function(){
			 //keep accelerating the x velocity
			this.velocity.x += this.acceleration;			
		},
		render : function(){
			//if shapeA has moved completely off the left screen
			if(this.shapeA.x < this.outside){
		        //move it to the back of shapeB
				var temp = this.shapeA;
				temp.x = this.shapeB.x+this.width;
		        //switch shapeA to shapeB and shapeB to shapeA
				this.shapeA = this.shapeB;
				this.shapeB = temp;
			}
			
			this.shapeA.x += this.velocity.x;
			this.shapeB.x += this.velocity.x;
		}

	};


	return ParallaxLayer;

});