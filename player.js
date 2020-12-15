let angle = 0;
//physics variables
var moveSpeed = 5; 
var gravity = 10;
var friction = 0.2;
var runAcceleration = 40;
var runDeacceleration = 10;


class Player {
    constructor(x, y, z) {
      this.position = createVector(x, y, z)
      this.velocity = createVector(0, 0, 0);
      this.acc = createVector(0, 0, 0);
    }
    drawPlayer(){
        ellipse(this.position.x, this.position.y, 30)
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);

        fill(0, 0, 0);
        stroke(0, 0, 0);
        strokeWeight(0.75);

        beginShape();
        vertex(0, -5);
        vertex(-2.5, 5);
        vertex(2.5, 5);
        endShape(CLOSE);
        pop();
    }
    // rotate(){
    //     var v1 = createVector(this.x, this.y);
    //     var v2 = createVector(mouseX, mouseY);
    //     var diff = p5.Vector.sub(v2, v1);
    //     var origin = createVector(0, 0);
    //     angle = Math.atan2(diff.y - origin.y, diff.x - origin.x);
    //     angle += PI/2;
    // }
    update(){
        this.position.add(this.velocity)
    }
    groundMove(){
        let wishdir = createVector(horizontalInput, verticalInput, 0);
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





