import * as THREE from 'three';

const hearthFlickering = (fireSpot, t) => {
  // 🎛 Intensity flicker (mix a couple sine waves so it feels organic)
  const n1 = Math.sin(t * 10.0);
  const n2 = Math.sin(t * 7.3 + 1.7);
  const noise = n1 * 0.4 + n2 * 0.25; // combined "noise"

  const amp = 0.9; // how strong flicker is
  fireSpot.intensity = fireSpot.userData.baseIntensity + noise * amp;

  // clamp so it never fully dies or explodes
  fireSpot.intensity = THREE.MathUtils.clamp(fireSpot.intensity, 1.2, 4.0);

  // ✨ subtle movement of light source (dancing shadows)
  const posAmp = 0.03; // VERY small
  fireSpot.position.x = fireSpot.userData.basePosition.x + Math.sin(t * 5.1) * posAmp;
  fireSpot.position.y = fireSpot.userData.basePosition.y + Math.sin(t * 6.4) * posAmp * 0.7;

  // ✨ tiny wobble in target so cone direction dances a bit
  const targetAmp = 0.05;
  fireSpot.target.position.x = fireSpot.userData.baseTarget.x + Math.sin(t * 3.2) * targetAmp;
  fireSpot.target.position.y = fireSpot.userData.baseTarget.y + Math.sin(t * 4.7) * targetAmp * 0.5;
};

export default hearthFlickering;
