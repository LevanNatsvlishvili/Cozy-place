import gui from '@/utils/gui';
import gltfLoader from '@/utils/loader/gtlfLoader';
import * as THREE from 'three';

const props = {
  scale: 0.5,
};

const cat = async () => {
  const catGlb = await gltfLoader.loadAsync('./models/cat.glb');
  const cat = catGlb.scene;
  cat.position.x = -2.9;
  cat.position.z = 3;
  cat.position.y = 0.15;
  cat.rotation.y = Math.PI / 5;
  cat.userData.originalY = cat.position.y; // store baseline Y
  cat.userData.originalScale = props.scale;
  cat.scale.set(props.scale, props.scale, props.scale);

  // cat.material.emissive = new THREE.Color('#ff7a3c');
  // cat.material.emissiveIntensity = Math.sin(t * 2) * 0.1 + 0.1;

  cat.position.x += (Math.random() - 0.5) * 0.0002;
  cat.position.z += (Math.random() - 0.5) * 0.0002;

  cat.traverse((child) => {
    if (child.isMesh) {
      // child.castShadow = true;
      child.material.metalness = 0.8;
      child.material.roughness = 1;
      child.material.metalnessMap = null;
      child.material.roughnessMap = null;
      child.material.aoMap = null;
      child.material.needsUpdate = true;
    }
  });

  gui.add(cat.position, 'x').min(-10).max(10).step(0.01).name('Cat X Position');
  gui.add(cat.position, 'y').min(-10).max(10).step(0.01).name('Cat Y Position');
  gui.add(cat.position, 'z').min(-10).max(10).step(0.01).name('Cat Z Position');

  cat.userData.originalScale = props.scale;

  return cat;
};

export default cat;
