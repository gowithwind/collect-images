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
//disable menu when ctrlkey down
window.addEventListener("contextmenu", function(e) { if (e.ctrlKey)e.preventDefault(); })
//window.load = init();
//
document.querySelector('body').addEventListener('mousedown', function(event) {
  if (event.ctrlKey&&event.target.tagName.toLowerCase() === 'img') {
  	event.preventDefault();
  	var image=event.target;
    if(!image.getAttribute("added")){
    	//image.style.border='2px solid #E8272C';
    	image.style.webkitFilter= 'grayscale(100%)';
    	console.log('collect it!',image);
    	loadImage(image.src);
    	image.setAttribute("added","1");
    }
  }
});