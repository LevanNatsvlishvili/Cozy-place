import * as THREE from 'three';
import gltfLoader from '@/utils/loader/gtlfLoader';

const props = {
  scale: {
    x: 0.02,
    y: 0.0225,
    z: 0.01,
  },
};

const curtain = async () => {
  const curtainGlb = await gltfLoader.loadAsync('./models/curtain/curtain.glb');
  const curtainRodGlb = await gltfLoader.loadAsync('./models/curtain/curtain_rod.glb');
  const curtainModel = curtainGlb.scene;
  const rodModel = curtainRodGlb.scene;
  curtainModel.position.x = 2;
  // Curtain Rod
  rodModel.rotation.x = Math.PI / 2;
  rodModel.position.y = 5.15;
  rodModel.position.z = 0.225;
  rodModel.scale.z = 0.5;
  rodModel.scale.y = 0.25;
  rodModel.scale.x = 0.5;

  curtainModel.traverse((child) => {
    if (child.isMesh) child.material.color.setHex(0x303030);
  });
  rodModel.traverse((child) => {
    if (child.isMesh) child.material.color.setHex('0x4a4a4a');
  });

  curtainModel.scale.set(props.scale.x, props.scale.y, props.scale.z);

  const curtain1 = curtainModel.clone();
  const curtain2 = curtainModel.clone();
  const rod1 = rodModel.clone();
  const rod2 = rodModel.clone();

  rod1.position.x = -3;
  rod2.position.x = 1.85;

  curtain1.position.x = -3.9;
  curtain1.scale.x = 0.005; // Mirror on X axis

  const group = new THREE.Group();
  group.add(curtain1);
  group.add(curtain2);
  group.add(rod1);
  group.add(rod2);

  return group;
};

export default curtain;
