import gui from '@/utils/gui';
import gltfLoader from '@/utils/loader/gtlfLoader';
import textureLoader from '@/utils/loader/textureLoader';
import * as THREE from 'three';
import { gsap } from 'gsap';

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
  tvScreen.name = 'TV-Screen';
  tvScreen.material.transparent = true;

  const tvLightIntensity = 5;
  const tvLight = new THREE.PointLight('#207d9d');
  tvLight.position.x = -3;
  tvLight.position.y = 1.3;
  tvLight.position.z = props.position.z;
  tvLight.intensity = tvLightIntensity;
  tvLight.distance = 5;
  tvLight.decay = 1.4;
  gui.add(tvLight, 'intensity', 0, 20, 0.1).name('TV Light Intensity');
  gui.add(tvLight, 'distance', 0, 20, 0.1).name('TV Light Distance');
  gui.add(tvLight, 'decay', 0, 5, 0.1).name('TV Light Decay');
  // tvLight.visible = true;

  group.add(tvLight);

  let tvIsOn = true;

  const actions = {
    switchOn: () => {
      if (tvIsOn) return;
      tvIsOn = true;

      // kill any previous tweens on these targets
      gsap.killTweensOf([tvScreen.material, tvLight]);

      tvScreen.visible = true;
      tvScreen.material.transparent = true;

      gsap.to(tvScreen.material, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      tvLight.visible = true;
      gsap.to(tvLight, {
        intensity: tvLightIntensity,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    },

    switchOff: () => {
      if (!tvIsOn) return;
      tvIsOn = false;

      gsap.killTweensOf([tvScreen.material, tvLight]);

      gsap.to(tvScreen.material, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          tvScreen.visible = false;
        },
      });

      gsap.to(tvLight, {
        intensity: 0,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          tvLight.visible = false;
        },
      });
    },
    toggleTV: () => {
      if (tvIsOn) {
        actions.switchOff();
      } else {
        actions.switchOn();
      }
    },
  };

  group.add(model);
  group.add(tvScreen);
  group.name = 'TV';
  group.userData = {
    toggleTV: actions.toggleTV,
  };
  return group;
};

export default tv;
