define("PlatformGenerator", [	
	"Platform"	
	], function(Platform){

	var PlatformGenerator;

	PlatformGenerator = function(opts){
		this.platforms = [];
		this.collidables = [];
		this.x = 0;
		this.y = 0;		
		this.acceleration = 0;

		for(var prop in opts){		
			this[prop] = opts[prop];		
		}		

		/* precreate the platforms to memory */
			

		
		/* add platform graphics to display list*/
		

		
	};

	PlatformGenerator.prototype = {
		update : function(){			
			/* loop through objects */
		},
		render : function(){
			/* render objects */	
		}
	}

	return PlatformGenerator;

});