let angle = 0;

class Player {
    constructor(x, y) {
      this.pos = createVector(x, y)
      this.vel = createVector(0.1, 0.2);
      this.acc = createVector(0.2, 0.3);
    }
    drawPlayer(){
        ellipse(this.pos.x, this.pos.y, 30)
        push();
        translate(this.pos.x, this.pos.y);
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
    rotate(){
        var v1 = createVector(this.x, this.y);
        var v2 = createVector(mouseX, mouseY);
        var diff = p5.Vector.sub(v2, v1);
        var origin = createVector(0, 0);
        angle = Math.atan2(diff.y - origin.y, diff.x - origin.x);
        angle += PI/2;
    }
    update(){
        this.pos.add(this.vel)
        this.vel.add(this.acc)
    }
  }