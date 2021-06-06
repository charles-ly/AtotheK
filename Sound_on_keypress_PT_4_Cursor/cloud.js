class Cloud {
constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.r = random(175,220);
    this.lifetime = 255;
    //this.angle = random(TWO_PI);
  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.lifetime -= 7;
  }

  show() {
    push();
    tint(43, 43, 42, this.lifetime);
    //translate(this.pos.x, this.pos.y);
    //rotate(this.angle);
    imageMode(CENTER);
    image(img, this.pos.x, this.pos.y, this.r, this.r);
    pop();
  }
}
