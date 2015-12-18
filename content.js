function init(){
		console.log("image download init");
		var images = document.getElementsByTagName("img");
		console.log(images);
		for(var i = 0 ; i < images.length ; i++){
			var src = images[i].src;
			chrome.runtime.sendMessage({greeting:src}, function(response) {
				console.log(response);
			});

		}
		//css image
		var text=document.body.innerHTML;
		var images=text.match(/background-image: url.*\)/g);
		console.log(images);
		if(images)
		for(var i = 0 ; i < images.length ; i++){
			var start= images[i].indexOf('(')
			var src = images[i].slice(start+1,-1);
			loadImage(src);
		}
}

function loadImage(src){
	var img= new Image();
	img.src=src;
	img.onload=function(){
		chrome.runtime.sendMessage({greeting:img.src}, function(response) {
			console.log(response);
		});
	}
}
window.load = init();