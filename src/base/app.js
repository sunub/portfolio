import * as THREE from "three";
import Camera from "./Camera.js";
import Control from "./Control.js";
import Character from "./Character.js";
import Light from "./Light.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import Renderer from "./Renderer.js";
import Sun from "./Sun.js";
import Mountain from "./Mountain.js";

let instance = null;

export default class App {
  canvasDom = document.getElementById("root");
  stageWidth = document.body.clientWidth;
  stageHeight = document.body.clientHeight;
  pixel = window.devicePixelRatio > 1 ? 2 : 1;
  olElapsedTime = 0;
  clock = new THREE.Clock();
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;

    this.scene = new THREE.Scene();
    this.camera = new Camera(this.stageWidth, this.stageHeight, this.scene);
    // this.light = new Light(this.scene);
    this.control = new Control(this.camera.instace, this.canvasDom);
    this.character = new Character(this.scene);
    this.renderer = new Renderer();
    this.sun = new Sun();
    this.mountain = new Mountain();

    this.setScene();

    window.addEventListener("resize", this.resize.bind(this));

    this.renderer.instacne.setAnimationLoop(this.animate.bind(this));
  }

  setScene() {
    // this.scene.fog = new THREE.FogExp2("#ffaadd", 0.1);
    // this.scene.background = new Color("skyblue");
    this.setupBackground();
  }

  setupBackground() {
    const rgbeLoader = new RGBELoader();
    const load = rgbeLoader.load("./assets/snow_field_4k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.background = texture;
      this.scene.environment = texture;
    });
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvasDom.style.width = this.stageWidth * this.pixel;
    this.canvasDom.style.height = this.stageHeight * this.pixel;

    this.camera.instace.aspect = this.stageWidth / this.stageHeight;
    this.camera.instace.updateProjectionMatrix();

    this.renderer.setPixelRatio(this.pixel);
    this.renderer.setSize(this.stageWidth, this.stageHeight);
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = elapsedTime - this.olElapsedTime;

    this.character.update(deltaTime, this.character.pressedKeys);
    this.olElapsedTime = elapsedTime;
    this.control.instacne.update();
  }

  animate() {
    this.update();

    this.renderer.instacne.render(this.scene, this.camera.instace);
  }
}

window.onload = () => {
  new App();
};
