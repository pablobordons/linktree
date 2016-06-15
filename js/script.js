// particles

// basic

var canvas 		= 	document.getElementById("canvas");
var context		=	canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Mouse setting

	var mouse = {x:0, y: 0, isDown: false};

	document.onmousedown 	= function(e){	mouse.isDown = true;}
	document.onmouseup 	= function(e){	mouse.isDown = false;}
	document.onmousemove 	= function(e){ 	mouse.x 	 = e.pageX - canvas.offsetLeft; 
										mouse.y 	 = e.pageY - canvas.offsetTop;}

// Request animation Frame setup
window.requestAnimFrame = (function(callback) {

	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    
	function(callback) {
   	  	window.setTimeout(callback, 1000 / 60);
   		};

	})();


// Random number between two given
	function randNum( min, max ) {
			return Math.random() * ( max - min ) + min;
		}

	function Movement(){

		this.movement = function(){

			this.x += this.vx;
			this.y += this.vy;
		
			this.vx += this.ax;
			this.vy += this.ay;

			if (mouse.isDown) {
				this.x += -(this.x - mouse.x)/200;
				this.y += -(this.y - mouse.y)/200;

				this.vx += - Math.min((this.x - mouse.x)/1000,5);
				this.vy += - Math.min((this.y - mouse.y)/1000,5);
				}
	
			// Bounding conditions (walls)
	
				if (this.x >= canvas.width - this.radius){
			
					this.vx = - this.vx;

					this.x  = canvas.width - this.radius;
				}
				if (this.x <= this.radius){

					this.vx = - this.vx;

					this.x = this.radius;
				}
	
				if (this.y >= canvas.height - this.radius){

					this.vy = - this.vy;

					this.y 	= canvas.height - this.radius;

				}
				if (this.y < this.radius){

					this.vy = - this.vy;

					this.y  = this.radius + 1; 
				}
			};
		
		this.shaking = function(){

			if (this.radius > 50){
				this.radius -= 5}
			else if (this.radius < 5){
				this.radius += 3}
			else{

			this.radius -= randNum(-1,1)*this.excitement;}


			};
		}

	function Drawable(){

		this.draw = function() {

			context.fillStyle = this.color;
			context.strokeStyle= this.color;
			context.beginPath();
			context.arc(this.x,this.y,this.radius,0,2*Math.PI);
			//context.fill();
			context.stroke();

			};

		}

	function Circle(x,y,radius,color,vx,vy,ax,ay,excitement) {
	
		this.color = color;
		
		this.x = x;
		this.y = y;
		
		this.radius 	= radius;

		this.excitement = excitement;

		this.vx = vx;
		this.vy = vy;
		
		this.ax = ax;
		this.ay = ay;
		
		}	

	// Inheritance :

	Movement.prototype = new Drawable();  // Movement inherits drawable
	
	Circle.prototype = new Movement();	// Circle inhertis Movement (and thus drawable)



	// Circles creation

		var circles 	= [];

		var	circlesNum 	= 80;

		for (var i = 0; i < circlesNum ; i++){

			circles[i] = new Circle(	randNum(50,canvas.width - 50),        //  x position
										randNum(50,canvas.height - 50),		//  y position
 										randNum(2,150),			//  radius
										"silver",//"#ADECFF",				//  color
										randNum(-1,1),		//  velocity x
										randNum(-1,1),		//  velocity y
										0,						//	acceleration x
										0,						//	acceleration y
										1
									)    
	
			}



	// Drawing circles

	function draw(){
		for (i in circles){

			circles[i].draw();									// Call every method from each circle

			}
		}


	function update(){

		for (i in circles){

			circles[i].movement(); 	

			if(circles[i].vx > 10 || circles[i].vx < -10 ) {
				console.log("hey")
				circles[i].vx /= 1.2;
			}
			else{
				circles[i].vx /= 1.001;
			}
			if(circles[i].vy > 10 || circles[i].vy < -10 ) {
				console.log("hey")
				circles[i].vy /= 1.2;
			}
			else{
				circles[i].vy /= 1.001;
			}

			}

		}


	function graphicLoop(){
	
		context.clearRect(0,0,canvas.width,canvas.height);      // Clean the canvas

		draw();
		
		requestAnimationFrame(graphicLoop);
			
		}



	function logicLoop(){

		update();
		setTimeout(logicLoop,1000/60);
	}

	logicLoop();
	graphicLoop();

