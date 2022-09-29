import * as THREE from "three";

export default class Texture {
  constructor() {
    this.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.environmentMapTexture = this.cubeTextureLoader.load([
      "./img/environmentMaps/0/px.jpg",
      "./img/environmentMaps/0/nx.jpg",
      "./img/environmentMaps/0/py.jpg",
      "./img/environmentMaps/0/ny.jpg",
      "./img/environmentMaps/0/pz.jpg",
      "./img/environmentMaps/0/nz.jpg",
    ]);
  }
}
