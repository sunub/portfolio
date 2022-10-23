import * as THREE from "three";

export default class Light {
  constructor(scene) {
    this.scene = scene;

    this.setSunLight();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
    this.helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight);
  }
}
