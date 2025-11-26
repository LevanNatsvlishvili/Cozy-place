import * as THREE from 'three';
import walls from './components/base/walls';
import floor from './components/base/floor';
import windowResizer from './utils/windowResizer';
import { camera, renderer, controls, perf, scene } from './utils/renderer.js';
import { ambientLight, directionalLight, lightningAmbientLight } from './components/lights/lights.js';
import hearth from './components/models/hearth';
import sofa from '@/components/models/sofa';
import table from './components/models/table';
import shelf from './components/models/shelf';
import windowFrame from './components/models/window';
import tvStation from './components/models/tvStation';
import cat from './components/models/cat';
import bulb from './components/models/bulb';
import catBreathing from './utils/animations/catBreathing';
import candleFlickering from './utils/animations/candleFlickering';
import hearthFlickering from './utils/animations/hearthFlickering';
import updateLightningFromVideo from './utils/animations/lightningAnimation';

import Stats from 'stats.js';
import onClick, { pointerdownHandler, pointerupHandler } from './utils/catchClickOnObjectHandler';
// import onClick from './utils/onClick';

/**
 * Base
 */
// Debug
const clickableObjects = [];

const stats = new Stats();
stats.showPanel(0); // FPS
document.body.appendChild(stats.dom);

// Scene
// Lights
scene.add(ambientLight);
scene.add(directionalLight);
scene.add(lightningAmbientLight);

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
const bulbModel = await bulb();
scene.add(hearthModel); // 600 ms
scene.add(catModel);
scene.add(sofaModel); // 500ms
scene.add(tableModel); // 500
scene.add(shelfModel); // 2300ms
scene.add(windowModel); // 500
scene.add(tvStationModel);
scene.add(bulbModel);

const tv = tvStationModel.children.find((child) => child.name === 'TV');
bulbModel.userData.ambientLight = ambientLight;
clickableObjects.push(bulbModel);
clickableObjects.push(tv);
// clickableObjects.push(tvStationModel);

const onClickHandler = onClick(renderer, camera, clickableObjects);
window.addEventListener('pointerdown', pointerdownHandler);
window.addEventListener('pointerup', (e) => pointerupHandler(e, onClickHandler));

// // To do

// Fireplace turn on/off
// Candle on table turn on/off
// Add more ambient sounds (rain, fireplace, occasional thunder)
// Add loading screen while models are being loaded
// Lets change animation with GSAP, if possible linkedin page will reshare it.
// Jagged edges, on window frame, and potentially other models
// Give background a very subtle texture to avoid pure black
// Test with low end device, like Lika or phone
// Record a video

/**
 * Animate
 */
const clock = new THREE.Clock();

const fpsLimit = 60;
const frameDuration = 1000 / fpsLimit; // ~16.67ms
let lastTime = 0;

const lowFPS = 30;
const lowFrameDuration = 1000 / lowFPS; // ~33.33ms
let lastLowTime = 0;

const tick = (now) => {
  // Schedule next frame first
  window.requestAnimationFrame(tick);

  // First frame init
  if (!lastTime) {
    lastTime = now;
  }

  const delta = now - lastTime;

  // If not enough time passed for 60fps, skip this frame
  if (delta < frameDuration) {
    return;
  }

  // Keep leftover time (smoother pacing)
  lastTime = now - (delta % frameDuration);

  stats.begin();

  const t = clock.getElapsedTime(); // seconds since start

  // if (now - lastLowTime >= lowFrameDuration) {
  //   if (catModel) {
  //     lastLowTime = now;
  //     catBreathing(catModel, t);
  //   }
  //   if (hearthModel) {
  //     hearthFlickering(hearthModel.userData.fireSpot, t);
  //   }
  // }

  // if (windowModel) {
  //   updateLightningFromVideo(windowModel.userData.lightningLight, lightningAmbientLight);
  // }

  const info = renderer.info;
  perf.calls = info.render.calls;
  perf.triangles = info.render.triangles;
  perf.geometries = info.memory.geometries;
  perf.textures = info.memory.textures;

  controls.update();
  renderer.render(scene, camera);

  stats.end();
};

// start loop
window.requestAnimationFrame(tick);
