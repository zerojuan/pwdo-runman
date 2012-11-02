var dido = {
	assetManifest : [
		{src:"assets/funrunframes.gif", id:"panda"},
		{src:"assets/parallax-sky.gif", id: "sky" },
		{src:"assets/mountain1.gif", id: "ground1"},
		{src:"assets/mountain2.gif", id: "ground2"}
	],
	world : {		
		init : function(element){		
			var that = this;

			this.canvas = $(element)[0];
			console.log(this.canvas);	

			this.stage = new createjs.Stage(this.canvas);

			this.spriteSheet = {
				animations : {
					run : {
						frames : [0, 1, 2, 3, 4, 5],
						frequency: 2
					},
					jump : [6, 9, 'run', 2]
				},
				frames : {
					width : 68.5, height: 57
				},
				images : ['assets/funrunframes.gif']
			};

			this.parallaxLayer = [];

			var ss = new createjs.SpriteSheet(this.spriteSheet);
			this.player = new createjs.BitmapAnimation(ss);

			this.player.gotoAndPlay('run');
			this.player.x = 0;
			this.player.y = 350;

			this.assets = [];

			//load art assets
			this.loader = new createjs.PreloadJS();
			this.loader.useXHR = false;			
			this.loader.onFileLoad = function(evt){
				that.handleFileLoad(evt);
			};
			this.loader.onComplete = function(){
				that.handleComplete();
			}			
			this.loader.loadManifest(dido.assetManifest);

			this.stage.autoClear = true;
		},
		handleFileLoad : function(event){
			this.assets.push(event);
		},
		handleComplete : function(){
			var that = this;			
			for(var i = 0; i < this.assets.length; i++){
				var item = this.assets[i];
				var id = item.id;
				var result = item.result;
				console.log(item.id);
				if(item.type == createjs.PreloadJS.IMAGE){
					var bmp = new createjs.Bitmap(result);
				}

				switch(id){
					case "sky" :												
						that.parallaxLayer['sky'] = new dido.entities.ParallaxLayer({bitmap: result, x: 0, y: 0, width: 800, height: 600, speed: 0});												
						break;
					case "ground1" :
						that.parallaxLayer['ground1'] = new dido.entities.ParallaxLayer({bitmap: result, x: 0, y: 250, width: 700, height: 300, speed: .5});												
						break;
					case "ground2" :
						that.parallaxLayer['ground2'] = new dido.entities.ParallaxLayer({bitmap: result, x: 0, y: 280, width: 900, height: 300, speed: 1});																		
						break;
				}
				
			}

			this.stage.addChild(
				this.parallaxLayer['sky'].graphics, 
				this.parallaxLayer['ground1'].graphics, 
				this.parallaxLayer['ground2'].graphics, 
				this.player);				

			createjs.Ticker.setFPS(40);
			createjs.Ticker.addListener(this);
		},
		tick : function(){
			//update
			for(var i in this.parallaxLayer){
				this.parallaxLayer[i].update();
			}
			this.player.x = this.player.x + 0.3;

			//render
			this.stage.update();
		}
	} 
};

dido.entities = {};