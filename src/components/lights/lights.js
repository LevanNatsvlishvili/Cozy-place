import * as THREE from 'three';
import { colors, shadow } from '../../utils/consts/common';

// Ambient light
export const ambientLight = new THREE.AmbientLight(colors.light, 10);
// ambientLight.raycast = true;
ambientLight.intensity = 0.5;

export const lightningAmbientLight = new THREE.AmbientLight('#ffffff', 0);

// Directional light
export const directionalLight = new THREE.DirectionalLight(colors.light, 0);
directionalLight.position.set(-1.5, 2, -8);

// Light optimization
directionalLight.shadow.mapSize.width = shadow.mapSize.width;
directionalLight.shadow.mapSize.height = shadow.mapSize.height;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 15;
