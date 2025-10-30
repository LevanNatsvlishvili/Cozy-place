import * as THREE from 'three';

export const loadingManager = new THREE.LoadingManager(
  () => console.log('✅ All textures loaded!'),
  (url, loaded, total) => console.log(`Loaded ${loaded}/${total}: ${url}`),
  (url) => console.error('❌ Error loading:', url)
);

export default loadingManager;
