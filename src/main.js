import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight);
camera.position.set(15, 6, 20);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

controls.maxPolarAngle = Math.PI / 2; // Prevent the camera from going below the plane
controls.minPolarAngle = 0; // Prevent the camera from flipping upside down
// controls.maxDistance = 10; // Limit how far the camera can move away
// controls.minDistance = 5;

const windowCoordinates = {
  width: 7,
  height: 6,
  z: -0,
};
const windowModel = new THREE.Mesh(
  new THREE.PlaneGeometry(windowCoordinates.width, windowCoordinates.height),
  new THREE.MeshBasicMaterial({ color: 'blue', side: THREE.DoubleSide })
);
windowModel.position.set(0, windowCoordinates.height / 2, windowCoordinates.z);
// Opacity for window
windowModel.material.opacity = 0.4;
windowModel.material.transparent = true;
scene.add(windowModel);

const table = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.5, 1.75), new THREE.MeshBasicMaterial({ color: 'brown' }));
table.position.set(-2, -1, 4);
scene.add(table);
gui.add(table.position, 'y').min(-2).max(2).step(0.01).name('Table Position Y');
gui.add(table.position, 'x').min(-5).max(5).step(0.01).name('Table Position X');
gui.add(table.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01).name('Table Rotation Y');

const fireplace = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), new THREE.MeshBasicMaterial({ color: 'red' }));
fireplace.position.set(-2.5, -1, 0.5);
scene.add(fireplace);
gui.add(fireplace.position, 'y').min(-2).max(2).step(0.01).name('Fireplace Position Y');
gui.add(fireplace.position, 'x').min(-5).max(5).step(0.01).name('Fireplace Position X');
gui.add(fireplace.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01).name('Fireplace Rotation Y');

const chair = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1, 2.5), new THREE.MeshBasicMaterial({ color: 'pink' }));
chair.position.set(2.5, -1, 1);
scene.add(chair);
gui.add(chair.position, 'y').min(-2).max(2).step(0.01).name('Chair Position Y');
gui.add(chair.position, 'x').min(-5).max(5).step(0.01).name('Chair Position X');
gui.add(chair.position, 'z').min(-5).max(5).step(0.01).name('Chair Position Z');

const floorCoordinates = {
  width: 7,
  length: 10,
};
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(floorCoordinates.width, floorCoordinates.length),
  new THREE.MeshBasicMaterial({ color: 'green', side: THREE.DoubleSide })
);
floor.rotation.x = Math.PI * 0.5;
floor.position.z = floorCoordinates.length / 2;
scene.add(floor);

const wallCoordinates = {
  width: floorCoordinates.length,
  height: 4,
};
const wallMaterial = new THREE.MeshBasicMaterial({ color: 'lightgrey', side: THREE.DoubleSide });
wallMaterial.opacity = 0.25;
wallMaterial.transparent = true;
const sideWalls = new THREE.Mesh(
  new THREE.BoxGeometry(wallCoordinates.width, wallCoordinates.height, 0.1),
  wallMaterial
);
// Copy side walls to make 2 walls

const sideWalls1 = sideWalls.clone();
const sideWalls2 = sideWalls.clone();

const sideWallCoordinates = {
  z: floorCoordinates.length / 2,
  x1: floorCoordinates.width / 2,
  x2: -floorCoordinates.width / 2,
  y: wallCoordinates.height / 2,
};

sideWalls1.position.z = sideWallCoordinates.z;
sideWalls1.position.x = sideWallCoordinates.x1;
sideWalls1.position.y = sideWallCoordinates.y;
sideWalls1.rotation.y = Math.PI * 0.5;

sideWalls2.position.z = sideWallCoordinates.z;
sideWalls2.position.x = sideWallCoordinates.x2;
sideWalls2.position.y = sideWallCoordinates.y;
sideWalls2.rotation.y = Math.PI * 0.5;

const backWall = new THREE.Mesh(
  new THREE.BoxGeometry(floorCoordinates.width, wallCoordinates.height, 0.1),
  wallMaterial
);
backWall.position.z = floorCoordinates.length + 0.05;
backWall.position.y = wallCoordinates.height / 2;

scene.add(sideWalls1);
scene.add(sideWalls2);
scene.add(backWall);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
