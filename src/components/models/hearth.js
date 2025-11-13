import gltfLoader from '@/utils/loader/gtlfLoader';
import gui from '@/utils/gui';
import * as THREE from 'three';

const props = {
  scale: {
    z: 3,
    x: 3,
    y: 3,
  },
};

const hearth = async () => {
  const group = new THREE.Group();

  // Hearth model
  const glb = await gltfLoader.loadAsync('./models/hearth_2.glb');
  const model = glb.scene;
  model.position.x = -4.5;
  model.position.z = 3;
  model.position.y = 2.85;
  model.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI * 0.5);
  model.scale.set(props.scale.x, props.scale.y, props.scale.z);
  group.add(model);

  // Fire Animation
  const video = document.createElement('video');
  video.src = '/fire.mp4';
  video.loop = true;
  video.muted = true;
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
  fireAnimation.position.z = 3;
  fireAnimation.position.x = -4.46;
  fireAnimation.position.y = 1.2;
  fireAnimation.scale.y = 1;
  fireAnimation.scale.z = 2;
  fireAnimation.scale.x = 1.3;
  fireAnimation.rotation.y = Math.PI * 0.5;

  group.add(fireAnimation);

  return group;
};

export default hearth;
