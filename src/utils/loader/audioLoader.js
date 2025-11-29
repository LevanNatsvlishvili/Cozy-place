import * as THREE from 'three';
import loadingManager from './loadingManager';

export const listener = new THREE.AudioListener(); // <-- export this
export const audioLoader = new THREE.AudioLoader(loadingManager);

export default audioLoader;
