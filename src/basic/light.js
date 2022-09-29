import * as THREE from "three";

export default class Light {
  hemisphereLight = new THREE.AmbientLight(0x404040);
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
  constructor() {
    this.setLight();
  }

  setLight() {
    this.shadowLight.position.set(150, 350, -350);
    this.shadowLight.castShadow = true;

    this.shadowLight.shadow.camera.left = -400;
    this.shadowLight.shadow.camera.right = 400;
    this.shadowLight.shadow.camera.top = 400;
    this.shadowLight.shadow.camera.bottom = -400;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 1000;

    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;
  }
}
