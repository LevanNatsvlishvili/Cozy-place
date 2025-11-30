import { listener, audioLoader } from '@/utils/loader/audioLoader';
import * as THREE from 'three';

const thunder = () => {
  const thunderSoundBig = new THREE.Audio(listener);
  const thunderSoundSmall = new THREE.Audio(listener);

  return new Promise((resolve) => {
    let loadedCount = 0;

    const checkDone = () => {
      loadedCount += 1;
      if (loadedCount === 2) {
        resolve({ big: thunderSoundBig, small: thunderSoundSmall });
      }
    };

    audioLoader.load('/sound/thunder-2-big.wav', (buffer) => {
      thunderSoundBig.setBuffer(buffer);
      thunderSoundBig.setLoop(false);
      thunderSoundBig.setVolume(1);
      checkDone();
    });

    audioLoader.load('/sound/thunder-3.wav', (buffer) => {
      thunderSoundSmall.setBuffer(buffer);
      thunderSoundSmall.setLoop(false);
      thunderSoundSmall.setVolume(1);
      checkDone();
    });
  });
};

export default thunder;
