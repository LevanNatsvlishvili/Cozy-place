import * as THREE from 'three';
import walls from './components/base/walls';
import floor from './components/base/floor';
import windowResizer from './utils/windowResizer';
import { camera, renderer, controls } from './utils/renderer.js';
import { windowCoordinates } from './components/base/consts/common.js';
import { ambientLight, directionalLight } from './components/lights/lights.js';
import sofa from '@/components/models/sofa';
import hearth from './components/models/hearth';
import table from './components/models/table';
import shelf from './components/models/shelf';
import curtain from './components/models/curtain';

/**
 * Base
 */
// Debug

// Scene
const scene = new THREE.Scene();

// Lights
scene.add(ambientLight);
scene.add(directionalLight);

// Camera
scene.add(camera);

// Resizes window every time the window size changes
windowResizer(camera, renderer);
// Controls

// Models
const windowModel = new THREE.Mesh(
  new THREE.PlaneGeometry(windowCoordinates.width, windowCoordinates.height),
  new THREE.MeshBasicMaterial({ color: 'blue', side: THREE.DoubleSide })
);
windowModel.position.set(0, windowCoordinates.height / 2, windowCoordinates.z);
// Opacity for window
windowModel.material.opacity = 0.4;
windowModel.material.transparent = true;
scene.add(windowModel);

// Base
scene.add(floor);
scene.add(walls);

// Models
const hearthModel = await hearth();
const sofaModel = await sofa();
const tableModel = await table();
const shelfModel = await shelf();
const curtainModel = await curtain();
scene.add(hearthModel);
scene.add(sofaModel);
scene.add(tableModel);
scene.add(shelfModel);
scene.add(curtainModel);

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
