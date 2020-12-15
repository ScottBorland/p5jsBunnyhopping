var angle = 0;
var realMouseX = 0;
var realMouseY = 0;
//physics variables
var moveSpeed = 5; 
var gravity = 10;
var friction = 0.2;
var runAcceleration = 0.4;
var runDeacceleration = 0.1;

var playerSize = 3;


class Player {
    constructor(x, y, z) {
      this.position = createVector(x, y, z)
      this.velocity = createVector(0, 0, 0);
      this.acc = createVector(0, 0, 0);
    }
    drawPlayer(){
        let blue = color(48, 71, 94);
        let red = color	(240, 84, 84);
        fill(blue)
        //ellipse(this.position.x, this.position.y, 30)
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        
        fill(red);
        stroke(0, 0, 0);
        strokeWeight(0.75);

        beginShape();
        vertex(0, -10 * playerSize);
        vertex(-5 * playerSize, 10 * playerSize);
        vertex(5 * playerSize, 10 * playerSize);
        endShape(CLOSE);
        pop();
    }
   
    update(){
        this.position.add(this.velocity);
        //translate(hopper.position.x-450, hopper.position.y-450);   
        realMouseX = mouseX - (-this.position.x+450);
        realMouseY = mouseY - (-this.position.y+450);
        angle = atan2(realMouseY - this.position.y, realMouseX - this.position.x) + (PI/2);
        line(this.position.x, this.position.y, realMouseX, realMouseY);
        
    }
    groundMove(){
        let wishdir = createVector(horizontalInput, verticalInput, 0);
        
        //Make wishdir relative
        if(wishdir.mag() != 0){
        var wishdirToAngle = wishdir.heading();
        var sumAngle = wishdirToAngle + angle;
        wishdir = p5.Vector.fromAngle(sumAngle);
        }

        applyFriction(1);
        wishdir.normalize(); 
        var wishSpeed = wishdir.mag();
        wishSpeed *= moveSpeed;
        wishdir.normalize();
        var moveDirectionNorm = wishdir;
        
        accelerate(wishdir, wishSpeed, runAcceleration)

        //playerVelocity.y = -gravity * Time.deltaTime;

    }
  }





