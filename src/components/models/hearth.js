import gltfLoader from '@/utils/loader/gtlfLoader';
import * as THREE from 'three';
import loadVideo from '@/utils/loader/videoLoader';
import gui from '@/utils/gui';
import { shadow } from '../base/consts/common';
import { gsap } from 'gsap';

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
  group.name = 'Hearth';

  // Hearth model
  const glb = await gltfLoader.loadAsync('./models/hearth_2.glb');
  const model = glb.scene;
  model.name = 'Hearth-Model';
  model.children[0].name = 'Hearth-Model';
  model.position.x = props.position.x;
  model.position.z = props.position.z;
  model.position.y = props.position.y;
  model.rotateOnAxis(new THREE.Vector3(0, 1, 0), props.rotation);
  model.scale.set(props.scale.x, props.scale.y, props.scale.z);
  console.log(model);
  group.add(model);

  // Firelight inside hearth
  const fireLight = new THREE.PointLight(0xffa733, 1.6, 4, 2); // color, intensity, distance, decay
  fireLight.position.x = -4;
  fireLight.position.z = props.position.z;
  fireLight.position.y = 1.2;
  fireLight.castShadow = true;
  fireLight.shadow.mapSize.set(shadow.mapSize.width, shadow.mapSize.height);
  fireLight.shadow.radius = 2; // softer edge
  fireLight.intensity = 5;
  fireLight.distance = 1;
  fireLight.decay = 0.8;

  fireLight.userData.baseIntensity = fireLight.intensity;
  fireLight.userData.basePosition = fireLight.position.clone();
  fireLight.name = 'Hearth-Fire-Light';
  group.add(fireLight);

  // Fire spotlight emitting from hearth outward
  const fireSpot = new THREE.SpotLight(0xff8a3c, 2, 10, Math.PI / 4, 0.3, 2);
  fireSpot.position.x = -4;
  fireSpot.position.z = props.position.z;
  fireSpot.position.y = 1.2;
  fireSpot.target.position.set(-2.5, 1.5, 3);
  fireSpot.intensity = 2.5;
  fireSpot.distance = 12;
  fireSpot.decay = 0.6;
  fireSpot.castShadow = true;

  fireSpot.userData.baseIntensity = fireSpot.intensity;
  fireSpot.userData.basePosition = fireSpot.position.clone();
  fireSpot.userData.baseTarget = fireSpot.target.position.clone();
  fireSpot.name = 'Hearth-Fire-Spot';

  group.add(fireSpot);
  group.add(fireSpot.target);
  group.userData.fireSpot = fireSpot;

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
  fireAnimation.name = 'Hearth-Fire-Animation';

  let isFireOn = true;

  const actions = {
    switchOn: () => {
      if (isFireOn) return;
      isFireOn = true;

      // kill any previous tweens on these targets
      gsap.killTweensOf([fireAnimation.material, fireLight, fireSpot]);

      fireAnimation.visible = true;
      fireAnimation.material.transparent = true;

      gsap.to(fireAnimation.material, {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      fireLight.visible = true;
      fireSpot.visible = true;

      gsap.to(fireLight, {
        intensity: fireLight.userData.baseIntensity,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(fireSpot, {
        intensity: fireSpot.userData.baseIntensity,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    },

    switchOff: () => {
      if (!isFireOn) return;
      isFireOn = false;

      gsap.killTweensOf([fireAnimation.material, fireLight, fireSpot]);

      gsap.to(fireAnimation.material, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          fireAnimation.visible = false;
        },
      });

      gsap.to(fireLight, {
        intensity: 0,
        duration: 0.5,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          fireLight.visible = false;
        },
      });
      gsap.to(fireSpot, {
        intensity: 0,
        duration: 0.5,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          fireSpot.visible = false;
        },
      });
    },
    toggleFire: () => {
      if (isFireOn) {
        actions.switchOff();
      } else {
        actions.switchOn();
      }
    },
  };

  group.add(fireAnimation);
  group.userData.toggleFire = actions.toggleFire;
  console.log(group);
  return group;
};

export default hearth;
