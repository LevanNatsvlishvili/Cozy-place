import * as THREE from 'three';
import walls from './components/base/walls';
import floor from './components/base/floor';
import windowResizer from './utils/windowResizer';
import { camera, renderer, controls, perf, scene } from './utils/renderer.js';
import {
  ambientLight,
  directionalLight,
  lightningAmbientLight,
} from './components/lights/lights.js';
import catBreathing from './utils/animations/catBreathing';
import hearthFlickering from './utils/animations/hearthFlickering';
import updateLightningFromVideo from './utils/animations/lightningAnimation';

import Stats from 'stats.js';
import onClick, {
  pointerdownHandler,
  pointerupHandler,
} from './utils/catchClickOnObjectHandler';
import startSounds from './components/sounds/startSounds';
import {
  startButtonEl,
  loaderScreenEl,
  loaderFillEl,
} from './utils/eventHandlers/loadingScreenHandler';
import loadModels from './components';

async function init() {
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
  const {
    hearthModel,
    catModel,
    sofaModel,
    tableModel,
    // shelfModel,
    // windowModel,
    // tvStationModel,
    bulbModel,
    // soundData,
  } = await loadModels();

  scene.add(hearthModel); // 600 ms
  scene.add(catModel);
  scene.add(sofaModel); // 500ms
  scene.add(tableModel); // 500
  // scene.add(shelfModel); // 2300ms
  // scene.add(windowModel); // 500
  // scene.add(tvStationModel);
  scene.add(bulbModel);

  // Interactive objects
  // const tv = tvStationModel.children.find((child) => child.name === 'TV');
  bulbModel.userData.ambientLight = ambientLight;
  clickableObjects.push(bulbModel);
  // clickableObjects.push(tv);
  clickableObjects.push(hearthModel);
  clickableObjects.push(tableModel);
  // clickableObjects.push(tvStationModel);

  const onClickHandler = onClick(renderer, camera, clickableObjects);
  window.addEventListener('pointerdown', pointerdownHandler);
  window.addEventListener('pointerup', (e) =>
    pointerupHandler(e, onClickHandler)
  );

  window.addEventListener('pointerdown', () => {
    const ctx = THREE.AudioContext.getContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
  });

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

    if (now - lastLowTime >= lowFrameDuration) {
      if (catModel) {
        lastLowTime = now;
        catBreathing(catModel, t);
      }
      if (hearthModel) {
        hearthFlickering(hearthModel.userData.fireSpot, t);
      }
      // if (windowModel) {
      //   updateLightningFromVideo(
      //     windowModel.userData.lightningLight,
      //     lightningAmbientLight
      //   );
      // }
    }

    const info = renderer.info;
    perf.calls = info.render.calls;
    perf.triangles = info.render.triangles;
    perf.geometries = info.memory.geometries;
    perf.textures = info.memory.textures;

    controls.update();
    renderer.render(scene, camera);

    stats.end();
  };

  loaderFillEl.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'width') {
      const width = parseFloat(getComputedStyle(loaderFillEl).width);
      const maxWidth = loaderFillEl.parentElement.clientWidth;

      if (width >= maxWidth) {
        window.requestAnimationFrame(tick);
        loaderScreenEl.style.display = 'none';
      }
    }
  });

  startButtonEl.addEventListener('click', () => {
    // startSounds(soundData);
    loaderScreenEl.style.display = 'none';
  });
}
init().catch((err) => {
  console.error(
    'An error occurred during loading, please restart the webpage and start again:',
    err
  );
});
// To do
// Thunder sounds need to be turned on, and fix immediate call when start button is clicked
// Videos run immediately as well, need to sync with thunder sounds
// Should sounds be remain ? perforamnce impact ?
// Add loading screen while models are being loaded
// Jagged edges, on window frame, and potentially other models
// Give background a very subtle texture to avoid pure black
// Test with low end device, like Lika or phone
// Record a video
