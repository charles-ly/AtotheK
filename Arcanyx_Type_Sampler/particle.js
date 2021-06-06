class Particle { //Creates and names a class (Particle) and acts as a template
  constructor(x, y) {
    this.pos = createVector(x, y); //Starting point of particles
    this.vel = p5.Vector.random2D(); //Makes a 2D vector from a random angle
    this.vel.mult(random(2, 8)); //Controls randomness and spread
    this.acc = createVector(0, -2); //Direction of movement
    this.r = random(1,4); //Radius (size of particles)
    this.lifetime = 255; //Starting opacity
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
      env.ramp(osc, 0, 0.1, 0); //Adjust numbers to control ([unit], delay, volume start, end volume)
      
      
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
    stroke(255, this.lifetime);
    strokeWeight(2);
    fill(250, this.lifetime);

    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
