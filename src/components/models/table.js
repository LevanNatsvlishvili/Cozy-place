import gltfLoader from '@/utils/loader/gtlfLoader';
import gui from '@/utils/gui';
import * as THREE from 'three';

const props = {
  scale: 1.5,
};

const table = async () => {
  const group = new THREE.Group();
  const glb = await gltfLoader.loadAsync('./models/table_low_polygon.glb');
  const model = glb.scene;
  model.position.x = 0.5;
  model.position.z = 3;
  model.position.y = 0.5;
  model.rotateY(Math.PI / -2);

  model.scale.set(props.scale, props.scale, props.scale);
  gui.add(model.position, 'x').min(-10).max(10).step(0.01).name('Table Position X');
  gui.add(model.position, 'y').min(-10).max(10).step(0.01).name('Table Position Y');
  gui.add(model.position, 'z').min(-10).max(10).step(0.01).name('Table Position Z');
  gui.add(model.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01).name('Table Rotation Y');
  gui.add(model.scale, 'x').min(0).max(2).step(0.01).name('Table Scale X');
  gui.add(model.scale, 'y').min(0).max(2).step(0.01).name('Table Scale Y');
  gui.add(model.scale, 'z').min(0).max(2).step(0.01).name('Table Scale Z');

  group.add(model);

  // Candle Fire
  const video = document.createElement('video');
  video.src = '/candle_fire_2.mp4';
  video.loop = true;
  video.muted = true;
  video.play();
  video.playbackRate = 1;

  const fireTexture = new THREE.VideoTexture(video);
  fireTexture.encoding = THREE.sRGBEncoding;

  const fireMaterial = new THREE.MeshBasicMaterial({
    map: fireTexture,
    transparent: true,
    blending: THREE.AdditiveBlending, // key line!
    depthWrite: false, // avoids z-fighting glow
  });

  const fireAnimation = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), fireMaterial);
  fireAnimation.position.z = 3.02;
  fireAnimation.position.x = 0.6;
  fireAnimation.position.y = 1.25;
  fireAnimation.scale.y = 0.75;
  fireAnimation.scale.z = 2;
  fireAnimation.scale.x = 0.5;
  // AXIS HELPER TO FIREANIMATION
  const axesHelper = new THREE.AxesHelper(2);
  // fireAnimation.add(axesHelper);
  group.add(fireAnimation);
  // fireAnimation.rotation.y = Math.PI * 0.5;

  gui.add(fireAnimation.position, 'x').min(-10).max(10).step(0.01).name('Candle Fire Position X');
  gui.add(fireAnimation.position, 'y').min(-10).max(10).step(0.01).name('Candle Fire Position Y');
  gui.add(fireAnimation.position, 'z').min(-10).max(10).step(0.01).name('Candle Fire Position Z');
  gui.add(fireAnimation.scale, 'x').min(0).max(2).step(0.01).name('Candle Fire Scale X');
  gui.add(fireAnimation.scale, 'y').min(0).max(2).step(0.01).name('Candle Fire Scale Y');

  return group;
};

export default table;
