import * as THREE from 'three';
import gltfLoader from '@/utils/loader/gtlfLoader';
import gui from '@/utils/gui';
import loadVideo from '@/utils/loader/videoLoader';
// import gui from '@/utils/gui';

const window = async () => {
  const windowGlb = await gltfLoader.loadAsync('./models/window_rain.glb');
  const windowModel = windowGlb.scene;
  // Window - Jagged edges need to be resolved later
  windowModel.position.x = -2.75;
  windowModel.position.y = 1;
  windowModel.position.z = 0;

  windowModel.scale.x = 1.35;
  windowModel.scale.y = 1.5;
  windowModel.scale.z = 0.5;

  windowModel.traverse((child) => {
    if (child.isMesh && child.name === 'Glass_Glass01_0') {
      child.material.transparent = true;
      child.material.opacity = 0.25;
    }
  });

  const group = new THREE.Group();
  group.add(windowModel);

  // Lightning
  const video = await loadVideo('/lightning_3.mp4');
  video.play();
  video.playbackRate = 0.8;

  const lightningTexture = new THREE.VideoTexture(video);
  lightningTexture.encoding = THREE.sRGBEncoding;

  const lightningMaterial = new THREE.MeshBasicMaterial({
    map: lightningTexture,
  });

  const lightningAnimation = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), lightningMaterial);
  lightningAnimation.position.x = -3.03;
  lightningAnimation.position.y = 3.35;
  lightningAnimation.position.z = 0.09;
  lightningAnimation.scale.y = 2;
  lightningAnimation.scale.z = 1;
  lightningAnimation.scale.x = 2.38;

  // Opacity
  lightningAnimation.material.transparent = true;
  // lightningAnimation.material.opacity = 0.4;
  gui.add(lightningAnimation.material, 'opacity').min(0).max(1).step(0.01).name('lightning opacity');

  group.add(lightningAnimation);

  return group;
};

export default window;
