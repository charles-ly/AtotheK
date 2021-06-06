class Stars extends Particle { //Creates (Stars) class, inherits code from Particle
  constructor(x, y) {
    super(x, y); //Inherits starting position of superclass (Particle)
    this.angle = random(TWO_PI); //Randomises angle from 
    
  }

  show() {
    noStroke();
    fill(255, this.lifetime);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    square(0, 0, this.r * 2);
    pop();
  }
}
