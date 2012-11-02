define("PlatformGenerator", [
	"World",
	"Platform"	
	], function(World, Platform){

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

		//precreate the platforms to memory
		var platform = new Platform({
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

		this.platforms.push(platform);
		this.platforms.push(platform2);
		this.collidables = this.platforms;

		this.graphics = new createjs.Container();
		this.graphics.addChild(platform.graphics, platform2.graphics);

		this.graphics.x = this.x;
		this.graphics.y = this.y;		
	};

	PlatformGenerator.prototype = {
		update : function(){			
			for(var i in this.platforms){				
				this.collidables[i].update();
				if(!this.collidables[i].isVisible){
					this.collidables[i].reset({x: 600})
				}
			}
		},
		render : function(){
			for(var i in this.platforms){
				this.collidables[i].render();
			}	
		}
	}

	return PlatformGenerator;

});