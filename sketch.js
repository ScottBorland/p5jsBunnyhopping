var hopper;
let platforms= [];
var platform;
var platGap = 800;

var horizontalInput = 0;
var verticalInput = 0;

var moveDirectionNorm;

var colliding = false;

let playerImage;

function preload(){
	playerImage = loadImage('resources/player.png');
}

function setup() {
	//drawGrid();
	let black = color(34, 40, 49)
	moveDirectionNorm = createVector(0, 0, 0);
	createCanvas(windowWidth, windowHeight);
	hopper = new Player(0, -100);
	//var newPlatform = new Platform(i * random(100), i*random(100), 0, random(10, 1000), random(10, 1000));
	platforms.push(new Platform(-100, -200, 0, 400, 400));
	for(var j = 1; j < 10; j++){
		platforms.push(new Platform(-300, -100-(j*platGap), 0, 300, 300));
		platforms.push(new Platform(200, -500-(j*platGap), 0, 300, 300));
	}
		
		// platforms.push(new Platform(-100, -1900, 0, 200, 200));
		// platforms.push(new Platform(-500, -100, 0, 200, 200));
		// platforms.push(new Platform(-800, -800, 0, 200, 200));
		// platforms.push(new Platform(-1000, -1500, 0, 200, 200));
		// platforms.push(new Platform(300, -1900, 0, 200, 200));
		// for(var i = 0; i < 5; i++){

		// }
		//platforms.push(newPlatform);
	
}

function draw() {
	//Colour palette
	let black = color(34, 40, 49);
	let blue = color(48, 71, 94);
	
	background(255);
	push();
	translate(-hopper.position.x+(windowWidth/2), -hopper.position.y+(windowHeight/2))
	for(var i = 0; i < platforms.length; i++){
		platforms[i].show();
	}
	if(hopper.grounded) {
		colliding = false;
		for(var i = 0; i < platforms.length; i ++){
			if(hopper.checkCollision(platforms[i])){
				colliding = true;
			}
		}	
		
	}
	pop();
	push();
	translate(-hopper.position.x+(windowWidth/2), -hopper.position.y+(windowHeight/2));
	//rotate(angle);
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
		point(i*800, j*800, 5);
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
	return (size + (height * 0.02));
}










