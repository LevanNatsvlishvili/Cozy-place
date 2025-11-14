import * as THREE from 'three';
import curtain from './curtain';
import windowFrame from './frame';

const window = async () => {
  const curtainModel = await curtain(); // 3.2mb
  const windowModel = await windowFrame(); // 3mb

  const group = new THREE.Group();
  group.add(curtainModel);
  group.add(windowModel);

  group.position.x = 1;

  return group;
};

export default window;
