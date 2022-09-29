import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import * as THREE from "three";
import * as dat from "lil-gui";

export default class Character {
  constructor(scene) {
    this.head(scene);
    this.body(scene);
  }

  head(scene) {
    const gui = new dat.GUI();
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath("./assets/");
    mtlLoader.load("headMat.mtl", function (material) {
      const character = new THREE.Group();
      const arms = new THREE.Group();
      material.preload();
      const objLoader = new OBJLoader();
      objLoader.setPath("./assets/");
      objLoader.setMaterials(material);
      objLoader.load("head.obj", function (object) {
        gui.add(object.position, "x").min(-10).max(10).step(0.01);
        object.position.set(-5.5, 0, 0);
        character.add(object);
      });
      const larmLoader = new OBJLoader();
      larmLoader.setPath("./assets/");
      larmLoader.setMaterials(material);
      larmLoader.load("leftArm.obj", function (object) {
        arms.add(object);
      });
      const rArmLoader = new OBJLoader();
      rArmLoader.setPath("./assets/");
      rArmLoader.setMaterials(material);
      rArmLoader.load("rightArm.obj", function (object) {
        arms.add(object);
      });
      const glLoader = new GLTFLoader();
      glLoader.setPath("./assets/");
      glLoader.load("body.glb", function (gltf) {
        gltf.scene.receiveShadow = true;
        gltf.scene.castShadow = true;
        gltf.scene.position.set(-10.2, 0, 0);
        character.add(gltf.scene);
      });
      arms.position.set(-0.23, 0, 0);
      character.add(arms);
      scene.add(character);
    });
    // const loader = new OBJLoader();
    // loader.setMaterials()
    // loader.load("./assets/head.obj", function (object) {
    //   const gui = new dat.GUI();
    //   const group = new THREE.Group();
    //   object.position.set(-5.4, 0, 0);

    //   group.add(object);
    //   const glLoader = new GLTFLoader();
    //   glLoader.load("./assets/body.glb", function (gltf) {
    //     gltf.scene.position.set(-10.2, 0, 0);
    //     group.add(gltf.scene);
    //     gui.add(gltf.scene.position, "x").name("bodyX").min(-20).max(20).step(0.05);
    //   });
    //   group.receiveShadow = true;
    //   scene.add(group);
    // });
  }

  body(scene) {
    const glLoader = new GLTFLoader();
    glLoader.load("./assets/body.glb", function (gltf) {
      gltf.scene.position.set(-10, 0, 0);
    });
  }
}
