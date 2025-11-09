import gltfLoader from '@/utils/loader/gtlfLoader';
import gui from '@/utils/gui';

const props = {
  scale: 2,
};

const shelf = async () => {
  const glb = await gltfLoader.loadAsync('./models/shelf.glb');
  const model = glb.scene;
  model.position.x = -4.5;
  model.position.z = 10.5;
  model.position.y = 1.975;
  model.rotation.y = Math.PI / 2;

  // Model color
  model.traverse((child) => {
    if (child.isMesh) {
      child.material.color.setHex(0x8b4513); // Set to brown color
    }
  });

  model.scale.set(props.scale, props.scale, props.scale);

  return model;
};

export default shelf;
