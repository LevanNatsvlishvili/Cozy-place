import gui from '@/utils/gui';
import gltfLoader from '@/utils/loader/gtlfLoader';
import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';

const props = {
  scale: 3,
  position: {
    x: -4.75,
    z: 5,
    y: 3,
  },
};

const tv = async () => {
  const group = new THREE.Group();
  const glb = await gltfLoader.loadAsync('./models/tv_station/tv.glb');
  const model = glb.scene;
  model.position.x = props.position.x;
  model.position.z = props.position.z;
  model.position.y = props.position.y;
  model.rotation.y = Math.PI / 2;

  model.scale.set(props.scale, props.scale, props.scale);
  let tvScreenMesh = null;
  model.traverse((child) => {
    if (child.isMesh) {
      tvScreenMesh = child;
    }
  });
  const box = new THREE.Box3().setFromObject(tvScreenMesh);
  const size = new THREE.Vector3();
  box.getSize(size);

  // Set a image as tv screen
  const tvScreenTexture = textureLoader.load('./textures/ps5_screen.jpg');
  const tvScreenMaterial = new THREE.MeshBasicMaterial({
    map: tvScreenTexture,
  });

  const tvScreenGeo = new THREE.PlaneGeometry(size.x, size.y);
  const tvScreen = new THREE.Mesh(tvScreenGeo, tvScreenMaterial);

  tvScreen.position.x = props.position.x + 0.08;
  tvScreen.position.z = props.position.z;
  tvScreen.position.y = props.position.y - 0.08;
  tvScreen.scale.set(props.scale, props.scale, props.scale);
  tvScreen.rotation.y = Math.PI / 2;

  group.add(model);
  group.add(tvScreen);
  return group;
};

export default tv;
