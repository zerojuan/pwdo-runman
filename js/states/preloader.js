define('Preloader', [	
	'preload'
], function(){
	var Preloader;

	var assetManifest = [
		{src:"assets/funrunframes.gif", id:"panda"},
		{src:"assets/parallax-sky.gif", id: "sky" },
		{src:"assets/mountain1.gif", id: "ground1"},
		{src:"assets/mountain2.gif",  id: "ground2"},
		{src:"assets/platform-tiles.png", id: "platforms"}
	];

	Preloader = {
		start : function(canvas, stage){
			var that = this;

			this.stage = stage;
			this.canvas = canvas;

			this.assets = {};

			this.loader = new createjs.PreloadJS();
			this.loader.useXHR = false;
			this.loader.onFileLoad = function(evt){
				that.handleFileLoad(evt);
			};

			this.loader.onComplete = function(){
				that.handleComplete();
			}

			this.loader.loadManifest(assetManifest);			
		},
		exit : function(){
			this.onExit({assets : this.assets});
		},
		handleFileLoad : function(event){			
			this.assets[event.id] = event.result;
		},
		handleComplete : function(){
			this.exit();
		}
	}

	return Preloader;

});