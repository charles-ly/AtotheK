class Emitter { //A way of putting a class into a class for easier summoning in sketch
  constructor(x, y) {
    this.position = createVector(x, y);
    this.clouds = [];
  }

  emit(num) { //Number of clouds
    for (let i = 0; i < num; i++) {
      this.clouds.push(new Cloud(windowWidth/2, windowHeight/2));
    }
  }

  applyForce(force) { //For direction of movement
    for (let cloud of this.clouds) {
      cloud.applyForce(force);
    }
  }

  update() { //For animation
    for (let cloud of this.clouds) {
      cloud.update();
    }
//Deleting finished clouds
    for (let i = this.clouds.length - 1; i >= 0; i--) {
      if (this.clouds[i].finished()) {
        this.clouds.splice(i, 1);
      }
    }
  }

  show() { //For appearance
    for (let cloud of this.clouds) {
      cloud.show();
    }
  }
}
