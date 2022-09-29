import * as THREE from "three";

export default class Light {
  constructor() {
    this.setHemiSphere();
    this.setShadow();
  }

  setHemiSphere() {
    this.hemiSphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    this.hemiSphereLight.castShadow = true;
  }

  setShadow() {
    this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    this.shadowLight.position.set(150, 350, 150);
    this.shadowLight.castShadow = true;

    this.shadowLight.shadow.camera.left = -250;
    this.shadowLight.shadow.camera.right = 250;
    this.shadowLight.shadow.camera.top = 250;
    this.shadowLight.shadow.camera.bottom = -250;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 1000;

    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;
  }
}
