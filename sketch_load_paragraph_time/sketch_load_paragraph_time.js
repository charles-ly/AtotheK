var font1; 
var myText = 'And yet this naked body of \"quotemarks"\" words just now starting to play out its creative potential is not really my own. It’s part of something much larger than me— some kind of dynamic, shape-shifting intersubjectivity where I am always losing sight of myself as I improvisationally interact with The Network and, without thinking about it, intuitively manipulate the pulse of Time (as if such a thing as Time could actually exist).';
var size = 32;


function preload() {
  font1 = loadFont('data/AkzidenzGroteskBQ-Reg.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  fill(255);
  noStroke();
  textFont(font1);
  words = myText.split(' ');
  textAlign(LEFT, TOP);
  textSize(size);
  textLeading(32*1.5);
  
}


function draw() {
  background(0);
  //text(myText, width/20, height/20, 0.9*width, 0.9*height);
  
  for (var i=0; i<words.length; i++){
    if (frameCount>100*i){
    text(words[i], 10, i*32);
    }
  }
}
