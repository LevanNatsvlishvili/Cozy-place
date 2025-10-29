import * as THREE from 'three';
import GUI from 'lil-gui';

const gui = new GUI();

// Ambient light
export const ambientLight = new THREE.AmbientLight('#fff', 10);
ambientLight.raycast = true;
ambientLight.wireframe = true;
ambientLight.add(new THREE.AxesHelper(2));

gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name('Ambient Light Intensity');
gui.add(ambientLight.position, 'x').min(-10).max(10).step(0.01).name('Ambient Light X');
gui.add(ambientLight.position, 'y').min(-10).max(10).step(0.01).name('Ambient Light Y');
gui.add(ambientLight.position, 'z').min(-10).max(10).step(0.01).name('Ambient Light Z');

// Directional light
export const directionalLight = new THREE.DirectionalLight('#fff', 1);
directionalLight.position.set(3, 2, -8);

gui.add(directionalLight.position, 'x').min(-10).max(10).step(0.01).name('Light X');
gui.add(directionalLight.position, 'y').min(-10).max(10).step(0.01).name('Light Y');
gui.add(directionalLight.position, 'z').min(-10).max(10).step(0.01).name('Light Z');

// Light optimization
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 15;
