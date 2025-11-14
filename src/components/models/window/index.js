import * as THREE from 'three';
import curtain from './curtain';
import windowFrame from './frame';
import gui from '@/utils/gui';

const window = async () => {
  const curtainModel = await curtain(); // 3.2mb
  const windowModel = await windowFrame(); // 3mb

  const group = new THREE.Group();
  group.add(curtainModel);
  group.add(windowModel);

  group.position.x = 1;

  gui.add(group.position, 'x').min(-10).max(10).step(0.01).name('window X');
  gui.add(group.position, 'y').min(-10).max(10).step(0.01).name('window Y');
  gui.add(group.position, 'z').min(-10).max(10).step(0.01).name('window Z');

  return group;
};

export default window;
