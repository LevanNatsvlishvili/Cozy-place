import gui from '@/utils/gui';
import gltfLoader from '@/utils/loader/gtlfLoader';

const props = {
  scale: 0.25,
};

const playstation = async (position) => {
  const glb = await gltfLoader.loadAsync('./models/tv_station/ps5_4.glb');
  const model = glb.scene;
  model.position.x = position.x;
  model.position.z = 3.6;
  model.position.y = 0.74;
  // model.rotation.y = Math.PI / 2;
  gui.add(model.position, 'y').min(-5).max(5).step(0.01).name('PlayStation Y Position');
  gui.add(model.position, 'x').min(-5).max(5).step(0.01).name('PlayStation X Position');
  gui.add(model.position, 'z').min(-5).max(5).step(0.01).name('PlayStation Z Position');

  model.scale.set(props.scale, props.scale, props.scale);

  return model;
};

export default playstation;
