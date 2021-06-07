class Cloud { //Creates and names a class (Cloud) and acts as a template
constructor(x, y) {
    this.pos = createVector(x, y); //Starting point of particles
    this.vel = p5.Vector.random2D(); //Makes a 2D vector from a random angle
    this.vel.mult(random(0.5, 2)); //Controls randomness and spread
    this.acc = createVector(0, 0); //Direction of movement
    this.r = random(290,330); //Radius (size image)
    this.lifetime = 255; //Starting opacity

  }

  finished() { //To delete finished particles (Opacity is <0 )
    return this.lifetime < 0;
  }

  applyForce(force) { //Movement
    this.acc.add(force);
  }

  update() { //Animation and movement
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.lifetime -= 7;
  }

  show() { //Appearance
    push();
    tint(43, 43, 42, this.lifetime);
    imageMode(CENTER);
    image(img, this.pos.x, this.pos.y, this.r*1.2, this.r);
    pop();
  }
}
