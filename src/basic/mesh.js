import * as THREE from "three";
import * as Dat from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/dracoloader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default class Mesh {
  constructor(scene) {
    this.scene = scene;
  }

  setDebug() {
    const gui = new Dat.GUI();
    gui.add(this.ground.position, "y").name("floor Y").min(-10).max(10).step(0.1);
  }

  setGround() {
    const geometry = new THREE.BoxGeometry(100, 0.2, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xffddaa });
    this.ground = new THREE.Mesh(geometry, material);
    this.ground.position.set(0, -5.8, 0);
    this.ground.receiveShadow = true;
  }

  setSurface(scene) {}
}
