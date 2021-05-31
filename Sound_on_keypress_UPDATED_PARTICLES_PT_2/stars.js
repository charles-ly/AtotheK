class Stars extends Particle {
  constructor(x, y) {
    super(x, y);
    this.angle = random(TWO_PI);
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
