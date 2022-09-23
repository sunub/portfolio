import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";
import { Clock, Group } from "three";

const canvasDOM = document.getElementById("root");
let stageWidth = document.body.clientWidth;
let stageHeight = document.body.clientHeight;

// Scene

const scene = new THREE.Scene();

// Camera

const aspect = stageWidth / stageHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.set(0, 0, 10);
scene.add(camera);

// Controller

const control = new OrbitControls(camera, canvasDOM);
control.enableDamping = true;
control.rotateSpeed = 1.5;
control.zoomSpeed = 1;

// Img, Texture

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./img/door/color.jpg");
texture.magFilter = THREE.NearestFilter;
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
  "./img/environmentMaps/0/px.jpg",
  "./img/environmentMaps/0/nx.jpg",
  "./img/environmentMaps/0/py.jpg",
  "./img/environmentMaps/0/ny.jpg",
  "./img/environmentMaps/0/pz.jpg",
  "./img/environmentMaps/0/nz.jpg",
]);

// Mesh

const materials = new THREE.MeshStandardMaterial();
materials.metalness = 0.7;
materials.roughness = 0.2;
materials.envMap = environmentMapTexture;

const group = new THREE.Group();
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), materials);
sphere.position.x = -1.5;
group.add(sphere);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materials);
plane.position.x = 1.5;
group.add(plane);

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), materials);
torus.position.x = 0;

group.add(torus);

scene.add(group);

/**
 * Debug UI
 */

const gui = new dat.GUI();
gui.add(materials, "metalness").min(0).max(1).step(0.0001);
gui.add(materials, "roughness").min(0).max(1).step(0.0001);
/**
 * Ligths
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// Renderer

const renderer = new THREE.WebGLRenderer({ canvas: canvasDOM });
const pixel = window.devicePixelRatio > 1 ? 2 : 1;
renderer.setPixelRatio(pixel);
renderer.setSize(stageWidth, stageHeight);
const clock = new THREE.Clock();
renderer.setAnimationLoop(animate.bind(this));

// EventListener

window.addEventListener("resize", resize.bind(this));

function animate() {
  renderer.setAnimationLoop(animate.bind(this));

  control.update();
  tick();

  renderer.render(scene, camera);
}

function tick() {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;
}

function resize() {
  stageWidth = document.body.clientWidth;
  stageHeight = document.body.clientHeight;

  canvasDOM.style.width = stageWidth;
  canvasDOM.style.height = stageHeight;

  camera.aspect = stageWidth / stageHeight;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(pixel);
  renderer.setSize(stageWidth, stageHeight);
}
