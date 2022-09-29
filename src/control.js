import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Control {
  constructor(camera, canvas) {
    this.controler = new OrbitControls(camera, canvas);
    this.setControl();
  }

  setControl() {
    this.controler.enableDamping = true;
    this.controler.rotateSpeed = 1.5;
    this.controler.zoomSpeed = 0.5;
  }
}
