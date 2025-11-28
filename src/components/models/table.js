import gltfLoader from '@/utils/loader/gtlfLoader';
import gui from '@/utils/gui';
import * as THREE from 'three';
import loadVideo from '@/utils/loader/videoLoader';
import { shadow } from '../base/consts/common';
import { gsap } from 'gsap';

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
  model.name = 'table-model';
  model.traverse((child) => {
    if (child.isMesh) {
      child.name = 'table-mesh';
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
  fireLight.position.x = 0.5;
  fireLight.position.z = props.position.z;
  fireLight.position.y = 0.5;
  fireLight.shadow.mapSize.set(shadow.mapSize.width, shadow.mapSize.height);
  fireLight.shadow.radius = 2; // softer edge
  fireLight.position.y = 1.1;
  fireLight.position.x = 0.51;
  fireLight.intensity = 0.5;
  fireLight.distance = 8;
  fireLight.decay = 1;

  fireLight.userData.baseIntensity = fireLight.intensity;
  fireLight.userData.basePosition = fireLight.position.clone();

  // gui.add(fireLight, 'intensity').min(0).max(5).step(0.01).name('Fire Light Intensity');
  // gui.add(fireLight, 'distance').min(0).max(20).step(0.01).name('Fire Light Distance');
  // gui.add(fireLight, 'decay').min(-5).max(5).step(0.01).name('Fire Light Decay');

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
  fireAnimation.name = 'table-candle-fire';
  group.userData.fireLight = fireLight;
  group.add(fireAnimation);

  // 🔹 store base values for grow-from-bottom animation
  fireAnimation.userData.baseScale = fireAnimation.scale.clone();
  fireAnimation.userData.basePositionY = fireAnimation.position.y;
  // plane height is 1, so world height = scale.y * 1
  fireAnimation.userData.height = fireAnimation.userData.baseScale.y * 1.0;

  let isFireOn = true;

  // helper to keep bottom anchored while scaling
  const updateFirePositionFromScale = () => {
    const baseScaleY = fireAnimation.userData.baseScale.y;
    const baseY = fireAnimation.userData.basePositionY;
    const height = fireAnimation.userData.height;

    const s = fireAnimation.scale.y / baseScaleY; // 0 → 1
    // move center so bottom stays at same world Y
    fireAnimation.position.y = baseY - (1 - s) * (height * 0.5);
  };

  const actions = {
    switchOn: () => {
      if (isFireOn) return;
      isFireOn = true;

      // kill any previous tweens on these targets
      gsap.killTweensOf([fireAnimation.scale, fireLight]);

      fireAnimation.visible = true;

      const baseScaleY = fireAnimation.userData.baseScale.y;

      // start from flat (no height)
      fireAnimation.scale.y = 0.0001;
      updateFirePositionFromScale();

      gsap.to(fireAnimation.scale, {
        y: baseScaleY,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: updateFirePositionFromScale,
      });

      gsap.to(fireAnimation.material, {
        delay: 0.2,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: updateFirePositionFromScale,
      });

      fireLight.visible = true;

      gsap.to(fireLight, {
        delay: 0.25,
        intensity: fireLight.userData.baseIntensity,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    },

    switchOff: () => {
      if (!isFireOn) return;
      isFireOn = false;

      gsap.killTweensOf([fireAnimation.scale, fireLight]);

      const baseScaleY = fireAnimation.userData.baseScale.y;

      gsap.to(fireAnimation.scale, {
        y: 0.0001,
        duration: 0.6,
        ease: 'power2.in',
        overwrite: 'auto',
        onUpdate: updateFirePositionFromScale,
        onComplete: () => {
          fireAnimation.visible = false;
          // reset so next time we start from proper base
          fireAnimation.scale.y = baseScaleY;
          updateFirePositionFromScale();
        },
      });

      gsap.to(fireAnimation.material, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        overwrite: 'auto',
      });

      // 🔥 shrink flame down into the candle

      gsap.to(fireLight, {
        intensity: 0,
        duration: 0.4,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          fireLight.visible = false;
        },
      });
    },

    toggleFire: () => {
      console.log('Table');
      if (isFireOn) {
        actions.switchOff();
      } else {
        actions.switchOn();
      }
    },
  };

  group.userData.toggleFire = actions.toggleFire;
  group.name = 'table';

  return group;
};

export default table;
