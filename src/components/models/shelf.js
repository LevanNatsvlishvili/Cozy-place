import gui from '@/utils/gui';
import gltfLoader from '@/utils/loader/gtlfLoader';

const props = {
  scale: 2,
};

const shelf = async () => {
  // const glb = await gltfLoader.loadAsync('./models/shelf_2_compressed.glb');
  const glb = await gltfLoader.loadAsync('./models/shelf_modern.glb');
  const model = glb.scene;
  model.position.x = -4.5;
  model.position.z = 10.5;
  model.position.y = 1.975;
  model.rotation.y = Math.PI / 2;
  model.scale.set(-1, 1, 1);

  // Model color
  model.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set('#707070');
      gui.addColor({ color: '#8b4513' }, 'color').onChange((value) => {
        child.material.color.set(value);
      });
    }
  });

  model.scale.set(props.scale, props.scale, props.scale);

  return model;
};

export default shelf;
