import gui from '@/utils/gui';
import gltfLoader from '@/utils/loader/gtlfLoader';
import stand from './stand';
import * as THREE from 'three';
import playstation from './playstation';
import tv from './tv';

const props = {
  scale: 2,
  position: {
    x: -4.5,
    z: 5,
  },
};

const station = async () => {
  const group = new THREE.Group();
  const standModel = await stand(props.position);
  const playstationModel = await playstation(props.position);
  const tvModel = await tv();
  group.add(standModel);
  group.add(playstationModel);
  group.add(tvModel);

  return group;
};

export default station;
