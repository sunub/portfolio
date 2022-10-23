import * as THREE from "three";
import App from "./app.js";
import * as dat from "lil-gui";

export default class Sun {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    this.debug = new dat.GUI();

    this.debugFolder = this.debug.addFolder("sun");

    this.setupSun();
  }

  setupSun() {
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial();
    sunMaterial.emissive = new THREE.Color("#ffaaff");
    sunMaterial.emissiveIntensity = 2;

    this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
    this.sun.position.set(-50, 15, 41);
    this.sun.scale.set(0.5, 0.5, 0.5);

    this.debugFolder.add(this.sun.position, "x").min(-50).max(50).step(0.01).name("sunX");
    this.debugFolder.add(this.sun.position, "y").min(-50).max(50).step(0.01).name("sunY");
    this.debugFolder.add(this.sun.position, "z").min(-50).max(50).step(0.01).name("sunZ");

    this.scene.add(this.sun);
  }
}
