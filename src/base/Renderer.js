import * as THREE from "three";
import App from "./app.js";

export default class Renderer {
  constructor() {
    this.app = new App();
    this.canvas = this.app.canvasDom;
    this.camera = this.app.camera;
    this.scene = this.app.scene;

    this.setInstance();
  }

  setInstance() {
    this.instacne = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.instacne.setSize(this.app.stageWidth, this.app.stageHeight);
    this.instacne.setPixelRatio(this.app.pixel);
    this.instacne.shadowMap.enabled = true;
    this.instacne.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instacne.physicallyCorrectLights = true;

    this.instacne.toneMapping = THREE.ACESFilmicToneMapping;
    this.instacne.toneMappingExposure = 1;
  }

  resize() {
    this.instacne.setPixelRatio(this.app.pixel);
    this.instacne.setSize(this.app.stageWidth, this.app.stageHeight);
  }
}
