import * as THREE from 'three';
import gltfLoader from '@/utils/loader/gtlfLoader';
import gui from '@/utils/gui';
import loadVideo from '@/utils/loader/videoLoader';
import { mediaLength } from '@/utils/consts/common';
// import gui from '@/utils/gui';

const frame = async () => {
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
      child.material.opacity = 0.4;
    }
  });

  const group = new THREE.Group();
  group.add(windowModel);

  // Lightning
  const video = await loadVideo('/lightning_3.mp4', false);
  video.playbackRate = 0.8;
  video.play();
  // Console log time with seconds when video starts
  const time = new Date();
  console.log('Lightning video started at:', time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());

  video.addEventListener('ended', () => {
    video.currentTime = 0;
    setTimeout(() => {
      video.play();
    }, mediaLength.lightning.pause); // pause before replaying
  });

  const lightningTexture = new THREE.VideoTexture(video);
  lightningTexture.encoding = THREE.sRGBEncoding;

  const lightningMaterial = new THREE.MeshBasicMaterial({
    map: lightningTexture,
  });

  const lightningAnimation = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), lightningMaterial);
  lightningAnimation.position.x = -3.05;
  lightningAnimation.position.y = 3.4;
  lightningAnimation.position.z = 0.1;
  lightningAnimation.scale.y = 2;
  lightningAnimation.scale.z = 1;
  lightningAnimation.scale.x = 2.38;

  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 18;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  lightningAnimation.userData.brightnessCanvas = canvas;
  lightningAnimation.userData.brightnessCtx = ctx;
  lightningAnimation.userData.video = video;

  // Opacity
  lightningAnimation.material.transparent = true;
  lightningMaterial.color.setScalar(0.1); // 0 = black, 1 = normal

  // gui.add(lightningAnimation.material.color, 'r').min(0).max(1).step(0.001).name('lightning brightness');
  gui.add(lightningAnimation.material, 'opacity').min(0).max(1).step(0.01).name('lightning opacity');

  group.add(lightningAnimation);
  group.userData.lightningLight = lightningAnimation;

  return group;
};

export default frame;
