import gltfLoader from '@/utils/loader/gtlfLoader';
import gui from '@/utils/gui';
import * as THREE from 'three';
import loadVideo from '@/utils/loader/videoLoader';

const props = {
  scale: 1.5,
  position: {
    z: 5,
  },
};

const table = async () => {
  const group = new THREE.Group();
  const glb = await gltfLoader.loadAsync('./models/table.glb');
  const model = glb.scene;
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material.map) {
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    }
    if (child.isMesh && child.material) {
      child.material.color = new THREE.Color('#454545');
      child.material.metalness = 0.1;
      child.material.roughness = 1;
      child.material.needsUpdate = true;
    }
  });

  model.position.x = 0.5;
  model.position.z = props.position.z;
  model.position.y = 0.5;
  model.rotateY(Math.PI / -2);

  model.scale.set(props.scale, props.scale, props.scale);
  group.add(model);

  const fireLight = new THREE.PointLight(0xffa733, 1.6, 4, 2); // color, intensity, distance, decay
  fireLight.position.set(0.625, 1.25, 3.02); // just in front of the fire plane
  fireLight.castShadow = true;
  fireLight.shadow.mapSize.set(512, 512);
  fireLight.shadow.radius = 2; // softer edge
  fireLight.position.y = 1.1;
  fireLight.position.x = 0.51;
  fireLight.intensity = 3.5;
  fireLight.decay = 2.33;

  gui.add(fireLight, 'intensity').min(0).max(5).step(0.01).name('Fire Light Intensity');
  gui.add(fireLight, 'distance').min(0).max(10).step(0.01).name('Fire Light Distance');
  gui.add(fireLight, 'decay').min(0).max(5).step(0.01).name('Fire Light Decay');

  // Candle Fire
  const video = await loadVideo('/candle_fire.mp4');
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

  group.add(fireLight);
  fireAnimation.position.z = props.position.z - 0.05;
  fireAnimation.position.x = 0.6;
  fireAnimation.position.y = 1.25;
  fireAnimation.scale.y = 0.75;
  fireAnimation.scale.z = 2;
  fireAnimation.scale.x = 0.6;
  fireAnimation.rotation.y = Math.PI / 4;

  gui.add(fireAnimation.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01).name('fireAnimation Rotation Y');

  group.add(fireAnimation);

  // group.position.z = 5

  return group;
};

export default table;
