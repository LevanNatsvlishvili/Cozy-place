import gltfLoader from '@/utils/loader/gtlfLoader';
import gui from '@/utils/gui';
import * as THREE from 'three';
import loadVideo from '@/utils/loader/videoLoader';

const props = {
  scale: {
    z: 3,
    x: 3,
    y: 3,
  },
  position: {
    z: 1,
    x: -4,
    y: 2.85,
  },
  rotation: Math.PI * 0.2,
};

const hearth = async () => {
  const group = new THREE.Group();

  // Hearth model
  const glb = await gltfLoader.loadAsync('./models/hearth_2.glb');
  const model = glb.scene;
  model.position.x = props.position.x;
  model.position.z = props.position.z;
  model.position.y = props.position.y;
  model.rotateOnAxis(new THREE.Vector3(0, 1, 0), props.rotation);
  model.scale.set(props.scale.x, props.scale.y, props.scale.z);
  group.add(model);

  gui.add(model.position, 'x').min(-10).max(10).step(0.01).name('Hearth X Position');
  gui.add(model.position, 'y').min(0).max(10).step(0.01).name('Hearth Y Position');
  gui.add(model.position, 'z').min(-10).max(10).step(0.01).name('Hearth Z Position');
  gui.add(model.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01).name('Hearth Y Rotation');
  gui.add(model.rotation, 'x').min(-Math.PI).max(Math.PI).step(0.01).name('Hearth X Rotation');
  gui.add(model.rotation, 'z').min(-Math.PI).max(Math.PI).step(0.01).name('Hearth Z Rotation');

  // Fire Animation
  const video = await loadVideo('/fire.mp4');
  video.play();
  video.playbackRate = 0.65;

  const fireTexture = new THREE.VideoTexture(video);
  fireTexture.encoding = THREE.sRGBEncoding;

  const fireMaterial = new THREE.MeshBasicMaterial({
    map: fireTexture,
    transparent: true,
    blending: THREE.AdditiveBlending, // key line!
    depthWrite: false, // avoids z-fighting glow
  });

  const fireAnimation = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), fireMaterial);
  fireAnimation.position.z = props.position.z;
  fireAnimation.position.x = props.position.x - 0.075;
  fireAnimation.position.y = 1.2;
  fireAnimation.scale.y = 1;
  fireAnimation.scale.z = 2;
  fireAnimation.scale.x = 1.3;
  fireAnimation.rotation.y = props.rotation;

  gui.add(fireAnimation.position, 'x').min(-5).max(5).step(0.01).name('Fire X Position');

  group.add(fireAnimation);

  return group;
};

export default hearth;
