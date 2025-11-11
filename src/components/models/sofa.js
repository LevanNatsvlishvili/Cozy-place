import gltfLoader from '@/utils/loader/gtlfLoader';

const props = {
  scale: 0.05,
};

const sofa = async () => {
  const glb = await gltfLoader.loadAsync('./models/sofa.glb');
  const model = glb.scene;
  model.traverse((child) => {
    if (child.isMesh) {
      // Dark grey color
      child.material.color.setHex(0x2f3a3b);
    }
  });
  model.position.x = 3.75;
  model.position.z = 3;

  model.scale.set(props.scale, props.scale, props.scale);

  return model;
};

export default sofa;
