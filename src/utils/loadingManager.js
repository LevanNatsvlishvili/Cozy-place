import * as THREE from 'three';

const loadingManager = new THREE.LoadingManager(
  () => console.log('✅ All textures loaded!'),
  (url, loaded, total) => console.log(`Loaded ${loaded}/${total}: ${url}`),
  (url) => console.error('❌ Error loading:', url)
);

const textureLoader = new THREE.TextureLoader(loadingManager);

export { loadingManager, textureLoader };
