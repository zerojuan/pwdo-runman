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
		
		
	};

	ParallaxLayer.prototype = {
		update : function(){
			
		},

	};


	return ParallaxLayer;

});