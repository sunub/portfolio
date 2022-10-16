import * as THREE from "three";

export default class Camera {
  stageWidth = document.body.clientWidth;
  stageHeight = document.body.clientHeight;
  constructor() {
    this.setCamera();
  }

  setCamera() {
    this.aspect = this.stageWidth / this.stageHeight;
    this.camera = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 1000);
    this.camera.position.set(-0.08, -0.57, 3.61);
  }
}
