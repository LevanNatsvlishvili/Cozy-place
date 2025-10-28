import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { screenSizes } from './windowResizer';

export const canvas = document.querySelector('canvas.webgl');

export const camera = new THREE.PerspectiveCamera(20, screenSizes.width / screenSizes.height);
camera.position.set(15, 6, 20);

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
