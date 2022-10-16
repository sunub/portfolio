import "./style.css";
import * as THREE from "three";
import Camera from "./basic/camera.js";
import Control from "./control.js";
import Character from "./basic/character.js";
import Light from "./basic/light.js";
import { Color } from "three";
import * as DAT from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

class App {
  canvasDom = document.getElementById("root");
  stageWidth = document.body.clientWidth;
  stageHeight = document.body.clientHeight;
  constructor() {
    this.clock = new THREE.Clock();
    const scene = new THREE.Scene();
    this._scene = scene;
    this._scene.fog = new THREE.FogExp2("#ffaadd", 0.1);
    this._scene.background = new Color("skyblue");
    this.camera = new Camera();
    // this.light = new Light(this._scene);
    this.character = new Character(this._scene);
    this.control = new Control(this.camera.camera, this.canvasDom);
    this.setRender();
    this.setScene();

    this.setCharater();
    this.debug();
    this.characterMovement();

    const helper = new THREE.AxesHelper(10);
    this._scene.add(helper);

    this.renderer.setAnimationLoop(this.animate.bind(this));
  }

  setScene() {
    this._scene.add(this.camera.camera);
    this.setupBackground();
  }

  setupBackground() {
    const rgbeLoader = new RGBELoader();
    const load = rgbeLoader.load("./assets/snow_field_4k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      // this._scene.background = texture;
      this._scene.environment = texture;
    });
  }

  debug() {
    this.gui = new DAT.GUI();

    this.gui.add(this.camera.camera.position, "x").name("camera X").min(-10).max(10).step(0.01);
    this.gui.add(this.camera.camera.position, "y").name("camera Y").min(-10).max(10).step(0.01);
    this.gui.add(this.camera.camera.position, "z").name("camera Z").min(-10).max(10).step(0.01);
  }

  setCharater() {
    const gui = new DAT.GUI();
    this.mixerUpdateDelta = this.clock.getDelta();
    const material = new THREE.MeshStandardMaterial();
    this.character.loader.load("./assets/character/scene.gltf", (gltf) => {
      const model = gltf.scene;
      const animation = gltf.animations;

      this.gui.add(model.position, "x").name("model position X").min(-10).max(10).step(0.01);
      this.gui.add(model.position, "y").name("model position Y").min(-10).max(10).step(0.01);
      this.gui.add(model.position, "z").name("model position Z").min(-10).max(10).step(0.01);

      this.mixer = new THREE.AnimationMixer(model);
      const clip = THREE.AnimationClip.findByName(animation, "mainAction");

      model.traverse((o) => {
        o.receiveShadow = true;
        o.castShadow = true;
        o.material = material;
      });
      model.position.set(0, -1.6, 0);
      model.scale.set(0.1, 0.1, 0.1);
      this._scene.add(model);
    });
  }

  characterMovement(model) {
    // let speed = 0.01;
    // let counts = {
    //   right: 0,
    //   left: 0,
    //   up: 0,
    //   down: 0,
    // };
    // let decrease = {
    //   right,
    // };
    // window.addEventListener("keydown", function (e) {
    //   if (e.key == "ArrowRight") {
    //     counts.right += 0.3;
    //     if (model) {
    //       let increase = counts.right * speed;
    //       model.position.x += counts.right * speed + 0.5;
    //     }
    //   }
    //   if (e.key == "ArrowLeft") {
    //     counts.left += 0.3;
    //     if (model) {
    //       model.position.x -= counts.left * speed;
    //     }
    //   }
    //   if (e.key == "ArrowUp") {
    //     console.log(32);
    //   }
    //   if (e.key == "ArrowDown") {
    //     console.log(32);
    //   }
    // });
  }
  setRender() {
    const pixel = window.devicePixelRatio > 1 ? 2 : 1;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasDom,
      antialias: true,
    });
    this.renderer.setSize(this.stageWidth, this.stageHeight);
    this.renderer.setPixelRatio(pixel);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.gammaFacotr = 2.2;
    this.renderer.gammaOutput = true;

    // this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // this.renderer.toneMappingExposure = 1;
  }

  update(time) {
    time *= 0.001;

    if (this.mixer) {
      const deltaTime = time - this.previousTime;
      this.mixer.update(deltaTime);
    }

    this.previousTime = time;
  }

  animate(time) {
    this.control.controler.update();

    this.update(time);

    this.renderer.render(this._scene, this.camera.camera);
  }
}

window.onload = () => {
  new App();
};
