const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://content.viaplay.se/pc-se/serier/samtliga', true);
request.onload = function () {
   
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
		var image;
        for(var i = 0; i < data._embedded["viaplay:blocks"][0]._embedded["viaplay:products"].length; i++){
			image = data._embedded["viaplay:blocks"][0]._embedded["viaplay:products"][i].content.images.boxart.url;
			
		    var log = document.createElement('img');
		    log.src =  image;
			log.setAttribute("tabindex", i);
			container.appendChild(log);
	 }  
		  
  } else {
    var errorMessage = document.createElement('Oops');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}
request.send();

$(document).ready(function(){
	$('body').keydown(function(e) {	
	e = e || window.event;
	e.preventDefault();
	if (e.keyCode == 40) {
	 $('#root img').first().focus();
	}
});
$('#root').on('keydown', 'img', function(e) {
	 e = e || window.event;
	 if (e.keyCode == 39) {
		 if ($(this).next().is('img')){
			 $(this).next('img').focus();
		 }
		 else {
			$('#root img').first().focus(); 
		 }
		
	   }
	 else if (e.keyCode == 37) {
		$(this).prev('img').focus();
	   }
	 else if (e.keyCode == 13) {
		 $(this).css({"border-color": "#000000", 
					  "border-weight":"2px", 
					  "border-style":"solid", 
					  "opacity":"1"});
	   }  
	 else if (e.keyCode == 8) {
		$(this).css({"border-color": "", 
					  "border-weight":"", 
					  "border-style":"", 
					  "opacity":""});
	   }
 });
});
