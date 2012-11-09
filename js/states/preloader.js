define('Preloader', [	
	'jquery',
	'preload'
], function($){
	var Preloader;

	var assetManifest = [
		{src:"assets/funrunframes.gif", id:"panda"},
		{src:"assets/parallax-sky.gif", id: "sky" },
		{src:"assets/mountain1.gif", id: "ground1"},
		{src:"assets/mountain2.gif",  id: "ground2"},
		{src:"assets/platform-tiles.png", id: "platforms"},
		{src:"assets/jump.wav", id:"jump_snd"}
	];

	Preloader = {
		enter : function(canvas, stage){
			var that = this;

			this.stage = stage;
			this.canvas = canvas;

			this.assets = {};

			//UI for showing loading progress
			$('.ui').css('display', 'none');
			var preloaderDiv = $('#preloaderDiv');
			preloaderDiv.css('display', 'block');

			this.loadingBar = $('.progressBar');
			this.loadingBar.css('width', 0);

			this.totalAssets = assetManifest.length;
			this.loadedAssets = 0;

			//call preload, and install soundjs as plugin			

			//define callbacks
			
			//load file
						
		},
		exit : function(){
			//hide the loading bar
			$('.ui').css('display', 'none'); 
			this.onExit(this.assets);
		},
		handleFileLoad : function(loadedFile){				
			this.assets[loadedFile.id] = loadedFile.result;

			//update our loading bar
			this.loadedAssets++;
			var percent = this.loadedAssets / this.totalAssets * 100;
			this.loadingBar.css('width', percent+'%');
		},
		handleComplete : function(){
			this.exit();
		}
	}

	return Preloader;

});