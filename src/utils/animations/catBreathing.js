// catBreathing.ts
const BREATHE_SPEED = 1.2; // breathing tempo
const BREATHE_AMOUNT = 0.01; // size change
const LIFT_FACTOR = 0.5; // how much to lift when scaling

const catBreathing = (catModel, t) => {
  if (!catModel) return;

  const base = catModel.userData.originalScale;
  const originalY = catModel.userData.originalY;

  // Single sin call for breathing offset
  const offset = Math.sin(t * BREATHE_SPEED) * BREATHE_AMOUNT;

  const sY = base + offset;

  // Scale – only mutating values we need
  const scale = catModel.scale;
  scale.x = base;
  scale.y = sY;
  scale.z = base;

  // Vertical lift to keep it on the floor
  catModel.position.y = originalY + (sY - base) * LIFT_FACTOR;
};

export default catBreathing;
