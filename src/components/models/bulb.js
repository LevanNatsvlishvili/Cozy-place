import gltfLoader from '@/utils/loader/gtlfLoader';
import { floorCoordinates, wallCoordinates } from '../base/consts/common';
import gui from '@/utils/gui';
import * as THREE from 'three';

const props = {
  scale: 0.25,
};

const bulb = async () => {
  const glb = await gltfLoader.loadAsync('./models/bulb.glb');
  const model = glb.scene;
  let bulbGlass;
  model.traverse((child) => {
    if (child.isMesh) {
      // Dark grey color
      child.material.color.setHex(0x2f3a3b);
      // child.material.color.set('#ffffff');
      child.material.emissive = new THREE.Color('#ffd27f'); // warm yellow-orange
      child.material.emissiveIntensity = 2.2;
      child.material.roughness = 0.1;
      child.material.metalness = 0;
      child.material.transparent = true;
      child.material.opacity = 0.9;

      bulbGlass = child;
    }
  });
  // model.position.x = 3.75;
  model.position.z = floorCoordinates.length / 2;
  model.position.y = wallCoordinates.height - 1.5;

  model.scale.set(props.scale, props.scale, props.scale);

  const bulbLight = new THREE.PointLight('#ffd27f', 1.4, 7);
  const axesHelper = new THREE.AxesHelper(1);
  model.add(axesHelper);
  bulbLight.position.set(model.position.x, wallCoordinates.height - 1.5, model.position.z);
  gui.add(bulbLight.rotation, 'x').min(-Math.PI).max(Math.PI).step(0.01).name('Bulb Light X');
  gui.add(bulbLight.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01).name('Bulb Light Y');
  gui.add(bulbLight.rotation, 'z').min(-Math.PI).max(Math.PI).step(0.01).name('Bulb Light Z');

  // Attach light to the bulb so they move together
  model.add(bulbLight);

  // For debugging light position
  const lightHelper = new THREE.PointLightHelper(bulbLight, 0.1);
  model.add(lightHelper);

  // GUI controls
  gui.add(bulbLight, 'intensity').min(0).max(5).step(0.01).name('Bulb Intensity');
  gui
    .addColor({ color: bulbLight.color.getHex() }, 'color')
    .name('Bulb Color')
    .onChange((v) => bulbLight.color.set(v));

  return model;
};

export default bulb;
