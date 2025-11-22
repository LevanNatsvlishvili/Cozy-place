import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function registerClickHandler(renderer, camera, clickableObjects, callback) {
  window.addEventListener('pointerdown', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const hits = raycaster.intersectObjects(clickableObjects, true);
    console.log(hits);
    if (hits.length > 0) {
      const obj = hits[0].object;
      callback(obj); // Your action here
    }
  });
}
export default registerClickHandler;
