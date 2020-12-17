var hopper;

var horizontalInput = 0;
var verticalInput = 0;

var moveDirectionNorm;

let playerImage;

function preload(){
	playerImage = loadImage('resources/player.png');
}

function setup() {
	drawGrid();
	let black = color(34, 40, 49)
	moveDirectionNorm = createVector(0, 0, 0);
	createCanvas(windowWidth, windowHeight);
	hopper = new Player(800, 800)
}

function draw() {
	//Colour palette
	let black = color(34, 40, 49);
	let blue = color(48, 71, 94);
	// if(hopper.grounded){
	// 	background(140);
	// }else{
	// 	background(150);
	// }
	background(200);
	push();
	translate(-hopper.position.x+(windowWidth/2), -hopper.position.y+(windowHeight/2));
	//rotate(angle);
	drawGrid();
	handleInput();
	hopper.drawPlayer();
	hopper.update();
	pop();
}

function drawGrid(){
	
	for(var i = 0; i < 20; i ++){
		for(var j = 0; j < 20; j++){
		push()
		strokeWeight(5);
		point(i*500, j*500, 10);
		pop();
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

	if(keyIsDown(32) && hopper.grounded){
		wishJump = true;
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

function calcSize(height, size){
	return (size + (height * 0.06));
}










