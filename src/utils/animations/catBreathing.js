const catBreathing = (catModel, clock) => {
  const t = clock.getElapsedTime();
  const breatheSpeed = 1.2; // breathing tempo
  const breatheAmount = 0.01; // size change

  const base = catModel.userData.originalScale;

  // Breathing scale on Y axis
  const sY = base + Math.sin(t * breatheSpeed) * breatheAmount;
  catModel.scale.set(base, sY, base);

  // Lift cat so it doesn’t sink into the floor
  const lift = (sY - base) * 0.5; // compensate half the scale change
  catModel.position.y = catModel.userData.originalY + lift;
};
export default catBreathing;
