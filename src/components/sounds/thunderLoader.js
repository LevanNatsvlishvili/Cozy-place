import { listener, audioLoader } from '@/utils/loader/audioLoader';
import * as THREE from 'three';

const loadThunder = () => {
  return (
    new Promise() <
    {
      bigThunder,
      smallThunder,
    } >
    ((resolve) => {
      const bigThunder = new THREE.Audio(listener);
      const smallThunder = new THREE.Audio(listener);

      let loadedCount = 0;
      const done = () => {
        loadedCount += 1;
        if (loadedCount === 2) {
          resolve({ bigThunder, smallThunder });
        }
      };

      audioLoader.load('/sound/thunder-2-big.wav', (buffer) => {
        bigThunder.setBuffer(buffer);
        bigThunder.setLoop(false);
        bigThunder.setVolume(1);
        done();
      });

      audioLoader.load('/sound/thunder-3.wav', (buffer) => {
        smallThunder.setBuffer(buffer);
        smallThunder.setLoop(false);
        smallThunder.setVolume(1);
        done();
      });
    })
  );
};

export default loadThunder;
