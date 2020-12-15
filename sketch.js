var hopper;

var horizontalInput = 0;
var verticalInput = 0;

function setup() {
	createCanvas(900, 900);
	hopper = new Player(500, 500)
}

function draw() {
	background(220);
	drawGrid();
	handleInput();
	
	hopper.drawPlayer();
	hopper.groundMove();
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

function handleInput(){
	if(keyIsDown(68)){
		horizontalInput = 1;
	}else if(keyIsDown(65)){
		horizontalInput = -1;
	}else{
		horizontalInput = 0;
	}
	if(keyIsDown(87)){
		verticalInput = -1;
	}else if(keyIsDown(83)){
		verticalInput = 1;
	}else{
		verticalInput = 0;
	}
}

function accelerate(wishdir, wishSpeed, accel){
	
	var addspeed;
    var accelspeed;
    var currentspeed;

    currentspeed = p5.Vector.dot(hopper.velocity, wishdir);
    addspeed = wishSpeed - currentspeed;
    if(addspeed <= 0)
        return;
    accelspeed = accel * wishSpeed;
	if(accelspeed > addspeed) 
		accelspeed = addspeed;

    hopper.velocity.x += accelspeed * wishdir.x;
    hopper.velocity.y += accelspeed * wishdir.y;
}

function applyFriction(t){
	var speed;
	var newSpeed;
	var control;
	var drop;

	let vec = hopper.velocity.copy();

	vec.z = 0;
	speed = vec.mag();
	drop = 0;

	control = speed < runDeacceleration ? runDeacceleration : speed;
	drop = control * friction *  t;
	
	newSpeed = speed - drop;
    playerFriction = newSpeed;
    if(newSpeed < 0)
        newSpeed = 0;
    if(speed > 0)
        newSpeed /= speed;

    hopper.velocity.x *= newSpeed;
    hopper.velocity.y *= newSpeed;
}










