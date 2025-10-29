import * as THREE from 'three';
import { floorCoordinates } from './consts/common.js';
import { textureLoader } from '@/utils/loadingManager.js';

const floorColorTexture = textureLoader.load('./textures/wood_planks_grey/diff_1k.jpg');
const floorNormalTexture = textureLoader.load('./textures/wood_planks_grey/nor_gl_1k.jpg');
const floorDisplacementTexture = textureLoader.load('./textures/wood_planks_grey/disp_1k.jpg');
const floorARMTexture = textureLoader.load('./textures/wood_planks_grey/arm_1k.jpg');

floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorNormalTexture.colorSpace = THREE.NoColorSpace;
floorARMTexture.colorSpace = THREE.NoColorSpace;
floorDisplacementTexture.colorSpace = THREE.NoColorSpace;

const repeatX = 4;
const repeatY = 3;
const rotation = Math.PI * 0.5;
const aniso = 8 / 16;

for (const t of [floorColorTexture, floorARMTexture, floorNormalTexture, floorDisplacementTexture]) {
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatX, repeatY);
  t.center.set(0.5, 0.5);
  t.rotation = rotation;
  t.anisotropy = aniso;
}

const material = new THREE.MeshStandardMaterial({
  // color: '#2F3A3B',
  map: floorColorTexture,
  normalMap: floorNormalTexture,
  displacementMap: floorDisplacementTexture,
  displacementScale: 0.02,
  aoMap: floorARMTexture, // R channel
  roughnessMap: floorARMTexture, // G channel
  metalnessMap: floorARMTexture, // B channel
  roughness: 1.0,
  metalness: 0.0,
  side: THREE.DoubleSide,
});

const floor = new THREE.Mesh(new THREE.PlaneGeometry(floorCoordinates.width, floorCoordinates.length), material);
floor.rotation.x = Math.PI * 0.5;
floor.position.z = floorCoordinates.length / 2;

export default floor;
