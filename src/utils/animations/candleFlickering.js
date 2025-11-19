import * as THREE from 'three';

const candleFlickering = (fireLight, t) => {
  const flickerSpeed = 18; // how fast the candle flickers
  const flickerNoise = Math.sin(t * flickerSpeed) * 0.25 + Math.sin(t * (flickerSpeed * 0.37) + 10) * 0.15; // mix two frequencies

  const intensityAmplitude = 1; // how strong the change is
  fireLight.intensity = fireLight.userData.baseIntensity + flickerNoise * intensityAmplitude;

  // Clamp so it never goes negative or too bright
  fireLight.intensity = THREE.MathUtils.clamp(fireLight.intensity, 1.5, 4.5);

  // Very subtle position jitter (makes shadows dance a bit)
  const posAmp = 0.025; // keep tiny!
  fireLight.position.x = fireLight.userData.basePosition.x + (Math.sin(t * 7.3) * posAmp) / 2;
  fireLight.position.y = fireLight.userData.basePosition.y + Math.sin(t * 9.1) * posAmp;
};

export default candleFlickering;
