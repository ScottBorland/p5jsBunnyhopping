var colliding = false;

class Platform {
    constructor(x, y, z, w, h) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.h = h;
    }
    show(){
        let blue = color(48, 71, 94);
        let red = color	(240, 84, 84);
        if(colliding){
            fill(blue);
        }else{
            fill(red);
        }
        rect(this.x, this.y, this.w, this.h);
    }
}







