import gltfLoader from '@/utils/loader/gtlfLoader';

const props = {
  scale: 0.5,
};

const cat = async () => {
  const catGlb = await gltfLoader.loadAsync('./models/cat.glb');
  const cat = catGlb.scene;
  cat.position.x = -2.5;
  cat.position.z = 3.25;
  cat.position.y = 0.15;
  cat.rotation.y = Math.PI / 5;
  cat.userData.originalY = cat.position.y; // store baseline Y
  cat.userData.originalScale = props.scale;
  cat.scale.set(props.scale, props.scale, props.scale);

  cat.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.material.metalness = 0.8;
      child.material.roughness = 1;
      child.material.metalnessMap = null;
      child.material.roughnessMap = null;
      child.material.aoMap = null;
      child.material.needsUpdate = true;
    }
  });

  cat.userData.originalScale = props.scale;

  return cat;
};

export default cat;
