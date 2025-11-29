import { listener, audioLoader } from '@/utils/loader/audioLoader';
import * as THREE from 'three';

const rain = () => {
  return new Promise((resolve) => {
    const rainSound = new THREE.Audio(listener);

    audioLoader.load('/sound/rain.wav', (buffer) => {
      rainSound.setBuffer(buffer);
      rainSound.setLoop(true);
      rainSound.setVolume(0.2);
      rainSound.play();

      resolve(rainSound);
    });
  });
};

export default rain;
