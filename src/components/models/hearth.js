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

const hearth = (scene) => {
  return gltfLoader.load('./models/hearth.glb', (glb) => {
    const model = glb.scene;
    model.position.x = -4.5;
    model.position.z = 3;
    model.position.y = 2.85;
    model.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI * 0.5);

    console.log(model);

    model.scale.set(props.scale.x, props.scale.y, props.scale.z);
    gui.add(model.position, 'x').min(-10).max(10).step(0.01).name('hearth Position X');
    gui.add(model.position, 'y').min(-10).max(10).step(0.01).name('hearth Position Y');
    gui.add(model.position, 'z').min(-10).max(10).step(0.01).name('hearth Position Z');
    gui.add(model.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01).name('hearth Rotation Y');

    // When the model is loaded, set loading to true
    // setTimeout(() => {
    //   loading.model2 = true;
    // }, []);
    scene.add(model);
  });
};

export default hearth;
