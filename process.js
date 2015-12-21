
function init(){
	$(".photo").append("<table width='680' border='0' cellspacing='0' cellpadding='0'>");
	$(".photo").append("<tr><td class='height'></td></tr>");
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
    			if(request.greeting)
    			{		
      					//sendResponse({'farewell': request.greeting});
      					var min_width=parseInt($("#min_width").val());
      					var img = new Image;
      					img.src = request.greeting;
					    img.onload = function(){
					    	console.log(img.width);
					    	if(img.width>min_width){
					    		$(".photo").append("<div class='box'><div class='shadow' name = '"+request.greeting+"'></div>"
					    			+"<img class='cen'  src ="+request.greeting+">"
					    			+"<span class='info'>306x480</span>"
					    			+"</div>");
					    	}
					        	
					    };
      					
      			}
		});
					      		
	$(".photo").append("</table>");
			
};				

$(document).on('click', 'img', function(){
	console.log('sth');	
	console.log(this);
	var classname=$("#class").val();
	var name=classname+'_'+parseInt(Math.random()*1e10)+'.jpg';
	chrome.downloads.download({url:this.src,filename:name});
});

window.load = init();


