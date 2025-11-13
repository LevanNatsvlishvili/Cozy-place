import * as THREE from 'three';
import gltfLoader from '@/utils/loader/gtlfLoader';
// import gui from '@/utils/gui';

const window = async () => {
  const windowGlb = await gltfLoader.loadAsync('./models/window_2.glb');
  const windowModel = windowGlb.scene;
  // Window
  windowModel.position.x = -2.75;
  windowModel.position.y = 1;
  windowModel.position.z = 0;

  windowModel.scale.x = 1.35;
  windowModel.scale.y = 1.5;
  windowModel.scale.z = 0.5;

  const group = new THREE.Group();
  group.add(windowModel);

  // Lightning
  const video = document.createElement('video');
  video.src = '/lightning_4.mp4';
  video.loop = true;
  video.muted = true;
  video.play();
  video.playbackRate = 0.65;

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

  group.add(lightningAnimation);

  return group;
};

export default window;
