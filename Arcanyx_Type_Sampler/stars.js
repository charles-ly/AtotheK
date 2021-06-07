class Stars extends Particle { //Creates (Stars) class, inherits code from Particle
  constructor(x, y) {
    super(x, y); //Inherits starting position of superclass (Particle)
    this.angle = random(TWO_PI); //Randomises angle from 
    
  }
//Appearance of 'stars'
  show() {
    noStroke(); //Removes outline
    fill(255, 231, 0, this.lifetime); //Colour and fade
    push();
    translate(this.pos.x, this.pos.y); //Centre of shape
    rotate(this.angle); //Rotation
    square(0, 0, this.r * 2); //Draw a square (x, y, width)
    pop();
  }
}
