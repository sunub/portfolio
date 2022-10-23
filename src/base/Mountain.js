import App from "./app.js";
import * as THREE from "three";

export default class Mountain {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.charater = this.app.character;
    this.loader = this.charater.loader;
    this.debug = this.app.sun.debugFolder;

    this.setupModel();
  }

  setupModel() {
    this.loader.load("./assets/mountain.gltf", (gltf) => {
      const model = gltf.scene;
      model.position.set(0, -11.7, 0);
      model.scale.set(7, 7, 7);

      this.debug.add(model.position, "x").min(-50).max(50).step(0.001);
      this.debug.add(model.position, "y").min(-50).max(50).step(0.001);
      this.debug.add(model.position, "z").min(-50).max(50).step(0.001);

      this.scene.add(model);
    });
  }
}
