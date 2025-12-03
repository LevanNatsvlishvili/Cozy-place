import * as THREE from 'three';
import {
  loaderEl,
  loaderFillEl,
  startButtonEl,
  btnContainer,
} from '../eventHandlers/loadingScreenHandler';

function onVariableUpdate(newValue) {
  percentage = newValue;

  // reset watchdog
  clearTimeout(stopTimeout);

  stopTimeout = setTimeout(() => {
    if (Number(percentage) !== 100.0) {
      percentage = 100.0;
      console.warn('⚠️ Loading seems to be stuck, forcing to 100%');
      if (loaderFillEl) {
        loaderFillEl.style.width = '100%';
      }
      loaderEl.style.display = 'none';
      btnContainer.style.display = 'flex';
    }
  }, 4000); // if no update in 0.5 sec → alert
}

// Elements
const loadInfo = new Map();
let startTimeAll = performance.now();
let percentage = false;
let stopTimeout = null;

export const loadingManager = new THREE.LoadingManager();
const allAssetsNumber = 62;

// When an item starts loading
loadingManager.onStart = (url) => {
  loadInfo.set(url, {
    start: performance.now(),
    end: null,
    size: null,
  });
};

// When each item finishes (progress)
loadingManager.onProgress = (url, loaded, total) => {
  const entry = loadInfo.get(url);
  if (!entry) return;

  const newValPercentage = ((loaded / allAssetsNumber) * 100).toFixed(1);
  onVariableUpdate(newValPercentage);
  if (loaderFillEl) {
    loaderFillEl.style.width = newValPercentage + '%';
  }
  if (Number(percentage) === 100) {
    setTimeout(() => {
      loaderEl.style.display = 'none';
      btnContainer.style.display = 'flex';
    }, 100);
  }
};

// If loading fails
loadingManager.onError = (url) => {
  console.error(`❌ Error loading: ${url}`);
};

export default loadingManager;
