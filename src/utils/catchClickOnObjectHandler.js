// onClick.js (or wherever this lives)
import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function handleModelClick(obj, name) {
  if (name.includes('Bulb')) {
    obj.toggleBulb(obj.ambientLight);
  }

  if (name.includes('TV')) {
    obj.toggleTV();
  }

  if (name.includes('Hearth')) {
    obj.toggleFire();
  }

  if (name.includes('table')) {
    obj.toggleFire();
  }
}

export function createClickHandler(renderer, camera, clickableObjects) {
  return function onClick(event) {
    if (!renderer || !camera) return;
    // Defensive: ensure we have a proper array of objects
    const targets = Array.isArray(clickableObjects)
      ? clickableObjects.filter((obj) => obj && obj.isObject3D)
      : [];
    if (targets.length === 0) {
      // Nothing to intersect with yet
      return;
    }

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(targets, true);

    if (intersects.length > 0) {
      const clicked = intersects[0].object;
      const clickedFunc = targets.find((target) =>
        clicked.name.includes(target.name)
      );
      handleModelClick(clickedFunc.userData, clicked.name);
    }
  };
}

export default createClickHandler;

let pointerDownPos = { x: 0, y: 0 };
const CLICK_THRESHOLD = 5; // px

export function pointerdownHandler(event) {
  pointerDownPos.x = event.clientX;
  pointerDownPos.y = event.clientY;
}

export function pointerupHandler(event, onClickHandler) {
  const dx = event.clientX - pointerDownPos.x;
  const dy = event.clientY - pointerDownPos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < CLICK_THRESHOLD) {
    onClickHandler(event);
  }
}
