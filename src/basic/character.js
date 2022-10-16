import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as DAT from "lil-gui";
import { DRACOLoader } from "three/examples/jsm/loaders/dracoloader";

export default class Character {
  constructor(scene) {
    this.setMountain(scene);
    this.setAnimation();
  }

  setAnimation() {
    this.loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/");
    this.loader.setDRACOLoader(dracoLoader);
  }

  setMountain(scene) {
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/");
    loader.setDRACOLoader(draco);
    loader.setPath("./assets/");
    loader.load("./mountain.gltf", function (gltf) {
      const model = gltf.scene;
      model.scale.set(3, 3, 3);
      model.position.set(0, -7, 0);
      scene.add(model);
    });
  }

  setLight(scene) {
    const gui = new DAT.GUI();

    const rect1 = new THREE.DirectionalLight(0xffffff, 3);
    rect1.position.set(-0.25, 3, 2.25);
    rect1.shadow.normalBias = 0.05;
    rect1.castShadow = true;
    rect1.shadow.camera.far = 15;
    rect1.shadow.mapSize.set(1024, 1024);
    scene.add(rect1);

    const pointLight = new THREE.PointLight(0xffaadd, 4);
    const helper = new THREE.PointLightHelper(pointLight, 3);
    pointLight.position.set(0, -2.5, 0);
    scene.add(pointLight);
    scene.add(helper);
  }

  sethead(scene) {
    const gltfLoader = new GLTFLoader();
    gltfLoader.setPath("./assets/character/");
    const texture = new THREE.TextureLoader().setPath("./assets/character/").load("texture.png");
    gltfLoader.load("head.gltf", function (gltf) {
      const gui = new DAT.GUI();
      const group = new THREE.Group();

      const head = gltf.scene;
      const material = new THREE.MeshStandardMaterial();
      material.roughness = 0.2;

      head.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
          o.material = material;
        }
      });
      head.position.set(-4, 0, 0);
      head.rotation.y = 9.4;
      group.add(head);

      gltfLoader.load("eyes.gltf", function (gltf) {
        const eye = gltf.scene;
        eye.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = material;
          }
        });
        eye.position.set(-4, 0, 0);
        eye.rotation.y = 9.4;
        group.add(eye);
      });

      gltfLoader.load("body.gltf", function (gltf) {
        const body = gltf.scene;
        body.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = material;
          }
        });
        body.position.set(-4, 0, 0);
        body.rotation.y = 9.4;
        group.add(body);
      });

      gltfLoader.load("leftArm.gltf", function (gltf) {
        const leftArm = gltf.scene;
        leftArm.traverse((o) => {
          o.material = material;
          o.receiveShadow = true;
          o.castShadow = true;
        });
        leftArm.position.set(-4, 0, 0);
        leftArm.rotation.y = 9.4;
        group.add(leftArm);
      });

      gltfLoader.load("rightArm.gltf", function (gltf) {
        const rightArm = gltf.scene;
        rightArm.traverse((o) => {
          o.material = material;
          o.receiveShadow = true;
          o.castShadow = true;
        });
        rightArm.position.set(-4, 0, 0);
        rightArm.rotation.y = 9.4;
        group.add(rightArm);
      });
      group.scale.set(0.2, 0.2, 0.2);

      scene.add(group);
    });
  }
}
