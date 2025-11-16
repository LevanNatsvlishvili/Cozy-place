import gui from '@/utils/gui';
import gltfLoader from '@/utils/loader/gtlfLoader';
import * as THREE from 'three';

const props = {
  scale: 0.25,
  position: {
    controller1: {
      x: -4.4,
      z: 4.2,
      y: 0.775,
    },
    controller2: {
      x: -4.4,
      z: 5,
      y: 0.525,
    },
    controller: {
      scale: 0.15,
    },
    console: {
      x: -4.5,
      z: 3.6,
      y: 0.75,
    },
  },
};

const playstation = async (position) => {
  const group = new THREE.Group();
  const console = await gltfLoader.loadAsync('./models/tv_station/ps5.glb');
  const controller = await gltfLoader.loadAsync('./models/tv_station/controller.glb');

  // Console
  const consoleModel = console.scene;
  consoleModel.position.x = position.x;
  consoleModel.position.z = props.position.console.z;
  consoleModel.position.y = props.position.console.y;

  consoleModel.traverse((child) => {
    if (child.isMesh) {
      child.material.roughness = 0.7;
      child.material.metalness = 0.75;
    }
  });

  // Controller
  const controllerModel = controller.scene;

  controllerModel.traverse((child) => {
    if (child.isMesh) {
      child.material.roughness = 0.7;
      child.material.metalness = 0.75;

      // child.castShadow = true;
      // child.receiveShadow = true;
    }
  });

  controllerModel.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 1.5);
  controllerModel.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
  controllerModel.scale.set(
    props.position.controller.scale,
    props.position.controller.scale,
    props.position.controller.scale
  );

  const controller1 = controllerModel.clone();
  controller1.position.x = props.position.controller1.x;
  controller1.position.z = props.position.controller1.z;
  controller1.position.y = props.position.controller1.y;

  const controller2 = controllerModel.clone();
  controller2.position.x = props.position.controller2.x;
  controller2.position.z = props.position.controller2.z;
  controller2.position.y = props.position.controller2.y;
  controller2.rotation.z = Math.PI / 6;

  controller2.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material = child.material.clone();
      child.material.color = new THREE.Color('#4d0000');
    }
  });

  consoleModel.scale.set(props.scale, props.scale, props.scale);
  group.add(consoleModel);
  group.add(controller1);
  group.add(controller2);
  return group;
};

export default playstation;
