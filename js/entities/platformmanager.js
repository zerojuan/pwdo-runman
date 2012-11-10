define("PlatformManager", [	
	"Platform"	
	], function(Platform){

	var PlatformManager;

	PlatformManager = function(opts){		
		this.collidables = [];
		this.x = 0;
		this.y = 0;				

		for(var prop in opts){		
			this[prop] = opts[prop];		
		}		

		// precreate the platforms to memory
			

		//put the platforms in a list

		// add platform graphics to display list
		

		this.graphics.x = this.x;
		this.graphics.y = this.y;
	};

	PlatformManager.prototype = {
		update : function(){			
			/* loop through objects */
			for(var i in this.collidables){				
				this.collidables[i].update();
				
			}
		},
		render : function(){
			/* render objects */	
		}
	}

	return PlatformManager;

});