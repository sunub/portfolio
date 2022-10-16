import * as THREE from "three";
import * as dat from "lil-gui";
import { DirectionalLight, DirectionalLightHelper, HemisphereLight, SpotLight, SpotLightHelper } from "three";

export default class Light {
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
  constructor(scene) {}

  setMain(scene) {
    const lightProperties = {
      color: "#ffffff",
    };
    this.mainLight = new SpotLight("#ffffff", 10, 100, 1, 0.3, 1, 1);
    this.helper = new SpotLightHelper(this.mainLight, 5);
    scene.add(this.helper);
    this.mainLight.position.set(0, 2, 0);

    this.hemisphereLight = new HemisphereLight(0xddeeff, 0x202020, 0.1);

    scene.add(this.mainLight, this.hemisphereLight);
  }
}
