import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

class App {
  canvasDom = document.getElementById("root");
  stageWidth = document.body.clientWidth;
  stageHeight = document.body.clientHeight;
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ canvas: this.canvasDom });
  cursor = { x: 0, y: 0 };
  constructor() {
    this.setMesh();
    this.setCamera();
    this.renderer.setSize(this.stageWidth, this.stageHeight);

    this.orbitCtrl = new OrbitControls(this.camera, this.canvasDom);
    this.orbitCtrl.enableDamping = true;
    this.orbitCtrl.zoomSpeed = 0.7;

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    window.addEventListener("dblclick", (e) => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

      if (!fullscreenElement) {
        if (this.canvasDom.requestFullscreen) {
          this.canvasDom.requestFullscreen();
        } else if (this.canvasDom.webkitFullscreenElement) {
          this.canvasDom.webkitFullscreenElement();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    });
    window.addEventListener("resize", this.resize.bind(this), false);
    window.addEventListener("mousemove", (e) => {
      this.cursor.x = e.clientX / this.stageWidth - 0.5;
      this.cursor.y = e.clientY / this.stageHeight - 0.5;
    });
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    console.log(this.stageWidth);

    this.canvasDom.style.width = this.stageWidth;
    this.canvasDom.style.height = this.stageHeight;

    this.camera.aspect = this.stageWidth / this.stageHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.stageWidth, this.stageHeight);
  }

  setCamera() {
    const aspect = this.stageWidth / this.stageHeight;
    this.fov = 75;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
    this.camera.position.set(0, 0, 3);
    this.scene.add(this.camera);
  }

  setMesh() {
    const geometry = new THREE.BufferGeometry();

    let count = 50;
    const positionsArray = new Float32Array(count * 3 * 3);

    for (let i = 0; i < count * 3 * 3; i++) {
      positionsArray[i] = (Math.random() - 0.5) * 4;
    }

    const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);

    geometry.setAttribute("position", positionAttribute);
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ wireframe: true }));
    this.scene.add(this.mesh);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.orbitCtrl.update();

    this.renderer.render(this.scene, this.camera);
  }
}

window.onload = () => {
  new App();
};
