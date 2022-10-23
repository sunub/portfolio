import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols";
import App from "./app.js";

export default class Camera {
  constructor(camera, canvas) {
    this.instacne = new OrbitControls(camera, canvas);
    this.instacne.enableDamping = true;

    this.app = new App();
    this.canvas = this.app.canvasDom;
    this.character = this.app.character;

    this.instacne.target.set(0, 0, 0);
    this.instacne.enablePan = false;
  }
}
