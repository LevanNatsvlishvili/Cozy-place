import { mediaLength } from '@/utils/consts/common';
import { listener, audioLoader } from '@/utils/loader/audioLoader';
import * as THREE from 'three';

const thunder = () => {
  return new Promise((resolve) => {
    audioLoader.load('/sound/thunder-2-big.wav', (buffer) => {
      const thunderSound = new THREE.Audio(listener);

      thunderSound.setBuffer(buffer);
      thunderSound.setLoop(false);
      thunderSound.setVolume(1);

      setTimeout(() => {
        console.log('big thunder is played');
        thunderSound.play();
      }, mediaLength.lightning.bigThunder);

      // setInterval(() => {
      //   console.log('big thunder is played again');
      //   thunderSound.play();
      // }, interval + mediaLength.lightning.bigThunder);

      resolve(thunderSound);
    });

    audioLoader.load('/sound/thunder-3.wav', (buffer) => {
      const thunderSound = new THREE.Audio(listener);
      thunderSound.setBuffer(buffer);
      thunderSound.setLoop(false);
      thunderSound.setVolume(1);

      setTimeout(() => {
        console.log('thunder 3 is played');
        thunderSound.play();
      }, mediaLength.lightning.smallThunder);

      // setInterval(() => {
      //   console.log('small thunder is played again');
      //   thunderSound.play();
      // }, interval + mediaLength.lightning.smallThunder);

      resolve(thunderSound);
    });
  });
};

export default thunder;
