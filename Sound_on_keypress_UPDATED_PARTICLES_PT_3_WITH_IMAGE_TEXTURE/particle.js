class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    //Controls randomness and spread
    this.vel.mult(random(2, 5));
    //Direction of movement
    this.acc = createVector(0, -2);
    //radius (size of particles)
    this.r = 4;
    //starting opacity
    this.lifetime = 255;
  }
  
  //removes finished particles
  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  //Bounce off edge
  edges() {
    if (this.pos.y >= height - this.r) {
      
      //bouncing off sound effect
      userStartAudio();
      osc.start();
      freq = midiToFreq(random(50,53)); //the math here adjusts the scale -30 (lowers frequency of sound)
      osc.freq(freq);
      env.ramp(osc, 0, 0.1, 0);
      
      
      this.pos.y = height - this.r;
      //bouncing force
      this.vel.y *= -0.2;
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    //larger number = shorter lifespan
    this.lifetime -= 3;
  }

  show() {
    stroke(255, 210, 0, this.lifetime);
    strokeWeight(2);
    fill(255, 231, 0, this.lifetime);

    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
