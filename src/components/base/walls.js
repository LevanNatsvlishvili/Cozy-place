import * as THREE from 'three';
import { wallCoordinates, sideWallCoordinates, floorCoordinates } from './consts/common.js';

const wallMaterial = new THREE.MeshBasicMaterial({ color: 'lightgrey', side: THREE.DoubleSide });
wallMaterial.opacity = 0.25;
wallMaterial.transparent = true;
const sideWalls = new THREE.Mesh(
  new THREE.BoxGeometry(wallCoordinates.width, wallCoordinates.height, 0.1),
  wallMaterial
);
// Copy side walls to make 2 walls

const sideWalls1 = sideWalls.clone();
const sideWalls2 = sideWalls.clone();

sideWalls1.position.z = sideWallCoordinates.z;
sideWalls1.position.x = sideWallCoordinates.x1;
sideWalls1.position.y = sideWallCoordinates.y;
sideWalls1.rotation.y = Math.PI * 0.5;

sideWalls2.position.z = sideWallCoordinates.z;
sideWalls2.position.x = sideWallCoordinates.x2;
sideWalls2.position.y = sideWallCoordinates.y;
sideWalls2.rotation.y = Math.PI * 0.5;

const backWall = new THREE.Mesh(
  new THREE.BoxGeometry(floorCoordinates.width, wallCoordinates.height, 0.1),
  wallMaterial
);
backWall.position.z = floorCoordinates.length + 0.05;
backWall.position.y = wallCoordinates.height / 2;

const group = new THREE.Group();
group.add(sideWalls1);
group.add(sideWalls2);
group.add(backWall);

export default group;
