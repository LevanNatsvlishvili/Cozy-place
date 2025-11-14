import * as THREE from 'three';
import walls from './components/base/walls';
import floor from './components/base/floor';
import windowResizer from './utils/windowResizer';
import { camera, renderer, controls } from './utils/renderer.js';
import { ambientLight, directionalLight } from './components/lights/lights.js';
import hearth from './components/models/hearth';
import sofa from '@/components/models/sofa';
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
const hearthModel = await hearth(); // 1.9mb
const sofaModel = await sofa(); // 1.7mb
const tableModel = await table(); // 2.3mb
const shelfModel = await shelf(); // 3.4mb
const curtainModel = await curtain(); // 3.2mb
const windowModel = await windowFrame(); // 3mb
scene.add(hearthModel); // 600 ms
scene.add(sofaModel); // 500ms
scene.add(tableModel); // 500
scene.add(shelfModel); // 2300ms
scene.add(curtainModel); // 700
scene.add(windowModel); // 500

// To do
// Add animation that makes the light go off and shows lightning more pronounced

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
