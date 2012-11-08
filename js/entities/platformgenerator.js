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

		var platform3 = new Platform({
			tilesheet : this.bitmap,
			rows : 60,
			cols : 10,
			y : 300,
			x : 900,
			acceleration : this.acceleration
		});	

		var platform4 = new Platform({
			tilesheet : this.bitmap,
			rows : 60,
			cols : 10,
			y : 300,
			x : 1200,
			acceleration : this.acceleration
		});	

		this.platforms.push(startPlatform);
		this.platforms.push(platform2);
		this.platforms.push(platform3);
		this.platforms.push(platform4);
		this.collidables = this.platforms;

		this.graphics = new createjs.Container();
		for(var i in this.platforms){
			this.graphics.addChild(this.platforms[i].graphics);
		}

		this.lastPlatformIndex = this.platforms.length - 1;		

		this.graphics.x = this.x;
		this.graphics.y = this.y;		
	};

	PlatformGenerator.prototype = {
		update : function(){			
			for(var i in this.platforms){				
				this.collidables[i].update();
				if(!this.collidables[i].isVisible){
					//switch
					var lastPlatform = this.collidables[this.lastPlatformIndex];
					var lastX = lastPlatform.x + lastPlatform.width;

					this.collidables[i].reset(
						{
							cols: Math.abs(Math.random() * 40 - 20),
							y : lastPlatform.y + (Math.random() * 100 - 50), 
							x: lastX + Math.random() * 100 + 100});
					this.lastPlatformIndex = i;
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