import * as THREE from 'three';
import { wallCoordinates, sideWallCoordinates, backWallCoordinates, floorCoordinates } from './consts/common.js';
import { textureLoader } from '@/utils/loadingManager.js';
import gui from '@/utils/gui.js';
import floor from './floor.js';

// wall
const wallColorTexture = textureLoader.load('./textures/walls/diff_1k.jpg');
const wallARMTexture = textureLoader.load('/textures/walls/arm_1k.jpg');
const wallNormalTexture = textureLoader.load('./textures/walls/nor_gl_1k.jpg');
const wallDisplacementTexture = textureLoader.load('./textures/walls/disp_1k.jpg');

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

const repeatX = 1.25;
const repeatY = 1;
const rotation = Math.PI * 0.5;

for (const t of [wallColorTexture, wallARMTexture, wallNormalTexture, wallDisplacementTexture]) {
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatX, repeatY);
  t.center.set(0.5, 0.5);
  t.rotation = rotation;
}

const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallColorTexture,
  normalMap: wallNormalTexture,
  aoMap: wallARMTexture, // R channel
  roughnessMap: wallARMTexture, // G channel
  metalnessMap: wallARMTexture, // B channel
  roughness: 1.0, // base; the map will modulate this
  metalness: 0.0, // wood is non-metal; map B will still apply subtle variation
  side: THREE.DoubleSide,
  displacementMap: wallDisplacementTexture,
  displacementScale: 0.025, // start small; increase if you add more segments
});

wallMaterial.transparent = true;
// wallMaterial.opacity = 0; // to fix some z-fighting issues with floor

const sideWallGeom = new THREE.BoxGeometry(
  wallCoordinates.width, // along X
  wallCoordinates.height, // along Y
  0.1, // thin
  1,
  64,
  1 // widthSegments, heightSegments, depthSegments
);
sideWallGeom.setAttribute('uv2', new THREE.BufferAttribute(sideWallGeom.attributes.uv.array, 2));

const sideWalls = new THREE.Mesh(sideWallGeom, wallMaterial);
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

// Bent side walls
const bentSideWallGeometry = new THREE.BoxGeometry(
  floorCoordinates.length, // along X
  floorCoordinates.width / 2 + floorCoordinates.width / 5, // along Y
  0.1, // thin
  1,
  64,
  1 // widthSegments, heightSegments, depthSegments
);
bentSideWallGeometry.setAttribute('uv2', new THREE.BufferAttribute(bentSideWallGeometry.attributes.uv.array, 2));
const bentSideWall = new THREE.Mesh(bentSideWallGeometry, wallMaterial);
bentSideWall.rotation.y = Math.PI * 0.5;
bentSideWall.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI * -0.25);

bentSideWall.position.x = sideWallCoordinates.x1 - floorCoordinates.width / 4;
bentSideWall.position.z = sideWallCoordinates.z;
bentSideWall.position.y = sideWallCoordinates.y + wallCoordinates.height - 0.5;
const bentSideWall1 = bentSideWall.clone();
const bentSideWall2 = bentSideWall.clone();
bentSideWall2.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI * 0.5);
bentSideWall2.position.x = sideWallCoordinates.x2 + floorCoordinates.width / 4;

// BACK WALL //
const backWallGeom = new THREE.BoxGeometry(
  backWallCoordinates.width,
  backWallCoordinates.height,
  0.1, // thin
  1,
  64,
  1 // widthSegments, heightSegments, depthSegments
);
backWallGeom.setAttribute('uv2', new THREE.BufferAttribute(backWallGeom.attributes.uv.array, 2));

const backWall = new THREE.Mesh(backWallGeom, wallMaterial);
backWall.position.z = backWallCoordinates.z;

const backWall1 = backWall.clone();
const backWall2 = backWall.clone();
backWall1.position.y = wallCoordinates.height / 2;
backWall2.position.y = wallCoordinates.height / 2 + wallCoordinates.height;

const group = new THREE.Group();
group.add(sideWalls1);
group.add(sideWalls2);
group.add(bentSideWall1);
group.add(bentSideWall2);
group.add(backWall1);
group.add(backWall2);

export default group;
