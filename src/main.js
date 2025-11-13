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
import windowFrame from './components/models/window';

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

// Base
scene.add(floor);
scene.add(walls);

// Models
const hearthModel = await hearth();
const sofaModel = await sofa();
const tableModel = await table();
const shelfModel = await shelf();
const curtainModel = await curtain();
const windowModel = await windowFrame();
scene.add(hearthModel);
scene.add(sofaModel);
scene.add(tableModel);
scene.add(shelfModel);
scene.add(curtainModel);
scene.add(windowModel);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const dt = clock.getDelta();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
