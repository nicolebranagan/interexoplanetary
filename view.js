// Main game object

function Game(canv) {
	// Game must be given a canvas to draw on
	this.canvas = canv;
	
	this.scale = 100; // 1 AU = 100 pixels
	this.scale2 = 0.002; // 1 km = 0.002 px
	
	// Generate new solar system
	this.system = new SolarSystem();
}

Game.prototype.drawPlanetInfo = function() {
	var ctx = this.canvas.getContext('2d');
	ctx.font = "16px serif";
	for (i = 0; i < this.system.planets.length; i++) {
		label = this.system.planets[i].getKeyStats();
		ctx.fillText(label, 10, 20*(i+1));
	}
}

Game.prototype.drawSystem = function() {
	var ctx = this.canvas.getContext('2d');
	
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	ctx.fillText(time, 10, 20);
	
	ctx.beginPath();
	ctx.arc(320,240,10,0,2*Math.PI);
	ctx.closePath();
	ctx.fillStyle="rgba(255, 255, 0, 1.0)";
	ctx.fill();
	
	for (i = 0; i < this.system.planets.length; i++) {
		// draw path
		ctx.beginPath();
		ctx.arc(320,240,this.scale*this.system.planets[i].sdist,0,2*Math.PI)
		ctx.closePath();
		ctx.stroke();
		
		var x = Math.sin((time/this.system.planets[i].speriod) * (2 * Math.PI) + this.system.planets[i].sphi);
		var y = Math.cos((time/this.system.planets[i].speriod) * (2 * Math.PI) + this.system.planets[i].sphi);
		x = (x * this.system.planets[i].sdist * this.scale) + 320;
		y = (y * this.system.planets[i].sdist * this.scale) + 240;
		
		// draw planet
		ctx.beginPath();
		ctx.arc(x,y,this.scale2 * this.system.planets[i].radius,0,2*Math.PI);
		ctx.closePath();
		if (this.system.planets[i].name == "Earth")
			ctx.fillStyle="blue";
		else
			ctx.fillStyle="black";
		ctx.fill();
		
		ctx.fillText(this.system.planets[i].name, x + this.scale2 * this.system.planets[i].radius, y + this.scale2 * this.system.planets[i].radius);
	}
}

Game.prototype.onClick = function (event)
{
  var x = event.pageX - gamecanvas.offsetLeft;
  var y = event.pageY - gamecanvas.offsetTop;

  for (i = 0; i < game.system.planets.length; i++) {
		var xpla = Math.sin((time/game.system.planets[i].speriod) * (2 * Math.PI) + game.system.planets[i].sphi);
		var ypla = Math.cos((time/game.system.planets[i].speriod) * (2 * Math.PI) + game.system.planets[i].sphi);
		xpla = (xpla * game.system.planets[i].sdist * game.scale) + 320;
		ypla = (ypla * game.system.planets[i].sdist * game.scale) + 240;
		rpla = game.scale2 * game.system.planets[i].radius * 2;
		
		if ((Math.pow(x - xpla,2) + Math.pow(y - ypla,2)) <= rpla) {
			alert(game.system.planets[i].getKeyStats());
			break;
		}
		console.log(rpla)
	}
} 

function Loop() {
	time = time + 1;
	game.drawSystem();
	setTimeout(Loop, 500);
}

var gamecanvas = document.getElementById('gamecanvas');
var game = new Game( gamecanvas );
var time = 0;

gamecanvas.addEventListener("mousedown", game.onClick, false);
Loop();