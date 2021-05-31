
let firstLetter=65; //the first coded glyph (as unicode number)
let lastLetter=135; //the last coded glyph (as unicode number)
let fontsize ;

let emitter;
let img;

let particles = [];

function preload() {
  font = loadFont('data/AkzidenzGroteskBQ-Reg.ttf');
  img = loadImage('data/Texture.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(255);
  counter=firstLetter;
  fontsize= 120;
  letter = char(counter);
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  osc = new p5.TriOsc();
  env = new p5.Envelope(); 
  
  emitter = new Emitter(200, 375);
  
}

function draw() {
  clear();
  background(0);
  fill(255);
  //strokeWeight();
  //stroke(255);
  text(letter, width/2, height/2);
  
  
  //PARTICLES

  for (let particle of particles) {
    let gravity = createVector(0, 0.2);
    particle.applyForce(gravity);
    particle.update();
    //Allows particles to bounce off edge
    particle.edges();
    particle.show();
  }

  //removes finished particles (from array)
  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
  

}

//SOUND AND TEXT
function mousePressed() {
  userStartAudio();
  osc.start();
  if (counter<lastLetter){
  counter++;}
  else {counter=firstLetter;} //if end of glyphs, start from first
  freq = midiToFreq(counter-30); //the math here just adjusts the scale (lowers frequency of sound)
  osc.freq(freq);
  env.ramp(osc, 0, 1.0, 0);
  letter=char(counter);
  
   //PARTICLES
  //How many particles generated
  for (let i = 0; i < 6; i++) {
    //Placement of particles (x,y)
    particles.push(new Particle(width/2, height/2));
  }
  for (let i = 0; i < 9; i++) {
    particles.push(new Stars(width/2, height/2));
  }
}

//SOUND AND TEXT
function keyTyped(){
  if (key == ' '){
  saveCanvas(letter, 'jpg');} // pressing space bar will save current glyph as a jpg
  
  userStartAudio();
  letter = unchar(key);
  osc.start();
  freq = midiToFreq(letter-30); //the math here adjusts the scale -30 (lowers frequency of sound)
  osc.freq(freq);
  env.ramp(osc, 0, 1.0, 0);
  
  
  if (key == ' '){
  saveCanvas(letter, 'jpg');
  }
  letter=key;
  
  //PARTICLES
  //How many particles generated
  for (let i = 0; i < 6; i++) {
    //Placement of particles (x,y)
    particles.push(new Particle(width/2, height/2));
  }
  for (let i = 0; i < 9; i++) {
    particles.push(new Stars(width/2, height/2));
  }
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  //fontsize=120;
  textSize(fontsize);
}
