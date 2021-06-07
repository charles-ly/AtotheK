//Thanks to Karen ann Donnachie and The Coding Train for coding tutorials and snippets of code!
//Karen helped display the text and play sound
//The Coding Train helped with particle systems (particle, stars, cloud, emitter)
//Requires p5.sound v.1.0.1
//Requires cloud.png image file
//Requires Arcanyx.otf font file
//Requires Poof_sound_FX.mp3 soundfx file, retrieved from https://www.youtube.com/watch?v=bGNY2YOSSqw by ICETREYs FX - 

//TEXT parameters
let firstLetter=65; //the first coded glyph (as unicode number)
let lastLetter=126; //the last coded glyph (as unicode number)
let fontsize ;

//CLOUD variables
let emitter;
let img;
var soundfx;

//PARTICLES variables
let particles = [];

//Loads in typeface and image texture from data folder
function preload() {
  font = loadFont('data/Arcanyx.otf');
  img = loadImage('data/Smoke_2.png');
  soundfx = loadSound('data/Poof_sound_FX.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  fill(255); //Determines colour of letter
  counter=firstLetter;
  fontsize= windowHeight/5; //Determines point size of text
  letter = char(counter); //Determines (starting) letter showed 
  textFont(font); //Loads typeface referenced in preload
  textSize(fontsize); //Loads text in pointsize determined in fontsize
  textAlign(CENTER, CENTER); //Anchors centre in the middle of the text
  
//SOUND
  osc = new p5.SinOsc(); //Oscillator (Can choose type of sound: Sin, Tri, Saw, Sqr)
  env = new p5.Envelope(); //Fades over time
  
  soundfx.setVolume(0.5); //Sets volume of sfx
  
//CLOUDS
  emitter = new Emitter(200, 375);
}

function draw() {
  clear(); //Refreshes screen
  background(0); //Colour of background
  fill(255); //Colour of text
  //strokeWeight(); //Outline width of text
  //stroke(255); //Stroke colour
  
  text(letter, width/2, height/2); //Places text in the middle of the screen
  
//CLOUDS
  emitter.show(); //Calling appearance of clouds
  emitter.update(); //Calling animation and movement of clouds
 
  blendMode(ADD); //Allows for different visual effects when objects overlap. ADD allows for the white glow (Most noticeable with the smoke) 

//CLOUDS dissipate towards the direction of the cursor
  let force = createVector(0, -0.1); // (x, y) determines the direction of movement; y= -0.1 creates a soft upward force
  emitter.applyForce(force);

  let dir = map(mouseX, 0, width, -0.1, 0.1); //Determines the x direction of cloud movement according to cursor placement.
  let wind = createVector(dir, 0); //Adds a 'wind' force, gives direction of movement
  emitter.applyForce(wind);
  
//PARTICLES
  for (let particle of particles) {
    let gravity = createVector(0, 0.2); //Controls strength of gravity (Only y value added here for downward movement)
    particle.applyForce(gravity); //Adds downward motion to particles
    particle.update(); //Allows particles to move in a direction
    particle.edges(); //Allows particles to bounce off edge
    particle.show(); //Determines appearance of particle
  }

  //Removes finished particles (from array)
  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

//touchStarted used instead to account for viewership on phones
function touchStarted() {

//SOUND AND TEXT
  userStartAudio();
  osc.start();
  if (counter<lastLetter){
  counter++;}
  else {counter=firstLetter;} //if end of glyphs, start from first
  freq = midiToFreq(counter-30); //the math here just adjusts the scale (lowers frequency of sound)
  osc.freq(freq);
  env.ramp(osc, 0, 1.0, 0); //Adjust numbers to control ([unit], delay, volume start, end volume)
  letter=char(counter);
  
  soundfx.play(); //triggers sfx to play
  
//PARTICLES
  for (let i = 0; i < 6; i++) { //i < x determines How many particles generated
    particles.push(new Particle(width/2, height/2)); //Creates a PARTICLE and determines initial placement of particles (x,y)
  }
  for (let i = 0; i < 9; i++) {
    particles.push(new Stars(width/2, height/2));//Creates a STAR and determines initial placement of particles (x,y)
  }

//CLOUDS
  emitter.emit(10);
}

//SOUND AND TEXT
function keyTyped(){
  //Save function
  //if (key == ' '){
  //saveCanvas(letter, 'jpg');} // pressing space bar will save current glyph as a jpg
  
  userStartAudio();
  letter = unchar(key);
  osc.start(); //Plays sound
  freq = midiToFreq(letter-30); //the math here adjusts the scale -30 (lowers frequency of sound)
  osc.freq(freq);
  env.ramp(osc, 0, 1.0, 0); //Adjust numbers to control ([unit], delay, volume start, end volume)
  
  soundfx.play(); //triggers sfx to play
  
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
  
  //CLOUDS
  emitter.emit(10);
}

//Allows for functionality when window is resized, scales content proportionally
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  fontsize= windowHeight/3;
  textSize(fontsize);
}
