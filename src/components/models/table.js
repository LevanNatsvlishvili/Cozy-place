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
      gui.add(child.material, 'metalness').min(0).max(1).step(0.01).name('Table Metalness');
      gui.add(child.material, 'roughness').min(0).max(1).step(0.01).name('Table Roughness');
      gui.addColor(child.material, 'color').name('Table Color');
    }
  });

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

  const fireLight = new THREE.PointLight(0xffa733, 1.6, 4, 2); // color, intensity, distance, decay
  fireLight.position.set(0.625, 1.25, 3.02); // just in front of the fire plane
  fireLight.castShadow = true;
  fireLight.shadow.mapSize.set(512, 512);
  fireLight.shadow.radius = 2; // softer edge
  fireLight.position.y = 1.1;
  fireLight.position.x = 0.51;
  fireLight.intensity = 3.5;
  fireLight.decay = 2.33;

  gui.add(fireLight.scale, 'x').min(0).max(2).step(0.01).name('Fire Light Scale X');
  gui.add(fireLight.scale, 'y').min(0).max(2).step(0.01).name('Fire Light Scale Y');
  gui.add(fireLight.scale, 'z').min(0).max(2).step(0.01).name('Fire Light Scale Z');

  const AxesHelper = new THREE.AxesHelper(2);
  fireLight.add(AxesHelper);

  gui.add(fireLight.position, 'x').min(-10).max(10).step(0.01).name('Fire Light Position X');
  gui.add(fireLight.position, 'y').min(-10).max(10).step(0.01).name('Fire Light Position Y');
  gui.add(fireLight.position, 'z').min(-10).max(10).step(0.01).name('Fire Light Position Z');
  gui.add(fireLight, 'intensity').min(0).max(5).step(0.01).name('Fire Light Intensity');
  gui.add(fireLight, 'distance').min(0).max(10).step(0.01).name('Fire Light Distance');
  gui.add(fireLight, 'decay').min(0).max(5).step(0.01).name('Fire Light Decay');

  group.add(fireLight);

  // Candle Fire
  const video = document.createElement('video');
  video.src = '/candle_fire_5.mp4';
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
  fireAnimation.position.z = 3;
  fireAnimation.position.x = 0.625;
  fireAnimation.position.y = 1.25;
  fireAnimation.scale.y = 0.75;
  fireAnimation.scale.z = 2;
  fireAnimation.scale.x = 0.6;
  // AXIS HELPER TO FIREANIMATION
  group.add(fireAnimation);

  gui.add(fireAnimation.position, 'x').min(-10).max(10).step(0.01).name('Candle Fire Position X');
  gui.add(fireAnimation.position, 'y').min(-10).max(10).step(0.01).name('Candle Fire Position Y');
  gui.add(fireAnimation.position, 'z').min(-10).max(10).step(0.01).name('Candle Fire Position Z');
  gui.add(fireAnimation.scale, 'x').min(0).max(2).step(0.01).name('Candle Fire Scale X');
  gui.add(fireAnimation.scale, 'y').min(0).max(2).step(0.01).name('Candle Fire Scale Y');
  gui.add(fireAnimation.scale, 'z').min(0).max(5).step(0.01).name('Candle Fire Scale Z');

  return group;
};

export default table;
