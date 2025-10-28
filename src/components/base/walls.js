import * as THREE from 'three';
import { wallCoordinates, sideWallCoordinates, backWallCoordinates } from './consts/common.js';

const textureLoader = new THREE.TextureLoader();

// wall
const wallColorTexture = textureLoader.load('./textures/walls/black_painted_planks_diff_1k.jpg');
const wallARMTexture = textureLoader.load('/textures/walls/black_painted_planks_arm_1k.jpg');
const wallNormalTexture = textureLoader.load('./textures/walls/black_painted_planks_nor_gl_1k.jpg');
const wallDisplacementTexture = textureLoader.load('./textures/walls/black_painted_planks_disp_1k.jpg');

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

const repeatX = 3,
  repeatY = 5;
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
// Point to backwall

backWall.wireframe = true;
backWall.position.z = backWallCoordinates.z;
backWall.position.y = wallCoordinates.height / 2;

const group = new THREE.Group();
group.add(sideWalls1);
group.add(sideWalls2);
group.add(backWall);

export default group;
