class Emitter {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.clouds = [];
  }

  emit(num) {
    for (let i = 0; i < num; i++) {
      this.clouds.push(new Cloud(this.position.x, this.position.y));
    }
  }

  applyForce(force) {
    for (let cloud of this.clouds) {
      cloud.applyForce(force);
    }
  }

  update() {
    for (let cloud of this.clouds) {
      cloud.update();
    }

    for (let i = this.clouds.length - 1; i >= 0; i--) {
      if (this.clouds[i].finished()) {
        this.clouds.splice(i, 1);
      }
    }
  }

  show() {
    for (let cloud of this.clouds) {
      cloud.show();
    }
  }
}
