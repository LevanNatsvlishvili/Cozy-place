import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import walls from './components/base/walls';
import floor from './components/base/floor';
import windowResizer from './utils/windowResizer';
import { camera, renderer, controls } from './utils/renderer.js';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Scene
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
scene.add(camera);

// Resizes window every time the window size changes
windowResizer(camera, renderer);
// Controls

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

scene.add(floor);
scene.add(walls);

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
