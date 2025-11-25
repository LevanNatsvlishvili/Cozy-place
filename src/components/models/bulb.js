import gltfLoader from '@/utils/loader/gtlfLoader';
import { floorCoordinates, wallCoordinates } from '../base/consts/common';
import gui from '@/utils/gui';
import * as THREE from 'three';

const props = {
  scale: 0.25,
};

const bulb = async () => {
  const group = new THREE.Group();
  const glb = await gltfLoader.loadAsync('./models/bulb.glb');
  const model = glb.scene;
  const defaultBulbSettings = {};
  model.traverse((child) => {
    if (child.isMesh && child.name === 'Bulb_A004_M_BulbGlass_0') {
      // Save default settings
      child.name = 'Bulb-glass';
      defaultBulbSettings.color = child.material.color.getHex();
      defaultBulbSettings.emissive = child.material.emissive.getHex();
      defaultBulbSettings.emissiveIntensity = child.material.emissiveIntensity;
      defaultBulbSettings.roughness = child.material.roughness;
      defaultBulbSettings.metalness = child.material.metalness;
      defaultBulbSettings.transparent = child.material.transparent;
      defaultBulbSettings.opacity = child.material.opacity;
    }
  });

  // model.position.x = 3.75;
  model.position.z = floorCoordinates.length / 2;
  model.position.y = wallCoordinates.height - 1.5;

  model.scale.set(props.scale, props.scale, props.scale);

  const bulbLight = new THREE.PointLight('#ffd27f', 30, 12, 1.2);
  bulbLight.position.z = floorCoordinates.length / 2;
  bulbLight.position.y = wallCoordinates.height - 1.5;
  bulbLight.visible = false;

  const actions = {
    switchLightOn: () => {
      model.traverse((child) => {
        if (child.isMesh && child.name === 'Bulb_A004_M_BulbGlass_0') {
          child.material.color.setHex(0x2f3a3b);
          child.material.emissive.set('#ffd27f');
          child.material.emissiveIntensity = 2;
          child.material.roughness = 0.1;
          child.material.metalness = 0;
          child.material.transparent = true;
          child.material.opacity = 0.6;
          child.material.needsUpdate = true;
        }
      });
      bulbLight.visible = true;
    },
    switchLightOff: () => {
      model.traverse((child) => {
        if (child.isMesh && child.name === 'Bulb_A004_M_BulbGlass_0') {
          child.material.color.setHex(defaultBulbSettings.color);
          child.material.emissive.setHex(defaultBulbSettings.emissive);
          child.material.emissiveIntensity = defaultBulbSettings.emissiveIntensity;
          child.material.roughness = defaultBulbSettings.roughness;
          child.material.metalness = defaultBulbSettings.metalness;
          child.material.transparent = defaultBulbSettings.transparent;
          child.material.opacity = defaultBulbSettings.opacity;
          child.material.needsUpdate = true;
        }
      });
      bulbLight.visible = false;
    },
    toggleBulbLight: () => {
      if (bulbLight.visible) {
        actions.switchLightOff();
      } else {
        actions.switchLightOn();
      }
    },
  };

  gui.add(actions, 'toggleBulbLight').name('Toggle Bulb Light ');

  // Attach light to the bulb so they move together
  group.add(model);
  group.add(bulbLight);
  group.userData.toggleBulb = actions.toggleBulbLight;
  group.name = 'Bulb';
  return group;
};

export default bulb;
