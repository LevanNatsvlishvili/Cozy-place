import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { screenSizes } from './windowResizer';
import gui from './gui';

export const canvas = document.querySelector('canvas.webgl');

export const camera = new THREE.PerspectiveCamera(25.77, screenSizes.width / screenSizes.height);
camera.position.x = 8.21;
camera.position.y = 5.75;
camera.position.z = 32.79;
gui.add(camera.position, 'x').min(-50).max(50).step(0.01).name('Camera X Position');
gui.add(camera.position, 'y').min(-50).max(50).step(0.01).name('Camera Y Position');
gui.add(camera.position, 'z').min(-50).max(50).step(0.01).name('Camera Z Position');
gui
  .add(camera, 'fov')
  .min(1)
  .max(100)
  .step(0.01)
  .name('Camera FOV')
  .onChange(() => {
    camera.updateProjectionMatrix();
  });

// Controls
export const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

controls.maxPolarAngle = Math.PI / 2; // Prevent the camera from going below the plane
controls.minPolarAngle = 0; // Prevent the camera from flipping upside down
// controls.maxDistance = 10; // Limit how far the camera can move away
// controls.minDistance = 5;

export const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(screenSizes.width, screenSizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
