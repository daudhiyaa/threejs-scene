import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// instance renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// instance scene & camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45, // 45 derajat kedepan field of view
  window.innerWidth / window.innerHeight, // luasan kamera 
  0.1, // jarak pandang paling deketnya
  1000 // jarak pandang paling jauh
);

// instance of OrbitControls
const orbit = new OrbitControls(camera, renderer.domElement);

// koordinat kartesius pembantu
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// posisi kamera (default nya 0,0,0 jadi gabisa keliatan apa-apa)
camera.position.set(-10, 30, 30);
orbit.update();

// instance of box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: "cyan" });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// instance of plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({ color: "white", side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

// grid helper
const gridHelper = new THREE.GridHelper(30, 40);
// gridHelper.rotation.x = Math.PI / 2;
scene.add(gridHelper);

// instance of sphereGeometry
const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: "blue", wireframe: false, });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 5, 0);
scene.add(sphere);

const gui = new dat.GUI();
const options = {
  "sphereColor" : '#ffea00',
  "wireframe" : false,
}
gui.addColor(options, 'sphereColor').onChange((color) => {
  sphere.material.color.set(color);
});
gui.add(options, 'wireframe').onChange((wireframe) => {
  sphere.material.wireframe = wireframe;
});

// nge-render
function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  box.rotation.z = time / 1000;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
