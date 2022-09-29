import "./style.css";
import * as THREE from "three";
import Mesh from "./basic/mesh.js";
import Camera from "./basic/camera.js";
import Character from "./basic/character.js";
import Control from "./control.js";
import Light from "./basic/light.js";

class App {
  canvasDom = document.getElementById("root");
  stageWidth = document.body.clientWidth;
  stageHeight = document.body.clientHeight;
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.mesh = new Mesh();
    this.light = new Light();
    this.control = new Control(this.camera.camera, this.canvasDom);
    this.setRender();
    this.setScene();

    const helper = new THREE.AxesHelper(10);
    this.scene.add(helper);

    this.character = new Character(this.scene);

    this.renderer.setAnimationLoop(this.animate.bind(this));
  }

  setScene() {
    this.scene.add(this.camera.camera);
    this.scene.add(this.mesh.Mesh);
    this.scene.add(this.light.hemisphereLight);
    this.scene.add(this.light.shadowLight);
  }

  setRender() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasDom });
    this.renderer.setSize(this.stageWidth, this.stageHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    this.renderer.shadowMap = true;
  }

  animate() {
    this.renderer.setAnimationLoop(this.animate.bind(this));

    this.control.controler.update();

    this.renderer.render(this.scene, this.camera.camera);
  }
}

window.onload = () => {
  new App();
};
