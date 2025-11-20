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
  // console.log(model);
  model.traverse((child) => {
    if (child.isMesh && child.name === 'Bulb_A004_M_BulbGlass_0') {
      // Dark grey color
      child.material.color.setHex(0x2f3a3b);
      child.material.emissive = new THREE.Color('#ffd27f');
      child.material.emissiveIntensity = 2;
      child.material.roughness = 0.1;
      child.material.metalness = 0;
      child.material.transparent = true;
      child.material.opacity = 0.9;
      child.material.needsUpdate = true;
    }
  });
  // model.position.x = 3.75;
  model.position.z = floorCoordinates.length / 2;
  model.position.y = wallCoordinates.height - 1.5;

  model.scale.set(props.scale, props.scale, props.scale);

  // const bulbLight = new THREE.PointLight('#ffd27f', 5);
  const bulbLight = new THREE.PointLight('#ffd27f', 30, 12, 1.2);
  // gui.add(bulbLight, 'power').min(0).max(500).step(1).name('Bulb Light Power');
  // gui.add(bulbLight, 'intensity').min(0).max(100).step(0.01).name('Bulb Light Intensity');
  // gui.add(bulbLight, 'distance').min(0).max(100).step(0.01).name('Bulb Light Distance');
  // gui.add(bulbLight, 'decay').min(0).max(5).step(0.01).name('Bulb Light Decay');
  // Turn off the light with gui checkmark
  gui.add(bulbLight, 'visible').name('Bulb Light Visible');
  gui.add(bulbLight, 'intensity').min(0).max(100).step(0.01).name('Bulb Light Intensity');
  bulbLight.position.z = floorCoordinates.length / 2;
  bulbLight.position.y = wallCoordinates.height - 1.5;
  bulbLight.visible = false;

  // Attach light to the bulb so they move together
  group.add(model);
  group.add(bulbLight);

  return group;
};

export default bulb;
