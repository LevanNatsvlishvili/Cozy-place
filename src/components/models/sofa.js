import gltfLoader from '@/utils/loader/gtlfLoader';
import gui from '@/utils/gui';

const props = {
  scale: 0.05,
};

const sofa = async () => {
  const glb = await gltfLoader.loadAsync('./models/sofa.glb');
  const model = glb.scene;
  model.position.x = 3.75;
  model.position.z = 3;

  model.scale.set(props.scale, props.scale, props.scale);
  gui.add(model.position, 'x').min(-10).max(10).step(0.01).name('Sofa Position X');
  gui.add(model.position, 'y').min(-10).max(10).step(0.01).name('Sofa Position Y');
  gui.add(model.position, 'z').min(-10).max(10).step(0.01).name('Sofa Position Z');
  gui.add(model.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01).name('Sofa Rotation Y');

  return model;
};

export default sofa;
