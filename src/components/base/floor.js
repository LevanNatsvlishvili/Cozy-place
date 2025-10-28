import * as THREE from 'three';
import { floorCoordinates } from './consts/common.js';

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(floorCoordinates.width, floorCoordinates.length),
  new THREE.MeshBasicMaterial({ color: 'green', side: THREE.DoubleSide })
);
floor.rotation.x = Math.PI * 0.5;
floor.position.z = floorCoordinates.length / 2;

export default floor;
