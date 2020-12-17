var angle = 0;
var realMouseX = 0;
var realMouseY = 0;
//physics variables
var moveSpeed = 5; 
var gravity = 3;
var friction = 0.2;
var runAcceleration = 0.4;
var runDeacceleration = 0.1;

var airAcceleration = 2;          // Air accel
var airDecceleration = 2;         // Deacceleration experienced when ooposite strafing
var airControl = 0.3;               // How precise air control is
var sideStrafeAcceleration = 50;  // How fast acceleration occurs to get up to sideStrafeSpeed when
var sideStrafeSpeed = 1.0; 

var jumpSpeed = 50;
var wishJump = false; 


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
        ellipse(0, 0, 20)
        //line(-40, -40, realMouseX, realMouseY);
        // beginShape();
        // vertex(0, -10 * playerSize);
        // vertex(-5 * playerSize, 10 * playerSize);
        // vertex(5 * playerSize, 10 * playerSize);
        // endShape(CLOSE);
        pop();
    }
   
    update(){
        this.position.add(this.velocity);
        //translate(hopper.position.x-450, hopper.position.y-450);   
        realMouseX = mouseX - (-this.position.x+450);
        realMouseY = mouseY - (-this.position.y+450);
        angle = atan2(realMouseY - this.position.y, realMouseX - this.position.x) + (PI/2);
        line(this.position.x, this.position.y, realMouseX, realMouseY);
        if(this.position.z <= 0){
            this.grounded = true;
            this.position.z = 0;
            this.groundMove();
        }else{
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
        }
        wishdir.normalize(); 
        var wishSpeed = wishdir.mag();
        wishSpeed *= moveSpeed;
        wishdir.normalize();
        moveDirectionNorm = wishdir;
        
        accelerate(wishdir, wishSpeed, runAcceleration)

        this.velocity.z -= gravity;
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
        if(Math.abs(verticalInput) < 0.001 || Math.abs(wishspeed) < 0.001)
            return;
        yspeed = this.velocity.z;
        this.velocity.y = 0;
        /* Next two lines are equivalent to idTech's VectorNormalize() */
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
  }





