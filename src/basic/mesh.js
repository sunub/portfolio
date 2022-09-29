import * as THREE from "three";
import * as Dat from "lil-gui";

export default class Mesh {
  constructor() {
    this.geometry = new THREE.BoxGeometry(10, 0.2, 10);
    this.material = new THREE.MeshStandardMaterial({ color: 0xffddaa });
    this.Mesh = new THREE.Mesh(this.geometry, this.material);
    this.Mesh.position.set(0, -5.8, 0);
    this.Mesh.receiveShadow = true;
    this.setDebug();
  }

  setDebug() {
    const gui = new Dat.GUI();
    gui.add(this.Mesh.position, "y").name("floor Y").min(-10).max(10).step(0.1);
  }
}
