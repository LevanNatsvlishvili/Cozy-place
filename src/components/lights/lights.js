import * as THREE from 'three';
import gui from '@/utils/gui.js';
import { colors } from '../base/consts/common';

// Ambient light
export const ambientLight = new THREE.AmbientLight('#fff', 10);
ambientLight.raycast = true;
ambientLight.intensity = 0;
// ambientLight.add(new THREE.AxesHelper(2));

gui.add(ambientLight, 'intensity').min(0).max(30).step(0.01).name('Ambient Light Intensity');

// Directional light
export const directionalLight = new THREE.DirectionalLight(colors.light, 0);
directionalLight.position.set(-1.5, 2, -8);

// gui.add(directionalLight.position, 'x').min(-10).max(10).step(0.01).name('Light X');
// gui.add(directionalLight.position, 'y').min(-10).max(10).step(0.01).name('Light Y');
// gui.add(directionalLight.position, 'z').min(-10).max(10).step(0.01).name('Light Z');
// gui.add(directionalLight, 'intensity').min(0).max(10).step(0.01).name('Directional Light Intensity');

// Light optimization
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 15;
