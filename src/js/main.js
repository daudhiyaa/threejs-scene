import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// instance renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// instance scene & camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// instance of OrbitControls
const orbit = new OrbitControls(camera, renderer.domElement);

// koordinat kartesius pembantu
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// posisi kamera (default nya 0,0,0 jadi gabisa keliatan apa-apa)
camera.position.set(1, 0.5, 5);
orbit.update();

// instance of box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: "cyan" });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// nge-render
function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  box.rotation.z = time / 1000;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
