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

		//precreate the platforms to memory
		var startPlatform = new Platform({
			tilesheet : this.bitmap,
			rows : 60,
			cols : 20,
			y : 300,
			acceleration : this.acceleration
		});
		var platform2 = new Platform({
			tilesheet : this.bitmap,
			rows : 30,
			cols : 20,
			y : 400,
			x : 600,
			acceleration : this.acceleration
		});
		
		//put the platforms in a list
		this.collidables.push(startPlatform);
		this.collidables.push(platform2);

		// add platform graphics to display list
		this.graphics = new createjs.Container();
		for(var i in this.collidables){
			this.graphics.addChild(this.collidables[i].graphics);
		}
		//keep a reference to the last platform
		this.lastPlatformIndex = this.collidables.length - 1;

		this.graphics.x = this.x;
		this.graphics.y = this.y;
	};

	PlatformManager.prototype = {
		update : function(){			
			/* loop through objects */
			for(var i in this.collidables){				
				this.collidables[i].update();
				// if a platform is on the left offscreen
				if(this.collidables[i].isOutsideLeft){
					//move the left platform to the back of the last platform
					var lastPlatform = this.collidables[this.lastPlatformIndex];
					var lastX = lastPlatform.x + lastPlatform.width;

				    //randomly give this platform a new shape
				    //to create variety
					this.collidables[i].reset({
						cols: Math.abs(Math.random() * 40 - 20),
						y : lastPlatform.y + (Math.random() * 100 - 50), 
						x: lastX + Math.random() * 100 + 100});
					this.lastPlatformIndex = i;
				};
				
			}
		},
		render : function(){
			//render
			for(var i in this.collidables){
				this.collidables[i].render();
			}	
		}
	}

	return PlatformManager;

});