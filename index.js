// Variables - define here
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var fps = 60; // update rate
var ctx;
var cvs;
var left = up = right = down = false; // decide if player is moving
var frame = 0;
// Player
var pacman; // initialise for later
var pacmanRadius = 15;
var playerSpeed = 2;

// Map
var grid;
var columns;
var rows;
var squareWidth = 40;
// Map functions 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Basics - useful functions
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function rectangle(x, y, w, h, colour){ // draw rect
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, w, h);
}
function keyDownHandler(event) {
	kId = event.which || event.keyPressed; // key Id
   	switch(kId) {
    	case 37:
    		left = true;
    		break;
		case 38:
	    	up = true;
	    	break;
    	case 39:
		    right = true;
	    	break;
	    case 40:
    		down = true;
	    	break;
	}
}
function keyUpHandler(event) {
	kId = event.which || event.keyPressed; // key Id
	
	switch(kId) {
		case 37:
			left = false;
			break;
		case 38:
			up = false;
			break;
		case 39:
			right = false;
			break;
		case 40:
			down = false;
			break;
	}
}
// Onload - Startup
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    window.onload=function(){
        cvs = document.getElementById('canvas');
        ctx = cvs.getContext('2d');
        columns = cvs.width/40;
        rows = cvs.height/40;



		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		
        pacman = new Character(0 , 0, 10); // x, y, hp characters stats
        
        setGrid();
        getMap();
        setInterval(function(){
            //rectangle(0, 0, canvas.width, canvas.height, 'black'); // background
            drawGrid();
            drawPlayer();
            movePlayer();
			playerCollision();
			frame ++;
			ctx.fillText(frame, 500, 500);
        }, 1000/fps); // refresh for fps
    }


// Map 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    function getMap(){
        for(i=0; i<map1.length; i++){
            var mI = map1[i];
            grid[mI[0]][mI[1]].state = true;
        }
    }
    function setGrid(){
	    grid = [];
	    for(c=0; c<columns; c++){
	    	grid[c] = [];
	    	for(r=0;r<rows; r++){
	    		grid[c][r] = { x: c * squareWidth, y: r * squareWidth, state: false};
	    	}
    	}
    }

    function drawGrid(){
	    for(c=0; c<columns; c++){
		    for(r=0; r<rows; r++){
			    if(grid[c][r].state){
				    rectangle(c * squareWidth, r * squareWidth, squareWidth, squareWidth, "blue");
    			} else {
	    			rectangle(c * squareWidth, r * squareWidth, squareWidth, squareWidth, "black");
		    	}
	    	}
    	}
    }

//Collisions - Functions for collision detection
	var x = pacman.pos.x;
	var y = pacman.pos.y;
	var rad = pacmanRadius;
	var topE = y - rad; // top edge
	
	function cTop(g){
		if(topE > g.y && topE < g.y + squareWidth){ //needs copying
			return true;
		}
	}
	function cBottom(g){
		if(g.y + rad > g.y && g.y + rad < g.y + squareWidth){
			return true;
		}
	}
	
	function cLeft(g){
		if(g.y - rad > g.y && g.y - rad < g.y + squareWidth){
			return true;
		}
	}
	
	function cRight(g){
		if(g.y - rad > g.y && g.y - rad < g.y + squareWidth){
			return true;
		}
	}

// Main - Everything else
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    function playerCollision(){
		for(c=0; c<columns; c++){
			for(r=0; r<rows; r++){
				var g=grid[c][r]
				if(g.state){
					if((x - rad < g.x+squareWidth && x - rad > g.x) && y + rad < g.y+squareWidth && y - rad > g.y){
						pacman.pos.x += playerSpeed;
					}
				}
			}
		}
    }

	function movePlayer(){
        pPos = pacman.pos;

        switch(true){
            case right:
                pPos.x += playerSpeed;
                break;
            case left:
                pPos.x -= playerSpeed;
                break;
            case up:
                pPos.y -= playerSpeed;
                break;
            case down:
                pPos.y += playerSpeed;
        }
    } 
	
    function drawPlayer(){
        pPos = pacman.pos
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(pPos.x, pPos.y, pacmanRadius, 0, Math.PI*2, true);
        ctx.fill();
    }
