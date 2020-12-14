var hopper;

function setup() {
	createCanvas(900, 900);
	hopper = new Player(500, 500)
}

function draw() {
	background(220);
	drawGrid();
	hopper.rotate();
	hopper.drawPlayer();
	hopper.update();
}

function drawGrid(){
	for (var x = 0; x < width; x += width / 20) {
		for (var y = 0; y < height; y += height / 20) {
			stroke(0);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}
}
