var angle = 0;
var realMouseX = 0;
var realMouseY = 0;
//physics variables
var moveSpeed = 7; 
var gravity = 0.2;
var friction = 6;
var runAcceleration = 14;
var runDeacceleration = 10;

var airAcceleration = 2;          // Air accel
var airDecceleration = 2;         // Deacceleration experienced when opposite strafing
var airControl = 0.3;               // How precise air control is
var sideStrafeAcceleration = 50;  // How fast acceleration occurs to get up to sideStrafeSpeed when
var sideStrafeSpeed = 1.0; 

var jumpSpeed = 8;
var wishJump = false; 

var topSpeed = 0;
var playerSize = 10;


class Player {
    constructor(x, y, z) {
      this.position = createVector(x, y, z)
      this.velocity = createVector(0, 0, 0);
      this.acc = createVector(0, 0, 0);
      this.grounded = true;
    }
    drawPlayer(){
        let blue = color(48, 71, 94);
        let red = color	(240, 84, 84);
        fill(blue)
        //ellipse(this.position.x, this.position.y, 30)
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        
        if(this.position.z == 0){fill (blue)} else {fill(red)}
        //fill(red);
        stroke(0, 0, 0);
        strokeWeight(0.75);
        playerSize = calcSize(this.position.z, 10);
        
        imageMode(CENTER);
        image(playerImage, -0, -10, 10 * playerSize, 10 * playerSize);
        pop();
    }
    hitbox(){
        let blue = color(48, 71, 94);
        let red = color	(240, 84, 84);
        fill(blue)
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        
        stroke(0, 0, 0);
        strokeWeight(0.75);
        playerSize = calcSize(this.position.z, 10);
        rectMode(CORNER)
        noFill();
        //hitbox
        //rect(-5*playerSize, -5*playerSize, 10 * playerSize, 10 * playerSize);
        pop();
    }
    checkCollision(platform){
      var hit = false;
      hit = collideRectRect(this.position.x + (-5*playerSize), this.position.y + (-5*playerSize), 10 * playerSize, 10 * playerSize, platform.x, platform.y, platform.w, platform.h);  
      return hit;
    }
   
    update(){
        var vel = createVector(this.velocity.x, this.velocity.y);
        if(vel.mag() > topSpeed){
            topSpeed = vel.mag().toFixed(2);
        }
        this.displayHUD();
        this.hitbox();
        this.position.add(this.velocity);
        //translate(hopper.position.x-450, hopper.position.y-450);   
        realMouseX = mouseX - (-this.position.x+(windowWidth/2));
        realMouseY = mouseY - (-this.position.y+(windowHeight/2));
        angle = atan2(realMouseY - this.position.y, realMouseX - this.position.x) + (PI/2);
        //line(this.position.x, this.position.y, realMouseX, realMouseY);
        if(this.position.z <= 0 && colliding){
            this.grounded = true;
            this.position.z = 0;
            this.groundMove();
        }
        // else if(this.position.z < 0){
        //     // location.reload();
        // }
        else{
            this.grounded = false;
            this.airMove();
        }
    }
    groundMove(){
        let wishdir = createVector(horizontalInput, verticalInput, 0);
        
        //Make wishdir relative
        if(wishdir.mag() != 0){
        var wishdirToAngle = wishdir.heading();
        var sumAngle = wishdirToAngle + angle;
        wishdir = p5.Vector.fromAngle(sumAngle);
        }
        if(!wishJump){
            applyFriction(1);
        }else{
            applyFriction(0);
        }
        wishdir.normalize(); 
        var wishSpeed = wishdir.mag();
        wishSpeed *= moveSpeed;
        wishdir.normalize();
        moveDirectionNorm = wishdir;
        
        accelerate(wishdir, wishSpeed, runAcceleration)

        this.velocity.z = 0;
        if(wishJump)
        {
            this.velocity.z = jumpSpeed;
            wishJump = false;
        }     
    }
    airMove()
    {
        var wishdir;
        var wishvel = airAcceleration;
        var accel;
        handleInput();
        wishdir =  createVector(horizontalInput, verticalInput, 0);
        if(wishdir.mag() != 0){
            var wishdirToAngle = wishdir.heading();
            var sumAngle = wishdirToAngle + angle;
            wishdir = p5.Vector.fromAngle(sumAngle);
        }

        var wishspeed = wishdir.mag();
        wishspeed *= moveSpeed;

        wishdir.normalize();
        moveDirectionNorm = wishdir;

        // CPM: Aircontrol
        var wishspeed2 = wishspeed;
        if (p5.Vector.dot(this.velocity, wishdir) < 0)
            accel = airDecceleration;
        else
            accel = airAcceleration;
        // If the player is ONLY strafing left or right
        if(verticalInput == 0 && horizontalInput != 0)
        {
            if(wishspeed > sideStrafeSpeed)
                wishspeed = sideStrafeSpeed;
            accel = sideStrafeAcceleration;
        }

        accelerate(wishdir, wishspeed, accel);
        if(airControl > 0)
            this.AirControl(wishdir, wishspeed2);
        // !CPM: Aircontrol

        // Apply gravity
        this.velocity.z -= gravity;
    }
    AirControl(wishdir, wishspeed){
        var yspeed;
        var speed;
        var dot;
        var k;
        // Can't control movement if not moving forward or backward
        if(Math.abs(verticalInput) < 0.001 || Math.abs(wishspeed) < 0.001){
            return;
        }
        yspeed = this.velocity.z;
        this.velocity.z = 0;
        
        speed = this.velocity.mag();
        this.velocity.normalize();

        dot = p5.Vector.dot(this.velocity, wishdir);
        k = 32;
        k *= airControl * dot * dot;

        // Change direction while slowing down
        if (dot > 0)
        {
            this.velocity.x = this.velocity.x * speed + wishdir.x * k;
            this.velocity.y = this.velocity.y * speed + wishdir.y * k;
            this.velocity.z = this.velocity.z * speed + wishdir.z * k;

            this.velocity.normalize();
            moveDirectionNorm = this.velocity;
        }

        this.velocity.x *= speed;
        this.velocity.z = yspeed; // Note this line
        this.velocity.y *= speed;
    }
    displayHUD(){
        textSize(20);
        var vel = createVector(this.velocity.x, this.velocity.y);
        text("Speed: " + vel.mag().toFixed(2), (windowWidth-200) - (-this.position.x+(windowWidth/2)), 50 - (-this.position.y+(windowHeight/2)));
        text("Top Speed: " + topSpeed, (windowWidth-200) - (-this.position.x+(windowWidth/2)), 80 - (-this.position.y+(windowHeight/2)));
        text("Height: " + this.position.z.toFixed(2), (windowWidth-200) - (-this.position.x+(windowWidth/2)), 110 - (-this.position.y+(windowHeight/2)));
        if(this.grounded){
        text("Score: " + Math.abs(this.position.y.toFixed(2)), (windowWidth-200) - (-this.position.x+(windowWidth/2)), 140 - (-this.position.y+(windowHeight/2)));
        }
    }
  }





