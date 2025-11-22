// Constants lifted out (no need to recreate every frame)
const N1_FREQ = 10.0;
const N2_FREQ = 7.3;
const N2_OFFSET = 1.7;
const AMP = 0.9;

const INT_MIN = 1.2;
const INT_MAX = 4.0;

const POS_FREQ_X = 5.1;
const POS_FREQ_Y = 6.4;
const POS_AMP = 0.03;

const TAR_FREQ_X = 3.2;
const TAR_FREQ_Y = 4.7;
const TAR_AMP = 0.05;

const hearthFlickering = (fireSpot, t) => {
  // ======================
  // 🔥 1. Intensity flicker
  // ======================
  const n1 = Math.sin(t * N1_FREQ);
  const n2 = Math.sin(t * N2_FREQ + N2_OFFSET);
  const noise = n1 * 0.4 + n2 * 0.25;

  let intensity = fireSpot.userData.baseIntensity + noise * AMP;

  if (intensity < INT_MIN) intensity = INT_MIN;
  else if (intensity > INT_MAX) intensity = INT_MAX;

  fireSpot.intensity = intensity;

  // ======================
  //  2. Light position wobble
  // ======================
  const bp = fireSpot.userData.basePosition; // cached reference

  fireSpot.position.x = bp.x + Math.sin(t * POS_FREQ_X) * POS_AMP;
  fireSpot.position.y = bp.y + Math.sin(t * POS_FREQ_Y) * POS_AMP * 0.7;

  // ======================
  //  3. Target wobble (cone direction)
  // ======================
  const bt = fireSpot.userData.baseTarget;

  fireSpot.target.position.x = bt.x + Math.sin(t * TAR_FREQ_X) * TAR_AMP;
  fireSpot.target.position.y = bt.y + Math.sin(t * TAR_FREQ_Y) * TAR_AMP * 0.5;
};

export default hearthFlickering;
