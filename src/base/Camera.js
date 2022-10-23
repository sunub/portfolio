import * as THREE from "three";

export default class Camera {
  constructor(stageWidth, stageHeight, scene) {
    this.width = stageWidth;
    this.height = stageHeight;
    this.scene = scene;

    this.setInstace();
  }

  setInstace() {
    this.instace = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.instace.position.set(5, 3, 5);
    this.scene.add(this.instace);
  }

  resize() {
    this.instace.aspect = this.width / this.height;
    this.instace.updateProjectionMatrix();
  }
}
