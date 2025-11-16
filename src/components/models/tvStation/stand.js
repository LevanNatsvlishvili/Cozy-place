import gltfLoader from '@/utils/loader/gtlfLoader';

const props = {
  scale: 2,
};

const stand = async (position) => {
  const glb = await gltfLoader.loadAsync('./models/tv_station/tv_stand_compressed.glb');
  const model = glb.scene;
  model.position.x = position.x;
  model.position.z = position.z;
  model.rotation.y = Math.PI / 2;

  model.scale.set(props.scale, props.scale, props.scale);

  return model;
};

export default stand;
