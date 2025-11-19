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
import windowFrame from './components/models/window';
import tvStation from './components/models/tvStation';
import cat from './components/models/cat';

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
const catModel = await cat(); // 1.9mb
const sofaModel = await sofa(); // 1.7mb
const tableModel = await table(); // 2.3mb
const shelfModel = await shelf(); // 3.4mb
const windowModel = await windowFrame(); // 3mb
const tvStationModel = await tvStation();
scene.add(hearthModel); // 600 ms
scene.add(catModel);
scene.add(sofaModel); // 500ms
scene.add(tableModel); // 500
scene.add(shelfModel); // 2300ms
scene.add(windowModel); // 500
scene.add(tvStationModel);

// To do
// Add cat in front of hearth with animation
// Add lights
// Add animation that makes the light go off and shows lightning more pronounced
// Add loading screen while models are being loaded

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const dt = clock.getDelta();

  if (catModel) {
    const t = clock.getElapsedTime();
    const breatheSpeed = 1.2; // breathing tempo
    const breatheAmount = 0.01; // size change

    const base = catModel.userData.originalScale;

    // Breathing scale on Y axis
    const sY = base + Math.sin(t * breatheSpeed) * breatheAmount;
    catModel.scale.set(base, sY, base);

    // Lift cat so it doesn’t sink into the floor
    const lift = (sY - base) * 0.5; // compensate half the scale change
    catModel.position.y = catModel.userData.originalY + lift;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
