import * as THREE from "three";
import { Capsule } from "three/examples/jsm/math/capsule.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import Stats from "three/examples/jsm/libs/stats.module.js";
import CANNON from "cannon";
import App from "./app.js";
import Control from "./Control.js";

export default class Character {
  values = {
    speed: 0,
    maxSpeed: 0,
    acceleration: 0,
    previousDirectionOffset: 0,
    oldElapsedTime: 0,
  };
  constructor() {
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.app = new App();
    this.scene = this.app.scene;
    this.clock = this.app.clock;
    this.camera = this.app.camera.instace;
    this.canvas = this.app.canvasDom;

    this.setLoaders();
    this.setPhysics();
    this.setCharater();
    this.setupControls();
  }

  setLoaders() {
    this.dracoLoader.setDecoderPath("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/");
    this.loader.setDRACOLoader(this.dracoLoader);
  }

  setPhysics() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -0.5, 0);

    this.sphereShape = new CANNON.Box(new CANNON.Vec3(0.1, 0.1, 0.1));
    this.sphereBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 1, 0),
      shape: this.sphereShape,
    });
    this.world.addBody(this.sphereBody);
  }

  setCharater() {
    this.mixerUpdateDelta = this.clock.getDelta();

    this.loader.load("./assets/character/character.gltf", (gltf) => {
      const model = gltf.scene;
      const animation = gltf.animations;

      model.position.set(0, 0, 0);
      model.scale.set(0.1, 0.1, 0.1);

      this.mixer = new THREE.AnimationMixer(model);
      console.log(this.mixer);
      this.animationMap = {};
      animation.forEach((clip) => {
        const name = clip.name;
        this.animationMap[name] = this.mixer.clipAction(clip);
      });
      this.animationMap["runningAction"].setLoop(THREE.LoopOnce);
      this.animationMap["runningAction"].clampWhenFinished = true;
      this.animationMap["runningAction"].enalbe = true;

      this.animationMap["stopMotion"].setLoop(THREE.LoopOnce);
      this.animationMap["stopMotion"].clampWhenFinished = true;
      this.animationMap["stopMotion"].enalbe = true;

      this.currentAnimationAction = this.animationMap["mainAction"];
      this.currentAnimationAction.play();

      const box = new THREE.Box3().setFromObject(model);
      model.traverse((char) => {
        char.receiveShadow = true;
        char.castShadow = true;
      });
      const height = box.max.y - box.min.y;
      const diameter = box.max.z - box.min.z;
      model.capsule = new Capsule(new THREE.Vector3(0, diameter / 2, 0), new THREE.Vector3(0, height - diameter / 2, 0), diameter / 2);

      const axisHelper = new THREE.AxesHelper(1000);
      this.boxHelper = new THREE.BoxHelper(model);

      this.charModel = model;
      this.scene.add(axisHelper);
      this.scene.add(this.boxHelper);
      this.scene.add(model);
    });

    const p = new THREE.PlaneGeometry(25, 25);
    const q = new THREE.MeshStandardMaterial({ roughness: 0.5 });
    const ground = new THREE.Mesh(p, q);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.3;
    ground.receiveShadow = true;
    ground.visible = false;
    this.scene.add(ground);
    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body({
      mass: 0,
    });
    floorBody.addShape(floorShape);
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI / 2);
    this.world.addBody(floorBody);
  }

  setupControls() {
    const stats = new Stats();
    this.canvas.appendChild(stats.dom);
    this.fps = stats;

    this.pressedKeys = {};

    document.addEventListener("keydown", (event) => {
      this.pressedKeys[event.key.toLowerCase()] = true;
      this.processAnimation();
    });
    document.addEventListener("keyup", (event) => {
      this.pressedKeys[event.key.toLowerCase()] = false;
      this.processAnimation();
    });
  }

  processAnimation() {
    const previousAnimationAction = this.currentAnimationAction;
    if (this.pressedKeys["arrowleft"] || this.pressedKeys["arrowright"] || this.pressedKeys["arrowup"] || this.pressedKeys["arrowdown"]) {
      this.currentAnimationAction = this.animationMap["runningAction"];
      this.maxSpeed = 80;
      this.acceleration = 3;
    } else {
      this.currentAnimationAction = this.animationMap["mainAction"];
      this.speed = 0;
      this.maxSpeed = 0;
      this.acceleration = 0;
    }

    if (previousAnimationAction) {
      if (previousAnimationAction !== this.currentAnimationAction) {
        previousAnimationAction.fadeOut(0.5);
        this.currentAnimationAction.reset().fadeIn(0.5).play();
      }
    }
  }

  directionOffset() {
    const pressedKeys = this.pressedKeys;
    let directionOffset = 0;

    if (pressedKeys["arrowup"]) {
      if (pressedKeys["arrowleft"]) {
        directionOffset = Math.PI / 4;
      } else if (pressedKeys["arrowright"]) {
        directionOffset = -Math.PI / 4;
      }
    } else if (pressedKeys["arrowdown"]) {
      if (pressedKeys["arrowleft"]) {
        directionOffset = Math.PI / 4 + Math.PI / 2;
      } else if (pressedKeys["arrowright"]) {
        directionOffset = -Math.PI / 4 - Math.PI / 2;
      } else {
        directionOffset = Math.PI;
      }
    } else if (pressedKeys["arrowleft"]) {
      directionOffset = Math.PI / 2;
    } else if (pressedKeys["arrowright"]) {
      directionOffset = -Math.PI / 2;
    } else {
      directionOffset = this.values.previousDirectionOffset;
    }

    this.values.previousDirectionOffset = directionOffset;
    return directionOffset;
  }

  update(deltaTime, pressedKey) {
    if (this.mixer) {
      this.mixer.update(deltaTime);

      const angleCameraDirectionAxisY =
        Math.atan2(this.camera.position.x - this.charModel.position.x, this.camera.position.z - this.charModel.position.z) + Math.PI * 2;

      const rotateQuarternion = new THREE.Quaternion();
      rotateQuarternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angleCameraDirectionAxisY + this.directionOffset(pressedKey));

      this.charModel.quaternion.rotateTowards(rotateQuarternion, THREE.MathUtils.degToRad(5));

      const walkDirection = new THREE.Vector3();

      walkDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.directionOffset(pressedKey));

      if (this.values.speed < this.values.maxSpeed) {
        this.values.speed += this.values.acceleration;
      } else {
        this.values.speed -= this.values.acceleration * 2;
      }

      this.world.step(1 / 60, deltaTime, 3);
      if (this.charModel) {
        this.charModel.position.copy(this.sphereBody.position);
      }

      if (this.boxHelper) {
        this.boxHelper.update();
      }
    }
  }
}
